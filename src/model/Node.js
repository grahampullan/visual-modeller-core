class Node {
    constructor(options) {
        this.name = options.name || 'node';
        this.className = options.className || 'nodeClass';   
        this.sockets = [];
        this.state = options.state || {};
        this.maxSocketId = 0;
        if (options.sockets) {
            options.sockets.forEach(socket => {
                this.addSocket(socket);
            });
        }
        const displayConfig = options.displayConfig || {};
        const position = displayConfig.position || {x: 0, y: 0}
        position.width = position.width || 100;
        position.height = position.height || 100;
        const colorIndex = displayConfig.colorIndex || 0;
        this.displayConfig = { position, colorIndex };
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

    setSocketOrderByName(options) {
        const order = options.order;
        const position = options.position;
        if (position) {
            this.sockets.sort((a, b) => {
                if (a.position === position && b.position === position) {
                    return order.indexOf(a.name) - order.indexOf(b.name);
                }
                if (a.poistion === position) return -1;
                if (b.position === position) return 1;
                return 0;
            });
        } else {
            this.sockets.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
        }
    }
    
    get displayData() {
        return {
            name: this.name,
            className: this.className,
            position: this.displayConfig.position,
            colorIndex: this.displayConfig.colorIndex,
            sockets: this.sockets.map(s => ({name: s.name, position: s.position}))
        };
    }


}

export { Node };
