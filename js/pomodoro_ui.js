
const BUTTON1_STATES = {
    START: 'Start',
    PAUSE: 'Pause',
    RESUME: 'Resume'
}

let pomodoroUI = {
  model: null,

  setModel: function (model) {
    this.model = model;
  },

  setStartButtonState: function (state) {
    const button = document.getElementById('button1');
    button.textContent = state;
    button.disabled = false;
  },

  setStartButtonEnabled: function (enabled) {
    const button = document.getElementById('button1');
    button.disabled = !enabled;
  },

  setResetButtonEnabled: function (enabled) {
    const button = document.getElementById('button2');
    button.disabled = !enabled;
  },

  reset: function () {
    this.setStartButtonState(BUTTON1_STATES.START);
    this.setResetButtonEnabled(false);
  },

  started: function () {
    this.setStartButtonState(BUTTON1_STATES.PAUSE);
    this.setResetButtonEnabled(true);
  },

  paused: function () {
    this.setStartButtonState(BUTTON1_STATES.RESUME);
    this.setResetButtonEnabled(true);
  },

  finished: function () {
    this.setStartButtonEnabled(false);
    this.setResetButtonEnabled(true);
  },

  _timerValueToString: function (value) {
    const mins = Math.floor(value / 60);
    const secs = value - (mins * 60);

    const minsStr = ('00' + mins).slice(-2);
    const secsStr = ('00' + secs).slice(-2);

    return minsStr + ':' + secsStr;
  },

  updateTimerValue: function (value) {
    const valueStr = this._timerValueToString(value);
    const timer = document.getElementById('timer');
    timer.innerText = valueStr;
  },
}

function timerValueToString () {
    const mins = Math.floor(timerValue / 60);
    const secs = timerValue - (mins * 60);

    const minsStr = ('00' + mins).slice(-2);
    const secsStr = ('00' + secs).slice(-2);

    return minsStr + ':' + secsStr;
}

function updateTimerUI () {
    const timerValueStr = timerValueToString();
    const timer = document.getElementById('timer');
    if (timer)
        timer.innerText = timerValueStr;
}

function updateCb () {
    timerValue--;
    updateTimerUI();

    if (timerValue == 0) {
        const button = document.getElementById('button1');
        button.disabled = true;
    }
}

function startTimer () {
    updateTimer();
    intervalId = setInterval(updateTimer, 1000);
}

function setButtonState (state) {
    let text = '';

    const button = document.getElementById('button1');
    button.textContent = state;
    button.disabled = false;
}

function resetTimer () {
    timerValue = defaultTimerValue;
    updateTimerUI();
    timerState = TIMER_STATES.RESET;
}

function setResetButtonState (state) {
    const button = document.getElementById('button2');
    button.disabled = !state;
}

window.addEventListener('DOMContentLoaded', () => {
  pomodoroTimer.reset();
  pomodoroTimer.setUpdateCb(updateCb);
    // setButtonState(BUTTON1_STATES.START);
    // setResetButtonState(false);
});
