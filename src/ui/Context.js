import {Context as bbContext} from 'board-box';

class Context extends bbContext {
  constructor() {
    super();
    this.models = [];
    this.maxModel = 0;
    this.sharedState.models = this.models;
  }

  getModelId() {
    const id = `model-${this.maxModel}`;
    this.maxModel++;
    return id;
  }

  addModel(model) {
    model.id = this.getModelId();
    this.models.push(model);
  }

}

export { Context };