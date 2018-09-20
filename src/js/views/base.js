const elements = {
  searchInput: document.querySelector('.search__field'),
  searchForm: document.querySelector('.search'),
  resultsList: document.querySelector('.results__list'),
  resultsDiv: document.querySelector('.results'),
  resultsPages: document.querySelector('.results__pages'),
  recipeDiv: document.querySelector('.recipe'),
  shoppingDiv: document.querySelector('.shopping'),
  shoppingHeading: document.querySelector('.shopping__list-heading'),
  shopping : document.querySelector('.shopping__list'),
  likesMenu : document.querySelector('.likes__field'),
  likesList : document.querySelector('.likes__list')
}

const renderLoader = parentElement => {
  const loader = `
    <div class="loader">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;
  parentElement.insertAdjacentHTML('beforeend', loader);
};

const clearLoader = () => {
  const loader = document.querySelector('.loader');
  if (loader) loader.remove();
};

module.exports = { elements, clearLoader, renderLoader };
