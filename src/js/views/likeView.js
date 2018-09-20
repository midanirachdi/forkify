import { elements } from './base';
import { limitRecipeTitle } from '../views/searchView'

const toggleLikeBtn = isLiked => {
  const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
  // selecting element use inside the parent element recipelove
  document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#${iconString}`)
}

const toggleLikeMenu = numLikes => {
  elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
}
const renderLike = like => {
  const markup = `
    <li>
      <a class="likes__link" href="#${like.id}">
          <figure class="likes__fig">
              <img src="${like.image}" alt="${like.title}">
          </figure>
          <div class="likes__data">
              <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
              <p class="likes__author">${like.publisher}</p>
          </div>
      </a>
    </li>    
  `
  elements.likesList.innerHTML += markup;

}
const deleteLike  = id => {
 const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
 if (el) el.remove();
}
module.exports = { toggleLikeBtn , toggleLikeMenu , renderLike, deleteLike}