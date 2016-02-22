import template from './quiz.directive.html';

export default class QuizDirective {
   constructor() {
      this.restrict = 'E';
      this.template = template;
      this.scope = {
         list  : '='
      };
      this.controller = QuizController;
   }
   static createInstance($templateCache) {
      'ngInject';
      QuizDirective.instance = new QuizDirective($templateCache);
      return QuizDirective.instance;
   }
}

function QuizController($scope) {
   'ngInject';

   const vm = $scope;

   /* --- api -- */
   vm.select   = select;
   vm.current  = null;
   vm.result   = 'Fill me';
   vm.isCorrect = isCorrect;

   /* === impl === */
   var index = 0;

   _next();

   function _next() {
      vm.current = vm.list[index++];
   }

   function select(result) {
      // mutation =(
      vm.current.selected = result;
      _next();
   }

   function isCorrect(result) {
      return vm.current.translate === result;
   }
}
