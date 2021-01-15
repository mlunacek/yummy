<template>
     <div>
        <section class="">
             <div class="container is-fluid">
           
<div class="columns is-multiline is-mobile">

    <div class="column is-one-third-desktop">
               <div class="subtitle">
                        Fresh
                    </div>  
        <table class="table is-bordered is-fullwidth">
            <tbody>
                    <tr v-for="(item) in this.fresh" @click="toggleRow(item.name)" :key="item.name" :class="selected(item)">
                        <!-- <td > {{key}} </td> -->
                        <td > {{item.name}} </td>
                        <td > {{item.quantity}} </td>
                        <td > {{item.unit}} </td>
                        <!-- <td > {{item.category}} </td> -->
                    </tr>
            </tbody>
        </table>
    </div>

    <div class="column is-one-third-desktop">
          <div class="subtitle">
            Spices
          </div>  
        <table class="table is-bordered is-fullwidth">
            <tbody>
                    <tr v-for="(item) in this.spice" @click="toggleRow(item.name)" :key="item.name" :class="selected(item)">
                        <!-- <td > {{key}} </td> -->
                        <td > {{item.name}} </td>
                        <td > {{item.quantity}} </td>
                        <td > {{item.unit}} </td>
                        <!-- <td > {{item.category}} </td> -->
                    </tr>
            </tbody>
        </table>
    </div>

    <div class="column is-one-third-desktop">
          <div class="subtitle">
            All other
          </div>  
        <table class="table is-bordered is-fullwidth">
            <tbody>
                    <tr v-for="(item) in this.other" @click="toggleRow(item.name)" :key="item.name" :class="selected(item)">
                        <!-- <td > {{key}} </td> -->
                        <td > {{item.name}} </td>
                        <td > {{item.quantity}} </td>
                        <td > {{item.unit}} </td>
                        <!-- <td > {{item.category}} </td> -->
                    </tr>
            </tbody>
        </table>
    </div>


</div>
<hr>
<br>
<br>


            </div> 
        </section>
  </div>
</template>
<script>
export default {

     methods: {
         toggleRow(key){
            this.$store.dispatch('toggleShoppingList', key)
         },

         selected(item){
             if( item.active === true){
                 return "is-selected"
             }
             return ""
         }
     },

     computed:{
    
        shoppingList: {
            get() {
                return this.$store.getters.shoppingList();
            }
        },
        fresh: {
            get(){
                return this.$lodash.filter(this.$store.getters.shoppingList(), function(d){
                    return d['category'] === "fresh"
                });
            }
        },
        other: {
            get(){
                return this.$lodash.filter(this.$store.getters.shoppingList(), function(d){
                    return !['fresh', 'spice'].includes(d['category'])
                });
            }
        },
        spice: {
            get(){
                return this.$lodash.filter(this.$store.getters.shoppingList(), function(d){
                    return d['category'] === "spice"
                });
            }
        },
        
    },
}
</script>