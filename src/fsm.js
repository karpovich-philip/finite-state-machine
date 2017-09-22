class FSM {
  /**
   * Creates new FSM instance.
   * @param config
   */
  constructor(config) {
    if(config === undefined) {
      throw new Error("Error");
    }

    this.currEvent = ''
    this.currState = 'normal'
    this.states = {
      normal:   true,
      busy:     false,
      hungry:   false,
      sleeping: false
    }
    this.event = {
      getHungry: 'getHungry',
      study:     'study',
      getTired:  'getTired',
      getUp:     'getUp'
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
    if (state === 'normal') {
      this.currState = 'normal';
      this.states.normal = !this.states.normal //подумать надо ли это
    } else if (state === 'busy') {
      this.currState = 'busy';
      this.states.busy = !this.states.busy
    } else if (state === 'hungry') {
      this.currState = 'hungry';
      this.states.hungry = !this.states.hungry
    } else if (state === 'sleeping') {
      this.currState = 'sleeping';
      this.states.sleeping = !this.states.sleeping
    } else throw new Error("Error");
  }

  /**
   * Changes state according to event transition rules.
   * @param event
   */
  trigger(event) {

    var eve = this.currEvent;

    if (eve === 'getHungry') {
      this.states.normal = false;
      this.states.buzy = true;
      this.states.hungry = false;
      this.states.sleeping = true;
    } else if (eve === 'study') {
      this.states.normal = true;
      this.states.buzy = false;
      this.states.hungry = false;
      this.states.sleeping = false;
    } else if (eve === 'getTired') {
      this.states.normal = false;
      this.states.buzy = true;
      this.states.hungry = false;
      this.states.sleeping = false;
    } else if (eve === 'getUp') {
      this.states.normal = false;
      this.states.buzy = false;
      this.states.hungry = false;
      this.states.sleeping = true;
    }

    //getStates(eve);
  }

  /**
   * Resets FSM state to initial.
   */
  reset() {
    this.currState = 'normal';
  }

  /**
   * Returns an array of states for which there are specified event transition rules. ввывести состояния в соответсвии
   * с ивентом Returns all states if argument is undefined.
   * @param event
   * @returns {Array}
   */
  getStates(event) {
    var stateArr = [];
    //      var eve = this.currEvent

    if (event === undefined) {

      for (var key in this.states) {
        stateArr.push(key)
      } return stateArr;

    } else if (event === 'eat') {
      stateArr = []
      return this.states.normal
    } else if (event === 'getHungry') {
      return this.states.hungry
    } else if (event === 'study') {
      return this.states.busy
    } else if (event === 'getTired') {
      return this.states.sleeping
    } else if (event === 'getUp') {
      return this.states.normal
    } else

    return stateArr;
  }

  /**
   * Goes back to previous state.
   * Returns false if undo is not available.
   * @returns {Boolean}
   */
  undo() {

  }

  /**
   * Goes redo to state.
   * Returns false if redo is not available.
   * @returns {Boolean}
   */
  redo() {

  }

  /**
   * Clears transition history
   */
  clearHistory() {

  }
}
module.exports = FSM;
