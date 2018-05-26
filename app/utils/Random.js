export class Random {
  constructor(min, max) {
    if (max <= min) throw "max must less than min";

    this.min = min;
    this.max = max;
    this.results = [];
  }

  clear() {
    this.results.clear();
  }

  next() {
    if (this.results.length === this.max - this.min + 1)
      throw "maximent random value hitted";

    let value =
      this.min + Math.floor(Math.random() * Math.floor(this.max - this.min));
    while (this.results.indexOf(value) > -1) {
      value++;
      if (value > this.max) value = this.min;
    }

    this.results.push(value);

    return value;
  }
}
