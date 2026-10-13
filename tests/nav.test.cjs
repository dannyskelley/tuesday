const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const { test } = require("node:test");

function element() {
    const classes = new Set();
    const listeners = {};
    return {
        dataset: {},
        attributes: {},
        classList: {
            toggle(name) { classes.has(name) ? classes.delete(name) : classes.add(name); },
            contains(name) { return classes.has(name); },
            add(name) { classes.add(name); },
            remove(name) { classes.delete(name); }
        },
        addEventListener(name, callback) { (listeners[name] ||= []).push(callback); },
        setAttribute(name, value) { this.attributes[name] = value; },
        click() { (listeners.click || []).forEach(callback => callback()); }
    };
}

function navigation() {
    const body = element();
    const header = element();
    const button = element();
    const dropdown = element();
    const selectors = { body, "#cs-navigation": header, "#cs-navigation .cs-toggle": button };
    const document = {
        querySelector: selector => selectors[selector],
        querySelectorAll: () => [dropdown],
        addEventListener() {},
        documentElement: { scrollTop: 0 }
    };
    const context = vm.createContext({ document });
    const source = fs.readFileSync("src/assets/js/nav.js", "utf8");
    // Execute actual inline header scripts too, so duplicate handlers fail the test.
    const template = fs.readFileSync("src/_includes/components/header.html", "utf8");
    for (const match of template.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) {
        vm.runInContext(match[1], context);
    }
    vm.runInContext(source, context);
    return { body, header, button, dropdown, context, source };
}

test("one tap opens the mobile menu; the next tap closes it", () => {
    const { body, header, button } = navigation();
    button.click();
    assert.ok(header.classList.contains("cs-active"));
    assert.ok(button.classList.contains("cs-active"));
    assert.ok(body.classList.contains("cs-open"));
    assert.equal(button.attributes["aria-expanded"], "true");
    button.click();
    assert.equal(header.classList.contains("cs-active"), false);
    assert.equal(button.classList.contains("cs-active"), false);
    assert.equal(body.classList.contains("cs-open"), false);
    assert.equal(button.attributes["aria-expanded"], "false");
});

test("one tap opens a submenu; the next tap closes it", () => {
    const { dropdown } = navigation();
    dropdown.click();
    assert.ok(dropdown.classList.contains("cs-active"));
    dropdown.click();
    assert.equal(dropdown.classList.contains("cs-active"), false);
});

test("reloading the navigation script does not register duplicate handlers", () => {
    const { button, header, dropdown, context, source } = navigation();
    vm.runInContext(source, context);
    button.click();
    dropdown.click();
    assert.ok(header.classList.contains("cs-active"));
    assert.ok(dropdown.classList.contains("cs-active"));
});
