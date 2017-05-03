class FlashClass {


  constructor() {
    var flashModel = Bb.Model.extend();
    this.model = new flashModel({
      items: []
    });
    this.uid = 0;
    this.handlers = [];
  }

  pushInfo(message) {
    var items = this.model.get('items');
    items.push({
      info: message,
      id: this.uid++
    });

    this.model.set('items', items);

    this.handlers.forEach(func => {
      func.call(window, this.model);
    })
  }

  pushError(message) {
    var items = this.model.get('items');
    items.push({
      error: message,
      id: this.uid++
    });

    this.model.set('items', items);

    this.handlers.forEach(func => {
      func.call(window, this.model);
    })
  }

  removeAlert(id) {
    var items = this.model.get('items');

    items = items.filter(item => {
      if (item.id !== id)
        return item;
    });

    this.model.set('items', items);

    this.handlers.forEach(func => {
      func.call(window, this.model);
    });
  }


  subscribe(onChange) {
    this.handlers.push(onChange);
  }

  unsubscribe(onChange) {
    this.handlers = this.handlers.filter(item => {
      if (item !== onChange)
        return item;
    });
  }
}

var flashSingleton = new FlashClass();

module.exports = flashSingleton;