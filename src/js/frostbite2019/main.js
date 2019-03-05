import '../../css/main.scss';

import {MDCDrawer } from '@material/drawer';
import {MDCTopAppBar} from '@material/top-app-bar';

import { RenderPlayRateCharts } from './playrate-charts';
import { RenderOverviewTable } from './overview-table';
import { RenderBanRateCharts } from './banrate-charts';
import { RenderStarterCharts } from './starter-charts';

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
RenderStarterCharts();