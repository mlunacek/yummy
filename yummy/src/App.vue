// App.vue

<template>
  <div>

      <div class="tabs">
        <ul>
          <router-link :to="{name:'recipes'}">
            Recipes
          </router-link>
          <router-link :to="{name:'grid'}">
            Grid
          </router-link>
          <router-link :to="{name:'list'}">
            Shopping List {{num_recipes}}
          </router-link>
        </ul>
      </div>

    <main>
        <router-view></router-view>
    </main>


  </div>
</template>

<script>
export default {

  created() {
    this.$store.dispatch("fetchRecipes", { url: "recipes.json", 
                                          callback: this.onData })   
  },

  computed:{
    num_recipes: {
      get () {
        const num_rec = this.$lodash.filter(this.$store.getters.recipes(), function(d){return d.active}).length;
        if(num_rec === 0){
          return ""
        }
        return "(" + num_rec + ")"
      },
    }
  },

  methods:{
    onData(){
        console.log("done fetching");
    }
  }





}
</script>

<style>
input[type='checkbox'] {
    -webkit-appearance:none;
    width:25px;
    height:25px;
    background:white;
    border-radius:3px;
    border:1px solid rgb(38, 38, 39);
    float: left;
    clear: none;
    margin-left: 8px;
    margin-right: 8px;
}
input[type='checkbox']:checked {
    background: #00d1b2;
}
</style>