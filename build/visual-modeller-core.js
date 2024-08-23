class Socket {
    constructor(options) {
        this.name = options.name || 'socket';
        this.state = options.state || {};
        this.position = options.position || 'left';  
    }
}

class Log {
    constructor(options) {
        this.name = options.name || 'log';
        this.target = options.target || null;
        this.states = [];
    }

    writeToLog() {
        this.states.push({...this.target.state});
    }

    clear() {
        this.states = [];
    }
}

class Model {
    constructor(options) {
        options = options || {};
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
        console.log(this.allSockets.map(s => s.name));
        console.log(socketName);
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
            nJson.sockets = n.sockets.map(s => {
                const sJson = {};
                sJson.name = s.name;
                sJson.position = s.position;
                sJson.state = s.state;
                return sJson;
            });
            return nJson;
        });
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
        console.log(jsonModel);
        this.config = jsonModel.config;
        jsonModel.nodes.forEach(n => {
            const NodeClass = this.getNodeClassByClassName(n.className);
            const node = new NodeClass(n);
            node.sockets = n.sockets.map(s => new Socket(s));
            console.log(node);
            this.addNode(node);
        });
        console.log("nodes added");
        jsonModel.links.forEach(l => {
            console.log(l);
            const socket1 = this.getSocketByName(l.socket1Name);
            const socket2 = this.getSocketByName(l.socket2Name);
            console.log(socket1, socket2);
            let LinkClass;
            if (!l.className) {
                LinkClass = this.getLinkClassByClassName();
            } else {
                LinkClass = this.getLinkClassByClassName(l.className);
            }
            console.log(LinkClass);
            console.log(this.availableLinkClasses);
            this.addLink(new LinkClass({name:l.name, socket1, socket2}));
            console.log("link added");
        });
        console.log("links added");
        jsonModel.logs.forEach(l => {
            console.log(l);
            const targetNode = this.getNodeByName(l.targetName);
            const targetLink = this.getLinkByName(l.targetName);
            console.log(targetNode, targetLink);
            const target = targetNode || targetLink;
            console.log(target);
            this.addLog(new Log({name:l.name, target}));
        });
        console.log("logs added");



    }

    async loadFromUrl(url) {
        const response = await fetch(url);
        const json = await response.json();
        this.fromJsonObject(json);
    }




}

class Node {
    constructor(options) {
        this.name = options.name || 'node';
        this.sockets = [];
        this.state = options.state || {};
        this.maxSocketId = 0;
        if (options.sockets) {
            options.sockets.forEach(socket => {
                this.addSocket(socket);
            });
        }
    }

    getSocketId() {
        let newSocketId = `socket-${this.maxSocketId}`;
        this.maxSocketId++;
        return newSocketId;
    }

    get leftSockets() {
        return this.sockets.filter(s => s.position === 'left');
    }

    get rightSockets() {
        return this.sockets.filter(s => s.position === 'right');
    }

    get topSockets() {
        return this.sockets.filter(s => s.position === 'top');
    }

    get bottomSockets() {
        return this.sockets.filter(s => s.position === 'bottom');
    }
    
    addSocket(socket) {
        socket.id = this.getSocketId();
        this.sockets.push(socket);
    }

    setSocketByIndex(index, socket) {
        socket.id = this.getSocketId();
        this.sockets[index] = socket;
    }

    getSocketByIndex(index) {
        return this.sockets[index];
    }
    
    getSocketByName(name) {
        return this.sockets.find(s => s.name === name);
    }

    removeSocket(socket) {
        this.sockets = this.sockets.filter(s => s !== socket);
    }

    removeSocketById(id) {
        this.sockets = this.sockets.filter(s => s.id !== id);
    }

    removeSocketByIndex(index) {
        this.sockets = this.sockets.filter((s, i) => i !== index);
    }

}

class Link {
    constructor(options) {
        options = options || {};
        this.name = options.name || "link";
        this.socket1 = options.socket1 || null;
        this.socket2 = options.socket2 || null;
        this.state = options.state || {};
    }

    getOtherSocket(socket) {
        if (socket === this.socket1) {
            return this.socket2;
        } else if (socket === this.socket2) {
            return this.socket1;
        } else {
            return null;
        }
    }
}

export { Link, Log, Model, Node, Socket };
