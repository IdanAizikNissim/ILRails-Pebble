var Storage = require('storage');

var langs = {
  Heb: {acronym: "Heb", name: "עברית", english: "Hebrew"}, 
  Eng: {acronym: "Eng", name: "English", english: "English"}, 
  Rus: {acronym: "Rus", name: "русский", english: "Russian"}, 
  Arb: {acronym: "Arb", name: "عربى", english: "Arabic"}  
};

var changeDefLang = function(acronym) {
  Storage.put(Storage.keys.DEF_LANG, acronym);
};

var getDefLang = function() {
  var l = Storage.get(Storage.keys.DEF_LANG);
  
  return l? l : "Eng";
};

var isDefLang = function (acronym) {
  return acronym === getDefLang();
};

var getLangs = function () {
  return langs;
};

module.exports = {
  getLangs: getLangs,
  changeDefLang: changeDefLang,
  getDefLang: getDefLang,
  isDefLang: isDefLang
};