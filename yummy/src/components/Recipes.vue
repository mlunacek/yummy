<template>
 
    <div>
        <section class="">
            <div class="container is-fluid">
                    <!-- <div v-for="(recipe, index) in recipes" :key="index"> -->



<div class="subtitle">
    Breakfast
</div> 
 <table class="table is-bordered is-fullwidth is-narrow">
    <tbody>
        <tr v-for="(recipe) in this.breakfast" :key="recipe.title">
            <td style="width: 40px;">    
                <label class="checkbox">
                    <input type="checkbox" v-model="recipe.active" @click="toggleRecipe(recipe.id)">
                </label>
            </td>    
            <td>  
                <!-- <div class="row"> -->
                <router-link :to="{name:'recipe', params:{id:recipe.id}}" >
                                {{recipe.title}}
                </router-link>
                <!-- </div> -->
            </td>
        </tr>
    </tbody>
</table>

<div class="subtitle">
    Lunch
</div>  
 <table class="table is-bordered is-fullwidth is-narrow">
    <tbody>
        <tr v-for="(recipe) in this.lunch" :key="recipe.title">
            <td style="width: 40px;">  
                <label class="checkbox">
                    <input type="checkbox" v-model="recipe.active" @click="toggleRecipe(recipe.id)">
                </label>
            </td>    
            <td>  
                <!-- <div class="row"> -->
                <router-link :to="{name:'recipe', params:{id:recipe.id}}" >
                                {{recipe.title}}
                </router-link>
                <!-- </div> -->
            </td>
        </tr>
    </tbody>
</table>

<div class="subtitle">
    Dinner
</div>  
 <table class="table is-bordered is-fullwidth is-narrow">
    <tbody>
        <tr v-for="(recipe) in this.dinner" :key="recipe.title">
            <td style="width: 40px;">   
                <label class="checkbox">
                    <input type="checkbox" v-model="recipe.active" @click="toggleRecipe(recipe.id)">
                </label>
            </td>    
            <td>  
                <!-- <div class="row"> -->
                <router-link :to="{name:'recipe', params:{id:recipe.id}}" >
                    {{recipe.title}}
                </router-link>
                <!-- </div> -->
            </td>
        </tr>
    </tbody>
</table>


<br>
<br>
<br>
<br>                
                  
                                    
                      
              
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
        }
    },

}
</script>

<style scoped>
.checkbox{
    float: left;
    /* margin-top: 10px; */
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