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
    var item = {
      info: message,
      id: this.uid++
    };
    items.push(item);

    this.model.set('items', items);

    this.handlers.forEach(func => {
      func.call(window, {
        model: this.model,
        push: item
      });
    })


  }

  pushError(message) {
    var items = this.model.get('items');
    var item = {
      error: message,
      id: this.uid++
    };
    items.push(item);

    this.model.set('items', items);

    this.handlers.forEach(func => {
      func.call(window, {
        model: this.model,
        push: item
      });
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
      func.call(window, {
        model: this.model,
        pop: id
      });
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