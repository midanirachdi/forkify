import { elements } from './base';

/**
 * EXPORTED
 */
// return input value of the field
const getInput = () => elements.searchInput.value;

// cleaner because we're not returning anything
const clearInput = () => {
  elements.searchInput.value = '';
};

const clearResults = () => {
  elements.resultsList.innerHTML = '';
  elements.resultsPages.innerHTML = '';
};

const displayResults = (results, page = 1, resultsPerPage = 10) => {
  /**
   * page 1 => from 0 to 9
   * page 2 => from 10 to 19
   * page 3 => from 20 to 29
   */
  const start = (page - 1) * resultsPerPage;
  const end = start + resultsPerPage;

  results.slice(start, end).forEach(recipe => renderRecipe(recipe));

  // pagination buttons
  renderButtons(page, results.length, resultsPerPage);
};
const highlightSelected = id => {
  if (document.querySelector('.results__link--active')) {
    document
      .querySelector('.results__link--active')
      .classList.remove('results__link--active');
  }
  if (document.querySelector(`.results__link[href*="${id}"]`)) {
    document
      .querySelector(`.results__link[href*="${id}"]`)
      .classList.add('results__link--active');
  }
};

/**
 * NOT EXPORTED
 */

const renderRecipe = recipe => {
  let markup = `
  <li>
    <a class="results__link" href="#${recipe.recipe_id}">
      <figure class="results__fig">
        <img src="${recipe.image_url}" alt="${recipe.title}">
      </figure>
      <div class="results__data">
        <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
        <p class="results__author">${recipe.publisher}</p>
      </div>
    </a>
  </li>
  `;
  elements.resultsList.innerHTML += markup;
};

// 'pasta with tomato and spinash'
const limitRecipeTitle = (title, limit = 17) => {
  if (title.length > limit) {
    const newTitle = [];
    title.split(' ').reduce((accumulator, current) => {
      if (accumulator + current.length <= limit) {
        newTitle.push(current);
      }
      return accumulator + current.length;
    }, 0); // 0 is the initial value of the accumulator

    // join is the opposite of split , it joins array elements into a string seperated by x
    return `${newTitle.join(' ')} ...`;
  }
  return title;
};

// type : 'prev' || 'next'
const createBtn = (page, type) => `
<button class="btn-inline results__btn--${type}" data-goto=${
  type === 'prev' ? page - 1 : page + 1
}>
  <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
  <svg class="search__icon">
      <use href="img/icons.svg#icon-triangle-${
        type === 'prev' ? 'left' : 'right'
      }"></use>
  </svg>
</button>
`;
const renderButtons = (page, numResults, resultsPerPage) => {
  // ceil(4.1) => 5
  const pages = Math.ceil(numResults / resultsPerPage);
  let button;

  if (page === 1 && pages > 1) {
    // btn to go to next page
    button = createBtn(page, 'next');
  } else if (page === pages && pages > 1) {
    // btn to go previous page
    button = createBtn(page, 'prev');
  } else {
    // both buttons
    button = `
    ${createBtn(page, 'next')}
    ${createBtn(page, 'prev')}
    `;
  }

  elements.resultsPages.innerHTML = button;
};

module.exports = {
  getInput,
  clearInput,
  clearResults,
  displayResults,
  highlightSelected,
  limitRecipeTitle
};
