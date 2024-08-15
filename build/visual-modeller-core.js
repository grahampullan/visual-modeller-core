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

    getLinkBySocket(socket) {
        return this.links.find(l => l.socket1 === socket || l.socket2 === socket);
    }

    getNodeBySocket(socket) {
        return this.nodes.find(n => n.sockets.includes(socket));
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

class Socket {
    constructor(options) {
        this.name = options.name || 'socket';
        this.state = options.state || {};
        this.linkId = options.linkId || '';
        this.position = options.position || 'left';  
    }
}

class Link {
    constructor(options) {
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

class Log {
    constructor(options) {
        this.name = options.name || 'log';
        this.target = options.target || null;
        this.states = [];
    }

    writeToLog() {
        this.states.push(this.target.state);
    }
}

export { Link, Log, Model, Node, Socket };
