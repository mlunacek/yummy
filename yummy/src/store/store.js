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

            updateFromLocal(state){
                const local_store = JSON.parse(window.localStorage.getItem('store'));
                console.log(local_store);
                console.log(lodash.get(local_store, 'recipes'));


                console.log("import from local")
                state.recipes = lodash.get(local_store, 'recipes', []);
                state.active = lodash.get(local_store, 'active', {});
                state.list = lodash.get(local_store, 'list', {});
                
                console.log(state.recipes)
                
                for (let i = 0; i < state.recipes.length; i++) {
                    console.log("local", i, state.recipes[i]['id'], state.recipes[i]['active']);
                }


            },

            updateRecipes (state, data){
                
                // Add missing information
                for (let i = 0; i < data.length; i++) {
                    data[i]['id'] = i;
                    const tmp = lodash.get(lodash.get(state, i, {}), 'active', false);
                    console.log(i, data[i]['id'], tmp);
                    data[i]['active'] = tmp;
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
            
                const tmp = JSON.stringify(state);
                window.localStorage.setItem('store', tmp);
                console.log("set state");
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

                const tmp = JSON.stringify(state);
                window.localStorage.setItem('store', tmp);
                console.log("set state");
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

            fetchLocalStorage({commit}){
                commit("updateFromLocal");
            }


        }




    });


}