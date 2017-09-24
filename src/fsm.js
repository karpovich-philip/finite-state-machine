class FSM {
  constructor(config) {
    if(!config) {
      throw new Error("Error");
    }

    this.redoState = false;
    this.undoState = false;
    this.currEvent = null;
    this.prevState = null;
    this.transition = false;
    this.currState = 'normal';
    this.transitions = [
      {name: 'study', from: ['normal'], to: 'busy'},
      {name: 'get_hungry', from: ['busy', 'sleeping'], to: 'hungry'},
      {name: 'get_tired', from: ['busy'], to: 'sleeping'},
      {name: 'get_up', from: ['sleeping'], to: 'normal'},
      {name: 'eat', from: ['hungry'], to: 'normal'},
      {name: 'reset', from: ['hungry', 'sleeping', 'busy'], to: 'normal'}
    ]
    this.states = {
      normal:   true,
      busy:     false,
      hungry:   false,
      sleeping: false
    }
  }

  getState() {
    return this.currState;
  }

  changeState(state) {
    this.prevState = this.currState;
    this.redoState = false;
    this.undoState = true;

    var trans = this.transitions.find(function (n) {
      return n.to === state ? n.to : false;
    });

    if(trans){
      this.currState = trans.to;
      this.transition = true;
    } else throw new Error("Error");
  }

  trigger(event) {
    this.redoState = false;

    var trans = this.transitions.find(function (x) {
      return x.name === event ? x.name : false;
    });

    if (!trans) {
      this.transitions = null;
      throw new Error("Error");
    }
    this.currEvent = event;
    this.changeState(trans.to);
  }

  reset() {
    this.trigger('reset');
  }

  getStates(event) {
    var stateArr = [];

    if (!event) {
      for (var key in this.states) {
        stateArr.push(key)
      } return stateArr;
    }

    for (var i = 0; i < this.transitions.length; i++) {
      if(this.transitions[i].name === event) {
        stateArr = this.transitions[i].from;
        break;
      }
    }
    return stateArr;
  }

  undo() {
    if (this.currState === 'normal') {return false}
    if (!this.undoState) {return false}
    this.currState = this.prevState;
    this.redoState = true;
    if (this.transition) {return true}
  }

  redo() {
    if (!this.redoState) {return false}
    this.trigger(this.currEvent);
    if (this.transition) {return true}
  }

  clearHistory() {
    this.currState = 'normal';
  }
}

module.exports = FSM;
