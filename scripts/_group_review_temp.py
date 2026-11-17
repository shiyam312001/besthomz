from pathlib import Path
import ast
import csv

from PIL import Image, ImageDraw, ImageOps


state = Path(
    r"C:\Users\shiya\.copilot\session-state\f3303c08-a627-49b6-82c2-cdbe82620be7\files"
)
products_root = Path(r"C:\Users\shiya\Videos\besthomz\public\Products")
source_root = Path(r"C:\Users\shiya\Downloads\HTC PRODUCT_TO IN BESTHOMZ")
with (state / "group-match-candidates.csv").open(encoding="utf-8-sig") as file:
    all_rows = list(csv.DictReader(file))

selected = []
for row in all_rows:
    top = ast.literal_eval(row["candidates"])[0]
    if top["source_is_group_winner"] and top["score"] >= 0.65:
        selected.append((row, top))

width, height = 750, 155
for offset in range(0, len(selected), 12):
    batch = selected[offset : offset + 12]
    sheet = Image.new("RGB", (width, len(batch) * height), "white")
    draw = ImageDraw.Draw(sheet)
    for row_index, (row, candidate) in enumerate(batch):
        y = row_index * height
        draw.text(
            (0, y),
            f"{row['category']} | {row['source']} | "
            f"{candidate['score']:.3f} | {candidate['product_margin']:.3f}",
            fill="black",
        )
        paths = [source_root / row["category"] / row["source"]]
        paths.extend(
            products_root
            / row["category"]
            / "_Other Generated"
            / filename
            for filename in candidate["files"]
        )
        for column, path in enumerate(paths):
            with Image.open(path) as image:
                thumbnail = ImageOps.contain(image.convert("RGB"), (150, 125))
            sheet.paste(thumbnail, (column * 150, y + 20))
    output = state / f"review-group-candidates-{offset // 12 + 1}.jpg"
    sheet.save(output, quality=90)
    print("Saved", output, flush=True)
