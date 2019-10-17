import Tabulator from 'tabulator-tables';

import {
  banPairs,
  stages,
  shortNames
} from './data';

export const RenderBanPairsCharts = function() {

  // there *might* be a more elegant way to do this with .map or whatever,
  // but I'm out of time

  const pairCountColumns = [{
    title: "",
    field: "stageA",
    frozen: true,
    widthGrow: 2,
    minWidth: 180,
    resizable: false
  }];
  const pairPercentColumns = Array.from(pairCountColumns);

  // potential danger for bugs: the ordering in banPairs array is NOT guaranteed
  // to match the ordering in stages array

  for (let i = 0; i < stages.length; i++) {
    pairCountColumns.push({
      title: shortNames[i],
      field: stages[i],
      headerVertical: "flip",
      align: "right",
      resizable: false
    });
    pairPercentColumns.push({
      title: shortNames[i],
      field: stages[i],
      headerVertical: "flip",
      align: "right",
      resizable: false,
      formatter: function(cell, formatterParams) {
        const result = Number(cell.getValue() / 577 * 36).toFixed(2);
        cell.getElement().style.backgroundColor = `RGBA(130, 16, 15, ${result / 8})`;
        return result;
      }
    });
  }

  var barPairsTableCount = new Tabulator("#ban-pairs-table-count", {
    data: banPairs,
    layout: window.innerWidth < 640 ? "fitDataFill" : "fitColumns",
    columns: pairCountColumns
  });

  var barPairsTablePercent = new Tabulator("#ban-pairs-table-percent", {
    data: banPairs,
    layout: "fitDataFill",
    columns: pairPercentColumns
  });

};