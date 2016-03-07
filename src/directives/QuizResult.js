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
	function QuizResultController($scope, $timeout) {
    'ngInject';

    const vm = $scope;

    /* --- api -- */
		vm.correctCount = 0;
    	vm.inCorrectCount = 0;
    	vm.unansweredCount = vm.listResults.length;
	}