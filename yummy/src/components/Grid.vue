

<template>
    <div>
        <section>
            <div class="container is-fluid">

<!-- <p> meals: {{this.meals}} </p> <p> servings: {{this.servings}} </p> -->

<div class="columns is-multiline is-mobile">

<div v-for="(recipe, index) in this.sorted_recipies" :key="index" class="column is-one-fifth-desktop is-6-mobile">
   <div class="card">

        <div class="card-image">
            <router-link :to="{name:'recipe', params:{id:recipe.id}}" class="card-footer-item">
               <figure class="image is-2by2">
              <img :src="recipe.image" >
            </figure>
            </router-link>

            <!-- <label class="checkbox">
                <input type="checkbox">
            </label> -->

        </div>

        <footer :class="selected(recipe)">

            <router-link :to="{name:'recipe', params:{id:recipe.id}}" class="card-footer-item">
                {{recipe.title}}
            </router-link>
          
        </footer>
    </div>
</div>


  


</div>




            </div>
        </section>
    </div>
</template>


<script>
export default {
    
    methods:{

        toggleRecipe(recipe){
            this.$store.dispatch('updateRecipe', recipe)
        },

        selected(recpipe){
            if(recpipe.active===true){
                return "card-footer selected";
            }
            return "card"
        }

    },

    computed:{
        recipes: {
            get () {
                return this.$store.getters.recipes();
            },
        },
        breakfast: {
            get(){
                return this.$lodash.filter(this.recipes, function(d){
                    return d['kind'] === "breakfast"
                })
            },
        },
        lunch: {
            get(){
                return this.$lodash.filter(this.recipes, function(d){
                    return d['kind'] === "lunch"
                })
            },
        },
        dinner: {
            get(){
                return this.$lodash.filter(this.recipes, function(d){
                    return d['kind'] === "dinner"
                })
            },
        },
        sorted_recipies:{
            get(){
                return this.breakfast.concat(this.lunch).concat(this.dinner);
            }
        },
        selected_recipes: {
            get(){
                return this.$lodash.filter(this.recipes, function(d){
                    return d['active'] === true
                })
            }
        },
        meals:{
            get(){
                return this.selected_recipes.length;
            }
        },
        servings: {
            get(){
                let num_meals = 0;
                for(let i=0; i<this.selected_recipes.length; i+=1){
                    num_meals+=this.selected_recipes[i]['servings'];
                }
                return num_meals;
            }
        }

    },

}
</script>

<style scoped>
.checkbox{
    float: left;
    margin-top: 10px;
    padding: 0;
    margin-bottom: 0px;
    margin-left: 0px;
    margin-right: 0px;
}

.row{
    padding-top: 5px;
    float: left;
    word-wrap: normal;

}

.row a{
    vertical-align: middle;
}

.desktop{
    /* width: 600px; */
}

.selected {
    border-color: #00d1b2;
    border-width: 3px;
}
.card-footer{
    background-color: white;
    border-width: 3px;
}

</style>