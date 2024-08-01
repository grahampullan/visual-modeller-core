class Model {
    constructor(options) {
        this.nodes = options.nodes || [];
        this.links = options.links || [];
    }

    addNode(node) {
        this.nodes.push(node);
    }

    addLink(link) {
        this.links.push(link);
    }

    removeNode(node) {
        this.nodes = this.nodes.filter(n => n !== node);
    }

    removeLink(link) {
        this.links = this.links.filter(l => l !== link);
    }
}

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

class Connection {
    constructor(options) {
        this.name = options.name || 'connection';
        this.state = options.state || {};
        this.linkId = options.linkId || '';
    }
}

class Link {
    constructor(options) {
        this.id = options.id || '';
        this.inputNodeId = options.inputNodeId || '';
        this.outputNodeId = options.outputNodeId || '';
        this.state = options.state || {};
    }
}

export { Connection, Link, Model, Node };
