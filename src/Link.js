class Link {
    constructor(options) {
        this.socket1 = options.socket1 || null;
        this.socket2 = options.socket2 || null;
        this.state = options.state || {};
    }
}

export { Link };