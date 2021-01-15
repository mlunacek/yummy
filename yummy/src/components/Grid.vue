

<template>
    <div>
        <section>
            <div class="container is-fluid">




<div class="columns is-multiline is-mobile">

<div v-for="(recipe, index) in recipes" :key="index" class="column is-one-fifth-desktop is-6-mobile">
   <div class="card">
        <div class="card-image">
            <figure class="image is-2by2">
              <img :src="recipe.image" >
            </figure>
        </div>
        <footer class="card-footer">
            <!-- <label class="checkbox">
                <input type="checkbox">
            </label> -->
            
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
        }

    },

    computed:{
        recipes: {
            get () {
                return this.$store.getters.recipes();
            },
            // set (value) {
            //     this.$store.dispatch('updateRecipes', value)
            // }
        },
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

</style>