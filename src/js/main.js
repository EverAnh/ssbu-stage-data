import Chart from 'chart.js';
import ChartDeferred from 'chartjs-plugin-deferred';

import {
  decisionMethodData,
  agreedStageData,
  strikedStageData
} from './data-manual';

var decisionMethodChart = new Chart(document.getElementById("decision-method-chart").getContext('2d'), {
    type: 'pie',
    data: decisionMethodData,
    options: {
      title: {
        text: 'How Game 1 Stage Was Decided'
      },
      legend: {
        reverse: true
      }
    }
});

var agreedStageChart = new Chart(document.getElementById("agreed-stage-chart").getContext('2d'), {
    type: 'pie',
    data: agreedStageData,
    options: {
      title: {
        text: 'Which Stage Mutually Agreed Upon'
      }
    }
});

var strikedStageChart = new Chart(document.getElementById("striked-stage-chart").getContext('2d'), {
    type: 'pie',
    data: strikedStageData,
    options: {
      title: {
        text: 'Which Stage Selected With Striking'
      }
    }
});
