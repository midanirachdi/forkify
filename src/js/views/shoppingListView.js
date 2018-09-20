import { elements } from './base';

const clearShoppingList  = () => { elements.shopping.innerHTML = '' }

const renderClearBtn  = () => {
  const markup = `
  <button class="btn-small clearBtn">
    <span>Clear</span>
        <svg class="search__icon mar-3px">
            <use href="img/icons.svg#icon-circle-with-cross"></use>
        </svg>
  </button>
  `;

  elements.shoppingHeading.insertAdjacentHTML('afterend',markup);
}
const renderItem = item => {
  const markup = `
    <li class="shopping__item" data-itemid="${item.id}">
      <div class="shopping__count">
          <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
          <p>${item.unit}</p>
      </div>
      <p class="shopping__description">${item.ingredient}</p>
      <button class="shopping__delete btn-tiny">
          <svg>
              <use href="img/icons.svg#icon-circle-with-cross"></use>
          </svg>
      </button>
    </li>
  `;
  elements.shopping.innerHTML += markup;
}
const deleteItem = id => {
  const item = document.querySelector(`[data-itemid="${id}"]`);
  if (item) item.parentElement.removeChild(item);
}

module.exports = {renderItem , deleteItem , clearShoppingList, renderClearBtn}