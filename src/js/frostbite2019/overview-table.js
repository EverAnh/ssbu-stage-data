import Tabulator from 'tabulator-tables';

import {
  stageStats,
  globalStats
} from './data';

// ----
// function definitions
// ----

// this is called in two places: before constructing the Tabulator table, and
// inside a resize event listener
function adjustTableSettings(columnDefinitions) {
  if (window.screen.width < 640) {
    columnDefinitions[0].field = "shortName";
  }
  else {
    columnDefinitions[0].field = "stage";
  }
}

// This function gets passed to a formatter in the columns definition array.
// Defining it here keeps that column definition more neat.
function colorStarterRows(cell, formatterParams) {
  var cellValue = cell.getValue();
  if (cellValue) {
    const rowElement = cell.getRow().getElement();
    rowElement.classList.remove("light-yellow");
    rowElement.classList.remove("dark-yellow");
    rowElement.classList.add(rowElement.classList.contains("tabulator-row-odd") ? "light-yellow" : "dark-yellow");
  }
  return cellValue;
}

// another column formatter
function formatAsPercent(cell, formatterParams) {
  return Math.round(cell.getValue() * 100) + "%";
}

// ----
// general/overall summary table (tabulator)
// ----
export const RenderOverviewTable = function() {

  // Append percentages, a simple derived value, in decimal format.
  // Do not convert to a string that includes the % sign,
  // because that messes up the table's sorting.
  stageStats.forEach((e) => {
    e.gamesPlayedPercent = e.gamesPlayed / globalStats.totalGames;
    e.setsPlayedPercent = e.setsPlayed / globalStats.totalSets;
    e.gamesBannedPercent = e.gamesBanned / globalStats.totalBans;
    e.setsBannedPercent = e.setsBanned / globalStats.setsWithBanRecorded;
  });

  var stageStatsColumns = [
    {title: "Stage", field: "stage", widthGrow: 2, headerSortStartingDir:"desc", frozen: true},
    {title: "Starter", field: "starter", widthGrow: 0, widthShrink: 1, visible: false, formatter: colorStarterRows},
    {title: "Games Played", widthGrow: 1, columns: [
      {title: "#", field: "gamesPlayed", headerSortStartingDir:"desc"},
      {title: "%", field: "gamesPlayedPercent", headerSortStartingDir:"desc", formatter: formatAsPercent}
    ]},
    {title: "Times Banned", widthGrow: 1, columns: [
      {title: "#", field: "gamesBanned", headerSortStartingDir:"desc"},
      {title: "%", field: "gamesBannedPercent", headerSortStartingDir:"desc", formatter: formatAsPercent},
    ]},
    {title: "Sets Played In", widthGrow: 1, columns: [
      {title: "#", field: "setsPlayed", headerSortStartingDir:"desc"},
      {title: "%", field: "setsPlayedPercent", headerSortStartingDir:"desc", formatter: formatAsPercent},
    ]},
    {title: "Sets Banned In", widthGrow: 1, columns: [
      {title: "#", field: "setsBanned", headerSortStartingDir:"desc"},
      {title: "%", field: "setsBannedPercent", headerSortStartingDir:"desc", formatter: formatAsPercent},
    ]}
  ];

  adjustTableSettings(stageStatsColumns);

  var stageStatsTable = new Tabulator("#overview-table", {
    data: stageStats,
    layout: window.screen.width < 640 ? "fitDataFill" : "fitColumns",
    initialSort:[{column:"gamesPlayed", dir:"desc"}],
    columns: stageStatsColumns
  });

  window.addEventListener('resize', function() {
    adjustTableSettings(stageStatsColumns);
    stageStatsTable.setColumns(stageStatsColumns);
    stageStatsTable.layout = window.screen.width < 640 ? "fitDataFill" : "fitColumns";
    console.log("resize triggered, layout: " + stageStatsTable.layout);
    stageStatsTable.redraw(true);
  });

}