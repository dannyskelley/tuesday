import fitz
from pathlib import Path
src = Path('attached_assets/TMD_August_2026_final_1789238757619.pdf')
out = Path('.agents/outputs/keynotes-aug-2026')
doc = fitz.open(src)
print(f'pages={doc.page_count} metadata={doc.metadata}')
for i, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5), alpha=False)
    pix.save(out / f'page-{i+1}.png')
