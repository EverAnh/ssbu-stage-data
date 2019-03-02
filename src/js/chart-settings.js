import Chart from 'chart.js';
import ChartDeferred from 'chartjs-plugin-deferred';

Chart.defaults.global.defaultFontColor = 'black';
Chart.defaults.global.defaultFontFamily = "'Noto Sans', 'Open Sans', 'Droid Sans', 'Arial', sans-serif";
Chart.defaults.global.defaultFontSize = 16;

Chart.defaults.global.title.display = true;
Chart.defaults.global.title.fontSize = 24;

Chart.defaults.global.legend.position = 'bottom';

Chart.defaults.global.maintainAspectRatio = false;

Chart.defaults.global.plugins.deferred.yOffset = '50%';

Chart.defaults.global.plugins.datalabels.anchor = 'center';
Chart.defaults.global.plugins.datalabels.align = 'end';
Chart.defaults.global.plugins.datalabels.offset = 12;
Chart.defaults.global.plugins.datalabels.clamp = true;
Chart.defaults.global.plugins.datalabels.display = 'auto';

export const colorSettings = {
  backgroundColor: [ // .4
    'rgba(255, 56, 55, .4)',
    'rgba(48, 138, 255, .4)',
    'rgba(255, 188, 22, .4)',
    'rgba(41, 181, 72, .4)',
    'rgba(250, 135, 55, .4)',
    'rgba(46, 210, 235, .4)',
    'rgba(255, 157, 182, .4)',
    'rgba(148, 113, 255, .4)',
    'rgba(135, 255, 205, .4)'
  ],
  borderColor: [
    'rgba(255, 56, 55, 1)',
    'rgba(48, 138, 255, 1)',
    'rgba(255, 188, 22, 1)',
    'rgba(41, 181, 72, 1)',
    'rgba(250, 135, 55, 1)',
    'rgba(46, 210, 235, 1)',
    'rgba(255, 157, 182, 1)',
    'rgba(148, 113, 255, 1)',
    'rgba(135, 255, 205, 1)'
  ],
  borderWidth: 1
};