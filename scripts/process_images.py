import os
from PIL import Image
from rembg import remove

def process():
    src_dir = "public/assets/source"
    out_dir = "public/assets/webp"
    os.makedirs(out_dir, exist_ok=True)
    
    print("Processing institutional & office images...")
    images_to_convert = {
        "ABB_Office.avif": "ABB_Office.webp",
        "RRCE.jpg": "RRCE.webp",
        "Tungal.avif": "Tungal.webp",
        "Sathya_sai_grama.jpg": "Sathya_sai_grama.webp"
    }
    
    for src_file, out_file in images_to_convert.items():
        src_path = os.path.join(src_dir, src_file)
        out_path = os.path.join(out_dir, out_file)
        if os.path.exists(src_path):
            img = Image.open(src_path)
            img = img.convert("RGB")
            img.save(out_path, "WEBP", quality=85)
            print(f"Converted {src_file} -> {out_file} ({img.size})")
        else:
            print(f"Warning: {src_path} not found")
            
    # Process Hero Portrait
    hero_src = os.path.join(src_dir, "IMG_20260228_113928.jpg")
    if os.path.exists(hero_src):
        print("Processing Hero Portrait...")
        img = Image.open(hero_src)
        print("Original hero size:", img.size)
        
        # Save optimized WebP full image (speaker & hero background)
        w, h = img.size
        max_h = 1800
        if h > max_h:
            new_w = int(w * (max_h / h))
            img_resized = img.resize((new_w, max_h), Image.Resampling.LANCZOS)
        else:
            img_resized = img
            
        hero_webp = os.path.join(out_dir, "prajwal_hero.webp")
        img_resized.save(hero_webp, "WEBP", quality=88)
        print(f"Saved {hero_webp} ({img_resized.size})")
        
        # Create avatar crop focused on face
        rw, rh = img_resized.size
        left = int(rw * 0.30)
        top = int(rh * 0.32)
        right = int(rw * 0.70)
        bottom = top + (right - left)
        avatar = img_resized.crop((left, top, right, bottom))
        avatar = avatar.resize((400, 400), Image.Resampling.LANCZOS)
        avatar.save(os.path.join(out_dir, "prajwal_avatar.webp"), "WEBP", quality=90)
        print("Saved avatar crop (400x400)")
        
        # Create Cutout with rembg
        print("Generating subject cutout via rembg (transparent background)...")
        h_cutout = 1400
        w_cutout = int(w * (h_cutout / h))
        img_for_cutout = img.resize((w_cutout, h_cutout), Image.Resampling.LANCZOS)
        cutout = remove(img_for_cutout)
        cutout_webp = os.path.join(out_dir, "prajwal_cutout.webp")
        cutout.save(cutout_webp, "WEBP", quality=90)
        print(f"Saved {cutout_webp} ({cutout.size})")
        
    print("All image processing complete!")

if __name__ == "__main__":
    process()
