class Connection {
    constructor(options) {
        this.name = options.name || 'connection';
        this.state = options.state || {};
        this.linkId = options.linkId || '';
    }
}

export { Connection };