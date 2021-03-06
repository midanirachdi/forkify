export default class Like {
  constructor(){
    this.likes = [];
  }
  addLike (id,title,publisher,image){
    const like = {
      id,
      title,
      publisher,
      image
    }
    this.likes.push(like);

    // add to localStorage 
    this.persistData();
    return like;
  }
  deleteLike (id){
    const index = this.likes.findIndex(el => el.id === id)
    this.likes.splice(index,1)

    // remove from localStorage
    this.persistData();

  }
  isLiked(id){
    return this.likes.findIndex(el=> el.id === id) !== -1 ;
  }
  getNbrLikes() {
    return this.likes.length;
  }
  persistData () {
    localStorage.setItem('likes', JSON.stringify(this.likes))
  }
  readStorage () {
    const storage = JSON.parse(localStorage.getItem('likes'));
    if (storage) this.likes = storage;
  }
}