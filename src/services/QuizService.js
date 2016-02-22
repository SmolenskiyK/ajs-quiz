import {
   shuffle,
   map,
   bind,
   partial,
   take,
   zipObject,
   union,
   isEqual,
   clone,
   range,
   curry,
   property,
   propertyOf
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

