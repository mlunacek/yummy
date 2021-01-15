import List from './components/List';
import Recipe from './components/Recipe';
import Recipes from './components/Recipes';
import Grid from './components/Grid';

const routes = [
    { path: '/', component: Recipes, name: 'recipes' },
    { path: '/grid', component: Grid, name: 'grid' },
    { path: '/recipe/:id', component: Recipe, name: 'recipe' },
    { path: '/list', component: List, name: 'list' },

];

export default routes;