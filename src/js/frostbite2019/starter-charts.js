import Chart from 'chart.js';
import ChartDeferred from 'chartjs-plugin-deferred';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { colorSettings } from '../chart-settings';

const MANUAL_DATA = {
  g1TotalGames: 535,
  g1TotalAgreed: 315,
  g1TotalStriked: 213,
  game3Played: 115,
  starterNames: ['Pokémon Stadium 2','Battlefield','Town And City','Smashville','Final Destination'],
  shortStarters: ['PS2', 'BF', 'SV', 'FD', 'T&C'],
  g1AgreedData: [270, 16, 10, 14, 5],
  g1StrikedData: [50, 62, 56, 30, 15]
};

export const RenderStarterCharts = function() {

  const selectionMethodPie = new Chart(document.getElementById("selection-method-pie").getContext('2d'), {
    type: 'pie',
    data: {
      labels: ["Striking", "Mutual Agreement"],
      datasets: [Object.assign({
        label: 'Sets',
        data: [MANUAL_DATA.g1TotalStriked, MANUAL_DATA.g1TotalAgreed]
      },colorSettings)]
    },
    options: {
      title: {
        text: 'Selection Method'
      },
      plugins: {
        datalabels: {
          formatter: function (value, context) {
            return Math.round(value / MANUAL_DATA.g1TotalGames * 100) + "%";
          }
        }
      },
      legend: {
        reverse: true
      }
    }
  });

  const agreedStagePie = new Chart(document.getElementById("agreed-stage-pie").getContext('2d'), {
    type: 'pie',
    data: {
      labels: MANUAL_DATA.starterNames,
      datasets: [Object.assign({
        label: 'Sets',
        data: MANUAL_DATA.g1AgreedData,
        datalabels: {
          display: function(context) {
            return context.dataIndex < context.dataset.data.length - 1;
          }
        }
      },colorSettings)]
    },
    options: {
      title: {
        text: 'Starters Via Agreement'
      },
      plugins: {
        datalabels: {
          formatter: function (value, context) {
            return Math.round(value / MANUAL_DATA.g1TotalAgreed * 100) + "%";
          }
        }
      }
    }
  });

  const strikedStagePie = new Chart(document.getElementById("striked-stage-pie").getContext('2d'), {
    type: 'pie',
    data: {
      labels: MANUAL_DATA.starterNames,
      datasets: [Object.assign({
        label: 'Sets',
        data: MANUAL_DATA.g1StrikedData
      },colorSettings)]
    },
    options: {
      title: {
        text: 'Starters Via Striking'
      },
      plugins: {
        datalabels: {
          formatter: function (value, context) {
            return Math.round(value / MANUAL_DATA.g1TotalStriked * 100) + "%";
          }
        }
      }
    }
  });

  const game1StackedBars = new Chart(document.getElementById("game1-stacked-bars").getContext('2d'), {
    type: 'horizontalBar',
    data: {
      labels: window.screen.width < 640 ? MANUAL_DATA.shortStarters : MANUAL_DATA.starterNames,
      datasets: [{
          label: 'Agreement',
          data: MANUAL_DATA.g1AgreedData,
          backgroundColor: 'RGBA(110, 105, 250, .8)',
          datalabels: {
            display: false
          }
        }, {
          label: 'Striking',
          data: MANUAL_DATA.g1StrikedData,
          backgroundColor: 'RGBA(148, 113, 255, .6)',
          datalabels: {
            display: false
          }
        }, 
      ]
    },
    options: {
      title: {
        text: 'All G1 Stages, Both Methods'
      },
      plugins: {
        datalabels: {
        }
      },
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          stacked: true
        }]
      }
    }
  });

}