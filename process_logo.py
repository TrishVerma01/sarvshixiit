import sys
from PIL import Image

def remove_white_and_crop(file_path):
    img = Image.open(file_path)
    img = img.convert("RGBA")
    
    data = img.getdata()
    newData = []
    
    # We define "white" as RGB values close to 255.
    threshold = 240
    for item in data:
        # Check if the pixel is almost white
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            newData.append((255, 255, 255, 0)) # Transparent
        else:
            newData.append(item)
            
    img.putdata(newData)
    
    # Now get the bounding box of non-transparent pixels to crop tight
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    img.save(file_path, "PNG")
    print(f"Successfully processed {file_path}")

if __name__ == '__main__':
    remove_white_and_crop("public/logo.png")
