import template from './quiz-item.directive.html';

export default class OneOfFourDirective {
   constructor() {
      this.restrict = 'E';
      this.template = template;
      this.scope = {
         question : '=',
         options  : '=',
         select   : '=',
         isCorrect   : '='
      };
      this.controller = OneOfFourController;
   }
   static createInstance($templateCache) {
      'ngInject';
      OneOfFourDirective.instance = new OneOfFourDirective($templateCache);
      return OneOfFourDirective.instance;
   }
}

function OneOfFourController($scope, $timeout) {
   'ngInject';

   const vm = $scope;

   /* --- api -- */
   vm.answer   = '';
   vm.choice   = _choice;

   /* === impl === */
   const TIMEOUT = 500;

   $scope.$watch('question', () => vm.answer = '');

   function _choice(val) {
      vm.answer = val;

      $timeout(() => vm.select(vm.answer), TIMEOUT);
   }
}
