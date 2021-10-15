// Dependencies for dropdownComponent and listboxComponent:
// https://unpkg.com/@popperjs/core@2.4.4/dist/umd/popper.min.js
// https://unpkg.com/tippy.js@6.2.6/dist/tippy-bundle.umd.min.js


import {
  accordionComponent,
  alertComponent,
  dialogComponent,
  dropdownComponent,
  listboxComponent,
  menubarComponent,
  tableAdvancedComponent,
  tabsComponent
} from './desy-frontend.js';

var aria = aria || {};

accordionComponent(aria);
alertComponent(aria);
dialogComponent(aria);
dropdownComponent(aria);
listboxComponent(aria);
menubarComponent(aria);
tableAdvancedComponent(aria);
tabsComponent(aria);
