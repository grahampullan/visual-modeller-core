class Socket {
    constructor(options) {
        this.name = options.name || 'socket';
        this.state = options.state || {};
        this.linkId = options.linkId || '';
    }
}

export { Socket };