export
default class MainController {
    constructor(QuizService) {
        'ngInject';

        const vm = this;

        /* --- impl --- */
        vm.listOfQuestions = [];


        /* --- impl --- */
        (function _init() {
            vm.listOfQuestions = QuizService.foreignList();
        })();
    }
}