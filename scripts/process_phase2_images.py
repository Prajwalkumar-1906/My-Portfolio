import os
from PIL import Image

def process_phase2():
    src_dir = "public/assets/source"
    out_dir = "public/assets/webp"
    os.makedirs(out_dir, exist_ok=True)

    # 1. Process Premamrutham Hall (Values & Service)
    hall_src = os.path.join(src_dir, "IMG_20260614_122236.jpg")
    if os.path.exists(hall_src):
        img = Image.open(hall_src)
        print("Premamrutham Hall size:", img.size)
        
        # Wide cinematic banner (max 1920 width)
        w, h = img.size
        max_w = 1920
        if w > max_w:
            new_h = int(h * (max_w / w))
            banner = img.resize((max_w, new_h), Image.Resampling.LANCZOS)
        else:
            banner = img
        banner = banner.convert("RGB")
        banner.save(os.path.join(out_dir, "premamrutham_banner.webp"), "WEBP", quality=88)
        print("Saved premamrutham_banner.webp")

        # Face/Subject crop (Prajwal is standing on steps near bottom center)
        # Prajwal is roughly at x: 35%-45%, y: 55%-90%
        crop_w = int(w * 0.35)
        crop_h = int(h * 0.50)
        left = int(w * 0.35)
        top = int(h * 0.48)
        right = left + crop_w
        bottom = top + crop_h
        subject = img.crop((left, top, right, bottom))
        subject = subject.resize((600, 600), Image.Resampling.LANCZOS).convert("RGB")
        subject.save(os.path.join(out_dir, "premamrutham_avatar.webp"), "WEBP", quality=90)
        print("Saved premamrutham_avatar.webp")

    # 2. Process The 3 Profile Images (Just Browsing, Book a Session, Networker)
    profiles = [
        ("profile_just_browsing.jpg", "avatar_browse.webp", "full_browse.webp"),
        ("profile_sessions.jpg", "avatar_sessions.webp", "full_sessions.webp"),
        ("profile_networker.jpg", "avatar_networker.webp", "full_networker.webp")
    ]

    for src_name, avatar_out, full_out in profiles:
        p_path = os.path.join(src_dir, src_name)
        if os.path.exists(p_path):
            p_img = Image.open(p_path)
            w, h = p_img.size
            print(f"Processing {src_name} ({w}x{h})...")

            # Save optimized full WebP
            full_img = p_img.convert("RGB")
            full_img.save(os.path.join(out_dir, full_out), "WEBP", quality=88)

            # Create focused upper-body/face avatar crop (centered horizontally, top 10% to 55%)
            # Each photo is 720x1280. Face/upper chest is roughly top: 120px to 620px, x: 100px to 600px
            crop_size = min(w, int(h * 0.48))
            c_left = (w - crop_size) // 2
            c_top = int(h * 0.12) if "networker" in src_name else int(h * 0.15) if "sessions" in src_name else int(h * 0.20)
            c_right = c_left + crop_size
            c_bottom = c_top + crop_size

            # Boundary checks
            c_bottom = min(h, c_bottom)
            c_top = max(0, c_bottom - crop_size)

            avatar = p_img.crop((c_left, c_top, c_right, c_bottom))
            avatar = avatar.resize((450, 450), Image.Resampling.LANCZOS).convert("RGB")
            avatar.save(os.path.join(out_dir, avatar_out), "WEBP", quality=90)
            print(f"Saved {avatar_out}")

    # Ensure avatar_recruiter.webp is present (derived from prajwal_avatar.webp)
    recruiter_src = os.path.join(out_dir, "prajwal_avatar.webp")
    if os.path.exists(recruiter_src):
        r_img = Image.open(recruiter_src)
        r_img.save(os.path.join(out_dir, "avatar_recruiter.webp"), "WEBP", quality=90)
        print("Saved avatar_recruiter.webp")

    print("Phase 2 image processing successfully completed!")

if __name__ == "__main__":
    process_phase2()
