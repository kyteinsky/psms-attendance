'use strict';

const { fn } = require('./index.js');

//										year, month 0-11, date, hour, min (can add ,sec,msec)
var eta_ms = new Date(2021,			6,			 7,		 9,		 0	).getTime() - Date.now();
var timeout = setTimeout(() => fn(), eta_ms);
