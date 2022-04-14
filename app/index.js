import clock from "clock";
import document from "document";
import { battery } from "power";
import userActivity from "user-activity";
import * as Utils from '../common/utils';

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

// Fetch handles to UI elements
const stepCount = document.getElementById("stepCount");
const batGauge = document.getElementById("batGauge");
const dateString = document.getElementById("dateString");
const hrNumber = document.getElementById("hrNumber");
const minNumber = document.getElementById("minNumber");
//const debug = document.getElementById("debug");
const glitter = document.getElementById("glitter");


// clock colors
let clockColor, clockTime;

// Initialize
init();

// Update the clock every second
clock.granularity = "seconds";

// Update current time every second
clock.ontick = (evt) => {
  clockTime = evt.date;
  render(clockTime);
}

function init() {
  clockTime = null;
}

// Render clock face according to color and time
function render(time) {
  
  let currentType = "steps";
  let currentDataProg = (userActivity.today.adjusted[currentType] || 0);
  let currentDataGoal = userActivity.goals[currentType];
  
  
  // the x position varies from y=300 to y=60 as the step goal goes from 0 to 100%
  let goalPercent = currentDataProg/currentDataGoal*100;
  if (goalPercent > 100) {
    goalPercent = 100;
  }
  glitter.y = -2.4*goalPercent + 300;
  
  dateString.text = days[time.getDay()] + ' '+ time.getDate().toString() + ' '+  months[time.getMonth()];
  hrNumber.text = time.getHours().toString();
  minNumber.text = Utils.zeroPad(time.getMinutes());
  stepCount.text = currentDataProg + ' steps';
  batGauge.text = Math.floor(battery.chargeLevel) + "%";
  
  //debug.text = currentDataProg + ' of ' + currentDataGoal;
}
