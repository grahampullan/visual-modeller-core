class Log {
    constructor(options) {
        this.name = options.name || 'log';
        this.target = options.target || null;
        this.values = [];
    }

    addToLog() {
        this.values.push(this.target);
    }
}

export { Log };