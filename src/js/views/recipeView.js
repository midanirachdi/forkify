import  Fraction from 'fraction.js';

import { elements } from './base';

const formatCount = count => {
  if (count) {
    // return new Fraction(count).toString();
    return Fraction(count).toFraction(true)
  }
  return '?';
};

const clearRecipe = () => {
  elements.recipeDiv.innerHTML = '';
};


const displayRecipe = (recipe,isLiked) => {
  let ingredients = '';
  //   recipe.ingredients.forEach(i => {
  //     let ingredientName, ingredientCount, ingredientUnit;

  //     const splitIngredientArray = i.split(' ');

  //     if (splitIngredientArray[1].indexOf('/') === -1) {
  //       ingredientCount = splitIngredientArray[0];

  //       if (
  //         /^(tbsp|tablespoons?|k?g|lb|pounds?|cups?|teaspoons?)$/gi.test(
  //           splitIngredientArray[1]
  //         )
  //       ) {
  //         ingredientUnit = splitIngredientArray[1];

  //         var restOftheString = splitIngredientArray.slice(2);
  //         ingredientName = restOftheString.join(' ');
  //       } else {
  //         ingredientUnit = '';
  //         var restOftheString = splitIngredientArray.slice(1);
  //         ingredientName = restOftheString.join(' ');
  //       }
  //     } else {
  //       ingredientCount = splitIngredientArray[0] + ' ' + splitIngredientArray[1];
  //       console.log(splitIngredientArray);
  //       if (
  //         /^(tbsp|tablespoons?|k?g|lb|pounds?|cups?|teaspoons?)$/gi.test(
  //           splitIngredientArray[2]
  //         )
  //       ) {
  //         ingredientUnit = splitIngredientArray[2];
  //         console.log('second pattern match for ' + ingredientCount);

  //         var restOftheString = splitIngredientArray.slice(3);
  //         ingredientName = restOftheString.join(' ');
  //       }
  //     }

  recipe.ingredients.forEach(i => {
    ingredients += `
    <li class="recipe__item">
      <svg class="recipe__icon">
         <use href="img/icons.svg#icon-check"></use>
      </svg>
      <div class="recipe__count">${formatCount(i.count)}</div>
      <div class="recipe__ingredient">
          <span class="recipe__unit">${i.unit}</span>
          ${i.ingredient}
      </div>
    </li>
    `;
  });

  const markup = `
  <figure class="recipe__fig">
                <img src="${recipe.image}" alt="Tomato" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>
            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${
                      recipe.time
                    }</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${
                      recipe.servings
                    }</span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny btn-decrease">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny btn-increase">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart${isLiked? '':'-outlined'}"></use>
                    </svg>
                </button>
            </div>



            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">
                    ${ingredients}
                </ul>

                <button class="btn-small recipe__btn recipe__btn--add">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">${
                      recipe.publisher
                    }</span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href="${
                  recipe.url
                }" target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>
  `;
  elements.recipeDiv.innerHTML = markup;
};
const updateServingsIng = recipe => {
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings ;

    const countElements = Array.from (document.querySelectorAll('.recipe__count'));
    countElements.forEach((element,index)=> {
        element.textContent = formatCount (recipe.ingredients[index].count)
    })
}
module.exports = { displayRecipe, clearRecipe, updateServingsIng };
