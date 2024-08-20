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

export { Link };