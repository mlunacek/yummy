<template>
     <div>
        <section class="">
             <div class="container is-fluid">
                <p class="subtitle">
                    <!-- {{this.shoppingList}} -->
                </p>

            <table class="table is-bordered is-fullwidth">
            <tbody>
                    <tr v-for="(item, key) in this.shoppingList" @click="toggleRow(key)" :key="key" :class="selected(item)">
                        <td > {{key}} </td>
                        <td > {{item.quantity}} </td>
                        <td > {{item.unit}} </td>
                    </tr>

            </tbody>
            </table>


            </div> 
        </section>
  </div>
</template>
<script>
export default {

     
    
     methods: {
         toggleRow(key){
            console.log(key)
            this.$store.commit('toggleShoppingList', key)
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
            get () {
                return this.$store.getters.shoppingList();
            },
        },
    },
}
</script>