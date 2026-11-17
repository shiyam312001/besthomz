from collections import defaultdict
from pathlib import Path
import csv
import re

import torch
from PIL import Image
from torch.nn.functional import normalize
from transformers import CLIPModel, CLIPProcessor


torch.set_num_threads(6)
model_dir = Path(
    r"C:\Users\shiya\.cache\huggingface\hub\models--laion--CLIP-ViT-B-32-laion2B-s34b-b79k\snapshots\1a25a446712ba5ee05982a381eed697ef9b435cf"
)
if not model_dir.is_dir():
    model_dir = Path(
        r"C:\Users\shiya\.cache\huggingface\hub\models--laion--CLIP-ViT-B-32-laion2B-s34B-b79K\snapshots\1a25a446712ba5ee05982a381eed697ef9b435cf"
    )
model = CLIPModel.from_pretrained(str(model_dir), local_files_only=True).eval()
processor = CLIPProcessor.from_pretrained(str(model_dir), local_files_only=True)
source_root = Path(r"C:\Users\shiya\Downloads\HTC PRODUCT_TO IN BESTHOMZ")
products_root = Path(r"C:\Users\shiya\Videos\besthomz\public\Products")
report_path = Path(
    r"C:\Users\shiya\.copilot\session-state\f3303c08-a627-49b6-82c2-cdbe82620be7\files\group-match-candidates.csv"
)
extensions = {".jpg", ".jpeg", ".png", ".webp", ".avif"}
rows = []


def embed(paths):
    batches = []
    for start in range(0, len(paths), 16):
        images = []
        for path in paths[start : start + 16]:
            with Image.open(path) as image:
                images.append(image.convert("RGB"))
        pixels = processor(images=images, return_tensors="pt")["pixel_values"]
        with torch.inference_mode():
            vectors = model.visual_projection(
                model.vision_model(pixel_values=pixels).pooler_output
            )
        batches.append(normalize(vectors, dim=-1))
    return torch.cat(batches) if batches else torch.empty((0, 512))


def save():
    if not rows:
        return
    with report_path.open("w", newline="", encoding="utf-8-sig") as file:
        writer = csv.DictWriter(file, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)


for category_dir in sorted(path for path in source_root.iterdir() if path.is_dir()):
    generated_dir = products_root / category_dir.name / "_Other Generated"
    if not generated_dir.is_dir():
        continue
    originals = sorted(
        path
        for path in category_dir.iterdir()
        if path.is_file() and path.suffix.lower() in extensions
    )
    generated = sorted(
        path
        for path in generated_dir.iterdir()
        if path.is_file() and path.suffix.lower() in extensions
    )
    if not originals or not generated:
        continue
    print("Encoding", category_dir.name, len(originals), len(generated), flush=True)
    similarities = embed(originals) @ embed(generated).T

    groups = defaultdict(list)
    if category_dir.name == "DS8":
        for index, path in enumerate(generated):
            references = re.findall(r"data_image_image_(\d+)", path.name, re.I)
            for reference in set(references):
                groups["reference_" + reference].append(index)
    else:
        for index, path in enumerate(generated):
            match = re.match(r"(\d+)_", path.name)
            if match:
                groups["batch_" + str((int(match.group(1)) - 1) // 4 + 1)].append(
                    index
                )
    groups = {key: values for key, values in groups.items() if len(values) == 4}
    if not groups:
        print("No four-file groups", category_dir.name, flush=True)
        continue

    keys = list(groups)
    values_by_group = torch.stack(
        [
            similarities[:, indexes].topk(3, dim=1).values.mean(1)
            for indexes in (groups[key] for key in keys)
        ],
        dim=1,
    )
    source_best = values_by_group.argmax(dim=0)
    for source_index, source in enumerate(originals):
        top_values, top_indices = values_by_group[source_index].topk(
            min(5, len(keys))
        )
        candidates = []
        for rank, (score, group_index) in enumerate(zip(top_values, top_indices)):
            group_index = group_index.item()
            group_key = keys[group_index]
            group_files = [generated[i].name for i in groups[group_key]]
            product_margin = (
                values_by_group[source_index, group_index]
                - values_by_group[:, group_index].topk(2).values[1]
            ).item() if len(originals) > 1 else 1.0
            candidates.append(
                {
                    "rank": rank + 1,
                    "group": group_key,
                    "score": round(score.item(), 5),
                    "source_is_group_winner": source_best[group_index].item()
                    == source_index,
                    "product_margin": round(product_margin, 5),
                    "files": group_files,
                }
            )
        rows.append(
            {
                "category": category_dir.name,
                "source": source.name,
                "candidates": candidates,
            }
        )
    for row in rows:
        if row["category"] == category_dir.name:
            row["candidates"] = repr(row["candidates"])
    save()
    print("Saved", category_dir.name, len(rows), flush=True)

print("Done", len(rows), report_path, flush=True)
