import {Board as bbBoard} from 'board-box';
import {Observable} from 'board-box';

class Board extends bbBoard {
    constructor(options) {
        options = options || {};
        super(options);
        this.sharedState.modelName = options.modelName || "modelName";
        this.sharedState.selectedNode = new Observable({state:{name:null}});
        this.sharedState.selectedLog = new Observable({state:{name:null}});
    }
}

export { Board };