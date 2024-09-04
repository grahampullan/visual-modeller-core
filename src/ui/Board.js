import {Board as bbBoard} from 'board-box';

class Board extends bbBoard {
    constructor(options) {
        options = options || {};
        super(options);
        this.sharedState.modelName = options.modelName || "modelName";
    }
}

export { Board };