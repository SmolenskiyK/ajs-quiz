import template from './quiz.directive.html';

export
default class QuizDirective {
    constructor() {
        this.restrict = 'E';
        this.template = template;
        this.scope = {
            list: '='
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
    vm.select = select;
    vm.next = _next;
    vm.current = null;
    vm.result = _result;
	vm.userName = '';
   	vm.setUserName = _setUserName;
   	vm.wrongNameInputMessage
   	vm.questionCount = 0;
    

    /* === impl === */
    function _setUserName(name){
	   if(!!name){
		  vm.userName = name;
		  vm.wrongNameInputMessage = ''
	   }
	   else{
		  vm.wrongNameInputMessage = "User's name can not be empty!"
	   }
	}
   
   
   	var index = 0;
    _next();

    function _result() {
        return vm.correctCount > 5 ?
            'You win!' : 'You loose!';
    }

    function _next() {
        if (vm.questionCount <= vm.list.length) {
            vm.current = vm.list[index++];
            vm.questionCount++;
        }
    }
	
    function select(result) {
        vm.current.translate === result ?
            vm.correctCount++ : vm.inCorrectCount++;
        vm.unansweredCount--;
    }
}