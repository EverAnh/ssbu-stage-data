import '../../css/main.scss';

import {MDCDrawer } from '@material/drawer';
import {MDCTopAppBar} from '@material/top-app-bar';

import { RenderPlayRateCharts } from './playrate-charts';
import { RenderOverviewTable } from './overview-table';
import { RenderBanRateCharts } from './banrate-charts';
import { RenderBanPairsCharts } from './ban-pairs-charts';
import { RenderStarterCharts } from './starter-charts';

// responsive top bar title / make the bar contents fit on phones
// Tabulator tables have their own resize listeners too, in overview_table.js

const barTitleElem = document.querySelector('.mdc-top-app-bar__title');

if (window.innerWidth < 640) {
  barTitleElem.innerHTML = "Stage Usage: Frostbite";
}

window.addEventListener('resize', function() {
  if (window.innerWidth < 640) {
    barTitleElem.innerHTML = "Stage Usage: Frostbite";
  }
  else {
    barTitleElem.innerHTML = "SSBU Stage Usage Stats: Frostbite 2019";
  }
});

// material design components

const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));

const topAppBar = MDCTopAppBar.attachTo(document.getElementById('app-bar'));
topAppBar.setScrollTarget(document.getElementById('main-content'));
topAppBar.listen('MDCTopAppBar:nav', () => {
  drawer.open = !drawer.open;
});

// close modal drawer after hitting an item

const listEl = document.querySelector('.mdc-drawer .mdc-list');
const mainContentEl = document.querySelector('.main-content');

listEl.addEventListener('click', (event) => {
  drawer.open = false;
});

document.body.addEventListener('MDCDrawer:closed', () => {
  mainContentEl.querySelector('input, button').focus();
});

// charts

RenderPlayRateCharts();
RenderOverviewTable();
RenderBanRateCharts();
//RenderBanPairsCharts();
RenderStarterCharts();