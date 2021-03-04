(function($) {
    var $ = jQuery = $;
    var define = null;

    /*! lazysizes - v4.0.1 */
    ! function(a, b) {
        var c = b(a, a.document);
        a.lazySizes = c, "object" == typeof module && module.exports && (module.exports = c)
    }(window, function(a, b) {
        "use strict";
        if (b.getElementsByClassName) {
            var c, d, e = b.documentElement,
                f = a.Date,
                g = a.HTMLPictureElement,
                h = "addEventListener",
                i = "getAttribute",
                j = a[h],
                k = a.setTimeout,
                l = a.requestAnimationFrame || k,
                m = a.requestIdleCallback,
                n = /^picture$/i,
                o = ["load", "error", "lazyincluded", "_lazyloaded"],
                p = {},
                q = Array.prototype.forEach,
                r = function(a, b) {
                    return p[b] || (p[b] = new RegExp("(\\s|^)" + b + "(\\s|$)")), p[b].test(a[i]("class") || "") && p[b]
                },
                s = function(a, b) {
                    r(a, b) || a.setAttribute("class", (a[i]("class") || "").trim() + " " + b)
                },
                t = function(a, b) {
                    var c;
                    (c = r(a, b)) && a.setAttribute("class", (a[i]("class") || "").replace(c, " "))
                },
                u = function(a, b, c) {
                    var d = c ? h : "removeEventListener";
                    c && u(a, b), o.forEach(function(c) {
                        a[d](c, b)
                    })
                },
                v = function(a, d, e, f, g) {
                    var h = b.createEvent("CustomEvent");
                    return e || (e = {}), e.instance = c, h.initCustomEvent(d, !f, !g, e), a.dispatchEvent(h), h
                },
                w = function(b, c) {
                    var e;
                    !g && (e = a.picturefill || d.pf) ? e({
                        reevaluate: !0,
                        elements: [b]
                    }) : c && c.src && (b.src = c.src)
                },
                x = function(a, b) {
                    return (getComputedStyle(a, null) || {})[b]
                },
                y = function(a, b, c) {
                    for (c = c || a.offsetWidth; c < d.minSize && b && !a._lazysizesWidth;) c = b.offsetWidth, b = b.parentNode;
                    return c
                },
                z = function() {
                    var a, c, d = [],
                        e = [],
                        f = d,
                        g = function() {
                            var b = f;
                            for (f = d.length ? e : d, a = !0, c = !1; b.length;) b.shift()();
                            a = !1
                        },
                        h = function(d, e) {
                            a && !e ? d.apply(this, arguments) : (f.push(d), c || (c = !0, (b.hidden ? k : l)(g)))
                        };
                    return h._lsFlush = g, h
                }(),
                A = function(a, b) {
                    return b ? function() {
                        z(a)
                    } : function() {
                        var b = this,
                            c = arguments;
                        z(function() {
                            a.apply(b, c)
                        })
                    }
                },
                B = function(a) {
                    var b, c = 0,
                        e = 125,
                        g = d.ricTimeout,
                        h = function() {
                            b = !1, c = f.now(), a()
                        },
                        i = m && d.ricTimeout ? function() {
                            m(h, {
                                timeout: g
                            }), g !== d.ricTimeout && (g = d.ricTimeout)
                        } : A(function() {
                            k(h)
                        }, !0);
                    return function(a) {
                        var d;
                        (a = a === !0) && (g = 33), b || (b = !0, d = e - (f.now() - c), 0 > d && (d = 0), a || 9 > d && m ? i() : k(i, d))
                    }
                },
                C = function(a) {
                    var b, c, d = 99,
                        e = function() {
                            b = null, a()
                        },
                        g = function() {
                            var a = f.now() - c;
                            d > a ? k(g, d - a) : (m || e)(e)
                        };
                    return function() {
                        c = f.now(), b || (b = k(g, d))
                    }
                };
            ! function() {
                var b, c = {
                    lazyClass: "lazyload",
                    loadedClass: "lazyloaded",
                    loadingClass: "lazyloading",
                    preloadClass: "lazypreload",
                    errorClass: "lazyerror",
                    autosizesClass: "lazyautosizes",
                    srcAttr: "data-src",
                    srcsetAttr: "data-srcset",
                    sizesAttr: "data-sizes",
                    minSize: 40,
                    customMedia: {},
                    init: !0,
                    expFactor: 1.5,
                    hFac: .8,
                    loadMode: 2,
                    loadHidden: !0,
                    ricTimeout: 300
                };
                d = a.lazySizesConfig || a.lazysizesConfig || {};
                for (b in c) b in d || (d[b] = c[b]);
                a.lazySizesConfig = d, k(function() {
                    d.init && F()
                })
            }();
            var D = function() {
                    var g, l, m, o, p, y, D, F, G, H, I, J, K, L, M = /^img$/i,
                        N = /^iframe$/i,
                        O = "onscroll" in a && !/glebot/.test(navigator.userAgent),
                        P = 0,
                        Q = 0,
                        R = 0,
                        S = -1,
                        T = function(a) {
                            R--, a && a.target && u(a.target, T), (!a || 0 > R || !a.target) && (R = 0)
                        },
                        U = function(a, c) {
                            var d, f = a,
                                g = "hidden" == x(b.body, "visibility") || "hidden" != x(a, "visibility");
                            for (F -= c, I += c, G -= c, H += c; g && (f = f.offsetParent) && f != b.body && f != e;) g = (x(f, "opacity") || 1) > 0, g && "visible" != x(f, "overflow") && (d = f.getBoundingClientRect(), g = H > d.left && G < d.right && I > d.top - 1 && F < d.bottom + 1);
                            return g
                        },
                        V = function() {
                            var a, f, h, j, k, m, n, p, q, r = c.elements;
                            if ((o = d.loadMode) && 8 > R && (a = r.length)) {
                                f = 0, S++, null == K && ("expand" in d || (d.expand = e.clientHeight > 500 && e.clientWidth > 500 ? 500 : 370), J = d.expand, K = J * d.expFactor), K > Q && 1 > R && S > 2 && o > 2 && !b.hidden ? (Q = K, S = 0) : Q = o > 1 && S > 1 && 6 > R ? J : P;
                                for (; a > f; f++)
                                    if (r[f] && !r[f]._lazyRace)
                                        if (O)
                                            if ((p = r[f][i]("data-expand")) && (m = 1 * p) || (m = Q), q !== m && (y = innerWidth + m * L, D = innerHeight + m, n = -1 * m, q = m), h = r[f].getBoundingClientRect(), (I = h.bottom) >= n && (F = h.top) <= D && (H = h.right) >= n * L && (G = h.left) <= y && (I || H || G || F) && (d.loadHidden || "hidden" != x(r[f], "visibility")) && (l && 3 > R && !p && (3 > o || 4 > S) || U(r[f], m))) {
                                                if (ba(r[f]), k = !0, R > 9) break
                                            } else !k && l && !j && 4 > R && 4 > S && o > 2 && (g[0] || d.preloadAfterLoad) && (g[0] || !p && (I || H || G || F || "auto" != r[f][i](d.sizesAttr))) && (j = g[0] || r[f]);
                                else ba(r[f]);
                                j && !k && ba(j)
                            }
                        },
                        W = B(V),
                        X = function(a) {
                            s(a.target, d.loadedClass), t(a.target, d.loadingClass), u(a.target, Z), v(a.target, "lazyloaded")
                        },
                        Y = A(X),
                        Z = function(a) {
                            Y({
                                target: a.target
                            })
                        },
                        $ = function(a, b) {
                            try {
                                a.contentWindow.location.replace(b)
                            } catch (c) {
                                a.src = b
                            }
                        },
                        _ = function(a) {
                            var b, c = a[i](d.srcsetAttr);
                            (b = d.customMedia[a[i]("data-media") || a[i]("media")]) && a.setAttribute("media", b), c && a.setAttribute("srcset", c)
                        },
                        aa = A(function(a, b, c, e, f) {
                            var g, h, j, l, o, p;
                            (o = v(a, "lazybeforeunveil", b)).defaultPrevented || (e && (c ? s(a, d.autosizesClass) : a.setAttribute("sizes", e)), h = a[i](d.srcsetAttr), g = a[i](d.srcAttr), f && (j = a.parentNode, l = j && n.test(j.nodeName || "")), p = b.firesLoad || "src" in a && (h || g || l), o = {
                                target: a
                            }, p && (u(a, T, !0), clearTimeout(m), m = k(T, 2500), s(a, d.loadingClass), u(a, Z, !0)), l && q.call(j.getElementsByTagName("source"), _), h ? a.setAttribute("srcset", h) : g && !l && (N.test(a.nodeName) ? $(a, g) : a.src = g), f && (h || l) && w(a, {
                                src: g
                            })), a._lazyRace && delete a._lazyRace, t(a, d.lazyClass), z(function() {
                                (!p || a.complete && a.naturalWidth > 1) && (p ? T(o) : R--, X(o))
                            }, !0)
                        }),
                        ba = function(a) {
                            var b, c = M.test(a.nodeName),
                                e = c && (a[i](d.sizesAttr) || a[i]("sizes")),
                                f = "auto" == e;
                            (!f && l || !c || !a[i]("src") && !a.srcset || a.complete || r(a, d.errorClass) || !r(a, d.lazyClass)) && (b = v(a, "lazyunveilread").detail, f && E.updateElem(a, !0, a.offsetWidth), a._lazyRace = !0, R++, aa(a, b, f, e, c))
                        },
                        ca = function() {
                            if (!l) {
                                if (f.now() - p < 999) return void k(ca, 999);
                                var a = C(function() {
                                    d.loadMode = 3, W()
                                });
                                l = !0, d.loadMode = 3, W(), j("scroll", function() {
                                    3 == d.loadMode && (d.loadMode = 2), a()
                                }, !0)
                            }
                        };
                    return {
                        _: function() {
                            p = f.now(), c.elements = b.getElementsByClassName(d.lazyClass), g = b.getElementsByClassName(d.lazyClass + " " + d.preloadClass), L = d.hFac, j("scroll", W, !0), j("resize", W, !0), a.MutationObserver ? new MutationObserver(W).observe(e, {
                                childList: !0,
                                subtree: !0,
                                attributes: !0
                            }) : (e[h]("DOMNodeInserted", W, !0), e[h]("DOMAttrModified", W, !0), setInterval(W, 999)), j("hashchange", W, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend", "webkitAnimationEnd"].forEach(function(a) {
                                b[h](a, W, !0)
                            }), /d$|^c/.test(b.readyState) ? ca() : (j("load", ca), b[h]("DOMContentLoaded", W), k(ca, 2e4)), c.elements.length ? (V(), z._lsFlush()) : W()
                        },
                        checkElems: W,
                        unveil: ba
                    }
                }(),
                E = function() {
                    var a, c = A(function(a, b, c, d) {
                            var e, f, g;
                            if (a._lazysizesWidth = d, d += "px", a.setAttribute("sizes", d), n.test(b.nodeName || ""))
                                for (e = b.getElementsByTagName("source"), f = 0, g = e.length; g > f; f++) e[f].setAttribute("sizes", d);
                            c.detail.dataAttr || w(a, c.detail)
                        }),
                        e = function(a, b, d) {
                            var e, f = a.parentNode;
                            f && (d = y(a, f, d), e = v(a, "lazybeforesizes", {
                                width: d,
                                dataAttr: !!b
                            }), e.defaultPrevented || (d = e.detail.width, d && d !== a._lazysizesWidth && c(a, f, e, d)))
                        },
                        f = function() {
                            var b, c = a.length;
                            if (c)
                                for (b = 0; c > b; b++) e(a[b])
                        },
                        g = C(f);
                    return {
                        _: function() {
                            a = b.getElementsByClassName(d.autosizesClass), j("resize", g)
                        },
                        checkElems: g,
                        updateElem: e
                    }
                }(),
                F = function() {
                    F.i || (F.i = !0, E._(), D._())
                };
            return c = {
                cfg: d,
                autoSizer: E,
                loader: D,
                init: F,
                uP: w,
                aC: s,
                rC: t,
                hC: r,
                fire: v,
                gW: y,
                rAF: z
            }
        }
    });
    /*! lazysizes - rias */
    ! function(a, b) {
        var c = function() {
            b(a.lazySizes), a.removeEventListener("lazyunveilread", c, !0)
        };
        b = b.bind(null, a, a.document), "object" == typeof module && module.exports ? b(require("lazysizes")) : a.lazySizes ? c() : a.addEventListener("lazyunveilread", c, !0)
    }(window, function(a, b, c) {
        "use strict";

        function d(b, c) {
            var d, e, f, g, h = a.getComputedStyle(b);
            e = b.parentNode, g = {
                isPicture: !(!e || !m.test(e.nodeName || ""))
            }, f = function(a, c) {
                var d = b.getAttribute("data-" + a);
                if (!d) {
                    var e = h.getPropertyValue("--ls-" + a);
                    e && (d = e.trim())
                }
                if (d) {
                    if ("true" == d) d = !0;
                    else if ("false" == d) d = !1;
                    else if (l.test(d)) d = parseFloat(d);
                    else if ("function" == typeof j[a]) d = j[a](b, d);
                    else if (q.test(d)) try {
                        d = JSON.parse(d)
                    } catch (f) {}
                    g[a] = d
                } else a in j && "function" != typeof j[a] ? g[a] = j[a] : c && "function" == typeof j[a] && (g[a] = j[a](b, d))
            };
            for (d in j) f(d);
            return c.replace(p, function(a, b) {
                b in g || f(b, !0)
            }), g
        }

        function e(a, b) {
            var c = [],
                d = function(a, c) {
                    return k[typeof b[c]] ? b[c] : a
                };
            return c.srcset = [], b.absUrl && (s.setAttribute("href", a), a = s.href), a = ((b.prefix || "") + a + (b.postfix || "")).replace(p, d), b.widths.forEach(function(d) {
                var e = b.widthmap[d] || d,
                    f = {
                        u: a.replace(n, e).replace(o, b.ratio ? Math.round(d * b.ratio) : ""),
                        w: d
                    };
                c.push(f), c.srcset.push(f.c = f.u + " " + d + "w")
            }), c
        }

        function f(a, c, d) {
            var f = 0,
                g = 0,
                h = d;
            if (a) {
                if ("container" === c.ratio) {
                    for (f = h.scrollWidth, g = h.scrollHeight; !(f && g || h === b);) h = h.parentNode, f = h.scrollWidth, g = h.scrollHeight;
                    f && g && (c.ratio = g / f)
                }
                a = e(a, c), a.isPicture = c.isPicture, u && "IMG" == d.nodeName.toUpperCase() ? d.removeAttribute(i.srcsetAttr) : d.setAttribute(i.srcsetAttr, a.srcset.join(", ")), Object.defineProperty(d, "_lazyrias", {
                    value: a,
                    writable: !0
                })
            }
        }

        function g(a, b) {
            var e = d(a, b);
            return j.modifyOptions.call(a, {
                target: a,
                details: e,
                detail: e
            }), c.fire(a, "lazyriasmodifyoptions", e), e
        }

        function h(a) {
            return a.getAttribute(a.getAttribute("data-srcattr") || j.srcAttr) || a.getAttribute(i.srcsetAttr) || a.getAttribute(i.srcAttr) || a.getAttribute("data-pfsrcset") || ""
        }
        var i, j, k = {
                string: 1,
                number: 1
            },
            l = /^\-*\+*\d+\.*\d*$/,
            m = /^picture$/i,
            n = /\s*\{\s*width\s*\}\s*/i,
            o = /\s*\{\s*height\s*\}\s*/i,
            p = /\s*\{\s*([a-z0-9]+)\s*\}\s*/gi,
            q = /^\[.*\]|\{.*\}$/,
            r = /^(?:auto|\d+(px)?)$/,
            s = b.createElement("a"),
            t = b.createElement("img"),
            u = "srcset" in t && !("sizes" in t),
            v = !!a.HTMLPictureElement && !u;
        ! function() {
            var b, d = function() {},
                e = {
                    prefix: "",
                    postfix: "",
                    srcAttr: "data-src",
                    absUrl: !1,
                    modifyOptions: d,
                    widthmap: {},
                    ratio: !1
                };
            i = c && c.cfg || a.lazySizesConfig, i || (i = {}, a.lazySizesConfig = i), i.supportsType || (i.supportsType = function(a) {
                return !a
            }), i.rias || (i.rias = {}), j = i.rias, "widths" in j || (j.widths = [], function(a) {
                for (var b, c = 0; !b || 3e3 > b;) c += 5, c > 30 && (c += 1), b = 36 * c, a.push(b)
            }(j.widths));
            for (b in e) b in j || (j[b] = e[b])
        }(), addEventListener("lazybeforesizes", function(a) {
            if (a.detail.instance == c) {
                var b, d, e, k, l, m, o, p, q, s, t, u, x;
                if (b = a.target, a.detail.dataAttr && !a.defaultPrevented && !j.disabled && (q = b.getAttribute(i.sizesAttr) || b.getAttribute("sizes")) && r.test(q)) {
                    if (d = h(b), e = g(b, d), t = n.test(e.prefix) || n.test(e.postfix), e.isPicture && (k = b.parentNode))
                        for (l = k.getElementsByTagName("source"), m = 0, o = l.length; o > m; m++)(t || n.test(p = h(l[m]))) && (f(p, e, l[m]), u = !0);
                    t || n.test(d) ? (f(d, e, b), u = !0) : u && (x = [], x.srcset = [], x.isPicture = !0, Object.defineProperty(b, "_lazyrias", {
                        value: x,
                        writable: !0
                    })), u && (v ? b.removeAttribute(i.srcAttr) : "auto" != q && (s = {
                        width: parseInt(q, 10)
                    }, w({
                        target: b,
                        detail: s
                    })))
                }
            }
        }, !0);
        var w = function() {
            var d = function(a, b) {
                    return a.w - b.w
                },
                e = function(a) {
                    var b, c, d = a.length,
                        e = a[d - 1],
                        f = 0;
                    for (f; d > f; f++)
                        if (e = a[f], e.d = e.w / a.w, e.d >= a.d) {
                            !e.cached && (b = a[f - 1]) && b.d > a.d - .13 * Math.pow(a.d, 2.2) && (c = Math.pow(b.d - .6, 1.6), b.cached && (b.d += .15 * c), b.d + (e.d - a.d) * c > a.d && (e = b));
                            break
                        } return e
                },
                f = function(a, b) {
                    var d;
                    return !a._lazyrias && c.pWS && (d = c.pWS(a.getAttribute(i.srcsetAttr || ""))).length && (Object.defineProperty(a, "_lazyrias", {
                        value: d,
                        writable: !0
                    }), b && a.parentNode && (d.isPicture = "PICTURE" == a.parentNode.nodeName.toUpperCase())), a._lazyrias
                },
                g = function(b) {
                    var d = a.devicePixelRatio || 1,
                        e = c.getX && c.getX(b);
                    return Math.min(e || d, 2.4, d)
                },
                h = function(b, c) {
                    var h, i, j, k, l, m;
                    if (l = b._lazyrias, l.isPicture && a.matchMedia)
                        for (i = 0, h = b.parentNode.getElementsByTagName("source"), j = h.length; j > i; i++)
                            if (f(h[i]) && !h[i].getAttribute("type") && (!(k = h[i].getAttribute("media")) || (matchMedia(k) || {}).matches)) {
                                l = h[i]._lazyrias;
                                break
                            } return (!l.w || l.w < c) && (l.w = c, l.d = g(b), m = e(l.sort(d))), m
                },
                j = function(d) {
                    if (d.detail.instance == c) {
                        var e, g = d.target;
                        return !u && (a.respimage || a.picturefill || lazySizesConfig.pf) ? void b.removeEventListener("lazybeforesizes", j) : void(("_lazyrias" in g || d.detail.dataAttr && f(g, !0)) && (e = h(g, d.detail.width), e && e.u && g._lazyrias.cur != e.u && (g._lazyrias.cur = e.u, e.cached = !0, c.rAF(function() {
                            g.setAttribute(i.srcAttr, e.u), g.setAttribute("src", e.u)
                        }))))
                    }
                };
            return v ? j = function() {} : addEventListener("lazybeforesizes", j), j
        }()
    });
    /* lazysizes - optimumx */
    ! function(a, b, c) {
        "use strict";
        if (a.addEventListener) {
            var d, e = /^picture$/i,
                f = b.documentElement,
                g = function() {
                    var a, b = /(([^,\s].[^\s]+)\s+(\d+)(w|h)(\s+(\d+)(w|h))?)/g,
                        c = function(b, c, d, e, f, g, h, i) {
                            a.push({
                                c: c,
                                u: d,
                                w: 1 * ("w" == i ? h : e)
                            })
                        };
                    return function(d) {
                        return a = [], d.replace(b, c), a
                    }
                }(),
                h = function() {
                    var a = function(a, b) {
                            return a.w - b.w
                        },
                        b = function(b, c) {
                            var d = {
                                    srcset: b.getAttribute(lazySizes.cfg.srcsetAttr) || ""
                                },
                                e = g(d.srcset);
                            return Object.defineProperty(b, c, {
                                value: d,
                                writable: !0
                            }), d.cands = e, d.index = 0, d.dirty = !1, e[0] && e[0].w ? (e.sort(a), d.cSrcset = [e[d.index].c]) : (d.cSrcset = d.srcset ? [d.srcset] : [], d.cands = []), d
                        };
                    return function(a, c) {
                        var d, f, g, h;
                        if (!a[c] && (h = a.parentNode || {}, a[c] = b(a, c), a[c].isImg = !0, e.test(h.nodeName || "")))
                            for (a[c].picture = !0, d = h.getElementsByTagName("source"), f = 0, g = d.length; g > f; f++) b(d[f], c).isImg = !1;
                        return a[c]
                    }
                }(),
                i = {
                    _lazyOptimumx: function() {
                        var a = function(a, b, c) {
                            var d, e, f;
                            return a && a.d ? (f = c > .7 ? .6 : .4, a.d >= c ? !1 : (e = Math.pow(a.d - f, 1.6) || .1, .1 > e ? e = .1 : e > 3 && (e = 3), d = a.d + (b - c) * e, c > d)) : !0
                        };
                        return function(b, c, d) {
                            var e, f;
                            for (e = 0; e < b.cands.length; e++)
                                if (f = b.cands[e], f.d = (f.w || 1) / c, !(b.index >= e)) {
                                    if (!(f.d <= d || a(b.cands[e - 1], f.d, d))) break;
                                    b.cSrcset.push(f.c), b.index = e
                                }
                        }
                    }()
                },
                j = function() {
                    var a = function(a, b, c, d, e) {
                        var f, g = a[e];
                        g && (f = g.index, i[e](g, b, c), g.dirty && f == g.index || (g.cSrcset.join(", "), a.setAttribute(d, g.cSrcset.join(", ")), g.dirty = !0))
                    };
                    return function(b, c, d, e, f) {
                        var g, h, i, j, k = b[f];
                        if (k.width = c, k.picture && (h = b.parentNode))
                            for (g = h.getElementsByTagName("source"), j = 0, i = g.length; i > j; j++) a(g[j], c, d, e, f);
                        a(b, c, d, e, f)
                    }
                }(),
                k = function(a) {
                    var b = a.getAttribute("data-optimumx") || a.getAttribute("data-maxdpr");
                    return !b && d.constrainPixelDensity && (b = "auto"), b && (b = "auto" == b ? d.getOptimumX(a) : parseFloat(b, 10)), b
                },
                l = function() {
                    a.lazySizes && !a.lazySizes.getOptimumX && (lazySizes.getX = k, lazySizes.pWS = g, f.removeEventListener("lazybeforeunveil", l))
                };
            f.addEventListener("lazybeforeunveil", l), setTimeout(l), d = a.lazySizes && lazySizes.cfg || a.lazySizesConfig, d || (d = {}, a.lazySizesConfig = d), "function" != typeof d.getOptimumX && (d.getOptimumX = function() {
                var b = a.devicePixelRatio || 1;
                return b > 2.6 ? b *= .6 : b > 1.9 ? b *= .8 : b -= .01, Math.min(Math.round(100 * b) / 100, 2)
            }), a.devicePixelRatio && addEventListener("lazybeforesizes", function(a) {
                var b, c, e, f, g = a.target,
                    i = a.detail,
                    l = i.dataAttr;
                a.defaultPrevented || !(b = k(g)) || b >= devicePixelRatio || (!l || !g._lazyOptimumx || i.reloaded || d.unloadedClass && lazySizes.hC(g, d.unloadedClass) || (g._lazyOptimumx = null), c = h(g, "_lazyOptimumx"), e = i.width, e && (c.width || 0) < e && (f = l ? lazySizes.cfg.srcsetAttr : "srcset", lazySizes.rAF(function() {
                    j(g, e, b, f, "_lazyOptimumx")
                })))
            })
        }
    }(window, document);
    /* lazysizes - progressive */
    ! function(a, b) {
        var c = function() {
            b(a.lazySizes), a.removeEventListener("lazyunveilread", c, !0)
        };
        b = b.bind(null, a, a.document), "object" == typeof module && module.exports ? b(require("lazysizes")) : a.lazySizes ? c() : a.addEventListener("lazyunveilread", c, !0)
    }(window, function(a, b, c) {
        "use strict";
        var d, e;
        "srcset" in b.createElement("img") && (d = /^img$/i, e = function(a) {
            a.target.style.backgroundSize = "", a.target.style.backgroundImage = "", a.target.removeEventListener(a.type, e)
        }, b.addEventListener("lazybeforeunveil", function(a) {
            if (a.detail.instance == c) {
                var b = a.target;
                if (d.test(b.nodeName)) {
                    var f = b.getAttribute("src");
                    f && (b.style.backgroundSize = "100% 100%", b.style.backgroundImage = "url(" + f + ")", b.removeAttribute("src"), b.addEventListener("load", e))
                }
            }
        }, !1))
    });
    /* lazysizes - parent-fit */
    ! function(a, b) {
        var c = function() {
            b(a.lazySizes), a.removeEventListener("lazyunveilread", c, !0)
        };
        b = b.bind(null, a, a.document), "object" == typeof module && module.exports ? b(require("lazysizes")) : a.lazySizes ? c() : a.addEventListener("lazyunveilread", c, !0)
    }(window, function(a, b, c) {
        "use strict";
        if (a.addEventListener) {
            var d = /\s+(\d+)(w|h)\s+(\d+)(w|h)/,
                e = /parent-fit["']*\s*:\s*["']*(contain|cover|width)/,
                f = /parent-container["']*\s*:\s*["']*(.+?)(?=(\s|$|,|'|"|;))/,
                g = /^picture$/i,
                h = function(a) {
                    return getComputedStyle(a, null) || {}
                },
                i = {
                    getParent: function(b, c) {
                        var d = b,
                            e = b.parentNode;
                        return c && "prev" != c || !e || !g.test(e.nodeName || "") || (e = e.parentNode), "self" != c && (d = "prev" == c ? b.previousElementSibling : c && (e.closest || a.jQuery) ? (e.closest ? e.closest(c) : jQuery(e).closest(c)[0]) || e : e), d
                    },
                    getFit: function(a) {
                        var b, c, d = h(a),
                            g = d.content || d.fontFamily,
                            j = {
                                fit: a._lazysizesParentFit || a.getAttribute("data-parent-fit")
                            };
                        return !j.fit && g && (b = g.match(e)) && (j.fit = b[1]), j.fit ? (c = a._lazysizesParentContainer || a.getAttribute("data-parent-container"), !c && g && (b = g.match(f)) && (c = b[1]), j.parent = i.getParent(a, c)) : j.fit = d.objectFit, j
                    },
                    getImageRatio: function(b) {
                        var c, e, f, h, i = b.parentNode,
                            j = i && g.test(i.nodeName || "") ? i.querySelectorAll("source, img") : [b];
                        for (c = 0; c < j.length; c++)
                            if (b = j[c], e = b.getAttribute(lazySizesConfig.srcsetAttr) || b.getAttribute("srcset") || b.getAttribute("data-pfsrcset") || b.getAttribute("data-risrcset") || "", f = b._lsMedia || b.getAttribute("media"), f = lazySizesConfig.customMedia[b.getAttribute("data-media") || f] || f, e && (!f || (a.matchMedia && matchMedia(f) || {}).matches)) {
                                h = parseFloat(b.getAttribute("data-aspectratio")), !h && e.match(d) && (h = "w" == RegExp.$2 ? RegExp.$1 / RegExp.$3 : RegExp.$3 / RegExp.$1);
                                break
                            } return h
                    },
                    calculateSize: function(a, b) {
                        var c, d, e, f, g = this.getFit(a),
                            h = g.fit,
                            i = g.parent;
                        return "width" == h || ("contain" == h || "cover" == h) && (e = this.getImageRatio(a)) ? (i ? b = i.clientWidth : i = a, f = b, "width" == h ? f = b : (d = i.clientHeight, d > 40 && (c = b / d) && ("cover" == h && e > c || "contain" == h && c > e) && (f = b * (e / c))), f) : b
                    }
                };
            c.parentFit = i, b.addEventListener("lazybeforesizes", function(a) {
                if (!a.defaultPrevented && a.detail.instance == c) {
                    var b = a.target;
                    a.detail.width = i.calculateSize(b, a.detail.width)
                }
            })
        }
    });
    /*! lazysizes - respimg */
    ! function(a, b) {
        var c = function() {
            b(a.lazySizes), a.removeEventListener("lazyunveilread", c, !0)
        };
        b = b.bind(null, a, a.document), "object" == typeof module && module.exports ? b(require("lazysizes"), require("../fix-ios-sizes/fix-ios-sizes")) : a.lazySizes ? c() : a.addEventListener("lazyunveilread", c, !0)
    }(window, function(a, b, c) {
        "use strict";
        var d, e = c && c.cfg || a.lazySizesConfig,
            f = b.createElement("img"),
            g = "sizes" in f && "srcset" in f,
            h = /\s+\d+h/g,
            i = function() {
                var a = /\s+(\d+)(w|h)\s+(\d+)(w|h)/,
                    c = Array.prototype.forEach;
                return function(d) {
                    var e = b.createElement("img"),
                        f = function(b) {
                            var c, d, e = b.getAttribute(lazySizesConfig.srcsetAttr);
                            e && ((d = e.match(a)) && (c = "w" == d[2] ? d[1] / d[3] : d[3] / d[1], c && b.setAttribute("data-aspectratio", c)), b.setAttribute(lazySizesConfig.srcsetAttr, e.replace(h, "")))
                        },
                        g = function(a) {
                            var b = a.target.parentNode;
                            b && "PICTURE" == b.nodeName && c.call(b.getElementsByTagName("source"), f), f(a.target)
                        },
                        i = function() {
                            e.currentSrc && b.removeEventListener("lazybeforeunveil", g)
                        };
                    d[1] && (b.addEventListener("lazybeforeunveil", g), e.onload = i, e.onerror = i, e.srcset = "data:,a 1w 1h", e.complete && i())
                }
            }();
        if (e || (e = {}, a.lazySizesConfig = e), e.supportsType || (e.supportsType = function(a) {
                return !a
            }), !a.picturefill && !e.pf) {
            if (a.HTMLPictureElement && g) return b.msElementsFromPoint && i(navigator.userAgent.match(/Edge\/(\d+)/)), void(e.pf = function() {});
            e.pf = function(b) {
                var c, e;
                if (!a.picturefill)
                    for (c = 0, e = b.elements.length; e > c; c++) d(b.elements[c])
            }, d = function() {
                var f = function(a, b) {
                        return a.w - b.w
                    },
                    i = /^\s*\d+\.*\d*px\s*$/,
                    j = function(a) {
                        var b, c, d = a.length,
                            e = a[d - 1],
                            f = 0;
                        for (f; d > f; f++)
                            if (e = a[f], e.d = e.w / a.w, e.d >= a.d) {
                                !e.cached && (b = a[f - 1]) && b.d > a.d - .13 * Math.pow(a.d, 2.2) && (c = Math.pow(b.d - .6, 1.6), b.cached && (b.d += .15 * c), b.d + (e.d - a.d) * c > a.d && (e = b));
                                break
                            } return e
                    },
                    k = function() {
                        var a, b = /(([^,\s].[^\s]+)\s+(\d+)w)/g,
                            c = /\s/,
                            d = function(b, c, d, e) {
                                a.push({
                                    c: c,
                                    u: d,
                                    w: 1 * e
                                })
                            };
                        return function(e) {
                            return a = [], e = e.trim(), e.replace(h, "").replace(b, d), a.length || !e || c.test(e) || a.push({
                                c: e,
                                u: e,
                                w: 99
                            }), a
                        }
                    }(),
                    l = function() {
                        l.init || (l.init = !0, addEventListener("resize", function() {
                            var a, c = b.getElementsByClassName("lazymatchmedia"),
                                e = function() {
                                    var a, b;
                                    for (a = 0, b = c.length; b > a; a++) d(c[a])
                                };
                            return function() {
                                clearTimeout(a), a = setTimeout(e, 66)
                            }
                        }()))
                    },
                    m = function(b, d) {
                        var f, g = b.getAttribute("srcset") || b.getAttribute(e.srcsetAttr);
                        !g && d && (g = b._lazypolyfill ? b._lazypolyfill._set : b.getAttribute(e.srcAttr) || b.getAttribute("src")), b._lazypolyfill && b._lazypolyfill._set == g || (f = k(g || ""), d && b.parentNode && (f.isPicture = "PICTURE" == b.parentNode.nodeName.toUpperCase(), f.isPicture && a.matchMedia && (c.aC(b, "lazymatchmedia"), l())), f._set = g, Object.defineProperty(b, "_lazypolyfill", {
                            value: f,
                            writable: !0
                        }))
                    },
                    n = function(b) {
                        var d = a.devicePixelRatio || 1,
                            e = c.getX && c.getX(b);
                        return Math.min(e || d, 2.5, d)
                    },
                    o = function(b) {
                        return a.matchMedia ? (o = function(a) {
                            return !a || (matchMedia(a) || {}).matches
                        })(b) : !b
                    },
                    p = function(a) {
                        var b, d, g, h, k, l, p;
                        if (h = a, m(h, !0), k = h._lazypolyfill, k.isPicture)
                            for (d = 0, b = a.parentNode.getElementsByTagName("source"), g = b.length; g > d; d++)
                                if (e.supportsType(b[d].getAttribute("type"), a) && o(b[d].getAttribute("media"))) {
                                    h = b[d], m(h), k = h._lazypolyfill;
                                    break
                                } return k.length > 1 ? (p = h.getAttribute("sizes") || "", p = i.test(p) && parseInt(p, 10) || c.gW(a, a.parentNode), k.d = n(a), !k.src || !k.w || k.w < p ? (k.w = p, l = j(k.sort(f)), k.src = l) : l = k.src) : l = k[0], l
                    },
                    q = function(a) {
                        if (!g || !a.parentNode || "PICTURE" == a.parentNode.nodeName.toUpperCase()) {
                            var b = p(a);
                            b && b.u && a._lazypolyfill.cur != b.u && (a._lazypolyfill.cur = b.u, b.cached = !0, a.setAttribute(e.srcAttr, b.u), a.setAttribute("src", b.u))
                        }
                    };
                return q.parse = k, q
            }(), e.loadedClass && e.loadingClass && ! function() {
                var a = [];
                ['img[sizes$="px"][srcset].', "picture > img:not([srcset])."].forEach(function(b) {
                    a.push(b + e.loadedClass), a.push(b + e.loadingClass)
                }), e.pf({
                    elements: b.querySelectorAll(a.join(", "))
                })
            }()
        }
    });
    /*! lazysizes - bgset */
    ! function(a, b) {
        var c = function() {
            b(a.lazySizes), a.removeEventListener("lazyunveilread", c, !0)
        };
        b = b.bind(null, a, a.document), "object" == typeof module && module.exports ? b(require("lazysizes")) : a.lazySizes ? c() : a.addEventListener("lazyunveilread", c, !0)
    }(window, function(a, b, c) {
        "use strict";
        if (a.addEventListener) {
            var d = /\s+/g,
                e = /\s*\|\s+|\s+\|\s*/g,
                f = /^(.+?)(?:\s+\[\s*(.+?)\s*\])?$/,
                g = /\(|\)|'/,
                h = {
                    contain: 1,
                    cover: 1
                },
                i = function(a) {
                    var b = c.gW(a, a.parentNode);
                    return (!a._lazysizesWidth || b > a._lazysizesWidth) && (a._lazysizesWidth = b), a._lazysizesWidth
                },
                j = function(a) {
                    var b;
                    return b = (getComputedStyle(a) || {
                        getPropertyValue: function() {}
                    }).getPropertyValue("background-size"), !h[b] && h[a.style.backgroundSize] && (b = a.style.backgroundSize), b
                },
                k = function(a, c, g) {
                    var h = b.createElement("picture"),
                        i = c.getAttribute(lazySizesConfig.sizesAttr),
                        j = c.getAttribute("data-ratio"),
                        k = c.getAttribute("data-optimumx");
                    c._lazybgset && c._lazybgset.parentNode == c && c.removeChild(c._lazybgset), Object.defineProperty(g, "_lazybgset", {
                        value: c,
                        writable: !0
                    }), Object.defineProperty(c, "_lazybgset", {
                        value: h,
                        writable: !0
                    }), a = a.replace(d, " ").split(e), h.style.display = "none", g.className = lazySizesConfig.lazyClass, 1 != a.length || i || (i = "auto"), a.forEach(function(a) {
                        var c = b.createElement("source");
                        i && "auto" != i && c.setAttribute("sizes", i), a.match(f) && (c.setAttribute(lazySizesConfig.srcsetAttr, RegExp.$1), RegExp.$2 && c.setAttribute("media", lazySizesConfig.customMedia[RegExp.$2] || RegExp.$2)), h.appendChild(c)
                    }), i && (g.setAttribute(lazySizesConfig.sizesAttr, i), c.removeAttribute(lazySizesConfig.sizesAttr), c.removeAttribute("sizes")), k && g.setAttribute("data-optimumx", k), j && g.setAttribute("data-ratio", j), h.appendChild(g), c.appendChild(h)
                },
                l = function(a) {
                    if (a.target._lazybgset) {
                        var b = a.target,
                            d = b._lazybgset,
                            e = b.currentSrc || b.src;
                        e && (d.style.backgroundImage = "url(" + (g.test(e) ? JSON.stringify(e) : e) + ")"), b._lazybgsetLoading && (c.fire(d, "_lazyloaded", {}, !1, !0), delete b._lazybgsetLoading)
                    }
                };
            addEventListener("lazybeforeunveil", function(a) {
                var d, e, f;
                !a.defaultPrevented && (d = a.target.getAttribute("data-bgset")) && (f = a.target, e = b.createElement("img"), e.alt = "", e._lazybgsetLoading = !0, a.detail.firesLoad = !0, k(d, f, e), setTimeout(function() {
                    c.loader.unveil(e), c.rAF(function() {
                        c.fire(e, "_lazyloaded", {}, !0, !0), e.complete && l({
                            target: e
                        })
                    })
                }))
            }), b.addEventListener("load", l, !0), a.addEventListener("lazybeforesizes", function(a) {
                if (a.detail.instance == c && a.target._lazybgset && a.detail.dataAttr) {
                    var b = a.target._lazybgset,
                        d = j(b);
                    h[d] && (a.target._lazysizesParentFit = d, c.rAF(function() {
                        a.target.setAttribute("data-parent-fit", d), a.target._lazysizesParentFit && delete a.target._lazysizesParentFit
                    }))
                }
            }, !0), b.documentElement.addEventListener("lazybeforesizes", function(a) {
                !a.defaultPrevented && a.target._lazybgset && a.detail.instance == c && (a.detail.width = i(a.target._lazybgset))
            })
        }
    });
    /* lazysizes placeholder removal */
    document.addEventListener('lazyloaded', function(e) {
        e.target.parentElement.className = e.target.parentElement.className.replace('lazyload--placeholder', '');
    });

    /*!
     * imagesLoaded PACKAGED v3.1.8
     * JavaScript is all like "You images are done yet or what?"
     * MIT License
     */

    (function() {
        function e() {}

        function t(e, t) {
            for (var n = e.length; n--;)
                if (e[n].listener === t) return n;
            return -1
        }

        function n(e) {
            return function() {
                return this[e].apply(this, arguments)
            }
        }
        var i = e.prototype,
            r = this,
            o = r.EventEmitter;
        i.getListeners = function(e) {
            var t, n, i = this._getEvents();
            if ("object" == typeof e) {
                t = {};
                for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n])
            } else t = i[e] || (i[e] = []);
            return t
        }, i.flattenListeners = function(e) {
            var t, n = [];
            for (t = 0; e.length > t; t += 1) n.push(e[t].listener);
            return n
        }, i.getListenersAsObject = function(e) {
            var t, n = this.getListeners(e);
            return n instanceof Array && (t = {}, t[e] = n), t || n
        }, i.addListener = function(e, n) {
            var i, r = this.getListenersAsObject(e),
                o = "object" == typeof n;
            for (i in r) r.hasOwnProperty(i) && -1 === t(r[i], n) && r[i].push(o ? n : {
                listener: n,
                once: !1
            });
            return this
        }, i.on = n("addListener"), i.addOnceListener = function(e, t) {
            return this.addListener(e, {
                listener: t,
                once: !0
            })
        }, i.once = n("addOnceListener"), i.defineEvent = function(e) {
            return this.getListeners(e), this
        }, i.defineEvents = function(e) {
            for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]);
            return this
        }, i.removeListener = function(e, n) {
            var i, r, o = this.getListenersAsObject(e);
            for (r in o) o.hasOwnProperty(r) && (i = t(o[r], n), -1 !== i && o[r].splice(i, 1));
            return this
        }, i.off = n("removeListener"), i.addListeners = function(e, t) {
            return this.manipulateListeners(!1, e, t)
        }, i.removeListeners = function(e, t) {
            return this.manipulateListeners(!0, e, t)
        }, i.manipulateListeners = function(e, t, n) {
            var i, r, o = e ? this.removeListener : this.addListener,
                s = e ? this.removeListeners : this.addListeners;
            if ("object" != typeof t || t instanceof RegExp)
                for (i = n.length; i--;) o.call(this, t, n[i]);
            else
                for (i in t) t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? o.call(this, i, r) : s.call(this, i, r));
            return this
        }, i.removeEvent = function(e) {
            var t, n = typeof e,
                i = this._getEvents();
            if ("string" === n) delete i[e];
            else if ("object" === n)
                for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t];
            else delete this._events;
            return this
        }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function(e, t) {
            var n, i, r, o, s = this.getListenersAsObject(e);
            for (r in s)
                if (s.hasOwnProperty(r))
                    for (i = s[r].length; i--;) n = s[r][i], n.once === !0 && this.removeListener(e, n.listener), o = n.listener.apply(this, t || []), o === this._getOnceReturnValue() && this.removeListener(e, n.listener);
            return this
        }, i.trigger = n("emitEvent"), i.emit = function(e) {
            var t = Array.prototype.slice.call(arguments, 1);
            return this.emitEvent(e, t)
        }, i.setOnceReturnValue = function(e) {
            return this._onceReturnValue = e, this
        }, i._getOnceReturnValue = function() {
            return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
        }, i._getEvents = function() {
            return this._events || (this._events = {})
        }, e.noConflict = function() {
            return r.EventEmitter = o, e
        }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
            return e
        }) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e
    }).call(this),
        function(e) {
            function t(t) {
                var n = e.event;
                return n.target = n.target || n.srcElement || t, n
            }
            var n = document.documentElement,
                i = function() {};
            n.addEventListener ? i = function(e, t, n) {
                e.addEventListener(t, n, !1)
            } : n.attachEvent && (i = function(e, n, i) {
                e[n + i] = i.handleEvent ? function() {
                    var n = t(e);
                    i.handleEvent.call(i, n)
                } : function() {
                    var n = t(e);
                    i.call(e, n)
                }, e.attachEvent("on" + n, e[n + i])
            });
            var r = function() {};
            n.removeEventListener ? r = function(e, t, n) {
                e.removeEventListener(t, n, !1)
            } : n.detachEvent && (r = function(e, t, n) {
                e.detachEvent("on" + t, e[t + n]);
                try {
                    delete e[t + n]
                } catch (i) {
                    e[t + n] = void 0
                }
            });
            var o = {
                bind: i,
                unbind: r
            };
            "function" == typeof define && define.amd ? define("eventie/eventie", o) : e.eventie = o
        }(this),
        function(e, t) {
            "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function(n, i) {
                return t(e, n, i)
            }) : "object" == typeof exports ? module.exports = t(e, require("wolfy87-eventemitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie)
        }(window, function(e, t, n) {
            function i(e, t) {
                for (var n in t) e[n] = t[n];
                return e
            }

            function r(e) {
                return "[object Array]" === d.call(e)
            }

            function o(e) {
                var t = [];
                if (r(e)) t = e;
                else if ("number" == typeof e.length)
                    for (var n = 0, i = e.length; i > n; n++) t.push(e[n]);
                else t.push(e);
                return t
            }

            function s(e, t, n) {
                if (!(this instanceof s)) return new s(e, t);
                "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = o(e), this.options = i({}, this.options), "function" == typeof t ? n = t : i(this.options, t), n && this.on("always", n), this.getImages(), a && (this.jqDeferred = new a.Deferred);
                var r = this;
                setTimeout(function() {
                    r.check()
                })
            }

            function f(e) {
                this.img = e
            }

            function c(e) {
                this.src = e, v[e] = this
            }
            var a = e.jQuery,
                u = e.console,
                h = u !== void 0,
                d = Object.prototype.toString;
            s.prototype = new t, s.prototype.options = {}, s.prototype.getImages = function() {
                this.images = [];
                for (var e = 0, t = this.elements.length; t > e; e++) {
                    var n = this.elements[e];
                    "IMG" === n.nodeName && this.addImage(n);
                    var i = n.nodeType;
                    if (i && (1 === i || 9 === i || 11 === i))
                        for (var r = n.querySelectorAll("img"), o = 0, s = r.length; s > o; o++) {
                            var f = r[o];
                            this.addImage(f)
                        }
                }
            }, s.prototype.addImage = function(e) {
                var t = new f(e);
                this.images.push(t)
            }, s.prototype.check = function() {
                function e(e, r) {
                    return t.options.debug && h && u.log("confirm", e, r), t.progress(e), n++, n === i && t.complete(), !0
                }
                var t = this,
                    n = 0,
                    i = this.images.length;
                if (this.hasAnyBroken = !1, !i) return this.complete(), void 0;
                for (var r = 0; i > r; r++) {
                    var o = this.images[r];
                    o.on("confirm", e), o.check()
                }
            }, s.prototype.progress = function(e) {
                this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
                var t = this;
                setTimeout(function() {
                    t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e)
                })
            }, s.prototype.complete = function() {
                var e = this.hasAnyBroken ? "fail" : "done";
                this.isComplete = !0;
                var t = this;
                setTimeout(function() {
                    if (t.emit(e, t), t.emit("always", t), t.jqDeferred) {
                        var n = t.hasAnyBroken ? "reject" : "resolve";
                        t.jqDeferred[n](t)
                    }
                })
            }, a && (a.fn.imagesLoaded = function(e, t) {
                var n = new s(this, e, t);
                return n.jqDeferred.promise(a(this))
            }), f.prototype = new t, f.prototype.check = function() {
                var e = v[this.img.src] || new c(this.img.src);
                if (e.isConfirmed) return this.confirm(e.isLoaded, "cached was confirmed"), void 0;
                if (this.img.complete && void 0 !== this.img.naturalWidth) return this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0;
                var t = this;
                e.on("confirm", function(e, n) {
                    return t.confirm(e.isLoaded, n), !0
                }), e.check()
            }, f.prototype.confirm = function(e, t) {
                this.isLoaded = e, this.emit("confirm", this, t)
            };
            var v = {};
            return c.prototype = new t, c.prototype.check = function() {
                if (!this.isChecked) {
                    var e = new Image;
                    n.bind(e, "load", this), n.bind(e, "error", this), e.src = this.src, this.isChecked = !0
                }
            }, c.prototype.handleEvent = function(e) {
                var t = "on" + e.type;
                this[t] && this[t](e)
            }, c.prototype.onload = function(e) {
                this.confirm(!0, "onload"), this.unbindProxyEvents(e)
            }, c.prototype.onerror = function(e) {
                this.confirm(!1, "onerror"), this.unbindProxyEvents(e)
            }, c.prototype.confirm = function(e, t) {
                this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t)
            }, c.prototype.unbindProxyEvents = function(e) {
                n.unbind(e.target, "load", this), n.unbind(e.target, "error", this)
            }, s
        });

    /*
     Slick.js

     Version: 1.5.9
      Author: Ken Wheeler
     Website: http://kenwheeler.github.io
        Docs: http://kenwheeler.github.io/slick
        Repo: http://github.com/kenwheeler/slick
      Issues: http://github.com/kenwheeler/slick/issues
     */
    ! function(a) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
    }(function(a) {
        "use strict";
        var b = window.Slick || {};
        b = function() {
            function c(c, d) {
                var f, e = this;
                e.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: a(c),
                    appendDots: a(c),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                    nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function(a, b) {
                        return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (b + 1) + "</button>"
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    edgeFriction: .35,
                    fade: !1,
                    focusOnSelect: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    mobileFirst: !1,
                    pauseOnHover: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rows: 1,
                    rtl: !1,
                    slide: "",
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    useTransform: !1,
                    variableWidth: !1,
                    vertical: !1,
                    verticalSwiping: !1,
                    waitForAnimate: !0,
                    zIndex: 1e3
                }, e.initials = {
                    animating: !1,
                    dragging: !1,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1,
                    unslicked: !1
                }, a.extend(e, e.initials), e.activeBreakpoint = null, e.animType = null, e.animProp = null, e.breakpoints = [], e.breakpointSettings = [], e.cssTransitions = !1, e.hidden = "hidden", e.paused = !1, e.positionProp = null, e.respondTo = null, e.rowCount = 1, e.shouldClick = !0, e.$slider = a(c), e.$slidesCache = null, e.transformType = null, e.transitionType = null, e.visibilityChange = "visibilitychange", e.windowWidth = 0, e.windowTimer = null, f = a(c).data("slick") || {}, e.options = a.extend({}, e.defaults, f, d), e.currentSlide = e.options.initialSlide, e.originalSettings = e.options, "undefined" != typeof document.mozHidden ? (e.hidden = "mozHidden", e.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (e.hidden = "webkitHidden", e.visibilityChange = "webkitvisibilitychange"), e.autoPlay = a.proxy(e.autoPlay, e), e.autoPlayClear = a.proxy(e.autoPlayClear, e), e.changeSlide = a.proxy(e.changeSlide, e), e.clickHandler = a.proxy(e.clickHandler, e), e.selectHandler = a.proxy(e.selectHandler, e), e.setPosition = a.proxy(e.setPosition, e), e.swipeHandler = a.proxy(e.swipeHandler, e), e.dragHandler = a.proxy(e.dragHandler, e), e.keyHandler = a.proxy(e.keyHandler, e), e.autoPlayIterator = a.proxy(e.autoPlayIterator, e), e.instanceUid = b++, e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, e.registerBreakpoints(), e.init(!0), e.checkResponsive(!0)
            }
            var b = 0;
            return c
        }(), b.prototype.addSlide = b.prototype.slickAdd = function(b, c, d) {
            var e = this;
            if ("boolean" == typeof c) d = c, c = null;
            else if (0 > c || c >= e.slideCount) return !1;
            e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.append(e.$slides), e.$slides.each(function(b, c) {
                a(c).attr("data-slick-index", b)
            }), e.$slidesCache = e.$slides, e.reinit()
        }, b.prototype.animateHeight = function() {
            var a = this;
            if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
                var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
                a.$list.animate({
                    height: b
                }, a.options.speed)
            }
        }, b.prototype.animateSlide = function(b, c) {
            var d = {},
                e = this;
            e.animateHeight(), e.options.rtl === !0 && e.options.vertical === !1 && (b = -b), e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({
                left: b
            }, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({
                top: b
            }, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft), a({
                animStart: e.currentLeft
            }).animate({
                animStart: b
            }, {
                duration: e.options.speed,
                easing: e.options.easing,
                step: function(a) {
                    a = Math.ceil(a), e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d))
                },
                complete: function() {
                    c && c.call()
                }
            })) : (e.applyTransition(), b = Math.ceil(b), e.options.vertical === !1 ? d[e.animType] = "translate3d(" + b + "px, 0px, 0px)" : d[e.animType] = "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function() {
                e.disableTransition(), c.call()
            }, e.options.speed))
        }, b.prototype.asNavFor = function(b) {
            var c = this,
                d = c.options.asNavFor;
            d && null !== d && (d = a(d).not(c.$slider)), null !== d && "object" == typeof d && d.each(function() {
                var c = a(this).slick("getSlick");
                c.unslicked || c.slideHandler(b, !0)
            })
        }, b.prototype.applyTransition = function(a) {
            var b = this,
                c = {};
            b.options.fade === !1 ? c[b.transitionType] = b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : c[b.transitionType] = "opacity " + b.options.speed + "ms " + b.options.cssEase, b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
        }, b.prototype.autoPlay = function() {
            var a = this;
            a.autoPlayTimer && clearInterval(a.autoPlayTimer), a.slideCount > a.options.slidesToShow && a.paused !== !0 && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed))
        }, b.prototype.autoPlayClear = function() {
            var a = this;
            a.autoPlayTimer && clearInterval(a.autoPlayTimer)
        }, b.prototype.autoPlayIterator = function() {
            var a = this;
            a.options.infinite === !1 ? 1 === a.direction ? (a.currentSlide + 1 === a.slideCount - 1 && (a.direction = 0), a.slideHandler(a.currentSlide + a.options.slidesToScroll)) : (a.currentSlide - 1 === 0 && (a.direction = 1), a.slideHandler(a.currentSlide - a.options.slidesToScroll)) : a.slideHandler(a.currentSlide + a.options.slidesToScroll)
        }, b.prototype.buildArrows = function() {
            var b = this;
            b.options.arrows === !0 && (b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow"), b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow"), b.slideCount > b.options.slidesToShow ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows), b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows), b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({
                "aria-disabled": "true",
                tabindex: "-1"
            }))
        }, b.prototype.buildDots = function() {
            var c, d, b = this;
            if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) {
                for (d = '<ul class="' + b.options.dotsClass + '">', c = 0; c <= b.getDotCount(); c += 1) d += "<li>" + b.options.customPaging.call(this, b, c) + "</li>";
                d += "</ul>", b.$dots = a(d).appendTo(b.options.appendDots), b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
            }
        }, b.prototype.buildOut = function() {
            var b = this;
            b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slides.each(function(b, c) {
                a(c).attr("data-slick-index", b).data("originalStyling", a(c).attr("style") || "")
            }), b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), (b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.updateDots(), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.options.draggable === !0 && b.$list.addClass("draggable")
        }, b.prototype.buildRows = function() {
            var b, c, d, e, f, g, h, a = this;
            if (e = document.createDocumentFragment(), g = a.$slider.children(), a.options.rows > 1) {
                for (h = a.options.slidesPerRow * a.options.rows, f = Math.ceil(g.length / h), b = 0; f > b; b++) {
                    var i = document.createElement("div");
                    for (c = 0; c < a.options.rows; c++) {
                        var j = document.createElement("div");
                        for (d = 0; d < a.options.slidesPerRow; d++) {
                            var k = b * h + (c * a.options.slidesPerRow + d);
                            g.get(k) && j.appendChild(g.get(k))
                        }
                        i.appendChild(j)
                    }
                    e.appendChild(i)
                }
                a.$slider.html(e), a.$slider.children().children().children().css({
                    width: 100 / a.options.slidesPerRow + "%",
                    display: "inline-block"
                })
            }
        }, b.prototype.checkResponsive = function(b, c) {
            var e, f, g, d = this,
                h = !1,
                i = d.$slider.width(),
                j = window.innerWidth || a(window).width();
            if ("window" === d.respondTo ? g = j : "slider" === d.respondTo ? g = i : "min" === d.respondTo && (g = Math.min(j, i)), d.options.responsive && d.options.responsive.length && null !== d.options.responsive) {
                f = null;
                for (e in d.breakpoints) d.breakpoints.hasOwnProperty(e) && (d.originalSettings.mobileFirst === !1 ? g < d.breakpoints[e] && (f = d.breakpoints[e]) : g > d.breakpoints[e] && (f = d.breakpoints[e]));
                null !== f ? null !== d.activeBreakpoint ? (f !== d.activeBreakpoint || c) && (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : null !== d.activeBreakpoint && (d.activeBreakpoint = null, d.options = d.originalSettings, b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b), h = f), b || h === !1 || d.$slider.trigger("breakpoint", [d, h])
            }
        }, b.prototype.changeSlide = function(b, c) {
            var f, g, h, d = this,
                e = a(b.target);
            switch (e.is("a") && b.preventDefault(), e.is("li") || (e = e.closest("li")), h = d.slideCount % d.options.slidesToScroll !== 0, f = h ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll, b.data.message) {
                case "previous":
                    g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide - g, !1, c);
                    break;
                case "next":
                    g = 0 === f ? d.options.slidesToScroll : f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide + g, !1, c);
                    break;
                case "index":
                    var i = 0 === b.data.index ? 0 : b.data.index || e.index() * d.options.slidesToScroll;
                    d.slideHandler(d.checkNavigable(i), !1, c), e.children().trigger("focus");
                    break;
                default:
                    return
            }
        }, b.prototype.checkNavigable = function(a) {
            var c, d, b = this;
            if (c = b.getNavigableIndexes(), d = 0, a > c[c.length - 1]) a = c[c.length - 1];
            else
                for (var e in c) {
                    if (a < c[e]) {
                        a = d;
                        break
                    }
                    d = c[e]
                }
            return a
        }, b.prototype.cleanUpEvents = function() {
            var b = this;
            b.options.dots && null !== b.$dots && (a("li", b.$dots).off("click.slick", b.changeSlide), b.options.pauseOnDotsHover === !0 && b.options.autoplay === !0 && a("li", b.$dots).off("mouseenter.slick", a.proxy(b.setPaused, b, !0)).off("mouseleave.slick", a.proxy(b.setPaused, b, !1))), b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide), b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)), b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler), b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler), b.$list.off("touchend.slick mouseup.slick", b.swipeHandler), b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler), b.$list.off("click.slick", b.clickHandler), a(document).off(b.visibilityChange, b.visibility), b.$list.off("mouseenter.slick", a.proxy(b.setPaused, b, !0)), b.$list.off("mouseleave.slick", a.proxy(b.setPaused, b, !1)), b.options.accessibility === !0 && b.$list.off("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().off("click.slick", b.selectHandler), a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange), a(window).off("resize.slick.slick-" + b.instanceUid, b.resize), a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault), a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition)
        }, b.prototype.cleanUpRows = function() {
            var b, a = this;
            a.options.rows > 1 && (b = a.$slides.children().children(), b.removeAttr("style"), a.$slider.html(b))
        }, b.prototype.clickHandler = function(a) {
            var b = this;
            b.shouldClick === !1 && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault())
        }, b.prototype.destroy = function(b) {
            var c = this;
            c.autoPlayClear(), c.touchObject = {}, c.cleanUpEvents(), a(".slick-cloned", c.$slider).detach(), c.$dots && c.$dots.remove(), c.$prevArrow && c.$prevArrow.length && (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()), c.$nextArrow && c.$nextArrow.length && (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()), c.$slides && (c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
                a(this).attr("style", a(this).data("originalStyling"))
            }), c.$slideTrack.children(this.options.slide).detach(), c.$slideTrack.detach(), c.$list.detach(), c.$slider.append(c.$slides)), c.cleanUpRows(), c.$slider.removeClass("slick-slider"), c.$slider.removeClass("slick-initialized"), c.unslicked = !0, b || c.$slider.trigger("destroy", [c])
        }, b.prototype.disableTransition = function(a) {
            var b = this,
                c = {};
            c[b.transitionType] = "", b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
        }, b.prototype.fadeSlide = function(a, b) {
            var c = this;
            c.cssTransitions === !1 ? (c.$slides.eq(a).css({
                zIndex: c.options.zIndex
            }), c.$slides.eq(a).animate({
                opacity: 1
            }, c.options.speed, c.options.easing, b)) : (c.applyTransition(a), c.$slides.eq(a).css({
                opacity: 1,
                zIndex: c.options.zIndex
            }), b && setTimeout(function() {
                c.disableTransition(a), b.call()
            }, c.options.speed))
        }, b.prototype.fadeSlideOut = function(a) {
            var b = this;
            b.cssTransitions === !1 ? b.$slides.eq(a).animate({
                opacity: 0,
                zIndex: b.options.zIndex - 2
            }, b.options.speed, b.options.easing) : (b.applyTransition(a), b.$slides.eq(a).css({
                opacity: 0,
                zIndex: b.options.zIndex - 2
            }))
        }, b.prototype.filterSlides = b.prototype.slickFilter = function(a) {
            var b = this;
            null !== a && (b.$slidesCache = b.$slides, b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit())
        }, b.prototype.getCurrent = b.prototype.slickCurrentSlide = function() {
            var a = this;
            return a.currentSlide
        }, b.prototype.getDotCount = function() {
            var a = this,
                b = 0,
                c = 0,
                d = 0;
            if (a.options.infinite === !0)
                for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
            else if (a.options.centerMode === !0) d = a.slideCount;
            else
                for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
            return d - 1
        }, b.prototype.getLeft = function(a) {
            var c, d, f, b = this,
                e = 0;
            return b.slideOffset = 0, d = b.$slides.first().outerHeight(!0), b.options.infinite === !0 ? (b.slideCount > b.options.slidesToShow && (b.slideOffset = b.slideWidth * b.options.slidesToShow * -1, e = d * b.options.slidesToShow * -1), b.slideCount % b.options.slidesToScroll !== 0 && a + b.options.slidesToScroll > b.slideCount && b.slideCount > b.options.slidesToShow && (a > b.slideCount ? (b.slideOffset = (b.options.slidesToShow - (a - b.slideCount)) * b.slideWidth * -1, e = (b.options.slidesToShow - (a - b.slideCount)) * d * -1) : (b.slideOffset = b.slideCount % b.options.slidesToScroll * b.slideWidth * -1, e = b.slideCount % b.options.slidesToScroll * d * -1))) : a + b.options.slidesToShow > b.slideCount && (b.slideOffset = (a + b.options.slidesToShow - b.slideCount) * b.slideWidth, e = (a + b.options.slidesToShow - b.slideCount) * d), b.slideCount <= b.options.slidesToShow && (b.slideOffset = 0, e = 0), b.options.centerMode === !0 && b.options.infinite === !0 ? b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2) - b.slideWidth : b.options.centerMode === !0 && (b.slideOffset = 0, b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2)), c = b.options.vertical === !1 ? a * b.slideWidth * -1 + b.slideOffset : a * d * -1 + e, b.options.variableWidth === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, b.options.centerMode === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow + 1), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, c += (b.$list.width() - f.outerWidth()) / 2)), c
        }, b.prototype.getOption = b.prototype.slickGetOption = function(a) {
            var b = this;
            return b.options[a]
        }, b.prototype.getNavigableIndexes = function() {
            var e, a = this,
                b = 0,
                c = 0,
                d = [];
            for (a.options.infinite === !1 ? e = a.slideCount : (b = -1 * a.options.slidesToScroll, c = -1 * a.options.slidesToScroll, e = 2 * a.slideCount); e > b;) d.push(b), b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
            return d
        }, b.prototype.getSlick = function() {
            return this
        }, b.prototype.getSlideCount = function() {
            var c, d, e, b = this;
            return e = b.options.centerMode === !0 ? b.slideWidth * Math.floor(b.options.slidesToShow / 2) : 0, b.options.swipeToSlide === !0 ? (b.$slideTrack.find(".slick-slide").each(function(c, f) {
                return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft ? (d = f, !1) : void 0
            }), c = Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1) : b.options.slidesToScroll
        }, b.prototype.goTo = b.prototype.slickGoTo = function(a, b) {
            var c = this;
            c.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(a)
                }
            }, b)
        }, b.prototype.init = function(b) {
            var c = this;
            a(c.$slider).hasClass("slick-initialized") || (a(c.$slider).addClass("slick-initialized"), c.buildRows(), c.buildOut(), c.setProps(), c.startLoad(), c.loadSlider(), c.initializeEvents(), c.updateArrows(), c.updateDots()), b && c.$slider.trigger("init", [c]), c.options.accessibility === !0 && c.initADA()
        }, b.prototype.initArrowEvents = function() {
            var a = this;
            a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.on("click.slick", {
                message: "previous"
            }, a.changeSlide), a.$nextArrow.on("click.slick", {
                message: "next"
            }, a.changeSlide))
        }, b.prototype.initDotEvents = function() {
            var b = this;
            b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", {
                message: "index"
            }, b.changeSlide), b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && b.options.autoplay === !0 && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.setPaused, b, !0)).on("mouseleave.slick", a.proxy(b.setPaused, b, !1))
        }, b.prototype.initializeEvents = function() {
            var b = this;
            b.initArrowEvents(), b.initDotEvents(), b.$list.on("touchstart.slick mousedown.slick", {
                action: "start"
            }, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", {
                action: "move"
            }, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", {
                action: "end"
            }, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", {
                action: "end"
            }, b.swipeHandler), b.$list.on("click.slick", b.clickHandler), a(document).on(b.visibilityChange, a.proxy(b.visibility, b)), b.$list.on("mouseenter.slick", a.proxy(b.setPaused, b, !0)), b.$list.on("mouseleave.slick", a.proxy(b.setPaused, b, !1)), b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)), a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)), a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition)
        }, b.prototype.initUI = function() {
            var a = this;
            a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show(), a.options.autoplay === !0 && a.autoPlay()
        }, b.prototype.keyHandler = function(a) {
            var b = this;
            a.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({
                data: {
                    message: "previous"
                }
            }) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({
                data: {
                    message: "next"
                }
            }))
        }, b.prototype.lazyLoad = function() {
            function g(b) {
                a("img[data-lazy]", b).each(function() {
                    var b = a(this),
                        c = a(this).attr("data-lazy"),
                        d = document.createElement("img");
                    d.onload = function() {
                        b.animate({
                            opacity: 0
                        }, 100, function() {
                            b.attr("src", c).animate({
                                opacity: 1
                            }, 200, function() {
                                b.removeAttr("data-lazy").removeClass("slick-loading")
                            })
                        })
                    }, d.src = c
                })
            }
            var c, d, e, f, b = this;
            b.options.centerMode === !0 ? b.options.infinite === !0 ? (e = b.currentSlide + (b.options.slidesToShow / 2 + 1), f = e + b.options.slidesToShow + 2) : (e = Math.max(0, b.currentSlide - (b.options.slidesToShow / 2 + 1)), f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide) : (e = b.options.infinite ? b.options.slidesToShow + b.currentSlide : b.currentSlide, f = e + b.options.slidesToShow, b.options.fade === !0 && (e > 0 && e--, f <= b.slideCount && f++)), c = b.$slider.find(".slick-slide").slice(e, f), g(c), b.slideCount <= b.options.slidesToShow ? (d = b.$slider.find(".slick-slide"), g(d)) : b.currentSlide >= b.slideCount - b.options.slidesToShow ? (d = b.$slider.find(".slick-cloned").slice(0, b.options.slidesToShow), g(d)) : 0 === b.currentSlide && (d = b.$slider.find(".slick-cloned").slice(-1 * b.options.slidesToShow), g(d))
        }, b.prototype.loadSlider = function() {
            var a = this;
            a.setPosition(), a.$slideTrack.css({
                opacity: 1
            }), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad()
        }, b.prototype.next = b.prototype.slickNext = function() {
            var a = this;
            a.changeSlide({
                data: {
                    message: "next"
                }
            })
        }, b.prototype.orientationChange = function() {
            var a = this;
            a.checkResponsive(), a.setPosition()
        }, b.prototype.pause = b.prototype.slickPause = function() {
            var a = this;
            a.autoPlayClear(), a.paused = !0
        }, b.prototype.play = b.prototype.slickPlay = function() {
            var a = this;
            a.paused = !1, a.autoPlay()
        }, b.prototype.postSlide = function(a) {
            var b = this;
            b.$slider.trigger("afterChange", [b, a]), b.animating = !1, b.setPosition(), b.swipeLeft = null, b.options.autoplay === !0 && b.paused === !1 && b.autoPlay(), b.options.accessibility === !0 && b.initADA()
        }, b.prototype.prev = b.prototype.slickPrev = function() {
            var a = this;
            a.changeSlide({
                data: {
                    message: "previous"
                }
            })
        }, b.prototype.preventDefault = function(a) {
            a.preventDefault()
        }, b.prototype.progressiveLazyLoad = function() {
            var c, d, b = this;
            c = a("img[data-lazy]", b.$slider).length, c > 0 && (d = a("img[data-lazy]", b.$slider).first(), d.attr("src", null), d.attr("src", d.attr("data-lazy")).removeClass("slick-loading").load(function() {
                d.removeAttr("data-lazy"), b.progressiveLazyLoad(), b.options.adaptiveHeight === !0 && b.setPosition()
            }).error(function() {
                d.removeAttr("data-lazy"), b.progressiveLazyLoad()
            }))
        }, b.prototype.refresh = function(b) {
            var d, e, c = this;
            e = c.slideCount - c.options.slidesToShow, c.options.infinite || (c.slideCount <= c.options.slidesToShow ? c.currentSlide = 0 : c.currentSlide > e && (c.currentSlide = e)), d = c.currentSlide, c.destroy(!0), a.extend(c, c.initials, {
                currentSlide: d
            }), c.init(), b || c.changeSlide({
                data: {
                    message: "index",
                    index: d
                }
            }, !1)
        }, b.prototype.registerBreakpoints = function() {
            var c, d, e, b = this,
                f = b.options.responsive || null;
            if ("array" === a.type(f) && f.length) {
                b.respondTo = b.options.respondTo || "window";
                for (c in f)
                    if (e = b.breakpoints.length - 1, d = f[c].breakpoint, f.hasOwnProperty(c)) {
                        for (; e >= 0;) b.breakpoints[e] && b.breakpoints[e] === d && b.breakpoints.splice(e, 1), e--;
                        b.breakpoints.push(d), b.breakpointSettings[d] = f[c].settings
                    } b.breakpoints.sort(function(a, c) {
                    return b.options.mobileFirst ? a - c : c - a
                })
            }
        }, b.prototype.reinit = function() {
            var b = this;
            b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"), b.slideCount = b.$slides.length, b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll), b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0), b.registerBreakpoints(), b.setProps(), b.setupInfinite(), b.buildArrows(), b.updateArrows(), b.initArrowEvents(), b.buildDots(), b.updateDots(), b.initDotEvents(), b.checkResponsive(!1, !0), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), b.setSlideClasses(0), b.setPosition(), b.$slider.trigger("reInit", [b]), b.options.autoplay === !0 && b.focusHandler()
        }, b.prototype.resize = function() {
            var b = this;
            a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function() {
                b.windowWidth = a(window).width(), b.checkResponsive(), b.unslicked || b.setPosition()
            }, 50))
        }, b.prototype.removeSlide = b.prototype.slickRemove = function(a, b, c) {
            var d = this;
            return "boolean" == typeof a ? (b = a, a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a, d.slideCount < 1 || 0 > a || a > d.slideCount - 1 ? !1 : (d.unload(), c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(), d.$slides = d.$slideTrack.children(this.options.slide), d.$slideTrack.children(this.options.slide).detach(), d.$slideTrack.append(d.$slides), d.$slidesCache = d.$slides, void d.reinit())
        }, b.prototype.setCSS = function(a) {
            var d, e, b = this,
                c = {};
            b.options.rtl === !0 && (a = -a), d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px", e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px", c[b.positionProp] = a, b.transformsEnabled === !1 ? b.$slideTrack.css(c) : (c = {}, b.cssTransitions === !1 ? (c[b.animType] = "translate(" + d + ", " + e + ")", b.$slideTrack.css(c)) : (c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)", b.$slideTrack.css(c)))
        }, b.prototype.setDimensions = function() {
            var a = this;
            a.options.vertical === !1 ? a.options.centerMode === !0 && a.$list.css({
                padding: "0px " + a.options.centerPadding
            }) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow), a.options.centerMode === !0 && a.$list.css({
                padding: a.options.centerPadding + " 0px"
            })), a.listWidth = a.$list.width(), a.listHeight = a.$list.height(), a.options.vertical === !1 && a.options.variableWidth === !1 ? (a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow), a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length))) : a.options.variableWidth === !0 ? a.$slideTrack.width(5e3 * a.slideCount) : (a.slideWidth = Math.ceil(a.listWidth), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length)));
            var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
            a.options.variableWidth === !1 && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b)
        }, b.prototype.setFade = function() {
            var c, b = this;
            b.$slides.each(function(d, e) {
                c = b.slideWidth * d * -1, b.options.rtl === !0 ? a(e).css({
                    position: "relative",
                    right: c,
                    top: 0,
                    zIndex: b.options.zIndex - 2,
                    opacity: 0
                }) : a(e).css({
                    position: "relative",
                    left: c,
                    top: 0,
                    zIndex: b.options.zIndex - 2,
                    opacity: 0
                })
            }), b.$slides.eq(b.currentSlide).css({
                zIndex: b.options.zIndex - 1,
                opacity: 1
            })
        }, b.prototype.setHeight = function() {
            var a = this;
            if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
                var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
                a.$list.css("height", b)
            }
        }, b.prototype.setOption = b.prototype.slickSetOption = function(b, c, d) {
            var f, g, e = this;
            if ("responsive" === b && "array" === a.type(c))
                for (g in c)
                    if ("array" !== a.type(e.options.responsive)) e.options.responsive = [c[g]];
                    else {
                        for (f = e.options.responsive.length - 1; f >= 0;) e.options.responsive[f].breakpoint === c[g].breakpoint && e.options.responsive.splice(f, 1), f--;
                        e.options.responsive.push(c[g])
                    }
            else e.options[b] = c;
            d === !0 && (e.unload(), e.reinit())
        }, b.prototype.setPosition = function() {
            var a = this;
            a.setDimensions(), a.setHeight(), a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), a.$slider.trigger("setPosition", [a])
        }, b.prototype.setProps = function() {
            var a = this,
                b = document.body.style;
            a.positionProp = a.options.vertical === !0 ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0), a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : a.options.zIndex = a.defaults.zIndex), void 0 !== b.OTransform && (a.animType = "OTransform", a.transformType = "-o-transform", a.transitionType = "OTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition", void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)), void 0 !== b.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.msTransform && (a.animType = "msTransform", a.transformType = "-ms-transform", a.transitionType = "msTransition", void 0 === b.msTransform && (a.animType = !1)), void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = a.options.useTransform && null !== a.animType && a.animType !== !1
        }, b.prototype.setSlideClasses = function(a) {
            var c, d, e, f, b = this;
            d = b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), b.$slides.eq(a).addClass("slick-current"), b.options.centerMode === !0 ? (c = Math.floor(b.options.slidesToShow / 2), b.options.infinite === !0 && (a >= c && a <= b.slideCount - 1 - c ? b.$slides.slice(a - c, a + c + 1).addClass("slick-active").attr("aria-hidden", "false") : (e = b.options.slidesToShow + a, d.slice(e - c + 1, e + c + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === a ? d.eq(d.length - 1 - b.options.slidesToShow).addClass("slick-center") : a === b.slideCount - 1 && d.eq(b.options.slidesToShow).addClass("slick-center")), b.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= b.slideCount - b.options.slidesToShow ? b.$slides.slice(a, a + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : d.length <= b.options.slidesToShow ? d.addClass("slick-active").attr("aria-hidden", "false") : (f = b.slideCount % b.options.slidesToShow, e = b.options.infinite === !0 ? b.options.slidesToShow + a : a, b.options.slidesToShow == b.options.slidesToScroll && b.slideCount - a < b.options.slidesToShow ? d.slice(e - (b.options.slidesToShow - f), e + f).addClass("slick-active").attr("aria-hidden", "false") : d.slice(e, e + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === b.options.lazyLoad && b.lazyLoad()
        }, b.prototype.setupInfinite = function() {
            var c, d, e, b = this;
            if (b.options.fade === !0 && (b.options.centerMode = !1), b.options.infinite === !0 && b.options.fade === !1 && (d = null, b.slideCount > b.options.slidesToShow)) {
                for (e = b.options.centerMode === !0 ? b.options.slidesToShow + 1 : b.options.slidesToShow, c = b.slideCount; c > b.slideCount - e; c -= 1) d = c - 1, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d - b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");
                for (c = 0; e > c; c += 1) d = c, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d + b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");
                b.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                    a(this).attr("id", "")
                })
            }
        }, b.prototype.setPaused = function(a) {
            var b = this;
            b.options.autoplay === !0 && b.options.pauseOnHover === !0 && (b.paused = a, a ? b.autoPlayClear() : b.autoPlay())
        }, b.prototype.selectHandler = function(b) {
            var c = this,
                d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide"),
                e = parseInt(d.attr("data-slick-index"));
            return e || (e = 0), c.slideCount <= c.options.slidesToShow ? (c.setSlideClasses(e), void c.asNavFor(e)) : void c.slideHandler(e)
        }, b.prototype.slideHandler = function(a, b, c) {
            var d, e, f, g, h = null,
                i = this;
            return b = b || !1, i.animating === !0 && i.options.waitForAnimate === !0 || i.options.fade === !0 && i.currentSlide === a || i.slideCount <= i.options.slidesToShow ? void 0 : (b === !1 && i.asNavFor(a), d = a, h = i.getLeft(d), g = i.getLeft(i.currentSlide), i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft, i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll) ? void(i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function() {
                i.postSlide(d);
            }) : i.postSlide(d))) : i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll) ? void(i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function() {
                i.postSlide(d)
            }) : i.postSlide(d))) : (i.options.autoplay === !0 && clearInterval(i.autoPlayTimer), e = 0 > d ? i.slideCount % i.options.slidesToScroll !== 0 ? i.slideCount - i.slideCount % i.options.slidesToScroll : i.slideCount + d : d >= i.slideCount ? i.slideCount % i.options.slidesToScroll !== 0 ? 0 : d - i.slideCount : d, i.animating = !0, i.$slider.trigger("beforeChange", [i, i.currentSlide, e]), f = i.currentSlide, i.currentSlide = e, i.setSlideClasses(i.currentSlide), i.updateDots(), i.updateArrows(), i.options.fade === !0 ? (c !== !0 ? (i.fadeSlideOut(f), i.fadeSlide(e, function() {
                i.postSlide(e)
            })) : i.postSlide(e), void i.animateHeight()) : void(c !== !0 ? i.animateSlide(h, function() {
                i.postSlide(e)
            }) : i.postSlide(e))))
        }, b.prototype.startLoad = function() {
            var a = this;
            a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading")
        }, b.prototype.swipeDirection = function() {
            var a, b, c, d, e = this;
            return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), 0 > d && (d = 360 - Math.abs(d)), 45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : e.options.verticalSwiping === !0 ? d >= 35 && 135 >= d ? "left" : "right" : "vertical"
        }, b.prototype.swipeEnd = function(a) {
            var c, b = this;
            if (b.dragging = !1, b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0, void 0 === b.touchObject.curX) return !1;
            if (b.touchObject.edgeHit === !0 && b.$slider.trigger("edge", [b, b.swipeDirection()]), b.touchObject.swipeLength >= b.touchObject.minSwipe) switch (b.swipeDirection()) {
                case "left":
                    c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide + b.getSlideCount()) : b.currentSlide + b.getSlideCount(), b.slideHandler(c), b.currentDirection = 0, b.touchObject = {}, b.$slider.trigger("swipe", [b, "left"]);
                    break;
                case "right":
                    c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide - b.getSlideCount()) : b.currentSlide - b.getSlideCount(), b.slideHandler(c), b.currentDirection = 1, b.touchObject = {}, b.$slider.trigger("swipe", [b, "right"])
            } else b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide), b.touchObject = {})
        }, b.prototype.swipeHandler = function(a) {
            var b = this;
            if (!(b.options.swipe === !1 || "ontouchend" in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))) switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, b.options.verticalSwiping === !0 && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold), a.data.action) {
                case "start":
                    b.swipeStart(a);
                    break;
                case "move":
                    b.swipeMove(a);
                    break;
                case "end":
                    b.swipeEnd(a)
            }
        }, b.prototype.swipeMove = function(a) {
            var d, e, f, g, h, b = this;
            return h = void 0 !== a.originalEvent ? a.originalEvent.touches : null, !b.dragging || h && 1 !== h.length ? !1 : (d = b.getLeft(b.currentSlide), b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX, b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY, b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2))), b.options.verticalSwiping === !0 && (b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curY - b.touchObject.startY, 2)))), e = b.swipeDirection(), "vertical" !== e ? (void 0 !== a.originalEvent && b.touchObject.swipeLength > 4 && a.preventDefault(), g = (b.options.rtl === !1 ? 1 : -1) * (b.touchObject.curX > b.touchObject.startX ? 1 : -1), b.options.verticalSwiping === !0 && (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1), f = b.touchObject.swipeLength, b.touchObject.edgeHit = !1, b.options.infinite === !1 && (0 === b.currentSlide && "right" === e || b.currentSlide >= b.getDotCount() && "left" === e) && (f = b.touchObject.swipeLength * b.options.edgeFriction, b.touchObject.edgeHit = !0), b.options.vertical === !1 ? b.swipeLeft = d + f * g : b.swipeLeft = d + f * (b.$list.height() / b.listWidth) * g, b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g), b.options.fade === !0 || b.options.touchMove === !1 ? !1 : b.animating === !0 ? (b.swipeLeft = null, !1) : void b.setCSS(b.swipeLeft)) : void 0)
        }, b.prototype.swipeStart = function(a) {
            var c, b = this;
            return 1 !== b.touchObject.fingerCount || b.slideCount <= b.options.slidesToShow ? (b.touchObject = {}, !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (c = a.originalEvent.touches[0]), b.touchObject.startX = b.touchObject.curX = void 0 !== c ? c.pageX : a.clientX, b.touchObject.startY = b.touchObject.curY = void 0 !== c ? c.pageY : a.clientY, void(b.dragging = !0))
        }, b.prototype.unfilterSlides = b.prototype.slickUnfilter = function() {
            var a = this;
            null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit())
        }, b.prototype.unload = function() {
            var b = this;
            a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(), b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(), b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
        }, b.prototype.unslick = function(a) {
            var b = this;
            b.$slider.trigger("unslick", [b, a]), b.destroy()
        }, b.prototype.updateArrows = function() {
            var b, a = this;
            b = Math.floor(a.options.slidesToShow / 2), a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && !a.options.infinite && (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && a.options.centerMode === !1 ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - 1 && a.options.centerMode === !0 && (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
        }, b.prototype.updateDots = function() {
            var a = this;
            null !== a.$dots && (a.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
        }, b.prototype.visibility = function() {
            var a = this;
            document[a.hidden] ? (a.paused = !0, a.autoPlayClear()) : a.options.autoplay === !0 && (a.paused = !1, a.autoPlay())
        }, b.prototype.initADA = function() {
            var b = this;
            b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({
                "aria-hidden": "true",
                tabindex: "-1"
            }).find("a, input, button, select").attr({
                tabindex: "-1"
            }), b.$slideTrack.attr("role", "listbox"), b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c) {
                a(this).attr({
                    role: "option",
                    "aria-describedby": "slick-slide" + b.instanceUid + c
                })
            }), null !== b.$dots && b.$dots.attr("role", "tablist").find("li").each(function(c) {
                a(this).attr({
                    role: "presentation",
                    "aria-selected": "false",
                    "aria-controls": "navigation" + b.instanceUid + c,
                    id: "slick-slide" + b.instanceUid + c
                })
            }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), b.activateADA()
        }, b.prototype.activateADA = function() {
            var a = this;
            a.$slideTrack.find(".slick-active").attr({
                "aria-hidden": "false"
            }).find("a, input, button, select").attr({
                tabindex: "0"
            })
        }, b.prototype.focusHandler = function() {
            var b = this;
            b.$slider.on("focus.slick blur.slick", "*", function(c) {
                c.stopImmediatePropagation();
                var d = a(this);
                setTimeout(function() {
                    b.isPlay && (d.is(":focus") ? (b.autoPlayClear(), b.paused = !0) : (b.paused = !1, b.autoPlay()))
                }, 0)
            })
        }, a.fn.slick = function() {
            var f, g, a = this,
                c = arguments[0],
                d = Array.prototype.slice.call(arguments, 1),
                e = a.length;
            for (f = 0; e > f; f++)
                if ("object" == typeof c || "undefined" == typeof c ? a[f].slick = new b(a[f], c) : g = a[f].slick[c].apply(a[f].slick, d), "undefined" != typeof g) return g;
            return a
        }
    });

    /*!
    	Colorbox 1.6.1
    	license: MIT
    	http://www.jacklmoore.com/colorbox
        CT: Added  minWidth/minHeight
    */
    ! function(t, e, i) {
        function n(i, n, o) {
            var h = e.createElement(i);
            return n && (h.id = Z + n), o && (h.style.cssText = o), t(h)
        }

        function o() {
            return i.innerHeight ? i.innerHeight : t(i).height()
        }

        function h(e, i) {
            i !== Object(i) && (i = {}), this.cache = {}, this.el = e, this.value = function(e) {
                var n;
                return void 0 === this.cache[e] && (n = t(this.el).attr("data-cbox-" + e), void 0 !== n ? this.cache[e] = n : void 0 !== i[e] ? this.cache[e] = i[e] : void 0 !== X[e] && (this.cache[e] = X[e])), this.cache[e]
            }, this.get = function(e) {
                var i = this.value(e);
                return t.isFunction(i) ? i.call(this.el, this) : i
            }
        }

        function r(t) {
            var e = k.length,
                i = (A + t) % e;
            return 0 > i ? e + i : i
        }

        function a(t, e) {
            return Math.round((/%/.test(t) ? ("x" === e ? E.width() : o()) / 100 : 1) * parseInt(t, 10))
        }

        function s(t, e) {
            return t.get("photo") || t.get("photoRegex").test(e)
        }

        function l(t, e) {
            return t.get("retinaUrl") && i.devicePixelRatio > 1 ? e.replace(t.get("photoRegex"), t.get("retinaSuffix")) : e
        }

        function d(t) {
            "contains" in y[0] && !y[0].contains(t.target) && t.target !== v[0] && (t.stopPropagation(), y.focus())
        }

        function c(t) {
            c.str !== t && (y.add(v).removeClass(c.str).addClass(t), c.str = t)
        }

        function g(e) {
            A = 0, e && e !== !1 && "nofollow" !== e ? (k = t("." + te).filter(function() {
                var i = t.data(this, Y),
                    n = new h(this, i);
                return n.get("rel") === e
            }), A = k.index(_.el), -1 === A && (k = k.add(_.el), A = k.length - 1)) : k = t(_.el)
        }

        function u(i) {
            t(e).trigger(i), ae.triggerHandler(i)
        }

        function f(i) {
            var o;
            if (!G) {
                if (o = t(i).data(Y), _ = new h(i, o), g(_.get("rel")), !$) {
                    $ = q = !0, c(_.get("className")), y.css({
                        visibility: "hidden",
                        display: "block",
                        opacity: ""
                    }), I = n(se, "LoadedContent", "width:0; height:0; overflow:hidden; visibility:hidden"), b.css({
                        width: "",
                        height: ""
                    }).append(I), j = T.height() + W.height() + b.outerHeight(!0) - b.height(), D = C.width() + H.width() + b.outerWidth(!0) - b.width(), N = I.outerHeight(!0), z = I.outerWidth(!0);
                    var r = a(_.get("initialWidth"), "x"),
                        s = a(_.get("initialHeight"), "y"),
                        l = _.get("maxWidth"),
                        f = _.get("maxHeight");
                    _.w = (l !== !1 ? Math.min(r, a(l, "x")) : r) - z - D, _.h = (f !== !1 ? Math.min(s, a(f, "y")) : s) - N - j, I.css({
                        width: "",
                        height: _.h
                    }), J.position(), u(ee), _.get("onOpen"), O.add(S).hide(), y.focus(), _.get("trapFocus") && e.addEventListener && (e.addEventListener("focus", d, !0), ae.one(he, function() {
                        e.removeEventListener("focus", d, !0)
                    })), _.get("returnFocus") && ae.one(he, function() {
                        t(_.el).focus()
                    })
                }
                var p = parseFloat(_.get("opacity"));
                v.css({
                    opacity: p === p ? p : "",
                    cursor: _.get("overlayClose") ? "pointer" : "",
                    visibility: "visible"
                }).show(), _.get("closeButton") ? B.html(_.get("close")).appendTo(b) : B.appendTo("<div/>"), w()
            }
        }

        function p() {
            y || (V = !1, E = t(i), y = n(se).attr({
                id: Y,
                "class": t.support.opacity === !1 ? Z + "IE" : "",
                role: "dialog",
                tabindex: "-1"
            }).hide(), v = n(se, "Overlay").hide(), M = t([n(se, "LoadingOverlay")[0], n(se, "LoadingGraphic")[0]]), x = n(se, "Wrapper"), b = n(se, "Content").append(S = n(se, "Title"), F = n(se, "Current"), P = t('<button type="button"/>').attr({
                id: Z + "Previous"
            }), K = t('<button type="button"/>').attr({
                id: Z + "Next"
            }), R = n("button", "Slideshow"), M), B = t('<button type="button"/>').attr({
                id: Z + "Close"
            }), x.append(n(se).append(n(se, "TopLeft"), T = n(se, "TopCenter"), n(se, "TopRight")), n(se, !1, "clear:left").append(C = n(se, "MiddleLeft"), b, H = n(se, "MiddleRight")), n(se, !1, "clear:left").append(n(se, "BottomLeft"), W = n(se, "BottomCenter"), n(se, "BottomRight"))).find("div div").css({
                "float": "left"
            }), L = n(se, !1, "position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"), O = K.add(P).add(F).add(R)), e.body && !y.parent().length && t(e.body).append(v, y.append(x, L))
        }

        function m() {
            function i(t) {
                t.which > 1 || t.shiftKey || t.altKey || t.metaKey || t.ctrlKey || (t.preventDefault(), f(this))
            }
            return y ? (V || (V = !0, K.click(function() {
                J.next()
            }), P.click(function() {
                J.prev()
            }), B.click(function() {
                J.close()
            }), v.click(function() {
                _.get("overlayClose") && J.close()
            }), t(e).bind("keydown." + Z, function(t) {
                var e = t.keyCode;
                $ && _.get("escKey") && 27 === e && (t.preventDefault(), J.close()), $ && _.get("arrowKey") && k[1] && !t.altKey && (37 === e ? (t.preventDefault(), P.click()) : 39 === e && (t.preventDefault(), K.click()))
            }), t.isFunction(t.fn.on) ? t(e).on("click." + Z, "." + te, i) : t("." + te).live("click." + Z, i)), !0) : !1
        }

        function w() {
            var e, o, h, r = J.prep,
                d = ++le;
            if (q = !0, U = !1, u(re), u(ie), _.get("onLoad"), _.h = _.get("height") ? a(_.get("height"), "y") - N - j : _.get("innerHeight") && a(_.get("innerHeight"), "y"), _.w = _.get("width") ? a(_.get("width"), "x") - z - D : _.get("innerWidth") && a(_.get("innerWidth"), "x"), _.mw = _.w, _.mh = _.h, _.get("maxWidth") && (_.mw = a(_.get("maxWidth"), "x") - z - D, _.mw = _.w && _.w < _.mw ? _.w : _.mw), _.get("maxHeight") && (_.mh = a(_.get("maxHeight"), "y") - N - j, _.mh = _.h && _.h < _.mh ? _.h : _.mh), e = _.get("href"), Q = setTimeout(function() {
                    M.show()
                }, 100), _.get("inline")) {
                var c = t(e);
                h = t("<div>").hide().insertBefore(c), ae.one(re, function() {
                    h.replaceWith(c)
                }), r(c)
            } else _.get("iframe") ? r(" ") : _.get("html") ? r(_.get("html")) : s(_, e) ? (e = l(_, e), U = _.get("createImg"), t(U).addClass(Z + "Photo").bind("error." + Z, function() {
                r(n(se, "Error").html(_.get("imgError")))
            }).one("load", function() {
                d === le && setTimeout(function() {
                    var e;
                    _.get("retinaImage") && i.devicePixelRatio > 1 && (U.height = U.height / i.devicePixelRatio, U.width = U.width / i.devicePixelRatio), _.get("scalePhotos") && (o = function() {
                        U.height -= U.height * e, U.width -= U.width * e
                    }, _.mw && U.width > _.mw && (e = (U.width - _.mw) / U.width, o()), _.mh && U.height > _.mh && (e = (U.height - _.mh) / U.height, o())), (_.h || _.get("minHeight")) && (U.style.marginTop = Math.max((_.h || _.get("minHeight")) - U.height, 0) / 2 + "px"), k[1] && (_.get("loop") || k[A + 1]) && (U.style.cursor = "pointer", t(U).bind("click." + Z, function() {
                        J.next()
                    })), U.style.width = U.width + "px", U.style.height = U.height + "px", r(U)
                }, 1)
            }), U.src = e) : e && L.load(e, _.get("data"), function(e, i) {
                d === le && r("error" === i ? n(se, "Error").html(_.get("xhrError")) : t(this).contents())
            })
        }
        var v, y, x, b, T, C, H, W, k, E, I, L, M, S, F, R, K, P, B, O, _, j, D, N, z, A, U, $, q, G, Q, J, V, X = {
                html: !1,
                photo: !1,
                iframe: !1,
                inline: !1,
                transition: "elastic",
                speed: 300,
                fadeOut: 300,
                width: !1,
                initialWidth: "600",
                innerWidth: !1,
                maxWidth: !1,
                minWidth: !1,
                height: !1,
                initialHeight: "450",
                innerHeight: !1,
                maxHeight: !1,
                minHeight: !1,
                scalePhotos: !0,
                scrolling: !0,
                opacity: .9,
                preloading: !0,
                className: !1,
                overlayClose: !0,
                escKey: !0,
                arrowKey: !0,
                top: !1,
                bottom: !1,
                left: !1,
                right: !1,
                fixed: !1,
                data: void 0,
                closeButton: !0,
                fastIframe: !0,
                open: !1,
                reposition: !0,
                loop: !0,
                slideshow: !1,
                slideshowAuto: !0,
                slideshowSpeed: 2500,
                slideshowStart: "start slideshow",
                slideshowStop: "stop slideshow",
                photoRegex: /\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,
                retinaImage: !1,
                retinaUrl: !1,
                retinaSuffix: "@2x.$1",
                current: "image {current} of {total}",
                previous: "previous",
                next: "next",
                close: "close",
                xhrError: "This content failed to load.",
                imgError: "This image failed to load.",
                returnFocus: !0,
                trapFocus: !0,
                onOpen: !1,
                onLoad: !1,
                onComplete: !1,
                onCleanup: !1,
                onClosed: !1,
                rel: function() {
                    return this.rel
                },
                href: function() {
                    return t(this).attr("href")
                },
                title: function() {
                    return this.title
                },
                createImg: function() {
                    var e = new Image,
                        i = t(this).data("cbox-img-attrs");
                    return "object" == typeof i && t.each(i, function(t, i) {
                        e[t] = i
                    }), e
                },
                createIframe: function() {
                    var i = e.createElement("iframe"),
                        n = t(this).data("cbox-iframe-attrs");
                    return "object" == typeof n && t.each(n, function(t, e) {
                        i[t] = e
                    }), "frameBorder" in i && (i.frameBorder = 0), "allowTransparency" in i && (i.allowTransparency = "true"), i.name = (new Date).getTime(), i.allowFullScreen = !0, i
                }
            },
            Y = "colorbox",
            Z = "cbox",
            te = Z + "Element",
            ee = Z + "_open",
            ie = Z + "_load",
            ne = Z + "_complete",
            oe = Z + "_cleanup",
            he = Z + "_closed",
            re = Z + "_purge",
            ae = t("<a/>"),
            se = "div",
            le = 0,
            de = {},
            ce = function() {
                function t() {
                    clearTimeout(r)
                }

                function e() {
                    (_.get("loop") || k[A + 1]) && (t(), r = setTimeout(J.next, _.get("slideshowSpeed")))
                }

                function i() {
                    R.html(_.get("slideshowStop")).unbind(s).one(s, n), ae.bind(ne, e).bind(ie, t), y.removeClass(a + "off").addClass(a + "on")
                }

                function n() {
                    t(), ae.unbind(ne, e).unbind(ie, t), R.html(_.get("slideshowStart")).unbind(s).one(s, function() {
                        J.next(), i()
                    }), y.removeClass(a + "on").addClass(a + "off")
                }

                function o() {
                    h = !1, R.hide(), t(), ae.unbind(ne, e).unbind(ie, t), y.removeClass(a + "off " + a + "on")
                }
                var h, r, a = Z + "Slideshow_",
                    s = "click." + Z;
                return function() {
                    h ? _.get("slideshow") || (ae.unbind(oe, o), o()) : _.get("slideshow") && k[1] && (h = !0, ae.one(oe, o), _.get("slideshowAuto") ? i() : n(), R.show())
                }
            }();
        t[Y] || (t(p), J = t.fn[Y] = t[Y] = function(e, i) {
            var n, o = this;
            return e = e || {}, t.isFunction(o) && (o = t("<a/>"), e.open = !0), o[0] ? (p(), m() && (i && (e.onComplete = i), o.each(function() {
                var i = t.data(this, Y) || {};
                t.data(this, Y, t.extend(i, e))
            }).addClass(te), n = new h(o[0], e), n.get("open") && f(o[0])), o) : o
        }, J.position = function(e, i) {
            function n() {
                T[0].style.width = W[0].style.width = b[0].style.width = parseInt(y[0].style.width, 10) - D + "px", b[0].style.height = C[0].style.height = H[0].style.height = parseInt(y[0].style.height, 10) - j + "px"
            }
            var h, r, s, l = 0,
                d = 0,
                c = y.offset();
            if (E.unbind("resize." + Z), y.css({
                    top: -9e4,
                    left: -9e4
                }), r = E.scrollTop(), s = E.scrollLeft(), _.get("fixed") ? (c.top -= r, c.left -= s, y.css({
                    position: "fixed"
                })) : (l = r, d = s, y.css({
                    position: "absolute"
                })), d += _.get("right") !== !1 ? Math.max(E.width() - _.w - z - D - a(_.get("right"), "x"), 0) : _.get("left") !== !1 ? a(_.get("left"), "x") : Math.round(Math.max(E.width() - _.w - z - D, 0) / 2), l += _.get("bottom") !== !1 ? Math.max(o() - _.h - N - j - a(_.get("bottom"), "y"), 0) : _.get("top") !== !1 ? a(_.get("top"), "y") : Math.round(Math.max(o() - _.h - N - j, 0) / 2), y.css({
                    top: c.top,
                    left: c.left,
                    visibility: "visible"
                }), x[0].style.width = x[0].style.height = "9999px", h = {
                    width: _.w + z + D,
                    height: _.h + N + j,
                    top: l,
                    left: d
                }, e) {
                var g = 0;
                t.each(h, function(t) {
                    return h[t] !== de[t] ? void(g = e) : void 0
                }), e = g
            }
            de = h, e || y.css(h), y.dequeue().animate(h, {
                duration: e || 0,
                complete: function() {
                    n(), q = !1, x[0].style.width = _.w + z + D + "px", x[0].style.height = _.h + N + j + "px", _.get("reposition") && setTimeout(function() {
                        E.bind("resize." + Z, J.position)
                    }, 1), t.isFunction(i) && i()
                },
                step: n
            })
        }, J.resize = function(t) {
            var e;
            $ && (t = t || {}, t.width && (_.w = a(t.width, "x") - z - D), t.innerWidth && (_.w = a(t.innerWidth, "x")), I.css({
                width: _.w
            }), t.height && (_.h = a(t.height, "y") - N - j), t.innerHeight && (_.h = a(t.innerHeight, "y")), t.innerHeight || t.height || (e = I.scrollTop(), I.css({
                height: "auto"
            }), _.h = I.height()), I.css({
                height: _.h
            }), e && I.scrollTop(e), J.position("none" === _.get("transition") ? 0 : _.get("speed")))
        }, J.prep = function(i) {
            function o() {
                return _.w = _.w || I.width(), _.get("minWidth") && _.w < _.get("minWidth") && (_.w = a(_.get("minWidth"), "x")), _.w = _.mw && _.mw < _.w ? _.mw : _.w, _.w
            }

            function d() {
                return _.h = _.h || I.height(), _.get("minHeight") && _.h < _.get("minHeight") && (_.h = a(_.get("minHeight"), "y")), _.h = _.mh && _.mh < _.h ? _.mh : _.h, _.h
            }
            if ($) {
                var g, f = "none" === _.get("transition") ? 0 : _.get("speed");
                I.remove(), I = n(se, "LoadedContent").append(i), I.hide().appendTo(L.show()).css({
                    width: o(),
                    overflow: _.get("scrolling") ? "auto" : "hidden"
                }).css({
                    height: d()
                }).prependTo(b), L.hide(), t(U).css({
                    "float": "none"
                }), c(_.get("className")), g = function() {
                    function i() {
                        t.support.opacity === !1 && y[0].style.removeAttribute("filter")
                    }
                    var n, o, a = k.length;
                    $ && (o = function() {
                        clearTimeout(Q), M.hide(), u(ne), _.get("onComplete")
                    }, S.html(_.get("title")).show(), I.show(), a > 1 ? ("string" == typeof _.get("current") && F.html(_.get("current").replace("{current}", A + 1).replace("{total}", a)).show(), K[_.get("loop") || a - 1 > A ? "show" : "hide"]().html(_.get("next")), P[_.get("loop") || A ? "show" : "hide"]().html(_.get("previous")), ce(), _.get("preloading") && t.each([r(-1), r(1)], function() {
                        var i, n = k[this],
                            o = new h(n, t.data(n, Y)),
                            r = o.get("href");
                        r && s(o, r) && (r = l(o, r), i = e.createElement("img"), i.src = r)
                    })) : O.hide(), _.get("iframe") ? (n = _.get("createIframe"), _.get("scrolling") || (n.scrolling = "no"), t(n).attr({
                        src: _.get("href"),
                        "class": Z + "Iframe"
                    }).one("load", o).appendTo(I), ae.one(re, function() {
                        n.src = "//about:blank"
                    }), _.get("fastIframe") && t(n).trigger("load")) : o(), "fade" === _.get("transition") ? y.fadeTo(f, 1, i) : i())
                }, "fade" === _.get("transition") ? y.fadeTo(f, 0, function() {
                    J.position(0, g)
                }) : J.position(f, g)
            }
        }, J.next = function() {
            !q && k[1] && (_.get("loop") || k[A + 1]) && (A = r(1), f(k[A]))
        }, J.prev = function() {
            !q && k[1] && (_.get("loop") || A) && (A = r(-1), f(k[A]))
        }, J.close = function() {
            $ && !G && (G = !0, $ = !1, u(oe), _.get("onCleanup"), E.unbind("." + Z), v.fadeTo(_.get("fadeOut") || 0, 0), y.stop().fadeTo(_.get("fadeOut") || 0, 0, function() {
                y.hide(), v.hide(), u(re), I.remove(), setTimeout(function() {
                    G = !1, u(he), _.get("onClosed")
                }, 1)
            }))
        }, J.remove = function() {
            y && (y.stop(), t[Y].close(), y.stop(!1, !0).remove(), v.remove(), G = !1, y = null, t("." + te).removeData(Y).removeClass(te), t(e).unbind("click." + Z).unbind("keydown." + Z))
        }, J.element = function() {
            return t(_.el)
        }, J.settings = X)
    }(jQuery, document, window);


    /* Placeholders.js v4.0.1 */
    /*!
     * The MIT License
     *
     * Copyright (c) 2012 James Allardice
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to
     * deal in the Software without restriction, including without limitation the
     * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
     * sell copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
     * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
     * IN THE SOFTWARE.
     */
    ! function(a) {
        "use strict";

        function b() {}

        function c() {
            try {
                return document.activeElement
            } catch (a) {}
        }

        function d(a, b) {
            for (var c = 0, d = a.length; d > c; c++)
                if (a[c] === b) return !0;
            return !1
        }

        function e(a, b, c) {
            return a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, c) : void 0
        }

        function f(a, b) {
            var c;
            a.createTextRange ? (c = a.createTextRange(), c.move("character", b), c.select()) : a.selectionStart && (a.focus(), a.setSelectionRange(b, b))
        }

        function g(a, b) {
            try {
                return a.type = b, !0
            } catch (c) {
                return !1
            }
        }

        function h(a, b) {
            if (a && a.getAttribute(B)) b(a);
            else
                for (var c, d = a ? a.getElementsByTagName("input") : N, e = a ? a.getElementsByTagName("textarea") : O, f = d ? d.length : 0, g = e ? e.length : 0, h = f + g, i = 0; h > i; i++) c = f > i ? d[i] : e[i - f], b(c)
        }

        function i(a) {
            h(a, k)
        }

        function j(a) {
            h(a, l)
        }

        function k(a, b) {
            var c = !!b && a.value !== b,
                d = a.value === a.getAttribute(B);
            if ((c || d) && "true" === a.getAttribute(C)) {
                a.removeAttribute(C), a.value = a.value.replace(a.getAttribute(B), ""), a.className = a.className.replace(A, "");
                var e = a.getAttribute(I);
                parseInt(e, 10) >= 0 && (a.setAttribute("maxLength", e), a.removeAttribute(I));
                var f = a.getAttribute(D);
                return f && (a.type = f), !0
            }
            return !1
        }

        function l(a) {
            var b = a.getAttribute(B);
            if ("" === a.value && b) {
                a.setAttribute(C, "true"), a.value = b, a.className += " " + z;
                var c = a.getAttribute(I);
                c || (a.setAttribute(I, a.maxLength), a.removeAttribute("maxLength"));
                var d = a.getAttribute(D);
                return d ? a.type = "text" : "password" === a.type && g(a, "text") && a.setAttribute(D, "password"), !0
            }
            return !1
        }

        function m(a) {
            return function() {
                P && a.value === a.getAttribute(B) && "true" === a.getAttribute(C) ? f(a, 0) : k(a)
            }
        }

        function n(a) {
            return function() {
                l(a)
            }
        }

        function o(a) {
            return function() {
                i(a)
            }
        }

        function p(a) {
            return function(b) {
                return v = a.value, "true" === a.getAttribute(C) && v === a.getAttribute(B) && d(x, b.keyCode) ? (b.preventDefault && b.preventDefault(), !1) : void 0
            }
        }

        function q(a) {
            return function() {
                k(a, v), "" === a.value && (a.blur(), f(a, 0))
            }
        }

        function r(a) {
            return function() {
                a === c() && a.value === a.getAttribute(B) && "true" === a.getAttribute(C) && f(a, 0)
            }
        }

        function s(a) {
            var b = a.form;
            b && "string" == typeof b && (b = document.getElementById(b), b.getAttribute(E) || (e(b, "submit", o(b)), b.setAttribute(E, "true"))), e(a, "focus", m(a)), e(a, "blur", n(a)), P && (e(a, "keydown", p(a)), e(a, "keyup", q(a)), e(a, "click", r(a))), a.setAttribute(F, "true"), a.setAttribute(B, T), (P || a !== c()) && l(a)
        }
        var t = document.createElement("input"),
            u = void 0 !== t.placeholder;
        if (a.Placeholders = {
                nativeSupport: u,
                disable: u ? b : i,
                enable: u ? b : j
            }, !u) {
            var v, w = ["text", "search", "url", "tel", "email", "password", "number", "textarea"],
                x = [27, 33, 34, 35, 36, 37, 38, 39, 40, 8, 46],
                y = "#ccc",
                z = "placeholdersjs",
                A = new RegExp("(?:^|\\s)" + z + "(?!\\S)"),
                B = "data-placeholder-value",
                C = "data-placeholder-active",
                D = "data-placeholder-type",
                E = "data-placeholder-submit",
                F = "data-placeholder-bound",
                G = "data-placeholder-focus",
                H = "data-placeholder-live",
                I = "data-placeholder-maxlength",
                J = 100,
                K = document.getElementsByTagName("head")[0],
                L = document.documentElement,
                M = a.Placeholders,
                N = document.getElementsByTagName("input"),
                O = document.getElementsByTagName("textarea"),
                P = "false" === L.getAttribute(G),
                Q = "false" !== L.getAttribute(H),
                R = document.createElement("style");
            R.type = "text/css";
            var S = document.createTextNode("." + z + " {color:" + y + ";}");
            R.styleSheet ? R.styleSheet.cssText = S.nodeValue : R.appendChild(S), K.insertBefore(R, K.firstChild);
            for (var T, U, V = 0, W = N.length + O.length; W > V; V++) U = V < N.length ? N[V] : O[V - N.length], T = U.attributes.placeholder, T && (T = T.nodeValue, T && d(w, U.type) && s(U));
            var X = setInterval(function() {
                for (var a = 0, b = N.length + O.length; b > a; a++) U = a < N.length ? N[a] : O[a - N.length], T = U.attributes.placeholder, T ? (T = T.nodeValue, T && d(w, U.type) && (U.getAttribute(F) || s(U), (T !== U.getAttribute(B) || "password" === U.type && !U.getAttribute(D)) && ("password" === U.type && !U.getAttribute(D) && g(U, "text") && U.setAttribute(D, "password"), U.value === U.getAttribute(B) && (U.value = T), U.setAttribute(B, T)))) : U.getAttribute(C) && (k(U), U.removeAttribute(B));
                Q || clearInterval(X)
            }, J);
            e(a, "beforeunload", function() {
                M.disable()
            })
        }
    }(this),
    function(a, b) {
        "use strict";
        var c = a.fn.val,
            d = a.fn.prop;
        b.Placeholders.nativeSupport || (a.fn.val = function(a) {
            var b = c.apply(this, arguments),
                d = this.eq(0).data("placeholder-value");
            return void 0 === a && this.eq(0).data("placeholder-active") && b === d ? "" : b
        }, a.fn.prop = function(a, b) {
            return void 0 === b && this.eq(0).data("placeholder-active") && "value" === a ? "" : d.apply(this, arguments)
        })
    }(jQuery, this);

    /*!
    	Zoom 1.7.18
    	license: MIT
    	http://www.jacklmoore.com/zoom
    */
    (function(o) {
        var t = {
            url: !1,
            callback: !1,
            target: !1,
            duration: 120,
            on: "mouseover",
            touch: !0,
            onZoomIn: !1,
            onZoomOut: !1,
            magnify: 1
        };
        o.zoom = function(t, n, e, i) {
            var u, c, a, r, m, l, s, f = o(t),
                h = f.css("position"),
                d = o(n);
            return t.style.position = /(absolute|fixed)/.test(h) ? h : "relative", t.style.overflow = "hidden", e.style.width = e.style.height = "", o(e).addClass("zoomImg").css({
                position: "absolute",
                top: 0,
                left: 0,
                opacity: 0,
                width: e.width * i,
                height: e.height * i,
                border: "none",
                maxWidth: "none",
                maxHeight: "none"
            }).appendTo(t), {
                init: function() {
                    c = f.outerWidth(), u = f.outerHeight(), n === t ? (r = c, a = u) : (r = d.outerWidth(), a = d.outerHeight()), m = (e.width - c) / r, l = (e.height - u) / a, s = d.offset()
                },
                move: function(o) {
                    var t = o.pageX - s.left,
                        n = o.pageY - s.top;
                    n = Math.max(Math.min(n, a), 0), t = Math.max(Math.min(t, r), 0), e.style.left = t * -m + "px", e.style.top = n * -l + "px"
                }
            }
        }, o.fn.zoom = function(n) {
            return this.each(function() {
                var e = o.extend({}, t, n || {}),
                    i = e.target && o(e.target)[0] || this,
                    u = this,
                    c = o(u),
                    a = document.createElement("img"),
                    r = o(a),
                    m = "mousemove.zoom",
                    l = !1,
                    s = !1;
                if (!e.url) {
                    var f = u.querySelector("img");
                    if (f && (e.url = f.getAttribute("data-src") || f.currentSrc || f.src), !e.url) return
                }
                c.one("zoom.destroy", function(o, t) {
                    c.off(".zoom"), i.style.position = o, i.style.overflow = t, a.onload = null, r.remove()
                }.bind(this, i.style.position, i.style.overflow)), a.onload = function() {
                    function t(t) {
                        f.init(), f.move(t), r.stop().fadeTo(o.support.opacity ? e.duration : 0, 1, o.isFunction(e.onZoomIn) ? e.onZoomIn.call(a) : !1)
                    }

                    function n() {
                        r.stop().fadeTo(e.duration, 0, o.isFunction(e.onZoomOut) ? e.onZoomOut.call(a) : !1)
                    }
                    var f = o.zoom(i, u, a, e.magnify);
                    "grab" === e.on ? c.on("mousedown.zoom", function(e) {
                        1 === e.which && (o(document).one("mouseup.zoom", function() {
                            n(), o(document).off(m, f.move)
                        }), t(e), o(document).on(m, f.move), e.preventDefault())
                    }) : "click" === e.on ? c.on("click.zoom", function(e) {
                        return l ? void 0 : (l = !0, t(e), o(document).on(m, f.move), o(document).one("click.zoom", function() {
                            n(), l = !1, o(document).off(m, f.move)
                        }), !1)
                    }) : "toggle" === e.on ? c.on("click.zoom", function(o) {
                        l ? n() : t(o), l = !l
                    }) : "mouseover" === e.on && (f.init(), c.on("mouseenter.zoom", t).on("mouseleave.zoom", n).on(m, f.move)), e.touch && c.on("touchstart.zoom", function(o) {
                        o.preventDefault(), s ? (s = !1, n()) : (s = !0, t(o.originalEvent.touches[0] || o.originalEvent.changedTouches[0]))
                    }).on("touchmove.zoom", function(o) {
                        o.preventDefault(), f.move(o.originalEvent.touches[0] || o.originalEvent.changedTouches[0])
                    }).on("touchend.zoom", function(o) {
                        o.preventDefault(), s && (s = !1, n())
                    }), o.isFunction(e.callback) && e.callback.call(a)
                }, a.src = e.url
            })
        }, o.fn.zoom.defaults = t
    })(window.jQuery);

    /*
     * debouncedresize: special jQuery event that happens once after a window resize
     *
     * latest version and complete README available on Github:
     * https://github.com/louisremi/jquery-smartresize
     *
     * Copyright 2012 @louis_remi
     * Licensed under the MIT license.
     *
     * This saved you an hour of work?
     * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
     */
    (function($) {
        var $event = $.event,
            $special, resizeTimeout;
        $special = $event.special.debouncedresize = {
            setup: function() {
                $(this).on("resize", $special.handler)
            },
            teardown: function() {
                $(this).off("resize", $special.handler)
            },
            handler: function(event, execAsap) {
                var context = this,
                    args = arguments,
                    dispatch = function() {
                        event.type = "debouncedresize";
                        $event.dispatch.apply(context, args)
                    };
                if (resizeTimeout) clearTimeout(resizeTimeout);
                execAsap ? dispatch() : resizeTimeout = setTimeout(dispatch, $special.threshold)
            },
            threshold: 150
        }
    })(jQuery);


    /// Turn a select into clicky boxes
    $.fn.clickyBoxes = function(prefix) {
        return $(this).filter('select:not(.replaced)').addClass('replaced').each(function() {
            //Make sure rows are unique
            var prefix = prefix || $(this).attr('id');
            //Create container
            var $optCont = $('<ul class="clickyboxes"/>').attr('id', 'clickyboxes-' + prefix).data('select', $(this)).insertAfter(this);

            var $label;
            if ($(this).is('[id]')) {
                $label = $('label[for="' + $(this).attr('id') + '"]'); // Grab real label
            } else {
                $label = $(this).siblings('label'); // Rough guess
            }
            if ($label.length > 0) {
                $optCont.addClass('options-' + $label.html().toLowerCase().replace(/[^a-z0-9]/, '-'));
            }

            //Add options to container
            $(this).find('option').each(function() {
                $('<li/>').appendTo($optCont).append(
                    $('<a href="#"/>').attr('data-value', $(this).val()).html($(this).html())
                    .addClass('opt-' + $(this).text().toLowerCase().replace(/[^a-z0-9]*/g, '-').replace(/-+/g, '-').replace(/-*$/, ''))
                );
            });
            //Select change event
            $(this).hide().addClass('replaced').on('change keyup', function() {
                //Choose the right option to show
                $optCont.find('a').removeClass('active').filter('[data-value="' + $(this).val() + '"]').addClass('active');
            }).trigger('keyup'); //Initial value
            //Button click event
            $optCont.on('click', 'a', function() {
                if (!$(this).hasClass('active')) {
                    $(this).closest('.clickyboxes').data('select').val($(this).data('value')).trigger('change');
                }
                return false;
            });
        });
    };

    /// Restyling select dropdowns
    var chevronDown = '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/><path d="M0-.75h24v24H0z" fill="none"/></svg>';
    $.fn.selectReplace = function(leaveLabel) {
        return $(this).filter('select:not(.replaced, .noreplace)').addClass('replaced').each(function() {
            //Add formatting containers
            var $opts = $(this).find('option');
            var initialText = $opts.filter(':selected').length > 0 ? $opts.filter(':selected').text() : $opts.first().text();
            var $cont = $(this).wrap('<div class="pretty-select">').parent().addClass('id-' + $(this).attr('id'))
                .append('<span class="text"><span class="value">' + initialText + '</span></span>' + chevronDown);
            $cont.toggleClass('plaintext', $(this).hasClass('plaintext'));
        }).on('change keyup', function() {
            $(this).siblings('.text').find('.value').html($(this).find(':selected').html());
        });
    };

    /// Crop and scale images to a specific ratio
    $.fn.cropImageToRatio = function(params) {
        //params
        var params = $.extend({
            ratio: 4 / 3
        }, params);
        //loop all images
        return $(this).each(function() {
            //init
            if (typeof $(this).data('imgratio') == 'undefined') {
                //save ratios
                var imgRatio = $(this).width() / $(this).height(),
                    viewRatio = params.ratio;
                $(this).data('imgratio', imgRatio);
                $(this).css({
                    position: 'absolute',
                    maxWidth: 'none',
                    maxHeight: 'none'
                }).wrap('<div/>').parent().css({
                    height: 0,
                    paddingTop: 100 / params.ratio + '%',
                    overflow: 'hidden',
                    position: 'relative'
                });
                if (imgRatio < viewRatio) {
                    $(this).css({
                        top: -(viewRatio / (imgRatio * 2) - 0.5) * 100 + '%',
                        left: 0,
                        width: '100%',
                        height: 'auto'
                    });
                } else {
                    $(this).css({
                        top: 0,
                        left: -(imgRatio / (viewRatio * 2) - 0.5) * 100 + '%',
                        width: 'auto',
                        height: '100%'
                    });
                }
            }
        });
    };

    $.fn.staggerEvent = function(ev, delay, initialDelay) {
        var ev = ev,
            delay = delay,
            $els = $(this);
        if (typeof initialDelay === 'undefined') initialDelay = 0;
        setTimeout(function() {
            $els.each(function(i) {
                var $this = $(this);
                setTimeout(function() {
                    if (typeof ev === 'function') {
                        ev($this);
                    } else {
                        $this.trigger(ev);
                    }
                }, delay * i);
            });
        }, initialDelay);
        return $(this);
    };

})(theme.jQuery);