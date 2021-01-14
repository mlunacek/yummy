<template>
 
    <div>
        <section class="">
            <div class="container is-fluid">
                    <!-- <div v-for="(recipe, index) in recipes" :key="index"> -->

 <table class="table is-bordered is-fullwidth">
    <tbody>
        <tr v-for="(recipe, index) in recipes" :key="index">
         
            <td width=48>
                <figure class="image is-48x48">
                    <router-link :to="{name:'recipe', params:{id:recipe.id}}">
                        <img :src="recipe.image" >
                    </router-link>
                </figure>
            </td>    

            <td>    
                <label class="checkbox">
                    <input type="checkbox" v-model="recipe.active" @click="toggleRecipe(recipe.id)">
                </label>
            
                <div class='row'>
                <router-link :to="{name:'recipe', params:{id:recipe.id}}" >
                                {{recipe.title}}
                </router-link>
                </div>
            </td>

       

        </tr>
    </tbody>
</table>

                     
                  
                                    
                      
              
                <!-- </div> -->
            </div>
        </section>
    </div>

</template>
<script>
export default {
    
    methods:{

        toggleRecipe(recipe){
            this.$store.commit('updateShoppingList', recipe)
        }

    },

    computed:{
        recipes: {
            get () {
                return this.$store.getters.recipes();
            },
            set (value) {
                this.$store.commit('updateRecipes', value)
            }
        },
    },

    created() {
        window.addEventListener('beforeunload', function(event) {
            console.log(event);
            // Maybe save state here?
        });
    },

}
</script>

<style scoped>
.checkbox{
    float: left;
    margin-top: 10px;
}

.row{
    padding: 8px;
    float: left;
    height: 48px;

}

.row a{
    margin-top: 20px;
    vertical-align: middle;
}

</style>