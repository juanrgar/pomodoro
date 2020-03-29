
function updateCb () {
  let timerValue = pomodoroTimer.getTimerValue();
  pomodoroUI.updateTimerValue(timerValue);
}

window.addEventListener('DOMContentLoaded', () => {
  pomodoroTimer.reset();
  pomodoroTimer.setUpdateCb(updateCb);

  pomodoroUI.reset();
  pomodoroUI.setModel(pomodoroTimer);

  updateCb();
});

document.getElementById('button1').addEventListener('click', () => {
  pomodoroTimer.toggle();

  if (pomodoroTimer.isRunning()) {
    pomodoroUI.started();
  } else {
    pomodoroUI.paused();
  }
});

document.getElementById('button2').addEventListener('click', () => {
    // resetTimer();
    // setButtonState(BUTTON_STATES.START);
    // setResetButtonState(false);
});
