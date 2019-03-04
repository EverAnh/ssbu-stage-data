import Chart from 'chart.js';
import ChartDeferred from 'chartjs-plugin-deferred';

import {
  stageStats,
  globalStats
} from './data';

export const RenderBanRateCharts = function() {

  const dataSortedByBanned = Array.from(stageStats).sort((a, b) => {
      if (a.setsBanned > b.setsBanned)
        return -1;
      if (a.setsBanned < b.setsBanned)
        return 1;
      return 0;
  });
  const shortLabelsBanned = dataSortedByBanned.map(a => a.shortName);
  const stageLabelsBanned = dataSortedByBanned.map(a => a.stage);

  const gamesBannedBars = new Chart(document.getElementById("games-banned-bars").getContext('2d'), {
    type: 'horizontalBar',
    data: {
      labels: window.screen.width < 640 ? shortLabelsBanned : stageLabelsBanned,
      datasets: [{
          data: dataSortedByBanned.map(a => a.gamesBanned),
          backgroundColor: 'RGBA(171, 0, 14, .8)',
          hoverBackgroundColor: 'RGBA(130, 16, 15, 1)',
          datalabels: {
            display: false
          }
        }
      ]
    },
    options: {
      title: {
        text: 'Total Times Banned'
      },
      legend: {
        display: false
      },
      plugins: {
        datalabels: {
        }
      }
    }
  });

  const setsBannedBars = new Chart(document.getElementById("sets-banned-bars").getContext('2d'), {
    type: 'horizontalBar',
    data: {
      labels: window.screen.width < 640 ? shortLabelsBanned : stageLabelsBanned,
      datasets: [{
          data: dataSortedByBanned.map(a => (a.setsBanned / globalStats.setsWithBanRecorded * 100)),
          backgroundColor: 'RGBA(171, 0, 14, .8)',
          hoverBackgroundColor: 'RGBA(130, 16, 15, 1)',
          datalabels: {
            display: false
          }
        }
      ]
    },
    options: {
      title: {
        text: 'Banned In % Of Sets'
      },
      legend: {
        display: false
      },
      plugins: {
        datalabels: {
        }
      }
    }
  });

};
