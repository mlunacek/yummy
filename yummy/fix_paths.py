import os
import json

data = json.loads(open("../docs/recipes.json").read())

for item in data:
    print(item['image'])
    item['image'] = "/yummy" + item['image']

for item in data:
    print(item['image'])

with open("../docs/recipes.json", "w") as outfile:
    outfile.write(json.dumps(data))