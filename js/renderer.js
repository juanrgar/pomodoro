
function updateCb () {
  let timerValue = pomodoroTimer.getTimerValue();
  pomodoroUI.updateTimerValue(timerValue);

  if (pomodoroTimer.isFinished()) {
    pomodoroUI.finished();
  }
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
  pomodoroTimer.reset();

  pomodoroUI.reset();

  updateCb();
});
