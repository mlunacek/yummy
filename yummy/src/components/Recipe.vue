<template>
    <div>
      <section>

        <div class="container is-fluid">

            <div class="columns is-mobile">

                <div class="column ">
                    <label class="checkbox">
                        <input type="checkbox" v-if="this.recipe" v-model="recipe.active" @click="toggleRecipe(recipe.id)">
                    </label>

                    <div class="subtitle titleadjust" v-if="this.recipe">
                        {{ this.recipe.title }}
                    </div>

                </div>

            </div>

            <div class="columns is-desktop">

                <div class="column is-third-desktop is-mobile">
                    <figure class="image">
                            <img :src="recipe.image" >
                    </figure>        
                </div>

                <div class="column is-third-desktop is-mobile">
            
                    <div class="subtitle">
                        Process
                    </div>  
                        
                    <div  v-for="(step, index) in this.process" :key="index">
                        {{index+1}}. {{step}}
                    </div>

                </div>

                <div class="column is-third-desktop is-mobile">
                    <div class="subtitle">
                        Process
                    </div>  
                    <table class="table is-bordered">
                    <tbody>
                        <tr v-for="step in this.ingredients" :key="step.name">
                            <td> {{step.name}} </td>
                            <td> {{step.quantity}} </td>
                            <td> {{step.unit}} </td>
                        </tr>

                    </tbody>
                    </table>

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
        recipe: {
            get () {
                return this.$store.getters.recipe(this.$route.params.id);
            }
        },
        process: {
            get () {
                return this.$store.getters.recipe(this.$route.params.id)['process'];
            }
        },
        ingredients: {
            get () {
                return this.$store.getters.recipe(this.$route.params.id)['ingredients'];
            }
        }
    },
   
}
</script>

<style scoped>
.checkbox{
    float: left;
    clear: none;
    margin-top: 10px;
}

.titleadjust{
    /* margin-top: 20px; */
    padding-top: 10px;
}

.desktop{
    /* width: 600px; */
}

</style>