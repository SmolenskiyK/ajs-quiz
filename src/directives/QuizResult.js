import template from './quiz.result.directive.html';

export
default class QuizResultDirective {
    constructor() {
        this.restrict = 'E';
        this.template = template;
        this.scope = {
			listResults : '=',
			user : '=',
        };
        this.controller = QuizResultController;
    }
    static createInstance($templateCache) {
        'ngInject';
        QuizResultDirective.instance = new QuizResultDirective($templateCache);
        return QuizResultDirective.instance;
    }
};
	function QuizResultController($scope) {
    'ngInject';

    const vm = $scope;

    /* --- api -- */
		vm.correctCount = _correctCount;
    	vm.inCorrectCount = _inCorrectCount;
    	vm.unansweredCount = _unansweredCount;
		vm.result = _result;
        
        /* === impl === */
        function _correctCount(){
            return vm.listResults.filter(function (item) {
         		return item.translate === item.answer;
      			}).length;
        }
        
        function _inCorrectCount(){
            return vm.listResults.filter(function (item) {
         		return !!item.answer&&item.translate !== item.answer;
      			}).length;
        }
        
        function _unansweredCount(){
            return vm.listResults.length-vm.correctCount() - vm.inCorrectCount();
        }
		
		const correctPercent = 0.7;
		function _result(){
			return Math.ceil(vm.listResults.length * correctPercent)<=vm.correctCount()? 'win' : 'lose';
		}
	}