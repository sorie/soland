import ucEngine from './ucEngine';

const install = function (Vue, options) {
  Vue.ucEngine = function () {
    ucEngine;
  };

}
 
export default install;