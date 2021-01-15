import glob
import os
import json

images = [ os.path.split(x)[1] for x in glob.glob("public/images/*.png")]
filenames = sorted(glob.glob("../recipes/*.json"))

filenames = [ x for x in filenames if x.find("000_template")<0]

recipes = []
print("\n\n")
for filename in filenames:
    image_filename = os.path.split(filename)[1].replace(".json", ".png")
    if image_filename in images:
        data = json.loads(open(filename).read())
        data['image'] = "/images/{}".format(image_filename)
        data['active'] = "false"
        recipes.append(data)
    else:
        print(filename, "does not have an image")


print("\n", len(recipes))
print("\n\n")

with open("public/recipes.json", 'w') as outfile:
    outfile.write(json.dumps(recipes, indent=4))

