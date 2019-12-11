

//window._ = require('lodash');
try {
    //@ts-ignore
    window.Popper = require('popper.js').default;
    //@ts-ignore
    window.$ = window.jQuery = require('jquery');
    require('bootstrap');
} catch (e) {}

import 'jquery-lazyload';

import 'slick-carousel';
import 'optiscroll';
//import 'swiper';
//require('swiper/js/swiper.esm.js');

import './libs/bootstrapvalidator/dist/js/bootstrapValidator.js';

import 'intl-tel-input/build/js/intlTelInput-jquery.min.js';



