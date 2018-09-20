import axios from 'axios';
import {key,proxy,displayAlert} from '../shared'

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe (id) {
    try {
      const res = await axios(
        `${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`
      );

      this.title = res.data.recipe.title;
      this.publisher = res.data.recipe.publisher;
      this.image = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (error) {
      displayAlert('recipe error : ' + error)
    }
  }
  /**
   * assuming that for every 3 ingredients we need 15min
   */
  calculateCookTime(){
    const numIngredients = this.ingredients.length;
    const periods = Math.ceil(numIngredients / 3);

    this.time = periods * 15 ;
    
  }
  calculateServings (servings){
    this.servings = servings;
  }
  parseIngredients(){
    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const unitsShort = ['tbsp'       , 'tbsp'      , 'oz'   , 'oz'    , 'tsp'     , 'tsp'      , 'cup' , 'pound'];
    const units = [...unitsShort , 'kg', 'g']; // merge both arrays
    
    const newIngredients = this.ingredients.map(el =>{
      
      // Uniform units
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i)=>{
        ingredient = ingredient.replace(unit, unitsShort[i])
      })
      
      // Remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");
      
      // parse ingredients into  count , unit and ingredient
      const arrIng = ingredient.split(' ');
      const unitIndex = arrIng.findIndex(el2 => units.includes(el2))
      
      let objIngredient ; 
      if (unitIndex > -1){
        // there's a unit
        // Ex. 4 1/2 cups -> arrCount is [4, 1/2]
        // Ex. 4 cups     -> arrCount is [4]
        const arrCount = arrIng.slice(0, unitIndex);
        
        let count ;
        
        if (arrCount.length === 1 && arrCount[0] !== ''){
          count = eval(arrIng[0].replace('-','+'))
        } else if (arrCount[0] === ''){
          count = 1;
        } else {
          count = eval(arrIng.slice(0, unitIndex).join('+'))
        }

        objIngredient = {
          count ,
          unit : arrIng[unitIndex],
          ingredient : arrIng.slice(unitIndex+1).join(' ')
        }

      } else if (parseInt(arrIng[0],10)){
        // there's no unit , but 1st element is number
        objIngredient = {
          count : parseInt(arrIng[0],10),
          unit : '',
          ingredient : arrIng.slice(1).join(' ')
        }
      } else if (unitIndex === -1) {
        // there's no unit and no number in 1st position
        objIngredient = {
          count : 1,
          unit : '',
          ingredient 
          // equivalent to ingredient: ingredient
        }
      }

      
      return objIngredient;
    });

    this.ingredients = newIngredients
  }
  updateServings (type) {

    const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;
    

    this.ingredients.forEach(i => {
      i.count *= (newServings/ this.servings);
    })

    this.servings = newServings;
  }
}
