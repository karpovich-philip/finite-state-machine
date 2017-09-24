class FSM {
  /**
   * Creates new FSM instance.
   * @param config
   */
  constructor(config) {
    if(config === undefined) {
      throw new Error("Error");
    }

    this.redoState = false;
    this.undoState = false;
    this.currEvent = null;
    this.prevState = 'normal';
    this.transition = false;
    this.currState = 'normal'
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

  /**
   * Returns active state.
   * @returns {String}
   */
  getState() {
    return this.currState;
  }

  /**
   * Goes to specified state.
   * @param state
   */
  changeState(state) {
    this.prevState = this.currState;
    this.redoState = false;

    var st = this.transitions.find(function (x) {
      return x.to === state ? x.to : undefined;
    });

    if(st){
      this.currState = st.to;
      this.transition = true;
    } else
      throw new Error("Error");
  }

  /**
   * Changes state according to event transition rules.
   * @param event
   */
  trigger(event) {
    this.redoState = false;

    var transition = this.transitions.find(function (x) {
      return x.name === event ? x.name : undefined;
    });

    if(!transition){
      throw new Error("Error");
    }
    this.currEvent = event;

    this.changeState(transition.to);
  }


  /**
   * Resets FSM state to initial.
   */
  reset() {
    this.trigger('reset');
  }

  /**
   * Returns an array of states for which there are specified event transition rules. ввывести состояния в соответсвии
   * с ивентом Returns all states if argument is undefined.
   * @param event
   * @returns {Array}
   */
  getStates(event) {
    var stateArr = [];

    if (event === undefined) {
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

  /**
   * Goes back to previous state.
   * Returns false if undo is not available.
   * @returns {Boolean}
   */
  undo() {
    if (this.currState === 'normal') {
      return false
    }

    if (!this.undoState) {
      return false
    }

    this.currState = this.prevState;
    this.redoState = true;

    if (this.transition) {
      return true
    }

  }

  /**
   * Goes redo to state.
   * Returns false if redo is not available.
   * @returns {Boolean}
   */
  redo() {
    if (!this.redoState) {
      return false
    }

    this.trigger(this.currEvent);

    if (this.transition) {
      return true
    }
  }

  /**
   * Clears transition history
   */
  clearHistory() {
    this.redoState = false;
    this.undoState = false;
    this.currEvent = null;
    this.prevState = null;
    //this.prevEvent = null;
    this.transition = false
    this.currState = 'normal'
  }
}

module.exports = FSM;
