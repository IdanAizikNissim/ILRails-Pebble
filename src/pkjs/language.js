var Storage = require('./storage');

var defLang = "Eng";
var langs = {
  Heb: {acronym: "Heb", name: "עברית", english: "Hebrew"}, 
  Eng: {acronym: "Eng", name: "English", english: "English"}, 
  Rus: {acronym: "Rus", name: "русский", english: "Russian"}, 
  Arb: {acronym: "Arb", name: "عربى", english: "Arabic"}  
};

var dictionary = {
  platform: {
    Heb: "רציף",
    Eng: "Platform",
    Rus: "перрон",
    Arb: "منصه"
  },
  num: {
    Heb: "מספר",
    Eng: "No.",
    Rus: "номер",
    Arb: "رقم"
  },
  origin: {
    Heb: "מוצא",
    Eng: "Origin",
    Rus: "начало",
    Arb: "الأصل"
  },
  destination: {
    Heb: "יעד",
    Eng: "Destination",
    Rus: "место назначения",
    Arb: "المكان المقصود"
  },
  select_org_station: {
    Heb: "בחר תחנת מוצא",
    Eng: "select origin station",
    Rus: "Выбрать исходную станцию",
    Arb: "محطة أصل مختارة"
  },
  select_dest_station: {
    Heb: "בחר תחנת יעד",
    Eng: "select destination station",
    Rus: "Выбрать исходную станцию",
    Arb: "محطة أصل مختارة"
  },
  save: {
    Heb: "שמירה",
    Eng: "Save",
    Rus: "хранение",
    Arb: "حفظ"
  },
  delete: {
    Heb: "מחיקה",
    Eng: "Delete",
    Rus: "удалять",
    Arb: "حذف"
  },
  add_route: {
    Heb: "הוספת מסלול",
    Eng: "Add Route",
    Rus: "Добавление трека",
    Arb: "مضيفا المسار"
  },
  routes: {
    Heb: "מסלולים",
    Eng: "Routes",
    Rus: "Маршруты",
    Arb: "طرق"
  },
  stations: {
    Heb: "תחנות",
    Eng: "Stations",
    Rus: "Станции",
    Arb: "محطات"
  },
  language: {
    Heb: "שפה",
    Eng: "Language",
    Rus: "Язык",
    Arb: "لغة"
  },
  select_def_lang: {
    Heb: "בחירת שפת ממשק",
    Eng: "select default language",
    Rus: "Выбрать язык по умолчанию",
    Arb: "اللغة الافتراضية اختر"
  }
};

var word = function(w) {
  return dictionary[w][defLang];
};

var changeDefLang = function(acronym) {
  Storage.put(Storage.keys.DEF_LANG, acronym);
  defLang = acronym;
};

var getDefLang = function() {
  var l = Storage.get(Storage.keys.DEF_LANG);
  
  return l? l : defLang;
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
  isDefLang: isDefLang,
  word: word
};