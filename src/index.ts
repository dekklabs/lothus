declare var $:any;
declare var configuration:any;
let app:any;
let config:any;

if (typeof configuration != 'undefined') {
    config = JSON.parse(configuration);
}

/* Sass */
import './scss/main.scss';

/* Requires */
import './vendor.ts';

//@ts-ignore
import App = require("./ts/app.ts");

document.addEventListener('DOMContentLoaded', () => {
    var app = new App();
});