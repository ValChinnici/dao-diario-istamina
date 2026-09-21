from PIL import Image, ImageDraw, ImageFont
import os

OUT = "public/icons"
os.makedirs(OUT, exist_ok=True)

BG = (18, 21, 26, 255)       # --bg
SURFACE = (35, 40, 51, 255)  # --surface-2
HIGH = (202, 125, 117, 255)  # --high
TEXT = (233, 235, 238, 255)  # --text

def make_icon(size, maskable=False, path=None):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    pad = int(size * 0.12) if maskable else 0
    # rounded square background
    radius = int(size * 0.22)
    d.rounded_rectangle([pad, pad, size - pad, size - pad], radius=radius, fill=BG)
    # inner plate circle
    margin = size * (0.30 if maskable else 0.24)
    d.ellipse([margin, margin, size - margin, size - margin], fill=SURFACE, outline=HIGH, width=max(2, size // 40))
    # exclamation mark (attenzione)
    cx = size / 2
    bar_w = max(2, size * 0.045)
    bar_top = size * 0.36
    bar_bottom = size * 0.58
    d.rounded_rectangle([cx - bar_w, bar_top, cx + bar_w, bar_bottom], radius=bar_w, fill=HIGH)
    dot_r = bar_w * 1.15
    dot_cy = size * 0.66
    d.ellipse([cx - dot_r, dot_cy - dot_r, cx + dot_r, dot_cy + dot_r], fill=HIGH)
    img.save(path)

make_icon(192, maskable=False, path=f"{OUT}/icon-192.png")
make_icon(512, maskable=False, path=f"{OUT}/icon-512.png")
make_icon(192, maskable=True, path=f"{OUT}/icon-maskable-192.png")
make_icon(512, maskable=True, path=f"{OUT}/icon-maskable-512.png")
make_icon(180, maskable=False, path=f"{OUT}/apple-touch-icon.png")
make_icon(32, maskable=False, path=f"{OUT}/favicon-32.png")

print("icons generated")
