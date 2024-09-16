import {Board as bbBoard} from 'board-box';
import {Observable} from 'board-box';

class Board extends bbBoard {
    constructor(options) {
        options = options || {};
        super(options);
        this.sharedState.modelName = options.modelName || "modelName";
        this.sharedState.selectedNode = new Observable({state:{name:null}});
        this.sharedState.selectedLog = new Observable({state:{name:null, targetName:null}});
        const requestSetNodeStateData = new Observable({state:{}});
        requestSetNodeStateData.subscribe(this.setNodeStateData.bind(this));
        this.sharedState.requestSetNodeStateData = requestSetNodeStateData;
        const requestRunModelAndUpdateViews = new Observable({flag:true});
        requestRunModelAndUpdateViews.subscribe(this.runModelAndUpdateViews.bind(this));
        this.sharedState.requestRunModelAndUpdateViews = requestRunModelAndUpdateViews;
    }

    setNodeStateData(data) {
        const nodeName = data.nodeName;
        const key = data.key;
        const value = data.value;
        const model = this.sharedStateByAncestorId["context"].models.find( model => model.name == this.sharedState.modelName );
        const node = model.nodes.find( node => node.name == nodeName );
        node.state[key] = value;
    }

    runModelAndUpdateViews() {
        const model = this.sharedStateByAncestorId["context"].models.find( model => model.name == this.sharedState.modelName );
        model.clearLogs();
        model.run();
        const modelStructureBox = this.boxes[0];
        const logViewerBox = this.boxes[1];
        logViewerBox.component.data={logs:model.logs.map(l => l.displayData)};
        logViewerBox.component.update();
    }
}

export { Board };