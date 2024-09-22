import { Socket } from './Socket.js';
import { Log } from './Log.js';
import { Context } from '../ui/Context.js';
import { Board } from '../ui/Board.js';
import { Box } from '../ui/Box.js';
import { ModelStructureViewer } from '../ui/ModelStructureViewer.js';
import { LogViewer } from '../ui/LogViewer.js';
import { NodeInspector } from '../ui/NodeInspector.js';

class Model {
    constructor(options) {
        options = options || {};
        this.name = options.name || 'modelName';
        this.nodes = options.nodes || [];
        this.links = options.links || [];
        this.logs = options.logs || [];
        this.maxNodeId = 0;
        this.maxLinkId = 0;
        this.maxLogId = 0;
    }

    getNodeId() {
        let newNodeId = `node-${this.maxNodeId}`;
        this.maxNodeId++;
        return newNodeId;
    }

    getLinkId() {
        let newLinkId = `link-${this.maxLinkId}`;
        this.maxLinkId++;
        return newLinkId;
    }

    getLogId() {
        let newLogId = `log-${this.maxLogId}`;
        this.maxLogId++;
        return newLogId;
    }

    addNode(node) {
        node.id = this.getNodeId();
        this.nodes.push(node);
    }

    addLink(link) {
        link.id = this.getLinkId();
        const s1 = link.socket1;
        s1.link = link;
        s1.otherSocket = link.socket2;
        const s2 = link.socket2;
        s2.link = link;
        s2.otherSocket = link.socket1;
        this.links.push(link);
    }

    addLog(log) {
        log.id = this.getLogId();
        this.logs.push(log);
    }

    removeNode(node) {
        this.nodes = this.nodes.filter(n => n !== node);
    }

    removeLink(link) {
        this.links = this.links.filter(l => l !== link);
    }

    removeLog(log) {
        this.logs = this.logs.filter(l => l !== log);
    }

    removeNodeById(id) {
        this.nodes = this.nodes.filter(n => n.id !== id);
    }

    removeLinkById(id) {
        this.links = this.links.filter(l => l.id !== id);
    }

    removeLogById(id) {
        this.logs = this.logs.filter(l => l.id !== id);
    }

    clearLogs() {
        this.logs.forEach(l => l.clear());
    }

    getLinkBySocket(socket) {
        return this.links.find(l => l.socket1 === socket || l.socket2 === socket);
    }

    getNodeBySocket(socket) {
        return this.nodes.find(n => n.sockets.includes(socket));
    }

    getNodeByName(name) {
        return this.nodes.find(n => n.name === name);
    }

    getLinkByName(name) {
        return this.links.find(l => l.name === name);
    }

    getNodeClassByClassName(className) {
        if (!this.availableNodeClasses) {
            return null;
        }
        const availableNodeClassNames = this.availableNodeClasses.map(c => {
            const instance = new c();
            return instance.className;
        });
        const index = availableNodeClassNames.indexOf(className);
        if (index === -1) {
            return null;
        } else {
            return this.availableNodeClasses[index];
        }   
    }

    getLinkClassByClassName(className) {
        if (!this.availableLinkClasses) {
            return null;
        }
        if (this.availableLinkClasses.length === 1) {
            return this.availableLinkClasses[0];
        }
        const availableLinkClassNames = this.availableLinkClasses.map(c => {
            const instance = new c();
            return instance.className;
        });
        const index = availableLinkClassNames.indexOf(className);
        if (index === -1) {
            return null;
        } else {
            return this.availableLinkClasses[index];
        }   
    }

    get allSockets() {
        return this.nodes.map(n => n.sockets).flat();
    }

    getSocketByName(socketName) {
        return this.allSockets.find(s => s.name == socketName);
    }

    toJson() {
        const modelForJson = {};
        modelForJson.config = this.config;
        modelForJson.nodes = this.nodes.map(n => {
            const nJson = {};
            nJson.name = n.name;
            nJson.className = n.className;
            nJson.state = n.state;
            nJson.displayConfig = n.displayConfig;
            nJson.sockets = n.sockets.map(s => {
                const sJson = {};
                sJson.name = s.name;
                sJson.position = s.position;
                if (s.state.valueType == "variable" && s.state.max == Infinity) {
                    s.state.max = -1;
                }
                sJson.state = s.state;
                return sJson;
            });
            return nJson;
        })
        modelForJson.links = this.links.map(l => {
            const lJson = {};
            lJson.name = l.name;
            lJson.socket1Name = l.socket1.name;
            lJson.socket2Name = l.socket2.name;
            return lJson;
        });
        modelForJson.logs = this.logs.map(l => {
            const lJson = {};
            lJson.name = l.name;
            lJson.targetName = l.target.name;
            return lJson;
        });
        return JSON.stringify(modelForJson);
    }

    saveToFile() {
        const modelJson = this.toJson();
        const blob = new Blob([modelJson], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'model.json';
        a.click();
    }

    fromJsonObject(jsonModel) {
        this.config = jsonModel.config;
        jsonModel.nodes.forEach(n => {
            const NodeClass = this.getNodeClassByClassName(n.className);
            const node = new NodeClass(n);
            node.sockets = n.sockets.map(s => {
                if (s.state.valueType == "variable" && s.state.max==-1) {
                    s.state.max = Infinity;
                }
                return (new Socket(s));
            }); 
            this.addNode(node);
        });
        jsonModel.links.forEach(l => {
            const socket1 = this.getSocketByName(l.socket1Name);
            const socket2 = this.getSocketByName(l.socket2Name);
            let LinkClass;
            if (!l.className) {
                LinkClass = this.getLinkClassByClassName();
            } else {
                LinkClass = this.getLinkClassByClassName(l.className);
            }
            this.addLink(new LinkClass({name:l.name, socket1, socket2, colorIndex:l.colorIndex}));
        });
        jsonModel.logs.forEach(l => {
            const targetNode = this.getNodeByName(l.targetName);
            const targetLink = this.getLinkByName(l.targetName);
            const target = targetNode || targetLink;
            this.addLog(new Log({name:l.name, target, colorIndex:l.colorIndex, targetName:l.targetName}));
        });

    }

    async loadFromUrl(url) {
        const response = await fetch(url);
        const json = await response.json();
        this.fromJsonObject(json);
    }

    startVis(target) {
        const targetId = target || 'target';
        const ctx = new Context();
        ctx.addModel(this);
        const board = new Board({targetId, fixed:true, modelName:this.name, widthPerCent:100, height:600});
        ctx.addBoard(board);
        const nodeDisplayData = this.nodes.map(n => n.displayData);
        const linkDisplayData = this.links.map(l => l.displayData);
        const logDisplayData = this.logs.map(l => l.displayData);
        const boxModelStructure = new Box({fixed:true, xPerCent:2, yPerCent:2, widthPerCent:58, heightPerCent:90, className: "model-structure-viewer", component: new ModelStructureViewer({layout:{title:"Model structure"},data:{nodes:nodeDisplayData, links:linkDisplayData, logs:logDisplayData}}) })
        board.addBox(boxModelStructure);
        const boxLogViewer = new Box({fixed:true, xPerCent:62, yPerCent:2, widthPerCent:36, heightPerCent:50, className: "log-viewer", component: new LogViewer({layout:{title:"Logs"},data:{logs:logDisplayData}}) });
        board.addBox(boxLogViewer);
        const boxNodeInspector = new Box({fixed:true, xPerCent:62, yPerCent:54, widthPerCent:36, heightPerCent:38, className: "node-inspector", component: new NodeInspector({layout:{title:"Node Inspector"},data:null}) });
        board.addBox(boxNodeInspector);
        board.make();
        return ctx;
    }


}

export { Model };