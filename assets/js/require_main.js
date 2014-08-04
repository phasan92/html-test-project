requirejs.config({
    baseUrl: "assets/js",
    paths: {
        app: "app",
        backbone: "vendor/backbone-min",
        bootstrap: "vendor/bootstrap.min",
        custom: "custom",
        handsontable: "vendor/jquery.handsontable",
        isotope: "vendor/isotope.pkgd.min",
        jquery: "vendor/jquery-1.10.2.min",
        "jquery-cookies" : "vendor/jquery.cookies",
        "jquery-migrate": "vendor/jquery-migrate-1.2.1.min",
        "jquery-sparkline": "vendor/jquery.sparkline.min",
        "jquery-ui": "vendor/jquery-ui.min",
        json2: "vendor/json2",
        marionette: "vendor/backbone.marionette.min",
        modenizr: "vendor/modernizr.min",
        moment: "vendor/moment.min",
        "numeral": "vendor/numeral",
        oauth: "vendor/oauth",
        pusher: "//js.pusher.com/2.1/pusher.min",
        retina: "vendor/retina.min",
        syphon: "vendor/backbone.syphon.min",
        toasty: "vendor/toasty-min",
        toggles: "vendor/toggles.min",
        tpl: "vendor/tpl",
        underscore: "vendor/underscore"
    },
    shim: {
        backbone: {
            deps: ["jquery", "underscore", "json2"],
            exports: "Backbone"
        },
        bootstrap: ["jquery"],
        handsontable: ["jquery-ui", "numeral"],
        "jquery-cookies": ["jquery"],
        "jquery-migrate": ["jquery"],
        "jquery-sparkline": ["jquery"],
        "jquery-ui": {
            deps: ["jquery"],
            exports: "$"
        },
        marionette: {
            deps: ["backbone"],
            exports: "Marionette"
        },
        toasty: ["jquery"],
        toggles: ["jquery"],
        underscore: {
            exports: "_"
        }
    }
});
require(["custom","app","jquery-ui"], function (custom, Ration) {
    custom.start();
    Ration.start();
});
