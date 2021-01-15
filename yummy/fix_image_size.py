import os
import glob
from PIL import Image

filenames = glob.glob("public/images/*.png")
print("\n")

for filename in filenames:
    print(filename)
    image = Image.open(filename)
    new_image = image.resize((300, 300))
    new_image.save(filename)

print("\n")
