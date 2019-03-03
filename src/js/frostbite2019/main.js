import '../../css/main.scss';

import {MDCDrawer } from "@material/drawer";
import {MDCTopAppBar} from "@material/top-app-bar";

import { RenderPopularityCharts } from './popularity-charts';
import { RenderStageSummaryTable } from './summary-table';
import { RenderBanCharts } from './ban-charts';
import { RenderGame1Charts } from './game1-charts';

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

// charts

RenderPopularityCharts();
RenderStageSummaryTable();
RenderBanCharts();

RenderGame1Charts();
