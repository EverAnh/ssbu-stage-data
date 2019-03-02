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

  const playedBars = new Chart(document.getElementById("played-bars").getContext('2d'), {
    type: 'horizontalBar',
    data: {
      labels: window.screen.width < 640 ? 
        dataSortedByPlayed.map(a => a.shortName) : 
        dataSortedByPlayed.map(a => a.stage),
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

}
