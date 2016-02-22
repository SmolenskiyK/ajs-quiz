import 'angular/angular.js';

import StorageService   from './services/StorageService';
import QuizService      from './services/QuizService';

import MainController   from './MainController';

import QuizDirective       from './directives/Quiz';
import QuizItemDirective   from './directives/QuizItem';

const depends = [];

// add keyboard listener

angular
   .module('quiz_ajs', depends)

   .service('StorageService', StorageService)
   .service('QuizService',    QuizService)

   .directive('quiz',      QuizDirective.createInstance)
   .directive('quizItem',  QuizItemDirective.createInstance)

   .controller('MainController', MainController);
