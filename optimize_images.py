import os
from PIL import Image

def optimize_images(directory):
    for filename in os.listdir(directory):
        if filename.endswith(".png"):
            filepath = os.path.join(directory, filename)
            webp_filepath = os.path.join(directory, filename[:-4] + ".webp")
            
            try:
                img = Image.open(filepath)
                # Convert to RGB if RGBA and saving as WebP (WebP supports alpha, but good to be careful. WebP via Pillow supports alpha directly)
                img.save(webp_filepath, 'webp', quality=85)
                print(f"Optimized: {filename} -> {os.path.basename(webp_filepath)}")
                # Optional: Delete original PNG to save space since we are fully migrating
                # os.remove(filepath) 
            except Exception as e:
                print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    assets_dir = "./public/assets/images"
    print(f"Optimizing images in {assets_dir}...")
    optimize_images(assets_dir)
