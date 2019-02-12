import Chart from 'chart.js';
import ChartDeferred from 'chartjs-plugin-deferred';
import Tabulator from 'tabulator-tables';

import {
  selectionMethodData,
  agreedStageData,
  strikedStageData
} from './data-manual';

import {
  stageStats
} from './data-procedural';

var selectionMethodChart = new Chart(document.getElementById("selection-method-chart").getContext('2d'), {
    type: 'pie',
    data: selectionMethodData,
    options: {
      title: {
        text: 'Game 1 Selection Method'
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
