// Wrapped in an IIFE so re-execution (e.g. Eleventy dev-server live reload)
// doesn't throw "redeclaration of const" errors.
(function () {
// add classes for mobile navigation toggling
var CSbody = document.querySelector("body");
const CSnavbarMenu = document.querySelector("#cs-navigation");
const CShamburgerMenu = document.querySelector("#cs-navigation .cs-toggle");

if (!CSnavbarMenu || !CShamburgerMenu || CSnavbarMenu.dataset.navInitialized) return;
CSnavbarMenu.dataset.navInitialized = "true";

CShamburgerMenu.addEventListener('click', function() {
	CShamburgerMenu.classList.toggle("cs-active");
	CSnavbarMenu.classList.toggle("cs-active");
	CSbody.classList.toggle("cs-open");
	// run the function to check the aria-expanded value
	ariaExpanded();
});

// Keep the button's accessible state in sync with the visible menu.
function ariaExpanded() {
CShamburgerMenu.setAttribute('aria-expanded', String(CSnavbarMenu.classList.contains('cs-active')));
}

	// This script adds a class to the body after scrolling 100px
// and we used these body.scroll styles to create some on scroll 
// animations with the navbar

document.addEventListener('scroll', (e) => { 
	const scroll = document.documentElement.scrollTop;
if(scroll >= 30){
document.querySelector('body').classList.add('scroll')
	} else {
	document.querySelector('body').classList.remove('scroll')
	}
});


// mobile nav toggle code
const dropDowns = Array.from(document.querySelectorAll('#cs-navigation .cs-dropdown'));
	for (const item of dropDowns) {
		const onClick = () => {
		item.classList.toggle('cs-active')
	}
	item.addEventListener('click', onClick)
	}
})();
