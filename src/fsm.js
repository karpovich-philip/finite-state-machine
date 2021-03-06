class FSM {
  constructor(config) {
    if (!config) {
      throw new Error("Error");
    }

    this.currState = 'normal';
    this.transition = false;
    this.redoState = false;
    this.undoState = false;
    this.currEvent = null;
    this.prevState = null;
    this.transitions = [
      {name: 'get_up', from: ['sleeping'], to: 'normal'},
      {name: 'study', from: ['normal'], to: 'busy'},
      {name: 'get_hungry', from: ['busy', 'sleeping'], to: 'hungry'},
      {name: 'get_tired', from: ['busy'], to: 'sleeping'},
      {name: 'eat', from: ['hungry'], to: 'normal'},
      {name: 'reset', from: ['hungry', 'sleeping', 'busy'], to: 'normal'}
    ]
  }

  getState() {
    return this.currState;
  }

  changeState(state) {
    this.prevState = this.currState;
    this.redoState = false;
    this.undoState = true;

    let trans = this.transitions.find(n => n.to === state ? n.to : false);

    if(trans){
      this.currState = trans.to;
      this.transition = true;
    } else throw new Error("Error");
  }

  trigger(event) {
    this.redoState = false;

    let trans = this.transitions.find(x => x.name === event ? x.name : false);

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
    let stateArr = [];
    let trans = this.transitions;

    if (!event) {
      for (let j = 0; j < trans.length-2; j++) {
        stateArr.push(trans[j].to)
      }
      return stateArr;
    }

    for (let i = 0; i < trans.length; i++) {
      if(trans[i].name === event) {
        stateArr = trans[i].from;
        break;
      }
    }
    return stateArr;
  }

  undo() {
    if (!this.undoState || this.currState === 'normal') {
      return false
    }
    this.currState = this.prevState;
    this.redoState = true;
    if (this.transition) {
      return true
    }
  }

  redo() {
    if (!this.redoState) {
      return false
    }
    this.trigger(this.currEvent);
    if (this.transition) {
      return true
    }
  }

  clearHistory() {
    this.currState = 'normal';
  }
}

module.exports = FSM;
