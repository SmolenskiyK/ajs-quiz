import template from './quiz-item.directive.html';

export
default class OneOfFourDirective {
    constructor() {
        this.restrict = 'E';
        this.template = template;
        this.scope = {
            question: '=',
            options: '=',
            select: '=',
            correct: '='
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
    vm.answer = '';
    vm.choice = _choice;
	
	
    vm.getClassName = function(option) {
        var res = '';
        if (vm.answer === '' || vm.answer !== option) {
            res = '';
        } else {
            res = option === vm.correct ? 'correct' : 'incorrect';
        }
        return res;
    }

    /* === impl === */
    const TIMEOUT = 500;

    $scope.$watch('question', () => vm.answer = '');

    function _choice() {
		vm.select(vm.answer);
    }
}