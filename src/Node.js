class Node {
    constructor(options) {
        this.name = options.name || 'node';
        this.inputs = options.inputs || [];
        this.outputs = options.outputs || [];
    }

    addInput(connection) {
        this.inputs.push(connection);
    }

    setInputByIndex(index, connection) {
        this.inputs[index] = connection;
    }

    addOutput(connection) {
        this.outputs.push(connection);
    }

    setOutputByIndex(index, connection) {
        this.outputs[index] = connection;
    }

    removeInput(connection) {
        this.inputs = this.inputs.filter(input => input !== connection);
    }

    removeOutput(connection) {
        this.outputs = this.outputs.filter(output => output !== connection);
    }

}

export { Node };
