class Link {
    constructor(options) {
        this.id = options.id || '';
        this.inputNodeId = options.inputNodeId || '';
        this.inputSocketId = options.inputSocketId || '';
        this.outputNodeId = options.outputNodeId || '';
        this.outputSocketId = options.outputSocketId || '';
        this.state = options.state || {};
    }
}

export { Link };