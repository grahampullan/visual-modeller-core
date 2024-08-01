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

export { Model };