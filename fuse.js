const {
    FuseBox,
    EnvPlugin,
    CSSModules,
    CSSResourcePlugin,
    CSSPlugin,
    SassPlugin,
    WebIndexPlugin,
    UglifyJSPlugin,
    QuantumPlugin,
    Sparky
} = require("fuse-box");

let fuse, app, vendor, isProduction = false;

Sparky.task("config", () => {
    fuse = FuseBox.init({
        homeDir: "src",
        target: "browser",
        output: "dist/js/$name.js",
        modulesFolder: "node_modules",
        useTypescriptCompiler : true,
        tsConfig : [{ target : `es5` }],
        hash:  false,
        sourceMaps: !isProduction,
        plugins: [
            EnvPlugin({NODE_ENV: isProduction ? "production" : "development"}),
            [
                SassPlugin({
                    importer: true,
                    indentedSyntax: false,
                    outputStyle: 'compressed',
                    ourceMap: `./dist/css/bundle-static.css.map`,
                    macros: { "$vendor": __dirname + "/node_modules/" },
                    outFile: '',
                }),
                CSSPlugin({
                    outFile: file => `./dist/css/bundle-static.css`,
                    inject: isProduction ? false : file => `/wp-content/themes/azafran/dist/css/bundle-static.css?1`,
                    //inject: false
                })
            ]/*,
            [
            ]*/,
            //isProduction && UglifyJSPlugin()
            isProduction && QuantumPlugin({
                target: 'browser',
                //target: "universal",
                uglify: true,
                treeshake: false,
                bakeApiIntoBundle : 'vendor',
                containedAPI: false,
                manifest: false,
                warnings: false,
                removeExportsInterop: true,
                css: {
                    clean: true
                },
                //extendServerImport: true
            })
        ],
        shim: {
            jquery: {
                source: 'node_modules/jquery/dist/jquery.js',
                exports: '$'
            },
            Popper: {
                source: 'node_modules/popper.js/dist/umd/popper.js',
                exports: 'Popper'
            },
            bootstrap: {
                source: 'node_modules/bootstrap/dist/js/bootstrap.js',
                source: 'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
                exports: 'bootstrap'
            },
            underscore: {
                source: 'node_modules/underscore/underscore-min.js',
                exports: '_'
            },
        }
    });

     vendor = fuse.bundle("vendor")
          .instructions("~ **/**.ts");
    
    app = fuse.bundle("app")
        .instructions("> [index.ts]");

    if (!isProduction)
        fuse.dev({
            open: true,
            httpServer: false,
            port : 8181,
            socketURI: 'ws://localhost:8181'
        });
});

Sparky.task("default", ["config"], () => {
    app.hmr({
        socketURI: 'ws://localhost:8181'
    }).watch();
    return fuse.run();
});

Sparky.task("dist", ["set-production", "config"], () => {
    return fuse.run();
});

Sparky.task("set-production", () => {
    isProduction = true;
    return Sparky.src("dist/");/*.clean("dist/");*/
});

Sparky.task("test", ["config"], () => {
    return app.test();
});