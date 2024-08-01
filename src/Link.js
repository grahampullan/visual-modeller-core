class Link {
    constructor(options) {
        this.id = options.id || '';
        this.inputNodeId = options.inputNodeId || '';
        this.outputNodeId = options.outputNodeId || '';
        this.state = options.state || {};
    }
}

export { Link };