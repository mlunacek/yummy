import List from './components/List';
import Recipe from './components/Recipe';
import Recipes from './components/Recipes';
import Grid from './components/Grid';

const routes = [
    { path: '/yummy', component: Recipes, name: 'recipes' },
    { path: '/yummy/grid', component: Grid, name: 'grid' },
    { path: '/yummy/recipe/:id', component: Recipe, name: 'recipe' },
    { path: '/yummy/list', component: List, name: 'list' },

];

export default routes;