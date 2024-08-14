class Log {
    constructor(options) {
        this.name = options.name || 'log';
        this.target = options.target || null;
        this.states = [];
    }

    writeToLog() {
        this.states.push(this.target.state);
    }
}

export { Log };