import Chart from 'chart.js';
import ChartDeferred from 'chartjs-plugin-deferred';

import {
  stageStats,
  globalStats,
  stages,
  shortNames
} from './data';


export const RenderPopularityCharts = function() {

  const dataSortedByPlayed = Array.from(stageStats).sort((a, b) => {
      if (a.gamesPlayed > b.gamesPlayed)
        return -1;
      if (a.gamesPlayed < b.gamesPlayed)
        return 1;
      return 0;
  });
  const shortLabelsPlayed = dataSortedByPlayed.map(a => a.shortName);
  const stageLabelsPlayed = dataSortedByPlayed.map(a => a.stage);

  const setsPlayedBars = new Chart(document.getElementById("sets-played-bars").getContext('2d'), {
    type: 'horizontalBar',
    data: {
      labels: window.screen.width < 640 ? shortLabelsPlayed : stageLabelsPlayed,
      datasets: [{
          data: dataSortedByPlayed.map(a => (a.setsPlayed / globalStats.totalSets * 100)),
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
        text: 'Played In % Of Sets'
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

  const gamesPlayedBars = new Chart(document.getElementById("games-played-bars").getContext('2d'), {
    type: 'horizontalBar',
    data: {
      labels: window.screen.width < 640 ? shortLabelsPlayed : stageLabelsPlayed,
      datasets: [{
          data: dataSortedByPlayed.map(a => a.gamesPlayed),
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
        text: 'Total Games Played'
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


  const dataSortedByBanned = Array.from(stageStats).sort((a, b) => {
      if (a.gamesBanned > b.gamesBanned)
        return -1;
      if (a.gamesBanned < b.gamesBanned)
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
          data: dataSortedByBanned.map(a => (a.gamesBanned / globalStats.setsWithBanRecorded * 100)),
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
        text: 'Banned In % Of Sets*'
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

}
