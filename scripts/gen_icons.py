from PIL import Image, ImageDraw
import os

OUT = "public/icons"
os.makedirs(OUT, exist_ok=True)

BG = (18, 21, 26, 255)
HIGH = (211, 140, 132, 255)
ACCENT = (123, 178, 181, 255)

def make_icon(size, maskable=False, path=None):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    if maskable:
        d.rectangle([0, 0, size, size], fill=BG)
        art = size * 0.66
    else:
        pad = int(size * 0.0625)
        radius = int(size * 0.1875)
        d.rounded_rectangle([pad, pad, size - pad, size - pad], radius=radius, fill=BG)
        art = size * 0.78

    cx = cy = size / 2
    r_outer = art / 2
    ring_w = max(2, art * 0.085)

    d.ellipse([cx - r_outer, cy - r_outer, cx + r_outer, cy + r_outer], outline=HIGH, width=int(ring_w))

    r_inner = r_outer * 0.75
    d.ellipse([cx - r_inner, cy - r_inner, cx + r_inner, cy + r_inner], outline=ACCENT, width=int(ring_w))

    bar_w = max(2, art * 0.045)
    bar_top = cy - art * 0.19
    bar_bottom = cy + art * 0.06
    d.rounded_rectangle([cx - bar_w, bar_top, cx + bar_w, bar_bottom], radius=bar_w, fill=HIGH)
    dot_r = bar_w * 1.15
    dot_cy = cy + art * 0.16
    d.ellipse([cx - dot_r, dot_cy - dot_r, cx + dot_r, dot_cy + dot_r], fill=HIGH)

    img.save(path)

make_icon(192, maskable=False, path=f"{OUT}/icon-192.png")
make_icon(512, maskable=False, path=f"{OUT}/icon-512.png")
make_icon(192, maskable=True, path=f"{OUT}/icon-maskable-192.png")
make_icon(512, maskable=True, path=f"{OUT}/icon-maskable-512.png")
make_icon(180, maskable=False, path=f"{OUT}/apple-touch-icon.png")
make_icon(32, maskable=False, path=f"{OUT}/favicon-32.png")

print("icons generated")
