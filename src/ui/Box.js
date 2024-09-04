import { Box as bbBox } from 'board-box';

class Box extends bbBox {
    constructor(options) {
        options = options || {};
        options.boxesSharedStateKeys = ["boxId", "name"];
        super(options);
        this.name = options.name || null;
    }
}

export { Box };