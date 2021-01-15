import glob
import os
import json

def update_recipe(data, ingredients):
    data['image'] = "/images/{}".format(image_filename)
    data['active'] = "false"
    data['kind'] = data['kind'].lower()
    for item in data['ingredients']:
        item['category'] = ingredients.get(item['name']).get('category', "")
        # print(item['category'])
    return data

if __name__ == "__main__":

    images = [ os.path.split(x)[1] for x in glob.glob("images/*.png")]
    filenames = sorted(glob.glob("recipes/*.json"))
    filenames = [ x for x in filenames if x.find("000_template")<0]

    # update ingredients list
    categories = json.loads(open("ingredients/categories.json").read())

    ingredients = {}
    for filename in filenames:
        data = json.loads(open(filename).read())
        tmp = data['ingredients']
        for item in tmp:
            ingredients[item['name']] = categories.get(item['name'], item)
            ingredients[item['name']]['category'] = ingredients[item['name']].get('category', "")

    print("not categorized")
    for key in sorted(ingredients.keys()):
        if ingredients[key].get('category') == "":
            print(key)
    print("\n")
        
    with open("ingredients/categories.json", 'w') as outfile:
        outfile.write(json.dumps(ingredients, indent=4))

    recipes = []
    for filename in filenames:
        image_filename = os.path.split(filename)[1].replace(".json", ".png")
        if image_filename in images:
            data = json.loads(open(filename).read())
            data = update_recipe(data, ingredients)
            recipes.append(data)
        else:
            print(filename, "does not have an image")

    print("\n", len(recipes), "\n")

    with open("../yummy/public/recipes.json", 'w') as outfile:
        outfile.write(json.dumps(recipes, indent=4))
    with open("recipes.json", 'w') as outfile:
        outfile.write(json.dumps(recipes, indent=4))

    


