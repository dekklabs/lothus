declare var $: any;
let baseRouter = {
    routers: {}
}

var PATH_REGEXP = new RegExp([
    // Match escaped characters that would otherwise appear in future matches.
    // This allows the user to escape special characters that won't transform.
    '(\\\\.)',
    // Match Express-style parameters and un-named parameters with a prefix
    // and optional suffixes. Matches appear as:
    //
    // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
    // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
    // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
    '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

let router = {
    parse(str: any) {
        var _this = this;
        var tokens = [];
        var key = 0;
        var index = 0;
        var path = '';
        var res;

        while ((res = PATH_REGEXP.exec(str)) != null) {
            var m = res[0];
            var escaped = res[1];
            var offset = res.index;
            path += str.slice(index, offset);
            index = offset + m.length;

            // Ignore already escaped sequences.
            if (escaped) {
                path += escaped[1];
                continue
            }

            // Push the current path onto the tokens.
            if (path) {
                tokens.push(path);
                path = '';
            }

            var prefix = res[2];
            var name = res[3];
            var capture = res[4];
            var group = res[5];
            var suffix = res[6];
            var asterisk = res[7];

            var repeat = suffix === '+' || suffix === '*';
            var optional = suffix === '?' || suffix === '*';
            var delimiter = prefix || '/';
            var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?');

            tokens.push({
                name: name || key++,
                prefix: prefix || '',
                delimiter: delimiter,
                optional: optional,
                repeat: repeat,
                pattern: _this.escapeGroup(pattern)
            });
        }
        // Match any characters still remaining.
        if (index < str.length) {
            path += str.substr(index);
        }
        // If the path exists, push it onto the end.
        if (path) {
            tokens.push(path);
        }
        return tokens
    },
    getUrl() {
        return window.location
    },
    getBaseUrl() {
        let _url = this.getUrl()
        return _url.protocol + "//" + _url.host + "/" + _url.pathname.split('/')[1]
    },
    clearBase(url) {
        let _url = this.getUrl()
        return url.replace((_url.protocol + "//" + _url.host), "")
    },
    getUrlPath() {
        let _url = this.getUrl()
        return _url.pathname.split('/')
    },
    escapeString(str) {
        return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1')
    },
    add(url: any, callback: any) {
        let __url = this.getBaseUrl()
        let _parse = this.parse(__url)
        let _check = this.clearBase(_parse[0])
        if ($.isArray(url)) {
            url.forEach(element => {
                //console.log(element, _check)
                if (element === _check) {
                    return callback(true)
                }
            });
        } else {
            if (url === _check) {
                callback(true)
            }
        }
        
    }
}

export = router;