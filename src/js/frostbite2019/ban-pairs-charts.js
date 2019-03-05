import Tabulator from 'tabulator-tables';

import {
  stageStats,
  globalStats
} from './data';

export const RenderBanPairsCharts = function() {

  var barPairsTable = new Tabulator("#ban-pairs-table", {
    data: stageStats,
    layout: window.screen.width < 640 ? "fitDataFill" : "fitColumns",
    columns: [
      {title: "Stage", field: "stage", widthGrow: 2, headerSortStartingDir:"desc", frozen: true},
      {title: "#", field: "gamesPlayed", headerSortStartingDir:"desc"},
      {title: "#", field: "gamesBanned", headerSortStartingDir:"desc"},
      {title: "#", field: "setsPlayed", headerSortStartingDir:"desc"},
      {title: "#", field: "setsBanned", headerSortStartingDir:"desc"}
    ]
  });

};