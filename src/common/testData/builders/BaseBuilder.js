export class BaseBuilder {
  constructor() {
    this.reset();
  }

  reset() {
    this.product = null;
  }

  getProduct() {
    return this.product;
  }
}
