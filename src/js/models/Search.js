// using axios because fetch doesn't work on some old browsers
import axios from 'axios';
import { key, proxy, displayAlert } from '../shared';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults(query) {
    /**
     * untestable with browser , must use postman and add header
     * [{
     *    "key":"X-Requested-With",
     *    "value":"XMLHTTPREQUEST"
     * }]
     */

    try {
      // promise handling with await
      const options = {
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      };
      const res = await axios(
        `${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`,
        options
      );

      this.result = res.data.recipes;
    } catch (error) {
      displayAlert('search error : ' + error);
    }
  }
}
