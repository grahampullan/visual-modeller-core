class Link {
    constructor(options) {
        options = options || {};
        this.name = options.name || "link";
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

    get displayData() {
        return {
            name: this.name,
            socketNames: [this.socket1.name, this.socket2.name]
        };
    }

}

export { Link };