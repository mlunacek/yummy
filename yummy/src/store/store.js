import Vue from "vue";
import Vuex from "vuex";

import lodash from "lodash";

Vue.use(Vuex);

export default function makeStore(){

    return new Vuex.Store({
        
        state: {
            'recipes': [],
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

            UPDATE_FROM_LOCAL(state){
                console.log("update_from_local")
                const local_store = JSON.parse(window.localStorage.getItem('yummy_store'));
                state.recipes = lodash.get(local_store, 'recipes', []);
                state.list = lodash.get(local_store, 'list', {});
                for (let i = 0; i < state.recipes.length; i++) {
                    console.log("local", i, state.recipes[i]['id'], state.recipes[i]['active']);
                }
    
            },

            UPDATE_FROM_WEB (state, data){
                console.log("update_from_web")
                const local_store = JSON.parse(window.localStorage.getItem('yummy_store'));

                for (let i = 0; i < data.length; i++) {
                    data[i]['id'] = i;
                }
                
                if( data.length == local_store['recipes'].length){
                    // Add missing information
                    for (let i = 0; i < data.length; i++) {
                        data[i]['id'] = i;
                        data[i]['active'] = local_store['recipes'][i]['active'];
                    }
                }
                state.recipes = data;
            },

            SAVE_STATE (state ){
                console.log("saving state");
                const tmp = JSON.stringify(state);
                window.localStorage.setItem('yummy_store', tmp);
            },

            UPDATE_SHOPPING_LIST (state) {
                // Shopping list
                const local_store = JSON.parse(window.localStorage.getItem('yummy_store'));

                // filter recipes in list
                let selected = []
                for(let i=0; i<state.recipes.length; i++){
                    if( state.recipes[i]['active']===true){
                        selected.push(state.recipes[i])
                    }
                }

                // Create the shopping list
                let combined = {};
                for (let i = 0; i < selected.length; i++) {
                    const ingredients = selected[i]['ingredients'];
                    for(let j=0; j<ingredients.length; j++){
                        const current = lodash.get(lodash.get(combined, ingredients[j]['name'], {'quantity': 0}), 'quantity');
                        const active = lodash.get(lodash.get(local_store['list'], ingredients[j]['name'], {}), 'active', false)

                        combined[ingredients[j]['name']] = {'quantity': ingredients[j]['quantity'] + current,
                                                            'unit': ingredients[j]['unit'],
                                                            'active': active,
                                                            }
                    }
                }

                state.list = combined
            },

            TOGGLE_SHOPPING_LIST (state, key){
                state.list[key]['active'] = !state.list[key]['active']
            },

            TOGGLE_RECIPE_ACTIVE (state, recipe){
                console.log(recipe);

                state.recipes[recipe]['active'] = !state.recipes[recipe]['active'];
                console.log(recipe, state.recipes[recipe]['active'] )
            }

        },

        actions: {

            fetchRecipes({ commit }, { url, callback })  {    
                
                commit("UPDATE_FROM_LOCAL");

                Vue.http.get(url)
                    .then(function(response){
                        commit("UPDATE_FROM_WEB", response.body);
                        callback();
                    })
                    .catch(function(error){
                        console.log(error);
                    });
                
                commit("UPDATE_SHOPPING_LIST");
                commit("SAVE_STATE");
            },

            updateRecipe({commit}, recipe){
                commit("TOGGLE_RECIPE_ACTIVE", recipe);
                commit("UPDATE_SHOPPING_LIST");
                commit("SAVE_STATE");
            },
            
            toggleShoppingList({commit}, key){
                commit("TOGGLE_SHOPPING_LIST", key);
                commit("SAVE_STATE");
            }

        }

    });


}