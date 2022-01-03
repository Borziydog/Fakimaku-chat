! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.firebase = e()
}(this, function() {
    "use strict";
    ! function(t) {
        if (!t.fetch) {
            var e = {
                searchParams: "URLSearchParams" in t,
                iterable: "Symbol" in t && "iterator" in Symbol,
                blob: "FileReader" in t && "Blob" in t && function() {
                    try {
                        return new Blob, !0
                    } catch (t) {
                        return !1
                    }
                }(),
                formData: "FormData" in t,
                arrayBuffer: "ArrayBuffer" in t
            };
            if (e.arrayBuffer) var r = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
                n = function(t) {
                    return t && DataView.prototype.isPrototypeOf(t)
                },
                o = ArrayBuffer.isView || function(t) {
                    return t && r.indexOf(Object.prototype.toString.call(t)) > -1
                };
            f.prototype.append = function(t, e) {
                t = a(t), e = c(e);
                var r = this.map[t];
                this.map[t] = r ? r + "," + e : e
            }, f.prototype.delete = function(t) {
                delete this.map[a(t)]
            }, f.prototype.get = function(t) {
                return t = a(t), this.has(t) ? this.map[t] : null
            }, f.prototype.has = function(t) {
                return this.map.hasOwnProperty(a(t))
            }, f.prototype.set = function(t, e) {
                this.map[a(t)] = c(e)
            }, f.prototype.forEach = function(t, e) {
                for (var r in this.map) this.map.hasOwnProperty(r) && t.call(e, this.map[r], r, this)
            }, f.prototype.keys = function() {
                var t = [];
                return this.forEach(function(e, r) {
                    t.push(r)
                }), u(t)
            }, f.prototype.values = function() {
                var t = [];
                return this.forEach(function(e) {
                    t.push(e)
                }), u(t)
            }, f.prototype.entries = function() {
                var t = [];
                return this.forEach(function(e, r) {
                    t.push([r, e])
                }), u(t)
            }, e.iterable && (f.prototype[Symbol.iterator] = f.prototype.entries);
            var i = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
            v.prototype.clone = function() {
                return new v(this, {
                    body: this._bodyInit
                })
            }, y.call(v.prototype), y.call(m.prototype), m.prototype.clone = function() {
                return new m(this._bodyInit, {
                    status: this.status,
                    statusText: this.statusText,
                    headers: new f(this.headers),
                    url: this.url
                })
            }, m.error = function() {
                var t = new m(null, {
                    status: 0,
                    statusText: ""
                });
                return t.type = "error", t
            };
            var s = [301, 302, 303, 307, 308];
            m.redirect = function(t, e) {
                if (-1 === s.indexOf(e)) throw new RangeError("Invalid status code");
                return new m(null, {
                    status: e,
                    headers: {
                        location: t
                    }
                })
            }, t.Headers = f, t.Request = v, t.Response = m, t.fetch = function(t, r) {
                return new Promise(function(n, o) {
                    var i = new v(t, r),
                        s = new XMLHttpRequest;
                    s.onload = function() {
                        var t, e, r = {
                            status: s.status,
                            statusText: s.statusText,
                            headers: (t = s.getAllResponseHeaders() || "", e = new f, t.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function(t) {
                                var r = t.split(":"),
                                    n = r.shift().trim();
                                if (n) {
                                    var o = r.join(":").trim();
                                    e.append(n, o)
                                }
                            }), e)
                        };
                        r.url = "responseURL" in s ? s.responseURL : r.headers.get("X-Request-URL");
                        var o = "response" in s ? s.response : s.responseText;
                        n(new m(o, r))
                    }, s.onerror = function() {
                        o(new TypeError("Network request failed"))
                    }, s.ontimeout = function() {
                        o(new TypeError("Network request failed"))
                    }, s.open(i.method, i.url, !0), "include" === i.credentials ? s.withCredentials = !0 : "omit" === i.credentials && (s.withCredentials = !1), "responseType" in s && e.blob && (s.responseType = "blob"), i.headers.forEach(function(t, e) {
                        s.setRequestHeader(e, t)
                    }), s.send(void 0 === i._bodyInit ? null : i._bodyInit)
                })
            }, t.fetch.polyfill = !0
        }

        function a(t) {
            if ("string" != typeof t && (t = String(t)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t)) throw new TypeError("Invalid character in header field name");
            return t.toLowerCase()
        }

        function c(t) {
            return "string" != typeof t && (t = String(t)), t
        }

        function u(t) {
            var r = {
                next: function() {
                    var e = t.shift();
                    return {
                        done: void 0 === e,
                        value: e
                    }
                }
            };
            return e.iterable && (r[Symbol.iterator] = function() {
                return r
            }), r
        }

        function f(t) {
            this.map = {}, t instanceof f ? t.forEach(function(t, e) {
                this.append(e, t)
            }, this) : Array.isArray(t) ? t.forEach(function(t) {
                this.append(t[0], t[1])
            }, this) : t && Object.getOwnPropertyNames(t).forEach(function(e) {
                this.append(e, t[e])
            }, this)
        }

        function h(t) {
            if (t.bodyUsed) return Promise.reject(new TypeError("Already read"));
            t.bodyUsed = !0
        }

        function p(t) {
            return new Promise(function(e, r) {
                t.onload = function() {
                    e(t.result)
                }, t.onerror = function() {
                    r(t.error)
                }
            })
        }

        function l(t) {
            var e = new FileReader,
                r = p(e);
            return e.readAsArrayBuffer(t), r
        }

        function d(t) {
            if (t.slice) return t.slice(0);
            var e = new Uint8Array(t.byteLength);
            return e.set(new Uint8Array(t)), e.buffer
        }

        function y() {
            return this.bodyUsed = !1, this._initBody = function(t) {
                if (this._bodyInit = t, t)
                    if ("string" == typeof t) this._bodyText = t;
                    else if (e.blob && Blob.prototype.isPrototypeOf(t)) this._bodyBlob = t;
                else if (e.formData && FormData.prototype.isPrototypeOf(t)) this._bodyFormData = t;
                else if (e.searchParams && URLSearchParams.prototype.isPrototypeOf(t)) this._bodyText = t.toString();
                else if (e.arrayBuffer && e.blob && n(t)) this._bodyArrayBuffer = d(t.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer]);
                else {
                    if (!e.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(t) && !o(t)) throw new Error("unsupported BodyInit type");
                    this._bodyArrayBuffer = d(t)
                } else this._bodyText = "";
                this.headers.get("content-type") || ("string" == typeof t ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : e.searchParams && URLSearchParams.prototype.isPrototypeOf(t) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
            }, e.blob && (this.blob = function() {
                var t = h(this);
                if (t) return t;
                if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                return Promise.resolve(new Blob([this._bodyText]))
            }, this.arrayBuffer = function() {
                return this._bodyArrayBuffer ? h(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(l)
            }), this.text = function() {
                var t, e, r, n = h(this);
                if (n) return n;
                if (this._bodyBlob) return t = this._bodyBlob, e = new FileReader, r = p(e), e.readAsText(t), r;
                if (this._bodyArrayBuffer) return Promise.resolve(function(t) {
                    for (var e = new Uint8Array(t), r = new Array(e.length), n = 0; n < e.length; n++) r[n] = String.fromCharCode(e[n]);
                    return r.join("")
                }(this._bodyArrayBuffer));
                if (this._bodyFormData) throw new Error("could not read FormData body as text");
                return Promise.resolve(this._bodyText)
            }, e.formData && (this.formData = function() {
                return this.text().then(b)
            }), this.json = function() {
                return this.text().then(JSON.parse)
            }, this
        }

        function v(t, e) {
            var r, n, o = (e = e || {}).body;
            if (t instanceof v) {
                if (t.bodyUsed) throw new TypeError("Already read");
                this.url = t.url, this.credentials = t.credentials, e.headers || (this.headers = new f(t.headers)), this.method = t.method, this.mode = t.mode, o || null == t._bodyInit || (o = t._bodyInit, t.bodyUsed = !0)
            } else this.url = String(t);
            if (this.credentials = e.credentials || this.credentials || "omit", !e.headers && this.headers || (this.headers = new f(e.headers)), this.method = (r = e.method || this.method || "GET", n = r.toUpperCase(), i.indexOf(n) > -1 ? n : r), this.mode = e.mode || this.mode || null, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && o) throw new TypeError("Body not allowed for GET or HEAD requests");
            this._initBody(o)
        }

        function b(t) {
            var e = new FormData;
            return t.trim().split("&").forEach(function(t) {
                if (t) {
                    var r = t.split("="),
                        n = r.shift().replace(/\+/g, " "),
                        o = r.join("=").replace(/\+/g, " ");
                    e.append(decodeURIComponent(n), decodeURIComponent(o))
                }
            }), e
        }

        function m(t, e) {
            e || (e = {}), this.type = "default", this.status = void 0 === e.status ? 200 : e.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in e ? e.statusText : "OK", this.headers = new f(e.headers), this.url = e.url || "", this._initBody(t)
        }
    }("undefined" != typeof self ? self : void 0);
    var t = setTimeout;

    function e() {}

    function r(t) {
        if (!(this instanceof r)) throw new TypeError("Promises must be constructed via new");
        if ("function" != typeof t) throw new TypeError("not a function");
        this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], a(t, this)
    }

    function n(t, e) {
        for (; 3 === t._state;) t = t._value;
        0 !== t._state ? (t._handled = !0, r._immediateFn(function() {
            var r = 1 === t._state ? e.onFulfilled : e.onRejected;
            if (null !== r) {
                var n;
                try {
                    n = r(t._value)
                } catch (t) {
                    return void i(e.promise, t)
                }
                o(e.promise, n)
            } else(1 === t._state ? o : i)(e.promise, t._value)
        })) : t._deferreds.push(e)
    }

    function o(t, e) {
        try {
            if (e === t) throw new TypeError("A promise cannot be resolved with itself.");
            if (e && ("object" == typeof e || "function" == typeof e)) {
                var n = e.then;
                if (e instanceof r) return t._state = 3, t._value = e, void s(t);
                if ("function" == typeof n) return void a((o = n, c = e, function() {
                    o.apply(c, arguments)
                }), t)
            }
            t._state = 1, t._value = e, s(t)
        } catch (e) {
            i(t, e)
        }
        var o, c
    }

    function i(t, e) {
        t._state = 2, t._value = e, s(t)
    }

    function s(t) {
        2 === t._state && 0 === t._deferreds.length && r._immediateFn(function() {
            t._handled || r._unhandledRejectionFn(t._value)
        });
        for (var e = 0, o = t._deferreds.length; e < o; e++) n(t, t._deferreds[e]);
        t._deferreds = null
    }

    function a(t, e) {
        var r = !1;
        try {
            t(function(t) {
                r || (r = !0, o(e, t))
            }, function(t) {
                r || (r = !0, i(e, t))
            })
        } catch (t) {
            if (r) return;
            r = !0, i(e, t)
        }
    }
    r.prototype.catch = function(t) {
        return this.then(null, t)
    }, r.prototype.then = function(t, r) {
        var o = new this.constructor(e);
        return n(this, new function(t, e, r) {
            this.onFulfilled = "function" == typeof t ? t : null, this.onRejected = "function" == typeof e ? e : null, this.promise = r
        }(t, r, o)), o
    }, r.prototype.finally = function(t) {
        var e = this.constructor;
        return this.then(function(r) {
            return e.resolve(t()).then(function() {
                return r
            })
        }, function(r) {
            return e.resolve(t()).then(function() {
                return e.reject(r)
            })
        })
    }, r.all = function(t) {
        return new r(function(e, r) {
            if (!t || void 0 === t.length) throw new TypeError("Promise.all accepts an array");
            var n = Array.prototype.slice.call(t);
            if (0 === n.length) return e([]);
            var o = n.length;

            function i(t, s) {
                try {
                    if (s && ("object" == typeof s || "function" == typeof s)) {
                        var a = s.then;
                        if ("function" == typeof a) return void a.call(s, function(e) {
                            i(t, e)
                        }, r)
                    }
                    n[t] = s, 0 == --o && e(n)
                } catch (t) {
                    r(t)
                }
            }
            for (var s = 0; s < n.length; s++) i(s, n[s])
        })
    }, r.resolve = function(t) {
        return t && "object" == typeof t && t.constructor === r ? t : new r(function(e) {
            e(t)
        })
    }, r.reject = function(t) {
        return new r(function(e, r) {
            r(t)
        })
    }, r.race = function(t) {
        return new r(function(e, r) {
            for (var n = 0, o = t.length; n < o; n++) t[n].then(e, r)
        })
    }, r._immediateFn = "function" == typeof setImmediate && function(t) {
        setImmediate(t)
    } || function(e) {
        t(e, 0)
    }, r._unhandledRejectionFn = function(t) {
        "undefined" != typeof console && console && void 0
    };
    var c = function() {
        if ("undefined" != typeof self) return self;
        if ("undefined" != typeof window) return window;
        if ("undefined" != typeof global) return global;
        throw new Error("unable to locate global object")
    }();

    function u(t, e) {
        return t(e = {
            exports: {}
        }, e.exports), e.exports
    }
    c.Promise || (c.Promise = r);
    var f = u(function(t) {
            var e = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
            "number" == typeof __g && (__g = e)
        }),
        h = u(function(t) {
            var e = t.exports = {
                version: "2.5.5"
            };
            "number" == typeof __e && (__e = e)
        }),
        p = (h.version, function(t) {
            return "object" == typeof t ? null !== t : "function" == typeof t
        }),
        l = function(t) {
            if (!p(t)) throw TypeError(t + " is not an object!");
            return t
        },
        d = function(t) {
            try {
                return !!t()
            } catch (t) {
                return !0
            }
        },
        y = !d(function() {
            return 7 != Object.defineProperty({}, "a", {
                get: function() {
                    return 7
                }
            }).a
        }),
        v = f.document,
        b = p(v) && p(v.createElement),
        m = !y && !d(function() {
            return 7 != Object.defineProperty((t = "div", b ? v.createElement(t) : {}), "a", {
                get: function() {
                    return 7
                }
            }).a;
            var t
        }),
        _ = Object.defineProperty,
        w = {
            f: y ? Object.defineProperty : function(t, e, r) {
                if (l(t), e = function(t, e) {
                        if (!p(t)) return t;
                        var r, n;
                        if (e && "function" == typeof(r = t.toString) && !p(n = r.call(t))) return n;
                        if ("function" == typeof(r = t.valueOf) && !p(n = r.call(t))) return n;
                        if (!e && "function" == typeof(r = t.toString) && !p(n = r.call(t))) return n;
                        throw TypeError("Can't convert object to primitive value")
                    }(e, !0), l(r), m) try {
                    return _(t, e, r)
                } catch (t) {}
                if ("get" in r || "set" in r) throw TypeError("Accessors not supported!");
                return "value" in r && (t[e] = r.value), t
            }
        },
        g = y ? function(t, e, r) {
            return w.f(t, e, function(t, e) {
                return {
                    enumerable: !(1 & t),
                    configurable: !(2 & t),
                    writable: !(4 & t),
                    value: e
                }
            }(1, r))
        } : function(t, e, r) {
            return t[e] = r, t
        },
        A = {}.hasOwnProperty,
        E = function(t, e) {
            return A.call(t, e)
        },
        O = 0,
        j = Math.random(),
        P = function(t) {
            return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++O + j).toString(36))
        },
        T = u(function(t) {
            var e = P("src"),
                r = Function.toString,
                n = ("" + r).split("toString");
            h.inspectSource = function(t) {
                return r.call(t)
            }, (t.exports = function(t, r, o, i) {
                var s = "function" == typeof o;
                s && (E(o, "name") || g(o, "name", r)), t[r] !== o && (s && (E(o, e) || g(o, e, t[r] ? "" + t[r] : n.join(String(r)))), t === f ? t[r] = o : i ? t[r] ? t[r] = o : g(t, r, o) : (delete t[r], g(t, r, o)))
            })(Function.prototype, "toString", function() {
                return "function" == typeof this && this[e] || r.call(this)
            })
        }),
        S = function(t, e, r) {
            if (function(t) {
                    if ("function" != typeof t) throw TypeError(t + " is not a function!")
                }(t), void 0 === e) return t;
            switch (r) {
                case 1:
                    return function(r) {
                        return t.call(e, r)
                    };
                case 2:
                    return function(r, n) {
                        return t.call(e, r, n)
                    };
                case 3:
                    return function(r, n, o) {
                        return t.call(e, r, n, o)
                    }
            }
            return function() {
                return t.apply(e, arguments)
            }
        },
        x = function(t, e, r) {
            var n, o, i, s, a = t & x.F,
                c = t & x.G,
                u = t & x.S,
                p = t & x.P,
                l = t & x.B,
                d = c ? f : u ? f[e] || (f[e] = {}) : (f[e] || {}).prototype,
                y = c ? h : h[e] || (h[e] = {}),
                v = y.prototype || (y.prototype = {});
            for (n in c && (r = e), r) i = ((o = !a && d && void 0 !== d[n]) ? d : r)[n], s = l && o ? S(i, f) : p && "function" == typeof i ? S(Function.call, i) : i, d && T(d, n, i, t & x.U), y[n] != i && g(y, n, s), p && v[n] != i && (v[n] = i)
        };
    f.core = h, x.F = 1, x.G = 2, x.S = 4, x.P = 8, x.B = 16, x.W = 32, x.U = 64, x.R = 128;
    var k = x,
        F = {}.toString,
        B = function(t) {
            return F.call(t).slice(8, -1)
        },
        D = Object("z").propertyIsEnumerable(0) ? Object : function(t) {
            return "String" == B(t) ? t.split("") : Object(t)
        },
        I = function(t) {
            if (void 0 == t) throw TypeError("Can't call method on  " + t);
            return t
        },
        N = Math.ceil,
        R = Math.floor,
        U = Math.min,
        C = function(t) {
            return t > 0 ? U(function(t) {
                return isNaN(t = +t) ? 0 : (t > 0 ? R : N)(t)
            }(t), 9007199254740991) : 0
        },
        L = Array.isArray || function(t) {
            return "Array" == B(t)
        },
        z = f["__core-js_shared__"] || (f["__core-js_shared__"] = {}),
        M = function(t) {
            return z[t] || (z[t] = {})
        },
        W = u(function(t) {
            var e = M("wks"),
                r = f.Symbol,
                n = "function" == typeof r;
            (t.exports = function(t) {
                return e[t] || (e[t] = n && r[t] || (n ? r : P)("Symbol." + t))
            }).store = e
        }),
        $ = W("species"),
        q = function(t, e) {
            return new(function(t) {
                var e;
                return L(t) && ("function" != typeof(e = t.constructor) || e !== Array && !L(e.prototype) || (e = void 0), p(e) && null === (e = e[$]) && (e = void 0)), void 0 === e ? Array : e
            }(t))(e)
        },
        H = function(t, e) {
            var r = 1 == t,
                n = 2 == t,
                o = 3 == t,
                i = 4 == t,
                s = 6 == t,
                a = 5 == t || s,
                c = e || q;
            return function(e, u, f) {
                for (var h, p, l = Object(I(e)), d = D(l), y = S(u, f, 3), v = C(d.length), b = 0, m = r ? c(e, v) : n ? c(e, 0) : void 0; v > b; b++)
                    if ((a || b in d) && (p = y(h = d[b], b, l), t))
                        if (r) m[b] = p;
                        else if (p) switch (t) {
                    case 3:
                        return !0;
                    case 5:
                        return h;
                    case 6:
                        return b;
                    case 2:
                        m.push(h)
                } else if (i) return !1;
                return s ? -1 : o || i ? i : m
            }
        },
        G = W("unscopables"),
        K = Array.prototype;
    void 0 == K[G] && g(K, G, {});
    var V = function(t) {
            K[G][t] = !0
        },
        X = H(5),
        J = !0;
    "find" in [] && Array(1).find(function() {
        J = !1
    }), k(k.P + k.F * J, "Array", {
        find: function(t) {
            return X(this, t, arguments.length > 1 ? arguments[1] : void 0)
        }
    }), V("find");
    h.Array.find;
    var Q = H(6),
        Y = !0;
    "findIndex" in [] && Array(1).findIndex(function() {
        Y = !1
    }), k(k.P + k.F * Y, "Array", {
        findIndex: function(t) {
            return Q(this, t, arguments.length > 1 ? arguments[1] : void 0)
        }
    }), V("findIndex");
    h.Array.findIndex;
    var Z = W("match"),
        tt = function(t, e, r) {
            if (p(n = e) && (void 0 !== (o = n[Z]) ? o : "RegExp" == B(n))) throw TypeError("String#" + r + " doesn't accept regex!");
            var n, o;
            return String(I(t))
        },
        et = W("match"),
        rt = "".startsWith;
    k(k.P + k.F * function(t) {
        var e = /./;
        try {
            "/./" [t](e)
        } catch (r) {
            try {
                return e[et] = !1, !"/./" [t](e)
            } catch (t) {}
        }
        return !0
    }("startsWith"), "String", {
        startsWith: function(t) {
            var e = tt(this, t, "startsWith"),
                r = C(Math.min(arguments.length > 1 ? arguments[1] : void 0, e.length)),
                n = String(t);
            return rt ? rt.call(e, n, r) : e.slice(r, r + n.length) === n
        }
    });
    h.String.startsWith;
    var nt = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array && function(t, e) {
        t.__proto__ = e
    } || function(t, e) {
        for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
    };

    function ot(t, e) {
        if (!(e instanceof Object)) return e;
        switch (e.constructor) {
            case Date:
                return new Date(e.getTime());
            case Object:
                void 0 === t && (t = {});
                break;
            case Array:
                t = [];
                break;
            default:
                return e
        }
        for (var r in e) e.hasOwnProperty(r) && (t[r] = ot(t[r], e[r]));
        return t
    }

    function it(t, e, r) {
        t[e] = r
    }
    var st = "FirebaseError",
        at = Error.captureStackTrace,
        ct = function() {
            return function(t, e) {
                if (this.code = t, this.message = e, at) at(this, ut.prototype.create);
                else {
                    var r = Error.apply(this, arguments);
                    this.name = st, Object.defineProperty(this, "stack", {
                        get: function() {
                            return r.stack
                        }
                    })
                }
            }
        }();
    ct.prototype = Object.create(Error.prototype), ct.prototype.constructor = ct, ct.prototype.name = st;
    var ut = function() {
        function t(t, e, r) {
            this.service = t, this.serviceName = e, this.errors = r, this.pattern = /\{\$([^}]+)}/g
        }
        return t.prototype.create = function(t, e) {
            void 0 === e && (e = {});
            var r, n = this.errors[t],
                o = this.service + "/" + t;
            r = void 0 === n ? "Error" : n.replace(this.pattern, function(t, r) {
                var n = e[r];
                return void 0 !== n ? n.toString() : "<" + r + "?>"
            }), r = this.serviceName + ": " + r + " (" + o + ").";
            var i = new ct(o, r);
            for (var s in e) e.hasOwnProperty(s) && "_" !== s.slice(-1) && (i[s] = e[s]);
            return i
        }, t
    }();
    ! function(t) {
        function e() {
            var e = t.call(this) || this;
            e.chain_ = [], e.buf_ = [], e.W_ = [], e.pad_ = [], e.inbuf_ = 0, e.total_ = 0, e.blockSize = 64, e.pad_[0] = 128;
            for (var r = 1; r < e.blockSize; ++r) e.pad_[r] = 0;
            return e.reset(), e
        }(function(t, e) {
            function r() {
                this.constructor = t
            }
            nt(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
        })(e, t), e.prototype.reset = function() {
            this.chain_[0] = 1732584193, this.chain_[1] = 4023233417, this.chain_[2] = 2562383102, this.chain_[3] = 271733878, this.chain_[4] = 3285377520, this.inbuf_ = 0, this.total_ = 0
        }, e.prototype.compress_ = function(t, e) {
            e || (e = 0);
            var r = this.W_;
            if ("string" == typeof t)
                for (var n = 0; n < 16; n++) r[n] = t.charCodeAt(e) << 24 | t.charCodeAt(e + 1) << 16 | t.charCodeAt(e + 2) << 8 | t.charCodeAt(e + 3), e += 4;
            else
                for (n = 0; n < 16; n++) r[n] = t[e] << 24 | t[e + 1] << 16 | t[e + 2] << 8 | t[e + 3], e += 4;
            for (n = 16; n < 80; n++) {
                var o = r[n - 3] ^ r[n - 8] ^ r[n - 14] ^ r[n - 16];
                r[n] = 4294967295 & (o << 1 | o >>> 31)
            }
            var i, s, a = this.chain_[0],
                c = this.chain_[1],
                u = this.chain_[2],
                f = this.chain_[3],
                h = this.chain_[4];
            for (n = 0; n < 80; n++) {
                n < 40 ? n < 20 ? (i = f ^ c & (u ^ f), s = 1518500249) : (i = c ^ u ^ f, s = 1859775393) : n < 60 ? (i = c & u | f & (c | u), s = 2400959708) : (i = c ^ u ^ f, s = 3395469782);
                o = (a << 5 | a >>> 27) + i + h + s + r[n] & 4294967295;
                h = f, f = u, u = 4294967295 & (c << 30 | c >>> 2), c = a, a = o
            }
            this.chain_[0] = this.chain_[0] + a & 4294967295, this.chain_[1] = this.chain_[1] + c & 4294967295, this.chain_[2] = this.chain_[2] + u & 4294967295, this.chain_[3] = this.chain_[3] + f & 4294967295, this.chain_[4] = this.chain_[4] + h & 4294967295
        }, e.prototype.update = function(t, e) {
            if (null != t) {
                void 0 === e && (e = t.length);
                for (var r = e - this.blockSize, n = 0, o = this.buf_, i = this.inbuf_; n < e;) {
                    if (0 == i)
                        for (; n <= r;) this.compress_(t, n), n += this.blockSize;
                    if ("string" == typeof t) {
                        for (; n < e;)
                            if (o[i] = t.charCodeAt(n), ++n, ++i == this.blockSize) {
                                this.compress_(o), i = 0;
                                break
                            }
                    } else
                        for (; n < e;)
                            if (o[i] = t[n], ++n, ++i == this.blockSize) {
                                this.compress_(o), i = 0;
                                break
                            }
                }
                this.inbuf_ = i, this.total_ += e
            }
        }, e.prototype.digest = function() {
            var t = [],
                e = 8 * this.total_;
            this.inbuf_ < 56 ? this.update(this.pad_, 56 - this.inbuf_) : this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
            for (var r = this.blockSize - 1; r >= 56; r--) this.buf_[r] = 255 & e, e /= 256;
            this.compress_(this.buf_);
            var n = 0;
            for (r = 0; r < 5; r++)
                for (var o = 24; o >= 0; o -= 8) t[n] = this.chain_[r] >> o & 255, ++n;
            return t
        }
    }(function() {
        return function() {
            this.blockSize = -1
        }
    }());

    function ft(t, e) {
        var r = new ht(t, e);
        return r.subscribe.bind(r)
    }
    var ht = function() {
        function t(t, e) {
            var r = this;
            this.observers = [], this.unsubscribes = [], this.observerCount = 0, this.task = Promise.resolve(), this.finalized = !1, this.onNoObservers = e, this.task.then(function() {
                t(r)
            }).catch(function(t) {
                r.error(t)
            })
        }
        return t.prototype.next = function(t) {
            this.forEachObserver(function(e) {
                e.next(t)
            })
        }, t.prototype.error = function(t) {
            this.forEachObserver(function(e) {
                e.error(t)
            }), this.close(t)
        }, t.prototype.complete = function() {
            this.forEachObserver(function(t) {
                t.complete()
            }), this.close()
        }, t.prototype.subscribe = function(t, e, r) {
            var n, o = this;
            if (void 0 === t && void 0 === e && void 0 === r) throw new Error("Missing Observer.");
            void 0 === (n = function(t, e) {
                if ("object" != typeof t || null === t) return !1;
                for (var r = 0, n = e; r < n.length; r++) {
                    var o = n[r];
                    if (o in t && "function" == typeof t[o]) return !0
                }
                return !1
            }(t, ["next", "error", "complete"]) ? t : {
                next: t,
                error: e,
                complete: r
            }).next && (n.next = pt), void 0 === n.error && (n.error = pt), void 0 === n.complete && (n.complete = pt);
            var i = this.unsubscribeOne.bind(this, this.observers.length);
            return this.finalized && this.task.then(function() {
                try {
                    o.finalError ? n.error(o.finalError) : n.complete()
                } catch (t) {}
            }), this.observers.push(n), i
        }, t.prototype.unsubscribeOne = function(t) {
            void 0 !== this.observers && void 0 !== this.observers[t] && (delete this.observers[t], this.observerCount -= 1, 0 === this.observerCount && void 0 !== this.onNoObservers && this.onNoObservers(this))
        }, t.prototype.forEachObserver = function(t) {
            if (!this.finalized)
                for (var e = 0; e < this.observers.length; e++) this.sendOne(e, t)
        }, t.prototype.sendOne = function(t, e) {
            var r = this;
            this.task.then(function() {
                if (void 0 !== r.observers && void 0 !== r.observers[t]) try {
                    e(r.observers[t])
                } catch (t) {
                    "undefined" != typeof console && console.error && void 0
                }
            })
        }, t.prototype.close = function(t) {
            var e = this;
            this.finalized || (this.finalized = !0, void 0 !== t && (this.finalError = t), this.task.then(function() {
                e.observers = void 0, e.onNoObservers = void 0
            }))
        }, t
    }();

    function pt() {}
    var lt = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        },
        dt = "[DEFAULT]",
        yt = [],
        vt = function() {
            function t(t, e, r) {
                this.firebase_ = r, this.isDeleted_ = !1, this.services_ = {}, this.name_ = e.name, this._automaticDataCollectionEnabled = e.automaticDataCollectionEnabled || !1, this.options_ = ot(void 0, t), this.INTERNAL = {
                    getUid: function() {
                        return null
                    },
                    getToken: function() {
                        return Promise.resolve(null)
                    },
                    addAuthTokenListener: function(t) {
                        yt.push(t), setTimeout(function() {
                            return t(null)
                        }, 0)
                    },
                    removeAuthTokenListener: function(t) {
                        yt = yt.filter(function(e) {
                            return e !== t
                        })
                    }
                }
            }
            return Object.defineProperty(t.prototype, "automaticDataCollectionEnabled", {
                get: function() {
                    return this.checkDestroyed_(), this._automaticDataCollectionEnabled
                },
                set: function(t) {
                    this.checkDestroyed_(), this._automaticDataCollectionEnabled = t
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "name", {
                get: function() {
                    return this.checkDestroyed_(), this.name_
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "options", {
                get: function() {
                    return this.checkDestroyed_(), this.options_
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.delete = function() {
                var t = this;
                return new Promise(function(e) {
                    t.checkDestroyed_(), e()
                }).then(function() {
                    t.firebase_.INTERNAL.removeApp(t.name_);
                    var e = [];
                    return Object.keys(t.services_).forEach(function(r) {
                        Object.keys(t.services_[r]).forEach(function(n) {
                            e.push(t.services_[r][n])
                        })
                    }), Promise.all(e.map(function(t) {
                        return t.INTERNAL.delete()
                    }))
                }).then(function() {
                    t.isDeleted_ = !0, t.services_ = {}
                })
            }, t.prototype._getService = function(t, e) {
                if (void 0 === e && (e = dt), this.checkDestroyed_(), this.services_[t] || (this.services_[t] = {}), !this.services_[t][e]) {
                    var r = e !== dt ? e : void 0,
                        n = this.firebase_.INTERNAL.factories[t](this, this.extendApp.bind(this), r);
                    this.services_[t][e] = n
                }
                return this.services_[t][e]
            }, t.prototype.extendApp = function(t) {
                var e = this;
                ot(this, t), t.INTERNAL && t.INTERNAL.addAuthTokenListener && (yt.forEach(function(t) {
                    e.INTERNAL.addAuthTokenListener(t)
                }), yt = [])
            }, t.prototype.checkDestroyed_ = function() {
                this.isDeleted_ && bt("app-deleted", {
                    name: this.name_
                })
            }, t
        }();

    function bt(t, e) {
        throw mt.create(t, e)
    }
    vt.prototype.name && vt.prototype.options || vt.prototype.delete || void 0;
    var mt = new ut("app", "Firebase", {
            "no-app": "No Firebase App '{$name}' has been created - call Firebase App.initializeApp()",
            "bad-app-name": "Illegal App name: '{$name}",
            "duplicate-app": "Firebase App named '{$name}' already exists",
            "app-deleted": "Firebase App named '{$name}' already deleted",
            "duplicate-service": "Firebase service named '{$name}' already registered",
            "sa-not-supported": "Initializing the Firebase SDK with a service account is only allowed in a Node.js environment. On client devices, you should instead initialize the SDK with an api key and auth domain",
            "invalid-app-argument": "firebase.{$name}() takes either no argument or a Firebase App instance."
        }),
        _t = function t() {
            var e = {},
                r = {},
                n = {},
                o = {
                    __esModule: !0,
                    initializeApp: function(t, r) {
                        if (void 0 === r && (r = {}), "object" != typeof r || null === r) {
                            var n = r;
                            r = {
                                name: n
                            }
                        }
                        var i = r;
                        void 0 === i.name && (i.name = dt);
                        var s = i.name;
                        "string" == typeof s && s || bt("bad-app-name", {
                            name: s + ""
                        }), lt(e, s) && bt("duplicate-app", {
                            name: s
                        });
                        var c = new vt(t, i, o);
                        return e[s] = c, a(c, "create"), c
                    },
                    app: i,
                    apps: null,
                    Promise: Promise,
                    SDK_VERSION: "4.13.0",
                    INTERNAL: {
                        registerService: function(t, e, a, c, u) {
                            r[t] && bt("duplicate-service", {
                                name: t
                            }), r[t] = e, c && (n[t] = c, s().forEach(function(t) {
                                c("create", t)
                            }));
                            var f = function(e) {
                                return void 0 === e && (e = i()), "function" != typeof e[t] && bt("invalid-app-argument", {
                                    name: t
                                }), e[t]()
                            };
                            return void 0 !== a && ot(f, a), o[t] = f, vt.prototype[t] = function() {
                                for (var e = [], r = 0; r < arguments.length; r++) e[r] = arguments[r];
                                return this._getService.bind(this, t).apply(this, u ? e : [])
                            }, f
                        },
                        createFirebaseNamespace: t,
                        extendNamespace: function(t) {
                            ot(o, t)
                        },
                        createSubscribe: ft,
                        ErrorFactory: ut,
                        removeApp: function(t) {
                            a(e[t], "delete"), delete e[t]
                        },
                        factories: r,
                        useAsService: c,
                        Promise: Promise,
                        deepExtend: ot
                    }
                };

            function i(t) {
                return lt(e, t = t || dt) || bt("no-app", {
                    name: t
                }), e[t]
            }

            function s() {
                return Object.keys(e).map(function(t) {
                    return e[t]
                })
            }

            function a(t, e) {
                Object.keys(r).forEach(function(r) {
                    var o = c(t, r);
                    null !== o && n[o] && n[o](e, t)
                })
            }

            function c(t, e) {
                if ("serverAuth" === e) return null;
                var r = e;
                return t.options, r
            }
            return it(o, "default", o), Object.defineProperty(o, "apps", {
                get: s
            }), it(i, "App", vt), o
        }(),
        wt = Object.freeze({
            default: _t,
            firebase: _t
        });
    return (wt && _t || wt).default
});

! function(e, t) {
    "use strict";
    try {
        t = t && t.hasOwnProperty("default") ? t.default : t;
        var n = Object.setPrototypeOf || {
            __proto__: []
        }
        instanceof Array && function(e, t) {
            e.__proto__ = t
        } || function(e, t) {
            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
        };

        function r(e, t) {
            function r() {
                this.constructor = e
            }
            n(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        }
        var i = Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e
        };

        function o(e, t, n, r) {
            return new(n || (n = Promise))(function(i, o) {
                function s(e) {
                    try {
                        c(r.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        c(r.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function c(e) {
                    e.done ? i(e.value) : new n(function(t) {
                        t(e.value)
                    }).then(s, a)
                }
                c((r = r.apply(e, t || [])).next())
            })
        }

        function s(e, t) {
            var n, r, i, o, s = {
                label: 0,
                sent: function() {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            };
            return o = {
                next: a(0),
                throw: a(1),
                return: a(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                return this
            }), o;

            function a(o) {
                return function(a) {
                    return function(o) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; s;) try {
                            if (n = 1, r && (i = r[2 & o[0] ? "return" : o[0] ? "throw" : "next"]) && !(i = i.call(r, o[1])).done) return i;
                            switch (r = 0, i && (o = [0, i.value]), o[0]) {
                                case 0:
                                case 1:
                                    i = o;
                                    break;
                                case 4:
                                    return s.label++, {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    s.label++, r = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = s.ops.pop(), s.trys.pop();
                                    continue;
                                default:
                                    if (!(i = (i = s.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                                        s = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                        s.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && s.label < i[1]) {
                                        s.label = i[1], i = o;
                                        break
                                    }
                                    if (i && s.label < i[2]) {
                                        s.label = i[2], s.ops.push(o);
                                        break
                                    }
                                    i[2] && s.ops.pop(), s.trys.pop();
                                    continue
                            }
                            o = t.call(e, s)
                        } catch (e) {
                            o = [6, e], r = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {
                            value: o[0] ? o[1] : void 0,
                            done: !0
                        }
                    }([o, a])
                }
            }
        }
        var a = "FirebaseError",
            c = Error.captureStackTrace,
            u = function() {
                return function(e, t) {
                    if (this.code = e, this.message = t, c) c(this, h.prototype.create);
                    else {
                        var n = Error.apply(this, arguments);
                        this.name = a, Object.defineProperty(this, "stack", {
                            get: function() {
                                return n.stack
                            }
                        })
                    }
                }
            }();
        u.prototype = Object.create(Error.prototype), u.prototype.constructor = u, u.prototype.name = a;
        var h = function() {
            function e(e, t, n) {
                this.service = e, this.serviceName = t, this.errors = n, this.pattern = /\{\$([^}]+)}/g
            }
            return e.prototype.create = function(e, t) {
                void 0 === t && (t = {});
                var n, r = this.errors[e],
                    i = this.service + "/" + e;
                n = void 0 === r ? "Error" : r.replace(this.pattern, function(e, n) {
                    var r = t[n];
                    return void 0 !== r ? r.toString() : "<" + n + "?>"
                }), n = this.serviceName + ": " + n + " (" + i + ").";
                var o = new u(i, n);
                for (var s in t) t.hasOwnProperty(s) && "_" !== s.slice(-1) && (o[s] = t[s]);
                return o
            }, e
        }();
        (function(e) {
            function t() {
                var t = e.call(this) || this;
                t.chain_ = [], t.buf_ = [], t.W_ = [], t.pad_ = [], t.inbuf_ = 0, t.total_ = 0, t.blockSize = 64, t.pad_[0] = 128;
                for (var n = 1; n < t.blockSize; ++n) t.pad_[n] = 0;
                return t.reset(), t
            }
            r(t, e), t.prototype.reset = function() {
                this.chain_[0] = 1732584193, this.chain_[1] = 4023233417, this.chain_[2] = 2562383102, this.chain_[3] = 271733878, this.chain_[4] = 3285377520, this.inbuf_ = 0, this.total_ = 0
            }, t.prototype.compress_ = function(e, t) {
                t || (t = 0);
                var n = this.W_;
                if ("string" == typeof e)
                    for (var r = 0; r < 16; r++) n[r] = e.charCodeAt(t) << 24 | e.charCodeAt(t + 1) << 16 | e.charCodeAt(t + 2) << 8 | e.charCodeAt(t + 3), t += 4;
                else
                    for (r = 0; r < 16; r++) n[r] = e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3], t += 4;
                for (r = 16; r < 80; r++) {
                    var i = n[r - 3] ^ n[r - 8] ^ n[r - 14] ^ n[r - 16];
                    n[r] = 4294967295 & (i << 1 | i >>> 31)
                }
                var o, s, a = this.chain_[0],
                    c = this.chain_[1],
                    u = this.chain_[2],
                    h = this.chain_[3],
                    f = this.chain_[4];
                for (r = 0; r < 80; r++) {
                    r < 40 ? r < 20 ? (o = h ^ c & (u ^ h), s = 1518500249) : (o = c ^ u ^ h, s = 1859775393) : r < 60 ? (o = c & u | h & (c | u), s = 2400959708) : (o = c ^ u ^ h, s = 3395469782);
                    i = (a << 5 | a >>> 27) + o + f + s + n[r] & 4294967295;
                    f = h, h = u, u = 4294967295 & (c << 30 | c >>> 2), c = a, a = i
                }
                this.chain_[0] = this.chain_[0] + a & 4294967295, this.chain_[1] = this.chain_[1] + c & 4294967295, this.chain_[2] = this.chain_[2] + u & 4294967295, this.chain_[3] = this.chain_[3] + h & 4294967295, this.chain_[4] = this.chain_[4] + f & 4294967295
            }, t.prototype.update = function(e, t) {
                if (null != e) {
                    void 0 === t && (t = e.length);
                    for (var n = t - this.blockSize, r = 0, i = this.buf_, o = this.inbuf_; r < t;) {
                        if (0 == o)
                            for (; r <= n;) this.compress_(e, r), r += this.blockSize;
                        if ("string" == typeof e) {
                            for (; r < t;)
                                if (i[o] = e.charCodeAt(r), ++r, ++o == this.blockSize) {
                                    this.compress_(i), o = 0;
                                    break
                                }
                        } else
                            for (; r < t;)
                                if (i[o] = e[r], ++r, ++o == this.blockSize) {
                                    this.compress_(i), o = 0;
                                    break
                                }
                    }
                    this.inbuf_ = o, this.total_ += t
                }
            }, t.prototype.digest = function() {
                var e = [],
                    t = 8 * this.total_;
                this.inbuf_ < 56 ? this.update(this.pad_, 56 - this.inbuf_) : this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
                for (var n = this.blockSize - 1; n >= 56; n--) this.buf_[n] = 255 & t, t /= 256;
                this.compress_(this.buf_);
                var r = 0;
                for (n = 0; n < 5; n++)
                    for (var i = 24; i >= 0; i -= 8) e[r] = this.chain_[n] >> i & 255, ++r;
                return e
            }
        })(function() {
            return function() {
                this.blockSize = -1
            }
        }());

        function f(e, t) {
            var n = new d(e, t);
            return n.subscribe.bind(n)
        }
        var d = function() {
            function e(e, t) {
                var n = this;
                this.observers = [], this.unsubscribes = [], this.observerCount = 0, this.task = Promise.resolve(), this.finalized = !1, this.onNoObservers = t, this.task.then(function() {
                    e(n)
                }).catch(function(e) {
                    n.error(e)
                })
            }
            return e.prototype.next = function(e) {
                this.forEachObserver(function(t) {
                    t.next(e)
                })
            }, e.prototype.error = function(e) {
                this.forEachObserver(function(t) {
                    t.error(e)
                }), this.close(e)
            }, e.prototype.complete = function() {
                this.forEachObserver(function(e) {
                    e.complete()
                }), this.close()
            }, e.prototype.subscribe = function(e, t, n) {
                var r, i = this;
                if (void 0 === e && void 0 === t && void 0 === n) throw new Error("Missing Observer.");
                void 0 === (r = function(e, t) {
                    if ("object" != typeof e || null === e) return !1;
                    for (var n = 0, r = t; n < r.length; n++) {
                        var i = r[n];
                        if (i in e && "function" == typeof e[i]) return !0
                    }
                    return !1
                }(e, ["next", "error", "complete"]) ? e : {
                    next: e,
                    error: t,
                    complete: n
                }).next && (r.next = p), void 0 === r.error && (r.error = p), void 0 === r.complete && (r.complete = p);
                var o = this.unsubscribeOne.bind(this, this.observers.length);
                return this.finalized && this.task.then(function() {
                    try {
                        i.finalError ? r.error(i.finalError) : r.complete()
                    } catch (e) {}
                }), this.observers.push(r), o
            }, e.prototype.unsubscribeOne = function(e) {
                void 0 !== this.observers && void 0 !== this.observers[e] && (delete this.observers[e], this.observerCount -= 1, 0 === this.observerCount && void 0 !== this.onNoObservers && this.onNoObservers(this))
            }, e.prototype.forEachObserver = function(e) {
                if (!this.finalized)
                    for (var t = 0; t < this.observers.length; t++) this.sendOne(t, e)
            }, e.prototype.sendOne = function(e, t) {
                var n = this;
                this.task.then(function() {
                    if (void 0 !== n.observers && void 0 !== n.observers[e]) try {
                        t(n.observers[e])
                    } catch (e) {
                        "undefined" != typeof console && console.error && void 0
                    }
                })
            }, e.prototype.close = function(e) {
                var t = this;
                this.finalized || (this.finalized = !0, void 0 !== e && (this.finalError = e), this.task.then(function() {
                    t.observers = void 0, t.onNoObservers = void 0
                }))
            }, e
        }();

        function p() {}
        var l, _, E, b = {
                AVAILABLE_IN_WINDOW: "only-available-in-window",
                AVAILABLE_IN_SW: "only-available-in-sw",
                SHOULD_BE_INHERITED: "should-be-overriden",
                BAD_SENDER_ID: "bad-sender-id",
                INCORRECT_GCM_SENDER_ID: "incorrect-gcm-sender-id",
                PERMISSION_DEFAULT: "permission-default",
                PERMISSION_BLOCKED: "permission-blocked",
                UNSUPPORTED_BROWSER: "unsupported-browser",
                NOTIFICATIONS_BLOCKED: "notifications-blocked",
                FAILED_DEFAULT_REGISTRATION: "failed-serviceworker-registration",
                SW_REGISTRATION_EXPECTED: "sw-registration-expected",
                GET_SUBSCRIPTION_FAILED: "get-subscription-failed",
                INVALID_SAVED_TOKEN: "invalid-saved-token",
                SW_REG_REDUNDANT: "sw-reg-redundant",
                TOKEN_SUBSCRIBE_FAILED: "token-subscribe-failed",
                TOKEN_SUBSCRIBE_NO_TOKEN: "token-subscribe-no-token",
                TOKEN_SUBSCRIBE_NO_PUSH_SET: "token-subscribe-no-push-set",
                TOKEN_UNSUBSCRIBE_FAILED: "token-unsubscribe-failed",
                TOKEN_UPDATE_FAILED: "token-update-failed",
                TOKEN_UPDATE_NO_TOKEN: "token-update-no-token",
                USE_SW_BEFORE_GET_TOKEN: "use-sw-before-get-token",
                INVALID_DELETE_TOKEN: "invalid-delete-token",
                DELETE_TOKEN_NOT_FOUND: "delete-token-not-found",
                DELETE_SCOPE_NOT_FOUND: "delete-scope-not-found",
                BG_HANDLER_FUNCTION_EXPECTED: "bg-handler-function-expected",
                NO_WINDOW_CLIENT_TO_MSG: "no-window-client-to-msg",
                UNABLE_TO_RESUBSCRIBE: "unable-to-resubscribe",
                NO_FCM_TOKEN_FOR_RESUBSCRIBE: "no-fcm-token-for-resubscribe",
                FAILED_TO_DELETE_TOKEN: "failed-to-delete-token",
                NO_SW_IN_REG: "no-sw-in-reg",
                BAD_SCOPE: "bad-scope",
                BAD_VAPID_KEY: "bad-vapid-key",
                BAD_SUBSCRIPTION: "bad-subscription",
                BAD_TOKEN: "bad-token",
                BAD_PUSH_SET: "bad-push-set",
                FAILED_DELETE_VAPID_KEY: "failed-delete-vapid-key",
                INVALID_PUBLIC_VAPID_KEY: "invalid-public-vapid-key",
                USE_PUBLIC_KEY_BEFORE_GET_TOKEN: "use-public-key-before-get-token",
                PUBLIC_KEY_DECRYPTION_FAILED: "public-vapid-key-decryption-failed"
            },
            v = ((l = {})[b.AVAILABLE_IN_WINDOW] = "This method is available in a Window context.", l[b.AVAILABLE_IN_SW] = "This method is available in a service worker context.", l[b.SHOULD_BE_INHERITED] = "This method should be overriden by extended classes.", l[b.BAD_SENDER_ID] = "Please ensure that 'messagingSenderId' is set correctly in the options passed into firebase.initializeApp().", l[b.PERMISSION_DEFAULT] = "The required permissions were not granted and dismissed instead.", l[b.PERMISSION_BLOCKED] = "The required permissions were not granted and blocked instead.", l[b.UNSUPPORTED_BROWSER] = "This browser doesn't support the API's required to use the firebase SDK.", l[b.NOTIFICATIONS_BLOCKED] = "Notifications have been blocked.", l[b.FAILED_DEFAULT_REGISTRATION] = "We are unable to register the default service worker. {$browserErrorMessage}", l[b.SW_REGISTRATION_EXPECTED] = "A service worker registration was the expected input.", l[b.GET_SUBSCRIPTION_FAILED] = "There was an error when trying to get any existing Push Subscriptions.", l[b.INVALID_SAVED_TOKEN] = "Unable to access details of the saved token.", l[b.SW_REG_REDUNDANT] = "The service worker being used for push was made redundant.", l[b.TOKEN_SUBSCRIBE_FAILED] = "A problem occured while subscribing the user to FCM: {$message}", l[b.TOKEN_SUBSCRIBE_NO_TOKEN] = "FCM returned no token when subscribing the user to push.", l[b.TOKEN_SUBSCRIBE_NO_PUSH_SET] = "FCM returned an invalid response when getting an FCM token.", l[b.TOKEN_UNSUBSCRIBE_FAILED] = "A problem occured while unsubscribing the user from FCM: {$message}", l[b.TOKEN_UPDATE_FAILED] = "A problem occured while updating the user from FCM: {$message}", l[b.TOKEN_UPDATE_NO_TOKEN] = "FCM returned no token when updating the user to push.", l[b.USE_SW_BEFORE_GET_TOKEN] = "The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.", l[b.INVALID_DELETE_TOKEN] = "You must pass a valid token into deleteToken(), i.e. the token from getToken().", l[b.DELETE_TOKEN_NOT_FOUND] = "The deletion attempt for token could not be performed as the token was not found.", l[b.DELETE_SCOPE_NOT_FOUND] = "The deletion attempt for service worker scope could not be performed as the scope was not found.", l[b.BG_HANDLER_FUNCTION_EXPECTED] = "The input to setBackgroundMessageHandler() must be a function.", l[b.NO_WINDOW_CLIENT_TO_MSG] = "An attempt was made to message a non-existant window client.", l[b.UNABLE_TO_RESUBSCRIBE] = "There was an error while re-subscribing the FCM token for push messaging. Will have to resubscribe the user on next visit. {$message}", l[b.NO_FCM_TOKEN_FOR_RESUBSCRIBE] = "Could not find an FCM token and as a result, unable to resubscribe. Will have to resubscribe the user on next visit.", l[b.FAILED_TO_DELETE_TOKEN] = "Unable to delete the currently saved token.", l[b.NO_SW_IN_REG] = "Even though the service worker registration was successful, there was a problem accessing the service worker itself.", l[b.INCORRECT_GCM_SENDER_ID] = "Please change your web app manifest's 'gcm_sender_id' value to '103953800507' to use Firebase messaging.", l[b.BAD_SCOPE] = "The service worker scope must be a string with at least one character.", l[b.BAD_VAPID_KEY] = "The public VAPID key is not a Uint8Array with 65 bytes.", l[b.BAD_SUBSCRIPTION] = "The subscription must be a valid PushSubscription.", l[b.BAD_TOKEN] = "The FCM Token used for storage / lookup was not a valid token string.", l[b.BAD_PUSH_SET] = "The FCM push set used for storage / lookup was not not a valid push set string.", l[b.FAILED_DELETE_VAPID_KEY] = "The VAPID key could not be deleted.", l[b.INVALID_PUBLIC_VAPID_KEY] = "The public VAPID key must be a string.", l[b.PUBLIC_KEY_DECRYPTION_FAILED] = "The public VAPID key did not equal 65 bytes when decrypted.", l),
            g = new h("messaging", "Messaging", v),
            T = new Uint8Array([4, 51, 148, 247, 223, 161, 235, 177, 220, 3, 162, 94, 21, 113, 219, 72, 211, 46, 237, 237, 178, 52, 219, 183, 71, 58, 12, 143, 196, 204, 225, 111, 60, 140, 132, 223, 171, 182, 102, 62, 242, 12, 212, 139, 254, 227, 249, 118, 47, 20, 28, 99, 8, 106, 111, 45, 177, 26, 149, 176, 206, 55, 192, 156, 110]),
            S = "https://fcm.googleapis.com";

        function y(e, t) {
            if (null == e || null == t) return !1;
            if (e === t) return !0;
            if (e.byteLength !== t.byteLength) return !1;
            for (var n = new DataView(e), r = new DataView(t), i = 0; i < e.byteLength; i++)
                if (n.getUint8(i) !== r.getUint8(i)) return !1;
            return !0
        }

        function I(e) {
            return function(e) {
                var t = new Uint8Array(e);
                return btoa(String.fromCharCode.apply(null, t))
            }(e).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
        }! function(e) {
            e.TYPE_OF_MSG = "firebase-messaging-msg-type", e.DATA = "firebase-messaging-msg-data"
        }(_ || (_ = {})),
        function(e) {
            e.PUSH_MSG_RECEIVED = "push-msg-received", e.NOTIFICATION_CLICKED = "notification-clicked"
        }(E || (E = {}));
        var D = function() {
            function e() {}
            return e.prototype.getToken = function(e, t, n) {
                return o(this, void 0, void 0, function() {
                    var r, i, o, a, c, u, h, f;
                    return s(this, function(s) {
                        switch (s.label) {
                            case 0:
                                r = I(t.getKey("p256dh")), i = I(t.getKey("auth")), o = "authorized_entity=" + e + "&endpoint=" + t.endpoint + "&encryption_key=" + r + "&encryption_auth=" + i, n !== T && (a = I(n), o += "&application_pub_key=" + a), (c = new Headers).append("Content-Type", "application/x-www-form-urlencoded"), u = {
                                    method: "POST",
                                    headers: c,
                                    body: o
                                }, s.label = 1;
                            case 1:
                                return s.trys.push([1, 4, , 5]), [4, fetch(S + "/fcm/connect/subscribe", u)];
                            case 2:
                                return [4, s.sent().json()];
                            case 3:
                                return h = s.sent(), [3, 5];
                            case 4:
                                throw s.sent(), g.create(b.TOKEN_SUBSCRIBE_FAILED);
                            case 5:
                                if (h.error) throw f = h.error.message, g.create(b.TOKEN_SUBSCRIBE_FAILED, {
                                    message: f
                                });
                                if (!h.token) throw g.create(b.TOKEN_SUBSCRIBE_NO_TOKEN);
                                if (!h.pushSet) throw g.create(b.TOKEN_SUBSCRIBE_NO_PUSH_SET);
                                return [2, {
                                    token: h.token,
                                    pushSet: h.pushSet
                                }]
                        }
                    })
                })
            }, e.prototype.updateToken = function(e, t, n, r, i) {
                return o(this, void 0, void 0, function() {
                    var o, a, c, u, h, f, d, p;
                    return s(this, function(s) {
                        switch (s.label) {
                            case 0:
                                o = I(r.getKey("p256dh")), a = I(r.getKey("auth")), c = "push_set=" + n + "&token=" + t + "&authorized_entity=" + e + "&endpoint=" + r.endpoint + "&encryption_key=" + o + "&encryption_auth=" + a, i !== T && (u = I(i), c += "&application_pub_key=" + u), (h = new Headers).append("Content-Type", "application/x-www-form-urlencoded"), f = {
                                    method: "POST",
                                    headers: h,
                                    body: c
                                }, s.label = 1;
                            case 1:
                                return s.trys.push([1, 4, , 5]), [4, fetch(S + "/fcm/connect/subscribe", f)];
                            case 2:
                                return [4, s.sent().json()];
                            case 3:
                                return d = s.sent(), [3, 5];
                            case 4:
                                throw s.sent(), g.create(b.TOKEN_UPDATE_FAILED);
                            case 5:
                                if (d.error) throw p = d.error.message, g.create(b.TOKEN_UPDATE_FAILED, {
                                    message: p
                                });
                                if (!d.token) throw g.create(b.TOKEN_UPDATE_NO_TOKEN);
                                return [2, d.token]
                        }
                    })
                })
            }, e.prototype.deleteToken = function(e, t, n) {
                return o(this, void 0, void 0, function() {
                    var r, i, o, a, c;
                    return s(this, function(s) {
                        switch (s.label) {
                            case 0:
                                r = "authorized_entity=" + e + "&token=" + t + "&pushSet=" + n, (i = new Headers).append("Content-Type", "application/x-www-form-urlencoded"), o = {
                                    method: "POST",
                                    headers: i,
                                    body: r
                                }, s.label = 1;
                            case 1:
                                return s.trys.push([1, 4, , 5]), [4, fetch(S + "/fcm/connect/unsubscribe", o)];
                            case 2:
                                return [4, s.sent().json()];
                            case 3:
                                if ((a = s.sent()).error) throw c = a.error.message, g.create(b.TOKEN_UNSUBSCRIBE_FAILED, {
                                    message: c
                                });
                                return [3, 5];
                            case 4:
                                throw s.sent(), g.create(b.TOKEN_UNSUBSCRIBE_FAILED);
                            case 5:
                                return [2]
                        }
                    })
                })
            }, e
        }();

        function m(e) {
            for (var t = (e + "=".repeat((4 - e.length % 4) % 4)).replace(/\-/g, "+").replace(/_/g, "/"), n = window.atob(t), r = new Uint8Array(n.length), i = 0; i < n.length; ++i) r[i] = n.charCodeAt(i);
            return r
        }
        var w = "undefined",
            N = "fcm_token_object_Store";

        function O() {
            var e = indexedDB.open(w);
            e.onerror = function(e) {}, e.onsuccess = function(t) {
                ! function(e) {
                    if (e.objectStoreNames.contains(N)) {
                        var t = e.transaction(N).objectStore(N),
                            n = new D,
                            r = t.openCursor();
                        r.onerror = function(e) {
                            void 0
                        }, r.onsuccess = function() {
                            var t = r.result;
                            if (t) {
                                var i = t.value;
                                n.deleteToken(i.fcmSenderId, i.fcmToken, i.fcmPushSet), t.continue()
                            } else e.close(), indexedDB.deleteDatabase(w)
                        }
                    }
                }(e.result)
            }
        }
        var k = function() {
            function e() {
                this.dbPromise = null
            }
            return e.prototype.get = function(e) {
                return this.createTransaction(function(t) {
                    return t.get(e)
                })
            }, e.prototype.getIndex = function(e, t) {
                return this.createTransaction(function(n) {
                    return n.index(e).get(t)
                })
            }, e.prototype.put = function(e) {
                return this.createTransaction(function(t) {
                    return t.put(e)
                }, "readwrite")
            }, e.prototype.delete = function(e) {
                return this.createTransaction(function(t) {
                    return t.delete(e)
                }, "readwrite")
            }, e.prototype.closeDatabase = function() {
                return o(this, void 0, void 0, function() {
                    return s(this, function(e) {
                        switch (e.label) {
                            case 0:
                                return this.dbPromise ? [4, this.dbPromise] : [3, 2];
                            case 1:
                                e.sent().close(), this.dbPromise = null, e.label = 2;
                            case 2:
                                return [2]
                        }
                    })
                })
            }, e.prototype.createTransaction = function(e, t) {
                return o(this, void 0, void 0, function() {
                    var n, r, i, o;
                    return s(this, function(s) {
                        switch (s.label) {
                            case 0:
                                return [4, this.getDb()];
                            case 1:
                                return n = s.sent(), r = n.transaction(this.objectStoreName, t), i = r.objectStore(this.objectStoreName), [4, function(e) {
                                    return new Promise(function(t, n) {
                                        e.onsuccess = function() {
                                            t(e.result)
                                        }, e.onerror = function() {
                                            n(e.error)
                                        }
                                    })
                                }(e(i))];
                            case 2:
                                return o = s.sent(), [2, new Promise(function(e, t) {
                                    r.oncomplete = function() {
                                        e(o)
                                    }, r.onerror = function() {
                                        t(r.error)
                                    }
                                })]
                        }
                    })
                })
            }, e.prototype.getDb = function() {
                var e = this;
                return this.dbPromise || (this.dbPromise = new Promise(function(t, n) {
                    var r = indexedDB.open(e.dbName, e.dbVersion);
                    r.onsuccess = function() {
                        t(r.result)
                    }, r.onerror = function() {
                        e.dbPromise = null, n(r.error)
                    }, r.onupgradeneeded = function(t) {
                        return e.onDbUpgrade(r, t)
                    }
                })), this.dbPromise
            }, e
        }();
        var A = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.dbName = "fcm_token_details_db", t.dbVersion = 3, t.objectStoreName = "fcm_token_object_Store", t
            }
            return r(t, e), t.prototype.onDbUpgrade = function(e, t) {
                var n = e.result;
                switch (t.oldVersion) {
                    case 0:
                        (r = n.createObjectStore(this.objectStoreName, {
                            keyPath: "swScope"
                        })).createIndex("fcmSenderId", "fcmSenderId", {
                            unique: !1
                        }), r.createIndex("fcmToken", "fcmToken", {
                            unique: !0
                        });
                    case 1:
                        O();
                    case 2:
                        var r, o = (r = e.transaction.objectStore(this.objectStoreName)).openCursor();
                        o.onsuccess = function() {
                            var e = o.result;
                            if (e) {
                                var t = e.value,
                                    n = i({}, t);
                                t.createTime || (n.createTime = Date.now()), "string" == typeof t.vapidKey && (n.vapidKey = m(t.vapidKey)), "string" == typeof t.auth && (n.auth = m(t.auth).buffer), "string" == typeof t.auth && (n.p256dh = m(t.p256dh).buffer), e.update(n), e.continue()
                            }
                        }
                }
            }, t.prototype.getTokenDetailsFromToken = function(e) {
                return o(this, void 0, void 0, function() {
                    return s(this, function(t) {
                        if (!e) throw g.create(b.BAD_TOKEN);
                        return P({
                            fcmToken: e
                        }), [2, this.getIndex("fcmToken", e)]
                    })
                })
            }, t.prototype.getTokenDetailsFromSWScope = function(e) {
                return o(this, void 0, void 0, function() {
                    return s(this, function(t) {
                        if (!e) throw g.create(b.BAD_SCOPE);
                        return P({
                            swScope: e
                        }), [2, this.get(e)]
                    })
                })
            }, t.prototype.saveTokenDetails = function(e) {
                return o(this, void 0, void 0, function() {
                    return s(this, function(t) {
                        if (!e.swScope) throw g.create(b.BAD_SCOPE);
                        if (!e.vapidKey) throw g.create(b.BAD_VAPID_KEY);
                        if (!e.endpoint || !e.auth || !e.p256dh) throw g.create(b.BAD_SUBSCRIPTION);
                        if (!e.fcmSenderId) throw g.create(b.BAD_SENDER_ID);
                        if (!e.fcmToken) throw g.create(b.BAD_TOKEN);
                        if (!e.fcmPushSet) throw g.create(b.BAD_PUSH_SET);
                        return P(e), [2, this.put(e)]
                    })
                })
            }, t.prototype.deleteToken = function(e) {
                return o(this, void 0, void 0, function() {
                    var t;
                    return s(this, function(n) {
                        switch (n.label) {
                            case 0:
                                return "string" != typeof e || 0 === e.length ? [2, Promise.reject(g.create(b.INVALID_DELETE_TOKEN))] : [4, this.getTokenDetailsFromToken(e)];
                            case 1:
                                if (!(t = n.sent())) throw g.create(b.DELETE_TOKEN_NOT_FOUND);
                                return [4, this.delete(t.swScope)];
                            case 2:
                                return n.sent(), [2, t]
                        }
                    })
                })
            }, t
        }(k);

        function P(e) {
            if (e.fcmToken && ("string" != typeof e.fcmToken || 0 === e.fcmToken.length)) throw g.create(b.BAD_TOKEN);
            if (e.swScope && ("string" != typeof e.swScope || 0 === e.swScope.length)) throw g.create(b.BAD_SCOPE);
            if (e.vapidKey && (!(e.vapidKey instanceof Uint8Array) || 65 !== e.vapidKey.length)) throw g.create(b.BAD_VAPID_KEY);
            if (e.endpoint && ("string" != typeof e.endpoint || 0 === e.endpoint.length)) throw g.create(b.BAD_SUBSCRIPTION);
            if (e.auth && !(e.auth instanceof ArrayBuffer)) throw g.create(b.BAD_SUBSCRIPTION);
            if (e.p256dh && !(e.p256dh instanceof ArrayBuffer)) throw g.create(b.BAD_SUBSCRIPTION);
            if (e.fcmSenderId && ("string" != typeof e.fcmSenderId || 0 === e.fcmSenderId.length)) throw g.create(b.BAD_SENDER_ID);
            if (e.fcmPushSet && ("string" != typeof e.fcmPushSet || 0 === e.fcmPushSet.length)) throw g.create(b.BAD_PUSH_SET)
        }
        var C = function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.dbName = "fcm_vapid_details_db", t.dbVersion = 1, t.objectStoreName = "fcm_vapid_object_Store", t
                }
                return r(t, e), t.prototype.onDbUpgrade = function(e) {
                    e.result.createObjectStore(this.objectStoreName, {
                        keyPath: "swScope"
                    })
                }, t.prototype.getVapidFromSWScope = function(e) {
                    return o(this, void 0, void 0, function() {
                        var t;
                        return s(this, function(n) {
                            switch (n.label) {
                                case 0:
                                    if ("string" != typeof e || 0 === e.length) throw g.create(b.BAD_SCOPE);
                                    return [4, this.get(e)];
                                case 1:
                                    return [2, (t = n.sent()) ? t.vapidKey : void 0]
                            }
                        })
                    })
                }, t.prototype.saveVapidDetails = function(e, t) {
                    return o(this, void 0, void 0, function() {
                        var n;
                        return s(this, function(r) {
                            if ("string" != typeof e || 0 === e.length) throw g.create(b.BAD_SCOPE);
                            if (null === t || 65 !== t.length) throw g.create(b.BAD_VAPID_KEY);
                            return n = {
                                swScope: e,
                                vapidKey: t
                            }, [2, this.put(n)]
                        })
                    })
                }, t.prototype.deleteVapidDetails = function(e) {
                    return o(this, void 0, void 0, function() {
                        var t;
                        return s(this, function(n) {
                            switch (n.label) {
                                case 0:
                                    return [4, this.getVapidFromSWScope(e)];
                                case 1:
                                    if (!(t = n.sent())) throw g.create(b.DELETE_SCOPE_NOT_FOUND);
                                    return [4, this.delete(e)];
                                case 2:
                                    return n.sent(), [2, t]
                            }
                        })
                    })
                }, t
            }(k),
            B = "messagingSenderId",
            R = function() {
                function e(e) {
                    var t = this;
                    if (!e.options[B] || "string" != typeof e.options[B]) throw g.create(b.BAD_SENDER_ID);
                    this.messagingSenderId = e.options[B], this.tokenDetailsModel = new A, this.vapidDetailsModel = new C, this.iidModel = new D, this.app = e, this.INTERNAL = {
                        delete: function() {
                            return t.delete()
                        }
                    }
                }
                return e.prototype.getToken = function() {
                    return o(this, void 0, void 0, function() {
                        var e, t, n, r, i;
                        return s(this, function(o) {
                            switch (o.label) {
                                case 0:
                                    return "granted" !== (e = this.getNotificationPermission_()) ? "denied" === e ? [2, Promise.reject(g.create(b.NOTIFICATIONS_BLOCKED))] : [2, Promise.resolve(null)] : [4, this.getSWRegistration_()];
                                case 1:
                                    return t = o.sent(), [4, this.getPublicVapidKey_()];
                                case 2:
                                    return n = o.sent(), [4, this.getPushSubscription(t, n)];
                                case 3:
                                    return r = o.sent(), [4, this.tokenDetailsModel.getTokenDetailsFromSWScope(t.scope)];
                                case 4:
                                    return (i = o.sent()) ? [2, this.manageExistingToken(t, r, n, i)] : [2, this.getNewToken(t, r, n)]
                            }
                        })
                    })
                }, e.prototype.manageExistingToken = function(e, t, n, r) {
                    return o(this, void 0, void 0, function() {
                        return s(this, function(i) {
                            switch (i.label) {
                                case 0:
                                    return function(e, t, n) {
                                        if (!y(t.buffer, n.vapidKey.buffer)) return !1;
                                        var r = e.endpoint === n.endpoint,
                                            i = y(e.getKey("auth"), n.auth),
                                            o = y(e.getKey("p256dh"), n.p256dh);
                                        return r && i && o
                                    }(t, n, r) ? Date.now() < r.createTime + 6048e5 ? [2, r.fcmToken] : [2, this.updateToken(e, t, n, r)] : [4, this.deleteTokenFromDB(r.fcmToken)];
                                case 1:
                                    return i.sent(), [2, this.getNewToken(e, t, n)]
                            }
                        })
                    })
                }, e.prototype.updateToken = function(e, t, n, r) {
                    return o(this, void 0, void 0, function() {
                        var i, o, a;
                        return s(this, function(s) {
                            switch (s.label) {
                                case 0:
                                    return s.trys.push([0, 4, , 6]), [4, this.iidModel.updateToken(this.messagingSenderId, r.fcmToken, r.fcmPushSet, t, n)];
                                case 1:
                                    return i = s.sent(), o = {
                                        swScope: e.scope,
                                        vapidKey: n,
                                        fcmSenderId: this.messagingSenderId,
                                        fcmToken: i,
                                        fcmPushSet: r.fcmPushSet,
                                        createTime: Date.now(),
                                        endpoint: t.endpoint,
                                        auth: t.getKey("auth"),
                                        p256dh: t.getKey("p256dh")
                                    }, [4, this.tokenDetailsModel.saveTokenDetails(o)];
                                case 2:
                                    return s.sent(), [4, this.vapidDetailsModel.saveVapidDetails(e.scope, n)];
                                case 3:
                                    return s.sent(), [2, i];
                                case 4:
                                    return a = s.sent(), [4, this.deleteToken(r.fcmToken)];
                                case 5:
                                    throw s.sent(), a;
                                case 6:
                                    return [2]
                            }
                        })
                    })
                }, e.prototype.getNewToken = function(e, t, n) {
                    return o(this, void 0, void 0, function() {
                        var r, i;
                        return s(this, function(o) {
                            switch (o.label) {
                                case 0:
                                    return [4, this.iidModel.getToken(this.messagingSenderId, t, n)];
                                case 1:
                                    return r = o.sent(), i = {
                                        swScope: e.scope,
                                        vapidKey: n,
                                        fcmSenderId: this.messagingSenderId,
                                        fcmToken: r.token,
                                        fcmPushSet: r.pushSet,
                                        createTime: Date.now(),
                                        endpoint: t.endpoint,
                                        auth: t.getKey("auth"),
                                        p256dh: t.getKey("p256dh")
                                    }, [4, this.tokenDetailsModel.saveTokenDetails(i)];
                                case 2:
                                    return o.sent(), [4, this.vapidDetailsModel.saveVapidDetails(e.scope, n)];
                                case 3:
                                    return o.sent(), [2, r.token]
                            }
                        })
                    })
                }, e.prototype.deleteToken = function(e) {
                    return o(this, void 0, void 0, function() {
                        var t, n;
                        return s(this, function(r) {
                            switch (r.label) {
                                case 0:
                                    return [4, this.deleteTokenFromDB(e)];
                                case 1:
                                    return r.sent(), [4, this.getSWRegistration_()];
                                case 2:
                                    return (t = r.sent()) ? [4, t.pushManager.getSubscription()] : [3, 4];
                                case 3:
                                    if (n = r.sent()) return [2, n.unsubscribe()];
                                    r.label = 4;
                                case 4:
                                    return [2, !0]
                            }
                        })
                    })
                }, e.prototype.deleteTokenFromDB = function(e) {
                    return o(this, void 0, void 0, function() {
                        var t;
                        return s(this, function(n) {
                            switch (n.label) {
                                case 0:
                                    return [4, this.tokenDetailsModel.deleteToken(e)];
                                case 1:
                                    return t = n.sent(), [4, this.iidModel.deleteToken(t.fcmSenderId, t.fcmToken, t.fcmPushSet)];
                                case 2:
                                    return n.sent(), [2]
                            }
                        })
                    })
                }, e.prototype.getPushSubscription = function(e, t) {
                    return e.pushManager.getSubscription().then(function(n) {
                        return n || e.pushManager.subscribe({
                            userVisibleOnly: !0,
                            applicationServerKey: t
                        })
                    })
                }, e.prototype.requestPermission = function() {
                    throw g.create(b.AVAILABLE_IN_WINDOW)
                }, e.prototype.useServiceWorker = function(e) {
                    throw g.create(b.AVAILABLE_IN_WINDOW)
                }, e.prototype.usePublicVapidKey = function(e) {
                    throw g.create(b.AVAILABLE_IN_WINDOW)
                }, e.prototype.onMessage = function(e, t, n) {
                    throw g.create(b.AVAILABLE_IN_WINDOW)
                }, e.prototype.onTokenRefresh = function(e, t, n) {
                    throw g.create(b.AVAILABLE_IN_WINDOW)
                }, e.prototype.setBackgroundMessageHandler = function(e) {
                    throw g.create(b.AVAILABLE_IN_SW)
                }, e.prototype.delete = function() {
                    return o(this, void 0, void 0, function() {
                        return s(this, function(e) {
                            switch (e.label) {
                                case 0:
                                    return [4, Promise.all([this.tokenDetailsModel.closeDatabase(), this.vapidDetailsModel.closeDatabase()])];
                                case 1:
                                    return e.sent(), [2]
                            }
                        })
                    })
                }, e.prototype.getNotificationPermission_ = function() {
                    return Notification.permission
                }, e.prototype.getTokenDetailsModel = function() {
                    return this.tokenDetailsModel
                }, e.prototype.getVapidDetailsModel = function() {
                    return this.vapidDetailsModel
                }, e.prototype.getIIDModel = function() {
                    return this.iidModel
                }, e
            }();
        var U = function(e) {
            function t(t) {
                var n = e.call(this, t) || this;
                return n.bgMessageHandler = null, self.addEventListener("push", function(e) {
                    n.onPush(e)
                }), self.addEventListener("pushsubscriptionchange", function(e) {
                    n.onSubChange(e)
                }), self.addEventListener("notificationclick", function(e) {
                    n.onNotificationClick(e)
                }), n
            }
            return r(t, e), t.prototype.onPush = function(e) {
                e.waitUntil(this.onPush_(e))
            }, t.prototype.onSubChange = function(e) {
                e.waitUntil(this.onSubChange_(e))
            }, t.prototype.onNotificationClick = function(e) {
                e.waitUntil(this.onNotificationClick_(e))
            }, t.prototype.onPush_ = function(e) {
                return o(this, void 0, void 0, function() {
                    var t, n, r;
                    return s(this, function(i) {
                        switch (i.label) {
                            case 0:
                                if (!e.data) return [2];
                                try {
                                    t = e.data.json()
                                } catch (e) {
                                    return [2]
                                }
                                return [4, this.hasVisibleClients_()];
                            case 1:
                                return i.sent() ? t.notification || this.bgMessageHandler ? [2, this.sendMessageToWindowClients_(t)] : [2] : (n = this.getNotificationData_(t)) ? (r = n.title || "", [4, this.getSWRegistration_()]) : [3, 3];
                            case 2:
                                return [2, i.sent().showNotification(r, n)];
                            case 3:
                                return this.bgMessageHandler ? [4, this.bgMessageHandler(t)] : [3, 5];
                            case 4:
                                return i.sent(), [2];
                            case 5:
                                return [2]
                        }
                    })
                })
            }, t.prototype.onSubChange_ = function(e) {
                return o(this, void 0, void 0, function() {
                    var e, t, n, r;
                    return s(this, function(i) {
                        switch (i.label) {
                            case 0:
                                return i.trys.push([0, 2, , 3]), [4, this.getSWRegistration_()];
                            case 1:
                                return e = i.sent(), [3, 3];
                            case 2:
                                throw t = i.sent(), g.create(b.UNABLE_TO_RESUBSCRIBE, {
                                    message: t
                                });
                            case 3:
                                return i.trys.push([3, 5, , 8]), [4, e.pushManager.getSubscription()];
                            case 4:
                                return i.sent(), [3, 8];
                            case 5:
                                return n = i.sent(), [4, this.getTokenDetailsModel().getTokenDetailsFromSWScope(e.scope)];
                            case 6:
                                if (!(r = i.sent())) throw n;
                                return [4, this.deleteToken(r.fcmToken)];
                            case 7:
                                throw i.sent(), n;
                            case 8:
                                return [2]
                        }
                    })
                })
            }, t.prototype.onNotificationClick_ = function(e) {
                return o(this, void 0, void 0, function() {
                    var t, n, r, i;
                    return s(this, function(o) {
                        switch (o.label) {
                            case 0:
                                return e.notification && e.notification.data && e.notification.data.FCM_MSG ? (e.stopImmediatePropagation(), e.notification.close(), (t = e.notification.data.FCM_MSG).notification && (n = t.notification.click_action) ? [4, this.getWindowClient_(n)] : [2]) : [2];
                            case 1:
                                return (r = o.sent()) ? [3, 3] : [4, self.clients.openWindow(n)];
                            case 2:
                                return r = o.sent(), [3, 5];
                            case 3:
                                return [4, r.focus()];
                            case 4:
                                r = o.sent(), o.label = 5;
                            case 5:
                                return r ? (delete t.notification, i = K(E.NOTIFICATION_CLICKED, t), [2, this.attemptToMessageClient_(r, i)]) : [2]
                        }
                    })
                })
            }, t.prototype.getNotificationData_ = function(e) {
                if (e && "object" == typeof e.notification) {
                    var t, n = i({}, e.notification);
                    return n.data = ((t = {}).FCM_MSG = e, t), n
                }
            }, t.prototype.setBackgroundMessageHandler = function(e) {
                if (!e || "function" != typeof e) throw g.create(b.BG_HANDLER_FUNCTION_EXPECTED);
                this.bgMessageHandler = e
            }, t.prototype.getWindowClient_ = function(e) {
                return o(this, void 0, void 0, function() {
                    var t, n, r, i;
                    return s(this, function(o) {
                        switch (o.label) {
                            case 0:
                                return t = new URL(e, self.location.href).href, [4, L()];
                            case 1:
                                for (n = o.sent(), r = null, i = 0; i < n.length; i++)
                                    if (new URL(n[i].url, self.location.href).href === t) {
                                        r = n[i];
                                        break
                                    } return [2, r]
                        }
                    })
                })
            }, t.prototype.attemptToMessageClient_ = function(e, t) {
                return o(this, void 0, void 0, function() {
                    return s(this, function(n) {
                        if (!e) throw g.create(b.NO_WINDOW_CLIENT_TO_MSG);
                        return e.postMessage(t), [2]
                    })
                })
            }, t.prototype.hasVisibleClients_ = function() {
                return o(this, void 0, void 0, function() {
                    return s(this, function(e) {
                        switch (e.label) {
                            case 0:
                                return [4, L()];
                            case 1:
                                return [2, e.sent().some(function(e) {
                                    return "visible" === e.visibilityState
                                })]
                        }
                    })
                })
            }, t.prototype.sendMessageToWindowClients_ = function(e) {
                return o(this, void 0, void 0, function() {
                    var t, n, r = this;
                    return s(this, function(i) {
                        switch (i.label) {
                            case 0:
                                return [4, L()];
                            case 1:
                                return t = i.sent(), n = K(E.PUSH_MSG_RECEIVED, e), [4, Promise.all(t.map(function(e) {
                                    return r.attemptToMessageClient_(e, n)
                                }))];
                            case 2:
                                return i.sent(), [2]
                        }
                    })
                })
            }, t.prototype.getSWRegistration_ = function() {
                return o(this, void 0, void 0, function() {
                    return s(this, function(e) {
                        return [2, self.registration]
                    })
                })
            }, t.prototype.getPublicVapidKey_ = function() {
                return o(this, void 0, void 0, function() {
                    var e, t;
                    return s(this, function(n) {
                        switch (n.label) {
                            case 0:
                                return [4, this.getSWRegistration_()];
                            case 1:
                                if (!(e = n.sent())) throw g.create(b.SW_REGISTRATION_EXPECTED);
                                return [4, this.getVapidDetailsModel().getVapidFromSWScope(e.scope)];
                            case 2:
                                return null == (t = n.sent()) ? [2, T] : [2, t]
                        }
                    })
                })
            }, t
        }(R);

        function L() {
            return self.clients.matchAll({
                type: "window",
                includeUncontrolled: !0
            })
        }

        function K(e, t) {
            return (n = {})[_.TYPE_OF_MSG] = e, n[_.DATA] = t, n;
            var n
        }
        var M = function(e) {
            function t(t) {
                var n = e.call(this, t) || this;
                return n.registrationToUse = null, n.publicVapidKeyToUse = null, n.manifestCheckPromise = null, n.messageObserver = null, n.tokenRefreshObserver = null, n.onMessageInternal = f(function(e) {
                    n.messageObserver = e
                }), n.onTokenRefreshInternal = f(function(e) {
                    n.tokenRefreshObserver = e
                }), n.setupSWMessageListener_(), n
            }
            return r(t, e), t.prototype.getToken = function() {
                var t = this;
                return this.isSupported_() ? this.manifestCheck_().then(function() {
                    return e.prototype.getToken.call(t)
                }) : Promise.reject(g.create(b.UNSUPPORTED_BROWSER))
            }, t.prototype.manifestCheck_ = function() {
                if (this.manifestCheckPromise) return this.manifestCheckPromise;
                var e = document.querySelector('link[rel="manifest"]');
                return this.manifestCheckPromise = e ? fetch(e.href).then(function(e) {
                    return e.json()
                }).catch(function() {}).then(function(e) {
                    if (e && e.gcm_sender_id && "103953800507" !== e.gcm_sender_id) throw g.create(b.INCORRECT_GCM_SENDER_ID)
                }) : Promise.resolve(), this.manifestCheckPromise
            }, t.prototype.requestPermission = function() {
                return o(this, void 0, void 0, function() {
                    return s(this, function(e) {
                        return "granted" === Notification.permission ? [2] : [2, new Promise(function(e, t) {
                            var n = function(n) {
                                    return "granted" === n ? e() : t("denied" === n ? g.create(b.PERMISSION_BLOCKED) : g.create(b.PERMISSION_DEFAULT))
                                },
                                r = Notification.requestPermission(n);
                            r && r.then(n)
                        })]
                    })
                })
            }, t.prototype.useServiceWorker = function(e) {
                if (!(e instanceof ServiceWorkerRegistration)) throw g.create(b.SW_REGISTRATION_EXPECTED);
                if (null != this.registrationToUse) throw g.create(b.USE_SW_BEFORE_GET_TOKEN);
                this.registrationToUse = e
            }, t.prototype.usePublicVapidKey = function(e) {
                if ("string" != typeof e) throw g.create(b.INVALID_PUBLIC_VAPID_KEY);
                if (null != this.publicVapidKeyToUse) throw g.create(b.USE_PUBLIC_KEY_BEFORE_GET_TOKEN);
                var t = m(e);
                if (65 !== t.length) throw g.create(b.PUBLIC_KEY_DECRYPTION_FAILED);
                this.publicVapidKeyToUse = t
            }, t.prototype.onMessage = function(e, t, n) {
                return "function" == typeof e ? this.onMessageInternal(e, t, n) : this.onMessageInternal(e)
            }, t.prototype.onTokenRefresh = function(e, t, n) {
                return "function" == typeof e ? this.onTokenRefreshInternal(e, t, n) : this.onTokenRefreshInternal(e)
            }, t.prototype.waitForRegistrationToActivate_ = function(e) {
                var t = e.installing || e.waiting || e.active;
                return new Promise(function(n, r) {
                    if (t)
                        if ("activated" !== t.state)
                            if ("redundant" !== t.state) {
                                var i = function() {
                                    if ("activated" === t.state) n(e);
                                    else {
                                        if ("redundant" !== t.state) return;
                                        r(g.create(b.SW_REG_REDUNDANT))
                                    }
                                    t.removeEventListener("statechange", i)
                                };
                                t.addEventListener("statechange", i)
                            } else r(g.create(b.SW_REG_REDUNDANT));
                    else n(e);
                    else r(g.create(b.NO_SW_IN_REG))
                })
            }, t.prototype.getSWRegistration_ = function() {
                var e = this;
                return this.registrationToUse ? this.waitForRegistrationToActivate_(this.registrationToUse) : (this.registrationToUse = null, navigator.serviceWorker.register("/sp-push-worker-fb.js", {
                    scope: "/sendpulse-fb-messaging-push-scope"
                }).catch(function(e) {
                    throw g.create(b.FAILED_DEFAULT_REGISTRATION, {
                        browserErrorMessage: e.message
                    })
                }).then(function(t) {
                    return e.waitForRegistrationToActivate_(t).then(function() {
                        return e.registrationToUse = t, t.update(), t
                    })
                }))
            }, t.prototype.getPublicVapidKey_ = function() {
                return this.publicVapidKeyToUse ? Promise.resolve(this.publicVapidKeyToUse) : Promise.resolve(T)
            }, t.prototype.setupSWMessageListener_ = function() {
                var e = this;
                "serviceWorker" in navigator && navigator.serviceWorker.addEventListener("message", function(t) {
                    if (t.data && t.data[_.TYPE_OF_MSG]) {
                        var n = t.data;
                        switch (n[_.TYPE_OF_MSG]) {
                            case E.PUSH_MSG_RECEIVED:
                            case E.NOTIFICATION_CLICKED:
                                var r = n[_.DATA];
                                e.messageObserver && e.messageObserver.next(r)
                        }
                    }
                }, !1)
            }, t.prototype.isSupported_ = function() {
                return "serviceWorker" in navigator && "PushManager" in window && "Notification" in window && "fetch" in window && ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification") && PushSubscription.prototype.hasOwnProperty("getKey")
            }, t
        }(R);
        F = {
            Messaging: M
        }, t.INTERNAL.registerService("messaging", function(e) {
            return self && "ServiceWorkerGlobalScope" in self ? new U(e) : new M(e)
        }, F);
        return {}
    } catch (e) {
        throw void 0, new Error("Cannot instantiate firebase-messaging - be sure to load firebase-app.js first.")
    }
    var F
}(this.firebase = this.firebase || {}, firebase);
! function(i, s) {
    "use strict";
    var e = "function",
        o = "object",
        r = "model",
        n = "name",
        a = "type",
        d = "vendor",
        t = "version",
        l = "architecture",
        w = "console",
        u = "mobile",
        c = "tablet",
        m = "smarttv",
        b = "wearable",
        p = {
            extend: function(i, s) {
                var e = {};
                for (var o in i) s[o] && s[o].length % 2 == 0 ? e[o] = s[o].concat(i[o]) : e[o] = i[o];
                return e
            },
            has: function(i, s) {
                return "string" == typeof i && -1 !== s.toLowerCase().indexOf(i.toLowerCase())
            },
            lowerize: function(i) {
                return i.toLowerCase()
            },
            major: function(i) {
                return "string" == typeof i ? i.replace(/[^\d\.]/g, "").split(".")[0] : s
            },
            trim: function(i) {
                return i.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
            }
        },
        g = {
            rgx: function(i, r) {
                for (var n, a, d, t, l, w, u = 0; u < r.length && !l;) {
                    var c = r[u],
                        m = r[u + 1];
                    for (n = a = 0; n < c.length && !l;)
                        if (l = c[n++].exec(i))
                            for (d = 0; d < m.length; d++) w = l[++a], typeof(t = m[d]) === o && t.length > 0 ? 2 == t.length ? typeof t[1] == e ? this[t[0]] = t[1].call(this, w) : this[t[0]] = t[1] : 3 == t.length ? typeof t[1] !== e || t[1].exec && t[1].test ? this[t[0]] = w ? w.replace(t[1], t[2]) : s : this[t[0]] = w ? t[1].call(this, w, t[2]) : s : 4 == t.length && (this[t[0]] = w ? t[3].call(this, w.replace(t[1], t[2])) : s) : this[t] = w || s;
                    u += 2
                }
            },
            str: function(i, e) {
                for (var r in e)
                    if (typeof e[r] === o && e[r].length > 0) {
                        for (var n = 0; n < e[r].length; n++)
                            if (p.has(e[r][n], i)) return "?" === r ? s : r
                    } else if (p.has(e[r], i)) return "?" === r ? s : r;
                return i
            }
        },
        h = {
            browser: {
                oldsafari: {
                    version: {
                        "1.0": "/8",
                        1.2: "/1",
                        1.3: "/3",
                        "2.0": "/412",
                        "2.0.2": "/416",
                        "2.0.3": "/417",
                        "2.0.4": "/419",
                        "?": "/"
                    }
                }
            },
            device: {
                amazon: {
                    model: {
                        "Fire Phone": ["SD", "KF"]
                    }
                },
                sprint: {
                    model: {
                        "Evo Shift 4G": "7373KT"
                    },
                    vendor: {
                        HTC: "APA",
                        Sprint: "Sprint"
                    }
                }
            },
            os: {
                windows: {
                    version: {
                        ME: "4.90",
                        "NT 3.11": "NT3.51",
                        "NT 4.0": "NT4.0",
                        2e3: "NT 5.0",
                        XP: ["NT 5.1", "NT 5.2"],
                        Vista: "NT 6.0",
                        7: "NT 6.1",
                        8: "NT 6.2",
                        8.1: "NT 6.3",
                        10: ["NT 6.4", "NT 10.0"],
                        RT: "ARM"
                    }
                }
            }
        },
        f = {
            browser: [
                [/(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, /(opera).+version\/([\w\.]+)/i, /(opera)[\/\s]+([\w\.]+)/i],
                [n, t],
                [/(opios)[\/\s]+([\w\.]+)/i],
                [
                    [n, "Opera Mini"], t
                ],
                [/\s(opr)\/([\w\.]+)/i],
                [
                    [n, "Opera"], t
                ],
                [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i, /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i, /(?:ms|\()(ie)\s([\w\.]+)/i, /(rekonq)\/([\w\.]*)/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark)\/([\w\.-]+)/i],
                [n, t],
                [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],
                [
                    [n, "IE"], t
                ],
                [/(edge|edgios|edgea)\/((\d+)?[\w\.]+)/i],
                [
                    [n, "Edge"], t
                ],
                [/(yabrowser)\/([\w\.]+)/i],
                [
                    [n, "Yandex"], t
                ],
                [/(puffin)\/([\w\.]+)/i],
                [
                    [n, "Puffin"], t
                ],
                [/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i],
                [
                    [n, "UCBrowser"], t
                ],
                [/(comodo_dragon)\/([\w\.]+)/i],
                [
                    [n, /_/g, " "], t
                ],
                [/(micromessenger)\/([\w\.]+)/i],
                [
                    [n, "WeChat"], t
                ],
                [/(qqbrowserlite)\/([\w\.]+)/i],
                [n, t],
                [/(QQ)\/([\d\.]+)/i],
                [n, t],
                [/m?(qqbrowser)[\/\s]?([\w\.]+)/i],
                [n, t],
                [/(BIDUBrowser)[\/\s]?([\w\.]+)/i],
                [n, t],
                [/(2345Explorer)[\/\s]?([\w\.]+)/i],
                [n, t],
                [/(MetaSr)[\/\s]?([\w\.]+)/i],
                [n],
                [/(LBBROWSER)/i],
                [n],
                [/xiaomi\/miuibrowser\/([\w\.]+)/i],
                [t, [n, "MIUI Browser"]],
                [/;fbav\/([\w\.]+);/i],
                [t, [n, "Facebook"]],
                [/safari\s(line)\/([\w\.]+)/i, /android.+(line)\/([\w\.]+)\/iab/i],
                [n, t],
                [/headlesschrome(?:\/([\w\.]+)|\s)/i],
                [t, [n, "Chrome Headless"]],
                [/\swv\).+(chrome)\/([\w\.]+)/i],
                [
                    [n, /(.+)/, "$1 WebView"], t
                ],
                [/((?:oculus|samsung)browser)\/([\w\.]+)/i],
                [
                    [n, /(.+(?:g|us))(.+)/, "$1 $2"], t
                ],
                [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i],
                [t, [n, "Android Browser"]],
                [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i],
                [n, t],
                [/(dolfin)\/([\w\.]+)/i],
                [
                    [n, "Dolphin"], t
                ],
                [/((?:android.+)crmo|crios)\/([\w\.]+)/i],
                [
                    [n, "Chrome"], t
                ],
                [/(coast)\/([\w\.]+)/i],
                [
                    [n, "Opera Coast"], t
                ],
                [/fxios\/([\w\.-]+)/i],
                [t, [n, "Firefox"]],
                [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],
                [t, [n, "Mobile Safari"]],
                [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],
                [t, n],
                [/webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
                [
                    [n, "GSA"], t
                ],
                [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
                [n, [t, g.str, h.browser.oldsafari.version]],
                [/(konqueror)\/([\w\.]+)/i, /(webkit|khtml)\/([\w\.]+)/i],
                [n, t],
                [/(navigator|netscape)\/([\w\.-]+)/i],
                [
                    [n, "Netscape"], t
                ],
                [/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i, /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i, /(links)\s\(([\w\.]+)/i, /(gobrowser)\/?([\w\.]*)/i, /(ice\s?browser)\/v?([\w\._]+)/i, /(mosaic)[\/\s]([\w\.]+)/i],
                [n, t]
            ],
            cpu: [
                [/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],
                [
                    [l, "amd64"]
                ],
                [/(ia32(?=;))/i],
                [
                    [l, p.lowerize]
                ],
                [/((?:i[346]|x)86)[;\)]/i],
                [
                    [l, "ia32"]
                ],
                [/windows\s(ce|mobile);\sppc;/i],
                [
                    [l, "arm"]
                ],
                [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],
                [
                    [l, /ower/, "", p.lowerize]
                ],
                [/(sun4\w)[;\)]/i],
                [
                    [l, "sparc"]
                ],
                [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i],
                [
                    [l, p.lowerize]
                ]
            ],
            device: [
                [/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],
                [r, d, [a, c]],
                [/applecoremedia\/[\w\.]+ \((ipad)/],
                [r, [d, "Apple"],
                    [a, c]
                ],
                [/(apple\s{0,1}tv)/i],
                [
                    [r, "Apple TV"],
                    [d, "Apple"]
                ],
                [/(archos)\s(gamepad2?)/i, /(hp).+(touchpad)/i, /(hp).+(tablet)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i],
                [d, r, [a, c]],
                [/(kf[A-z]+)\sbuild\/.+silk\//i],
                [r, [d, "Amazon"],
                    [a, c]
                ],
                [/(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i],
                [
                    [r, g.str, h.device.amazon.model],
                    [d, "Amazon"],
                    [a, u]
                ],
                [/android.+aft([bms])\sbuild/i],
                [r, [d, "Amazon"],
                    [a, m]
                ],
                [/\((ip[honed|\s\w*]+);.+(apple)/i],
                [r, d, [a, u]],
                [/\((ip[honed|\s\w*]+);/i],
                [r, [d, "Apple"],
                    [a, u]
                ],
                [/(blackberry)[\s-]?(\w+)/i, /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i],
                [d, r, [a, u]],
                [/\(bb10;\s(\w+)/i],
                [r, [d, "BlackBerry"],
                    [a, u]
                ],
                [/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i],
                [r, [d, "Asus"],
                    [a, c]
                ],
                [/(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i],
                [
                    [d, "Sony"],
                    [r, "Xperia Tablet"],
                    [a, c]
                ],
                [/android.+\s([c-g]\d{4}|so[-l]\w+)\sbuild\//i],
                [r, [d, "Sony"],
                    [a, u]
                ],
                [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i],
                [d, r, [a, w]],
                [/android.+;\s(shield)\sbuild/i],
                [r, [d, "Nvidia"],
                    [a, w]
                ],
                [/(playstation\s[34portablevi]+)/i],
                [r, [d, "Sony"],
                    [a, w]
                ],
                [/(sprint\s(\w+))/i],
                [
                    [d, g.str, h.device.sprint.vendor],
                    [r, g.str, h.device.sprint.model],
                    [a, u]
                ],
                [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i],
                [d, r, [a, c]],
                [/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, /(zte)-(\w*)/i, /(alcatel|geeksphone|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i],
                [d, [r, /_/g, " "],
                    [a, u]
                ],
                [/(nexus\s9)/i],
                [r, [d, "HTC"],
                    [a, c]
                ],
                [/d\/huawei([\w\s-]+)[;\)]/i, /(nexus\s6p)/i],
                [r, [d, "Huawei"],
                    [a, u]
                ],
                [/(microsoft);\s(lumia[\s\w]+)/i],
                [d, r, [a, u]],
                [/[\s\(;](xbox(?:\sone)?)[\s\);]/i],
                [r, [d, "Microsoft"],
                    [a, w]
                ],
                [/(kin\.[onetw]{3})/i],
                [
                    [r, /\./g, " "],
                    [d, "Microsoft"],
                    [a, u]
                ],
                [/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i, /mot[\s-]?(\w*)/i, /(XT\d{3,4}) build\//i, /(nexus\s6)/i],
                [r, [d, "Motorola"],
                    [a, u]
                ],
                [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],
                [r, [d, "Motorola"],
                    [a, c]
                ],
                [/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i],
                [
                    [d, p.trim],
                    [r, p.trim],
                    [a, m]
                ],
                [/hbbtv.+maple;(\d+)/i],
                [
                    [r, /^/, "SmartTV"],
                    [d, "Samsung"],
                    [a, m]
                ],
                [/\(dtv[\);].+(aquos)/i],
                [r, [d, "Sharp"],
                    [a, m]
                ],
                [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i],
                [
                    [d, "Samsung"], r, [a, c]
                ],
                [/smart-tv.+(samsung)/i],
                [d, [a, m], r],
                [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i, /sec-((sgh\w+))/i],
                [
                    [d, "Samsung"], r, [a, u]
                ],
                [/sie-(\w*)/i],
                [r, [d, "Siemens"],
                    [a, u]
                ],
                [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]*)/i],
                [
                    [d, "Nokia"], r, [a, u]
                ],
                [/android\s3\.[\s\w;-]{10}(a\d{3})/i],
                [r, [d, "Acer"],
                    [a, c]
                ],
                [/android.+([vl]k\-?\d{3})\s+build/i],
                [r, [d, "LG"],
                    [a, c]
                ],
                [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],
                [
                    [d, "LG"], r, [a, c]
                ],
                [/(lg) netcast\.tv/i],
                [d, r, [a, m]],
                [/(nexus\s[45])/i, /lg[e;\s\/-]+(\w*)/i, /android.+lg(\-?[\d\w]+)\s+build/i],
                [r, [d, "LG"],
                    [a, u]
                ],
                [/android.+(ideatab[a-z0-9\-\s]+)/i],
                [r, [d, "Lenovo"],
                    [a, c]
                ],
                [/linux;.+((jolla));/i],
                [d, r, [a, u]],
                [/((pebble))app\/[\d\.]+\s/i],
                [d, r, [a, b]],
                [/android.+;\s(oppo)\s?([\w\s]+)\sbuild/i],
                [d, r, [a, u]],
                [/crkey/i],
                [
                    [r, "Chromecast"],
                    [d, "Google"]
                ],
                [/android.+;\s(glass)\s\d/i],
                [r, [d, "Google"],
                    [a, b]
                ],
                [/android.+;\s(pixel c)\s/i],
                [r, [d, "Google"],
                    [a, c]
                ],
                [/android.+;\s(pixel [xl2]{1,2}|pixel)\s/i],
                [r, [d, "Google"],
                    [a, u]
                ],
                [/android.+;\s(\w+)\s+build\/hm\1/i, /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, /android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i, /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i],
                [
                    [r, /_/g, " "],
                    [d, "Xiaomi"],
                    [a, u]
                ],
                [/android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i],
                [
                    [r, /_/g, " "],
                    [d, "Xiaomi"],
                    [a, c]
                ],
                [/android.+;\s(m[1-5]\snote)\sbuild/i],
                [r, [d, "Meizu"],
                    [a, c]
                ],
                [/android.+a000(1)\s+build/i, /android.+oneplus\s(a\d{4})\s+build/i],
                [r, [d, "OnePlus"],
                    [a, u]
                ],
                [/android.+[;\/]\s*(RCT[\d\w]+)\s+build/i],
                [r, [d, "RCA"],
                    [a, c]
                ],
                [/android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i],
                [r, [d, "Dell"],
                    [a, c]
                ],
                [/android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i],
                [r, [d, "Verizon"],
                    [a, c]
                ],
                [/android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i],
                [
                    [d, "Barnes & Noble"], r, [a, c]
                ],
                [/android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i],
                [r, [d, "NuVision"],
                    [a, c]
                ],
                [/android.+;\s(k88)\sbuild/i],
                [r, [d, "ZTE"],
                    [a, c]
                ],
                [/android.+[;\/]\s*(gen\d{3})\s+build.*49h/i],
                [r, [d, "Swiss"],
                    [a, u]
                ],
                [/android.+[;\/]\s*(zur\d{3})\s+build/i],
                [r, [d, "Swiss"],
                    [a, c]
                ],
                [/android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i],
                [r, [d, "Zeki"],
                    [a, c]
                ],
                [/(android).+[;\/]\s+([YR]\d{2})\s+build/i, /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i],
                [
                    [d, "Dragon Touch"], r, [a, c]
                ],
                [/android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i],
                [r, [d, "Insignia"],
                    [a, c]
                ],
                [/android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i],
                [r, [d, "NextBook"],
                    [a, c]
                ],
                [/android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i],
                [
                    [d, "Voice"], r, [a, u]
                ],
                [/android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i],
                [
                    [d, "LvTel"], r, [a, u]
                ],
                [/android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i],
                [r, [d, "Envizen"],
                    [a, c]
                ],
                [/android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i],
                [d, r, [a, c]],
                [/android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i],
                [r, [d, "MachSpeed"],
                    [a, c]
                ],
                [/android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i],
                [d, r, [a, c]],
                [/android.+[;\/]\s*TU_(1491)\s+build/i],
                [r, [d, "Rotor"],
                    [a, c]
                ],
                [/android.+(KS(.+))\s+build/i],
                [r, [d, "Amazon"],
                    [a, c]
                ],
                [/android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i],
                [d, r, [a, c]],
                [/\s(tablet|tab)[;\/]/i, /\s(mobile)(?:[;\/]|\ssafari)/i],
                [
                    [a, p.lowerize], d, r
                ],
                [/(android[\w\.\s\-]{0,9});.+build/i],
                [r, [d, "Generic"]]
            ],
            engine: [
                [/windows.+\sedge\/([\w\.]+)/i],
                [t, [n, "EdgeHTML"]],
                [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i],
                [n, t],
                [/rv\:([\w\.]{1,9}).+(gecko)/i],
                [t, n]
            ],
            os: [
                [/microsoft\s(windows)\s(vista|xp)/i],
                [n, t],
                [/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i, /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],
                [n, [t, g.str, h.os.windows.version]],
                [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],
                [
                    [n, "Windows"],
                    [t, g.str, h.os.windows.version]
                ],
                [/\((bb)(10);/i],
                [
                    [n, "BlackBerry"], t
                ],
                [/(blackberry)\w*\/?([\w\.]*)/i, /(tizen)[\/\s]([\w\.]+)/i, /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]*)/i, /linux;.+(sailfish);/i],
                [n, t],
                [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i],
                [
                    [n, "Symbian"], t
                ],
                [/\((series40);/i],
                [n],
                [/mozilla.+\(mobile;.+gecko.+firefox/i],
                [
                    [n, "Firefox OS"], t
                ],
                [/(nintendo|playstation)\s([wids34portablevu]+)/i, /(mint)[\/\s\(]?(\w*)/i, /(mageia|vectorlinux)[;\s]/i, /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i, /(hurd|linux)\s?([\w\.]*)/i, /(gnu)\s?([\w\.]*)/i],
                [n, t],
                [/(cros)\s[\w]+\s([\w\.]+\w)/i],
                [
                    [n, "Chromium OS"], t
                ],
                [/(sunos)\s?([\w\.\d]*)/i],
                [
                    [n, "Solaris"], t
                ],
                [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i],
                [n, t],
                [/(haiku)\s(\w+)/i],
                [n, t],
                [/cfnetwork\/.+darwin/i, /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i],
                [
                    [t, /_/g, "."],
                    [n, "iOS"]
                ],
                [/(mac\sos\sx)\s?([\w\s\.]*)/i, /(macintosh|mac(?=_powerpc)\s)/i],
                [
                    [n, "Mac OS"],
                    [t, /_/g, "."]
                ],
                [/((?:open)?solaris)[\/\s-]?([\w\.]*)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i, /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i, /(unix)\s?([\w\.]*)/i],
                [n, t]
            ]
        },
        v = function(e, o) {
            if ("object" == typeof e && (o = e, e = s), !(this instanceof v)) return new v(e, o).getResult();
            var r = e || (i && i.navigator && i.navigator.userAgent ? i.navigator.userAgent : ""),
                n = o ? p.extend(f, o) : f;
            return this.getBrowser = function() {
                var i = {
                    name: s,
                    version: s
                };
                return g.rgx.call(i, r, n.browser), i.major = p.major(i.version), i
            }, this.getCPU = function() {
                var i = {
                    architecture: s
                };
                return g.rgx.call(i, r, n.cpu), i
            }, this.getDevice = function() {
                var i = {
                    vendor: s,
                    model: s,
                    type: s
                };
                return g.rgx.call(i, r, n.device), i
            }, this.getEngine = function() {
                var i = {
                    name: s,
                    version: s
                };
                return g.rgx.call(i, r, n.engine), i
            }, this.getOS = function() {
                var i = {
                    name: s,
                    version: s
                };
                return g.rgx.call(i, r, n.os), i
            }, this.getResult = function() {
                return {
                    ua: this.getUA(),
                    browser: this.getBrowser(),
                    engine: this.getEngine(),
                    os: this.getOS(),
                    device: this.getDevice(),
                    cpu: this.getCPU()
                }
            }, this.getUA = function() {
                return r
            }, this.setUA = function(i) {
                return r = i, this
            }, this
        };
    v.VERSION = "0.7.18", v.BROWSER = {
        NAME: n,
        MAJOR: "major",
        VERSION: t
    }, v.CPU = {
        ARCHITECTURE: l
    }, v.DEVICE = {
        MODEL: r,
        VENDOR: d,
        TYPE: a,
        CONSOLE: w,
        MOBILE: u,
        SMARTTV: m,
        TABLET: c,
        WEARABLE: b,
        EMBEDDED: "embedded"
    }, v.ENGINE = {
        NAME: n,
        VERSION: t
    }, v.OS = {
        NAME: n,
        VERSION: t
    }, i && (i.UAParser = v)
}("object" == typeof window ? window : this);
oSpP = !1;
var oSpPOptions = {
    sAppUrl: "https://fakimaku.xyz",
    sAppUrlShow: "https://fakimaku.xyz",
    sOrigUrl: "https://fakimaku.xyz",
    sOrigFFUrl: "https://fakimaku.xyz",
    sSubscribeUrl: "https://fakimaku.spulse.net",
    sSubscribeFFUrl: "https://fakimaku.spulse.net",
    sPushHost: "8e7162461417bee0a21462729d592df4",
    sPushSenderID: "300013155679",
    bHttps: !1,
    bSendToParent: true,
    aBrowser: {},
    sBrowser: "",
    sOs: "",
    sSafariPushId: "web.com.sendpulse.push",
    sServerApi: "https://pushdata.sendpulse.com:4434",
    gcmServer: "https://android.googleapis.com/gcm/send/",
    fcmServer: "https://fcm.googleapis.com/fcm/",
    mozillaServer: "https://updates.push.services.mozilla.com/wpush/v2/",
    jsIncludeDomain: "web.webpushs.com",
    bAutoSubscribe: false,
    sAppKey: "cdc668e166bc7347e1c3f891dade8b18",
    prompt_settings: "{\"style\":\"sp-modal\",\"textcolor\":\"#ffffff\",\"backgroundcolor\":\"#333333\",\"buttoncolor\":\"#31b58e\",\"iconcolor\":\"\",\"btncolor\":\"\",\"allowbtntext\":\"\u0420\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u044c\",\"disallowbtntext\":\"\u0417\u0430\u043f\u0440\u0435\u0442\u0438\u0442\u044c\",\"btn_lang\":\"ru\",\"visit_number\":1,\"icon\":\"\/files\/push\/7652303\/websites\/cdc668e166bc7347e1c3f891dade8b18\/icons\/21d6672c991a.png\"}",
    prompt_title: "Fakimaku",
    prompt_text: "Ð Ð°Ð·Ñ€ÐµÑˆÐ¸Ñ‚Ðµ ÑÐ°Ð¹Ñ‚Ñƒ  Ð¾Ñ‚Ð¿Ñ€Ð°Ð²Ð»ÑÑ‚ÑŒ Ð²Ð°Ð¼ ÑƒÐ²ÐµÐ´Ð¾Ð¼Ð»ÐµÐ½Ð¸Ñ Ð½Ð° Ñ€Ð°Ð±Ð¾Ñ‡Ð¸Ð¹ ÑÑ‚Ð¾Ð»",
    prompt_description: "-",
    prompt_settings_whithout_sw: "",
    currentDB: null,
    timeSend: null,
    newWindow: null,
    parentEvent: null,
    initedPage: !1,
    parentVariables: {},
    pushedVariables: {},
    pushedInterval: !1,
    sFirefoxServer: "https://updates.push.services.mozilla.com/push/",
    sFirefoxServer2: "https://updates.push.services.mozilla.com/wpush/v1/",
    bWasPrompt: !1,
    startTime: 0,
    isParentAutoSubscribe: true,
    bSentToServer: !1,
    bSentStatOpened: !1,
    bSentStatPermission: !1,
    bMobileEnabled: true,
    show_splogo: "1",
    spdomain_website: "https://sendpulse.com/ru/webpush-powered-by-sendpulse?sn=ZHdndGNtLmNvbQ%3D%3D&from=7652303",
    styles_prefix: "sp",
    aPoweredbyLabel: {
        ru: "Fakimaku",
        en: "Fakimaku",
        ua: "Fakimaku"
    },
    companyName: "Fakimaku",
    promptHintTitle: {
        ru: "Fakimaku",
        en: "Subscribe to our notifications!",
        ua: "Fakimaku"
    },
    promptHintText: {
        ru: "Ð’ÐºÐ»ÑŽÑ‡Ð¸Ñ‚Ðµ ÑƒÐ²ÐµÐ´Ð¾Ð¼Ð»ÐµÐ½Ð¸Ñ ÐºÐ»Ð¸ÐºÐ¾Ð¼ Ð¿Ð¾ Ð¸ÐºÐ¾Ð½ÐºÐµ ÐºÐ¾Ð»Ð¾ÐºÐ¾Ð»ÑŒÑ‡Ð¸ÐºÐ°",
        en: "Click the bell icon to enable notifications",
        ua: "Ð©Ð¾Ð± Ð²Ð²Ñ–Ð¼ÐºÐ½ÑƒÑ‚Ð¸ ÑÐ¿Ð¾Ð²Ñ–Ñ‰ÐµÐ½Ð½Ñ, ÐºÐ»Ñ–ÐºÐ½Ñ–Ñ‚ÑŒ Ð½Ð° Ñ–ÐºÐ¾Ð½ÐºÑƒ Ð´Ð·Ð²Ñ–Ð½Ð¾Ñ‡ÐºÐ°"
    },
    iPromptDelay: "0",
    visitNumber: "1",
    bMonetization: "false",
    bIframeEnabled: !1,
    sUserHostHash: "747991a0e145ac2bbe69f063a9402e69",
    sSubscriptionPrefix: "SPTYPE:VAPID1:",
    sVapidPublicKey: "BPzJL10ExgcPxnTp-3ty27bIig0VJ99wfqfNz0-G_95vf7xRXbcQG9ZVG1C37lKlVUFSt7JFK1N9TtIOtrZoJlE",
    serviceWorkerExists: !1,
    sPushSubSomain: "spulse.net"
};

function oPromptPush() {
    var e = oSpPOptions.sAppUrl,
        t = oSpPOptions.sAppUrlShow,
        o = oSpPOptions.sOrigUrl,
        i = oSpPOptions.sOrigFFUrl,
        r = oSpPOptions.sPushHost,
        s = oSpPOptions.sSubscribeUrl,
        n = (oSpPOptions.sUserHostHash, oSpPOptions.bHttps),
        a = oSpPOptions.bSendToParent,
        p = oSpPOptions.jsIncludeDomain,
        c = oSpPOptions.aBrowser,
        l = oSpPOptions.sBrowser,
        u = oSpPOptions.sOs,
        d = oSpPOptions.sSafariPushId,
        S = oSpPOptions.sServerApi,
        m = oSpPOptions.gcmServer,
        P = oSpPOptions.bAutoSubscribe,
        g = oSpPOptions.sAppKey,
        b = oSpPOptions.prompt_settings,
        h = oSpPOptions.prompt_title,
        w = oSpPOptions.prompt_text,
        v = oSpPOptions.prompt_description,
        D = oSpPOptions.prompt_settings_whithout_sw,
        f = oSpPOptions.currentDB,
        M = oSpPOptions.timeSend,
        I = oSpPOptions.newWindow,
        y = oSpPOptions.parentEvent,
        O = oSpPOptions.initedPage,
        A = oSpPOptions.parentVariables,
        T = oSpPOptions.pushedVariables,
        L = oSpPOptions.pushedInterval,
        N = oSpPOptions.sFirefoxServer,
        x = oSpPOptions.sFirefoxServer2,
        C = oSpPOptions.bWasPrompt,
        E = oSpPOptions.startTime,
        j = oSpPOptions.isParentAutoSubscribe,
        k = oSpPOptions.bSentToServer,
        _ = oSpPOptions.bSentStatOpened,
        z = oSpPOptions.bSentStatPermission,
        U = oSpPOptions.bMobileEnabled,
        H = oSpPOptions.show_splogo,
        V = oSpPOptions.spdomain_website,
        B = oSpPOptions.styles_prefix,
        Y = oSpPOptions.aPoweredbyLabel,
        R = oSpPOptions.companyName,
        W = oSpPOptions.promptHintTitle,
        Z = oSpPOptions.promptHintText,
        Q = oSpPOptions.iPromptDelay,
        G = oSpPOptions.visitNumber,
        F = oSpPOptions.serviceWorkerExists,
        J = new Date,
        X = new Date(J.getFullYear(), J.getMonth() + 1, J.getDate()).getTime();
    X = J.getDate() + "" + X;
    oSpPOptions.sPushSubSomain;
    this.start = function() {
        if (!oSpP.detectSite()) return oSpP.log("Application allowed only for " + e), !1;
        if ("iOS" == oSpP.detectOs()) return oSpP.log("Application can not work on iOS"), !1;
        if (u = oSpP.detectOs(), !U && ("iOS" == u || "Android" == u)) return oSpP.log("Application disabled for your device"), !1;
        if (oSpP.detectHttps(), c = oSpP.detectBrowser(), l = c.name.toLowerCase(), ("iOS" == u || "Android" == u) && "chrome" == l && parseFloat(c.version) < 42) return oSpP.log("Application disabled for your browser version"), !1;
        if ("firefox" == l && parseFloat(c.version) < 44) return oSpP.log("Application can not work with Firefox browser version less then 44"), !1;
        if ("opera" == l && parseFloat(c.version) < 43) return oSpP.log("Application can not work with Opera browser version less then 43"), !1;
        if (oSpP.isMobileYandexBrowser()) return oSpP.log("Application can not work with mobile Yandex browser"), !1;
        if ("firefox" == l && (o = i), a && F) {
            j && (_ = !0, z = !0);
            var t = setInterval((function() {
                k && _ && z && (oSpP.sendToParent("closeme"), clearInterval(t))
            }), 50)
        }
        if (n && F)
            if (P) oSpP.getDbValue("SPIDs", "SubscriptionId", (function(e) {
                void 0 === e.target.result && oSpP.getDbValue("SPIDs", "PromptClosed", (function(e) {
                    if (void 0 === e.target.result) oSpP.startDelayedSubscription((function() {
                        oSpP.startSubscription(), "chrome" != l && "firefox" != l && "opera" != l || oSpP.checkIsPopUpWindow() || oSpP.showhelpPromptText(), oSpP.isServiceWorkerChromeSupported() && oSpP.showPushLabel()
                    }));
                    else {
                        var t = parseInt(e.target.result.value);
                        0 == --t ? (oSpP.deleteDbValue("SPIDs", "PromptClosed"), oSpP.startDelayedSubscription((function() {
                            oSpP.startSubscription(), "chrome" != l && "firefox" != l && "opera" != l || oSpP.checkIsPopUpWindow() || oSpP.showhelpPromptText(), oSpP.isServiceWorkerChromeSupported() && oSpP.showPushLabel()
                        }))) : oSpP.putValueToDb("SPIDs", {
                            type: "PromptClosed",
                            value: t
                        })
                    }
                }))
            }));
            else {
                oSpP.getDbValue("SPIDs", "SubscriptionId", (function(e) {
                    void 0 === e.target.result && oSpP.getDbValue("SPIDs", "PromptClosed", (function(e) {
                        if (void 0 === e.target.result) "chrome" != l && "firefox" != l && "opera" != l || oSpP.startDelayedSubscription((function() {
                            oSpP.showCustomPrompt()
                        }));
                        else {
                            var t = parseInt(e.target.result.value);
                            0 == --t ? (oSpP.deleteDbValue("SPIDs", "PromptClosed"), "chrome" != l && "firefox" != l && "opera" != l || oSpP.startDelayedSubscription((function() {
                                oSpP.showCustomPrompt()
                            }))) : oSpP.putValueToDb("SPIDs", {
                                type: "PromptClosed",
                                value: t
                            })
                        }
                    }))
                }));
                for (var r = document.querySelectorAll("." + B + "_notify_prompt"), p = 0; p < r.length; p++) r[p].addEventListener("click", (function() {
                    oSpP.startSubscription()
                }))
            }
        else if (window.addEventListener("message", (function(e) {
                e.origin.toLowerCase() == s.toLowerCase() && "string" == typeof e.data && ("initend" == e.data ? clearInterval(M) : "closeme" == e.data && (I.close(), oSpP.storeSubscription(e.data)))
            }), !1), P) oSpP.getDbValue("SPIDs", "SubscriptionId", (function(e) {
            void 0 === e.target.result && oSpP.getDbValue("SPIDs", "PromptClosed", (function(e) {
                if (void 0 === e.target.result) oSpP.startDelayedSubscription((function() {
                    oSpP.getDbValue("SPIDs", "PromptClosed", (function(e) {
                        void 0 === e.target.result && oSpP.showCustomPrompt()
                    })), "chrome" != l && "firefox" != l && "opera" != l || oSpP.showhelpPromptText(), oSpP.isServiceWorkerChromeSupported() && oSpP.showPushLabel()
                }));
                else {
                    var t = parseInt(e.target.result.value);
                    0 == --t ? (oSpP.deleteDbValue("SPIDs", "PromptClosed"), oSpP.startDelayedSubscription((function() {
                        oSpP.getDbValue("SPIDs", "PromptClosed", (function(e) {
                            void 0 === e.target.result && oSpP.showCustomPrompt()
                        })), "chrome" != l && "firefox" != l && "opera" != l || oSpP.showhelpPromptText(), oSpP.isServiceWorkerChromeSupported() && oSpP.showPushLabel()
                    }))) : oSpP.putValueToDb("SPIDs", {
                        type: "PromptClosed",
                        value: t
                    })
                }
            }))
        }));
        else {
            oSpP.getDbValue("SPIDs", "SubscriptionId", (function(e) {
                void 0 === e.target.result && oSpP.getDbValue("SPIDs", "PromptClosed", (function(e) {
                    if (void 0 === e.target.result) oSpP.startDelayedSubscription((function() {
                        oSpP.startDelayedSubscription((function() {
                            oSpP.showCustomPrompt()
                        }))
                    }));
                    else {
                        var t = parseInt(e.target.result.value);
                        0 == --t ? (oSpP.deleteDbValue("SPIDs", "PromptClosed"), oSpP.startDelayedSubscription((function() {
                            oSpP.showCustomPrompt()
                        }))) : oSpP.putValueToDb("SPIDs", {
                            type: "PromptClosed",
                            value: t
                        })
                    }
                }))
            }));
            for (r = document.querySelectorAll("." + B + "_notify_prompt"), p = 0; p < r.length; p++) r[p].addEventListener("click", (function() {
                oSpP.getDbValue("SPIDs", "PromptClosed", (function(e) {
                    void 0 === e.target.result && oSpP.startSubscription()
                }))
            }))
        }
        a && F && window.addEventListener("message", (function(e) {
            if (oSpP.detectOrigin(e.origin) && "string" == typeof e.data)
                if ("init" == e.data)(y = e).source.postMessage("initend", y.origin);
                else if (0 === e.data.indexOf("initpage")) {
                2 == (t = e.data.split("|")).length && (O = t[1], localStorage.setItem("source_url", O), !0, oSpP.startSubscription(), oSpP.isServiceWorkerChromeSupported() && oSpP.showPushLabel())
            } else if (0 === e.data.indexOf("initvariables")) {
                var t = e.data.split("|");
                A = JSON.parse(t[1])
            }
        }), !1)
    }, this.startSubscription = function() {
        if (F) switch (l) {
            case "chrome":
            case "firefox":
            case "opera":
                navigator.serviceWorker.getRegistrations().then((function(e) {
                    if (e)
                        for (var t = 0; t < e.length; t++) e[t].active && -1 != e[t].active.scriptURL.indexOf(B + "-push-worker.js") && e[t].unregister()
                })), oSpP.isServiceWorkerChromeSupported() && (oSpP.log("ASK for Permission"), E = Date.now(), Notification.requestPermission(oSpP.doActionsWithPermissions), oSpP.registerChrome())
        } else oSpP.showPopUp()
    }, this.clearDomain = function(e) {
        return e.replace("://www.", "://").replace("://www2.", "://")
    }, this.detectSite = function() {
        var o = !(-1 === oSpP.clearDomain(window.location.href.toLowerCase()).indexOf(oSpP.clearDomain(e.toLowerCase())));
        return o || (o = !(-1 === oSpP.clearDomain(window.location.href.toLowerCase()).indexOf(oSpP.clearDomain(t.toLowerCase())))) || (o = !(-1 === oSpP.clearDomain(window.location.href.toLowerCase()).indexOf(oSpP.clearDomain(s.toLowerCase())))), o
    }, this.detectOrigin = function(e) {
        return !(-1 === oSpP.clearDomain(e.toLowerCase()).indexOf(oSpP.clearDomain(o.toLowerCase())))
    }, this.detectHttps = function() {
        n = 0 === window.location.href.indexOf("https://")
    }, this.log = function(e) {}, this.detectBrowser = function() {
        var e, t = navigator.userAgent,
            o = t.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [],
            i = t.match(/(edge(?=\/))\/?\s*(\d+)/i) || [];
        return "Edge" === i[1] ? {
            name: i[1],
            version: i[2]
        } : /trident/i.test(o[1]) ? {
            name: "IE",
            version: (e = /\brv[ :]+(\d+)/g.exec(t) || [])[1] || ""
        } : "Chrome" === o[1] && null != (e = t.match(/\bOPR\/(\d+)/)) ? {
            name: "Opera",
            version: e[1]
        } : (o = o[2] ? [o[1], o[2]] : [navigator.appName, navigator.appVersion, "-?"], null != (e = t.match(/version\/(\d+)/i)) && o.splice(1, 1, e[1]), {
            name: o[0],
            version: o[1]
        })
    }, this.isMobileYandexBrowser = function() {
        var e = navigator.userAgent;
        e.match(/(opera|yabrowser|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i);
        return "YaBrowser" === (e.match(/(YaBrowser(?=\/))\/?\s*(\d+)/i) || [])[1] && ("iOS" == oSpP.detectOs() || "Android" == oSpP.detectOs())
    }, this.isServiceWorkerChromeSupported = function() {
        return "serviceWorker" in navigator
    }, this.isSafariNotificationSupported = function() {
        return "safari" in window && "pushNotification" in window.safari
    }, this.getBrowserlanguage = function() {
        return navigator.language.substring(0, 2)
    }, this.setCookie = function(e, t, o) {
        var i = new Date;
        i.setTime(i.getTime() + 24 * o * 60 * 60 * 1e3);
        var r = "expires=" + i.toUTCString();
        document.cookie = e + "=" + t + "; " + r
    }, this.checkCookie = function(e) {
        for (var t = e + "=", o = document.cookie.split(";"), i = 0; i < o.length; i++) {
            for (var r = o[i];
                " " == r.charAt(0);) r = r.substring(1);
            if (0 == r.indexOf(t)) return r.substring(t.length, r.length)
        }
        return ""
    }, this.doActionsWithPermissions = function(e) {
        var t = Date.now() - E;
        switch (C = !(t < 50), oSpP.hideHintDiv(), oSpP.log("[DD] Permissions: " + e), oSpP.log("[DD] Time diff: " + t), e) {
            case "granted":
                switch (j || C && oSpP.getDbValue("SPIDs", "PromptShowed", (function(e) {
                        void 0 === e.target.result ? (oSpP.sendPromptStat("prompt_showed"), oSpP.sendPromptStat("prompt_granted"), oSpP.putValueToDb("SPIDs", {
                            type: "PromptShowed",
                            value: 1
                        })) : (oSpP.sendPromptStat("prompt_showed_again"), oSpP.sendPromptStat("prompt_granted"))
                    })), l) {
                    case "chrome":
                    case "firefox":
                    case "opera":
                        oSpP.subscribe()
                }
                break;
            case "default":
                j || C && oSpP.getDbValue("SPIDs", "PromptShowed", (function(e) {
                    void 0 === e.target.result ? (oSpP.sendPromptStat("prompt_showed"), oSpP.sendPromptStat("prompt_closed"), oSpP.putValueToDb("SPIDs", {
                        type: "PromptShowed",
                        value: 1
                    })) : (oSpP.sendPromptStat("prompt_showed_again"), oSpP.sendPromptStat("prompt_closed"))
                }));
                break;
            case "denied":
                j ? C && (oSpP.sendToParent("closeme"), oSpP.sendPromptStat("prompt_denied")) : C && oSpP.getDbValue("SPIDs", "PromptShowed", (function(e) {
                    void 0 === e.target.result ? (oSpP.sendPromptStat("prompt_showed"), oSpP.sendPromptStat("prompt_denied"), oSpP.putValueToDb("SPIDs", {
                        type: "PromptShowed",
                        value: 1
                    })) : (oSpP.sendPromptStat("prompt_showed_again"), oSpP.sendPromptStat("prompt_denied"))
                }))
        }
        P ? "default" == e ? oSpP.closePromptHelpText(!1) : "granted" == e ? oSpP.closePromptHelpText(!0) : (oSpP.closePromptHelpText(!0), oSpP.sendPromptStat("prompt_denied")) : "default" == e ? oSpP.closeCustomPrompt(!1) : oSpP.closeCustomPrompt(!0), oSpP.closePushLabel()
    }, this.registerChrome = function() {
        navigator.serviceWorker.register("/" + B + "-push-worker-fb.js", {
            updateViaCache: "none"
        }).then((function(e) {
            e.installing ? oSpP.log("Service worker installing") : e.waiting ? oSpP.log("Service worker installed") : e.active && oSpP.log("Service worker active")
        }))
    }, this.checkIsServiceWorkerExitsAndInitPrompt = function(e) {
        e && (P = !0, Q = 0, G = 1);
        try {
            var t = new XMLHttpRequest;
            t.open("GET", "/" + B + "-push-worker-fb.js"), t.onload = function(e) {
                F = 4 == t.readyState && 200 == t.status, void 0, oSpP.initPrompt()
            }, t.send(null), t.onerror = function() {
                void 0
            }
        } catch (e) {
            F = !1, oSpP.initPrompt(), void 0
        }
    }, this.checkSafariPermission = function(e) {
        oSpP.log("[DD] Permissions: " + e.permission), "default" === e.permission ? (P ? oSpP.closePromptHelpText(!1) : oSpP.closeCustomPrompt(!1), C = !0, oSpP.getDbValue("SPIDs", "PromptShowed", (function(e) {
            void 0 === e.target.result ? (oSpP.sendPromptStat("prompt_showed"), oSpP.putValueToDb("SPIDs", {
                type: "PromptShowed",
                value: 1
            })) : oSpP.sendPromptStat("prompt_showed_again")
        })), window.safari.pushNotification.requestPermission(S, d, {
            appkey: g
        }, oSpP.checkSafariPermission)) : "denied" === e.permission ? (P ? oSpP.closePromptHelpText(!0) : oSpP.closeCustomPrompt(!0), C && oSpP.sendPromptStat("prompt_denied"), oSpP.sendToParent("closeme")) : "granted" === e.permission && (oSpP.uns(), P ? oSpP.closePromptHelpText(!0) : oSpP.closeCustomPrompt(!0), C && oSpP.sendPromptStat("prompt_granted"), oSpP.subscribe()), oSpP.closePushLabel()
    }, this.initialiseState = function(e) {
        e.showNotification || oSpP.log("Notifications aren't supported on service workers."), "denied" !== Notification.permission ? "PushManager" in window || oSpP.log("Push messaging isn't supported.") : oSpP.log("The user has blocked notifications.")
    }, this.endpointWorkaround = function(e) {
        switch (l) {
            case "chrome":
            case "opera":
                if ("subscriptionId" in e) var t = e.subscriptionId;
                else t = e.endpoint;
                return ~t.indexOf(m) ? t.split(m)[1] : ~t.indexOf(oSpPOptions.fcmServer + "send/") ? t.split(oSpPOptions.fcmServer + "send/")[1] : t;
            case "firefox":
                return ~(t = e.endpoint).indexOf(N) ? t.split(N)[1] : ~t.indexOf(x) ? t.split(x)[1] : t
        }
    }, this.fetchFcmToken = function(e, t, o) {
        return new Promise((function(i, r) {
            var s = oSpPOptions.fcmServer + "send/" + encodeURIComponent(e),
                n = "authorized_entity=" + oSpPOptions.sPushSenderID;
            return n += "&endpoint=" + s, n += "&encryption_key=" + encodeURIComponent(t), n += "&encryption_auth=" + encodeURIComponent(o), fetch(oSpPOptions.fcmServer + "connect/subscribe", {
                method: "post",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: n
            }).then((function(e) {
                if (200 == e.status) return e.json().then((function(e) {
                    i(e.token)
                }));
                i(void 0)
            })).catch((function(e) {
                r(e)
            }))
        }))
    }, this.getVapidToken = function(e) {
        return new Promise((function(t, o) {
            oSpP.getDbValue("SPIDs", "SubscriptionIdVapid", (function(o) {
                void 0 === o.target.result ? (oSpP.putValueToDb("SPIDs", {
                    type: "SubscriptionIdVapid",
                    value: e
                }), t(!1)) : t(!0)
            }))
        }))
    }, this.subscribe = function() {
        switch (l) {
            case "chrome":
            case "firefox":
            case "opera":
                navigator.serviceWorker.ready.then((function(e) {
                    e.pushManager.subscribe({
                        userVisibleOnly: !0,
                        applicationServerKey: oSpP.urlBase64ToUint8Array(oSpPOptions.sVapidPublicKey)
                    }).then((function(e) {
                        var t = oSpP.endpointWorkaround(e),
                            o = e.getKey ? e.getKey("p256dh") : "",
                            i = o ? btoa(String.fromCharCode.apply(null, new Uint8Array(o))) : "",
                            r = e.getKey ? e.getKey("auth") : "",
                            s = r ? btoa(String.fromCharCode.apply(null, new Uint8Array(r))) : "";
                        oSpP.checkLocalSubsctoption(t, i, s), a && oSpP.sendToParent(t)
                    })).catch((function(t) {
                        11 == t.code && navigator.serviceWorker.getRegistrations().then((function(t) {
                            for (var o = 0; o < t.length; o++) - 1 == t[o].active.scriptURL.indexOf("OneSignalSDKWorker.js") && -1 == t[o].active.scriptURL.indexOf("pushcrew-sw.js") && -1 == t[o].active.scriptURL.indexOf("push-worker.js") && -1 == t[o].active.scriptURL.indexOf("sw.js") && -1 == t[o].active.scriptURL.indexOf("service-worker.js") && -1 == t[o].active.scriptURL.indexOf("pushwoosh-service-worker.js") && -1 == t[o].active.scriptURL.indexOf("serviceworker.js") && -1 == t[o].active.scriptURL.indexOf(B + "-push-worker-fb.js") || t[o].unregister().then((function() {
                                navigator.serviceWorker.getRegistration().then((function(t) {
                                    void 0 !== t ? -1 == t.active.scriptURL.indexOf("OneSignalSDKWorker.js") && -1 == t.active.scriptURL.indexOf("pushcrew-sw.js") && -1 == t.active.scriptURL.indexOf("push-worker.js") && -1 == t.active.scriptURL.indexOf("sw.js") && -1 == t.active.scriptURL.indexOf("service-worker.js") && -1 == t.active.scriptURL.indexOf("pushwoosh-service-worker.js") || t.unregister().then((function() {
                                        e.pushManager.getSubscription().then((function(e) {
                                            e ? e.unsubscribe().then((function(e) {
                                                window.location.reload()
                                            })) : window.location.reload()
                                        }))
                                    })) : e.pushManager.getSubscription().then((function(e) {
                                        e ? e.unsubscribe().then((function(e) {
                                            window.location.reload()
                                        })) : window.location.reload()
                                    }))
                                }))
                            }))
                        }))
                    }))
                }))
        }
    }, this.checkLocalSubsctoption = function(e, t, o, i) {
        oSpP.log("[DD] subscribe :: subscriptionId: " + e), oSpP.getDbValue("SPIDs", "SubscriptionId", (function(i) {
            void 0 === i.target.result ? (oSpP.sendSubscribeDataToServer(e, "subscribe", void 0, t, o), oSpP.putValueToDb("SPIDs", {
                type: "SubscriptionId",
                value: e
            })) : i.target.result.value !== e && (oSpP.sendSubscribeDataToServer(i.target.result.value, "unsubscribe"), oSpP.sendSubscribeDataToServer(e, "subscribe", void 0, t, o), oSpP.putValueToDb("SPIDs", {
                type: "SubscriptionId",
                value: e
            }))
        }))
    }, this.unsubscribe = function() {
        switch (l) {
            case "chrome":
            case "firefox":
            case "opera":
                navigator.serviceWorker.ready.then((function(e) {
                    e.pushManager.getSubscription().then((function(e) {
                        oSpP.endpointWorkaround(e);
                        e && e.unsubscribe().then((function(e) {}))
                    }))
                }))
        }
    }, this.getUserVariables = function() {
        for (var e = {}, t = document.querySelectorAll("input.sp_push_custom_data"), o = 0; o < t.length; o++) switch (t[o].type) {
            case "text":
            case "hidden":
                e[t[o].name] = t[o].value;
                break;
            case "checkbox":
                e[t[o].name] = t[o].checked ? 1 : 0;
                break;
            case "radio":
                t[o].checked && (e[t[o].name] = t[o].value)
        }
        return e
    }, this.sendSubscribeDataToServer = function(e, t, o, i, s) {
        var n = new XMLHttpRequest;
        a && "subscribe" == t && (n.onreadystatechange = function() {
            4 == n.readyState && 200 == n.status && (k = !0)
        }), n.open("POST", S, !0), n.setRequestHeader("Content-Type", "application/json"), void 0 === o && ((o = {}).uname = oSpP.checkCookie("lgn"), o.os = oSpP.detectOs()), void 0 === i && (i = ""), o.variables = a && !F ? A : oSpP.getUserVariables();
        var p, u = -(new Date).getTimezoneOffset() / 60;
        if (o.timezoneoffset = u, O) p = O;
        else {
            var d = localStorage.getItem("source_url");
            p = d || window.location.href
        }
        var m = oSpPOptions.sSubscriptionPrefix;
        switch (l) {
            case "safari":
            case "firefox":
                m = ""
        }
        var P = {
            action: "subscription",
            subscriptionId: e,
            subscription_action: t,
            subscription_type: m,
            appkey: g,
            browser: c,
            lang: oSpP.getBrowserlanguage(),
            url: p,
            sPubKey: i,
            sAuthKey: s,
            sPushHostHash: r,
            custom_data: o
        };
        n.send(JSON.stringify(P))
    }, this.initDb = function(e) {
        if (f) e();
        else {
            var t = (window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB).open(R.toLowerCase() + "_push_db", 2);
            t.onsuccess = function(t) {
                f = t.target.result, e()
            }, t.onupgradeneeded = function(e) {
                e.target.result.createObjectStore("SPIDs", {
                    keyPath: "type"
                })
            }
        }
    }, this.getDbValue = function(e, t, o) {
        oSpP.initDb((function() {
            f.transaction([e], "readonly").objectStore(e).get(t).onsuccess = o
        }))
    }, this.putValueToDb = function(e, t) {
        oSpP.initDb((function() {
            f.transaction([e], "readwrite").objectStore(e).put(t)
        }))
    }, this.deleteDbValue = function(e, t) {
        oSpP.initDb((function() {
            f.transaction([e], "readwrite").objectStore(e).delete(t)
        }))
    }, this.uns = function() {
        oSpP.deleteDbValue("SPIDs", "SubscriptionId")
    }, this.detectOs = function() {
        return -1 != navigator.userAgent.indexOf("Windows") ? "Windows" : -1 != navigator.userAgent.indexOf("Android") ? "Android" : -1 != navigator.userAgent.indexOf("Linux") ? "Linux" : -1 != navigator.userAgent.indexOf("iPhone") || -1 != navigator.userAgent.indexOf("iPad") ? "iOS" : -1 != navigator.userAgent.indexOf("Mac") ? "Mac OS" : -1 != navigator.userAgent.indexOf("FreeBSD") ? "FreeBSD" : ""
    }, this.sendToParent = function(e) {
        if (null === y) var t = setInterval((function() {
            null !== y && (y.source.postMessage(e, y.origin), clearInterval(t))
        }), 100);
        else y.source.postMessage(e, y.origin)
    }, this.removeTransparentDiv = function() {
        if (document.getElementsByClassName(B + "-resubscribe-div").length > 0) {
            var e = document.getElementsByClassName(B + "-resubscribe-div")[0];
            document.body.removeChild(e)
        }
    }, this.showPopUp = function() {
        null != I && I.close(), oSpP.removeTransparentDiv(), P && oSpP.sendPromptStat("prompt_granted");
        var e = void 0 !== window.screenLeft ? window.screenLeft : screen.left,
            t = void 0 !== window.screenTop ? window.screenTop : screen.top,
            o = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
            i = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
            n = o / 2 - 290 + e,
            a = i / 3 - i / 3 + t,
            p = oSpP.getBrowserlanguage();
        "" == p && (p = "en"), I = window.open(s + "/" + p + "/" + g + "/" + r, "_blank", "scrollbars=yes, width=580, height=580, top=" + a + ", left=" + n), window.focus && I.focus(), M = setInterval((function() {
            I.postMessage("init", s), I.postMessage("initpage|" + window.location.href, s), I.postMessage("initvariables|" + JSON.stringify(oSpP.getUserVariables()), s)
        }), 100), P ? oSpP.closePrompt(!0) : F || oSpP.closePrompt(!0)
    }, this.closePrompt = function(e) {
        void 0 === e && oSpP.sendPromptStat("prompt_closed"), document.getElementsByClassName(B + "-prompt").length > 0 && document.body.removeChild(document.querySelector("." + B + "-prompt")), document.getElementsByClassName(B + "-prompt-backdrop").length > 0 && document.body.removeChild(document.querySelector("." + B + "-prompt-backdrop")), oSpP.putValueToDb("SPIDs", {
            type: "PromptClosed",
            value: 5
        })
    }, this.push = function(t, o) {
        if (!oSpP.detectSite()) return oSpP.log("Application allowed only for " + e), !1;
        T[t] = o, oSpP.getDbValue("SPIDs", "SubscriptionId", (function(e) {
            void 0 === e.target.result ? L || (L = setInterval((function() {
                oSpP.getDbValue("SPIDs", "SubscriptionId", (function(e) {
                    void 0 !== e.target.result && (oSpP.sendUpdatesToServer(e.target.result.value), clearInterval(L), L = !1)
                }))
            }), 1e3)) : oSpP.sendUpdatesToServer(e.target.result.value)
        }))
    }, this.sendUpdatesToServer = function(e) {
        var t = oSpPOptions.sSubscriptionPrefix;
        switch (l) {
            case "safari":
            case "firefox":
                t = ""
        }
        var o = new XMLHttpRequest;
        o.open("POST", S, !0), o.setRequestHeader("Content-Type", "application/json");
        var i = {
            action: "subscription",
            subscriptionId: e,
            subscription_type: t,
            subscription_action: "update_variables",
            appkey: g,
            sPushHostHash: r,
            custom_data: {
                variables: T
            }
        };
        o.send(JSON.stringify(i))
    }, this.sendPromptStat = function(e) {
        "prompt_denied" === e && oSpP.putValueToDb("SPIDs", {
            type: "SubscriptionId",
            value: "denied"
        })
    }, this.showhelpPromptText = function() {
        var e = document.getElementsByTagName("head")[0],
            t = document.createElement("link");
        if (t.rel = "stylesheet", t.type = "text/css", t.href = "https://" + p + "/dist/css/push/" + R.toLowerCase() + "-prompt.min.css?v=" + X, t.media = "all", e.appendChild(t), v.length >= 0 && "-" != v) {
            var o = document.createElement("div");
            o.setAttribute("class", B + "-backdrop-info"), o.setAttribute("style", "display:none;");
            var i = document.createElement("div");
            i.setAttribute("class", "backdrop-close"), i.innerHTML += "<big>Ã—</big><br><small>ESC</small>", i.setAttribute("onclick", "oSpP.closePromptHelpText(false); return false;"), o.appendChild(i);
            var r = document.createElement("div");
            if (r.setAttribute("class", "backdrop-message"), r.innerHTML += v, o.appendChild(r), "chrome" === c.name.toLowerCase()) {
                var s = this.getPushHintDiv();
                o.appendChild(s)
            }
            document.body.insertBefore(o, document.body.childNodes[0]), setTimeout((function() {
                oSpP.getDbValue("SPIDs", "PromptClosed", (function(e) {
                    void 0 === e.target.result && (o.className += o.className ? " show-prompt" : "show-prompt")
                }))
            }), 1e3)
        }
    }, this.showPushLabel = function() {
        if (F) {
            var e = !0,
                t = new UAParser,
                i = t.getBrowser();
            if (i.os = t.getOS().name, void 0 !== H && 0 == H && (e = !1), e) {
                var r = document.createElement("div"),
                    s = '<a class="' + B + '-brand-link" rel="nofollow" target="_blank" href="' + V + (-1 !== V.indexOf("?") ? "&" : "?") + "utm_source=" + encodeURI(o.replace(/(^\w+:|^)\/\//, "")) + '&utm_medium=referral&utm_campaign=pushrequest">Web Push <span>' + R + "</span></a>";
                if (document.getElementsByClassName(B + "-backdrop-info").length) {
                    if (r.setAttribute("class", B + "-bottom-push-label " + B + "-show"), r.innerHTML += s, "chrome" === i.name.toLowerCase() && !document.getElementsByClassName(B + "-hint-popover").length) {
                        var n = this.getPushHintDiv();
                        document.getElementsByClassName(B + "-backdrop-info")[0].appendChild(n)
                    }
                    document.getElementsByClassName(B + "-backdrop-info")[0].appendChild(r)
                } else {
                    var a = B + "-" + u.toLowerCase().replace(" ", ""),
                        p = B + "-lang-" + oSpP.getBrowserlanguage().toLowerCase().replace(" ", ""),
                        c = B + "-" + i.name.toLowerCase().replace(" ", ""),
                        l = c + i.major;
                    r.setAttribute("style", "display:none"), r.setAttribute("class", B + "-webpush-label " + a + " " + c + " " + p + " " + l), r.setAttribute("onclick", "this.remove();");
                    var d = document.createElement("div");
                    if (d.setAttribute("class", B + "-inner-content"), d.innerHTML += s, "chrome" === i.name.toLowerCase()) {
                        n = this.getPushHintDiv();
                        r.appendChild(n)
                    }
                    r.appendChild(d), document.body.insertBefore(r, document.body.childNodes[0])
                }
                setTimeout((function() {
                    if (null !== document.querySelector("." + B + "-webpush-label")) {
                        var e = document.querySelector("." + B + "-webpush-label");
                        e.setAttribute("class", e.getAttribute("class") + " " + B + "-show")
                    }
                }), 1e3)
            }
        }
    }, this.getPushHintDiv = function() {
        var e = oSpP.getMessageLang(oSpP.getBrowserlanguage()),
            t = document.createElement("div");
        t.setAttribute("class", B + "-prompt " + B + "-hint-popover show-prompt");
        var o = document.createElement("div");
        o.setAttribute("class", B + "-prompt-message");
        var i = document.createElement("div");
        i.setAttribute("class", B + "-table-wrapper");
        var r = document.createElement("div");
        r.setAttribute("class", B + "-cell"), r.innerHTML += W[e];
        var s = document.createElement("div");
        s.setAttribute("class", B + "-cell"), s.innerHTML = "<img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjI4IiB2aWV3Qm94PSIwIDAgMTAwIDI4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBIODZDOTMuNzMyIDAgMTAwIDYuMjY4MDEgMTAwIDE0VjE0QzEwMCAyMS43MzIgOTMuNzMyIDI4IDg2IDI4SDBWMFoiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcikiLz48cGF0aCBkPSJNOTAgMTEuNjkwMUw4NC4yNTU3IDExLjIwMDlMODIgNkw3OS43NDQzIDExLjIwMDlMNzQgMTEuNjkwMUw3OC4zODAzIDE1LjM5NzdMNzcuMDY4OSAyMC45MzMzTDgyIDE3Ljk5ODJMODYuOTU3NCAyMC45MzMzTDg1LjY0NTkgMTUuMzk3N0w5MCAxMS42OTAxWk04MiAxNi41MzA2TDc4Ljk4MzYgMTguMzA3MUw3OS43OTY3IDE0LjkzNDNMNzcuMTIxMyAxMi42OTQzTDgwLjYzNjEgMTIuMzg1M0w4MiA5LjIxODM5TDgzLjM2MzkgMTIuMzg1M0w4Ni44Nzg3IDEyLjY5NDNMODQuMjI5NSAxNC45Nkw4NS4wNDI2IDE4LjMzMjlMODIgMTYuNTMwNloiIGZpbGw9IiM0RDUyNUUiLz48cGF0aCBkPSJNNTEuMjcyNyAxOC45MDA4QzUxLjI3MjcgMTkuNjI4MSA1MC42Nzc3IDIwLjIyMzEgNDkuOTUwNCAyMC4yMjMxQzQ5LjIyMzEgMjAuMjIzMSA0OC42MjgxIDE5LjYyODEgNDguNjI4MSAxOC45MDA4SDUxLjI3MjdaTTU1LjA2NzggMTkuOTM4OEw1My4zNjg2IDE4LjIzOTdINDRMNDUuOTgzNSAxNi4yNTYyVjEyLjI4OTNDNDUuOTgzNSAxMS44NTk1IDQ2LjA0OTYgMTEuNDQzIDQ2LjE4MTggMTEuMDUyOUw0NC4zMTA3IDkuMTgxODJMNDUuMjQ5NiA4LjI0OTU5TDQ2LjgzNjQgOS44MzYzNkw1NiAxOUw1NS4wNjc4IDE5LjkzODhaTTQ5LjI4OTMgOC4zNzUyMVY3LjY2MTE2QzQ5LjI4OTMgNy4yOTc1MiA0OS41ODY4IDcgNDkuOTUwNCA3QzUwLjMxNCA3IDUwLjYxMTYgNy4yOTc1MiA1MC42MTE2IDcuNjYxMTZWOC4zNzUyMUM1Mi40ODkzIDguNjkyNTYgNTMuOTE3NCAxMC4zMjU2IDUzLjkxNzQgMTIuMjg5M1YxNS4wNDYzTDQ3LjgxNDkgOC45NDM4QzQ4LjI1NzkgOC42NTI4OSA0OC43NTM3IDguNDY3NzcgNDkuMjg5MyA4LjM3NTIxWiIgZmlsbD0iIzRENTI1RSIvPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhciIgeDE9IjEwMCIgeTE9IjE0IiB4Mj0iMS4xMzg0NWUtMDciIHkyPSIxNCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMC42NDkyNDkiIHN0b3AtY29sb3I9IiNEMEQyRDgiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNEMEQyRDgiIHN0b3Atb3BhY2l0eT0iMCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjwvc3ZnPg=='>", i.appendChild(r), i.appendChild(s);
        var n = document.createElement("div");
        return n.setAttribute("class", B + "-prompt-message-text"), n.innerHTML = Z[e], o.appendChild(i), o.appendChild(n), t.appendChild(o), t
    }, this.showCustomPrompt = function() {
        oSpP.getDbValue("SPIDs", "PromptShowed", (function(e) {
            void 0 === e.target.result ? (oSpP.sendPromptStat("prompt_showed"), oSpP.putValueToDb("SPIDs", {
                type: "PromptShowed",
                value: 1
            })) : oSpP.sendPromptStat("prompt_showed_again")
        }));
        var e, t = document.getElementsByTagName("head")[0],
            o = document.createElement("link");
        o.rel = "stylesheet", o.type = "text/css", o.href = "https://" + p + "/dist/css/push/" + R.toLowerCase() + "-prompt.min.css?v=" + X, o.media = "all", t.appendChild(o);
        var i = B + "-popover",
            r = "display:none;",
            s = !0;
        void 0 !== H && 0 == H && (s = !1);
        var n = oSpP.getMessageLang(oSpP.getBrowserlanguage());
        if (b.length <= 0 && D.length > 0 && !F && P && (b = D, e = JSON.parse(b), w = e.text), b.length > 0) {
            if ("Sendbox" === R) var a = '<img src="data:image/svg+xml;base64,PHN2ZyBpZD0i0KHQu9C+0LlfMSIgZGF0YS1uYW1lPSLQodC70L7QuSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNSAxNSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiNmNjEzODk7fS5jbHMtMntmaWxsOiMwMDg0ZmY7fS5jbHMtM3tmaWxsOiM0MDRhY2M7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5sb2dvLXNlbmRib3g8L3RpdGxlPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTMuMSw0LjE3SDguMjZhLjgyLjgyLDAsMCwwLDAtMS42NEgzLjFhLjgyLjgyLDAsMCwwLDAsMS42NFoiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik00LjA4LDExSDMuNTNhLjgyLjgyLDAsMCwwLDAsMS42NGguNTVhLjgyLjgyLDAsMCwwLDAtMS42NFoiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xLjcyLDdIM0EuODIuODIsMCwwLDAsMyw1LjM5SDEuNzJBLjgyLjgyLDAsMCwwLDEuNzIsN1oiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xMS40NiwxMUg2LjY4YS44Mi44MiwwLDAsMCwwLDEuNjRoNC43OGEuODIuODIsMCwwLDAsMC0xLjY0WiIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTQuMDgsOC4yOEguODFhLjgyLjgyLDAsMCwwLDAsMS42NEg0LjA4YS44Mi44MiwwLDAsMCwwLTEuNjRaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNOC4wOCw5LjI0bC4xNi4wNy4xMywwSDguN2wuMTMsMEw5LDkuMjRIOWwyLjg2LTEuOTRBLjgyLjgyLDAsMSwwLDExLDUuOTNMOC41NCw3LjU4LDYuMSw1LjkzYS44NC44NCwwLDAsMC0xLjE2LjIuODMuODMsMCwwLDAsLjI1LDEuMTZMOCw5LjIzWiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTE0LjE4LDIuNTNhLjgyLjgyLDAsMCwxLC44Mi44MnY4LjQ4YS44Mi44MiwwLDAsMS0uODIuODJIMTFBLjgyLjgyLDAsMCwxLDExLDExaDIuMzlWNC4xN0g3LjgzYS44Mi44MiwwLDAsMSwwLTEuNjRaIi8+PGVsbGlwc2UgY2xhc3M9ImNscy0zIiBjeD0iMTAuOTgiIGN5PSIxMS44MyIgcng9IjAuODEiIHJ5PSIwLjgyIi8+PGVsbGlwc2UgY2xhc3M9ImNscy0zIiBjeD0iNy44MyIgY3k9IjMuMzUiIHJ4PSIwLjgxIiByeT0iMC44MiIvPjwvc3ZnPg==">';
            else a = '<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiByeD0iMiIgZmlsbD0iIzAwQTJDMCIvPiAgICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEzLjUwNjQgOC4wOTYzOVY4LjQzMzc0VjguNjAyNDFMMTMuNDkwMiA5SDExLjg1OUg4LjQxNTc5SDguMTIyMDZMOC4wODMyMiA4LjcwNzI1TDcuNTk3NjEgNS4zNDc1NUw1LjM5MDY0IDEzLjc0ODhMNS4zMjQ2NiAxNEg1LjA2NjI2SDMuODQ0MzJIMy41Nzg4OUwzLjUxNzgxIDEzLjc0MDNMMi4zNTA3MyA5SDAuMzM1NTA5SDBWOC43NTE3NVY3LjI2NDU3VjdIMC4zMzU1MDlIMy42MDg4OUgzLjg2MDUyTDMuODk2NjMgNy4xODc1NEw0LjQ5ODkgOS44NTM5N0w2Ljk3NDcyIDAuMjUyNjgyTDcuMDM5ODcgMEg3LjI5OTQ5SDguNTU0MDZIOC44NTExMUw4Ljg4NzEgMC4yOTY0NzdMOS43MjgxNSA3LjAxODg3SDExLjgyODlMMTIuMzE1OSA3LjAxODg2TDEyLjYzMDkgNy4wMTg4N0gxMy40OTAyTDEzLjUwNjQgNy4xODc1NFY3LjM1NjIyVjguMDk2MzlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxIDEpIiBmaWxsPSJ3aGl0ZSIvPiAgICA8cGF0aCBkPSJNMTQuNDEyIDhDMTQuNDEyIDguOTc4MTQgMTMuNjIzMyA5Ljc3MTA4IDEyLjY1MDUgOS43NzEwOEMxMS42Nzc3IDkuNzcxMDggMTAuODg5MSA4Ljk3ODE0IDEwLjg4OTEgOEMxMC44ODkxIDcuMDIxODYgMTEuNjc3NyA2LjIyODkxIDEyLjY1MDUgNi4yMjg5MUMxMy42MjMzIDYuMjI4OTEgMTQuNDEyIDcuMDIxODYgMTQuNDEyIDhaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxIDEpIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==">';
            var c = '<svg style="display: none;"><symbol id="sp_bell_icon"><path d="M139.165 51.42L103.39 15.558C43.412 61.202 3.74 132.185 0 212.402h50.174c3.742-66.41 37.877-124.636 88.99-160.98zM474.98 212.403h50.173c-3.742-80.217-43.413-151.2-103.586-196.845L385.704 51.42c51.398 36.346 85.533 94.572 89.275 160.982zm-49.388 12.582c0-77-53.39-141.463-125.424-158.487v-17.09c0-20.786-16.76-37.613-37.592-37.613s-37.592 16.827-37.592 37.614v17.09C152.95 83.52 99.56 148.004 99.56 224.983v137.918L49.408 413.01v25.076h426.336V413.01l-50.152-50.108V224.984zM262.576 513.358c3.523 0 6.76-.22 10.065-1.007 16.237-3.237 29.825-14.528 36.06-29.626 2.517-5.952 4.05-12.494 4.05-19.54H212.4c0 27.593 22.582 50.174 50.174 50.174z" /></symbol></svg>';
            (i = (e = JSON.parse(b)).style) === B + "-popover" && (i = B + "-native-popover");
            var l = document.createElement("div"),
                u = B + "-prompt " + i;
            l.setAttribute("class", u), e.backgroundcolor.length > 0 && i != B + "-fab" && (r = r + "background-color: " + e.backgroundcolor + ";"), l.setAttribute("style", r);
            var d = document.createElement("div");
            d.setAttribute("class", B + "-prompt-message");
            var S = document.createElement("img");
            if (S.setAttribute("class", B + "-bell-icon"), S.setAttribute("width", "14"), S.setAttribute("height", "14"), S.setAttribute("src", "https://" + p + "/img/push/icon-ring.svg"), s) {
                var m = document.createElement("span");
                m.setAttribute("class", B + "-link-wrapper"), (L = document.createElement("a")).setAttribute("class", B + "-link"), L.setAttribute("href", V), L.setAttribute("target", "_blank");
                var g = document.createElement("span");
                i === B + "-modal" && (L.setAttribute("style", "color: " + e.textcolor + " !important;"), m.setAttribute("style", "color: " + e.textcolor + " !important;"), g.setAttribute("style", "color: " + e.textcolor + " !important;")), g.innerHTML = Y[n], i != B + "-bar" && (L.innerHTML = a), L.appendChild(g), m.appendChild(L)
            }
            if (i === B + "-native-popover") {
                r = r + "color: " + e.textcolor + " !important;", l.setAttribute("style", r), void 0 !== e.custom && void 0 !== e.custom.prompt_position && (u += " " + B + "-pos-" + e.custom.prompt_position, l.setAttribute("class", u)), (C = document.createElement("div")).setAttribute("class", B + "-native-info-inner " + B + "-table-wrapper");
                var v = document.createElement("div");
                v.setAttribute("class", B + "-cell"), S.setAttribute("src", "https://" + p + e.icon), S.setAttribute("width", "64"), S.setAttribute("height", "64"), v.appendChild(S);
                var f = document.createElement("div");
                f.setAttribute("class", B + "-cell");
                var M = document.createElement("div");
                M.setAttribute("class", B + "-prompt-info " + B + "-prompt-message-text"), M.innerHTML += w, f.appendChild(M), C.appendChild(v), C.appendChild(f)
            } else if (i == B + "-bar") {
                (C = document.createElement("div")).setAttribute("class", B + "-prompt-info " + B + "-prompt-message-text"), C.setAttribute("style", "color: " + e.textcolor + " !important;"), C.innerHTML += w;
                var I = document.createElement("span");
                d.innerHTML += c + '<svg viewBox="0 0 525.153 525.153" width="40" height="40" xmlns:xlink="http://www.w3.org/1999/xlink" class="' + B + '-bell-icon"><use class="' + B + '-bell-path" style="fill: ' + e.textcolor + ' !important;" xlink:href="#sp_bell_icon" x="0" y="0" />  </svg>'
            } else if (i == B + "-fab") {
                if ((C = document.createElement("div")).setAttribute("class", B + "-prompt-title " + B + "-prompt-message-text"), e.textcolor.length > 0 && C.setAttribute("style", "color: " + e.textcolor + " !important;"), C.innerHTML = h, (I = document.createElement("div")).setAttribute("class", B + "-prompt-info " + B + "-prompt-message-text"), e.textcolor.length > 0 && I.setAttribute("style", "color: " + e.textcolor + " !important;"), I.innerHTML += w, void 0 !== e.custom && void 0 !== e.custom.prompt_size && "big" === e.custom.prompt_size) {
                    I = null, u = B + "-prompt " + B + "-floating-panel", l.setAttribute("class", u), d.setAttribute("style", "background-color: " + e.btncolor + "; color: " + e.textcolor + " !important;"), d.setAttribute("onclick", "oSpP.startSubscription(); return false;"), (C = document.createElement("div")).setAttribute("style", "color: " + e.textcolor + " !important;"), C.setAttribute("class", B + "-table-wrapper");
                    var y = document.createElement("div");
                    y.setAttribute("class", B + "-cell");
                    var O = document.createElement("a");
                    O.innerHTML += '<svg viewBox="0 0 525.153 525.153" width="40" height="40" xmlns:xlink="http://www.w3.org/1999/xlink" class="' + B + '-bell-icon"><use class="' + B + '-bell-path bell-prompt-fab" style="fill: ' + e.textcolor + ' !important;" xlink:href="#sp_bell_icon" x="0" y="0">' + c + "</use></svg>", O.setAttribute("href", "#"), y.appendChild(O);
                    var A = document.createElement("div");
                    A.setAttribute("class", B + "-cell");
                    var T = document.createElement("a");
                    T.setAttribute("href", "#"), T.innerHTML = h, A.appendChild(T), C.appendChild(y), C.appendChild(A);
                    var L, N = document.createElement("div");
                    N.setAttribute("class", B + "-prompt-label"), (L = document.createElement("a")).setAttribute("href", V), L.setAttribute("target", "_blank"), (g = document.createElement("span")).innerHTML = Y[n], L.appendChild(g), N.appendChild(L)
                } else {
                    var x = document.createElement("div");
                    x.setAttribute("class", B + "-prompt-fab " + B + "_notify_prompt"), x.setAttribute("onclick", "oSpP.startSubscription();oSpP.showHintDiv(); return false;"), e.btncolor.length > 0 && x.setAttribute("style", "background-color: " + e.btncolor + " !important;"), x.innerHTML += c + '<svg viewBox="0 0 525.153 525.153" width="40" height="40" xmlns:xlink="http://www.w3.org/1999/xlink" class="' + B + '-bell-icon" ><use class="' + B + '-bell-path bell-prompt-fab" style="fill: ' + e.iconcolor + ' !important;" xlink:href="#sp_bell_icon" x="0" y="0" /></svg>'
                }
                void 0 !== e.custom && void 0 !== e.custom.prompt_position && (u += " " + B + "-fab-" + e.custom.prompt_position, l.setAttribute("class", u))
            } else if (i == B + "-modal" || i == B + "-safari") {
                var C;
                (C = document.createElement("div")).setAttribute("class", B + "-prompt-title " + B + "-prompt-message-text"), e.textcolor.length > 0 && C.setAttribute("style", "color: " + e.textcolor + " !important;"), C.innerHTML = h, (I = document.createElement("div")).setAttribute("class", B + "-prompt-info " + B + "-prompt-message-text"), e.textcolor.length > 0 && I.setAttribute("style", "color: " + e.textcolor + " !important;"), I.innerHTML += w, i == B + "-safari" ? (S.setAttribute("src", "https://" + p + e.icon), S.setAttribute("width", "64"), S.setAttribute("height", "64"), d.appendChild(S)) : d.innerHTML += c + '<svg viewBox="0 0 525.153 525.153" width="40" height="40" xmlns:xlink="http://www.w3.org/1999/xlink" class="' + B + '-bell-icon"><use class="' + B + '-bell-path" style="fill: ' + e.textcolor + ' !important;" xlink:href="#sp_bell_icon" x="0" y="0" />  </svg>'
            }
            if (i != B + "-fab") {
                var E = document.createElement("div");
                E.setAttribute("class", B + "-prompt-buttons");
                var j = document.createElement("button");
                j.setAttribute("class", B + "-prompt-btn " + B + "-accept-btn " + B + "_notify_prompt"), j.setAttribute("type", "button"), j.setAttribute("onclick", "oSpP.startSubscription();oSpP.showHintDiv();oSpP.closeCustomPrompt(false); return false;");
                var k = document.createElement("button");
                if (k.setAttribute("class", B + "-prompt-btn " + B + "-disallow-btn"), k.setAttribute("type", "button"), k.setAttribute("onclick", "oSpP.sendPromptStat('prompt_denied');oSpP.closeCustomPrompt(true); return false;"), j.innerHTML = e.allowbtntext, k.innerHTML = e.disallowbtntext, j.setAttribute("style", "background-color:" + e.buttoncolor + " !important;border-color:" + e.buttoncolor + " !important;"), k.setAttribute("style", "color:" + e.buttoncolor + " !important;"), i === B + "-native-popover") {
                    var _ = document.createElement("div");
                    _.setAttribute("class", B + "-table-wrapper");
                    var z = document.createElement("div");
                    z.setAttribute("class", B + "-cell"), s && void 0 !== m && z.appendChild(m);
                    var U = document.createElement("div");
                    U.setAttribute("class", B + "-cell"), U.appendChild(k);
                    var W = document.createElement("div");
                    W.setAttribute("class", B + "-cell"), W.appendChild(j), _.appendChild(z), _.appendChild(U), _.appendChild(W), E.appendChild(_)
                } else E.appendChild(k), E.appendChild(j);
                if (s && i == B + "-modal") {
                    var Z = document.createElement("div");
                    Z.innerHTML = "&nbsp;", E.appendChild(Z)
                }
            }
            if (d.appendChild(C), void 0 !== I && null != I && i != B + "-native-popover" && d.appendChild(I), i !== B + "-fab" ? (d.appendChild(E), s && void 0 !== m && i !== B + "-native-popover" && E.appendChild(m), l.appendChild(d)) : void 0 !== e.custom.prompt_size && "big" === e.custom.prompt_size ? (l.appendChild(d), s && void 0 !== N && l.appendChild(N)) : (s && void 0 !== m && d.appendChild(m), l.appendChild(d), l.appendChild(x)), i != B + "-fab") {
                var Q = document.createElement("button");
                Q.setAttribute("class", B + "-prompt-close"), Q.setAttribute("onclick", "oSpP.closeCustomPrompt(false); return false;"), Q.setAttribute("style", "color:" + e.textcolor + " !important;"), Q.innerHTML = "&times;", l.appendChild(Q)
            }
            if (document.body.insertBefore(l, document.body.childNodes[0]), i == B + "-modal") {
                var G = document.createElement("div");
                G.setAttribute("class", B + "-prompt-backdrop"), G.setAttribute("style", "display:none;"), document.body.insertBefore(G, document.body.childNodes[1])
            }
            setTimeout((function() {
                l.className += l.className ? " show-prompt" : "show-prompt"
            }), 1e3)
        }
    }, this.closeCustomPrompt = function(e) {
        oSpP.sendPromptStat("prompt_closed"), null !== document.body.querySelector("." + B + "-prompt") && document.body.querySelector("." + B + "-prompt").remove(), oSpP.closePromptHelpText(!0), e && oSpP.putValueToDb("SPIDs", {
            type: "PromptClosed",
            value: 5
        })
    }, this.showHintDiv = function() {
        if (F && "chrome" === c.name.toLowerCase()) {
            var e = this.getPushHintDiv();
            e.setAttribute("class", B + "-prompt " + B + "-hint-popover show-prompt " + B + "-secure-mode"), document.body.appendChild(e)
        }
    }, this.hideHintDiv = function() {
        document.getElementsByClassName(B + "-hint-popover").length && document.querySelector("." + B + "-hint-popover").remove()
    }, this.closePromptHelpText = function(e) {
        null !== document.querySelector("." + B + "-backdrop-info") && document.querySelector("." + B + "-backdrop-info").remove(), e && (oSpP.sendPromptStat("prompt_closed"), oSpP.putValueToDb("SPIDs", {
            type: "PromptClosed",
            value: 5
        }))
    }, this.closePushLabel = function() {
        null !== document.querySelector("." + B + "-bottom-push-label") && document.querySelector("." + B + "-bottom-push-label").remove(), null !== document.querySelector("." + B + "-webpush-label") && document.querySelector("." + B + "-webpush-label").remove()
    }, this.getMessageLang = function(e) {
        return "ua" == (e = e.substring(0, 2).toLowerCase()) || "uk" == e ? "ua" : "ru" == e ? "ru" : "en"
    }, this.storeSubscription = function(e) {
        oSpP.log("StoreSubscription: " + e), oSpP.putValueToDb("SPIDs", {
            type: "SubscriptionId",
            value: e
        })
    }, this.getPromptDelay = function() {
        return parseInt(Q)
    }, this.getSettingsShowByVisitNumber = function() {
        return parseInt(G)
    }, this.startDelayedSubscription = function(e) {
        if (parseInt(Q) > 0) var t = setInterval((function() {
            oSpP.getDbValue("SPIDs", "PromptDelay", (function(o) {
                void 0 !== o.target.result ? (new Date).getTime() >= o.target.result.value && (clearInterval(t), e()) : (clearInterval(t), e())
            }))
        }), 1e3);
        else e()
    }, this.getAuthEmailFromUrl = function() {
        var e = window.location.href,
            t = new RegExp("[?&]spush(=([^&#]*)|&|#|$)").exec(e);
        if (t && t[2]) {
            var o = atob(decodeURIComponent(t[2].replace(/\+/g, " ")));
            void 0 !== o && o.length > 0 && oSpP.push("email", o)
        }
    }, this.getVisitsCount = function() {
        var e = 1;
        oSpP.getDbValue("SPIDs", "VisitsCount", (function(t) {
            void 0 === t.target.result ? (oSpP.putValueToDb("SPIDs", {
                type: "VisitsCount",
                value: e
            }), e >= oSpP.getSettingsShowByVisitNumber() && oSpP.checkIsServiceWorkerExitsAndInitPrompt(!1)) : (e = t.target.result.value, e += 1, oSpP.putValueToDb("SPIDs", {
                type: "VisitsCount",
                value: e
            }), e >= oSpP.getSettingsShowByVisitNumber() && oSpP.checkIsServiceWorkerExitsAndInitPrompt(!1))
        }))
    }, this.checkIsPopUpWindow = function() {
        return -1 === oSpP.clearDomain(window.location.href.toLowerCase()).indexOf(oSpP.clearDomain(oSpPOptions.sAppUrlShow.toLowerCase())) && -1 !== oSpP.clearDomain(window.location.href.toLowerCase()).indexOf(oSpP.clearDomain(oSpPOptions.sPushSubSomain.toLowerCase()))
    }, this.initPrompt = function() {
        oSpP.getPromptDelay() > 0 ? oSpP.getDbValue("SPIDs", "PromptDelay", (function(e) {
            void 0 === e.target.result ? (oSpP.putValueToDb("SPIDs", {
                type: "PromptDelay",
                value: (new Date).getTime() + 1e3 * oSpP.getPromptDelay()
            }), oSpP.start()) : oSpP.start()
        })) : oSpP.start(), oSpP.getAuthEmailFromUrl()
    }, this.urlBase64ToUint8Array = function(e) {
        for (var t = (e + "=".repeat((4 - e.length % 4) % 4)).replace(/\-/g, "+").replace(/_/g, "/"), o = window.atob(t), i = new Uint8Array(o.length), r = 0; r < o.length; ++r) i[r] = o.charCodeAt(r);
        return i
    }
}
window.addEventListener("load", (function() {
    -1 === oSpP.clearDomain(window.location.href.toLowerCase()).indexOf(oSpP.clearDomain(oSpPOptions.sAppUrlShow.toLowerCase())) && -1 !== oSpP.clearDomain(window.location.href.toLowerCase()).indexOf(oSpP.clearDomain(oSpPOptions.sPushSubSomain.toLowerCase())) ? oSpP.checkIsServiceWorkerExitsAndInitPrompt(!0) : oSpP.getSettingsShowByVisitNumber() > 1 ? oSpP.getVisitsCount() : oSpP.checkIsServiceWorkerExitsAndInitPrompt(!1)
}));
var oSpP = new oPromptPush;
document.onkeyup = function(e) {
    27 === (e = e || window.event).keyCode && oSpP.closePromptHelpText(!1)
};
