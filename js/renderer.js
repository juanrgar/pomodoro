'use strict'

const ipcRenderer = require('electron')
const jquery = require('jquery')

function updateCb () {
  let timerValue = pomodoroTimer.getTimerValue();
  pomodoroUI.updateTimerValue(timerValue);

  if (pomodoroTimer.isFinished()) {
    pomodoroUI.finished();
    ipcRenderer.send('pomodoro-finished');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  pomodoroTimer.reset();
  pomodoroTimer.setUpdateCb(updateCb);

  pomodoroUI.reset();
  pomodoroUI.setModel(pomodoroTimer);

  updateCb();

  let projectList = document.getElementById('projectList');
  var proj = document.createElement("option");
  proj.text = "My Project";
  projectList.add(proj);

  jquery('#newProjectForm').hide();
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

document.getElementById('addNewProjectButton').addEventListener('click', () => {
  jquery('#newProjectForm').show(100);
});