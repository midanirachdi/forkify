import style from '../css/style.css';
import icons from '../img/icons.svg';

import Fraction from 'fraction.js/fraction';

import Search from './models/Search';
import Recipe from './models/Recipe';
import ShoppingList from './models/ShoppingList';
import Like from './models/Like';

import {displayAlert} from './shared'

import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as shoppingListView from './views/shoppingListView';
import * as likeView from './views/likeView';

/** Global state of the app
 * - search object
 * - current recipe object
 * - shopping list object
 * - liked recipes
 */
const state = {};



/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
  // get query from view
  const query = searchView.getInput();

  if (query) {
    // add new search object to state
    state.search = new Search(query);

    // prep UI for results (clearing prev results , show loading spinner)
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.resultsDiv);

    try {
      // search for recipes
      await state.search.getResults();

      // render results on UI

      searchView.displayResults(state.search.result);
    } catch (error) {
      
      displayAlert('something went wrong with the search : check the console for the full stacktrace');
      console.log(error)
    }
    clearLoader();
  }
};
/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
  //grabbing id from url
  const id = window.location.hash.replace('#', '');
  if (id) {
    // prep ui for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipeDiv);

    // highlight selected item
    if (state.search) searchView.highlightSelected(id);

    // create new recipe object
    state.recipe = new Recipe(id);

    try {
      // get recipe data
      await state.recipe.getRecipe();
      // parse ingredients
      state.recipe.parseIngredients();

      // calculate servings and time
      state.recipe.calculateCookTime();
      state.recipe.calculateServings(4);

      // render recipe
      clearLoader();
      recipeView.displayRecipe(state.recipe,state.likes.isLiked(id));
    } catch (error) {
      console.log(error)
      alert('error processing recipe : check the console for the full stacktrace');
    }
  }
};

/**
 * SHOPPING LIST CONTROLLER
 */

 const controlShoppingList = () => {
   // create a new list if there's none yet
   if(!state.shoppingList) state.shoppingList = new ShoppingList();
   
    shoppingListView.renderClearBtn();
    shoppingListView.clearShoppingList();
   //add each ingredient to the list
   state.recipe.ingredients.forEach(el=>{
    const item = state.shoppingList.addItem(el.count, el.unit, el.ingredient);
    shoppingListView.renderItem(item);
   })
  
 }

 /**
  * LIKES CONTROLLER
  */

const controlLike = () => {

  
  
  if (!state.likes) state.likes = new Like ();
  
  const currID  = state.recipe.id
  if (!state.likes.isLiked(currID)){
    
    // add like to state
    const newLike = state.likes.addLike(
      currID,
      state.recipe.title,
      state.recipe.publisher,
      state.recipe.image
    );

   
    // toggle like button 
    likeView.toggleLikeBtn(true)
    // add like to UI

    likeView.renderLike(newLike)
  } else {
    //remove from state
    state.likes.deleteLike(currID);
    //toggle like
    likeView.toggleLikeBtn(false)
    // remove from UI
    likeView.deleteLike(currID)

  }
  likeView.toggleLikeMenu(state.likes.getNbrLikes());
  
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});
// event delegation
elements.resultsPages.addEventListener('click', e => {
  // can also be done using e.target.closest('.btn-inline')
  if (e.target.parentElement.classList.contains('btn-inline')) {
    const goToPage = parseInt(e.target.parentElement.dataset.goto, 10);
    searchView.clearResults();
    searchView.displayResults(state.search.result, goToPage);
  }
});

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

// same function on two event listeners (alternative to the code straight up)
['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe));

// get likes from localStorage
window.addEventListener('load', () => {
  
  state.likes = new Like ();
  
  state.likes.readStorage();
  
  likeView.toggleLikeMenu(state.likes.getNbrLikes());

  state.likes.likes.forEach(like => likeView.renderLike(like))
})

elements.recipeDiv.addEventListener('click', e => {
  // * means any child
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIng(state.recipe);
    }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    state.recipe.updateServings('inc');
    recipeView.updateServingsIng(state.recipe);
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    controlShoppingList();
  } else if (e.target.matches('.recipe__love, .recipe__love *')){
    controlLike();
  }
});

elements.shopping.addEventListener('click' , e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;

  if(e.target.classList.contains('shopping__count-value')){
    const count = parseFloat(e.target.value,10)
    state.shoppingList.updateCount(id, count);
    
  } else if (e.target.matches('.shopping__delete, .shopping__delete *')){
    state.shoppingList.deleteItem(id);
    shoppingListView.deleteItem(id)
  } 
});

elements.shoppingDiv.addEventListener('click', e => {
  if (e.target.matches('.clearBtn, .clearBtn *')){
    
    state.shoppingList.clearList();
    shoppingListView.clearShoppingList();
  }
})



