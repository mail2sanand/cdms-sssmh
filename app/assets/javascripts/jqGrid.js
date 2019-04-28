/**
*
* @license Guriddo jqGrid JS - v5.3.2 - 2019-01-11
* Copyright(c) 2008, Tony Tomov, tony@trirand.com
* 
* License: http://guriddo.net/?page_id=103334
*/

!function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function($) {
    "use strict";
    function _pivotfilter(a, b) {
        var c, d, e, f = [];
        if (!this || "function" != typeof a || a instanceof RegExp)
            throw new TypeError;
        for (e = this.length,
        c = 0; c < e; c++)
            if (this.hasOwnProperty(c) && (d = this[c],
            a.call(b, d, c, this))) {
                f.push(d);
                break
            }
        return f
    }
    $.jgrid = $.jgrid || {},
    $.jgrid.hasOwnProperty("defaults") || ($.jgrid.defaults = {}),
    $.extend($.jgrid, {
        version: "5.3.2",
        htmlDecode: function(a) {
            return a && ("&nbsp;" === a || "&#160;" === a || 1 === a.length && 160 === a.charCodeAt(0)) ? "" : a ? String(a).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&") : a
        },
        htmlEncode: function(a) {
            return a ? String(a).replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : a
        },
        template: function(a) {
            var b, c = $.makeArray(arguments).slice(1), d = c.length;
            return null == a && (a = ""),
            a.replace(/\{([\w\-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g, function(a, e) {
                if (!isNaN(parseInt(e, 10)))
                    return c[parseInt(e, 10)];
                for (b = 0; b < d; b++)
                    if ($.isArray(c[b]))
                        for (var f = c[b], g = f.length; g--; )
                            if (e === f[g].nm)
                                return f[g].v
            })
        },
        msie: function() {
            return $.jgrid.msiever() > 0
        },
        msiever: function() {
            var a = 0
              , b = window.navigator.userAgent
              , c = b.indexOf("MSIE");
            return c > 0 ? a = parseInt(b.substring(c + 5, b.indexOf(".", c))) : navigator.userAgent.match(/Trident\/7\./) && (a = 11),
            a
        },
        getCellIndex: function(a) {
            var b = $(a);
            return b.is("tr") ? -1 : (b = (b.is("td") || b.is("th") ? b : b.closest("td,th"))[0],
            $.jgrid.msie() ? $.inArray(b, b.parentNode.cells) : b.cellIndex)
        },
        stripHtml: function(a) {
            a = String(a);
            var b = /<("[^"]*"|'[^']*'|[^'">])*>/gi;
            return a ? (a = a.replace(b, ""),
            a && "&nbsp;" !== a && "&#160;" !== a ? a.replace(/\"/g, "'") : "") : a
        },
        stripPref: function(a, b) {
            var c = $.type(a);
            return "string" !== c && "number" !== c || (a = String(a),
            b = "" !== a ? String(b).replace(String(a), "") : b),
            b
        },
        useJSON: !0,
        parse: function(jsonString) {
            var js = jsonString;
            return "while(1);" === js.substr(0, 9) && (js = js.substr(9)),
            "/*" === js.substr(0, 2) && (js = js.substr(2, js.length - 4)),
            js || (js = "{}"),
            !0 === $.jgrid.useJSON && "object" == typeof JSON && "function" == typeof JSON.parse ? JSON.parse(js) : eval("(" + js + ")")
        },
        parseDate: function(a, b, c, d) {
            var e, f, g, h = /\\.|[dDjlNSwzWFmMntLoYyaABgGhHisueIOPTZcrU]/g, i = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g, j = /[^-+\dA-Z]/g, k = new RegExp("^/Date\\((([-+])?[0-9]+)(([-+])([0-9]{2})([0-9]{2}))?\\)/$"), l = "string" == typeof b ? b.match(k) : null, m = function(a, b) {
                for (a = String(a),
                b = parseInt(b, 10) || 2; a.length < b; )
                    a = "0" + a;
                return a
            }, n = {
                m: 1,
                d: 1,
                y: 1970,
                h: 0,
                i: 0,
                s: 0,
                u: 0
            }, o = 0, p = function(a, b) {
                return 0 === a ? 12 === b && (b = 0) : 12 !== b && (b += 12),
                b
            }, q = 0;
            if (void 0 === d && (d = $.jgrid.getRegional(this, "formatter.date")),
            void 0 === d.parseRe && (d.parseRe = /[#%\\\/:_;.,\t\s-]/),
            d.masks.hasOwnProperty(a) && (a = d.masks[a]),
            b && null != b)
                if (isNaN(b - 0) || "u" !== String(a).toLowerCase())
                    if (b.constructor === Date)
                        o = b;
                    else if (null !== l)
                        o = new Date(parseInt(l[1], 10)),
                        l[3] && (q = 60 * Number(l[5]) + Number(l[6]),
                        q *= "-" === l[4] ? 1 : -1,
                        q -= o.getTimezoneOffset(),
                        o.setTime(Number(Number(o) + 60 * q * 1e3)));
                    else {
                        for ("ISO8601Long" === d.srcformat && "Z" === b.charAt(b.length - 1) && (q -= (new Date).getTimezoneOffset()),
                        b = String(b).replace(/\T/g, "#").replace(/\t/, "%").split(d.parseRe),
                        a = a.replace(/\T/g, "#").replace(/\t/, "%").split(d.parseRe),
                        f = 0,
                        g = a.length; f < g; f++) {
                            switch (a[f]) {
                            case "M":
                                e = $.inArray(b[f], d.monthNames),
                                -1 !== e && e < 12 && (b[f] = e + 1,
                                n.m = b[f]);
                                break;
                            case "F":
                                e = $.inArray(b[f], d.monthNames, 12),
                                -1 !== e && e > 11 && (b[f] = e + 1 - 12,
                                n.m = b[f]);
                                break;
                            case "n":
                                a[f] = "m";
                                break;
                            case "j":
                                a[f] = "d";
                                break;
                            case "a":
                                e = $.inArray(b[f], d.AmPm),
                                -1 !== e && e < 2 && b[f] === d.AmPm[e] && (b[f] = e,
                                n.h = p(b[f], n.h));
                                break;
                            case "A":
                                e = $.inArray(b[f], d.AmPm),
                                -1 !== e && e > 1 && b[f] === d.AmPm[e] && (b[f] = e - 2,
                                n.h = p(b[f], n.h));
                                break;
                            case "g":
                                n.h = parseInt(b[f], 10)
                            }
                            void 0 !== b[f] && (n[a[f].toLowerCase()] = parseInt(b[f], 10))
                        }
                        if (n.f && (n.m = n.f),
                        0 === n.m && 0 === n.y && 0 === n.d)
                            return "&#160;";
                        n.m = parseInt(n.m, 10) - 1;
                        var r = n.y;
                        r >= 70 && r <= 99 ? n.y = 1900 + n.y : r >= 0 && r <= 69 && (n.y = 2e3 + n.y),
                        o = new Date(n.y,n.m,n.d,n.h,n.i,n.s,n.u),
                        0 !== q && o.setTime(Number(Number(o) + 60 * q * 1e3))
                    }
                else
                    o = new Date(1e3 * parseFloat(b));
            else
                o = new Date(n.y,n.m,n.d,n.h,n.i,n.s,n.u);
            if (d.userLocalTime && 0 === q && 0 !== (q -= (new Date).getTimezoneOffset()) && o.setTime(Number(Number(o) + 60 * q * 1e3)),
            void 0 === c)
                return o;
            d.masks.hasOwnProperty(c) ? c = d.masks[c] : c || (c = "Y-m-d");
            var s = o.getHours()
              , t = o.getMinutes()
              , u = o.getDate()
              , v = o.getMonth() + 1
              , w = o.getTimezoneOffset()
              , x = o.getSeconds()
              , y = o.getMilliseconds()
              , z = o.getDay()
              , A = o.getFullYear()
              , B = (z + 6) % 7 + 1
              , C = (new Date(A,v - 1,u) - new Date(A,0,1)) / 864e5
              , D = {
                d: m(u),
                D: d.dayNames[z],
                j: u,
                l: d.dayNames[z + 7],
                N: B,
                S: d.S(u),
                w: z,
                z: C,
                W: B < 5 ? Math.floor((C + B - 1) / 7) + 1 : Math.floor((C + B - 1) / 7) || ((new Date(A - 1,0,1).getDay() + 6) % 7 < 4 ? 53 : 52),
                F: d.monthNames[v - 1 + 12],
                m: m(v),
                M: d.monthNames[v - 1],
                n: v,
                t: "?",
                L: "?",
                o: "?",
                Y: A,
                y: String(A).substring(2),
                a: s < 12 ? d.AmPm[0] : d.AmPm[1],
                A: s < 12 ? d.AmPm[2] : d.AmPm[3],
                B: "?",
                g: s % 12 || 12,
                G: s,
                h: m(s % 12 || 12),
                H: m(s),
                i: m(t),
                s: m(x),
                u: y,
                e: "?",
                I: "?",
                O: (w > 0 ? "-" : "+") + m(100 * Math.floor(Math.abs(w) / 60) + Math.abs(w) % 60, 4),
                P: "?",
                T: (String(o).match(i) || [""]).pop().replace(j, ""),
                Z: "?",
                c: "?",
                r: "?",
                U: Math.floor(o / 1e3)
            };
            return c.replace(h, function(a) {
                return D.hasOwnProperty(a) ? D[a] : a.substring(1)
            })
        },
        jqID: function(a) {
            return String(a).replace(/[!"#$%&'()*+,.\/:; <=>?@\[\\\]\^`{|}~]/g, "\\$&")
        },
        guid: 1,
        uidPref: "jqg",
        randId: function(a) {
            return (a || $.jgrid.uidPref) + $.jgrid.guid++
        },
        getAccessor: function(a, b) {
            var c, d, e, f = [];
            if ("function" == typeof b)
                return b(a);
            if (void 0 === (c = a[b]))
                try {
                    if ("string" == typeof b && (f = b.split(".")),
                    e = f.length)
                        for (c = a; c && e--; )
                            d = f.shift(),
                            c = c[d]
                } catch (a) {}
            return c
        },
        getXmlData: function(a, b, c) {
            var d, e = "string" == typeof b ? b.match(/^(.*)\[(\w+)\]$/) : null;
            return "function" == typeof b ? b(a) : e && e[2] ? e[1] ? $(e[1], a).attr(e[2]) : $(a).attr(e[2]) : (d = $(b, a),
            c ? d : d.length > 0 ? $(d).text() : void 0)
        },
        cellWidth: function() {
            var a = $("<div class='ui-jqgrid' style='left:10000px'><table class='ui-jqgrid-btable ui-common-table' style='width:5px;'><tr class='jqgrow'><td style='width:5px;display:block;'></td></tr></table></div>")
              , b = a.appendTo("body").find("td").width();
            return a.remove(),
            Math.abs(b - 5) > .1
        },
        isLocalStorage: function() {
            try {
                return "localStorage"in window && null !== window.localStorage
            } catch (a) {
                return !1
            }
        },
        getRegional: function(a, b, c) {
            var d;
            return void 0 !== c ? c : (a.p && a.p.regional && $.jgrid.regional && (d = $.jgrid.getAccessor($.jgrid.regional[a.p.regional] || {}, b)),
            void 0 === d && (d = $.jgrid.getAccessor($.jgrid, b)),
            d)
        },
        isMobile: function() {
            try {
                return !!/Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent)
            } catch (a) {
                return !1
            }
        },
        cell_width: !0,
        scrollbarWidth: function() {
            var a = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');
            $("body").append(a);
            var b = $("div", a).innerWidth();
            a.css("overflow-y", "scroll");
            var c = $("div", a).innerWidth();
            return $(a).remove(),
            b - c < 0 ? 18 : b - c
        },
        ajaxOptions: {},
        from: function(source) {
            var $t = this
              , QueryObject = function(d, q) {
                "string" == typeof d && (d = $.data(d));
                var self = this
                  , _data = d
                  , _usecase = !0
                  , _trim = !1
                  , _query = q
                  , _stripNum = /[\$,%]/g
                  , _lastCommand = null
                  , _lastField = null
                  , _orDepth = 0
                  , _negate = !1
                  , _queuedOperator = ""
                  , _sorting = []
                  , _useProperties = !0;
                if ("object" != typeof d || !d.push)
                    throw "data provides is not an array";
                return d.length > 0 && (_useProperties = "object" == typeof d[0]),
                this._hasData = function() {
                    return null !== _data && 0 !== _data.length
                }
                ,
                this._getStr = function(a) {
                    var b = [];
                    return _trim && b.push("jQuery.trim("),
                    b.push("String(" + a + ")"),
                    _trim && b.push(")"),
                    _usecase || b.push(".toLowerCase()"),
                    b.join("")
                }
                ,
                this._strComp = function(a) {
                    return "string" == typeof a ? ".toString()" : ""
                }
                ,
                this._group = function(a, b) {
                    return {
                        field: a.toString(),
                        unique: b,
                        items: []
                    }
                }
                ,
                this._toStr = function(a) {
                    return _trim && (a = $.trim(a)),
                    a = a.toString().replace(/\\/g, "\\\\").replace(/\"/g, '\\"'),
                    _usecase ? a : a.toLowerCase()
                }
                ,
                this._funcLoop = function(a) {
                    var b = [];
                    return $.each(_data, function(c, d) {
                        b.push(a(d))
                    }),
                    b
                }
                ,
                this._append = function(a) {
                    var b;
                    for (null === _query ? _query = "" : _query += "" === _queuedOperator ? " && " : _queuedOperator,
                    b = 0; b < _orDepth; b++)
                        _query += "(";
                    _negate && (_query += "!"),
                    _query += "(" + a + ")",
                    _negate = !1,
                    _queuedOperator = "",
                    _orDepth = 0
                }
                ,
                this._setCommand = function(a, b) {
                    _lastCommand = a,
                    _lastField = b
                }
                ,
                this._resetNegate = function() {
                    _negate = !1
                }
                ,
                this._repeatCommand = function(a, b) {
                    return null === _lastCommand ? self : null !== a && null !== b ? _lastCommand(a, b) : null === _lastField ? _lastCommand(a) : _useProperties ? _lastCommand(_lastField, a) : _lastCommand(a)
                }
                ,
                this._equals = function(a, b) {
                    return 0 === self._compare(a, b, 1)
                }
                ,
                this._compare = function(a, b, c) {
                    var d = Object.prototype.toString;
                    return void 0 === c && (c = 1),
                    void 0 === a && (a = null),
                    void 0 === b && (b = null),
                    null === a && null === b ? 0 : null === a && null !== b ? 1 : null !== a && null === b ? -1 : "[object Date]" === d.call(a) && "[object Date]" === d.call(b) ? a < b ? -c : a > b ? c : 0 : (_usecase || "number" == typeof a || "number" == typeof b || (a = String(a),
                    b = String(b)),
                    a < b ? -c : a > b ? c : 0)
                }
                ,
                this._performSort = function() {
                    0 !== _sorting.length && (_data = self._doSort(_data, 0))
                }
                ,
                this._doSort = function(a, b) {
                    var c = _sorting[b].by
                      , d = _sorting[b].dir
                      , e = _sorting[b].type
                      , f = _sorting[b].datefmt
                      , g = _sorting[b].sfunc;
                    if (b === _sorting.length - 1)
                        return self._getOrder(a, c, d, e, f, g);
                    b++;
                    var h, i, j, k = self._getGroup(a, c, d, e, f), l = [];
                    for (h = 0; h < k.length; h++)
                        for (j = self._doSort(k[h].items, b),
                        i = 0; i < j.length; i++)
                            l.push(j[i]);
                    return l
                }
                ,
                this._getOrder = function(a, b, c, d, e, f) {
                    var g, h, i, j, k = [], l = [], m = "a" === c ? 1 : -1;
                    void 0 === d && (d = "text"),
                    j = "float" === d || "number" === d || "currency" === d || "numeric" === d ? function(a) {
                        var b = parseFloat(String(a).replace(_stripNum, ""));
                        return isNaN(b) ? Number.NEGATIVE_INFINITY : b
                    }
                    : "int" === d || "integer" === d ? function(a) {
                        return a ? parseFloat(String(a).replace(_stripNum, "")) : Number.NEGATIVE_INFINITY
                    }
                    : "date" === d || "datetime" === d ? function(a) {
                        return $.jgrid.parseDate.call($t, e, a).getTime()
                    }
                    : $.isFunction(d) ? d : function(a) {
                        return a = a ? $.trim(String(a)) : "",
                        _usecase ? a : a.toLowerCase()
                    }
                    ,
                    $.each(a, function(a, c) {
                        h = "" !== b ? $.jgrid.getAccessor(c, b) : c,
                        void 0 === h && (h = ""),
                        h = j(h, c),
                        l.push({
                            vSort: h,
                            index: a
                        })
                    }),
                    $.isFunction(f) ? l.sort(function(a, b) {
                        return f.call(this, a.vSort, b.vSort, m, a, b)
                    }) : l.sort(function(a, b) {
                        return self._compare(a.vSort, b.vSort, m)
                    }),
                    i = 0;
                    for (var n = a.length; i < n; )
                        g = l[i].index,
                        k.push(a[g]),
                        i++;
                    return k
                }
                ,
                this._getGroup = function(a, b, c, d, e) {
                    var f, g = [], h = null, i = null;
                    return $.each(self._getOrder(a, b, c, d, e), function(a, c) {
                        f = $.jgrid.getAccessor(c, b),
                        null == f && (f = ""),
                        self._equals(i, f) || (i = f,
                        null !== h && g.push(h),
                        h = self._group(b, f)),
                        h.items.push(c)
                    }),
                    null !== h && g.push(h),
                    g
                }
                ,
                this.ignoreCase = function() {
                    return _usecase = !1,
                    self
                }
                ,
                this.useCase = function() {
                    return _usecase = !0,
                    self
                }
                ,
                this.trim = function() {
                    return _trim = !0,
                    self
                }
                ,
                this.noTrim = function() {
                    return _trim = !1,
                    self
                }
                ,
                this.execute = function() {
                    var match = _query
                      , results = [];
                    return null === match ? self : ($.each(_data, function() {
                        eval(match) && results.push(this)
                    }),
                    _data = results,
                    self)
                }
                ,
                this.data = function() {
                    return _data
                }
                ,
                this.select = function(a) {
                    if (self._performSort(),
                    !self._hasData())
                        return [];
                    if (self.execute(),
                    $.isFunction(a)) {
                        var b = [];
                        return $.each(_data, function(c, d) {
                            b.push(a(d))
                        }),
                        b
                    }
                    return _data
                }
                ,
                this.hasMatch = function() {
                    return !!self._hasData() && (self.execute(),
                    _data.length > 0)
                }
                ,
                this.andNot = function(a, b, c) {
                    return _negate = !_negate,
                    self.and(a, b, c)
                }
                ,
                this.orNot = function(a, b, c) {
                    return _negate = !_negate,
                    self.or(a, b, c)
                }
                ,
                this.not = function(a, b, c) {
                    return self.andNot(a, b, c)
                }
                ,
                this.and = function(a, b, c) {
                    return _queuedOperator = " && ",
                    void 0 === a ? self : self._repeatCommand(a, b, c)
                }
                ,
                this.or = function(a, b, c) {
                    return _queuedOperator = " || ",
                    void 0 === a ? self : self._repeatCommand(a, b, c)
                }
                ,
                this.orBegin = function() {
                    return _orDepth++,
                    self
                }
                ,
                this.orEnd = function() {
                    return null !== _query && (_query += ")"),
                    self
                }
                ,
                this.isNot = function(a) {
                    return _negate = !_negate,
                    self.is(a)
                }
                ,
                this.is = function(a) {
                    return self._append("this." + a),
                    self._resetNegate(),
                    self
                }
                ,
                this._compareValues = function(a, b, c, d, e) {
                    var f;
                    f = _useProperties ? "jQuery.jgrid.getAccessor(this,'" + b + "')" : "this",
                    void 0 === c && (c = null);
                    var g = c
                      , h = void 0 === e.stype ? "text" : e.stype;
                    if (null !== c)
                        switch (h) {
                        case "int":
                        case "integer":
                            g = isNaN(Number(g)) || "" === g ? Number.NEGATIVE_INFINITY : g,
                            f = "parseInt(" + f + ",10)",
                            g = "parseInt(" + g + ",10)";
                            break;
                        case "float":
                        case "number":
                        case "numeric":
                            g = String(g).replace(_stripNum, ""),
                            g = isNaN(Number(g)) || "" === g ? Number.NEGATIVE_INFINITY : Number(g),
                            f = "parseFloat(" + f + ")",
                            g = "parseFloat(" + g + ")";
                            break;
                        case "date":
                        case "datetime":
                            g = String($.jgrid.parseDate.call($t, e.srcfmt || "Y-m-d", g).getTime()),
                            f = 'jQuery.jgrid.parseDate.call(jQuery("#' + $.jgrid.jqID($t.p.id) + '")[0],"' + e.srcfmt + '",' + f + ").getTime()";
                            break;
                        default:
                            f = self._getStr(f),
                            g = self._getStr('"' + self._toStr(g) + '"')
                        }
                    return self._append(f + " " + d + " " + g),
                    self._setCommand(a, b),
                    self._resetNegate(),
                    self
                }
                ,
                this.equals = function(a, b, c) {
                    return self._compareValues(self.equals, a, b, "==", c)
                }
                ,
                this.notEquals = function(a, b, c) {
                    return self._compareValues(self.equals, a, b, "!==", c)
                }
                ,
                this.isNull = function(a, b, c) {
                    return self._compareValues(self.equals, a, null, "===", c)
                }
                ,
                this.greater = function(a, b, c) {
                    return self._compareValues(self.greater, a, b, ">", c)
                }
                ,
                this.less = function(a, b, c) {
                    return self._compareValues(self.less, a, b, "<", c)
                }
                ,
                this.greaterOrEquals = function(a, b, c) {
                    return self._compareValues(self.greaterOrEquals, a, b, ">=", c)
                }
                ,
                this.lessOrEquals = function(a, b, c) {
                    return self._compareValues(self.lessOrEquals, a, b, "<=", c)
                }
                ,
                this.startsWith = function(a, b) {
                    var c = null == b ? a : b
                      , d = _trim ? $.trim(c.toString()).length : c.toString().length;
                    return _useProperties ? self._append(self._getStr("jQuery.jgrid.getAccessor(this,'" + a + "')") + ".substr(0," + d + ") == " + self._getStr('"' + self._toStr(b) + '"')) : (null != b && (d = _trim ? $.trim(b.toString()).length : b.toString().length),
                    self._append(self._getStr("this") + ".substr(0," + d + ") == " + self._getStr('"' + self._toStr(a) + '"'))),
                    self._setCommand(self.startsWith, a),
                    self._resetNegate(),
                    self
                }
                ,
                this.endsWith = function(a, b) {
                    var c = null == b ? a : b
                      , d = _trim ? $.trim(c.toString()).length : c.toString().length;
                    return _useProperties ? self._append(self._getStr("jQuery.jgrid.getAccessor(this,'" + a + "')") + ".substr(" + self._getStr("jQuery.jgrid.getAccessor(this,'" + a + "')") + ".length-" + d + "," + d + ') == "' + self._toStr(b) + '"') : self._append(self._getStr("this") + ".substr(" + self._getStr("this") + '.length-"' + self._toStr(a) + '".length,"' + self._toStr(a) + '".length) == "' + self._toStr(a) + '"'),
                    self._setCommand(self.endsWith, a),
                    self._resetNegate(),
                    self
                }
                ,
                this.contains = function(a, b) {
                    return _useProperties ? self._append(self._getStr("jQuery.jgrid.getAccessor(this,'" + a + "')") + '.indexOf("' + self._toStr(b) + '",0) > -1') : self._append(self._getStr("this") + '.indexOf("' + self._toStr(a) + '",0) > -1'),
                    self._setCommand(self.contains, a),
                    self._resetNegate(),
                    self
                }
                ,
                this.groupBy = function(a, b, c, d) {
                    return self._hasData() ? self._getGroup(_data, a, b, c, d) : null
                }
                ,
                this.orderBy = function(a, b, c, d, e) {
                    return b = null == b ? "a" : $.trim(b.toString().toLowerCase()),
                    null == c && (c = "text"),
                    null == d && (d = "Y-m-d"),
                    null == e && (e = !1),
                    "desc" !== b && "descending" !== b || (b = "d"),
                    "asc" !== b && "ascending" !== b || (b = "a"),
                    _sorting.push({
                        by: a,
                        dir: b,
                        type: c,
                        datefmt: d,
                        sfunc: e
                    }),
                    self
                }
                ,
                self
            };
            return new QueryObject(source,null)
        },
        getMethod: function(a) {
            return this.getAccessor($.fn.jqGrid, a)
        },
        extend: function(a) {
            $.extend($.fn.jqGrid, a),
            this.no_legacy_api || $.fn.extend(a)
        },
        clearBeforeUnload: function(a) {
            var b, c = $("#" + $.jgrid.jqID(a))[0];
            if (c.grid) {
                b = c.grid,
                $.isFunction(b.emptyRows) && b.emptyRows.call(c, !0, !0),
                $(document).off("mouseup.jqGrid" + c.p.id),
                $(b.hDiv).off("mousemove"),
                $(c).off();
                var d, e = b.headers.length, f = ["formatCol", "sortData", "updatepager", "refreshIndex", "setHeadCheckBox", "constructTr", "formatter", "addXmlData", "addJSONData", "grid", "p", "addLocalData"];
                for (d = 0; d < e; d++)
                    b.headers[d].el = null;
                for (d in b)
                    b.hasOwnProperty(d) && (b[d] = null);
                for (d in c.p)
                    c.p.hasOwnProperty(d) && (c.p[d] = $.isArray(c.p[d]) ? [] : null);
                for (e = f.length,
                d = 0; d < e; d++)
                    c.hasOwnProperty(f[d]) && (c[f[d]] = null,
                    delete c[f[d]])
            }
        },
        gridUnload: function(a) {
            if (a) {
                a = $.trim(a),
                0 === a.indexOf("#") && (a = a.substring(1));
                var b = $("#" + $.jgrid.jqID(a))[0];
                if (b.grid) {
                    var c = {
                        id: $(b).attr("id"),
                        cl: $(b).attr("class")
                    };
                    b.p.pager && $(b.p.pager).off().empty().removeClass("ui-state-default ui-jqgrid-pager ui-corner-bottom");
                    var d = document.createElement("table");
                    d.className = c.cl;
                    var e = $.jgrid.jqID(b.id);
                    $(d).removeClass("ui-jqgrid-btable ui-common-table").insertBefore("#gbox_" + e),
                    1 === $(b.p.pager).parents("#gbox_" + e).length && $(b.p.pager).insertBefore("#gbox_" + e),
                    $.jgrid.clearBeforeUnload(a),
                    $("#gbox_" + e).remove(),
                    $(d).attr({
                        id: c.id
                    }),
                    $("#alertmod_" + $.jgrid.jqID(a)).remove()
                }
            }
        },
        gridDestroy: function(a) {
            if (a) {
                a = $.trim(a),
                0 === a.indexOf("#") && (a = a.substring(1));
                var b = $("#" + $.jgrid.jqID(a))[0];
                if (b.grid) {
                    b.p.pager && $(b.p.pager).remove();
                    try {
                        $.jgrid.clearBeforeUnload(a),
                        $("#gbox_" + $.jgrid.jqID(a)).remove()
                    } catch (a) {}
                }
            }
        },
        isElementInViewport: function(a) {
            var b = a.getBoundingClientRect();
            return b.left >= 0 && b.right <= (window.innerWidth || document.documentElement.clientWidth)
        },
        getTextWidth: function(a, b) {
            if (!jQuery._cacheCanvas) {
                var c = document.createElement("canvas");
                document.createDocumentFragment().appendChild(c),
                jQuery._cacheCanvas = c.getContext("2d"),
                b && (jQuery._cacheCanvas.font = b)
            }
            return jQuery._cacheCanvas.measureText($.jgrid.stripHtml(a)).width
        },
        getFont: function(a) {
            var b = window.getComputedStyle(a, null);
            return b.getPropertyValue("font-style") + " " + b.getPropertyValue("font-size") + b.getPropertyValue("font-family")
        },
        styleUI: {
            jQueryUI: {
                common: {
                    disabled: "ui-state-disabled",
                    highlight: "ui-state-highlight",
                    hover: "ui-state-hover",
                    cornerall: "ui-corner-all",
                    cornertop: "ui-corner-top",
                    cornerbottom: "ui-corner-bottom",
                    hidden: "ui-helper-hidden",
                    icon_base: "ui-icon",
                    overlay: "ui-widget-overlay",
                    active: "ui-state-active",
                    error: "ui-state-error",
                    button: "ui-state-default ui-corner-all",
                    content: "ui-widget-content"
                },
                base: {
                    entrieBox: "ui-widget ui-widget-content ui-corner-all",
                    viewBox: "",
                    headerTable: "",
                    headerBox: "ui-state-default",
                    rowTable: "",
                    rowBox: "ui-widget-content",
                    stripedTable: "ui-jqgrid-table-striped",
                    footerTable: "",
                    footerBox: "ui-widget-content",
                    headerDiv: "ui-state-default",
                    gridtitleBox: "ui-widget-header ui-corner-top ui-helper-clearfix",
                    customtoolbarBox: "ui-state-default",
                    loadingBox: "ui-state-default ui-state-active",
                    rownumBox: "ui-state-default",
                    scrollBox: "ui-widget-content",
                    multiBox: "",
                    pagerBox: "ui-state-default ui-corner-bottom",
                    pagerTable: "",
                    toppagerBox: "ui-state-default",
                    pgInput: "ui-corner-all",
                    pgSelectBox: "ui-widget-content ui-corner-all",
                    pgButtonBox: "ui-corner-all",
                    icon_first: "ui-icon-seek-first",
                    icon_prev: "ui-icon-seek-prev",
                    icon_next: "ui-icon-seek-next",
                    icon_end: "ui-icon-seek-end",
                    icon_asc: "ui-icon-triangle-1-n",
                    icon_desc: "ui-icon-triangle-1-s",
                    icon_caption_open: "ui-icon-circle-triangle-n",
                    icon_caption_close: "ui-icon-circle-triangle-s"
                },
                modal: {
                    modal: "ui-widget ui-widget-content ui-corner-all ui-dialog",
                    header: "ui-widget-header ui-corner-all ui-helper-clearfix",
                    content: "ui-widget-content",
                    resizable: "ui-resizable-handle ui-resizable-se",
                    icon_close: "ui-icon-closethick",
                    icon_resizable: "ui-icon-gripsmall-diagonal-se"
                },
                celledit: {
                    inputClass: "ui-widget-content ui-corner-all"
                },
                inlinedit: {
                    inputClass: "ui-widget-content ui-corner-all",
                    icon_edit_nav: "ui-icon-pencil",
                    icon_add_nav: "ui-icon-plus",
                    icon_save_nav: "ui-icon-disk",
                    icon_cancel_nav: "ui-icon-cancel"
                },
                formedit: {
                    inputClass: "ui-widget-content ui-corner-all",
                    icon_prev: "ui-icon-triangle-1-w",
                    icon_next: "ui-icon-triangle-1-e",
                    icon_save: "ui-icon-disk",
                    icon_close: "ui-icon-close",
                    icon_del: "ui-icon-scissors",
                    icon_cancel: "ui-icon-cancel"
                },
                navigator: {
                    icon_edit_nav: "ui-icon-pencil",
                    icon_add_nav: "ui-icon-plus",
                    icon_del_nav: "ui-icon-trash",
                    icon_search_nav: "ui-icon-search",
                    icon_refresh_nav: "ui-icon-refresh",
                    icon_view_nav: "ui-icon-document",
                    icon_newbutton_nav: "ui-icon-newwin"
                },
                grouping: {
                    icon_plus: "ui-icon-circlesmall-plus",
                    icon_minus: "ui-icon-circlesmall-minus"
                },
                filter: {
                    table_widget: "ui-widget ui-widget-content",
                    srSelect: "ui-widget-content ui-corner-all",
                    srInput: "ui-widget-content ui-corner-all",
                    menu_widget: "ui-widget ui-widget-content ui-corner-all",
                    icon_search: "ui-icon-search",
                    icon_reset: "ui-icon-arrowreturnthick-1-w",
                    icon_query: "ui-icon-comment"
                },
                subgrid: {
                    icon_plus: "ui-icon-plus",
                    icon_minus: "ui-icon-minus",
                    icon_open: "ui-icon-carat-1-sw"
                },
                treegrid: {
                    icon_plus: "ui-icon-triangle-1-",
                    icon_minus: "ui-icon-triangle-1-s",
                    icon_leaf: "ui-icon-radio-off"
                },
                fmatter: {
                    icon_edit: "ui-icon-pencil",
                    icon_add: "ui-icon-plus",
                    icon_save: "ui-icon-disk",
                    icon_cancel: "ui-icon-cancel",
                    icon_del: "ui-icon-trash"
                },
                colmenu: {
                    menu_widget: "ui-widget ui-widget-content ui-corner-all",
                    input_checkbox: "ui-widget ui-widget-content",
                    filter_select: "ui-widget-content ui-corner-all",
                    filter_input: "ui-widget-content ui-corner-all",
                    icon_menu: "ui-icon-comment",
                    icon_sort_asc: "ui-icon-arrow-1-n",
                    icon_sort_desc: "ui-icon-arrow-1-s",
                    icon_columns: "ui-icon-extlink",
                    icon_filter: "ui-icon-calculator",
                    icon_group: "ui-icon-grip-solid-horizontal",
                    icon_freeze: "ui-icon-grip-solid-vertical",
                    icon_move: "ui-icon-arrow-4",
                    icon_new_item: "ui-icon-newwin",
                    icon_toolbar_menu: "ui-icon-document"
                }
            },
            Bootstrap: {
                common: {
                    disabled: "ui-disabled",
                    highlight: "success",
                    hover: "active",
                    cornerall: "",
                    cornertop: "",
                    cornerbottom: "",
                    hidden: "",
                    icon_base: "glyphicon",
                    overlay: "ui-overlay",
                    active: "active",
                    error: "bg-danger",
                    button: "btn btn-default",
                    content: ""
                },
                base: {
                    entrieBox: "",
                    viewBox: "table-responsive",
                    headerTable: "table table-bordered",
                    headerBox: "",
                    rowTable: "table table-bordered",
                    rowBox: "",
                    stripedTable: "table-striped",
                    footerTable: "table table-bordered",
                    footerBox: "",
                    headerDiv: "",
                    gridtitleBox: "",
                    customtoolbarBox: "",
                    loadingBox: "row",
                    rownumBox: "active",
                    scrollBox: "",
                    multiBox: "checkbox",
                    pagerBox: "",
                    pagerTable: "table",
                    toppagerBox: "",
                    pgInput: "form-control",
                    pgSelectBox: "form-control",
                    pgButtonBox: "",
                    icon_first: "glyphicon-step-backward",
                    icon_prev: "glyphicon-backward",
                    icon_next: "glyphicon-forward",
                    icon_end: "glyphicon-step-forward",
                    icon_asc: "glyphicon-triangle-top",
                    icon_desc: "glyphicon-triangle-bottom",
                    icon_caption_open: "glyphicon-circle-arrow-up",
                    icon_caption_close: "glyphicon-circle-arrow-down"
                },
                modal: {
                    modal: "modal-content",
                    header: "modal-header",
                    title: "modal-title",
                    content: "modal-body",
                    resizable: "ui-resizable-handle ui-resizable-se",
                    icon_close: "glyphicon-remove-circle",
                    icon_resizable: "glyphicon-import"
                },
                celledit: {
                    inputClass: "form-control"
                },
                inlinedit: {
                    inputClass: "form-control",
                    icon_edit_nav: "glyphicon-edit",
                    icon_add_nav: "glyphicon-plus",
                    icon_save_nav: "glyphicon-save",
                    icon_cancel_nav: "glyphicon-remove-circle"
                },
                formedit: {
                    inputClass: "form-control",
                    icon_prev: "glyphicon-step-backward",
                    icon_next: "glyphicon-step-forward",
                    icon_save: "glyphicon-save",
                    icon_close: "glyphicon-remove-circle",
                    icon_del: "glyphicon-trash",
                    icon_cancel: "glyphicon-remove-circle"
                },
                navigator: {
                    icon_edit_nav: "glyphicon-edit",
                    icon_add_nav: "glyphicon-plus",
                    icon_del_nav: "glyphicon-trash",
                    icon_search_nav: "glyphicon-search",
                    icon_refresh_nav: "glyphicon-refresh",
                    icon_view_nav: "glyphicon-info-sign",
                    icon_newbutton_nav: "glyphicon-new-window"
                },
                grouping: {
                    icon_plus: "glyphicon-triangle-right",
                    icon_minus: "glyphicon-triangle-bottom"
                },
                filter: {
                    table_widget: "table table-condensed",
                    srSelect: "form-control",
                    srInput: "form-control",
                    menu_widget: "",
                    icon_search: "glyphicon-search",
                    icon_reset: "glyphicon-refresh",
                    icon_query: "glyphicon-comment"
                },
                subgrid: {
                    icon_plus: "glyphicon-triangle-right",
                    icon_minus: "glyphicon-triangle-bottom",
                    icon_open: "glyphicon-indent-left"
                },
                treegrid: {
                    icon_plus: "glyphicon-triangle-right",
                    icon_minus: "glyphicon-triangle-bottom",
                    icon_leaf: "glyphicon-unchecked"
                },
                fmatter: {
                    icon_edit: "glyphicon-edit",
                    icon_add: "glyphicon-plus",
                    icon_save: "glyphicon-save",
                    icon_cancel: "glyphicon-remove-circle",
                    icon_del: "glyphicon-trash"
                },
                colmenu: {
                    menu_widget: "",
                    input_checkbox: "",
                    filter_select: "form-control",
                    filter_input: "form-control",
                    icon_menu: "glyphicon-menu-hamburger",
                    icon_sort_asc: "glyphicon-sort-by-alphabet",
                    icon_sort_desc: "glyphicon-sort-by-alphabet-alt",
                    icon_columns: "glyphicon-list-alt",
                    icon_filter: "glyphicon-filter",
                    icon_group: "glyphicon-align-left",
                    icon_freeze: "glyphicon-object-align-horizontal",
                    icon_move: "glyphicon-move",
                    icon_new_item: "glyphicon-new-window",
                    icon_toolbar_menu: "glyphicon-menu-hamburger"
                }
            },
            Bootstrap4: {
                common: {
                    disabled: "ui-disabled",
                    highlight: "table-success",
                    hover: "table-active",
                    cornerall: "",
                    cornertop: "",
                    cornerbottom: "",
                    hidden: "",
                    overlay: "ui-overlay",
                    active: "active",
                    error: "alert-danger",
                    button: "btn btn-light",
                    content: ""
                },
                base: {
                    entrieBox: "",
                    viewBox: "table-responsive",
                    headerTable: "table table-bordered",
                    headerBox: "",
                    rowTable: "table table-bordered",
                    rowBox: "",
                    stripedTable: "table-striped",
                    footerTable: "table table-bordered",
                    footerBox: "",
                    headerDiv: "",
                    gridtitleBox: "",
                    customtoolbarBox: "",
                    loadingBox: "row",
                    rownumBox: "active",
                    scrollBox: "",
                    multiBox: "checkbox",
                    pagerBox: "",
                    pagerTable: "table",
                    toppagerBox: "",
                    pgInput: "form-control",
                    pgSelectBox: "form-control",
                    pgButtonBox: ""
                },
                modal: {
                    modal: "modal-content",
                    header: "modal-header",
                    title: "modal-title",
                    content: "modal-body",
                    resizable: "ui-resizable-handle ui-resizable-se",
                    icon_close: "oi-circle-x",
                    icon_resizable: "oi-circle-x"
                },
                celledit: {
                    inputClass: "form-control"
                },
                inlinedit: {
                    inputClass: "form-control"
                },
                formedit: {
                    inputClass: "form-control"
                },
                navigator: {},
                grouping: {},
                filter: {
                    table_widget: "table table-condensed",
                    srSelect: "form-control",
                    srInput: "form-control",
                    menu_widget: ""
                },
                subgrid: {},
                treegrid: {},
                fmatter: {},
                colmenu: {
                    menu_widget: "",
                    input_checkbox: "",
                    filter_select: "form-control",
                    filter_input: "form-control"
                }
            }
        },
        iconSet: {
            Iconic: {
                common: {
                    icon_base: "oi"
                },
                base: {
                    icon_first: "oi-media-step-backward",
                    icon_prev: "oi-caret-left",
                    icon_next: "oi-caret-right",
                    icon_end: "oi-media-step-forward",
                    icon_asc: "oi-caret-top",
                    icon_desc: "oi-caret-bottom",
                    icon_caption_open: "oi-collapse-up",
                    icon_caption_close: "oi-expand-down"
                },
                modal: {
                    icon_close: "oi-circle-x",
                    icon_resizable: "oi-plus"
                },
                inlinedit: {
                    icon_edit_nav: "oi-pencil",
                    icon_add_nav: "oi-plus",
                    icon_save_nav: "oi-check",
                    icon_cancel_nav: "oi-action-undo"
                },
                formedit: {
                    icon_prev: "oi-chevron-left",
                    icon_next: "oi-chevron-right",
                    icon_save: "oi-check",
                    icon_close: "oi-ban",
                    icon_del: "oi-delete",
                    icon_cancel: "oi-ban"
                },
                navigator: {
                    icon_edit_nav: "oi-pencil",
                    icon_add_nav: "oi-plus",
                    icon_del_nav: "oi-trash",
                    icon_search_nav: "oi-zoom-in",
                    icon_refresh_nav: "oi-reload",
                    icon_view_nav: "oi-browser",
                    icon_newbutton_nav: "oi-book"
                },
                grouping: {
                    icon_plus: "oi-caret-right",
                    icon_minus: "oi-caret-bottom"
                },
                filter: {
                    icon_search: "oi-magnifying-glass",
                    icon_reset: "oi-reload",
                    icon_query: "oi-comment-square"
                },
                subgrid: {
                    icon_plus: "oi-chevron-right",
                    icon_minus: "oi-chevron-bottom",
                    icon_open: "oi-expand-left"
                },
                treegrid: {
                    icon_plus: "oi-plus",
                    icon_minus: "oi-minus",
                    icon_leaf: "oi-media-record"
                },
                fmatter: {
                    icon_edit: "oi-pencil",
                    icon_add: "oi-plus",
                    icon_save: "oi-check",
                    icon_cancel: "oi-action-undo",
                    icon_del: "oi-trash"
                },
                colmenu: {
                    icon_menu: "oi-list",
                    icon_sort_asc: "oi-sort-ascending",
                    icon_sort_desc: "oi-sort-descending",
                    icon_columns: "oi-project",
                    icon_filter: "oi-magnifying-glass",
                    icon_group: "oi-list-rich",
                    icon_freeze: "oi-spreadsheet",
                    icon_move: "oi-move",
                    icon_new_item: "oi-external-link",
                    icon_toolbar_menu: "oi-menu"
                }
            },
            Octicons: {
                common: {
                    icon_base: "octicon"
                },
                base: {
                    icon_first: "octicon-triangle-left",
                    icon_prev: "octicon-chevron-left",
                    icon_next: "octicon-chevron-right",
                    icon_end: "octicon-triangle-right",
                    icon_asc: "octicon-triangle-up",
                    icon_desc: "octicon-triangle-down",
                    icon_caption_open: "octicon-triangle-up",
                    icon_caption_close: "octicon-triangle-down"
                },
                modal: {
                    icon_close: "octicon-x",
                    icon_resizable: "octicon-plus"
                },
                inlinedit: {
                    icon_edit_nav: "octicon-pencil",
                    icon_add_nav: "octicon-plus",
                    icon_save_nav: "octicon-check",
                    icon_cancel_nav: "octicon-circle-slash"
                },
                formedit: {
                    icon_prev: "octicon-chevron-left",
                    icon_next: "octicon-chevron-right",
                    icon_save: "octicon-check",
                    icon_close: "octicon-x",
                    icon_del: "octicon-trashcan",
                    icon_cancel: "octicon-circle-slash"
                },
                navigator: {
                    icon_edit_nav: "octicon-pencil",
                    icon_add_nav: "octicon-plus",
                    icon_del_nav: "octicon-trashcan",
                    icon_search_nav: "octicon-search",
                    icon_refresh_nav: "octicon-sync",
                    icon_view_nav: "octicon-file",
                    icon_newbutton_nav: "octicon-link-external"
                },
                grouping: {
                    icon_plus: "octicon-triangle-right",
                    icon_minus: "octicon-triangle-down"
                },
                filter: {
                    icon_search: "octicon-search",
                    icon_reset: "octicon-sync",
                    icon_query: "octicon-file-code"
                },
                subgrid: {
                    icon_plus: "octicon-triangle-right",
                    icon_minus: "octicon-triangle-down",
                    icon_open: "octicon-git-merge"
                },
                treegrid: {
                    icon_plus: "octicon-triangle-right",
                    icon_minus: "octicon-triangle-down",
                    icon_leaf: "octicon-primitive-dot"
                },
                fmatter: {
                    icon_edit: "octicon-pencil",
                    icon_add: "octicon-plus",
                    icon_save: "octicon-check",
                    icon_cancel: "octicon-circle-slash",
                    icon_del: "octicon-trashcan"
                },
                colmenu: {
                    icon_menu: "octicon-grabber",
                    icon_sort_asc: "octicon-arrow-down",
                    icon_sort_desc: "octicon-arrow-up",
                    icon_columns: "octicon-repo",
                    icon_filter: "octicon-search",
                    icon_group: "octicon-list-unordered",
                    icon_freeze: "octicon-repo",
                    icon_move: "octicon-git-compare",
                    icon_new_item: "octicon-link-external",
                    icon_toolbar_menu: "octicon-three-bars"
                }
            },
            fontAwesome: {
                common: {
                    icon_base: "fas"
                },
                base: {
                    icon_first: "fa-step-backward",
                    icon_prev: "fa-backward",
                    icon_next: "fa-forward",
                    icon_end: "fa-step-forward",
                    icon_asc: "fa-caret-up",
                    icon_desc: "fa-caret-down",
                    icon_caption_open: "fa-caret-square-up",
                    icon_caption_close: "fa-caret-square-down "
                },
                modal: {
                    icon_close: "fa-window-close",
                    icon_resizable: "fa-plus"
                },
                inlinedit: {
                    icon_edit_nav: "fa-edit",
                    icon_add_nav: "fa-plus",
                    icon_save_nav: "fa-save",
                    icon_cancel_nav: "fa-replay"
                },
                formedit: {
                    icon_prev: "fa-chevron-left",
                    icon_next: "fa-chevron-right",
                    icon_save: "fa-save",
                    icon_close: "fa-window-close",
                    icon_del: "fa-trash",
                    icon_cancel: "fa-times"
                },
                navigator: {
                    icon_edit_nav: "fa-edit",
                    icon_add_nav: "fa-plus",
                    icon_del_nav: "fa-trash",
                    icon_search_nav: "fa-search",
                    icon_refresh_nav: "fa-sync",
                    icon_view_nav: "fa-sticky-note",
                    icon_newbutton_nav: "fa-external-link-alt"
                },
                grouping: {
                    icon_plus: "fa-caret-right",
                    icon_minus: "fa-caret-down"
                },
                filter: {
                    icon_search: "fa-search",
                    icon_reset: "fa-reply",
                    icon_query: "fa-pen-square "
                },
                subgrid: {
                    icon_plus: "fa-arrow-circle-right",
                    icon_minus: "fa-arrow-circle-down",
                    icon_open: "fa-ellipsis-v"
                },
                treegrid: {
                    icon_plus: "fa-plus",
                    icon_minus: "fa-minus",
                    icon_leaf: "fa-circle"
                },
                fmatter: {
                    icon_edit: "fa-edit",
                    icon_add: "fa-plus",
                    icon_save: "fa-save",
                    icon_cancel: "fa-undo",
                    icon_del: "fa-trash"
                },
                colmenu: {
                    icon_menu: "fa-ellipsis-v",
                    icon_sort_asc: "fa-sort-amount-down",
                    icon_sort_desc: "fa-sort-amount-up",
                    icon_columns: "fa-columns",
                    icon_filter: "fa-filter",
                    icon_group: "fa-object-group",
                    icon_freeze: "fa-snowflake",
                    icon_move: "fa-expand-arrows-alt",
                    icon_new_item: "fa-external-link-alt",
                    icon_toolbar_menu: "fa-list"
                }
            }
        }
    }),
    $.fn.jqGrid = function(a) {
        if ("string" == typeof a) {
            var b = $.jgrid.getMethod(a);
            if (!b)
                throw "jqGrid - No such method: " + a;
            var c = $.makeArray(arguments).slice(1);
            return b.apply(this, c)
        }
        return this.each(function() {
            function b(a, b, c, d) {
                if (e.p.multiselect && e.p.multiboxonly || e.p.multimail)
                    if (b)
                        $(e).jqGrid("setSelection", a, d, c);
                    else if (e.p.multiboxonly && e.p.multimail)
                        $(e).triggerHandler("jqGridSelectRow", [a, !1, c]),
                        e.p.onSelectRow && e.p.onSelectRow.call(e, a, !1, c);
                    else {
                        var f = e.p.frozenColumns ? e.p.id + "_frozen" : "";
                        $(e.p.selarrrow).each(function(a, b) {
                            var c = $(e).jqGrid("getGridRowById", b);
                            c && $(c).removeClass(p),
                            $("#jqg_" + $.jgrid.jqID(e.p.id) + "_" + $.jgrid.jqID(b))[e.p.useProp ? "prop" : "attr"]("checked", !1),
                            f && ($("#" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(f)).removeClass(p),
                            $("#jqg_" + $.jgrid.jqID(e.p.id) + "_" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(f))[e.p.useProp ? "prop" : "attr"]("checked", !1))
                        }),
                        e.p.selarrrow = [],
                        $(e).jqGrid("setSelection", a, d, c)
                    }
                else
                    $(e).jqGrid("setSelection", a, d, c)
            }
            if (!this.grid) {
                var c;
                null != a && void 0 !== a.data && (c = a.data,
                a.data = []);
                var d = $.extend(!0, {
                    url: "",
                    height: 150,
                    page: 1,
                    rowNum: 20,
                    rowTotal: null,
                    records: 0,
                    pager: "",
                    pgbuttons: !0,
                    pginput: !0,
                    colModel: [],
                    rowList: [],
                    colNames: [],
                    sortorder: "asc",
                    sortname: "",
                    datatype: "xml",
                    mtype: "GET",
                    altRows: !1,
                    selarrrow: [],
                    preserveSelection: !1,
                    savedRow: [],
                    shrinkToFit: !0,
                    xmlReader: {},
                    jsonReader: {},
                    subGrid: !1,
                    subGridModel: [],
                    reccount: 0,
                    lastpage: 0,
                    lastsort: 0,
                    selrow: null,
                    beforeSelectRow: null,
                    onSelectRow: null,
                    onSortCol: null,
                    ondblClickRow: null,
                    onRightClickRow: null,
                    onPaging: null,
                    onSelectAll: null,
                    onInitGrid: null,
                    loadComplete: null,
                    gridComplete: null,
                    loadError: null,
                    loadBeforeSend: null,
                    afterInsertRow: null,
                    beforeRequest: null,
                    beforeProcessing: null,
                    onHeaderClick: null,
                    viewrecords: !1,
                    loadonce: !1,
                    multiselect: !1,
                    multikey: !1,
                    multiboxonly: !1,
                    multimail: !1,
                    multiselectWidth: 30,
                    editurl: null,
                    search: !1,
                    caption: "",
                    hidegrid: !0,
                    hiddengrid: !1,
                    postData: {},
                    userData: {},
                    treeGrid: !1,
                    treeGridModel: "nested",
                    treeReader: {},
                    treeANode: -1,
                    ExpandColumn: null,
                    tree_root_level: 0,
                    prmNames: {
                        page: "page",
                        rows: "rows",
                        sort: "sidx",
                        order: "sord",
                        search: "_search",
                        nd: "nd",
                        id: "id",
                        oper: "oper",
                        editoper: "edit",
                        addoper: "add",
                        deloper: "del",
                        subgridid: "id",
                        npage: null,
                        totalrows: "totalrows"
                    },
                    forceFit: !1,
                    gridstate: "visible",
                    cellEdit: !1,
                    cellsubmit: "remote",
                    nv: 0,
                    loadui: "enable",
                    toolbar: [!1, ""],
                    scroll: !1,
                    deselectAfterSort: !0,
                    scrollrows: !1,
                    autowidth: !1,
                    scrollOffset: $.jgrid.scrollbarWidth() + 3,
                    cellLayout: 5,
                    subGridWidth: 20,
                    gridview: !0,
                    rownumWidth: 35,
                    rownumbers: !1,
                    pagerpos: "center",
                    recordpos: "right",
                    footerrow: !1,
                    userDataOnFooter: !1,
                    hoverrows: !0,
                    viewsortcols: [!1, "vertical", !0],
                    resizeclass: "",
                    autoencode: !1,
                    remapColumns: [],
                    ajaxGridOptions: {},
                    direction: "ltr",
                    toppager: !1,
                    headertitles: !1,
                    scrollTimeout: 40,
                    data: [],
                    _index: {},
                    grouping: !1,
                    groupingView: {
                        groupField: [],
                        groupOrder: [],
                        groupText: [],
                        groupColumnShow: [],
                        groupSummary: [],
                        showSummaryOnHide: !1,
                        sortitems: [],
                        sortnames: [],
                        summary: [],
                        summaryval: [],
                        plusicon: "",
                        minusicon: "",
                        displayField: [],
                        groupSummaryPos: [],
                        formatDisplayField: [],
                        _locgr: !1
                    },
                    ignoreCase: !0,
                    cmTemplate: {},
                    idPrefix: "",
                    multiSort: !1,
                    minColWidth: 33,
                    scrollPopUp: !1,
                    scrollTopOffset: 0,
                    scrollLeftOffset: "100%",
                    scrollMaxBuffer: 0,
                    storeNavOptions: !1,
                    regional: "en",
                    styleUI: "jQueryUI",
                    iconSet: "Iconic",
                    responsive: !1,
                    restoreCellonFail: !0,
                    editNextRowCell: !1,
                    colFilters: {},
                    colMenu: !1,
                    colMenuCustom: {},
                    colMenuColumnDone: null,
                    treeGrid_bigData: !1,
                    treeGrid_rootParams: {
                        otherData: {}
                    },
                    treeGrid_beforeRequest: null,
                    treeGrid_afterLoadComplete: null,
                    useNameForSearch: !1
                }, $.jgrid.defaults, a);
                void 0 !== c && (d.data = c,
                a.data = c);
                var e = this
                  , f = {
                    headers: [],
                    cols: [],
                    footers: [],
                    dragStart: function(a, b, c) {
                        var f = $(this.bDiv).offset().left
                          , g = parseInt(d.colModel[a].minResizeWidth ? d.colModel[a].minResizeWidth : d.minColWidth, 10);
                        isNaN(g) && (g = 33),
                        this.resizing = {
                            idx: a,
                            startX: b.pageX,
                            sOL: b.pageX - f,
                            minW: g
                        },
                        this.hDiv.style.cursor = "col-resize",
                        this.curGbox = $("#rs_m" + $.jgrid.jqID(d.id), "#gbox_" + $.jgrid.jqID(d.id)),
                        this.curGbox.css({
                            display: "block",
                            left: b.pageX - f,
                            top: c[1],
                            height: c[2]
                        }),
                        $(e).triggerHandler("jqGridResizeStart", [b, a]),
                        $.isFunction(d.resizeStart) && d.resizeStart.call(e, b, a),
                        document.onselectstart = function() {
                            return !1
                        }
                    },
                    dragMove: function(a) {
                        if (this.resizing) {
                            var b, c, e = a.pageX - this.resizing.startX, f = this.headers[this.resizing.idx], g = "ltr" === d.direction ? f.width + e : f.width - e;
                            g > this.resizing.minW && (this.curGbox.css({
                                left: this.resizing.sOL + e
                            }),
                            !0 === d.forceFit ? (b = this.headers[this.resizing.idx + d.nv],
                            (c = "ltr" === d.direction ? b.width - e : b.width + e) > this.resizing.minW && (f.newWidth = g,
                            b.newWidth = c)) : (this.newWidth = "ltr" === d.direction ? d.tblwidth + e : d.tblwidth - e,
                            f.newWidth = g))
                        }
                    },
                    dragEnd: function(a) {
                        if (this.hDiv.style.cursor = "default",
                        this.resizing) {
                            var b = this.resizing.idx
                              , c = this.headers[b].newWidth || this.headers[b].width;
                            c = parseInt(c, 10),
                            this.resizing = !1,
                            $("#rs_m" + $.jgrid.jqID(d.id)).css("display", "none"),
                            d.colModel[b].width = c,
                            this.headers[b].width = c,
                            this.headers[b].el.style.width = c + "px",
                            this.cols[b].style.width = c + "px",
                            this.footers.length > 0 && (this.footers[b].style.width = c + "px"),
                            !0 === d.forceFit ? (c = this.headers[b + d.nv].newWidth || this.headers[b + d.nv].width,
                            this.headers[b + d.nv].width = c,
                            this.headers[b + d.nv].el.style.width = c + "px",
                            this.cols[b + d.nv].style.width = c + "px",
                            this.footers.length > 0 && (this.footers[b + d.nv].style.width = c + "px"),
                            d.colModel[b + d.nv].width = c) : (d.tblwidth = this.newWidth || d.tblwidth,
                            $("table:first", this.bDiv).css("width", d.tblwidth + "px"),
                            $("table:first", this.hDiv).css("width", d.tblwidth + "px"),
                            this.hDiv.scrollLeft = this.bDiv.scrollLeft,
                            d.footerrow && ($("table:first", this.sDiv).css("width", d.tblwidth + "px"),
                            this.sDiv.scrollLeft = this.bDiv.scrollLeft)),
                            a && ($(e).triggerHandler("jqGridResizeStop", [c, b]),
                            $.isFunction(d.resizeStop) && d.resizeStop.call(e, c, b))
                        }
                        this.curGbox = null,
                        document.onselectstart = function() {
                            return !0
                        }
                    },
                    populateVisible: function() {
                        f.timer && clearTimeout(f.timer),
                        f.timer = null;
                        var a = $(f.bDiv).height();
                        if (a) {
                            var b, c, g = $("table:first", f.bDiv);
                            if (g[0].rows.length)
                                try {
                                    b = g[0].rows[1],
                                    c = b ? $(b).outerHeight() || f.prevRowHeight : f.prevRowHeight
                                } catch (a) {
                                    c = f.prevRowHeight
                                }
                            if (c) {
                                f.prevRowHeight = c;
                                var h, i, j, k = d.rowNum, l = f.scrollTop = f.bDiv.scrollTop, m = Math.round(g.position().top) - l, n = m + g.height(), o = c * k;
                                if (n < a && m <= 0 && (void 0 === d.lastpage || (parseInt((n + l + o - 1) / o, 10) || 0) <= d.lastpage) && (i = parseInt((a - n + o - 1) / o, 10) || 1,
                                n >= 0 || i < 2 || !0 === d.scroll ? (h = (Math.round((n + l) / o) || 0) + 1,
                                m = -1) : m = 1),
                                m > 0 && (h = (parseInt(l / o, 10) || 0) + 1,
                                i = (parseInt((l + a) / o, 10) || 0) + 2 - h,
                                j = !0),
                                i) {
                                    if (d.lastpage && (h > d.lastpage || 1 === d.lastpage || h === d.page && h === d.lastpage))
                                        return;
                                    f.hDiv.loading ? f.timer = setTimeout(f.populateVisible, d.scrollTimeout) : (d.page = h,
                                    d.scrollMaxBuffer > 0 && (k > 0 && d.scrollMaxBuffer < k && (d.scrollMaxBuffer = k + 1),
                                    d.reccount > d.scrollMaxBuffer - (k > 0 ? k : 0) && (j = !0)),
                                    j && (f.selectionPreserver(g[0]),
                                    f.emptyRows.call(g[0], !1, !1)),
                                    f.populate(i)),
                                    d.scrollPopUp && null != d.lastpage && ($("#scroll_g" + d.id).show().html($.jgrid.template($.jgrid.getRegional(e, "defaults.pgtext", d.pgtext), d.page, d.lastpage)).css({
                                        top: d.scrollTopOffset + l * ((parseInt(d.height, 10) - 45) / (parseInt(c, 10) * parseInt(d.records, 10))) + "px",
                                        left: d.scrollLeftOffset
                                    }),
                                    $(this).mouseout(function() {
                                        $("#scroll_g" + d.id).hide()
                                    }))
                                }
                            }
                        }
                    },
                    scrollGrid: function(a) {
                        if (d.scroll) {
                            var b = f.bDiv.scrollTop;
                            void 0 === f.scrollTop && (f.scrollTop = 0),
                            b !== f.scrollTop && (f.scrollTop = b,
                            f.timer && clearTimeout(f.timer),
                            f.timer = setTimeout(f.populateVisible, d.scrollTimeout))
                        }
                        f.hDiv.scrollLeft = f.bDiv.scrollLeft,
                        d.footerrow && (f.sDiv.scrollLeft = f.bDiv.scrollLeft),
                        d.frozenColumns && $(f.fbDiv).scrollTop(f.bDiv.scrollTop);
                        try {
                            $("#column_menu").remove()
                        } catch (a) {}
                        a && a.stopPropagation()
                    },
                    selectionPreserver: function(a) {
                        var b = a.p
                          , c = b.selrow
                          , d = b.selarrrow ? $.makeArray(b.selarrrow) : null
                          , e = a.grid.bDiv.scrollLeft
                          , f = function() {
                            var g;
                            if (b.multiselect && d && d.length > 0)
                                for (g = 0; g < d.length; g++)
                                    d[g] && $(a).jqGrid("setSelection", d[g], !1, "_sp_");
                            !b.multiselect && c && $(a).jqGrid("setSelection", c, !1, null),
                            a.grid.bDiv.scrollLeft = e,
                            $(a).off(".selectionPreserver", f)
                        };
                        $(a).on("jqGridGridComplete.selectionPreserver", f)
                    }
                };
                if ("TABLE" !== this.tagName.toUpperCase() || null == this.id)
                    return void alert("Element is not a table or has no id!");
                if (void 0 !== document.documentMode && document.documentMode <= 5)
                    return void alert("Grid can not be used in this ('quirks') mode!");
                var g, h, i, j, k = 0;
                for (h in $.jgrid.regional)
                    $.jgrid.regional.hasOwnProperty(h) && (0 === k && (g = h),
                    k++);
                if (1 === k && g !== d.regional && (d.regional = g),
                $(this).empty().attr("tabindex", "0"),
                this.p = d,
                this.p.useProp = !!$.fn.prop,
                0 === this.p.colNames.length)
                    for (k = 0; k < this.p.colModel.length; k++)
                        this.p.colNames[k] = this.p.colModel[k].label || this.p.colModel[k].name;
                if (this.p.colNames.length !== this.p.colModel.length)
                    return void alert($.jgrid.getRegional(this, "errors.model"));
                "Bootstrap4" === e.p.styleUI && $.jgrid.iconSet.hasOwnProperty(e.p.iconSet) && $.extend(!0, $.jgrid.styleUI.Bootstrap4, $.jgrid.iconSet[e.p.iconSet]);
                var l, m = $.jgrid.getMethod("getStyleUI"), n = e.p.styleUI + ".common", o = m(n, "disabled", !0), p = m(n, "highlight", !0), q = m(n, "hover", !0), r = m(n, "cornerall", !0), s = m(n, "icon_base", !0), t = $.jgrid.styleUI[e.p.styleUI || "jQueryUI"].colmenu, u = $.jgrid.msie(), v = [], w = [], x = [];
                n = e.p.styleUI + ".base",
                l = $("<div " + m(n, "viewBox", !1, "ui-jqgrid-view") + " role='grid'></div>"),
                e.p.direction = $.trim(e.p.direction.toLowerCase()),
                e.p._ald = !1,
                -1 === $.inArray(e.p.direction, ["ltr", "rtl"]) && (e.p.direction = "ltr"),
                i = e.p.direction,
                $(l).insertBefore(this),
                $(this).appendTo(l);
                var y = $("<div " + m(n, "entrieBox", !1, "ui-jqgrid") + "></div>");
                $(y).attr({
                    id: "gbox_" + this.id,
                    dir: i
                }).insertBefore(l),
                $(l).attr("id", "gview_" + this.id).appendTo(y),
                $("<div " + m(e.p.styleUI + ".common", "overlay", !1, "jqgrid-overlay") + " id='lui_" + this.id + "'></div>").insertBefore(l),
                $("<div " + m(n, "loadingBox", !1, "loading") + " id='load_" + this.id + "'>" + $.jgrid.getRegional(e, "defaults.loadtext", this.p.loadtext) + "</div>").insertBefore(l),
                $(this).attr({
                    role: "presentation",
                    "aria-multiselectable": !!this.p.multiselect,
                    "aria-labelledby": "gbox_" + this.id
                });
                var z, A = ["shiftKey", "altKey", "ctrlKey"], B = $.jgrid.getFont(e), C = function(a, b) {
                    return a = parseInt(a, 10),
                    isNaN(a) ? b || 0 : a
                }, D = function(a, b, c, d, g, h) {
                    var i, j, k = e.p.colModel[a], l = k.align, m = 'style="', n = k.classes, o = k.name, p = [];
                    return l && (m += "text-align:" + l + ";"),
                    !0 === k.hidden && (m += "display:none;"),
                    0 === b ? m += "width: " + f.headers[a].width + "px;" : ($.isFunction(k.cellattr) || "string" == typeof k.cellattr && null != $.jgrid.cellattr && $.isFunction($.jgrid.cellattr[k.cellattr])) && (i = $.isFunction(k.cellattr) ? k.cellattr : $.jgrid.cellattr[k.cellattr],
                    (j = i.call(e, g, c, d, k, h)) && "string" == typeof j && (j.indexOf("title") > -1 && (k.title = !1),
                    j.indexOf("class") > -1 && (n = void 0),
                    j = String(j).replace(/\s+\=/g, "="),
                    p = j.split("style="),
                    2 === p.length ? (p[1] = $.trim(p[1]),
                    0 !== p[1].indexOf("'") && 0 !== p[1].indexOf('"') || (p[1] = p[1].substring(1)),
                    m += p[1].replace(/'/gi, '"')) : m += '"')),
                    p.length ? p.length > 2 && (p[0] = "") : (p[0] = "",
                    m += '"'),
                    m += (void 0 !== n ? ' class="' + n + '"' : "") + (k.title && c ? ' title="' + $.jgrid.stripHtml(c) + '"' : ""),
                    (m += ' aria-describedby="' + e.p.id + "_" + o + '"') + p[0]
                }, E = function(a) {
                    return null == a || "" === a ? "&#160;" : e.p.autoencode ? $.jgrid.htmlEncode(a) : String(a)
                }, F = function(a, b, c, d, f) {
                    var g, h = e.p.colModel[c];
                    if (void 0 !== h.formatter) {
                        a = "" !== String(e.p.idPrefix) ? $.jgrid.stripPref(e.p.idPrefix, a) : a;
                        var i = {
                            rowId: a,
                            colModel: h,
                            gid: e.p.id,
                            pos: c,
                            styleUI: e.p.styleUI
                        };
                        g = $.isFunction(h.formatter) ? h.formatter.call(e, b, i, d, f) : $.fmatter ? $.fn.fmatter.call(e, h.formatter, b, i, d, f) : E(b)
                    } else
                        g = E(b);
                    return e.p.autoResizing && h.autosize && (h._maxsize || (h._maxsize = 0),
                    h._maxsize = Math.max($.jgrid.getTextWidth(g, B), h._maxsize)),
                    g
                }, G = function(a, b, c, d, e, f) {
                    var g;
                    return g = F(a, b, c, e, "add"),
                    '<td role="gridcell" ' + D(c, d, g, e, a, f) + ">" + g + "</td>"
                }, H = function(a, b, c, d, f) {
                    var g = '<input role="checkbox" type="checkbox" id="jqg_' + e.p.id + "_" + a + '" ' + f + ' name="jqg_' + e.p.id + "_" + a + '"' + (d ? 'checked="checked"' : "") + "/>";
                    return '<td role="gridcell" ' + D(b, c, "", null, a, !0) + ">" + g + "</td>"
                }, I = function(a, b, c, d, e) {
                    var f = (parseInt(c, 10) - 1) * parseInt(d, 10) + 1 + b;
                    return '<td role="gridcell" ' + e + " " + D(a, b, f, null, b, !0) + ">" + f + "</td>"
                }, J = function(a) {
                    var b, c, d = [], f = 0;
                    for (c = 0; c < e.p.colModel.length; c++)
                        b = e.p.colModel[c],
                        "cb" !== b.name && "subgrid" !== b.name && "rn" !== b.name && (d[f] = "local" === a ? b.name : "xml" === a || "xmlstring" === a ? b.xmlmap || b.name : b.jsonmap || b.name,
                        !1 !== e.p.keyName && !0 === b.key && (e.p.keyName = d[f],
                        e.p.keyIndex = f),
                        f++);
                    return d
                }, K = function(a) {
                    var b = e.p.remapColumns;
                    return b && b.length || (b = $.map(e.p.colModel, function(a, b) {
                        return b
                    })),
                    a && (b = $.map(b, function(b) {
                        return b < a ? null : b - a
                    })),
                    b
                }, L = function(a, b) {
                    var c;
                    this.p.deepempty ? $(this.rows).slice(1).remove() : (c = this.rows.length > 0 ? this.rows[0] : null,
                    $(this.firstChild).empty().append(c)),
                    a && this.p.scroll && ($(this.grid.bDiv.firstChild).css({
                        height: "auto"
                    }),
                    $(this.grid.bDiv.firstChild.firstChild).css({
                        height: "0px",
                        display: "none"
                    }),
                    0 !== this.grid.bDiv.scrollTop && (this.grid.bDiv.scrollTop = 0)),
                    !0 === b && this.p.treeGrid && !this.p.loadonce && (this.p.data = [],
                    this.p._index = {})
                }, M = function() {
                    var a, b, c, d, f, g, h, i, j, k, l, m = e.p, n = m.data, o = n.length, p = m.localReader, q = m.colModel, r = p.cell, s = (!0 === m.multiselect ? 1 : 0) + (!0 === m.subGrid ? 1 : 0) + (!0 === m.rownumbers ? 1 : 0), t = m.scroll ? $.jgrid.randId() : 1;
                    if ("local" === m.datatype && !0 === p.repeatitems)
                        for (j = K(s),
                        k = J("local"),
                        d = !1 === m.keyName ? $.isFunction(p.id) ? p.id.call(e, n) : p.id : m.keyName,
                        a = 0; a < o; a++) {
                            for (c = n[a],
                            f = $.jgrid.getAccessor(c, d),
                            void 0 === f && ("number" == typeof d && null != q[d + s] && (f = $.jgrid.getAccessor(c, q[d + s].name)),
                            void 0 === f && (f = t + a,
                            r && (g = $.jgrid.getAccessor(c, r) || c,
                            f = null != g && void 0 !== g[d] ? g[d] : f,
                            g = null))),
                            i = {},
                            i[p.id] = f,
                            r && (c = $.jgrid.getAccessor(c, r) || c),
                            l = $.isArray(c) ? j : k,
                            b = 0; b < l.length; b++)
                                h = $.jgrid.getAccessor(c, l[b]),
                                i[q[b + s].name] = h;
                            n[a] = i
                        }
                }, N = function() {
                    var a, b, c, d = e.p.data.length;
                    for (a = !1 === e.p.keyName || !0 === e.p.loadonce ? e.p.localReader.id : e.p.keyName,
                    e.p._index = [],
                    b = 0; b < d; b++)
                        c = $.jgrid.getAccessor(e.p.data[b], a),
                        void 0 === c && (c = String(b + 1)),
                        e.p._index[c] = b
                }, O = function(a, b, c, d, f) {
                    var g, h = "-1", i = "", j = b ? "display:none;" : "", k = $(e).triggerHandler("jqGridRowAttr", [d, f, a]);
                    if ("object" != typeof k && (k = $.isFunction(e.p.rowattr) ? e.p.rowattr.call(e, d, f, a) : "string" == typeof e.p.rowattr && null != $.jgrid.rowattr && $.isFunction($.jgrid.rowattr[e.p.rowattr]) ? $.jgrid.rowattr[e.p.rowattr].call(e, d, f, a) : {}),
                    !$.isEmptyObject(k)) {
                        k.hasOwnProperty("id") && (a = k.id,
                        delete k.id),
                        k.hasOwnProperty("tabindex") && (h = k.tabindex,
                        delete k.tabindex),
                        k.hasOwnProperty("style") && (j += k.style,
                        delete k.style),
                        k.hasOwnProperty("class") && (c += " " + k.class,
                        delete k.class);
                        try {
                            delete k.role
                        } catch (a) {}
                        for (g in k)
                            k.hasOwnProperty(g) && (i += " " + g + "=" + k[g])
                    }
                    return '<tr role="row" id="' + a + '" tabindex="' + h + '" class="' + c + '"' + ("" === j ? "" : ' style="' + j + '"') + i + ">"
                }, P = function() {
                    e.p.treeGrid && e.p.treeGrid_bigData && void 0 !== e.p.postData.nodeid && "string" == typeof e.p.postData.nodeid && ("" !== e.p.postData.nodeid || parseInt(e.p.postData.nodeid, 10) > 0) && (e.p.postData.rows = 1e4,
                    e.p.postData.page = 1,
                    e.p.treeGrid_rootParams.otherData.nodeid = e.p.postData.nodeid)
                }, Q = function() {
                    e.p.treeGrid && e.p.treeGrid_bigData && (void 0 !== e.p.treeGrid_rootParams.otherData.nodeid && "string" == typeof e.p.treeGrid_rootParams.otherData.nodeid && ("" !== e.p.treeGrid_rootParams.otherData.nodeid || parseInt(e.p.treeGrid_rootParams.otherData.nodeid, 10) > 0) ? void 0 !== e.p.treeGrid_rootParams && null != e.p.treeGrid_rootParams && (e.p.page = e.p.treeGrid_rootParams.page,
                    e.p.lastpage = e.p.treeGrid_rootParams.lastpage,
                    e.p.postData.rows = e.p.treeGrid_rootParams.postData.rows,
                    e.p.postData.totalrows = e.p.treeGrid_rootParams.postData.totalrows,
                    e.p.treeGrid_rootParams.otherData.nodeid = "",
                    e.updatepager(!1, !0)) : e.p.treeGrid_rootParams = {
                        page: e.p.page,
                        lastpage: e.p.lastpage,
                        postData: {
                            rows: e.p.postData.rows,
                            totalrows: e.p.postData.totalrows
                        },
                        rowNum: e.p.rowNum,
                        rowTotal: e.p.rowTotal,
                        otherData: {
                            nodeid: ""
                        }
                    })
                }, R = function(a, b, c, d) {
                    var f = new Date
                      , g = "local" !== e.p.datatype && e.p.loadonce || "xmlstring" === e.p.datatype
                      , h = "_id_"
                      , i = e.p.xmlReader
                      , k = "local" === e.p.datatype ? "local" : "xml";
                    if (g && (e.p.data = [],
                    e.p._index = {},
                    e.p.localReader.id = h),
                    e.p.reccount = 0,
                    $.isXMLDoc(a)) {
                        -1 !== e.p.treeANode || e.p.scroll ? b = b > 1 ? b : 1 : (L.call(e, !1, !0),
                        b = 1);
                        var l, o, p, q, r, s, t, u, v, w = $(e), x = 0, y = !0 === e.p.multiselect ? 1 : 0, z = 0, A = !0 === e.p.rownumbers ? 1 : 0, B = [], D = {}, E = [], F = m(n, "rowBox", !0, "jqgrow ui-row-" + e.p.direction);
                        !0 === e.p.subGrid && (z = 1,
                        q = $.jgrid.getMethod("addSubGridCell")),
                        i.repeatitems || (B = J(k)),
                        r = !1 === e.p.keyName ? $.isFunction(i.id) ? i.id.call(e, a) : i.id : e.p.keyName,
                        i.repeatitems && e.p.keyName && isNaN(r) && (r = e.p.keyIndex),
                        s = -1 === String(r).indexOf("[") ? B.length ? function(a, b) {
                            return $(r, a).text() || b
                        }
                        : function(a, b) {
                            return $(i.cell, a).eq(r).text() || b
                        }
                        : function(a, b) {
                            return a.getAttribute(r.replace(/[\[\]]/g, "")) || b
                        }
                        ,
                        e.p.userData = {},
                        e.p.page = C($.jgrid.getXmlData(a, i.page), e.p.page),
                        e.p.lastpage = C($.jgrid.getXmlData(a, i.total), 1),
                        e.p.records = C($.jgrid.getXmlData(a, i.records)),
                        $.isFunction(i.userdata) ? e.p.userData = i.userdata.call(e, a) || {} : $.jgrid.getXmlData(a, i.userdata, !0).each(function() {
                            e.p.userData[this.getAttribute("name")] = $(this).text()
                        });
                        var M = $.jgrid.getXmlData(a, i.root, !0);
                        M = $.jgrid.getXmlData(M, i.row, !0),
                        M || (M = []);
                        var N, P, Q = M.length, R = 0, S = [], T = parseInt(e.p.rowNum, 10), U = e.p.scroll ? $.jgrid.randId() : 1, V = $(e).find("tbody:first"), W = !1;
                        if (e.p.grouping && (W = !0 === e.p.groupingView.groupCollapse,
                        N = $.jgrid.getMethod("groupingPrepare")),
                        Q > 0 && e.p.page <= 0 && (e.p.page = 1),
                        M && Q) {
                            d && (T *= d + 1);
                            for (var X = $.isFunction(e.p.afterInsertRow), Y = A ? m(n, "rownumBox", !1, "jqgrid-rownum") : "", Z = y ? m(n, "multiBox", !1, "cbox") : ""; R < Q; ) {
                                u = M[R],
                                v = s(u, U + R),
                                v = e.p.idPrefix + v,
                                e.p.preserveSelection && (e.p.multiselect ? (P = -1 !== e.p.selarrrow.indexOf(v),
                                j = P ? j + 1 : j) : P = v === e.p.selrow);
                                var aa = E.length;
                                if (E.push(""),
                                A && E.push(I(0, R, e.p.page, e.p.rowNum, Y)),
                                y && E.push(H(v, A, R, P, Z)),
                                z && E.push(q.call(w, y + A, R + b)),
                                i.repeatitems) {
                                    t || (t = K(y + z + A));
                                    var ba = $.jgrid.getXmlData(u, i.cell, !0);
                                    $.each(t, function(a) {
                                        var c = ba[this];
                                        if (!c)
                                            return !1;
                                        p = c.textContent || c.text || "",
                                        D[e.p.colModel[a + y + z + A].name] = p,
                                        E.push(G(v, p, a + y + z + A, R + b, u, D))
                                    })
                                } else
                                    for (l = 0; l < B.length; l++)
                                        p = $.jgrid.getXmlData(u, B[l]),
                                        D[e.p.colModel[l + y + z + A].name] = p,
                                        E.push(G(v, p, l + y + z + A, R + b, u, D));
                                if (E[aa] = O(v, W, F, D, u),
                                E.push("</tr>"),
                                e.p.grouping && (S.push(E),
                                e.p.groupingView._locgr || N.call(w, D, R),
                                E = []),
                                (g || !0 === e.p.treeGrid && !e.p._ald) && (D[h] = $.jgrid.stripPref(e.p.idPrefix, v),
                                e.p.data.push(D),
                                e.p._index[D[h]] = e.p.data.length - 1),
                                !1 === e.p.gridview && (V.append(E.join("")),
                                w.triggerHandler("jqGridAfterInsertRow", [v, D, u]),
                                X && e.p.afterInsertRow.call(e, v, D, u),
                                E = []),
                                D = {},
                                x++,
                                R++,
                                x === T)
                                    break
                            }
                        }
                        if (j = e.p.multiselect && e.p.preserveSelection && x === j,
                        !0 === e.p.gridview && (o = e.p.treeANode > -1 ? e.p.treeANode : 0,
                        e.p.grouping ? g || (w.jqGrid("groupingRender", S, e.p.colModel.length, e.p.page, T),
                        S = null) : !0 === e.p.treeGrid && o > 0 ? $(e.rows[o]).after(E.join("")) : (V.append(E.join("")),
                        e.grid.cols = e.rows[0].cells)),
                        e.p.totaltime = new Date - f,
                        E = null,
                        x > 0 && 0 === e.p.records && (e.p.records = Q),
                        !0 === e.p.treeGrid)
                            try {
                                w.jqGrid("setTreeNode", o + 1, x + o + 1)
                            } catch (a) {}
                        if (e.p.reccount = x,
                        e.p.treeANode = -1,
                        e.p.userDataOnFooter && w.jqGrid("footerData", "set", e.p.userData, !0),
                        g && (e.p.records = Q,
                        e.p.lastpage = Math.ceil(Q / T)),
                        c || e.updatepager(!1, !0),
                        j && _(!0),
                        g) {
                            for (; x < Q; ) {
                                if (u = M[x],
                                v = s(u, x + U),
                                v = e.p.idPrefix + v,
                                i.repeatitems) {
                                    t || (t = K(y + z + A));
                                    var ca = $.jgrid.getXmlData(u, i.cell, !0);
                                    $.each(t, function(a) {
                                        var b = ca[this];
                                        if (!b)
                                            return !1;
                                        p = b.textContent || b.text || "",
                                        D[e.p.colModel[a + y + z + A].name] = p
                                    })
                                } else
                                    for (l = 0; l < B.length; l++)
                                        p = $.jgrid.getXmlData(u, B[l]),
                                        D[e.p.colModel[l + y + z + A].name] = p;
                                D[h] = $.jgrid.stripPref(e.p.idPrefix, v),
                                e.p.grouping && N.call(w, D, x),
                                e.p.data.push(D),
                                e.p._index[D[h]] = e.p.data.length - 1,
                                D = {},
                                x++
                            }
                            e.p.grouping && (e.p.groupingView._locgr = !0,
                            w.jqGrid("groupingRender", S, e.p.colModel.length, e.p.page, T),
                            S = null)
                        }
                        if (!0 === e.p.subGrid)
                            try {
                                w.jqGrid("addSubGrid", y + A)
                            } catch (a) {}
                    }
                }, S = function(a, b, c, d) {
                    var f = new Date;
                    if (a) {
                        -1 !== e.p.treeANode || e.p.scroll ? b = b > 1 ? b : 1 : (L.call(e, !1, !0),
                        b = 1);
                        var g, h;
                        "local" === e.p.datatype ? (g = e.p.localReader,
                        h = "local") : (g = e.p.jsonReader,
                        h = "json");
                        var i, k, l, o, q, r, s, t, u, v, w, x, y, z = "_id_", A = "local" !== e.p.datatype && e.p.loadonce || "jsonstring" === e.p.datatype, B = $(e), D = 0, E = [], F = e.p.multiselect ? 1 : 0, M = !0 === e.p.subGrid ? 1 : 0, N = !0 === e.p.rownumbers ? 1 : 0, P = e.p.scroll && "local" !== e.p.datatype ? $.jgrid.randId() : 1, Q = parseInt(e.p.rowNum, 10), R = !1, S = K(F + M + N), T = J(h), U = {}, V = [], W = m(n, "rowBox", !0, "jqgrow ui-row-" + e.p.direction), X = $.isFunction(e.p.afterInsertRow), Y = [], Z = !1, aa = $(e).find("tbody:first"), ba = N ? m(n, "rownumBox", !1, "jqgrid-rownum") : "", ca = F ? m(n, "multiBox", !1, "cbox") : "";
                        for (A && (e.p.data = [],
                        e.p._index = {},
                        e.p.localReader.id = z),
                        e.p.reccount = 0,
                        e.p.page = C($.jgrid.getAccessor(a, g.page), e.p.page),
                        e.p.lastpage = C($.jgrid.getAccessor(a, g.total), 1),
                        e.p.records = C($.jgrid.getAccessor(a, g.records)),
                        e.p.userData = $.jgrid.getAccessor(a, g.userdata) || {},
                        M && (q = $.jgrid.getMethod("addSubGridCell")),
                        v = !1 === e.p.keyName ? $.isFunction(g.id) ? g.id.call(e, a) : g.id : e.p.keyName,
                        g.repeatitems && e.p.keyName && isNaN(v) && (v = e.p.keyIndex),
                        u = $.jgrid.getAccessor(a, g.root),
                        null == u && $.isArray(a) && (u = a),
                        u || (u = []),
                        t = u.length,
                        k = 0,
                        t > 0 && e.p.page <= 0 && (e.p.page = 1),
                        d && (Q *= d + 1),
                        "local" !== e.p.datatype || e.p.deselectAfterSort || (R = !0),
                        e.p.grouping && (Z = !0 === e.p.groupingView.groupCollapse,
                        y = $.jgrid.getMethod("groupingPrepare")); k < t; ) {
                            if (o = u[k],
                            void 0 === (x = $.jgrid.getAccessor(o, v)) && ("number" == typeof v && null != e.p.colModel[v + F + M + N] && (x = $.jgrid.getAccessor(o, e.p.colModel[v + F + M + N].name)),
                            void 0 === x && (x = P + k,
                            0 === E.length && g.cell))) {
                                var da = $.jgrid.getAccessor(o, g.cell) || o;
                                x = null != da && void 0 !== da[v] ? da[v] : x,
                                da = null
                            }
                            x = e.p.idPrefix + x,
                            (R || e.p.preserveSelection) && (e.p.multiselect ? (r = -1 !== e.p.selarrrow.indexOf(x),
                            j = r ? j + 1 : j) : r = x === e.p.selrow);
                            var ea = V.length;
                            for (V.push(""),
                            N && V.push(I(0, k, e.p.page, e.p.rowNum, ba)),
                            F && V.push(H(x, N, k, r, ca)),
                            M && V.push(q.call(B, F + N, k + b)),
                            s = T,
                            g.repeatitems && (g.cell && (o = $.jgrid.getAccessor(o, g.cell) || o),
                            $.isArray(o) && (s = S)),
                            l = 0; l < s.length; l++)
                                i = $.jgrid.getAccessor(o, s[l]),
                                U[e.p.colModel[l + F + M + N].name] = i,
                                V.push(G(x, i, l + F + M + N, k + b, o, U));
                            if (V[ea] = O(x, Z, r ? W + " " + p : W, U, o),
                            V.push("</tr>"),
                            e.p.grouping && (Y.push(V),
                            e.p.groupingView._locgr || y.call(B, U, k),
                            V = []),
                            (A || !0 === e.p.treeGrid && !e.p._ald) && (U[z] = $.jgrid.stripPref(e.p.idPrefix, x),
                            e.p.data.push(U),
                            e.p._index[U[z]] = e.p.data.length - 1),
                            !1 === e.p.gridview && (aa.append(V.join("")),
                            B.triggerHandler("jqGridAfterInsertRow", [x, U, o]),
                            X && e.p.afterInsertRow.call(e, x, U, o),
                            V = []),
                            U = {},
                            D++,
                            k++,
                            D === Q)
                                break
                        }
                        if (j = e.p.multiselect && (e.p.preserveSelection || R) && D === j,
                        !0 === e.p.gridview && (w = e.p.treeANode > -1 ? e.p.treeANode : 0,
                        e.p.grouping ? A || (B.jqGrid("groupingRender", Y, e.p.colModel.length, e.p.page, Q),
                        Y = null) : !0 === e.p.treeGrid && w > 0 ? $(e.rows[w]).after(V.join("")) : (aa.append(V.join("")),
                        e.grid.cols = e.rows[0].cells)),
                        e.p.totaltime = new Date - f,
                        V = null,
                        D > 0 && 0 === e.p.records && (e.p.records = t),
                        !0 === e.p.treeGrid)
                            try {
                                B.jqGrid("setTreeNode", w + 1, D + w + 1)
                            } catch (a) {}
                        if (e.p.reccount = D,
                        e.p.treeANode = -1,
                        e.p.userDataOnFooter && B.jqGrid("footerData", "set", e.p.userData, !0),
                        A && (e.p.records = t,
                        e.p.lastpage = Math.ceil(t / Q)),
                        c || e.updatepager(!1, !0),
                        j && _(!0),
                        A) {
                            for (; D < t && u[D]; ) {
                                if (o = u[D],
                                void 0 === (x = $.jgrid.getAccessor(o, v)) && ("number" == typeof v && null != e.p.colModel[v + F + M + N] && (x = $.jgrid.getAccessor(o, e.p.colModel[v + F + M + N].name)),
                                void 0 === x && (x = P + D,
                                0 === E.length && g.cell))) {
                                    var fa = $.jgrid.getAccessor(o, g.cell) || o;
                                    x = null != fa && void 0 !== fa[v] ? fa[v] : x,
                                    fa = null
                                }
                                if (o) {
                                    for (x = e.p.idPrefix + x,
                                    s = T,
                                    g.repeatitems && (g.cell && (o = $.jgrid.getAccessor(o, g.cell) || o),
                                    $.isArray(o) && (s = S)),
                                    l = 0; l < s.length; l++)
                                        U[e.p.colModel[l + F + M + N].name] = $.jgrid.getAccessor(o, s[l]);
                                    U[z] = $.jgrid.stripPref(e.p.idPrefix, x),
                                    e.p.grouping && y.call(B, U, D),
                                    e.p.data.push(U),
                                    e.p._index[U[z]] = e.p.data.length - 1,
                                    U = {}
                                }
                                D++
                            }
                            e.p.grouping && (e.p.groupingView._locgr = !0,
                            B.jqGrid("groupingRender", Y, e.p.colModel.length, e.p.page, Q),
                            Y = null)
                        }
                        if (!0 === e.p.subGrid)
                            try {
                                B.jqGrid("addSubGrid", F + N)
                            } catch (a) {}
                    }
                }, T = function(a) {
                    function b(a) {
                        var c, d, f, g, h, i, j = 0;
                        if (null != a.groups) {
                            for (d = a.groups.length && "OR" === a.groupOp.toString().toUpperCase(),
                            d && s.orBegin(),
                            c = 0; c < a.groups.length; c++) {
                                j > 0 && d && s.or();
                                try {
                                    b(a.groups[c])
                                } catch (a) {
                                    alert(a)
                                }
                                j++
                            }
                            d && s.orEnd()
                        }
                        if (null != a.rules)
                            try {
                                f = a.rules.length && "OR" === a.groupOp.toString().toUpperCase(),
                                f && s.orBegin();
                                var l;
                                for (c = 0; c < a.rules.length; c++) {
                                    if (h = a.rules[c],
                                    g = a.groupOp.toString().toUpperCase(),
                                    r[h.op] && h.field) {
                                        j > 0 && g && "OR" === g && (s = s.or()),
                                        l = h.field,
                                        e.p.useNameForSearch && k.hasOwnProperty(h.field) && (l = k[h.field].name);
                                        try {
                                            i = k[h.field],
                                            "date" === i.stype && i.srcfmt && i.newfmt && i.srcfmt !== i.newfmt && (h.data = $.jgrid.parseDate.call(e, i.newfmt, h.data, i.srcfmt)),
                                            s = r[h.op](s, g)(l, h.data, i)
                                        } catch (a) {}
                                    }
                                    j++
                                }
                                f && s.orEnd()
                            } catch (a) {
                                alert(a)
                            }
                    }
                    var c, d, f, g, h = e.p.multiSort ? [] : "", i = [], j = !1, k = {}, l = [], m = [];
                    if ($.isArray(e.p.data)) {
                        var n, o, p, q = !!e.p.grouping && e.p.groupingView;
                        if ($.each(e.p.colModel, function() {
                            if ("cb" === this.name || "subgrid" === this.name || "rn" === this.name)
                                return !0;
                            if (d = this.sorttype || "text",
                            p = this.index || this.name,
                            "date" === d || "datetime" === d ? (this.formatter && "string" == typeof this.formatter && "date" === this.formatter ? (c = this.formatoptions && this.formatoptions.srcformat ? this.formatoptions.srcformat : $.jgrid.getRegional(e, "formatter.date.srcformat"),
                            f = this.formatoptions && this.formatoptions.newformat ? this.formatoptions.newformat : $.jgrid.getRegional(e, "formatter.date.newformat")) : c = f = this.datefmt || "Y-m-d",
                            k[p] = {
                                stype: d,
                                srcfmt: c,
                                newfmt: f,
                                sfunc: this.sortfunc || null,
                                name: this.name
                            }) : k[p] = {
                                stype: d,
                                srcfmt: "",
                                newfmt: "",
                                sfunc: this.sortfunc || null,
                                name: this.name
                            },
                            e.p.grouping)
                                for (o = 0,
                                n = q.groupField.length; o < n; o++)
                                    this.name === q.groupField[o] && (l[o] = k[p],
                                    m[o] = p);
                            e.p.multiSort || j || p !== e.p.sortname || (h = p,
                            j = !0)
                        }),
                        e.p.multiSort && (h = v,
                        i = w),
                        e.p.treeGrid && e.p._sort)
                            return void $(e).jqGrid("SortTree", h, e.p.sortorder, k[h].stype || "text", k[h].srcfmt || "");
                        var r = {
                            eq: function(a) {
                                return a.equals
                            },
                            ne: function(a) {
                                return a.notEquals
                            },
                            lt: function(a) {
                                return a.less
                            },
                            le: function(a) {
                                return a.lessOrEquals
                            },
                            gt: function(a) {
                                return a.greater
                            },
                            ge: function(a) {
                                return a.greaterOrEquals
                            },
                            cn: function(a) {
                                return a.contains
                            },
                            nc: function(a, b) {
                                return "OR" === b ? a.orNot().contains : a.andNot().contains
                            },
                            bw: function(a) {
                                return a.startsWith
                            },
                            bn: function(a, b) {
                                return "OR" === b ? a.orNot().startsWith : a.andNot().startsWith
                            },
                            en: function(a, b) {
                                return "OR" === b ? a.orNot().endsWith : a.andNot().endsWith
                            },
                            ew: function(a) {
                                return a.endsWith
                            },
                            ni: function(a, b) {
                                return "OR" === b ? a.orNot().equals : a.andNot().equals
                            },
                            in: function(a) {
                                return a.equals
                            },
                            nu: function(a) {
                                return a.isNull
                            },
                            nn: function(a, b) {
                                return "OR" === b ? a.orNot().isNull : a.andNot().isNull
                            }
                        }
                          , s = $.jgrid.from.call(e, e.p.data);
                        if (e.p.ignoreCase && (s = s.ignoreCase()),
                        !0 === e.p.search) {
                            var t = e.p.postData.filters;
                            if (t)
                                "string" == typeof t && (t = $.jgrid.parse(t)),
                                b(t);
                            else
                                try {
                                    g = k[e.p.postData.searchField],
                                    "date" === g.stype && g.srcfmt && g.newfmt && g.srcfmt !== g.newfmt && (e.p.postData.searchString = $.jgrid.parseDate.call(e, g.newfmt, e.p.postData.searchString, g.srcfmt)),
                                    s = r[e.p.postData.searchOper](s)(e.p.postData.searchField, e.p.postData.searchString, k[e.p.postData.searchField])
                                } catch (a) {}
                        } else
                            e.p.treeGrid && "nested" === e.p.treeGridModel && s.orderBy(e.p.treeReader.left_field, "asc", "integer", "", null);
                        if (e.p.treeGrid && "adjacency" === e.p.treeGridModel && (n = 0,
                        h = null),
                        e.p.grouping)
                            for (o = 0; o < n; o++)
                                s.orderBy(m[o], q.groupOrder[o], l[o].stype, l[o].srcfmt);
                        e.p.multiSort ? $.each(h, function(a) {
                            s.orderBy(this, i[a], k[this].stype, k[this].srcfmt, k[this].sfunc)
                        }) : h && e.p.sortorder && j && ("DESC" === e.p.sortorder.toUpperCase() ? s.orderBy(e.p.sortname, "d", k[h].stype, k[h].srcfmt, k[h].sfunc) : s.orderBy(e.p.sortname, "a", k[h].stype, k[h].srcfmt, k[h].sfunc));
                        var u = s.select()
                          , x = parseInt(e.p.rowNum, 10)
                          , y = u.length
                          , z = parseInt(e.p.page, 10)
                          , A = Math.ceil(y / x)
                          , B = {};
                        if ((e.p.search || e.p.resetsearch) && e.p.grouping && e.p.groupingView._locgr) {
                            e.p.groupingView.groups = [];
                            var C, D, E, F = $.jgrid.getMethod("groupingPrepare");
                            if (e.p.footerrow && e.p.userDataOnFooter) {
                                for (D in e.p.userData)
                                    e.p.userData.hasOwnProperty(D) && (e.p.userData[D] = 0);
                                E = !0
                            }
                            for (C = 0; C < y; C++) {
                                if (E)
                                    for (D in e.p.userData)
                                        e.p.userData.hasOwnProperty(D) && (e.p.userData[D] += parseFloat(u[C][D] || 0));
                                F.call($(e), u[C], C, x)
                            }
                        }
                        return a ? u : (u = e.p.treeGrid && e.p.search ? $(e).jqGrid("searchTree", u) : u.slice((z - 1) * x, z * x),
                        s = null,
                        k = null,
                        B[e.p.localReader.total] = A,
                        B[e.p.localReader.page] = z,
                        B[e.p.localReader.records] = y,
                        B[e.p.localReader.root] = u,
                        B[e.p.localReader.userdata] = e.p.userData,
                        u = null,
                        B)
                    }
                }, U = function(a, b) {
                    var c, d, f, g, h, i, j, k, l = "", p = e.p.pager ? $.jgrid.jqID(e.p.pager.substr(1)) : "", r = p ? "_" + p : "", s = e.p.toppager ? "_" + e.p.toppager.substr(1) : "";
                    if (f = parseInt(e.p.page, 10) - 1,
                    f < 0 && (f = 0),
                    f *= parseInt(e.p.rowNum, 10),
                    h = f + e.p.reccount,
                    e.p.scroll) {
                        var t = $("tbody:first > tr:gt(0)", e.grid.bDiv);
                        h > e.p.records && (h = e.p.records),
                        f = h - t.length,
                        e.p.reccount = t.length;
                        var u = t.outerHeight() || e.grid.prevRowHeight;
                        if (u) {
                            var v = f * u
                              , w = parseInt(e.p.records, 10) * u;
                            $(">div:first", e.grid.bDiv).css({
                                height: w
                            }).children("div:first").css({
                                height: v,
                                display: v ? "" : "none"
                            }),
                            0 === e.grid.bDiv.scrollTop && e.p.page > 1 && (e.grid.bDiv.scrollTop = e.p.rowNum * (e.p.page - 1) * u)
                        }
                        e.grid.bDiv.scrollLeft = e.grid.hDiv.scrollLeft
                    }
                    if (l = e.p.pager || "",
                    l += e.p.toppager ? l ? "," + e.p.toppager : e.p.toppager : "") {
                        if (j = $.jgrid.getRegional(e, "formatter.integer"),
                        c = C(e.p.page),
                        d = C(e.p.lastpage),
                        $(".selbox", l)[this.p.useProp ? "prop" : "attr"]("disabled", !1),
                        !0 === e.p.pginput && ($("#input" + r).html($.jgrid.template($.jgrid.getRegional(e, "defaults.pgtext", e.p.pgtext) || "", "<input " + m(n, "pgInput", !1, "ui-pg-input") + " type='text' size='2' maxlength='7' value='0' role='textbox'/>", "<span id='sp_1_" + $.jgrid.jqID(p) + "'></span>")),
                        e.p.toppager && $("#input_t" + s).html($.jgrid.template($.jgrid.getRegional(e, "defaults.pgtext", e.p.pgtext) || "", "<input " + m(n, "pgInput", !1, "ui-pg-input") + " type='text' size='2' maxlength='7' value='0' role='textbox'/>", "<span id='sp_1_" + $.jgrid.jqID(p) + "_toppager'></span>")),
                        $(".ui-pg-input", l).val(e.p.page),
                        k = e.p.toppager ? "#sp_1" + r + ",#sp_1" + r + "_toppager" : "#sp_1" + r,
                        $(k).html($.fmatter ? $.fmatter.util.NumberFormat(e.p.lastpage, j) : e.p.lastpage)),
                        e.p.viewrecords)
                            if (0 === e.p.reccount)
                                $(".ui-paging-info", l).html($.jgrid.getRegional(e, "defaults.emptyrecords", e.p.emptyrecords));
                            else {
                                g = f + 1,
                                i = e.p.records,
                                $.fmatter && (g = $.fmatter.util.NumberFormat(g, j),
                                h = $.fmatter.util.NumberFormat(h, j),
                                i = $.fmatter.util.NumberFormat(i, j));
                                var x = $.jgrid.getRegional(e, "defaults.recordtext", e.p.recordtext);
                                $(".ui-paging-info", l).html($.jgrid.template(x, g, h, i))
                            }
                        !0 === e.p.pgbuttons && (c <= 0 && (c = d = 0),
                        1 === c || 0 === c ? ($("#first" + r + ", #prev" + r).addClass(o).removeClass(q),
                        e.p.toppager && $("#first_t" + s + ", #prev_t" + s).addClass(o).removeClass(q)) : ($("#first" + r + ", #prev" + r).removeClass(o),
                        e.p.toppager && $("#first_t" + s + ", #prev_t" + s).removeClass(o)),
                        c === d || 0 === c ? ($("#next" + r + ", #last" + r).addClass(o).removeClass(q),
                        e.p.toppager && $("#next_t" + s + ", #last_t" + s).addClass(o).removeClass(q)) : ($("#next" + r + ", #last" + r).removeClass(o),
                        e.p.toppager && $("#next_t" + s + ", #last_t" + s).removeClass(o)))
                    }
                    !0 === a && !0 === e.p.rownumbers && $(">td.jqgrid-rownum", e.rows).each(function(a) {
                        $(this).html(f + 1 + a)
                    }),
                    b && e.p.jqgdnd && $(e).jqGrid("gridDnD", "updateDnD"),
                    $(e).triggerHandler("jqGridGridComplete"),
                    $.isFunction(e.p.gridComplete) && e.p.gridComplete.call(e),
                    $(e).triggerHandler("jqGridAfterGridComplete")
                }, V = function() {
                    e.grid.hDiv.loading = !0,
                    e.p.hiddengrid || $(e).jqGrid("progressBar", {
                        method: "show",
                        loadtype: e.p.loadui,
                        htmlcontent: $.jgrid.getRegional(e, "defaults.loadtext", e.p.loadtext)
                    })
                }, W = function() {
                    e.grid.hDiv.loading = !1,
                    $(e).jqGrid("progressBar", {
                        method: "hide",
                        loadtype: e.p.loadui
                    })
                }, X = function(a, b, c) {
                    var d = $(e).triggerHandler("jqGridBeforeProcessing", [a, b, c]);
                    return d = void 0 === d || "boolean" != typeof d || d,
                    $.isFunction(e.p.beforeProcessing) && !1 === e.p.beforeProcessing.call(e, a, b, c) && (d = !1),
                    d
                }, Y = function(a, b) {
                    $(e).triggerHandler("jqGridLoadComplete", [a]),
                    b && e.p.loadComplete.call(e, a),
                    $(e).triggerHandler("jqGridAfterLoadComplete", [a]),
                    e.p.datatype = "local",
                    e.p.datastr = null,
                    W()
                }, Z = function(a) {
                    if (!e.grid.hDiv.loading) {
                        var b, c, d = e.p.scroll && !1 === a, f = {}, g = e.p.prmNames;
                        j = 0,
                        e.p.page <= 0 && (e.p.page = Math.min(1, e.p.lastpage)),
                        null !== g.search && (f[g.search] = e.p.search),
                        null !== g.nd && (f[g.nd] = (new Date).getTime()),
                        null !== g.rows && (f[g.rows] = e.p.rowNum),
                        null !== g.page && (f[g.page] = e.p.page),
                        null !== g.sort && (f[g.sort] = e.p.sortname),
                        null !== g.order && (f[g.order] = e.p.sortorder),
                        null !== e.p.rowTotal && null !== g.totalrows && (f[g.totalrows] = e.p.rowTotal);
                        var h = $.isFunction(e.p.loadComplete)
                          , i = h ? e.p.loadComplete : null
                          , k = 0;
                        if (a = a || 1,
                        a > 1 ? null !== g.npage ? (f[g.npage] = a,
                        k = a - 1,
                        a = 1) : i = function(b) {
                            e.p.page++,
                            e.grid.hDiv.loading = !1,
                            h && e.p.loadComplete.call(e, b),
                            Z(a - 1)
                        }
                        : null !== g.npage && delete e.p.postData[g.npage],
                        e.p.grouping) {
                            $(e).jqGrid("groupingSetup");
                            var l, m = e.p.groupingView, n = "";
                            for (l = 0; l < m.groupField.length; l++) {
                                var o = m.groupField[l];
                                $.each(e.p.colModel, function(a, b) {
                                    b.name === o && b.index && (o = b.index)
                                }),
                                n += o + " " + m.groupOrder[l] + ", "
                            }
                            f[g.sort] = n + f[g.sort]
                        }
                        $.extend(e.p.postData, f);
                        var p = e.p.scroll ? e.rows.length - 1 : 1;
                        if ($.isFunction(e.p.datatype))
                            return void e.p.datatype.call(e, e.p.postData, "load_" + e.p.id, p, a, k);
                        var q = $(e).triggerHandler("jqGridBeforeRequest");
                        if (!1 === q || "stop" === q)
                            return;
                        if ($.isFunction(e.p.beforeRequest) && (!1 === (q = e.p.beforeRequest.call(e)) || "stop" === q))
                            return;
                        switch ($.isFunction(e.treeGrid_beforeRequest) && e.treeGrid_beforeRequest.call(e),
                        b = e.p.datatype.toLowerCase()) {
                        case "json":
                        case "jsonp":
                        case "xml":
                        case "script":
                            $.ajax($.extend({
                                url: e.p.url,
                                type: e.p.mtype,
                                dataType: b,
                                data: $.isFunction(e.p.serializeGridData) ? e.p.serializeGridData.call(e, e.p.postData) : e.p.postData,
                                success: function(c, f, g) {
                                    if (!X(c, f, g))
                                        return void W();
                                    "xml" === b ? R(c, p, a > 1, k) : S(c, p, a > 1, k),
                                    $(e).triggerHandler("jqGridLoadComplete", [c]),
                                    i && i.call(e, c),
                                    $(e).triggerHandler("jqGridAfterLoadComplete", [c]),
                                    d && e.grid.populateVisible(),
                                    e.p.treeGrid_bigData ? e.p.loadonce && (e.p.datatype = "local") : (e.p.loadonce || e.p.treeGrid) && (e.p.datatype = "local"),
                                    c = null,
                                    1 === a && W(),
                                    $.isFunction(e.treeGrid_afterLoadComplete) && e.treeGrid_afterLoadComplete.call(e)
                                },
                                error: function(b, c, d) {
                                    $(e).triggerHandler("jqGridLoadError", [b, c, d]),
                                    $.isFunction(e.p.loadError) && e.p.loadError.call(e, b, c, d),
                                    1 === a && W(),
                                    b = null
                                },
                                beforeSend: function(a, b) {
                                    var c = !0;
                                    if (c = $(e).triggerHandler("jqGridLoadBeforeSend", [a, b]),
                                    $.isFunction(e.p.loadBeforeSend) && (c = e.p.loadBeforeSend.call(e, a, b)),
                                    void 0 === c && (c = !0),
                                    !1 === c)
                                        return !1;
                                    V()
                                }
                            }, $.jgrid.ajaxOptions, e.p.ajaxGridOptions));
                            break;
                        case "xmlstring":
                            if (V(),
                            c = "string" != typeof e.p.datastr ? e.p.datastr : $.parseXML(e.p.datastr),
                            !X(c, 200, null))
                                return void W();
                            R(c),
                            Y(c, h);
                            break;
                        case "jsonstring":
                            if (V(),
                            c = "string" == typeof e.p.datastr ? $.jgrid.parse(e.p.datastr) : e.p.datastr,
                            !X(c, 200, null))
                                return void W();
                            S(c),
                            Y(c, h);
                            break;
                        case "local":
                        case "clientside":
                            V(),
                            e.p.datatype = "local",
                            e.p._ald = !0;
                            var r = T(!1);
                            if (!X(r, 200, null))
                                return void W();
                            S(r, p, a > 1, k),
                            $(e).triggerHandler("jqGridLoadComplete", [r]),
                            i && i.call(e, r),
                            $(e).triggerHandler("jqGridAfterLoadComplete", [r]),
                            d && e.grid.populateVisible(),
                            W(),
                            e.p._ald = !1
                        }
                        e.p._sort = !1
                    }
                }, _ = function(a) {
                    $("#cb_" + $.jgrid.jqID(e.p.id), e.grid.hDiv)[e.p.useProp ? "prop" : "attr"]("checked", a),
                    (e.p.frozenColumns ? e.p.id + "_frozen" : "") && $("#cb_" + $.jgrid.jqID(e.p.id), e.grid.fhDiv)[e.p.useProp ? "prop" : "attr"]("checked", a)
                }, aa = function(a, b) {
                    var c, d, f, g, h, j, k, l = "<td class='ui-pg-button " + o + "'><span class='ui-separator'></span></td>", p = "", r = "<table class='ui-pg-table ui-common-table ui-paging-pager'><tbody><tr>", t = "", u = function(a, b) {
                        var c;
                        return "stop" !== (c = $(e).triggerHandler("jqGridPaging", [a, b])) && ($.isFunction(e.p.onPaging) && (c = e.p.onPaging.call(e, a, b)),
                        "stop" !== c && (e.p.selrow = null,
                        e.p.multiselect && (e.p.preserveSelection || (e.p.selarrrow = []),
                        _(!1)),
                        e.p.savedRow = [],
                        !0))
                    };
                    if (a = a.substr(1),
                    b += "_" + a,
                    c = "pg_" + a,
                    d = a + "_left",
                    f = a + "_center",
                    g = a + "_right",
                    $("#" + $.jgrid.jqID(a)).append("<div id='" + c + "' class='ui-pager-control' role='group'><table " + m(n, "pagerTable", !1, "ui-pg-table ui-common-table ui-pager-table") + "><tbody><tr><td id='" + d + "' align='left'></td><td id='" + f + "' align='center' style='white-space:pre;'></td><td id='" + g + "' align='right'></td></tr></tbody></table></div>").attr("dir", "ltr"),
                    e.p.rowList.length > 0) {
                        t = '<td dir="' + i + '">',
                        t += "<select " + m(n, "pgSelectBox", !1, "ui-pg-selbox") + ' size="1" role="listbox" title="' + ($.jgrid.getRegional(e, "defaults.pgrecs", e.p.pgrecs) || "") + '">';
                        var v;
                        for (k = 0; k < e.p.rowList.length; k++)
                            v = e.p.rowList[k].toString().split(":"),
                            1 === v.length && (v[1] = v[0]),
                            t += '<option role="option" value="' + v[0] + '"' + (C(e.p.rowNum, 0) === C(v[0], 0) ? ' selected="selected"' : "") + ">" + v[1] + "</option>";
                        t += "</select></td>"
                    }
                    if ("rtl" === i && (r += t),
                    !0 === e.p.pginput && (p = "<td id='input" + b + "' dir='" + i + "'>" + $.jgrid.template($.jgrid.getRegional(e, "defaults.pgtext", e.p.pgtext) || "", "<input class='ui-pg-input' type='text' size='2' maxlength='7' value='0' role='textbox'/>", "<span id='sp_1_" + $.jgrid.jqID(a) + "'></span>") + "</td>"),
                    !0 === e.p.pgbuttons) {
                        var w = ["first" + b, "prev" + b, "next" + b, "last" + b]
                          , x = m(n, "pgButtonBox", !0, "ui-pg-button")
                          , y = [$.jgrid.getRegional(e, "defaults.pgfirst", e.p.pgfirst) || "", $.jgrid.getRegional(e, "defaults.pgprev", e.p.pgprev) || "", $.jgrid.getRegional(e, "defaults.pgnext", e.p.pgnext) || "", $.jgrid.getRegional(e, "defaults.pglast", e.p.pglast) || ""];
                        "rtl" === i && (w.reverse(),
                        y.reverse()),
                        r += "<td id='" + w[0] + "' class='" + x + "' title='" + y[0] + "'><span " + m(n, "icon_first", !1, s) + "></span></td>",
                        r += "<td id='" + w[1] + "' class='" + x + "'  title='" + y[1] + "'><span " + m(n, "icon_prev", !1, s) + "></span></td>",
                        r += "" !== p ? l + p + l : "",
                        r += "<td id='" + w[2] + "' class='" + x + "' title='" + y[2] + "'><span " + m(n, "icon_next", !1, s) + "></span></td>",
                        r += "<td id='" + w[3] + "' class='" + x + "' title='" + y[3] + "'><span " + m(n, "icon_end", !1, s) + "></span></td>"
                    } else
                        "" !== p && (r += p);
                    "ltr" === i && (r += t),
                    r += "</tr></tbody></table>",
                    !0 === e.p.viewrecords && $("td#" + a + "_" + e.p.recordpos, "#" + c).append("<div dir='" + i + "' style='text-align:" + e.p.recordpos + "' class='ui-paging-info'></div>"),
                    $("td#" + a + "_" + e.p.pagerpos, "#" + c).append(r),
                    j = $("#gbox_" + $.jgrid.jqID(e.p.id)).css("font-size") || "11px",
                    $("#gbox_" + $.jgrid.jqID(e.p.id)).append("<div id='testpg' " + m(n, "entrieBox", !1, "ui-jqgrid") + " style='font-size:" + j + ";visibility:hidden;' ></div>"),
                    h = $(r).clone().appendTo("#testpg").width(),
                    $("#testpg").remove(),
                    h > 0 && ("" !== p && (h += 50),
                    $("td#" + a + "_" + e.p.pagerpos, "#" + c).width(h)),
                    e.p._nvtd = [],
                    e.p._nvtd[0] = h ? Math.floor((e.p.width - h) / 2) : Math.floor(e.p.width / 3),
                    e.p._nvtd[1] = 0,
                    r = null,
                    $(".ui-pg-selbox", "#" + c).on("change", function() {
                        return !!u("records", this) && (e.p.page = Math.round(e.p.rowNum * (e.p.page - 1) / this.value - .5) + 1,
                        e.p.rowNum = this.value,
                        e.p.pager && $(".ui-pg-selbox", e.p.pager).val(this.value),
                        e.p.toppager && $(".ui-pg-selbox", e.p.toppager).val(this.value),
                        Z(),
                        !1)
                    }),
                    !0 === e.p.pgbuttons && ($(".ui-pg-button", "#" + c).hover(function() {
                        $(this).hasClass(o) ? this.style.cursor = "default" : ($(this).addClass(q),
                        this.style.cursor = "pointer")
                    }, function() {
                        $(this).hasClass(o) || ($(this).removeClass(q),
                        this.style.cursor = "default")
                    }),
                    $("#first" + $.jgrid.jqID(b) + ", #prev" + $.jgrid.jqID(b) + ", #next" + $.jgrid.jqID(b) + ", #last" + $.jgrid.jqID(b)).click(function() {
                        if ($(this).hasClass(o))
                            return !1;
                        var a = C(e.p.page, 1)
                          , c = C(e.p.lastpage, 1)
                          , d = !1
                          , f = !0
                          , g = !0
                          , h = !0
                          , i = !0;
                        return 0 === c || 1 === c ? (f = !1,
                        g = !1,
                        h = !1,
                        i = !1) : c > 1 && a >= 1 ? 1 === a ? (f = !1,
                        g = !1) : a === c && (h = !1,
                        i = !1) : c > 1 && 0 === a && (h = !1,
                        i = !1,
                        a = c - 1),
                        !!u(this.id.split("_")[0], this) && (this.id === "first" + b && f && (e.p.page = 1,
                        d = !0),
                        this.id === "prev" + b && g && (e.p.page = a - 1,
                        d = !0),
                        this.id === "next" + b && h && (e.p.page = a + 1,
                        d = !0),
                        this.id === "last" + b && i && (e.p.page = c,
                        d = !0),
                        d && Z(),
                        !1)
                    })),
                    !0 === e.p.pginput && $("#" + c).on("keypress", "input.ui-pg-input", function(a) {
                        return 13 === (a.charCode || a.keyCode || 0) ? !!u("user", this) && ($(this).val(C($(this).val(), 1)),
                        e.p.page = $(this).val() > 0 ? $(this).val() : e.p.page,
                        Z(),
                        !1) : this
                    })
                }, ba = function(a, b, c) {
                    var d, f = e.p.colModel, g = e.p.frozenColumns ? b : e.grid.headers[a].el, h = "";
                    $("span.ui-grid-ico-sort", g).addClass(o),
                    $(g).attr("aria-selected", "false"),
                    d = f[a].index || f[a].name,
                    void 0 === c ? f[a].lso ? "asc" === f[a].lso ? (f[a].lso += "-desc",
                    h = "desc") : "desc" === f[a].lso ? (f[a].lso += "-asc",
                    h = "asc") : "asc-desc" !== f[a].lso && "desc-asc" !== f[a].lso || (f[a].lso = "") : f[a].lso = h = f[a].firstsortorder || "asc" : f[a].lso = h = c,
                    h ? ($("span.s-ico", g).show(),
                    $("span.ui-icon-" + h, g).removeClass(o),
                    $(g).attr("aria-selected", "true")) : e.p.viewsortcols[0] || $("span.s-ico", g).hide();
                    var i = v.indexOf(d);
                    -1 === i ? (v.push(d),
                    w.push(h)) : h ? w[i] = h : (w.splice(i, 1),
                    v.splice(i, 1)),
                    e.p.sortorder = "",
                    e.p.sortname = "";
                    for (var j = 0, k = v.length; j < k; j++)
                        j > 0 && (e.p.sortname += ", "),
                        e.p.sortname += v[j],
                        j !== k - 1 && (e.p.sortname += " " + w[j]);
                    e.p.sortorder = w[k - 1]
                }, ca = function(a, b, c, d, f) {
                    if (e.p.colModel[b].sortable && !(e.p.savedRow.length > 0)) {
                        if (c || (e.p.lastsort === b && "" !== e.p.sortname ? "asc" === e.p.sortorder ? e.p.sortorder = "desc" : "desc" === e.p.sortorder && (e.p.sortorder = "asc") : e.p.sortorder = e.p.colModel[b].firstsortorder || "asc",
                        e.p.page = 1),
                        e.p.multiSort)
                            ba(b, f, d);
                        else {
                            if (d) {
                                if (e.p.lastsort === b && e.p.sortorder === d && !c)
                                    return;
                                e.p.sortorder = d
                            }
                            var g, h = e.grid.headers[e.p.lastsort] ? e.grid.headers[e.p.lastsort].el : null, i = e.p.frozenColumns ? f : e.grid.headers[b].el, j = "single" === e.p.viewsortcols[1];
                            g = $(h).find("span.ui-grid-ico-sort"),
                            g.addClass(o),
                            j && $(g).css("display", "none"),
                            $(h).attr("aria-selected", "false"),
                            e.p.frozenColumns && (g = e.grid.fhDiv.find("span.ui-grid-ico-sort"),
                            g.addClass(o),
                            j && g.css("display", "none"),
                            e.grid.fhDiv.find("th").attr("aria-selected", "false")),
                            g = $(i).find("span.ui-icon-" + e.p.sortorder),
                            g.removeClass(o),
                            j && g.css("display", ""),
                            $(i).attr("aria-selected", "true"),
                            e.p.viewsortcols[0] || (e.p.lastsort !== b ? (e.p.frozenColumns && e.grid.fhDiv.find("span.s-ico").hide(),
                            $("span.s-ico", h).hide(),
                            $("span.s-ico", i).show()) : "" === e.p.sortname && $("span.s-ico", i).show()),
                            a = a.substring(5 + e.p.id.length + 1),
                            e.p.sortname = e.p.colModel[b].index || a
                        }
                        if ("stop" === $(e).triggerHandler("jqGridSortCol", [e.p.sortname, b, e.p.sortorder]))
                            return void (e.p.lastsort = b);
                        if ($.isFunction(e.p.onSortCol) && "stop" === e.p.onSortCol.call(e, e.p.sortname, b, e.p.sortorder))
                            return void (e.p.lastsort = b);
                        if (_(!1),
                        "local" === e.p.datatype ? e.p.deselectAfterSort && !e.p.preserveSelection && $(e).jqGrid("resetSelection") : (e.p.selrow = null,
                        e.p.multiselect && (e.p.preserveSelection || (e.p.selarrrow = [])),
                        e.p.savedRow = []),
                        e.p.scroll) {
                            var k = e.grid.bDiv.scrollLeft;
                            L.call(e, !0, !1),
                            e.grid.hDiv.scrollLeft = k
                        }
                        e.p.subGrid && "local" === e.p.datatype && $("td.sgexpanded", "#" + $.jgrid.jqID(e.p.id)).each(function() {
                            $(this).trigger("click")
                        }),
                        e.p._sort = !0,
                        Z(),
                        e.p.lastsort = b,
                        e.p.sortname !== a && b && (e.p.lastsort = b)
                    }
                }, da = function() {
                    var a, b, c, d, g, h = 0, i = $.jgrid.cell_width ? 0 : C(e.p.cellLayout, 0), j = 0, k = C(e.p.scrollOffset, 0), l = !1, m = 0;
                    $.each(e.p.colModel, function() {
                        if (void 0 === this.hidden && (this.hidden = !1),
                        e.p.grouping && e.p.autowidth) {
                            var a = $.inArray(this.name, e.p.groupingView.groupField);
                            a >= 0 && e.p.groupingView.groupColumnShow.length > a && (this.hidden = !e.p.groupingView.groupColumnShow[a])
                        }
                        this.widthOrg = b = C(this.width, 0),
                        !1 === this.hidden && (h += b + i,
                        this.fixed ? m += b + i : j++)
                    }),
                    isNaN(e.p.width) && (e.p.width = h + (!1 !== e.p.shrinkToFit || isNaN(e.p.height) ? 0 : k)),
                    f.width = parseInt(e.p.width, 10),
                    e.p.tblwidth = h,
                    !1 === e.p.shrinkToFit && !0 === e.p.forceFit && (e.p.forceFit = !1),
                    !0 === e.p.shrinkToFit && j > 0 && (c = f.width - i * j - m,
                    isNaN(e.p.height) || (c -= k,
                    l = !0),
                    h = 0,
                    $.each(e.p.colModel, function(d) {
                        !1 !== this.hidden || this.fixed || (b = Math.round(c * this.width / (e.p.tblwidth - i * j - m)),
                        this.width = b,
                        h += b,
                        a = d)
                    }),
                    d = 0,
                    g = 0 === Fa ? -1 : 0,
                    l ? f.width - m - (h + i * j) !== k && (d = f.width - m - (h + i * j) - k) : l || 0 === Math.abs(f.width - m - (h + i * j)) || (d = f.width - m - (h + i * j) - Fa),
                    e.p.colModel[a].width += d + g,
                    e.p.tblwidth = h + d + i * j + m,
                    e.p.tblwidth > e.p.width && (e.p.colModel[a].width -= e.p.tblwidth - parseInt(e.p.width, 10),
                    e.p.tblwidth = e.p.width))
                }, ea = function(a) {
                    var b, c = a, d = a;
                    for (b = a + 1; b < e.p.colModel.length; b++)
                        if (!0 !== e.p.colModel[b].hidden) {
                            d = b;
                            break
                        }
                    return d - c
                }, fa = function(a) {
                    var b = $(e.grid.headers[a].el)
                      , c = [b.position().left + b.outerWidth()];
                    return "rtl" === e.p.direction && (c[0] = e.p.width - c[0]),
                    c[0] -= e.grid.bDiv.scrollLeft,
                    c.push($(e.grid.hDiv).position().top),
                    c.push($(e.grid.bDiv).offset().top - $(e.grid.hDiv).offset().top + $(e.grid.bDiv).height()),
                    c
                }, ga = function(a) {
                    var b, c = e.grid.headers, d = $.jgrid.getCellIndex(a);
                    for (b = 0; b < c.length; b++)
                        if (a === c[b].el) {
                            d = b;
                            break
                        }
                    return d
                }, ha = function(a, b, c) {
                    var d, f, g = e.p.colModel, h = g.length, i = [], j = $.jgrid.getRegional(e, "colmenu"), k = '<ul id="col_menu" class="ui-search-menu  ui-col-menu modal-content" role="menu" tabindex="0" style="left:' + b + 'px;">';
                    for (d = 0; d < h; d++) {
                        var l = g[d].hidden ? "" : "checked"
                          , m = g[d].name
                          , n = e.p.colNames[d];
                        f = "cb" === m || "subgrid" === m || "rn" === m || g[d].hidedlg ? "style='display:none'" : "",
                        k += "<li " + f + ' class="ui-menu-item" role="presentation" draggable="true"><a class="g-menu-item" tabindex="0" role="menuitem" ><table class="ui-common-table" ><tr><td class="menu_icon" title="' + j.reorder + '"><span class="' + s + " " + t.icon_move + ' notclick"></span></td><td class="menu_icon"><input class="' + t.input_checkbox + '" type="checkbox" name="' + m + '" ' + l + '></td><td class="menu_text">' + n + "</td></tr></table></a></li>",
                        i.push(d)
                    }
                    k += "</ul>",
                    $(c).append(k),
                    $("#col_menu").addClass("ui-menu " + t.menu_widget),
                    $.jgrid.isElementInViewport($("#col_menu")[0]) || $("#col_menu").css("left", -parseInt($("#column_menu").innerWidth(), 10) + "px"),
                    $.fn.html5sortable() && $("#col_menu").html5sortable({
                        handle: "span",
                        forcePlaceholderSize: !0
                    }).on("sortupdate", function(a, b) {
                        for (i.splice(b.startindex, 1),
                        i.splice(b.endindex, 0, b.startindex),
                        $(e).jqGrid("destroyFrozenColumns"),
                        $(e).jqGrid("remapColumns", i, !0),
                        $(e).triggerHandler("jqGridColMenuColumnDone", [i, null, null]),
                        $.isFunction(e.p.colMenuColumnDone) && e.p.colMenuColumnDone.call(e, i, null, null),
                        $(e).jqGrid("setFrozenColumns"),
                        d = 0; d < h; d++)
                            i[d] = d
                    }),
                    $("#col_menu > li > a").on("click", function(a) {
                        var b, c;
                        $(a.target).hasClass("notclick") || ($(a.target).is(":input") ? b = $(a.target).is(":checked") : (b = !$("input", this).is(":checked"),
                        $("input", this).prop("checked", b)),
                        c = $("input", this).attr("name"),
                        $(e).triggerHandler("jqGridColMenuColumnDone", [i, c, b]),
                        $.isFunction(e.p.colMenuColumnDone) && e.p.colMenuColumnDone.call(e, i, c, b),
                        b ? ($(e).jqGrid("showCol", c),
                        $(this).parent().attr("draggable", "true")) : ($(e).jqGrid("hideCol", c),
                        $(this).parent().attr("draggable", "false")))
                    }).hover(function() {
                        $(this).addClass(q)
                    }, function() {
                        $(this).removeClass(q)
                    })
                }, ia = function(a, b, c, d) {
                    var f, g, h, i, j, k = e.p.colModel[a], l = "", m = "", n = "", o = "", p = "", r = "", s = ["eq", "ne", "lt", "le", "gt", "ge", "nu", "nn", "in", "ni"], u = ["eq", "ne", "bw", "bn", "ew", "en", "cn", "nc", "nu", "nn", "in", "ni"], v = $.jgrid.getRegional(e, "search"), w = $.jgrid.styleUI[e.p.styleUI || "jQueryUI"].common;
                    if (k) {
                        f = !(!e.p.colFilters || !e.p.colFilters[k.name]) && e.p.colFilters[k.name],
                        f && !$.isEmptyObject(f) && (l = f.oper1,
                        m = f.value1,
                        n = f.rule,
                        o = f.oper2,
                        p = f.value2),
                        k.searchoptions || (k.searchoptions = {}),
                        g = k.searchoptions.sopt ? k.searchoptions.sopt : "text" === k.sorttype ? u : s,
                        h = k.searchoptions.groupOps ? k.searchoptions.groupOps : v.groupOps,
                        j = $("<form></form>");
                        var x = "<div>" + $.jgrid.getRegional(e, "colmenu.searchTitle") + "</div>";
                        x += '<div><select size="1" id="oper1" class="' + t.filter_select + '">',
                        $.each(v.odata, function(a, b) {
                            i = b.oper === l ? 'selected="selected"' : "",
                            -1 !== $.inArray(b.oper, g) && (r += '<option value="' + b.oper + '" ' + i + ">" + b.text + "</option>")
                        }),
                        x += r,
                        x += "</select></div>",
                        j.append(x);
                        var y = "";
                        k.searchoptions.defaultValue && (y = $.isFunction(k.searchoptions.defaultValue) ? k.searchoptions.defaultValue.call(e) : k.searchoptions.defaultValue),
                        m && (y = m);
                        var z = $.extend(k.searchoptions, {
                            name: k.index || k.name,
                            id: "sval1_" + e.p.idPrefix + k.name,
                            oper: "search"
                        })
                          , A = $.jgrid.createEl.call(e, k.stype, z, y, !1, $.extend({}, $.jgrid.ajaxOptions, e.p.ajaxSelectOptions || {}));
                        $(A).addClass(t.filter_input),
                        x = $("<div></div>").append(A),
                        j.append(x),
                        x = '<div><select size="1" id="operand" class="' + t.filter_select + '">',
                        $.each(h, function(a, b) {
                            i = b.op === n ? 'selected="selected"' : "",
                            x += "<option value='" + b.op + "' " + i + ">" + b.text + "</option>"
                        }),
                        x += "</select></div>",
                        j.append(x),
                        r = "",
                        $.each(v.odata, function(a, b) {
                            i = b.oper === o ? 'selected="selected"' : "",
                            -1 !== $.inArray(b.oper, g) && (r += '<option value="' + b.oper + '" ' + i + ">" + b.text + "</option>")
                        }),
                        x = '<div><select size="1" id="oper2" class="' + t.filter_select + '">' + r + "</select></div>",
                        j.append(x),
                        y = p || "",
                        z = $.extend(k.searchoptions, {
                            name: k.index || k.name,
                            id: "sval2_" + e.p.idPrefix + k.name,
                            oper: "search"
                        }),
                        A = $.jgrid.createEl.call(e, k.stype, z, y, !1, $.extend({}, $.jgrid.ajaxOptions, e.p.ajaxSelectOptions || {})),
                        $(A).addClass(t.filter_input),
                        x = $("<div></div>").append(A),
                        j.append(x),
                        x = "<div>",
                        x += "<div class='search_buttons'><a tabindex='0' id='bs_reset' class='fm-button " + w.button + " ui-reset'>" + v.Reset + "</a></div>",
                        x += "<div class='search_buttons'><a tabindex='0' id='bs_search' class='fm-button " + w.button + " ui-search'>" + v.Find + "</a></div>",
                        x += "</div>",
                        j.append(x),
                        j = $('<li class="ui-menu-item" role="presentation"></li>').append(j),
                        j = $('<ul id="search_menu" class="ui-search-menu modal-content" role="menu" tabindex="0" style="left:' + c + 'px;"></ul>').append(j),
                        $(d).append(j),
                        $("#search_menu").addClass("ui-menu " + t.menu_widget),
                        $.jgrid.isElementInViewport($("#search_menu")[0]) || $("#search_menu").css("left", -parseInt($("#column_menu").innerWidth(), 10) + "px"),
                        $("#bs_reset, #bs_search", "#search_menu").hover(function() {
                            $(this).addClass(q)
                        }, function() {
                            $(this).removeClass(q)
                        }),
                        $("#bs_reset", j).on("click", function(a) {
                            e.p.colFilters[k.name] = {},
                            e.p.postData.filters = ja(),
                            e.p.search = !1,
                            $(e).trigger("reloadGrid"),
                            $("#column_menu").remove()
                        }),
                        $("#bs_search", j).on("click", function(a) {
                            e.p.colFilters[k.name] = {
                                oper1: $("#oper1", "#search_menu").val(),
                                value1: $("#sval1_" + e.p.idPrefix + k.name, "#search_menu").val(),
                                rule: $("#operand", "#search_menu").val(),
                                oper2: $("#oper2", "#search_menu").val(),
                                value2: $("#sval2_" + e.p.idPrefix + k.name, "#search_menu").val()
                            },
                            e.p.postData.filters = ja(),
                            e.p.search = !0,
                            $(e).trigger("reloadGrid"),
                            $("#column_menu").remove()
                        })
                    }
                }, ja = function() {
                    var a = "AND"
                      , b = '{"groupOp":"' + a + '","rules":[], "groups" : ['
                      , c = 0;
                    for (var d in e.p.colFilters)
                        if (e.p.colFilters.hasOwnProperty(d)) {
                            var f = e.p.colFilters[d];
                            $.isEmptyObject(f) || (c > 0 && (b += ","),
                            b += '{"groupOp": "' + f.rule + '", "rules" : [',
                            b += '{"field":"' + d + '",',
                            b += '"op":"' + f.oper1 + '",',
                            f.value1 += "",
                            b += '"data":"' + f.value1.replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"}',
                            f.value2 && (b += ',{"field":"' + d + '",',
                            b += '"op":"' + f.oper2 + '",',
                            f.value2 += "",
                            b += '"data":"' + f.value2.replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"}'),
                            b += "]}",
                            c++)
                        }
                    return b += "]}"
                }, ka = function(a, b) {
                    var c = e.p.colModel[a]
                      , d = e.p.groupingView;
                    -1 !== b ? d.groupField.splice(b, 1) : d.groupField.push(c.name),
                    $(e).jqGrid("groupingGroupBy", d.groupField),
                    e.p.frozenColumns && ($(e).jqGrid("destroyFrozenColumns"),
                    $(e).jqGrid("setFrozenColumns"))
                }, la = function(a, b) {
                    var c, d = [], f = e.p.colModel.length, g = -1, h = e.p.colModel;
                    for (c = 0; c < f; c++)
                        h[c].frozen && (g = c),
                        d.push(c);
                    d.splice(a, 1),
                    d.splice(g + (b ? 1 : 0), 0, a),
                    h[a].frozen = b,
                    $(e).jqGrid("destroyFrozenColumns"),
                    $(e).jqGrid("remapColumns", d, !0),
                    $(e).jqGrid("setFrozenColumns")
                }, ma = function(a, b, c) {
                    var d = $(f.hDiv).height();
                    $(".ui-search-toolbar", f.hDiv)[0] && !isNaN($(".ui-search-toolbar", f.hDiv).height()) && (d -= $(".ui-search-toolbar", f.hDiv).height()),
                    $(f.cDiv).is(":hidden") || (d += $(f.cDiv).outerHeight()),
                    e.p.toolbar[1] && "bottom" !== e.p.toolbar[2] && null !== $(f.uDiv) && (d += $(f.uDiv).outerHeight()),
                    e.p.toppager && (d += $("#" + e.p.id + "_toppager").outerHeight()),
                    b = parseInt(b, 10),
                    c = parseInt(c, 10) + d;
                    var g, h, i = '<ul id="column_menu" role="menu" tabindex="0">', j = "", k = "</ul>", l = "", m = e.p.colModel[a], n = $.extend({
                        sorting: !0,
                        columns: !0,
                        filtering: !0,
                        seraching: !0,
                        grouping: !0,
                        freeze: !0
                    }, m.coloptions), o = $.jgrid.getRegional(e, "colmenu"), p = e.p.colNames[a], r = [], u = $.trim(m.name);
                    r.push(j),
                    n.sorting && (j = '<li class="ui-menu-item" role="presentation"><a class="g-menu-item" tabindex="0" role="menuitem" data-value="sortasc"><table class="ui-common-table"><tr><td class="menu_icon"><span class="' + s + " " + t.icon_sort_asc + '"></span></td><td class="menu_text">' + o.sortasc + "</td></tr></table></a></li>",
                    j += '<li class="ui-menu-item" role="presentation"><a class="g-menu-item" tabindex="0" role="menuitem" data-value="sortdesc"><table class="ui-common-table"><tr><td class="menu_icon"><span class="' + s + " " + t.icon_sort_desc + '"></span></td><td class="menu_text">' + o.sortdesc + "</td></tr></table></a></li>",
                    r.push(j)),
                    n.columns && (j = '<li class="ui-menu-item divider" role="separator"></li>',
                    j += '<li class="ui-menu-item" role="presentation"><a class="g-menu-item" tabindex="0" role="menuitem" data-value="columns"><table class="ui-common-table"><tr><td class="menu_icon"><span class="' + s + " " + t.icon_columns + '"></span></td><td class="menu_text">' + o.columns + "</td></tr></table></a></li>",
                    r.push(j)),
                    n.filtering && (j = '<li class="ui-menu-item divider" role="separator"></li>',
                    j += '<li class="ui-menu-item" role="presentation"><a class="g-menu-item" tabindex="0" role="menuitem" data-value="filtering"><table class="ui-common-table"><tr><td class="menu_icon"><span class="' + s + " " + t.icon_filter + '"></span></td><td class="menu_text">' + o.filter + " " + p + "</td></tr></table></a></li>",
                    r.push(j)),
                    n.grouping && (g = $.inArray(m.name, e.p.groupingView.groupField),
                    j = '<li class="ui-menu-item divider" role="separator"></li>',
                    j += '<li class="ui-menu-item" role="presentation"><a class="g-menu-item" tabindex="0" role="menuitem" data-value="grouping"><table class="ui-common-table"><tr><td class="menu_icon"><span class="' + s + " " + t.icon_group + '"></span></td><td class="menu_text">' + (-1 !== g ? o.ungrouping : o.grouping + " " + p) + "</td></tr></table></a></li>",
                    r.push(j)),
                    n.freeze && (h = !m.frozen || !e.p.frozenColumns,
                    j = '<li class="ui-menu-item divider" role="separator"></li>',
                    j += '<li class="ui-menu-item" role="presentation"><a class="g-menu-item" tabindex="0" role="menuitem" data-value="freeze"><table class="ui-common-table"><tr><td class="menu_icon"><span class="' + s + " " + t.icon_freeze + '"></span></td><td class="menu_text">' + (h ? o.freeze + " " + p : o.unfreeze) + "</td></tr></table></a></li>",
                    r.push(j));
                    for (var v in e.p.colMenuCustom)
                        if (e.p.colMenuCustom.hasOwnProperty(v)) {
                            var w = e.p.colMenuCustom[v]
                              , x = w.exclude.split(",");
                            x = $.map(x, function(a) {
                                return $.trim(a)
                            }),
                            (w.colname === u || "_all_" === w.colname && -1 === $.inArray(u, x)) && (l = '<li class="ui-menu-item divider" role="separator"></li>',
                            j = '<li class="ui-menu-item" role="presentation"><a class="g-menu-item" tabindex="0" role="menuitem" data-value="' + w.id + '"><table class="ui-common-table"><tr><td class="menu_icon"><span class="' + s + " " + w.icon + '"></span></td><td class="menu_text">' + w.title + "</td></tr></table></a></li>",
                            "last" === w.position ? (r.push(l),
                            r.push(j)) : "first" === w.position && (r.unshift(l),
                            r.unshift(j)))
                        }
                    if (r.unshift(i),
                    r.push(k),
                    $("#gbox_" + e.p.id).append(r.join("")),
                    $("#column_menu").addClass("ui-search-menu modal-content column-menu jqgrid-column-menu ui-menu " + t.menu_widget).css({
                        left: b,
                        top: c
                    }),
                    "ltr" === e.p.direction) {
                        var y = $("#column_menu").width() + 26;
                        $("#column_menu").css("left", b - y + "px")
                    }
                    $("#column_menu > li > a").hover(function() {
                        $("#col_menu").remove(),
                        $("#search_menu").remove();
                        var b, c;
                        "columns" === $(this).attr("data-value") && (b = $(this).parent().width() + 8,
                        c = $(this).parent().position().top - 5,
                        ha(c, b, $(this).parent())),
                        "filtering" === $(this).attr("data-value") && (b = $(this).parent().width() + 8,
                        c = $(this).parent().position().top - 5,
                        ia(a, c, b, $(this).parent())),
                        $(this).addClass(q)
                    }, function() {
                        $(this).removeClass(q)
                    }).click(function() {
                        var b = $(this).attr("data-value")
                          , c = e.grid.headers[a].el;
                        if ("sortasc" === b ? ca("jqgh_" + e.p.id + "_" + m.name, a, !0, "asc", c) : "sortdesc" === b ? ca("jqgh_" + e.p.id + "_" + m.name, a, !0, "desc", c) : "grouping" === b ? ka(a, g) : "freeze" === b && la(a, h),
                        -1 === b.indexOf("sort") && "grouping" !== b && "freeze" !== b || $(this).remove(),
                        e.p.colMenuCustom.hasOwnProperty(b)) {
                            var d = e.p.colMenuCustom[b];
                            $.isFunction(d.funcname) && (d.funcname.call(e, u),
                            d.closeOnRun && $(this).remove())
                        }
                    }),
                    parseFloat($("#column_menu").css("left")) < 0 && $("#column_menu").css("left", $(e).css("left"))
                };
                for ((e.p.colMenu || e.p.menubar) && $("body").on("click", function(a) {
                    if (!$(a.target).closest("#column_menu").length)
                        try {
                            $("#column_menu").remove()
                        } catch (a) {}
                    if (!$(a.target).closest(".ui-jqgrid-menubar").length)
                        try {
                            $("#" + e.p.id + "_menubar").hide()
                        } catch (a) {}
                }),
                this.p.id = this.id,
                -1 === $.inArray(e.p.multikey, A) && (e.p.multikey = !1),
                e.p.keyName = !1,
                k = 0; k < e.p.colModel.length; k++)
                    z = "string" == typeof e.p.colModel[k].template ? null != $.jgrid.cmTemplate && "object" == typeof $.jgrid.cmTemplate[e.p.colModel[k].template] ? $.jgrid.cmTemplate[e.p.colModel[k].template] : {} : e.p.colModel[k].template,
                    e.p.colModel[k] = $.extend(!0, {}, e.p.cmTemplate, z || {}, e.p.colModel[k]),
                    !1 === e.p.keyName && !0 === e.p.colModel[k].key && (e.p.keyName = e.p.colModel[k].name,
                    e.p.keyIndex = k);
                if (e.p.sortorder = e.p.sortorder.toLowerCase(),
                $.jgrid.cell_width = $.jgrid.cellWidth(),
                !0 === e.p.grouping && (e.p.scroll = !1,
                e.p.rownumbers = !1,
                e.p.treeGrid = !1,
                e.p.gridview = !0),
                !0 === this.p.treeGrid) {
                    try {
                        $(this).jqGrid("setTreeGrid")
                    } catch (a) {}
                    "local" !== e.p.datatype && (e.p.localReader = {
                        id: "_id_"
                    })
                }
                if (this.p.subGrid)
                    try {
                        $(e).jqGrid("setSubGrid")
                    } catch (a) {}
                this.p.multiselect && (this.p.colNames.unshift("<input role='checkbox' id='cb_" + this.p.id + "' class='cbox' type='checkbox'/>"),
                this.p.colModel.unshift({
                    name: "cb",
                    width: $.jgrid.cell_width ? e.p.multiselectWidth + e.p.cellLayout : e.p.multiselectWidth,
                    sortable: !1,
                    resizable: !1,
                    hidedlg: !0,
                    search: !1,
                    align: "center",
                    fixed: !0,
                    frozen: !0,
                    classes: "jqgrid-multibox"
                })),
                this.p.rownumbers && (this.p.colNames.unshift(""),
                this.p.colModel.unshift({
                    name: "rn",
                    width: e.p.rownumWidth,
                    sortable: !1,
                    resizable: !1,
                    hidedlg: !0,
                    search: !1,
                    align: "center",
                    fixed: !0,
                    frozen: !0
                })),
                e.p.xmlReader = $.extend(!0, {
                    root: "rows",
                    row: "row",
                    page: "rows>page",
                    total: "rows>total",
                    records: "rows>records",
                    repeatitems: !0,
                    cell: "cell",
                    id: "[id]",
                    userdata: "userdata",
                    subgrid: {
                        root: "rows",
                        row: "row",
                        repeatitems: !0,
                        cell: "cell"
                    }
                }, e.p.xmlReader),
                e.p.jsonReader = $.extend(!0, {
                    root: "rows",
                    page: "page",
                    total: "total",
                    records: "records",
                    repeatitems: !0,
                    cell: "cell",
                    id: "id",
                    userdata: "userdata",
                    subgrid: {
                        root: "rows",
                        repeatitems: !0,
                        cell: "cell"
                    }
                }, e.p.jsonReader),
                e.p.localReader = $.extend(!0, {
                    root: "rows",
                    page: "page",
                    total: "total",
                    records: "records",
                    repeatitems: !1,
                    cell: "cell",
                    id: "id",
                    userdata: "userdata",
                    subgrid: {
                        root: "rows",
                        repeatitems: !0,
                        cell: "cell"
                    }
                }, e.p.localReader),
                e.p.scroll && (e.p.pgbuttons = !1,
                e.p.pginput = !1,
                e.p.rowList = []),
                e.p.data.length && (M(),
                N());
                var na, oa, pa, qa, ra, sa, ta, ua, va, wa = "<thead><tr class='ui-jqgrid-labels' role='row'>", xa = "", ya = "", za = "";
                if (!0 === e.p.shrinkToFit && !0 === e.p.forceFit)
                    for (k = e.p.colModel.length - 1; k >= 0; k--)
                        if (!e.p.colModel[k].hidden) {
                            e.p.colModel[k].resizable = !1;
                            break
                        }
                if ("horizontal" === e.p.viewsortcols[1] ? (ya = " ui-i-asc",
                za = " ui-i-desc") : "single" === e.p.viewsortcols[1] && (ya = " ui-single-sort-asc",
                za = " ui-single-sort-desc",
                xa = " style='display:none'",
                e.p.viewsortcols[0] = !1),
                na = u ? "class='ui-th-div-ie'" : "",
                ua = "<span class='s-ico' style='display:none'>",
                ua += "<span sort='asc'  class='ui-grid-ico-sort ui-icon-asc" + ya + " ui-sort-" + i + " " + o + " " + s + " " + m(n, "icon_asc", !0) + "'" + xa + "></span>",
                ua += "<span sort='desc' class='ui-grid-ico-sort ui-icon-desc" + za + " ui-sort-" + i + " " + o + " " + s + " " + m(n, "icon_desc", !0) + "'" + xa + "></span></span>",
                e.p.multiSort && e.p.sortname)
                    for (v = e.p.sortname.split(","),
                    k = 0; k < v.length; k++)
                        x = $.trim(v[k]).split(" "),
                        v[k] = $.trim(x[0]),
                        w[k] = x[1] ? $.trim(x[1]) : e.p.sortorder || "asc";
                for (k = 0; k < this.p.colNames.length; k++) {
                    var Aa = e.p.headertitles ? ' title="' + (e.p.colModel[k].tooltip ? e.p.colModel[k].tooltip : $.jgrid.stripHtml(e.p.colNames[k])) + '"' : "";
                    va = e.p.colModel[k],
                    va.hasOwnProperty("colmenu") || (va.colmenu = "rn" !== va.name && "cb" !== va.name && "subgrid" !== va.name),
                    wa += "<th id='" + e.p.id + "_" + va.name + "' role='columnheader' " + m(n, "headerBox", !1, "ui-th-column ui-th-" + i + ("cb" === va.name ? " jqgrid-multibox" : "")) + " " + Aa + ">",
                    oa = va.index || va.name,
                    wa += "<div class='ui-th-div' id='jqgh_" + e.p.id + "_" + va.name + "' " + na + ">" + e.p.colNames[k],
                    va.width ? va.width = parseInt(va.width, 10) : va.width = 150,
                    "boolean" != typeof va.title && (va.title = !0),
                    va.lso = "",
                    oa === e.p.sortname && (e.p.lastsort = k),
                    e.p.multiSort && -1 !== (x = $.inArray(oa, v)) && (va.lso = w[x]),
                    wa += ua,
                    e.p.colMenu && va.colmenu && (wa += "<a class='" + ("ltr" === e.p.direction ? "colmenu" : "colmenu-rtl") + "'><span class='colmenuspan " + s + " " + t.icon_menu + "'></span></a>"),
                    wa += "</div></th>"
                }
                if (wa += "</tr></thead>",
                ua = null,
                va = null,
                $(this).append(wa),
                $("thead tr:first th", this).hover(function() {
                    $(this).addClass(q)
                }, function() {
                    $(this).removeClass(q)
                }),
                this.p.multiselect) {
                    var Ba, Ca = [];
                    $("#cb_" + $.jgrid.jqID(e.p.id), this).on("click", function() {
                        e.p.preserveSelection || (e.p.selarrrow = []);
                        var a = !0 === e.p.frozenColumns ? e.p.id + "_frozen" : "";
                        this.checked ? ($(e.rows).each(function(b) {
                            b > 0 && ($(this).hasClass("ui-subgrid") || $(this).hasClass("jqgroup") || $(this).hasClass(o) || $(this).hasClass("jqfoot") || ($("#jqg_" + $.jgrid.jqID(e.p.id) + "_" + $.jgrid.jqID(this.id))[e.p.useProp ? "prop" : "attr"]("checked", !0),
                            $(this).addClass(p).attr("aria-selected", "true"),
                            e.p.preserveSelection ? -1 === e.p.selarrrow.indexOf(this.id) && e.p.selarrrow.push(this.id) : e.p.selarrrow.push(this.id),
                            e.p.selrow = this.id,
                            a && ($("#jqg_" + $.jgrid.jqID(e.p.id) + "_" + $.jgrid.jqID(this.id), e.grid.fbDiv)[e.p.useProp ? "prop" : "attr"]("checked", !0),
                            $("#" + $.jgrid.jqID(this.id), e.grid.fbDiv).addClass(p))))
                        }),
                        Ba = !0,
                        Ca = []) : ($(e.rows).each(function(b) {
                            if (b > 0 && !($(this).hasClass("ui-subgrid") || $(this).hasClass("jqgroup") || $(this).hasClass(o) || $(this).hasClass("jqfoot"))) {
                                if ($("#jqg_" + $.jgrid.jqID(e.p.id) + "_" + $.jgrid.jqID(this.id))[e.p.useProp ? "prop" : "attr"]("checked", !1),
                                $(this).removeClass(p).attr("aria-selected", "false"),
                                Ca.push(this.id),
                                e.p.preserveSelection) {
                                    var c = e.p.selarrrow.indexOf(this.id);
                                    c > -1 && e.p.selarrrow.splice(c, 1)
                                }
                                a && ($("#jqg_" + $.jgrid.jqID(e.p.id) + "_" + $.jgrid.jqID(this.id), e.grid.fbDiv)[e.p.useProp ? "prop" : "attr"]("checked", !1),
                                $("#" + $.jgrid.jqID(this.id), e.grid.fbDiv).removeClass(p))
                            }
                        }),
                        e.p.selrow = null,
                        Ba = !1),
                        $(e).triggerHandler("jqGridSelectAll", [Ba ? e.p.selarrrow : Ca, Ba]),
                        $.isFunction(e.p.onSelectAll) && e.p.onSelectAll.call(e, Ba ? e.p.selarrrow : Ca, Ba)
                    })
                }
                if (!0 === e.p.autowidth) {
                    var Da = $(y).parent().width();
                    va = $(window).width(),
                    e.p.width = va - Da > 3 ? Da : va
                }
                var Ea = ""
                  , Fa = -1 === e.p.styleUI.search("Bootstrap") || isNaN(e.p.height) ? 0 : 2;
                da(),
                $(y).css("width", f.width + "px").append("<div class='ui-jqgrid-resize-mark' id='rs_m" + e.p.id + "'>&#160;</div>"),
                e.p.scrollPopUp && $(y).append("<div " + m(n, "scrollBox", !1, "loading ui-scroll-popup") + " id='scroll_g" + e.p.id + "'></div>"),
                $(l).css("width", f.width + "px"),
                wa = $("thead:first", e).get(0),
                e.p.footerrow && (Ea += "<table role='presentation' style='width:" + e.p.tblwidth + "px' " + m(n, "footerTable", !1, "ui-jqgrid-ftable ui-common-table") + "><tbody><tr role='row' " + m(n, "footerBox", !1, "footrow footrow-" + i) + ">");
                var Ga = $("tr:first", wa)
                  , Ha = "<tr class='jqgfirstrow' role='row'>"
                  , Ia = 0;
                if (e.p.disableClick = !1,
                $("th", Ga).each(function(a) {
                    va = e.p.colModel[a],
                    pa = va.width,
                    void 0 === va.resizable && (va.resizable = !0),
                    va.resizable ? (qa = document.createElement("span"),
                    $(qa).html("&#160;").addClass("ui-jqgrid-resize ui-jqgrid-resize-" + i).css("cursor", "col-resize"),
                    $(this).addClass(e.p.resizeclass)) : qa = "",
                    $(this).css("width", pa + "px").prepend(qa),
                    qa = null;
                    var b = "";
                    va.hidden && ($(this).css("display", "none"),
                    b = "display:none;"),
                    Ha += "<td role='gridcell' style='height:0px;width:" + pa + "px;" + b + "'></td>",
                    f.headers[a] = {
                        width: pa,
                        el: this
                    },
                    "boolean" != typeof (xa = va.sortable) && (va.sortable = !0,
                    xa = !0);
                    var c = va.name;
                    "cb" !== c && "subgrid" !== c && "rn" !== c && e.p.viewsortcols[2] && $(">div", this).addClass("ui-jqgrid-sortable"),
                    xa && (e.p.multiSort ? e.p.viewsortcols[0] ? ($("div span.s-ico", this).show(),
                    va.lso && $("div span.ui-icon-" + va.lso, this).removeClass(o).css("display", "")) : va.lso && ($("div span.s-ico", this).show(),
                    $("div span.ui-icon-" + va.lso, this).removeClass(o).css("display", "")) : e.p.viewsortcols[0] ? ($("div span.s-ico", this).show(),
                    a === e.p.lastsort && $("div span.ui-icon-" + e.p.sortorder, this).removeClass(o).css("display", "")) : a === e.p.lastsort && "" !== e.p.sortname && ($("div span.s-ico", this).show(),
                    $("div span.ui-icon-" + e.p.sortorder, this).removeClass(o).css("display", ""))),
                    e.p.footerrow && (Ea += "<td role='gridcell' " + D(a, 0, "", null, "", !1) + ">&#160;</td>")
                }).mousedown(function(a) {
                    if (1 === $(a.target).closest("th>span.ui-jqgrid-resize").length) {
                        var b, c = ga(this);
                        return a.preventDefault(),
                        (Ia++,
                        setTimeout(function() {
                            Ia = 0
                        }, 400),
                        2 === Ia) ? (b = $(e).jqGrid("getCol", c, !1, "maxwidth"),
                        $(e).jqGrid("resizeColumn", c, b),
                        void (Ia = 0)) : (!0 === e.p.forceFit && (e.p.nv = ea(c)),
                        f.dragStart(c, a, fa(c)),
                        !1)
                    }
                }).click(function(a) {
                    if (e.p.disableClick)
                        return e.p.disableClick = !1,
                        !1;
                    var b, c, d = "th>div.ui-jqgrid-sortable";
                    e.p.viewsortcols[2] || (d = "th>div>span>span.ui-grid-ico-sort");
                    var f = $(a.target).closest(d);
                    if (1 === f.length) {
                        var g;
                        if (e.p.frozenColumns) {
                            var h = $(this)[0].id.substring(e.p.id.length + 1);
                            $(e.p.colModel).each(function(a) {
                                if (this.name === h)
                                    return g = a,
                                    !1
                            })
                        } else
                            g = ga(this);
                        if ($(a.target).hasClass("colmenuspan")) {
                            null != $("#column_menu")[0] && $("#column_menu").remove();
                            var i = $.jgrid.getCellIndex(a.target);
                            if (-1 === i)
                                return;
                            var j = $(this).position()
                              , k = j.left
                              , l = j.top;
                            return "ltr" === e.p.direction && (k += $(this).outerWidth()),
                            ma(i, k, l, f),
                            !0 === e.p.menubar && $("#" + e.p.id + "_menubar").hide(),
                            void a.stopPropagation()
                        }
                        return e.p.viewsortcols[2] || (b = !0,
                        c = f.attr("sort")),
                        null != g && ca($("div", this)[0].id, g, b, c, this),
                        !1
                    }
                }),
                va = null,
                e.p.sortable && $.fn.sortable)
                    try {
                        $(e).jqGrid("sortableColumns", Ga)
                    } catch (a) {}
                e.p.footerrow && (Ea += "</tr></tbody></table>"),
                Ha += "</tr>",
                ta = document.createElement("tbody"),
                this.appendChild(ta),
                $(this).addClass(m(n, "rowTable", !0, "ui-jqgrid-btable ui-common-table")).append(Ha),
                e.p.altRows && $(this).addClass(m(n, "stripedTable", !0, "")),
                Ha = null;
                var Ja = $("<table " + m(n, "headerTable", !1, "ui-jqgrid-htable ui-common-table") + " style='width:" + e.p.tblwidth + "px' role='presentation' aria-labelledby='gbox_" + this.id + "'></table>").append(wa)
                  , Ka = !(!e.p.caption || !0 !== e.p.hiddengrid)
                  , La = $("<div class='ui-jqgrid-hbox" + ("rtl" === i ? "-rtl" : "") + "'></div>");
                wa = null,
                f.hDiv = document.createElement("div"),
                f.hDiv.style.width = f.width - Fa + "px",
                f.hDiv.className = m(n, "headerDiv", !0, "ui-jqgrid-hdiv"),
                $(f.hDiv).append(La),
                $(La).append(Ja),
                Ja = null,
                Ka && $(f.hDiv).hide(),
                e.p.pager && ("string" == typeof e.p.pager ? "#" !== e.p.pager.substr(0, 1) && (e.p.pager = "#" + e.p.pager) : e.p.pager = "#" + $(e.p.pager).attr("id"),
                $(e.p.pager).css({
                    width: f.width - Fa + "px"
                }).addClass(m(n, "pagerBox", !0, "ui-jqgrid-pager")).appendTo(y),
                Ka && $(e.p.pager).hide(),
                aa(e.p.pager, "")),
                !1 === e.p.cellEdit && !0 === e.p.hoverrows && $(e).on({
                    mouseover: function(a) {
                        sa = $(a.target).closest("tr.jqgrow"),
                        "ui-subgrid" !== $(sa).attr("class") && $(sa).addClass(q)
                    },
                    mouseout: function(a) {
                        sa = $(a.target).closest("tr.jqgrow"),
                        $(sa).removeClass(q)
                    }
                });
                var Ma, Na, Oa;
                $(e).before(f.hDiv).on({
                    click: function(a) {
                        if (ra = a.target,
                        sa = $(ra, e.rows).closest("tr.jqgrow"),
                        0 === $(sa).length || sa[0].className.indexOf(o) > -1 || ($(ra, e).closest("table.ui-jqgrid-btable").attr("id") || "").replace("_frozen", "") !== e.id)
                            return this;
                        var c = $(ra).filter(":enabled").hasClass("cbox")
                          , d = $(e).triggerHandler("jqGridBeforeSelectRow", [sa[0].id, a]);
                        if (d = !1 !== d && "stop" !== d,
                        $.isFunction(e.p.beforeSelectRow)) {
                            var f = e.p.beforeSelectRow.call(e, sa[0].id, a);
                            !1 !== f && "stop" !== f || (d = !1)
                        }
                        if ("A" !== ra.tagName && ("INPUT" !== ra.tagName && "TEXTAREA" !== ra.tagName && "OPTION" !== ra.tagName && "SELECT" !== ra.tagName || c))
                            if (Ma = sa[0].id,
                            ra = $(ra).closest("tr.jqgrow>td"),
                            ra.length > 0 && (Na = $.jgrid.getCellIndex(ra)),
                            !0 !== e.p.cellEdit) {
                                if (ra.length > 0 && (Oa = $(ra).closest("td,th").html(),
                                $(e).triggerHandler("jqGridCellSelect", [Ma, Na, Oa, a]),
                                $.isFunction(e.p.onCellSelect) && e.p.onCellSelect.call(e, Ma, Na, Oa, a)),
                                d)
                                    if (e.p.multimail && e.p.multiselect) {
                                        if (a.shiftKey) {
                                            if (c) {
                                                var g = $(e).jqGrid("getGridParam", "selrow")
                                                  , h = $(e).jqGrid("getInd", Ma)
                                                  , i = $(e).jqGrid("getInd", g)
                                                  , j = ""
                                                  , k = "";
                                                h > i ? (j = g,
                                                k = Ma) : (j = Ma,
                                                k = g);
                                                var l = !1
                                                  , m = !1
                                                  , n = !0;
                                                return $.inArray(Ma, e.p.selarrrow) > -1 && (n = !1),
                                                $.each($(this).getDataIDs(), function(a, b) {
                                                    return (m = b === j || m) && $(e).jqGrid("resetSelection", b),
                                                    b !== k
                                                }),
                                                n && $.each($(this).getDataIDs(), function(a, b) {
                                                    return (l = b === j || l) && $(e).jqGrid("setSelection", b, !1),
                                                    b !== k
                                                }),
                                                void (e.p.selrow = h > i ? k : j)
                                            }
                                            window.getSelection().removeAllRanges()
                                        }
                                        b(Ma, c, a, !1)
                                    } else
                                        e.p.multikey ? a[e.p.multikey] ? $(e).jqGrid("setSelection", Ma, !0, a) : e.p.multiselect && c && (c = $("#jqg_" + $.jgrid.jqID(e.p.id) + "_" + Ma).is(":checked"),
                                        $("#jqg_" + $.jgrid.jqID(e.p.id) + "_" + Ma)[e.p.useProp ? "prop" : "attr"]("checked", !c)) : b(Ma, c, a, !0)
                            } else if (e.p.multiselect && c && d)
                                $(e).jqGrid("setSelection", Ma, !0, a);
                            else if (ra.length > 0)
                                try {
                                    $(e).jqGrid("editCell", sa[0].rowIndex, Na, !0, a)
                                } catch (a) {}
                    },
                    reloadGrid: function(a, b) {
                        if (!0 === e.p.treeGrid && (e.p.datatype = e.p.treedatatype),
                        b = b || {},
                        b.current && e.grid.selectionPreserver(e),
                        "local" === e.p.datatype ? ($(e).jqGrid("resetSelection"),
                        e.p.data.length && (M(),
                        N())) : e.p.treeGrid || (e.p.selrow = null,
                        e.p.multiselect && (e.p.preserveSelection || (e.p.selarrrow = [],
                        _(!1))),
                        e.p.savedRow = []),
                        e.p.scroll && L.call(e, !0, !1),
                        b.page) {
                            var c = b.page;
                            c > e.p.lastpage && (c = e.p.lastpage),
                            c < 1 && (c = 1),
                            e.p.page = c,
                            e.grid.prevRowHeight ? e.grid.bDiv.scrollTop = (c - 1) * e.grid.prevRowHeight * e.p.rowNum : e.grid.bDiv.scrollTop = 0
                        }
                        return e.grid.prevRowHeight && e.p.scroll && void 0 === b.page ? (delete e.p.lastpage,
                        e.grid.populateVisible()) : e.grid.populate(),
                        !0 === e.p.inlineNav && $(e).jqGrid("showAddEditButtons"),
                        !1
                    },
                    dblclick: function(a) {
                        if (ra = a.target,
                        sa = $(ra, e.rows).closest("tr.jqgrow"),
                        0 !== $(sa).length) {
                            Ma = sa[0].rowIndex,
                            Na = $.jgrid.getCellIndex(ra);
                            var b = $(e).triggerHandler("jqGridDblClickRow", [$(sa).attr("id"), Ma, Na, a]);
                            return null != b ? b : $.isFunction(e.p.ondblClickRow) && null != (b = e.p.ondblClickRow.call(e, $(sa).attr("id"), Ma, Na, a)) ? b : void 0
                        }
                    },
                    contextmenu: function(a) {
                        if (ra = a.target,
                        sa = $(ra, e.rows).closest("tr.jqgrow"),
                        0 !== $(sa).length) {
                            e.p.multiselect || $(e).jqGrid("setSelection", sa[0].id, !0, a),
                            Ma = sa[0].rowIndex,
                            Na = $.jgrid.getCellIndex(ra);
                            var b = $(e).triggerHandler("jqGridRightClickRow", [$(sa).attr("id"), Ma, Na, a]);
                            return null != b ? b : $.isFunction(e.p.onRightClickRow) && null != (b = e.p.onRightClickRow.call(e, $(sa).attr("id"), Ma, Na, a)) ? b : void 0
                        }
                    }
                }),
                f.bDiv = document.createElement("div"),
                u && "auto" === String(e.p.height).toLowerCase() && (e.p.height = "100%"),
                $(f.bDiv).append($('<div style="position:relative;"></div>').append("<div></div>").append(this)).addClass("ui-jqgrid-bdiv").css({
                    height: e.p.height + (isNaN(e.p.height) ? "" : "px"),
                    width: f.width - Fa + "px"
                }).scroll(f.scrollGrid),
                $("table:first", f.bDiv).css({
                    width: e.p.tblwidth + "px"
                }),
                $.support.tbody || 2 === $("tbody", this).length && $("tbody:gt(0)", this).remove(),
                e.p.multikey && ($.jgrid.msie() ? $(f.bDiv).on("selectstart", function() {
                    return !1
                }) : $(f.bDiv).on("mousedown", function() {
                    return !1
                })),
                Ka && $(f.bDiv).hide();
                var Pa = s + " " + m(n, "icon_caption_open", !0)
                  , Qa = s + " " + m(n, "icon_caption_close", !0);
                f.cDiv = document.createElement("div");
                var Ra = !0 === e.p.hidegrid ? $("<a role='link' class='ui-jqgrid-titlebar-close HeaderButton " + r + "' title='" + ($.jgrid.getRegional(e, "defaults.showhide", e.p.showhide) || "") + "' />").hover(function() {
                    Ra.addClass(q)
                }, function() {
                    Ra.removeClass(q)
                }).append("<span class='ui-jqgrid-headlink " + Pa + "'></span>").css("rtl" === i ? "left" : "right", "0px") : "";
                if ($(f.cDiv).append(Ra).append("<span class='ui-jqgrid-title'>" + e.p.caption + "</span>").addClass("ui-jqgrid-titlebar ui-jqgrid-caption" + ("rtl" === i ? "-rtl" : "") + " " + m(n, "gridtitleBox", !0)),
                !0 === e.p.menubar) {
                    var Sa = '<ul id="' + e.p.id + '_menubar" class="ui-search-menu modal-content column-menu ui-menu jqgrid-caption-menu ' + t.menu_widget + '" role="menubar" tabindex="0"></ul>';
                    $("#gbox_" + e.p.id).append(Sa),
                    $(f.cDiv).append("<a role='link' class='ui-jqgrid-menubar menubar-" + ("rtl" === i ? "rtl" : "ltr") + "' style=''><span class='colmenuspan " + s + " " + t.icon_toolbar_menu + "'></span></a>"),
                    $(".ui-jqgrid-menubar", f.cDiv).hover(function() {
                        $(this).addClass(q)
                    }, function() {
                        $(this).removeClass(q)
                    }).on("click", function(a) {
                        var b = $(a.target).position();
                        $("#" + e.p.id + "_menubar").show(),
                        "rtl" === e.p.direction && $("#" + e.p.id + "_menubar").css({
                            left: b.left - $("#" + e.p.id + "_menubar").width() - 20
                        })
                    })
                }
                if ($(f.cDiv).insertBefore(f.hDiv),
                e.p.toolbar[0]) {
                    var Ta = m(n, "customtoolbarBox", !0, "ui-userdata");
                    f.uDiv = document.createElement("div"),
                    "top" === e.p.toolbar[1] ? $(f.uDiv).insertBefore(f.hDiv) : "bottom" === e.p.toolbar[1] && $(f.uDiv).insertAfter(f.hDiv),
                    "both" === e.p.toolbar[1] ? (f.ubDiv = document.createElement("div"),
                    $(f.uDiv).addClass(Ta + " ui-userdata-top").attr("id", "t_" + this.id).insertBefore(f.hDiv).width(f.width - Fa),
                    $(f.ubDiv).addClass(Ta + " ui-userdata-bottom").attr("id", "tb_" + this.id).insertAfter(f.hDiv).width(f.width - Fa),
                    Ka && $(f.ubDiv).hide()) : $(f.uDiv).width(f.width - Fa).addClass(Ta + " ui-userdata-top").attr("id", "t_" + this.id),
                    Ka && $(f.uDiv).hide()
                }
                if (e.p.toppager && (e.p.toppager = $.jgrid.jqID(e.p.id) + "_toppager",
                f.topDiv = $("<div id='" + e.p.toppager + "'></div>")[0],
                e.p.toppager = "#" + e.p.toppager,
                $(f.topDiv).addClass(m(n, "toppagerBox", !0, "ui-jqgrid-toppager")).width(f.width - Fa).insertBefore(f.hDiv),
                aa(e.p.toppager, "_t")),
                e.p.footerrow && (f.sDiv = $("<div class='ui-jqgrid-sdiv'></div>")[0],
                La = $("<div class='ui-jqgrid-hbox" + ("rtl" === i ? "-rtl" : "") + "'></div>"),
                $(f.sDiv).append(La).width(f.width - Fa).insertAfter(f.hDiv),
                $(La).append(Ea),
                f.footers = $(".ui-jqgrid-ftable", f.sDiv)[0].rows[0].cells,
                e.p.rownumbers && (f.footers[0].className = m(n, "rownumBox", !0, "jqgrid-rownum")),
                Ka && $(f.sDiv).hide()),
                La = null,
                e.p.caption) {
                    var Ua = e.p.datatype;
                    !0 === e.p.hidegrid && ($(".ui-jqgrid-titlebar-close", f.cDiv).click(function(a) {
                        var b, c = $.isFunction(e.p.onHeaderClick), d = ".ui-jqgrid-bdiv, .ui-jqgrid-hdiv, .ui-jqgrid-toppager, .ui-jqgrid-pager, .ui-jqgrid-sdiv", g = this;
                        return !0 === e.p.toolbar[0] && ("both" === e.p.toolbar[1] && (d += ", #" + $(f.ubDiv).attr("id")),
                        d += ", #" + $(f.uDiv).attr("id")),
                        b = $(d, "#gview_" + $.jgrid.jqID(e.p.id)).length,
                        "visible" === e.p.gridstate ? $(d, "#gbox_" + $.jgrid.jqID(e.p.id)).slideUp("fast", function() {
                            0 === --b && ($("span", g).removeClass(Pa).addClass(Qa),
                            e.p.gridstate = "hidden",
                            $("#gbox_" + $.jgrid.jqID(e.p.id)).hasClass("ui-resizable") && $(".ui-resizable-handle", "#gbox_" + $.jgrid.jqID(e.p.id)).hide(),
                            $(e).triggerHandler("jqGridHeaderClick", [e.p.gridstate, a]),
                            c && (Ka || e.p.onHeaderClick.call(e, e.p.gridstate, a)))
                        }) : "hidden" === e.p.gridstate && $(d, "#gbox_" + $.jgrid.jqID(e.p.id)).slideDown("fast", function() {
                            0 === --b && ($("span", g).removeClass(Qa).addClass(Pa),
                            Ka && (e.p.datatype = Ua,
                            Z(),
                            Ka = !1),
                            e.p.gridstate = "visible",
                            $("#gbox_" + $.jgrid.jqID(e.p.id)).hasClass("ui-resizable") && $(".ui-resizable-handle", "#gbox_" + $.jgrid.jqID(e.p.id)).show(),
                            $(e).triggerHandler("jqGridHeaderClick", [e.p.gridstate, a]),
                            c && (Ka || e.p.onHeaderClick.call(e, e.p.gridstate, a)))
                        }),
                        !1
                    }),
                    Ka && (e.p.datatype = "local",
                    $(".ui-jqgrid-titlebar-close", f.cDiv).trigger("click")))
                } else
                    $(f.cDiv).hide(),
                    e.p.toppager || $(f.hDiv).addClass(m(e.p.styleUI + ".common", "cornertop", !0));
                if ($(f.hDiv).after(f.bDiv).mousemove(function(a) {
                    if (f.resizing)
                        return f.dragMove(a),
                        !1
                }),
                $(".ui-jqgrid-labels", f.hDiv).on("selectstart", function() {
                    return !1
                }),
                $(document).on("mouseup.jqGrid" + e.p.id, function() {
                    return !f.resizing || (f.dragEnd(!0),
                    !1)
                }),
                "rtl" === e.p.direction && $(e).on("jqGridAfterGridComplete.setRTLPadding", function() {
                    var a = f.bDiv.offsetWidth - f.bDiv.clientWidth
                      , b = $("div:first", f.hDiv);
                    a > 0 && (a += 2),
                    b.hasClass("ui-jqgrid-hbox-rtl") && $("div:first", f.hDiv).css({
                        paddingLeft: a + "px"
                    }),
                    f.hDiv.scrollLeft = f.bDiv.scrollLeft
                }),
                e.p.autoResizing && $(e).on("jqGridAfterGridComplete.setAutoSizeColumns", function() {
                    $(e.p.colModel).each(function(a) {
                        this.autosize && this._maxsize && this._maxsize > 0 && ($(e).jqGrid("resizeColumn", a, this._maxsize),
                        this._maxsize = 0)
                    })
                }),
                e.formatCol = D,
                e.sortData = ca,
                e.updatepager = U,
                e.refreshIndex = N,
                e.setHeadCheckBox = _,
                e.constructTr = O,
                e.formatter = function(a, b, c, d, e) {
                    return F(a, b, c, d, e)
                }
                ,
                $.extend(f, {
                    populate: Z,
                    emptyRows: L,
                    beginReq: V,
                    endReq: W
                }),
                this.grid = f,
                e.addXmlData = function(a) {
                    R(a)
                }
                ,
                e.addJSONData = function(a) {
                    S(a)
                }
                ,
                e.addLocalData = function(a) {
                    return T(a)
                }
                ,
                e.treeGrid_beforeRequest = function() {
                    P()
                }
                ,
                e.treeGrid_afterLoadComplete = function() {
                    Q()
                }
                ,
                this.grid.cols = this.rows[0].cells,
                $.isFunction(e.p.onInitGrid) && e.p.onInitGrid.call(e),
                $(e).triggerHandler("jqGridInitGrid"),
                Z(),
                e.p.hiddengrid = !1,
                e.p.responsive) {
                    var Va = "onorientationchange"in window
                      , Wa = Va ? "orientationchange" : "resize";
                    $(window).on(Wa, function() {
                        $(e).jqGrid("resizeGrid")
                    })
                }
            }
        })
    }
    ,
    $.jgrid.extend({
        getGridParam: function(a, b) {
            var c, d = this[0];
            if (d && d.grid) {
                if (void 0 === b && "string" != typeof b && (b = "jqGrid"),
                c = d.p,
                "jqGrid" !== b)
                    try {
                        c = $(d).data(b)
                    } catch (a) {
                        c = d.p
                    }
                return a ? void 0 !== c[a] ? c[a] : null : c
            }
        },
        setGridParam: function(a, b) {
            return this.each(function() {
                if (null == b && (b = !1),
                this.grid && "object" == typeof a)
                    if (!0 === b) {
                        var c = $.extend({}, this.p, a);
                        this.p = c
                    } else
                        $.extend(!0, this.p, a)
            })
        },
        getGridRowById: function(a) {
            var b;
            return this.each(function() {
                try {
                    for (var c = this.rows.length; c--; )
                        if (a.toString() === this.rows[c].id) {
                            b = this.rows[c];
                            break
                        }
                } catch (c) {
                    b = $(this.grid.bDiv).find("#" + $.jgrid.jqID(a))
                }
            }),
            b
        },
        getDataIDs: function() {
            var a, b = [], c = 0, d = 0;
            return this.each(function() {
                if ((a = this.rows.length) && a > 0)
                    for (; c < a; )
                        $(this.rows[c]).hasClass("jqgrow") && (b[d] = this.rows[c].id,
                        d++),
                        c++
            }),
            b
        },
        setSelection: function(a, b, c) {
            return this.each(function() {
                function d(a) {
                    var b = $(l.grid.bDiv)[0].clientHeight
                      , c = $(l.grid.bDiv)[0].scrollTop
                      , d = $(l.rows[a]).position().top
                      , e = l.rows[a].clientHeight;
                    d + e >= b + c ? $(l.grid.bDiv)[0].scrollTop = d - (b + c) + e + c : d < b + c && d < c && ($(l.grid.bDiv)[0].scrollTop = d)
                }
                var e, f, g, h, i, j, k, l = this, m = $.jgrid.getMethod("getStyleUI"), n = m(l.p.styleUI + ".common", "highlight", !0), o = m(l.p.styleUI + ".common", "disabled", !0);
                void 0 !== a && (b = !1 !== b,
                !(f = $(l).jqGrid("getGridRowById", a)) || !f.className || f.className.indexOf(o) > -1 || (!0 === l.p.scrollrows && (g = $(l).jqGrid("getGridRowById", a).rowIndex) >= 0 && d(g),
                !0 === l.p.frozenColumns && (j = l.p.id + "_frozen"),
                l.p.multiselect ? (l.setHeadCheckBox(!1),
                l.p.selrow = f.id,
                h = $.inArray(l.p.selrow, l.p.selarrrow),
                -1 === h ? ("ui-subgrid" !== f.className && $(f).addClass(n).attr("aria-selected", "true"),
                e = !0,
                l.p.selarrrow.push(l.p.selrow)) : -1 !== h && "_sp_" === c ? ("ui-subgrid" !== f.className && $(f).addClass(n).attr("aria-selected", "true"),
                e = !0) : ("ui-subgrid" !== f.className && $(f).removeClass(n).attr("aria-selected", "false"),
                e = !1,
                l.p.selarrrow.splice(h, 1),
                i = l.p.selarrrow[0],
                l.p.selrow = void 0 === i ? null : i),
                $("#jqg_" + $.jgrid.jqID(l.p.id) + "_" + $.jgrid.jqID(f.id))[l.p.useProp ? "prop" : "attr"]("checked", e),
                j && (-1 === h ? $("#" + $.jgrid.jqID(a), "#" + $.jgrid.jqID(j)).addClass(n) : $("#" + $.jgrid.jqID(a), "#" + $.jgrid.jqID(j)).removeClass(n),
                $("#jqg_" + $.jgrid.jqID(l.p.id) + "_" + $.jgrid.jqID(a), "#" + $.jgrid.jqID(j))[l.p.useProp ? "prop" : "attr"]("checked", e)),
                b && ($(l).triggerHandler("jqGridSelectRow", [f.id, e, c]),
                l.p.onSelectRow && l.p.onSelectRow.call(l, f.id, e, c))) : "ui-subgrid" !== f.className && (l.p.selrow !== f.id ? (k = $(l).jqGrid("getGridRowById", l.p.selrow),
                k && $(k).removeClass(n).attr({
                    "aria-selected": "false",
                    tabindex: "-1"
                }),
                $(f).addClass(n).attr({
                    "aria-selected": "true",
                    tabindex: "0"
                }),
                j && ($("#" + $.jgrid.jqID(l.p.selrow), "#" + $.jgrid.jqID(j)).removeClass(n),
                $("#" + $.jgrid.jqID(a), "#" + $.jgrid.jqID(j)).addClass(n)),
                e = !0) : e = !1,
                l.p.selrow = f.id,
                b && ($(l).triggerHandler("jqGridSelectRow", [f.id, e, c]),
                l.p.onSelectRow && l.p.onSelectRow.call(l, f.id, e, c)))))
            })
        },
        resetSelection: function(a) {
            return this.each(function() {
                var b, c, d = this, e = $.jgrid.getMethod("getStyleUI"), f = e(d.p.styleUI + ".common", "highlight", !0), g = e(d.p.styleUI + ".common", "hover", !0);
                if (!0 === d.p.frozenColumns && (c = d.p.id + "_frozen"),
                void 0 !== a) {
                    if (b = a === d.p.selrow ? d.p.selrow : a,
                    $("#" + $.jgrid.jqID(d.p.id) + " tbody:first tr#" + $.jgrid.jqID(b)).removeClass(f).attr("aria-selected", "false"),
                    c && $("#" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(c)).removeClass(f),
                    d.p.multiselect) {
                        $("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(d.p.id))[d.p.useProp ? "prop" : "attr"]("checked", !1),
                        c && $("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(c))[d.p.useProp ? "prop" : "attr"]("checked", !1),
                        d.setHeadCheckBox(!1);
                        var h = $.inArray($.jgrid.jqID(b), d.p.selarrrow);
                        -1 !== h && d.p.selarrrow.splice(h, 1)
                    }
                    d.p.onUnSelectRow && d.p.onUnSelectRow.call(d, b),
                    b = null
                } else
                    d.p.multiselect ? ($(d.p.selarrrow).each(function(a, b) {
                        $($(d).jqGrid("getGridRowById", b)).removeClass(f).attr("aria-selected", "false"),
                        $("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(b))[d.p.useProp ? "prop" : "attr"]("checked", !1),
                        c && ($("#" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(c)).removeClass(f),
                        $("#jqg_" + $.jgrid.jqID(d.p.id) + "_" + $.jgrid.jqID(b), "#" + $.jgrid.jqID(c))[d.p.useProp ? "prop" : "attr"]("checked", !1)),
                        d.p.onUnSelectRow && d.p.onUnSelectRow.call(d, b)
                    }),
                    d.setHeadCheckBox(!1),
                    d.p.selarrrow = [],
                    d.p.selrow = null) : d.p.selrow && ($("#" + $.jgrid.jqID(d.p.id) + " tbody:first tr#" + $.jgrid.jqID(d.p.selrow)).removeClass(f).attr("aria-selected", "false"),
                    c && $("#" + $.jgrid.jqID(d.p.selrow), "#" + $.jgrid.jqID(c)).removeClass(f),
                    d.p.onUnSelectRow && d.p.onUnSelectRow.call(d, d.p.selrow),
                    d.p.selrow = null);
                !0 === d.p.cellEdit && parseInt(d.p.iCol, 10) >= 0 && parseInt(d.p.iRow, 10) >= 0 && ($("td:eq(" + d.p.iCol + ")", d.rows[d.p.iRow]).removeClass("edit-cell " + f),
                $(d.rows[d.p.iRow]).removeClass("selected-row " + g))
            })
        },
        getRowData: function(a, b) {
            var c, d, e = {}, f = !1, g = 0;
            return this.each(function() {
                var h, i, j = this;
                if (null == a)
                    f = !0,
                    c = [],
                    d = j.rows.length;
                else {
                    if (!(i = $(j).jqGrid("getGridRowById", a)))
                        return e;
                    d = 1
                }
                for (b && !0 === b && j.p.data.length > 0 || (b = !1); g < d; )
                    f && (i = j.rows[g]),
                    $(i).hasClass("jqgrow") && (b ? e = j.p.data[j.p._index[i.id]] : $('td[role="gridcell"]', i).each(function(a) {
                        if ("cb" !== (h = j.p.colModel[a].name) && "subgrid" !== h && "rn" !== h)
                            if (!0 === j.p.treeGrid && h === j.p.ExpandColumn)
                                e[h] = $.jgrid.htmlDecode($("span:first", this).html());
                            else
                                try {
                                    e[h] = $.unformat.call(j, this, {
                                        rowId: i.id,
                                        colModel: j.p.colModel[a]
                                    }, a)
                                } catch (a) {
                                    e[h] = $.jgrid.htmlDecode($(this).html())
                                }
                    }),
                    f && (c.push(e),
                    e = {})),
                    g++
            }),
            c || e
        },
        delRowData: function(a) {
            var b, c, d, e = !1;
            return this.each(function() {
                var f = this;
                if (!(b = $(f).jqGrid("getGridRowById", a)))
                    return !1;
                if (a = b.id,
                f.p.subGrid && (d = $(b).next(),
                d.hasClass("ui-subgrid") && d.remove()),
                $(b).remove(),
                f.p.records--,
                f.p.reccount--,
                f.updatepager(!0, !1),
                e = !0,
                f.p.multiselect && -1 !== (c = $.inArray(a, f.p.selarrrow)) && f.p.selarrrow.splice(c, 1),
                f.p.multiselect && f.p.selarrrow.length > 0 ? f.p.selrow = f.p.selarrrow[f.p.selarrrow.length - 1] : f.p.selrow === a && (f.p.selrow = null),
                "local" === f.p.datatype) {
                    var g = $.jgrid.stripPref(f.p.idPrefix, a)
                      , h = f.p._index[g];
                    void 0 !== h && (f.p.data.splice(h, 1),
                    f.refreshIndex())
                }
            }),
            e
        },
        setRowData: function(a, b, c) {
            var d, e, f = !0;
            return this.each(function() {
                if (!this.grid)
                    return !1;
                var g, h, i = this, j = typeof c, k = {};
                if (!(h = $(this).jqGrid("getGridRowById", a)))
                    return !1;
                if (b)
                    try {
                        if ($(this.p.colModel).each(function(c) {
                            d = this.name;
                            var f = $.jgrid.getAccessor(b, d);
                            void 0 !== f && (k[d] = this.formatter && "string" == typeof this.formatter && "date" === this.formatter ? $.unformat.date.call(i, f, this) : f,
                            g = i.formatter(a, k[d], c, b, "edit"),
                            e = this.title ? {
                                title: $.jgrid.stripHtml(g)
                            } : {},
                            !0 === i.p.treeGrid && d === i.p.ExpandColumn ? $("td[role='gridcell']:eq(" + c + ") > span:first", h).html(g).attr(e) : $("td[role='gridcell']:eq(" + c + ")", h).html(g).attr(e))
                        }),
                        "local" === i.p.datatype) {
                            var l, m = $.jgrid.stripPref(i.p.idPrefix, a), n = i.p._index[m];
                            if (i.p.treeGrid)
                                for (l in i.p.treeReader)
                                    i.p.treeReader.hasOwnProperty(l) && delete k[i.p.treeReader[l]];
                            void 0 !== n && (i.p.data[n] = $.extend(!0, i.p.data[n], k)),
                            k = null
                        }
                    } catch (a) {
                        f = !1
                    }
                f && ("string" === j ? $(h).addClass(c) : null !== c && "object" === j && $(h).css(c),
                $(i).triggerHandler("jqGridAfterGridComplete"))
            }),
            f
        },
        addRowData: function(a, b, c, d) {
            -1 === $.inArray(c, ["first", "last", "before", "after"]) && (c = "last");
            var e, f, g, h, i, j, k, l, m, n, o, p, q, r = !1, s = "", t = "", u = "";
            return b && ($.isArray(b) ? (m = !0,
            n = a) : (b = [b],
            m = !1),
            this.each(function() {
                var v = this
                  , w = b.length;
                i = !0 === v.p.rownumbers ? 1 : 0,
                g = !0 === v.p.multiselect ? 1 : 0,
                h = !0 === v.p.subGrid ? 1 : 0,
                m || (void 0 !== a ? a = String(a) : (a = $.jgrid.randId(),
                !1 !== v.p.keyName && (n = v.p.keyName,
                void 0 !== b[0][n] && (a = b[0][n]))));
                var x = 0
                  , y = $(v).jqGrid("getStyleUI", v.p.styleUI + ".base", "rowBox", !0, "jqgrow ui-row-" + v.p.direction)
                  , z = {}
                  , A = !!$.isFunction(v.p.afterInsertRow);
                for (i && (s = $(v).jqGrid("getStyleUI", v.p.styleUI + ".base", "rownumBox", !1, "jqgrid-rownum")),
                g && (t = $(v).jqGrid("getStyleUI", v.p.styleUI + ".base", "multiBox", !1, "cbox")); x < w; ) {
                    if (o = b[x],
                    f = [],
                    m)
                        try {
                            a = o[n],
                            void 0 === a && (a = $.jgrid.randId())
                        } catch (b) {
                            a = $.jgrid.randId()
                        }
                    for (q = a,
                    a = v.p.idPrefix + a,
                    i && (u = v.formatCol(0, 1, "", null, a, !0),
                    f[f.length] = '<td role="gridcell" ' + s + " " + u + ">0</td>"),
                    g && (l = '<input role="checkbox" type="checkbox" id="jqg_' + v.p.id + "_" + a + '" ' + t + "/>",
                    u = v.formatCol(i, 1, "", null, a, !0),
                    f[f.length] = '<td role="gridcell" ' + u + ">" + l + "</td>"),
                    h && (f[f.length] = $(v).jqGrid("addSubGridCell", g + i, 1)),
                    k = g + h + i; k < v.p.colModel.length; k++)
                        p = v.p.colModel[k],
                        e = p.name,
                        z[e] = o[e],
                        l = v.formatter(a, $.jgrid.getAccessor(o, e), k, o),
                        u = v.formatCol(k, 1, l, o, a, z),
                        f[f.length] = '<td role="gridcell" ' + u + ">" + l + "</td>";
                    if (f.unshift(v.constructTr(a, !1, y, z, o)),
                    f[f.length] = "</tr>",
                    0 === v.rows.length)
                        $("table:first", v.grid.bDiv).append(f.join(""));
                    else
                        switch (c) {
                        case "last":
                            $(v.rows[v.rows.length - 1]).after(f.join("")),
                            j = v.rows.length - 1;
                            break;
                        case "first":
                            $(v.rows[0]).after(f.join("")),
                            j = 1;
                            break;
                        case "after":
                            j = $(v).jqGrid("getGridRowById", d),
                            j && ($(v.rows[j.rowIndex + 1]).hasClass("ui-subgrid") ? $(v.rows[j.rowIndex + 1]).after(f) : $(j).after(f.join("")),
                            j = j.rowIndex + 1);
                            break;
                        case "before":
                            j = $(v).jqGrid("getGridRowById", d),
                            j && ($(j).before(f.join("")),
                            j = j.rowIndex - 1)
                        }
                    !0 === v.p.subGrid && $(v).jqGrid("addSubGrid", g + i, j),
                    v.p.records++,
                    v.p.reccount++,
                    $(v).triggerHandler("jqGridAfterInsertRow", [a, o, o]),
                    A && v.p.afterInsertRow.call(v, a, o, o),
                    x++,
                    "local" === v.p.datatype && (z[v.p.localReader.id] = q,
                    v.p._index[q] = v.p.data.length,
                    v.p.data.push(z),
                    z = {})
                }
                v.updatepager(!0, !0),
                r = !0
            })),
            r
        },
        footerData: function(a, b, c) {
            function d(a) {
                var b;
                for (b in a)
                    if (a.hasOwnProperty(b))
                        return !1;
                return !0
            }
            var e, f, g = !1, h = {};
            return void 0 === a && (a = "get"),
            "boolean" != typeof c && (c = !0),
            a = a.toLowerCase(),
            this.each(function() {
                var i, j = this;
                return !(!j.grid || !j.p.footerrow) && (("set" !== a || !d(b)) && (g = !0,
                void $(this.p.colModel).each(function(d) {
                    e = this.name,
                    "set" === a ? void 0 !== b[e] && (i = c ? j.formatter("", b[e], d, b, "edit") : b[e],
                    f = this.title ? {
                        title: $.jgrid.stripHtml(i)
                    } : {},
                    $("tr.footrow td:eq(" + d + ")", j.grid.sDiv).html(i).attr(f),
                    g = !0) : "get" === a && (h[e] = $("tr.footrow td:eq(" + d + ")", j.grid.sDiv).html())
                })))
            }),
            "get" === a ? h : g
        },
        showHideCol: function(a, b) {
            return this.each(function() {
                var c, d = this, e = !1, f = $.jgrid.cell_width ? 0 : d.p.cellLayout;
                if (d.grid) {
                    "string" == typeof a && (a = [a]),
                    b = "none" !== b ? "" : "none";
                    var g = "" === b
                      , h = d.p.groupHeader && ($.isArray(d.p.groupHeader) || $.isFunction(d.p.groupHeader));
                    if (h && $(d).jqGrid("destroyGroupHeader", !1),
                    $(this.p.colModel).each(function(h) {
                        if (-1 !== $.inArray(this.name, a) && this.hidden === g) {
                            if (!0 === d.p.frozenColumns && !0 === this.frozen)
                                return !0;
                            $("tr[role=row]", d.grid.hDiv).each(function() {
                                $(this.cells[h]).css("display", b)
                            }),
                            $(d.rows).each(function() {
                                $(this).hasClass("jqgroup") || $(this.cells[h]).css("display", b)
                            }),
                            d.p.footerrow && $("tr.footrow td:eq(" + h + ")", d.grid.sDiv).css("display", b),
                            c = parseInt(this.width, 10),
                            "none" === b ? d.p.tblwidth -= c + f : d.p.tblwidth += c + f,
                            this.hidden = !g,
                            e = !0,
                            $(d).triggerHandler("jqGridShowHideCol", [g, this.name, h])
                        }
                    }),
                    !0 === e && (!0 !== d.p.shrinkToFit || isNaN(d.p.height) || (d.p.tblwidth += parseInt(d.p.scrollOffset, 10)),
                    $(d).jqGrid("setGridWidth", !0 === d.p.shrinkToFit ? d.p.tblwidth : d.p.width)),
                    h) {
                        var i = $.extend([], d.p.groupHeader);
                        d.p.groupHeader = null;
                        for (var j = 0; j < i.length; j++)
                            $(d).jqGrid("setGroupHeaders", i[j])
                    }
                }
            })
        },
        hideCol: function(a) {
            return this.each(function() {
                $(this).jqGrid("showHideCol", a, "none")
            })
        },
        showCol: function(a) {
            return this.each(function() {
                $(this).jqGrid("showHideCol", a, "")
            })
        },
        remapColumns: function(a, b, c) {
            function d(b) {
                var c;
                c = b.length ? $.makeArray(b) : $.extend({}, b),
                $.each(a, function(a) {
                    b[a] = c[this]
                })
            }
            function e(b, c) {
                $(">tr" + (c || ""), b).each(function() {
                    var b = this
                      , c = $.makeArray(b.cells);
                    $.each(a, function() {
                        var a = c[this];
                        a && b.appendChild(a)
                    })
                })
            }
            var f = this.get(0);
            d(f.p.colModel),
            d(f.p.colNames),
            d(f.grid.headers),
            e($("thead:first", f.grid.hDiv), c && ":not(.ui-jqgrid-labels)"),
            b && e($("#" + $.jgrid.jqID(f.p.id) + " tbody:first"), ".jqgfirstrow, tr.jqgrow, tr.jqfoot"),
            f.p.footerrow && e($("tbody:first", f.grid.sDiv)),
            f.p.remapColumns && (f.p.remapColumns.length ? d(f.p.remapColumns) : f.p.remapColumns = $.makeArray(a)),
            f.p.lastsort = $.inArray(f.p.lastsort, a),
            f.p.treeGrid && (f.p.expColInd = $.inArray(f.p.expColInd, a)),
            $(f).triggerHandler("jqGridRemapColumns", [a, b, c])
        },
        setGridWidth: function(a, b) {
            return this.each(function() {
                if (this.grid) {
                    var c, d, e, f, g, h = this, i = 0, j = $.jgrid.cell_width ? 0 : h.p.cellLayout, k = 0, l = !1, m = h.p.scrollOffset, n = 0, o = -1 === h.p.styleUI.search("Bootstrap") || isNaN(h.p.height) ? 0 : 2;
                    if ("boolean" != typeof b && (b = h.p.shrinkToFit),
                    !isNaN(a)) {
                        if (a = parseInt(a, 10),
                        h.grid.width = h.p.width = a,
                        $("#gbox_" + $.jgrid.jqID(h.p.id)).css("width", a + "px"),
                        $("#gview_" + $.jgrid.jqID(h.p.id)).css("width", a + "px"),
                        $(h.grid.bDiv).css("width", a - o + "px"),
                        $(h.grid.hDiv).css("width", a - o + "px"),
                        h.p.pager && $(h.p.pager).css("width", a - o + "px"),
                        h.p.toppager && $(h.p.toppager).css("width", a - o + "px"),
                        !0 === h.p.toolbar[0] && ($(h.grid.uDiv).css("width", a - o + "px"),
                        "both" === h.p.toolbar[1] && $(h.grid.ubDiv).css("width", a - o + "px")),
                        h.p.footerrow && $(h.grid.sDiv).css("width", a - o + "px"),
                        d = h.p.groupHeader && ($.isArray(h.p.groupHeader) || $.isFunction(h.p.groupHeader)),
                        d && $(h).jqGrid("destroyGroupHeader", !1),
                        !1 === b && !0 === h.p.forceFit && (h.p.forceFit = !1),
                        !0 === b) {
                            if ($.each(h.p.colModel, function() {
                                !1 === this.hidden && (c = this.widthOrg,
                                i += c + j,
                                this.fixed ? n += c + j : k++)
                            }),
                            0 === k)
                                return;
                            h.p.tblwidth = i,
                            f = a - j * k - n,
                            isNaN(h.p.height) || ($(h.grid.bDiv)[0].clientHeight < $(h.grid.bDiv)[0].scrollHeight || 1 === h.rows.length || "scroll" === $(h.grid.bDiv).css("overflow-y")) && (l = !0,
                            f -= m),
                            i = 0;
                            var p = h.grid.cols.length > 0;
                            if ($.each(h.p.colModel, function(a) {
                                if (!1 === this.hidden && !this.fixed) {
                                    if (c = this.widthOrg,
                                    (c = Math.round(f * c / (h.p.tblwidth - j * k - n))) < 0)
                                        return;
                                    this.width = c,
                                    i += c,
                                    h.grid.headers[a].width = c,
                                    h.grid.headers[a].el.style.width = c + "px",
                                    h.p.footerrow && (h.grid.footers[a].style.width = c + "px"),
                                    p && (h.grid.cols[a].style.width = c + "px"),
                                    e = a
                                }
                            }),
                            !e)
                                return;
                            if (g = 0,
                            l ? a - n - (i + j * k) !== m && (g = a - n - (i + j * k) - m) : l || 0 === Math.abs(a - n - (i + j * k)) || (g = a - n - (i + j * k) - o),
                            h.p.colModel[e].width += g,
                            h.p.tblwidth = i + g + j * k + n,
                            h.p.tblwidth > a) {
                                var q = h.p.tblwidth - parseInt(a, 10);
                                h.p.tblwidth = a,
                                c = h.p.colModel[e].width = h.p.colModel[e].width - q
                            } else
                                c = h.p.colModel[e].width;
                            h.grid.headers[e].width = c,
                            h.grid.headers[e].el.style.width = c + "px",
                            p && (h.grid.cols[e].style.width = c + "px"),
                            h.p.footerrow && (h.grid.footers[e].style.width = c + "px")
                        }
                        if (h.p.tblwidth && ($("table:first", h.grid.bDiv).css("width", h.p.tblwidth + "px"),
                        $("table:first", h.grid.hDiv).css("width", h.p.tblwidth + "px"),
                        h.grid.hDiv.scrollLeft = h.grid.bDiv.scrollLeft,
                        h.p.footerrow && $("table:first", h.grid.sDiv).css("width", h.p.tblwidth + "px")),
                        d) {
                            var r = $.extend([], h.p.groupHeader);
                            h.p.groupHeader = null;
                            for (var s = 0; s < r.length; s++)
                                $(h).jqGrid("setGroupHeaders", r[s]);
                            h.grid.hDiv.scrollLeft = h.grid.bDiv.scrollLeft
                        }
                    }
                }
            })
        },
        setGridHeight: function(a) {
            return this.each(function() {
                var b = this;
                if (b.grid) {
                    var c = $(b.grid.bDiv);
                    c.css({
                        height: a + (isNaN(a) ? "" : "px")
                    }),
                    !0 === b.p.frozenColumns && $("#" + $.jgrid.jqID(b.p.id) + "_frozen").parent().height(c.height() - 16),
                    b.p.height = a,
                    b.p.scroll && b.grid.populateVisible()
                }
            })
        },
        setCaption: function(a) {
            return this.each(function() {
                var b = $(this).jqGrid("getStyleUI", this.p.styleUI + ".common", "cornertop", !0);
                this.p.caption = a,
                $(".ui-jqgrid-title, .ui-jqgrid-title-rtl", this.grid.cDiv).html(a),
                $(this.grid.cDiv).show(),
                $(this.grid.hDiv).removeClass(b)
            })
        },
        setLabel: function(a, b, c, d) {
            return this.each(function() {
                var e = this
                  , f = -1;
                if (e.grid && null != a && (isNaN(a) ? $(e.p.colModel).each(function(b) {
                    if (this.name === a)
                        return f = b,
                        !1
                }) : f = parseInt(a, 10),
                f >= 0)) {
                    var g = $("tr.ui-jqgrid-labels th:eq(" + f + ")", e.grid.hDiv);
                    if (b) {
                        var h = $(".s-ico", g);
                        $("[id^=jqgh_]", g).empty().html(b).append(h),
                        e.p.colNames[f] = b
                    }
                    c && ("string" == typeof c ? $(g).addClass(c) : $(g).css(c)),
                    "object" == typeof d && $(g).attr(d)
                }
            })
        },
        setSortIcon: function(a, b) {
            return this.each(function() {
                var c = this
                  , d = -1;
                if (c.grid && null != a && (isNaN(a) ? $(c.p.colModel).each(function(b) {
                    if (this.name === a)
                        return d = b,
                        !1
                }) : d = parseInt(a, 10),
                d >= 0)) {
                    var e = $("tr.ui-jqgrid-labels th:eq(" + d + ")", c.grid.hDiv);
                    "left" === b ? e.find(".s-ico").css("float", "left") : e.find(".s-ico").css("float", "none")
                }
            })
        },
        setCell: function(a, b, c, d, e, f) {
            return this.each(function() {
                var g, h, i = this, j = -1;
                if (i.grid && (isNaN(b) ? $(i.p.colModel).each(function(a) {
                    if (this.name === b)
                        return j = a,
                        !1
                }) : j = parseInt(b, 10),
                j >= 0)) {
                    var k = $(i).jqGrid("getGridRowById", a);
                    if (k) {
                        var l, m = 0, n = [];
                        try {
                            l = k.cells[j]
                        } catch (a) {}
                        if (l) {
                            if ("" !== c || !0 === f) {
                                if ("local" === i.p.datatype)
                                    n = $(i).jqGrid("getLocalRow", a);
                                else if (void 0 !== k.cells)
                                    for (; m < k.cells.length; )
                                        g = $.unformat.call(i, $(k.cells[m]), {
                                            rowId: k.id,
                                            colModel: i.p.colModel[m]
                                        }, m),
                                        n.push(g),
                                        m++;
                                if (g = i.formatter(a, c, j, n, "edit"),
                                h = i.p.colModel[j].title ? {
                                    title: $.jgrid.stripHtml(g)
                                } : {},
                                i.p.treeGrid && $(".tree-wrap", $(l)).length > 0 ? $("span", $(l)).html(g).attr(h) : $(l).html(g).attr(h),
                                "local" === i.p.datatype) {
                                    var o, p = i.p.colModel[j];
                                    c = p.formatter && "string" == typeof p.formatter && "date" === p.formatter ? $.unformat.date.call(i, c, p) : c,
                                    o = i.p._index[$.jgrid.stripPref(i.p.idPrefix, a)],
                                    void 0 !== o && (i.p.data[o][p.name] = c)
                                }
                            }
                            "string" == typeof d ? $(l).addClass(d) : d && $(l).css(d),
                            "object" == typeof e && $(l).attr(e)
                        }
                    }
                }
            })
        },
        getCell: function(a, b, c) {
            var d, e = !1;
            return void 0 === c && (c = !1),
            this.each(function() {
                var f, g, h = this, i = -1;
                if (h.grid && (f = b,
                isNaN(b) ? $(h.p.colModel).each(function(a) {
                    if (this.name === b)
                        return f = this.name,
                        i = a,
                        !1
                }) : i = parseInt(b, 10),
                i >= 0 && (g = $(h).jqGrid("getGridRowById", a))))
                    if (d = $("td:eq(" + i + ")", g),
                    c)
                        e = d;
                    else {
                        try {
                            e = $.unformat.call(h, d, {
                                rowId: g.id,
                                colModel: h.p.colModel[i]
                            }, i)
                        } catch (a) {
                            e = $.jgrid.htmlDecode(d.html())
                        }
                        h.p.treeGrid && e && h.p.ExpandColumn === f && (e = $("<div>" + e + "</div>").find("span:first").html())
                    }
            }),
            e
        },
        getCol: function(a, b, c) {
            var d, e, f, g, h = [], i = 0;
            b = "boolean" == typeof b && b,
            void 0 === c && (c = !1);
            var j = $.jgrid.getFont(this[0]);
            return this.each(function() {
                var k = this
                  , l = -1;
                if (k.grid && (isNaN(a) ? $(k.p.colModel).each(function(b) {
                    if (this.name === a)
                        return l = b,
                        !1
                }) : l = parseInt(a, 10),
                l >= 0)) {
                    var m = k.rows.length
                      , n = 0
                      , o = 0;
                    if (m && m > 0) {
                        for (; n < m; )
                            if ($(k.rows[n]).hasClass("jqgrow")) {
                                if ("maxwidth" === c) {
                                    void 0 === f && (f = 0),
                                    f = Math.max($.jgrid.getTextWidth(k.rows[n].cells[l].innerHTML, j), f);
                                    continue
                                }
                                try {
                                    d = $.unformat.call(k, $(k.rows[n].cells[l]), {
                                        rowId: k.rows[n].id,
                                        colModel: k.p.colModel[l]
                                    }, l)
                                } catch (a) {
                                    d = $.jgrid.htmlDecode(k.rows[n].cells[l].innerHTML)
                                }
                                c ? (g = parseFloat(d),
                                isNaN(g) || (i += g,
                                void 0 === f && (f = e = g),
                                e = Math.min(e, g),
                                f = Math.max(f, g),
                                o++)) : b ? h.push({
                                    id: k.rows[n].id,
                                    value: d
                                }) : h.push(d)
                            }
                        if (c)
                            switch (c.toLowerCase()) {
                            case "sum":
                                h = i;
                                break;
                            case "avg":
                                h = i / o;
                                break;
                            case "count":
                                h = m - 1;
                                break;
                            case "min":
                                h = e;
                                break;
                            case "max":
                                h = f;
                                break;
                            case "maxwidth":
                                h = f
                            }
                    }
                }
            }),
            h
        },
        clearGridData: function(a) {
            return this.each(function() {
                var b = this;
                if (b.grid) {
                    if ("boolean" != typeof a && (a = !1),
                    b.p.deepempty)
                        $("#" + $.jgrid.jqID(b.p.id) + " tbody:first tr:gt(0)").remove();
                    else {
                        var c = $("#" + $.jgrid.jqID(b.p.id) + " tbody:first tr:first")[0];
                        $("#" + $.jgrid.jqID(b.p.id) + " tbody:first").empty().append(c)
                    }
                    b.p.footerrow && a && $(".ui-jqgrid-ftable td", b.grid.sDiv).html("&#160;"),
                    b.p.selrow = null,
                    b.p.selarrrow = [],
                    b.p.savedRow = [],
                    b.p.records = 0,
                    b.p.page = 1,
                    b.p.lastpage = 0,
                    b.p.reccount = 0,
                    b.p.data = [],
                    b.p._index = {},
                    b.p.groupingView._locgr = !1,
                    b.updatepager(!0, !1)
                }
            })
        },
        getInd: function(a, b) {
            var c, d = !1;
            return this.each(function() {
                (c = $(this).jqGrid("getGridRowById", a)) && (d = !0 === b ? c : c.rowIndex)
            }),
            d
        },
        bindKeys: function(a) {
            var b = $.extend({
                onEnter: null,
                onSpace: null,
                onLeftKey: null,
                onRightKey: null,
                scrollingRows: !0
            }, a || {});
            return this.each(function() {
                var a = this;
                $("body").is("[role]") || $("body").attr("role", "application"),
                a.p.scrollrows = b.scrollingRows,
                $(a).on("keydown", function(c) {
                    var d, e, f, g = $(a).find("tr[tabindex=0]")[0], h = a.p.treeReader.expanded_field;
                    if (g) {
                        var i = a.p.selrow;
                        if (f = a.p._index[$.jgrid.stripPref(a.p.idPrefix, g.id)],
                        37 === c.keyCode || 38 === c.keyCode || 39 === c.keyCode || 40 === c.keyCode) {
                            if (38 === c.keyCode) {
                                if (e = g.previousSibling,
                                d = "",
                                e && $(e).hasClass("jqgrow")) {
                                    if ($(e).is(":hidden")) {
                                        for (; e; )
                                            if (e = e.previousSibling,
                                            !$(e).is(":hidden") && $(e).hasClass("jqgrow")) {
                                                d = e.id;
                                                break
                                            }
                                    } else
                                        d = e.id;
                                    $(a).jqGrid("setSelection", d, !0, c)
                                }
                                $(a).triggerHandler("jqGridKeyUp", [d, i, c]),
                                $.isFunction(b.onUpKey) && b.onUpKey.call(a, d, i, c),
                                c.preventDefault()
                            }
                            if (40 === c.keyCode) {
                                if (e = g.nextSibling,
                                d = "",
                                e && $(e).hasClass("jqgrow")) {
                                    if ($(e).is(":hidden")) {
                                        for (; e; )
                                            if (e = e.nextSibling,
                                            !$(e).is(":hidden") && $(e).hasClass("jqgrow")) {
                                                d = e.id;
                                                break
                                            }
                                    } else
                                        d = e.id;
                                    $(a).jqGrid("setSelection", d, !0, c)
                                }
                                $(a).triggerHandler("jqGridKeyDown", [d, i, c]),
                                $.isFunction(b.onDownKey) && b.onDownKey.call(a, d, i, c),
                                c.preventDefault()
                            }
                            37 === c.keyCode && (a.p.treeGrid && a.p.data[f][h] && $(g).find("div.treeclick").trigger("click"),
                            $(a).triggerHandler("jqGridKeyLeft", [a.p.selrow, c]),
                            $.isFunction(b.onLeftKey) && b.onLeftKey.call(a, a.p.selrow, c)),
                            39 === c.keyCode && (a.p.treeGrid && !a.p.data[f][h] && $(g).find("div.treeclick").trigger("click"),
                            $(a).triggerHandler("jqGridKeyRight", [a.p.selrow, c]),
                            $.isFunction(b.onRightKey) && b.onRightKey.call(a, a.p.selrow, c))
                        } else
                            13 === c.keyCode ? ($(a).triggerHandler("jqGridKeyEnter", [a.p.selrow, c]),
                            $.isFunction(b.onEnter) && b.onEnter.call(a, a.p.selrow, c)) : 32 === c.keyCode && ($(a).triggerHandler("jqGridKeySpace", [a.p.selrow, c]),
                            $.isFunction(b.onSpace) && b.onSpace.call(a, a.p.selrow, c))
                    }
                }).on("click", function(b) {
                    $(b.target).is("input, textarea, select") || $(b.target, a.rows).closest("tr.jqgrow").focus()
                })
            })
        },
        unbindKeys: function() {
            return this.each(function() {
                $(this).off("keydown")
            })
        },
        getLocalRow: function(a) {
            var b, c = !1;
            return this.each(function() {
                void 0 !== a && (b = this.p._index[$.jgrid.stripPref(this.p.idPrefix, a)]) >= 0 && (c = this.p.data[b])
            }),
            c
        },
        progressBar: function(a) {
            return a = $.extend({
                htmlcontent: "",
                method: "hide",
                loadtype: "disable"
            }, a || {}),
            this.each(function() {
                var b, c, d = "show" === a.method, e = $("#load_" + $.jgrid.jqID(this.p.id)), f = $(window).scrollTop();
                switch ("" !== a.htmlcontent && e.html(a.htmlcontent),
                a.loadtype) {
                case "disable":
                    break;
                case "enable":
                    e.toggle(d);
                    break;
                case "block":
                    $("#lui_" + $.jgrid.jqID(this.p.id)).css(d ? {
                        top: 0,
                        left: 0,
                        height: $("#gbox_" + $.jgrid.jqID(this.p.id)).height(),
                        width: $("#gbox_" + $.jgrid.jqID(this.p.id)).width(),
                        "z-index": 1e4,
                        position: "absolute"
                    } : {}).toggle(d),
                    e.toggle(d)
                }
                e.is(":visible") && (b = e.offsetParent(),
                e.css("top", ""),
                e.offset().top < f && (c = Math.min(10 + f - b.offset().top, b.height() - e.height()),
                e.css("top", c + "px")))
            })
        },
        getColProp: function(a) {
            var b = {}
              , c = this[0];
            if (!c.grid)
                return !1;
            var d, e = c.p.colModel;
            for (d = 0; d < e.length; d++)
                if (e[d].name === a) {
                    b = e[d];
                    break
                }
            return b
        },
        setColProp: function(a, b) {
            return this.each(function() {
                if (this.grid && $.isPlainObject(b)) {
                    var c, d = this.p.colModel;
                    for (c = 0; c < d.length; c++)
                        if (d[c].name === a) {
                            $.extend(!0, this.p.colModel[c], b);
                            break
                        }
                }
            })
        },
        sortGrid: function(a, b, c) {
            return this.each(function() {
                var d, e = this, f = -1, g = !1;
                if (e.grid) {
                    for (a || (a = e.p.sortname),
                    d = 0; d < e.p.colModel.length; d++)
                        if (e.p.colModel[d].index === a || e.p.colModel[d].name === a) {
                            f = d,
                            !0 === e.p.frozenColumns && !0 === e.p.colModel[d].frozen && (g = e.grid.fhDiv.find("#" + e.p.id + "_" + a));
                            break
                        }
                    if (-1 !== f) {
                        var h = e.p.colModel[f].sortable;
                        g || (g = e.grid.headers[f].el),
                        "boolean" != typeof h && (h = !0),
                        "boolean" != typeof b && (b = !1),
                        h && e.sortData("jqgh_" + e.p.id + "_" + a, f, b, c, g)
                    }
                }
            })
        },
        setGridState: function(a) {
            return this.each(function() {
                if (this.grid) {
                    var b = this
                      , c = $(this).jqGrid("getStyleUI", this.p.styleUI + ".base", "icon_caption_open", !0)
                      , d = $(this).jqGrid("getStyleUI", this.p.styleUI + ".base", "icon_caption_close", !0);
                    "hidden" === a ? ($(".ui-jqgrid-bdiv, .ui-jqgrid-hdiv", "#gview_" + $.jgrid.jqID(b.p.id)).slideUp("fast"),
                    b.p.pager && $(b.p.pager).slideUp("fast"),
                    b.p.toppager && $(b.p.toppager).slideUp("fast"),
                    !0 === b.p.toolbar[0] && ("both" === b.p.toolbar[1] && $(b.grid.ubDiv).slideUp("fast"),
                    $(b.grid.uDiv).slideUp("fast")),
                    b.p.footerrow && $(".ui-jqgrid-sdiv", "#gbox_" + $.jgrid.jqID(b.p.id)).slideUp("fast"),
                    $(".ui-jqgrid-headlink", b.grid.cDiv).removeClass(c).addClass(d),
                    b.p.gridstate = "hidden") : "visible" === a && ($(".ui-jqgrid-hdiv, .ui-jqgrid-bdiv", "#gview_" + $.jgrid.jqID(b.p.id)).slideDown("fast"),
                    b.p.pager && $(b.p.pager).slideDown("fast"),
                    b.p.toppager && $(b.p.toppager).slideDown("fast"),
                    !0 === b.p.toolbar[0] && ("both" === b.p.toolbar[1] && $(b.grid.ubDiv).slideDown("fast"),
                    $(b.grid.uDiv).slideDown("fast")),
                    b.p.footerrow && $(".ui-jqgrid-sdiv", "#gbox_" + $.jgrid.jqID(b.p.id)).slideDown("fast"),
                    $(".ui-jqgrid-headlink", b.grid.cDiv).removeClass(d).addClass(c),
                    b.p.gridstate = "visible")
                }
            })
        },
        setFrozenColumns: function() {
            return this.each(function() {
                if (this.grid) {
                    var a = this
                      , b = a.p.colModel
                      , c = 0
                      , d = b.length
                      , e = -1
                      , f = !1
                      , g = $(a).jqGrid("getStyleUI", a.p.styleUI + ".base", "headerDiv", !0, "ui-jqgrid-hdiv")
                      , h = $(a).jqGrid("getStyleUI", a.p.styleUI + ".common", "hover", !0)
                      , i = "border-box" === $("#gbox_" + $.jgrid.jqID(a.p.id)).css("box-sizing")
                      , j = i ? 1 : 0;
                    if (!0 !== a.p.subGrid && !0 !== a.p.treeGrid && !0 !== a.p.cellEdit && !a.p.scroll) {
                        for (; c < d && !0 === b[c].frozen; )
                            f = !0,
                            e = c,
                            c++;
                        if (e >= 0 && f) {
                            var k = a.p.caption ? $(a.grid.cDiv).outerHeight() : 0
                              , l = parseInt($(".ui-jqgrid-htable", "#gview_" + $.jgrid.jqID(a.p.id)).height(), 10)
                              , m = parseInt($(".ui-jqgrid-hdiv", "#gview_" + $.jgrid.jqID(a.p.id)).height(), 10);
                            a.p.toppager && (k += $(a.grid.topDiv).outerHeight()),
                            !0 === a.p.toolbar[0] && "bottom" !== a.p.toolbar[1] && (k += $(a.grid.uDiv).outerHeight()),
                            a.grid.fhDiv = $('<div style="position:absolute;' + ("rtl" === a.p.direction ? "right:0;" : "left:0;") + "top:" + k + "px;height:" + (m - j) + 'px;" class="frozen-div ' + g + '"></div>'),
                            a.grid.fbDiv = $('<div style="position:absolute;' + ("rtl" === a.p.direction ? "right:0;" : "left:0;") + "top:" + (parseInt(k, 10) + parseInt(m, 10) + 1 - j) + 'px;overflow-y:hidden" class="frozen-bdiv ui-jqgrid-bdiv"></div>'),
                            $("#gview_" + $.jgrid.jqID(a.p.id)).append(a.grid.fhDiv);
                            var n = $(".ui-jqgrid-htable", "#gview_" + $.jgrid.jqID(a.p.id)).clone(!0);
                            if (a.p.groupHeader) {
                                $("tr.jqg-first-row-header, tr.jqg-third-row-header", n).each(function() {
                                    $("th:gt(" + e + ")", this).remove()
                                });
                                var o, p, q = -1, r = -1;
                                $("tr.jqg-second-row-header th", n).each(function() {
                                    if (o = parseInt($(this).attr("colspan"), 10),
                                    p = parseInt($(this).attr("rowspan"), 10),
                                    p && (q++,
                                    r++),
                                    o && (q += o,
                                    r++),
                                    q === e)
                                        return r = e,
                                        !1
                                }),
                                q !== e && (r = e),
                                $("tr.jqg-second-row-header", n).each(function() {
                                    $("th:gt(" + r + ")", this).remove()
                                })
                            } else {
                                var s = [];
                                $(".ui-jqgrid-htable tr", "#gview_" + $.jgrid.jqID(a.p.id)).each(function(a, b) {
                                    s.push(parseInt($(this).height(), 10))
                                }),
                                $("tr", n).each(function() {
                                    $("th:gt(" + e + ")", this).remove()
                                }),
                                $("tr", n).each(function(a) {
                                    $(this).height(s[a])
                                })
                            }
                            if ($(n).width(1),
                            $.jgrid.msie() || $(n).css("height", "100%"),
                            $(a.grid.fhDiv).append(n).mousemove(function(b) {
                                if (a.grid.resizing)
                                    return a.grid.dragMove(b),
                                    !1
                            }),
                            a.p.footerrow) {
                                var t = $(".ui-jqgrid-bdiv", "#gview_" + $.jgrid.jqID(a.p.id)).height();
                                a.grid.fsDiv = $('<div style="position:absolute;left:0px;top:' + (parseInt(k, 10) + parseInt(l, 10) + parseInt(t, 10) + 1 - j) + 'px;" class="frozen-sdiv ui-jqgrid-sdiv"></div>'),
                                $("#gview_" + $.jgrid.jqID(a.p.id)).append(a.grid.fsDiv);
                                var u = $(".ui-jqgrid-ftable", "#gview_" + $.jgrid.jqID(a.p.id)).clone(!0);
                                $("tr", u).each(function() {
                                    $("td:gt(" + e + ")", this).remove()
                                }),
                                $(u).width(1),
                                $(a.grid.fsDiv).append(u)
                            }
                            $(a).on("jqGridResizeStop.setFrozenColumns", function(b, c, d) {
                                var e = i ? "outerWidth" : "width"
                                  , f = $(".ui-jqgrid-htable", a.grid.fhDiv)
                                  , g = $(".ui-jqgrid-btable", a.grid.fbDiv);
                                if ($("th:eq(" + d + ")", f)[e](c),
                                $("tr:first td:eq(" + d + ")", g)[e](c),
                                a.p.footerrow) {
                                    var h = $(".ui-jqgrid-ftable", a.grid.fsDiv);
                                    $("tr:first td:eq(" + d + ")", h)[e](c)
                                }
                            }),
                            $("#gview_" + $.jgrid.jqID(a.p.id)).append(a.grid.fbDiv),
                            $(a.grid.fbDiv).on("mousewheel DOMMouseScroll", function(b) {
                                var c = $(a.grid.bDiv).scrollTop();
                                b.originalEvent.wheelDelta > 0 || b.originalEvent.detail < 0 ? $(a.grid.bDiv).scrollTop(c - 25) : $(a.grid.bDiv).scrollTop(c + 25),
                                b.preventDefault()
                            }),
                            !0 === a.p.hoverrows && $("#" + $.jgrid.jqID(a.p.id)).off("mouseover mouseout"),
                            $(a).on("jqGridAfterGridComplete.setFrozenColumns", function() {
                                $("#" + $.jgrid.jqID(a.p.id) + "_frozen").remove(),
                                $(a.grid.fbDiv).height($(a.grid.bDiv)[0].clientHeight);
                                var b = [];
                                $("#" + $.jgrid.jqID(a.p.id) + " tr[role=row].jqgrow").each(function() {
                                    b.push($(this).outerHeight())
                                });
                                var c = $("#" + $.jgrid.jqID(a.p.id)).clone(!0);
                                $("tr[role=row]", c).each(function() {
                                    $("td[role=gridcell]:gt(" + e + ")", this).remove()
                                }),
                                $(c).width(1).attr("id", a.p.id + "_frozen"),
                                $(a.grid.fbDiv).append(c),
                                $("tr[role=row].jqgrow", c).each(function(a, c) {
                                    $(this).height(b[a])
                                }),
                                !0 === a.p.hoverrows && ($("tr.jqgrow", c).hover(function() {
                                    $(this).addClass(h),
                                    $("#" + $.jgrid.jqID(this.id), "#" + $.jgrid.jqID(a.p.id)).addClass(h)
                                }, function() {
                                    $(this).removeClass(h),
                                    $("#" + $.jgrid.jqID(this.id), "#" + $.jgrid.jqID(a.p.id)).removeClass(h)
                                }),
                                $("tr.jqgrow", "#" + $.jgrid.jqID(a.p.id)).hover(function() {
                                    $(this).addClass(h),
                                    $("#" + $.jgrid.jqID(this.id), "#" + $.jgrid.jqID(a.p.id) + "_frozen").addClass(h)
                                }, function() {
                                    $(this).removeClass(h),
                                    $("#" + $.jgrid.jqID(this.id), "#" + $.jgrid.jqID(a.p.id) + "_frozen").removeClass(h)
                                })),
                                c = null
                            }),
                            a.grid.hDiv.loading || $(a).triggerHandler("jqGridAfterGridComplete"),
                            a.p.frozenColumns = !0
                        }
                    }
                }
            })
        },
        destroyFrozenColumns: function() {
            return this.each(function() {
                if (this.grid && !0 === this.p.frozenColumns) {
                    var a = this
                      , b = $(a).jqGrid("getStyleUI", a.p.styleUI + ".common", "hover", !0);
                    if ($(a.grid.fhDiv).remove(),
                    $(a.grid.fbDiv).remove(),
                    a.grid.fhDiv = null,
                    a.grid.fbDiv = null,
                    a.p.footerrow && ($(a.grid.fsDiv).remove(),
                    a.grid.fsDiv = null),
                    $(this).off(".setFrozenColumns"),
                    !0 === a.p.hoverrows) {
                        var c;
                        $("#" + $.jgrid.jqID(a.p.id)).on({
                            mouseover: function(a) {
                                c = $(a.target).closest("tr.jqgrow"),
                                "ui-subgrid" !== $(c).attr("class") && $(c).addClass(b)
                            },
                            mouseout: function(a) {
                                c = $(a.target).closest("tr.jqgrow"),
                                $(c).removeClass(b)
                            }
                        })
                    }
                    this.p.frozenColumns = !1
                }
            })
        },
        resizeColumn: function(a, b, c) {
            return this.each(function() {
                var d, e, f = this.grid, g = this.p, h = g.colModel, i = h.length;
                if ("string" == typeof a) {
                    for (d = 0; d < i; d++)
                        if (h[d].name === a) {
                            a = d;
                            break
                        }
                } else
                    a = parseInt(a, 10);
                if (void 0 === c && (c = !1),
                (h[a].resizable || c) && (b = parseInt(b, 10),
                !("number" != typeof a || a < 0 || a > h.length - 1 || "number" != typeof b || b < g.minColWidth))) {
                    if (g.forceFit)
                        for (g.nv = 0,
                        d = a + 1; d < i; d++)
                            if (!0 !== h[d].hidden) {
                                g.nv = d - a;
                                break
                            }
                    if (f.resizing = {
                        idx: a
                    },
                    e = b - f.headers[a].width,
                    g.forceFit) {
                        if (f.headers[a + g.nv].width - e < g.minColWidth)
                            return;
                        f.headers[a + g.nv].newWidth = f.headers[a + g.nv].width - e
                    }
                    f.newWidth = g.tblwidth + e,
                    f.headers[a].newWidth = b,
                    f.dragEnd(!1)
                }
            })
        },
        getStyleUI: function(a, b, c, d) {
            var e = ""
              , f = "";
            try {
                var g = a.split(".");
                switch (c || (e = "class=",
                f = '"'),
                null == d && (d = ""),
                g.length) {
                case 1:
                    e += f + $.trim(d + " " + $.jgrid.styleUI[g[0]][b] + f);
                    break;
                case 2:
                    e += f + $.trim(d + " " + $.jgrid.styleUI[g[0]][g[1]][b] + f)
                }
            } catch (a) {
                e = ""
            }
            return e
        },
        resizeGrid: function(a) {
            return this.each(function() {
                var b = this;
                void 0 === a && (a = 500),
                setTimeout(function() {
                    try {
                        var a = $(window).width()
                          , c = $("#gbox_" + $.jgrid.jqID(b.p.id)).parent().width()
                          , d = b.p.width;
                        d = a - c > 3 ? c : a,
                        $("#" + $.jgrid.jqID(b.p.id)).jqGrid("setGridWidth", d)
                    } catch (a) {}
                }, a)
            })
        },
        colMenuAdd: function(a, b) {
            var c = this[0].p.styleUI
              , d = $.jgrid.styleUI[c].colmenu;
            return b = $.extend({
                title: "Item",
                icon: d.icon_new_item,
                funcname: null,
                position: "last",
                closeOnRun: !0,
                exclude: "",
                id: null
            }, b || {}),
            this.each(function() {
                b.colname = "all" === a ? "_all_" : a;
                var c = this;
                b.id = null === b.id ? $.jgrid.randId() : b.id,
                c.p.colMenuCustom[b.id] = b
            })
        },
        colMenuDelete: function(a) {
            return this.each(function() {
                this.p.colMenuCustom.hasOwnProperty(a) && delete this.p.colMenuCustom[a]
            })
        },
        menubarAdd: function(a) {
            var b, c, d = this[0].p.styleUI, e = $.jgrid.styleUI[d].common;
            return this.each(function() {
                var d = this;
                if ($.isArray(a))
                    for (var f = 0; f < a.length; f++) {
                        b = a[f],
                        b.id || (b.id = $.jgrid.randId());
                        var g = "";
                        b.icon && (g = '<span class="' + e.icon_base + " " + b.icon + '"></span>'),
                        b.position || (b.position = "last"),
                        b.closeoncall || (b.closeoncall = !0),
                        b.divider ? (c = '<li class="ui-menu-item divider" role="separator"></li>',
                        b.cick = null) : c = '<li class="ui-menu-item" role="presentation"><a id="' + b.id + '" class="g-menu-item" tabindex="0" role="menuitem" ><table class="ui-common-table"><tr><td class="menu_icon">' + g + '</td><td class="menu_text">' + b.title + "</td></tr></table></a></li>",
                        "last" === b.position ? $("#" + this.p.id + "_menubar").append(c) : $("#" + this.p.id + "_menubar").prepend(c)
                    }
                $("li a", "#" + this.p.id + "_menubar").each(function(b, c) {
                    $(a).each(function(a, b) {
                        if (b.id === c.id && $.isFunction(b.click))
                            return $(c).on("click", function(a) {
                                b.click.call(d, a)
                            }),
                            !1
                    }),
                    $(this).hover(function(a) {
                        $(this).addClass(e.hover),
                        a.stopPropagation()
                    }, function(a) {
                        $(this).removeClass(e.hover)
                    })
                })
            })
        },
        menubarDelete: function(a) {
            return this.each(function() {
                $("#" + a, "#" + this.p.id + "_menubar").remove()
            })
        }
    }),
    $.jgrid.extend({
        editCell: function(a, b, c, d) {
            return this.each(function() {
                var e, f, g, h, i = this, j = $(this).jqGrid("getStyleUI", i.p.styleUI + ".common", "highlight", !0), k = $(this).jqGrid("getStyleUI", i.p.styleUI + ".common", "hover", !0), l = $(this).jqGrid("getStyleUI", i.p.styleUI + ".celledit", "inputClass", !0);
                if (i.grid && !0 === i.p.cellEdit) {
                    if (b = parseInt(b, 10),
                    i.p.selrow = i.rows[a].id,
                    i.p.knv || $(i).jqGrid("GridNav"),
                    i.p.savedRow.length > 0) {
                        if (!0 === c && a == i.p.iRow && b == i.p.iCol)
                            return;
                        $(i).jqGrid("saveCell", i.p.savedRow[0].id, i.p.savedRow[0].ic)
                    } else
                        window.setTimeout(function() {
                            $("#" + $.jgrid.jqID(i.p.knv)).attr("tabindex", "-1").focus()
                        }, 1);
                    if (h = i.p.colModel[b],
                    "subgrid" !== (e = h.name) && "cb" !== e && "rn" !== e) {
                        try {
                            g = $(i.rows[a].cells[b])
                        } catch (c) {
                            g = $("td:eq(" + b + ")", i.rows[a])
                        }
                        if (parseInt(i.p.iCol, 10) >= 0 && parseInt(i.p.iRow, 10) >= 0 && void 0 !== i.p.iRowId) {
                            var m = $(i).jqGrid("getGridRowById", i.p.iRowId);
                            $(m).removeClass("selected-row " + k).find("td:eq(" + i.p.iCol + ")").removeClass("edit-cell " + j)
                        }
                        if (g.addClass("edit-cell " + j),
                        $(i.rows[a]).addClass("selected-row " + k),
                        !0 !== h.editable || !0 !== c || g.hasClass("not-editable-cell") || $.isFunction(i.p.isCellEditable) && !i.p.isCellEditable.call(i, e, a, b))
                            f = g.html().replace(/\&#160\;/gi, ""),
                            $(i).triggerHandler("jqGridCellSelect", [i.rows[a].id, b, f, d]),
                            $.isFunction(i.p.onCellSelect) && i.p.onCellSelect.call(i, i.rows[a].id, b, f, d);
                        else {
                            try {
                                f = $.unformat.call(i, g, {
                                    rowId: i.rows[a].id,
                                    colModel: h
                                }, b)
                            } catch (a) {
                                f = h.edittype && "textarea" === h.edittype ? g.text() : g.html()
                            }
                            if (i.p.autoencode && (f = $.jgrid.htmlDecode(f)),
                            h.edittype || (h.edittype = "text"),
                            i.p.savedRow.push({
                                id: a,
                                ic: b,
                                name: e,
                                v: f,
                                rowId: i.rows[a].id
                            }),
                            ("&nbsp;" === f || "&#160;" === f || 1 === f.length && 160 === f.charCodeAt(0)) && (f = ""),
                            $.isFunction(i.p.formatCell)) {
                                var n = i.p.formatCell.call(i, i.rows[a].id, e, f, a, b);
                                void 0 !== n && (f = n)
                            }
                            $(i).triggerHandler("jqGridBeforeEditCell", [i.rows[a].id, e, f, a, b]),
                            $.isFunction(i.p.beforeEditCell) && i.p.beforeEditCell.call(i, i.rows[a].id, e, f, a, b);
                            var o = $.extend({}, h.editoptions || {}, {
                                id: a + "_" + e,
                                name: e,
                                rowId: i.rows[a].id,
                                oper: "edit"
                            })
                              , p = $.jgrid.createEl.call(i, h.edittype, o, f, !0, $.extend({}, $.jgrid.ajaxOptions, i.p.ajaxSelectOptions || {}));
                            $.inArray(h.edittype, ["text", "textarea", "password", "select"]) > -1 && $(p).addClass(l),
                            g.html("").append(p).attr("tabindex", "0"),
                            $.jgrid.bindEv.call(i, p, o),
                            window.setTimeout(function() {
                                $(p).focus()
                            }, 1),
                            $("input, select, textarea", g).on("keydown", function(c) {
                                if (27 === c.keyCode && ($("input.hasDatepicker", g).length > 0 ? $(".ui-datepicker").is(":hidden") ? $(i).jqGrid("restoreCell", a, b) : $("input.hasDatepicker", g).datepicker("hide") : $(i).jqGrid("restoreCell", a, b)),
                                13 === c.keyCode && !c.shiftKey)
                                    return $(i).jqGrid("saveCell", a, b),
                                    !1;
                                if (9 === c.keyCode) {
                                    if (i.grid.hDiv.loading)
                                        return !1;
                                    if (c.shiftKey) {
                                        !$(i).jqGrid("prevCell", a, b, c) && i.p.editNextRowCell && a - 1 > 0 && i.rows[a - 1] && (a--,
                                        $(i).jqGrid("prevCell", a, i.p.colModel.length, c))
                                    } else {
                                        !$(i).jqGrid("nextCell", a, b, c) && i.p.editNextRowCell && i.rows[a + 1] && (a++,
                                        $(i).jqGrid("nextCell", a, 0, c))
                                    }
                                }
                                c.stopPropagation()
                            }),
                            $(i).triggerHandler("jqGridAfterEditCell", [i.rows[a].id, e, f, a, b]),
                            $.isFunction(i.p.afterEditCell) && i.p.afterEditCell.call(i, i.rows[a].id, e, f, a, b)
                        }
                        i.p.iCol = b,
                        i.p.iRow = a,
                        i.p.iRowId = i.rows[a].id
                    }
                }
            })
        },
        saveCell: function(a, b) {
            return this.each(function() {
                var c = this
                  , d = c.p.savedRow.length >= 1 ? 0 : null
                  , e = $.jgrid.getRegional(this, "errors")
                  , f = $.jgrid.getRegional(this, "edit");
                if (c.grid && !0 === c.p.cellEdit) {
                    if (null !== d) {
                        var g, h, i = $(c).jqGrid("getGridRowById", c.p.savedRow[0].rowId), j = $("td:eq(" + b + ")", i), k = c.p.colModel[b], l = k.name, m = $.jgrid.jqID(l), n = $(j).offset();
                        switch (k.edittype) {
                        case "select":
                            if (k.editoptions.multiple) {
                                var o = $("#" + a + "_" + m, i)
                                  , p = [];
                                g = $(o).val(),
                                g ? g.join(",") : g = "",
                                $("option:selected", o).each(function(a, b) {
                                    p[a] = $(b).text()
                                }),
                                h = p.join(",")
                            } else
                                g = $("#" + a + "_" + m + " option:selected", i).val(),
                                h = $("#" + a + "_" + m + " option:selected", i).text();
                            k.formatter && (h = g);
                            break;
                        case "checkbox":
                            var q = ["Yes", "No"];
                            k.editoptions && k.editoptions.value && (q = k.editoptions.value.split(":")),
                            g = $("#" + a + "_" + m, i).is(":checked") ? q[0] : q[1],
                            h = g;
                            break;
                        case "password":
                        case "text":
                        case "textarea":
                        case "button":
                            g = $("#" + a + "_" + m, i).val(),
                            h = g;
                            break;
                        case "custom":
                            try {
                                if (!k.editoptions || !$.isFunction(k.editoptions.custom_value))
                                    throw "e1";
                                if (void 0 === (g = k.editoptions.custom_value.call(c, $(".customelement", j), "get")))
                                    throw "e2";
                                h = g
                            } catch (a) {
                                "e1" === a ? $.jgrid.info_dialog(e.errcap, "function 'custom_value' " + f.msg.nodefined, f.bClose, {
                                    styleUI: c.p.styleUI
                                }) : "e2" === a ? $.jgrid.info_dialog(e.errcap, "function 'custom_value' " + f.msg.novalue, f.bClose, {
                                    styleUI: c.p.styleUI
                                }) : $.jgrid.info_dialog(e.errcap, a.message, f.bClose, {
                                    styleUI: c.p.styleUI
                                })
                            }
                        }
                        if (h !== c.p.savedRow[d].v) {
                            var r = $(c).triggerHandler("jqGridBeforeSaveCell", [c.p.savedRow[d].rowId, l, g, a, b]);
                            if (r && (g = r,
                            h = r),
                            $.isFunction(c.p.beforeSaveCell)) {
                                var s = c.p.beforeSaveCell.call(c, c.p.savedRow[d].rowId, l, g, a, b);
                                s && (g = s,
                                h = s)
                            }
                            var t = $.jgrid.checkValues.call(c, g, b)
                              , u = !1;
                            if (!0 === t[0]) {
                                var v = $(c).triggerHandler("jqGridBeforeSubmitCell", [c.p.savedRow[d].rowId, l, g, a, b]) || {};
                                $.isFunction(c.p.beforeSubmitCell) && ((v = c.p.beforeSubmitCell.call(c, c.p.savedRow[d].rowId, l, g, a, b)) || (v = {}));
                                var w = $(c).triggerHandler("jqGridOnSubmitCell", [c.p.savedRow[d].rowId, l, g, a, b]);
                                if (void 0 === w && (w = !0),
                                $.isFunction(c.p.onSubmitCell) && void 0 === (w = c.p.onSubmitCell(c.p.savedRow[d].rowId, l, g, a, b)) && (w = !0),
                                !1 === w)
                                    return;
                                if ($("input.hasDatepicker", j).length > 0 && $("input.hasDatepicker", j).datepicker("hide"),
                                "remote" === c.p.cellsubmit)
                                    if (c.p.cellurl) {
                                        var x = {};
                                        c.p.autoencode && (g = $.jgrid.htmlEncode(g)),
                                        k.editoptions && k.editoptions.NullIfEmpty && "" === g && (g = "null",
                                        u = !0),
                                        x[l] = g;
                                        var y = c.p.prmNames
                                          , z = y.id
                                          , A = y.oper;
                                        x[z] = $.jgrid.stripPref(c.p.idPrefix, c.p.savedRow[d].rowId),
                                        x[A] = y.editoper,
                                        x = $.extend(v, x),
                                        $(c).jqGrid("progressBar", {
                                            method: "show",
                                            loadtype: c.p.loadui,
                                            htmlcontent: $.jgrid.getRegional(c, "defaults.savetext")
                                        }),
                                        c.grid.hDiv.loading = !0,
                                        $.ajax($.extend({
                                            url: c.p.cellurl,
                                            data: $.isFunction(c.p.serializeCellData) ? c.p.serializeCellData.call(c, x, l) : x,
                                            type: "POST",
                                            complete: function(k, o) {
                                                if ($(c).jqGrid("progressBar", {
                                                    method: "hide",
                                                    loadtype: c.p.loadui
                                                }),
                                                c.grid.hDiv.loading = !1,
                                                "success" === o) {
                                                    var p = $(c).triggerHandler("jqGridAfterSubmitCell", [c, k, x[z], l, g, a, b]) || [!0, ""];
                                                    !0 === p[0] && $.isFunction(c.p.afterSubmitCell) && (p = c.p.afterSubmitCell.call(c, k, x[z], l, g, a, b)),
                                                    !0 === p[0] ? (u && (g = ""),
                                                    $(j).empty(),
                                                    $(c).jqGrid("setCell", c.p.savedRow[d].rowId, b, h, !1, !1, !0),
                                                    $(j).addClass("dirty-cell"),
                                                    $(i).addClass("edited"),
                                                    $(c).triggerHandler("jqGridAfterSaveCell", [c.p.savedRow[d].rowId, l, g, a, b]),
                                                    $.isFunction(c.p.afterSaveCell) && c.p.afterSaveCell.call(c, c.p.savedRow[d].rowId, l, g, a, b),
                                                    c.p.savedRow.splice(0, 1)) : ($(c).triggerHandler("jqGridErrorCell", [k, o]),
                                                    $.isFunction(c.p.errorCell) ? c.p.errorCell.call(c, k, o) : $.jgrid.info_dialog(e.errcap, p[1], f.bClose, {
                                                        styleUI: c.p.styleUI,
                                                        top: n.top + 30,
                                                        left: n.left,
                                                        onClose: function() {
                                                            c.p.restoreCellonFail || $("#" + a + "_" + m, i).focus()
                                                        }
                                                    }),
                                                    c.p.restoreCellonFail && $(c).jqGrid("restoreCell", a, b))
                                                }
                                            },
                                            error: function(d, g, h) {
                                                $("#lui_" + $.jgrid.jqID(c.p.id)).hide(),
                                                c.grid.hDiv.loading = !1,
                                                $(c).triggerHandler("jqGridErrorCell", [d, g, h]),
                                                $.isFunction(c.p.errorCell) ? c.p.errorCell.call(c, d, g, h) : $.jgrid.info_dialog(e.errcap, d.status + " : " + d.statusText + "<br/>" + g, f.bClose, {
                                                    styleUI: c.p.styleUI,
                                                    top: n.top + 30,
                                                    left: n.left,
                                                    onClose: function() {
                                                        c.p.restoreCellonFail || $("#" + a + "_" + m, i).focus()
                                                    }
                                                }),
                                                c.p.restoreCellonFail && $(c).jqGrid("restoreCell", a, b)
                                            }
                                        }, $.jgrid.ajaxOptions, c.p.ajaxCellOptions || {}))
                                    } else
                                        try {
                                            $.jgrid.info_dialog(e.errcap, e.nourl, f.bClose, {
                                                styleUI: c.p.styleUI
                                            }),
                                            c.p.restoreCellonFail && $(c).jqGrid("restoreCell", a, b)
                                        } catch (a) {}
                                "clientArray" === c.p.cellsubmit && ($(j).empty(),
                                $(c).jqGrid("setCell", c.p.savedRow[d].rowId, b, h, !1, !1, !0),
                                $(j).addClass("dirty-cell"),
                                $(i).addClass("edited"),
                                $(c).triggerHandler("jqGridAfterSaveCell", [c.p.savedRow[d].rowId, l, g, a, b]),
                                $.isFunction(c.p.afterSaveCell) && c.p.afterSaveCell.call(c, c.p.savedRow[d].rowId, l, g, a, b),
                                c.p.savedRow.splice(0, 1))
                            } else
                                try {
                                    $.isFunction(c.p.validationCell) ? c.p.validationCell.call(c, $("#" + a + "_" + m, i), t[1], a, b) : (window.setTimeout(function() {
                                        $.jgrid.info_dialog(e.errcap, g + " " + t[1], f.bClose, {
                                            styleUI: c.p.styleUI,
                                            top: n.top + 30,
                                            left: n.left,
                                            onClose: function() {
                                                c.p.restoreCellonFail || $("#" + a + "_" + m, i).focus()
                                            }
                                        })
                                    }, 50),
                                    c.p.restoreCellonFail && $(c).jqGrid("restoreCell", a, b))
                                } catch (a) {
                                    alert(t[1])
                                }
                        } else
                            $(c).jqGrid("restoreCell", a, b)
                    }
                    window.setTimeout(function() {
                        $("#" + $.jgrid.jqID(c.p.knv)).attr("tabindex", "-1").focus()
                    }, 0)
                }
            })
        },
        restoreCell: function(a, b) {
            return this.each(function() {
                var c = this
                  , d = c.p.savedRow.length >= 1 ? 0 : null;
                if (c.grid && !0 === c.p.cellEdit) {
                    if (null !== d) {
                        var e = $(c).jqGrid("getGridRowById", c.p.savedRow[d].rowId)
                          , f = $("td:eq(" + b + ")", e);
                        if ($.isFunction($.fn.datepicker))
                            try {
                                $("input.hasDatepicker", f).datepicker("hide")
                            } catch (a) {}
                        $(f).empty().attr("tabindex", "-1"),
                        $(c).jqGrid("setCell", c.p.savedRow[0].rowId, b, c.p.savedRow[d].v, !1, !1, !0),
                        $(c).triggerHandler("jqGridAfterRestoreCell", [c.p.savedRow[d].rowId, c.p.savedRow[d].v, a, b]),
                        $.isFunction(c.p.afterRestoreCell) && c.p.afterRestoreCell.call(c, c.p.savedRow[d].rowId, c.p.savedRow[d].v, a, b),
                        c.p.savedRow.splice(0, 1)
                    }
                    window.setTimeout(function() {
                        $("#" + c.p.knv).attr("tabindex", "-1").focus()
                    }, 0)
                }
            })
        },
        nextCell: function(a, b, c) {
            var d;
            return this.each(function() {
                var e, f = this, g = !1;
                if (f.grid && !0 === f.p.cellEdit) {
                    for (e = b + 1; e < f.p.colModel.length; e++)
                        if (!0 === f.p.colModel[e].editable && (!$.isFunction(f.p.isCellEditable) || f.p.isCellEditable.call(f, f.p.colModel[e].name, a, e))) {
                            g = e;
                            break
                        }
                    !1 !== g ? (d = !0,
                    $(f).jqGrid("editCell", a, g, !0, c)) : (d = !1,
                    f.p.savedRow.length > 0 && $(f).jqGrid("saveCell", a, b))
                }
            }),
            d
        },
        prevCell: function(a, b, c) {
            var d;
            return this.each(function() {
                var e, f = this, g = !1;
                if (!f.grid || !0 !== f.p.cellEdit)
                    return !1;
                for (e = b - 1; e >= 0; e--)
                    if (!0 === f.p.colModel[e].editable && (!$.isFunction(f.p.isCellEditable) || f.p.isCellEditable.call(f, f.p.colModel[e].name, a, e))) {
                        g = e;
                        break
                    }
                !1 !== g ? (d = !0,
                $(f).jqGrid("editCell", a, g, !0, c)) : (d = !1,
                f.p.savedRow.length > 0 && $(f).jqGrid("saveCell", a, b))
            }),
            d
        },
        GridNav: function() {
            return this.each(function() {
                function a(a, b, d) {
                    if ("v" === d.substr(0, 1)) {
                        var e = $(c.grid.bDiv)[0].clientHeight
                          , f = $(c.grid.bDiv)[0].scrollTop
                          , g = c.rows[a].offsetTop + c.rows[a].clientHeight
                          , h = c.rows[a].offsetTop;
                        "vd" === d && g >= e && ($(c.grid.bDiv)[0].scrollTop = $(c.grid.bDiv)[0].scrollTop + c.rows[a].clientHeight),
                        "vu" === d && h < f && ($(c.grid.bDiv)[0].scrollTop = $(c.grid.bDiv)[0].scrollTop - c.rows[a].clientHeight)
                    }
                    if ("h" === d) {
                        var i = $(c.grid.bDiv)[0].clientWidth
                          , j = $(c.grid.bDiv)[0].scrollLeft
                          , k = c.rows[a].cells[b].offsetLeft + c.rows[a].cells[b].clientWidth
                          , l = c.rows[a].cells[b].offsetLeft;
                        k >= i + parseInt(j, 10) ? $(c.grid.bDiv)[0].scrollLeft = $(c.grid.bDiv)[0].scrollLeft + c.rows[a].cells[b].clientWidth : l < j && ($(c.grid.bDiv)[0].scrollLeft = $(c.grid.bDiv)[0].scrollLeft - c.rows[a].cells[b].clientWidth)
                    }
                }
                function b(a, b) {
                    var d, e;
                    if ("lft" === b)
                        for (d = a + 1,
                        e = a; e >= 0; e--)
                            if (!0 !== c.p.colModel[e].hidden) {
                                d = e;
                                break
                            }
                    if ("rgt" === b)
                        for (d = a - 1,
                        e = a; e < c.p.colModel.length; e++)
                            if (!0 !== c.p.colModel[e].hidden) {
                                d = e;
                                break
                            }
                    return d
                }
                var c = this;
                if (c.grid && !0 === c.p.cellEdit) {
                    c.p.knv = c.p.id + "_kn";
                    var d, e, f = $("<div style='position:fixed;top:0px;width:1px;height:1px;' tabindex='0'><div tabindex='-1' style='width:1px;height:1px;' id='" + c.p.knv + "'></div></div>");
                    $(f).insertBefore(c.grid.cDiv),
                    $("#" + c.p.knv).focus().keydown(function(f) {
                        switch (e = f.keyCode,
                        "rtl" === c.p.direction && (37 === e ? e = 39 : 39 === e && (e = 37)),
                        e) {
                        case 38:
                            c.p.iRow - 1 > 0 && (a(c.p.iRow - 1, c.p.iCol, "vu"),
                            $(c).jqGrid("editCell", c.p.iRow - 1, c.p.iCol, !1, f));
                            break;
                        case 40:
                            c.p.iRow + 1 <= c.rows.length - 1 && (a(c.p.iRow + 1, c.p.iCol, "vd"),
                            $(c).jqGrid("editCell", c.p.iRow + 1, c.p.iCol, !1, f));
                            break;
                        case 37:
                            c.p.iCol - 1 >= 0 && (d = b(c.p.iCol - 1, "lft"),
                            a(c.p.iRow, d, "h"),
                            $(c).jqGrid("editCell", c.p.iRow, d, !1, f));
                            break;
                        case 39:
                            c.p.iCol + 1 <= c.p.colModel.length - 1 && (d = b(c.p.iCol + 1, "rgt"),
                            a(c.p.iRow, d, "h"),
                            $(c).jqGrid("editCell", c.p.iRow, d, !1, f));
                            break;
                        case 13:
                            parseInt(c.p.iCol, 10) >= 0 && parseInt(c.p.iRow, 10) >= 0 && $(c).jqGrid("editCell", c.p.iRow, c.p.iCol, !0, f);
                            break;
                        default:
                            return !0
                        }
                        return !1
                    })
                }
            })
        },
        getChangedCells: function(a) {
            var b = [];
            return a || (a = "all"),
            this.each(function() {
                var c, d = this;
                d.grid && !0 === d.p.cellEdit && $(d.rows).each(function(e) {
                    var f = {};
                    $(this).hasClass("edited") && ($("td", this).each(function(b) {
                        if ("cb" !== (c = d.p.colModel[b].name) && "subgrid" !== c)
                            if ("dirty" === a) {
                                if ($(this).hasClass("dirty-cell"))
                                    try {
                                        f[c] = $.unformat.call(d, this, {
                                            rowId: d.rows[e].id,
                                            colModel: d.p.colModel[b]
                                        }, b)
                                    } catch (a) {
                                        f[c] = $.jgrid.htmlDecode($(this).html())
                                    }
                            } else
                                try {
                                    f[c] = $.unformat.call(d, this, {
                                        rowId: d.rows[e].id,
                                        colModel: d.p.colModel[b]
                                    }, b)
                                } catch (a) {
                                    f[c] = $.jgrid.htmlDecode($(this).html())
                                }
                    }),
                    f.id = this.id,
                    b.push(f))
                })
            }),
            b
        }
    }),
    $.extend($.jgrid, {
        showModal: function(a) {
            a.w.show()
        },
        closeModal: function(a) {
            a.w.hide().attr("aria-hidden", "true"),
            a.o && a.o.remove()
        },
        hideModal: function(a, b) {
            b = $.extend({
                jqm: !0,
                gb: "",
                removemodal: !1,
                formprop: !1,
                form: ""
            }, b || {});
            var c = !(!b.gb || "string" != typeof b.gb || "#gbox_" !== b.gb.substr(0, 6)) && $("#" + b.gb.substr(6))[0];
            if (b.onClose) {
                var d = c ? b.onClose.call(c, a) : b.onClose(a);
                if ("boolean" == typeof d && !d)
                    return
            }
            if (b.formprop && c && b.form) {
                var e = $(a)[0].style.height
                  , f = $(a)[0].style.width;
                e.indexOf("px") > -1 && (e = parseFloat(e)),
                f.indexOf("px") > -1 && (f = parseFloat(f));
                var g, h;
                "edit" === b.form ? (g = "#" + $.jgrid.jqID("FrmGrid_" + b.gb.substr(6)),
                h = "formProp") : "view" === b.form && (g = "#" + $.jgrid.jqID("ViewGrid_" + b.gb.substr(6)),
                h = "viewProp"),
                $(c).data(h, {
                    top: parseFloat($(a).css("top")),
                    left: parseFloat($(a).css("left")),
                    width: f,
                    height: e,
                    dataheight: $(g).height(),
                    datawidth: $(g).width()
                })
            }
            if ($.fn.jqm && !0 === b.jqm)
                $(a).attr("aria-hidden", "true").jqmHide();
            else {
                if ("" !== b.gb)
                    try {
                        $(".jqgrid-overlay:first", b.gb).hide()
                    } catch (a) {}
                try {
                    $(".jqgrid-overlay-modal").hide()
                } catch (a) {}
                $(a).hide().attr("aria-hidden", "true")
            }
            b.removemodal && $(a).remove()
        },
        findPos: function(a) {
            var b = $(a).offset();
            return [b.left, b.top]
        },
        createModal: function(a, b, c, d, e, f, g) {
            c = $.extend(!0, {}, $.jgrid.jqModal || {}, c);
            var h = this
              , i = "rtl" === $(c.gbox).attr("dir")
              , j = $.jgrid.styleUI[c.styleUI || "jQueryUI"].modal
              , k = $.jgrid.styleUI[c.styleUI || "jQueryUI"].common
              , l = document.createElement("div");
            g = $.extend({}, g || {}),
            l.className = "ui-jqdialog " + j.modal,
            l.id = a.themodal;
            var m = document.createElement("div");
            m.className = "ui-jqdialog-titlebar " + j.header,
            m.id = a.modalhead,
            $(m).append("<span class='ui-jqdialog-title'>" + c.caption + "</span>");
            var n = $("<a class='ui-jqdialog-titlebar-close " + k.cornerall + "'></a>").hover(function() {
                n.addClass(k.hover)
            }, function() {
                n.removeClass(k.hover)
            }).append("<span class='" + k.icon_base + " " + j.icon_close + "'></span>");
            $(m).append(n),
            i ? (l.dir = "rtl",
            $(".ui-jqdialog-title", m).css("float", "right"),
            $(".ui-jqdialog-titlebar-close", m).css("left", "0.3em")) : (l.dir = "ltr",
            $(".ui-jqdialog-title", m).css("float", "left"),
            $(".ui-jqdialog-titlebar-close", m).css("right", "0.3em"));
            var o = document.createElement("div");
            $(o).addClass("ui-jqdialog-content " + j.content).attr("id", a.modalcontent),
            $(o).append(b),
            l.appendChild(o),
            $(l).prepend(m),
            !0 === f ? $("body").append(l) : "string" == typeof f ? $(f).append(l) : $(l).insertBefore(d),
            $(l).css(g),
            void 0 === c.jqModal && (c.jqModal = !0);
            var p = {};
            if ($.fn.jqm && !0 === c.jqModal) {
                if (0 === c.left && 0 === c.top && c.overlay) {
                    var q = [];
                    q = $.jgrid.findPos(e),
                    c.left = q[0] + 4,
                    c.top = q[1] + 4
                }
                p.top = c.top + "px",
                p.left = c.left
            } else
                0 === c.left && 0 === c.top || (p.left = c.left,
                p.top = c.top + "px");
            if ($("a.ui-jqdialog-titlebar-close", m).click(function() {
                var b = $("#" + $.jgrid.jqID(a.themodal)).data("onClose") || c.onClose
                  , d = $("#" + $.jgrid.jqID(a.themodal)).data("gbox") || c.gbox;
                return h.hideModal("#" + $.jgrid.jqID(a.themodal), {
                    gb: d,
                    jqm: c.jqModal,
                    onClose: b,
                    removemodal: c.removemodal || !1,
                    formprop: !c.recreateForm || !1,
                    form: c.form || ""
                }),
                !1
            }),
            0 !== c.width && c.width || (c.width = 300),
            0 !== c.height && c.height || (c.height = 200),
            !c.zIndex) {
                var r = $(d).parents("*[role=dialog]").filter(":first").css("z-index");
                c.zIndex = r ? parseInt(r, 10) + 2 : 950
            }
            var s = 0;
            if (i && p.left && !f && (s = $(c.gbox).width() - (isNaN(c.width) ? 0 : parseInt(c.width, 10)) - 8,
            p.left = parseInt(p.left, 10) + parseInt(s, 10)),
            p.left && (p.left += "px"),
            $(l).css($.extend({
                width: isNaN(c.width) ? "auto" : c.width + "px",
                height: isNaN(c.height) ? "auto" : c.height + "px",
                zIndex: c.zIndex,
                overflow: "hidden"
            }, p)).attr({
                tabIndex: "-1",
                role: "dialog",
                "aria-labelledby": a.modalhead,
                "aria-hidden": "true"
            }),
            void 0 === c.drag && (c.drag = !0),
            void 0 === c.resize && (c.resize = !0),
            c.drag)
                if ($(m).css("cursor", "move"),
                $.fn.tinyDraggable)
                    $(l).tinyDraggable({
                        handle: "#" + $.jgrid.jqID(m.id)
                    });
                else
                    try {
                        $(l).draggable({
                            handle: $("#" + $.jgrid.jqID(m.id))
                        })
                    } catch (a) {}
            if (c.resize)
                if ($.fn.jqResize)
                    $(l).append("<div class='jqResize " + j.resizable + " " + k.icon_base + " " + j.icon_resizable + "'></div>"),
                    $("#" + $.jgrid.jqID(a.themodal)).jqResize(".jqResize", !!a.scrollelm && "#" + $.jgrid.jqID(a.scrollelm));
                else
                    try {
                        $(l).resizable({
                            handles: "se, sw",
                            alsoResize: !!a.scrollelm && "#" + $.jgrid.jqID(a.scrollelm)
                        })
                    } catch (a) {}
            !0 === c.closeOnEscape && $(l).keydown(function(b) {
                if (27 === b.which) {
                    var d = $("#" + $.jgrid.jqID(a.themodal)).data("onClose") || c.onClose;
                    h.hideModal("#" + $.jgrid.jqID(a.themodal), {
                        gb: c.gbox,
                        jqm: c.jqModal,
                        onClose: d,
                        removemodal: c.removemodal || !1,
                        formprop: !c.recreateForm || !1,
                        form: c.form || ""
                    })
                }
            })
        },
        viewModal: function(a, b) {
            b = $.extend({
                toTop: !0,
                overlay: 10,
                modal: !1,
                overlayClass: "ui-widget-overlay",
                onShow: $.jgrid.showModal,
                onHide: $.jgrid.closeModal,
                gbox: "",
                jqm: !0,
                jqM: !0
            }, b || {});
            var c = "";
            if (b.gbox) {
                var d = $("#" + b.gbox.substring(6))[0];
                try {
                    c = $(d).jqGrid("getStyleUI", d.p.styleUI + ".common", "overlay", !1, "jqgrid-overlay-modal"),
                    b.overlayClass = $(d).jqGrid("getStyleUI", d.p.styleUI + ".common", "overlay", !0)
                } catch (a) {}
            }
            if (void 0 === b.focusField && (b.focusField = 0),
            "number" == typeof b.focusField && b.focusField >= 0 ? b.focusField = parseInt(b.focusField, 10) : "boolean" != typeof b.focusField || b.focusField ? b.focusField = 0 : b.focusField = !1,
            $.fn.jqm && !0 === b.jqm)
                b.jqM ? $(a).attr("aria-hidden", "false").jqm(b).jqmShow() : $(a).attr("aria-hidden", "false").jqmShow();
            else {
                if ("" !== b.gbox) {
                    var e = parseInt($(a).css("z-index")) - 1;
                    b.modal ? ($(".jqgrid-overlay-modal")[0] || $("body").prepend("<div " + c + "></div>"),
                    $(".jqgrid-overlay-modal").css("z-index", e).show()) : ($(".jqgrid-overlay:first", b.gbox).css("z-index", e).show(),
                    $(a).data("gbox", b.gbox))
                }
                if ($(a).show().attr("aria-hidden", "false"),
                b.focusField >= 0)
                    try {
                        $(":input:visible", a)[b.focusField].focus()
                    } catch (a) {}
            }
        },
        info_dialog: function(a, b, c, d) {
            var e = {
                width: 290,
                height: "auto",
                dataheight: "auto",
                drag: !0,
                resize: !1,
                left: 250,
                top: 170,
                zIndex: 1e3,
                jqModal: !0,
                modal: !1,
                closeOnEscape: !0,
                align: "center",
                buttonalign: "center",
                buttons: []
            };
            $.extend(!0, e, $.jgrid.jqModal || {}, {
                caption: "<b>" + a + "</b>"
            }, d || {});
            var f = e.jqModal
              , g = this
              , h = $.jgrid.styleUI[e.styleUI || "jQueryUI"].modal
              , i = $.jgrid.styleUI[e.styleUI || "jQueryUI"].common;
            $.fn.jqm && !f && (f = !1);
            var j, k = "";
            if (e.buttons.length > 0)
                for (j = 0; j < e.buttons.length; j++)
                    void 0 === e.buttons[j].id && (e.buttons[j].id = "info_button_" + j),
                    k += "<a id='" + e.buttons[j].id + "' class='fm-button " + i.button + "'>" + e.buttons[j].text + "</a>";
            var l = isNaN(e.dataheight) ? e.dataheight : e.dataheight + "px"
              , m = "text-align:" + e.align + ";"
              , n = "<div id='info_id'>";
            n += "<div id='infocnt' style='margin:0px;padding-bottom:1em;width:100%;overflow:auto;position:relative;height:" + l + ";" + m + "'>" + b + "</div>",
            n += c ? "<div class='" + h.content + "' style='text-align:" + e.buttonalign + ";padding-bottom:0.8em;padding-top:0.5em;background-image: none;border-width: 1px 0 0 0;'><a id='closedialog' class='fm-button " + i.button + "'>" + c + "</a>" + k + "</div>" : "" !== k ? "<div class='" + h.content + "' style='text-align:" + e.buttonalign + ";padding-bottom:0.8em;padding-top:0.5em;background-image: none;border-width: 1px 0 0 0;'>" + k + "</div>" : "",
            n += "</div>";
            try {
                "false" === $("#info_dialog").attr("aria-hidden") && $.jgrid.hideModal("#info_dialog", {
                    jqm: f
                }),
                $("#info_dialog").remove()
            } catch (a) {}
            var o = $(".ui-jqgrid").css("font-size") || "11px";
            $.jgrid.createModal({
                themodal: "info_dialog",
                modalhead: "info_head",
                modalcontent: "info_content",
                scrollelm: "infocnt"
            }, n, e, "", "", !0, {
                "font-size": o
            }),
            k && $.each(e.buttons, function(a) {
                $("#" + $.jgrid.jqID(this.id), "#info_id").on("click", function() {
                    return e.buttons[a].onClick.call($("#info_dialog")),
                    !1
                })
            }),
            $("#closedialog", "#info_id").on("click", function() {
                return g.hideModal("#info_dialog", {
                    jqm: f,
                    onClose: $("#info_dialog").data("onClose") || e.onClose,
                    gb: $("#info_dialog").data("gbox") || e.gbox
                }),
                !1
            }),
            $(".fm-button", "#info_dialog").hover(function() {
                $(this).addClass(i.hover)
            }, function() {
                $(this).removeClass(i.hover)
            }),
            $.isFunction(e.beforeOpen) && e.beforeOpen(),
            $.jgrid.viewModal("#info_dialog", {
                onHide: function(a) {
                    a.w.hide().remove(),
                    a.o && a.o.remove()
                },
                modal: e.modal,
                jqm: f
            }),
            $.isFunction(e.afterOpen) && e.afterOpen();
            try {
                $("#info_dialog").focus()
            } catch (a) {}
        },
        bindEv: function(a, b) {
            var c = this;
            $.isFunction(b.dataInit) && b.dataInit.call(c, a, b),
            b.dataEvents && $.each(b.dataEvents, function() {
                void 0 !== this.data ? $(a).on(this.type, this.data, this.fn) : $(a).on(this.type, this.fn)
            })
        },
        createEl: function(a, b, c, d, e) {
            function f(a, b, c) {
                var d = ["dataInit", "dataEvents", "dataUrl", "buildSelect", "sopt", "searchhidden", "defaultValue", "attr", "custom_element", "custom_value", "oper"];
                d = d.concat(["cacheUrlData", "delimiter", "separator"]),
                void 0 !== c && $.isArray(c) && $.merge(d, c),
                $.each(b, function(b, c) {
                    -1 === $.inArray(b, d) && $(a).attr(b, c)
                }),
                b.hasOwnProperty("id") || $(a).attr("id", $.jgrid.randId())
            }
            var g = ""
              , h = this;
            switch (a) {
            case "textarea":
                g = document.createElement("textarea"),
                d ? b.cols || $(g).css({
                    width: "98%"
                }) : b.cols || (b.cols = 20),
                b.rows || (b.rows = 2),
                ("&nbsp;" === c || "&#160;" === c || 1 === c.length && 160 === c.charCodeAt(0)) && (c = ""),
                g.value = c,
                $(g).attr({
                    role: "textbox",
                    multiline: "true"
                }),
                f(g, b);
                break;
            case "checkbox":
                if (g = document.createElement("input"),
                g.type = "checkbox",
                b.value) {
                    var i = b.value.split(":");
                    c === i[0] && (g.checked = !0,
                    g.defaultChecked = !0),
                    g.value = i[0],
                    $(g).attr("offval", i[1])
                } else {
                    var j = (c + "").toLowerCase();
                    j.search(/(false|f|0|no|n|off|undefined)/i) < 0 && "" !== j ? (g.checked = !0,
                    g.defaultChecked = !0,
                    g.value = c) : g.value = "on",
                    $(g).attr("offval", "off")
                }
                $(g).attr("role", "checkbox"),
                f(g, b, ["value"]);
                break;
            case "select":
                g = document.createElement("select"),
                g.setAttribute("role", "select");
                var k, l = [];
                if (!0 === b.multiple ? (k = !0,
                g.multiple = "multiple",
                $(g).attr("aria-multiselectable", "true")) : k = !1,
                null != b.dataUrl) {
                    var m = null
                      , n = b.postData || e.postData;
                    try {
                        m = b.rowId
                    } catch (a) {}
                    h.p && h.p.idPrefix && (m = $.jgrid.stripPref(h.p.idPrefix, m)),
                    $.ajax($.extend({
                        url: $.isFunction(b.dataUrl) ? b.dataUrl.call(h, m, c, String(b.name)) : b.dataUrl,
                        type: "GET",
                        dataType: "html",
                        data: $.isFunction(n) ? n.call(h, m, c, String(b.name)) : n,
                        context: {
                            elem: g,
                            options: b,
                            vl: c
                        },
                        success: function(a) {
                            var b, c = [], d = this.elem, e = this.vl, g = $.extend({}, this.options), i = !0 === g.multiple, j = !0 === g.cacheUrlData, k = "", l = $.isFunction(g.buildSelect) ? g.buildSelect.call(h, a) : a;
                            if ("string" == typeof l && (l = $($.trim(l)).html()),
                            l) {
                                if ($(d).append(l),
                                f(d, g, n ? ["postData"] : void 0),
                                void 0 === g.size && (g.size = i ? 3 : 1),
                                i ? (c = e.split(","),
                                c = $.map(c, function(a) {
                                    return $.trim(a)
                                })) : c[0] = $.trim(e),
                                $("option", d).each(function(a) {
                                    b = $(this).text(),
                                    e = $(this).val(),
                                    j && (k += (0 !== a ? ";" : "") + e + ":" + b),
                                    0 === a && d.multiple && (this.selected = !1),
                                    $(this).attr("role", "option"),
                                    ($.inArray($.trim(b), c) > -1 || $.inArray($.trim(e), c) > -1) && (this.selected = "selected")
                                }),
                                j)
                                    if ("edit" === g.oper)
                                        $(h).jqGrid("setColProp", g.name, {
                                            editoptions: {
                                                buildSelect: null,
                                                dataUrl: null,
                                                value: k
                                            }
                                        });
                                    else if ("search" === g.oper)
                                        $(h).jqGrid("setColProp", g.name, {
                                            searchoptions: {
                                                dataUrl: null,
                                                value: k
                                            }
                                        });
                                    else if ("filter" === g.oper && $("#fbox_" + h.p.id)[0].p) {
                                        var m, o = $("#fbox_" + h.p.id)[0].p.columns;
                                        $.each(o, function(a) {
                                            if (m = this.index || this.name,
                                            g.name === m)
                                                return this.searchoptions.dataUrl = null,
                                                this.searchoptions.value = k,
                                                !1
                                        })
                                    }
                                $(h).triggerHandler("jqGridAddEditAfterSelectUrlComplete", [d])
                            }
                        }
                    }, e || {}))
                } else if (b.value) {
                    var o;
                    void 0 === b.size && (b.size = k ? 3 : 1),
                    k && (l = c.split(","),
                    l = $.map(l, function(a) {
                        return $.trim(a)
                    })),
                    "function" == typeof b.value && (b.value = b.value());
                    var p, q, r, s, t, u, v = void 0 === b.separator ? ":" : b.separator, w = void 0 === b.delimiter ? ";" : b.delimiter;
                    if ("string" == typeof b.value)
                        for (p = b.value.split(w),
                        o = 0; o < p.length; o++)
                            q = p[o].split(v),
                            q.length > 2 && (q[1] = $.map(q, function(a, b) {
                                if (b > 0)
                                    return a
                            }).join(v)),
                            r = document.createElement("option"),
                            r.setAttribute("role", "option"),
                            r.value = q[0],
                            r.innerHTML = q[1],
                            g.appendChild(r),
                            k || $.trim(q[0]) !== $.trim(c) && $.trim(q[1]) !== $.trim(c) || (r.selected = "selected"),
                            k && ($.inArray($.trim(q[1]), l) > -1 || $.inArray($.trim(q[0]), l) > -1) && (r.selected = "selected");
                    else if ("[object Array]" === Object.prototype.toString.call(b.value))
                        for (s = b.value,
                        o = 0; o < s.length; o++)
                            2 === s[o].length && (t = s[o][0],
                            u = s[o][1],
                            r = document.createElement("option"),
                            r.setAttribute("role", "option"),
                            r.value = t,
                            r.innerHTML = u,
                            g.appendChild(r),
                            k || $.trim(t) !== $.trim(c) && $.trim(u) !== $.trim(c) || (r.selected = "selected"),
                            k && ($.inArray($.trim(u), l) > -1 || $.inArray($.trim(t), l) > -1) && (r.selected = "selected"));
                    else if ("object" == typeof b.value) {
                        s = b.value;
                        for (t in s)
                            s.hasOwnProperty(t) && (r = document.createElement("option"),
                            r.setAttribute("role", "option"),
                            r.value = t,
                            r.innerHTML = s[t],
                            g.appendChild(r),
                            k || $.trim(t) !== $.trim(c) && $.trim(s[t]) !== $.trim(c) || (r.selected = "selected"),
                            k && ($.inArray($.trim(s[t]), l) > -1 || $.inArray($.trim(t), l) > -1) && (r.selected = "selected"))
                    }
                    f(g, b, ["value"])
                }
                break;
            case "image":
            case "file":
                g = document.createElement("input"),
                g.type = a,
                f(g, b);
                break;
            case "custom":
                g = document.createElement("span");
                try {
                    if (!$.isFunction(b.custom_element))
                        throw "e1";
                    var x = b.custom_element.call(h, c, b);
                    if (!x)
                        throw "e2";
                    x = $(x).addClass("customelement").attr({
                        id: b.id,
                        name: b.name
                    }),
                    $(g).empty().append(x)
                } catch (a) {
                    var y = $.jgrid.getRegional(h, "errors")
                      , z = $.jgrid.getRegional(h, "edit");
                    "e1" === a ? $.jgrid.info_dialog(y.errcap, "function 'custom_element' " + z.msg.nodefined, z.bClose, {
                        styleUI: h.p.styleUI
                    }) : "e2" === a ? $.jgrid.info_dialog(y.errcap, "function 'custom_element' " + z.msg.novalue, z.bClose, {
                        styleUI: h.p.styleUI
                    }) : $.jgrid.info_dialog(y.errcap, "string" == typeof a ? a : a.message, z.bClose, {
                        styleUI: h.p.styleUI
                    })
                }
                break;
            default:
                var A;
                A = "button" === a ? "button" : "textbox",
                g = document.createElement("input"),
                g.type = a,
                g.value = c,
                "button" !== a && (d ? b.size || $(g).css({
                    width: "96%"
                }) : b.size || (b.size = 20)),
                $(g).attr("role", A),
                f(g, b)
            }
            return g
        },
        checkDate: function(a, b) {
            var c, d = function(a) {
                return a % 4 != 0 || a % 100 == 0 && a % 400 != 0 ? 28 : 29
            }, e = {};
            if (a = a.toLowerCase(),
            c = -1 !== a.indexOf("/") ? "/" : -1 !== a.indexOf("-") ? "-" : -1 !== a.indexOf(".") ? "." : "/",
            a = a.split(c),
            b = b.split(c),
            3 !== b.length)
                return !1;
            var f, g, h = -1, i = -1, j = -1;
            for (g = 0; g < a.length; g++) {
                var k = isNaN(b[g]) ? 0 : parseInt(b[g], 10);
                e[a[g]] = k,
                f = a[g],
                -1 !== f.indexOf("y") && (h = g),
                -1 !== f.indexOf("m") && (j = g),
                -1 !== f.indexOf("d") && (i = g)
            }
            f = "y" === a[h] || "yyyy" === a[h] ? 4 : "yy" === a[h] ? 2 : -1;
            var l, m = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            return -1 !== h && (l = e[a[h]].toString(),
            2 === f && 1 === l.length && (f = 1),
            l.length === f && (0 !== e[a[h]] || "00" === b[h]) && (-1 !== j && (l = e[a[j]].toString(),
            !(l.length < 1 || e[a[j]] < 1 || e[a[j]] > 12) && (-1 !== i && (l = e[a[i]].toString(),
            !(l.length < 1 || e[a[i]] < 1 || e[a[i]] > 31 || 2 === e[a[j]] && e[a[i]] > d(e[a[h]]) || e[a[i]] > m[e[a[j]]]))))))
        },
        isEmpty: function(a) {
            return !(void 0 !== a && !a.match(/^\s+$/) && "" !== a)
        },
        checkTime: function(a) {
            var b, c = /^(\d{1,2}):(\d{2})([apAP][Mm])?$/;
            if (!$.jgrid.isEmpty(a)) {
                if (!(b = a.match(c)))
                    return !1;
                if (b[3]) {
                    if (b[1] < 1 || b[1] > 12)
                        return !1
                } else if (b[1] > 23)
                    return !1;
                if (b[2] > 59)
                    return !1
            }
            return !0
        },
        checkValues: function(a, b, c, d) {
            var e, f, g, h, i, j, k = this, l = k.p.colModel, m = $.jgrid.getRegional(this, "edit.msg"), n = function(a) {
                var a = a.toString();
                if (a.length >= 2) {
                    var b, c;
                    if ("-" === a[0] ? (b = a[1],
                    a[2] && (c = a[2])) : (b = a[0],
                    a[1] && (c = a[1])),
                    "0" === b && "." !== c)
                        return !1
                }
                return "number" == typeof parseFloat(a) && isFinite(a)
            };
            if (void 0 === c)
                if ("string" == typeof b) {
                    for (f = 0,
                    i = l.length; f < i; f++)
                        if (l[f].name === b) {
                            e = l[f].editrules,
                            b = f,
                            null != l[f].formoptions && (g = l[f].formoptions.label);
                            break
                        }
                } else
                    b >= 0 && (e = l[b].editrules);
            else
                e = c,
                g = void 0 === d ? "_" : d;
            if (e) {
                if (g || (g = null != k.p.colNames ? k.p.colNames[b] : l[b].label),
                !0 === e.required && $.jgrid.isEmpty(a))
                    return [!1, g + ": " + m.required, ""];
                var o = !1 !== e.required;
                if (!0 === e.number && !(!1 === o && $.jgrid.isEmpty(a) || n(a)))
                    return [!1, g + ": " + m.number, ""];
                if (void 0 !== e.minValue && !isNaN(e.minValue) && parseFloat(a) < parseFloat(e.minValue))
                    return [!1, g + ": " + m.minValue + " " + e.minValue, ""];
                if (void 0 !== e.maxValue && !isNaN(e.maxValue) && parseFloat(a) > parseFloat(e.maxValue))
                    return [!1, g + ": " + m.maxValue + " " + e.maxValue, ""];
                var p;
                if (!0 === e.email && !(!1 === o && $.jgrid.isEmpty(a) || (p = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
                p.test(a))))
                    return [!1, g + ": " + m.email, ""];
                if (!0 === e.integer && (!1 !== o || !$.jgrid.isEmpty(a))) {
                    if (!n(a))
                        return [!1, g + ": " + m.integer, ""];
                    if (a % 1 != 0 || -1 !== a.indexOf("."))
                        return [!1, g + ": " + m.integer, ""]
                }
                if (!0 === e.date && !(!1 === o && $.jgrid.isEmpty(a) || (l[b].formatoptions && l[b].formatoptions.newformat ? (h = l[b].formatoptions.newformat,
                (j = $.jgrid.getRegional(k, "formatter.date.masks")) && j.hasOwnProperty(h) && (h = j[h])) : h = l[b].datefmt || "Y-m-d",
                $.jgrid.checkDate(h, a))))
                    return [!1, g + ": " + m.date + " - " + h, ""];
                if (!0 === e.time && !(!1 === o && $.jgrid.isEmpty(a) || $.jgrid.checkTime(a)))
                    return [!1, g + ": " + m.date + " - hh:mm (am/pm)", ""];
                if (!0 === e.url && !(!1 === o && $.jgrid.isEmpty(a) || (p = /^(((https?)|(ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i,
                p.test(a))))
                    return [!1, g + ": " + m.url, ""];
                if (!0 === e.custom && (!1 !== o || !$.jgrid.isEmpty(a))) {
                    if ($.isFunction(e.custom_func)) {
                        var q = e.custom_func.call(k, a, g, b);
                        return $.isArray(q) ? q : [!1, m.customarray, ""]
                    }
                    return [!1, m.customfcheck, ""]
                }
            }
            return [!0, "", ""]
        },
        validateForm: function(a) {
            var b, c, d = !0;
            for (b = 0; b < a.elements.length; b++)
                if (c = a.elements[b],
                ("INPUT" === c.nodeName || "TEXTAREA" === c.nodeName || "SELECT" === c.nodeName) && (void 0 !== c.willValidate ? ("INPUT" === c.nodeName && c.type !== c.getAttribute("type") && c.setCustomValidity($.jgrid.LegacyValidation(c) ? "" : "error"),
                c.reportValidity()) : (c.validity = c.validity || {},
                c.validity.valid = $.jgrid.LegacyValidation(c)),
                !c.validity.valid)) {
                    d = !1;
                    break
                }
            return d
        },
        LegacyValidation: function(a) {
            var b = !0
              , c = a.value
              , d = a.getAttribute("type")
              , e = "checkbox" === d || "radio" === d
              , f = a.getAttribute("required")
              , g = a.getAttribute("minlength")
              , h = a.getAttribute("maxlength")
              , i = a.getAttribute("pattern");
            return a.disabled ? b : (b = b && (!f || e && a.checked || !e && "" !== c),
            b = b && (e || (!g || c.length >= g) && (!h || c.length <= h)),
            b && i && (i = new RegExp(i),
            b = i.test(c)),
            b)
        },
        buildButtons: function(a, b, c) {
            var d, e;
            return $.each(a, function(a, f) {
                f.id || (f.id = $.jgrid.randId()),
                f.position || (f.position = "last"),
                f.side || (f.side = "left"),
                d = f.icon ? " fm-button-icon-" + f.side + "'><span class='" + c.icon_base + " " + f.icon + "'></span>" : "'>",
                e = "<a  data-index='" + a + "' id='" + f.id + "' class='fm-button " + c.button + d + f.text + "</a>",
                "last" === f.position ? b += e : b = e + b
            }),
            b
        }
    }),
    $.fn.jqFilter = function(a) {
        if ("string" == typeof a) {
            var b = $.fn.jqFilter[a];
            if (!b)
                throw "jqFilter - No such method: " + a;
            var c = $.makeArray(arguments).slice(1);
            return b.apply(this, c)
        }
        var d = $.extend(!0, {
            filter: null,
            columns: [],
            sortStrategy: null,
            onChange: null,
            afterRedraw: null,
            checkValues: null,
            error: !1,
            errmsg: "",
            errorcheck: !0,
            showQuery: !0,
            sopt: null,
            ops: [],
            operands: null,
            numopts: ["eq", "ne", "lt", "le", "gt", "ge", "nu", "nn", "in", "ni"],
            stropts: ["eq", "ne", "bw", "bn", "ew", "en", "cn", "nc", "nu", "nn", "in", "ni"],
            strarr: ["text", "string", "blob"],
            groupOps: [{
                op: "AND",
                text: "AND"
            }, {
                op: "OR",
                text: "OR"
            }],
            groupButton: !0,
            ruleButtons: !0,
            uniqueSearchFields: !1,
            direction: "ltr",
            addsubgrup: "Add subgroup",
            addrule: "Add rule",
            delgroup: "Delete group",
            delrule: "Delete rule",
            autoencode: !1
        }, $.jgrid.filter, a || {});
        return this.each(function() {
            if (!this.filter) {
                this.p = d,
                null !== this.p.filter && void 0 !== this.p.filter || (this.p.filter = {
                    groupOp: this.p.groupOps[0].op,
                    rules: [],
                    groups: []
                }),
                null != this.p.sortStrategy && $.isFunction(this.p.sortStrategy) && this.p.columns.sort(this.p.sortStrategy);
                var a, b, c = this.p.columns.length, e = /msie/i.test(navigator.userAgent) && !window.opera;
                if (this.p.initFilter = $.extend(!0, {}, this.p.filter),
                c) {
                    for (a = 0; a < c; a++)
                        b = this.p.columns[a],
                        b.stype ? b.inputtype = b.stype : b.inputtype || (b.inputtype = "text"),
                        b.sorttype ? b.searchtype = b.sorttype : b.searchtype || (b.searchtype = "string"),
                        void 0 === b.hidden && (b.hidden = !1),
                        b.label || (b.label = b.name),
                        b.index && (b.name = b.index),
                        b.hasOwnProperty("searchoptions") || (b.searchoptions = {}),
                        b.hasOwnProperty("searchrules") || (b.searchrules = {}),
                        void 0 === b.search ? b.inlist = !0 : b.inlist = b.search;
                    var f = function() {
                        return $("#" + $.jgrid.jqID(d.id))[0] || null
                    }
                      , g = f()
                      , h = $.jgrid.styleUI[g.p.styleUI || "jQueryUI"].filter
                      , i = $.jgrid.styleUI[g.p.styleUI || "jQueryUI"].common;
                    this.p.showQuery && $(this).append("<table class='queryresult " + h.table_widget + "' style='display:block;max-width:440px;border:0px none;' dir='" + this.p.direction + "'><tbody><tr><td class='query'></td></tr></tbody></table>");
                    var j = function(a, b) {
                        var c = [!0, ""]
                          , e = f();
                        if ($.isFunction(b.searchrules))
                            c = b.searchrules.call(e, a, b);
                        else if ($.jgrid && $.jgrid.checkValues)
                            try {
                                c = $.jgrid.checkValues.call(e, a, -1, b.searchrules, b.label)
                            } catch (a) {}
                        c && c.length && !1 === c[0] && (d.error = !c[0],
                        d.errmsg = c[1])
                    };
                    this.onchange = function() {
                        return this.p.error = !1,
                        this.p.errmsg = "",
                        !!$.isFunction(this.p.onChange) && this.p.onChange.call(this, this.p)
                    }
                    ,
                    this.reDraw = function() {
                        $("table.group:first", this).remove();
                        var a = this.createTableForGroup(d.filter, null);
                        $(this).append(a),
                        $.isFunction(this.p.afterRedraw) && this.p.afterRedraw.call(this, this.p)
                    }
                    ,
                    this.createTableForGroup = function(a, b) {
                        var c, e = this, f = $("<table class='group " + h.table_widget + " ui-search-table' style='border:0px none;'><tbody></tbody></table>"), g = "left";
                        "rtl" === this.p.direction && (g = "right",
                        f.attr("dir", "rtl")),
                        null === b && f.append("<tr class='error' style='display:none;'><th colspan='5' class='" + i.error + "' align='" + g + "'></th></tr>");
                        var j = $("<tr></tr>");
                        f.append(j);
                        var k = $("<th colspan='5' align='" + g + "'></th>");
                        if (j.append(k),
                        !0 === this.p.ruleButtons) {
                            var l = $("<select size='1' class='opsel " + h.srSelect + "'></select>");
                            k.append(l);
                            var m, n = "";
                            for (c = 0; c < d.groupOps.length; c++)
                                m = a.groupOp === e.p.groupOps[c].op ? " selected='selected'" : "",
                                n += "<option value='" + e.p.groupOps[c].op + "'" + m + ">" + e.p.groupOps[c].text + "</option>";
                            l.append(n).on("change", function() {
                                a.groupOp = $(l).val(),
                                e.onchange()
                            })
                        }
                        var o = "<span></span>";
                        if (this.p.groupButton && (o = $("<input type='button' value='+ {}' title='" + e.p.subgroup + "' class='add-group " + i.button + "'/>"),
                        o.on("click", function() {
                            return void 0 === a.groups && (a.groups = []),
                            a.groups.push({
                                groupOp: d.groupOps[0].op,
                                rules: [],
                                groups: []
                            }),
                            e.reDraw(),
                            e.onchange(),
                            !1
                        })),
                        k.append(o),
                        !0 === this.p.ruleButtons) {
                            var p, q = $("<input type='button' value='+' title='" + e.p.addrule + "' class='add-rule ui-add " + i.button + "'/>");
                            q.on("click", function() {
                                for (void 0 === a.rules && (a.rules = []),
                                c = 0; c < e.p.columns.length; c++) {
                                    var b = void 0 === e.p.columns[c].search || e.p.columns[c].search
                                      , d = !0 === e.p.columns[c].hidden;
                                    if (!0 === e.p.columns[c].searchoptions.searchhidden && b || b && !d) {
                                        p = e.p.columns[c];
                                        break
                                    }
                                }
                                if (!p)
                                    return !1;
                                var f;
                                return f = p.searchoptions.sopt ? p.searchoptions.sopt : e.p.sopt ? e.p.sopt : -1 !== $.inArray(p.searchtype, e.p.strarr) ? e.p.stropts : e.p.numopts,
                                a.rules.push({
                                    field: p.name,
                                    op: f[0],
                                    data: ""
                                }),
                                e.reDraw(),
                                !1
                            }),
                            k.append(q)
                        }
                        if (null !== b) {
                            var r = $("<input type='button' value='-' title='" + e.p.delgroup + "' class='delete-group " + i.button + "'/>");
                            k.append(r),
                            r.on("click", function() {
                                for (c = 0; c < b.groups.length; c++)
                                    if (b.groups[c] === a) {
                                        b.groups.splice(c, 1);
                                        break
                                    }
                                return e.reDraw(),
                                e.onchange(),
                                !1
                            })
                        }
                        if (void 0 !== a.groups)
                            for (c = 0; c < a.groups.length; c++) {
                                var s = $("<tr></tr>");
                                f.append(s);
                                var t = $("<td class='first'></td>");
                                s.append(t);
                                var u = $("<td colspan='4'></td>");
                                u.append(this.createTableForGroup(a.groups[c], a)),
                                s.append(u)
                            }
                        void 0 === a.groupOp && (a.groupOp = e.p.groupOps[0].op);
                        var v, w = e.p.ruleButtons && e.p.uniqueSearchFields;
                        if (w)
                            for (v = 0; v < e.p.columns.length; v++)
                                e.p.columns[v].inlist && (e.p.columns[v].search = !0);
                        if (void 0 !== a.rules)
                            for (c = 0; c < a.rules.length; c++)
                                if (f.append(this.createTableRowForRule(a.rules[c], a)),
                                w) {
                                    var x = a.rules[c].field;
                                    for (v = 0; v < e.p.columns.length; v++)
                                        if (x === e.p.columns[v].name) {
                                            e.p.columns[v].search = !1;
                                            break
                                        }
                                }
                        return f
                    }
                    ,
                    this.createTableRowForRule = function(a, b) {
                        var c, g, j, k, l, m = this, n = f(), o = $("<tr></tr>"), p = "";
                        o.append("<td class='first'></td>");
                        var q = $("<td class='columns'></td>");
                        o.append(q);
                        var r, s = $("<select size='1' class='" + h.srSelect + "'></select>"), t = [];
                        q.append(s),
                        s.on("change", function() {
                            if (m.p.ruleButtons && m.p.uniqueSearchFields) {
                                var b = parseInt($(this).data("curr"), 10)
                                  , d = this.selectedIndex;
                                b >= 0 && (m.p.columns[b].search = !0,
                                $(this).data("curr", d),
                                m.p.columns[d].search = !1)
                            }
                            for (a.field = $(s).val(),
                            j = $(this).parents("tr:first"),
                            $(".data", j).empty(),
                            c = 0; c < m.p.columns.length; c++)
                                if (m.p.columns[c].name === a.field) {
                                    k = m.p.columns[c];
                                    break
                                }
                            if (k) {
                                k.searchoptions.id = $.jgrid.randId(),
                                k.searchoptions.name = a.field,
                                k.searchoptions.oper = "filter",
                                e && "text" === k.inputtype && (k.searchoptions.size || (k.searchoptions.size = 10));
                                var f = $.jgrid.createEl.call(n, k.inputtype, k.searchoptions, "", !0, m.p.ajaxSelectOptions || {}, !0);
                                $(f).addClass("input-elm " + h.srInput),
                                g = k.searchoptions.sopt ? k.searchoptions.sopt : m.p.sopt ? m.p.sopt : -1 !== $.inArray(k.searchtype, m.p.strarr) ? m.p.stropts : m.p.numopts;
                                var i = ""
                                  , l = 0;
                                for (t = [],
                                $.each(m.p.ops, function() {
                                    t.push(this.oper)
                                }),
                                c = 0; c < g.length; c++)
                                    -1 !== (r = $.inArray(g[c], t)) && (0 === l && (a.op = m.p.ops[r].oper),
                                    i += "<option value='" + m.p.ops[r].oper + "'>" + m.p.ops[r].text + "</option>",
                                    l++);
                                if ($(".selectopts", j).empty().append(i),
                                $(".selectopts", j)[0].selectedIndex = 0,
                                $.jgrid.msie() && $.jgrid.msiever() < 9) {
                                    var o = parseInt($("select.selectopts", j)[0].offsetWidth, 10) + 1;
                                    $(".selectopts", j).width(o),
                                    $(".selectopts", j).css("width", "auto")
                                }
                                $(".data", j).append(f),
                                $.jgrid.bindEv.call(n, f, k.searchoptions),
                                $(".input-elm", j).on("change", function(b) {
                                    var c = b.target;
                                    "custom" === k.inputtype && $.isFunction(k.searchoptions.custom_value) ? a.data = k.searchoptions.custom_value.call(n, $(".customelement", this), "get") : a.data = $(c).val(),
                                    "select" === k.inputtype && k.searchoptions.multiple && (a.data = a.data.join(",")),
                                    m.onchange()
                                }),
                                setTimeout(function() {
                                    a.data = $(f).val(),
                                    m.onchange()
                                }, 0)
                            }
                        });
                        var u = 0;
                        for (c = 0; c < m.p.columns.length; c++) {
                            var v = void 0 === m.p.columns[c].search || m.p.columns[c].search
                              , w = !0 === m.p.columns[c].hidden;
                            (!0 === m.p.columns[c].searchoptions.searchhidden && v || v && !w) && (l = "",
                            a.field === m.p.columns[c].name && (l = " selected='selected'",
                            u = c),
                            p += "<option value='" + m.p.columns[c].name + "'" + l + ">" + m.p.columns[c].label + "</option>")
                        }
                        s.append(p),
                        s.data("curr", u);
                        var x = $("<td class='operators'></td>");
                        o.append(x),
                        k = d.columns[u],
                        k.searchoptions.id = $.jgrid.randId(),
                        e && "text" === k.inputtype && (k.searchoptions.size || (k.searchoptions.size = 10)),
                        k.searchoptions.name = a.field,
                        k.searchoptions.oper = "filter";
                        var y = $.jgrid.createEl.call(n, k.inputtype, k.searchoptions, a.data, !0, m.p.ajaxSelectOptions || {}, !0);
                        "nu" !== a.op && "nn" !== a.op || ($(y).attr("readonly", "true"),
                        $(y).attr("disabled", "true"));
                        var z = $("<select size='1' class='selectopts " + h.srSelect + "'></select>");
                        for (x.append(z),
                        z.on("change", function() {
                            a.op = $(z).val(),
                            j = $(this).parents("tr:first");
                            var b = $(".input-elm", j)[0];
                            "nu" === a.op || "nn" === a.op ? (a.data = "",
                            "SELECT" !== b.tagName.toUpperCase() && (b.value = ""),
                            b.setAttribute("readonly", "true"),
                            b.setAttribute("disabled", "true")) : ("SELECT" === b.tagName.toUpperCase() && (a.data = b.value),
                            b.removeAttribute("readonly"),
                            b.removeAttribute("disabled")),
                            m.onchange()
                        }),
                        g = k.searchoptions.sopt ? k.searchoptions.sopt : m.p.sopt ? m.p.sopt : -1 !== $.inArray(k.searchtype, m.p.strarr) ? m.p.stropts : m.p.numopts,
                        p = "",
                        $.each(m.p.ops, function() {
                            t.push(this.oper)
                        }),
                        c = 0; c < g.length; c++)
                            -1 !== (r = $.inArray(g[c], t)) && (l = a.op === m.p.ops[r].oper ? " selected='selected'" : "",
                            p += "<option value='" + m.p.ops[r].oper + "'" + l + ">" + m.p.ops[r].text + "</option>");
                        z.append(p);
                        var A = $("<td class='data'></td>");
                        o.append(A),
                        A.append(y),
                        $.jgrid.bindEv.call(n, y, k.searchoptions),
                        $(y).addClass("input-elm " + h.srInput).on("change", function() {
                            a.data = "custom" === k.inputtype ? k.searchoptions.custom_value.call(n, $(".customelement", this), "get") : $(this).val(),
                            m.onchange()
                        });
                        var B = $("<td></td>");
                        if (o.append(B),
                        !0 === this.p.ruleButtons) {
                            var C = $("<input type='button' value='-' title='" + m.p.delrule + "' class='delete-rule ui-del " + i.button + "'/>");
                            B.append(C),
                            C.on("click", function() {
                                for (c = 0; c < b.rules.length; c++)
                                    if (b.rules[c] === a) {
                                        b.rules.splice(c, 1);
                                        break
                                    }
                                return m.reDraw(),
                                m.onchange(),
                                !1
                            })
                        }
                        return o
                    }
                    ,
                    this.getStringForGroup = function(a) {
                        var b, c = "(";
                        if (void 0 !== a.groups)
                            for (b = 0; b < a.groups.length; b++) {
                                c.length > 1 && (c += " " + a.groupOp + " ");
                                try {
                                    c += this.getStringForGroup(a.groups[b])
                                } catch (a) {
                                    alert(a)
                                }
                            }
                        if (void 0 !== a.rules)
                            try {
                                for (b = 0; b < a.rules.length; b++)
                                    c.length > 1 && (c += " " + a.groupOp + " "),
                                    c += this.getStringForRule(a.rules[b])
                            } catch (a) {
                                alert(a)
                            }
                        return c += ")",
                        "()" === c ? "" : c
                    }
                    ,
                    this.getStringForRule = function(a) {
                        var b, c, e, f = "", g = "", h = ["int", "integer", "float", "number", "currency"];
                        for (b = 0; b < this.p.ops.length; b++)
                            if (this.p.ops[b].oper === a.op) {
                                f = this.p.operands.hasOwnProperty(a.op) ? this.p.operands[a.op] : "",
                                g = this.p.ops[b].oper;
                                break
                            }
                        for (b = 0; b < this.p.columns.length; b++)
                            if (this.p.columns[b].name === a.field) {
                                c = this.p.columns[b];
                                break
                            }
                        return void 0 === c ? "" : (e = this.p.autoencode ? $.jgrid.htmlEncode(a.data) : a.data,
                        "bw" !== g && "bn" !== g || (e += "%"),
                        "ew" !== g && "en" !== g || (e = "%" + e),
                        "cn" !== g && "nc" !== g || (e = "%" + e + "%"),
                        "in" !== g && "ni" !== g || (e = " (" + e + ")"),
                        d.errorcheck && j(a.data, c),
                        -1 !== $.inArray(c.searchtype, h) || "nn" === g || "nu" === g ? a.field + " " + f + " " + e : a.field + " " + f + ' "' + e + '"')
                    }
                    ,
                    this.resetFilter = function() {
                        this.p.filter = $.extend(!0, {}, this.p.initFilter),
                        this.reDraw(),
                        this.onchange()
                    }
                    ,
                    this.hideError = function() {
                        $("th." + i.error, this).html(""),
                        $("tr.error", this).hide()
                    }
                    ,
                    this.showError = function() {
                        $("th." + i.error, this).html(this.p.errmsg),
                        $("tr.error", this).show()
                    }
                    ,
                    this.toUserFriendlyString = function() {
                        return this.getStringForGroup(d.filter)
                    }
                    ,
                    this.toString = function() {
                        function a(a) {
                            if (c.p.errorcheck) {
                                var b, d;
                                for (b = 0; b < c.p.columns.length; b++)
                                    if (c.p.columns[b].name === a.field) {
                                        d = c.p.columns[b];
                                        break
                                    }
                                d && j(a.data, d)
                            }
                            return a.op + "(item." + a.field + ",'" + a.data + "')"
                        }
                        function b(c) {
                            var d, e = "(";
                            if (void 0 !== c.groups)
                                for (d = 0; d < c.groups.length; d++)
                                    e.length > 1 && ("OR" === c.groupOp ? e += " || " : e += " && "),
                                    e += b(c.groups[d]);
                            if (void 0 !== c.rules)
                                for (d = 0; d < c.rules.length; d++)
                                    e.length > 1 && ("OR" === c.groupOp ? e += " || " : e += " && "),
                                    e += a(c.rules[d]);
                            return e += ")",
                            "()" === e ? "" : e
                        }
                        var c = this;
                        return b(this.p.filter)
                    }
                    ,
                    this.reDraw(),
                    this.p.showQuery && this.onchange(),
                    this.filter = !0
                }
            }
        })
    }
    ,
    $.extend($.fn.jqFilter, {
        toSQLString: function() {
            var a = "";
            return this.each(function() {
                a = this.toUserFriendlyString()
            }),
            a
        },
        filterData: function() {
            var a;
            return this.each(function() {
                a = this.p.filter
            }),
            a
        },
        getParameter: function(a) {
            var b = null;
            return void 0 !== a && this.each(function(c, d) {
                d.p.hasOwnProperty(a) && (b = d.p[a])
            }),
            b || this[0].p
        },
        resetFilter: function() {
            return this.each(function() {
                this.resetFilter()
            })
        },
        addFilter: function(a) {
            "string" == typeof a && (a = $.jgrid.parse(a)),
            this.each(function() {
                this.p.filter = a,
                this.reDraw(),
                this.onchange()
            })
        }
    }),
    $.extend($.jgrid, {
        filterRefactor: function(a) {
            var b, c, d, e, f, g = {};
            try {
                if (g = "string" == typeof a.ruleGroup ? $.jgrid.parse(a.ruleGroup) : a.ruleGroup,
                g.rules && g.rules.length)
                    for (b = g.rules,
                    c = 0; c < b.length; c++)
                        d = b[c],
                        $.inArray(d.filed, a.ssfield) && (e = d.data.split(a.splitSelect),
                        e.length > 1 && (void 0 === g.groups && (g.groups = []),
                        f = {
                            groupOp: a.groupOpSelect,
                            groups: [],
                            rules: []
                        },
                        g.groups.push(f),
                        $.each(e, function(a) {
                            e[a] && f.rules.push({
                                data: e[a],
                                op: d.op,
                                field: d.field
                            })
                        }),
                        b.splice(c, 1),
                        c--))
            } catch (a) {}
            return g
        }
    }),
    $.jgrid.extend({
        filterToolbar: function(a) {
            var b = $.jgrid.getRegional(this[0], "search");
            return a = $.extend({
                autosearch: !0,
                autosearchDelay: 500,
                searchOnEnter: !0,
                beforeSearch: null,
                afterSearch: null,
                beforeClear: null,
                afterClear: null,
                onClearSearchValue: null,
                url: "",
                stringResult: !1,
                groupOp: "AND",
                defaultSearch: "bw",
                searchOperators: !1,
                resetIcon: "x",
                splitSelect: ",",
                groupOpSelect: "OR",
                errorcheck: !0,
                operands: {
                    eq: "==",
                    ne: "!",
                    lt: "<",
                    le: "<=",
                    gt: ">",
                    ge: ">=",
                    bw: "^",
                    bn: "!^",
                    in: "=",
                    ni: "!=",
                    ew: "|",
                    en: "!@",
                    cn: "~",
                    nc: "!~",
                    nu: "#",
                    nn: "!#",
                    bt: "..."
                }
            }, b, a || {}),
            this.each(function() {
                var c = this;
                if (!c.p.filterToolbar) {
                    $(c).data("filterToolbar") || $(c).data("filterToolbar", a),
                    c.p.force_regional && (a = $.extend(a, b));
                    var d, e, f, g = $.jgrid.styleUI[c.p.styleUI || "jQueryUI"].filter, h = $.jgrid.styleUI[c.p.styleUI || "jQueryUI"].common, i = $.jgrid.styleUI[c.p.styleUI || "jQueryUI"].base, j = function() {
                        var b, d, e, f, g = {}, h = 0, i = {}, j = !1, k = [], l = !1, m = [!0, "", ""], n = !1;
                        if ($.each(c.p.colModel, function() {
                            var o = $("#gs_" + c.p.idPrefix + $.jgrid.jqID(this.name), !0 === this.frozen && !0 === c.p.frozenColumns ? c.grid.fhDiv : c.grid.hDiv);
                            if (d = this.index || this.name,
                            f = this.searchoptions || {},
                            e = a.searchOperators && f.searchOperMenu ? o.parent().prev().children("a").attr("soper") || a.defaultSearch : f.sopt ? f.sopt[0] : "select" === this.stype ? "eq" : a.defaultSearch,
                            b = "custom" === this.stype && $.isFunction(f.custom_value) && o.length > 0 ? f.custom_value.call(c, o, "get") : o.val(),
                            "select" === this.stype && f.multiple && $.isArray(b) && b.length && (j = !0,
                            k.push(d),
                            b = 1 === b.length ? b[0] : b),
                            this.searchrules && a.errorcheck && ($.isFunction(this.searchrules) ? m = this.searchrules.call(c, b, this) : $.jgrid && $.jgrid.checkValues && (m = $.jgrid.checkValues.call(c, b, -1, this.searchrules, this.label || this.name)),
                            m && m.length && !1 === m[0]))
                                return this.searchrules.hasOwnProperty("validationError") && (n = this.searchrules.validationError),
                                !1;
                            if ("bt" === e && (l = !0),
                            b || "nu" === e || "nn" === e)
                                g[d] = b,
                                i[d] = e,
                                h++;
                            else
                                try {
                                    delete c.p.postData[d]
                                } catch (a) {}
                        }),
                        !1 !== m[0]) {
                            var o = h > 0;
                            if (!0 === a.stringResult || "local" === c.p.datatype || !0 === a.searchOperators) {
                                var p = '{"groupOp":"' + a.groupOp + '","rules":['
                                  , q = 0;
                                $.each(g, function(a, b) {
                                    q > 0 && (p += ","),
                                    p += '{"field":"' + a + '",',
                                    p += '"op":"' + i[a] + '",',
                                    b += "",
                                    p += '"data":"' + b.replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"}',
                                    q++
                                }),
                                p += "]}";
                                var r, s, t, u, v, w, x;
                                if (j && (r = $.jgrid.filterRefactor({
                                    ruleGroup: p,
                                    ssfield: k,
                                    splitSelect: a.splitSelect,
                                    groupOpSelect: a.groupOpSelect
                                }),
                                p = JSON.stringify(r)),
                                l && ($.isPlainObject(r) || (r = $.jgrid.parse(p)),
                                r.rules && r.rules.length))
                                    for (s = r.rules,
                                    t = 0; t < s.length; t++)
                                        v = s[t],
                                        "bt" === v.op && (w = v.data.split("..."),
                                        w.length > 1 && (void 0 === r.groups && (r.groups = []),
                                        x = {
                                            groupOp: "AND",
                                            groups: [],
                                            rules: []
                                        },
                                        r.groups.push(x),
                                        $.each(w, function(a) {
                                            var b = 0 === a ? "ge" : "le";
                                            (u = w[a]) && x.rules.push({
                                                data: w[a],
                                                op: b,
                                                field: v.field
                                            })
                                        }),
                                        s.splice(t, 1),
                                        t--));
                                (l || j) && (p = JSON.stringify(r)),
                                $.extend(c.p.postData, {
                                    filters: p
                                }),
                                $.each(["searchField", "searchString", "searchOper"], function(a, b) {
                                    c.p.postData.hasOwnProperty(b) && delete c.p.postData[b]
                                })
                            } else
                                $.extend(c.p.postData, g);
                            var y;
                            a.url && (y = c.p.url,
                            $(c).jqGrid("setGridParam", {
                                url: a.url
                            }));
                            var z = "stop" === $(c).triggerHandler("jqGridToolbarBeforeSearch");
                            !z && $.isFunction(a.beforeSearch) && (z = a.beforeSearch.call(c)),
                            z || $(c).jqGrid("setGridParam", {
                                search: o
                            }).trigger("reloadGrid", [{
                                page: 1
                            }]),
                            y && $(c).jqGrid("setGridParam", {
                                url: y
                            }),
                            $(c).triggerHandler("jqGridToolbarAfterSearch"),
                            $.isFunction(a.afterSearch) && a.afterSearch.call(c)
                        } else if ($.isFunction(n))
                            n.call(c, m[1]);
                        else {
                            var A = $.jgrid.getRegional(c, "errors");
                            $.jgrid.info_dialog(A.errcap, m[1], "", {
                                styleUI: c.p.styleUI
                            })
                        }
                    }, k = function(b) {
                        var d, e = {}, f = 0;
                        b = "boolean" != typeof b || b,
                        $.each(c.p.colModel, function() {
                            var a, b = $("#gs_" + c.p.idPrefix + $.jgrid.jqID(this.name), !0 === this.frozen && !0 === c.p.frozenColumns ? c.grid.fhDiv : c.grid.hDiv);
                            switch (this.searchoptions && void 0 !== this.searchoptions.defaultValue && (a = this.searchoptions.defaultValue),
                            d = this.index || this.name,
                            this.stype) {
                            case "select":
                                if (b.find("option").each(function(b) {
                                    if (0 === b && (this.selected = !0),
                                    $(this).val() === a)
                                        return this.selected = !0,
                                        !1
                                }),
                                void 0 !== a)
                                    e[d] = a,
                                    f++;
                                else
                                    try {
                                        delete c.p.postData[d]
                                    } catch (a) {}
                                break;
                            case "text":
                                if (b.val(a || ""),
                                void 0 !== a)
                                    e[d] = a,
                                    f++;
                                else
                                    try {
                                        delete c.p.postData[d]
                                    } catch (a) {}
                                break;
                            case "custom":
                                $.isFunction(this.searchoptions.custom_value) && b.length > 0 && this.searchoptions.custom_value.call(c, b, "set", a || "")
                            }
                        });
                        var g = f > 0;
                        if (c.p.resetsearch = !0,
                        !0 === a.stringResult || "local" === c.p.datatype) {
                            var h = '{"groupOp":"' + a.groupOp + '","rules":['
                              , i = 0;
                            $.each(e, function(a, b) {
                                i > 0 && (h += ","),
                                h += '{"field":"' + a + '",',
                                h += '"op":"eq",',
                                b += "",
                                h += '"data":"' + b.replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"}',
                                i++
                            }),
                            h += "]}",
                            $.extend(c.p.postData, {
                                filters: h
                            }),
                            $.each(["searchField", "searchString", "searchOper"], function(a, b) {
                                c.p.postData.hasOwnProperty(b) && delete c.p.postData[b]
                            })
                        } else
                            $.extend(c.p.postData, e);
                        var j;
                        a.url && (j = c.p.url,
                        $(c).jqGrid("setGridParam", {
                            url: a.url
                        }));
                        var k = "stop" === $(c).triggerHandler("jqGridToolbarBeforeClear");
                        !k && $.isFunction(a.beforeClear) && (k = a.beforeClear.call(c)),
                        k || b && $(c).jqGrid("setGridParam", {
                            search: g
                        }).trigger("reloadGrid", [{
                            page: 1
                        }]),
                        j && $(c).jqGrid("setGridParam", {
                            url: j
                        }),
                        $(c).triggerHandler("jqGridToolbarAfterClear"),
                        $.isFunction(a.afterClear) && a.afterClear()
                    }, l = function() {
                        var a = $("tr.ui-search-toolbar", c.grid.hDiv);
                        !0 === c.p.frozenColumns && $(c).jqGrid("destroyFrozenColumns"),
                        "none" === a.css("display") ? a.show() : a.hide(),
                        !0 === c.p.frozenColumns && $(c).jqGrid("setFrozenColumns")
                    }, m = function(b, d, e) {
                        $("#sopt_menu").remove(),
                        d = parseInt(d, 10),
                        e = parseInt(e, 10) + 18;
                        for (var f, i, k = $(".ui-jqgrid").css("font-size") || "11px", l = '<ul id="sopt_menu" class="ui-search-menu modal-content" role="menu" tabindex="0" style="font-size:' + k + ";left:" + d + "px;top:" + e + 'px;">', m = $(b).attr("soper"), n = [], o = 0, p = $(b).attr("colname"), q = c.p.colModel.length; o < q && c.p.colModel[o].name !== p; )
                            o++;
                        var r = c.p.colModel[o]
                          , s = $.extend({}, r.searchoptions);
                        for (s.sopt || (s.sopt = [],
                        s.sopt[0] = "select" === r.stype ? "eq" : a.defaultSearch),
                        $.each(a.odata, function() {
                            n.push(this.oper)
                        }),
                        o = 0; o < s.sopt.length; o++)
                            -1 !== (i = $.inArray(s.sopt[o], n)) && (f = m === a.odata[i].oper ? h.highlight : "",
                            l += '<li class="ui-menu-item ' + f + '" role="presentation"><a class="' + h.cornerall + ' g-menu-item" tabindex="0" role="menuitem" value="' + a.odata[i].oper + '" oper="' + a.operands[a.odata[i].oper] + '"><table class="ui-common-table"><tr><td width="25px">' + a.operands[a.odata[i].oper] + "</td><td>" + a.odata[i].text + "</td></tr></table></a></li>");
                        l += "</ul>",
                        $("body").append(l),
                        $("#sopt_menu").addClass("ui-menu " + g.menu_widget),
                        $("#sopt_menu > li > a").hover(function() {
                            $(this).addClass(h.hover)
                        }, function() {
                            $(this).removeClass(h.hover)
                        }).click(function() {
                            var d = $(this).attr("value")
                              , e = $(this).attr("oper");
                            if ($(c).triggerHandler("jqGridToolbarSelectOper", [d, e, b]),
                            $("#sopt_menu").hide(),
                            $(b).text(e).attr("soper", d),
                            !0 === a.autosearch) {
                                var f = $(b).parent().next().children()[0];
                                ($(f).val() || "nu" === d || "nn" === d) && j()
                            }
                        })
                    }, n = $("<tr class='ui-search-toolbar' role='row'></tr>");
                    a.restoreFromFilters && (f = c.p.postData.filters) && ("string" == typeof f && (f = $.jgrid.parse(f)),
                    e = !!f.rules.length && f.rules),
                    $.each(c.p.colModel, function(b) {
                        var f, h, k, l, m, o, p, q, r = this, s = "", t = "=", u = $("<th role='columnheader' class='" + i.headerBox + " ui-th-" + c.p.direction + "' id='gsh_" + c.p.id + "_" + r.name + "' ></th>"), v = $("<div></div>"), w = $("<table class='ui-search-table' cellspacing='0'><tr><td class='ui-search-oper' headers=''></td><td class='ui-search-input' headers=''></td><td class='ui-search-clear' headers=''></td></tr></table>");
                        if (!0 === this.hidden && $(u).css("display", "none"),
                        this.search = !1 !== this.search,
                        void 0 === this.stype && (this.stype = "text"),
                        this.searchoptions = this.searchoptions || {},
                        void 0 === this.searchoptions.searchOperMenu && (this.searchoptions.searchOperMenu = !0),
                        f = $.extend({}, this.searchoptions, {
                            name: r.index || r.name,
                            id: "gs_" + c.p.idPrefix + r.name,
                            oper: "search"
                        }),
                        this.search) {
                            if (a.restoreFromFilters && e) {
                                q = !1;
                                for (var x = 0; x < e.length; x++)
                                    if (e[x].field) {
                                        var y = r.index || r.name;
                                        if (y === e[x].field) {
                                            q = e[x];
                                            break
                                        }
                                    }
                            }
                            if (a.searchOperators) {
                                for (h = f.sopt ? f.sopt[0] : "select" === r.stype ? "eq" : a.defaultSearch,
                                a.restoreFromFilters && q && (h = q.op),
                                k = 0; k < a.odata.length; k++)
                                    if (a.odata[k].oper === h) {
                                        t = a.operands[h] || "";
                                        break
                                    }
                                l = null != f.searchtitle ? f.searchtitle : a.operandTitle,
                                s = this.searchoptions.searchOperMenu ? "<a title='" + l + "' style='padding-right: 0.5em;' soper='" + h + "' class='soptclass' colname='" + this.name + "'>" + t + "</a>" : ""
                            }
                            switch ($("td:eq(0)", w).attr("colindex", b).append(s),
                            void 0 === f.clearSearch && (f.clearSearch = !0),
                            f.clearSearch ? (m = a.resetTitle || "Clear Search Value",
                            $("td:eq(2)", w).append("<a title='" + m + "' style='padding-right: 0.3em;padding-left: 0.3em;' class='clearsearchclass'>" + a.resetIcon + "</a>")) : $("td:eq(2)", w).hide(),
                            this.surl && (f.dataUrl = this.surl),
                            o = "",
                            f.defaultValue && (o = $.isFunction(f.defaultValue) ? f.defaultValue.call(c) : f.defaultValue),
                            a.restoreFromFilters && q && (o = q.data),
                            p = $.jgrid.createEl.call(c, this.stype, f, o, !1, $.extend({}, $.jgrid.ajaxOptions, c.p.ajaxSelectOptions || {})),
                            $(p).addClass(g.srInput),
                            $("td:eq(1)", w).append(p),
                            $(v).append(w),
                            null == f.dataEvents && (f.dataEvents = []),
                            this.stype) {
                            case "select":
                                !0 === a.autosearch && f.dataEvents.push({
                                    type: "change",
                                    fn: function() {
                                        return j(),
                                        !1
                                    }
                                });
                                break;
                            case "text":
                                !0 === a.autosearch && (a.searchOnEnter ? f.dataEvents.push({
                                    type: "keypress",
                                    fn: function(a) {
                                        return 13 === (a.charCode || a.keyCode || 0) ? (j(),
                                        !1) : this
                                    }
                                }) : f.dataEvents.push({
                                    type: "keydown",
                                    fn: function(b) {
                                        switch (b.which) {
                                        case 13:
                                            return !1;
                                        case 9:
                                        case 16:
                                        case 37:
                                        case 38:
                                        case 39:
                                        case 40:
                                        case 27:
                                            break;
                                        default:
                                            d && clearTimeout(d),
                                            d = setTimeout(function() {
                                                j()
                                            }, a.autosearchDelay)
                                        }
                                    }
                                }))
                            }
                            $.jgrid.bindEv.call(c, p, f)
                        }
                        $(u).append(v),
                        $(n).append(u),
                        a.searchOperators && "" !== s || $("td:eq(0)", w).hide()
                    }),
                    $("table thead", c.grid.hDiv).append(n),
                    a.searchOperators && ($(".soptclass", n).click(function(a) {
                        var b = $(this).offset()
                          , c = b.left
                          , d = b.top;
                        m(this, c, d),
                        a.stopPropagation()
                    }),
                    $("body").on("click", function(a) {
                        "soptclass" !== a.target.className && $("#sopt_menu").remove()
                    })),
                    $(".clearsearchclass", n).click(function() {
                        var b, d = $(this).parents("tr:first"), e = parseInt($("td.ui-search-oper", d).attr("colindex"), 10), f = $.extend({}, c.p.colModel[e].searchoptions || {}), g = f.defaultValue ? f.defaultValue : "";
                        "select" === c.p.colModel[e].stype ? (b = $("td.ui-search-input select", d),
                        g ? b.val(g) : b[0].selectedIndex = 0) : (b = $("td.ui-search-input input", d),
                        b.val(g)),
                        $(c).triggerHandler("jqGridToolbarClearVal", [b[0], e, f, g]),
                        $.isFunction(a.onClearSearchValue) && a.onClearSearchValue.call(c, b[0], e, f, g),
                        !0 === a.autosearch && j()
                    }),
                    this.p.filterToolbar = !0,
                    this.triggerToolbar = j,
                    this.clearToolbar = k,
                    this.toggleToolbar = l
                }
            })
        },
        destroyFilterToolbar: function() {
            return this.each(function() {
                this.p.filterToolbar && (this.triggerToolbar = null,
                this.clearToolbar = null,
                this.toggleToolbar = null,
                this.p.filterToolbar = !1,
                $(this.grid.hDiv).find("table thead tr.ui-search-toolbar").remove())
            })
        },
        refreshFilterToolbar: function(a) {
            return a = $.extend(!0, {
                filters: "",
                onClearVal: null,
                onSetVal: null
            }, a || {}),
            this.each(function() {
                function b(f) {
                    if (f && f.rules) {
                        for (g = f.rules,
                        l = g.length,
                        c = 0; c < l; c++)
                            if (h = g[c],
                            -1 !== (i = $.inArray(h.field, m)) && (e = $("#gs_" + j.p.idPrefix + $.jgrid.jqID(k[i].name)),
                            e.length > 0 && ("select" === k[i].stype ? e.find("option[value='" + $.jgrid.jqID(h.data) + "']").prop("selected", !0) : "text" === k[i].stype && e.val(h.data),
                            $.isFunction(a.onSetVal) && a.onSetVal.call(j, e, k[i].name),
                            d && d.searchOperators))) {
                                var n = e.parent().prev();
                                n.hasClass("ui-search-oper") && ($(".soptclass", n).attr("soper", h.op),
                                d.operands.hasOwnProperty(h.op) && $(".soptclass", n).html(d.operands[h.op]))
                            }
                        if (f.groups)
                            for (var o = 0; o < f.groups.length; o++)
                                b(f.groups[o])
                    }
                }
                var c, d, e, f, g, h, i, j = this, k = j.p.colModel, l = j.p.colModel.length, m = [];
                if (j.p.filterToolbar) {
                    for (d = $(j).data("filterToolbar"),
                    c = 0; c < l; c++) {
                        switch (m.push(k[c].name),
                        e = $("#gs_" + j.p.idPrefix + $.jgrid.jqID(k[c].name)),
                        k[c].stype) {
                        case "select":
                        case "text":
                            e.val("")
                        }
                        $.isFunction(a.onClearVal) && a.onClearVal.call(j, e, k[c].name)
                    }
                    "string" == typeof a.filters && (a.filters.length ? f = a.filters : j.p.postData.hasOwnProperty("filters") && (f = j.p.postData.filters),
                    f = $.jgrid.parse(f)),
                    $.isPlainObject(f) && b(f)
                }
            })
        },
        searchGrid: function(a) {
            var b = $.jgrid.getRegional(this[0], "search");
            return a = $.extend(!0, {
                recreateFilter: !1,
                drag: !0,
                sField: "searchField",
                sValue: "searchString",
                sOper: "searchOper",
                sFilter: "filters",
                loadDefaults: !0,
                beforeShowSearch: null,
                afterShowSearch: null,
                onInitializeSearch: null,
                afterRedraw: null,
                afterChange: null,
                sortStrategy: null,
                closeAfterSearch: !1,
                closeAfterReset: !1,
                closeOnEscape: !1,
                searchOnEnter: !1,
                multipleSearch: !1,
                multipleGroup: !1,
                top: 0,
                left: 0,
                jqModal: !0,
                modal: !1,
                resize: !0,
                width: 450,
                height: "auto",
                dataheight: "auto",
                showQuery: !1,
                errorcheck: !0,
                sopt: null,
                stringResult: void 0,
                onClose: null,
                onSearch: null,
                onReset: null,
                toTop: !0,
                overlay: 30,
                columns: [],
                tmplNames: null,
                tmplFilters: null,
                tmplLabel: " Template: ",
                showOnLoad: !1,
                layer: null,
                splitSelect: ",",
                groupOpSelect: "OR",
                operands: {
                    eq: "=",
                    ne: "<>",
                    lt: "<",
                    le: "<=",
                    gt: ">",
                    ge: ">=",
                    bw: "LIKE",
                    bn: "NOT LIKE",
                    in: "IN",
                    ni: "NOT IN",
                    ew: "LIKE",
                    en: "NOT LIKE",
                    cn: "LIKE",
                    nc: "NOT LIKE",
                    nu: "IS NULL",
                    nn: "ISNOT NULL"
                },
                buttons: []
            }, b, a || {}),
            this.each(function() {
                function b(b) {
                    f = $(c).triggerHandler("jqGridFilterBeforeShow", [b]),
                    void 0 === f && (f = !0),
                    f && $.isFunction(a.beforeShowSearch) && (f = a.beforeShowSearch.call(c, b)),
                    f && ($.jgrid.viewModal("#" + $.jgrid.jqID(h.themodal), {
                        gbox: "#gbox_" + $.jgrid.jqID(c.p.id),
                        jqm: a.jqModal,
                        modal: a.modal,
                        overlay: a.overlay,
                        toTop: a.toTop
                    }),
                    $(c).triggerHandler("jqGridFilterAfterShow", [b]),
                    $.isFunction(a.afterShowSearch) && a.afterShowSearch.call(c, b))
                }
                var c = this;
                if (c.grid) {
                    var d, e = "fbox_" + c.p.id, f = !0, g = !0, h = {
                        themodal: "searchmod" + e,
                        modalhead: "searchhd" + e,
                        modalcontent: "searchcnt" + e,
                        scrollelm: e
                    }, i = $.isPlainObject(c.p_savedFilter) && !$.isEmptyObject(c.p_savedFilter) ? c.p_savedFilter : c.p.postData[a.sFilter], j = $.jgrid.styleUI[c.p.styleUI || "jQueryUI"].filter, k = $.jgrid.styleUI[c.p.styleUI || "jQueryUI"].common;
                    if (a.styleUI = c.p.styleUI,
                    "string" == typeof i && (i = $.jgrid.parse(i)),
                    !0 === a.recreateFilter && $("#" + $.jgrid.jqID(h.themodal)).remove(),
                    void 0 !== $("#" + $.jgrid.jqID(h.themodal))[0])
                        b($("#fbox_" + $.jgrid.jqID(c.p.id)));
                    else {
                        var l = $("<div><div id='" + e + "' class='searchFilter' style='overflow:auto'></div></div>").insertBefore("#gview_" + $.jgrid.jqID(c.p.id))
                          , m = "left"
                          , n = "";
                        "rtl" === c.p.direction && (m = "right",
                        n = " style='text-align:left'",
                        l.attr("dir", "rtl"));
                        var o, p, q = $.extend([], c.p.colModel), r = "<a id='" + e + "_search' class='fm-button " + k.button + " fm-button-icon-right ui-search'><span class='" + k.icon_base + " " + j.icon_search + "'></span>" + a.Find + "</a>", s = "<a id='" + e + "_reset' class='fm-button " + k.button + " fm-button-icon-left ui-reset'><span class='" + k.icon_base + " " + j.icon_reset + "'></span>" + a.Reset + "</a>", t = "", u = "", v = !1, w = -1, x = !1, y = [];
                        a.showQuery && (t = "<a id='" + e + "_query' class='fm-button " + k.button + " fm-button-icon-left'><span class='" + k.icon_base + " " + j.icon_query + "'></span>Query</a>");
                        var z = $.jgrid.buildButtons(a.buttons, t + r, k);
                        if (a.columns.length ? (q = a.columns,
                        w = 0,
                        o = q[0].index || q[0].name) : $.each(q, function(a, b) {
                            if (b.label || (b.label = c.p.colNames[a]),
                            !v) {
                                var d = void 0 === b.search || b.search
                                  , e = !0 === b.hidden;
                                (b.searchoptions && !0 === b.searchoptions.searchhidden && d || d && !e) && (v = !0,
                                o = b.index || b.name,
                                w = a)
                            }
                            "select" === b.stype && b.searchoptions && b.searchoptions.multiple && (x = !0,
                            y.push(b.index || b.name))
                        }),
                        !i && o || !1 === a.multipleSearch) {
                            var A = "eq";
                            w >= 0 && q[w].searchoptions && q[w].searchoptions.sopt ? A = q[w].searchoptions.sopt[0] : a.sopt && a.sopt.length && (A = a.sopt[0]),
                            i = {
                                groupOp: "AND",
                                rules: [{
                                    field: o,
                                    op: A,
                                    data: ""
                                }]
                            }
                        }
                        v = !1,
                        a.tmplNames && a.tmplNames.length && (v = !0,
                        u = "<tr><td class='ui-search-label'>" + a.tmplLabel + "</td>",
                        u += "<td><select size='1' class='ui-template " + j.srSelect + "'>",
                        u += "<option value='default'>Default</option>",
                        $.each(a.tmplNames, function(a, b) {
                            u += "<option value='" + a + "'>" + b + "</option>"
                        }),
                        u += "</select></td></tr>"),
                        p = "<table class='EditTable' style='border:0px none;margin-top:5px' id='" + e + "_2'><tbody><tr><td colspan='2'><hr class='" + k.content + "' style='margin:1px'/></td></tr>" + u + "<tr><td class='EditButton' style='text-align:" + m + "'>" + s + "</td><td class='EditButton' " + n + ">" + z + "</td></tr></tbody></table>",
                        e = $.jgrid.jqID(e),
                        $("#" + e).jqFilter({
                            columns: q,
                            sortStrategy: a.sortStrategy,
                            filter: a.loadDefaults ? i : null,
                            showQuery: a.showQuery,
                            errorcheck: a.errorcheck,
                            sopt: a.sopt,
                            groupButton: a.multipleGroup,
                            ruleButtons: a.multipleSearch,
                            uniqueSearchFields: a.uniqueSearchFields,
                            afterRedraw: a.afterRedraw,
                            ops: a.odata,
                            operands: a.operands,
                            ajaxSelectOptions: c.p.ajaxSelectOptions,
                            groupOps: a.groupOps,
                            addsubgrup: a.addsubgrup,
                            addrule: a.addrule,
                            delgroup: a.delgroup,
                            delrule: a.delrule,
                            autoencode: c.p.autoencode,
                            onChange: function() {
                                this.p.showQuery && $(".query", this).html(this.toUserFriendlyString()),
                                $.isFunction(a.afterChange) && a.afterChange.call(c, $("#" + e), a)
                            },
                            direction: c.p.direction,
                            id: c.p.id
                        }),
                        l.append(p),
                        $("#" + e + "_2").find("[data-index]").each(function() {
                            var b = parseInt($(this).attr("data-index"), 10);
                            b >= 0 && $(this).on("click", function(d) {
                                a.buttons[b].click.call(c, $("#" + e), a, d)
                            })
                        }),
                        v && a.tmplFilters && a.tmplFilters.length && $(".ui-template", l).on("change", function() {
                            var b = $(this).val();
                            return "default" === b ? $("#" + e).jqFilter("addFilter", i) : $("#" + e).jqFilter("addFilter", a.tmplFilters[parseInt(b, 10)]),
                            !1
                        }),
                        !0 === a.multipleGroup && (a.multipleSearch = !0),
                        $(c).triggerHandler("jqGridFilterInitialize", [$("#" + e)]),
                        $.isFunction(a.onInitializeSearch) && a.onInitializeSearch.call(c, $("#" + e)),
                        a.gbox = "#gbox_" + e;
                        var B = $(".ui-jqgrid").css("font-size") || "11px";
                        a.layer ? $.jgrid.createModal(h, l, a, "#gview_" + $.jgrid.jqID(c.p.id), $("#gbox_" + $.jgrid.jqID(c.p.id))[0], "string" == typeof a.layer ? "#" + $.jgrid.jqID(a.layer) : a.layer, "string" == typeof a.layer ? {
                            position: "relative",
                            "font-size": B
                        } : {
                            "font-size": B
                        }) : $.jgrid.createModal(h, l, a, "#gview_" + $.jgrid.jqID(c.p.id), $("#gbox_" + $.jgrid.jqID(c.p.id))[0], null, {
                            "font-size": B
                        }),
                        (a.searchOnEnter || a.closeOnEscape) && $("#" + $.jgrid.jqID(h.themodal)).keydown(function(b) {
                            var c = $(b.target);
                            return !a.searchOnEnter || 13 !== b.which || c.hasClass("add-group") || c.hasClass("add-rule") || c.hasClass("delete-group") || c.hasClass("delete-rule") || c.hasClass("fm-button") && c.is("[id$=_query]") ? a.closeOnEscape && 27 === b.which ? ($("#" + $.jgrid.jqID(h.modalhead)).find(".ui-jqdialog-titlebar-close").click(),
                            !1) : void 0 : ($("#" + e + "_search").click(),
                            !1)
                        }),
                        t && $("#" + e + "_query").on("click", function() {
                            return $(".queryresult", l).toggle(),
                            !1
                        }),
                        void 0 === a.stringResult && (a.stringResult = a.multipleSearch),
                        $("#" + e + "_search").on("click", function() {
                            var b, f, i = {};
                            if (d = $("#" + e),
                            d.find(".input-elm:focus").change(),
                            x && a.multipleSearch ? (c.p_savedFilter = {},
                            f = $.jgrid.filterRefactor({
                                ruleGroup: $.extend(!0, {}, d.jqFilter("filterData")),
                                ssfield: y,
                                splitSelect: a.splitSelect,
                                groupOpSelect: a.groupOpSelect
                            }),
                            c.p_savedFilter = $.extend(!0, {}, d.jqFilter("filterData"))) : f = d.jqFilter("filterData"),
                            a.errorcheck && (d[0].hideError(),
                            a.showQuery || d.jqFilter("toSQLString"),
                            d[0].p.error))
                                return d[0].showError(),
                                !1;
                            if (a.stringResult) {
                                try {
                                    b = JSON.stringify(f)
                                } catch (a) {}
                                "string" == typeof b && (i[a.sFilter] = b,
                                $.each([a.sField, a.sValue, a.sOper], function() {
                                    i[this] = ""
                                }))
                            } else
                                a.multipleSearch ? (i[a.sFilter] = f,
                                $.each([a.sField, a.sValue, a.sOper], function() {
                                    i[this] = ""
                                })) : (i[a.sField] = f.rules[0].field,
                                i[a.sValue] = f.rules[0].data,
                                i[a.sOper] = f.rules[0].op,
                                i[a.sFilter] = "");
                            return c.p.search = !0,
                            $.extend(c.p.postData, i),
                            g = $(c).triggerHandler("jqGridFilterSearch"),
                            void 0 === g && (g = !0),
                            g && $.isFunction(a.onSearch) && (g = a.onSearch.call(c, c.p.filters)),
                            !1 !== g && $(c).trigger("reloadGrid", [{
                                page: 1
                            }]),
                            a.closeAfterSearch && $.jgrid.hideModal("#" + $.jgrid.jqID(h.themodal), {
                                gb: "#gbox_" + $.jgrid.jqID(c.p.id),
                                jqm: a.jqModal,
                                onClose: a.onClose
                            }),
                            !1
                        }),
                        $("#" + e + "_reset").on("click", function() {
                            var b = {}
                              , d = $("#" + e);
                            return c.p.search = !1,
                            c.p.resetsearch = !0,
                            !1 === a.multipleSearch ? b[a.sField] = b[a.sValue] = b[a.sOper] = "" : b[a.sFilter] = "",
                            d[0].resetFilter(),
                            v && $(".ui-template", l).val("default"),
                            $.extend(c.p.postData, b),
                            g = $(c).triggerHandler("jqGridFilterReset"),
                            void 0 === g && (g = !0),
                            g && $.isFunction(a.onReset) && (g = a.onReset.call(c)),
                            !1 !== g && $(c).trigger("reloadGrid", [{
                                page: 1
                            }]),
                            a.closeAfterReset && $.jgrid.hideModal("#" + $.jgrid.jqID(h.themodal), {
                                gb: "#gbox_" + $.jgrid.jqID(c.p.id),
                                jqm: a.jqModal,
                                onClose: a.onClose
                            }),
                            !1
                        }),
                        b($("#" + e)),
                        $(".fm-button:not(." + k.disabled + ")", l).hover(function() {
                            $(this).addClass(k.hover)
                        }, function() {
                            $(this).removeClass(k.hover)
                        })
                    }
                }
            })
        },
        filterInput: function(a, b) {
            return b = $.extend(!0, {
                defaultSearch: "cn",
                groupOp: "OR",
                searchAll: !1,
                beforeSearch: null,
                afterSearch: null
            }, b || {}),
            this.each(function() {
                var c = this;
                if (c.grid) {
                    var d, e, f, g = '{"groupOp":"' + b.groupOp + '","rules":[', h = 0;
                    if (a += "",
                    "local" === c.p.datatype) {
                        $.each(c.p.colModel, function() {
                            d = this.index || this.name,
                            e = this.searchoptions || {},
                            f = b.defaultSearch ? b.defaultSearch : e.sopt ? e.sopt[0] : b.defaultSearch,
                            this.search = !1 !== this.search,
                            (this.search || b.searchAll) && (h > 0 && (g += ","),
                            g += '{"field":"' + d + '",',
                            g += '"op":"' + f + '",',
                            g += '"data":"' + a.replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"}',
                            h++)
                        }),
                        g += "]}",
                        $.extend(c.p.postData, {
                            filters: g
                        }),
                        $.each(["searchField", "searchString", "searchOper"], function(a, b) {
                            c.p.postData.hasOwnProperty(b) && delete c.p.postData[b]
                        });
                        var i = "stop" === $(c).triggerHandler("jqGridFilterInputBeforeSearch");
                        !i && $.isFunction(b.beforeSearch) && (i = b.beforeSearch.call(c)),
                        i || $(c).jqGrid("setGridParam", {
                            search: !0
                        }).trigger("reloadGrid", [{
                            page: 1
                        }]),
                        $(c).triggerHandler("jqGridFilterInputAfterSearch"),
                        $.isFunction(b.afterSearch) && b.afterSearch.call(c)
                    }
                }
            })
        }
    });
    var rp_ge = {};
    if ($.jgrid.extend({
        editGridRow: function(a, b) {
            var c = $.jgrid.getRegional(this[0], "edit")
              , d = this[0].p.styleUI
              , e = $.jgrid.styleUI[d].formedit
              , f = $.jgrid.styleUI[d].common;
            return b = $.extend(!0, {
                top: 0,
                left: 0,
                width: "500",
                datawidth: "auto",
                height: "auto",
                dataheight: "auto",
                modal: !1,
                overlay: 30,
                drag: !0,
                resize: !0,
                url: null,
                mtype: "POST",
                clearAfterAdd: !0,
                closeAfterEdit: !1,
                reloadAfterSubmit: !0,
                onInitializeForm: null,
                beforeInitData: null,
                beforeShowForm: null,
                afterShowForm: null,
                beforeSubmit: null,
                afterSubmit: null,
                onclickSubmit: null,
                afterComplete: null,
                onclickPgButtons: null,
                afterclickPgButtons: null,
                editData: {},
                recreateForm: !1,
                jqModal: !0,
                closeOnEscape: !1,
                addedrow: "first",
                topinfo: "",
                bottominfo: "",
                saveicon: [],
                closeicon: [],
                savekey: [!1, 13],
                navkeys: [!1, 38, 40],
                checkOnSubmit: !1,
                checkOnUpdate: !1,
                processing: !1,
                onClose: null,
                ajaxEditOptions: {},
                serializeEditData: null,
                viewPagerButtons: !0,
                overlayClass: f.overlay,
                removemodal: !0,
                form: "edit",
                template: null,
                focusField: !0,
                editselected: !1,
                html5Check: !1,
                buttons: []
            }, c, b || {}),
            rp_ge[$(this)[0].p.id] = b,
            this.each(function() {
                function c() {
                    var a, b = {};
                    $(y).find(".FormElement").each(function() {
                        var a = $(".customelement", this);
                        if (a.length) {
                            var c = a[0]
                              , d = $(c).attr("name");
                            $.each(q.p.colModel, function() {
                                if (this.name === d && this.editoptions && $.isFunction(this.editoptions.custom_value)) {
                                    try {
                                        if (s[d] = this.editoptions.custom_value.call(q, $("#" + $.jgrid.jqID(d), y), "get"),
                                        void 0 === s[d])
                                            throw "e1"
                                    } catch (a) {
                                        "e1" === a ? $.jgrid.info_dialog(E.errcap, "function 'custom_value' " + rp_ge[$(this)[0]].p.msg.novalue, rp_ge[$(this)[0]].p.bClose, {
                                            styleUI: rp_ge[$(this)[0]].p.styleUI
                                        }) : $.jgrid.info_dialog(E.errcap, a.message, rp_ge[$(this)[0]].p.bClose, {
                                            styleUI: rp_ge[$(this)[0]].p.styleUI
                                        })
                                    }
                                    return !0
                                }
                            })
                        } else {
                            switch ($(this).get(0).type) {
                            case "checkbox":
                                if ($(this).is(":checked"))
                                    s[this.name] = $(this).val();
                                else {
                                    var e = $(this).attr("offval");
                                    s[this.name] = e
                                }
                                break;
                            case "select-one":
                                s[this.name] = $(this).val();
                                break;
                            case "select-multiple":
                                s[this.name] = $(this).val(),
                                s[this.name] = s[this.name] ? s[this.name].join(",") : "";
                                break;
                            case "radio":
                                if (b.hasOwnProperty(this.name))
                                    return !0;
                                b[this.name] = void 0 === $(this).attr("offval") ? "off" : $(this).attr("offval");
                                break;
                            default:
                                s[this.name] = $(this).val()
                            }
                            q.p.autoencode && (s[this.name] = $.jgrid.htmlEncode(s[this.name]))
                        }
                    });
                    for (a in b)
                        if (b.hasOwnProperty(a)) {
                            var c = $('input[name="' + a + '"]:checked', y).val();
                            s[a] = void 0 !== c ? c : b[a],
                            q.p.autoencode && (s[a] = $.jgrid.htmlEncode(s[a]))
                        }
                    return !0
                }
                function d(a, b, c, d) {
                    var f, g, h, i, j, k, l, m, n = 0, o = [], p = !1, r = "<td class='CaptionTD'></td><td class='DataTD'></td>", s = "";
                    for (l = 1; l <= d; l++)
                        s += r;
                    if ("_empty" !== a && (p = $(b).jqGrid("getInd", a)),
                    $(b.p.colModel).each(function(l) {
                        if (f = this.name,
                        g = (!this.editrules || !0 !== this.editrules.edithidden) && !0 === this.hidden,
                        j = g ? "style='display:none'" : "",
                        "cb" !== f && "subgrid" !== f && !0 === this.editable && "rn" !== f) {
                            if (!1 === p)
                                i = "";
                            else if (f === b.p.ExpandColumn && !0 === b.p.treeGrid)
                                i = $("td[role='gridcell']:eq(" + l + ")", b.rows[p]).text();
                            else {
                                try {
                                    i = $.unformat.call(b, $("td[role='gridcell']:eq(" + l + ")", b.rows[p]), {
                                        rowId: a,
                                        colModel: this
                                    }, l)
                                } catch (a) {
                                    i = this.edittype && "textarea" === this.edittype ? $("td[role='gridcell']:eq(" + l + ")", b.rows[p]).text() : $("td[role='gridcell']:eq(" + l + ")", b.rows[p]).html()
                                }
                                (!i || "&nbsp;" === i || "&#160;" === i || 1 === i.length && 160 === i.charCodeAt(0)) && (i = "")
                            }
                            var r = $.extend({}, this.editoptions || {}, {
                                id: f,
                                name: f,
                                rowId: a,
                                oper: "edit"
                            })
                              , t = $.extend({}, {
                                elmprefix: "",
                                elmsuffix: "",
                                rowabove: !1,
                                rowcontent: ""
                            }, this.formoptions || {})
                              , u = parseInt(t.rowpos, 10) || n + 1
                              , v = parseInt(2 * (parseInt(t.colpos, 10) || 1), 10);
                            if ("_empty" === a && r.defaultValue && (i = $.isFunction(r.defaultValue) ? r.defaultValue.call(q) : r.defaultValue),
                            this.edittype || (this.edittype = "text"),
                            q.p.autoencode && (i = $.jgrid.htmlDecode(i)),
                            k = $.jgrid.createEl.call(q, this.edittype, r, i, !1, $.extend({}, $.jgrid.ajaxOptions, b.p.ajaxSelectOptions || {})),
                            "select" === this.edittype && (i = $(k).val(),
                            "select-multiple" === $(k).get(0).type && i && (i = i.join(","))),
                            "checkbox" === this.edittype && (i = $(k).is(":checked") ? $(k).val() : $(k).attr("offval")),
                            $(k).addClass("FormElement"),
                            $.inArray(this.edittype, ["text", "textarea", "password", "select", "color", "date", "datetime", "datetime-local", "email", "month", "number", "range", "search", "tel", "time", "url", "week"]) > -1 && $(k).addClass(e.inputClass),
                            m = !0,
                            D) {
                                var x = $(J).find("#" + f);
                                x.length ? x.replaceWith(k) : m = !1
                            } else {
                                if (h = $(c).find("tr[rowpos=" + u + "]"),
                                t.rowabove) {
                                    var y = $("<tr><td class='contentinfo' colspan='" + 2 * d + "'>" + t.rowcontent + "</td></tr>");
                                    $(c).append(y),
                                    y[0].rp = u
                                }
                                0 === h.length && (h = d > 1 ? $("<tr rowpos='" + u + "'></tr>").addClass("FormData").attr("id", "tr_" + f) : $("<tr " + j + " rowpos='" + u + "'></tr>").addClass("FormData").attr("id", "tr_" + f),
                                $(h).append(s),
                                $(c).append(h),
                                h[0].rp = u),
                                $("td:eq(" + (v - 2) + ")", h[0]).html("<label for='" + f + "'>" + (void 0 === t.label ? b.p.colNames[l] : t.label) + "</label>"),
                                $("td:eq(" + (v - 1) + ")", h[0]).append(t.elmprefix).append(k).append(t.elmsuffix),
                                d > 1 && g && ($("td:eq(" + (v - 2) + ")", h[0]).hide(),
                                $("td:eq(" + (v - 1) + ")", h[0]).hide())
                            }
                            (rp_ge[q.p.id].checkOnSubmit || rp_ge[q.p.id].checkOnUpdate) && m && (q.p.savedData[f] = i),
                            "custom" === this.edittype && $.isFunction(r.custom_value) && r.custom_value.call(q, $("#" + f, w), "set", i),
                            $.jgrid.bindEv.call(q, k, r),
                            o[n] = l,
                            n++
                        }
                    }),
                    n > 0) {
                        var t;
                        D ? (t = "<div class='FormData' style='display:none'><input class='FormElement' id='id_g' type='text' name='" + b.p.id + "_id' value='" + a + "'/>",
                        $(J).append(t)) : (t = $("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='" + (2 * d - 1) + "' class='DataTD'><input class='FormElement' id='id_g' type='text' name='" + b.p.id + "_id' value='" + a + "'/></td></tr>"),
                        t[0].rp = n + 999,
                        $(c).append(t)),
                        (rp_ge[q.p.id].checkOnSubmit || rp_ge[q.p.id].checkOnUpdate) && (q.p.savedData[b.p.id + "_id"] = a)
                    }
                    return o
                }
                function g(a, b, c) {
                    var d, e, f, g, h, i, j = 0;
                    (rp_ge[q.p.id].checkOnSubmit || rp_ge[q.p.id].checkOnUpdate) && (q.p.savedData = {},
                    q.p.savedData[b.p.id + "_id"] = a);
                    var k = b.p.colModel;
                    if ("_empty" === a)
                        return $(k).each(function() {
                            d = this.name,
                            g = $.extend({}, this.editoptions || {}),
                            (f = $("#" + $.jgrid.jqID(d), c)) && f.length && null !== f[0] && (h = "",
                            "custom" === this.edittype && $.isFunction(g.custom_value) ? g.custom_value.call(q, $("#" + d, c), "set", h) : g.defaultValue ? (h = $.isFunction(g.defaultValue) ? g.defaultValue.call(q) : g.defaultValue,
                            "checkbox" === f[0].type ? (i = h.toLowerCase(),
                            i.search(/(false|f|0|no|n|off|undefined)/i) < 0 && "" !== i ? (f[0].checked = !0,
                            f[0].defaultChecked = !0,
                            f[0].value = h) : (f[0].checked = !1,
                            f[0].defaultChecked = !1)) : f.val(h)) : "checkbox" === f[0].type ? (f[0].checked = !1,
                            f[0].defaultChecked = !1,
                            h = $(f).attr("offval")) : f[0].type && "select" === f[0].type.substr(0, 6) ? f[0].selectedIndex = 0 : f.val(h),
                            (!0 === rp_ge[q.p.id].checkOnSubmit || rp_ge[q.p.id].checkOnUpdate) && (q.p.savedData[d] = h))
                        }),
                        void $("#id_g", c).val(a);
                    var l = $(b).jqGrid("getInd", a, !0);
                    l && ($('td[role="gridcell"]', l).each(function(f) {
                        if ("cb" !== (d = k[f].name) && "subgrid" !== d && "rn" !== d && !0 === k[f].editable) {
                            if (d === b.p.ExpandColumn && !0 === b.p.treeGrid)
                                e = $(this).text();
                            else
                                try {
                                    e = $.unformat.call(b, $(this), {
                                        rowId: a,
                                        colModel: k[f]
                                    }, f)
                                } catch (a) {
                                    e = "textarea" === k[f].edittype ? $(this).text() : $(this).html()
                                }
                            switch (q.p.autoencode && (e = $.jgrid.htmlDecode(e)),
                            (!0 === rp_ge[q.p.id].checkOnSubmit || rp_ge[q.p.id].checkOnUpdate) && (q.p.savedData[d] = e),
                            d = $.jgrid.jqID(d),
                            k[f].edittype) {
                            case "select":
                                var g = e.split(",");
                                g = $.map(g, function(a) {
                                    return $.trim(a)
                                }),
                                $("#" + d + " option", c).each(function() {
                                    k[f].editoptions.multiple || $.trim(e) !== $.trim($(this).text()) && g[0] !== $.trim($(this).text()) && g[0] !== $.trim($(this).val()) ? k[f].editoptions.multiple && ($.inArray($.trim($(this).text()), g) > -1 || $.inArray($.trim($(this).val()), g) > -1) ? this.selected = !0 : this.selected = !1 : this.selected = !0
                                }),
                                (!0 === rp_ge[q.p.id].checkOnSubmit || rp_ge[q.p.id].checkOnUpdate) && (e = $("#" + d, c).val(),
                                k[f].editoptions.multiple && (e = e.join(",")),
                                q.p.savedData[d] = e);
                                break;
                            case "checkbox":
                                if (e = String(e),
                                k[f].editoptions && k[f].editoptions.value) {
                                    k[f].editoptions.value.split(":")[0] === e ? $("#" + d, c)[q.p.useProp ? "prop" : "attr"]({
                                        checked: !0,
                                        defaultChecked: !0
                                    }) : $("#" + d, c)[q.p.useProp ? "prop" : "attr"]({
                                        checked: !1,
                                        defaultChecked: !1
                                    })
                                } else
                                    e = e.toLowerCase(),
                                    e.search(/(false|f|0|no|n|off|undefined)/i) < 0 && "" !== e ? ($("#" + d, c)[q.p.useProp ? "prop" : "attr"]("checked", !0),
                                    $("#" + d, c)[q.p.useProp ? "prop" : "attr"]("defaultChecked", !0)) : ($("#" + d, c)[q.p.useProp ? "prop" : "attr"]("checked", !1),
                                    $("#" + d, c)[q.p.useProp ? "prop" : "attr"]("defaultChecked", !1));
                                (!0 === rp_ge[q.p.id].checkOnSubmit || rp_ge[q.p.id].checkOnUpdate) && (e = $("#" + d, c).is(":checked") ? $("#" + d, c).val() : $("#" + d, c).attr("offval"),
                                q.p.savedData[d] = e);
                                break;
                            case "custom":
                                try {
                                    if (!k[f].editoptions || !$.isFunction(k[f].editoptions.custom_value))
                                        throw "e1";
                                    k[f].editoptions.custom_value.call(q, $("#" + d, c), "set", e)
                                } catch (a) {
                                    "e1" === a ? $.jgrid.info_dialog(E.errcap, "function 'custom_value' " + rp_ge[$(this)[0]].p.msg.nodefined, $.rp_ge[$(this)[0]].p.bClose, {
                                        styleUI: rp_ge[$(this)[0]].p.styleUI
                                    }) : $.jgrid.info_dialog(E.errcap, a.message, $.rp_ge[$(this)[0]].p.bClose, {
                                        styleUI: rp_ge[$(this)[0]].p.styleUI
                                    })
                                }
                                break;
                            default:
                                ("&nbsp;" === e || "&#160;" === e || 1 === e.length && 160 === e.charCodeAt(0)) && (e = ""),
                                $("#" + d, c).val(e)
                            }
                            j++
                        }
                    }),
                    j > 0 && ($("#id_g", y).val(a),
                    (!0 === rp_ge[q.p.id].checkOnSubmit || rp_ge[q.p.id].checkOnUpdate) && (q.p.savedData[b.p.id + "_id"] = a)))
                }
                function h() {
                    $.each(q.p.colModel, function(a, b) {
                        b.editoptions && !0 === b.editoptions.NullIfEmpty && s.hasOwnProperty(b.name) && "" === s[b.name] && (s[b.name] = "null")
                    })
                }
                function i() {
                    var a, c, d, e, i, j, k, l = [!0, "", ""], m = {}, n = q.p.prmNames, o = $(q).triggerHandler("jqGridAddEditBeforeCheckValues", [s, $(w), u]);
                    if (o && "object" == typeof o && (s = o),
                    $.isFunction(rp_ge[q.p.id].beforeCheckValues) && (o = rp_ge[q.p.id].beforeCheckValues.call(q, s, $(w), u)) && "object" == typeof o && (s = o),
                    rp_ge[q.p.id].html5Check && !$.jgrid.validateForm(J[0]))
                        return !1;
                    for (e in s)
                        if (s.hasOwnProperty(e) && (l = $.jgrid.checkValues.call(q, s[e], e),
                        !1 === l[0]))
                            break;
                    if (h(),
                    l[0] && (m = $(q).triggerHandler("jqGridAddEditClickSubmit", [rp_ge[q.p.id], s, u]),
                    void 0 === m && $.isFunction(rp_ge[q.p.id].onclickSubmit) && (m = rp_ge[q.p.id].onclickSubmit.call(q, rp_ge[q.p.id], s, u) || {}),
                    l = $(q).triggerHandler("jqGridAddEditBeforeSubmit", [s, $(w), u]),
                    void 0 === l && (l = [!0, "", ""]),
                    l[0] && $.isFunction(rp_ge[q.p.id].beforeSubmit) && (l = rp_ge[q.p.id].beforeSubmit.call(q, s, $(w), u))),
                    l[0] && !rp_ge[q.p.id].processing) {
                        if (rp_ge[q.p.id].processing = !0,
                        $("#sData", y + "_2").addClass(f.active),
                        k = rp_ge[q.p.id].url || $(q).jqGrid("getGridParam", "editurl"),
                        d = n.oper,
                        c = "clientArray" === k ? q.p.keyName : n.id,
                        s[d] = "_empty" === $.trim(s[q.p.id + "_id"]) ? n.addoper : n.editoper,
                        s[d] !== n.addoper ? s[c] = s[q.p.id + "_id"] : void 0 === s[c] && (s[c] = s[q.p.id + "_id"]),
                        delete s[q.p.id + "_id"],
                        s = $.extend(s, rp_ge[q.p.id].editData, m),
                        !0 === q.p.treeGrid) {
                            if (s[d] === n.addoper) {
                                i = $(q).jqGrid("getGridParam", "selrow");
                                var p = "adjacency" === q.p.treeGridModel ? q.p.treeReader.parent_id_field : "parent_id";
                                s[p] = i
                            }
                            for (j in q.p.treeReader)
                                if (q.p.treeReader.hasOwnProperty(j)) {
                                    var r = q.p.treeReader[j];
                                    if (s.hasOwnProperty(r)) {
                                        if (s[d] === n.addoper && "parent_id_field" === j)
                                            continue;
                                        delete s[r]
                                    }
                                }
                        }
                        s[c] = $.jgrid.stripPref(q.p.idPrefix, s[c]);
                        var t = $.extend({
                            url: k,
                            type: rp_ge[q.p.id].mtype,
                            data: $.isFunction(rp_ge[q.p.id].serializeEditData) ? rp_ge[q.p.id].serializeEditData.call(q, s) : s,
                            complete: function(e, h) {
                                var j;
                                if ($("#sData", y + "_2").removeClass(f.active),
                                s[c] = q.p.idPrefix + s[c],
                                e.status >= 300 && 304 !== e.status ? (l[0] = !1,
                                l[1] = $(q).triggerHandler("jqGridAddEditErrorTextFormat", [e, u]),
                                $.isFunction(rp_ge[q.p.id].errorTextFormat) ? l[1] = rp_ge[q.p.id].errorTextFormat.call(q, e, u) : l[1] = h + " Status: '" + e.statusText + "'. Error code: " + e.status) : (l = $(q).triggerHandler("jqGridAddEditAfterSubmit", [e, s, u]),
                                void 0 === l && (l = [!0, "", ""]),
                                l[0] && $.isFunction(rp_ge[q.p.id].afterSubmit) && (l = rp_ge[q.p.id].afterSubmit.call(q, e, s, u))),
                                !1 === l[0])
                                    $(".FormError", w).html(l[1]),
                                    $(".FormError", w).show();
                                else if (q.p.autoencode && $.each(s, function(a, b) {
                                    s[a] = $.jgrid.htmlDecode(b)
                                }),
                                s[d] === n.addoper ? (l[2] || (l[2] = $.jgrid.randId()),
                                null == s[c] || s[c] === q.p.idPrefix + "_empty" || "" === s[c] ? s[c] = l[2] : l[2] = s[c],
                                rp_ge[q.p.id].reloadAfterSubmit ? $(q).trigger("reloadGrid") : !0 === q.p.treeGrid ? $(q).jqGrid("addChildNode", l[2], i, s) : $(q).jqGrid("addRowData", l[2], s, b.addedrow),
                                rp_ge[q.p.id].closeAfterAdd ? (!0 !== q.p.treeGrid && $(q).jqGrid("setSelection", l[2]),
                                $.jgrid.hideModal("#" + $.jgrid.jqID(z.themodal), {
                                    gb: "#gbox_" + $.jgrid.jqID(v),
                                    jqm: b.jqModal,
                                    onClose: rp_ge[q.p.id].onClose,
                                    removemodal: rp_ge[q.p.id].removemodal,
                                    formprop: !rp_ge[q.p.id].recreateForm,
                                    form: rp_ge[q.p.id].form
                                })) : rp_ge[q.p.id].clearAfterAdd && g("_empty", q, w)) : (rp_ge[q.p.id].reloadAfterSubmit ? ($(q).trigger("reloadGrid"),
                                rp_ge[q.p.id].closeAfterEdit || setTimeout(function() {
                                    $(q).jqGrid("setSelection", s[c])
                                }, 1e3)) : !0 === q.p.treeGrid ? $(q).jqGrid("setTreeRow", s[c], s) : $(q).jqGrid("setRowData", s[c], s),
                                rp_ge[q.p.id].closeAfterEdit && $.jgrid.hideModal("#" + $.jgrid.jqID(z.themodal), {
                                    gb: "#gbox_" + $.jgrid.jqID(v),
                                    jqm: b.jqModal,
                                    onClose: rp_ge[q.p.id].onClose,
                                    removemodal: rp_ge[q.p.id].removemodal,
                                    formprop: !rp_ge[q.p.id].recreateForm,
                                    form: rp_ge[q.p.id].form
                                })),
                                ($.isFunction(rp_ge[q.p.id].afterComplete) || $._data($(q)[0], "events").hasOwnProperty("jqGridAddEditAfterComplete")) && (a = e,
                                setTimeout(function() {
                                    $(q).triggerHandler("jqGridAddEditAfterComplete", [a, s, $(w), u]);
                                    try {
                                        rp_ge[q.p.id].afterComplete.call(q, a, s, $(w), u)
                                    } catch (a) {}
                                    a = null
                                }, 500)),
                                (rp_ge[q.p.id].checkOnSubmit || rp_ge[q.p.id].checkOnUpdate) && ($(w).data("disabled", !1),
                                "_empty" !== q.p.savedData[q.p.id + "_id"]))
                                    for (j in q.p.savedData)
                                        q.p.savedData.hasOwnProperty(j) && s[j] && (q.p.savedData[j] = s[j]);
                                rp_ge[q.p.id].processing = !1;
                                try {
                                    $(":input:visible", w)[0].focus()
                                } catch (a) {}
                            }
                        }, $.jgrid.ajaxOptions, rp_ge[q.p.id].ajaxEditOptions);
                        if (t.url || rp_ge[q.p.id].useDataProxy || ($.isFunction(q.p.dataProxy) ? rp_ge[q.p.id].useDataProxy = !0 : (l[0] = !1,
                        l[1] += " " + E.nourl)),
                        l[0])
                            if (rp_ge[q.p.id].useDataProxy) {
                                var x = q.p.dataProxy.call(q, t, "set_" + q.p.id);
                                void 0 === x && (x = [!0, ""]),
                                !1 === x[0] ? (l[0] = !1,
                                l[1] = x[1] || "Error deleting the selected row!") : (t.data.oper === n.addoper && rp_ge[q.p.id].closeAfterAdd && $.jgrid.hideModal("#" + $.jgrid.jqID(z.themodal), {
                                    gb: "#gbox_" + $.jgrid.jqID(v),
                                    jqm: b.jqModal,
                                    onClose: rp_ge[q.p.id].onClose,
                                    removemodal: rp_ge[q.p.id].removemodal,
                                    formprop: !rp_ge[q.p.id].recreateForm,
                                    form: rp_ge[q.p.id].form
                                }),
                                t.data.oper === n.editoper && rp_ge[q.p.id].closeAfterEdit && $.jgrid.hideModal("#" + $.jgrid.jqID(z.themodal), {
                                    gb: "#gbox_" + $.jgrid.jqID(v),
                                    jqm: b.jqModal,
                                    onClose: rp_ge[q.p.id].onClose,
                                    removemodal: rp_ge[q.p.id].removemodal,
                                    formprop: !rp_ge[q.p.id].recreateForm,
                                    form: rp_ge[q.p.id].form
                                }))
                            } else
                                "clientArray" === t.url ? (rp_ge[q.p.id].reloadAfterSubmit = !1,
                                s = t.data,
                                t.complete({
                                    status: 200,
                                    statusText: ""
                                }, "")) : $.ajax(t)
                    }
                    !1 === l[0] && ($(".FormError", w).html(l[1]),
                    $(".FormError", w).show())
                }
                function j(a, b) {
                    var c, d = !1;
                    if (!(d = !($.isPlainObject(a) && $.isPlainObject(b) && Object.getOwnPropertyNames(a).length === Object.getOwnPropertyNames(b).length)))
                        for (c in b)
                            if (b.hasOwnProperty(c)) {
                                if (!a.hasOwnProperty(c)) {
                                    d = !0;
                                    break
                                }
                                if (a[c] !== b[c]) {
                                    d = !0;
                                    break
                                }
                            }
                    return d
                }
                function k() {
                    var a = !0;
                    return $(".FormError", w).hide(),
                    rp_ge[q.p.id].checkOnUpdate && (s = {},
                    c(),
                    (t = j(s, q.p.savedData)) && ($(w).data("disabled", !0),
                    $(".confirm", "#" + z.themodal).show(),
                    a = !1)),
                    a
                }
                function l() {
                    var b;
                    if ("_empty" !== a && void 0 !== q.p.savedRow && q.p.savedRow.length > 0 && $.isFunction($.fn.jqGrid.restoreRow))
                        for (b = 0; b < q.p.savedRow.length; b++)
                            if (q.p.savedRow[b].id === a) {
                                $(q).jqGrid("restoreRow", a);
                                break
                            }
                }
                function m(a, b) {
                    var c = b[1].length - 1;
                    0 === a ? $("#pData", r).addClass(f.disabled) : void 0 !== b[1][a - 1] && $("#" + $.jgrid.jqID(b[1][a - 1])).hasClass(f.disabled) ? $("#pData", r).addClass(f.disabled) : $("#pData", r).removeClass(f.disabled),
                    a === c ? $("#nData", r).addClass(f.disabled) : void 0 !== b[1][a + 1] && $("#" + $.jgrid.jqID(b[1][a + 1])).hasClass(f.disabled) ? $("#nData", r).addClass(f.disabled) : $("#nData", r).removeClass(f.disabled)
                }
                function n() {
                    var a, b = $(q).jqGrid("getDataIDs"), c = $("#id_g", y).val();
                    if (q.p.multiselect && rp_ge[q.p.id].editselected) {
                        for (var d = [], e = 0, f = b.length; e < f; e++)
                            -1 !== $.inArray(b[e], q.p.selarrrow) && d.push(b[e]);
                        return a = $.inArray(c, d),
                        [a, d]
                    }
                    return a = $.inArray(c, b),
                    [a, b]
                }
                function o(a) {
                    var b = "";
                    return "string" == typeof a && (b = a.replace(/\{([\w\-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g, function(a, b) {
                        return '<span id="' + b + '" ></span>'
                    })),
                    b
                }
                function p() {
                    if (rp_ge[q.p.id].checkOnSubmit || rp_ge[q.p.id].checkOnUpdate) {
                        var a = []
                          , b = {};
                        a = $.map(q.p.savedData, function(a, b) {
                            return b
                        }),
                        $(".FormElement", J).each(function() {
                            if (-1 === a.indexOf(this.name)) {
                                var c = $(this).val()
                                  , d = $(this).get(0).type;
                                if ("checkbox" === d)
                                    $(this).is(":checked") || (c = $(this).attr("offval"));
                                else if ("select-multiple" === d)
                                    c = c.join(",");
                                else if ("radio" === d) {
                                    if (b.hasOwnProperty(this.name))
                                        return !0;
                                    b[this.name] = void 0 === $(this).attr("offval") ? "off" : $(this).attr("offval")
                                }
                                q.p.savedData[this.name] = c
                            }
                        });
                        for (var c in b)
                            if (b.hasOwnProperty(c)) {
                                var d = $('input[name="' + c + '"]:checked', J).val();
                                q.p.savedData[c] = void 0 !== d ? d : b[c]
                            }
                    }
                }
                var q = this;
                if (q.grid && a) {
                    q.p.savedData = {};
                    var r, s, t, u, v = q.p.id, w = "FrmGrid_" + v, x = "TblGrid_" + v, y = "#" + $.jgrid.jqID(x), z = {
                        themodal: "editmod" + v,
                        modalhead: "edithd" + v,
                        modalcontent: "editcnt" + v,
                        scrollelm: w
                    }, A = !0, B = 1, C = 0, D = "string" == typeof rp_ge[q.p.id].template && rp_ge[q.p.id].template.length > 0, E = $.jgrid.getRegional(this, "errors");
                    rp_ge[q.p.id].styleUI = q.p.styleUI || "jQueryUI",
                    $.jgrid.isMobile() && (rp_ge[q.p.id].resize = !1),
                    "new" === a ? (a = "_empty",
                    u = "add",
                    b.caption = rp_ge[q.p.id].addCaption) : (b.caption = rp_ge[q.p.id].editCaption,
                    u = "edit"),
                    b.recreateForm || $(q).data("formProp") && $.extend(rp_ge[$(this)[0].p.id], $(q).data("formProp"));
                    var F = !0;
                    b.checkOnUpdate && b.jqModal && !b.modal && (F = !1);
                    var G, H = isNaN(rp_ge[$(this)[0].p.id].dataheight) ? rp_ge[$(this)[0].p.id].dataheight : rp_ge[$(this)[0].p.id].dataheight + "px", I = isNaN(rp_ge[$(this)[0].p.id].datawidth) ? rp_ge[$(this)[0].p.id].datawidth : rp_ge[$(this)[0].p.id].datawidth + "px", J = $("<form name='FormPost' id='" + w + "' class='FormGrid' onSubmit='return false;' style='width:" + I + ";height:" + H + ";'></form>").data("disabled", !1);
                    if (D ? (G = o(rp_ge[$(this)[0].p.id].template),
                    r = y) : (G = $("<table id='" + x + "' class='EditTable ui-common-table'><tbody></tbody></table>"),
                    r = y + "_2"),
                    w = "#" + $.jgrid.jqID(w),
                    $(J).append("<div class='FormError " + f.error + "' style='display:none;'></div>"),
                    $(J).append("<div class='tinfo topinfo'>" + rp_ge[q.p.id].topinfo + "</div>"),
                    $(q.p.colModel).each(function() {
                        var a = this.formoptions;
                        B = Math.max(B, a ? a.colpos || 0 : 0),
                        C = Math.max(C, a ? a.rowpos || 0 : 0)
                    }),
                    $(J).append(G),
                    A = $(q).triggerHandler("jqGridAddEditBeforeInitData", [J, u]),
                    void 0 === A && (A = !0),
                    A && $.isFunction(rp_ge[q.p.id].beforeInitData) && (A = rp_ge[q.p.id].beforeInitData.call(q, J, u)),
                    !1 !== A) {
                        l(),
                        d(a, q, G, B);
                        var K = "rtl" === q.p.direction
                          , L = K ? "nData" : "pData"
                          , M = K ? "pData" : "nData"
                          , N = "<a id='" + L + "' class='fm-button " + f.button + "'><span class='" + f.icon_base + " " + e.icon_prev + "'></span></a>"
                          , O = "<a id='" + M + "' class='fm-button " + f.button + "'><span class='" + f.icon_base + " " + e.icon_next + "'></span></a>"
                          , P = "<a id='sData' class='fm-button " + f.button + "'>" + b.bSubmit + "</a>"
                          , Q = "<a id='cData' class='fm-button " + f.button + "'>" + b.bCancel + "</a>"
                          , R = $.isArray(rp_ge[q.p.id].buttons) ? $.jgrid.buildButtons(rp_ge[q.p.id].buttons, P + Q, f) : P + Q
                          , S = "<table style='height:auto' class='EditTable ui-common-table' id='" + x + "_2'><tbody><tr><td colspan='2'><hr class='" + f.content + "' style='margin:1px'/></td></tr><tr id='Act_Buttons'><td class='navButton'>" + (K ? O + N : N + O) + "</td><td class='EditButton'>" + R + "</td></tr>";
                        if (S += "</tbody></table>",
                        C > 0) {
                            var T = [];
                            $.each($(G)[0].rows, function(a, b) {
                                T[a] = b
                            }),
                            T.sort(function(a, b) {
                                return a.rp > b.rp ? 1 : a.rp < b.rp ? -1 : 0
                            }),
                            $.each(T, function(a, b) {
                                $("tbody", G).append(b)
                            })
                        }
                        b.gbox = "#gbox_" + $.jgrid.jqID(v);
                        var U = !1;
                        !0 === b.closeOnEscape && (b.closeOnEscape = !1,
                        U = !0);
                        var V;
                        D ? ($(J).find("#pData").replaceWith(N),
                        $(J).find("#nData").replaceWith(O),
                        $(J).find("#sData").replaceWith(P),
                        $(J).find("#cData").replaceWith(Q),
                        V = $("<div id=" + x + "></div>").append(J)) : V = $("<div></div>").append(J).append(S),
                        $(J).append("<div class='binfo topinfo bottominfo'>" + rp_ge[q.p.id].bottominfo + "</div>");
                        var W = $(".ui-jqgrid").css("font-size") || "11px";
                        if ($.jgrid.createModal(z, V, rp_ge[$(this)[0].p.id], "#gview_" + $.jgrid.jqID(q.p.id), $("#gbox_" + $.jgrid.jqID(q.p.id))[0], null, {
                            "font-size": W
                        }),
                        K && ($("#pData, #nData", y + "_2").css("float", "right"),
                        $(".EditButton", y + "_2").css("text-align", "left")),
                        rp_ge[q.p.id].topinfo && $(".tinfo", w).show(),
                        rp_ge[q.p.id].bottominfo && $(".binfo", w).show(),
                        V = null,
                        S = null,
                        $("#" + $.jgrid.jqID(z.themodal)).keydown(function(a) {
                            var c = a.target;
                            if (!0 === $(w).data("disabled"))
                                return !1;
                            if (!0 === rp_ge[q.p.id].savekey[0] && a.which === rp_ge[q.p.id].savekey[1] && "TEXTAREA" !== c.tagName)
                                return $("#sData", y + "_2").trigger("click"),
                                !1;
                            if (27 === a.which)
                                return !!k() && (U && $.jgrid.hideModal("#" + $.jgrid.jqID(z.themodal), {
                                    gb: b.gbox,
                                    jqm: b.jqModal,
                                    onClose: rp_ge[q.p.id].onClose,
                                    removemodal: rp_ge[q.p.id].removemodal,
                                    formprop: !rp_ge[q.p.id].recreateForm,
                                    form: rp_ge[q.p.id].form
                                }),
                                !1);
                            if (!0 === rp_ge[q.p.id].navkeys[0]) {
                                if ("_empty" === $("#id_g", y).val())
                                    return !0;
                                if (a.which === rp_ge[q.p.id].navkeys[1])
                                    return $("#pData", r).trigger("click"),
                                    !1;
                                if (a.which === rp_ge[q.p.id].navkeys[2])
                                    return $("#nData", r).trigger("click"),
                                    !1
                            }
                        }),
                        b.checkOnUpdate && ($("a.ui-jqdialog-titlebar-close span", "#" + $.jgrid.jqID(z.themodal)).removeClass("jqmClose"),
                        $("a.ui-jqdialog-titlebar-close", "#" + $.jgrid.jqID(z.themodal)).off("click").click(function() {
                            return !!k() && ($.jgrid.hideModal("#" + $.jgrid.jqID(z.themodal), {
                                gb: "#gbox_" + $.jgrid.jqID(v),
                                jqm: b.jqModal,
                                onClose: rp_ge[q.p.id].onClose,
                                removemodal: rp_ge[q.p.id].removemodal,
                                formprop: !rp_ge[q.p.id].recreateForm,
                                form: rp_ge[q.p.id].form
                            }),
                            !1)
                        })),
                        b.saveicon = $.extend([!0, "left", e.icon_save], b.saveicon),
                        b.closeicon = $.extend([!0, "left", e.icon_close], b.closeicon),
                        !0 === b.saveicon[0] && $("#sData", r).addClass("right" === b.saveicon[1] ? "fm-button-icon-right" : "fm-button-icon-left").append("<span class='" + f.icon_base + " " + b.saveicon[2] + "'></span>"),
                        !0 === b.closeicon[0] && $("#cData", r).addClass("right" === b.closeicon[1] ? "fm-button-icon-right" : "fm-button-icon-left").append("<span class='" + f.icon_base + " " + b.closeicon[2] + "'></span>"),
                        rp_ge[q.p.id].checkOnSubmit || rp_ge[q.p.id].checkOnUpdate) {
                            P = "<a id='sNew' class='fm-button " + f.button + "' style='z-index:1002'>" + b.bYes + "</a>",
                            O = "<a id='nNew' class='fm-button " + f.button + "' style='z-index:1002;margin-left:5px'>" + b.bNo + "</a>",
                            Q = "<a id='cNew' class='fm-button " + f.button + "' style='z-index:1002;margin-left:5px;'>" + b.bExit + "</a>";
                            var X = b.zIndex || 999;
                            X++,
                            $("#" + z.themodal).append("<div class='" + b.overlayClass + " jqgrid-overlay confirm' style='z-index:" + X + ";display:none;position:absolute;'>&#160;</div><div class='confirm ui-jqconfirm " + f.content + "' style='z-index:" + (X + 1) + "'>" + b.saveData + "<br/><br/>" + P + O + Q + "</div>"),
                            $("#sNew", "#" + $.jgrid.jqID(z.themodal)).click(function() {
                                return i(),
                                $(w).data("disabled", !1),
                                $(".confirm", "#" + $.jgrid.jqID(z.themodal)).hide(),
                                !1
                            }),
                            $("#nNew", "#" + $.jgrid.jqID(z.themodal)).click(function() {
                                return $(".confirm", "#" + $.jgrid.jqID(z.themodal)).hide(),
                                $(w).data("disabled", !1),
                                setTimeout(function() {
                                    $(":input:visible", w)[0].focus()
                                }, 0),
                                !1
                            }),
                            $("#cNew", "#" + $.jgrid.jqID(z.themodal)).click(function() {
                                return $(".confirm", "#" + $.jgrid.jqID(z.themodal)).hide(),
                                $(w).data("disabled", !1),
                                $.jgrid.hideModal("#" + $.jgrid.jqID(z.themodal), {
                                    gb: "#gbox_" + $.jgrid.jqID(v),
                                    jqm: b.jqModal,
                                    onClose: rp_ge[q.p.id].onClose,
                                    removemodal: rp_ge[q.p.id].removemodal,
                                    formprop: !rp_ge[q.p.id].recreateForm,
                                    form: rp_ge[q.p.id].form
                                }),
                                !1
                            })
                        }
                        $(q).triggerHandler("jqGridAddEditInitializeForm", [$(w), u]),
                        $.isFunction(rp_ge[q.p.id].onInitializeForm) && rp_ge[q.p.id].onInitializeForm.call(q, $(w), u),
                        "_empty" !== a && rp_ge[q.p.id].viewPagerButtons ? $("#pData,#nData", r).show() : $("#pData,#nData", r).hide(),
                        $(q).triggerHandler("jqGridAddEditBeforeShowForm", [$(w), u]),
                        $.isFunction(rp_ge[q.p.id].beforeShowForm) && rp_ge[q.p.id].beforeShowForm.call(q, $(w), u),
                        p(),
                        $("#" + $.jgrid.jqID(z.themodal)).data("onClose", rp_ge[q.p.id].onClose),
                        $.jgrid.viewModal("#" + $.jgrid.jqID(z.themodal), {
                            gbox: "#gbox_" + $.jgrid.jqID(v),
                            jqm: b.jqModal,
                            overlay: b.overlay,
                            modal: b.modal,
                            overlayClass: b.overlayClass,
                            focusField: b.focusField,
                            onHide: function(a) {
                                var b = $("#editmod" + v)[0].style.height
                                  , c = $("#editmod" + v)[0].style.width;
                                b.indexOf("px") > -1 && (b = parseFloat(b)),
                                c.indexOf("px") > -1 && (c = parseFloat(c)),
                                $(q).data("formProp", {
                                    top: parseFloat($(a.w).css("top")),
                                    left: parseFloat($(a.w).css("left")),
                                    width: c,
                                    height: b,
                                    dataheight: $(w).height(),
                                    datawidth: $(w).width()
                                }),
                                a.w.remove(),
                                a.o && a.o.remove()
                            }
                        }),
                        F || $("." + $.jgrid.jqID(b.overlayClass)).click(function() {
                            return !!k() && ($.jgrid.hideModal("#" + $.jgrid.jqID(z.themodal), {
                                gb: "#gbox_" + $.jgrid.jqID(v),
                                jqm: b.jqModal,
                                onClose: rp_ge[q.p.id].onClose,
                                removemodal: rp_ge[q.p.id].removemodal,
                                formprop: !rp_ge[q.p.id].recreateForm,
                                form: rp_ge[q.p.id].form
                            }),
                            !1)
                        }),
                        $(".fm-button", "#" + $.jgrid.jqID(z.themodal)).hover(function() {
                            $(this).addClass(f.hover)
                        }, function() {
                            $(this).removeClass(f.hover)
                        }),
                        $("#sData", r).click(function() {
                            return s = {},
                            $(".FormError", w).hide(),
                            c(),
                            "_empty" === s[q.p.id + "_id"] ? i() : !0 === b.checkOnSubmit ? (t = j(s, q.p.savedData),
                            t ? ($(w).data("disabled", !0),
                            $(".confirm", "#" + $.jgrid.jqID(z.themodal)).show()) : i()) : i(),
                            !1
                        }),
                        $("#cData", r).click(function() {
                            return !!k() && ($.jgrid.hideModal("#" + $.jgrid.jqID(z.themodal), {
                                gb: "#gbox_" + $.jgrid.jqID(v),
                                jqm: b.jqModal,
                                onClose: rp_ge[q.p.id].onClose,
                                removemodal: rp_ge[q.p.id].removemodal,
                                formprop: !rp_ge[q.p.id].recreateForm,
                                form: rp_ge[q.p.id].form
                            }),
                            !1)
                        }),
                        $(r).find("[data-index]").each(function() {
                            var a = parseInt($(this).attr("data-index"), 10);
                            a >= 0 && b.buttons[a].hasOwnProperty("click") && $(this).on("click", function(c) {
                                b.buttons[a].click.call(q, $(w)[0], rp_ge[q.p.id], c)
                            })
                        }),
                        $("#nData", r).click(function() {
                            if (!k())
                                return !1;
                            $(".FormError", w).hide();
                            var a = n();
                            if (a[0] = parseInt(a[0], 10),
                            -1 !== a[0] && a[1][a[0] + 1]) {
                                $(q).triggerHandler("jqGridAddEditClickPgButtons", ["next", $(w), a[1][a[0]]]);
                                var c;
                                if ($.isFunction(b.onclickPgButtons) && void 0 !== (c = b.onclickPgButtons.call(q, "next", $(w), a[1][a[0]])) && !1 === c)
                                    return !1;
                                if ($("#" + $.jgrid.jqID(a[1][a[0] + 1])).hasClass(f.disabled))
                                    return !1;
                                g(a[1][a[0] + 1], q, w),
                                q.p.multiselect && rp_ge[q.p.id].editselected || $(q).jqGrid("setSelection", a[1][a[0] + 1]),
                                $(q).triggerHandler("jqGridAddEditAfterClickPgButtons", ["next", $(w), a[1][a[0]]]),
                                $.isFunction(b.afterclickPgButtons) && b.afterclickPgButtons.call(q, "next", $(w), a[1][a[0] + 1]),
                                p(),
                                m(a[0] + 1, a)
                            }
                            return !1
                        }),
                        $("#pData", r).click(function() {
                            if (!k())
                                return !1;
                            $(".FormError", w).hide();
                            var a = n();
                            if (-1 !== a[0] && a[1][a[0] - 1]) {
                                $(q).triggerHandler("jqGridAddEditClickPgButtons", ["prev", $(w), a[1][a[0]]]);
                                var c;
                                if ($.isFunction(b.onclickPgButtons) && void 0 !== (c = b.onclickPgButtons.call(q, "prev", $(w), a[1][a[0]])) && !1 === c)
                                    return !1;
                                if ($("#" + $.jgrid.jqID(a[1][a[0] - 1])).hasClass(f.disabled))
                                    return !1;
                                g(a[1][a[0] - 1], q, w),
                                q.p.multiselect && rp_ge[q.p.id].editselected || $(q).jqGrid("setSelection", a[1][a[0] - 1]),
                                $(q).triggerHandler("jqGridAddEditAfterClickPgButtons", ["prev", $(w), a[1][a[0]]]),
                                $.isFunction(b.afterclickPgButtons) && b.afterclickPgButtons.call(q, "prev", $(w), a[1][a[0] - 1]),
                                p(),
                                m(a[0] - 1, a)
                            }
                            return !1
                        }),
                        $(q).triggerHandler("jqGridAddEditAfterShowForm", [$(w), u]),
                        $.isFunction(rp_ge[q.p.id].afterShowForm) && rp_ge[q.p.id].afterShowForm.call(q, $(w), u);
                        var Y = n();
                        m(Y[0], Y)
                    }
                }
            })
        },
        viewGridRow: function(a, b) {
            var c = $.jgrid.getRegional(this[0], "view")
              , d = this[0].p.styleUI
              , e = $.jgrid.styleUI[d].formedit
              , f = $.jgrid.styleUI[d].common;
            return b = $.extend(!0, {
                top: 0,
                left: 0,
                width: 500,
                datawidth: "auto",
                height: "auto",
                dataheight: "auto",
                modal: !1,
                overlay: 30,
                drag: !0,
                resize: !0,
                jqModal: !0,
                closeOnEscape: !1,
                labelswidth: "auto",
                closeicon: [],
                navkeys: [!1, 38, 40],
                onClose: null,
                beforeShowForm: null,
                beforeInitData: null,
                viewPagerButtons: !0,
                recreateForm: !1,
                removemodal: !0,
                form: "view",
                buttons: []
            }, c, b || {}),
            rp_ge[$(this)[0].p.id] = b,
            this.each(function() {
                function c() {
                    !0 !== rp_ge[j.p.id].closeOnEscape && !0 !== rp_ge[j.p.id].navkeys[0] || setTimeout(function() {
                        $(".ui-jqdialog-titlebar-close", "#" + $.jgrid.jqID(p.modalhead)).attr("tabindex", "-1").focus()
                    }, 0)
                }
                function d(a, c, d, e) {
                    var g, h, i, j, k, l, m, n, o, p = 0, q = [], r = !1, s = "<td class='CaptionTD form-view-label " + f.content + "' width='" + b.labelswidth + "'></td><td class='DataTD form-view-data ui-helper-reset " + f.content + "'></td>", t = "", u = "<td class='CaptionTD form-view-label " + f.content + "'></td><td class='DataTD form-view-data " + f.content + "'></td>", v = ["integer", "number", "currency"], w = 0, x = 0;
                    for (l = 1; l <= e; l++)
                        t += 1 === l ? s : u;
                    if ($(c.p.colModel).each(function() {
                        (h = (!this.editrules || !0 !== this.editrules.edithidden) && !0 === this.hidden) || "right" !== this.align || (this.formatter && -1 !== $.inArray(this.formatter, v) ? w = Math.max(w, parseInt(this.width, 10)) : x = Math.max(x, parseInt(this.width, 10)))
                    }),
                    m = 0 !== w ? w : 0 !== x ? x : 0,
                    r = $(c).jqGrid("getInd", a),
                    $(c.p.colModel).each(function(a) {
                        if (g = this.name,
                        n = !1,
                        h = (!this.editrules || !0 !== this.editrules.edithidden) && !0 === this.hidden,
                        k = h ? "style='display:none'" : "",
                        o = "boolean" != typeof this.viewable || this.viewable,
                        "cb" !== g && "subgrid" !== g && "rn" !== g && o) {
                            j = !1 === r ? "" : g === c.p.ExpandColumn && !0 === c.p.treeGrid ? $("td:eq(" + a + ")", c.rows[r]).text() : $("td:eq(" + a + ")", c.rows[r]).html(),
                            n = "right" === this.align && 0 !== m;
                            var b = $.extend({}, {
                                rowabove: !1,
                                rowcontent: ""
                            }, this.formoptions || {})
                              , f = parseInt(b.rowpos, 10) || p + 1
                              , l = parseInt(2 * (parseInt(b.colpos, 10) || 1), 10);
                            if (b.rowabove) {
                                var s = $("<tr><td class='contentinfo' colspan='" + 2 * e + "'>" + b.rowcontent + "</td></tr>");
                                $(d).append(s),
                                s[0].rp = f
                            }
                            i = $(d).find("tr[rowpos=" + f + "]"),
                            0 === i.length && (i = $("<tr " + k + " rowpos='" + f + "'></tr>").addClass("FormData").attr("id", "trv_" + g),
                            $(i).append(t),
                            $(d).append(i),
                            i[0].rp = f),
                            $("td:eq(" + (l - 2) + ")", i[0]).html("<b>" + (void 0 === b.label ? c.p.colNames[a] : b.label) + "</b>"),
                            $("td:eq(" + (l - 1) + ")", i[0]).append("<span>" + j + "</span>").attr("id", "v_" + g),
                            n && $("td:eq(" + (l - 1) + ") span", i[0]).css({
                                "text-align": "right",
                                width: m + "px"
                            }),
                            q[p] = a,
                            p++
                        }
                    }),
                    p > 0) {
                        var y = $("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='" + (2 * e - 1) + "' class='DataTD'><input class='FormElement' id='id_g' type='text' name='id' value='" + a + "'/></td></tr>");
                        y[0].rp = p + 99,
                        $(d).append(y)
                    }
                    return q
                }
                function g(a, b) {
                    var c, d, e, f, g = 0;
                    (f = $(b).jqGrid("getInd", a, !0)) && ($("td", f).each(function(a) {
                        c = b.p.colModel[a].name,
                        d = (!b.p.colModel[a].editrules || !0 !== b.p.colModel[a].editrules.edithidden) && !0 === b.p.colModel[a].hidden,
                        "cb" !== c && "subgrid" !== c && "rn" !== c && (e = c === b.p.ExpandColumn && !0 === b.p.treeGrid ? $(this).text() : $(this).html(),
                        c = $.jgrid.jqID("v_" + c),
                        $("#" + c + " span", "#" + m).html(e),
                        d && $("#" + c, "#" + m).parents("tr:first").hide(),
                        g++)
                    }),
                    g > 0 && $("#id_g", "#" + m).val(a))
                }
                function h(a, b) {
                    var c = b[1].length - 1;
                    0 === a ? $("#pData", "#" + m + "_2").addClass(f.disabled) : void 0 !== b[1][a - 1] && $("#" + $.jgrid.jqID(b[1][a - 1])).hasClass(f.disabled) ? $("#pData", m + "_2").addClass(f.disabled) : $("#pData", "#" + m + "_2").removeClass(f.disabled),
                    a === c ? $("#nData", "#" + m + "_2").addClass(f.disabled) : void 0 !== b[1][a + 1] && $("#" + $.jgrid.jqID(b[1][a + 1])).hasClass(f.disabled) ? $("#nData", m + "_2").addClass(f.disabled) : $("#nData", "#" + m + "_2").removeClass(f.disabled)
                }
                function i() {
                    var a = $(j).jqGrid("getDataIDs")
                      , b = $("#id_g", "#" + m).val();
                    return [$.inArray(b, a), a]
                }
                var j = this;
                if (j.grid && a) {
                    var k = j.p.id
                      , l = "ViewGrid_" + $.jgrid.jqID(k)
                      , m = "ViewTbl_" + $.jgrid.jqID(k)
                      , n = "ViewGrid_" + k
                      , o = "ViewTbl_" + k
                      , p = {
                        themodal: "viewmod" + k,
                        modalhead: "viewhd" + k,
                        modalcontent: "viewcnt" + k,
                        scrollelm: l
                    }
                      , q = !0
                      , r = 1
                      , s = 0;
                    rp_ge[j.p.id].styleUI = j.p.styleUI || "jQueryUI",
                    b.recreateForm || $(j).data("viewProp") && $.extend(rp_ge[$(this)[0].p.id], $(j).data("viewProp"));
                    var t = isNaN(rp_ge[$(this)[0].p.id].dataheight) ? rp_ge[$(this)[0].p.id].dataheight : rp_ge[$(this)[0].p.id].dataheight + "px"
                      , u = isNaN(rp_ge[$(this)[0].p.id].datawidth) ? rp_ge[$(this)[0].p.id].datawidth : rp_ge[$(this)[0].p.id].datawidth + "px"
                      , v = $("<form name='FormPost' id='" + n + "' class='FormGrid' style='width:" + u + ";height:" + t + ";'></form>")
                      , w = $("<table id='" + o + "' class='EditTable ViewTable'><tbody></tbody></table>");
                    if ($(j.p.colModel).each(function() {
                        var a = this.formoptions;
                        r = Math.max(r, a ? a.colpos || 0 : 0),
                        s = Math.max(s, a ? a.rowpos || 0 : 0)
                    }),
                    $(v).append(w),
                    q = $(j).triggerHandler("jqGridViewRowBeforeInitData", [v]),
                    void 0 === q && (q = !0),
                    q && $.isFunction(rp_ge[j.p.id].beforeInitData) && (q = rp_ge[j.p.id].beforeInitData.call(j, v)),
                    !1 !== q) {
                        d(a, j, w, r);
                        var x = "rtl" === j.p.direction
                          , y = x ? "nData" : "pData"
                          , z = x ? "pData" : "nData"
                          , A = "<a id='" + y + "' class='fm-button " + f.button + "'><span class='" + f.icon_base + " " + e.icon_prev + "'></span></a>"
                          , B = "<a id='" + z + "' class='fm-button " + f.button + "'><span class='" + f.icon_base + " " + e.icon_next + "'></span></a>"
                          , C = "<a id='cData' class='fm-button " + f.button + "'>" + b.bClose + "</a>"
                          , D = $.isArray(rp_ge[j.p.id].buttons) ? $.jgrid.buildButtons(rp_ge[j.p.id].buttons, C, f) : C;
                        if (s > 0) {
                            var E = [];
                            $.each($(w)[0].rows, function(a, b) {
                                E[a] = b
                            }),
                            E.sort(function(a, b) {
                                return a.rp > b.rp ? 1 : a.rp < b.rp ? -1 : 0
                            }),
                            $.each(E, function(a, b) {
                                $("tbody", w).append(b)
                            })
                        }
                        b.gbox = "#gbox_" + $.jgrid.jqID(k);
                        var F = $("<div></div>").append(v).append("<table border='0' class='EditTable' id='" + m + "_2'><tbody><tr id='Act_Buttons'><td class='navButton' width='" + b.labelswidth + "'>" + (x ? B + A : A + B) + "</td><td class='EditButton'>" + D + "</td></tr></tbody></table>")
                          , G = $(".ui-jqgrid").css("font-size") || "11px";
                        $.jgrid.createModal(p, F, rp_ge[$(this)[0].p.id], "#gview_" + $.jgrid.jqID(j.p.id), $("#gview_" + $.jgrid.jqID(j.p.id))[0], null, {
                            "font-size": G
                        }),
                        x && ($("#pData, #nData", "#" + m + "_2").css("float", "right"),
                        $(".EditButton", "#" + m + "_2").css("text-align", "left")),
                        b.viewPagerButtons || $("#pData, #nData", "#" + m + "_2").hide(),
                        F = null,
                        $("#" + p.themodal).keydown(function(a) {
                            if (27 === a.which)
                                return rp_ge[j.p.id].closeOnEscape && $.jgrid.hideModal("#" + $.jgrid.jqID(p.themodal), {
                                    gb: b.gbox,
                                    jqm: b.jqModal,
                                    onClose: b.onClose,
                                    removemodal: rp_ge[j.p.id].removemodal,
                                    formprop: !rp_ge[j.p.id].recreateForm,
                                    form: rp_ge[j.p.id].form
                                }),
                                !1;
                            if (!0 === b.navkeys[0]) {
                                if (a.which === b.navkeys[1])
                                    return $("#pData", "#" + m + "_2").trigger("click"),
                                    !1;
                                if (a.which === b.navkeys[2])
                                    return $("#nData", "#" + m + "_2").trigger("click"),
                                    !1
                            }
                        }),
                        b.closeicon = $.extend([!0, "left", e.icon_close], b.closeicon),
                        !0 === b.closeicon[0] && $("#cData", "#" + m + "_2").addClass("right" === b.closeicon[1] ? "fm-button-icon-right" : "fm-button-icon-left").append("<span class='" + f.icon_base + " " + b.closeicon[2] + "'></span>"),
                        $(j).triggerHandler("jqGridViewRowBeforeShowForm", [$("#" + l)]),
                        $.isFunction(b.beforeShowForm) && b.beforeShowForm.call(j, $("#" + l)),
                        $.jgrid.viewModal("#" + $.jgrid.jqID(p.themodal), {
                            gbox: "#gbox_" + $.jgrid.jqID(k),
                            jqm: b.jqModal,
                            overlay: b.overlay,
                            modal: b.modal,
                            onHide: function(a) {
                                $(j).data("viewProp", {
                                    top: parseFloat($(a.w).css("top")),
                                    left: parseFloat($(a.w).css("left")),
                                    width: $(a.w).width(),
                                    height: $(a.w).height(),
                                    dataheight: $("#" + l).height(),
                                    datawidth: $("#" + l).width()
                                }),
                                a.w.remove(),
                                a.o && a.o.remove()
                            }
                        }),
                        $(".fm-button:not(." + f.disabled + ")", "#" + m + "_2").hover(function() {
                            $(this).addClass(f.hover)
                        }, function() {
                            $(this).removeClass(f.hover)
                        }),
                        c(),
                        $("#cData", "#" + m + "_2").click(function() {
                            return $.jgrid.hideModal("#" + $.jgrid.jqID(p.themodal), {
                                gb: "#gbox_" + $.jgrid.jqID(k),
                                jqm: b.jqModal,
                                onClose: b.onClose,
                                removemodal: rp_ge[j.p.id].removemodal,
                                formprop: !rp_ge[j.p.id].recreateForm,
                                form: rp_ge[j.p.id].form
                            }),
                            !1
                        }),
                        $("#" + m + "_2").find("[data-index]").each(function() {
                            var a = parseInt($(this).attr("data-index"), 10);
                            a >= 0 && b.buttons[a].hasOwnProperty("click") && $(this).on("click", function(c) {
                                b.buttons[a].click.call(j, $("#" + n)[0], rp_ge[j.p.id], c)
                            })
                        }),
                        $("#nData", "#" + m + "_2").click(function() {
                            $("#FormError", "#" + m).hide();
                            var a = i();
                            return a[0] = parseInt(a[0], 10),
                            -1 !== a[0] && a[1][a[0] + 1] && ($(j).triggerHandler("jqGridViewRowClickPgButtons", ["next", $("#" + l), a[1][a[0]]]),
                            $.isFunction(b.onclickPgButtons) && b.onclickPgButtons.call(j, "next", $("#" + l), a[1][a[0]]),
                            g(a[1][a[0] + 1], j),
                            $(j).jqGrid("setSelection", a[1][a[0] + 1]),
                            $(j).triggerHandler("jqGridViewRowAfterClickPgButtons", ["next", $("#" + l), a[1][a[0] + 1]]),
                            $.isFunction(b.afterclickPgButtons) && b.afterclickPgButtons.call(j, "next", $("#" + l), a[1][a[0] + 1]),
                            h(a[0] + 1, a)),
                            c(),
                            !1
                        }),
                        $("#pData", "#" + m + "_2").click(function() {
                            $("#FormError", "#" + m).hide();
                            var a = i();
                            return -1 !== a[0] && a[1][a[0] - 1] && ($(j).triggerHandler("jqGridViewRowClickPgButtons", ["prev", $("#" + l), a[1][a[0]]]),
                            $.isFunction(b.onclickPgButtons) && b.onclickPgButtons.call(j, "prev", $("#" + l), a[1][a[0]]),
                            g(a[1][a[0] - 1], j),
                            $(j).jqGrid("setSelection", a[1][a[0] - 1]),
                            $(j).triggerHandler("jqGridViewRowAfterClickPgButtons", ["prev", $("#" + l), a[1][a[0] - 1]]),
                            $.isFunction(b.afterclickPgButtons) && b.afterclickPgButtons.call(j, "prev", $("#" + l), a[1][a[0] - 1]),
                            h(a[0] - 1, a)),
                            c(),
                            !1
                        });
                        var H = i();
                        h(H[0], H)
                    }
                }
            })
        },
        delGridRow: function(a, b) {
            var c = $.jgrid.getRegional(this[0], "del")
              , d = this[0].p.styleUI
              , e = $.jgrid.styleUI[d].formedit
              , f = $.jgrid.styleUI[d].common;
            return b = $.extend(!0, {
                top: 0,
                left: 0,
                width: 240,
                height: "auto",
                dataheight: "auto",
                modal: !1,
                overlay: 30,
                drag: !0,
                resize: !0,
                url: "",
                mtype: "POST",
                reloadAfterSubmit: !0,
                beforeShowForm: null,
                beforeInitData: null,
                afterShowForm: null,
                beforeSubmit: null,
                onclickSubmit: null,
                afterSubmit: null,
                jqModal: !0,
                closeOnEscape: !1,
                delData: {},
                delicon: [],
                cancelicon: [],
                onClose: null,
                ajaxDelOptions: {},
                processing: !1,
                serializeDelData: null,
                useDataProxy: !1
            }, c, b || {}),
            rp_ge[$(this)[0].p.id] = b,
            this.each(function() {
                var c = this;
                if (c.grid && a) {
                    var d, g, h, i, j = c.p.id, k = {}, l = !0, m = "DelTbl_" + $.jgrid.jqID(j), n = "DelTbl_" + j, o = {
                        themodal: "delmod" + j,
                        modalhead: "delhd" + j,
                        modalcontent: "delcnt" + j,
                        scrollelm: m
                    };
                    if (rp_ge[c.p.id].styleUI = c.p.styleUI || "jQueryUI",
                    $.isArray(a) && (a = a.join()),
                    void 0 !== $("#" + $.jgrid.jqID(o.themodal))[0]) {
                        if (l = $(c).triggerHandler("jqGridDelRowBeforeInitData", [$("#" + m)]),
                        void 0 === l && (l = !0),
                        l && $.isFunction(rp_ge[c.p.id].beforeInitData) && (l = rp_ge[c.p.id].beforeInitData.call(c, $("#" + m))),
                        !1 === l)
                            return;
                        $("#DelData>td", "#" + m).text(a),
                        $("#DelError", "#" + m).hide(),
                        !0 === rp_ge[c.p.id].processing && (rp_ge[c.p.id].processing = !1,
                        $("#dData", "#" + m).removeClass(f.active)),
                        $(c).triggerHandler("jqGridDelRowBeforeShowForm", [$("#" + m)]),
                        $.isFunction(rp_ge[c.p.id].beforeShowForm) && rp_ge[c.p.id].beforeShowForm.call(c, $("#" + m)),
                        $.jgrid.viewModal("#" + $.jgrid.jqID(o.themodal), {
                            gbox: "#gbox_" + $.jgrid.jqID(j),
                            jqm: rp_ge[c.p.id].jqModal,
                            overlay: rp_ge[c.p.id].overlay,
                            modal: rp_ge[c.p.id].modal
                        }),
                        $(c).triggerHandler("jqGridDelRowAfterShowForm", [$("#" + m)]),
                        $.isFunction(rp_ge[c.p.id].afterShowForm) && rp_ge[c.p.id].afterShowForm.call(c, $("#" + m))
                    } else {
                        var p = isNaN(rp_ge[c.p.id].dataheight) ? rp_ge[c.p.id].dataheight : rp_ge[c.p.id].dataheight + "px"
                          , q = isNaN(b.datawidth) ? b.datawidth : b.datawidth + "px"
                          , r = "<div id='" + n + "' class='formdata' style='width:" + q + ";overflow:auto;position:relative;height:" + p + ";'>";
                        r += "<table class='DelTable'><tbody>",
                        r += "<tr id='DelError' style='display:none'><td class='" + f.error + "'></td></tr>",
                        r += "<tr id='DelData' style='display:none'><td >" + a + "</td></tr>",
                        r += '<tr><td class="delmsg" style="white-space:pre;">' + rp_ge[c.p.id].msg + "</td></tr><tr><td >&#160;</td></tr>",
                        r += "</tbody></table></div>";
                        var s = "<a id='dData' class='fm-button " + f.button + "'>" + b.bSubmit + "</a>"
                          , t = "<a id='eData' class='fm-button " + f.button + "'>" + b.bCancel + "</a>"
                          , u = $.isArray(rp_ge[c.p.id].buttons) ? $.jgrid.buildButtons(rp_ge[c.p.id].buttons, s + t, f) : s + t
                          , v = $(".ui-jqgrid").css("font-size") || "11px";
                        if (r += "<table class='EditTable ui-common-table' id='" + m + "_2'><tbody><tr><td><hr class='" + f.content + "' style='margin:1px'/></td></tr><tr><td class='DelButton EditButton'>" + u + "</td></tr></tbody></table>",
                        b.gbox = "#gbox_" + $.jgrid.jqID(j),
                        $.jgrid.createModal(o, r, rp_ge[c.p.id], "#gview_" + $.jgrid.jqID(c.p.id), $("#gview_" + $.jgrid.jqID(c.p.id))[0], null, {
                            "font-size": v
                        }),
                        $(".fm-button", "#" + m + "_2").hover(function() {
                            $(this).addClass(f.hover)
                        }, function() {
                            $(this).removeClass(f.hover)
                        }),
                        b.delicon = $.extend([!0, "left", e.icon_del], rp_ge[c.p.id].delicon),
                        b.cancelicon = $.extend([!0, "left", e.icon_cancel], rp_ge[c.p.id].cancelicon),
                        !0 === b.delicon[0] && $("#dData", "#" + m + "_2").addClass("right" === b.delicon[1] ? "fm-button-icon-right" : "fm-button-icon-left").append("<span class='" + f.icon_base + " " + b.delicon[2] + "'></span>"),
                        !0 === b.cancelicon[0] && $("#eData", "#" + m + "_2").addClass("right" === b.cancelicon[1] ? "fm-button-icon-right" : "fm-button-icon-left").append("<span class='" + f.icon_base + " " + b.cancelicon[2] + "'></span>"),
                        $("#dData", "#" + m + "_2").click(function() {
                            var a, e = [!0, ""], l = $("#DelData>td", "#" + m).text();
                            if (k = {},
                            k = $(c).triggerHandler("jqGridDelRowClickSubmit", [rp_ge[c.p.id], l]),
                            void 0 === k && $.isFunction(rp_ge[c.p.id].onclickSubmit) && (k = rp_ge[c.p.id].onclickSubmit.call(c, rp_ge[c.p.id], l) || {}),
                            e = $(c).triggerHandler("jqGridDelRowBeforeSubmit", [l]),
                            void 0 === e && (e = [!0, "", ""]),
                            e[0] && $.isFunction(rp_ge[c.p.id].beforeSubmit) && (e = rp_ge[c.p.id].beforeSubmit.call(c, l)),
                            e[0] && !rp_ge[c.p.id].processing) {
                                if (rp_ge[c.p.id].processing = !0,
                                h = c.p.prmNames,
                                d = $.extend({}, rp_ge[c.p.id].delData, k),
                                i = h.oper,
                                d[i] = h.deloper,
                                g = h.id,
                                l = String(l).split(","),
                                !l.length)
                                    return !1;
                                for (a in l)
                                    l.hasOwnProperty(a) && (l[a] = $.jgrid.stripPref(c.p.idPrefix, l[a]));
                                d[g] = l.join(),
                                $(this).addClass(f.active);
                                var n = $.extend({
                                    url: rp_ge[c.p.id].url || $(c).jqGrid("getGridParam", "editurl"),
                                    type: rp_ge[c.p.id].mtype,
                                    data: $.isFunction(rp_ge[c.p.id].serializeDelData) ? rp_ge[c.p.id].serializeDelData.call(c, d) : d,
                                    complete: function(a, g) {
                                        var h;
                                        if ($("#dData", "#" + m + "_2").removeClass(f.active),
                                        a.status >= 300 && 304 !== a.status ? (e[0] = !1,
                                        e[1] = $(c).triggerHandler("jqGridDelRowErrorTextFormat", [a]),
                                        $.isFunction(rp_ge[c.p.id].errorTextFormat) && (e[1] = rp_ge[c.p.id].errorTextFormat.call(c, a)),
                                        void 0 === e[1] && (e[1] = g + " Status: '" + a.statusText + "'. Error code: " + a.status)) : (e = $(c).triggerHandler("jqGridDelRowAfterSubmit", [a, d]),
                                        void 0 === e && (e = [!0, "", ""]),
                                        e[0] && $.isFunction(rp_ge[c.p.id].afterSubmit) && (e = rp_ge[c.p.id].afterSubmit.call(c, a, d))),
                                        !1 === e[0])
                                            $("#DelError>td", "#" + m).html(e[1]),
                                            $("#DelError", "#" + m).show();
                                        else {
                                            if (rp_ge[c.p.id].reloadAfterSubmit && "local" !== c.p.datatype)
                                                $(c).trigger("reloadGrid");
                                            else {
                                                if (!0 === c.p.treeGrid)
                                                    try {
                                                        $(c).jqGrid("delTreeNode", c.p.idPrefix + l[0])
                                                    } catch (a) {}
                                                else
                                                    for (h = 0; h < l.length; h++)
                                                        $(c).jqGrid("delRowData", c.p.idPrefix + l[h]);
                                                c.p.selrow = null,
                                                c.p.selarrrow = []
                                            }
                                            if ($.isFunction(rp_ge[c.p.id].afterComplete) || $._data($(c)[0], "events").hasOwnProperty("jqGridDelRowAfterComplete")) {
                                                var i = a;
                                                setTimeout(function() {
                                                    $(c).triggerHandler("jqGridDelRowAfterComplete", [i, d]);
                                                    try {
                                                        rp_ge[c.p.id].afterComplete.call(c, i, d)
                                                    } catch (a) {}
                                                }, 500)
                                            }
                                        }
                                        rp_ge[c.p.id].processing = !1,
                                        e[0] && $.jgrid.hideModal("#" + $.jgrid.jqID(o.themodal), {
                                            gb: "#gbox_" + $.jgrid.jqID(j),
                                            jqm: b.jqModal,
                                            onClose: rp_ge[c.p.id].onClose
                                        })
                                    }
                                }, $.jgrid.ajaxOptions, rp_ge[c.p.id].ajaxDelOptions);
                                if (n.url || rp_ge[c.p.id].useDataProxy || ($.isFunction(c.p.dataProxy) ? rp_ge[c.p.id].useDataProxy = !0 : (e[0] = !1,
                                e[1] += " " + $.jgrid.getRegional(c, "errors.nourl"))),
                                e[0])
                                    if (rp_ge[c.p.id].useDataProxy) {
                                        var p = c.p.dataProxy.call(c, n, "del_" + c.p.id);
                                        void 0 === p && (p = [!0, ""]),
                                        !1 === p[0] ? (e[0] = !1,
                                        e[1] = p[1] || "Error deleting the selected row!") : $.jgrid.hideModal("#" + $.jgrid.jqID(o.themodal), {
                                            gb: "#gbox_" + $.jgrid.jqID(j),
                                            jqm: b.jqModal,
                                            onClose: rp_ge[c.p.id].onClose
                                        })
                                    } else
                                        "clientArray" === n.url ? (d = n.data,
                                        n.complete({
                                            status: 200,
                                            statusText: ""
                                        }, "")) : $.ajax(n)
                            }
                            return !1 === e[0] && ($("#DelError>td", "#" + m).html(e[1]),
                            $("#DelError", "#" + m).show()),
                            !1
                        }),
                        $("#eData", "#" + m + "_2").click(function() {
                            return $.jgrid.hideModal("#" + $.jgrid.jqID(o.themodal), {
                                gb: "#gbox_" + $.jgrid.jqID(j),
                                jqm: rp_ge[c.p.id].jqModal,
                                onClose: rp_ge[c.p.id].onClose
                            }),
                            !1
                        }),
                        $("#" + m + "_2").find("[data-index]").each(function() {
                            var a = parseInt($(this).attr("data-index"), 10);
                            a >= 0 && b.buttons[a].hasOwnProperty("click") && $(this).on("click", function(d) {
                                b.buttons[a].click.call(c, $("#" + n)[0], rp_ge[c.p.id], d)
                            })
                        }),
                        l = $(c).triggerHandler("jqGridDelRowBeforeInitData", [$("#" + m)]),
                        void 0 === l && (l = !0),
                        l && $.isFunction(rp_ge[c.p.id].beforeInitData) && (l = rp_ge[c.p.id].beforeInitData.call(c, $("#" + m))),
                        !1 === l)
                            return;
                        $(c).triggerHandler("jqGridDelRowBeforeShowForm", [$("#" + m)]),
                        $.isFunction(rp_ge[c.p.id].beforeShowForm) && rp_ge[c.p.id].beforeShowForm.call(c, $("#" + m)),
                        $.jgrid.viewModal("#" + $.jgrid.jqID(o.themodal), {
                            gbox: "#gbox_" + $.jgrid.jqID(j),
                            jqm: rp_ge[c.p.id].jqModal,
                            overlay: rp_ge[c.p.id].overlay,
                            modal: rp_ge[c.p.id].modal
                        }),
                        $(c).triggerHandler("jqGridDelRowAfterShowForm", [$("#" + m)]),
                        $.isFunction(rp_ge[c.p.id].afterShowForm) && rp_ge[c.p.id].afterShowForm.call(c, $("#" + m))
                    }
                    !0 === rp_ge[c.p.id].closeOnEscape && setTimeout(function() {
                        $(".ui-jqdialog-titlebar-close", "#" + $.jgrid.jqID(o.modalhead)).attr("tabindex", "-1").focus()
                    }, 0)
                }
            })
        },
        navGrid: function(a, b, c, d, e, f, g) {
            var h = $.jgrid.getRegional(this[0], "nav")
              , i = this[0].p.styleUI
              , j = $.jgrid.styleUI[i].navigator
              , k = $.jgrid.styleUI[i].common;
            return b = $.extend({
                edit: !0,
                editicon: j.icon_edit_nav,
                add: !0,
                addicon: j.icon_add_nav,
                del: !0,
                delicon: j.icon_del_nav,
                search: !0,
                searchicon: j.icon_search_nav,
                refresh: !0,
                refreshicon: j.icon_refresh_nav,
                refreshstate: "firstpage",
                view: !1,
                viewicon: j.icon_view_nav,
                position: "left",
                closeOnEscape: !0,
                beforeRefresh: null,
                afterRefresh: null,
                cloneToTop: !1,
                alertwidth: 200,
                alertheight: "auto",
                alerttop: null,
                alertleft: null,
                alertzIndex: null,
                dropmenu: !1,
                navButtonText: ""
            }, h, b || {}),
            this.each(function() {
                if (!this.p.navGrid) {
                    var j, l, m, n = {
                        themodal: "alertmod_" + this.p.id,
                        modalhead: "alerthd_" + this.p.id,
                        modalcontent: "alertcnt_" + this.p.id
                    }, o = this;
                    if (o.grid && "string" == typeof a) {
                        if ($(o).data("navGrid") || $(o).data("navGrid", b),
                        m = $(o).data("navGrid"),
                        o.p.force_regional && (m = $.extend(m, h)),
                        void 0 === $("#" + n.themodal)[0]) {
                            m.alerttop || m.alertleft || (void 0 !== window.innerWidth ? (m.alertleft = window.innerWidth,
                            m.alerttop = window.innerHeight) : void 0 !== document.documentElement && void 0 !== document.documentElement.clientWidth && 0 !== document.documentElement.clientWidth ? (m.alertleft = document.documentElement.clientWidth,
                            m.alerttop = document.documentElement.clientHeight) : (m.alertleft = 1024,
                            m.alerttop = 768),
                            m.alertleft = m.alertleft / 2 - parseInt(m.alertwidth, 10) / 2,
                            m.alerttop = m.alerttop / 2 - 25);
                            var p = $(".ui-jqgrid").css("font-size") || "11px";
                            $.jgrid.createModal(n, "<div>" + m.alerttext + "</div><span tabindex='0'><span tabindex='-1' id='jqg_alrt'></span></span>", {
                                gbox: "#gbox_" + $.jgrid.jqID(o.p.id),
                                jqModal: !0,
                                drag: !0,
                                resize: !0,
                                caption: m.alertcap,
                                top: m.alerttop,
                                left: m.alertleft,
                                width: m.alertwidth,
                                height: m.alertheight,
                                closeOnEscape: m.closeOnEscape,
                                zIndex: m.alertzIndex,
                                styleUI: o.p.styleUI
                            }, "#gview_" + $.jgrid.jqID(o.p.id), $("#gbox_" + $.jgrid.jqID(o.p.id))[0], !0, {
                                "font-size": p
                            })
                        }
                        var q, r = 1, s = function() {
                            $(this).hasClass(k.disabled) || $(this).addClass(k.hover)
                        }, t = function() {
                            $(this).removeClass(k.hover)
                        };
                        for (m.cloneToTop && o.p.toppager && (r = 2),
                        q = 0; q < r; q++) {
                            var u, v, w, x = $("<table class='ui-pg-table navtable ui-common-table'><tbody><tr></tr></tbody></table>"), y = "<td class='ui-pg-button " + k.disabled + "' style='width:4px;'><span class='ui-separator'></span></td>";
                            0 === q ? (v = a,
                            w = o.p.id,
                            v === o.p.toppager && (w += "_top",
                            r = 1)) : (v = o.p.toppager,
                            w = o.p.id + "_top"),
                            "rtl" === o.p.direction && $(x).attr("dir", "rtl").css("float", "right"),
                            d = d || {},
                            m.add && (u = $("<td class='ui-pg-button " + k.cornerall + "'></td>"),
                            $(u).append("<div class='ui-pg-div'><span class='" + k.icon_base + " " + m.addicon + "'></span>" + m.addtext + "</div>"),
                            $("tr", x).append(u),
                            $(u, x).attr({
                                title: m.addtitle || "",
                                id: d.id || "add_" + w
                            }).click(function() {
                                return $(this).hasClass(k.disabled) || ($.isFunction(m.addfunc) ? m.addfunc.call(o) : $(o).jqGrid("editGridRow", "new", d)),
                                !1
                            }).hover(s, t),
                            u = null),
                            c = c || {},
                            m.edit && (u = $("<td class='ui-pg-button " + k.cornerall + "'></td>"),
                            $(u).append("<div class='ui-pg-div'><span class='" + k.icon_base + " " + m.editicon + "'></span>" + m.edittext + "</div>"),
                            $("tr", x).append(u),
                            $(u, x).attr({
                                title: m.edittitle || "",
                                id: c.id || "edit_" + w
                            }).click(function() {
                                if (!$(this).hasClass(k.disabled)) {
                                    var a = o.p.selrow;
                                    a ? $.isFunction(m.editfunc) ? m.editfunc.call(o, a) : $(o).jqGrid("editGridRow", a, c) : ($.jgrid.viewModal("#" + n.themodal, {
                                        gbox: "#gbox_" + $.jgrid.jqID(o.p.id),
                                        jqm: !0
                                    }),
                                    $("#jqg_alrt").focus())
                                }
                                return !1
                            }).hover(s, t),
                            u = null),
                            g = g || {},
                            m.view && (u = $("<td class='ui-pg-button " + k.cornerall + "'></td>"),
                            $(u).append("<div class='ui-pg-div'><span class='" + k.icon_base + " " + m.viewicon + "'></span>" + m.viewtext + "</div>"),
                            $("tr", x).append(u),
                            $(u, x).attr({
                                title: m.viewtitle || "",
                                id: g.id || "view_" + w
                            }).click(function() {
                                if (!$(this).hasClass(k.disabled)) {
                                    var a = o.p.selrow;
                                    a ? $.isFunction(m.viewfunc) ? m.viewfunc.call(o, a) : $(o).jqGrid("viewGridRow", a, g) : ($.jgrid.viewModal("#" + n.themodal, {
                                        gbox: "#gbox_" + $.jgrid.jqID(o.p.id),
                                        jqm: !0
                                    }),
                                    $("#jqg_alrt").focus())
                                }
                                return !1
                            }).hover(s, t),
                            u = null),
                            e = e || {},
                            m.del && (u = $("<td class='ui-pg-button " + k.cornerall + "'></td>"),
                            $(u).append("<div class='ui-pg-div'><span class='" + k.icon_base + " " + m.delicon + "'></span>" + m.deltext + "</div>"),
                            $("tr", x).append(u),
                            $(u, x).attr({
                                title: m.deltitle || "",
                                id: e.id || "del_" + w
                            }).click(function() {
                                if (!$(this).hasClass(k.disabled)) {
                                    var a;
                                    o.p.multiselect ? (a = o.p.selarrrow,
                                    0 === a.length && (a = null)) : a = o.p.selrow,
                                    a ? $.isFunction(m.delfunc) ? m.delfunc.call(o, a) : $(o).jqGrid("delGridRow", a, e) : ($.jgrid.viewModal("#" + n.themodal, {
                                        gbox: "#gbox_" + $.jgrid.jqID(o.p.id),
                                        jqm: !0
                                    }),
                                    $("#jqg_alrt").focus())
                                }
                                return !1
                            }).hover(s, t),
                            u = null),
                            (m.add || m.edit || m.del || m.view) && $("tr", x).append(y),
                            f = f || {},
                            m.search && (u = $("<td class='ui-pg-button " + k.cornerall + "'></td>"),
                            $(u).append("<div class='ui-pg-div'><span class='" + k.icon_base + " " + m.searchicon + "'></span>" + m.searchtext + "</div>"),
                            $("tr", x).append(u),
                            $(u, x).attr({
                                title: m.searchtitle || "",
                                id: f.id || "search_" + w
                            }).click(function() {
                                return $(this).hasClass(k.disabled) || ($.isFunction(m.searchfunc) ? m.searchfunc.call(o, f) : $(o).jqGrid("searchGrid", f)),
                                !1
                            }).hover(s, t),
                            f.showOnLoad && !0 === f.showOnLoad && $(u, x).click(),
                            u = null),
                            m.refresh && (u = $("<td class='ui-pg-button " + k.cornerall + "'></td>"),
                            $(u).append("<div class='ui-pg-div'><span class='" + k.icon_base + " " + m.refreshicon + "'></span>" + m.refreshtext + "</div>"),
                            $("tr", x).append(u),
                            $(u, x).attr({
                                title: m.refreshtitle || "",
                                id: "refresh_" + w
                            }).click(function() {
                                if (!$(this).hasClass(k.disabled)) {
                                    $.isFunction(m.beforeRefresh) && m.beforeRefresh.call(o),
                                    o.p.search = !1,
                                    o.p.resetsearch = !0;
                                    try {
                                        if ("currentfilter" !== m.refreshstate) {
                                            var a = o.p.id;
                                            o.p.postData.filters = "";
                                            try {
                                                $("#fbox_" + $.jgrid.jqID(a)).jqFilter("resetFilter")
                                            } catch (a) {}
                                            $.isFunction(o.clearToolbar) && o.clearToolbar.call(o, !1)
                                        }
                                    } catch (a) {}
                                    switch (m.refreshstate) {
                                    case "firstpage":
                                        $(o).trigger("reloadGrid", [{
                                            page: 1
                                        }]);
                                        break;
                                    case "current":
                                    case "currentfilter":
                                        $(o).trigger("reloadGrid", [{
                                            current: !0
                                        }])
                                    }
                                    $.isFunction(m.afterRefresh) && m.afterRefresh.call(o)
                                }
                                return !1
                            }).hover(s, t),
                            u = null),
                            l = $(".ui-jqgrid").css("font-size") || "11px",
                            $("body").append("<div id='testpg2' class='ui-jqgrid " + $.jgrid.styleUI[i].base.entrieBox + "' style='font-size:" + l + ";visibility:hidden;' ></div>"),
                            j = $(x).clone().appendTo("#testpg2").width(),
                            $("#testpg2").remove(),
                            o.p._nvtd && (m.dropmenu ? (x = null,
                            $(o).jqGrid("_buildNavMenu", v, w, b, c, d, e, f, g)) : j > o.p._nvtd[0] ? (o.p.responsive ? (x = null,
                            $(o).jqGrid("_buildNavMenu", v, w, b, c, d, e, f, g)) : $(v + "_" + m.position, v).append(x).width(j),
                            o.p._nvtd[0] = j) : $(v + "_" + m.position, v).append(x),
                            o.p._nvtd[1] = j),
                            o.p.navGrid = !0
                        }
                        o.p.storeNavOptions && (o.p.navOptions = m,
                        o.p.editOptions = c,
                        o.p.addOptions = d,
                        o.p.delOptions = e,
                        o.p.searchOptions = f,
                        o.p.viewOptions = g,
                        o.p.navButtons = [])
                    }
                }
            })
        },
        navButtonAdd: function(a, b) {
            var c = this[0].p.styleUI
              , d = $.jgrid.styleUI[c].navigator;
            return b = $.extend({
                caption: "newButton",
                title: "",
                buttonicon: d.icon_newbutton_nav,
                onClickButton: null,
                position: "last",
                cursor: "pointer",
                internal: !1
            }, b || {}),
            this.each(function() {
                if (this.grid) {
                    "string" == typeof a && 0 !== a.indexOf("#") && (a = "#" + $.jgrid.jqID(a));
                    var d = $(".navtable", a)[0]
                      , e = this
                      , f = $.jgrid.styleUI[c].common.disabled
                      , g = $.jgrid.styleUI[c].common.hover
                      , h = $.jgrid.styleUI[c].common.cornerall
                      , i = $.jgrid.styleUI[c].common.icon_base;
                    if (e.p.storeNavOptions && !b.internal && e.p.navButtons.push([a, b]),
                    d) {
                        if (b.id && void 0 !== $("#" + $.jgrid.jqID(b.id), d)[0])
                            return;
                        var j = $("<td></td>");
                        "NONE" === b.buttonicon.toString().toUpperCase() ? $(j).addClass("ui-pg-button " + h).append("<div class='ui-pg-div'>" + b.caption + "</div>") : $(j).addClass("ui-pg-button " + h).append("<div class='ui-pg-div'><span class='" + i + " " + b.buttonicon + "'></span>" + b.caption + "</div>"),
                        b.id && $(j).attr("id", b.id),
                        "first" === b.position ? 0 === d.rows[0].cells.length ? $("tr", d).append(j) : $("tr td:eq(0)", d).before(j) : $("tr", d).append(j),
                        $(j, d).attr("title", b.title || "").click(function(a) {
                            return $(this).hasClass(f) || $.isFunction(b.onClickButton) && b.onClickButton.call(e, a),
                            !1
                        }).hover(function() {
                            $(this).hasClass(f) || $(this).addClass(g)
                        }, function() {
                            $(this).removeClass(g)
                        })
                    } else if (d = $(".dropdownmenu", a)[0]) {
                        var k = $(d).val()
                          , l = b.id || $.jgrid.randId()
                          , m = $('<li class="ui-menu-item" role="presentation"><a class="' + h + ' g-menu-item" tabindex="0" role="menuitem" id="' + l + '">' + (b.caption || b.title) + "</a></li>");
                        k && ("first" === b.position ? $("#" + k).prepend(m) : $("#" + k).append(m),
                        $(m).on("click", function(a) {
                            return $(this).hasClass(f) || ($("#" + k).hide(),
                            $.isFunction(b.onClickButton) && b.onClickButton.call(e, a)),
                            !1
                        }).find("a").hover(function() {
                            $(this).hasClass(f) || $(this).addClass(g)
                        }, function() {
                            $(this).removeClass(g)
                        }))
                    }
                }
            })
        },
        navSeparatorAdd: function(a, b) {
            var c = this[0].p.styleUI
              , d = $.jgrid.styleUI[c].common;
            return b = $.extend({
                sepclass: "ui-separator",
                sepcontent: "",
                position: "last"
            }, b || {}),
            this.each(function() {
                if (this.grid) {
                    "string" == typeof a && 0 !== a.indexOf("#") && (a = "#" + $.jgrid.jqID(a));
                    var c, e, f = $(".navtable", a)[0];
                    this.p.storeNavOptions && this.p.navButtons.push([a, b]),
                    f ? (c = "<td class='ui-pg-button " + d.disabled + "' style='width:4px;'><span class='" + b.sepclass + "'></span>" + b.sepcontent + "</td>",
                    "first" === b.position ? 0 === f.rows[0].cells.length ? $("tr", f).append(c) : $("tr td:eq(0)", f).before(c) : $("tr", f).append(c)) : (f = $(".dropdownmenu", a)[0],
                    c = "<li class='ui-menu-item " + d.disabled + "' style='width:100%' role='presentation'><hr class='ui-separator-li'></li>",
                    f && (e = $(f).val()) && ("first" === b.position ? $("#" + e).prepend(c) : $("#" + e).append(c)))
                }
            })
        },
        _buildNavMenu: function(a, b, c, d, e, f, g, h) {
            return this.each(function() {
                var i = this
                  , j = $.jgrid.getRegional(i, "nav")
                  , k = i.p.styleUI
                  , l = ($.jgrid.styleUI[k].navigator,
                $.jgrid.styleUI[k].filter)
                  , m = $.jgrid.styleUI[k].common
                  , n = "form_menu_" + $.jgrid.randId()
                  , o = c.navButtonText ? c.navButtonText : j.selectcaption || "Actions"
                  , p = "<button class='dropdownmenu " + m.button + "' value='" + n + "'>" + o + "</button>";
                $(a + "_" + c.position, a).append(p);
                var q = {
                    themodal: "alertmod_" + this.p.id,
                    modalhead: "alerthd_" + this.p.id,
                    modalcontent: "alertcnt_" + this.p.id
                };
                (function() {
                    var a, j, k = $(".ui-jqgrid").css("font-size") || "11px", o = $('<ul id="' + n + '" class="ui-nav-menu modal-content" role="menu" tabindex="0" style="display:none;font-size:' + k + '"></ul>');
                    c.add && (e = e || {},
                    a = e.id || "add_" + b,
                    j = $('<li class="ui-menu-item" role="presentation"><a class="' + m.cornerall + ' g-menu-item" tabindex="0" role="menuitem" id="' + a + '">' + (c.addtext || c.addtitle) + "</a></li>").click(function() {
                        return $(this).hasClass(m.disabled) || ($.isFunction(c.addfunc) ? c.addfunc.call(i) : $(i).jqGrid("editGridRow", "new", e),
                        $(o).hide()),
                        !1
                    }),
                    $(o).append(j)),
                    c.edit && (d = d || {},
                    a = d.id || "edit_" + b,
                    j = $('<li class="ui-menu-item" role="presentation"><a class="' + m.cornerall + ' g-menu-item" tabindex="0" role="menuitem" id="' + a + '">' + (c.edittext || c.edittitle) + "</a></li>").click(function() {
                        if (!$(this).hasClass(m.disabled)) {
                            var a = i.p.selrow;
                            a ? $.isFunction(c.editfunc) ? c.editfunc.call(i, a) : $(i).jqGrid("editGridRow", a, d) : ($.jgrid.viewModal("#" + q.themodal, {
                                gbox: "#gbox_" + $.jgrid.jqID(i.p.id),
                                jqm: !0
                            }),
                            $("#jqg_alrt").focus()),
                            $(o).hide()
                        }
                        return !1
                    }),
                    $(o).append(j)),
                    c.view && (h = h || {},
                    a = h.id || "view_" + b,
                    j = $('<li class="ui-menu-item" role="presentation"><a class="' + m.cornerall + ' g-menu-item" tabindex="0" role="menuitem" id="' + a + '">' + (c.viewtext || c.viewtitle) + "</a></li>").click(function() {
                        if (!$(this).hasClass(m.disabled)) {
                            var a = i.p.selrow;
                            a ? $.isFunction(c.editfunc) ? c.viewfunc.call(i, a) : $(i).jqGrid("viewGridRow", a, h) : ($.jgrid.viewModal("#" + q.themodal, {
                                gbox: "#gbox_" + $.jgrid.jqID(i.p.id),
                                jqm: !0
                            }),
                            $("#jqg_alrt").focus()),
                            $(o).hide()
                        }
                        return !1
                    }),
                    $(o).append(j)),
                    c.del && (f = f || {},
                    a = f.id || "del_" + b,
                    j = $('<li class="ui-menu-item" role="presentation"><a class="' + m.cornerall + ' g-menu-item" tabindex="0" role="menuitem" id="' + a + '">' + (c.deltext || c.deltitle) + "</a></li>").click(function() {
                        if (!$(this).hasClass(m.disabled)) {
                            var a;
                            i.p.multiselect ? (a = i.p.selarrrow,
                            0 === a.length && (a = null)) : a = i.p.selrow,
                            a ? $.isFunction(c.delfunc) ? c.delfunc.call(i, a) : $(i).jqGrid("delGridRow", a, f) : ($.jgrid.viewModal("#" + q.themodal, {
                                gbox: "#gbox_" + $.jgrid.jqID(i.p.id),
                                jqm: !0
                            }),
                            $("#jqg_alrt").focus()),
                            $(o).hide()
                        }
                        return !1
                    }),
                    $(o).append(j)),
                    (c.add || c.edit || c.del || c.view) && $(o).append("<li class='ui-menu-item " + m.disabled + "' style='width:100%' role='presentation'><hr class='ui-separator-li'></li>"),
                    c.search && (g = g || {},
                    a = g.id || "search_" + b,
                    j = $('<li class="ui-menu-item" role="presentation"><a class="' + m.cornerall + ' g-menu-item" tabindex="0" role="menuitem" id="' + a + '">' + (c.searchtext || c.searchtitle) + "</a></li>").click(function() {
                        return $(this).hasClass(m.disabled) || ($.isFunction(c.searchfunc) ? c.searchfunc.call(i, g) : $(i).jqGrid("searchGrid", g),
                        $(o).hide()),
                        !1
                    }),
                    $(o).append(j),
                    g.showOnLoad && !0 === g.showOnLoad && $(j).click()),
                    c.refresh && (a = g.id || "search_" + b,
                    j = $('<li class="ui-menu-item" role="presentation"><a class="' + m.cornerall + ' g-menu-item" tabindex="0" role="menuitem" id="' + a + '">' + (c.refreshtext || c.refreshtitle) + "</a></li>").click(function() {
                        if (!$(this).hasClass(m.disabled)) {
                            $.isFunction(c.beforeRefresh) && c.beforeRefresh.call(i),
                            i.p.search = !1,
                            i.p.resetsearch = !0;
                            try {
                                if ("currentfilter" !== c.refreshstate) {
                                    var a = i.p.id;
                                    i.p.postData.filters = "";
                                    try {
                                        $("#fbox_" + $.jgrid.jqID(a)).jqFilter("resetFilter")
                                    } catch (a) {}
                                    $.isFunction(i.clearToolbar) && i.clearToolbar.call(i, !1)
                                }
                            } catch (a) {}
                            switch (c.refreshstate) {
                            case "firstpage":
                                $(i).trigger("reloadGrid", [{
                                    page: 1
                                }]);
                                break;
                            case "current":
                            case "currentfilter":
                                $(i).trigger("reloadGrid", [{
                                    current: !0
                                }])
                            }
                            $.isFunction(c.afterRefresh) && c.afterRefresh.call(i),
                            $(o).hide()
                        }
                        return !1
                    }),
                    $(o).append(j)),
                    $(o).hide(),
                    $("body").append(o),
                    $("#" + n).addClass("ui-menu " + l.menu_widget),
                    $("#" + n + " > li > a").hover(function() {
                        $(this).addClass(m.hover)
                    }, function() {
                        $(this).removeClass(m.hover)
                    })
                }
                )(),
                $(".dropdownmenu", a + "_" + c.position).on("click", function(a) {
                    var b = $(this).offset()
                      , c = b.left
                      , d = parseInt(b.top)
                      , e = $(this).val();
                    $("#" + e).show().css({
                        top: d - ($("#" + e).height() + 10) + "px",
                        left: c + "px"
                    }),
                    a.stopPropagation()
                }),
                $("body").on("click", function(a) {
                    $(a.target).hasClass("dropdownmenu") || $("#" + n).hide()
                })
            })
        },
        GridToForm: function(a, b) {
            return this.each(function() {
                var c, d = this;
                if (d.grid) {
                    var e = $(d).jqGrid("getRowData", a);
                    if (e)
                        for (c in e)
                            e.hasOwnProperty(c) && ($("[name=" + $.jgrid.jqID(c) + "]", b).is("input:radio") || $("[name=" + $.jgrid.jqID(c) + "]", b).is("input:checkbox") ? $("[name=" + $.jgrid.jqID(c) + "]", b).each(function() {
                                $(this).val() == e[c] ? $(this)[d.p.useProp ? "prop" : "attr"]("checked", !0) : $(this)[d.p.useProp ? "prop" : "attr"]("checked", !1)
                            }) : $("[name=" + $.jgrid.jqID(c) + "]", b).val(e[c]))
                }
            })
        },
        FormToGrid: function(a, b, c, d) {
            return this.each(function() {
                var e = this;
                if (e.grid) {
                    c || (c = "set"),
                    d || (d = "first");
                    var f = $(b).serializeArray()
                      , g = {};
                    $.each(f, function(a, b) {
                        g[b.name] = b.value
                    }),
                    "add" === c ? $(e).jqGrid("addRowData", a, g, d) : "set" === c && $(e).jqGrid("setRowData", a, g)
                }
            })
        }
    }),
    $.jgrid.extend({
        groupingSetup: function() {
            return this.each(function() {
                var a, b, c, d = this, e = d.p.colModel, f = d.p.groupingView, g = $.jgrid.styleUI[d.p.styleUI || "jQueryUI"].grouping;
                if (null === f || "object" != typeof f && !$.isFunction(f))
                    d.p.grouping = !1;
                else if (f.plusicon || (f.plusicon = g.icon_plus),
                f.minusicon || (f.minusicon = g.icon_minus),
                f.groupField.length) {
                    for (void 0 === f.visibiltyOnNextGrouping && (f.visibiltyOnNextGrouping = []),
                    f.lastvalues = [],
                    f._locgr || (f.groups = []),
                    f.counters = [],
                    a = 0; a < f.groupField.length; a++)
                        f.groupOrder[a] || (f.groupOrder[a] = "asc"),
                        f.groupText[a] || (f.groupText[a] = "{0}"),
                        "boolean" != typeof f.groupColumnShow[a] && (f.groupColumnShow[a] = !0),
                        "boolean" != typeof f.groupSummary[a] && (f.groupSummary[a] = !1),
                        f.groupSummaryPos[a] || (f.groupSummaryPos[a] = "footer"),
                        !0 === f.groupColumnShow[a] ? (f.visibiltyOnNextGrouping[a] = !0,
                        $(d).jqGrid("showCol", f.groupField[a])) : (f.visibiltyOnNextGrouping[a] = $("#" + $.jgrid.jqID(d.p.id + "_" + f.groupField[a])).is(":visible"),
                        $(d).jqGrid("hideCol", f.groupField[a]));
                    for (f.summary = [],
                    f.hideFirstGroupCol && $.isArray(f.formatDisplayField) && !$.isFunction(f.formatDisplayField[0]) && (f.formatDisplayField[0] = function(a) {
                        return a
                    }
                    ),
                    b = 0,
                    c = e.length; b < c; b++)
                        f.hideFirstGroupCol && (e[b].hidden || f.groupField[0] !== e[b].name || (e[b].formatter = function() {
                            return ""
                        }
                        )),
                        e[b].summaryType && (e[b].summaryDivider ? f.summary.push({
                            nm: e[b].name,
                            st: e[b].summaryType,
                            v: "",
                            sd: e[b].summaryDivider,
                            vd: "",
                            sr: e[b].summaryRound,
                            srt: e[b].summaryRoundType || "round"
                        }) : f.summary.push({
                            nm: e[b].name,
                            st: e[b].summaryType,
                            v: "",
                            sr: e[b].summaryRound,
                            srt: e[b].summaryRoundType || "round"
                        }))
                } else
                    d.p.grouping = !1
            })
        },
        groupingPrepare: function(a, b) {
            return this.each(function() {
                var c, d, e, f, g, h = this.p.groupingView, i = this, j = function() {
                    $.isFunction(this.st) ? this.v = this.st.call(i, this.v, this.nm, a) : (this.v = $(i).jqGrid("groupingCalculations.handler", this.st, this.v, this.nm, this.sr, this.srt, a),
                    "avg" === this.st.toLowerCase() && this.sd && (this.vd = $(i).jqGrid("groupingCalculations.handler", this.st, this.vd, this.sd, this.sr, this.srt, a)))
                }, k = h.groupField.length, l = 0;
                for (c = 0; c < k; c++)
                    d = h.groupField[c],
                    f = h.displayField[c],
                    e = a[d],
                    g = null == f ? null : a[f],
                    null == g && (g = e),
                    void 0 !== e && (0 === b ? (h.groups.push({
                        idx: c,
                        dataIndex: d,
                        value: e,
                        displayValue: g,
                        startRow: b,
                        cnt: 1,
                        summary: []
                    }),
                    h.lastvalues[c] = e,
                    h.counters[c] = {
                        cnt: 1,
                        pos: h.groups.length - 1,
                        summary: $.extend(!0, [], h.summary)
                    },
                    $.each(h.counters[c].summary, j),
                    h.groups[h.counters[c].pos].summary = h.counters[c].summary) : "object" == typeof e || ($.isArray(h.isInTheSameGroup) && $.isFunction(h.isInTheSameGroup[c]) ? h.isInTheSameGroup[c].call(i, h.lastvalues[c], e, c, h) : h.lastvalues[c] === e) ? 1 === l ? (h.groups.push({
                        idx: c,
                        dataIndex: d,
                        value: e,
                        displayValue: g,
                        startRow: b,
                        cnt: 1,
                        summary: []
                    }),
                    h.lastvalues[c] = e,
                    h.counters[c] = {
                        cnt: 1,
                        pos: h.groups.length - 1,
                        summary: $.extend(!0, [], h.summary)
                    },
                    $.each(h.counters[c].summary, j),
                    h.groups[h.counters[c].pos].summary = h.counters[c].summary) : (h.counters[c].cnt += 1,
                    h.groups[h.counters[c].pos].cnt = h.counters[c].cnt,
                    $.each(h.counters[c].summary, j),
                    h.groups[h.counters[c].pos].summary = h.counters[c].summary) : (h.groups.push({
                        idx: c,
                        dataIndex: d,
                        value: e,
                        displayValue: g,
                        startRow: b,
                        cnt: 1,
                        summary: []
                    }),
                    h.lastvalues[c] = e,
                    l = 1,
                    h.counters[c] = {
                        cnt: 1,
                        pos: h.groups.length - 1,
                        summary: $.extend(!0, [], h.summary)
                    },
                    $.each(h.counters[c].summary, j),
                    h.groups[h.counters[c].pos].summary = h.counters[c].summary))
            }),
            this
        },
        groupingToggle: function(a) {
            return this.each(function() {
                var b = this
                  , c = b.p.groupingView
                  , d = a.split("_")
                  , e = parseInt(d[d.length - 2], 10);
                d.splice(d.length - 2, 2);
                var f, g, h, i = d.join("_"), j = c.minusicon, k = c.plusicon, l = $("#" + $.jgrid.jqID(a)), m = l.length ? l[0].nextSibling : null, n = $("#" + $.jgrid.jqID(a) + " span.tree-wrap-" + b.p.direction), o = function(a) {
                    var b = $.map(a.split(" "), function(a) {
                        if (a.substring(0, i.length + 1) === i + "_")
                            return parseInt(a.substring(i.length + 1), 10)
                    });
                    return b.length > 0 ? b[0] : void 0
                }, p = !1, q = !1, r = !!b.p.frozenColumns && b.p.id + "_frozen", s = !!r && $("#" + $.jgrid.jqID(a), "#" + $.jgrid.jqID(r)), t = s && s.length ? s[0].nextSibling : null;
                if (n.hasClass(j)) {
                    if (m)
                        for (; m && !(void 0 !== (f = o(m.className)) && f <= e); )
                            h = parseInt($(m).attr("jqfootlevel"), 10),
                            q = !isNaN(h) && (c.showSummaryOnHide && h <= e),
                            q || $(m).hide(),
                            m = m.nextSibling,
                            r && (q || $(t).hide(),
                            t = t.nextSibling);
                    n.removeClass(j).addClass(k),
                    p = !0
                } else {
                    if (m)
                        for (g = void 0; m; ) {
                            if (f = o(m.className),
                            void 0 === g && (g = void 0 === f),
                            q = $(m).hasClass("ui-subgrid") && $(m).hasClass("ui-sg-collapsed"),
                            void 0 !== f) {
                                if (f <= e)
                                    break;
                                f === e + 1 && (q || ($(m).show().find(">td>span.tree-wrap-" + b.p.direction).removeClass(j).addClass(k),
                                r && $(t).show().find(">td>span.tree-wrap-" + b.p.direction).removeClass(j).addClass(k)))
                            } else
                                g && (q || ($(m).show(),
                                r && $(t).show()));
                            m = m.nextSibling,
                            r && (t = t.nextSibling)
                        }
                    n.removeClass(k).addClass(j)
                }
                $(b).triggerHandler("jqGridGroupingClickGroup", [a, p]),
                $.isFunction(b.p.onClickGroup) && b.p.onClickGroup.call(b, a, p)
            }),
            !1
        },
        groupingRender: function(a, b, c, d) {
            return this.each(function() {
                function e(a, b, c) {
                    var d, e = !1;
                    if (0 === b)
                        e = c[a];
                    else {
                        var f = c[a].idx;
                        if (0 === f)
                            e = c[a];
                        else
                            for (d = a; d >= 0; d--)
                                if (c[d].idx === f - b) {
                                    e = c[d];
                                    break
                                }
                    }
                    return e
                }
                function f(a, c, d, f, g) {
                    var h, i, k, l, m = e(a, c, d), n = j.p.colModel, o = m.cnt, p = "", q = !1;
                    for (i = f; i < b; i++)
                        n[i].hidden ? k = "<td " + j.formatCol(i, 1, "") + ">&#160;</td>" : !q && g ? (k = g,
                        q = !0) : k = "<td " + j.formatCol(i, 1, "") + ">&#160;</td>",
                        $.each(m.summary, function() {
                            if (this.nm === n[i].name) {
                                l = n[i].summaryTpl ? n[i].summaryTpl : "{0}",
                                "string" == typeof this.st && "avg" === this.st.toLowerCase() && (this.sd && this.vd ? this.v = this.v / this.vd : this.v && o > 0 && (this.v = this.v / o));
                                try {
                                    this.groupCount = m.cnt,
                                    this.groupIndex = m.dataIndex,
                                    this.groupValue = m.value,
                                    h = j.formatter("", this.v, i, this)
                                } catch (a) {
                                    h = this.v
                                }
                                return k = "<td " + j.formatCol(i, 1, "") + ">" + $.jgrid.template(l, h, m.cnt, m.dataIndex, m.displayValue) + "</td>",
                                !1
                            }
                        }),
                        p += k;
                    return p
                }
                var g, h, i, j = this, k = j.p.groupingView, l = "", m = "", n = k.groupCollapse ? k.plusicon : k.minusicon, o = [], p = k.groupField.length, q = $.jgrid.styleUI[j.p.styleUI || "jQueryUI"].common;
                n = n + " tree-wrap-" + j.p.direction,
                $.each(j.p.colModel, function(a, b) {
                    var c;
                    for (c = 0; c < p; c++)
                        if (k.groupField[c] === b.name) {
                            o[c] = a;
                            break
                        }
                });
                var r, s = 0, t = $.makeArray(k.groupSummary);
                t.reverse(),
                r = j.p.multiselect ? ' colspan="2"' : "",
                $.each(k.groups, function(e, u) {
                    if (k._locgr && !(u.startRow + u.cnt > (c - 1) * d && u.startRow < c * d))
                        return !0;
                    s++,
                    h = j.p.id + "ghead_" + u.idx,
                    g = h + "_" + e,
                    m = "<span style='cursor:pointer;margin-right:8px;margin-left:5px;' class='" + q.icon_base + " " + n + "' onclick=\"jQuery('#" + $.jgrid.jqID(j.p.id) + "').jqGrid('groupingToggle','" + g + "');return false;\"></span>";
                    try {
                        i = $.isArray(k.formatDisplayField) && $.isFunction(k.formatDisplayField[u.idx]) ? k.formatDisplayField[u.idx].call(j, u.displayValue, u.value, j.p.colModel[o[u.idx]], u.idx, k) : j.formatter(g, u.displayValue, o[u.idx], u.value)
                    } catch (a) {
                        i = u.displayValue
                    }
                    var v = "";
                    if (v = $.isFunction(k.groupText[u.idx]) ? k.groupText[u.idx].call(j, i, u.cnt, u.summary) : $.jgrid.template(k.groupText[u.idx], i, u.cnt, u.summary),
                    "string" != typeof v && "number" != typeof v && (v = i),
                    "header" === k.groupSummaryPos[u.idx] ? (l += '<tr id="' + g + '"' + (k.groupCollapse && u.idx > 0 ? ' style="display:none;" ' : " ") + 'role="row" class= "' + q.content + " jqgroup ui-row-" + j.p.direction + " " + h + '">',
                    l += f(e, 0, k.groups, "" === r ? 0 : 1, '<td style="padding-left:' + 12 * u.idx + 'px;"' + r + ">" + m + v + "</td>"),
                    l += "</tr>") : l += '<tr id="' + g + '"' + (k.groupCollapse && u.idx > 0 ? ' style="display:none;" ' : " ") + 'role="row" class= "' + q.content + " jqgroup ui-row-" + j.p.direction + " " + h + '"><td style="padding-left:' + 12 * u.idx + 'px;" colspan="' + (!1 === k.groupColumnShow[u.idx] ? b - 1 : b) + '">' + m + v + "</td></tr>",
                    p - 1 === u.idx) {
                        var w, x, y = k.groups[e + 1], z = 0, A = u.startRow, B = void 0 !== y ? y.startRow : k.groups[e].startRow + k.groups[e].cnt;
                        for (k._locgr && (z = (c - 1) * d) > u.startRow && (A = z),
                        w = A; w < B && a[w - z]; w++)
                            l += a[w - z].join("");
                        if ("header" !== k.groupSummaryPos[u.idx]) {
                            var C;
                            if (void 0 !== y) {
                                for (C = 0; C < k.groupField.length && y.dataIndex !== k.groupField[C]; C++)
                                    ;
                                s = k.groupField.length - C
                            }
                            for (x = 0; x < s; x++)
                                if (t[x]) {
                                    var D = "";
                                    k.groupCollapse && !k.showSummaryOnHide && (D = ' style="display:none;"'),
                                    l += "<tr" + D + ' jqfootlevel="' + (u.idx - x) + '" role="row" class="' + q.content + " jqfoot ui-row-" + j.p.direction + '">',
                                    l += f(e, x, k.groups, 0, !1),
                                    l += "</tr>"
                                }
                            s = C
                        }
                    }
                }),
                $("#" + $.jgrid.jqID(j.p.id) + " tbody:first").append(l),
                l = null
            })
        },
        groupingGroupBy: function(a, b) {
            return this.each(function() {
                var c = this;
                "string" == typeof a && (a = [a]);
                var d = c.p.groupingView;
                c.p.grouping = !0,
                d._locgr = !1,
                void 0 === d.visibiltyOnNextGrouping && (d.visibiltyOnNextGrouping = []);
                var e;
                for (e = 0; e < d.groupField.length; e++)
                    !d.groupColumnShow[e] && d.visibiltyOnNextGrouping[e] && $(c).jqGrid("showCol", d.groupField[e]);
                for (e = 0; e < a.length; e++)
                    d.visibiltyOnNextGrouping[e] = $("#" + $.jgrid.jqID(c.p.id) + "_" + $.jgrid.jqID(a[e])).is(":visible");
                c.p.groupingView = $.extend(c.p.groupingView, b || {}),
                d.groupField = a,
                $(c).trigger("reloadGrid")
            })
        },
        groupingRemove: function(a) {
            return this.each(function() {
                var b = this;
                if (void 0 === a && (a = !0),
                b.p.grouping = !1,
                !0 === a) {
                    var c, d = b.p.groupingView;
                    for (c = 0; c < d.groupField.length; c++)
                        !d.groupColumnShow[c] && d.visibiltyOnNextGrouping[c] && $(b).jqGrid("showCol", d.groupField);
                    $("tr.jqgroup, tr.jqfoot", "#" + $.jgrid.jqID(b.p.id) + " tbody:first").remove(),
                    $("tr.jqgrow:hidden", "#" + $.jgrid.jqID(b.p.id) + " tbody:first").show()
                } else
                    $(b).trigger("reloadGrid")
            })
        },
        groupingCalculations: {
            handler: function(a, b, c, d, e, f) {
                var g = {
                    sum: function() {
                        return parseFloat(b || 0) + parseFloat(f[c] || 0)
                    },
                    min: function() {
                        return "" === b ? parseFloat(f[c] || 0) : Math.min(parseFloat(b), parseFloat(f[c] || 0))
                    },
                    max: function() {
                        return "" === b ? parseFloat(f[c] || 0) : Math.max(parseFloat(b), parseFloat(f[c] || 0))
                    },
                    count: function() {
                        return "" === b && (b = 0),
                        f.hasOwnProperty(c) ? b + 1 : 0
                    },
                    avg: function() {
                        return g.sum()
                    }
                };
                if (!g[a])
                    throw "jqGrid Grouping No such method: " + a;
                var h = g[a]();
                if (null != d)
                    if ("fixed" === e)
                        h = h.toFixed(d);
                    else {
                        var i = Math.pow(10, d);
                        h = Math.round(h * i) / i
                    }
                return h
            }
        },
        setGroupHeaders: function(a) {
            return a = $.extend({
                useColSpanStyle: !1,
                groupHeaders: []
            }, a || {}),
            this.each(function() {
                var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p = this, q = 0, r = p.p.colModel, s = r.length, t = p.grid.headers, u = $("table.ui-jqgrid-htable", p.grid.hDiv), v = u.children("thead").children("tr.ui-jqgrid-labels:last").addClass("jqg-second-row-header"), w = u.children("thead"), x = u.find(".jqg-first-row-header"), y = $.jgrid.styleUI[p.p.styleUI || "jQueryUI"].base;
                p.p.groupHeader || (p.p.groupHeader = []),
                p.p.groupHeader.push(a),
                void 0 === x[0] ? x = $("<tr>", {
                    role: "row",
                    "aria-hidden": "true"
                }).addClass("jqg-first-row-header").css("height", "auto") : x.empty();
                var z, A = function(a, b) {
                    var c, d = b.length;
                    for (c = 0; c < d; c++)
                        if (b[c].startColumnName === a)
                            return c;
                    return -1
                };
                for ($(p).prepend(w),
                d = $("<tr>", {
                    role: "row"
                }).addClass("ui-jqgrid-labels jqg-third-row-header"),
                b = 0; b < s; b++)
                    if (f = t[b].el,
                    g = $(f),
                    c = r[b],
                    h = {
                        height: "0px",
                        width: t[b].width + "px",
                        display: c.hidden ? "none" : ""
                    },
                    $("<th>", {
                        role: "gridcell"
                    }).css(h).addClass("ui-first-th-" + p.p.direction).appendTo(x),
                    f.style.width = "",
                    (i = A(c.name, a.groupHeaders)) >= 0) {
                        for (j = a.groupHeaders[i],
                        k = j.numberOfColumns,
                        l = j.titleText,
                        n = j.className || "",
                        m = 0,
                        i = 0; i < k && b + i < s; i++)
                            r[b + i].hidden || m++;
                        e = $("<th>").attr({
                            role: "columnheader"
                        }).addClass(y.headerBox + " ui-th-column-header ui-th-" + p.p.direction + " " + n).html(l),
                        m > 0 && e.attr("colspan", String(m)),
                        p.p.headertitles && e.attr("title", e.text()),
                        0 === m && e.hide(),
                        g.before(e),
                        d.append(f),
                        q = k - 1
                    } else if (0 === q)
                        if (a.useColSpanStyle) {
                            var B = g.attr("rowspan") ? parseInt(g.attr("rowspan"), 10) + 1 : 2;
                            g.attr("rowspan", B)
                        } else
                            $("<th>", {
                                role: "columnheader"
                            }).addClass(y.headerBox + " ui-th-column-header ui-th-" + p.p.direction).css({
                                display: c.hidden ? "none" : ""
                            }).insertBefore(g),
                            d.append(f);
                    else
                        d.append(f),
                        q--;
                o = $(p).children("thead"),
                o.prepend(x),
                d.insertAfter(v),
                u.append(o),
                a.useColSpanStyle && (u.find("span.ui-jqgrid-resize").each(function() {
                    var a = $(this).parent();
                    a.is(":visible") && (this.style.cssText = "height: " + a.height() + "px !important; cursor: col-resize;")
                }),
                u.find("div.ui-jqgrid-sortable").each(function() {
                    var a = $(this)
                      , b = a.parent();
                    b.is(":visible") && b.is(":has(span.ui-jqgrid-resize)") && a.css("top", (b.height() - a.outerHeight()) / 2 - 4 + "px")
                })),
                z = o.find("tr.jqg-first-row-header"),
                $(p).on("jqGridResizeStop.setGroupHeaders", function(a, b, c) {
                    z.find("th").eq(c)[0].style.width = b + "px"
                })
            })
        },
        destroyGroupHeader: function(a) {
            return void 0 === a && (a = !0),
            this.each(function() {
                var b, c, d, e, f, g, h, i = this, j = i.grid, k = $("table.ui-jqgrid-htable thead", j.hDiv), l = i.p.colModel;
                if (j) {
                    for ($(this).off(".setGroupHeaders"),
                    b = $("<tr>", {
                        role: "row"
                    }).addClass("ui-jqgrid-labels"),
                    e = j.headers,
                    c = 0,
                    d = e.length; c < d; c++) {
                        h = l[c].hidden ? "none" : "",
                        f = $(e[c].el).width(e[c].width).css("display", h);
                        try {
                            f.removeAttr("rowSpan")
                        } catch (a) {
                            f.attr("rowSpan", 1)
                        }
                        b.append(f),
                        g = f.children("span.ui-jqgrid-resize"),
                        g.length > 0 && (g[0].style.height = ""),
                        f.children("div")[0].style.top = ""
                    }
                    $(k).children("tr.ui-jqgrid-labels").remove(),
                    $(k).prepend(b),
                    !0 === a && $(i).jqGrid("setGridParam", {
                        groupHeader: null
                    })
                }
            })
        }
    }),
    $.jgrid = $.jgrid || {},
    $.extend($.jgrid, {
        saveState: function(a, b) {
            if (b = $.extend({
                useStorage: !0,
                storageType: "localStorage",
                beforeSetItem: null,
                compression: !1,
                compressionModule: "LZString",
                compressionMethod: "compressToUTF16",
                debug: !1,
                saveData: !0
            }, b || {}),
            a) {
                var c, d, e = "", f = "", g = $("#" + a)[0];
                if (g.grid) {
                    if (d = $(g).data("inlineNav"),
                    d && g.p.inlineNav && $(g).jqGrid("setGridParam", {
                        _iN: d
                    }),
                    d = $(g).data("filterToolbar"),
                    d && g.p.filterToolbar && $(g).jqGrid("setGridParam", {
                        _fT: d
                    }),
                    e = $(g).jqGrid("jqGridExport", {
                        exptype: "jsonstring",
                        ident: "",
                        root: "",
                        data: b.saveData
                    }),
                    f = "",
                    b.saveData) {
                        f = $(g.grid.bDiv).find(".ui-jqgrid-btable tbody:first").html();
                        var h = f.indexOf("</tr>");
                        f = f.slice(h + 5)
                    }
                    if ($.isFunction(b.beforeSetItem) && null != (c = b.beforeSetItem.call(g, e)) && (e = c),
                    b.debug) {
                        $("#gbox_tree").prepend('<a id="link_save" target="_blank" download="jqGrid_dump.txt">Click to save Dump Data</a>');
                        var i, j, k = [], l = {};
                        k.push("Grid Options\n"),
                        k.push(e),
                        k.push("\n"),
                        k.push("GridData\n"),
                        k.push(f),
                        l.type = "plain/text;charset=utf-8";
                        try {
                            i = new File(k,"jqGrid_dump.txt",l)
                        } catch (a) {
                            i = new Blob(k,l)
                        }
                        j = URL.createObjectURL(i),
                        $("#link_save").attr("href", j).on("click", function() {
                            $(this).remove()
                        })
                    }
                    if (b.compression && b.compressionModule)
                        try {
                            c = window[b.compressionModule][b.compressionMethod](e),
                            null != c && (e = c,
                            f = window[b.compressionModule][b.compressionMethod](f))
                        } catch (a) {}
                    if (b.useStorage && $.jgrid.isLocalStorage())
                        try {
                            window[b.storageType].setItem("jqGrid" + g.p.id, e),
                            window[b.storageType].setItem("jqGrid" + g.p.id + "_data", f)
                        } catch (a) {
                            22 === a.code && alert("Local storage limit is over!")
                        }
                    return e
                }
            }
        },
        loadState: function(a, b, c) {
            if (c = $.extend({
                useStorage: !0,
                storageType: "localStorage",
                clearAfterLoad: !1,
                beforeSetGrid: null,
                afterSetGrid: null,
                decompression: !1,
                decompressionModule: "LZString",
                decompressionMethod: "decompressFromUTF16",
                restoreData: !0
            }, c || {}),
            a) {
                var d, e, f, g, h, i = $("#" + a)[0];
                if (c.useStorage)
                    try {
                        b = window[c.storageType].getItem("jqGrid" + i.id),
                        f = window[c.storageType].getItem("jqGrid" + i.id + "_data")
                    } catch (a) {}
                if (b) {
                    if (c.decompression && c.decompressionModule)
                        try {
                            d = window[c.decompressionModule][c.decompressionMethod](b),
                            null != d && (b = d,
                            f = window[c.decompressionModule][c.decompressionMethod](f))
                        } catch (a) {}
                    if ((d = $.jgrid.parseFunc(b)) && "object" === $.type(d)) {
                        i.grid && $.jgrid.gridUnload(a),
                        $.isFunction(c.beforeSetGrid) && (e = c.beforeSetGrid(d)) && "object" === $.type(e) && (d = e);
                        var j = function(a) {
                            return a
                        }
                          , k = {
                            reccount: d.reccount,
                            records: d.records,
                            lastpage: d.lastpage,
                            shrinkToFit: j(d.shrinkToFit),
                            data: j(d.data),
                            datatype: j(d.datatype),
                            grouping: j(d.grouping)
                        };
                        d.shrinkToFit = !1,
                        d.data = [],
                        d.datatype = "local",
                        d.grouping = !1,
                        d.inlineNav && (g = j(d._iN),
                        d._iN = null,
                        delete d._iN),
                        d.filterToolbar && (h = j(d._fT),
                        d._fT = null,
                        delete d._fT);
                        var l = $("#" + a).jqGrid(d);
                        if (c.restoreData && "" !== $.trim(f) && l.append(f),
                        l.jqGrid("setGridParam", k),
                        d.storeNavOptions && d.navGrid && (l[0].p.navGrid = !1,
                        l.jqGrid("navGrid", d.pager, d.navOptions, d.editOptions, d.addOptions, d.delOptions, d.searchOptions, d.viewOptions),
                        d.navButtons && d.navButtons.length))
                            for (var m = 0; m < d.navButtons.length; m++)
                                "sepclass"in d.navButtons[m][1] ? l.jqGrid("navSeparatorAdd", d.navButtons[m][0], d.navButtons[m][1]) : l.jqGrid("navButtonAdd", d.navButtons[m][0], d.navButtons[m][1]);
                        if (l[0].refreshIndex(),
                        d.subGrid) {
                            var n = 1 === d.multiselect ? 1 : 0
                              , o = !0 === d.rownumbers ? 1 : 0;
                            l.jqGrid("addSubGrid", n + o),
                            $.each(l[0].rows, function(a, b) {
                                $(b).hasClass("ui-sg-expanded") && $(l[0].rows[a - 1]).find("td.sgexpanded").click().click()
                            })
                        }
                        if (d.treeGrid)
                            for (var p = 1, q = l[0].rows.length, r = d.expColInd, s = d.treeReader.leaf_field, t = d.treeReader.expanded_field; p < q; )
                                $(l[0].rows[p].cells[r]).find("div.treeclick").on("click", function(a) {
                                    var b = a.target || a.srcElement
                                      , c = $.jgrid.stripPref(d.idPrefix, $(b, l[0].rows).closest("tr.jqgrow")[0].id)
                                      , e = l[0].p._index[c];
                                    return l[0].p.data[e][s] || (l[0].p.data[e][t] ? (l.jqGrid("collapseRow", l[0].p.data[e]),
                                    l.jqGrid("collapseNode", l[0].p.data[e])) : (l.jqGrid("expandRow", l[0].p.data[e]),
                                    l.jqGrid("expandNode", l[0].p.data[e]))),
                                    !1
                                }),
                                !0 === d.ExpandColClick && $(l[0].rows[p].cells[r]).find("span.cell-wrapper").css("cursor", "pointer").on("click", function(a) {
                                    var b = a.target || a.srcElement
                                      , c = $.jgrid.stripPref(d.idPrefix, $(b, l[0].rows).closest("tr.jqgrow")[0].id)
                                      , e = l[0].p._index[c];
                                    return l[0].p.data[e][s] || (l[0].p.data[e][t] ? (l.jqGrid("collapseRow", l[0].p.data[e]),
                                    l.jqGrid("collapseNode", l[0].p.data[e])) : (l.jqGrid("expandRow", l[0].p.data[e]),
                                    l.jqGrid("expandNode", l[0].p.data[e]))),
                                    l.jqGrid("setSelection", c),
                                    !1
                                }),
                                p++;
                        d.multiselect && $.each(d.selarrrow, function() {
                            $("#jqg_" + a + "_" + this)[d.useProp ? "prop" : "attr"]("checked", "checked")
                        }),
                        d.inlineNav && g && (l.jqGrid("setGridParam", {
                            inlineNav: !1
                        }),
                        l.jqGrid("inlineNav", d.pager, g)),
                        d.filterToolbar && h && (l.jqGrid("setGridParam", {
                            filterToolbar: !1
                        }),
                        h.restoreFromFilters = !0,
                        l.jqGrid("filterToolbar", h)),
                        d.frozenColumns && l.jqGrid("setFrozenColumns"),
                        l[0].updatepager(!0, !0),
                        $.isFunction(c.afterSetGrid) && c.afterSetGrid(l),
                        c.clearAfterLoad && (window[c.storageType].removeItem("jqGrid" + i.id),
                        window[c.storageType].removeItem("jqGrid" + i.id + "_data"))
                    } else
                        alert("can not convert to object")
                }
            }
        },
        isGridInStorage: function(a, b) {
            var c = {
                storageType: "localStorage"
            };
            c = $.extend(c, b || {});
            var d, e, f;
            try {
                e = window[c.storageType].getItem("jqGrid" + a),
                f = window[c.storageType].getItem("jqGrid" + a + "_data"),
                d = null != e && null != f && "string" == typeof e && "string" == typeof f
            } catch (a) {
                d = !1
            }
            return d
        },
        setRegional: function(a, b) {
            var c = {
                storageType: "sessionStorage"
            };
            if (c = $.extend(c, b || {}),
            c.regional) {
                $.jgrid.saveState(a, c),
                c.beforeSetGrid = function(a) {
                    return a.regional = c.regional,
                    a.force_regional = !0,
                    a
                }
                ,
                $.jgrid.loadState(a, null, c);
                var d = $("#" + a)[0]
                  , e = $(d).jqGrid("getGridParam", "colModel")
                  , f = -1
                  , g = $.jgrid.getRegional(d, "nav");
                $.each(e, function(a) {
                    if (this.formatter && "actions" === this.formatter)
                        return f = a,
                        !1
                }),
                -1 !== f && g && $("#" + a + " tbody tr").each(function() {
                    var a = this.cells[f];
                    $(a).find(".ui-inline-edit").attr("title", g.edittitle),
                    $(a).find(".ui-inline-del").attr("title", g.deltitle),
                    $(a).find(".ui-inline-save").attr("title", g.savetitle),
                    $(a).find(".ui-inline-cancel").attr("title", g.canceltitle)
                });
                try {
                    window[c.storageType].removeItem("jqGrid" + d.id),
                    window[c.storageType].removeItem("jqGrid" + d.id + "_data")
                } catch (a) {}
            }
        },
        jqGridImport: function(a, b) {
            b = $.extend({
                imptype: "xml",
                impstring: "",
                impurl: "",
                mtype: "GET",
                impData: {},
                xmlGrid: {
                    config: "root>grid",
                    data: "root>rows"
                },
                jsonGrid: {
                    config: "grid",
                    data: "data"
                },
                ajaxOptions: {}
            }, b || {});
            var c = (0 === a.indexOf("#") ? "" : "#") + $.jgrid.jqID(a)
              , d = function(a, b) {
                var d, e, f, g = $(b.xmlGrid.config, a)[0], h = $(b.xmlGrid.data, a)[0];
                if ($.grid.xmlToJSON) {
                    d = $.jgrid.xmlToJSON(g);
                    for (f in d)
                        d.hasOwnProperty(f) && (e = d[f]);
                    if (h) {
                        var i = d.grid.datatype;
                        d.grid.datatype = "xmlstring",
                        d.grid.datastr = a,
                        $(c).jqGrid(e).jqGrid("setGridParam", {
                            datatype: i
                        })
                    } else
                        setTimeout(function() {
                            $(c).jqGrid(e)
                        }, 0)
                } else
                    alert("xml2json or parse are not present")
            }
              , e = function(a, b) {
                if (a && "string" == typeof a) {
                    var d = $.jgrid.parseFunc(a)
                      , e = d[b.jsonGrid.config]
                      , f = d[b.jsonGrid.data];
                    if (f) {
                        var g = e.datatype;
                        e.datatype = "jsonstring",
                        e.datastr = f,
                        $(c).jqGrid(e).jqGrid("setGridParam", {
                            datatype: g
                        })
                    } else
                        $(c).jqGrid(e)
                }
            };
            switch (b.imptype) {
            case "xml":
                $.ajax($.extend({
                    url: b.impurl,
                    type: b.mtype,
                    data: b.impData,
                    dataType: "xml",
                    complete: function(a, e) {
                        "success" === e && (d(a.responseXML, b),
                        $(c).triggerHandler("jqGridImportComplete", [a, b]),
                        $.isFunction(b.importComplete) && b.importComplete(a)),
                        a = null
                    }
                }, b.ajaxOptions));
                break;
            case "xmlstring":
                if (b.impstring && "string" == typeof b.impstring) {
                    var f = $.parseXML(b.impstring);
                    f && (d(f, b),
                    $(c).triggerHandler("jqGridImportComplete", [f, b]),
                    $.isFunction(b.importComplete) && b.importComplete(f))
                }
                break;
            case "json":
                $.ajax($.extend({
                    url: b.impurl,
                    type: b.mtype,
                    data: b.impData,
                    dataType: "json",
                    complete: function(a) {
                        try {
                            e(a.responseText, b),
                            $(c).triggerHandler("jqGridImportComplete", [a, b]),
                            $.isFunction(b.importComplete) && b.importComplete(a)
                        } catch (a) {}
                        a = null
                    }
                }, b.ajaxOptions));
                break;
            case "jsonstring":
                b.impstring && "string" == typeof b.impstring && (e(b.impstring, b),
                $(c).triggerHandler("jqGridImportComplete", [b.impstring, b]),
                $.isFunction(b.importComplete) && b.importComplete(b.impstring))
            }
        }
    }),
    $.jgrid.extend({
        jqGridExport: function(a) {
            a = $.extend({
                exptype: "xmlstring",
                root: "grid",
                ident: "\t",
                addOptions: {},
                data: !0
            }, a || {});
            var b = null;
            return this.each(function() {
                if (this.grid) {
                    var c = $.extend(!0, {}, $(this).jqGrid("getGridParam"), a.addOptions);
                    switch (c.rownumbers && (c.colNames.splice(0, 1),
                    c.colModel.splice(0, 1)),
                    c.multiselect && (c.colNames.splice(0, 1),
                    c.colModel.splice(0, 1)),
                    c.subGrid && (c.colNames.splice(0, 1),
                    c.colModel.splice(0, 1)),
                    c.knv = null,
                    a.data || (c.data = [],
                    c._index = {}),
                    a.exptype) {
                    case "xmlstring":
                        b = "<" + a.root + ">" + $.jgrid.jsonToXML(c, {
                            xmlDecl: ""
                        }) + "</" + a.root + ">";
                        break;
                    case "jsonstring":
                        b = $.jgrid.stringify(c),
                        a.root && (b = "{" + a.root + ":" + b + "}")
                    }
                }
            }),
            b
        },
        excelExport: function(a) {
            return a = $.extend({
                exptype: "remote",
                url: null,
                oper: "oper",
                tag: "excel",
                beforeExport: null,
                exporthidden: !1,
                exportgrouping: !1,
                exportOptions: {}
            }, a || {}),
            this.each(function() {
                if (this.grid) {
                    var b;
                    if ("remote" === a.exptype) {
                        var c, d = $.extend({}, this.p.postData);
                        if (d[a.oper] = a.tag,
                        $.isFunction(a.beforeExport)) {
                            var e = a.beforeExport.call(this, d);
                            $.isPlainObject(e) && (d = e)
                        }
                        if (a.exporthidden) {
                            var f, g = this.p.colModel, h = g.length, i = [];
                            for (f = 0; f < h; f++)
                                void 0 === g[f].hidden && (g[f].hidden = !1),
                                i.push({
                                    name: g[f].name,
                                    hidden: g[f].hidden
                                });
                            var j = JSON.stringify(i);
                            "string" == typeof j && (d.colModel = j)
                        }
                        a.exportgrouping && "string" == typeof (c = JSON.stringify(this.p.groupingView)) && (d.groupingView = c);
                        var k = jQuery.param(d);
                        b = -1 !== a.url.indexOf("?") ? a.url + "&" + k : a.url + "?" + k,
                        window.location = b
                    }
                }
            })
        }
    }),
    $.jgrid.inlineEdit = $.jgrid.inlineEdit || {},
    $.jgrid.extend({
        editRow: function(a, b, c, d, e, f, g, h, i) {
            var j = {}
              , k = $.makeArray(arguments).slice(1)
              , l = this[0];
            return "object" === $.type(k[0]) ? j = k[0] : (void 0 !== b && (j.keys = b),
            $.isFunction(c) && (j.oneditfunc = c),
            $.isFunction(d) && (j.successfunc = d),
            void 0 !== e && (j.url = e),
            void 0 !== f && (j.extraparam = f),
            $.isFunction(g) && (j.aftersavefunc = g),
            $.isFunction(h) && (j.errorfunc = h),
            $.isFunction(i) && (j.afterrestorefunc = i)),
            j = $.extend(!0, {
                keys: !1,
                keyevent: "keydown",
                onEnter: null,
                onEscape: null,
                oneditfunc: null,
                successfunc: null,
                url: null,
                extraparam: {},
                aftersavefunc: null,
                errorfunc: null,
                afterrestorefunc: null,
                restoreAfterError: !0,
                mtype: "POST",
                focusField: !0,
                saveui: "enable",
                savetext: $.jgrid.getRegional(l, "defaults.savetext")
            }, $.jgrid.inlineEdit, j),
            this.each(function() {
                var b, c, d, e, f, g, h = 0, i = null, k = {}, m = $(this).jqGrid("getStyleUI", l.p.styleUI + ".inlinedit", "inputClass", !0);
                if (l.grid && !1 !== (e = $(l).jqGrid("getInd", a, !0))) {
                    if (l.p.beforeAction = !0,
                    g = $.isFunction(j.beforeEditRow) ? j.beforeEditRow.call(l, j, a) : void 0,
                    void 0 === g && (g = !0),
                    !g)
                        return void (l.p.beforeAction = !1);
                    d = $(e).attr("editable") || "0",
                    "0" !== d || $(e).hasClass("not-editable-row") || (f = l.p.colModel,
                    $('td[role="gridcell"]', e).each(function(d) {
                        b = f[d].name;
                        var e = !0 === l.p.treeGrid && b === l.p.ExpandColumn;
                        if (e)
                            c = $("span:first", this).html();
                        else
                            try {
                                c = $.unformat.call(l, this, {
                                    rowId: a,
                                    colModel: f[d]
                                }, d)
                            } catch (a) {
                                c = f[d].edittype && "textarea" === f[d].edittype ? $(this).text() : $(this).html()
                            }
                        if ("cb" !== b && "subgrid" !== b && "rn" !== b && (l.p.autoencode && (c = $.jgrid.htmlDecode(c)),
                        k[b] = c,
                        !0 === f[d].editable)) {
                            null === i && (i = d),
                            e ? $("span:first", this).html("") : $(this).html("");
                            var g = $.extend({}, f[d].editoptions || {}, {
                                id: a + "_" + b,
                                name: b,
                                rowId: a,
                                oper: "edit"
                            });
                            f[d].edittype || (f[d].edittype = "text"),
                            ("&nbsp;" === c || "&#160;" === c || 1 === c.length && 160 === c.charCodeAt(0)) && (c = "");
                            var j = $.jgrid.createEl.call(l, f[d].edittype, g, c, !0, $.extend({}, $.jgrid.ajaxOptions, l.p.ajaxSelectOptions || {}));
                            $(j).addClass("editable inline-edit-cell"),
                            $.inArray(f[d].edittype, ["text", "textarea", "password", "select"]) > -1 && $(j).addClass(m),
                            e ? $("span:first", this).append(j) : $(this).append(j),
                            $.jgrid.bindEv.call(l, j, g),
                            "select" === f[d].edittype && void 0 !== f[d].editoptions && !0 === f[d].editoptions.multiple && void 0 === f[d].editoptions.dataUrl && $.jgrid.msie() && $(j).width($(j).width()),
                            h++
                        }
                    }),
                    h > 0 && (k.id = a,
                    l.p.savedRow.push(k),
                    $(e).attr("editable", "1"),
                    j.focusField && ("number" == typeof j.focusField && parseInt(j.focusField, 10) <= f.length && (i = j.focusField),
                    setTimeout(function() {
                        var a = $("td:eq(" + i + ") :input:visible", e).not(":disabled");
                        a.length > 0 && a.focus()
                    }, 0)),
                    !0 === j.keys && $(e).on(j.keyevent, function(b) {
                        if (27 === b.keyCode) {
                            if ($.isFunction(j.onEscape))
                                return j.onEscape.call(l, a, j, b),
                                !0;
                            if ($(l).jqGrid("restoreRow", a, j),
                            l.p.inlineNav)
                                try {
                                    $(l).jqGrid("showAddEditButtons")
                                } catch (a) {}
                            return !1
                        }
                        if (13 === b.keyCode) {
                            if ("TEXTAREA" === b.target.tagName)
                                return !0;
                            if ($.isFunction(j.onEnter))
                                return j.onEnter.call(l, a, j, b),
                                !0;
                            if ($(l).jqGrid("saveRow", a, j) && l.p.inlineNav)
                                try {
                                    $(l).jqGrid("showAddEditButtons")
                                } catch (a) {}
                            return !1
                        }
                    }),
                    $(l).triggerHandler("jqGridInlineEditRow", [a, j]),
                    $.isFunction(j.oneditfunc) && j.oneditfunc.call(l, a)))
                }
            })
        },
        saveRow: function(a, b, c, d, e, f, g) {
            var h = $.makeArray(arguments).slice(1)
              , i = {}
              , j = this[0];
            "object" === $.type(h[0]) ? i = h[0] : ($.isFunction(b) && (i.successfunc = b),
            void 0 !== c && (i.url = c),
            void 0 !== d && (i.extraparam = d),
            $.isFunction(e) && (i.aftersavefunc = e),
            $.isFunction(f) && (i.errorfunc = f),
            $.isFunction(g) && (i.afterrestorefunc = g)),
            i = $.extend(!0, {
                successfunc: null,
                url: null,
                extraparam: {},
                aftersavefunc: null,
                errorfunc: null,
                afterrestorefunc: null,
                restoreAfterError: !0,
                mtype: "POST",
                saveui: "enable",
                savetext: $.jgrid.getRegional(j, "defaults.savetext")
            }, $.jgrid.inlineEdit, i);
            var k, l, m, n, o, p = !1, q = {}, r = {}, s = {}, t = !1, u = $.trim($(j).jqGrid("getStyleUI", j.p.styleUI + ".common", "error", !0));
            if (!j.grid)
                return p;
            if (!1 === (o = $(j).jqGrid("getInd", a, !0)))
                return p;
            var v = $.jgrid.getRegional(j, "errors")
              , w = $.jgrid.getRegional(j, "edit")
              , x = $.isFunction(i.beforeSaveRow) ? i.beforeSaveRow.call(j, i, a) : void 0;
            if (void 0 === x && (x = !0),
            x) {
                if (l = $(o).attr("editable"),
                i.url = i.url || j.p.editurl,
                "1" === l) {
                    var y, z, A;
                    if ($('td[role="gridcell"]', o).each(function(a) {
                        if (y = j.p.colModel[a],
                        k = y.name,
                        A = "",
                        "cb" !== k && "subgrid" !== k && !0 === y.editable && "rn" !== k && !$(this).hasClass("not-editable-cell")) {
                            switch (y.edittype) {
                            case "checkbox":
                                var b = ["Yes", "No"];
                                y.editoptions && y.editoptions.value && (b = y.editoptions.value.split(":")),
                                q[k] = $("input", this).is(":checked") ? b[0] : b[1],
                                A = $("input", this);
                                break;
                            case "text":
                            case "password":
                            case "textarea":
                            case "button":
                                q[k] = $("input, textarea", this).val(),
                                A = $("input, textarea", this);
                                break;
                            case "select":
                                if (y.editoptions.multiple) {
                                    var c = $("select", this)
                                      , d = [];
                                    q[k] = $(c).val(),
                                    q[k] ? q[k] = q[k].join(",") : q[k] = "",
                                    $("select option:selected", this).each(function(a, b) {
                                        d[a] = $(b).text()
                                    }),
                                    r[k] = d.join(",")
                                } else
                                    q[k] = $("select option:selected", this).val(),
                                    r[k] = $("select option:selected", this).text();
                                y.formatter && "select" === y.formatter && (r = {}),
                                A = $("select", this);
                                break;
                            case "custom":
                                try {
                                    if (!y.editoptions || !$.isFunction(y.editoptions.custom_value))
                                        throw "e1";
                                    if (q[k] = y.editoptions.custom_value.call(j, $(".customelement", this), "get"),
                                    void 0 === q[k])
                                        throw "e2"
                                } catch (a) {
                                    "e1" === a ? $.jgrid.info_dialog(v.errcap, "function 'custom_value' " + w.msg.nodefined, w.bClose, {
                                        styleUI: j.p.styleUI
                                    }) : $.jgrid.info_dialog(v.errcap, a.message, w.bClose, {
                                        styleUI: j.p.styleUI
                                    })
                                }
                            }
                            if (n = $.jgrid.checkValues.call(j, q[k], a),
                            !1 === n[0])
                                return z = a,
                                !1;
                            j.p.autoencode && (q[k] = $.jgrid.htmlEncode(q[k])),
                            "clientArray" !== i.url && y.editoptions && !0 === y.editoptions.NullIfEmpty && "" === q[k] && (s[k] = "null",
                            t = !0)
                        }
                    }),
                    !1 === n[0]) {
                        try {
                            if ($.isFunction(j.p.validationCell))
                                j.p.validationCell.call(j, A, n[1], o.rowIndex, z);
                            else {
                                var B = $(j).jqGrid("getGridRowById", a)
                                  , C = $.jgrid.findPos(B);
                                $.jgrid.info_dialog(v.errcap, n[1], w.bClose, {
                                    left: C[0],
                                    top: C[1] + $(B).outerHeight(),
                                    styleUI: j.p.styleUI,
                                    onClose: function() {
                                        z >= 0 && $("#" + a + "_" + j.p.colModel[z].name).focus()
                                    }
                                })
                            }
                        } catch (a) {
                            alert(n[1])
                        }
                        return p
                    }
                    var D, E = j.p.prmNames, F = a;
                    if (D = !1 === j.p.keyName ? E.id : j.p.keyName,
                    q) {
                        if (q[E.oper] = E.editoper,
                        void 0 === q[D] || "" === q[D])
                            q[D] = a;
                        else if (o.id !== j.p.idPrefix + q[D]) {
                            var G = $.jgrid.stripPref(j.p.idPrefix, a);
                            if (void 0 !== j.p._index[G] && (j.p._index[q[D]] = j.p._index[G],
                            delete j.p._index[G]),
                            a = j.p.idPrefix + q[D],
                            $(o).attr("id", a),
                            j.p.selrow === F && (j.p.selrow = a),
                            $.isArray(j.p.selarrrow)) {
                                var H = $.inArray(F, j.p.selarrrow);
                                H >= 0 && (j.p.selarrrow[H] = a)
                            }
                            if (j.p.multiselect) {
                                var I = "jqg_" + j.p.id + "_" + a;
                                $("input.cbox", o).attr("id", I).attr("name", I)
                            }
                        }
                        void 0 === j.p.inlineData && (j.p.inlineData = {}),
                        q = $.extend({}, q, j.p.inlineData, i.extraparam)
                    }
                    if ("clientArray" === i.url) {
                        q = $.extend({}, q, r),
                        j.p.autoencode && $.each(q, function(a, b) {
                            q[a] = $.jgrid.htmlDecode(b)
                        });
                        var J, K = $(j).jqGrid("setRowData", a, q);
                        for ($(o).attr("editable", "0"),
                        J = 0; J < j.p.savedRow.length; J++)
                            if (String(j.p.savedRow[J].id) === String(F)) {
                                m = J;
                                break
                            }
                        $(j).triggerHandler("jqGridInlineAfterSaveRow", [a, K, q, i]),
                        $.isFunction(i.aftersavefunc) && i.aftersavefunc.call(j, a, K, q, i),
                        m >= 0 && j.p.savedRow.splice(m, 1),
                        p = !0,
                        $(o).removeClass("jqgrid-new-row").off("keydown")
                    } else
                        $(j).jqGrid("progressBar", {
                            method: "show",
                            loadtype: i.saveui,
                            htmlcontent: i.savetext
                        }),
                        s = $.extend({}, q, s),
                        s[D] = $.jgrid.stripPref(j.p.idPrefix, s[D]),
                        $.ajax($.extend({
                            url: i.url,
                            data: $.isFunction(j.p.serializeRowData) ? j.p.serializeRowData.call(j, s) : s,
                            type: i.mtype,
                            async: !1,
                            complete: function(b, c) {
                                if ($(j).jqGrid("progressBar", {
                                    method: "hide",
                                    loadtype: i.saveui,
                                    htmlcontent: i.savetext
                                }),
                                "success" === c) {
                                    var d, e, f = !0;
                                    if (d = $(j).triggerHandler("jqGridInlineSuccessSaveRow", [b, a, i]),
                                    $.isArray(d) || (d = [!0, s]),
                                    d[0] && $.isFunction(i.successfunc) && (d = i.successfunc.call(j, b)),
                                    $.isArray(d) ? (f = d[0],
                                    q = d[1] || q) : f = d,
                                    !0 === f) {
                                        for (j.p.autoencode && $.each(q, function(a, b) {
                                            q[a] = $.jgrid.htmlDecode(b)
                                        }),
                                        t && $.each(q, function(a) {
                                            "null" === q[a] && (q[a] = "")
                                        }),
                                        q = $.extend({}, q, r),
                                        $(j).jqGrid("setRowData", a, q),
                                        $(o).attr("editable", "0"),
                                        e = 0; e < j.p.savedRow.length; e++)
                                            if (String(j.p.savedRow[e].id) === String(a)) {
                                                m = e;
                                                break
                                            }
                                        $(j).triggerHandler("jqGridInlineAfterSaveRow", [a, b, q, i]),
                                        $.isFunction(i.aftersavefunc) && i.aftersavefunc.call(j, a, b, q, i),
                                        m >= 0 && j.p.savedRow.splice(m, 1),
                                        p = !0,
                                        $(o).removeClass("jqgrid-new-row").off("keydown")
                                    } else
                                        $(j).triggerHandler("jqGridInlineErrorSaveRow", [a, b, c, null, i]),
                                        $.isFunction(i.errorfunc) && i.errorfunc.call(j, a, b, c, null),
                                        !0 === i.restoreAfterError && $(j).jqGrid("restoreRow", a, i)
                                }
                            },
                            error: function(b, c, d) {
                                if ($("#lui_" + $.jgrid.jqID(j.p.id)).hide(),
                                $(j).triggerHandler("jqGridInlineErrorSaveRow", [a, b, c, d, i]),
                                $.isFunction(i.errorfunc))
                                    i.errorfunc.call(j, a, b, c, d);
                                else {
                                    var e = b.responseText || b.statusText;
                                    try {
                                        $.jgrid.info_dialog(v.errcap, '<div class="' + u + '">' + e + "</div>", w.bClose, {
                                            buttonalign: "right",
                                            styleUI: j.p.styleUI
                                        })
                                    } catch (a) {
                                        alert(e)
                                    }
                                }
                                !0 === i.restoreAfterError && $(j).jqGrid("restoreRow", a, i)
                            }
                        }, $.jgrid.ajaxOptions, j.p.ajaxRowOptions || {}))
                }
                return p
            }
        },
        restoreRow: function(a, b) {
            var c = $.makeArray(arguments).slice(1)
              , d = {};
            return "object" === $.type(c[0]) ? d = c[0] : $.isFunction(b) && (d.afterrestorefunc = b),
            d = $.extend(!0, {}, $.jgrid.inlineEdit, d),
            this.each(function() {
                var b, c, e = this, f = -1, g = {};
                if (e.grid && !1 !== (b = $(e).jqGrid("getInd", a, !0))) {
                    var h = $.isFunction(d.beforeCancelRow) ? d.beforeCancelRow.call(e, d, a) : void 0;
                    if (void 0 === h && (h = !0),
                    h) {
                        for (c = 0; c < e.p.savedRow.length; c++)
                            if (String(e.p.savedRow[c].id) === String(a)) {
                                f = c;
                                break
                            }
                        if (f >= 0) {
                            if ($.isFunction($.fn.datepicker))
                                try {
                                    $("input.hasDatepicker", "#" + $.jgrid.jqID(b.id)).datepicker("hide")
                                } catch (a) {}
                            $.each(e.p.colModel, function() {
                                e.p.savedRow[f].hasOwnProperty(this.name) && (g[this.name] = e.p.savedRow[f][this.name])
                            }),
                            $(e).jqGrid("setRowData", a, g),
                            $(b).attr("editable", "0").off("keydown"),
                            e.p.savedRow.splice(f, 1),
                            $("#" + $.jgrid.jqID(a), "#" + $.jgrid.jqID(e.p.id)).hasClass("jqgrid-new-row") && setTimeout(function() {
                                $(e).jqGrid("delRowData", a),
                                $(e).jqGrid("showAddEditButtons")
                            }, 0)
                        }
                        $(e).triggerHandler("jqGridInlineAfterRestoreRow", [a]),
                        $.isFunction(d.afterrestorefunc) && d.afterrestorefunc.call(e, a)
                    }
                }
            })
        },
        addRow: function(a) {
            return a = $.extend(!0, {
                rowID: null,
                initdata: {},
                position: "first",
                useDefValues: !0,
                useFormatter: !1,
                addRowParams: {
                    extraparam: {}
                }
            }, a || {}),
            this.each(function() {
                if (this.grid) {
                    var b = this;
                    b.p.beforeAction = !0;
                    var c = $.isFunction(a.beforeAddRow) ? a.beforeAddRow.call(b, a.addRowParams) : void 0;
                    if (void 0 === c && (c = !0),
                    !c)
                        return void (b.p.beforeAction = !1);
                    if (a.rowID = $.isFunction(a.rowID) ? a.rowID.call(b, a) : null != a.rowID ? a.rowID : $.jgrid.randId(),
                    !0 === a.useDefValues && $(b.p.colModel).each(function() {
                        if (this.editoptions && this.editoptions.defaultValue) {
                            var c = this.editoptions.defaultValue
                              , d = $.isFunction(c) ? c.call(b) : c;
                            a.initdata[this.name] = d
                        }
                    }),
                    $(b).jqGrid("addRowData", a.rowID, a.initdata, a.position),
                    a.rowID = b.p.idPrefix + a.rowID,
                    $("#" + $.jgrid.jqID(a.rowID), "#" + $.jgrid.jqID(b.p.id)).addClass("jqgrid-new-row"),
                    a.useFormatter)
                        $("#" + $.jgrid.jqID(a.rowID) + " .ui-inline-edit", "#" + $.jgrid.jqID(b.p.id)).click();
                    else {
                        var d = b.p.prmNames
                          , e = d.oper;
                        a.addRowParams.extraparam[e] = d.addoper,
                        $(b).jqGrid("editRow", a.rowID, a.addRowParams),
                        $(b).jqGrid("setSelection", a.rowID)
                    }
                }
            })
        },
        inlineNav: function(a, b) {
            var c = this[0]
              , d = $.jgrid.getRegional(c, "nav")
              , e = $.jgrid.styleUI[c.p.styleUI].inlinedit;
            return b = $.extend(!0, {
                edit: !0,
                editicon: e.icon_edit_nav,
                add: !0,
                addicon: e.icon_add_nav,
                save: !0,
                saveicon: e.icon_save_nav,
                cancel: !0,
                cancelicon: e.icon_cancel_nav,
                addParams: {
                    addRowParams: {
                        extraparam: {}
                    }
                },
                editParams: {},
                restoreAfterSelect: !0,
                saveAfterSelect: !1
            }, d, b || {}),
            this.each(function() {
                if (this.grid && !this.p.inlineNav) {
                    var e = $.jgrid.jqID(c.p.id)
                      , f = $.trim($(c).jqGrid("getStyleUI", c.p.styleUI + ".common", "disabled", !0));
                    if (c.p.navGrid || $(c).jqGrid("navGrid", a, {
                        refresh: !1,
                        edit: !1,
                        add: !1,
                        del: !1,
                        search: !1,
                        view: !1
                    }),
                    $(c).data("inlineNav") || $(c).data("inlineNav", b),
                    c.p.force_regional && (b = $.extend(b, d)),
                    c.p.inlineNav = !0,
                    !0 === b.addParams.useFormatter) {
                        var g, h = c.p.colModel;
                        for (g = 0; g < h.length; g++)
                            if (h[g].formatter && "actions" === h[g].formatter) {
                                if (h[g].formatoptions) {
                                    var i = {
                                        keys: !1,
                                        onEdit: null,
                                        onSuccess: null,
                                        afterSave: null,
                                        onError: null,
                                        afterRestore: null,
                                        extraparam: {},
                                        url: null
                                    }
                                      , j = $.extend(i, h[g].formatoptions);
                                    b.addParams.addRowParams = {
                                        keys: j.keys,
                                        oneditfunc: j.onEdit,
                                        successfunc: j.onSuccess,
                                        url: j.url,
                                        extraparam: j.extraparam,
                                        aftersavefunc: j.afterSave,
                                        errorfunc: j.onError,
                                        afterrestorefunc: j.afterRestore
                                    }
                                }
                                break
                            }
                    }
                    b.add && $(c).jqGrid("navButtonAdd", a, {
                        caption: b.addtext,
                        title: b.addtitle,
                        buttonicon: b.addicon,
                        id: c.p.id + "_iladd",
                        internal: !0,
                        onClickButton: function() {
                            void 0 === c.p.beforeAction && (c.p.beforeAction = !0),
                            $(c).jqGrid("addRow", b.addParams),
                            !b.addParams.useFormatter && c.p.beforeAction && ($("#" + e + "_ilsave").removeClass(f),
                            $("#" + e + "_ilcancel").removeClass(f),
                            $("#" + e + "_iladd").addClass(f),
                            $("#" + e + "_iledit").addClass(f))
                        }
                    }),
                    b.edit && $(c).jqGrid("navButtonAdd", a, {
                        caption: b.edittext,
                        title: b.edittitle,
                        buttonicon: b.editicon,
                        id: c.p.id + "_iledit",
                        internal: !0,
                        onClickButton: function() {
                            var a = $(c).jqGrid("getGridParam", "selrow");
                            a ? (void 0 === c.p.beforeAction && (c.p.beforeAction = !0),
                            $(c).jqGrid("editRow", a, b.editParams),
                            c.p.beforeAction && ($("#" + e + "_ilsave").removeClass(f),
                            $("#" + e + "_ilcancel").removeClass(f),
                            $("#" + e + "_iladd").addClass(f),
                            $("#" + e + "_iledit").addClass(f))) : ($.jgrid.viewModal("#alertmod_" + e, {
                                gbox: "#gbox_" + e,
                                jqm: !0
                            }),
                            $("#jqg_alrt").focus())
                        }
                    }),
                    b.save && ($(c).jqGrid("navButtonAdd", a, {
                        caption: b.savetext || "",
                        title: b.savetitle || "Save row",
                        buttonicon: b.saveicon,
                        id: c.p.id + "_ilsave",
                        internal: !0,
                        onClickButton: function() {
                            var a = c.p.savedRow[0].id;
                            if (a) {
                                var d = c.p.prmNames
                                  , f = d.oper
                                  , g = b.editParams;
                                $("#" + $.jgrid.jqID(a), "#" + e).hasClass("jqgrid-new-row") ? (b.addParams.addRowParams.extraparam[f] = d.addoper,
                                g = b.addParams.addRowParams) : (b.editParams.extraparam || (b.editParams.extraparam = {}),
                                b.editParams.extraparam[f] = d.editoper),
                                $(c).jqGrid("saveRow", a, g) && $(c).jqGrid("showAddEditButtons")
                            } else
                                $.jgrid.viewModal("#alertmod_" + e, {
                                    gbox: "#gbox_" + e,
                                    jqm: !0
                                }),
                                $("#jqg_alrt").focus()
                        }
                    }),
                    $("#" + e + "_ilsave").addClass(f)),
                    b.cancel && ($(c).jqGrid("navButtonAdd", a, {
                        caption: b.canceltext || "",
                        title: b.canceltitle || "Cancel row editing",
                        buttonicon: b.cancelicon,
                        id: c.p.id + "_ilcancel",
                        internal: !0,
                        onClickButton: function() {
                            var a = c.p.savedRow[0].id
                              , d = b.editParams;
                            a ? ($("#" + $.jgrid.jqID(a), "#" + e).hasClass("jqgrid-new-row") && (d = b.addParams.addRowParams),
                            $(c).jqGrid("restoreRow", a, d),
                            $(c).jqGrid("showAddEditButtons")) : ($.jgrid.viewModal("#alertmod", {
                                gbox: "#gbox_" + e,
                                jqm: !0
                            }),
                            $("#jqg_alrt").focus())
                        }
                    }),
                    $("#" + e + "_ilcancel").addClass(f)),
                    !0 !== b.restoreAfterSelect && !0 !== b.saveAfterSelect || $(c).on("jqGridBeforeSelectRow.inlineNav", function(a, d) {
                        if (c.p.savedRow.length > 0 && !0 === c.p.inlineNav && d !== c.p.selrow && null !== c.p.selrow) {
                            var e = !0;
                            c.p.selrow === b.addParams.rowID ? $(c).jqGrid("delRowData", c.p.selrow) : !0 === b.restoreAfterSelect ? $(c).jqGrid("restoreRow", c.p.selrow, b.editParams) : e = $(c).jqGrid("saveRow", c.p.selrow, b.editParams),
                            e && $(c).jqGrid("showAddEditButtons")
                        }
                    })
                }
            })
        },
        showAddEditButtons: function() {
            return this.each(function() {
                if (this.grid) {
                    var a = $.jgrid.jqID(this.p.id)
                      , b = $.trim($(this).jqGrid("getStyleUI", this.p.styleUI + ".common", "disabled", !0));
                    $("#" + a + "_ilsave").addClass(b),
                    $("#" + a + "_ilcancel").addClass(b),
                    $("#" + a + "_iladd").removeClass(b),
                    $("#" + a + "_iledit").removeClass(b)
                }
            })
        },
        showSaveCancelButtons: function() {
            return this.each(function() {
                if (this.grid) {
                    var a = $.jgrid.jqID(this.p.id)
                      , b = $.trim($(this).jqGrid("getStyleUI", this.p.styleUI + ".common", "disabled", !0));
                    $("#" + a + "_ilsave").removeClass(b),
                    $("#" + a + "_ilcancel").removeClass(b),
                    $("#" + a + "_iladd").addClass(b),
                    $("#" + a + "_iledit").addClass(b)
                }
            })
        }
    }),
    $.jgrid.msie() && 8 === $.jgrid.msiever() && ($.expr[":"].hidden = function(a) {
        return 0 === a.offsetWidth || 0 === a.offsetHeight || "none" === a.style.display
    }
    ),
    $.jgrid._multiselect = !1,
    $.ui && $.ui.multiselect) {
        if ($.ui.multiselect.prototype._setSelected) {
            var setSelected = $.ui.multiselect.prototype._setSelected;
            $.ui.multiselect.prototype._setSelected = function(a, b) {
                var c = setSelected.call(this, a, b);
                if (b && this.selectedList) {
                    var d = this.element;
                    this.selectedList.find("li").each(function() {
                        $(this).data("optionLink") && $(this).data("optionLink").remove().appendTo(d)
                    })
                }
                return c
            }
        }
        $.ui.multiselect.prototype.destroy && ($.ui.multiselect.prototype.destroy = function() {
            this.element.show(),
            this.container.remove(),
            void 0 === $.Widget ? $.widget.prototype.destroy.apply(this, arguments) : $.Widget.prototype.destroy.apply(this, arguments)
        }
        ),
        $.jgrid._multiselect = !0
    }
    $.jgrid.extend({
        sortableColumns: function(a) {
            return this.each(function() {
                function b() {
                    d.p.disableClick = !0,
                    d.p.frozenColumns && ($(d).jqGrid("destroyFrozenColumns"),
                    f = !0)
                }
                function c() {
                    setTimeout(function() {
                        d.p.disableClick = !1,
                        f && ($(d).jqGrid("setFrozenColumns"),
                        f = !1)
                    }, 50)
                }
                var d = this
                  , e = $.jgrid.jqID(d.p.id)
                  , f = !1
                  , g = {
                    tolerance: "pointer",
                    axis: "x",
                    scrollSensitivity: "1",
                    items: ">th:not(:has(#jqgh_" + e + "_cb,#jqgh_" + e + "_rn,#jqgh_" + e + "_subgrid),:hidden)",
                    placeholder: {
                        element: function(a) {
                            return $(document.createElement(a[0].nodeName)).addClass(a[0].className + " ui-sortable-placeholder ui-state-highlight").removeClass("ui-sortable-helper")[0]
                        },
                        update: function(a, b) {
                            b.height(a.currentItem.innerHeight() - parseInt(a.currentItem.css("paddingTop") || 0, 10) - parseInt(a.currentItem.css("paddingBottom") || 0, 10)),
                            b.width(a.currentItem.innerWidth() - parseInt(a.currentItem.css("paddingLeft") || 0, 10) - parseInt(a.currentItem.css("paddingRight") || 0, 10))
                        }
                    },
                    update: function(a, b) {
                        var c = $(b.item).parent()
                          , e = $(">th", c)
                          , f = d.p.colModel
                          , g = {}
                          , h = d.p.id + "_";
                        $.each(f, function(a) {
                            g[this.name] = a
                        });
                        var i = [];
                        e.each(function() {
                            var a = $(">div", this).get(0).id.replace(/^jqgh_/, "").replace(h, "");
                            g.hasOwnProperty(a) && i.push(g[a])
                        }),
                        $(d).jqGrid("remapColumns", i, !0, !0),
                        $.isFunction(d.p.sortable.update) && d.p.sortable.update(i)
                    }
                };
                if (d.p.sortable.options ? $.extend(g, d.p.sortable.options) : $.isFunction(d.p.sortable) && (d.p.sortable = {
                    update: d.p.sortable
                }),
                g.start) {
                    var h = g.start;
                    g.start = function(a, c) {
                        b(),
                        h.call(this, a, c)
                    }
                } else
                    g.start = b;
                if (g.stop) {
                    var i = g.stop;
                    g.stop = function(a, b) {
                        c(),
                        i.call(this, a, b)
                    }
                } else
                    g.stop = c;
                d.p.sortable.exclude && (g.items += ":not(" + d.p.sortable.exclude + ")");
                var j = a.sortable(g)
                  , k = j.data("sortable") || j.data("uiSortable");
                null != k && (k.data("sortable").floating = !0)
            })
        },
        columnChooser: function(a) {
            function b(a, b, c) {
                var d, e;
                return b >= 0 ? (d = a.slice(),
                e = d.splice(b, Math.max(a.length - b, b)),
                b > a.length && (b = a.length),
                d[b] = c,
                d.concat(e)) : a
            }
            function c(a, b) {
                a && ("string" == typeof a ? $.fn[a] && $.fn[a].apply(b, $.makeArray(arguments).slice(2)) : $.isFunction(a) && a.apply(b, $.makeArray(arguments).slice(2)))
            }
            function d() {
                var a = q(f)
                  , b = a.container.closest(".ui-dialog-content");
                b.length > 0 && "object" == typeof b[0].style ? b[0].style.width = "" : b.css("width", ""),
                a.selectedList.height(Math.max(a.selectedContainer.height() - a.selectedActions.outerHeight() - 1, 1)),
                a.availableList.height(Math.max(a.availableContainer.height() - a.availableActions.outerHeight() - 1, 1))
            }
            var e, f, g, h, i, j, k, l = this, m = {}, n = [], o = l.jqGrid("getGridParam", "colModel"), p = l.jqGrid("getGridParam", "colNames"), q = function(a) {
                return $.ui.multiselect.prototype && a.data($.ui.multiselect.prototype.widgetFullName || $.ui.multiselect.prototype.widgetName) || a.data("ui-multiselect") || a.data("multiselect")
            }, r = $.jgrid.getRegional(this[0], "col");
            if (!$("#colchooser_" + $.jgrid.jqID(l[0].p.id)).length) {
                if (e = $('<div id="colchooser_' + l[0].p.id + '" style="position:relative;overflow:hidden"><div><select multiple="multiple"></select></div></div>'),
                f = $("select", e),
                a = $.extend({
                    width: 400,
                    height: 240,
                    classname: null,
                    done: function(a) {
                        a && l.jqGrid("remapColumns", a, !0)
                    },
                    msel: "multiselect",
                    dlog: "dialog",
                    dialog_opts: {
                        minWidth: 470,
                        dialogClass: "ui-jqdialog"
                    },
                    dlog_opts: function(a) {
                        var b = {};
                        return b[a.bSubmit] = function() {
                            a.apply_perm(),
                            a.cleanup(!1)
                        }
                        ,
                        b[a.bCancel] = function() {
                            a.cleanup(!0)
                        }
                        ,
                        $.extend(!0, {
                            buttons: b,
                            close: function() {
                                a.cleanup(!0)
                            },
                            modal: a.modal || !1,
                            resizable: a.resizable || !0,
                            width: a.width + 70,
                            resize: d
                        }, a.dialog_opts || {})
                    },
                    apply_perm: function() {
                        var c = [];
                        $("option", f).each(function() {
                            $(this).is(":selected") ? l.jqGrid("showCol", o[this.value].name) : l.jqGrid("hideCol", o[this.value].name)
                        }),
                        $("option[selected]", f).each(function() {
                            c.push(parseInt(this.value, 10))
                        }),
                        $.each(c, function() {
                            delete m[o[parseInt(this, 10)].name]
                        }),
                        $.each(m, function() {
                            var a = parseInt(this, 10);
                            c = b(c, a, a)
                        }),
                        a.done && a.done.call(l, c),
                        l.jqGrid("setGridWidth", l[0].p.width, l[0].p.shrinkToFit)
                    },
                    cleanup: function(b) {
                        c(a.dlog, e, "destroy"),
                        c(a.msel, f, "destroy"),
                        e.remove(),
                        b && a.done && a.done.call(l)
                    },
                    msel_opts: {}
                }, r, a || {}),
                $.ui && $.ui.multiselect && $.ui.multiselect.defaults) {
                    if (!$.jgrid._multiselect)
                        return void alert("Multiselect plugin loaded after jqGrid. Please load the plugin before the jqGrid!");
                    a.msel_opts = $.extend($.ui.multiselect.defaults, a.msel_opts)
                }
                a.caption && e.attr("title", a.caption),
                a.classname && (e.addClass(a.classname),
                f.addClass(a.classname)),
                a.width && ($(">div", e).css({
                    width: a.width,
                    margin: "0 auto"
                }),
                f.css("width", a.width)),
                a.height && ($(">div", e).css("height", a.height),
                f.css("height", a.height - 10)),
                f.empty(),
                $.each(o, function(a) {
                    if (m[this.name] = a,
                    this.hidedlg)
                        return void (this.hidden || n.push(a));
                    f.append("<option value='" + a + "' " + (this.hidden ? "" : "selected='selected'") + ">" + $.jgrid.stripHtml(p[a]) + "</option>")
                }),
                g = $.isFunction(a.dlog_opts) ? a.dlog_opts.call(l, a) : a.dlog_opts,
                c(a.dlog, e, g),
                h = $.isFunction(a.msel_opts) ? a.msel_opts.call(l, a) : a.msel_opts,
                c(a.msel, f, h),
                i = $("#colchooser_" + $.jgrid.jqID(l[0].p.id));
                var s = $(".ui-jqgrid").css("font-size") || "11px";
                i.parent().css("font-size", s),
                i.css({
                    margin: "auto"
                }),
                i.find(">div").css({
                    width: "100%",
                    height: "100%",
                    margin: "auto"
                }),
                j = q(f),
                j.container.css({
                    width: "100%",
                    height: "100%",
                    margin: "auto"
                }),
                j.selectedContainer.css({
                    width: 100 * j.options.dividerLocation + "%",
                    height: "100%",
                    margin: "auto",
                    boxSizing: "border-box"
                }),
                j.availableContainer.css({
                    width: 100 - 100 * j.options.dividerLocation + "%",
                    height: "100%",
                    margin: "auto",
                    boxSizing: "border-box"
                }),
                j.selectedList.css("height", "auto"),
                j.availableList.css("height", "auto"),
                k = Math.max(j.selectedList.height(), j.availableList.height()),
                k = Math.min(k, $(window).height()),
                j.selectedList.css("height", k),
                j.availableList.css("height", k),
                d()
            }
        },
        sortableRows: function(a) {
            return this.each(function() {
                var b = this;
                b.grid && (b.p.treeGrid || $.fn.sortable && (a = $.extend({
                    cursor: "move",
                    axis: "y",
                    items: " > .jqgrow"
                }, a || {}),
                a.start && $.isFunction(a.start) ? (a._start_ = a.start,
                delete a.start) : a._start_ = !1,
                a.update && $.isFunction(a.update) ? (a._update_ = a.update,
                delete a.update) : a._update_ = !1,
                a.start = function(c, d) {
                    if ($(d.item).css("border-width", "0"),
                    $("td", d.item).each(function(a) {
                        this.style.width = b.grid.cols[a].style.width
                    }),
                    b.p.subGrid) {
                        var e = $(d.item).attr("id");
                        try {
                            $(b).jqGrid("collapseSubGridRow", e)
                        } catch (a) {}
                    }
                    a._start_ && a._start_.apply(this, [c, d])
                }
                ,
                a.update = function(c, d) {
                    $(d.item).css("border-width", ""),
                    !0 === b.p.rownumbers && $("td.jqgrid-rownum", b.rows).each(function(a) {
                        $(this).html(a + 1 + (parseInt(b.p.page, 10) - 1) * parseInt(b.p.rowNum, 10))
                    }),
                    a._update_ && a._update_.apply(this, [c, d])
                }
                ,
                $("tbody:first", b).sortable(a),
                $("tbody:first > .jqgrow", b).disableSelection()))
            })
        },
        gridDnD: function(a) {
            return this.each(function() {
                function b() {
                    var a = $.data(e, "dnd");
                    $("tr.jqgrow:not(.ui-draggable)", e).draggable($.isFunction(a.drag) ? a.drag.call($(e), a) : a.drag)
                }
                var c, d, e = this;
                if (e.grid && !e.p.treeGrid && $.fn.draggable && $.fn.droppable) {
                    if (void 0 === $("#jqgrid_dnd")[0] && $("body").append("<table id='jqgrid_dnd' class='ui-jqgrid-dnd'></table>"),
                    "string" == typeof a && "updateDnD" === a && !0 === e.p.jqgdnd)
                        return void b();
                    var f;
                    if (a = $.extend({
                        drag: function(a) {
                            return $.extend({
                                start: function(b, c) {
                                    var d, f;
                                    if (e.p.subGrid) {
                                        f = $(c.helper).attr("id");
                                        try {
                                            $(e).jqGrid("collapseSubGridRow", f)
                                        } catch (a) {}
                                    }
                                    for (d = 0; d < $.data(e, "dnd").connectWith.length; d++)
                                        0 === $($.data(e, "dnd").connectWith[d]).jqGrid("getGridParam", "reccount") && $($.data(e, "dnd").connectWith[d]).jqGrid("addRowData", "jqg_empty_row", {});
                                    c.helper.addClass("ui-state-highlight"),
                                    $("td", c.helper).each(function(a) {
                                        this.style.width = e.grid.headers[a].width + "px"
                                    }),
                                    a.onstart && $.isFunction(a.onstart) && a.onstart.call($(e), b, c)
                                },
                                stop: function(b, c) {
                                    var d, f;
                                    for (c.helper.dropped && !a.dragcopy && (f = $(c.helper).attr("id"),
                                    void 0 === f && (f = $(this).attr("id")),
                                    $(e).jqGrid("delRowData", f)),
                                    d = 0; d < $.data(e, "dnd").connectWith.length; d++)
                                        $($.data(e, "dnd").connectWith[d]).jqGrid("delRowData", "jqg_empty_row");
                                    a.onstop && $.isFunction(a.onstop) && a.onstop.call($(e), b, c)
                                }
                            }, a.drag_opts || {})
                        },
                        drop: function(a) {
                            return $.extend({
                                accept: function(a) {
                                    if (!$(a).hasClass("jqgrow"))
                                        return a;
                                    f = $(a).closest("table.ui-jqgrid-btable");
                                    var b = $(this).find("table.ui-jqgrid-btable:first")[0];
                                    if (f.length > 0 && void 0 !== $.data(f[0], "dnd")) {
                                        var c = $.data(f[0], "dnd").connectWith;
                                        return -1 !== $.inArray("#" + $.jgrid.jqID(b.id), c)
                                    }
                                    return !1
                                },
                                drop: function(b, c) {
                                    if ($(c.draggable).hasClass("jqgrow")) {
                                        var d = $(c.draggable).attr("id")
                                          , e = c.draggable.parent().parent().jqGrid("getRowData", d)
                                          , g = []
                                          , h = $(this).find("table.ui-jqgrid-btable:first")[0];
                                        if ($.isPlainObject(e) && (g = Object.keys(e)),
                                        !a.dropbyname) {
                                            var i, j, k = {}, l = 0, m = $("#" + $.jgrid.jqID(h.id)).jqGrid("getGridParam", "colModel");
                                            try {
                                                for (i = 0; i < m.length; i++)
                                                    "cb" !== (j = m[i].name) && "rn" !== j && "subgrid" !== j && (void 0 !== g[l] && (k[j] = e[g[l]]),
                                                    l++);
                                                e = k
                                            } catch (a) {}
                                        }
                                        if (c.helper.dropped = !0,
                                        $.data(f[0], "dnd").beforedrop && $.isFunction($.data(f[0], "dnd").beforedrop)) {
                                            var n = $.data(f[0], "dnd").beforedrop.call(h, b, c, e, $(f[0]), $(h));
                                            void 0 !== n && null !== n && "object" == typeof n && (e = n)
                                        }
                                        if (c.helper.dropped) {
                                            var o;
                                            a.autoid && ($.isFunction(a.autoid) ? o = a.autoid.call(h, e) : (o = Math.ceil(1e3 * Math.random()),
                                            o = a.autoidprefix + o)),
                                            $("#" + $.jgrid.jqID(h.id)).jqGrid("addRowData", o, e, a.droppos)
                                        }
                                        a.ondrop && $.isFunction(a.ondrop) && a.ondrop.call(h, b, c, e)
                                    }
                                }
                            }, a.drop_opts || {})
                        },
                        onstart: null,
                        onstop: null,
                        beforedrop: null,
                        ondrop: null,
                        drop_opts: {
                            activeClass: "ui-state-active",
                            hoverClass: "ui-state-hover",
                            tolerance: "intersect"
                        },
                        drag_opts: {
                            revert: "invalid",
                            helper: "clone",
                            cursor: "move",
                            appendTo: "#jqgrid_dnd",
                            zIndex: 5e3
                        },
                        dragcopy: !1,
                        dropbyname: !1,
                        droppos: "first",
                        autoid: !0,
                        autoidprefix: "dnd_"
                    }, a || {}),
                    a.connectWith)
                        for (a.connectWith = a.connectWith.split(","),
                        a.connectWith = $.map(a.connectWith, function(a) {
                            return $.trim(a)
                        }),
                        $.data(e, "dnd", a),
                        0 === e.p.reccount || e.p.jqgdnd || b(),
                        e.p.jqgdnd = !0,
                        c = 0; c < a.connectWith.length; c++)
                            d = a.connectWith[c],
                            $(d).closest(".ui-jqgrid-bdiv").droppable($.isFunction(a.drop) ? a.drop.call($(e), a) : a.drop)
                }
            })
        },
        gridResize: function(opts) {
            return this.each(function() {
                var $t = this, gID = $.jgrid.jqID($t.p.id), req;
                if ($t.grid && $.fn.resizable) {
                    if (opts = $.extend({}, opts || {}),
                    opts.alsoResize ? (opts._alsoResize_ = opts.alsoResize,
                    delete opts.alsoResize) : opts._alsoResize_ = !1,
                    opts.stop && $.isFunction(opts.stop) ? (opts._stop_ = opts.stop,
                    delete opts.stop) : opts._stop_ = !1,
                    opts.stop = function(a, b) {
                        $($t).jqGrid("setGridParam", {
                            height: $("#gview_" + gID + " .ui-jqgrid-bdiv").height()
                        }),
                        $($t).jqGrid("setGridWidth", b.size.width, opts.shrinkToFit),
                        opts._stop_ && opts._stop_.call($t, a, b),
                        $t.p.caption && $("#gbox_" + gID).css({
                            height: "auto"
                        }),
                        $t.p.frozenColumns && (req && clearTimeout(req),
                        req = setTimeout(function() {
                            req && clearTimeout(req),
                            $("#" + gID).jqGrid("destroyFrozenColumns"),
                            $("#" + gID).jqGrid("setFrozenColumns")
                        }))
                    }
                    ,
                    opts._alsoResize_) {
                        var optstest = "{'#gview_" + gID + " .ui-jqgrid-bdiv':true,'" + opts._alsoResize_ + "':true}";
                        opts.alsoResize = eval("(" + optstest + ")")
                    } else
                        opts.alsoResize = $(".ui-jqgrid-bdiv", "#gview_" + gID);
                    delete opts._alsoResize_,
                    $("#gbox_" + gID).resizable(opts)
                }
            })
        }
    }),
    $.assocArraySize = function(a) {
        var b, c = 0;
        for (b in a)
            a.hasOwnProperty(b) && c++;
        return c
    }
    ,
    $.jgrid.extend({
        pivotSetup: function(a, b) {
            var c = []
              , d = []
              , e = []
              , f = []
              , g = []
              , h = {
                grouping: !0,
                groupingView: {
                    groupField: [],
                    groupSummary: [],
                    groupSummaryPos: []
                }
            }
              , i = []
              , j = $.extend({
                rowTotals: !1,
                rowTotalsText: "Total",
                colTotals: !1,
                groupSummary: !0,
                groupSummaryPos: "header",
                frozenStaticCols: !1
            }, b || {});
            return this.each(function() {
                function b(a, b, c) {
                    var d;
                    return d = _pivotfilter.call(a, b, c),
                    d.length > 0 ? d[0] : null
                }
                function k(a, b) {
                    var c, d = 0, e = !0;
                    for (c in a)
                        if (a.hasOwnProperty(c)) {
                            if (a[c] != this[d]) {
                                e = !1;
                                break
                            }
                            if (++d >= this.length)
                                break
                        }
                    return e && (p = b),
                    e
                }
                function l(a, b, c, d, e) {
                    var f;
                    if ($.isFunction(a))
                        f = a.call(w, b, c, d);
                    else
                        switch (a) {
                        case "sum":
                            f = parseFloat(b || 0) + parseFloat(d[c] || 0);
                            break;
                        case "count":
                            "" !== b && null != b || (b = 0),
                            f = d.hasOwnProperty(c) ? b + 1 : 0;
                            break;
                        case "min":
                            f = "" === b || null == b ? parseFloat(d[c] || 0) : Math.min(parseFloat(b), parseFloat(d[c] || 0));
                            break;
                        case "max":
                            f = "" === b || null == b ? parseFloat(d[c] || 0) : Math.max(parseFloat(b), parseFloat(d[c] || 0));
                            break;
                        case "avg":
                            f = (parseFloat(b || 0) * (e - 1) + parseFloat(d[c] || 0)) / e
                        }
                    return f
                }
                function m(a, b, c, e) {
                    var h, i, j, k, m, n, o = b.length, q = "", r = [], s = 1;
                    for ($.isArray(c) ? (k = c.length,
                    r = c) : (k = 1,
                    r[0] = c),
                    f = [],
                    g = [],
                    f.root = 0,
                    j = 0; j < k; j++) {
                        var t, u = [];
                        for (h = 0; h < o; h++) {
                            if (m = "string" == typeof b[h].aggregator ? b[h].aggregator : "cust",
                            null == c)
                                i = $.trim(b[h].member) + "_" + m,
                                t = i,
                                r[0] = b[h].label || m + " " + $.trim(b[h].member);
                            else {
                                t = c[j].replace(/\s+/g, "");
                                try {
                                    i = 1 === o ? q + t : q + t + "_" + m + "_" + String(h)
                                } catch (a) {}
                                r[j] = c[j]
                            }
                            i = isNaN(parseInt(i, 10)) ? i : i + " ",
                            "avg" === b[h].aggregator && (n = -1 === p ? d.length + "_" + i : p + "_" + i,
                            D[n] ? D[n]++ : D[n] = 1,
                            s = D[n]),
                            e[i] = u[i] = l(b[h].aggregator, e[i], b[h].member, a, s)
                        }
                        q += c && null != c[j] ? c[j].replace(/\s+/g, "") : "",
                        f[i] = u,
                        g[i] = r[j]
                    }
                    return e
                }
                function n(a) {
                    var b, d, e, f, g;
                    for (e in a)
                        if (a.hasOwnProperty(e)) {
                            if ("object" != typeof a[e]) {
                                if ("level" === e) {
                                    if (void 0 === L[a.level] && (L[a.level] = "",
                                    a.level > 0 && -1 === a.text.indexOf("_r_Totals") && (i[a.level - 1] = {
                                        useColSpanStyle: !1,
                                        groupHeaders: []
                                    })),
                                    L[a.level] !== a.text && a.children.length && -1 === a.text.indexOf("_r_Totals") && a.level > 0) {
                                        i[a.level - 1].groupHeaders.push({
                                            titleText: a.label,
                                            numberOfColumns: 0
                                        });
                                        var h = i[a.level - 1].groupHeaders.length - 1
                                          , k = 0 === h ? N : M;
                                        if (a.level - 1 == (j.rowTotals ? 1 : 0) && h > 0) {
                                            for (var l = 0, m = 0; m < h; m++)
                                                l += i[a.level - 1].groupHeaders[m].numberOfColumns;
                                            l && (k = l + r)
                                        }
                                        c[k] && (i[a.level - 1].groupHeaders[h].startColumnName = c[k].name,
                                        i[a.level - 1].groupHeaders[h].numberOfColumns = c.length - k),
                                        M = c.length
                                    }
                                    L[a.level] = a.text
                                }
                                if (a.level === s && "level" === e && s > 0)
                                    if (t > 1) {
                                        var o = 1;
                                        for (b in a.fields)
                                            a.fields.hasOwnProperty(b) && (1 === o && i[s - 1].groupHeaders.push({
                                                startColumnName: b,
                                                numberOfColumns: 1,
                                                titleText: a.label || a.text
                                            }),
                                            o++);
                                        i[s - 1].groupHeaders[i[s - 1].groupHeaders.length - 1].numberOfColumns = o - 1
                                    } else
                                        i.splice(s - 1, 1)
                            }
                            if (null != a[e] && "object" == typeof a[e] && n(a[e]),
                            "level" === e && a.level > 0 && (a.level === (0 === s ? a.level : s) || -1 !== L[a.level].indexOf("_r_Totals"))) {
                                d = 0;
                                for (b in a.fields)
                                    if (a.fields.hasOwnProperty(b)) {
                                        g = {};
                                        for (f in j.aggregates[d])
                                            if (j.aggregates[d].hasOwnProperty(f))
                                                switch (f) {
                                                case "member":
                                                case "label":
                                                case "aggregator":
                                                    break;
                                                default:
                                                    g[f] = j.aggregates[d][f]
                                                }
                                        t > 1 ? (g.name = b,
                                        g.label = j.aggregates[d].label || a.label) : (g.name = a.text,
                                        g.label = "_r_Totals" === a.text ? j.rowTotalsText : a.label),
                                        c.push(g),
                                        d++
                                    }
                            }
                        }
                }
                var o, p, q, r, s, t, u, v, w = this, x = a.length, y = 0;
                if (j.rowTotals && j.yDimension.length > 0) {
                    var z = j.yDimension[0].dataName;
                    j.yDimension.splice(0, 0, {
                        dataName: z
                    }),
                    j.yDimension[0].converter = function() {
                        return "_r_Totals"
                    }
                }
                if (r = $.isArray(j.xDimension) ? j.xDimension.length : 0,
                s = j.yDimension.length,
                t = $.isArray(j.aggregates) ? j.aggregates.length : 0,
                0 === r || 0 === t)
                    throw "xDimension or aggregates optiona are not set!";
                var A;
                for (q = 0; q < r; q++)
                    A = {
                        name: j.xDimension[q].dataName,
                        frozen: j.frozenStaticCols
                    },
                    null == j.xDimension[q].isGroupField && (j.xDimension[q].isGroupField = !0),
                    A = $.extend(!0, A, j.xDimension[q]),
                    c.push(A);
                for (var B = r - 1, C = {}, D = []; y < x; ) {
                    o = a[y];
                    var E = []
                      , F = [];
                    u = {},
                    q = 0;
                    do {
                        E[q] = $.trim(o[j.xDimension[q].dataName]),
                        u[j.xDimension[q].dataName] = E[q],
                        q++
                    } while (q < r);var G = 0;
                    if (p = -1,
                    v = b(d, k, E)) {
                        if (p >= 0) {
                            if (G = 0,
                            s >= 1) {
                                for (G = 0; G < s; G++)
                                    F[G] = $.trim(o[j.yDimension[G].dataName]),
                                    j.yDimension[G].converter && $.isFunction(j.yDimension[G].converter) && (F[G] = j.yDimension[G].converter.call(this, F[G], E, F));
                                v = m(o, j.aggregates, F, v)
                            } else
                                0 === s && (v = m(o, j.aggregates, null, v));
                            d[p] = v
                        }
                    } else {
                        if (G = 0,
                        s >= 1) {
                            for (G = 0; G < s; G++)
                                F[G] = $.trim(o[j.yDimension[G].dataName]),
                                j.yDimension[G].converter && $.isFunction(j.yDimension[G].converter) && (F[G] = j.yDimension[G].converter.call(this, F[G], E, F));
                            u = m(o, j.aggregates, F, u)
                        } else
                            0 === s && (u = m(o, j.aggregates, null, u));
                        d.push(u)
                    }
                    var H, I = 0, J = null, K = null;
                    for (H in f)
                        if (f.hasOwnProperty(H)) {
                            if (0 === I)
                                C.children && void 0 !== C.children || (C = {
                                    text: H,
                                    level: 0,
                                    children: [],
                                    label: H
                                }),
                                J = C.children;
                            else {
                                for (K = null,
                                q = 0; q < J.length; q++)
                                    if (J[q].text === H) {
                                        K = J[q];
                                        break
                                    }
                                K ? J = K.children : (J.push({
                                    children: [],
                                    text: H,
                                    level: I,
                                    fields: f[H],
                                    label: g[H]
                                }),
                                J = J[J.length - 1].children)
                            }
                            I++
                        }
                    y++
                }
                D = null;
                var L = []
                  , M = c.length
                  , N = M;
                s > 0 && (i[s - 1] = {
                    useColSpanStyle: !1,
                    groupHeaders: []
                }),
                n(C);
                var O;
                if (j.colTotals)
                    for (var P = d.length; P--; )
                        for (q = r; q < c.length; q++)
                            O = c[q].name,
                            e[O] ? e[O] += parseFloat(d[P][O] || 0) : e[O] = parseFloat(d[P][O] || 0);
                if (B > 0)
                    for (q = 0; q < B; q++)
                        c[q].isGroupField && (h.groupingView.groupField.push(c[q].name),
                        h.groupingView.groupSummary.push(j.groupSummary),
                        h.groupingView.groupSummaryPos.push(j.groupSummaryPos));
                else
                    h.grouping = !1;
                h.sortname = c[B].name,
                h.groupingView.hideFirstGroupCol = !0
            }),
            {
                colModel: c,
                rows: d,
                groupOptions: h,
                groupHeaders: i,
                summary: e
            }
        },
        jqPivot: function(a, b, c, d) {
            return this.each(function() {
                function e(a) {
                    $.isFunction(b.onInitPivot) && b.onInitPivot.call(f),
                    $.isArray(a) || (a = []);
                    var d, e, g, h, i = jQuery(f).jqGrid("pivotSetup", a, b), j = $.assocArraySize(i.summary) > 0, k = $.jgrid.from.call(f, i.rows);
                    for (b.ignoreCase && (k = k.ignoreCase()),
                    d = 0; d < i.groupOptions.groupingView.groupField.length; d++)
                        e = b.xDimension[d].sortorder ? b.xDimension[d].sortorder : "asc",
                        g = b.xDimension[d].sorttype ? b.xDimension[d].sorttype : "text",
                        k.orderBy(i.groupOptions.groupingView.groupField[d], e, g, "", g);
                    if (h = b.xDimension.length,
                    c.sortname) {
                        for (e = c.sortorder ? c.sortorder : "asc",
                        g = "text",
                        d = 0; d < h; d++)
                            if (b.xDimension[d].dataName === c.sortname) {
                                g = b.xDimension[d].sorttype ? b.xDimension[d].sorttype : "text";
                                break
                            }
                        k.orderBy(c.sortname, e, g, "", g)
                    } else
                        i.groupOptions.sortname && h && (e = b.xDimension[h - 1].sortorder ? b.xDimension[h - 1].sortorder : "asc",
                        g = b.xDimension[h - 1].sorttype ? b.xDimension[h - 1].sorttype : "text",
                        k.orderBy(i.groupOptions.sortname, e, g, "", g));
                    jQuery(f).jqGrid($.extend(!0, {
                        datastr: $.extend(k.select(), j ? {
                            userdata: i.summary
                        } : {}),
                        datatype: "jsonstring",
                        footerrow: j,
                        userDataOnFooter: j,
                        colModel: i.colModel,
                        viewrecords: !0,
                        sortname: b.xDimension[0].dataName
                    }, i.groupOptions, c || {}));
                    var l = i.groupHeaders;
                    if (l.length)
                        for (d = 0; d < l.length; d++)
                            l[d] && l[d].groupHeaders.length && jQuery(f).jqGrid("setGroupHeaders", l[d]);
                    b.frozenStaticCols && jQuery(f).jqGrid("setFrozenColumns"),
                    $.isFunction(b.onCompletePivot) && b.onCompletePivot.call(f),
                    b.loadMsg && $(".loading_pivot").remove()
                }
                var f = this
                  , g = c.regional ? c.regional : "en";
                void 0 === b.loadMsg && (b.loadMsg = !0),
                b.loadMsg && $("<div class='loading_pivot ui-state-default ui-state-active row'>" + $.jgrid.getRegional(f, "regional." + g + ".defaults.loadtext") + "</div>").insertBefore(f).show(),
                "string" == typeof a ? $.ajax($.extend({
                    url: a,
                    dataType: "json",
                    success: function(a) {
                        e($.jgrid.getAccessor(a, d && d.reader ? d.reader : "rows"))
                    }
                }, d || {})) : e(a)
            })
        }
    }),
    $.jgrid.extend({
        setSubGrid: function() {
            return this.each(function() {
                var a, b, c = this, d = $.jgrid.styleUI[c.p.styleUI || "jQueryUI"].subgrid, e = {
                    plusicon: d.icon_plus,
                    minusicon: d.icon_minus,
                    openicon: d.icon_open,
                    expandOnLoad: !1,
                    selectOnExpand: !1,
                    selectOnCollapse: !1,
                    reloadOnExpand: !0
                };
                if (c.p.subGridOptions = $.extend(e, c.p.subGridOptions || {}),
                c.p.colNames.unshift(""),
                c.p.colModel.unshift({
                    name: "subgrid",
                    width: $.jgrid.cell_width ? c.p.subGridWidth + c.p.cellLayout : c.p.subGridWidth,
                    sortable: !1,
                    resizable: !1,
                    hidedlg: !0,
                    search: !1,
                    fixed: !0
                }),
                a = c.p.subGridModel,
                a[0])
                    for (a[0].align = $.extend([], a[0].align || []),
                    b = 0; b < a[0].name.length; b++)
                        a[0].align[b] = a[0].align[b] || "left"
            })
        },
        addSubGridCell: function(a, b) {
            var c, d, e, f = "";
            return this.each(function() {
                f = this.formatCol(a, b),
                d = this.p.id,
                c = this.p.subGridOptions.plusicon,
                e = $.jgrid.styleUI[this.p.styleUI || "jQueryUI"].common
            }),
            '<td role="gridcell" aria-describedby="' + d + '_subgrid" class="ui-sgcollapsed sgcollapsed" ' + f + "><a style='cursor:pointer;' class='ui-sghref'><span class='" + e.icon_base + " " + c + "'></span></a></td>"
        },
        addSubGrid: function(a, b) {
            return this.each(function() {
                var c = this;
                if (c.grid) {
                    var d, e, f, g, h, i = $.jgrid.styleUI[c.p.styleUI || "jQueryUI"].base, j = $.jgrid.styleUI[c.p.styleUI || "jQueryUI"].common, k = function(a, b, d) {
                        var e = $("<td align='" + c.p.subGridModel[0].align[d] + "'></td>").html(b);
                        $(a).append(e)
                    }, l = function(a, b) {
                        var d, e, f, g = $("<table class='" + i.rowTable + " ui-common-table'><tbody></tbody></table>"), h = $("<tr></tr>");
                        for (e = 0; e < c.p.subGridModel[0].name.length; e++)
                            d = $("<th class='" + i.headerBox + " ui-th-subgrid ui-th-column ui-th-" + c.p.direction + "'></th>"),
                            $(d).html(c.p.subGridModel[0].name[e]),
                            $(d).width(c.p.subGridModel[0].width[e]),
                            $(h).append(d);
                        $(g).append(h),
                        a && (f = c.p.xmlReader.subgrid,
                        $(f.root + " " + f.row, a).each(function() {
                            if (h = $("<tr class='" + j.content + " ui-subtblcell'></tr>"),
                            !0 === f.repeatitems)
                                $(f.cell, this).each(function(a) {
                                    k(h, $(this).text() || "&#160;", a)
                                });
                            else {
                                var a = c.p.subGridModel[0].mapping || c.p.subGridModel[0].name;
                                if (a)
                                    for (e = 0; e < a.length; e++)
                                        k(h, $.jgrid.getXmlData(this, a[e]) || "&#160;", e)
                            }
                            $(g).append(h)
                        }));
                        var l = $("table:first", c.grid.bDiv).attr("id") + "_";
                        return $("#" + $.jgrid.jqID(l + b)).append(g),
                        c.grid.hDiv.loading = !1,
                        $("#load_" + $.jgrid.jqID(c.p.id)).hide(),
                        !1
                    }, m = function(a, b) {
                        var d, e, f, g, h, l, m = $("<table class='" + i.rowTable + " ui-common-table'><tbody></tbody></table>"), n = $("<tr></tr>");
                        for (f = 0; f < c.p.subGridModel[0].name.length; f++)
                            d = $("<th class='" + i.headerBox + " ui-th-subgrid ui-th-column ui-th-" + c.p.direction + "'></th>"),
                            $(d).html(c.p.subGridModel[0].name[f]),
                            $(d).width(c.p.subGridModel[0].width[f]),
                            $(n).append(d);
                        if ($(m).append(n),
                        a && (h = c.p.jsonReader.subgrid,
                        void 0 !== (e = $.jgrid.getAccessor(a, h.root))))
                            for (f = 0; f < e.length; f++) {
                                if (g = e[f],
                                n = $("<tr class='" + j.content + " ui-subtblcell'></tr>"),
                                !0 === h.repeatitems)
                                    for (h.cell && (g = g[h.cell]),
                                    l = 0; l < g.length; l++)
                                        k(n, g[l] || "&#160;", l);
                                else {
                                    var o = c.p.subGridModel[0].mapping || c.p.subGridModel[0].name;
                                    if (o.length)
                                        for (l = 0; l < o.length; l++)
                                            k(n, $.jgrid.getAccessor(g, o[l]) || "&#160;", l)
                                }
                                $(m).append(n)
                            }
                        var p = $("table:first", c.grid.bDiv).attr("id") + "_";
                        return $("#" + $.jgrid.jqID(p + b)).append(m),
                        c.grid.hDiv.loading = !1,
                        $("#load_" + $.jgrid.jqID(c.p.id)).hide(),
                        !1
                    }, n = function(a) {
                        var b, d, e, f;
                        if (b = $(a).attr("id"),
                        d = {
                            nd_: (new Date).getTime()
                        },
                        d[c.p.prmNames.subgridid] = b,
                        !c.p.subGridModel[0])
                            return !1;
                        if (c.p.subGridModel[0].params)
                            for (f = 0; f < c.p.subGridModel[0].params.length; f++)
                                for (e = 0; e < c.p.colModel.length; e++)
                                    c.p.colModel[e].name === c.p.subGridModel[0].params[f] && (d[c.p.colModel[e].name] = $("td:eq(" + e + ")", a).text().replace(/\&#160\;/gi, ""));
                        if (!c.grid.hDiv.loading)
                            switch (c.grid.hDiv.loading = !0,
                            $("#load_" + $.jgrid.jqID(c.p.id)).show(),
                            c.p.subgridtype || (c.p.subgridtype = c.p.datatype),
                            $.isFunction(c.p.subgridtype) ? c.p.subgridtype.call(c, d) : c.p.subgridtype = c.p.subgridtype.toLowerCase(),
                            c.p.subgridtype) {
                            case "xml":
                            case "json":
                                $.ajax($.extend({
                                    type: c.p.mtype,
                                    url: $.isFunction(c.p.subGridUrl) ? c.p.subGridUrl.call(c, d) : c.p.subGridUrl,
                                    dataType: c.p.subgridtype,
                                    data: $.isFunction(c.p.serializeSubGridData) ? c.p.serializeSubGridData.call(c, d) : d,
                                    complete: function(a) {
                                        "xml" === c.p.subgridtype ? l(a.responseXML, b) : m($.jgrid.parse(a.responseText), b),
                                        a = null
                                    }
                                }, $.jgrid.ajaxOptions, c.p.ajaxSubgridOptions || {}))
                            }
                        return !1
                    }, o = 0;
                    $.each(c.p.colModel, function() {
                        !0 !== this.hidden && "rn" !== this.name && "cb" !== this.name || o++
                    });
                    var p, q = c.rows.length, r = 1, s = $.isFunction(c.p.isHasSubGrid);
                    for (void 0 !== b && b > 0 && (r = b,
                    q = b + 1); r < q; )
                        $(c.rows[r]).hasClass("jqgrow") && (c.p.scroll && $(c.rows[r].cells[a]).off("click"),
                        p = null,
                        s && (p = c.p.isHasSubGrid.call(c, c.rows[r].id)),
                        !1 === p ? c.rows[r].cells[a].innerHTML = "" : $(c.rows[r].cells[a]).on("click", function() {
                            var b = $(this).parent("tr")[0];
                            if (e = c.p.id,
                            d = b.id,
                            h = $("#" + e + "_" + d + "_expandedContent"),
                            $(this).hasClass("sgcollapsed")) {
                                if (g = $(c).triggerHandler("jqGridSubGridBeforeExpand", [e + "_" + d, d]),
                                g = !1 !== g && "stop" !== g,
                                g && $.isFunction(c.p.subGridBeforeExpand) && (g = c.p.subGridBeforeExpand.call(c, e + "_" + d, d)),
                                !1 === g)
                                    return !1;
                                !0 === c.p.subGridOptions.reloadOnExpand || !1 === c.p.subGridOptions.reloadOnExpand && !h.hasClass("ui-subgrid") ? (f = a >= 1 ? "<td colspan='" + a + "'>&#160;</td>" : "",
                                $(b).after("<tr role='row' id='" + e + "_" + d + "_expandedContent' class='ui-subgrid ui-sg-expanded'>" + f + "<td class='" + j.content + " subgrid-cell'><span class='" + j.icon_base + " " + c.p.subGridOptions.openicon + "'></span></td><td colspan='" + parseInt(c.p.colNames.length - 1 - o, 10) + "' class='" + j.content + " subgrid-data'><div id=" + e + "_" + d + " class='tablediv'></div></td></tr>"),
                                $(c).triggerHandler("jqGridSubGridRowExpanded", [e + "_" + d, d]),
                                $.isFunction(c.p.subGridRowExpanded) ? c.p.subGridRowExpanded.call(c, e + "_" + d, d) : n(b)) : h.show().removeClass("ui-sg-collapsed").addClass("ui-sg-expanded"),
                                $(this).html("<a style='cursor:pointer;' class='ui-sghref'><span class='" + j.icon_base + " " + c.p.subGridOptions.minusicon + "'></span></a>").removeClass("sgcollapsed").addClass("sgexpanded"),
                                c.p.subGridOptions.selectOnExpand && $(c).jqGrid("setSelection", d)
                            } else if ($(this).hasClass("sgexpanded")) {
                                if (g = $(c).triggerHandler("jqGridSubGridRowColapsed", [e + "_" + d, d]),
                                g = !1 !== g && "stop" !== g,
                                g && $.isFunction(c.p.subGridRowColapsed) && (g = c.p.subGridRowColapsed.call(c, e + "_" + d, d)),
                                !1 === g)
                                    return !1;
                                !0 === c.p.subGridOptions.reloadOnExpand ? h.remove(".ui-subgrid") : h.hasClass("ui-subgrid") && h.hide().addClass("ui-sg-collapsed").removeClass("ui-sg-expanded"),
                                $(this).html("<a style='cursor:pointer;' class='ui-sghref'><span class='" + j.icon_base + " " + c.p.subGridOptions.plusicon + "'></span></a>").removeClass("sgexpanded").addClass("sgcollapsed"),
                                c.p.subGridOptions.selectOnCollapse && $(c).jqGrid("setSelection", d)
                            }
                            return !1
                        })),
                        r++;
                    if (!0 === c.p.subGridOptions.expandOnLoad) {
                        var t = 0;
                        c.p.multiselect && t++,
                        c.p.rownumbers && t++,
                        $(c.rows).filter(".jqgrow").each(function(a, b) {
                            $(b.cells[t]).click()
                        })
                    }
                    c.subGridXml = function(a, b) {
                        l(a, b)
                    }
                    ,
                    c.subGridJson = function(a, b) {
                        m(a, b)
                    }
                }
            })
        },
        expandSubGridRow: function(a) {
            return this.each(function() {
                var b = this;
                if ((b.grid || a) && !0 === b.p.subGrid) {
                    var c = $(this).jqGrid("getInd", a, !0);
                    if (c) {
                        var d = $("td.sgcollapsed", c)[0];
                        d && $(d).trigger("click")
                    }
                }
            })
        },
        collapseSubGridRow: function(a) {
            return this.each(function() {
                var b = this;
                if ((b.grid || a) && !0 === b.p.subGrid) {
                    var c = $(this).jqGrid("getInd", a, !0);
                    if (c) {
                        var d = $("td.sgexpanded", c)[0];
                        d && $(d).trigger("click")
                    }
                }
            })
        },
        toggleSubGridRow: function(a) {
            return this.each(function() {
                var b = this;
                if ((b.grid || a) && !0 === b.p.subGrid) {
                    var c = $(this).jqGrid("getInd", a, !0);
                    if (c) {
                        var d = $("td.sgcollapsed", c)[0];
                        d ? $(d).trigger("click") : (d = $("td.sgexpanded", c)[0]) && $(d).trigger("click")
                    }
                }
            })
        }
    }),
    $.jgrid.extend({
        setTreeNode: function(a, b) {
            return this.each(function() {
                var c = this;
                if (c.grid && c.p.treeGrid) {
                    var d, e, f, g, h, i, j, k, l = c.p.expColInd, m = c.p.treeReader.expanded_field, n = c.p.treeReader.leaf_field, o = c.p.treeReader.level_field, p = c.p.treeReader.icon_field, q = c.p.treeReader.loaded, r = $.jgrid.styleUI[c.p.styleUI || "jQueryUI"].common, s = a;
                    for ($(c).triggerHandler("jqGridBeforeSetTreeNode", [s, b]),
                    $.isFunction(c.p.beforeSetTreeNode) && c.p.beforeSetTreeNode.call(c, s, b); a < b; ) {
                        var t = $.jgrid.stripPref(c.p.idPrefix, c.rows[a].id)
                          , u = c.p._index[t];
                        j = c.p.data[u],
                        "nested" === c.p.treeGridModel && (j[n] || (d = parseInt(j[c.p.treeReader.left_field], 10),
                        e = parseInt(j[c.p.treeReader.right_field], 10),
                        j[n] = e === d + 1 ? "true" : "false",
                        c.rows[a].cells[c.p._treeleafpos].innerHTML = j[n])),
                        f = parseInt(j[o], 10),
                        0 === c.p.tree_root_level ? (g = f + 1,
                        h = f) : (g = f,
                        h = f - 1),
                        i = "<div class='tree-wrap tree-wrap-" + c.p.direction + "' style='width:" + 18 * g + "px;'>",
                        i += "<div style='" + ("rtl" === c.p.direction ? "right:" : "left:") + 18 * h + "px;' class='" + r.icon_base + " ",
                        void 0 !== j[q] && ("true" === j[q] || !0 === j[q] ? j[q] = !0 : j[q] = !1),
                        "true" === j[n] || !0 === j[n] ? (i += (void 0 !== j[p] && "" !== j[p] ? j[p] : c.p.treeIcons.leaf) + " tree-leaf treeclick",
                        j[n] = !0,
                        k = "leaf") : (j[n] = !1,
                        k = ""),
                        j[m] = ("true" === j[m] || !0 === j[m]) && (j[q] || void 0 === j[q]),
                        !1 === j[m] ? i += !0 === j[n] ? "'" : c.p.treeIcons.plus + " tree-plus treeclick'" : i += !0 === j[n] ? "'" : c.p.treeIcons.minus + " tree-minus treeclick'",
                        i += "></div></div>",
                        $(c.rows[a].cells[l]).wrapInner("<span class='cell-wrapper" + k + "'></span>").prepend(i),
                        f !== parseInt(c.p.tree_root_level, 10) && ($(c).jqGrid("isVisibleNode", j) || $(c.rows[a]).css("display", "none")),
                        $(c.rows[a].cells[l]).find("div.treeclick").on("click", function(a) {
                            var b = a.target || a.srcElement
                              , d = $.jgrid.stripPref(c.p.idPrefix, $(b, c.rows).closest("tr.jqgrow")[0].id)
                              , e = c.p._index[d];
                            return c.p.data[e][n] || (c.p.data[e][m] ? ($(c).jqGrid("collapseRow", c.p.data[e]),
                            $(c).jqGrid("collapseNode", c.p.data[e])) : ($(c).jqGrid("expandRow", c.p.data[e]),
                            $(c).jqGrid("expandNode", c.p.data[e]))),
                            !1
                        }),
                        !0 === c.p.ExpandColClick && $(c.rows[a].cells[l]).find("span.cell-wrapper").css("cursor", "pointer").on("click", function(a) {
                            var b = a.target || a.srcElement
                              , d = $.jgrid.stripPref(c.p.idPrefix, $(b, c.rows).closest("tr.jqgrow")[0].id)
                              , e = c.p._index[d];
                            return c.p.data[e][n] || (c.p.data[e][m] ? ($(c).jqGrid("collapseRow", c.p.data[e]),
                            $(c).jqGrid("collapseNode", c.p.data[e])) : ($(c).jqGrid("expandRow", c.p.data[e]),
                            $(c).jqGrid("expandNode", c.p.data[e]))),
                            $(c).jqGrid("setSelection", d),
                            !1
                        }),
                        a++
                    }
                    $(c).triggerHandler("jqGridAfterSetTreeNode", [s, b]),
                    $.isFunction(c.p.afterSetTreeNode) && c.p.afterSetTreeNode.call(c, s, b)
                }
            })
        },
        setTreeGrid: function() {
            return this.each(function() {
                var a, b, c, d, e = this, f = 0, g = !1, h = [], i = $.jgrid.styleUI[e.p.styleUI || "jQueryUI"].treegrid;
                if (e.p.treeGrid) {
                    e.p.treedatatype || $.extend(e.p, {
                        treedatatype: e.p.datatype
                    }),
                    e.p.loadonce && (e.p.treedatatype = "local"),
                    e.p.subGrid = !1,
                    e.p.altRows = !1,
                    e.p.treeGrid_bigData || (e.p.pgbuttons = !1,
                    e.p.pginput = !1,
                    e.p.rowList = []),
                    e.p.gridview = !0,
                    null !== e.p.rowTotal || e.p.treeGrid_bigData || (e.p.rowNum = 1e4),
                    e.p.multiselect = !1,
                    e.p.expColInd = 0,
                    a = i.icon_plus,
                    "jQueryUI" === e.p.styleUI && (a += "rtl" === e.p.direction ? "w" : "e"),
                    e.p.treeIcons = $.extend({
                        plus: a,
                        minus: i.icon_minus,
                        leaf: i.icon_leaf
                    }, e.p.treeIcons || {}),
                    "nested" === e.p.treeGridModel ? e.p.treeReader = $.extend({
                        level_field: "level",
                        left_field: "lft",
                        right_field: "rgt",
                        leaf_field: "isLeaf",
                        expanded_field: "expanded",
                        loaded: "loaded",
                        icon_field: "icon"
                    }, e.p.treeReader) : "adjacency" === e.p.treeGridModel && (e.p.treeReader = $.extend({
                        level_field: "level",
                        parent_id_field: "parent",
                        leaf_field: "isLeaf",
                        expanded_field: "expanded",
                        loaded: "loaded",
                        icon_field: "icon"
                    }, e.p.treeReader));
                    for (c in e.p.colModel)
                        if (e.p.colModel.hasOwnProperty(c)) {
                            b = e.p.colModel[c].name,
                            b !== e.p.ExpandColumn || g || (g = !0,
                            e.p.expColInd = f),
                            f++;
                            for (d in e.p.treeReader)
                                e.p.treeReader.hasOwnProperty(d) && e.p.treeReader[d] === b && h.push(b)
                        }
                    $.each(e.p.treeReader, function(a, b) {
                        b && -1 === $.inArray(b, h) && ("leaf_field" === a && (e.p._treeleafpos = f),
                        f++,
                        e.p.colNames.push(b),
                        e.p.colModel.push({
                            name: b,
                            width: 1,
                            hidden: !0,
                            sortable: !1,
                            resizable: !1,
                            hidedlg: !0,
                            editable: !0,
                            search: !1
                        }))
                    })
                }
            })
        },
        expandRow: function(a) {
            this.each(function() {
                var b = this;
                if (!b.p.treeGrid_bigData)
                    var c = b.p.lastpage;
                if (b.grid && b.p.treeGrid) {
                    var d = $(b).jqGrid("getNodeChildren", a)
                      , e = b.p.treeReader.expanded_field
                      , f = a[b.p.localReader.id]
                      , g = $(b).triggerHandler("jqGridBeforeExpandTreeGridRow", [f, a, d]);
                    void 0 === g && (g = !0),
                    g && $.isFunction(b.p.beforeExpandTreeGridRow) && (g = b.p.beforeExpandTreeGridRow.call(b, f, a, d)),
                    !1 !== g && ($(d).each(function() {
                        var a = b.p.idPrefix + $.jgrid.getAccessor(this, b.p.localReader.id);
                        $($(b).jqGrid("getGridRowById", a)).css("display", ""),
                        this[e] && $(b).jqGrid("expandRow", this)
                    }),
                    $(b).triggerHandler("jqGridAfterExpandTreeGridRow", [f, a, d]),
                    $.isFunction(b.p.afterExpandTreeGridRow) && b.p.afterExpandTreeGridRow.call(b, f, a, d),
                    b.p.treeGrid_bigData || (b.p.lastpage = c))
                }
            })
        },
        collapseRow: function(a) {
            this.each(function() {
                var b = this;
                if (b.grid && b.p.treeGrid) {
                    var c = $(b).jqGrid("getNodeChildren", a)
                      , d = b.p.treeReader.expanded_field
                      , e = a[b.p.localReader.id]
                      , f = $(b).triggerHandler("jqGridBeforeCollapseTreeGridRow", [e, a, c]);
                    void 0 === f && (f = !0),
                    f && $.isFunction(b.p.beforeCollapseTreeGridRow) && (f = b.p.beforeCollapseTreeGridRow.call(b, e, a, c)),
                    !1 !== f && ($(c).each(function() {
                        var a = b.p.idPrefix + $.jgrid.getAccessor(this, b.p.localReader.id);
                        $($(b).jqGrid("getGridRowById", a)).css("display", "none"),
                        this[d] && $(b).jqGrid("collapseRow", this)
                    }),
                    $(b).triggerHandler("jqGridAfterCollapseTreeGridRow", [e, a, c]),
                    $.isFunction(b.p.afterCollapseTreeGridRow) && b.p.afterCollapseTreeGridRow.call(b, e, a, c))
                }
            })
        },
        getRootNodes: function(a) {
            var b = [];
            return this.each(function() {
                var c, d, e, f = this;
                if (f.grid && f.p.treeGrid)
                    switch ("boolean" != typeof a && (a = !1),
                    e = a ? $(f).jqGrid("getRowData", null, !0) : f.p.data,
                    f.p.treeGridModel) {
                    case "nested":
                        c = f.p.treeReader.level_field,
                        $(e).each(function() {
                            parseInt(this[c], 10) === parseInt(f.p.tree_root_level, 10) && (a ? b.push(f.p.data[f.p._index[this[f.p.keyName]]]) : b.push(this))
                        });
                        break;
                    case "adjacency":
                        d = f.p.treeReader.parent_id_field,
                        $(e).each(function() {
                            null !== this[d] && "null" !== String(this[d]).toLowerCase() || (a ? b.push(f.p.data[f.p._index[this[f.p.keyName]]]) : b.push(this))
                        })
                    }
            }),
            b
        },
        getNodeDepth: function(a) {
            var b = null;
            return this.each(function() {
                if (this.grid && this.p.treeGrid) {
                    var c = this;
                    switch (c.p.treeGridModel) {
                    case "nested":
                        var d = c.p.treeReader.level_field;
                        b = parseInt(a[d], 10) - parseInt(c.p.tree_root_level, 10);
                        break;
                    case "adjacency":
                        b = $(c).jqGrid("getNodeAncestors", a).length
                    }
                }
            }),
            b
        },
        getNodeParent: function(a) {
            var b = null;
            return this.each(function() {
                var c = this;
                if (c.grid && c.p.treeGrid)
                    switch (c.p.treeGridModel) {
                    case "nested":
                        var d = c.p.treeReader.left_field
                          , e = c.p.treeReader.right_field
                          , f = c.p.treeReader.level_field
                          , g = parseInt(a[d], 10)
                          , h = parseInt(a[e], 10)
                          , i = parseInt(a[f], 10);
                        $(this.p.data).each(function() {
                            if (parseInt(this[f], 10) === i - 1 && parseInt(this[d], 10) < g && parseInt(this[e], 10) > h)
                                return b = this,
                                !1
                        });
                        break;
                    case "adjacency":
                        for (var j = c.p.treeReader.parent_id_field, k = c.p.localReader.id, l = a[k], m = c.p._index[l]; m--; )
                            if (String(c.p.data[m][k]) === String($.jgrid.stripPref(c.p.idPrefix, a[j]))) {
                                b = c.p.data[m];
                                break
                            }
                    }
            }),
            b
        },
        getNodeChildren: function(a, b) {
            var c = [];
            return this.each(function() {
                var d = this;
                if (d.grid && d.p.treeGrid) {
                    var e, f, g = b ? this.rows.length : this.p.data.length;
                    switch (d.p.treeGridModel) {
                    case "nested":
                        var h = d.p.treeReader.left_field
                          , i = d.p.treeReader.right_field
                          , j = d.p.treeReader.level_field
                          , k = parseInt(a[h], 10)
                          , l = parseInt(a[i], 10)
                          , m = parseInt(a[j], 10);
                        for (e = 0; e < g; e++)
                            (f = b ? d.p.data[d.p._index[this.rows[e].id]] : d.p.data[e]) && parseInt(f[j], 10) === m + 1 && parseInt(f[h], 10) > k && parseInt(f[i], 10) < l && c.push(f);
                        break;
                    case "adjacency":
                        var n = d.p.treeReader.parent_id_field
                          , o = d.p.localReader.id;
                        for (e = 0; e < g; e++)
                            (f = b ? d.p.data[d.p._index[this.rows[e].id]] : d.p.data[e]) && String(f[n]) === String($.jgrid.stripPref(d.p.idPrefix, a[o])) && c.push(f)
                    }
                }
            }),
            c
        },
        getFullTreeNode: function(a, b) {
            var c = [];
            return this.each(function() {
                var d, e = this, f = e.p.treeReader.expanded_field;
                if (e.grid && e.p.treeGrid)
                    switch (null != b && "boolean" == typeof b || (b = !1),
                    e.p.treeGridModel) {
                    case "nested":
                        var g = e.p.treeReader.left_field
                          , h = e.p.treeReader.right_field
                          , i = e.p.treeReader.level_field
                          , j = parseInt(a[g], 10)
                          , k = parseInt(a[h], 10)
                          , l = parseInt(a[i], 10);
                        $(this.p.data).each(function() {
                            parseInt(this[i], 10) >= l && parseInt(this[g], 10) >= j && parseInt(this[g], 10) <= k && (b && (this[f] = !0),
                            c.push(this))
                        });
                        break;
                    case "adjacency":
                        if (a) {
                            c.push(a);
                            var m = e.p.treeReader.parent_id_field
                              , n = e.p.localReader.id;
                            $(this.p.data).each(function(a) {
                                for (d = c.length,
                                a = 0; a < d; a++)
                                    if (String($.jgrid.stripPref(e.p.idPrefix, c[a][n])) === String(this[m])) {
                                        b && (this[f] = !0),
                                        c.push(this);
                                        break
                                    }
                            })
                        }
                    }
            }),
            c
        },
        getNodeAncestors: function(a, b, c) {
            var d = [];
            return void 0 === b && (b = !1),
            this.each(function() {
                if (this.grid && this.p.treeGrid) {
                    c = void 0 !== c && this.p.treeReader.expanded_field;
                    for (var e = $(this).jqGrid("getNodeParent", a); e; ) {
                        if (c)
                            try {
                                e[c] = !0
                            } catch (a) {}
                        b ? d.unshift(e) : d.push(e),
                        e = $(this).jqGrid("getNodeParent", e)
                    }
                }
            }),
            d
        },
        isVisibleNode: function(a) {
            var b = !0;
            return this.each(function() {
                var c = this;
                if (c.grid && c.p.treeGrid) {
                    var d = $(c).jqGrid("getNodeAncestors", a)
                      , e = c.p.treeReader.expanded_field;
                    $(d).each(function() {
                        if (!(b = b && this[e]))
                            return !1
                    })
                }
            }),
            b
        },
        isNodeLoaded: function(a) {
            var b;
            return this.each(function() {
                var c = this;
                if (c.grid && c.p.treeGrid) {
                    var d = c.p.treeReader.leaf_field
                      , e = c.p.treeReader.loaded;
                    b = void 0 !== a && (void 0 !== a[e] ? a[e] : !!(a[d] || $(c).jqGrid("getNodeChildren", a).length > 0))
                }
            }),
            b
        },
        setLeaf: function(a, b, c) {
            return this.each(function() {
                var d = $.jgrid.getAccessor(a, this.p.localReader.id)
                  , e = $("#" + d, this.grid.bDiv)[0]
                  , f = this.p.treeReader.leaf_field;
                try {
                    var g = this.p._index[d];
                    null != g && (this.p.data[g][f] = b)
                } catch (a) {}
                if (!0 === b)
                    $("div.treeclick", e).removeClass(this.p.treeIcons.minus + " tree-minus " + this.p.treeIcons.plus + " tree-plus").addClass(this.p.treeIcons.leaf + " tree-leaf");
                else if (!1 === b) {
                    var h = this.p.treeIcons.minus + " tree-minus";
                    c && (h = this.p.treeIcons.plus + " tree-plus"),
                    $("div.treeclick", e).removeClass(this.p.treeIcons.leaf + " tree-leaf").addClass(h)
                }
            })
        },
        reloadNode: function(a, b) {
            return this.each(function() {
                if (this.grid && this.p.treeGrid) {
                    var c = this.p.localReader.id
                      , d = this.p.selrow;
                    $(this).jqGrid("delChildren", a[c]),
                    void 0 === b && (b = !1),
                    b || jQuery._data(this, "events").jqGridAfterSetTreeNode || $(this).on("jqGridAfterSetTreeNode.reloadNode", function() {
                        var a = this.p.treeReader.leaf_field;
                        if (this.p.reloadnode) {
                            var b = this.p.reloadnode
                              , c = $(this).jqGrid("getNodeChildren", b);
                            b[a] && c.length ? $(this).jqGrid("setLeaf", b, !1) : b[a] || 0 !== c.length || $(this).jqGrid("setLeaf", b, !0)
                        }
                        this.p.reloadnode = !1
                    });
                    var e = this.p.treeReader.expanded_field
                      , f = this.p.treeReader.parent_id_field
                      , g = this.p.treeReader.loaded
                      , h = this.p.treeReader.level_field
                      , i = this.p.treeReader.leaf_field
                      , j = this.p.treeReader.left_field
                      , k = this.p.treeReader.right_field
                      , l = $.jgrid.getAccessor(a, this.p.localReader.id)
                      , m = $("#" + l, this.grid.bDiv)[0];
                    a[e] = !0,
                    a[i] || $("div.treeclick", m).removeClass(this.p.treeIcons.plus + " tree-plus").addClass(this.p.treeIcons.minus + " tree-minus"),
                    this.p.treeANode = m.rowIndex,
                    this.p.datatype = this.p.treedatatype,
                    this.p.reloadnode = a,
                    b && (this.p.treeANode = m.rowIndex > 0 ? m.rowIndex - 1 : 1,
                    $(this).jqGrid("delRowData", l)),
                    "nested" === this.p.treeGridModel ? $(this).jqGrid("setGridParam", {
                        postData: {
                            nodeid: l,
                            n_left: a[j],
                            n_right: a[k],
                            n_level: a[h]
                        }
                    }) : $(this).jqGrid("setGridParam", {
                        postData: {
                            nodeid: l,
                            parentid: a[f],
                            n_level: a[h]
                        }
                    }),
                    $(this).trigger("reloadGrid"),
                    a[g] = !0,
                    "nested" === this.p.treeGridModel ? $(this).jqGrid("setGridParam", {
                        selrow: d,
                        postData: {
                            nodeid: "",
                            n_left: "",
                            n_right: "",
                            n_level: ""
                        }
                    }) : $(this).jqGrid("setGridParam", {
                        selrow: d,
                        postData: {
                            nodeid: "",
                            parentid: "",
                            n_level: ""
                        }
                    })
                }
            })
        },
        expandNode: function(a) {
            return this.each(function() {
                if (this.grid && this.p.treeGrid) {
                    var b = this
                      , c = this.p.treeReader.expanded_field
                      , d = this.p.treeReader.parent_id_field
                      , e = this.p.treeReader.loaded
                      , f = this.p.treeReader.level_field
                      , g = this.p.treeReader.left_field
                      , h = this.p.treeReader.right_field;
                    if (!a[c]) {
                        var i = $.jgrid.getAccessor(a, this.p.localReader.id)
                          , j = $("#" + this.p.idPrefix + $.jgrid.jqID(i), this.grid.bDiv)[0]
                          , k = this.p._index[i]
                          , l = $(b).triggerHandler("jqGridBeforeExpandTreeGridNode", [i, a]);
                        if (void 0 === l && (l = !0),
                        l && $.isFunction(this.p.beforeExpandTreeGridNode) && (l = this.p.beforeExpandTreeGridNode.call(this, i, a)),
                        !1 === l)
                            return;
                        $(this).jqGrid("isNodeLoaded", this.p.data[k]) ? (a[c] = !0,
                        $("div.treeclick", j).removeClass(this.p.treeIcons.plus + " tree-plus").addClass(this.p.treeIcons.minus + " tree-minus")) : this.grid.hDiv.loading || (a[c] = !0,
                        $("div.treeclick", j).removeClass(this.p.treeIcons.plus + " tree-plus").addClass(this.p.treeIcons.minus + " tree-minus"),
                        this.p.treeANode = j.rowIndex,
                        this.p.datatype = this.p.treedatatype,
                        "nested" === this.p.treeGridModel ? $(this).jqGrid("setGridParam", {
                            postData: {
                                nodeid: i,
                                n_left: a[g],
                                n_right: a[h],
                                n_level: a[f]
                            }
                        }) : $(this).jqGrid("setGridParam", {
                            postData: {
                                nodeid: i,
                                parentid: a[d],
                                n_level: a[f]
                            }
                        }),
                        $(this).trigger("reloadGrid"),
                        a[e] = !0,
                        "nested" === this.p.treeGridModel ? $(this).jqGrid("setGridParam", {
                            postData: {
                                nodeid: "",
                                n_left: "",
                                n_right: "",
                                n_level: ""
                            }
                        }) : $(this).jqGrid("setGridParam", {
                            postData: {
                                nodeid: "",
                                parentid: "",
                                n_level: ""
                            }
                        })),
                        $(b).triggerHandler("jqGridAfterExpandTreeGridNode", [i, a]),
                        $.isFunction(this.p.afterExpandTreeGridNode) && this.p.afterExpandTreeGridNode.call(this, i, a)
                    }
                }
            })
        },
        collapseNode: function(a) {
            return this.each(function() {
                if (this.grid && this.p.treeGrid) {
                    var b = this.p.treeReader.expanded_field
                      , c = this;
                    if (a[b]) {
                        var d = $.jgrid.getAccessor(a, this.p.localReader.id)
                          , e = $("#" + this.p.idPrefix + $.jgrid.jqID(d), this.grid.bDiv)[0]
                          , f = $(c).triggerHandler("jqGridBeforeCollapseTreeGridNode", [d, a]);
                        if (void 0 === f && (f = !0),
                        f && $.isFunction(this.p.beforeCollapseTreeGridNode) && (f = this.p.beforeCollapseTreeGridNode.call(this, d, a)),
                        a[b] = !1,
                        !1 === f)
                            return;
                        $("div.treeclick", e).removeClass(this.p.treeIcons.minus + " tree-minus").addClass(this.p.treeIcons.plus + " tree-plus"),
                        $(c).triggerHandler("jqGridAfterCollapseTreeGridNode", [d, a]),
                        $.isFunction(this.p.afterCollapseTreeGridNode) && this.p.afterCollapseTreeGridNode.call(this, d, a)
                    }
                }
            })
        },
        SortTree: function(a, b, c, d) {
            return this.each(function() {
                if (this.grid && this.p.treeGrid) {
                    var e, f, g, h, i, j = [], k = this, l = $(this).jqGrid("getRootNodes", k.p.search);
                    for (h = $.jgrid.from.call(this, l),
                    h.orderBy(a, b, c, d),
                    i = h.select(),
                    e = 0,
                    f = i.length; e < f; e++)
                        g = i[e],
                        j.push(g),
                        $(this).jqGrid("collectChildrenSortTree", j, g, a, b, c, d);
                    $.each(j, function(a) {
                        var b = $.jgrid.getAccessor(this, k.p.localReader.id);
                        $("#" + $.jgrid.jqID(k.p.id) + " tbody tr:eq(" + a + ")").after($("tr#" + $.jgrid.jqID(b), k.grid.bDiv))
                    }),
                    h = null,
                    i = null,
                    j = null
                }
            })
        },
        searchTree: function(a) {
            var b, c, d, e, f, g, h = a.length || 0, i = [], j = [], k = [];
            return this.each(function() {
                if (this.grid && this.p.treeGrid && h)
                    for (b = this.p.localReader.id; h--; )
                        if (i = $(this).jqGrid("getNodeAncestors", a[h], !0, !0),
                        i.push(a[h]),
                        c = i[0][b],
                        -1 === $.inArray(c, j))
                            j.push(c),
                            k = k.concat(i);
                        else
                            for (f = 0,
                            d = i.length; f < d; f++) {
                                var l = !1;
                                for (g = 0,
                                e = k.length; g < e; g++)
                                    if (i[f][b] === k[g][b]) {
                                        l = !0;
                                        break
                                    }
                                l || k.push(i[f])
                            }
            }),
            k
        },
        collectChildrenSortTree: function(a, b, c, d, e, f) {
            return this.each(function() {
                if (this.grid && this.p.treeGrid) {
                    var g, h, i, j, k, l;
                    for (j = $(this).jqGrid("getNodeChildren", b, this.p.search),
                    k = $.jgrid.from.call(this, j),
                    k.orderBy(c, d, e, f),
                    l = k.select(),
                    g = 0,
                    h = l.length; g < h; g++)
                        i = l[g],
                        a.push(i),
                        $(this).jqGrid("collectChildrenSortTree", a, i, c, d, e, f)
                }
            })
        },
        setTreeRow: function(a, b) {
            var c = !1;
            return this.each(function() {
                var d = this;
                d.grid && d.p.treeGrid && (c = $(d).jqGrid("setRowData", a, b))
            }),
            c
        },
        delTreeNode: function(a) {
            return this.each(function() {
                var b, c, d, e, f, g = this, h = g.p.localReader.id, i = g.p.treeReader.left_field, j = g.p.treeReader.right_field;
                if (g.grid && g.p.treeGrid) {
                    var k = g.p._index[a];
                    if (void 0 !== k) {
                        c = parseInt(g.p.data[k][j], 10),
                        d = c - parseInt(g.p.data[k][i], 10) + 1;
                        var l = $(g).jqGrid("getFullTreeNode", g.p.data[k]);
                        if (l.length > 0)
                            for (b = 0; b < l.length; b++)
                                $(g).jqGrid("delRowData", l[b][h]);
                        if ("nested" === g.p.treeGridModel) {
                            if (e = $.jgrid.from.call(g, g.p.data).greater(i, c, {
                                stype: "integer"
                            }).select(),
                            e.length)
                                for (f in e)
                                    e.hasOwnProperty(f) && (e[f][i] = parseInt(e[f][i], 10) - d);
                            if (e = $.jgrid.from.call(g, g.p.data).greater(j, c, {
                                stype: "integer"
                            }).select(),
                            e.length)
                                for (f in e)
                                    e.hasOwnProperty(f) && (e[f][j] = parseInt(e[f][j], 10) - d)
                        }
                    }
                }
            })
        },
        delChildren: function(a) {
            return this.each(function() {
                var b, c, d, e, f = this, g = f.p.localReader.id, h = f.p.treeReader.left_field, i = f.p.treeReader.right_field;
                if (f.grid && f.p.treeGrid) {
                    var j = f.p._index[a];
                    if (void 0 !== j) {
                        b = parseInt(f.p.data[j][i], 10),
                        c = b - parseInt(f.p.data[j][h], 10) + 1;
                        var k = $(f).jqGrid("getFullTreeNode", f.p.data[j]);
                        if (k.length > 0)
                            for (var l = 0; l < k.length; l++)
                                k[l][g] !== a && $(f).jqGrid("delRowData", k[l][g]);
                        if ("nested" === f.p.treeGridModel) {
                            if (d = $.jgrid.from(f.p.data).greater(h, b, {
                                stype: "integer"
                            }).select(),
                            d.length)
                                for (e in d)
                                    d.hasOwnProperty(e) && (d[e][h] = parseInt(d[e][h], 10) - c);
                            if (d = $.jgrid.from(f.p.data).greater(i, b, {
                                stype: "integer"
                            }).select(),
                            d.length)
                                for (e in d)
                                    d.hasOwnProperty(e) && (d[e][i] = parseInt(d[e][i], 10) - c)
                        }
                    }
                }
            })
        },
        addChildNode: function(a, b, c, d) {
            var e = this[0];
            if (c) {
                var f, g, h, i, j, k, l, m, n = e.p.treeReader.expanded_field, o = e.p.treeReader.leaf_field, p = e.p.treeReader.level_field, q = e.p.treeReader.parent_id_field, r = e.p.treeReader.left_field, s = e.p.treeReader.right_field, t = e.p.treeReader.loaded, u = 0, v = b;
                if (void 0 === d && (d = !1),
                null == a) {
                    if ((j = e.p.data.length - 1) >= 0)
                        for (; j >= 0; )
                            u = Math.max(u, parseInt(e.p.data[j][e.p.localReader.id], 10)),
                            j--;
                    a = u + 1
                }
                var w = $(e).jqGrid("getInd", b);
                if (l = !1,
                void 0 === b || null === b || "" === b)
                    b = null,
                    v = null,
                    f = "last",
                    i = e.p.tree_root_level,
                    j = e.p.data.length + 1;
                else {
                    f = "after",
                    g = e.p._index[b],
                    h = e.p.data[g],
                    b = h[e.p.localReader.id],
                    i = parseInt(h[p], 10) + 1;
                    var x = $(e).jqGrid("getFullTreeNode", h);
                    x.length ? (j = x[x.length - 1][e.p.localReader.id],
                    v = j,
                    j = $(e).jqGrid("getInd", v) + 1) : j = $(e).jqGrid("getInd", b) + 1,
                    h[o] && (l = !0,
                    h[n] = !0,
                    $(e.rows[w]).find("span.cell-wrapperleaf").removeClass("cell-wrapperleaf").addClass("cell-wrapper").end().find("div.tree-leaf").removeClass(e.p.treeIcons.leaf + " tree-leaf").addClass(e.p.treeIcons.minus + " tree-minus"),
                    e.p.data[g][o] = !1,
                    h[t] = !0)
                }
                if (k = j + 1,
                void 0 === c[n] && (c[n] = !1),
                void 0 === c[t] && (c[t] = !1),
                c[p] = i,
                void 0 === c[o] && (c[o] = !0),
                "adjacency" === e.p.treeGridModel && (c[q] = b),
                "nested" === e.p.treeGridModel) {
                    var y, z, A;
                    if (null !== b) {
                        if (m = parseInt(h[s], 10),
                        y = $.jgrid.from.call(e, e.p.data),
                        y = y.greaterOrEquals(s, m, {
                            stype: "integer"
                        }),
                        z = y.select(),
                        z.length)
                            for (A in z)
                                z.hasOwnProperty(A) && (z[A][r] = z[A][r] > m ? parseInt(z[A][r], 10) + 2 : z[A][r],
                                z[A][s] = z[A][s] >= m ? parseInt(z[A][s], 10) + 2 : z[A][s]);
                        c[r] = m,
                        c[s] = m + 1
                    } else {
                        if (m = parseInt($(e).jqGrid("getCol", s, !1, "max"), 10),
                        z = $.jgrid.from.call(e, e.p.data).greater(r, m, {
                            stype: "integer"
                        }).select(),
                        z.length)
                            for (A in z)
                                z.hasOwnProperty(A) && (z[A][r] = parseInt(z[A][r], 10) + 2);
                        if (z = $.jgrid.from.call(e, e.p.data).greater(s, m, {
                            stype: "integer"
                        }).select(),
                        z.length)
                            for (A in z)
                                z.hasOwnProperty(A) && (z[A][s] = parseInt(z[A][s], 10) + 2);
                        c[r] = m + 1,
                        c[s] = m + 2
                    }
                }
                (null === b || $(e).jqGrid("isNodeLoaded", h) || l) && ($(e).jqGrid("addRowData", a, c, f, v),
                $(e).jqGrid("setTreeNode", j, k)),
                h && !h[n] && d && $(e.rows[w]).find("div.treeclick").click()
            }
        }
    }),
    $.fn.jqDrag = function(a) {
        return i(this, a, "d")
    }
    ,
    $.fn.jqResize = function(a, b) {
        return i(this, a, "r", b)
    }
    ,
    $.jqDnR = {
        dnr: {},
        e: 0,
        drag: function(a) {
            return "d" == M.k ? E.css({
                left: M.X + a.pageX - M.pX,
                top: M.Y + a.pageY - M.pY
            }) : (E.css({
                width: Math.max(a.pageX - M.pX + M.W, 0),
                height: Math.max(a.pageY - M.pY + M.H, 0)
            }),
            M1 && E1.css({
                width: Math.max(a.pageX - M1.pX + M1.W, 0),
                height: Math.max(a.pageY - M1.pY + M1.H, 0)
            })),
            !1
        },
        stop: function() {
            $(document).off("mousemove", J.drag).off("mouseup", J.stop)
        }
    };
    var J = $.jqDnR, M = J.dnr, E = J.e, E1, M1, i = function(a, b, c, d) {
        return a.each(function() {
            b = b ? $(b, a) : a,
            b.on("mousedown", {
                e: a,
                k: c
            }, function(a) {
                var b = a.data
                  , c = {};
                if (E = b.e,
                E1 = !!d && $(d),
                "relative" != E.css("position"))
                    try {
                        E.position(c)
                    } catch (a) {}
                if (M = {
                    X: c.left || f("left") || 0,
                    Y: c.top || f("top") || 0,
                    W: f("width") || E[0].scrollWidth || 0,
                    H: f("height") || E[0].scrollHeight || 0,
                    pX: a.pageX,
                    pY: a.pageY,
                    k: b.k
                },
                M1 = !(!E1 || "d" == b.k) && {
                    X: c.left || f1("left") || 0,
                    Y: c.top || f1("top") || 0,
                    W: E1[0].offsetWidth || f1("width") || 0,
                    H: E1[0].offsetHeight || f1("height") || 0,
                    pX: a.pageX,
                    pY: a.pageY,
                    k: b.k
                },
                $("input.hasDatepicker", E[0])[0])
                    try {
                        $("input.hasDatepicker", E[0]).datepicker("hide")
                    } catch (a) {}
                return $(document).mousemove($.jqDnR.drag).mouseup($.jqDnR.stop),
                !1
            })
        })
    }, f = function(a) {
        return parseInt(E.css(a), 10) || !1
    }, f1 = function(a) {
        return parseInt(E1.css(a), 10) || !1
    };
    $.fn.tinyDraggable = function(a) {
        var b = $.extend({
            handle: 0,
            exclude: 0
        }, a);
        return this.each(function() {
            var a, c, d = $(this);
            (b.handle ? $(b.handle, d) : d).on({
                mousedown: function(e) {
                    if (!b.exclude || !~$.inArray(e.target, $(b.exclude, d))) {
                        e.preventDefault();
                        var f = d.offset();
                        a = e.pageX - f.left,
                        c = e.pageY - f.top,
                        $(document).on("mousemove.drag", function(b) {
                            d.offset({
                                top: b.pageY - c,
                                left: b.pageX - a
                            })
                        })
                    }
                },
                mouseup: function(a) {
                    $(document).off("mousemove.drag")
                }
            })
        })
    }
    ,
    $.fn.jqm = function(a) {
        var b = {
            overlay: 50,
            closeoverlay: !0,
            overlayClass: "jqmOverlay",
            closeClass: "jqmClose",
            trigger: ".jqModal",
            ajax: F,
            ajaxText: "",
            target: F,
            modal: F,
            toTop: F,
            onShow: F,
            onHide: F,
            onLoad: F
        };
        return this.each(function() {
            if (this._jqm)
                return H[this._jqm].c = $.extend({}, H[this._jqm].c, a);
            s++,
            this._jqm = s,
            H[s] = {
                c: $.extend(b, $.jqm.params, a),
                a: F,
                w: $(this).addClass("jqmID" + s),
                s: s
            },
            b.trigger && $(this).jqmAddTrigger(b.trigger)
        })
    }
    ,
    $.fn.jqmAddClose = function(a) {
        return hs(this, a, "jqmHide")
    }
    ,
    $.fn.jqmAddTrigger = function(a) {
        return hs(this, a, "jqmShow")
    }
    ,
    $.fn.jqmShow = function(a) {
        return this.each(function() {
            $.jqm.open(this._jqm, a)
        })
    }
    ,
    $.fn.jqmHide = function(a) {
        return this.each(function() {
            $.jqm.close(this._jqm, a)
        })
    }
    ,
    $.jqm = {
        hash: {},
        open: function(a, b) {
            var c = H[a]
              , d = c.c
              , f = "." + d.closeClass
              , g = parseInt(c.w.css("z-index"));
            g = g > 0 ? g : 3e3;
            var h = $("<div></div>").css({
                height: "100%",
                width: "100%",
                position: "fixed",
                left: 0,
                top: 0,
                "z-index": g - 1,
                opacity: d.overlay / 100
            });
            if (c.a)
                return F;
            if (c.t = b,
            c.a = !0,
            c.w.css("z-index", g),
            d.modal ? (A[0] || setTimeout(function() {
                new L("bind")
            }, 1),
            A.push(a)) : d.overlay > 0 ? d.closeoverlay && c.w.jqmAddClose(h) : h = F,
            c.o = h ? h.addClass(d.overlayClass).prependTo("body") : F,
            d.ajax) {
                var i = d.target || c.w
                  , j = d.ajax;
                i = "string" == typeof i ? $(i, c.w) : $(i),
                j = "@" === j.substr(0, 1) ? $(b).attr(j.substring(1)) : j,
                i.html(d.ajaxText).load(j, function() {
                    d.onLoad && d.onLoad.call(this, c),
                    f && c.w.jqmAddClose($(f, c.w)),
                    e(c)
                })
            } else
                f && c.w.jqmAddClose($(f, c.w));
            return d.toTop && c.o && c.w.before('<span id="jqmP' + c.w[0]._jqm + '"></span>').insertAfter(c.o),
            d.onShow ? d.onShow(c) : c.w.show(),
            e(c),
            F
        },
        close: function(a) {
            var b = H[a];
            return b.a ? (b.a = F,
            A[0] && (A.pop(),
            A[0] || new L("unbind")),
            b.c.toTop && b.o && $("#jqmP" + b.w[0]._jqm).after(b.w).remove(),
            b.c.onHide ? b.c.onHide(b) : (b.w.hide(),
            b.o && b.o.remove()),
            F) : F
        },
        params: {}
    };
    var s = 0
      , H = $.jqm.hash
      , A = []
      , F = !1
      , e = function(a) {
        void 0 === a.c.focusField && (a.c.focusField = 0),
        a.c.focusField >= 0 && f(a)
    }
      , f = function(a) {
        try {
            $(":input:visible", a.w)[parseInt(a.c.focusField, 10)].focus()
        } catch (a) {}
    }
      , L = function(a) {
        $(document)[a]("keypress", m)[a]("keydown", m)[a]("mousedown", m)
    }
      , m = function(a) {
        var b = H[A[A.length - 1]]
          , c = !$(a.target).parents(".jqmID" + b.s)[0];
        return c && $(".jqmID" + b.s).each(function() {
            var b = $(this)
              , d = b.offset();
            if (d.top <= a.pageY && a.pageY <= d.top + b.height() && d.left <= a.pageX && a.pageX <= d.left + b.width())
                return c = !1,
                !1
        }),
        !c
    }
      , hs = function(a, b, c) {
        return a.each(function() {
            var a = this._jqm;
            $(b).each(function() {
                this[c] || (this[c] = [],
                $(this).click(function() {
                    for (var a in {
                        jqmShow: 1,
                        jqmHide: 1
                    })
                        for (var b in this[a])
                            H[this[a][b]] && H[this[a][b]].w[a](this);
                    return F
                })),
                this[c].push(a)
            })
        })
    };
    $.fmatter = {},
    $.extend($.fmatter, {
        isBoolean: function(a) {
            return "boolean" == typeof a
        },
        isObject: function(a) {
            return a && ("object" == typeof a || $.isFunction(a)) || !1
        },
        isString: function(a) {
            return "string" == typeof a
        },
        isNumber: function(a) {
            return "number" == typeof a && isFinite(a)
        },
        isValue: function(a) {
            return this.isObject(a) || this.isString(a) || this.isNumber(a) || this.isBoolean(a)
        },
        isEmpty: function(a) {
            return !(!this.isString(a) && this.isValue(a)) && (!this.isValue(a) || "" === (a = $.trim(a).replace(/\&nbsp\;/gi, "").replace(/\&#160\;/gi, "")))
        }
    }),
    $.fn.fmatter = function(a, b, c, d, e) {
        var f = b;
        c = $.extend({}, $.jgrid.getRegional(this, "formatter"), c);
        try {
            f = $.fn.fmatter[a].call(this, b, c, d, e)
        } catch (a) {}
        return f
    }
    ,
    $.fmatter.util = {
        NumberFormat: function(a, b) {
            if ($.fmatter.isNumber(a) || (a *= 1),
            $.fmatter.isNumber(a)) {
                var c, d = a < 0, e = String(a), f = b.decimalSeparator || ".";
                if ($.fmatter.isNumber(b.decimalPlaces)) {
                    var g = b.decimalPlaces;
                    if (e = String(Number(Math.round(a + "e" + g) + "e-" + g)),
                    c = e.lastIndexOf("."),
                    g > 0)
                        for (c < 0 ? (e += f,
                        c = e.length - 1) : "." !== f && (e = e.replace(".", f)); e.length - 1 - c < g; )
                            e += "0"
                }
                if (b.thousandsSeparator) {
                    var h = b.thousandsSeparator;
                    c = e.lastIndexOf(f),
                    c = c > -1 ? c : e.length;
                    var i, j = e.substring(c), k = -1;
                    for (i = c; i > 0; i--)
                        k++,
                        k % 3 == 0 && i !== c && (!d || i > 1) && (j = h + j),
                        j = e.charAt(i - 1) + j;
                    e = j
                }
                return e = b.prefix ? b.prefix + e : e,
                e = b.suffix ? e + b.suffix : e
            }
            return a
        }
    },
    $.fn.fmatter.defaultFormat = function(a, b) {
        return $.fmatter.isValue(a) && "" !== a ? a : b.defaultValue || "&#160;"
    }
    ,
    $.fn.fmatter.email = function(a, b) {
        return $.fmatter.isEmpty(a) ? $.fn.fmatter.defaultFormat(a, b) : '<a href="mailto:' + a + '">' + a + "</a>"
    }
    ,
    $.fn.fmatter.checkbox = function(a, b) {
        var c, d = $.extend({}, b.checkbox);
        return void 0 !== b.colModel && void 0 !== b.colModel.formatoptions && (d = $.extend({}, d, b.colModel.formatoptions)),
        c = !0 === d.disabled ? 'disabled="disabled"' : "",
        ($.fmatter.isEmpty(a) || void 0 === a) && (a = $.fn.fmatter.defaultFormat(a, d)),
        a = String(a),
        a = (a + "").toLowerCase(),
        '<input type="checkbox" ' + (a.search(/(false|f|0|no|n|off|undefined)/i) < 0 ? " checked='checked' " : "") + ' value="' + a + '" offval="no" ' + c + "/>"
    }
    ,
    $.fn.fmatter.link = function(a, b) {
        var c = {
            target: b.target
        }
          , d = "";
        return void 0 !== b.colModel && void 0 !== b.colModel.formatoptions && (c = $.extend({}, c, b.colModel.formatoptions)),
        c.target && (d = "target=" + c.target),
        $.fmatter.isEmpty(a) ? $.fn.fmatter.defaultFormat(a, b) : "<a " + d + ' href="' + a + '">' + a + "</a>"
    }
    ,
    $.fn.fmatter.showlink = function(a, b) {
        var c, d = {
            baseLinkUrl: b.baseLinkUrl,
            showAction: b.showAction,
            addParam: b.addParam || "",
            target: b.target,
            idName: b.idName
        }, e = "";
        return void 0 !== b.colModel && void 0 !== b.colModel.formatoptions && (d = $.extend({}, d, b.colModel.formatoptions)),
        d.target && (e = "target=" + d.target),
        c = d.baseLinkUrl + d.showAction + "?" + d.idName + "=" + b.rowId + d.addParam,
        $.fmatter.isString(a) || $.fmatter.isNumber(a) ? "<a " + e + ' href="' + c + '">' + a + "</a>" : $.fn.fmatter.defaultFormat(a, b)
    }
    ,
    $.fn.fmatter.integer = function(a, b) {
        var c = $.extend({}, b.integer);
        return void 0 !== b.colModel && void 0 !== b.colModel.formatoptions && (c = $.extend({}, c, b.colModel.formatoptions)),
        $.fmatter.isEmpty(a) ? c.defaultValue : $.fmatter.util.NumberFormat(a, c)
    }
    ,
    $.fn.fmatter.number = function(a, b) {
        var c = $.extend({}, b.number);
        return void 0 !== b.colModel && void 0 !== b.colModel.formatoptions && (c = $.extend({}, c, b.colModel.formatoptions)),
        $.fmatter.isEmpty(a) ? c.defaultValue : $.fmatter.util.NumberFormat(a, c)
    }
    ,
    $.fn.fmatter.currency = function(a, b) {
        var c = $.extend({}, b.currency);
        return void 0 !== b.colModel && void 0 !== b.colModel.formatoptions && (c = $.extend({}, c, b.colModel.formatoptions)),
        $.fmatter.isEmpty(a) ? c.defaultValue : $.fmatter.util.NumberFormat(a, c)
    }
    ,
    $.fn.fmatter.date = function(a, b, c, d) {
        var e = $.extend({}, b.date);
        return void 0 !== b.colModel && void 0 !== b.colModel.formatoptions && (e = $.extend({}, e, b.colModel.formatoptions)),
        e.reformatAfterEdit || "edit" !== d ? $.fmatter.isEmpty(a) ? $.fn.fmatter.defaultFormat(a, b) : $.jgrid.parseDate.call(this, e.srcformat, a, e.newformat, e) : $.fn.fmatter.defaultFormat(a, b)
    }
    ,
    $.fn.fmatter.select = function(a, b) {
        a = String(a);
        var c, d, e = !1, f = [];
        if (void 0 !== b.colModel.formatoptions ? (e = b.colModel.formatoptions.value,
        c = void 0 === b.colModel.formatoptions.separator ? ":" : b.colModel.formatoptions.separator,
        d = void 0 === b.colModel.formatoptions.delimiter ? ";" : b.colModel.formatoptions.delimiter) : void 0 !== b.colModel.editoptions && (e = b.colModel.editoptions.value,
        c = void 0 === b.colModel.editoptions.separator ? ":" : b.colModel.editoptions.separator,
        d = void 0 === b.colModel.editoptions.delimiter ? ";" : b.colModel.editoptions.delimiter),
        e) {
            var g, h = !0 == (null != b.colModel.editoptions && !0 === b.colModel.editoptions.multiple), i = [];
            if (h && (i = a.split(","),
            i = $.map(i, function(a) {
                return $.trim(a)
            })),
            $.fmatter.isString(e)) {
                var j, k = e.split(d), l = 0;
                for (j = 0; j < k.length; j++)
                    if (g = k[j].split(c),
                    g.length > 2 && (g[1] = $.map(g, function(a, b) {
                        if (b > 0)
                            return a
                    }).join(c)),
                    h)
                        $.inArray(g[0], i) > -1 && (f[l] = g[1],
                        l++);
                    else if ($.trim(g[0]) === $.trim(a)) {
                        f[0] = g[1];
                        break
                    }
            } else
                $.fmatter.isObject(e) && (h ? f = $.map(i, function(a) {
                    return e[a]
                }) : f[0] = e[a] || "")
        }
        return a = f.join(", "),
        "" === a ? $.fn.fmatter.defaultFormat(a, b) : a
    }
    ,
    $.fn.fmatter.rowactions = function(a) {
        var b = $(this).closest("tr.jqgrow")
          , c = b.attr("id")
          , d = $(this).closest("table.ui-jqgrid-btable").attr("id").replace(/_frozen([^_]*)$/, "$1")
          , e = $("#" + d)
          , f = e[0]
          , g = f.p
          , h = g.colModel[$.jgrid.getCellIndex(this)]
          , i = h.frozen ? $("tr#" + c + " td:eq(" + $.jgrid.getCellIndex(this) + ") > div", e) : $(this).parent()
          , j = {
            extraparam: {}
        }
          , k = function(a, b) {
            $.isFunction(j.afterSave) && j.afterSave.call(f, a, b),
            i.find("div.ui-inline-edit,div.ui-inline-del").show(),
            i.find("div.ui-inline-save,div.ui-inline-cancel").hide()
        }
          , l = function(a) {
            $.isFunction(j.afterRestore) && j.afterRestore.call(f, a),
            i.find("div.ui-inline-edit,div.ui-inline-del").show(),
            i.find("div.ui-inline-save,div.ui-inline-cancel").hide()
        };
        if (void 0 !== h.formatoptions) {
            var m = $.extend(!0, {}, h.formatoptions);
            j = $.extend(j, m)
        }
        void 0 !== g.editOptions && (j.editOptions = g.editOptions),
        void 0 !== g.delOptions && (j.delOptions = g.delOptions),
        b.hasClass("jqgrid-new-row") && (j.extraparam[g.prmNames.oper] = g.prmNames.addoper);
        var n = {
            keys: j.keys,
            oneditfunc: j.onEdit,
            successfunc: j.onSuccess,
            url: j.url,
            extraparam: j.extraparam,
            aftersavefunc: k,
            errorfunc: j.onError,
            afterrestorefunc: l,
            restoreAfterError: j.restoreAfterError,
            mtype: j.mtype
        };
        switch (a) {
        case "edit":
            e.jqGrid("editRow", c, n),
            i.find("div.ui-inline-edit,div.ui-inline-del").hide(),
            i.find("div.ui-inline-save,div.ui-inline-cancel").show(),
            e.triggerHandler("jqGridAfterGridComplete");
            break;
        case "save":
            e.jqGrid("saveRow", c, n) && (i.find("div.ui-inline-edit,div.ui-inline-del").show(),
            i.find("div.ui-inline-save,div.ui-inline-cancel").hide(),
            e.triggerHandler("jqGridAfterGridComplete"));
            break;
        case "cancel":
            e.jqGrid("restoreRow", c, l),
            i.find("div.ui-inline-edit,div.ui-inline-del").show(),
            i.find("div.ui-inline-save,div.ui-inline-cancel").hide(),
            e.triggerHandler("jqGridAfterGridComplete");
            break;
        case "del":
            e.jqGrid("delGridRow", c, j.delOptions);
            break;
        case "formedit":
            e.jqGrid("setSelection", c),
            e.jqGrid("editGridRow", c, j.editOptions)
        }
    }
    ,
    $.fn.fmatter.actions = function(a, b) {
        var c, d = {
            keys: !1,
            editbutton: !0,
            delbutton: !0,
            editformbutton: !1
        }, e = b.rowId, f = "", g = $.jgrid.getRegional(this, "nav"), h = $.jgrid.styleUI[b.styleUI || "jQueryUI"].fmatter, i = $.jgrid.styleUI[b.styleUI || "jQueryUI"].common;
        if (void 0 !== b.colModel.formatoptions && (d = $.extend(d, b.colModel.formatoptions)),
        void 0 === e || $.fmatter.isEmpty(e))
            return "";
        var j = "onmouseover=jQuery(this).addClass('" + i.hover + "'); onmouseout=jQuery(this).removeClass('" + i.hover + "');  ";
        return d.editformbutton ? (c = "id='jEditButton_" + e + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'formedit'); " + j,
        f += "<div title='" + g.edittitle + "' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + c + "><span class='" + i.icon_base + " " + h.icon_edit + "'></span></div>") : d.editbutton && (c = "id='jEditButton_" + e + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'edit'); " + j,
        f += "<div title='" + g.edittitle + "' style='float:left;cursor:pointer;' class='ui-pg-div ui-inline-edit' " + c + "><span class='" + i.icon_base + " " + h.icon_edit + "'></span></div>"),
        d.delbutton && (c = "id='jDeleteButton_" + e + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'del'); " + j,
        f += "<div title='" + g.deltitle + "' style='float:left;' class='ui-pg-div ui-inline-del' " + c + "><span class='" + i.icon_base + " " + h.icon_del + "'></span></div>"),
        c = "id='jSaveButton_" + e + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'save'); " + j,
        f += "<div title='" + g.savetitle + "' style='float:left;display:none' class='ui-pg-div ui-inline-save' " + c + "><span class='" + i.icon_base + " " + h.icon_save + "'></span></div>",
        c = "id='jCancelButton_" + e + "' onclick=jQuery.fn.fmatter.rowactions.call(this,'cancel'); " + j,
        "<div style='margin-left:8px;'>" + (f += "<div title='" + g.canceltitle + "' style='float:left;display:none;' class='ui-pg-div ui-inline-cancel' " + c + "><span class='" + i.icon_base + " " + h.icon_cancel + "'></span></div>") + "</div>"
    }
    ,
    $.unformat = function(a, b, c, d) {
        var e, f, g = b.colModel.formatter, h = b.colModel.formatoptions || {}, i = /([\.\*\_\'\(\)\{\}\+\?\\])/g, j = b.colModel.unformat || $.fn.fmatter[g] && $.fn.fmatter[g].unformat;
        if (void 0 !== j && $.isFunction(j))
            e = j.call(this, $(a).text(), b, a);
        else if (void 0 !== g && $.fmatter.isString(g)) {
            var k, l = $.jgrid.getRegional(this, "formatter") || {};
            switch (g) {
            case "integer":
                h = $.extend({}, l.integer, h),
                f = h.thousandsSeparator.replace(i, "\\$1"),
                k = new RegExp(f,"g"),
                e = $(a).text().replace(k, "");
                break;
            case "number":
                h = $.extend({}, l.number, h),
                f = h.thousandsSeparator.replace(i, "\\$1"),
                k = new RegExp(f,"g"),
                e = $(a).text().replace(k, "").replace(h.decimalSeparator, ".");
                break;
            case "currency":
                h = $.extend({}, l.currency, h),
                f = h.thousandsSeparator.replace(i, "\\$1"),
                k = new RegExp(f,"g"),
                e = $(a).text(),
                h.prefix && h.prefix.length && (e = e.substr(h.prefix.length)),
                h.suffix && h.suffix.length && (e = e.substr(0, e.length - h.suffix.length)),
                e = e.replace(k, "").replace(h.decimalSeparator, ".");
                break;
            case "checkbox":
                var m = b.colModel.editoptions ? b.colModel.editoptions.value.split(":") : ["Yes", "No"];
                e = $("input", a).is(":checked") ? m[0] : m[1];
                break;
            case "select":
                e = $.unformat.select(a, b, c, d);
                break;
            case "actions":
                return "";
            default:
                e = $(a).text()
            }
        }
        return void 0 !== e ? e : !0 === d ? $(a).text() : $.jgrid.htmlDecode($(a).html())
    }
    ,
    $.unformat.select = function(a, b, c, d) {
        var e = []
          , f = $(a).text();
        if (!0 === d)
            return f;
        var g = $.extend({}, void 0 !== b.colModel.formatoptions ? b.colModel.formatoptions : b.colModel.editoptions)
          , h = void 0 === g.separator ? ":" : g.separator
          , i = void 0 === g.delimiter ? ";" : g.delimiter;
        if (g.value) {
            var j, k = g.value, l = !0 === g.multiple, m = [];
            if (l && (m = f.split(","),
            m = $.map(m, function(a) {
                return $.trim(a)
            })),
            $.fmatter.isString(k)) {
                var n, o = k.split(i), p = 0;
                for (n = 0; n < o.length; n++)
                    if (j = o[n].split(h),
                    j.length > 2 && (j[1] = $.map(j, function(a, b) {
                        if (b > 0)
                            return a
                    }).join(h)),
                    l)
                        $.inArray($.trim(j[1]), m) > -1 && (e[p] = j[0],
                        p++);
                    else if ($.trim(j[1]) === $.trim(f)) {
                        e[0] = j[0];
                        break
                    }
            } else
                ($.fmatter.isObject(k) || $.isArray(k)) && (l || (m[0] = f),
                e = $.map(m, function(a) {
                    var b;
                    if ($.each(k, function(c, d) {
                        if (d === a)
                            return b = c,
                            !1
                    }),
                    void 0 !== b)
                        return b
                }));
            return e.join(", ")
        }
        return f || ""
    }
    ,
    $.unformat.date = function(a, b) {
        var c = $.jgrid.getRegional(this, "formatter.date") || {};
        return void 0 !== b.formatoptions && (c = $.extend({}, c, b.formatoptions)),
        $.fmatter.isEmpty(a) ? $.fn.fmatter.defaultFormat(a, b) : $.jgrid.parseDate.call(this, c.newformat, a, c.srcformat, c)
    }
    ;
    var dragging, placeholders = $();
    $.fn.html5sortable = function(a) {
        var b = String(a);
        return a = $.extend({
            connectWith: !1
        }, a),
        this.each(function() {
            var c;
            if (/^enable|disable|destroy$/.test(b))
                return c = $(this).children($(this).data("items")).attr("draggable", "enable" === b),
                void ("destroy" === b && c.add(this).removeData("connectWith items").off("dragstart.h5s dragend.h5s selectstart.h5s dragover.h5s dragenter.h5s drop.h5s"));
            var d, e;
            c = $(this).children(a.items);
            var f = $("<" + (/^ul|ol$/i.test(this.tagName) ? "li" : /^tbody$/i.test(this.tagName) ? "tr" : "div") + ' class="sortable-placeholder ' + a.placeholderClass + '">').html("&nbsp;");
            c.find(a.handle).mousedown(function() {
                d = !0
            }).mouseup(function() {
                d = !1
            }),
            $(this).data("items", a.items),
            placeholders = placeholders.add(f),
            a.connectWith && $(a.connectWith).add(this).data("connectWith", a.connectWith),
            c.attr("draggable", "true").on("dragstart.h5s", function(b) {
                if (a.handle && !d)
                    return !1;
                d = !1;
                var c = b.originalEvent.dataTransfer;
                c.effectAllowed = "move",
                c.setData("Text", "dummy"),
                e = (dragging = $(this)).addClass("sortable-dragging").index()
            }).on("dragend.h5s", function() {
                dragging && (dragging.removeClass("sortable-dragging").show(),
                placeholders.detach(),
                e !== dragging.index() && dragging.parent().trigger("sortupdate", {
                    item: dragging,
                    startindex: e,
                    endindex: dragging.index()
                }),
                dragging = null)
            }).not("a[href], img").on("selectstart.h5s", function() {
                return this.dragDrop && this.dragDrop(),
                !1
            }).end().add([this, f]).on("dragover.h5s dragenter.h5s drop.h5s", function(b) {
                return !c.is(dragging) && a.connectWith !== $(dragging).parent().data("connectWith") || ("drop" === b.type ? (b.stopPropagation(),
                placeholders.filter(":visible").after(dragging),
                dragging.trigger("dragend.h5s"),
                !1) : (b.preventDefault(),
                b.originalEvent.dataTransfer.dropEffect = "move",
                c.is(this) ? (a.forcePlaceholderSize && f.height(dragging.outerHeight()),
                dragging.hide(),
                $(this)[f.index() < $(this).index() ? "after" : "before"](f),
                placeholders.not(f).detach()) : placeholders.is(this) || $(this).children(a.items).length || (placeholders.detach(),
                $(this).append(f)),
                !1))
            })
        })
    }
    ,
    $.extend($.jgrid, {
        stringify: function(a) {
            return JSON.stringify(a, function(a, b) {
                return "function" == typeof b ? b.toString() : b
            })
        },
        parseFunc: function(str) {
            return JSON.parse(str, function(key, value) {
                if ("string" == typeof value && -1 !== value.indexOf("function")) {
                    var sv = value.split(" ");
                    return sv[0] = $.trim(sv[0].toLowerCase()),
                    0 === sv[0].indexOf("function") && "}" === value.trim().slice(-1) ? eval("(" + value + ")") : value
                }
                return value
            })
        },
        encode: function(a) {
            return String(a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        },
        jsonToXML: function(a, b) {
            var c = $.extend({
                xmlDecl: '<?xml version="1.0" encoding="UTF-8" ?>\n',
                attr_prefix: "-",
                encode: !0
            }, b || {})
              , d = this
              , e = function(a, b) {
                return "#text" === a ? c.encode ? d.encode(b) : b : "function" == typeof b ? "<" + a + "><![CDATA[" + b + "]]></" + a + ">\n" : "" === b ? "<" + a + ">__EMPTY_STRING_</" + a + ">\n" : "<" + a + ">" + (c.encode ? d.encode(b) : b) + "</" + a + ">\n"
            }
              , f = function(a, b) {
                for (var c = [], d = 0; d < b.length; d++) {
                    var h = b[d];
                    void 0 === h || null == h ? c[c.length] = "<" + a + " />" : "object" == typeof h && h.constructor == Array ? c[c.length] = f(a, h) : c[c.length] = "object" == typeof h ? g(a, h) : e(a, h)
                }
                return c.length || (c[0] = "<" + a + ">__EMPTY_ARRAY_</" + a + ">\n"),
                c.join("")
            }
              , g = function(a, b) {
                var h = []
                  , i = [];
                for (var j in b)
                    if (b.hasOwnProperty(j)) {
                        var k = b[j];
                        j.charAt(0) !== c.attr_prefix ? null == k ? h[h.length] = "<" + j + " />" : "object" == typeof k && k.constructor === Array ? h[h.length] = f(j, k) : h[h.length] = "object" == typeof k ? g(j, k) : e(j, k) : i[i.length] = " " + j.substring(1) + '="' + (c.encode ? d.encode(k) : k) + '"'
                    }
                var l = i.join("")
                  , m = h.join("");
                return null == a || (m = h.length > 0 ? m.match(/\n/) ? "<" + a + l + ">\n" + m + "</" + a + ">\n" : "<" + a + l + ">" + m + "</" + a + ">\n" : "<" + a + l + " />\n"),
                m
            }
              , h = g(null, a);
            return c.xmlDecl + h
        },
        xmlToJSON: function(root, options) {
            var o = $.extend({
                force_array: [],
                attr_prefix: "-"
            }, options || {});
            if (root) {
                var __force_array = {};
                if (o.force_array)
                    for (var i = 0; i < o.force_array.length; i++)
                        __force_array[o.force_array[i]] = 1;
                "string" == typeof root && (root = $.parseXML(root)),
                root.documentElement && (root = root.documentElement);
                var addNode = function(hash, key, cnts, val) {
                    if ("string" == typeof val)
                        if (-1 !== val.indexOf("function"))
                            val = eval("(" + val + ")");
                        else
                            switch (val) {
                            case "__EMPTY_ARRAY_":
                                val = [];
                                break;
                            case "__EMPTY_STRING_":
                                val = "";
                                break;
                            case "false":
                                val = !1;
                                break;
                            case "true":
                                val = !0
                            }
                    __force_array[key] ? (1 === cnts && (hash[key] = []),
                    hash[key][hash[key].length] = val) : 1 === cnts ? hash[key] = val : 2 === cnts ? hash[key] = [hash[key], val] : hash[key][hash[key].length] = val
                }
                  , parseElement = function(a) {
                    if (7 !== a.nodeType) {
                        if (3 === a.nodeType || 4 === a.nodeType) {
                            if (null == a.nodeValue.match(/[^\x00-\x20]/))
                                return;
                            return a.nodeValue
                        }
                        var b, c, d, e, f = {};
                        if (a.attributes && a.attributes.length)
                            for (b = {},
                            c = 0; c < a.attributes.length; c++)
                                "string" == typeof (d = a.attributes[c].nodeName) && (e = a.attributes[c].nodeValue) && (d = o.attr_prefix + d,
                                void 0 === f[d] && (f[d] = 0),
                                f[d]++,
                                addNode(b, d, f[d], e));
                        if (a.childNodes && a.childNodes.length) {
                            var g = !0;
                            for (b && (g = !1),
                            c = 0; c < a.childNodes.length && g; c++) {
                                var h = a.childNodes[c].nodeType;
                                3 !== h && 4 !== h && (g = !1)
                            }
                            if (g)
                                for (b || (b = ""),
                                c = 0; c < a.childNodes.length; c++)
                                    b += a.childNodes[c].nodeValue;
                            else
                                for (b || (b = {}),
                                c = 0; c < a.childNodes.length; c++)
                                    "string" == typeof (d = a.childNodes[c].nodeName) && (e = parseElement(a.childNodes[c])) && (void 0 === f[d] && (f[d] = 0),
                                    f[d]++,
                                    addNode(b, d, f[d], e))
                        }
                        return b
                    }
                }
                  , json = parseElement(root);
                if (__force_array[root.nodeName] && (json = [json]),
                11 !== root.nodeType) {
                    var tmp = {};
                    tmp[root.nodeName] = json,
                    json = tmp
                }
                return json
            }
        },
        saveAs: function(a, b, c) {
            c = $.extend(!0, {
                type: "plain/text;charset=utf-8"
            }, c || {});
            var d, e, f = [];
            b = null == b || "" === b ? "jqGridFile.txt" : b,
            $.isArray(a) ? f = a : f[0] = a;
            try {
                d = new File(f,b,c)
            } catch (a) {
                d = new Blob(f,c)
            }
            if (window.navigator && window.navigator.msSaveOrOpenBlob)
                window.navigator.msSaveOrOpenBlob(d, b);
            else {
                e = URL.createObjectURL(d);
                var g = document.createElement("a");
                g.href = e,
                g.download = b,
                document.body.appendChild(g),
                g.click(),
                setTimeout(function() {
                    document.body.removeChild(g),
                    window.URL.revokeObjectURL(e)
                }, 0)
            }
        }
    }),
    $.jgrid = $.jgrid || {},
    $.extend($.jgrid, {
        formatCell: function(a, b, c, d, e, f) {
            var g;
            if (void 0 !== d.formatter) {
                var h = {
                    rowId: "",
                    colModel: d,
                    gid: e.p.id,
                    pos: b,
                    styleUI: "",
                    isExported: !0,
                    exporttype: f
                };
                g = $.isFunction(d.formatter) ? d.formatter.call(e, a, h, c) : $.fmatter ? $.fn.fmatter.call(e, d.formatter, a, h, c) : a
            } else
                g = a;
            return g
        },
        formatCellCsv: function(a, b) {
            a = null == a ? "" : String(a);
            try {
                a = a.replace(b._regexsep, b.separatorReplace).replace(/\r\n/g, b.replaceNewLine).replace(/\n/g, b.replaceNewLine)
            } catch (b) {
                a = ""
            }
            return b.escquote && (a = a.replace(b._regexquot, b.escquote + b.quote)),
            -1 !== a.indexOf(b.separator) && -1 !== a.indexOf(b.qoute) || (a = b.quote + a + b.quote),
            a
        },
        excelCellPos: function(a) {
            for (var b = "A".charCodeAt(0), c = "Z".charCodeAt(0), d = c - b + 1, e = ""; a >= 0; )
                e = String.fromCharCode(a % d + b) + e,
                a = Math.floor(a / d) - 1;
            return e
        },
        makeNode: function(a, b, c) {
            var d = a.createElement(b);
            return c && (c.attr && $(d).attr(c.attr),
            c.children && $.each(c.children, function(a, b) {
                d.appendChild(b)
            }),
            c.text && d.appendChild(a.createTextNode(c.text))),
            d
        },
        xmlToZip: function(a, b) {
            var c, d, e, f, g, h, i = this, j = new XMLSerializer, k = -1 === j.serializeToString($.parseXML($.jgrid.excelStrings["xl/worksheets/sheet1.xml"])).indexOf("xmlns:r"), l = [];
            $.each(b, function(b, m) {
                if ($.isPlainObject(m))
                    c = a.folder(b),
                    i.xmlToZip(c, m);
                else {
                    if (k) {
                        for (d = m.childNodes[0],
                        e = d.attributes.length - 1; e >= 0; e--) {
                            var n = d.attributes[e].nodeName
                              , o = d.attributes[e].nodeValue;
                            -1 !== n.indexOf(":") && (l.push({
                                name: n,
                                value: o
                            }),
                            d.removeAttribute(n))
                        }
                        for (e = 0,
                        f = l.length; e < f; e++)
                            g = m.createAttribute(l[e].name.replace(":", "_dt_b_namespace_token_")),
                            g.value = l[e].value,
                            d.setAttributeNode(g)
                    }
                    h = j.serializeToString(m),
                    k && (-1 === h.indexOf("<?xml") && (h = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + h),
                    h = h.replace(/_dt_b_namespace_token_/g, ":")),
                    h = h.replace(/<row xmlns="" /g, "<row ").replace(/<cols xmlns="">/g, "<cols>").replace(/<mergeCells xmlns="" /g, "<mergeCells "),
                    a.file(b, h)
                }
            })
        },
        excelStrings: {
            "_rels/.rels": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',
            "xl/_rels/workbook.xml.rels": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>',
            "[Content_Types].xml": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="xml" ContentType="application/xml" /><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" /><Default Extension="jpeg" ContentType="image/jpeg" /><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" /><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" /><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" /></Types>',
            "xl/workbook.xml": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><fileVersion appName="xl" lastEdited="5" lowestEdited="5" rupBuild="24816"/><workbookPr showInkAnnotation="0" autoCompressPictures="0"/><bookViews><workbookView xWindow="0" yWindow="0" windowWidth="25600" windowHeight="19020" tabRatio="500"/></bookViews><sheets><sheet name="Sheet1" sheetId="1" r:id="rId1"/></sheets></workbook>',
            "xl/worksheets/sheet1.xml": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"><sheetData/></worksheet>',
            "xl/styles.xml": '<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"><numFmts count="7"><numFmt numFmtId="164" formatCode="#,##0.00_- [$$-45C]"/><numFmt numFmtId="165" formatCode="&quot;£&quot;#,##0.00"/><numFmt numFmtId="166" formatCode="[$€-2] #,##0.00"/><numFmt numFmtId="167" formatCode="0.0%"/><numFmt numFmtId="168" formatCode="#,##0;(#,##0)"/><numFmt numFmtId="169" formatCode="#,##0.00;(#,##0.00)"/><numFmt numFmtId="170" formatCode="yyyy/mm/dd;@"/></numFmts><fonts count="5" x14ac:knownFonts="1"><font><sz val="11" /><name val="Calibri" /></font><font><sz val="11" /><name val="Calibri" /><color rgb="FFFFFFFF" /></font><font><sz val="11" /><name val="Calibri" /><b /></font><font><sz val="11" /><name val="Calibri" /><i /></font><font><sz val="11" /><name val="Calibri" /><u /></font></fonts><fills count="6"><fill><patternFill patternType="none" /></fill><fill/><fill><patternFill patternType="solid"><fgColor rgb="FFD9D9D9" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFD99795" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="ffc6efce" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="ffc6cfef" /><bgColor indexed="64" /></patternFill></fill></fills><borders count="2"><border><left /><right /><top /><bottom /><diagonal /></border><border diagonalUp="false" diagonalDown="false"><left style="thin"><color auto="1" /></left><right style="thin"><color auto="1" /></right><top style="thin"><color auto="1" /></top><bottom style="thin"><color auto="1" /></bottom><diagonal /></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" /></cellStyleXfs><cellXfs count="67"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="left"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="center"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="right"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="fill"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment textRotation="90"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment wrapText="1"/></xf><xf numFmtId="9"   fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="164" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="165" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="166" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="167" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="168" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="169" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="3" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="4" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="1" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="2" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="170" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0" /></cellStyles><dxfs count="0" /><tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4" /></styleSheet>'
        },
        excelParsers: [{
            match: /^\-?\d+\.\d%$/,
            style: 60,
            fmt: function(a) {
                return a / 100
            }
        }, {
            match: /^\-?\d+\.?\d*%$/,
            style: 56,
            fmt: function(a) {
                return a / 100
            }
        }, {
            match: /^\-?\$[\d,]+.?\d*$/,
            style: 57
        }, {
            match: /^\-?£[\d,]+.?\d*$/,
            style: 58
        }, {
            match: /^\-?€[\d,]+.?\d*$/,
            style: 59
        }, {
            match: /^\-?\d+$/,
            style: 65
        }, {
            match: /^\-?\d+\.\d{2}$/,
            style: 66
        }, {
            match: /^\([\d,]+\)$/,
            style: 61,
            fmt: function(a) {
                return -1 * a.replace(/[\(\)]/g, "")
            }
        }, {
            match: /^\([\d,]+\.\d{2}\)$/,
            style: 62,
            fmt: function(a) {
                return -1 * a.replace(/[\(\)]/g, "")
            }
        }, {
            match: /^\-?[\d,]+$/,
            style: 63
        }, {
            match: /^\-?[\d,]+\.\d{2}$/,
            style: 64
        }, {
            match: /^\d{4}\-\d{2}\-\d{2}$/,
            style: 67
        }]
    }),
    $.jgrid.extend({
        exportToCsv: function(a) {
            a = $.extend(!0, {
                separator: ",",
                separatorReplace: " ",
                quote: '"',
                escquote: '"',
                newLine: "\r\n",
                replaceNewLine: " ",
                includeCaption: !0,
                includeLabels: !0,
                includeGroupHeader: !0,
                includeFooter: !0,
                fileName: "jqGridExport.csv",
                mimetype: "text/csv;charset=utf-8",
                returnAsString: !1
            }, a || {});
            var b = "";
            if (this.each(function() {
                function c(a, b) {
                    function c(a, b, c) {
                        var d, e = !1;
                        if (0 === b)
                            e = c[a];
                        else {
                            var f = c[a].idx;
                            if (0 === f)
                                e = c[a];
                            else
                                for (d = a; d >= 0; d--)
                                    if (c[d].idx === f - b) {
                                        e = c[d];
                                        break
                                    }
                        }
                        return e
                    }
                    function d(a, d, e, f) {
                        var g, h, j = c(a, d, e), k = j.cnt, n = new Array(b.collen), o = 0;
                        for (h = f; h < m; h++)
                            if (l[h]._excol) {
                                var p = "{0}";
                                $.each(j.summary, function() {
                                    if (this.nm === l[h].name) {
                                        l[h].summaryTpl && (p = l[h].summaryTpl),
                                        "string" == typeof this.st && "avg" === this.st.toLowerCase() && (this.sd && this.vd ? this.v = this.v / this.vd : this.v && k > 0 && (this.v = this.v / k));
                                        try {
                                            this.groupCount = j.cnt,
                                            this.groupIndex = j.dataIndex,
                                            this.groupValue = j.value,
                                            g = i.formatter("", this.v, h, this)
                                        } catch (a) {
                                            g = this.v
                                        }
                                        return n[o] = $.jgrid.formatCellCsv($.jgrid.stripHtml($.jgrid.template(p, g)), b),
                                        !1
                                    }
                                }),
                                o++
                            }
                        return n
                    }
                    var e = ""
                      , f = i.p.groupingView
                      , g = []
                      , h = f.groupField.length
                      , l = i.p.colModel
                      , m = l.length
                      , n = 0;
                    $.each(l, function(a, b) {
                        var c;
                        for (c = 0; c < h; c++)
                            if (f.groupField[c] === b.name) {
                                g[c] = a;
                                break
                            }
                    });
                    var o, p, q = $.makeArray(f.groupSummary);
                    if (q.reverse(),
                    "local" === i.p.datatype && !i.p.loadonce) {
                        $(i).jqGrid("groupingSetup");
                        for (var r = $.jgrid.getMethod("groupingPrepare"), s = 0; s < k; s++)
                            r.call($(i), j[s], s)
                    }
                    return $.each(f.groups, function(c, j) {
                        n++;
                        try {
                            o = $.isArray(f.formatDisplayField) && $.isFunction(f.formatDisplayField[j.idx]) ? f.formatDisplayField[j.idx].call(i, j.displayValue, j.value, i.p.colModel[g[j.idx]], j.idx, f) : i.formatter("", j.displayValue, g[j.idx], j.value)
                        } catch (a) {
                            o = j.displayValue
                        }
                        var k = "";
                        "string" != typeof (k = $.isFunction(f.groupText[j.idx]) ? f.groupText[j.idx].call(i, o, j.cnt, j.summary) : $.jgrid.template(f.groupText[j.idx], o, j.cnt, j.summary)) && "number" != typeof k && (k = o);
                        var m;
                        if (m = "header" === f.groupSummaryPos[j.idx] ? d(c, 0, f.groups, 0) : new Array(b.collen),
                        m[0] = $.jgrid.formatCellCsv($.jgrid.stripHtml(k), b),
                        e += m.join(b.separator) + b.newLine,
                        h - 1 === j.idx) {
                            var r, s, t, u = f.groups[c + 1], v = 0, w = j.startRow, x = void 0 !== u ? u.startRow : f.groups[c].startRow + f.groups[c].cnt;
                            for (r = w; r < x && a[r - v]; r++) {
                                for (t = a[r - v],
                                p = 0,
                                s = 0; s < l.length; s++)
                                    l[s]._expcol && (m[p] = $.jgrid.formatCellCsv($.jgrid.formatCell(t[l[s].name], s, t, l[s], i, "csv"), b),
                                    p++);
                                e += m.join(b.separator) + b.newLine
                            }
                            if ("header" !== f.groupSummaryPos[j.idx]) {
                                var y;
                                if (void 0 !== u) {
                                    for (y = 0; y < f.groupField.length && u.dataIndex !== f.groupField[y]; y++)
                                        ;
                                    n = f.groupField.length - y
                                }
                                for (s = 0; s < n; s++)
                                    q[s] && (m = d(c, s, f.groups, 0),
                                    e += m.join(b.separator) + b.newLine);
                                n = y
                            }
                        }
                    }),
                    e
                }
                a._regexsep = new RegExp(a.separator,"g"),
                a._regexquot = new RegExp(a.quote,"g");
                var d, e, f, g, h, i = this, j = this.addLocalData(!0), k = j.length, l = i.p.colModel, m = l.length, n = i.p.colNames, o = 0, p = "", q = "", r = "", s = "", t = "", u = [], v = [];
                if ($.each(l, function(b, c) {
                    c._expcol = !0,
                    void 0 === c.exportcol ? c.hidden && (c._expcol = !1) : c._expcol = c.exportcol,
                    "cb" !== c.name && "rn" !== c.name && "subgrid" !== c.name || (c._expcol = !1),
                    c._expcol && (u.push($.jgrid.formatCellCsv(n[b], a)),
                    v.push(c.name))
                }),
                a.includeLabels && (t = u.join(a.separator) + a.newLine),
                a.collen = u.length,
                i.p.grouping) {
                    var w = !!i.p.groupingView._locgr;
                    i.p.groupingView._locgr = !1,
                    p += c(j, a),
                    i.p.groupingView._locgr = w
                } else
                    for (; o < k; ) {
                        for (e = j[o],
                        f = [],
                        g = 0,
                        d = 0; d < m; d++)
                            l[d]._expcol && (f[g] = $.jgrid.formatCellCsv($.jgrid.formatCell(e[l[d].name], d, e, l[d], i, "csv"), a),
                            g++);
                        p += f.join(a.separator) + a.newLine,
                        o++
                    }
                if (j = null,
                f = new Array(a.collen),
                a.includeCaption && i.p.caption) {
                    for (o = a.collen; --o; )
                        f[o] = "";
                    f[0] = $.jgrid.formatCellCsv(i.p.caption, a),
                    q += f.join(a.separator) + a.newLine
                }
                if (a.includeGroupHeader && i.p.groupHeader && i.p.groupHeader.length) {
                    var x = i.p.groupHeader;
                    for (d = 0; d < x.length; d++) {
                        var y = x[d].groupHeaders;
                        for (o = 0,
                        f = [],
                        h = 0; h < v.length; h++) {
                            for (f[o] = "",
                            g = 0; g < y.length; g++)
                                y[g].startColumnName === v[h] && (f[o] = $.jgrid.formatCellCsv(y[g].titleText, a));
                            o++
                        }
                        r += f.join(a.separator) + a.newLine
                    }
                }
                if (a.includeFooter && i.p.footerrow) {
                    if ($(".ui-jqgrid-ftable", this.sDiv).length) {
                        var z = $(i).jqGrid("footerData", "get");
                        for (d = 0,
                        f = []; d < a.collen; ) {
                            var A = v[d];
                            z.hasOwnProperty(A) && f.push($.jgrid.formatCellCsv($.jgrid.stripHtml(z[A]), a)),
                            d++
                        }
                        s += f.join(a.separator) + a.newLine
                    }
                }
                b = q + r + t + p + s
            }),
            a.returnAsString)
                return b;
            $.jgrid.saveAs(b, a.fileName, {
                type: a.mimetype
            })
        },
        exportToExcel: function(a) {
            a = $.extend(!0, {
                includeLabels: !0,
                includeGroupHeader: !0,
                includeFooter: !0,
                fileName: "jqGridExport.xlsx",
                mimetype: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                maxlength: 40,
                onBeforeExport: null,
                replaceStr: null
            }, a || {}),
            this.each(function() {
                function b(a) {
                    return a.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, "")
                }
                function c(a) {
                    function b(a, b, c) {
                        var d, e = !1;
                        if (0 === b)
                            e = c[a];
                        else {
                            var f = c[a].idx;
                            if (0 === f)
                                e = c[a];
                            else
                                for (d = a; d >= 0; d--)
                                    if (c[d].idx === f - b) {
                                        e = c[d];
                                        break
                                    }
                        }
                        return e
                    }
                    function c(a, c, e, g) {
                        var h, j, k = b(a, c, e), m = k.cnt, o = d(n.header);
                        for (j = g; j < i; j++)
                            if (l[j]._expcol) {
                                var p = "{0}";
                                $.each(k.summary, function() {
                                    if (this.nm === l[j].name) {
                                        l[j].summaryTpl && (p = l[j].summaryTpl),
                                        "string" == typeof this.st && "avg" === this.st.toLowerCase() && (this.sd && this.vd ? this.v = this.v / this.vd : this.v && m > 0 && (this.v = this.v / m));
                                        try {
                                            this.groupCount = k.cnt,
                                            this.groupIndex = k.dataIndex,
                                            this.groupValue = k.value,
                                            h = f.formatter("", this.v, j, this)
                                        } catch (a) {
                                            h = this.v
                                        }
                                        return o[this.nm] = $.jgrid.stripHtml($.jgrid.template(p, h)),
                                        !1
                                    }
                                })
                            }
                        return o
                    }
                    function d(a) {
                        for (var b = {}, c = 0; c < a.length; c++)
                            b[a[c]] = "";
                        return b
                    }
                    var e = f.p.groupingView
                      , g = []
                      , h = e.groupField.length
                      , i = l.length
                      , j = 0;
                    $.each(l, function(a, b) {
                        var c;
                        for (c = 0; c < h; c++)
                            if (e.groupField[c] === b.name) {
                                g[c] = a;
                                break
                            }
                    });
                    var k, m = $.makeArray(e.groupSummary);
                    if (m.reverse(),
                    "local" === f.p.datatype && !f.p.loadonce) {
                        $(f).jqGrid("groupingSetup");
                        for (var o = $.jgrid.getMethod("groupingPrepare"), p = 0; p < n.body.length; p++)
                            o.call($(f), n.body[p], p)
                    }
                    $.each(e.groups, function(b, i) {
                        j++;
                        try {
                            k = $.isArray(e.formatDisplayField) && $.isFunction(e.formatDisplayField[i.idx]) ? e.formatDisplayField[i.idx].call(f, i.displayValue, i.value, f.p.colModel[g[i.idx]], i.idx, e) : f.formatter("", i.displayValue, g[i.idx], i.value)
                        } catch (a) {
                            k = i.displayValue
                        }
                        var l = "";
                        "string" != typeof (l = $.isFunction(e.groupText[i.idx]) ? e.groupText[i.idx].call(f, k, i.cnt, i.summary) : $.jgrid.template(e.groupText[i.idx], k, i.cnt, i.summary)) && "number" != typeof l && (l = k);
                        var o;
                        if (o = "header" === e.groupSummaryPos[i.idx] ? c(b, 0, e.groups, 0) : d(n.header),
                        o[Object.keys(o)[0]] = $.jgrid.stripHtml(new Array(5 * i.idx).join(" ") + l),
                        r(o, !0),
                        h - 1 === i.idx) {
                            var p, q, s = e.groups[b + 1], t = 0, u = i.startRow, v = void 0 !== s ? s.startRow : e.groups[b].startRow + e.groups[b].cnt;
                            for (p = u; p < v && a[p - t]; p++) {
                                var w = a[p - t];
                                r(w, !1)
                            }
                            if ("header" !== e.groupSummaryPos[i.idx]) {
                                var x;
                                if (void 0 !== s) {
                                    for (x = 0; x < e.groupField.length && s.dataIndex !== e.groupField[x]; x++)
                                        ;
                                    j = e.groupField.length - x
                                }
                                for (q = 0; q < j; q++)
                                    m[q] && (o = c(b, q, e.groups, 0),
                                    r(o, !0));
                                j = x
                            }
                        }
                    })
                }
                var d, e, f = this, g = $.jgrid.excelStrings, h = 0, i = $.parseXML(g["xl/worksheets/sheet1.xml"]), j = i.getElementsByTagName("sheetData")[0], k = {
                    _rels: {
                        ".rels": $.parseXML(g["_rels/.rels"])
                    },
                    xl: {
                        _rels: {
                            "workbook.xml.rels": $.parseXML(g["xl/_rels/workbook.xml.rels"])
                        },
                        "workbook.xml": $.parseXML(g["xl/workbook.xml"]),
                        "styles.xml": $.parseXML(g["xl/styles.xml"]),
                        worksheets: {
                            "sheet1.xml": i
                        }
                    },
                    "[Content_Types].xml": $.parseXML(g["[Content_Types].xml"])
                }, l = f.p.colModel, m = 0, n = {
                    body: f.addLocalData(!0),
                    header: [],
                    footer: [],
                    width: [],
                    map: []
                };
                for (d = 0,
                e = l.length; d < e; d++)
                    l[d]._expcol = !0,
                    void 0 === l[d].exportcol ? l[d].hidden && (l[d]._expcol = !1) : l[d]._expcol = l[d].exportcol,
                    "cb" !== l[d].name && "rn" !== l[d].name && "subgrid" !== l[d].name && l[d]._expcol && (n.header[m] = l[d].name,
                    n.width[m] = 5,
                    n.map[m] = d,
                    m++);
                var o, p, q = $.isFunction(a.replaceStr) ? a.replaceStr : b, r = function(b, c) {
                    o = h + 1,
                    p = $.jgrid.makeNode(i, "row", {
                        attr: {
                            r: o
                        }
                    });
                    for (var d = 15, e = 0; e < n.header.length; e++) {
                        var g, k, m = $.jgrid.excelCellPos(e) + "" + o, r = $.isArray(b) && c ? f.p.colNames[n.map[e]] : b[n.header[e]];
                        null == r && (r = ""),
                        c || (r = $.jgrid.formatCell(r, n.map[e], b, l[n.map[e]], f, "excel")),
                        n.width[e] = Math.max(n.width[e], Math.min(parseInt(r.toString().length, 10), a.maxlength)),
                        r.match && (k = r.match(/^-?([1-9]\d+)(\.(\d+))?$/)),
                        g = null;
                        for (var s = 0, t = $.jgrid.excelParsers.length; s < t; s++) {
                            var u = $.jgrid.excelParsers[s];
                            if (r.match && !r.match(/^0\d+/) && r.match(u.match)) {
                                r = r.replace(/[^\d\.\-]/g, ""),
                                u.fmt && (r = u.fmt(r)),
                                g = 67 === u.style ? $.jgrid.makeNode(i, "c", {
                                    attr: {
                                        t: "d",
                                        r: m,
                                        s: u.style
                                    },
                                    children: [$.jgrid.makeNode(i, "v", {
                                        text: r
                                    })]
                                }) : $.jgrid.makeNode(i, "c", {
                                    attr: {
                                        r: m,
                                        s: u.style
                                    },
                                    children: [$.jgrid.makeNode(i, "v", {
                                        text: r
                                    })]
                                }),
                                p.appendChild(g);
                                break
                            }
                        }
                        if (!g) {
                            if ("number" == typeof r && r.toString().length <= d || k && k[1].length + (k[2] ? k[3].length : 0) <= d)
                                g = $.jgrid.makeNode(i, "c", {
                                    attr: {
                                        t: "n",
                                        r: m
                                    },
                                    children: [$.jgrid.makeNode(i, "v", {
                                        text: r
                                    })]
                                });
                            else {
                                var v = r.replace ? q(r) : r;
                                g = $.jgrid.makeNode(i, "c", {
                                    attr: {
                                        t: "inlineStr",
                                        r: m
                                    },
                                    children: {
                                        row: $.jgrid.makeNode(i, "is", {
                                            children: {
                                                row: $.jgrid.makeNode(i, "t", {
                                                    text: v
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                            p.appendChild(g)
                        }
                    }
                    j.appendChild(p),
                    h++
                };
                if ($("sheets sheet", k.xl["workbook.xml"]).attr("name", a.sheetName),
                a.includeGroupHeader && f.p.groupHeader && f.p.groupHeader.length) {
                    var s, t, u = f.p.groupHeader, v = [], w = 0;
                    for (t = 0; t < u.length; t++) {
                        var x = u[t].groupHeaders
                          , y = {};
                        for (w++,
                        d = 0,
                        d = 0; d < n.header.length; d++) {
                            s = n.header[d],
                            y[s] = "";
                            for (var z = 0; z < x.length; z++)
                                if (x[z].startColumnName === s) {
                                    y[s] = x[z].titleText;
                                    var A = $.jgrid.excelCellPos(d) + w
                                      , B = $.jgrid.excelCellPos(d + x[z].numberOfColumns - 1) + w;
                                    v.push({
                                        ref: A + ":" + B
                                    })
                                }
                        }
                        r(y, !0)
                    }
                    $("row c", i).attr("s", "2");
                    var C = $.jgrid.makeNode(i, "mergeCells", {
                        attr: {
                            count: v.length
                        }
                    });
                    for ($("worksheet", i).append(C),
                    m = 0; m < v.length; m++)
                        C.appendChild($.jgrid.makeNode(i, "mergeCell", {
                            attr: v[m]
                        }))
                }
                if (a.includeLabels && (r(n.header, !0),
                $("row:last c", i).attr("s", "2")),
                f.p.grouping) {
                    var D = !!f.p.groupingView._locgr;
                    f.p.groupingView._locgr = !1,
                    c(n.body),
                    f.p.groupingView._locgr = D
                } else
                    for (var E = 0, F = n.body.length; E < F; E++)
                        r(n.body[E], !1);
                if (a.includeFooter || f.p.footerrow) {
                    n.footer = $(f).jqGrid("footerData", "get");
                    for (m in n.footer)
                        n.footer.hasOwnProperty(m) && (n.footer[m] = $.jgrid.stripHtml(n.footer[m]));
                    r(n.footer, !0),
                    $("row:last c", i).attr("s", "2")
                }
                var G = $.jgrid.makeNode(i, "cols");
                for ($("worksheet", i).prepend(G),
                m = 0,
                e = n.width.length; m < e; m++)
                    G.appendChild($.jgrid.makeNode(i, "col", {
                        attr: {
                            min: m + 1,
                            max: m + 1,
                            width: n.width[m],
                            customWidth: 1
                        }
                    }));
                $.isFunction(a.onBeforeExport) && a.onBeforeExport(k, h),
                n = null;
                try {
                    var H = new JSZip
                      , I = {
                        type: "blob",
                        mimeType: a.mimetype
                    };
                    $.jgrid.xmlToZip(H, k),
                    H.generateAsync ? H.generateAsync(I).then(function(b) {
                        $.jgrid.saveAs(b, a.fileName, {
                            type: a.mimetype
                        })
                    }) : $.jgrid.saveAs(H.generate(I), a.fileName, {
                        type: a.mimetype
                    })
                } catch (a) {
                    throw a
                }
            })
        },
        exportToPdf: function(a) {
            return a = $.extend(!0, {
                title: null,
                orientation: "portrait",
                pageSize: "A4",
                description: null,
                onBeforeExport: null,
                download: "download",
                includeLabels: !0,
                includeGroupHeader: !0,
                includeFooter: !0,
                fileName: "jqGridExport.pdf",
                mimetype: "application/pdf"
            }, a || {}),
            this.each(function() {
                function b(a) {
                    function b(a, b) {
                        for (var c = 0, d = [], e = 0; e < l.length; e++)
                            j = {
                                text: null == a[l[e]] ? "" : b ? $.jgrid.formatCell(a[l[e]] + "", n[c], k[m], p[n[c]], g, "pdf") : a[l[e]],
                                alignment: q[e],
                                style: "tableBody"
                            },
                            d.push(j),
                            c++;
                        return d
                    }
                    function c(a, b, c) {
                        var d, e = !1;
                        if (0 === b)
                            e = c[a];
                        else {
                            var f = c[a].idx;
                            if (0 === f)
                                e = c[a];
                            else
                                for (d = a; d >= 0; d--)
                                    if (c[d].idx === f - b) {
                                        e = c[d];
                                        break
                                    }
                        }
                        return e
                    }
                    function d(a, b, d, f) {
                        var h, i, j = c(a, b, d), k = j.cnt, m = e(l);
                        for (i = f; i < r; i++)
                            if (p[i]._expcol) {
                                var n = "{0}";
                                $.each(j.summary, function() {
                                    if (this.nm === p[i].name) {
                                        p[i].summaryTpl && (n = p[i].summaryTpl),
                                        "string" == typeof this.st && "avg" === this.st.toLowerCase() && (this.sd && this.vd ? this.v = this.v / this.vd : this.v && k > 0 && (this.v = this.v / k));
                                        try {
                                            this.groupCount = j.cnt,
                                            this.groupIndex = j.dataIndex,
                                            this.groupValue = j.value,
                                            h = g.formatter("", this.v, i, this)
                                        } catch (a) {
                                            h = this.v
                                        }
                                        return m[this.nm] = $.jgrid.stripHtml($.jgrid.template(n, h)),
                                        !1
                                    }
                                })
                            }
                        return m
                    }
                    function e(a) {
                        for (var b = {}, c = 0; c < a.length; c++)
                            b[a[c]] = "";
                        return b
                    }
                    var f = g.p.groupingView
                      , i = []
                      , o = f.groupField.length
                      , p = g.p.colModel
                      , r = p.length
                      , s = 0;
                    $.each(p, function(a, b) {
                        var c;
                        for (c = 0; c < o; c++)
                            if (f.groupField[c] === b.name) {
                                i[c] = a;
                                break
                            }
                    });
                    var t, u = $.makeArray(f.groupSummary);
                    if (u.reverse(),
                    "local" === g.p.datatype && !g.p.loadonce) {
                        $(g).jqGrid("groupingSetup");
                        for (var v = $.jgrid.getMethod("groupingPrepare"), w = 0; w < k.length; w++)
                            v.call($(g), k[w], w)
                    }
                    $.each(f.groups, function(c, j) {
                        s++;
                        try {
                            t = $.isArray(f.formatDisplayField) && $.isFunction(f.formatDisplayField[j.idx]) ? f.formatDisplayField[j.idx].call(g, j.displayValue, j.value, g.p.colModel[i[j.idx]], j.idx, f) : g.formatter("", j.displayValue, i[j.idx], j.value)
                        } catch (a) {
                            t = j.displayValue
                        }
                        var k = "";
                        "string" != typeof (k = $.isFunction(f.groupText[j.idx]) ? f.groupText[j.idx].call(g, t, j.cnt, j.summary) : $.jgrid.template(f.groupText[j.idx], t, j.cnt, j.summary)) && "number" != typeof k && (k = t);
                        var m;
                        if (m = "header" === f.groupSummaryPos[j.idx] ? d(c, 0, f.groups, 0) : e(l),
                        m[Object.keys(m)[0]] = $.jgrid.stripHtml(new Array(5 * j.idx).join(" ") + k),
                        h.push(b(m, !1)),
                        o - 1 === j.idx) {
                            var n, p, q = f.groups[c + 1], r = 0, v = j.startRow, w = void 0 !== q ? q.startRow : f.groups[c].startRow + f.groups[c].cnt;
                            for (n = v; n < w && a[n - r]; n++) {
                                var x = a[n - r];
                                h.push(b(x, !0))
                            }
                            if ("header" !== f.groupSummaryPos[j.idx]) {
                                var y;
                                if (void 0 !== q) {
                                    for (y = 0; y < f.groupField.length && q.dataIndex !== f.groupField[y]; y++)
                                        ;
                                    s = f.groupField.length - y
                                }
                                for (p = 0; p < s; p++)
                                    u[p] && (m = d(c, p, f.groups, 0),
                                    h.push(b(m, !1)));
                                s = y
                            }
                        }
                    })
                }
                var c, d, e, f, g = this, h = [], i = g.p.colModel, j = {}, k = g.addLocalData(!0), l = [], m = 0, n = [], o = [], p = [], q = {};
                for (c = 0,
                d = i.length; c < d; c++)
                    i[c]._expcol = !0,
                    void 0 === i[c].exportcol ? i[c].hidden && (i[c]._expcol = !1) : i[c]._expcol = i[c].exportcol,
                    "cb" !== i[c].name && "rn" !== i[c].name && "subgrid" !== i[c].name && i[c]._expcol && (j = {
                        text: g.p.colNames[c],
                        style: "tableHeader"
                    },
                    o.push(j),
                    l[m] = i[c].name,
                    n[m] = c,
                    p.push(i[c].width),
                    q[i[c].name] = i[c].align || "left",
                    m++);
                var r;
                if (a.includeGroupHeader && g.p.groupHeader && g.p.groupHeader.length)
                    for (r = g.p.groupHeader,
                    m = 0; m < r.length; m++) {
                        var s = []
                          , t = r[m].groupHeaders;
                        for (e = 0; e < l.length; e++) {
                            for (j = {
                                text: "",
                                style: "tableHeader"
                            },
                            f = 0; f < t.length; f++)
                                t[f].startColumnName === l[e] && (j = {
                                    text: t[f].titleText,
                                    colSpan: t[f].numberOfColumns,
                                    style: "tableHeader"
                                });
                            s.push(j),
                            c++
                        }
                        h.push(s)
                    }
                if (a.includeLabels && h.push(o),
                g.p.grouping) {
                    var u = !!g.p.groupingView._locgr;
                    g.p.groupingView._locgr = !1,
                    b(k),
                    g.p.groupingView._locgr = u
                } else {
                    var v;
                    for (m = 0,
                    d = k.length; m < d; m++) {
                        for (f = 0,
                        o = [],
                        v = k[m],
                        e = 0; e < l.length; e++)
                            j = {
                                text: null == v[l[e]] ? "" : $.jgrid.formatCell(v[l[e]] + "", n[f], k[m], i[n[f]], g, "pdf"),
                                alignment: q[l[e]],
                                style: "tableBody"
                            },
                            o.push(j),
                            f++;
                        h.push(o)
                    }
                }
                if (a.includeFooter && g.p.footerrow) {
                    var w = $(g).jqGrid("footerData", "get");
                    for (o = [],
                    e = 0; e < l.length; e++)
                        j = {
                            text: $.jgrid.stripHtml(w[l[e]]),
                            style: "tableFooter",
                            alignment: q[l[e]]
                        },
                        o.push(j);
                    h.push(o)
                }
                var x = {
                    pageSize: a.pageSize,
                    pageOrientation: a.orientation,
                    content: [{
                        style: "tableExample",
                        widths: p,
                        table: {
                            headerRows: null != r ? 0 : 1,
                            body: h
                        }
                    }],
                    styles: {
                        tableHeader: {
                            bold: !0,
                            fontSize: 11,
                            color: "#2e6e9e",
                            fillColor: "#dfeffc",
                            alignment: "center"
                        },
                        tableBody: {
                            fontSize: 10
                        },
                        tableFooter: {
                            bold: !0,
                            fontSize: 11,
                            color: "#2e6e9e",
                            fillColor: "#dfeffc"
                        },
                        title: {
                            alignment: "center",
                            fontSize: 15
                        },
                        description: {}
                    },
                    defaultStyle: {
                        fontSize: 10
                    }
                };
                a.description && x.content.unshift({
                    text: a.description,
                    style: "description",
                    margin: [0, 0, 0, 12]
                }),
                a.title && x.content.unshift({
                    text: a.title,
                    style: "title",
                    margin: [0, 0, 0, 12]
                }),
                $.isFunction(a.onBeforeExport) && a.onBeforeExport.call(g, x);
                try {
                    var y = pdfMake.createPdf(x);
                    "open" === a.download ? y.open() : y.getBuffer(function(b) {
                        $.jgrid.saveAs(b, a.fileName, {
                            type: a.mimetype
                        })
                    })
                } catch (a) {
                    throw a
                }
            })
        },
        exportToHtml: function(a) {
            a = $.extend(!0, {
                title: "",
                onBeforeExport: null,
                includeLabels: !0,
                includeGroupHeader: !0,
                includeFooter: !0,
                tableClass: "jqgridprint",
                autoPrint: !1,
                topText: "",
                bottomText: "",
                returnAsString: !1
            }, a || {});
            var b;
            return this.each(function() {
                function c(a) {
                    function b(a, b, c) {
                        var d, e = !1;
                        if (0 === b)
                            e = c[a];
                        else {
                            var f = c[a].idx;
                            if (0 === f)
                                e = c[a];
                            else
                                for (d = a; d >= 0; d--)
                                    if (c[d].idx === f - b) {
                                        e = c[d];
                                        break
                                    }
                        }
                        return e
                    }
                    function c(a, c, e, h) {
                        var j, l, m = b(a, c, e), n = m.cnt, o = d(i.header);
                        for (l = h; l < k; l++)
                            if (g[l]._expcol) {
                                var p = "{0}";
                                $.each(m.summary, function() {
                                    if (this.nm === g[l].name) {
                                        g[l].summaryTpl && (p = g[l].summaryTpl),
                                        "string" == typeof this.st && "avg" === this.st.toLowerCase() && (this.sd && this.vd ? this.v = this.v / this.vd : this.v && n > 0 && (this.v = this.v / n));
                                        try {
                                            this.groupCount = m.cnt,
                                            this.groupIndex = m.dataIndex,
                                            this.groupValue = m.value,
                                            j = f.formatter("", this.v, l, this)
                                        } catch (a) {
                                            j = this.v
                                        }
                                        return o[this.nm] = $.jgrid.stripHtml($.jgrid.template(p, j)),
                                        !1
                                    }
                                })
                            }
                        return o
                    }
                    function d(a) {
                        for (var b = {}, c = 0; c < a.length; c++)
                            b[a[c]] = "";
                        return b
                    }
                    var e = f.p.groupingView
                      , h = []
                      , j = e.groupField.length
                      , k = g.length
                      , l = 0
                      , m = "";
                    $.each(g, function(a, b) {
                        var c;
                        for (c = 0; c < j; c++)
                            if (e.groupField[c] === b.name) {
                                h[c] = a;
                                break
                            }
                    });
                    var o, p = $.makeArray(e.groupSummary);
                    if (p.reverse(),
                    "local" === f.p.datatype && !f.p.loadonce) {
                        $(f).jqGrid("groupingSetup");
                        for (var q = $.jgrid.getMethod("groupingPrepare"), r = 0; r < i.body.length; r++)
                            q.call($(f), i.body[r], r)
                    }
                    return $.each(e.groups, function(b, g) {
                        l++;
                        try {
                            o = $.isArray(e.formatDisplayField) && $.isFunction(e.formatDisplayField[g.idx]) ? e.formatDisplayField[g.idx].call(f, g.displayValue, g.value, f.p.colModel[h[g.idx]], g.idx, e) : f.formatter("", g.displayValue, h[g.idx], g.value)
                        } catch (a) {
                            o = g.displayValue
                        }
                        var k = "";
                        "string" != typeof (k = $.isFunction(e.groupText[g.idx]) ? e.groupText[g.idx].call(f, o, g.cnt, g.summary) : $.jgrid.template(e.groupText[g.idx], o, g.cnt, g.summary)) && "number" != typeof k && (k = o);
                        var q, r = !1;
                        if ("header" === e.groupSummaryPos[g.idx] ? q = c(b, 0, e.groups, 0) : (q = d(i.header),
                        r = !0),
                        q[Object.keys(q)[0]] = new Array(5 * g.idx).join(" ") + k,
                        m += n(q, "td", !1, 1 === l, r),
                        j - 1 === g.idx) {
                            var s, t, u = e.groups[b + 1], v = 0, w = g.startRow, x = void 0 !== u ? u.startRow : e.groups[b].startRow + e.groups[b].cnt;
                            for (s = w; s < x && a[s - v]; s++) {
                                var y = a[s - v];
                                m += n(y, "td", !1)
                            }
                            if ("header" !== e.groupSummaryPos[g.idx]) {
                                var z;
                                if (void 0 !== u) {
                                    for (z = 0; z < e.groupField.length && u.dataIndex !== e.groupField[z]; z++)
                                        ;
                                    l = e.groupField.length - z
                                }
                                for (t = 0; t < l; t++)
                                    p[t] && (q = c(b, t, e.groups, 0),
                                    m += n(q, "td", !1));
                                l = z
                            }
                        }
                    }),
                    m
                }
                var d, e, f = this, g = f.p.colModel, h = 0, i = {
                    body: f.addLocalData(!0),
                    header: [],
                    footer: [],
                    width: [],
                    map: [],
                    align: []
                };
                for (d = 0,
                e = g.length; d < e; d++)
                    g[d]._expcol = !0,
                    void 0 === g[d].exportcol ? g[d].hidden && (g[d]._expcol = !1) : g[d]._expcol = g[d].exportcol,
                    "cb" !== g[d].name && "rn" !== g[d].name && "subgrid" !== g[d].name && g[d]._expcol && (i.header[h] = g[d].name,
                    i.width[h] = g[d].width,
                    i.map[h] = d,
                    i.align[h] = g[d].align || "left",
                    h++);
                var j = document.createElement("a")
                  , k = function(a) {
                    var b = $(a).clone()[0];
                    return "link" === b.nodeName.toLowerCase() && (b.href = l(b.href)),
                    b.outerHTML
                }
                  , l = function(a) {
                    j.href = a;
                    var b = j.host;
                    return -1 === b.indexOf("/") && 0 !== j.pathname.indexOf("/") && (b += "/"),
                    j.protocol + "//" + b + j.pathname + j.search
                }
                  , m = function(a, b, c) {
                    for (var d, e = "<tr>", g = 0, h = a.length; g < h; g++)
                        d = !0 === c ? " style=width:" + i.width[g] + "px;" : "",
                        e += "<" + b + d + ">" + f.p.colNames[i.map[g]] + "</" + b + ">";
                    return e + "</tr>"
                }
                  , n = function(a, b, c, d, e) {
                    for (var h, j, k = "<tr>", l = 0, m = i.header.length; l < m && (j = e ? ' colspan= "' + i.header.length + '" style=text-align:left' : !0 === d ? " style=width:" + i.width[l] + "px;text-align:" + i.align[l] + ";" : " style=text-align:" + i.align[l] + ";",
                    h = i.header[l],
                    a.hasOwnProperty(h) && (k += "<" + b + j + ">" + (c ? $.jgrid.formatCell(a[h], i.map[l], a, g[i.map[l]], f, "html") : a[h]) + "</" + b + ">"),
                    !e); l++)
                        ;
                    return k + "</tr>"
                }
                  , o = '<table class="' + a.tableClass + '">';
                if (a.includeLabels && (o += "<thead>" + m(i.header, "th", !0) + "</thead>"),
                o += "<tbody>",
                f.p.grouping) {
                    var p = !!f.p.groupingView._locgr;
                    f.p.groupingView._locgr = !1,
                    o += c(i.body),
                    f.p.groupingView._locgr = p
                } else
                    for (var h = 0, e = i.body.length; h < e; h++)
                        o += n(i.body[h], "td", !0, 0 === h);
                if (a.includeFooter && f.p.footerrow && (i.footer = $(f).jqGrid("footerData", "get", null, !1),
                o += n(i.footer, "td", !1)),
                o += "</tbody>",
                o += "</table>",
                a.returnAsString)
                    b = o;
                else {
                    var q = window.open("", "");
                    q.document.close();
                    var r = a.title ? "<title>" + a.title + "</title>" : "";
                    $("style, link").each(function() {
                        r += k(this)
                    });
                    try {
                        q.document.head.innerHTML = r
                    } catch (a) {
                        $(q.document.head).html(r)
                    }
                    q.document.body.innerHTML = (a.title ? "<h1>" + a.title + "</h1>" : "") + "<div>" + (a.topText || "") + "</div>" + o + "<div>" + (a.bottomText || "") + "</div>",
                    $(q.document.body).addClass("html-view"),
                    $("img", q.document.body).each(function(a, b) {
                        b.setAttribute("src", l(b.getAttribute("src")))
                    }),
                    a.onBeforeExport && a.onBeforeExport(q),
                    Boolean(q.chrome) ? a.autoPrint && (q.print(),
                    q.close()) : setTimeout(function() {
                        a.autoPrint && (q.print(),
                        q.close())
                    }, 1e3)
                }
            }),
            b
        }
    })
});
//# sourceMappingURL=jquery.jqGrid.min.js.map
