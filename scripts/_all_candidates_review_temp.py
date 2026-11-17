from pathlib import Path
import csv

from PIL import Image, ImageDraw, ImageOps


state = Path(
    r"C:\Users\shiya\.copilot\session-state\f3303c08-a627-49b6-82c2-cdbe82620be7\files"
)
products_root = Path(r"C:\Users\shiya\Videos\besthomz\public\Products")
source_root = Path(r"C:\Users\shiya\Downloads\HTC PRODUCT_TO IN BESTHOMZ")
with (state / "image-match-candidates.csv").open(encoding="utf-8-sig") as file:
    rows = list(csv.DictReader(file))

cell_width, cell_height = 150, 155
for category in sorted({row["category"] for row in rows}):
    category_rows = [row for row in rows if row["category"] == category]
    for offset in range(0, len(category_rows), 12):
        batch = category_rows[offset : offset + 12]
        sheet = Image.new("RGB", (cell_width * 5, cell_height * len(batch)), "white")
        draw = ImageDraw.Draw(sheet)
        for row_index, row in enumerate(batch):
            y = row_index * cell_height
            draw.text(
                (0, y),
                f"{row['source']} | {row['candidate_files'].split(':')[1]}",
                fill="black",
            )
            candidates = [
                candidate.rsplit(":", 2)
                for candidate in row["candidate_files"].split(" | ")
            ][:4]
            paths = [source_root / category / row["source"]]
            paths.extend(
                products_root / category / "_Other Generated" / candidate[0]
                for candidate in candidates
            )
            for column, path in enumerate(paths):
                with Image.open(path) as image:
                    thumbnail = ImageOps.contain(image.convert("RGB"), (cell_width, 125))
                sheet.paste(thumbnail, (column * cell_width, y + 22))
                if column:
                    draw.text(
                        (column * cell_width, y + 145),
                        f"{column}:{float(candidates[column - 1][1]):.2f}",
                        fill="black",
                    )
        output = state / (
            f"review-individual-{category.lower().replace(' ', '-')}-"
            f"{offset // 12 + 1}.jpg"
        )
        if output.exists():
            continue
        sheet.save(output, quality=90)
        print("Saved", output, flush=True)
