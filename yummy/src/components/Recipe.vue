<template>
    <div>
      <section class="">
        <div class="container is-fluid">

                <p class="subtitle">
                <label class="checkbox">
                    <input type="checkbox" v-model="recipe.active" @click="toggleRecipe(recipe.id)">
                </label>
                 {{ this.recipe.title }}
                </p>
                <p> <strong>Process</strong> </p>
                <br>
                <div  v-for="(step, index) in this.process" :key="index">
                    {{step}}
                </div>
                <br>
                <p> <strong>Ingredients</strong> </p>
                <br>
                <table class="table is-bordered is-fullwidth">
                <tbody>
                    <tr v-for="step in this.ingredients" :key="step.name">
                        <td> {{step.name}} </td>
                        <td> {{step.quantity}} </td>
                        <td> {{step.unit}} </td>
                    </tr>

                </tbody>
                </table>

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