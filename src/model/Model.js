class Model {
    constructor(options) {
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
        })
        modelForJson.links = this.links.map(l => {
            const lJson = {};
            lJson.socket1Name = l.socket1.name;
            lJson.socket2Name = l.socket2.name;
            return lJson;
        });
        modelForJson.logs = this.logs.map(l => {
            const lJson = {};
            lJson.name = l.name;
            lJson.targetId = l.target.id;
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




}

export { Model };