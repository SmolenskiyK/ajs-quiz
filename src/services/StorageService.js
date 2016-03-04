import { each, filter, negate, clone} from 'lodash';

const store = [
   {
      foreign  : 'please',
      native   : 'пожалуйста'
   },
   {
      foreign  : 'name',
      native   : 'имя'
   },
   {
      foreign  : 'what',
      native   : 'что, какой'
   },
   {
      foreign  : 'something',
      native   : 'что-нубудь'
   },
   {
      foreign  : 'people',
      native   : 'люди'
   },
   {
      foreign  : 'bowl',
      native   : 'миска'
   },
   {
      foreign  : 'cupboard',
      native   : 'сервант'
   },
   {
      foreign  : 'family',
      native   : 'семья'
   },
   {
      foreign  : 'job',
      native   : 'работа'
   },
   {
      foreign  : 'time',
      native   : 'время'
   },
   {
      foreign  : 'divide',
      native   : 'разделять'
   },
   {
      foreign  : 'weather',
      native   : 'погода'
   },
   {
      foreign  : 'immense',
      native   : 'огромный'
   },
   {
      foreign  : 'facilities',
      native   : 'оборудование'
   },
   {
      foreign  : 'purpose',
      native   : 'цель'
   },
   {
      foreign  : 'city',
      native   : 'город'
   },
   {
      foreign  : 'police',
      native   : 'полиция'
   },
   {
      foreign  : 'thing',
      native   : 'вещь'
   },
   {
      foreign  : 'quality',
      native   : 'качество'
   }
];

export default class StorageService {

   constructor() {
      this.load();
   }

   load() {
      each(store, Object.freeze);
   }

   add(obj) {
      store.push(obj);
   }

   get() {
      return clone(store);
   }

   getExcluding(predicate) {
      return filter(this.get(), negate(predicate));
   }
}
