class Socket {
    constructor(options) {
        this.name = options.name || 'socket';
        this.state = options.state || {};
        this.position = options.position || 'left';  
    }
}

export { Socket };