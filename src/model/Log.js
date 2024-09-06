class Log {
    constructor(options) {
        this.name = options.name || 'log';
        this.target = options.target || null;
        this.states = [];
        this.colorIndex = options.colorIndex || 0;
        this.targetName = options.targetName || 'targetName';
    }

    writeToLog() {
        this.states.push({...this.target.state});
    }

    clear() {
        this.states = [];
    }

    get displayData() {
        return {
            name: this.name,
            targetName: this.targetName,
            colorIndex: this.colorIndex,
            states: this.states
        };
    }
}

export { Log };