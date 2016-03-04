import 'angular/angular.js';

import StorageService   	from './services/StorageService';
import QuizService      	from './services/QuizService';

import MainController   	from './MainController';

import QuizDirective       from './directives/Quiz';
import QuizItemDirective   from './directives/QuizItem';
import QuizResultDirective   from './directives/QuizResult';


import material 			from 'angular-material';
import animate 				from 'angular-animate';
import aria 				from 'angular-aria';

import 'angular-material/angular-material.css';
import './main.css';

const depends = [animate, aria, material];

// add keyboard listener

angular
   .module('quiz_ajs', depends)

   .service('StorageService', StorageService)
   .service('QuizService',    QuizService)

   .directive('quiz',      QuizDirective.createInstance)
   .directive('quizItem',  QuizItemDirective.createInstance)
   .directive('quizResult',  QuizResultDirective.createInstance)

   .controller('MainController', MainController);
