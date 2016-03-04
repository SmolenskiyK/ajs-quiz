import {
   shuffle,   //Возвращает массив из перемешанных в случайном порядке элементов коллекции  
   map,       //Создает массив элементов, прогоняя каждый элемент коллекции через функцию обратного вызова 
   bind,      //Возвращает функцию, которая при вызове будет привязана к текущему this, к привязанным аргументам и аргументам, предающимся в саму вызванную функцию
   partial,   //То же самое, что и bind, но не привязывает this
   take,    
   zipObject, //Собирает объект из двух массивов (с ключами и со значениями)
   union,     //Возвращает массив уникальных значений — результат объединения нескольких массивов 
   isEqual,   //Проводит глубокое сравнение двух значений
   clone,     //Делает копию объекта (вложенные объекты копируются по ссылке) 
   range,     //Создает массив с числами от start до end (можно выбрать шаг) 
   curry,     //Принимает на вход функцию с n параметрами, а возвращает функцию, которая в случае если параметро достаточно — вызовет входную, если нет, возвратит другую функцию, передав оставшиеся параметры которой — вызовется первоначальная
   property,  //Возвращает функцию в стиле pluck (Возвращает все значения определенного свойства коллекции ), вызов которой с объектом в качестве параметра, вернет значение определенного свойства. 
   propertyOf //
} from 'lodash';

import { compose } from 'lodash/fp';

const QUIZ_LIST_SIZE = 10;
const QUIZ_OPTIONS_SIZE = 4;

var randomKeys = curry(function(size, of) { 
   return take(shuffle(range(of)), size);
});

var rename = curry(function(keys, obj) {
   return zipObject(['word', 'translate', 'options'], map(keys, propertyOf(obj)));
});

var getNth = curry(function(list, idx) {
   return list[idx];
});

export default class QuizService {
   constructor(StorageService) {
      'ngInject';

      this.StorageService = StorageService;

      this._detectOptions = bind(this._detectOptions, this);
   }

   _randomWordsWith(size, handle, include) {
      return shuffle(union([handle(include)], this._randomWords(size - 1, handle, include)));
   }

   _randomWords(size, handle, exclude) {
      const predicate = partial(isEqual, exclude);

      const data = this.StorageService.getExcluding(predicate);

      const iterator = compose(handle, getNth(data));

      return map(randomKeys(size, data.length), iterator);
   }

   _detectOptions(key, word) {
      word.options = this._randomWordsWith(QUIZ_OPTIONS_SIZE, property(key), word);
      return word;
   }

   foreignList() {
      const addOptions = partial(this._detectOptions, 'native');
      const renameKeys = rename(['foreign', 'native', 'options']);
      const flow = compose(renameKeys, addOptions, clone);

      const words = this._randomWords(QUIZ_LIST_SIZE, flow);

      return words;
   }
}

