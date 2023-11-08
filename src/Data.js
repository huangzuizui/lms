class Data {
  constructor() {
    this.table = [];
    this.id = 0;
  }

  add(datum) {
    if (Object.prototype.toString.call(datum) !== '[object Object]') throw new Error('Data must be an object literal.');

    const newDatum = { id: this.id++, ...datum };
    this.table.push(newDatum);
    return newDatum;
  }

  removeById(id) {
    let removedDatum;
    this.table = this.table.filter(datum => {
      if (datum.id === id) {
        removedDatum = datum;
        return false;
      }
      return true;
    });
    return removedDatum;
  }

  updateById(id, partialDatum) {
    let newDatum;
    this.table = this.table.map(d => {
      if (d.id === id) {
        newDatum = { ...d, ...partialDatum };
        return newDatum;
      } else {
        return d;
      }
    });
    return newDatum;
  }

  list() {
    return this.table;
  }

  find(condition) {
    if (Object.prototype.toString.call(condition) !== '[object Object]') throw new Error('Condition must be an object literal.');

    return this.table.filter(datum => {
      for (let key in condition) {
        if (datum[key] !== condition[key]) {
          return false;
        }
      }
      return true;
    });
  }
}

exports.default = Data;