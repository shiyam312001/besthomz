from datetime import datetime
from pathlib import Path
import hashlib
import shutil


products_root = Path(r"C:\Users\shiya\Videos\besthomz\public\Products")
archive_root = Path(
    r"C:\Users\shiya\Videos\besthomz-image-archive"
) / ("gallery-dedup-" + datetime.now().strftime("%Y%m%d-%H%M%S"))
keep_standard = {
    "01_front.webp",
    "02_left.webp",
    "03_right.webp",
    "04_lifestyle.webp",
}
keep_tv_120 = {
    "Ornate dark TV cabinet with stone top-1.webp",
    "Ornate Dark TV Cabinet with Stone Top-2.webp",
    "Ornate dark TV cabinet with stone top-4.webp",
    "Ornate TV Cabinet in Warm Living Room-3.webp",
}
extensions = {".jpg", ".jpeg", ".png", ".webp", ".avif"}
plans = []


def digest(path):
    hasher = hashlib.sha256()
    with path.open("rb") as image:
        for chunk in iter(lambda: image.read(1024 * 1024), b""):
            hasher.update(chunk)
    return hasher.hexdigest()


for category in ("OFFICE CHAIR", "TV UNIT"):
    for folder in (products_root / category).iterdir():
        if not folder.is_dir() or folder.name.startswith("_"):
            continue
        current = [
            path
            for path in folder.iterdir()
            if path.is_file() and path.suffix.lower() in extensions
        ]
        if len(current) == 4:
            continue
        keep_names = (
            keep_tv_120
            if category == "TV UNIT" and folder.name == "TV-120-23100"
            else keep_standard
        )
        kept = [path for path in current if path.name in keep_names]
        extra = [path for path in current if path.name not in keep_names]
        if len(kept) != 4 or len(current) != 8 + (4 if len(keep_names) == 4 and folder.name == "TV-120-23100" else 0):
            raise ValueError(
                f"Unexpected image layout in {category}/{folder.name}: "
                f"{len(current)} images, {len(kept)} selected"
            )
        plans.append((category, folder, kept, extra))

if len(plans) != 16:
    raise ValueError(f"Expected 16 overfull folders, found {len(plans)}")

for category, folder, kept, extra in plans:
    archive = archive_root / category / folder.name
    archive.mkdir(parents=True, exist_ok=False)
    for path in extra:
        shutil.copy2(path, archive / path.name)
    for path in extra:
        if digest(path) != digest(archive / path.name):
            raise IOError(f"Archive verification failed for {path}")

for _, _, _, extra in plans:
    for path in extra:
        path.unlink()

for category, folder, kept, _ in plans:
    active = [
        path
        for path in folder.iterdir()
        if path.is_file() and path.suffix.lower() in extensions
    ]
    if len(active) != 4 or {path.name for path in active} != {
        path.name for path in kept
    }:
        raise IOError(f"Final image count verification failed for {folder}")
    print(category, folder.name, "now has four active mapped images")

print("Archived copies:", archive_root)
