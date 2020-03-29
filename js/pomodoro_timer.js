const TIMER_STATES = {
    RESET: 'reset',
    RUNNING: 'running',
    PAUSED: 'paused'
}

const defaultTimerValue = 1 * 60;

let pomodoroTimer = {
  state: TIMER_STATES.RESET,
  timerValue: 0,
  updateIntervalId: -1,
  updateCb: null,

  reset: function () {
    if (this.isRunning()) {
      this._stop();
    }

    this.state = TIMER_STATES.RESET;
    this.timerValue = defaultTimerValue;
  },

  getTimerValue: function () {
    return this.timerValue;
  },

  resume: function () {
    this._update();
    this.updateIntervalId = setInterval(this._update, 1000);
    this.state = TIMER_STATES.RUNNING;
  },

  pause: function () {
    this._stop();
    this.state = TIMER_STATES.PAUSED;
  },

  _stop: function () {
    clearInterval(this.updateIntervalId);
    this.updateIntervalId = -1;
  },

  toggle: function () {
    if (this.state == TIMER_STATES.RESET) {
      this.resume();
    } else if (this.state == TIMER_STATES.RUNNING) {
      this.pause();
    } else if (this.state == TIMER_STATES.PAUSED) {
      this.resume();
    }
  },

  setUpdateCb: function (cb) {
    this.updateCb = cb;
  },

  _update: function () {
    if (this.timerValue > 0) {
      this.timerValue--;
    }

    if (this.timerValue == 0) {
      this._stop();
    }

    // This should be the last step.
    if (this.updateCb != null) {
      this.updateCb();
    }
  },

  isRunning: function () {
    return this.updateIntervalId != -1;
  },

  isFinished: function () {
    return !this.isRunning() && (this.timerValue == 0);
  },
}

// Bind callbacks
pomodoroTimer._update = pomodoroTimer._update.bind(pomodoroTimer);