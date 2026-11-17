from pathlib import Path
import csv

from PIL import Image, ImageDraw, ImageOps


state = Path(
    r"C:\Users\shiya\.copilot\session-state\f3303c08-a627-49b6-82c2-cdbe82620be7\files"
)
products_root = Path(r"C:\Users\shiya\Videos\besthomz\public\Products")
source_root = Path(r"C:\Users\shiya\Downloads\HTC PRODUCT_TO IN BESTHOMZ")
installed = [
    ("BED 6FT", "B6-2363-2ST-86900.jpg"),
    ("COFFEE TABLE", "CTG-JK01-17200.jpg"),
    ("DS4", "DS4M-C05-L14-41000.jpg"),
    ("DS4", "DS4W-222-902-80100.jpg"),
    ("DS6", "DS6M-CT51-Y51 - ST-191800.jpg"),
    ("DS6", "DS6W-SWAN-43700.jpg"),
    ("DS8", "DS8M-509-308000.jpg"),
    ("OFFICE TABLE", "OT16-7116-48900.jpg"),
    ("OFFICE TABLE", "OT16-DJBT-70B-43000.jpg"),
    ("OTHERS", "ARYA GOLD CONSOLE-121000.jpg"),
    ("SWING", "SW-C-11-19800.jpg"),
]
with (state / "image-match-candidates.csv").open(encoding="utf-8-sig") as file:
    rows = list(csv.DictReader(file))

for offset in range(0, len(installed), 5):
    batch = installed[offset : offset + 5]
    cell, row_height = 100, 120
    sheet = Image.new("RGB", (cell * 13, row_height * len(batch)), "white")
    draw = ImageDraw.Draw(sheet)
    for row_index, (category, source_name) in enumerate(batch):
        y = row_index * row_height
        row = next(
            item
            for item in rows
            if item["category"] == category and item["source"] == source_name
        )
        candidates = [
            item.rsplit(":", 2)
            for item in row["candidate_files"].split(" | ")
        ][:12]
        paths = [source_root / category / source_name]
        paths.extend(
            products_root / category / "_Other Generated" / candidate[0]
            for candidate in candidates
        )
        draw.text((0, y), f"{category} {source_name}", fill="black")
        for column, path in enumerate(paths):
            with Image.open(path) as image:
                thumbnail = ImageOps.contain(image.convert("RGB"), (cell - 2, 88))
            sheet.paste(thumbnail, (column * cell, y + 20))
            if column:
                draw.text(
                    (column * cell, y + 108),
                    f"{column}:{float(candidates[column-1][1]):.2f}",
                    fill="black",
                )
    output = state / f"installed-candidate-inspection-{offset // 5 + 1}.jpg"
    sheet.save(output, quality=90)
    print("Saved", output, flush=True)
