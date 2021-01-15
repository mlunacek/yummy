<template>
 
    <div>
        <section class="">
            <div class="container is-fluid">
                    <!-- <div v-for="(recipe, index) in recipes" :key="index"> -->

 <table class="table is-bordered ">
    <tbody>
        <tr v-for="(recipe, index) in recipes" :key="index">
         
            <!-- <td >
                <figure class="image is-48x48">
                    <router-link :to="{name:'recipe', params:{id:recipe.id}}">
                        <img :src="recipe.image" >
                    </router-link>
                </figure>
            </td>     -->

            <td width=40>    
                <label class="checkbox">
                    <input type="checkbox" v-model="recipe.active" @click="toggleRecipe(recipe.id)">
                </label>
            </td>    

            <td>  

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