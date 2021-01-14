import Vue from "vue";
import Vuex from "vuex";

import lodash from "lodash";

Vue.use(Vuex);

export default function makeStore(){

    return new Vuex.Store({
        
        state: {
            'recipes': [],
            'active': {},
            'list': {},
        },

        getters: {
            recipes: (state ) => {
                return () => {
                    return state.recipes;
                }
            },

            recipe: (state ) => {
                return (id) => {
                    for (let i = 0; i < state.recipes.length; i++) {
                        if(id == state.recipes[i]['id']){
                            return state.recipes[i];
                        }
                    }
                }
            },

            shoppingList: (state) => {
                return () => {
                    return state.list;
                }
            }
        },

        mutations: {

            updateRecipes (state, data){
                
                // Add missing information
                for (let i = 0; i < data.length; i++) {
                    data[i]['id'] = i;
                    data[i]['active'] = false;
                    state.active[data[i]['id']] = data[i]['active'];
                }
                state.recipes = data;

                // Shopping list
                // filter recipes in list
                let selected = []
                for(let i=0; i<state.recipes.length; i++){
                    state.recipes[i]['active'] = state.active[state.recipes[i]['id']]
                    if( state.active[state.recipes[i]['id']]==true){
                        console.log(state.recipes[i])
                        selected.push(state.recipes[i])
                    }
                }
         
                // Create the shopping list
                let combined = {};
                for (let i = 0; i < selected.length; i++) {
                    const ingredients = selected[i]['ingredients'];
                    for(let j=0; j<ingredients.length; j++){
                        const current = lodash.get(lodash.get(combined, ingredients[j]['name'], {'quantity': 0}), 'quantity');
                        // const current = 0;
                        combined[ingredients[j]['name']] = {'quantity': ingredients[j]['quantity'] + current,
                                                            'unit': ingredients[j]['unit'],
                                                            'active': false,
                                                            }
                    }
                }

                state.list = combined
            
                
                // const tmp = JSON.stringify(state);
                // window.localStorage.setItem('store', tmp);
            },

            updateShoppingList (state, recipe){
                // Toggle recipe
                state.active[recipe] = !state.active[recipe];

                // filter recipes in list
                let selected = []
                for(let i=0; i<state.recipes.length; i++){
                    state.recipes[i]['active'] = state.active[state.recipes[i]['id']]
                    if( state.active[state.recipes[i]['id']]==true){
                        console.log(state.recipes[i])
                        selected.push(state.recipes[i])
                    }
                }
         
                // Create the shopping list
                let combined = {};
                for (let i = 0; i < selected.length; i++) {
                    const ingredients = selected[i]['ingredients'];
                    for(let j=0; j<ingredients.length; j++){
                        const current = lodash.get(lodash.get(combined, ingredients[j]['name'], {'quantity': 0}), 'quantity');
                        // const current = 0;
                        combined[ingredients[j]['name']] = {'quantity': ingredients[j]['quantity'] + current,
                                                            'unit': ingredients[j]['unit'],
                                                            'active': false,
                                                            }
                    }
                }

                state.list = combined
            },

            toggleShoppingList (state, key){
                state.list[key]['active'] = !state.list[key]['active']
            }

        },

        actions: {

            fetchRecipes({ commit }, { url, callback })  {    
                Vue.http.get(url)
                    .then(function(response){
                        commit("updateRecipes", response.body);
                        callback();
                    })
                    .catch(function(error){
                        console.log(error);
                    });
            },
        }




    });


}