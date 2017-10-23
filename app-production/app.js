(function(e, t) {
    typeof module == "object" && typeof module.exports == "object" ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
})(typeof window != "undefined" ? window : this, function(window, noGlobal) {
    function isArraylike(e) {
        var t = e.length,
            n = jQuery.type(e);
        return n === "function" || jQuery.isWindow(e) ? !1 : e.nodeType === 1 && t ? !0 : n === "array" || t === 0 || typeof t == "number" && t > 0 && t - 1 in e
    }

    function winnow(e, t, n) {
        if (jQuery.isFunction(t)) return jQuery.grep(e, function(e, r) {
            return !!t.call(e, r, e) !== n
        });
        if (t.nodeType) return jQuery.grep(e, function(e) {
            return e === t !== n
        });
        if (typeof t == "string") {
            if (risSimple.test(t)) return jQuery.filter(t, e, n);
            t = jQuery.filter(t, e)
        }
        return jQuery.grep(e, function(e) {
            return indexOf.call(t, e) >= 0 !== n
        })
    }

    function sibling(e, t) {
        while ((e = e[t]) && e.nodeType !== 1);
        return e
    }

    function createOptions(e) {
        var t = optionsCache[e] = {};
        return jQuery.each(e.match(rnotwhite) || [], function(e, n) {
            t[n] = !0
        }), t
    }

    function completed() {
        document.removeEventListener("DOMContentLoaded", completed, !1), window.removeEventListener("load", completed, !1), jQuery.ready()
    }

    function Data() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {}
            }
        }), this.expando = jQuery.expando + Math.random()
    }

    function dataAttr(e, t, n) {
        var r;
        if (n === undefined && e.nodeType === 1) {
            r = "data-" + t.replace(rmultiDash, "-$1").toLowerCase(), n = e.getAttribute(r);
            if (typeof n == "string") {
                try {
                    n = n === "true" ? !0 : n === "false" ? !1 : n === "null" ? null : +n + "" === n ? +n : rbrace.test(n) ? jQuery.parseJSON(n) : n
                } catch (i) {}
                data_user.set(e, t, n)
            } else n = undefined
        }
        return n
    }

    function returnTrue() {
        return !0
    }

    function returnFalse() {
        return !1
    }

    function safeActiveElement() {
        try {
            return document.activeElement
        } catch (e) {}
    }

    function manipulationTarget(e, t) {
        return jQuery.nodeName(e, "table") && jQuery.nodeName(t.nodeType !== 11 ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function disableScript(e) {
        return e.type = (e.getAttribute("type") !== null) + "/" + e.type, e
    }

    function restoreScript(e) {
        var t = rscriptTypeMasked.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function setGlobalEval(e, t) {
        var n = 0,
            r = e.length;
        for (; n < r; n++) data_priv.set(e[n], "globalEval", !t || data_priv.get(t[n], "globalEval"))
    }

    function cloneCopyEvent(e, t) {
        var n, r, i, s, o, u, a, f;
        if (t.nodeType !== 1) return;
        if (data_priv.hasData(e)) {
            s = data_priv.access(e), o = data_priv.set(t, s), f = s.events;
            if (f) {
                delete o.handle, o.events = {};
                for (i in f)
                    for (n = 0, r = f[i].length; n < r; n++) jQuery.event.add(t, i, f[i][n])
            }
        }
        data_user.hasData(e) && (u = data_user.access(e), a = jQuery.extend({}, u), data_user.set(t, a))
    }

    function getAll(e, t) {
        var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return t === undefined || t && jQuery.nodeName(e, t) ? jQuery.merge([e], n) : n
    }

    function fixInput(e, t) {
        var n = t.nodeName.toLowerCase();
        if (n === "input" && rcheckableType.test(e.type)) t.checked = e.checked;
        else if (n === "input" || n === "textarea") t.defaultValue = e.defaultValue
    }

    function actualDisplay(e, t) {
        var n, r = jQuery(t.createElement(e)).appendTo(t.body),
            i = window.getDefaultComputedStyle && (n = window.getDefaultComputedStyle(r[0])) ? n.display : jQuery.css(r[0], "display");
        return r.detach(), i
    }

    function defaultDisplay(e) {
        var t = document,
            n = elemdisplay[e];
        if (!n) {
            n = actualDisplay(e, t);
            if (n === "none" || !n) iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = iframe[0].contentDocument, t.write(), t.close(), n = actualDisplay(e, t), iframe.detach();
            elemdisplay[e] = n
        }
        return n
    }

    function curCSS(e, t, n) {
        var r, i, s, o, u = e.style;
        return n = n || getStyles(e), n && (o = n.getPropertyValue(t) || n[t]), n && (o === "" && !jQuery.contains(e.ownerDocument, e) && (o = jQuery.style(e, t)), rnumnonpx.test(o) && rmargin.test(t) && (r = u.width, i = u.minWidth, s = u.maxWidth, u.minWidth = u.maxWidth = u.width = o, o = n.width, u.width = r, u.minWidth = i, u.maxWidth = s)), o !== undefined ? o + "" : o
    }

    function addGetHookIf(e, t) {
        return {
            get: function() {
                if (e()) {
                    delete this.get;
                    return
                }
                return (this.get = t).apply(this, arguments)
            }
        }
    }

    function vendorPropName(e, t) {
        if (t in e) return t;
        var n = t[0].toUpperCase() + t.slice(1),
            r = t,
            i = cssPrefixes.length;
        while (i--) {
            t = cssPrefixes[i] + n;
            if (t in e) return t
        }
        return r
    }

    function setPositiveNumber(e, t, n) {
        var r = rnumsplit.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function augmentWidthOrHeight(e, t, n, r, i) {
        var s = n === (r ? "border" : "content") ? 4 : t === "width" ? 1 : 0,
            o = 0;
        for (; s < 4; s += 2) n === "margin" && (o += jQuery.css(e, n + cssExpand[s], !0, i)), r ? (n === "content" && (o -= jQuery.css(e, "padding" + cssExpand[s], !0, i)), n !== "margin" && (o -= jQuery.css(e, "border" + cssExpand[s] + "Width", !0, i))) : (o += jQuery.css(e, "padding" + cssExpand[s], !0, i), n !== "padding" && (o += jQuery.css(e, "border" + cssExpand[s] + "Width", !0, i)));
        return o
    }

    function getWidthOrHeight(e, t, n) {
        var r = !0,
            i = t === "width" ? e.offsetWidth : e.offsetHeight,
            s = getStyles(e),
            o = jQuery.css(e, "boxSizing", !1, s) === "border-box";
        if (i <= 0 || i == null) {
            i = curCSS(e, t, s);
            if (i < 0 || i == null) i = e.style[t];
            if (rnumnonpx.test(i)) return i;
            r = o && (support.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0
        }
        return i + augmentWidthOrHeight(e, t, n || (o ? "border" : "content"), r, s) + "px"
    }

    function showHide(e, t) {
        var n, r, i, s = [],
            o = 0,
            u = e.length;
        for (; o < u; o++) {
            r = e[o];
            if (!r.style) continue;
            s[o] = data_priv.get(r, "olddisplay"), n = r.style.display, t ? (!s[o] && n === "none" && (r.style.display = ""), r.style.display === "" && isHidden(r) && (s[o] = data_priv.access(r, "olddisplay", defaultDisplay(r.nodeName)))) : (i = isHidden(r), (n !== "none" || !i) && data_priv.set(r, "olddisplay", i ? n : jQuery.css(r, "display")))
        }
        for (o = 0; o < u; o++) {
            r = e[o];
            if (!r.style) continue;
            if (!t || r.style.display === "none" || r.style.display === "") r.style.display = t ? s[o] || "" : "none"
        }
        return e
    }

    function Tween(e, t, n, r, i) {
        return new Tween.prototype.init(e, t, n, r, i)
    }

    function createFxNow() {
        return setTimeout(function() {
            fxNow = undefined
        }), fxNow = jQuery.now()
    }

    function genFx(e, t) {
        var n, r = 0,
            i = {
                height: e
            };
        t = t ? 1 : 0;
        for (; r < 4; r += 2 - t) n = cssExpand[r], i["margin" + n] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e), i
    }

    function createTween(e, t, n) {
        var r, i = (tweeners[t] || []).concat(tweeners["*"]),
            s = 0,
            o = i.length;
        for (; s < o; s++)
            if (r = i[s].call(n, t, e)) return r
    }

    function defaultPrefilter(e, t, n) {
        var r, i, s, o, u, a, f, l, c = this,
            h = {},
            p = e.style,
            d = e.nodeType && isHidden(e),
            v = data_priv.get(e, "fxshow");
        n.queue || (u = jQuery._queueHooks(e, "fx"), u.unqueued == null && (u.unqueued = 0, a = u.empty.fire, u.empty.fire = function() {
            u.unqueued || a()
        }), u.unqueued++, c.always(function() {
            c.always(function() {
                u.unqueued--, jQuery.queue(e, "fx").length || u.empty.fire()
            })
        })), e.nodeType === 1 && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], f = jQuery.css(e, "display"), l = f === "none" ? data_priv.get(e, "olddisplay") || defaultDisplay(e.nodeName) : f, l === "inline" && jQuery.css(e, "float") === "none" && (p.display = "inline-block")), n.overflow && (p.overflow = "hidden", c.always(function() {
            p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
        }));
        for (r in t) {
            i = t[r];
            if (rfxtypes.exec(i)) {
                delete t[r], s = s || i === "toggle";
                if (i === (d ? "hide" : "show")) {
                    if (i !== "show" || !v || v[r] === undefined) continue;
                    d = !0
                }
                h[r] = v && v[r] || jQuery.style(e, r)
            } else f = undefined
        }
        if (!jQuery.isEmptyObject(h)) {
            v ? "hidden" in v && (d = v.hidden) : v = data_priv.access(e, "fxshow", {}), s && (v.hidden = !d), d ? jQuery(e).show() : c.done(function() {
                jQuery(e).hide()
            }), c.done(function() {
                var t;
                data_priv.remove(e, "fxshow");
                for (t in h) jQuery.style(e, t, h[t])
            });
            for (r in h) o = createTween(d ? v[r] : 0, r, c), r in v || (v[r] = o.start, d && (o.end = o.start, o.start = r === "width" || r === "height" ? 1 : 0))
        } else(f === "none" ? defaultDisplay(e.nodeName) : f) === "inline" && (p.display = f)
    }

    function propFilter(e, t) {
        var n, r, i, s, o;
        for (n in e) {
            r = jQuery.camelCase(n), i = t[r], s = e[n], jQuery.isArray(s) && (i = s[1], s = e[n] = s[0]), n !== r && (e[r] = s, delete e[n]), o = jQuery.cssHooks[r];
            if (o && "expand" in o) {
                s = o.expand(s), delete e[r];
                for (n in s) n in e || (e[n] = s[n], t[n] = i)
            } else t[r] = i
        }
    }

    function Animation(e, t, n) {
        var r, i, s = 0,
            o = animationPrefilters.length,
            u = jQuery.Deferred().always(function() {
                delete a.elem
            }),
            a = function() {
                if (i) return !1;
                var t = fxNow || createFxNow(),
                    n = Math.max(0, f.startTime + f.duration - t),
                    r = n / f.duration || 0,
                    s = 1 - r,
                    o = 0,
                    a = f.tweens.length;
                for (; o < a; o++) f.tweens[o].run(s);
                return u.notifyWith(e, [f, s, n]), s < 1 && a ? n : (u.resolveWith(e, [f]), !1)
            },
            f = u.promise({
                elem: e,
                props: jQuery.extend({}, t),
                opts: jQuery.extend(!0, {
                    specialEasing: {}
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: fxNow || createFxNow(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var r = jQuery.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);
                    return f.tweens.push(r), r
                },
                stop: function(t) {
                    var n = 0,
                        r = t ? f.tweens.length : 0;
                    if (i) return this;
                    i = !0;
                    for (; n < r; n++) f.tweens[n].run(1);
                    return t ? u.resolveWith(e, [f, t]) : u.rejectWith(e, [f, t]), this
                }
            }),
            l = f.props;
        propFilter(l, f.opts.specialEasing);
        for (; s < o; s++) {
            r = animationPrefilters[s].call(f, e, l, f.opts);
            if (r) return r
        }
        return jQuery.map(l, createTween, f), jQuery.isFunction(f.opts.start) && f.opts.start.call(e, f), jQuery.fx.timer(jQuery.extend(a, {
            elem: e,
            anim: f,
            queue: f.opts.queue
        })), f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always)
    }

    function addToPrefiltersOrTransports(e) {
        return function(t, n) {
            typeof t != "string" && (n = t, t = "*");
            var r, i = 0,
                s = t.toLowerCase().match(rnotwhite) || [];
            if (jQuery.isFunction(n))
                while (r = s[i++]) r[0] === "+" ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function inspectPrefiltersOrTransports(e, t, n, r) {
        function o(u) {
            var a;
            return i[u] = !0, jQuery.each(e[u] || [], function(e, u) {
                var f = u(t, n, r);
                if (typeof f == "string" && !s && !i[f]) return t.dataTypes.unshift(f), o(f), !1;
                if (s) return !(a = f)
            }), a
        }
        var i = {},
            s = e === transports;
        return o(t.dataTypes[0]) || !i["*"] && o("*")
    }

    function ajaxExtend(e, t) {
        var n, r, i = jQuery.ajaxSettings.flatOptions || {};
        for (n in t) t[n] !== undefined && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && jQuery.extend(!0, e, r), e
    }

    function ajaxHandleResponses(e, t, n) {
        var r, i, s, o, u = e.contents,
            a = e.dataTypes;
        while (a[0] === "*") a.shift(), r === undefined && (r = e.mimeType || t.getResponseHeader("Content-Type"));
        if (r)
            for (i in u)
                if (u[i] && u[i].test(r)) {
                    a.unshift(i);
                    break
                }
        if (a[0] in n) s = a[0];
        else {
            for (i in n) {
                if (!a[0] || e.converters[i + " " + a[0]]) {
                    s = i;
                    break
                }
                o || (o = i)
            }
            s = s || o
        }
        if (s) return s !== a[0] && a.unshift(s), n[s]
    }

    function ajaxConvert(e, t, n, r) {
        var i, s, o, u, a, f = {},
            l = e.dataTypes.slice();
        if (l[1])
            for (o in e.converters) f[o.toLowerCase()] = e.converters[o];
        s = l.shift();
        while (s) {
            e.responseFields[s] && (n[e.responseFields[s]] = t), !a && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), a = s, s = l.shift();
            if (s)
                if (s === "*") s = a;
                else if (a !== "*" && a !== s) {
                o = f[a + " " + s] || f["* " + s];
                if (!o)
                    for (i in f) {
                        u = i.split(" ");
                        if (u[1] === s) {
                            o = f[a + " " + u[0]] || f["* " + u[0]];
                            if (o) {
                                o === !0 ? o = f[i] : f[i] !== !0 && (s = u[0], l.unshift(u[1]));
                                break
                            }
                        }
                    }
                if (o !== !0)
                    if (o && e["throws"]) t = o(t);
                    else try {
                        t = o(t)
                    } catch (c) {
                        return {
                            state: "parsererror",
                            error: o ? c : "No conversion from " + a + " to " + s
                        }
                    }
            }
        }
        return {
            state: "success",
            data: t
        }
    }

    function buildParams(e, t, n, r) {
        var i;
        if (jQuery.isArray(t)) jQuery.each(t, function(t, i) {
            n || rbracket.test(e) ? r(e, i) : buildParams(e + "[" + (typeof i == "object" ? t : "") + "]", i, n, r)
        });
        else if (!n && jQuery.type(t) === "object")
            for (i in t) buildParams(e + "[" + i + "]", t[i], n, r);
        else r(e, t)
    }

    function getWindow(e) {
        return jQuery.isWindow(e) ? e : e.nodeType === 9 && e.defaultView
    }
    var arr = [],
        slice = arr.slice,
        concat = arr.concat,
        push = arr.push,
        indexOf = arr.indexOf,
        class2type = {},
        toString = class2type.toString,
        hasOwn = class2type.hasOwnProperty,
        support = {},
        document = window.document,
        version = "2.1.1",
        jQuery = function(e, t) {
            return new jQuery.fn.init(e, t)
        },
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi,
        fcamelCase = function(e, t) {
            return t.toUpperCase()
        };
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        selector: "",
        length: 0,
        toArray: function() {
            return slice.call(this)
        },
        get: function(e) {
            return e != null ? e < 0 ? this[e + this.length] : this[e] : slice.call(this)
        },
        pushStack: function(e) {
            var t = jQuery.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        },
        each: function(e, t) {
            return jQuery.each(this, e, t)
        },
        map: function(e) {
            return this.pushStack(jQuery.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        slice: function() {
            return this.pushStack(slice.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (e < 0 ? t : 0);
            return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: push,
        sort: arr.sort,
        splice: arr.splice
    }, jQuery.extend = jQuery.fn.extend = function() {
        var e, t, n, r, i, s, o = arguments[0] || {},
            u = 1,
            a = arguments.length,
            f = !1;
        typeof o == "boolean" && (f = o, o = arguments[u] || {}, u++), typeof o != "object" && !jQuery.isFunction(o) && (o = {}), u === a && (o = this, u--);
        for (; u < a; u++)
            if ((e = arguments[u]) != null)
                for (t in e) {
                    n = o[t], r = e[t];
                    if (o === r) continue;
                    f && r && (jQuery.isPlainObject(r) || (i = jQuery.isArray(r))) ? (i ? (i = !1, s = n && jQuery.isArray(n) ? n : []) : s = n && jQuery.isPlainObject(n) ? n : {}, o[t] = jQuery.extend(f, s, r)) : r !== undefined && (o[t] = r)
                }
        return o
    }, jQuery.extend({
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isFunction: function(e) {
            return jQuery.type(e) === "function"
        },
        isArray: Array.isArray,
        isWindow: function(e) {
            return e != null && e === e.window
        },
        isNumeric: function(e) {
            return !jQuery.isArray(e) && e - parseFloat(e) >= 0
        },
        isPlainObject: function(e) {
            return jQuery.type(e) !== "object" || e.nodeType || jQuery.isWindow(e) ? !1 : e.constructor && !hasOwn.call(e.constructor.prototype, "isPrototypeOf") ? !1 : !0
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        type: function(e) {
            return e == null ? e + "" : typeof e == "object" || typeof e == "function" ? class2type[toString.call(e)] || "object" : typeof e
        },
        globalEval: function(code) {
            var script, indirect = eval;
            code = jQuery.trim(code), code && (code.indexOf("use strict") === 1 ? (script = document.createElement("script"), script.text = code, document.head.appendChild(script).parentNode.removeChild(script)) : indirect(code))
        },
        camelCase: function(e) {
            return e.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, t, n) {
            var r, i = 0,
                s = e.length,
                o = isArraylike(e);
            if (n)
                if (o)
                    for (; i < s; i++) {
                        r = t.apply(e[i], n);
                        if (r === !1) break
                    } else
                        for (i in e) {
                            r = t.apply(e[i], n);
                            if (r === !1) break
                        } else if (o)
                            for (; i < s; i++) {
                                r = t.call(e[i], i, e[i]);
                                if (r === !1) break
                            } else
                                for (i in e) {
                                    r = t.call(e[i], i, e[i]);
                                    if (r === !1) break
                                }
            return e
        },
        trim: function(e) {
            return e == null ? "" : (e + "").replace(rtrim, "")
        },
        makeArray: function(e, t) {
            var n = t || [];
            return e != null && (isArraylike(Object(e)) ? jQuery.merge(n, typeof e == "string" ? [e] : e) : push.call(n, e)), n
        },
        inArray: function(e, t, n) {
            return t == null ? -1 : indexOf.call(t, e, n)
        },
        merge: function(e, t) {
            var n = +t.length,
                r = 0,
                i = e.length;
            for (; r < n; r++) e[i++] = t[r];
            return e.length = i, e
        },
        grep: function(e, t, n) {
            var r, i = [],
                s = 0,
                o = e.length,
                u = !n;
            for (; s < o; s++) r = !t(e[s], s), r !== u && i.push(e[s]);
            return i
        },
        map: function(e, t, n) {
            var r, i = 0,
                s = e.length,
                o = isArraylike(e),
                u = [];
            if (o)
                for (; i < s; i++) r = t(e[i], i, n), r != null && u.push(r);
            else
                for (i in e) r = t(e[i], i, n), r != null && u.push(r);
            return concat.apply([], u)
        },
        guid: 1,
        proxy: function(e, t) {
            var n, r, i;
            return typeof t == "string" && (n = e[t], t = e, e = n), jQuery.isFunction(e) ? (r = slice.call(arguments, 2), i = function() {
                return e.apply(t || this, r.concat(slice.call(arguments)))
            }, i.guid = e.guid = e.guid || jQuery.guid++, i) : undefined
        },
        now: Date.now,
        support: support
    }), jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
        class2type["[object " + t + "]"] = t.toLowerCase()
    });
    var Sizzle = function(e) {
        function st(e, t, r, i) {
            var s, u, f, l, c, d, g, y, S, x;
            (t ? t.ownerDocument || t : E) !== p && h(t), t = t || p, r = r || [];
            if (!e || typeof e != "string") return r;
            if ((l = t.nodeType) !== 1 && l !== 9) return [];
            if (v && !i) {
                if (s = Z.exec(e))
                    if (f = s[1]) {
                        if (l === 9) {
                            u = t.getElementById(f);
                            if (!u || !u.parentNode) return r;
                            if (u.id === f) return r.push(u), r
                        } else if (t.ownerDocument && (u = t.ownerDocument.getElementById(f)) && b(t, u) && u.id === f) return r.push(u), r
                    } else {
                        if (s[2]) return P.apply(r, t.getElementsByTagName(e)), r;
                        if ((f = s[3]) && n.getElementsByClassName && t.getElementsByClassName) return P.apply(r, t.getElementsByClassName(f)), r
                    }
                if (n.qsa && (!m || !m.test(e))) {
                    y = g = w, S = t, x = l === 9 && e;
                    if (l === 1 && t.nodeName.toLowerCase() !== "object") {
                        d = o(e), (g = t.getAttribute("id")) ? y = g.replace(tt, "\\$&") : t.setAttribute("id", y), y = "[id='" + y + "'] ", c = d.length;
                        while (c--) d[c] = y + mt(d[c]);
                        S = et.test(e) && dt(t.parentNode) || t, x = d.join(",")
                    }
                    if (x) try {
                        return P.apply(r, S.querySelectorAll(x)), r
                    } catch (T) {} finally {
                        g || t.removeAttribute("id")
                    }
                }
            }
            return a(e.replace(z, "$1"), t, r, i)
        }

        function ot() {
            function t(n, i) {
                return e.push(n + " ") > r.cacheLength && delete t[e.shift()], t[n + " "] = i
            }
            var e = [];
            return t
        }

        function ut(e) {
            return e[w] = !0, e
        }

        function at(e) {
            var t = p.createElement("div");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function ft(e, t) {
            var n = e.split("|"),
                i = e.length;
            while (i--) r.attrHandle[n[i]] = t
        }

        function lt(e, t) {
            var n = t && e,
                r = n && e.nodeType === 1 && t.nodeType === 1 && (~t.sourceIndex || A) - (~e.sourceIndex || A);
            if (r) return r;
            if (n)
                while (n = n.nextSibling)
                    if (n === t) return -1;
            return e ? 1 : -1
        }

        function ct(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return n === "input" && t.type === e
            }
        }

        function ht(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return (n === "input" || n === "button") && t.type === e
            }
        }

        function pt(e) {
            return ut(function(t) {
                return t = +t, ut(function(n, r) {
                    var i, s = e([], n.length, t),
                        o = s.length;
                    while (o--) n[i = s[o]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }

        function dt(e) {
            return e && typeof e.getElementsByTagName !== L && e
        }

        function vt() {}

        function mt(e) {
            var t = 0,
                n = e.length,
                r = "";
            for (; t < n; t++) r += e[t].value;
            return r
        }

        function gt(e, t, n) {
            var r = t.dir,
                i = n && r === "parentNode",
                s = x++;
            return t.first ? function(t, n, s) {
                while (t = t[r])
                    if (t.nodeType === 1 || i) return e(t, n, s)
            } : function(t, n, o) {
                var u, a, f = [S, s];
                if (o) {
                    while (t = t[r])
                        if (t.nodeType === 1 || i)
                            if (e(t, n, o)) return !0
                } else
                    while (t = t[r])
                        if (t.nodeType === 1 || i) {
                            a = t[w] || (t[w] = {});
                            if ((u = a[r]) && u[0] === S && u[1] === s) return f[2] = u[2];
                            a[r] = f;
                            if (f[2] = e(t, n, o)) return !0
                        }
            }
        }

        function yt(e) {
            return e.length > 1 ? function(t, n, r) {
                var i = e.length;
                while (i--)
                    if (!e[i](t, n, r)) return !1;
                return !0
            } : e[0]
        }

        function bt(e, t, n) {
            var r = 0,
                i = t.length;
            for (; r < i; r++) st(e, t[r], n);
            return n
        }

        function wt(e, t, n, r, i) {
            var s, o = [],
                u = 0,
                a = e.length,
                f = t != null;
            for (; u < a; u++)
                if (s = e[u])
                    if (!n || n(s, r, i)) o.push(s), f && t.push(u);
            return o
        }

        function Et(e, t, n, r, i, s) {
            return r && !r[w] && (r = Et(r)), i && !i[w] && (i = Et(i, s)), ut(function(s, o, u, a) {
                var f, l, c, h = [],
                    p = [],
                    d = o.length,
                    v = s || bt(t || "*", u.nodeType ? [u] : u, []),
                    m = e && (s || !t) ? wt(v, h, e, u, a) : v,
                    g = n ? i || (s ? e : d || r) ? [] : o : m;
                n && n(m, g, u, a);
                if (r) {
                    f = wt(g, p), r(f, [], u, a), l = f.length;
                    while (l--)
                        if (c = f[l]) g[p[l]] = !(m[p[l]] = c)
                }
                if (s) {
                    if (i || e) {
                        if (i) {
                            f = [], l = g.length;
                            while (l--)(c = g[l]) && f.push(m[l] = c);
                            i(null, g = [], f, a)
                        }
                        l = g.length;
                        while (l--)(c = g[l]) && (f = i ? B.call(s, c) : h[l]) > -1 && (s[f] = !(o[f] = c))
                    }
                } else g = wt(g === o ? g.splice(d, g.length) : g), i ? i(null, o, g, a) : P.apply(o, g)
            })
        }

        function St(e) {
            var t, n, i, s = e.length,
                o = r.relative[e[0].type],
                u = o || r.relative[" "],
                a = o ? 1 : 0,
                l = gt(function(e) {
                    return e === t
                }, u, !0),
                c = gt(function(e) {
                    return B.call(t, e) > -1
                }, u, !0),
                h = [function(e, n, r) {
                    return !o && (r || n !== f) || ((t = n).nodeType ? l(e, n, r) : c(e, n, r))
                }];
            for (; a < s; a++)
                if (n = r.relative[e[a].type]) h = [gt(yt(h), n)];
                else {
                    n = r.filter[e[a].type].apply(null, e[a].matches);
                    if (n[w]) {
                        i = ++a;
                        for (; i < s; i++)
                            if (r.relative[e[i].type]) break;
                        return Et(a > 1 && yt(h), a > 1 && mt(e.slice(0, a - 1).concat({
                            value: e[a - 2].type === " " ? "*" : ""
                        })).replace(z, "$1"), n, a < i && St(e.slice(a, i)), i < s && St(e = e.slice(i)), i < s && mt(e))
                    }
                    h.push(n)
                }
            return yt(h)
        }

        function xt(e, t) {
            var n = t.length > 0,
                i = e.length > 0,
                s = function(s, o, u, a, l) {
                    var c, h, d, v = 0,
                        m = "0",
                        g = s && [],
                        y = [],
                        b = f,
                        w = s || i && r.find.TAG("*", l),
                        E = S += b == null ? 1 : Math.random() || .1,
                        x = w.length;
                    l && (f = o !== p && o);
                    for (; m !== x && (c = w[m]) != null; m++) {
                        if (i && c) {
                            h = 0;
                            while (d = e[h++])
                                if (d(c, o, u)) {
                                    a.push(c);
                                    break
                                }
                            l && (S = E)
                        }
                        n && ((c = !d && c) && v--, s && g.push(c))
                    }
                    v += m;
                    if (n && m !== v) {
                        h = 0;
                        while (d = t[h++]) d(g, y, o, u);
                        if (s) {
                            if (v > 0)
                                while (m--) !g[m] && !y[m] && (y[m] = _.call(a));
                            y = wt(y)
                        }
                        P.apply(a, y), l && !s && y.length > 0 && v + t.length > 1 && st.uniqueSort(a)
                    }
                    return l && (S = E, f = b), g
                };
            return n ? ut(s) : s
        }
        var t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w = "sizzle" + -(new Date),
            E = e.document,
            S = 0,
            x = 0,
            T = ot(),
            N = ot(),
            C = ot(),
            k = function(e, t) {
                return e === t && (c = !0), 0
            },
            L = typeof undefined,
            A = 1 << 31,
            O = {}.hasOwnProperty,
            M = [],
            _ = M.pop,
            D = M.push,
            P = M.push,
            H = M.slice,
            B = M.indexOf || function(e) {
                var t = 0,
                    n = this.length;
                for (; t < n; t++)
                    if (this[t] === e) return t;
                return -1
            },
            j = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            F = "[\\x20\\t\\r\\n\\f]",
            I = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            q = I.replace("w", "w#"),
            R = "\\[" + F + "*(" + I + ")(?:" + F + "*([*^$|!~]?=)" + F + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + q + "))|)" + F + "*\\]",
            U = ":(" + I + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + R + ")*)|" + ".*" + ")\\)|)",
            z = new RegExp("^" + F + "+|((?:^|[^\\\\])(?:\\\\.)*)" + F + "+$", "g"),
            W = new RegExp("^" + F + "*," + F + "*"),
            X = new RegExp("^" + F + "*([>+~]|" + F + ")" + F + "*"),
            V = new RegExp("=" + F + "*([^\\]'\"]*?)" + F + "*\\]", "g"),
            $ = new RegExp(U),
            J = new RegExp("^" + q + "$"),
            K = {
                ID: new RegExp("^#(" + I + ")"),
                CLASS: new RegExp("^\\.(" + I + ")"),
                TAG: new RegExp("^(" + I.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + R),
                PSEUDO: new RegExp("^" + U),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + F + "*(even|odd|(([+-]|)(\\d*)n|)" + F + "*(?:([+-]|)" + F + "*(\\d+)|))" + F + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + j + ")$", "i"),
                needsContext: new RegExp("^" + F + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + F + "*((?:-\\d)?\\d*)" + F + "*\\)|)(?=[^-]|$)", "i")
            },
            Q = /^(?:input|select|textarea|button)$/i,
            G = /^h\d$/i,
            Y = /^[^{]+\{\s*\[native \w/,
            Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            et = /[+~]/,
            tt = /'|\\/g,
            nt = new RegExp("\\\\([\\da-f]{1,6}" + F + "?|(" + F + ")|.)", "ig"),
            rt = function(e, t, n) {
                var r = "0x" + t - 65536;
                return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, r & 1023 | 56320)
            };
        try {
            P.apply(M = H.call(E.childNodes), E.childNodes), M[E.childNodes.length].nodeType
        } catch (it) {
            P = {
                apply: M.length ? function(e, t) {
                    D.apply(e, H.call(t))
                } : function(e, t) {
                    var n = e.length,
                        r = 0;
                    while (e[n++] = t[r++]);
                    e.length = n - 1
                }
            }
        }
        n = st.support = {}, s = st.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? t.nodeName !== "HTML" : !1
        }, h = st.setDocument = function(e) {
            var t, i = e ? e.ownerDocument || e : E,
                o = i.defaultView;
            if (i === p || i.nodeType !== 9 || !i.documentElement) return p;
            p = i, d = i.documentElement, v = !s(i), o && o !== o.top && (o.addEventListener ? o.addEventListener("unload", function() {
                h()
            }, !1) : o.attachEvent && o.attachEvent("onunload", function() {
                h()
            })), n.attributes = at(function(e) {
                return e.className = "i", !e.getAttribute("className")
            }), n.getElementsByTagName = at(function(e) {
                return e.appendChild(i.createComment("")), !e.getElementsByTagName("*").length
            }), n.getElementsByClassName = Y.test(i.getElementsByClassName) && at(function(e) {
                return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", e.getElementsByClassName("i").length === 2
            }), n.getById = at(function(e) {
                return d.appendChild(e).id = w, !i.getElementsByName || !i.getElementsByName(w).length
            }), n.getById ? (r.find.ID = function(e, t) {
                if (typeof t.getElementById !== L && v) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [n] : []
                }
            }, r.filter.ID = function(e) {
                var t = e.replace(nt, rt);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete r.find.ID, r.filter.ID = function(e) {
                var t = e.replace(nt, rt);
                return function(e) {
                    var n = typeof e.getAttributeNode !== L && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), r.find.TAG = n.getElementsByTagName ? function(e, t) {
                if (typeof t.getElementsByTagName !== L) return t.getElementsByTagName(e)
            } : function(e, t) {
                var n, r = [],
                    i = 0,
                    s = t.getElementsByTagName(e);
                if (e === "*") {
                    while (n = s[i++]) n.nodeType === 1 && r.push(n);
                    return r
                }
                return s
            }, r.find.CLASS = n.getElementsByClassName && function(e, t) {
                if (typeof t.getElementsByClassName !== L && v) return t.getElementsByClassName(e)
            }, g = [], m = [];
            if (n.qsa = Y.test(i.querySelectorAll)) at(function(e) {
                e.innerHTML = "<select msallowclip=''><option selected=''></option></select>", e.querySelectorAll("[msallowclip^='']").length && m.push("[*^$]=" + F + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || m.push("\\[" + F + "*(?:value|" + j + ")"), e.querySelectorAll(":checked").length || m.push(":checked")
            }), at(function(e) {
                var t = i.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && m.push("name" + F + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || m.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), m.push(",.*:")
            });
            return (n.matchesSelector = Y.test(y = d.matches || d.webkitMatchesSelector || d.mozMatchesSelector || d.oMatchesSelector || d.msMatchesSelector)) && at(function(e) {
                n.disconnectedMatch = y.call(e, "div"), y.call(e, "[s!='']:x"), g.push("!=", U)
            }), m = m.length && new RegExp(m.join("|")), g = g.length && new RegExp(g.join("|")), t = Y.test(d.compareDocumentPosition), b = t || Y.test(d.contains) ? function(e, t) {
                var n = e.nodeType === 9 ? e.documentElement : e,
                    r = t && t.parentNode;
                return e === r || !!r && r.nodeType === 1 && !!(n.contains ? n.contains(r) : e.compareDocumentPosition && e.compareDocumentPosition(r) & 16)
            } : function(e, t) {
                if (t)
                    while (t = t.parentNode)
                        if (t === e) return !0;
                return !1
            }, k = t ? function(e, t) {
                if (e === t) return c = !0, 0;
                var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return r ? r : (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, r & 1 || !n.sortDetached && t.compareDocumentPosition(e) === r ? e === i || e.ownerDocument === E && b(E, e) ? -1 : t === i || t.ownerDocument === E && b(E, t) ? 1 : l ? B.call(l, e) - B.call(l, t) : 0 : r & 4 ? -1 : 1)
            } : function(e, t) {
                if (e === t) return c = !0, 0;
                var n, r = 0,
                    s = e.parentNode,
                    o = t.parentNode,
                    u = [e],
                    a = [t];
                if (!s || !o) return e === i ? -1 : t === i ? 1 : s ? -1 : o ? 1 : l ? B.call(l, e) - B.call(l, t) : 0;
                if (s === o) return lt(e, t);
                n = e;
                while (n = n.parentNode) u.unshift(n);
                n = t;
                while (n = n.parentNode) a.unshift(n);
                while (u[r] === a[r]) r++;
                return r ? lt(u[r], a[r]) : u[r] === E ? -1 : a[r] === E ? 1 : 0
            }, i
        }, st.matches = function(e, t) {
            return st(e, null, null, t)
        }, st.matchesSelector = function(e, t) {
            (e.ownerDocument || e) !== p && h(e), t = t.replace(V, "='$1']");
            if (n.matchesSelector && v && (!g || !g.test(t)) && (!m || !m.test(t))) try {
                var r = y.call(e, t);
                if (r || n.disconnectedMatch || e.document && e.document.nodeType !== 11) return r
            } catch (i) {}
            return st(t, p, null, [e]).length > 0
        }, st.contains = function(e, t) {
            return (e.ownerDocument || e) !== p && h(e), b(e, t)
        }, st.attr = function(e, t) {
            (e.ownerDocument || e) !== p && h(e);
            var i = r.attrHandle[t.toLowerCase()],
                s = i && O.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !v) : undefined;
            return s !== undefined ? s : n.attributes || !v ? e.getAttribute(t) : (s = e.getAttributeNode(t)) && s.specified ? s.value : null
        }, st.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, st.uniqueSort = function(e) {
            var t, r = [],
                i = 0,
                s = 0;
            c = !n.detectDuplicates, l = !n.sortStable && e.slice(0), e.sort(k);
            if (c) {
                while (t = e[s++]) t === e[s] && (i = r.push(s));
                while (i--) e.splice(r[i], 1)
            }
            return l = null, e
        }, i = st.getText = function(e) {
            var t, n = "",
                r = 0,
                s = e.nodeType;
            if (!s)
                while (t = e[r++]) n += i(t);
            else if (s === 1 || s === 9 || s === 11) {
                if (typeof e.textContent == "string") return e.textContent;
                for (e = e.firstChild; e; e = e.nextSibling) n += i(e)
            } else if (s === 3 || s === 4) return e.nodeValue;
            return n
        }, r = st.selectors = {
            cacheLength: 50,
            createPseudo: ut,
            match: K,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(nt, rt), e[3] = (e[3] || e[4] || e[5] || "").replace(nt, rt), e[2] === "~=" && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), e[1].slice(0, 3) === "nth" ? (e[3] || st.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * (e[3] === "even" || e[3] === "odd")), e[5] = +(e[7] + e[8] || e[3] === "odd")) : e[3] && st.error(e[0]), e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return K.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && $.test(n) && (t = o(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(nt, rt).toLowerCase();
                    return e === "*" ? function() {
                        return !0
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = T[e + " "];
                    return t || (t = new RegExp("(^|" + F + ")" + e + "(" + F + "|$)")) && T(e, function(e) {
                        return t.test(typeof e.className == "string" && e.className || typeof e.getAttribute !== L && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, t, n) {
                    return function(r) {
                        var i = st.attr(r, e);
                        return i == null ? t === "!=" : t ? (i += "", t === "=" ? i === n : t === "!=" ? i !== n : t === "^=" ? n && i.indexOf(n) === 0 : t === "*=" ? n && i.indexOf(n) > -1 : t === "$=" ? n && i.slice(-n.length) === n : t === "~=" ? (" " + i + " ").indexOf(n) > -1 : t === "|=" ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0
                    }
                },
                CHILD: function(e, t, n, r, i) {
                    var s = e.slice(0, 3) !== "nth",
                        o = e.slice(-4) !== "last",
                        u = t === "of-type";
                    return r === 1 && i === 0 ? function(e) {
                        return !!e.parentNode
                    } : function(t, n, a) {
                        var f, l, c, h, p, d, v = s !== o ? "nextSibling" : "previousSibling",
                            m = t.parentNode,
                            g = u && t.nodeName.toLowerCase(),
                            y = !a && !u;
                        if (m) {
                            if (s) {
                                while (v) {
                                    c = t;
                                    while (c = c[v])
                                        if (u ? c.nodeName.toLowerCase() === g : c.nodeType === 1) return !1;
                                    d = v = e === "only" && !d && "nextSibling"
                                }
                                return !0
                            }
                            d = [o ? m.firstChild : m.lastChild];
                            if (o && y) {
                                l = m[w] || (m[w] = {}), f = l[e] || [], p = f[0] === S && f[1], h = f[0] === S && f[2], c = p && m.childNodes[p];
                                while (c = ++p && c && c[v] || (h = p = 0) || d.pop())
                                    if (c.nodeType === 1 && ++h && c === t) {
                                        l[e] = [S, p, h];
                                        break
                                    }
                            } else if (y && (f = (t[w] || (t[w] = {}))[e]) && f[0] === S) h = f[1];
                            else
                                while (c = ++p && c && c[v] || (h = p = 0) || d.pop())
                                    if ((u ? c.nodeName.toLowerCase() === g : c.nodeType === 1) && ++h) {
                                        y && ((c[w] || (c[w] = {}))[e] = [S, h]);
                                        if (c === t) break
                                    } return h -= i, h === r || h % r === 0 && h / r >= 0
                        }
                    }
                },
                PSEUDO: function(e, t) {
                    var n, i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || st.error("unsupported pseudo: " + e);
                    return i[w] ? i(t) : i.length > 1 ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? ut(function(e, n) {
                        var r, s = i(e, t),
                            o = s.length;
                        while (o--) r = B.call(e, s[o]), e[r] = !(n[r] = s[o])
                    }) : function(e) {
                        return i(e, 0, n)
                    }) : i
                }
            },
            pseudos: {
                not: ut(function(e) {
                    var t = [],
                        n = [],
                        r = u(e.replace(z, "$1"));
                    return r[w] ? ut(function(e, t, n, i) {
                        var s, o = r(e, null, i, []),
                            u = e.length;
                        while (u--)
                            if (s = o[u]) e[u] = !(t[u] = s)
                    }) : function(e, i, s) {
                        return t[0] = e, r(t, null, s, n), !n.pop()
                    }
                }),
                has: ut(function(e) {
                    return function(t) {
                        return st(e, t).length > 0
                    }
                }),
                contains: ut(function(e) {
                    return function(t) {
                        return (t.textContent || t.innerText || i(t)).indexOf(e) > -1
                    }
                }),
                lang: ut(function(e) {
                    return J.test(e || "") || st.error("unsupported lang: " + e), e = e.replace(nt, rt).toLowerCase(),
                        function(t) {
                            var n;
                            do
                                if (n = v ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || n.indexOf(e + "-") === 0; while ((t = t.parentNode) && t.nodeType === 1);
                            return !1
                        }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === d
                },
                focus: function(e) {
                    return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: function(e) {
                    return e.disabled === !1
                },
                disabled: function(e) {
                    return e.disabled === !0
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return t === "input" && !!e.checked || t === "option" && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6) return !1;
                    return !0
                },
                parent: function(e) {
                    return !r.pseudos.empty(e)
                },
                header: function(e) {
                    return G.test(e.nodeName)
                },
                input: function(e) {
                    return Q.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return t === "input" && e.type === "button" || t === "button"
                },
                text: function(e) {
                    var t;
                    return e.nodeName.toLowerCase() === "input" && e.type === "text" && ((t = e.getAttribute("type")) == null || t.toLowerCase() === "text")
                },
                first: pt(function() {
                    return [0]
                }),
                last: pt(function(e, t) {
                    return [t - 1]
                }),
                eq: pt(function(e, t, n) {
                    return [n < 0 ? n + t : n]
                }),
                even: pt(function(e, t) {
                    var n = 0;
                    for (; n < t; n += 2) e.push(n);
                    return e
                }),
                odd: pt(function(e, t) {
                    var n = 1;
                    for (; n < t; n += 2) e.push(n);
                    return e
                }),
                lt: pt(function(e, t, n) {
                    var r = n < 0 ? n + t : n;
                    for (; --r >= 0;) e.push(r);
                    return e
                }),
                gt: pt(function(e, t, n) {
                    var r = n < 0 ? n + t : n;
                    for (; ++r < t;) e.push(r);
                    return e
                })
            }
        }, r.pseudos.nth = r.pseudos.eq;
        for (t in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) r.pseudos[t] = ct(t);
        for (t in {
                submit: !0,
                reset: !0
            }) r.pseudos[t] = ht(t);
        return vt.prototype = r.filters = r.pseudos, r.setFilters = new vt, o = st.tokenize = function(e, t) {
            var n, i, s, o, u, a, f, l = N[e + " "];
            if (l) return t ? 0 : l.slice(0);
            u = e, a = [], f = r.preFilter;
            while (u) {
                if (!n || (i = W.exec(u))) i && (u = u.slice(i[0].length) || u), a.push(s = []);
                n = !1;
                if (i = X.exec(u)) n = i.shift(), s.push({
                    value: n,
                    type: i[0].replace(z, " ")
                }), u = u.slice(n.length);
                for (o in r.filter)(i = K[o].exec(u)) && (!f[o] || (i = f[o](i))) && (n = i.shift(), s.push({
                    value: n,
                    type: o,
                    matches: i
                }), u = u.slice(n.length));
                if (!n) break
            }
            return t ? u.length : u ? st.error(e) : N(e, a).slice(0)
        }, u = st.compile = function(e, t) {
            var n, r = [],
                i = [],
                s = C[e + " "];
            if (!s) {
                t || (t = o(e)), n = t.length;
                while (n--) s = St(t[n]), s[w] ? r.push(s) : i.push(s);
                s = C(e, xt(i, r)), s.selector = e
            }
            return s
        }, a = st.select = function(e, t, i, s) {
            var a, f, l, c, h, p = typeof e == "function" && e,
                d = !s && o(e = p.selector || e);
            i = i || [];
            if (d.length === 1) {
                f = d[0] = d[0].slice(0);
                if (f.length > 2 && (l = f[0]).type === "ID" && n.getById && t.nodeType === 9 && v && r.relative[f[1].type]) {
                    t = (r.find.ID(l.matches[0].replace(nt, rt), t) || [])[0];
                    if (!t) return i;
                    p && (t = t.parentNode), e = e.slice(f.shift().value.length)
                }
                a = K.needsContext.test(e) ? 0 : f.length;
                while (a--) {
                    l = f[a];
                    if (r.relative[c = l.type]) break;
                    if (h = r.find[c])
                        if (s = h(l.matches[0].replace(nt, rt), et.test(f[0].type) && dt(t.parentNode) || t)) {
                            f.splice(a, 1), e = s.length && mt(f);
                            if (!e) return P.apply(i, s), i;
                            break
                        }
                }
            }
            return (p || u(e, d))(s, t, !v, i, et.test(e) && dt(t.parentNode) || t), i
        }, n.sortStable = w.split("").sort(k).join("") === w, n.detectDuplicates = !!c, h(), n.sortDetached = at(function(e) {
            return e.compareDocumentPosition(p.createElement("div")) & 1
        }), at(function(e) {
            return e.innerHTML = "<a href='#'></a>", e.firstChild.getAttribute("href") === "#"
        }) || ft("type|href|height|width", function(e, t, n) {
            if (!n) return e.getAttribute(t, t.toLowerCase() === "type" ? 1 : 2)
        }), (!n.attributes || !at(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), e.firstChild.getAttribute("value") === ""
        })) && ft("value", function(e, t, n) {
            if (!n && e.nodeName.toLowerCase() === "input") return e.defaultValue
        }), at(function(e) {
            return e.getAttribute("disabled") == null
        }) || ft(j, function(e, t, n) {
            var r;
            if (!n) return e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }), st
    }(window);
    jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, jQuery.isXMLDoc = Sizzle.isXML, jQuery.contains = Sizzle.contains;
    var rneedsContext = jQuery.expr.match.needsContext,
        rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        risSimple = /^.[^:#\[\.,]*$/;
    jQuery.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), t.length === 1 && r.nodeType === 1 ? jQuery.find.matchesSelector(r, e) ? [r] : [] : jQuery.find.matches(e, jQuery.grep(t, function(e) {
            return e.nodeType === 1
        }))
    }, jQuery.fn.extend({
        find: function(e) {
            var t, n = this.length,
                r = [],
                i = this;
            if (typeof e != "string") return this.pushStack(jQuery(e).filter(function() {
                for (t = 0; t < n; t++)
                    if (jQuery.contains(i[t], this)) return !0
            }));
            for (t = 0; t < n; t++) jQuery.find(e, i[t], r);
            return r = this.pushStack(n > 1 ? jQuery.unique(r) : r), r.selector = this.selector ? this.selector + " " + e : e, r
        },
        filter: function(e) {
            return this.pushStack(winnow(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(winnow(this, e || [], !0))
        },
        is: function(e) {
            return !!winnow(this, typeof e == "string" && rneedsContext.test(e) ? jQuery(e) : e || [], !1).length
        }
    });
    var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        init = jQuery.fn.init = function(e, t) {
            var n, r;
            if (!e) return this;
            if (typeof e == "string") {
                e[0] === "<" && e[e.length - 1] === ">" && e.length >= 3 ? n = [null, e, null] : n = rquickExpr.exec(e);
                if (n && (n[1] || !t)) {
                    if (n[1]) {
                        t = t instanceof jQuery ? t[0] : t, jQuery.merge(this, jQuery.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : document, !0));
                        if (rsingleTag.test(n[1]) && jQuery.isPlainObject(t))
                            for (n in t) jQuery.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                        return this
                    }
                    return r = document.getElementById(n[2]), r && r.parentNode && (this.length = 1, this[0] = r), this.context = document, this.selector = e, this
                }
                return !t || t.jquery ? (t || rootjQuery).find(e) : this.constructor(t).find(e)
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : jQuery.isFunction(e) ? typeof rootjQuery.ready != "undefined" ? rootjQuery.ready(e) : e(jQuery) : (e.selector !== undefined && (this.selector = e.selector, this.context = e.context), jQuery.makeArray(e, this))
        };
    init.prototype = jQuery.fn, rootjQuery = jQuery(document);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/,
        guaranteedUnique = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    jQuery.extend({
        dir: function(e, t, n) {
            var r = [],
                i = n !== undefined;
            while ((e = e[t]) && e.nodeType !== 9)
                if (e.nodeType === 1) {
                    if (i && jQuery(e).is(n)) break;
                    r.push(e)
                }
            return r
        },
        sibling: function(e, t) {
            var n = [];
            for (; e; e = e.nextSibling) e.nodeType === 1 && e !== t && n.push(e);
            return n
        }
    }), jQuery.fn.extend({
        has: function(e) {
            var t = jQuery(e, this),
                n = t.length;
            return this.filter(function() {
                var e = 0;
                for (; e < n; e++)
                    if (jQuery.contains(this, t[e])) return !0
            })
        },
        closest: function(e, t) {
            var n, r = 0,
                i = this.length,
                s = [],
                o = rneedsContext.test(e) || typeof e != "string" ? jQuery(e, t || this.context) : 0;
            for (; r < i; r++)
                for (n = this[r]; n && n !== t; n = n.parentNode)
                    if (n.nodeType < 11 && (o ? o.index(n) > -1 : n.nodeType === 1 && jQuery.find.matchesSelector(n, e))) {
                        s.push(n);
                        break
                    }
            return this.pushStack(s.length > 1 ? jQuery.unique(s) : s)
        },
        index: function(e) {
            return e ? typeof e == "string" ? indexOf.call(jQuery(e), this[0]) : indexOf.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(e, t))))
        },
        addBack: function(e) {
            return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
        }
    }), jQuery.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && t.nodeType !== 11 ? t : null
        },
        parents: function(e) {
            return jQuery.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return jQuery.dir(e, "parentNode", n)
        },
        next: function(e) {
            return sibling(e, "nextSibling")
        },
        prev: function(e) {
            return sibling(e, "previousSibling")
        },
        nextAll: function(e) {
            return jQuery.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return jQuery.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return jQuery.dir(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return jQuery.dir(e, "previousSibling", n)
        },
        siblings: function(e) {
            return jQuery.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return jQuery.sibling(e.firstChild)
        },
        contents: function(e) {
            return e.contentDocument || jQuery.merge([], e.childNodes)
        }
    }, function(e, t) {
        jQuery.fn[e] = function(n, r) {
            var i = jQuery.map(this, t, n);
            return e.slice(-5) !== "Until" && (r = n), r && typeof r == "string" && (i = jQuery.filter(r, i)), this.length > 1 && (guaranteedUnique[e] || jQuery.unique(i), rparentsprev.test(e) && i.reverse()), this.pushStack(i)
        }
    });
    var rnotwhite = /\S+/g,
        optionsCache = {};
    jQuery.Callbacks = function(e) {
        e = typeof e == "string" ? optionsCache[e] || createOptions(e) : jQuery.extend({}, e);
        var t, n, r, i, s, o, u = [],
            a = !e.once && [],
            f = function(c) {
                t = e.memory && c, n = !0, o = i || 0, i = 0, s = u.length, r = !0;
                for (; u && o < s; o++)
                    if (u[o].apply(c[0], c[1]) === !1 && e.stopOnFalse) {
                        t = !1;
                        break
                    }
                r = !1, u && (a ? a.length && f(a.shift()) : t ? u = [] : l.disable())
            },
            l = {
                add: function() {
                    if (u) {
                        var n = u.length;
                        (function o(t) {
                            jQuery.each(t, function(t, n) {
                                var r = jQuery.type(n);
                                r === "function" ? (!e.unique || !l.has(n)) && u.push(n) : n && n.length && r !== "string" && o(n)
                            })
                        })(arguments), r ? s = u.length : t && (i = n, f(t))
                    }
                    return this
                },
                remove: function() {
                    return u && jQuery.each(arguments, function(e, t) {
                        var n;
                        while ((n = jQuery.inArray(t, u, n)) > -1) u.splice(n, 1), r && (n <= s && s--, n <= o && o--)
                    }), this
                },
                has: function(e) {
                    return e ? jQuery.inArray(e, u) > -1 : !!u && !!u.length
                },
                empty: function() {
                    return u = [], s = 0, this
                },
                disable: function() {
                    return u = a = t = undefined, this
                },
                disabled: function() {
                    return !u
                },
                lock: function() {
                    return a = undefined, t || l.disable(), this
                },
                locked: function() {
                    return !a
                },
                fireWith: function(e, t) {
                    return u && (!n || a) && (t = t || [], t = [e, t.slice ? t.slice() : t], r ? a.push(t) : f(t)), this
                },
                fire: function() {
                    return l.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!n
                }
            };
        return l
    }, jQuery.extend({
        Deferred: function(e) {
            var t = [
                    ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", jQuery.Callbacks("memory")]
                ],
                n = "pending",
                r = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return i.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var e = arguments;
                        return jQuery.Deferred(function(n) {
                            jQuery.each(t, function(t, s) {
                                var o = jQuery.isFunction(e[t]) && e[t];
                                i[s[1]](function() {
                                    var e = o && o.apply(this, arguments);
                                    e && jQuery.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s[0] + "With"](this === r ? n.promise() : this, o ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    promise: function(e) {
                        return e != null ? jQuery.extend(e, r) : r
                    }
                },
                i = {};
            return r.pipe = r.then, jQuery.each(t, function(e, s) {
                var o = s[2],
                    u = s[3];
                r[s[1]] = o.add, u && o.add(function() {
                    n = u
                }, t[e ^ 1][2].disable, t[2][2].lock), i[s[0]] = function() {
                    return i[s[0] + "With"](this === i ? r : this, arguments), this
                }, i[s[0] + "With"] = o.fireWith
            }), r.promise(i), e && e.call(i, i), i
        },
        when: function(e) {
            var t = 0,
                n = slice.call(arguments),
                r = n.length,
                i = r !== 1 || e && jQuery.isFunction(e.promise) ? r : 0,
                s = i === 1 ? e : jQuery.Deferred(),
                o = function(e, t, n) {
                    return function(r) {
                        t[e] = this, n[e] = arguments.length > 1 ? slice.call(arguments) : r, n === u ? s.notifyWith(t, n) : --i || s.resolveWith(t, n)
                    }
                },
                u, a, f;
            if (r > 1) {
                u = new Array(r), a = new Array(r), f = new Array(r);
                for (; t < r; t++) n[t] && jQuery.isFunction(n[t].promise) ? n[t].promise().done(o(t, f, n)).fail(s.reject).progress(o(t, a, u)) : --i
            }
            return i || s.resolveWith(f, n), s.promise()
        }
    });
    var readyList;
    jQuery.fn.ready = function(e) {
        return jQuery.ready.promise().done(e), this
    }, jQuery.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? jQuery.readyWait++ : jQuery.ready(!0)
        },
        ready: function(e) {
            if (e === !0 ? --jQuery.readyWait : jQuery.isReady) return;
            jQuery.isReady = !0;
            if (e !== !0 && --jQuery.readyWait > 0) return;
            readyList.resolveWith(document, [jQuery]), jQuery.fn.triggerHandler && (jQuery(document).triggerHandler("ready"), jQuery(document).off("ready"))
        }
    }), jQuery.ready.promise = function(e) {
        return readyList || (readyList = jQuery.Deferred(), document.readyState === "complete" ? setTimeout(jQuery.ready) : (document.addEventListener("DOMContentLoaded", completed, !1), window.addEventListener("load", completed, !1))), readyList.promise(e)
    }, jQuery.ready.promise();
    var access = jQuery.access = function(e, t, n, r, i, s, o) {
        var u = 0,
            a = e.length,
            f = n == null;
        if (jQuery.type(n) === "object") {
            i = !0;
            for (u in n) jQuery.access(e, t, u, n[u], !0, s, o)
        } else if (r !== undefined) {
            i = !0, jQuery.isFunction(r) || (o = !0), f && (o ? (t.call(e, r), t = null) : (f = t, t = function(e, t, n) {
                return f.call(jQuery(e), n)
            }));
            if (t)
                for (; u < a; u++) t(e[u], n, o ? r : r.call(e[u], u, t(e[u], n)))
        }
        return i ? e : f ? t.call(e) : a ? t(e[0], n) : s
    };
    jQuery.acceptData = function(e) {
        return e.nodeType === 1 || e.nodeType === 9 || !+e.nodeType
    }, Data.uid = 1, Data.accepts = jQuery.acceptData, Data.prototype = {
        key: function(e) {
            if (!Data.accepts(e)) return 0;
            var t = {},
                n = e[this.expando];
            if (!n) {
                n = Data.uid++;
                try {
                    t[this.expando] = {
                        value: n
                    }, Object.defineProperties(e, t)
                } catch (r) {
                    t[this.expando] = n, jQuery.extend(e, t)
                }
            }
            return this.cache[n] || (this.cache[n] = {}), n
        },
        set: function(e, t, n) {
            var r, i = this.key(e),
                s = this.cache[i];
            if (typeof t == "string") s[t] = n;
            else if (jQuery.isEmptyObject(s)) jQuery.extend(this.cache[i], t);
            else
                for (r in t) s[r] = t[r];
            return s
        },
        get: function(e, t) {
            var n = this.cache[this.key(e)];
            return t === undefined ? n : n[t]
        },
        access: function(e, t, n) {
            var r;
            return t === undefined || t && typeof t == "string" && n === undefined ? (r = this.get(e, t), r !== undefined ? r : this.get(e, jQuery.camelCase(t))) : (this.set(e, t, n), n !== undefined ? n : t)
        },
        remove: function(e, t) {
            var n, r, i, s = this.key(e),
                o = this.cache[s];
            if (t === undefined) this.cache[s] = {};
            else {
                jQuery.isArray(t) ? r = t.concat(t.map(jQuery.camelCase)) : (i = jQuery.camelCase(t), t in o ? r = [t, i] : (r = i, r = r in o ? [r] : r.match(rnotwhite) || [])), n = r.length;
                while (n--) delete o[r[n]]
            }
        },
        hasData: function(e) {
            return !jQuery.isEmptyObject(this.cache[e[this.expando]] || {})
        },
        discard: function(e) {
            e[this.expando] && delete this.cache[e[this.expando]]
        }
    };
    var data_priv = new Data,
        data_user = new Data,
        rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        rmultiDash = /([A-Z])/g;
    jQuery.extend({
        hasData: function(e) {
            return data_user.hasData(e) || data_priv.hasData(e)
        },
        data: function(e, t, n) {
            return data_user.access(e, t, n)
        },
        removeData: function(e, t) {
            data_user.remove(e, t)
        },
        _data: function(e, t, n) {
            return data_priv.access(e, t, n)
        },
        _removeData: function(e, t) {
            data_priv.remove(e, t)
        }
    }), jQuery.fn.extend({
        data: function(e, t) {
            var n, r, i, s = this[0],
                o = s && s.attributes;
            if (e === undefined) {
                if (this.length) {
                    i = data_user.get(s);
                    if (s.nodeType === 1 && !data_priv.get(s, "hasDataAttrs")) {
                        n = o.length;
                        while (n--) o[n] && (r = o[n].name, r.indexOf("data-") === 0 && (r = jQuery.camelCase(r.slice(5)), dataAttr(s, r, i[r])));
                        data_priv.set(s, "hasDataAttrs", !0)
                    }
                }
                return i
            }
            return typeof e == "object" ? this.each(function() {
                data_user.set(this, e)
            }) : access(this, function(t) {
                var n, r = jQuery.camelCase(e);
                if (s && t === undefined) {
                    n = data_user.get(s, e);
                    if (n !== undefined) return n;
                    n = data_user.get(s, r);
                    if (n !== undefined) return n;
                    n = dataAttr(s, r, undefined);
                    if (n !== undefined) return n;
                    return
                }
                this.each(function() {
                    var n = data_user.get(this, r);
                    data_user.set(this, r, t), e.indexOf("-") !== -1 && n !== undefined && data_user.set(this, e, t)
                })
            }, null, t, arguments.length > 1, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                data_user.remove(this, e)
            })
        }
    }), jQuery.extend({
        queue: function(e, t, n) {
            var r;
            if (e) return t = (t || "fx") + "queue", r = data_priv.get(e, t), n && (!r || jQuery.isArray(n) ? r = data_priv.access(e, t, jQuery.makeArray(n)) : r.push(n)), r || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = jQuery.queue(e, t),
                r = n.length,
                i = n.shift(),
                s = jQuery._queueHooks(e, t),
                o = function() {
                    jQuery.dequeue(e, t)
                };
            i === "inprogress" && (i = n.shift(), r--), i && (t === "fx" && n.unshift("inprogress"), delete s.stop, i.call(e, o, s)), !r && s && s.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return data_priv.get(e, n) || data_priv.access(e, n, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    data_priv.remove(e, [t + "queue", n])
                })
            })
        }
    }), jQuery.fn.extend({
        queue: function(e, t) {
            var n = 2;
            return typeof e != "string" && (t = e, e = "fx", n--), arguments.length < n ? jQuery.queue(this[0], e) : t === undefined ? this : this.each(function() {
                var n = jQuery.queue(this, e, t);
                jQuery._queueHooks(this, e), e === "fx" && n[0] !== "inprogress" && jQuery.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                jQuery.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n, r = 1,
                i = jQuery.Deferred(),
                s = this,
                o = this.length,
                u = function() {
                    --r || i.resolveWith(s, [s])
                };
            typeof e != "string" && (t = e, e = undefined), e = e || "fx";
            while (o--) n = data_priv.get(s[o], e + "queueHooks"), n && n.empty && (r++, n.empty.add(u));
            return u(), i.promise(t)
        }
    });
    var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        cssExpand = ["Top", "Right", "Bottom", "Left"],
        isHidden = function(e, t) {
            return e = t || e, jQuery.css(e, "display") === "none" || !jQuery.contains(e.ownerDocument, e)
        },
        rcheckableType = /^(?:checkbox|radio)$/i;
    (function() {
        var e = document.createDocumentFragment(),
            t = e.appendChild(document.createElement("div")),
            n = document.createElement("input");
        n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), support.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", support.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
    })();
    var strundefined = typeof undefined;
    support.focusinBubbles = "onfocusin" in window;
    var rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
        rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
    jQuery.event = {
        global: {},
        add: function(e, t, n, r, i) {
            var s, o, u, a, f, l, c, h, p, d, v, m = data_priv.get(e);
            if (!m) return;
            n.handler && (s = n, n = s.handler, i = s.selector), n.guid || (n.guid = jQuery.guid++), (a = m.events) || (a = m.events = {}), (o = m.handle) || (o = m.handle = function(t) {
                return typeof jQuery !== strundefined && jQuery.event.triggered !== t.type ? jQuery.event.dispatch.apply(e, arguments) : undefined
            }), t = (t || "").match(rnotwhite) || [""], f = t.length;
            while (f--) {
                u = rtypenamespace.exec(t[f]) || [], p = v = u[1], d = (u[2] || "").split(".").sort();
                if (!p) continue;
                c = jQuery.event.special[p] || {}, p = (i ? c.delegateType : c.bindType) || p, c = jQuery.event.special[p] || {}, l = jQuery.extend({
                    type: p,
                    origType: v,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: i,
                    needsContext: i && jQuery.expr.match.needsContext.test(i),
                    namespace: d.join(".")
                }, s), (h = a[p]) || (h = a[p] = [], h.delegateCount = 0, (!c.setup || c.setup.call(e, r, d, o) === !1) && e.addEventListener && e.addEventListener(p, o, !1)), c.add && (c.add.call(e, l), l.handler.guid || (l.handler.guid = n.guid)), i ? h.splice(h.delegateCount++, 0, l) : h.push(l), jQuery.event.global[p] = !0
            }
        },
        remove: function(e, t, n, r, i) {
            var s, o, u, a, f, l, c, h, p, d, v, m = data_priv.hasData(e) && data_priv.get(e);
            if (!m || !(a = m.events)) return;
            t = (t || "").match(rnotwhite) || [""], f = t.length;
            while (f--) {
                u = rtypenamespace.exec(t[f]) || [], p = v = u[1], d = (u[2] || "").split(".").sort();
                if (!p) {
                    for (p in a) jQuery.event.remove(e, p + t[f], n, r, !0);
                    continue
                }
                c = jQuery.event.special[p] || {}, p = (r ? c.delegateType : c.bindType) || p, h = a[p] || [], u = u[2] && new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"), o = s = h.length;
                while (s--) l = h[s], (i || v === l.origType) && (!n || n.guid === l.guid) && (!u || u.test(l.namespace)) && (!r || r === l.selector || r === "**" && l.selector) && (h.splice(s, 1), l.selector && h.delegateCount--, c.remove && c.remove.call(e, l));
                o && !h.length && ((!c.teardown || c.teardown.call(e, d, m.handle) === !1) && jQuery.removeEvent(e, p, m.handle), delete a[p])
            }
            jQuery.isEmptyObject(a) && (delete m.handle, data_priv.remove(e, "events"))
        },
        trigger: function(e, t, n, r) {
            var i, s, o, u, a, f, l, c = [n || document],
                h = hasOwn.call(e, "type") ? e.type : e,
                p = hasOwn.call(e, "namespace") ? e.namespace.split(".") : [];
            s = o = n = n || document;
            if (n.nodeType === 3 || n.nodeType === 8) return;
            if (rfocusMorph.test(h + jQuery.event.triggered)) return;
            h.indexOf(".") >= 0 && (p = h.split("."), h = p.shift(), p.sort()), a = h.indexOf(":") < 0 && "on" + h, e = e[jQuery.expando] ? e : new jQuery.Event(h, typeof e == "object" && e), e.isTrigger = r ? 2 : 3, e.namespace = p.join("."), e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = undefined, e.target || (e.target = n), t = t == null ? [e] : jQuery.makeArray(t, [e]), l = jQuery.event.special[h] || {};
            if (!r && l.trigger && l.trigger.apply(n, t) === !1) return;
            if (!r && !l.noBubble && !jQuery.isWindow(n)) {
                u = l.delegateType || h, rfocusMorph.test(u + h) || (s = s.parentNode);
                for (; s; s = s.parentNode) c.push(s), o = s;
                o === (n.ownerDocument || document) && c.push(o.defaultView || o.parentWindow || window)
            }
            i = 0;
            while ((s = c[i++]) && !e.isPropagationStopped()) e.type = i > 1 ? u : l.bindType || h, f = (data_priv.get(s, "events") || {})[e.type] && data_priv.get(s, "handle"), f && f.apply(s, t), f = a && s[a], f && f.apply && jQuery.acceptData(s) && (e.result = f.apply(s, t), e.result === !1 && e.preventDefault());
            return e.type = h, !r && !e.isDefaultPrevented() && (!l._default || l._default.apply(c.pop(), t) === !1) && jQuery.acceptData(n) && a && jQuery.isFunction(n[h]) && !jQuery.isWindow(n) && (o = n[a], o && (n[a] = null), jQuery.event.triggered = h, n[h](), jQuery.event.triggered = undefined, o && (n[a] = o)), e.result
        },
        dispatch: function(e) {
            e = jQuery.event.fix(e);
            var t, n, r, i, s, o = [],
                u = slice.call(arguments),
                a = (data_priv.get(this, "events") || {})[e.type] || [],
                f = jQuery.event.special[e.type] || {};
            u[0] = e, e.delegateTarget = this;
            if (f.preDispatch && f.preDispatch.call(this, e) === !1) return;
            o = jQuery.event.handlers.call(this, e, a), t = 0;
            while ((i = o[t++]) && !e.isPropagationStopped()) {
                e.currentTarget = i.elem, n = 0;
                while ((s = i.handlers[n++]) && !e.isImmediatePropagationStopped())
                    if (!e.namespace_re || e.namespace_re.test(s.namespace)) e.handleObj = s, e.data = s.data, r = ((jQuery.event.special[s.origType] || {}).handle || s.handler).apply(i.elem, u), r !== undefined && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation())
            }
            return f.postDispatch && f.postDispatch.call(this, e), e.result
        },
        handlers: function(e, t) {
            var n, r, i, s, o = [],
                u = t.delegateCount,
                a = e.target;
            if (u && a.nodeType && (!e.button || e.type !== "click"))
                for (; a !== this; a = a.parentNode || this)
                    if (a.disabled !== !0 || e.type !== "click") {
                        r = [];
                        for (n = 0; n < u; n++) s = t[n], i = s.selector + " ", r[i] === undefined && (r[i] = s.needsContext ? jQuery(i, this).index(a) >= 0 : jQuery.find(i, this, null, [a]).length), r[i] && r.push(s);
                        r.length && o.push({
                            elem: a,
                            handlers: r
                        })
                    }
            return u < t.length && o.push({
                elem: this,
                handlers: t.slice(u)
            }), o
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return e.which == null && (e.which = t.charCode != null ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, t) {
                var n, r, i, s = t.button;
                return e.pageX == null && t.clientX != null && (n = e.target.ownerDocument || document, r = n.documentElement, i = n.body, e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), !e.which && s !== undefined && (e.which = s & 1 ? 1 : s & 2 ? 3 : s & 4 ? 2 : 0), e
            }
        },
        fix: function(e) {
            if (e[jQuery.expando]) return e;
            var t, n, r, i = e.type,
                s = e,
                o = this.fixHooks[i];
            o || (this.fixHooks[i] = o = rmouseEvent.test(i) ? this.mouseHooks : rkeyEvent.test(i) ? this.keyHooks : {}), r = o.props ? this.props.concat(o.props) : this.props, e = new jQuery.Event(s), t = r.length;
            while (t--) n = r[t], e[n] = s[n];
            return e.target || (e.target = document), e.target.nodeType === 3 && (e.target = e.target.parentNode), o.filter ? o.filter(e, s) : e
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== safeActiveElement() && this.focus) return this.focus(), !1
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === safeActiveElement() && this.blur) return this.blur(), !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) return this.click(), !1
                },
                _default: function(e) {
                    return jQuery.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    e.result !== undefined && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function(e, t, n, r) {
            var i = jQuery.extend(new jQuery.Event, n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? jQuery.event.trigger(i, null, t) : jQuery.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
        }
    }, jQuery.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    }, jQuery.Event = function(e, t) {
        if (!(this instanceof jQuery.Event)) return new jQuery.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.defaultPrevented === undefined && e.returnValue === !1 ? returnTrue : returnFalse) : this.type = e, t && jQuery.extend(this, t), this.timeStamp = e && e.timeStamp || jQuery.now(), this[jQuery.expando] = !0
    }, jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue, e && e.preventDefault && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue, e && e.stopPropagation && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        jQuery.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this,
                    i = e.relatedTarget,
                    s = e.handleObj;
                if (!i || i !== r && !jQuery.contains(r, i)) e.type = s.origType, n = s.handler.apply(this, arguments), e.type = t;
                return n
            }
        }
    }), support.focusinBubbles || jQuery.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = function(e) {
            jQuery.event.simulate(t, e.target, jQuery.event.fix(e), !0)
        };
        jQuery.event.special[t] = {
            setup: function() {
                var r = this.ownerDocument || this,
                    i = data_priv.access(r, t);
                i || r.addEventListener(e, n, !0), data_priv.access(r, t, (i || 0) + 1)
            },
            teardown: function() {
                var r = this.ownerDocument || this,
                    i = data_priv.access(r, t) - 1;
                i ? data_priv.access(r, t, i) : (r.removeEventListener(e, n, !0), data_priv.remove(r, t))
            }
        }
    }), jQuery.fn.extend({
        on: function(e, t, n, r, i) {
            var s, o;
            if (typeof e == "object") {
                typeof t != "string" && (n = n || t, t = undefined);
                for (o in e) this.on(o, t, n, e[o], i);
                return this
            }
            n == null && r == null ? (r = t, n = t = undefined) : r == null && (typeof t == "string" ? (r = n, n = undefined) : (r = n, n = t, t = undefined));
            if (r === !1) r = returnFalse;
            else if (!r) return this;
            return i === 1 && (s = r, r = function(e) {
                return jQuery().off(e), s.apply(this, arguments)
            }, r.guid = s.guid || (s.guid = jQuery.guid++)), this.each(function() {
                jQuery.event.add(this, e, r, n, t)
            })
        },
        one: function(e, t, n, r) {
            return this.on(e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, jQuery(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if (typeof e == "object") {
                for (i in e) this.off(i, t, e[i]);
                return this
            }
            if (t === !1 || typeof t == "function") n = t, t = undefined;
            return n === !1 && (n = returnFalse), this.each(function() {
                jQuery.event.remove(this, e, n, t)
            })
        },
        trigger: function(e, t) {
            return this.each(function() {
                jQuery.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n) return jQuery.event.trigger(e, t, n, !0)
        }
    });
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        rtagName = /<([\w:]+)/,
        rhtml = /<|&#?\w+;/,
        rnoInnerhtml = /<(?:script|style|link)/i,
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rscriptType = /^$|\/(?:java|ecma)script/i,
        rscriptTypeMasked = /^true\/(.*)/,
        rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        wrapMap = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, wrapMap.th = wrapMap.td, jQuery.extend({
        clone: function(e, t, n) {
            var r, i, s, o, u = e.cloneNode(!0),
                a = jQuery.contains(e.ownerDocument, e);
            if (!support.noCloneChecked && (e.nodeType === 1 || e.nodeType === 11) && !jQuery.isXMLDoc(e)) {
                o = getAll(u), s = getAll(e);
                for (r = 0, i = s.length; r < i; r++) fixInput(s[r], o[r])
            }
            if (t)
                if (n) {
                    s = s || getAll(e), o = o || getAll(u);
                    for (r = 0, i = s.length; r < i; r++) cloneCopyEvent(s[r], o[r])
                } else cloneCopyEvent(e, u);
            return o = getAll(u, "script"), o.length > 0 && setGlobalEval(o, !a && getAll(e, "script")), u
        },
        buildFragment: function(e, t, n, r) {
            var i, s, o, u, a, f, l = t.createDocumentFragment(),
                c = [],
                h = 0,
                p = e.length;
            for (; h < p; h++) {
                i = e[h];
                if (i || i === 0)
                    if (jQuery.type(i) === "object") jQuery.merge(c, i.nodeType ? [i] : i);
                    else if (!rhtml.test(i)) c.push(t.createTextNode(i));
                else {
                    s = s || l.appendChild(t.createElement("div")), o = (rtagName.exec(i) || ["", ""])[1].toLowerCase(), u = wrapMap[o] || wrapMap._default, s.innerHTML = u[1] + i.replace(rxhtmlTag, "<$1></$2>") + u[2], f = u[0];
                    while (f--) s = s.lastChild;
                    jQuery.merge(c, s.childNodes), s = l.firstChild, s.textContent = ""
                }
            }
            l.textContent = "", h = 0;
            while (i = c[h++]) {
                if (r && jQuery.inArray(i, r) !== -1) continue;
                a = jQuery.contains(i.ownerDocument, i), s = getAll(l.appendChild(i), "script"), a && setGlobalEval(s);
                if (n) {
                    f = 0;
                    while (i = s[f++]) rscriptType.test(i.type || "") && n.push(i)
                }
            }
            return l
        },
        cleanData: function(e) {
            var t, n, r, i, s = jQuery.event.special,
                o = 0;
            for (;
                (n = e[o]) !== undefined; o++) {
                if (jQuery.acceptData(n)) {
                    i = n[data_priv.expando];
                    if (i && (t = data_priv.cache[i])) {
                        if (t.events)
                            for (r in t.events) s[r] ? jQuery.event.remove(n, r) : jQuery.removeEvent(n, r, t.handle);
                        data_priv.cache[i] && delete data_priv.cache[i]
                    }
                }
                delete data_user.cache[n[data_user.expando]]
            }
        }
    }), jQuery.fn.extend({
        text: function(e) {
            return access(this, function(e) {
                return e === undefined ? jQuery.text(this) : this.empty().each(function() {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) this.textContent = e
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(e) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var t = manipulationTarget(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(e) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var t = manipulationTarget(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        remove: function(e, t) {
            var n, r = e ? jQuery.filter(e, this) : this,
                i = 0;
            for (;
                (n = r[i]) != null; i++) !t && n.nodeType === 1 && jQuery.cleanData(getAll(n)), n.parentNode && (t && jQuery.contains(n.ownerDocument, n) && setGlobalEval(getAll(n, "script")), n.parentNode.removeChild(n));
            return this
        },
        empty: function() {
            var e, t = 0;
            for (;
                (e = this[t]) != null; t++) e.nodeType === 1 && (jQuery.cleanData(getAll(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = e == null ? !1 : e, t = t == null ? e : t, this.map(function() {
                return jQuery.clone(this, e, t)
            })
        },
        html: function(e) {
            return access(this, function(e) {
                var t = this[0] || {},
                    n = 0,
                    r = this.length;
                if (e === undefined && t.nodeType === 1) return t.innerHTML;
                if (typeof e == "string" && !rnoInnerhtml.test(e) && !wrapMap[(rtagName.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = e.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (; n < r; n++) t = this[n] || {}, t.nodeType === 1 && (jQuery.cleanData(getAll(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (i) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = arguments[0];
            return this.domManip(arguments, function(t) {
                e = this.parentNode, jQuery.cleanData(getAll(this)), e && e.replaceChild(t, this)
            }), e && (e.length || e.nodeType) ? this : this.remove()
        },
        detach: function(e) {
            return this.remove(e, !0)
        },
        domManip: function(e, t) {
            e = concat.apply([], e);
            var n, r, i, s, o, u, a = 0,
                f = this.length,
                l = this,
                c = f - 1,
                h = e[0],
                p = jQuery.isFunction(h);
            if (p || f > 1 && typeof h == "string" && !support.checkClone && rchecked.test(h)) return this.each(function(n) {
                var r = l.eq(n);
                p && (e[0] = h.call(this, n, r.html())), r.domManip(e, t)
            });
            if (f) {
                n = jQuery.buildFragment(e, this[0].ownerDocument, !1, this), r = n.firstChild, n.childNodes.length === 1 && (n = r);
                if (r) {
                    i = jQuery.map(getAll(n, "script"), disableScript), s = i.length;
                    for (; a < f; a++) o = n, a !== c && (o = jQuery.clone(o, !0, !0), s && jQuery.merge(i, getAll(o, "script"))), t.call(this[a], o, a);
                    if (s) {
                        u = i[i.length - 1].ownerDocument, jQuery.map(i, restoreScript);
                        for (a = 0; a < s; a++) o = i[a], rscriptType.test(o.type || "") && !data_priv.access(o, "globalEval") && jQuery.contains(u, o) && (o.src ? jQuery._evalUrl && jQuery._evalUrl(o.src) : jQuery.globalEval(o.textContent.replace(rcleanScript, "")))
                    }
                }
            }
            return this
        }
    }), jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        jQuery.fn[e] = function(e) {
            var n, r = [],
                i = jQuery(e),
                s = i.length - 1,
                o = 0;
            for (; o <= s; o++) n = o === s ? this : this.clone(!0), jQuery(i[o])[t](n), push.apply(r, n.get());
            return this.pushStack(r)
        }
    });
    var iframe, elemdisplay = {},
        rmargin = /^margin/,
        rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i"),
        getStyles = function(e) {
            return e.ownerDocument.defaultView.getComputedStyle(e, null)
        };
    (function() {
        function s() {
            i.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", i.innerHTML = "", n.appendChild(r);
            var s = window.getComputedStyle(i, null);
            e = s.top !== "1%", t = s.width === "4px", n.removeChild(r)
        }
        var e, t, n = document.documentElement,
            r = document.createElement("div"),
            i = document.createElement("div");
        if (!i.style) return;
        i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", support.clearCloneStyle = i.style.backgroundClip === "content-box", r.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", r.appendChild(i), window.getComputedStyle && jQuery.extend(support, {
            pixelPosition: function() {
                return s(), e
            },
            boxSizingReliable: function() {
                return t == null && s(), t
            },
            reliableMarginRight: function() {
                var e, t = i.appendChild(document.createElement("div"));
                return t.style.cssText = i.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", t.style.marginRight = t.style.width = "0", i.style.width = "1px", n.appendChild(r), e = !parseFloat(window.getComputedStyle(t, null).marginRight), n.removeChild(r), e
            }
        })
    })(), jQuery.swap = function(e, t, n, r) {
        var i, s, o = {};
        for (s in t) o[s] = e.style[s], e.style[s] = t[s];
        i = n.apply(e, r || []);
        for (s in t) e.style[s] = o[s];
        return i
    };
    var rdisplayswap = /^(none|table(?!-c[ea]).+)/,
        rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"),
        rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"),
        cssShow = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        cssNormalTransform = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        cssPrefixes = ["Webkit", "O", "Moz", "ms"];
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = curCSS(e, "opacity");
                        return n === "" ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(e, t, n, r) {
            if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style) return;
            var i, s, o, u = jQuery.camelCase(t),
                a = e.style;
            t = jQuery.cssProps[u] || (jQuery.cssProps[u] = vendorPropName(a, u)), o = jQuery.cssHooks[t] || jQuery.cssHooks[u];
            if (n === undefined) return o && "get" in o && (i = o.get(e, !1, r)) !== undefined ? i : a[t];
            s = typeof n, s === "string" && (i = rrelNum.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(jQuery.css(e, t)), s = "number");
            if (n == null || n !== n) return;
            s === "number" && !jQuery.cssNumber[u] && (n += "px"), !support.clearCloneStyle && n === "" && t.indexOf("background") === 0 && (a[t] = "inherit");
            if (!o || !("set" in o) || (n = o.set(e, n, r)) !== undefined) a[t] = n
        },
        css: function(e, t, n, r) {
            var i, s, o, u = jQuery.camelCase(t);
            return t = jQuery.cssProps[u] || (jQuery.cssProps[u] = vendorPropName(e.style, u)), o = jQuery.cssHooks[t] || jQuery.cssHooks[u], o && "get" in o && (i = o.get(e, !0, n)), i === undefined && (i = curCSS(e, t, r)), i === "normal" && t in cssNormalTransform && (i = cssNormalTransform[t]), n === "" || n ? (s = parseFloat(i), n === !0 || jQuery.isNumeric(s) ? s || 0 : i) : i
        }
    }), jQuery.each(["height", "width"], function(e, t) {
        jQuery.cssHooks[t] = {
            get: function(e, n, r) {
                if (n) return rdisplayswap.test(jQuery.css(e, "display")) && e.offsetWidth === 0 ? jQuery.swap(e, cssShow, function() {
                    return getWidthOrHeight(e, t, r)
                }) : getWidthOrHeight(e, t, r)
            },
            set: function(e, n, r) {
                var i = r && getStyles(e);
                return setPositiveNumber(e, n, r ? augmentWidthOrHeight(e, t, r, jQuery.css(e, "boxSizing", !1, i) === "border-box", i) : 0)
            }
        }
    }), jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(e, t) {
        if (t) return jQuery.swap(e, {
            display: "inline-block"
        }, curCSS, [e, "marginRight"])
    }), jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        jQuery.cssHooks[e + t] = {
            expand: function(n) {
                var r = 0,
                    i = {},
                    s = typeof n == "string" ? n.split(" ") : [n];
                for (; r < 4; r++) i[e + cssExpand[r] + t] = s[r] || s[r - 2] || s[0];
                return i
            }
        }, rmargin.test(e) || (jQuery.cssHooks[e + t].set = setPositiveNumber)
    }), jQuery.fn.extend({
        css: function(e, t) {
            return access(this, function(e, t, n) {
                var r, i, s = {},
                    o = 0;
                if (jQuery.isArray(t)) {
                    r = getStyles(e), i = t.length;
                    for (; o < i; o++) s[t[o]] = jQuery.css(e, t[o], !1, r);
                    return s
                }
                return n !== undefined ? jQuery.style(e, t, n) : jQuery.css(e, t)
            }, e, t, arguments.length > 1)
        },
        show: function() {
            return showHide(this, !0)
        },
        hide: function() {
            return showHide(this)
        },
        toggle: function(e) {
            return typeof e == "boolean" ? e ? this.show() : this.hide() : this.each(function() {
                isHidden(this) ? jQuery(this).show() : jQuery(this).hide()
            })
        }
    }), jQuery.Tween = Tween, Tween.prototype = {
        constructor: Tween,
        init: function(e, t, n, r, i, s) {
            this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = s || (jQuery.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = Tween.propHooks[this.prop];
            return e && e.get ? e.get(this) : Tween.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = Tween.propHooks[this.prop];
            return this.options.duration ? this.pos = t = jQuery.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Tween.propHooks._default.set(this), this
        }
    }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return e.elem[e.prop] == null || !!e.elem.style && e.elem.style[e.prop] != null ? (t = jQuery.css(e.elem, e.prop, ""), !t || t === "auto" ? 0 : t) : e.elem[e.prop]
            },
            set: function(e) {
                jQuery.fx.step[e.prop] ? jQuery.fx.step[e.prop](e) : e.elem.style && (e.elem.style[jQuery.cssProps[e.prop]] != null || jQuery.cssHooks[e.prop]) ? jQuery.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, jQuery.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, jQuery.fx = Tween.prototype.init, jQuery.fx.step = {};
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/,
        rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"),
        rrun = /queueHooks$/,
        animationPrefilters = [defaultPrefilter],
        tweeners = {
            "*": [function(e, t) {
                var n = this.createTween(e, t),
                    r = n.cur(),
                    i = rfxnum.exec(t),
                    s = i && i[3] || (jQuery.cssNumber[e] ? "" : "px"),
                    o = (jQuery.cssNumber[e] || s !== "px" && +r) && rfxnum.exec(jQuery.css(n.elem, e)),
                    u = 1,
                    a = 20;
                if (o && o[3] !== s) {
                    s = s || o[3], i = i || [], o = +r || 1;
                    do u = u || ".5", o /= u, jQuery.style(n.elem, e, o + s); while (u !== (u = n.cur() / r) && u !== 1 && --a)
                }
                return i && (o = n.start = +o || +r || 0, n.unit = s, n.end = i[1] ? o + (i[1] + 1) * i[2] : +i[2]), n
            }]
        };
    jQuery.Animation = jQuery.extend(Animation, {
            tweener: function(e, t) {
                jQuery.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
                var n, r = 0,
                    i = e.length;
                for (; r < i; r++) n = e[r], tweeners[n] = tweeners[n] || [], tweeners[n].unshift(t)
            },
            prefilter: function(e, t) {
                t ? animationPrefilters.unshift(e) : animationPrefilters.push(e)
            }
        }), jQuery.speed = function(e, t, n) {
            var r = e && typeof e == "object" ? jQuery.extend({}, e) : {
                complete: n || !n && t || jQuery.isFunction(e) && e,
                duration: e,
                easing: n && t || t && !jQuery.isFunction(t) && t
            };
            r.duration = jQuery.fx.off ? 0 : typeof r.duration == "number" ? r.duration : r.duration in jQuery.fx.speeds ? jQuery.fx.speeds[r.duration] : jQuery.fx.speeds._default;
            if (r.queue == null || r.queue === !0) r.queue = "fx";
            return r.old = r.complete, r.complete = function() {
                jQuery.isFunction(r.old) && r.old.call(this), r.queue && jQuery.dequeue(this, r.queue)
            }, r
        }, jQuery.fn.extend({
            fadeTo: function(e, t, n, r) {
                return this.filter(isHidden).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, r)
            },
            animate: function(e, t, n, r) {
                var i = jQuery.isEmptyObject(e),
                    s = jQuery.speed(t, n, r),
                    o = function() {
                        var t = Animation(this, jQuery.extend({}, e), s);
                        (i || data_priv.get(this, "finish")) && t.stop(!0)
                    };
                return o.finish = o, i || s.queue === !1 ? this.each(o) : this.queue(s.queue, o)
            },
            stop: function(e, t, n) {
                var r = function(e) {
                    var t = e.stop;
                    delete e.stop, t(n)
                };
                return typeof e != "string" && (n = t, t = e, e = undefined), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                    var t = !0,
                        i = e != null && e + "queueHooks",
                        s = jQuery.timers,
                        o = data_priv.get(this);
                    if (i) o[i] && o[i].stop && r(o[i]);
                    else
                        for (i in o) o[i] && o[i].stop && rrun.test(i) && r(o[i]);
                    for (i = s.length; i--;) s[i].elem === this && (e == null || s[i].queue === e) && (s[i].anim.stop(n), t = !1, s.splice(i, 1));
                    (t || !n) && jQuery.dequeue(this, e)
                })
            },
            finish: function(e) {
                return e !== !1 && (e = e || "fx"), this.each(function() {
                    var t, n = data_priv.get(this),
                        r = n[e + "queue"],
                        i = n[e + "queueHooks"],
                        s = jQuery.timers,
                        o = r ? r.length : 0;
                    n.finish = !0, jQuery.queue(this, e, []), i && i.stop && i.stop.call(this, !0);
                    for (t = s.length; t--;) s[t].elem === this && s[t].queue === e && (s[t].anim.stop(!0), s.splice(t, 1));
                    for (t = 0; t < o; t++) r[t] && r[t].finish && r[t].finish.call(this);
                    delete n.finish
                })
            }
        }), jQuery.each(["toggle", "show", "hide"], function(e, t) {
            var n = jQuery.fn[t];
            jQuery.fn[t] = function(e, r, i) {
                return e == null || typeof e == "boolean" ? n.apply(this, arguments) : this.animate(genFx(t, !0), e, r, i)
            }
        }), jQuery.each({
            slideDown: genFx("show"),
            slideUp: genFx("hide"),
            slideToggle: genFx("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, t) {
            jQuery.fn[e] = function(e, n, r) {
                return this.animate(t, e, n, r)
            }
        }), jQuery.timers = [], jQuery.fx.tick = function() {
            var e, t = 0,
                n = jQuery.timers;
            fxNow = jQuery.now();
            for (; t < n.length; t++) e = n[t], !e() && n[t] === e && n.splice(t--, 1);
            n.length || jQuery.fx.stop(), fxNow = undefined
        }, jQuery.fx.timer = function(e) {
            jQuery.timers.push(e), e() ? jQuery.fx.start() : jQuery.timers.pop()
        }, jQuery.fx.interval = 13, jQuery.fx.start = function() {
            timerId || (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval))
        }, jQuery.fx.stop = function() {
            clearInterval(timerId), timerId = null
        }, jQuery.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, jQuery.fn.delay = function(e, t) {
            return e = jQuery.fx ? jQuery.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
                var r = setTimeout(t, e);
                n.stop = function() {
                    clearTimeout(r)
                }
            })
        },
        function() {
            var e = document.createElement("input"),
                t = document.createElement("select"),
                n = t.appendChild(document.createElement("option"));
            e.type = "checkbox", support.checkOn = e.value !== "", support.optSelected = n.selected, t.disabled = !0, support.optDisabled = !n.disabled, e = document.createElement("input"), e.value = "t", e.type = "radio", support.radioValue = e.value === "t"
        }();
    var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle;
    jQuery.fn.extend({
        attr: function(e, t) {
            return access(this, jQuery.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                jQuery.removeAttr(this, e)
            })
        }
    }), jQuery.extend({
        attr: function(e, t, n) {
            var r, i, s = e.nodeType;
            if (!e || s === 3 || s === 8 || s === 2) return;
            if (typeof e.getAttribute === strundefined) return jQuery.prop(e, t, n);
            if (s !== 1 || !jQuery.isXMLDoc(e)) t = t.toLowerCase(), r = jQuery.attrHooks[t] || (jQuery.expr.match.bool.test(t) ? boolHook : nodeHook);
            if (n === undefined) return r && "get" in r && (i = r.get(e, t)) !== null ? i : (i = jQuery.find.attr(e, t), i == null ? undefined : i);
            if (n !== null) return r && "set" in r && (i = r.set(e, n, t)) !== undefined ? i : (e.setAttribute(t, n + ""), n);
            jQuery.removeAttr(e, t)
        },
        removeAttr: function(e, t) {
            var n, r, i = 0,
                s = t && t.match(rnotwhite);
            if (s && e.nodeType === 1)
                while (n = s[i++]) r = jQuery.propFix[n] || n, jQuery.expr.match.bool.test(n) && (e[r] = !1), e.removeAttribute(n)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!support.radioValue && t === "radio" && jQuery.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        }
    }), boolHook = {
        set: function(e, t, n) {
            return t === !1 ? jQuery.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = attrHandle[t] || jQuery.find.attr;
        attrHandle[t] = function(e, t, r) {
            var i, s;
            return r || (s = attrHandle[t], attrHandle[t] = i, i = n(e, t, r) != null ? t.toLowerCase() : null, attrHandle[t] = s), i
        }
    });
    var rfocusable = /^(?:input|select|textarea|button)$/i;
    jQuery.fn.extend({
        prop: function(e, t) {
            return access(this, jQuery.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[jQuery.propFix[e] || e]
            })
        }
    }), jQuery.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(e, t, n) {
            var r, i, s, o = e.nodeType;
            if (!e || o === 3 || o === 8 || o === 2) return;
            return s = o !== 1 || !jQuery.isXMLDoc(e), s && (t = jQuery.propFix[t] || t, i = jQuery.propHooks[t]), n !== undefined ? i && "set" in i && (r = i.set(e, n, t)) !== undefined ? r : e[t] = n : i && "get" in i && (r = i.get(e, t)) !== null ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    return e.hasAttribute("tabindex") || rfocusable.test(e.nodeName) || e.href ? e.tabIndex : -1
                }
            }
        }
    }), support.optSelected || (jQuery.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        }
    }), jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        jQuery.propFix[this.toLowerCase()] = this
    });
    var rclass = /[\t\r\n\f]/g;
    jQuery.fn.extend({
        addClass: function(e) {
            var t, n, r, i, s, o, u = typeof e == "string" && e,
                a = 0,
                f = this.length;
            if (jQuery.isFunction(e)) return this.each(function(t) {
                jQuery(this).addClass(e.call(this, t, this.className))
            });
            if (u) {
                t = (e || "").match(rnotwhite) || [];
                for (; a < f; a++) {
                    n = this[a], r = n.nodeType === 1 && (n.className ? (" " + n.className + " ").replace(rclass, " ") : " ");
                    if (r) {
                        s = 0;
                        while (i = t[s++]) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                        o = jQuery.trim(r), n.className !== o && (n.className = o)
                    }
                }
            }
            return this
        },
        removeClass: function(e) {
            var t, n, r, i, s, o, u = arguments.length === 0 || typeof e == "string" && e,
                a = 0,
                f = this.length;
            if (jQuery.isFunction(e)) return this.each(function(t) {
                jQuery(this).removeClass(e.call(this, t, this.className))
            });
            if (u) {
                t = (e || "").match(rnotwhite) || [];
                for (; a < f; a++) {
                    n = this[a], r = n.nodeType === 1 && (n.className ? (" " + n.className + " ").replace(rclass, " ") : "");
                    if (r) {
                        s = 0;
                        while (i = t[s++])
                            while (r.indexOf(" " + i + " ") >= 0) r = r.replace(" " + i + " ", " ");
                        o = e ? jQuery.trim(r) : "", n.className !== o && (n.className = o)
                    }
                }
            }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            return typeof t == "boolean" && n === "string" ? t ? this.addClass(e) : this.removeClass(e) : jQuery.isFunction(e) ? this.each(function(n) {
                jQuery(this).toggleClass(e.call(this, n, this.className, t), t)
            }) : this.each(function() {
                if (n === "string") {
                    var t, r = 0,
                        i = jQuery(this),
                        s = e.match(rnotwhite) || [];
                    while (t = s[r++]) i.hasClass(t) ? i.removeClass(t) : i.addClass(t)
                } else if (n === strundefined || n === "boolean") this.className && data_priv.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : data_priv.get(this, "__className__") || ""
            })
        },
        hasClass: function(e) {
            var t = " " + e + " ",
                n = 0,
                r = this.length;
            for (; n < r; n++)
                if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(rclass, " ").indexOf(t) >= 0) return !0;
            return !1
        }
    });
    var rreturn = /\r/g;
    jQuery.fn.extend({
        val: function(e) {
            var t, n, r, i = this[0];
            if (!arguments.length) {
                if (i) return t = jQuery.valHooks[i.type] || jQuery.valHooks[i.nodeName.toLowerCase()], t && "get" in t && (n = t.get(i, "value")) !== undefined ? n : (n = i.value, typeof n == "string" ? n.replace(rreturn, "") : n == null ? "" : n);
                return
            }
            return r = jQuery.isFunction(e), this.each(function(n) {
                var i;
                if (this.nodeType !== 1) return;
                r ? i = e.call(this, n, jQuery(this).val()) : i = e, i == null ? i = "" : typeof i == "number" ? i += "" : jQuery.isArray(i) && (i = jQuery.map(i, function(e) {
                    return e == null ? "" : e + ""
                })), t = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                if (!t || !("set" in t) || t.set(this, i, "value") === undefined) this.value = i
            })
        }
    }), jQuery.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = jQuery.find.attr(e, "value");
                    return t != null ? t : jQuery.trim(jQuery.text(e))
                }
            },
            select: {
                get: function(e) {
                    var t, n, r = e.options,
                        i = e.selectedIndex,
                        s = e.type === "select-one" || i < 0,
                        o = s ? null : [],
                        u = s ? i + 1 : r.length,
                        a = i < 0 ? u : s ? i : 0;
                    for (; a < u; a++) {
                        n = r[a];
                        if ((n.selected || a === i) && (support.optDisabled ? !n.disabled : n.getAttribute("disabled") === null) && (!n.parentNode.disabled || !jQuery.nodeName(n.parentNode, "optgroup"))) {
                            t = jQuery(n).val();
                            if (s) return t;
                            o.push(t)
                        }
                    }
                    return o
                },
                set: function(e, t) {
                    var n, r, i = e.options,
                        s = jQuery.makeArray(t),
                        o = i.length;
                    while (o--) {
                        r = i[o];
                        if (r.selected = jQuery.inArray(r.value, s) >= 0) n = !0
                    }
                    return n || (e.selectedIndex = -1), s
                }
            }
        }
    }), jQuery.each(["radio", "checkbox"], function() {
        jQuery.valHooks[this] = {
            set: function(e, t) {
                if (jQuery.isArray(t)) return e.checked = jQuery.inArray(jQuery(e).val(), t) >= 0
            }
        }, support.checkOn || (jQuery.valHooks[this].get = function(e) {
            return e.getAttribute("value") === null ? "on" : e.value
        })
    }), jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        jQuery.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), jQuery.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        },
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    });
    var nonce = jQuery.now(),
        rquery = /\?/;
    jQuery.parseJSON = function(e) {
        return JSON.parse(e + "")
    }, jQuery.parseXML = function(e) {
        var t, n;
        if (!e || typeof e != "string") return null;
        try {
            n = new DOMParser, t = n.parseFromString(e, "text/xml")
        } catch (r) {
            t = undefined
        }
        return (!t || t.getElementsByTagName("parsererror").length) && jQuery.error("Invalid XML: " + e), t
    };
    var ajaxLocParts, ajaxLocation, rhash = /#.*$/,
        rts = /([?&])_=[^&]*/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,
        rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        prefilters = {},
        transports = {},
        allTypes = "*/".concat("*");
    try {
        ajaxLocation = location.href
    } catch (e) {
        ajaxLocation = document.createElement("a"), ajaxLocation.href = "", ajaxLocation = ajaxLocation.href
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [], jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? ajaxExtend(ajaxExtend(e, jQuery.ajaxSettings), t) : ajaxExtend(jQuery.ajaxSettings, e)
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(e, t) {
            function S(e, t, s, u) {
                var f, m, g, b, E, S = t;
                if (y === 2) return;
                y = 2, o && clearTimeout(o), n = undefined, i = u || "", w.readyState = e > 0 ? 4 : 0, f = e >= 200 && e < 300 || e === 304, s && (b = ajaxHandleResponses(l, w, s)), b = ajaxConvert(l, b, w, f);
                if (f) l.ifModified && (E = w.getResponseHeader("Last-Modified"), E && (jQuery.lastModified[r] = E), E = w.getResponseHeader("etag"), E && (jQuery.etag[r] = E)), e === 204 || l.type === "HEAD" ? S = "nocontent" : e === 304 ? S = "notmodified" : (S = b.state, m = b.data, g = b.error, f = !g);
                else {
                    g = S;
                    if (e || !S) S = "error", e < 0 && (e = 0)
                }
                w.status = e, w.statusText = (t || S) + "", f ? p.resolveWith(c, [m, S, w]) : p.rejectWith(c, [w, S, g]), w.statusCode(v), v = undefined, a && h.trigger(f ? "ajaxSuccess" : "ajaxError", [w, l, f ? m : g]), d.fireWith(c, [w, S]), a && (h.trigger("ajaxComplete", [w, l]), --jQuery.active || jQuery.event.trigger("ajaxStop"))
            }
            typeof e == "object" && (t = e, e = undefined), t = t || {};
            var n, r, i, s, o, u, a, f, l = jQuery.ajaxSetup({}, t),
                c = l.context || l,
                h = l.context && (c.nodeType || c.jquery) ? jQuery(c) : jQuery.event,
                p = jQuery.Deferred(),
                d = jQuery.Callbacks("once memory"),
                v = l.statusCode || {},
                m = {},
                g = {},
                y = 0,
                b = "canceled",
                w = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (y === 2) {
                            if (!s) {
                                s = {};
                                while (t = rheaders.exec(i)) s[t[1].toLowerCase()] = t[2]
                            }
                            t = s[e.toLowerCase()]
                        }
                        return t == null ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return y === 2 ? i : null
                    },
                    setRequestHeader: function(e, t) {
                        var n = e.toLowerCase();
                        return y || (e = g[n] = g[n] || e, m[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return y || (l.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (y < 2)
                                for (t in e) v[t] = [v[t], e[t]];
                            else w.always(e[w.status]);
                        return this
                    },
                    abort: function(e) {
                        var t = e || b;
                        return n && n.abort(t), S(0, t), this
                    }
                };
            p.promise(w).complete = d.add, w.success = w.done, w.error = w.fail, l.url = ((e || l.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"), l.type = t.method || t.type || l.method || l.type, l.dataTypes = jQuery.trim(l.dataType || "*").toLowerCase().match(rnotwhite) || [""], l.crossDomain == null && (u = rurl.exec(l.url.toLowerCase()), l.crossDomain = !(!u || u[1] === ajaxLocParts[1] && u[2] === ajaxLocParts[2] && (u[3] || (u[1] === "http:" ? "80" : "443")) === (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443")))), l.data && l.processData && typeof l.data != "string" && (l.data = jQuery.param(l.data, l.traditional)), inspectPrefiltersOrTransports(prefilters, l, t, w);
            if (y === 2) return w;
            a = l.global, a && jQuery.active++ === 0 && jQuery.event.trigger("ajaxStart"), l.type = l.type.toUpperCase(), l.hasContent = !rnoContent.test(l.type), r = l.url, l.hasContent || (l.data && (r = l.url += (rquery.test(r) ? "&" : "?") + l.data, delete l.data), l.cache === !1 && (l.url = rts.test(r) ? r.replace(rts, "$1_=" + nonce++) : r + (rquery.test(r) ? "&" : "?") + "_=" + nonce++)), l.ifModified && (jQuery.lastModified[r] && w.setRequestHeader("If-Modified-Since", jQuery.lastModified[r]), jQuery.etag[r] && w.setRequestHeader("If-None-Match", jQuery.etag[r])), (l.data && l.hasContent && l.contentType !== !1 || t.contentType) && w.setRequestHeader("Content-Type", l.contentType), w.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + (l.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : l.accepts["*"]);
            for (f in l.headers) w.setRequestHeader(f, l.headers[f]);
            if (!l.beforeSend || l.beforeSend.call(c, w, l) !== !1 && y !== 2) {
                b = "abort";
                for (f in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) w[f](l[f]);
                n = inspectPrefiltersOrTransports(transports, l, t, w);
                if (!n) S(-1, "No Transport");
                else {
                    w.readyState = 1, a && h.trigger("ajaxSend", [w, l]), l.async && l.timeout > 0 && (o = setTimeout(function() {
                        w.abort("timeout")
                    }, l.timeout));
                    try {
                        y = 1, n.send(m, S)
                    } catch (E) {
                        if (!(y < 2)) throw E;
                        S(-1, E)
                    }
                }
                return w
            }
            return w.abort()
        },
        getJSON: function(e, t, n) {
            return jQuery.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return jQuery.get(e, undefined, t, "script")
        }
    }), jQuery.each(["get", "post"], function(e, t) {
        jQuery[t] = function(e, n, r, i) {
            return jQuery.isFunction(n) && (i = i || r, r = n, n = undefined), jQuery.ajax({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: r
            })
        }
    }), jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        jQuery.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), jQuery._evalUrl = function(e) {
        return jQuery.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }, jQuery.fn.extend({
        wrapAll: function(e) {
            var t;
            return jQuery.isFunction(e) ? this.each(function(t) {
                jQuery(this).wrapAll(e.call(this, t))
            }) : (this[0] && (t = jQuery(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                var e = this;
                while (e.firstElementChild) e = e.firstElementChild;
                return e
            }).append(this)), this)
        },
        wrapInner: function(e) {
            return jQuery.isFunction(e) ? this.each(function(t) {
                jQuery(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = jQuery(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = jQuery.isFunction(e);
            return this.each(function(n) {
                jQuery(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes)
            }).end()
        }
    }), jQuery.expr.filters.hidden = function(e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0
    }, jQuery.expr.filters.visible = function(e) {
        return !jQuery.expr.filters.hidden(e)
    };
    var r20 = /%20/g,
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
        rsubmittable = /^(?:input|select|textarea|keygen)/i;
    jQuery.param = function(e, t) {
        var n, r = [],
            i = function(e, t) {
                t = jQuery.isFunction(t) ? t() : t == null ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        t === undefined && (t = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional);
        if (jQuery.isArray(e) || e.jquery && !jQuery.isPlainObject(e)) jQuery.each(e, function() {
            i(this.name, this.value)
        });
        else
            for (n in e) buildParams(n, e[n], t, i);
        return r.join("&").replace(r20, "+")
    }, jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = jQuery.prop(this, "elements");
                return e ? jQuery.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(e) && (this.checked || !rcheckableType.test(e))
            }).map(function(e, t) {
                var n = jQuery(this).val();
                return n == null ? null : jQuery.isArray(n) ? jQuery.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(rCRLF, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(rCRLF, "\r\n")
                }
            }).get()
        }
    }), jQuery.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest
        } catch (e) {}
    };
    var xhrId = 0,
        xhrCallbacks = {},
        xhrSuccessStatus = {
            0: 200,
            1223: 204
        },
        xhrSupported = jQuery.ajaxSettings.xhr();
    window.ActiveXObject && jQuery(window).on("unload", function() {
        for (var e in xhrCallbacks) xhrCallbacks[e]()
    }), support.cors = !!xhrSupported && "withCredentials" in xhrSupported, support.ajax = xhrSupported = !!xhrSupported, jQuery.ajaxTransport(function(e) {
        var t;
        if (support.cors || xhrSupported && !e.crossDomain) return {
            send: function(n, r) {
                var i, s = e.xhr(),
                    o = ++xhrId;
                s.open(e.type, e.url, e.async, e.username, e.password);
                if (e.xhrFields)
                    for (i in e.xhrFields) s[i] = e.xhrFields[i];
                e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), !e.crossDomain && !n["X-Requested-With"] && (n["X-Requested-With"] = "XMLHttpRequest");
                for (i in n) s.setRequestHeader(i, n[i]);
                t = function(e) {
                    return function() {
                        t && (delete xhrCallbacks[o], t = s.onload = s.onerror = null, e === "abort" ? s.abort() : e === "error" ? r(s.status, s.statusText) : r(xhrSuccessStatus[s.status] || s.status, s.statusText, typeof s.responseText == "string" ? {
                            text: s.responseText
                        } : undefined, s.getAllResponseHeaders()))
                    }
                }, s.onload = t(), s.onerror = t("error"), t = xhrCallbacks[o] = t("abort");
                try {
                    s.send(e.hasContent && e.data || null)
                } catch (u) {
                    if (t) throw u
                }
            },
            abort: function() {
                t && t()
            }
        }
    }), jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(e) {
                return jQuery.globalEval(e), e
            }
        }
    }), jQuery.ajaxPrefilter("script", function(e) {
        e.cache === undefined && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), jQuery.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function(r, i) {
                    t = jQuery("<script>").prop({
                        async: !0,
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", n = function(e) {
                        t.remove(), n = null, e && i(e.type === "error" ? 404 : 200, e.type)
                    }), document.head.appendChild(t[0])
                },
                abort: function() {
                    n && n()
                }
            }
        }
    });
    var oldCallbacks = [],
        rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
            return this[e] = !0, e
        }
    }), jQuery.ajaxPrefilter("json jsonp", function(e, t, n) {
        var r, i, s, o = e.jsonp !== !1 && (rjsonp.test(e.url) ? "url" : typeof e.data == "string" && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(e.data) && "data");
        if (o || e.dataTypes[0] === "jsonp") return r = e.jsonpCallback = jQuery.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, o ? e[o] = e[o].replace(rjsonp, "$1" + r) : e.jsonp !== !1 && (e.url += (rquery.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function() {
            return s || jQuery.error(r + " was not called"), s[0]
        }, e.dataTypes[0] = "json", i = window[r], window[r] = function() {
            s = arguments
        }, n.always(function() {
            window[r] = i, e[r] && (e.jsonpCallback = t.jsonpCallback, oldCallbacks.push(r)), s && jQuery.isFunction(i) && i(s[0]), s = i = undefined
        }), "script"
    }), jQuery.parseHTML = function(e, t, n) {
        if (!e || typeof e != "string") return null;
        typeof t == "boolean" && (n = t, t = !1), t = t || document;
        var r = rsingleTag.exec(e),
            i = !n && [];
        return r ? [t.createElement(r[1])] : (r = jQuery.buildFragment([e], t, i), i && i.length && jQuery(i).remove(), jQuery.merge([], r.childNodes))
    };
    var _load = jQuery.fn.load;
    jQuery.fn.load = function(e, t, n) {
        if (typeof e != "string" && _load) return _load.apply(this, arguments);
        var r, i, s, o = this,
            u = e.indexOf(" ");
        return u >= 0 && (r = jQuery.trim(e.slice(u)), e = e.slice(0, u)), jQuery.isFunction(t) ? (n = t, t = undefined) : t && typeof t == "object" && (i = "POST"), o.length > 0 && jQuery.ajax({
            url: e,
            type: i,
            dataType: "html",
            data: t
        }).done(function(e) {
            s = arguments, o.html(r ? jQuery("<div>").append(jQuery.parseHTML(e)).find(r) : e)
        }).complete(n && function(e, t) {
            o.each(n, s || [e.responseText, t, e])
        }), this
    }, jQuery.expr.filters.animated = function(e) {
        return jQuery.grep(jQuery.timers, function(t) {
            return e === t.elem
        }).length
    };
    var docElem = window.document.documentElement;
    jQuery.offset = {
        setOffset: function(e, t, n) {
            var r, i, s, o, u, a, f, l = jQuery.css(e, "position"),
                c = jQuery(e),
                h = {};
            l === "static" && (e.style.position = "relative"), u = c.offset(), s = jQuery.css(e, "top"), a = jQuery.css(e, "left"), f = (l === "absolute" || l === "fixed") && (s + a).indexOf("auto") > -1, f ? (r = c.position(), o = r.top, i = r.left) : (o = parseFloat(s) || 0, i = parseFloat(a) || 0), jQuery.isFunction(t) && (t = t.call(e, n, u)), t.top != null && (h.top = t.top - u.top + o), t.left != null && (h.left = t.left - u.left + i), "using" in t ? t.using.call(e, h) : c.css(h)
        }
    }, jQuery.fn.extend({
        offset: function(e) {
            if (arguments.length) return e === undefined ? this : this.each(function(t) {
                jQuery.offset.setOffset(this, e, t)
            });
            var t, n, r = this[0],
                i = {
                    top: 0,
                    left: 0
                },
                s = r && r.ownerDocument;
            if (!s) return;
            return t = s.documentElement, jQuery.contains(t, r) ? (typeof r.getBoundingClientRect !== strundefined && (i = r.getBoundingClientRect()), n = getWindow(s), {
                top: i.top + n.pageYOffset - t.clientTop,
                left: i.left + n.pageXOffset - t.clientLeft
            }) : i
        },
        position: function() {
            if (!this[0]) return;
            var e, t, n = this[0],
                r = {
                    top: 0,
                    left: 0
                };
            return jQuery.css(n, "position") === "fixed" ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), jQuery.nodeName(e[0], "html") || (r = e.offset()), r.top += jQuery.css(e[0], "borderTopWidth", !0), r.left += jQuery.css(e[0], "borderLeftWidth", !0)), {
                top: t.top - r.top - jQuery.css(n, "marginTop", !0),
                left: t.left - r.left - jQuery.css(n, "marginLeft", !0)
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var e = this.offsetParent || docElem;
                while (e && !jQuery.nodeName(e, "html") && jQuery.css(e, "position") === "static") e = e.offsetParent;
                return e || docElem
            })
        }
    }), jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, t) {
        var n = "pageYOffset" === t;
        jQuery.fn[e] = function(r) {
            return access(this, function(e, r, i) {
                var s = getWindow(e);
                if (i === undefined) return s ? s[t] : e[r];
                s ? s.scrollTo(n ? window.pageXOffset : i, n ? i : window.pageYOffset) : e[r] = i
            }, e, r, arguments.length, null)
        }
    }), jQuery.each(["top", "left"], function(e, t) {
        jQuery.cssHooks[t] = addGetHookIf(support.pixelPosition, function(e, n) {
            if (n) return n = curCSS(e, t), rnumnonpx.test(n) ? jQuery(e).position()[t] + "px" : n
        })
    }), jQuery.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        jQuery.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, r) {
            jQuery.fn[r] = function(r, i) {
                var s = arguments.length && (n || typeof r != "boolean"),
                    o = n || (r === !0 || i === !0 ? "margin" : "border");
                return access(this, function(t, n, r) {
                    var i;
                    return jQuery.isWindow(t) ? t.document.documentElement["client" + e] : t.nodeType === 9 ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : r === undefined ? jQuery.css(t, n, o) : jQuery.style(t, n, r, o)
                }, t, s ? r : undefined, s, null)
            }
        })
    }), jQuery.fn.size = function() {
        return this.length
    }, jQuery.fn.andSelf = jQuery.fn.addBack, typeof define == "function" && define.amd && define("jquery", [], function() {
        return jQuery
    });
    var _jQuery = window.jQuery,
        _$ = window.$;
    return jQuery.noConflict = function(e) {
        return window.$ === jQuery && (window.$ = _$), e && window.jQuery === jQuery && (window.jQuery = _jQuery), jQuery
    }, typeof noGlobal === strundefined && (window.jQuery = window.$ = jQuery), jQuery
}), define("can/util/can", [], function() {
        var e = window.can || {};
        if (typeof GLOBALCAN == "undefined" || GLOBALCAN !== !1) window.can = e;
        e.k = function() {}, e.isDeferred = function(e) {
            return e && typeof e.then == "function" && typeof e.pipe == "function"
        };
        var t = 0;
        return e.cid = function(e, n) {
            return e._cid || (t++, e._cid = (n || "") + t), e._cid
        }, e.VERSION = "2.1.3", e.simpleExtend = function(e, t) {
            for (var n in t) e[n] = t[n];
            return e
        }, e.frag = function(t) {
            var n;
            return !t || typeof t == "string" ? (n = e.buildFragment(t == null ? "" : "" + t, document.body), n.childNodes.length || n.appendChild(document.createTextNode("")), n) : t.nodeType === 11 ? t : typeof t.nodeType == "number" ? (n = document.createDocumentFragment(), n.appendChild(t), n) : typeof t.length == "number" ? (n = document.createDocumentFragment(), e.each(t, function(t) {
                n.appendChild(e.frag(t))
            }), n) : (n = e.buildFragment("" + t, document.body), n.childNodes.length || n.appendChild(document.createTextNode("")), n)
        }, e.__reading = function() {}, e
    }), define("can/util/attr", ["can/util/can"], function(e) {
        var t = window.setImmediate || function(e) {
                return setTimeout(e, 0)
            },
            n = {
                MutationObserver: window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
                map: {
                    "class": "className",
                    value: "value",
                    innerText: "innerText",
                    textContent: "textContent",
                    checked: !0,
                    disabled: !0,
                    readonly: !0,
                    required: !0,
                    src: function(e, t) {
                        return t == null || t === "" ? (e.removeAttribute("src"), null) : (e.setAttribute("src", t), t)
                    },
                    style: function(e, t) {
                        return e.style.cssText = t || ""
                    }
                },
                defaultValue: ["input", "textarea"],
                set: function(t, r, i) {
                    var s;
                    n.MutationObserver || (s = n.get(t, r));
                    var o = t.nodeName.toString().toLowerCase(),
                        u = n.map[r],
                        a;
                    typeof u == "function" ? a = u(t, i) : u === !0 ? (a = t[r] = !0, r === "checked" && t.type === "radio" && e.inArray(o, n.defaultValue) >= 0 && (t.defaultChecked = !0)) : u ? (a = t[u] = i, u === "value" && e.inArray(o, n.defaultValue) >= 0 && (t.defaultValue = i)) : (t.setAttribute(r, i), a = i), !n.MutationObserver && a !== s && n.trigger(t, r, s)
                },
                trigger: function(n, r, i) {
                    if (e.data(e.$(n), "canHasAttributesBindings")) return t(function() {
                        e.trigger(n, {
                            type: "attributes",
                            attributeName: r,
                            target: n,
                            oldValue: i,
                            bubbles: !1
                        }, [])
                    })
                },
                get: function(e, t) {
                    var r = n.map[t];
                    return typeof r == "string" && e[r] ? e[r] : e.getAttribute(t)
                },
                remove: function(e, t) {
                    var r;
                    n.MutationObserver || (r = n.get(e, t));
                    var i = n.map[t];
                    typeof i == "function" && i(e, undefined), i === !0 ? e[t] = !1 : typeof i == "string" ? e[i] = "" : e.removeAttribute(t), !n.MutationObserver && r != null && n.trigger(e, t, r)
                },
                has: function() {
                    var e = document.createElement("div");
                    return e.hasAttribute ? function(e, t) {
                        return e.hasAttribute(t)
                    } : function(e, t) {
                        return e.getAttribute(t) !== null
                    }
                }()
            };
        return n
    }), define("can/event", ["can/util/can"], function(e) {
        return e.addEvent = function(e, t) {
            var n = this.__bindEvents || (this.__bindEvents = {}),
                r = n[e] || (n[e] = []);
            return r.push({
                handler: t,
                name: e
            }), this
        }, e.listenTo = function(t, n, r) {
            var i = this.__listenToEvents;
            i || (i = this.__listenToEvents = {});
            var s = e.cid(t),
                o = i[s];
            o || (o = i[s] = {
                obj: t,
                events: {}
            });
            var u = o.events[n];
            u || (u = o.events[n] = []), u.push(r), e.bind.call(t, n, r)
        }, e.stopListening = function(t, n, r) {
            var i = this.__listenToEvents,
                s = i,
                o = 0;
            if (!i) return this;
            if (t) {
                var u = e.cid(t);
                (s = {})[u] = i[u];
                if (!i[u]) return this
            }
            for (var a in s) {
                var f = s[a],
                    l;
                t = i[a].obj, n ? (l = {})[n] = f.events[n] : l = f.events;
                for (var c in l) {
                    var h = l[c] || [];
                    o = 0;
                    while (o < h.length) r && r === h[o] || !r ? (e.unbind.call(t, c, h[o]), h.splice(o, 1)) : o++;
                    h.length || delete f.events[c]
                }
                e.isEmptyObject(f.events) && delete i[a]
            }
            return this
        }, e.removeEvent = function(e, t, n) {
            if (!this.__bindEvents) return this;
            var r = this.__bindEvents[e] || [],
                i = 0,
                s, o = typeof t == "function";
            while (i < r.length) s = r[i], (n ? n(s, e, t) : o && s.handler === t || !o && (s.cid === t || !t)) ? r.splice(i, 1) : i++;
            return this
        }, e.dispatch = function(e, t) {
            var n = this.__bindEvents;
            if (!n) return;
            typeof e == "string" && (e = {
                type: e
            });
            var r = e.type,
                i = (n[r] || []).slice(0),
                s = [e];
            t && s.push.apply(s, t);
            for (var o = 0, u = i.length; o < u; o++) i[o].handler.apply(this, s);
            return e
        }, e.one = function(t, n) {
            var r = function() {
                return e.unbind.call(this, t, r), n.apply(this, arguments)
            };
            return e.bind.call(this, t, r), this
        }, e.event = {
            on: function() {
                return arguments.length === 0 && e.Control && this instanceof e.Control ? e.Control.prototype.on.call(this) : e.addEvent.apply(this, arguments)
            },
            off: function() {
                return arguments.length === 0 && e.Control && this instanceof e.Control ? e.Control.prototype.off.call(this) : e.removeEvent.apply(this, arguments)
            },
            bind: e.addEvent,
            unbind: e.removeEvent,
            delegate: function(t, n, r) {
                return e.addEvent.call(this, n, r)
            },
            undelegate: function(t, n, r) {
                return e.removeEvent.call(this, n, r)
            },
            trigger: e.dispatch,
            one: e.one,
            addEvent: e.addEvent,
            removeEvent: e.removeEvent,
            listenTo: e.listenTo,
            stopListening: e.stopListening,
            dispatch: e.dispatch
        }, e.event
    }), define("can/util/array/each", ["can/util/can"], function(e) {
        var t = function(e) {
            var t = e.length;
            return typeof arr != "function" && (t === 0 || typeof t == "number" && t > 0 && t - 1 in e)
        };
        return e.each = function(n, r, i) {
            var s = 0,
                o, u, a;
            if (n)
                if (t(n))
                    if (e.List && n instanceof e.List)
                        for (u = n.attr("length"); s < u; s++) {
                            a = n.attr(s);
                            if (r.call(i || a, a, s, n) === !1) break
                        } else
                            for (u = n.length; s < u; s++) {
                                a = n[s];
                                if (r.call(i || a, a, s, n) === !1) break
                            } else if (typeof n == "object")
                                if (e.Map && n instanceof e.Map || n === e.route) {
                                    var f = e.Map.keys(n);
                                    for (s = 0, u = f.length; s < u; s++) {
                                        o = f[s], a = n.attr(o);
                                        if (r.call(i || a, a, o, n) === !1) break
                                    }
                                } else
                                    for (o in n)
                                        if (n.hasOwnProperty(o) && r.call(i || n[o], n[o], o, n) === !1) break;
            return n
        }, e
    }), define("can/util/inserted", ["can/util/can"], function(e) {
        e.inserted = function(t) {
            t = e.makeArray(t);
            var n = !1,
                r = e.$(document.contains ? document : document.body),
                i;
            for (var s = 0, o;
                (o = t[s]) !== undefined; s++) {
                if (!n) {
                    if (!o.getElementsByTagName) continue;
                    if (!e.has(r, o).length) return;
                    n = !0
                }
                if (n && o.getElementsByTagName) {
                    i = e.makeArray(o.getElementsByTagName("*")), e.trigger(o, "inserted", [], !1);
                    for (var u = 0, a;
                        (a = i[u]) !== undefined; u++) e.trigger(a, "inserted", [], !1)
                }
            }
        }, e.appendChild = function(t, n) {
            var r;
            n.nodeType === 11 ? r = e.makeArray(n.childNodes) : r = [n], t.appendChild(n), e.inserted(r)
        }, e.insertBefore = function(t, n, r) {
            var i;
            n.nodeType === 11 ? i = e.makeArray(n.childNodes) : i = [n], t.insertBefore(n, r), e.inserted(i)
        }
    }), define("can/util/jquery", ["jquery", "can/util/can", "can/util/attr", "can/event", "can/util/array/each", "can/util/inserted"], function(e, t, n, r) {
        var i = function(e) {
            return e.nodeName && (e.nodeType === 1 || e.nodeType === 9) || e == window
        };
        e.extend(t, e, {
            trigger: function(n, r, s, o) {
                i(n) ? e.event.trigger(r, s, n, !o) : n.trigger ? n.trigger(r, s) : (typeof r == "string" && (r = {
                    type: r
                }), r.target = r.target || n, s && (s.length && typeof s == "string" ? s = [s] : s.length || (s = [s])), s || (s = []), t.dispatch.call(n, r, s))
            },
            event: t.event,
            addEvent: t.addEvent,
            removeEvent: t.removeEvent,
            buildFragment: function(t, n) {
                var r;
                return t = [t], n = n || document, n = !n.nodeType && n[0] || n, n = n.ownerDocument || n, r = e.buildFragment(t, n), r.cacheable ? e.clone(r.fragment) : r.fragment || r
            },
            $: e,
            each: t.each,
            bind: function(n, r) {
                return this.bind && this.bind !== t.bind ? this.bind(n, r) : i(this) ? e.event.add(this, n, r) : t.addEvent.call(this, n, r), this
            },
            unbind: function(n, r) {
                return this.unbind && this.unbind !== t.unbind ? this.unbind(n, r) : i(this) ? e.event.remove(this, n, r) : t.removeEvent.call(this, n, r), this
            },
            delegate: function(n, r, s) {
                return this.delegate ? this.delegate(n, r, s) : i(this) ? e(this).delegate(n, r, s) : t.bind.call(this, r, s), this
            },
            undelegate: function(n, r, s) {
                return this.undelegate ? this.undelegate(n, r, s) : i(this) ? e(this).undelegate(n, r, s) : t.unbind.call(this, r, s), this
            },
            proxy: function(e, t) {
                return function() {
                    return e.apply(t, arguments)
                }
            },
            attr: n
        }), t.on = t.bind, t.off = t.unbind, e.each(["append", "filter", "addClass", "remove", "data", "get", "has"], function(e, n) {
            t[n] = function(e) {
                return e[n].apply(e, t.makeArray(arguments).slice(1))
            }
        });
        var s = e.cleanData;
        e.cleanData = function(n) {
            e.each(n, function(e, n) {
                n && t.trigger(n, "removed", [], !1)
            }), s(n)
        };
        var o = e.fn.domManip,
            u;
        e.fn.domManip = function(e, t, n) {
            for (var r = 1; r < arguments.length; r++)
                if (typeof arguments[r] == "function") {
                    u = r;
                    break
                }
            return o.apply(this, arguments)
        }, e(document.createElement("div")).append(document.createElement("div")), e.fn.domManip = u === 2 ? function(e, n, r) {
            return o.call(this, e, n, function(e) {
                var n;
                e.nodeType === 11 && (n = t.makeArray(e.childNodes));
                var i = r.apply(this, arguments);
                return t.inserted(n ? n : [e]), i
            })
        } : function(e, n) {
            return o.call(this, e, function(e) {
                var r;
                e.nodeType === 11 && (r = t.makeArray(e.childNodes));
                var i = n.apply(this, arguments);
                return t.inserted(r ? r : [e]), i
            })
        };
        if (!t.attr.MutationObserver) {
            var a = e.attr;
            e.attr = function(e, n) {
                var r, i;
                arguments.length >= 3 && (r = a.call(this, e, n));
                var s = a.apply(this, arguments);
                return arguments.length >= 3 && (i = a.call(this, e, n)), i !== r && t.attr.trigger(e, n, r), s
            };
            var f = e.removeAttr;
            e.removeAttr = function(e, n) {
                var r = a.call(this, e, n),
                    i = f.apply(this, arguments);
                return r != null && t.attr.trigger(e, n, r), i
            }, e.event.special.attributes = {
                setup: function() {
                    t.data(t.$(this), "canHasAttributesBindings", !0)
                },
                teardown: function() {
                    e.removeData(this, "canHasAttributesBindings")
                }
            }
        } else e.event.special.attributes = {
            setup: function() {
                var e = this,
                    n = new t.attr.MutationObserver(function(n) {
                        n.forEach(function(n) {
                            var r = t.simpleExtend({}, n);
                            t.trigger(e, r, [])
                        })
                    });
                n.observe(this, {
                    attributes: !0,
                    attributeOldValue: !0
                }), t.data(t.$(this), "canAttributesObserver", n)
            },
            teardown: function() {
                t.data(t.$(this), "canAttributesObserver").disconnect(), e.removeData(this, "canAttributesObserver")
            }
        };
        return function() {
            var e = "<-\n>",
                n = t.buildFragment(e, document);
            if (e !== n.childNodes[0].nodeValue) {
                var r = t.buildFragment;
                t.buildFragment = function(e, t) {
                    var n = r(e, t);
                    return n.childNodes.length === 1 && n.childNodes[0].nodeType === 3 && (n.childNodes[0].nodeValue = e), n
                }
            }
        }(), e.event.special.inserted = {}, e.event.special.removed = {}, t
    }), define("can/util/library", ["can/util/jquery"], function(e) {
        return e
    }), define("can/util/bind", ["can/util/library"], function(e) {
        return e.bindAndSetup = function() {
            return e.addEvent.apply(this, arguments), this._init || (this._bindings ? this._bindings++ : (this._bindings = 1, this._bindsetup && this._bindsetup())), this
        }, e.unbindAndTeardown = function(t, n) {
            return e.removeEvent.apply(this, arguments), this._bindings === null ? this._bindings = 0 : this._bindings--, !this._bindings && this._bindteardown && this._bindteardown(), this
        }, e
    }), define("can/map/bubble", ["can/util/library"], function(e) {
        var t = e.bubble = {
            event: function(e, t) {
                return e.constructor._bubbleRule(t, e)
            },
            childrenOf: function(e, n) {
                e._each(function(r, i) {
                    r && r.bind && t.toParent(r, e, i, n)
                })
            },
            teardownChildrenFrom: function(e, n) {
                e._each(function(r) {
                    t.teardownFromParent(e, r, n)
                })
            },
            toParent: function(t, n, r, i) {
                e.listenTo.call(n, t, i, function() {
                    var i = e.makeArray(arguments),
                        s = i.shift();
                    i[0] = (e.List && n instanceof e.List ? n.indexOf(t) : r) + (i[0] ? "." + i[0] : ""), s.triggeredNS = s.triggeredNS || {};
                    if (s.triggeredNS[n._cid]) return;
                    s.triggeredNS[n._cid] = !0, e.trigger(n, s, i)
                })
            },
            teardownFromParent: function(t, n, r) {
                n && n.unbind && e.stopListening.call(t, n, r)
            },
            isBubbling: function(e, t) {
                return e._bubbleBindings && e._bubbleBindings[t]
            },
            bind: function(e, n) {
                if (!e._init) {
                    var r = t.event(e, n);
                    r && (e._bubbleBindings || (e._bubbleBindings = {}), e._bubbleBindings[r] ? e._bubbleBindings[r]++ : (e._bubbleBindings[r] = 1, t.childrenOf(e, r)))
                }
            },
            unbind: function(n, r) {
                var i = t.event(n, r);
                i && (n._bubbleBindings && n._bubbleBindings[i]--, n._bubbleBindings && !n._bubbleBindings[i] && (delete n._bubbleBindings[i], t.teardownChildrenFrom(n, i), e.isEmptyObject(n._bubbleBindings) && delete n._bubbleBindings))
            },
            add: function(n, r, i) {
                if (r instanceof e.Map && n._bubbleBindings)
                    for (var s in n._bubbleBindings) n._bubbleBindings[s] && (t.teardownFromParent(n, r, s), t.toParent(r, n, i, s))
            },
            removeMany: function(e, n) {
                for (var r = 0, i = n.length; r < i; r++) t.remove(e, n[r])
            },
            remove: function(n, r) {
                if (r instanceof e.Map && n._bubbleBindings)
                    for (var i in n._bubbleBindings) n._bubbleBindings[i] && t.teardownFromParent(n, r, i)
            },
            set: function(n, r, i, s) {
                return e.Map.helpers.isObservable(i) && t.add(n, i, r), e.Map.helpers.isObservable(s) && t.remove(n, s), i
            }
        };
        return t
    }), define("can/util/string", ["can/util/library"], function(e) {
        var t = /_|-/,
            n = /\=\=/,
            r = /([A-Z]+)([A-Z][a-z])/g,
            i = /([a-z\d])([A-Z])/g,
            s = /([a-z\d])([A-Z])/g,
            o = /\{([^\}]+)\}/g,
            u = /"/g,
            a = /'/g,
            f = /-+(.)?/g,
            l = /[a-z][A-Z]/g,
            c = function(e, t, n) {
                var r = e[t];
                return r === undefined && n === !0 && (r = e[t] = {}), r
            },
            h = function(e) {
                return /^f|^o/.test(typeof e)
            },
            p = function(e) {
                var t = e === null || e === undefined || isNaN(e) && "" + e == "NaN";
                return "" + (t ? "" : e)
            };
        return e.extend(e, {
            esc: function(e) {
                return p(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(u, "&#34;").replace(a, "&#39;")
            },
            getObject: function(t, n, r) {
                var i = t ? t.split(".") : [],
                    s = i.length,
                    o, u = 0,
                    a, f, l;
                n = e.isArray(n) ? n : [n || window], l = n.length;
                if (!s) return n[0];
                for (u; u < l; u++) {
                    o = n[u], f = undefined;
                    for (a = 0; a < s && h(o); a++) f = o, o = c(f, i[a]);
                    if (f !== undefined && o !== undefined) break
                }
                r === !1 && o !== undefined && delete f[i[a - 1]];
                if (r === !0 && o === undefined) {
                    o = n[0];
                    for (a = 0; a < s && h(o); a++) o = c(o, i[a], !0)
                }
                return o
            },
            capitalize: function(e, t) {
                return e.charAt(0).toUpperCase() + e.slice(1)
            },
            camelize: function(e) {
                return p(e).replace(f, function(e, t) {
                    return t ? t.toUpperCase() : ""
                })
            },
            hyphenate: function(e) {
                return p(e).replace(l, function(e, t) {
                    return e.charAt(0) + "-" + e.charAt(1).toLowerCase()
                })
            },
            underscore: function(e) {
                return e.replace(n, "/").replace(r, "$1_$2").replace(i, "$1_$2").replace(s, "_").toLowerCase()
            },
            sub: function(t, n, r) {
                var i = [];
                return t = t || "", i.push(t.replace(o, function(t, s) {
                    var o = e.getObject(s, n, r === !0 ? !1 : undefined);
                    return o === undefined || o === null ? (i = null, "") : h(o) && i ? (i.push(o), "") : "" + o
                })), i === null ? i : i.length <= 1 ? i[0] : i
            },
            replacer: o,
            undHash: t
        }), e
    }), define("can/construct", ["can/util/string"], function(e) {
        var t = 0;
        return e.Construct = function() {
            if (arguments.length) return e.Construct.extend.apply(e.Construct, arguments)
        }, e.extend(e.Construct, {
            constructorExtends: !0,
            newInstance: function() {
                var e = this.instance(),
                    t;
                return e.setup && (t = e.setup.apply(e, arguments)), e.init && e.init.apply(e, t || arguments), e
            },
            _inherit: function(t, n, r) {
                e.extend(r || t, t || {})
            },
            _overwrite: function(e, t, n, r) {
                e[n] = r
            },
            setup: function(t, n) {
                this.defaults = e.extend(!0, {}, t.defaults, this.defaults)
            },
            instance: function() {
                t = 1;
                var e = new this;
                return t = 0, e
            },
            extend: function(n, r, i) {
                function y() {
                    if (!t) return this.constructor !== y && arguments.length && y.constructorExtends ? y.extend.apply(y, arguments) : y.newInstance.apply(y, arguments)
                }
                var s = n,
                    o = r,
                    u = i;
                typeof s != "string" && (u = o, o = s, s = null), u || (u = o, o = null), u = u || {};
                var a = this,
                    f = this.prototype,
                    l, c, h, p, d, v, m, g;
                g = this.instance(), e.Construct._inherit(u, f, g);
                for (d in a) a.hasOwnProperty(d) && (y[d] = a[d]);
                e.Construct._inherit(o, a, y), s && (l = s.split("."), v = l.pop(), c = e.getObject(l.join("."), window, !0), m = c, h = e.underscore(s.replace(/\./g, "_")), p = e.underscore(v), c[v] = y), e.extend(y, {
                    constructor: y,
                    prototype: g,
                    namespace: m,
                    _shortName: p,
                    fullName: s,
                    _fullName: h
                }), v !== undefined && (y.shortName = v), y.prototype.constructor = y;
                var b = [a].concat(e.makeArray(arguments)),
                    w = y.setup.apply(y, b);
                return y.init && y.init.apply(y, w || b), y
            }
        }), e.Construct.prototype.setup = function() {}, e.Construct.prototype.init = function() {}, e.Construct
    }), define("can/util/batch", ["can/util/can"], function(e) {
        var t = 1,
            n = 0,
            r = [],
            i = [];
        e.batch = {
            start: function(e) {
                n++, e && i.push(e)
            },
            stop: function(s, o) {
                s ? n = 0 : n--;
                if (n === 0) {
                    var u = r.slice(0),
                        a = i.slice(0),
                        f, l;
                    r = [], i = [], t++, o && e.batch.start();
                    for (f = 0, l = u.length; f < l; f++) e.dispatch.apply(u[f][0], u[f][1]);
                    for (f = 0, l = a.length; f < a.length; f++) a[f]()
                }
            },
            trigger: function(i, s, o) {
                if (!i._init) {
                    if (n === 0) return e.dispatch.call(i, s, o);
                    s = typeof s == "string" ? {
                        type: s
                    } : s, s.batchNum = t, r.push([i, [s, o]])
                }
            }
        }
    }), define("can/map", ["can/util/library", "can/util/bind", "can/map/bubble", "can/construct", "can/util/batch"], function(e, t, n) {
        var r = null,
            i = function() {
                for (var e in r) r[e].added && delete r[e].obj._cid;
                r = null
            },
            s = function(e) {
                return r && r[e._cid] && r[e._cid].instance
            },
            o = null,
            u = e.Map = e.Construct.extend({
                setup: function() {
                    e.Construct.setup.apply(this, arguments);
                    if (e.Map) {
                        this.defaults || (this.defaults = {}), this._computes = [];
                        for (var t in this.prototype) t !== "define" && typeof this.prototype[t] != "function" ? this.defaults[t] = this.prototype[t] : this.prototype[t].isComputed && this._computes.push(t);
                        this.helpers.define && this.helpers.define(this)
                    }
                    e.List && !(this.prototype instanceof e.List) && (this.List = u.List.extend({
                        Map: this
                    }, {}))
                },
                _bubble: n,
                _bubbleRule: function(e) {
                    return (e === "change" || e.indexOf(".") >= 0) && "change"
                },
                _computes: [],
                bind: e.bindAndSetup,
                on: e.bindAndSetup,
                unbind: e.unbindAndTeardown,
                off: e.unbindAndTeardown,
                id: "id",
                helpers: {
                    define: null,
                    attrParts: function(e, t) {
                        return t ? [e] : typeof e == "object" ? e : ("" + e).split(".")
                    },
                    addToMap: function(t, n) {
                        var s;
                        r || (s = i, r = {});
                        var o = t._cid,
                            u = e.cid(t);
                        return r[u] || (r[u] = {
                            obj: t,
                            instance: n,
                            added: !o
                        }), s
                    },
                    isObservable: function(t) {
                        return t instanceof e.Map || t && t === e.route
                    },
                    canMakeObserve: function(t) {
                        return t && !e.isDeferred(t) && (e.isArray(t) || e.isPlainObject(t))
                    },
                    serialize: function(t, n, r) {
                        var i = e.cid(t),
                            s = !1;
                        return o || (s = !0, o = {
                            attr: {},
                            serialize: {}
                        }), o[n][i] = r, t.each(function(i, s) {
                            var a, f = u.helpers.isObservable(i),
                                l = f && o[n][e.cid(i)];
                            l ? a = l : n === "serialize" ? a = u.helpers._serialize(t, s, i) : a = u.helpers._getValue(t, s, i, n), a !== undefined && (r[s] = a)
                        }), e.__reading(t, "__keys"), s && (o = null), r
                    },
                    _serialize: function(e, t, n) {
                        return u.helpers._getValue(e, t, n, "serialize")
                    },
                    _getValue: function(e, t, n, r) {
                        return u.helpers.isObservable(n) ? n[r]() : n
                    }
                },
                keys: function(t) {
                    var n = [];
                    e.__reading(t, "__keys");
                    for (var r in t._data) n.push(r);
                    return n
                }
            }, {
                setup: function(t) {
                    t instanceof e.Map && (t = t.serialize()), this._data = {}, e.cid(this, ".map"), this._init = 1;
                    var n = this._setupDefaults();
                    this._setupComputes(n);
                    var r = t && e.Map.helpers.addToMap(t, this),
                        i = e.extend(e.extend(!0, {}, n), t);
                    this.attr(i), r && r(), this.bind("change", e.proxy(this._changes, this)), delete this._init
                },
                _setupComputes: function() {
                    var e = this.constructor._computes;
                    this._computedBindings = {};
                    for (var t = 0, n = e.length, r; t < n; t++) r = e[t], this[r] = this[r].clone(this), this._computedBindings[r] = {
                        count: 0
                    }
                },
                _setupDefaults: function() {
                    return this.constructor.defaults || {}
                },
                _bindsetup: function() {},
                _bindteardown: function() {},
                _changes: function(t, n, r, i, s) {
                    e.batch.trigger(this, {
                        type: n,
                        batchNum: t.batchNum,
                        target: t.target
                    }, [i, s])
                },
                _triggerChange: function(t, r, i, s) {
                    n.isBubbling(this, "change") ? e.batch.trigger(this, {
                        type: "change",
                        target: this
                    }, [t, r, i, s]) : e.batch.trigger(this, t, [i, s]), (r === "remove" || r === "add") && e.batch.trigger(this, {
                        type: "__keys",
                        target: this
                    })
                },
                _each: function(e) {
                    var t = this.__get();
                    for (var n in t) t.hasOwnProperty(n) && e(t[n], n)
                },
                attr: function(t, n) {
                    var r = typeof t;
                    return r !== "string" && r !== "number" ? this._attrs(t, n) : arguments.length === 1 ? (e.__reading(this, t), this._get(t)) : (this._set(t, n), this)
                },
                each: function() {
                    return e.each.apply(undefined, [this].concat(e.makeArray(arguments)))
                },
                removeAttr: function(t) {
                    var n = e.List && this instanceof e.List,
                        r = e.Map.helpers.attrParts(t),
                        i = r.shift(),
                        s = n ? this[i] : this._data[i];
                    return r.length && s ? s.removeAttr(r) : (typeof t == "string" && !!~t.indexOf(".") && (i = t), this._remove(i, s), s)
                },
                _remove: function(e, t) {
                    e in this._data && (delete this._data[e], e in this.constructor.prototype || delete this[e], this._triggerChange(e, "remove", undefined, t))
                },
                _get: function(e) {
                    e = "" + e;
                    var t = e.indexOf(".");
                    if (t >= 0) {
                        var n = this.__get(e);
                        if (n !== undefined) return n;
                        var r = e.substr(0, t),
                            i = e.substr(t + 1),
                            s = this.__get(r);
                        return s && s._get ? s._get(i) : undefined
                    }
                    return this.__get(e)
                },
                __get: function(e) {
                    return e ? this._computedBindings[e] ? this[e]() : this._data[e] : this._data
                },
                __type: function(t, n) {
                    if (!(t instanceof e.Map) && e.Map.helpers.canMakeObserve(t)) {
                        var r = s(t);
                        if (r) return r;
                        if (e.isArray(t)) {
                            var i = e.List;
                            return new i(t)
                        }
                        var o = this.constructor.Map || e.Map;
                        return new o(t)
                    }
                    return t
                },
                _set: function(e, t, n) {
                    e = "" + e;
                    var r = e.indexOf("."),
                        i;
                    if (!n && r >= 0) {
                        var s = e.substr(0, r),
                            o = e.substr(r + 1);
                        i = this._init ? undefined : this.__get(s);
                        if (!u.helpers.isObservable(i)) throw "can.Map: Object does not exist";
                        i._set(o, t)
                    } else this.__convert && (t = this.__convert(e, t)), i = this._init ? undefined : this.__get(e), this.__set(e, this.__type(t, e), i)
                },
                __set: function(e, t, n) {
                    if (t !== n) {
                        var r = n !== undefined || this.__get().hasOwnProperty(e) ? "set" : "add";
                        this.___set(e, this.constructor._bubble.set(this, e, t, n)), this._triggerChange(e, r, t, n), n && this.constructor._bubble.teardownFromParent(this, n)
                    }
                },
                ___set: function(e, t) {
                    this._computedBindings[e] ? this[e](t) : this._data[e] = t, typeof this.constructor.prototype[e] != "function" && !this._computedBindings[e] && (this[e] = t)
                },
                bind: function(t, n) {
                    var r = this._computedBindings && this._computedBindings[t];
                    if (r)
                        if (!r.count) {
                            r.count = 1;
                            var i = this;
                            r.handler = function(n, r, s) {
                                e.batch.trigger(i, {
                                    type: t,
                                    batchNum: n.batchNum,
                                    target: i
                                }, [r, s])
                            }, this[t].bind("change", r.handler)
                        } else r.count++;
                    return this.constructor._bubble.bind(this, t), e.bindAndSetup.apply(this, arguments)
                },
                unbind: function(t, n) {
                    var r = this._computedBindings && this._computedBindings[t];
                    return r && (r.count === 1 ? (r.count = 0, this[t].unbind("change", r.handler), delete r.handler) : r.count--), this.constructor._bubble.unbind(this, t), e.unbindAndTeardown.apply(this, arguments)
                },
                serialize: function() {
                    return e.Map.helpers.serialize(this, "serialize", {})
                },
                _attrs: function(t, n) {
                    if (t === undefined) return u.helpers.serialize(this, "attr", {});
                    t = e.simpleExtend({}, t);
                    var r, i = this,
                        s;
                    e.batch.start(), this.each(function(e, r) {
                        if (r === "_cid") return;
                        s = t[r];
                        if (s === undefined) {
                            n && i.removeAttr(r);
                            return
                        }
                        i.__convert && (s = i.__convert(r, s)), u.helpers.isObservable(s) ? i.__set(r, i.__type(s, r), e) : u.helpers.isObservable(e) && u.helpers.canMakeObserve(s) ? e.attr(s, n) : e !== s && i.__set(r, i.__type(s, r), e), delete t[r]
                    });
                    for (r in t) r !== "_cid" && (s = t[r], this._set(r, s, !0));
                    return e.batch.stop(), this
                },
                compute: function(t) {
                    if (e.isFunction(this.constructor.prototype[t])) return e.compute(this[t], this);
                    var n = t.split("."),
                        r = n.length - 1,
                        i = {
                            args: []
                        };
                    return e.compute(function(t) {
                        if (!arguments.length) return e.compute.read(this, n, i).value;
                        e.compute.read(this, n.slice(0, r)).value.attr(n[r], t)
                    }, this)
                }
            });
        return u.prototype.on = u.prototype.bind, u.prototype.off = u.prototype.unbind, u
    }), define("can/list", ["can/util/library", "can/map", "can/map/bubble"], function(e, t, n) {
        var r = [].splice,
            i = function() {
                var e = {
                    0: "a",
                    length: 1
                };
                return r.call(e, 0, 1), !e[0]
            }(),
            s = t.extend({
                Map: t
            }, {
                setup: function(t, n) {
                    this.length = 0, e.cid(this, ".map"), this._init = 1, this._setupComputes(), t = t || [];
                    var r;
                    e.isDeferred(t) ? this.replace(t) : (r = t.length && e.Map.helpers.addToMap(t, this), this.push.apply(this, e.makeArray(t || []))), r && r(), this.bind("change", e.proxy(this._changes, this)), e.simpleExtend(this, n), delete this._init
                },
                _triggerChange: function(n, r, i, s) {
                    t.prototype._triggerChange.apply(this, arguments);
                    var o = +n;
                    !~n.indexOf(".") && !isNaN(o) && (r === "add" ? (e.batch.trigger(this, r, [i, o]), e.batch.trigger(this, "length", [this.length])) : r === "remove" ? (e.batch.trigger(this, r, [s, o]), e.batch.trigger(this, "length", [this.length])) : e.batch.trigger(this, r, [i, o]))
                },
                __get: function(t) {
                    return t ? this[t] && this[t].isComputed && e.isFunction(this.constructor.prototype[t]) ? this[t]() : this[t] : this
                },
                ___set: function(e, t) {
                    this[e] = t, +e >= this.length && (this.length = +e + 1)
                },
                _remove: function(e, t) {
                    isNaN(+e) ? (delete this[e], this._triggerChange(e, "remove", undefined, t)) : this.splice(e, 1)
                },
                _each: function(e) {
                    var t = this.__get();
                    for (var n = 0; n < t.length; n++) e(t[n], n)
                },
                serialize: function() {
                    return t.helpers.serialize(this, "serialize", [])
                },
                splice: function(t, s) {
                    var o = e.makeArray(arguments),
                        u = [],
                        a, f;
                    for (a = 2; a < o.length; a++) o[a] = n.set(this, a, this.__type(o[a], a)), u.push(o[a]);
                    s === undefined && (s = o[1] = this.length - t);
                    var l = r.apply(this, o),
                        c = l;
                    if (u.length && l.length)
                        for (f = 0; f < l.length; f++) e.inArray(l[f], u) >= 0 && c.splice(f, 1);
                    if (!i)
                        for (a = this.length; a < l.length + this.length; a++) delete this[a];
                    return e.batch.start(), s > 0 && (this._triggerChange("" + t, "remove", undefined, l), n.removeMany(this, l)), o.length > 2 && this._triggerChange("" + t, "add", o.slice(2), l), e.batch.stop(), l
                },
                _attrs: function(n, r) {
                    if (n === undefined) return t.helpers.serialize(this, "attr", []);
                    n = e.makeArray(n), e.batch.start(), this._updateAttrs(n, r), e.batch.stop()
                },
                _updateAttrs: function(e, n) {
                    var r = Math.min(e.length, this.length);
                    for (var i = 0; i < r; i++) {
                        var s = this[i],
                            o = e[i];
                        t.helpers.isObservable(s) && t.helpers.canMakeObserve(o) ? s.attr(o, n) : s !== o && this._set(i, o)
                    }
                    e.length > this.length ? this.push.apply(this, e.slice(this.length)) : e.length < this.length && n && this.splice(e.length)
                }
            }),
            o = function(t) {
                return t[0] && e.isArray(t[0]) ? t[0] : e.makeArray(t)
            };
        return e.each({
            push: "length",
            unshift: 0
        }, function(e, t) {
            var r = [][t];
            s.prototype[t] = function() {
                var t = [],
                    i = e ? this.length : 0,
                    s = arguments.length,
                    o, u;
                while (s--) u = arguments[s], t[s] = n.set(this, s, this.__type(u, s));
                return o = r.apply(this, t), (!this.comparator || t.length) && this._triggerChange("" + i, "add", t, undefined), o
            }
        }), e.each({
            pop: "length",
            shift: 0
        }, function(e, t) {
            s.prototype[t] = function() {
                var r = o(arguments),
                    i = e && this.length ? this.length - 1 : 0,
                    s = [][t].apply(this, r);
                return this._triggerChange("" + i, "remove", undefined, [s]), s && s.unbind && n.remove(this, s), s
            }
        }), e.extend(s.prototype, {
            indexOf: function(t, n) {
                return this.attr("length"), e.inArray(t, this, n)
            },
            join: function() {
                return [].join.apply(this.attr(), arguments)
            },
            reverse: function() {
                var t = e.makeArray([].reverse.call(this));
                this.replace(t)
            },
            slice: function() {
                var e = Array.prototype.slice.apply(this, arguments);
                return new this.constructor(e)
            },
            concat: function() {
                var t = [];
                return e.each(e.makeArray(arguments), function(n, r) {
                    t[r] = n instanceof e.List ? n.serialize() : n
                }), new this.constructor(Array.prototype.concat.apply(this.serialize(), t))
            },
            forEach: function(t, n) {
                return e.each(this, t, n || this)
            },
            replace: function(t) {
                return e.isDeferred(t) ? t.then(e.proxy(this.replace, this)) : this.splice.apply(this, [0, this.length].concat(e.makeArray(t || []))), this
            },
            filter: function(t, n) {
                var r = new e.List,
                    i = this,
                    s;
                return this.each(function(e, o, u) {
                    s = t.call(n | i, e, o, i), s && r.push(e)
                }), r
            }
        }), e.List = t.List = s, e.List
    }), define("can/util/string/deparam", ["can/util/library", "can/util/string"], function(e) {
        var t = /^\d+$/,
            n = /([^\[\]]+)|(\[\])/g,
            r = /([^?#]*)(#.*)?$/,
            i = function(e) {
                return decodeURIComponent(e.replace(/\+/g, " "))
            };
        return e.extend(e, {
            deparam: function(s) {
                var o = {},
                    u, a;
                return s && r.test(s) && (u = s.split("&"), e.each(u, function(e) {
                    var r = e.split("="),
                        s = i(r.shift()),
                        u = i(r.join("=")),
                        f = o;
                    if (s) {
                        r = s.match(n);
                        for (var l = 0, c = r.length - 1; l < c; l++) f[r[l]] || (f[r[l]] = t.test(r[l + 1]) || r[l + 1] === "[]" ? [] : {}), f = f[r[l]];
                        a = r.pop(), a === "[]" ? f.push(u) : f[a] = u
                    }
                })), o
            }
        }), e
    }), define("can/route", ["can/util/library", "can/map", "can/list", "can/util/string/deparam"], function(e) {
        var t = /\:([\w\.]+)/g,
            n = /^(?:&[^=]+=[^&]*)+/,
            r = function(t) {
                var n = [];
                return e.each(t, function(t, r) {
                    n.push((r === "className" ? "class" : r) + '="' + (r === "href" ? t : e.esc(t)) + '"')
                }), n.join(" ")
            },
            i = function(e, t) {
                var n = 0,
                    r = 0,
                    i = {};
                for (var s in e.defaults) e.defaults[s] === t[s] && (i[s] = 1, n++);
                for (; r < e.names.length; r++) {
                    if (!t.hasOwnProperty(e.names[r])) return -1;
                    i[e.names[r]] || n++
                }
                return n
            },
            s = window.location,
            o = function(e) {
                return (e + "").replace(/([.?*+\^$\[\]\\(){}|\-])/g, "\\$1")
            },
            u = e.each,
            a = e.extend,
            f = function(t) {
                return t && typeof t == "object" ? (t instanceof e.Map ? t = t.attr() : t = e.isFunction(t.slice) ? t.slice() : e.extend({}, t), e.each(t, function(e, n) {
                    t[n] = f(e)
                })) : t !== undefined && t !== null && e.isFunction(t.toString) && (t = t.toString()), t
            },
            l = function(e) {
                return e.replace(/\\/g, "")
            },
            c, h, p, d, v = function(t, n, r, i) {
                d = 1, clearTimeout(c), c = setTimeout(function() {
                    d = 0;
                    var t = e.route.data.serialize(),
                        n = e.route.param(t, !0);
                    e.route._call("setURL", n), e.batch.trigger(m, "__url", [n, p]), p = n
                }, 10)
            },
            m = e.extend({}, e.event);
        e.route = function(n, r) {
            var i = e.route._call("root");
            i.lastIndexOf("/") === i.length - 1 && n.indexOf("/") === 0 && (n = n.substr(1)), r = r || {};
            var s = [],
                u, a = "",
                f = t.lastIndex = 0,
                c, h = e.route._call("querySeparator"),
                p = e.route._call("matchSlashes");
            while (u = t.exec(n)) s.push(u[1]), a += l(n.substring(f, t.lastIndex - u[0].length)), c = "\\" + (l(n.substr(t.lastIndex, 1)) || h + (p ? "" : "|/")), a += "([^" + c + "]" + (r[u[1]] ? "*" : "+") + ")", f = t.lastIndex;
            return a += n.substr(f).replace("\\", ""), e.route.routes[n] = {
                test: new RegExp("^" + a + "($|" + o(h) + ")"),
                route: n,
                names: s,
                defaults: r,
                length: n.split("/").length
            }, e.route
        }, a(e.route, {
            param: function(n, r) {
                var s, o = 0,
                    f, l = n.route,
                    c = 0;
                delete n.route, u(n, function() {
                    c++
                }), u(e.route.routes, function(e, t) {
                    f = i(e, n), f > o && (s = e, o = f);
                    if (f >= c) return !1
                }), e.route.routes[l] && i(e.route.routes[l], n) === o && (s = e.route.routes[l]);
                if (s) {
                    var h = a({}, n),
                        p = s.route.replace(t, function(e, t) {
                            return delete h[t], n[t] === s.defaults[t] ? "" : encodeURIComponent(n[t])
                        }).replace("\\", ""),
                        d;
                    return u(s.defaults, function(e, t) {
                        h[t] === e && delete h[t]
                    }), d = e.param(h), r && e.route.attr("route", s.route), p + (d ? e.route._call("querySeparator") + d : "")
                }
                return e.isEmptyObject(n) ? "" : e.route._call("querySeparator") + e.param(n)
            },
            deparam: function(t) {
                var n = e.route._call("root");
                n.lastIndexOf("/") === n.length - 1 && t.indexOf("/") === 0 && (t = t.substr(1));
                var r = {
                        length: -1
                    },
                    i = e.route._call("querySeparator"),
                    s = e.route._call("paramsMatcher");
                u(e.route.routes, function(e, n) {
                    e.test.test(t) && e.length > r.length && (r = e)
                });
                if (r.length > -1) {
                    var o = t.match(r.test),
                        f = o.shift(),
                        l = t.substr(f.length - (o[o.length - 1] === i ? 1 : 0)),
                        c = l && s.test(l) ? e.deparam(l.slice(1)) : {};
                    return c = a(!0, {}, r.defaults, c), u(o, function(e, t) {
                        e && e !== i && (c[r.names[t]] = decodeURIComponent(e))
                    }), c.route = r.route, c
                }
                return t.charAt(0) !== i && (t = i + t), s.test(t) ? e.deparam(t.slice(1)) : {}
            },
            data: new e.Map({}),
            map: function(t) {
                var n;
                t.prototype instanceof e.Map ? n = new t : n = t, e.route.data = n
            },
            routes: {},
            ready: function(t) {
                return t !== !0 && (e.route._setup(), e.route.setState()), e.route
            },
            url: function(t, n) {
                return n && (t = e.extend({}, e.route.deparam(e.route._call("matchingPartOfURL")), t)), e.route._call("root") + e.route.param(t)
            },
            link: function(t, n, i, s) {
                return "<a " + r(a({
                    href: e.route.url(n, s)
                }, i)) + ">" + t + "</a>"
            },
            current: function(t) {
                return e.__reading(m, "__url"), this._call("matchingPartOfURL") === e.route.param(t)
            },
            bindings: {
                hashchange: {
                    paramsMatcher: n,
                    querySeparator: "&",
                    matchSlashes: !1,
                    bind: function() {
                        e.bind.call(window, "hashchange", g)
                    },
                    unbind: function() {
                        e.unbind.call(window, "hashchange", g)
                    },
                    matchingPartOfURL: function() {
                        return s.href.split(/#!?/)[1] || ""
                    },
                    setURL: function(e) {
                        return s.hash = "#!" + e, e
                    },
                    root: "#!"
                }
            },
            defaultBinding: "hashchange",
            currentBinding: null,
            _setup: function() {
                e.route.currentBinding || (e.route._call("bind"), e.route.bind("change", v), e.route.currentBinding = e.route.defaultBinding)
            },
            _teardown: function() {
                e.route.currentBinding && (e.route._call("unbind"), e.route.unbind("change", v), e.route.currentBinding = null), clearTimeout(c), d = 0
            },
            _call: function() {
                var t = e.makeArray(arguments),
                    n = t.shift(),
                    r = e.route.bindings[e.route.currentBinding || e.route.defaultBinding],
                    i = r[n];
                return i.apply ? i.apply(r, t) : i
            }
        }), u(["bind", "unbind", "on", "off", "delegate", "undelegate", "removeAttr", "compute", "_get", "__get", "each"], function(t) {
            e.route[t] = function() {
                if (!e.route.data[t]) return;
                return e.route.data[t].apply(e.route.data, arguments)
            }
        }), e.route.attr = function(t, n) {
            var r = typeof t,
                i;
            return n === undefined ? i = arguments : r !== "string" && r !== "number" ? i = [f(t), n] : i = [t, f(n)], e.route.data.attr.apply(e.route.data, i)
        };
        var g = e.route.setState = function() {
            var t = e.route._call("matchingPartOfURL"),
                n = h;
            h = e.route.deparam(t);
            if (!d || t !== p) {
                e.batch.start();
                for (var r in n) h[r] || e.route.removeAttr(r);
                e.route.attr(h), e.batch.trigger(m, "__url", [t, p]), e.batch.stop()
            }
        };
        return e.route
    }), define("can/control", ["can/util/library", "can/construct"], function(e) {
        var t = function(t, n, r) {
                return e.bind.call(t, n, r),
                    function() {
                        e.unbind.call(t, n, r)
                    }
            },
            n = e.isFunction,
            r = e.extend,
            i = e.each,
            s = [].slice,
            o = /\{([^\}]+)\}/g,
            u = e.getObject("$.event.special", [e]) || {},
            a = function(t, n, r, i) {
                return e.delegate.call(t, n, r, i),
                    function() {
                        e.undelegate.call(t, n, r, i)
                    }
            },
            f = function(n, r, i, s) {
                return s ? a(n, e.trim(s), r, i) : t(n, r, i)
            },
            l, c = e.Control = e.Construct({
                setup: function() {
                    e.Construct.setup.apply(this, arguments);
                    if (e.Control) {
                        var t = this,
                            n;
                        t.actions = {};
                        for (n in t.prototype) t._isAction(n) && (t.actions[n] = t._action(n))
                    }
                },
                _shifter: function(t, r) {
                    var i = typeof r == "string" ? t[r] : r;
                    return n(i) || (i = t[i]),
                        function() {
                            return t.called = r, i.apply(t, [this.nodeName ? e.$(this) : this].concat(s.call(arguments, 0)))
                        }
                },
                _isAction: function(e) {
                    var t = this.prototype[e],
                        r = typeof t;
                    return e !== "constructor" && (r === "function" || r === "string" && n(this.prototype[t])) && !!(u[e] || h[e] || /[^\w]/.test(e))
                },
                _action: function(t, n) {
                    o.lastIndex = 0;
                    if (n || !o.test(t)) {
                        var r = n ? e.sub(t, this._lookup(n)) : t;
                        if (!r) return null;
                        var i = e.isArray(r),
                            s = i ? r[1] : r,
                            u = s.split(/\s+/g),
                            a = u.pop();
                        return {
                            processor: h[a] || l,
                            parts: [s, u.join(" "), a],
                            delegate: i ? r[0] : undefined
                        }
                    }
                },
                _lookup: function(e) {
                    return [e, window]
                },
                processors: {},
                defaults: {}
            }, {
                setup: function(t, n) {
                    var i = this.constructor,
                        s = i.pluginName || i._fullName,
                        o;
                    return this.element = e.$(t), s && s !== "can_control" && this.element.addClass(s), o = e.data(this.element, "controls"), o || (o = [], e.data(this.element, "controls", o)), o.push(this), this.options = r({}, i.defaults, n), this.on(), [this.element, this.options]
                },
                on: function(t, n, r, i) {
                    if (!t) {
                        this.off();
                        var s = this.constructor,
                            o = this._bindings,
                            u = s.actions,
                            a = this.element,
                            l = e.Control._shifter(this, "destroy"),
                            c, h;
                        for (c in u) u.hasOwnProperty(c) && (h = u[c] || s._action(c, this.options, this), h && (o.control[c] = h.processor(h.delegate || a, h.parts[2], h.parts[1], c, this)));
                        return e.bind.call(a, "removed", l), o.user.push(function(t) {
                            e.unbind.call(t, "removed", l)
                        }), o.user.length
                    }
                    return typeof t == "string" && (i = r, r = n, n = t, t = this.element), i === undefined && (i = r, r = n, n = null), typeof i == "string" && (i = e.Control._shifter(this, i)), this._bindings.user.push(f(t, r, i, n)), this._bindings.user.length
                },
                off: function() {
                    var e = this.element[0],
                        t = this._bindings;
                    t && (i(t.user || [], function(t) {
                        t(e)
                    }), i(t.control || {}, function(t) {
                        t(e)
                    })), this._bindings = {
                        user: [],
                        control: {}
                    }
                },
                destroy: function() {
                    if (this.element === null) return;
                    var t = this.constructor,
                        n = t.pluginName || t._fullName,
                        r;
                    this.off(), n && n !== "can_control" && this.element.removeClass(n), r = e.data(this.element, "controls"), r.splice(e.inArray(this, r), 1), e.trigger(this, "destroyed"), this.element = null
                }
            }),
            h = e.Control.processors;
        return l = function(t, n, r, i, s) {
            return f(t, n, e.Control._shifter(s, i), r)
        }, i(["change", "click", "contextmenu", "dblclick", "keydown", "keyup", "keypress", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "reset", "resize", "scroll", "select", "submit", "focusin", "focusout", "mouseenter", "mouseleave", "touchstart", "touchmove", "touchcancel", "touchend", "touchleave", "inserted", "removed"], function(e) {
            h[e] = l
        }), c
    }), define("can/control/route", ["can/util/library", "can/route", "can/control"], function(e) {
        return e.Control.processors.route = function(t, n, r, i, s) {
            r = r || "", e.route.routes[r] || (r[0] === "/" && (r = r.substring(1)), e.route(r));
            var o, u = function(t, n, u) {
                if (e.route.attr("route") === r && (t.batchNum === undefined || t.batchNum !== o)) {
                    o = t.batchNum;
                    var a = e.route.attr();
                    delete a.route, e.isFunction(s[i]) ? s[i](a) : s[s[i]](a)
                }
            };
            return e.route.bind("change", u),
                function() {
                    e.route.unbind("change", u)
                }
        }, e
    }), define("can/model", ["can/util/library", "can/map", "can/list"], function(e) {
        var t = function(t, n, r) {
                var i = new e.Deferred;
                return t.then(function() {
                    var t = e.makeArray(arguments),
                        s = !0;
                    try {
                        t[0] = r.apply(n, t)
                    } catch (o) {
                        s = !1, i.rejectWith(i, [o].concat(t))
                    }
                    s && i.resolveWith(i, t)
                }, function() {
                    i.rejectWith(this, arguments)
                }), typeof t.abort == "function" && (i.abort = function() {
                    return t.abort()
                }), i
            },
            n = 0,
            r = function(t) {
                return e.__reading(t, t.constructor.id), t.__get(t.constructor.id)
            },
            i = function(t, n, r, i, s, o) {
                var u = {};
                if (typeof t == "string") {
                    var a = t.split(/\s+/);
                    u.url = a.pop(), a.length && (u.type = a.pop())
                } else e.extend(u, t);
                return u.data = typeof n == "object" && !e.isArray(n) ? e.extend(u.data || {}, n) : n, u.url = e.sub(u.url, u.data, !0), e.ajax(e.extend({
                    type: r || "post",
                    dataType: i || "json",
                    success: s,
                    error: o
                }, u))
            },
            s = function(n, i, s, o, u) {
                var a;
                e.isArray(n) ? (a = n[1], n = n[0]) : a = n.serialize(), a = [a];
                var f, l = n.constructor,
                    c;
                return (i === "update" || i === "destroy") && a.unshift(r(n)), c = l[i].apply(l, a), f = t(c, n, function(e) {
                    return n[u || i + "d"](e, c), n
                }), c.abort && (f.abort = function() {
                    c.abort()
                }), f.then(s, o), f
            },
            o = {
                models: function(t) {
                    return function(n, r) {
                        e.Model._reqs++;
                        if (!n) return;
                        if (n instanceof this.List) return n;
                        var i = this,
                            s = [],
                            o = i.List || v,
                            u = r instanceof e.List ? r : new o,
                            a = e.isArray(n),
                            f = n instanceof v,
                            l = a ? n : f ? n.serialize() : e.getObject(t || "data", n);
                        if (typeof l == "undefined") throw new Error("Could not get any raw data while converting using .models");
                        return u.length && u.splice(0), e.each(l, function(e) {
                            s.push(i.model(e))
                        }), u.push.apply(u, s), a || e.each(n, function(e, t) {
                            t !== "data" && u.attr(t, e)
                        }), setTimeout(e.proxy(this._clean, this), 1), u
                    }
                },
                model: function(t) {
                    return function(n) {
                        if (!n) return;
                        typeof n.serialize == "function" && (n = n.serialize()), this.parseModel ? n = this.parseModel.apply(this, arguments) : t && (n = e.getObject(t || "data", n));
                        var r = n[this.id],
                            i = (r || r === 0) && this.store[r] ? this.store[r].attr(n, this.removeAttr || !1) : new this(n);
                        return i
                    }
                }
            },
            u = function(t) {
                return function(n) {
                    return t ? e.getObject(t || "data", n) : n
                }
            },
            a = {
                parseModel: u,
                parseModels: u
            },
            f = {
                create: {
                    url: "_shortName",
                    type: "post"
                },
                update: {
                    data: function(t, n) {
                        n = n || {};
                        var r = this.id;
                        return n[r] && n[r] !== t && (n["new" + e.capitalize(t)] = n[r], delete n[r]), n[r] = t, n
                    },
                    type: "put"
                },
                destroy: {
                    type: "delete",
                    data: function(e, t) {
                        return t = t || {}, t.id = t[this.id] = e, t
                    }
                },
                findAll: {
                    url: "_shortName"
                },
                findOne: {}
            },
            l = function(e, t) {
                return function(n) {
                    return n = e.data ? e.data.apply(this, arguments) : n, i(t || this[e.url || "_url"], n, e.type || "get")
                }
            },
            c = function(e, t) {
                if (!e.resource) return;
                var n = e.resource.replace(/\/+$/, "");
                return t === "findAll" || t === "create" ? n : n + "/{" + e.id + "}"
            };
        e.Model = e.Map.extend({
            fullName: "can.Model",
            _reqs: 0,
            setup: function(t, r, i, s) {
                typeof r != "string" && (s = i, i = r), s || (s = i), this.store = {}, e.Map.setup.apply(this, arguments);
                if (!e.Model) return;
                i && i.List ? (this.List = i.List, this.List.Map = this) : this.List = t.List.extend({
                    Map: this
                }, {});
                var u = this,
                    h = e.proxy(this._clean, u);
                e.each(f, function(n, r) {
                    i && i[r] && (typeof i[r] == "string" || typeof i[r] == "object") ? u[r] = l(n, i[r]) : i && i.resource && (u[r] = l(n, c(u, r)));
                    if (u["make" + e.capitalize(r)]) {
                        var s = u["make" + e.capitalize(r)](u[r]);
                        e.Construct._overwrite(u, t, r, function() {
                            e.Model._reqs++;
                            var t = s.apply(this, arguments),
                                n = t.then(h, h);
                            return n.abort = t.abort, n
                        })
                    }
                }), e.each(o, function(n, r) {
                    var s = "parse" + e.capitalize(r),
                        o = u[r];
                    typeof o == "string" ? (e.Construct._overwrite(u, t, s, a[s](o)), e.Construct._overwrite(u, t, r, n(o))) : (!i || !i[r] && !i[s]) && e.Construct._overwrite(u, t, s, a[s]())
                }), e.each(a, function(n, r) {
                    typeof u[r] == "string" && e.Construct._overwrite(u, t, r, n(u[r]))
                });
                if (u.fullName === "can.Model" || !u.fullName) u.fullName = "Model" + ++n;
                e.Model._reqs = 0, this._url = this._shortName + "/{" + this.id + "}"
            },
            _ajax: l,
            _makeRequest: s,
            _clean: function() {
                e.Model._reqs--;
                if (!e.Model._reqs)
                    for (var t in this.store) this.store[t]._bindings || delete this.store[t];
                return arguments[0]
            },
            models: o.models("data"),
            model: o.model()
        }, {
            setup: function(t) {
                var n = t && t[this.constructor.id];
                e.Model._reqs && n != null && (this.constructor.store[n] = this), e.Map.prototype.setup.apply(this, arguments)
            },
            isNew: function() {
                var e = r(this);
                return !e && e !== 0
            },
            save: function(e, t) {
                return s(this, this.isNew() ? "create" : "update", e, t)
            },
            destroy: function(t, n) {
                if (this.isNew()) {
                    var r = this,
                        i = e.Deferred();
                    return i.then(t, n), i.done(function(e) {
                        r.destroyed(e)
                    }).resolve(r)
                }
                return s(this, "destroy", t, n, "destroyed")
            },
            _bindsetup: function() {
                return this.constructor.store[this.__get(this.constructor.id)] = this, e.Map.prototype._bindsetup.apply(this, arguments)
            },
            _bindteardown: function() {
                return delete this.constructor.store[r(this)], e.Map.prototype._bindteardown.apply(this, arguments)
            },
            ___set: function(t, n) {
                e.Map.prototype.___set.call(this, t, n), t === this.constructor.id && this._bindings && (this.constructor.store[r(this)] = this)
            }
        });
        var h = function(t) {
                var n = "parse" + e.capitalize(t);
                return function(e) {
                    return this[n] && (e = this[n].apply(this, arguments)), this[t](e)
                }
            },
            p = function(e) {
                return this.parseModel ? this.parseModel.apply(this, arguments) : this.model(e)
            },
            d = {
                makeFindAll: h("models"),
                makeFindOne: h("model"),
                makeCreate: p,
                makeUpdate: p
            };
        e.each(d, function(n, r) {
            e.Model[r] = function(r) {
                return function() {
                    var i = e.makeArray(arguments),
                        s = e.isFunction(i[1]) ? i.splice(0, 1) : i.splice(0, 2),
                        o = t(r.apply(this, s), this, n);
                    return o.then(i[0], i[1]), o
                }
            }
        }), e.each(["created", "updated", "destroyed"], function(t) {
            e.Model.prototype[t] = function(n) {
                var r, i = this.constructor;
                r = n && typeof n == "object" && this.attr(n.attr ? n.attr() : n), e.dispatch.call(this, {
                    type: "change",
                    target: this
                }, [t]), e.dispatch.call(i, t, [this])
            }
        });
        var v = e.Model.List = e.List.extend({
            _bubbleRule: function(t, n) {
                return e.List._bubbleRule(t, n) || "destroyed"
            }
        }, {
            setup: function(t) {
                e.isPlainObject(t) && !e.isArray(t) ? (e.List.prototype.setup.apply(this), this.replace(e.isDeferred(t) ? t : this.constructor.Map.findAll(t))) : e.List.prototype.setup.apply(this, arguments), this._init = 1, this.bind("destroyed", e.proxy(this._destroyed, this)), delete this._init
            },
            _destroyed: function(e, t) {
                if (/\w+/.test(t)) {
                    var n;
                    while ((n = this.indexOf(e.target)) > -1) this.splice(n, 1)
                }
            }
        });
        return e.Model
    }), define("can/view", ["can/util/library"], function(e) {
        var t = e.isFunction,
            n = e.makeArray,
            r = 1,
            i = function(e) {
                var t = function() {
                    return f.frag(e.apply(this, arguments))
                };
                return t.render = function() {
                    return e.apply(e, arguments)
                }, t
            },
            s = function(e, t) {
                if (!e.length) throw "can.view: No template or empty template:" + t
            },
            o = function(t, n) {
                var r = typeof t == "string" ? t : t.url,
                    i = t.engine && "." + t.engine || r.match(/\.[\w\d]+$/),
                    o, u, a;
                r.match(/^#/) && (r = r.substr(1));
                if (u = document.getElementById(r)) i = "." + u.type.match(/\/(x\-)?(.+)/)[2];
                !i && !f.cached[r] && (r += i = f.ext), e.isArray(i) && (i = i[0]), a = f.toId(r), r.match(/^\/\//) && (r = r.substr(2), r = window.steal ? steal.config().root.mapJoin("" + steal.id(r)) : r), window.require && require.toUrl && (r = require.toUrl(r)), o = f.types[i];
                if (f.cached[a]) return f.cached[a];
                if (u) return f.registerView(a, u.innerHTML, o);
                var l = new e.Deferred;
                return e.ajax({
                    async: n,
                    url: r,
                    dataType: "text",
                    error: function(e) {
                        s("", r), l.reject(e)
                    },
                    success: function(e) {
                        s(e, r), f.registerView(a, e, o, l)
                    }
                }), l
            },
            u = function(t) {
                var n = [];
                if (e.isDeferred(t)) return [t];
                for (var r in t) e.isDeferred(t[r]) && n.push(t[r]);
                return n
            },
            a = function(t) {
                return e.isArray(t) && t[1] === "success" ? t[0] : t
            },
            f = e.view = e.template = function(e, n, r, i) {
                t(r) && (i = r, r = undefined);
                var s;
                return t(e) ? s = e(n, r, i) : s = f.renderAs("fragment", e, n, r, i), s
            };
        return e.extend(f, {
            frag: function(e, t) {
                return f.hookup(f.fragment(e), t)
            },
            fragment: function(t) {
                if (typeof t != "string" && t.nodeType === 11) return t;
                var n = e.buildFragment(t, document.body);
                return n.childNodes.length || n.appendChild(document.createTextNode("")), n
            },
            toId: function(t) {
                return e.map(t.toString().split(/\/|\./g), function(e) {
                    if (e) return e
                }).join("_")
            },
            toStr: function(e) {
                return e == null ? "" : "" + e
            },
            hookup: function(t, n) {
                var r = [],
                    i, s;
                return e.each(t.childNodes ? e.makeArray(t.childNodes) : t, function(t) {
                    t.nodeType === 1 && (r.push(t), r.push.apply(r, e.makeArray(t.getElementsByTagName("*"))))
                }), e.each(r, function(e) {
                    e.getAttribute && (i = e.getAttribute("data-view-id")) && (s = f.hookups[i]) && (s(e, n, i), delete f.hookups[i], e.removeAttribute("data-view-id"))
                }), t
            },
            hookups: {},
            hook: function(e) {
                return f.hookups[++r] = e, " data-view-id='" + r + "'"
            },
            cached: {},
            cachedRenderers: {},
            cache: !0,
            register: function(t) {
                this.types["." + t.suffix] = t, e[t.suffix] = f[t.suffix] = function(e, n) {
                    var r, s;
                    if (!n) return s = function() {
                        return r || (t.fragRenderer ? r = t.fragRenderer(null, e) : r = i(t.renderer(null, e))), r.apply(this, arguments)
                    }, s.render = function() {
                        var n = t.renderer(null, e);
                        return n.apply(n, arguments)
                    }, s;
                    var o = function() {
                        return r || (t.fragRenderer ? r = t.fragRenderer(e, n) : r = t.renderer(e, n)), r.apply(this, arguments)
                    };
                    return t.fragRenderer ? f.preload(e, o) : f.preloadStringRenderer(e, o)
                }
            },
            types: {},
            ext: ".ejs",
            registerScript: function(e, t, n) {
                return "can.view.preloadStringRenderer('" + t + "'," + f.types["." + e].script(t, n) + ");"
            },
            preload: function(t, n) {
                var r = f.cached[t] = (new e.Deferred).resolve(function(e, t) {
                    return n.call(e, e, t)
                });
                return r.__view_id = t, f.cachedRenderers[t] = n, n
            },
            preloadStringRenderer: function(e, t) {
                return this.preload(e, i(t))
            },
            render: function(t, n, r, i) {
                return e.view.renderAs("string", t, n, r, i)
            },
            renderTo: function(e, t, n, r) {
                return (e === "string" && t.render ? t.render : t)(n, r)
            },
            renderAs: function(r, i, s, l, c) {
                t(l) && (c = l, l = undefined);
                var h = u(s),
                    p, d, v, m, g;
                if (h.length) return d = new e.Deferred, v = e.extend({}, s), h.push(o(i, !0)), e.when.apply(e, h).then(function(t) {
                    var i = n(arguments),
                        o = i.pop(),
                        u;
                    if (e.isDeferred(s)) v = a(t);
                    else
                        for (var f in s) e.isDeferred(s[f]) && (v[f] = a(i.shift()));
                    u = e.view.renderTo(r, o, v, l), d.resolve(u, v), c && c(u, v)
                }, function() {
                    d.reject.apply(d, arguments)
                }), d;
                p = e.__clearReading(), m = t(c), d = o(i, m), p && e.__setReading(p);
                if (m) g = d, d.then(function(t) {
                    c(s ? e.view.renderTo(r, t, s, l) : t)
                });
                else {
                    if (d.state() === "resolved" && d.__view_id) {
                        var y = f.cachedRenderers[d.__view_id];
                        return s ? e.view.renderTo(r, y, s, l) : y
                    }
                    d.then(function(t) {
                        g = s ? e.view.renderTo(r, t, s, l) : t
                    })
                }
                return g
            },
            registerView: function(t, n, r, s) {
                var o = typeof r == "object" ? r : f.types[r || f.ext],
                    u;
                return o.fragRenderer ? u = o.fragRenderer(t, n) : u = i(o.renderer(t, n)), s = s || new e.Deferred, f.cache && (f.cached[t] = s, s.__view_id = t, f.cachedRenderers[t] = u), s.resolve(u)
            }
        }), e
    }), define("can/compute", ["can/util/library", "can/util/bind", "can/util/batch"], function(e, t) {
        var n = [];
        e.__read = function(e, t) {
            n.push({});
            var r = e.call(t);
            return {
                value: r,
                observed: n.pop()
            }
        }, e.__reading = function(e, t) {
            n.length && (n[n.length - 1][e._cid + "|" + t] = {
                obj: e,
                event: t + ""
            })
        }, e.__clearReading = function() {
            if (n.length) {
                var e = n[n.length - 1];
                return n[n.length - 1] = {}, e
            }
        }, e.__setReading = function(e) {
            n.length && (n[n.length - 1] = e)
        }, e.__addReading = function(t) {
            n.length && e.simpleExtend(n[n.length - 1], t)
        };
        var r = function(t, n, r, s) {
                var u = e.__read(t, n),
                    a = u.observed;
                return i(r, a, s), o(r, s), u
            },
            i = function(e, t, n) {
                for (var r in t) s(e, t, r, n)
            },
            s = function(e, t, n, r) {
                if (e[n]) delete e[n];
                else {
                    var i = t[n];
                    i.obj.bind(i.event, r)
                }
            },
            o = function(e, t) {
                for (var n in e) {
                    var r = e[n];
                    r.obj.unbind(r.event, t)
                }
            },
            u = function(t, n, r, i) {
                n !== r && e.batch.trigger(t, i ? {
                    type: "change",
                    batchNum: i
                } : "change", [n, r])
            },
            a = function(t, n, i, s) {
                var o, u, a;
                return {
                    on: function(f) {
                        u || (u = function(e) {
                            if (t.bound && (e.batchNum === undefined || e.batchNum !== a)) {
                                var s = o.value;
                                o = r(n, i, o.observed, u), f(o.value, s, e.batchNum), a = a = e.batchNum
                            }
                        }), o = r(n, i, {}, u), s(o.value), t.hasDependencies = !e.isEmptyObject(o.observed)
                    },
                    off: function(e) {
                        for (var t in o.observed) {
                            var n = o.observed[t];
                            n.obj.unbind(n.event, u)
                        }
                    }
                }
            },
            f = function(t, n, i, s) {
                var o, u, a, f;
                return {
                    on: function(l) {
                        a || (a = function(r) {
                            if (t.bound && (r.batchNum === undefined || r.batchNum !== f)) {
                                var s = e.__clearReading(),
                                    o = n.call(i);
                                e.__setReading(s), l(o, u, r.batchNum), u = o, f = f = r.batchNum
                            }
                        }), o = r(n, i, {}, a), u = o.value, s(o.value), t.hasDependencies = !e.isEmptyObject(o.observed)
                    },
                    off: function(e) {
                        for (var t in o.observed) {
                            var n = o.observed[t];
                            n.obj.unbind(n.event, a)
                        }
                    }
                }
            },
            l = function(t) {
                return t instanceof e.Map || t && t.__get
            },
            c = function() {};
        e.compute = function(t, r, i, s) {
            if (t && t.isComputed) return t;
            var o, l = c,
                h = c,
                p, d = function() {
                    return p
                },
                v = function(e) {
                    p = e
                },
                m = v,
                g = [],
                y = function(e, t, n) {
                    m(e), u(o, e, t, n)
                },
                b;
            for (var w = 0, E = arguments.length; w < E; w++) g[w] = arguments[w];
            o = function(t) {
                if (arguments.length) {
                    var i = p,
                        s = v.call(r, t, i);
                    return o.hasDependencies ? d.call(r) : (s === undefined ? p = d.call(r) : p = s, u(o, p, i), p)
                }
                return n.length && o.canReadForChangeEvent !== !1 && (e.__reading(o, "change"), o.bound || e.compute.temporarilyBind(o)), o.bound ? p : d.call(r)
            };
            if (typeof t == "function") {
                v = t, d = t, o.canReadForChangeEvent = i === !1 ? !1 : !0;
                var S = s ? f(o, t, r || this, m) : a(o, t, r || this, m);
                l = S.on, h = S.off
            } else if (r)
                if (typeof r == "string") {
                    var x = r,
                        T = t instanceof e.Map;
                    if (T) {
                        o.hasDependencies = !0;
                        var N;
                        d = function() {
                            return t.attr(x)
                        }, v = function(e) {
                            t.attr(x, e)
                        }, l = function(n) {
                            N = function(e, t, r) {
                                n(t, r, e.batchNum)
                            }, t.bind(i || x, N), p = e.__read(d).value
                        }, h = function(e) {
                            t.unbind(i || x, N)
                        }
                    } else d = function() {
                        return t[x]
                    }, v = function(e) {
                        t[x] = e
                    }, l = function(n) {
                        N = function() {
                            n(d(), p)
                        }, e.bind.call(t, i || x, N), p = e.__read(d).value
                    }, h = function(n) {
                        e.unbind.call(t, i || x, N)
                    }
                } else if (typeof r == "function") p = t, v = r, r = i, b = "setter";
            else {
                p = t;
                var C = r,
                    L = y;
                r = C.context || C, d = C.get || d, v = C.set || function() {
                    return p
                };
                if (C.fn) {
                    var A = C.fn,
                        O;
                    d = function() {
                        return A.call(r, p)
                    }, A.length === 0 ? O = a(o, A, r, m) : A.length === 1 ? O = a(o, function() {
                        return A.call(r, p)
                    }, r, m) : (y = function(e) {
                        e !== undefined && L(e, p)
                    }, O = a(o, function() {
                        var e = A.call(r, p, function(e) {
                            L(e, p)
                        });
                        return e !== undefined ? e : p
                    }, r, m)), l = O.on, h = O.off
                } else y = function() {
                    var e = d.call(r);
                    L(e, p)
                };
                l = C.on || l, h = C.off || h
            } else p = t;
            return e.cid(o, "compute"), e.simpleExtend(o, {
                isComputed: !0,
                _bindsetup: function() {
                    this.bound = !0;
                    var t = e.__clearReading();
                    l.call(this, y), e.__setReading(t)
                },
                _bindteardown: function() {
                    h.call(this, y), this.bound = !1
                },
                bind: e.bindAndSetup,
                unbind: e.unbindAndTeardown,
                clone: function(t) {
                    return t && (b === "setter" ? g[2] = t : g[1] = t), e.compute.apply(e, g)
                }
            })
        };
        var h, p = function() {
            for (var e = 0, t = h.length; e < t; e++) h[e].unbind("change", c);
            h = null
        };
        return e.compute.temporarilyBind = function(e) {
            e.bind("change", c), h || (h = [], setTimeout(p, 10)), h.push(e)
        }, e.compute.truthy = function(t) {
            return e.compute(function() {
                var e = t();
                return typeof e == "function" && (e = e()), !!e
            })
        }, e.compute.async = function(t, n, r) {
            return e.compute(t, {
                fn: n,
                context: r
            })
        }, e.compute.read = function(t, n, r) {
            r = r || {};
            var i = t,
                s, o, u;
            for (var a = 0, f = n.length; a < f; a++) {
                o = i, o && o.isComputed && (r.foundObservable && r.foundObservable(o, a), o = i = o()), l(o) ? (!u && r.foundObservable && r.foundObservable(o, a), u = 1, typeof o[n[a]] == "function" && o.constructor.prototype[n[a]] === o[n[a]] ? r.returnObserveMethods ? i = i[n[a]] : n[a] === "constructor" && o instanceof e.Construct ? i = o[n[a]] : i = o[n[a]].apply(o, r.args || []) : i = i.attr(n[a])) : i = o[n[a]], s = typeof i, i && i.isComputed && !r.isArgument && a < f - 1 ? (!u && r.foundObservable && r.foundObservable(o, a + 1), i = i()) : a < n.length - 1 && s === "function" && r.executeAnonymousFunctions && !(e.Construct && i.prototype instanceof e.Construct) && (i = i());
                if (a < n.length - 1 && (i === null || s !== "function" && s !== "object")) return r.earlyExit && r.earlyExit(o, a, i), {
                    value: undefined,
                    parent: o
                }
            }
            return typeof i == "function" && !(e.Construct && i.prototype instanceof e.Construct) && (!e.route || i !== e.route) && (r.isArgument ? !i.isComputed && r.proxyMethods !== !1 && (i = e.proxy(i, o)) : (i.isComputed && !u && r.foundObservable && r.foundObservable(i, a), i = i.call(o))), i === undefined && r.earlyExit && r.earlyExit(o, a - 1), {
                value: i,
                parent: o
            }
        }, e.compute
    }), define("can/view/scope", ["can/util/library", "can/construct", "can/map", "can/list", "can/view", "can/compute"], function(e) {
        var t = /(\\)?\./g,
            n = /\\\./g,
            r = function(e) {
                var r = [],
                    i = 0;
                return e.replace(t, function(t, s, o) {
                    s || (r.push(e.slice(i, o).replace(n, ".")), i = o + t.length)
                }), r.push(e.slice(i).replace(n, ".")), r
            },
            i = e.Construct.extend({
                read: e.compute.read
            }, {
                init: function(e, t) {
                    this._context = e, this._parent = t, this.__cache = {}
                },
                attr: function(t) {
                    var n = e.__clearReading(),
                        r = this.read(t, {
                            isArgument: !0,
                            returnObserveMethods: !0,
                            proxyMethods: !1
                        }).value;
                    return e.__setReading(n), r
                },
                add: function(e) {
                    return e !== this._context ? new this.constructor(e, this) : this
                },
                computeData: function(t, n) {
                    n = n || {
                        args: []
                    };
                    var r = this,
                        i, s, o = {
                            compute: e.compute(function(u) {
                                if (!arguments.length) {
                                    if (i) return e.compute.read(i, s, n).value;
                                    var f = r.read(t, n);
                                    return i = f.rootObserve, s = f.reads, o.scope = f.scope, o.initialValue = f.value, o.reads = f.reads, o.root = i, f.value
                                }
                                if (i.isComputed && !s.length) i(u);
                                else {
                                    var a = s.length - 1;
                                    e.compute.read(i, s.slice(0, a)).value.attr(s[a], u)
                                }
                            })
                        };
                    return o
                },
                compute: function(e, t) {
                    return this.computeData(e, t).compute
                },
                read: function(t, n) {
                    var i;
                    if (t.substr(0, 2) === "./") i = !0, t = t.substr(2);
                    else {
                        if (t.substr(0, 3) === "../") return this._parent.read(t.substr(3), n);
                        if (t === "..") return {
                            value: this._parent._context
                        };
                        if (t === "." || t === "this") return {
                            value: this._context
                        }
                    }
                    var s = t.indexOf("\\.") === -1 ? t.split(".") : r(t),
                        o, u = this,
                        a, f = [],
                        l = -1,
                        c, h, p, d;
                    while (u) {
                        o = u._context;
                        if (o !== null) {
                            var v = e.compute.read(o, s, e.simpleExtend({
                                foundObservable: function(e, t) {
                                    p = e, d = s.slice(t)
                                },
                                earlyExit: function(t, n) {
                                    n > l && (a = p, f = d, l = n, h = u, c = e.__clearReading())
                                },
                                executeAnonymousFunctions: !0
                            }, n));
                            if (v.value !== undefined) return {
                                scope: u,
                                rootObserve: p,
                                value: v.value,
                                reads: d
                            }
                        }
                        e.__clearReading(), i ? u = null : u = u._parent
                    }
                    return a ? (e.__setReading(c), {
                        scope: h,
                        rootObserve: a,
                        reads: f,
                        value: undefined
                    }) : {
                        names: s,
                        value: undefined
                    }
                }
            });
        return e.view.Scope = i, i
    }), define("can/view/elements", ["can/util/library", "can/view"], function(e) {
        var t = function() {
                return e.$(document.createComment("~")).length === 1
            }(),
            n = {
                tagToContentPropMap: {
                    option: "textContent" in document.createElement("option") ? "textContent" : "innerText",
                    textarea: "value"
                },
                attrMap: e.attr.map,
                attrReg: /([^\s=]+)[\s]*=[\s]*/,
                defaultValue: e.attr.defaultValue,
                tagMap: {
                    "": "span",
                    colgroup: "col",
                    table: "tbody",
                    tr: "td",
                    ol: "li",
                    ul: "li",
                    tbody: "tr",
                    thead: "tr",
                    tfoot: "tr",
                    select: "option",
                    optgroup: "option"
                },
                reverseTagMap: {
                    col: "colgroup",
                    tr: "tbody",
                    option: "select",
                    td: "tr",
                    th: "tr",
                    li: "ul"
                },
                getParentNode: function(e, t) {
                    return t && e.parentNode.nodeType === 11 ? t : e.parentNode
                },
                setAttr: e.attr.set,
                getAttr: e.attr.get,
                removeAttr: e.attr.remove,
                contentText: function(e) {
                    return typeof e == "string" ? e : !e && e !== 0 ? "" : "" + e
                },
                after: function(t, n) {
                    var r = t[t.length - 1];
                    r.nextSibling ? e.insertBefore(r.parentNode, n, r.nextSibling) : e.appendChild(r.parentNode, n)
                },
                replace: function(r, i) {
                    n.after(r, i), e.remove(e.$(r)).length < r.length && !t && e.each(r, function(e) {
                        e.nodeType === 8 && e.parentNode.removeChild(e)
                    })
                }
            };
        return e.view.elements = n, n
    }), define("can/view/callbacks", ["can/util/library", "can/view"], function(e) {
        var t = e.view.attr = function(e, t) {
                if (!t) {
                    var i = n[e];
                    if (!i)
                        for (var s = 0, o = r.length; s < o; s++) {
                            var u = r[s];
                            if (u.match.test(e)) {
                                i = u.handler;
                                break
                            }
                        }
                    return i
                }
                typeof e == "string" ? n[e] = t : r.push({
                    match: e,
                    handler: t
                })
            },
            n = {},
            r = [],
            i = /[-\:]/,
            s = e.view.tag = function(e, t) {
                if (!t) {
                    var n = o[e.toLowerCase()];
                    return !n && i.test(e) && (n = function() {}), n
                }
                window.html5 && (window.html5.elements += " " + e, window.html5.shivDocument()), o[e.toLowerCase()] = t
            },
            o = {};
        return e.view.callbacks = {
            _tags: o,
            _attributes: n,
            _regExpAttributes: r,
            tag: s,
            attr: t,
            tagHandler: function(t, n, r) {
                var i = r.options.attr("tags." + n),
                    s = i || o[n],
                    u = r.scope,
                    a;
                if (s) {
                    var f = e.__clearReading();
                    a = s(t, r), e.__setReading(f)
                } else a = u;
                if (a && r.subtemplate) {
                    u !== a && (u = u.add(a));
                    var l = r.subtemplate(u, r.options),
                        c = typeof l == "string" ? e.view.frag(l) : l;
                    e.appendChild(t, c)
                }
            }
        }, e.view.callbacks
    }), define("can/view/scanner", ["can/view", "can/view/elements", "can/view/callbacks"], function(can, elements, viewCallbacks) {
        var newLine = /(\r|\n)+/g,
            notEndTag = /\//,
            clean = function(e) {
                return e.split("\\").join("\\\\").split("\n").join("\\n").split('"').join('\\"').split("  ").join("\\t")
            },
            getTag = function(e, t, n) {
                if (e) return e;
                while (n < t.length) {
                    if (t[n] === "<" && !notEndTag.test(t[n + 1])) return elements.reverseTagMap[t[n + 1]] || "span";
                    n++
                }
                return ""
            },
            bracketNum = function(e) {
                return --e.split("{").length - --e.split("}").length
            },
            myEval = function(script) {
                eval(script)
            },
            attrReg = /([^\s]+)[\s]*=[\s]*$/,
            startTxt = "var ___v1ew = [];",
            finishTxt = "return ___v1ew.join('')",
            put_cmd = "___v1ew.push(\n",
            insert_cmd = put_cmd,
            htmlTag = null,
            quote = null,
            beforeQuote = null,
            rescan = null,
            getAttrName = function() {
                var e = beforeQuote.match(attrReg);
                return e && e[1]
            },
            status = function() {
                return quote ? "'" + getAttrName() + "'" : htmlTag ? 1 : 0
            },
            top = function(e) {
                return e[e.length - 1]
            },
            Scanner;
        return can.view.Scanner = Scanner = function(e) {
            can.extend(this, {
                text: {},
                tokens: []
            }, e), this.text.options = this.text.options || "", this.tokenReg = [], this.tokenSimple = {
                "<": "<",
                ">": ">",
                '"': '"',
                "'": "'"
            }, this.tokenComplex = [], this.tokenMap = {};
            for (var t = 0, n; n = this.tokens[t]; t++) n[2] ? (this.tokenReg.push(n[2]), this.tokenComplex.push({
                abbr: n[1],
                re: new RegExp(n[2]),
                rescan: n[3]
            })) : (this.tokenReg.push(n[1]), this.tokenSimple[n[1]] = n[0]), this.tokenMap[n[0]] = n[1];
            this.tokenReg = new RegExp("(" + this.tokenReg.slice(0).concat(["<", ">", '"', "'"]).join("|") + ")", "g")
        }, Scanner.prototype = {
            helpers: [],
            scan: function(e, t) {
                var n = [],
                    r = 0,
                    i = this.tokenSimple,
                    s = this.tokenComplex;
                e = e.replace(newLine, "\n"), this.transform && (e = this.transform(e)), e.replace(this.tokenReg, function(t, o) {
                    var u = arguments[arguments.length - 2];
                    u > r && n.push(e.substring(r, u));
                    if (i[t]) n.push(t);
                    else
                        for (var a = 0, f; f = s[a]; a++)
                            if (f.re.test(t)) {
                                n.push(f.abbr), f.rescan && n.push(f.rescan(o));
                                break
                            }
                    r = u + o.length
                }), r < e.length && n.push(e.substr(r));
                var o = "",
                    u = [startTxt + (this.text.start || "")],
                    a = function(e, t) {
                        u.push(put_cmd, '"', clean(e), '"' + (t || "") + ");")
                    },
                    f = [],
                    l, c = null,
                    h = !1,
                    p = {
                        attributeHookups: [],
                        tagHookups: [],
                        lastTagHookup: ""
                    },
                    d = function() {
                        p.lastTagHookup = p.tagHookups.pop() + p.tagHookups.length
                    },
                    v = "",
                    m = [],
                    g = !1,
                    y, b = !1,
                    w = 0,
                    E, S = this.tokenMap,
                    x;
                htmlTag = quote = beforeQuote = null;
                for (;
                    (E = n[w++]) !== undefined;) {
                    if (c === null) switch (E) {
                        case S.left:
                        case S.escapeLeft:
                        case S.returnLeft:
                            h = htmlTag && 1;
                        case S.commentLeft:
                            c = E, o.length && a(o), o = "";
                            break;
                        case S.escapeFull:
                            h = htmlTag && 1, rescan = 1, c = S.escapeLeft, o.length && a(o), rescan = n[w++], o = rescan.content || rescan, rescan.before && a(rescan.before), n.splice(w, 0, S.right);
                            break;
                        case S.commentFull:
                            break;
                        case S.templateLeft:
                            o += S.left;
                            break;
                        case "<":
                            n[w].indexOf("!--") !== 0 && (htmlTag = 1, h = 0), o += E;
                            break;
                        case ">":
                            htmlTag = 0;
                            var T = o.substr(o.length - 1) === "/" || o.substr(o.length - 2) === "--",
                                N = "";
                            p.attributeHookups.length && (N = "attrs: ['" + p.attributeHookups.join("','") + "'], ", p.attributeHookups = []);
                            if (v + p.tagHookups.length !== p.lastTagHookup && v === top(p.tagHookups)) T && (o = o.substr(0, o.length - 1)), u.push(put_cmd, '"', clean(o), '"', ",can.view.pending({tagName:'" + v + "'," + N + "scope: " + (this.text.scope || "this") + this.text.options), T ? (u.push("}));"), o = "/>", d()) : n[w] === "<" && n[w + 1] === "/" + v ? (u.push("}));"), o = E, d()) : (u.push(",subtemplate: function(" + this.text.argNames + "){\n" + startTxt + (this.text.start || "")), o = "");
                            else if (h || !g && elements.tagToContentPropMap[m[m.length - 1]] || N) {
                                var C = ",can.view.pending({" + N + "scope: " + (this.text.scope || "this") + this.text.options + '}),"';
                                T ? a(o.substr(0, o.length - 1), C + '/>"') : a(o, C + '>"'), o = "", h = 0
                            } else o += E;
                            if (T || g) m.pop(), v = m[m.length - 1], g = !1;
                            p.attributeHookups = [];
                            break;
                        case "'":
                        case '"':
                            if (htmlTag)
                                if (quote && quote === E) {
                                    quote = null;
                                    var k = getAttrName();
                                    viewCallbacks.attr(k) && p.attributeHookups.push(k);
                                    if (b) {
                                        o += E, a(o), u.push(finishTxt, "}));\n"), o = "", b = !1;
                                        break
                                    }
                                } else if (quote === null) {
                                quote = E, beforeQuote = l, x = getAttrName();
                                if (v === "img" && x === "src" || x === "style") {
                                    a(o.replace(attrReg, "")), o = "", b = !0, u.push(insert_cmd, "can.view.txt(2,'" + getTag(v, n, w) + "'," + status() + ",this,function(){", startTxt), a(x + "=" + E);
                                    break
                                }
                            };
                        default:
                            if (l === "<") {
                                v = E.substr(0, 3) === "!--" ? "!--" : E.split(/\s/)[0];
                                var L = !1,
                                    A;
                                v.indexOf("/") === 0 && (L = !0, A = v.substr(1)), L ? (top(m) === A && (v = A, g = !0), top(p.tagHookups) === A && (a(o.substr(0, o.length - 1)), u.push(finishTxt + "}}) );"), o = "><", d())) : (v.lastIndexOf("/") === v.length - 1 && (v = v.substr(0, v.length - 1)), v !== "!--" && viewCallbacks.tag(v) && (v === "content" && elements.tagMap[top(m)] && (E = E.replace("content", elements.tagMap[top(m)])), p.tagHookups.push(v)), m.push(v))
                            }
                            o += E
                    } else switch (E) {
                        case S.right:
                        case S.returnRight:
                            switch (c) {
                                case S.left:
                                    y = bracketNum(o), y === 1 ? (u.push(insert_cmd, "can.view.txt(0,'" + getTag(v, n, w) + "'," + status() + ",this,function(){", startTxt, o), f.push({
                                        before: "",
                                        after: finishTxt + "}));\n"
                                    })) : (r = f.length && y === -1 ? f.pop() : {
                                        after: ";"
                                    }, r.before && u.push(r.before), u.push(o, ";", r.after));
                                    break;
                                case S.escapeLeft:
                                case S.returnLeft:
                                    y = bracketNum(o), y && f.push({
                                        before: finishTxt,
                                        after: "}));\n"
                                    });
                                    var O = c === S.escapeLeft ? 1 : 0,
                                        M = {
                                            insert: insert_cmd,
                                            tagName: getTag(v, n, w),
                                            status: status(),
                                            specialAttribute: b
                                        };
                                    for (var _ = 0; _ < this.helpers.length; _++) {
                                        var D = this.helpers[_];
                                        if (D.name.test(o)) {
                                            o = D.fn(o, M), D.name.source === /^>[\s]*\w*/.source && (O = 0);
                                            break
                                        }
                                    }
                                    typeof o == "object" ? o.startTxt && o.end && b ? u.push(insert_cmd, "can.view.toStr( ", o.content, "() ) );") : (o.startTxt ? u.push(insert_cmd, "can.view.txt(\n" + (typeof status() == "string" || (o.escaped != null ? o.escaped : O)) + ",\n'" + v + "',\n" + status() + ",\nthis,\n") : o.startOnlyTxt && u.push(insert_cmd, "can.view.onlytxt(this,\n"), u.push(o.content), o.end && u.push("));")) : b ? u.push(insert_cmd, o, ");") : u.push(insert_cmd, "can.view.txt(\n" + (typeof status() == "string" || O) + ",\n'" + v + "',\n" + status() + ",\nthis,\nfunction(){ " + (this.text.escape || "") + "return ", o, y ? startTxt : "}));\n"), rescan && rescan.after && rescan.after.length && (a(rescan.after.length), rescan = null)
                            }
                            c = null, o = "";
                            break;
                        case S.templateLeft:
                            o += S.left;
                            break;
                        default:
                            o += E
                    }
                    l = E
                }
                o.length && a(o), u.push(";");
                var P = u.join(""),
                    H = {
                        out: (this.text.outStart || "") + P + " " + finishTxt + (this.text.outEnd || "")
                    };
                return myEval.call(H, "this.fn = (function(" + this.text.argNames + "){" + H.out + "});\r\n//# sourceURL=" + t + ".js"), H
            }
        }, can.view.pending = function(e) {
            var t = can.view.getHooks();
            return can.view.hook(function(n) {
                can.each(t, function(e) {
                    e(n)
                }), e.templateType = "legacy", e.tagName && viewCallbacks.tagHandler(n, e.tagName, e), can.each(e && e.attrs || [], function(t) {
                    e.attributeName = t;
                    var r = viewCallbacks.attr(t);
                    r && r(n, e)
                })
            })
        }, can.view.tag("content", function(e, t) {
            return t.scope
        }), can.view.Scanner = Scanner, Scanner
    }), define("can/view/node_lists", ["can/util/library", "can/view/elements"], function(e) {
        var t = !0;
        try {
            document.createTextNode("")._ = 0
        } catch (n) {
            t = !1
        }
        var r = {},
            i = {},
            s = "ejs_" + Math.random(),
            o = 0,
            u = function(e, n) {
                var r = n || i,
                    u = a(e, r);
                return u ? u : t || e.nodeType !== 3 ? (++o, e[s] = (e.nodeName ? "element_" : "obj_") + o) : (++o, r["text_" + o] = e, "text_" + o)
            },
            a = function(e, n) {
                if (t || e.nodeType !== 3) return e[s];
                for (var r in n)
                    if (n[r] === e) return r
            },
            f = [].splice,
            l = [].push,
            c = function(e) {
                var t = 0;
                for (var n = 0, r = e.length; n < r; n++) {
                    var i = e[n];
                    i.nodeType ? t++ : t += c(i)
                }
                return t
            },
            h = function(e, t) {
                var n = {};
                for (var r = 0, i = e.length; r < i; r++) {
                    var s = p.first(e[r]);
                    n[u(s, t)] = e[r]
                }
                return n
            },
            p = {
                id: u,
                update: function(t, n) {
                    var r = p.unregisterChildren(t);
                    n = e.makeArray(n);
                    var i = t.length;
                    return f.apply(t, [0, i].concat(n)), t.replacements ? p.nestReplacements(t) : p.nestList(t), r
                },
                nestReplacements: function(e) {
                    var t = 0,
                        n = {},
                        r = h(e.replacements, n),
                        i = e.replacements.length;
                    while (t < e.length && i) {
                        var s = e[t],
                            o = r[a(s, n)];
                        o && (e.splice(t, c(o), o), i--), t++
                    }
                    e.replacements = []
                },
                nestList: function(e) {
                    var t = 0;
                    while (t < e.length) {
                        var n = e[t],
                            i = r[u(n)];
                        i ? i !== e && e.splice(t, c(i), i) : r[u(n)] = e, t++
                    }
                },
                last: function(e) {
                    var t = e[e.length - 1];
                    return t.nodeType ? t : p.last(t)
                },
                first: function(e) {
                    var t = e[0];
                    return t.nodeType ? t : p.first(t)
                },
                register: function(e, t, n) {
                    return e.unregistered = t, e.parentList = n, n === !0 ? e.replacements = [] : n ? (n.replacements.push(e), e.replacements = []) : p.nestList(e), e
                },
                unregisterChildren: function(t) {
                    var n = [];
                    return e.each(t, function(e) {
                        e.nodeType ? (t.replacements || delete r[u(e)], n.push(e)) : l.apply(n, p.unregister(e))
                    }), n
                },
                unregister: function(e) {
                    var t = p.unregisterChildren(e);
                    if (e.unregistered) {
                        var n = e.unregistered;
                        delete e.unregistered, delete e.replacements, n()
                    }
                    return t
                },
                nodeMap: r
            };
        return e.view.nodeLists = p, p
    }), define("can/view/parser", ["can/view"], function(e) {
        function t(e) {
            var t = {},
                n = e.split(",");
            for (var r = 0; r < n.length; r++) t[n[r]] = !0;
            return t
        }
        var n = "-A-Za-z0-9_",
            r = "[a-zA-Z_:][" + n + ":.]*",
            i = "\\s*=\\s*",
            s = '"((?:\\\\.|[^"])*)"',
            o = "'((?:\\\\.|[^'])*)'",
            u = "(?:" + i + "(?:" + "(?:\"[^\"]*\")|(?:'[^']*')|[^>\\s]+))?",
            a = "\\{\\{[^\\}]*\\}\\}\\}?",
            f = "\\{\\{([^\\}]*)\\}\\}\\}?",
            l = new RegExp("^<([" + n + "]+)" + "(" + "(?:\\s*" + "(?:(?:" + "(?:" + r + ")?" + u + ")|" + "(?:" + a + ")+)" + ")*" + ")\\s*(\\/?)>"),
            c = new RegExp("^<\\/([" + n + "]+)[^>]*>"),
            h = new RegExp("(?:(?:(" + r + ")|" + f + ")" + "(?:" + i + "(?:" + "(?:" + s + ")|(?:" + o + ")|([^>\\s]+)" + ")" + ")?)", "g"),
            p = new RegExp(f, "g"),
            d = /<|\{\{/,
            v = t("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed"),
            m = t("address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"),
            g = t("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"),
            y = t("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"),
            b = t("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"),
            w = t("script,style"),
            E = function(e, t) {
                function n(e, n, i, s) {
                    n = n.toLowerCase();
                    if (m[n])
                        while (a.last() && g[a.last()]) r("", a.last());
                    y[n] && a.last() === n && r("", n), s = v[n] || !!s, t.start(n, s), s || a.push(n), E.parseAttrs(i, t), t.end(n, s)
                }

                function r(e, n) {
                    var r;
                    if (!n) r = 0;
                    else
                        for (r = a.length - 1; r >= 0; r--)
                            if (a[r] === n) break;
                    if (r >= 0) {
                        for (var i = a.length - 1; i >= r; i--) t.close && t.close(a[i]);
                        a.length = r
                    }
                }

                function i(e, n) {
                    t.special && t.special(n)
                }
                var s, o, u, a = [],
                    f = e;
                a.last = function() {
                    return this[this.length - 1]
                };
                while (e) {
                    o = !0;
                    if (!a.last() || !w[a.last()]) {
                        e.indexOf("<!--") === 0 ? (s = e.indexOf("-->"), s >= 0 && (t.comment && t.comment(e.substring(4, s)), e = e.substring(s + 3), o = !1)) : e.indexOf("</") === 0 ? (u = e.match(c), u && (e = e.substring(u[0].length), u[0].replace(c, r), o = !1)) : e.indexOf("<") === 0 ? (u = e.match(l), u && (e = e.substring(u[0].length), u[0].replace(l, n), o = !1)) : e.indexOf("{{") === 0 && (u = e.match(p), u && (e = e.substring(u[0].length), u[0].replace(p, i)));
                        if (o) {
                            s = e.search(d);
                            var h = s < 0 ? e : e.substring(0, s);
                            e = s < 0 ? "" : e.substring(s), t.chars && h && t.chars(h)
                        }
                    } else e = e.replace(new RegExp("([\\s\\S]*?)</" + a.last() + "[^>]*>"), function(e, n) {
                        return n = n.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2"), t.chars && t.chars(n), ""
                    }), r("", a.last());
                    if (e === f) throw "Parse Error: " + e;
                    f = e
                }
                r(), t.done()
            };
        return E.parseAttrs = function(e, t) {
            (e != null ? e : "").replace(h, function(e, n, r, i, s, o) {
                r && t.special(r);
                if (n || i || s || o) {
                    var u = arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : arguments[5] ? arguments[5] : b[n.toLowerCase()] ? n : "";
                    t.attrStart(n || "");
                    var a = p.lastIndex = 0,
                        f = p.exec(u),
                        l;
                    while (f) l = u.substring(a, p.lastIndex - f[0].length), l.length && t.attrValue(l), t.special(f[1]), a = p.lastIndex, f = p.exec(u);
                    l = u.substr(a, u.length), l && t.attrValue(l), t.attrEnd(n || "")
                }
            })
        }, e.view.parser = E, E
    }), define("can/view/live", ["can/util/library", "can/view/elements", "can/view", "can/view/node_lists", "can/view/parser"], function(e, t, n, r, i) {
        t = t || e.view.elements, r = r || e.view.NodeLists, i = i || e.view.parser;
        var s = function(t, n, r) {
                var i = !1,
                    s = function() {
                        return i || (i = !0, r(o), e.unbind.call(t, "removed", s)), !0
                    },
                    o = {
                        teardownCheck: function(e) {
                            return e ? !1 : s()
                        }
                    };
                return e.bind.call(t, "removed", s), n(o), o
            },
            o = function(e, t, n) {
                return s(e, function() {
                    t.bind("change", n)
                }, function(e) {
                    t.unbind("change", n), e.nodeList && r.unregister(e.nodeList)
                })
            },
            u = function(e) {
                var t = {},
                    n;
                return i.parseAttrs(e, {
                    attrStart: function(e) {
                        t[e] = "", n = e
                    },
                    attrValue: function(e) {
                        t[n] += e
                    },
                    attrEnd: function() {}
                }), t
            },
            a = [].splice,
            f = function(e) {
                return e && e.nodeType
            },
            l = function(e) {
                e.childNodes.length || e.appendChild(document.createTextNode(""))
            },
            c = {
                list: function(n, i, o, u, f, l) {
                    var h = l || [n],
                        p = [],
                        d = function(n, i, s) {
                            var f = document.createDocumentFragment(),
                                c = [],
                                d = [];
                            e.each(i, function(t, n) {
                                var i = [];
                                l && r.register(i, null, !0);
                                var a = e.compute(n + s),
                                    h = o.call(u, t, a, i),
                                    p = typeof h == "string",
                                    v = e.frag(h);
                                v = p ? e.view.hookup(v) : v;
                                var m = e.makeArray(v.childNodes);
                                l ? (r.update(i, m), c.push(i)) : c.push(r.register(m)), f.appendChild(v), d.push(a)
                            });
                            var v = s + 1;
                            if (!h[v]) t.after(v === 1 ? [m] : [r.last(h[v - 1])], f);
                            else {
                                var g = r.first(h[v]);
                                e.insertBefore(g.parentNode, f, g)
                            }
                            a.apply(h, [v, 0].concat(c)), a.apply(p, [s, 0].concat(d));
                            for (var y = s + d.length, b = p.length; y < b; y++) p[y](y)
                        },
                        v = function(t, n, i, s, o) {
                            if (!s && w.teardownCheck(m.parentNode)) return;
                            var u = h.splice(i + 1, n.length),
                                a = [];
                            e.each(u, function(e) {
                                var t = r.unregister(e);
                                [].push.apply(a, t)
                            }), p.splice(i, n.length);
                            for (var f = i, l = p.length; f < l; f++) p[f](f);
                            o || e.remove(e.$(a))
                        },
                        m = document.createTextNode(""),
                        g, y = function(e) {
                            g && g.unbind && g.unbind("add", d).unbind("remove", v), v({}, {
                                length: h.length - 1
                            }, 0, !0, e)
                        },
                        b = function(e, t, n) {
                            y(), g = t || [], g.bind && g.bind("add", d).bind("remove", v), d({}, g, 0)
                        };
                    f = t.getParentNode(n, f);
                    var w = s(f, function() {
                        e.isFunction(i) && i.bind("change", b)
                    }, function() {
                        e.isFunction(i) && i.unbind("change", b), y(!0)
                    });
                    l ? (t.replace(h, m), r.update(h, [m]), l.unregistered = w.teardownCheck) : c.replace(h, m, w.teardownCheck), b({}, e.isFunction(i) ? i() : i)
                },
                html: function(n, i, s, u) {
                    var a;
                    s = t.getParentNode(n, s), a = o(s, i, function(e, t, n) {
                        var i = r.first(c).parentNode;
                        i && h(t), a.teardownCheck(r.first(c).parentNode)
                    });
                    var c = u || [n],
                        h = function(n) {
                            var i = !f(n),
                                o = e.frag(n),
                                u = e.makeArray(c);
                            l(o), i && (o = e.view.hookup(o, s)), u = r.update(c, o.childNodes), t.replace(u, o)
                        };
                    a.nodeList = c, u ? u.unregistered = a.teardownCheck : r.register(c, a.teardownCheck), h(i())
                },
                replace: function(n, i, s) {
                    var o = n.slice(0),
                        u = e.frag(i);
                    return r.register(n, s), typeof i == "string" && (u = e.view.hookup(u, n[0].parentNode)), r.update(n, u.childNodes), t.replace(o, u), n
                },
                text: function(n, i, s, u) {
                    var a = t.getParentNode(n, s),
                        f = o(a, i, function(t, n, r) {
                            typeof l.nodeValue != "unknown" && (l.nodeValue = e.view.toStr(n)), f.teardownCheck(l.parentNode)
                        }),
                        l = document.createTextNode(e.view.toStr(i()));
                    u ? (u.unregistered = f.teardownCheck, f.nodeList = u, r.update(u, [l]), t.replace([n], l)) : f.nodeList = c.replace([n], l, f.teardownCheck)
                },
                setAttributes: function(t, n) {
                    var r = u(n);
                    for (var i in r) e.attr.set(t, i, r[i])
                },
                attributes: function(n, r, i) {
                    var s = {},
                        a = function(r) {
                            var i = u(r),
                                o;
                            for (o in i) {
                                var a = i[o],
                                    f = s[o];
                                a !== f && e.attr.set(n, o, a), delete s[o]
                            }
                            for (o in s) t.removeAttr(n, o);
                            s = i
                        };
                    o(n, r, function(e, t) {
                        a(t)
                    }), arguments.length >= 3 ? s = u(i) : a(r())
                },
                attributePlaceholder: "__!!__",
                attributeReplace: /__!!__/g,
                attribute: function(n, r, i) {
                    o(n, i, function(e, i) {
                        t.setAttr(n, r, h.render())
                    });
                    var s = e.$(n),
                        u;
                    u = e.data(s, "hooks"), u || e.data(s, "hooks", u = {});
                    var a = t.getAttr(n, r),
                        f = a.split(c.attributePlaceholder),
                        l = [],
                        h;
                    l.push(f.shift(), f.join(c.attributePlaceholder)), u[r] ? u[r].computes.push(i) : u[r] = {
                        render: function() {
                            var e = 0,
                                n = a ? a.replace(c.attributeReplace, function() {
                                    return t.contentText(h.computes[e++]())
                                }) : t.contentText(h.computes[e++]());
                            return n
                        },
                        computes: [i],
                        batchNum: undefined
                    }, h = u[r], l.splice(1, 0, i()), t.setAttr(n, r, l.join(""))
                },
                specialAttribute: function(e, n, r) {
                    o(e, r, function(r, i) {
                        t.setAttr(e, n, p(i))
                    }), t.setAttr(e, n, p(r()))
                },
                simpleAttribute: function(e, n, r) {
                    o(e, r, function(r, i) {
                        t.setAttr(e, n, i)
                    }), t.setAttr(e, n, r())
                }
            };
        c.attr = c.simpleAttribute, c.attrs = c.attributes;
        var h = /(\r|\n)+/g,
            p = function(e) {
                var n = /^["'].*["']$/;
                return e = e.replace(t.attrReg, "").replace(h, ""), n.test(e) ? e.substr(1, e.length - 2) : e
            };
        return e.view.live = c, c
    }), define("can/view/render", ["can/view", "can/view/elements", "can/view/live", "can/util/string"], function(e, t, n) {
        var r = [],
            i = function(e) {
                var n = t.tagMap[e] || "span";
                return n === "span" ? "@@!!@@" : "<" + n + ">" + i(n) + "</" + n + ">"
            },
            s = function(t, n) {
                if (typeof t == "string") return t;
                if (!t && t !== 0) return "";
                var i = t.hookup && function(e, n) {
                    t.hookup.call(t, e, n)
                } || typeof t == "function" && t;
                if (i) return n ? "<" + n + " " + e.view.hook(i) + "></" + n + ">" : (r.push(i), "");
                return "" + t
            },
            o = function(t, n) {
                return typeof t == "string" || typeof t == "number" ? e.esc(t) : s(t, n)
            },
            u = !1,
            a = function() {},
            f;
        return e.extend(e.view, {
            live: n,
            setupLists: function() {
                var t = e.view.lists,
                    n;
                return e.view.lists = function(e, t) {
                        return n = {
                            list: e,
                            renderer: t
                        }, Math.random()
                    },
                    function() {
                        return e.view.lists = t, n
                    }
            },
            getHooks: function() {
                var e = r.slice(0);
                return f = e, r = [], e
            },
            onlytxt: function(e, t) {
                return o(t.call(e))
            },
            txt: function(l, c, h, p, d) {
                var v = t.tagMap[c] || "span",
                    m = !1,
                    g, y, b, w = a,
                    E;
                if (u) g = d.call(p);
                else {
                    if (typeof h == "string" || h === 1) u = !0;
                    var S = e.view.setupLists();
                    w = function() {
                        b.unbind("change", a)
                    }, b = e.compute(d, p, !1), b.bind("change", a), y = S(), g = b(), u = !1, m = b.hasDependencies
                }
                if (y) return w(), "<" + v + e.view.hook(function(e, t) {
                    n.list(e, y.list, y.renderer, p, t)
                }) + "></" + v + ">";
                if (!m || typeof g == "function") return w(), (u || l === 2 || !l ? s : o)(g, h === 0 && v);
                var x = t.tagToContentPropMap[c];
                return h === 0 && !x ? "<" + v + e.view.hook(l && typeof g != "object" ? function(e, t) {
                    n.text(e, b, t), w()
                } : function(e, t) {
                    n.html(e, b, t), w()
                }) + ">" + i(v) + "</" + v + ">" : h === 1 ? (r.push(function(e) {
                    n.attributes(e, b, b()), w()
                }), b()) : l === 2 ? (E = h, r.push(function(e) {
                    n.specialAttribute(e, E, b), w()
                }), b()) : (E = h === 0 ? x : h, (h === 0 ? f : r).push(function(e) {
                    n.attribute(e, E, b), w()
                }), n.attributePlaceholder)
            }
        }), e
    }), define("can/view/mustache", ["can/util/library", "can/view/scope", "can/view", "can/view/scanner", "can/compute", "can/view/render"], function(e) {
        e.view.ext = ".mustache";
        var t = "scope",
            n = "___h4sh",
            r = "{scope:" + t + ",options:options}",
            i = "{scope:" + t + ",options:options, special: true}",
            s = t + ",options",
            o = /((([^'"\s]+?=)?('.*?'|".*?"))|.*?)\s/g,
            u = /^(('.*?'|".*?"|[0-9]+\.?[0-9]*|true|false|null|undefined)|((.+?)=(('.*?'|".*?"|[0-9]+\.?[0-9]*|true|false)|(.+))))$/,
            a = function(e) {
                return '{get:"' + e.replace(/"/g, '\\"') + '"}'
            },
            f = function(e) {
                return e && typeof e.get == "string"
            },
            l = function(t) {
                return t instanceof e.Map || t && !!t._get
            },
            c = function(e) {
                return e && e.splice && typeof e.length == "number"
            },
            h = function(t, n, r) {
                var i = function(e, r) {
                    return t(e || n, r)
                };
                return function(t, s) {
                    return t !== undefined && !(t instanceof e.view.Scope) && (t = n.add(t)), s !== undefined && !(s instanceof e.view.Options) && (s = r.add(s)), i(t, s || r)
                }
            },
            p = function(t, n) {
                if (this.constructor !== p) {
                    var r = new p(t);
                    return function(e, t) {
                        return r.render(e, t)
                    }
                }
                if (typeof t == "function") {
                    this.template = {
                        fn: t
                    };
                    return
                }
                e.extend(this, t), this.template = this.scanner.scan(this.text, this.name)
            };
        e.Mustache = window.Mustache = p, p.prototype.render = function(t, n) {
            return t instanceof e.view.Scope || (t = new e.view.Scope(t || {})), n instanceof e.view.Options || (n = new e.view.Options(n || {})), n = n || {}, this.template.fn.call(t, t, n)
        }, e.extend(p.prototype, {
            scanner: new e.view.Scanner({
                text: {
                    start: "",
                    scope: t,
                    options: ",options: options",
                    argNames: s
                },
                tokens: [
                    ["returnLeft", "{{{", "{{[{&]"],
                    ["commentFull", "{{!}}", "^[\\s\\t]*{{!.+?}}\\n"],
                    ["commentLeft", "{{!", "(\\n[\\s\\t]*{{!|{{!)"],
                    ["escapeFull", "{{}}", "(^[\\s\\t]*{{[#/^][^}]+?}}\\n|\\n[\\s\\t]*{{[#/^][^}]+?}}\\n|\\n[\\s\\t]*{{[#/^][^}]+?}}$)", function(e) {
                        return {
                            before: /^\n.+?\n$/.test(e) ? "\n" : "",
                            content: e.match(/\{\{(.+?)\}\}/)[1] || ""
                        }
                    }],
                    ["escapeLeft", "{{"],
                    ["returnRight", "}}}"],
                    ["right", "}}"]
                ],
                helpers: [{
                    name: /^>[\s]*\w*/,
                    fn: function(t, n) {
                        var r = e.trim(t.replace(/^>\s?/, "")).replace(/["|']/g, "");
                        return "can.Mustache.renderPartial('" + r + "'," + s + ")"
                    }
                }, {
                    name: /^\s*data\s/,
                    fn: function(e, n) {
                        var r = e.match(/["|'](.*)["|']/)[1];
                        return "can.proxy(function(__){can.data(can.$(__),'" + r + "', this.attr('.')); }, " + t + ")"
                    }
                }, {
                    name: /\s*\(([\$\w]+)\)\s*->([^\n]*)/,
                    fn: function(e) {
                        var n = /\s*\(([\$\w]+)\)\s*->([^\n]*)/,
                            r = e.match(n);
                        return "can.proxy(function(__){var " + r[1] + "=can.$(__);with(" + t + ".attr('.')){" + r[2] + "}}, this);"
                    }
                }, {
                    name: /^.*$/,
                    fn: function(t, f) {
                        var l = !1,
                            c = {
                                content: "",
                                startTxt: !1,
                                startOnlyTxt: !1,
                                end: !1
                            };
                        t = e.trim(t);
                        if (t.length && (l = t.match(/^([#^/]|else$)/))) {
                            l = l[0];
                            switch (l) {
                                case "#":
                                case "^":
                                    f.specialAttribute ? c.startOnlyTxt = !0 : (c.startTxt = !0, c.escaped = 0);
                                    break;
                                case "/":
                                    return c.end = !0, c.content += 'return ___v1ew.join("");}}])', c
                            }
                            t = t.substring(1)
                        }
                        if (l !== "else") {
                            var h = [],
                                p = [],
                                d = 0,
                                v;
                            c.content += "can.Mustache.txt(\n" + (f.specialAttribute ? i : r) + ",\n" + (l ? '"' + l + '"' : "null") + ",", (e.trim(t) + " ").replace(o, function(e, t) {
                                d && (v = t.match(u)) ? v[2] ? h.push(v[0]) : p.push(v[4] + ":" + (v[6] ? v[6] : a(v[5]))) : h.push(a(t)), d++
                            }), c.content += h.join(","), p.length && (c.content += ",{" + n + ":{" + p.join(",") + "}}")
                        }
                        l && l !== "else" && (c.content += ",[\n\n");
                        switch (l) {
                            case "^":
                            case "#":
                                c.content += "{fn:function(" + s + "){var ___v1ew = [];";
                                break;
                            case "else":
                                c.content += 'return ___v1ew.join("");}},\n{inverse:function(' + s + "){\nvar ___v1ew = [];";
                                break;
                            default:
                                c.content += ")"
                        }
                        return l || (c.startTxt = !0, c.end = !0), c
                    }
                }]
            })
        });
        var d = e.view.Scanner.prototype.helpers;
        for (var v = 0; v < d.length; v++) p.prototype.scanner.helpers.unshift(d[v]);
        return p.txt = function(t, r, i) {
            var s = t.scope,
                o = t.options,
                u = [],
                a = {
                    fn: function() {},
                    inverse: function() {}
                },
                d, v = s.attr("."),
                m = !0,
                g;
            for (var y = 3; y < arguments.length; y++) {
                var b = arguments[y];
                if (r && e.isArray(b)) a = e.extend.apply(e, [a].concat(b));
                else if (b && b[n]) {
                    d = b[n];
                    for (var w in d) f(d[w]) && (d[w] = p.get(d[w].get, t, !1, !0))
                } else b && f(b) ? u.push(p.get(b.get, t, !1, !0, !0)) : u.push(b)
            }
            if (f(i)) {
                var E = i.get;
                i = p.get(i.get, t, u.length, !1), m = E === i
            }
            a.fn = h(a.fn, s, o), a.inverse = h(a.inverse, s, o);
            if (r === "^") {
                var S = a.fn;
                a.fn = a.inverse, a.inverse = S
            }
            return (g = m && typeof i == "string" && p.getHelper(i, o) || e.isFunction(i) && !i.isComputed && {
                fn: i
            }) ? (e.extend(a, {
                context: v,
                scope: s,
                contexts: s,
                hash: d
            }), u.push(a), function() {
                return g.fn.apply(v, u) || ""
            }) : function() {
                var t;
                e.isFunction(i) && i.isComputed ? t = i() : t = i;
                var n = u.length ? u : [t],
                    s = !0,
                    o = [],
                    f, h, p;
                if (r)
                    for (f = 0; f < n.length; f++) p = n[f], h = typeof p != "undefined" && l(p), c(p) ? r === "#" ? s = s && (h ? !!p.attr("length") : !!p.length) : r === "^" && (s = s && (h ? !p.attr("length") : !p.length)) : s = r === "#" ? s && !!p : r === "^" ? s && !p : s;
                if (s) {
                    if (r === "#") {
                        if (c(t)) {
                            var d = l(t);
                            for (f = 0; f < t.length; f++) o.push(a.fn(d ? t.attr("" + f) : t[f]));
                            return o.join("")
                        }
                        return a.fn(t || {}) || ""
                    }
                    return r === "^" ? a.inverse(t || {}) || "" : "" + (t != null ? t : "")
                }
                return ""
            }
        }, p.get = function(t, n, r, i, s) {
            var o = n.scope.attr("."),
                u = n.options || {};
            if (r) {
                if (p.getHelper(t, u)) return t;
                if (n.scope && e.isFunction(o[t])) return o[t]
            }
            var a = n.scope.computeData(t, {
                    isArgument: i,
                    args: [o, n.scope]
                }),
                f = a.compute;
            e.compute.temporarilyBind(f);
            var l = a.initialValue;
            return !s && (l === undefined || a.scope !== n.scope) && p.getHelper(t, u) ? t : f.hasDependencies ? f : l
        }, p.resolve = function(t) {
            return l(t) && c(t) && t.attr("length") ? t : e.isFunction(t) ? t() : t
        }, e.view.Options = e.view.Scope.extend({
            init: function(t, n) {
                !t.helpers && !t.partials && !t.tags && (t = {
                    helpers: t
                }), e.view.Scope.prototype.init.apply(this, arguments)
            }
        }), p._helpers = {}, p.registerHelper = function(e, t) {
            this._helpers[e] = {
                name: e,
                fn: t
            }
        }, p.getHelper = function(e, t) {
            var n = t.attr("helpers." + e);
            return n ? {
                fn: n
            } : this._helpers[e]
        }, p.render = function(t, n, r) {
            if (!e.view.cached[t]) {
                var i = e.__clearReading();
                n.attr("partial") && (t = n.attr("partial")), e.__setReading(i)
            }
            return e.view.render(t, n, r)
        }, p.safeString = function(e) {
            return {
                toString: function() {
                    return e
                }
            }
        }, p.renderPartial = function(t, n, r) {
            var i = r.attr("partials." + t);
            return i ? i.render ? i.render(n, r) : i(n, r) : e.Mustache.render(t, n, r)
        }, e.each({
            "if": function(t, n) {
                var r;
                return e.isFunction(t) ? r = e.compute.truthy(t)() : r = !!p.resolve(t), r ? n.fn(n.contexts || this) : n.inverse(n.contexts || this)
            },
            unless: function(t, n) {
                return p._helpers["if"].fn.apply(this, [e.isFunction(t) ? e.compute(function() {
                    return !t()
                }) : !t, n])
            },
            each: function(t, n) {
                var r = p.resolve(t),
                    i = [],
                    s, o, u;
                if (e.view.lists && (r instanceof e.List || t && t.isComputed && r === undefined)) return e.view.lists(t, function(e, t) {
                    return n.fn(n.scope.add({
                        "@index": t
                    }).add(e))
                });
                t = r;
                if (!!t && c(t)) {
                    for (u = 0; u < t.length; u++) i.push(n.fn(n.scope.add({
                        "@index": u
                    }).add(t[u])));
                    return i.join("")
                }
                if (l(t)) {
                    s = e.Map.keys(t);
                    for (u = 0; u < s.length; u++) o = s[u], i.push(n.fn(n.scope.add({
                        "@key": o
                    }).add(t[o])));
                    return i.join("")
                }
                if (t instanceof Object) {
                    for (o in t) i.push(n.fn(n.scope.add({
                        "@key": o
                    }).add(t[o])));
                    return i.join("")
                }
            },
            "with": function(e, t) {
                var n = e;
                e = p.resolve(e);
                if (!!e) return t.fn(n)
            },
            log: function(e, t) {
                typeof console != "undefined" && console.log && (t ? console.log(e, t.context) : console.log(e.context))
            },
            "@index": function(t, n) {
                n || (n = t, t = 0);
                var r = n.scope.attr("@index");
                return "" + ((e.isFunction(r) ? r() : r) + t)
            }
        }, function(e, t) {
            p.registerHelper(t, e)
        }), e.view.register({
            suffix: "mustache",
            contentType: "x-mustache-template",
            script: function(e, t) {
                return "can.Mustache(function(" + s + ") { " + (new p({
                    text: t,
                    name: e
                })).template.out + " })"
            },
            renderer: function(e, t) {
                return p({
                    text: t,
                    name: e
                })
            }
        }), e.mustache.registerHelper = e.proxy(e.Mustache.registerHelper, e.Mustache), e.mustache.safeString = e.Mustache.safeString, e
    }), define("can/observe", ["can/util/library", "can/map", "can/list", "can/compute"], function(e) {
        return e.Observe = e.Map, e.Observe.startBatch = e.batch.start, e.Observe.stopBatch = e.batch.stop, e.Observe.triggerBatch = e.batch.trigger, e
    }), define("can/view/bindings", ["can/util/library", "can/view/mustache", "can/control"], function(e) {
        var t = function() {
                var e = {
                        "": !0,
                        "true": !0,
                        "false": !1
                    },
                    t = function(t) {
                        if (!t || !t.getAttribute) return;
                        var n = t.getAttribute("contenteditable");
                        return e[n]
                    };
                return function(e) {
                    var n = t(e);
                    return typeof n == "boolean" ? n : !!t(e.parentNode)
                }
            }(),
            n = function(e) {
                return e[0] === "{" && e[e.length - 1] === "}" ? e.substr(1, e.length - 2) : e
            };
        e.view.attr("can-value", function(r, a) {
            var f = n(r.getAttribute("can-value")),
                l = a.scope.computeData(f, {
                    args: []
                }).compute,
                c, h;
            if (r.nodeName.toLowerCase() === "input") {
                r.type === "checkbox" && (e.attr.has(r, "can-true-value") ? c = r.getAttribute("can-true-value") : c = !0, e.attr.has(r, "can-false-value") ? h = r.getAttribute("can-false-value") : h = !1);
                if (r.type === "checkbox" || r.type === "radio") {
                    new s(r, {
                        value: l,
                        trueValue: c,
                        falseValue: h
                    });
                    return
                }
            }
            if (r.nodeName.toLowerCase() === "select" && r.multiple) {
                new o(r, {
                    value: l
                });
                return
            }
            if (t(r)) {
                new u(r, {
                    value: l
                });
                return
            }
            new i(r, {
                value: l
            })
        });
        var r = {
            enter: function(e, t, n) {
                return {
                    event: "keyup",
                    handler: function(e) {
                        if (e.keyCode === 13) return n.call(this, e)
                    }
                }
            }
        };
        e.view.attr(/can-[\w\.]+/, function(t, i) {
            var s = i.attributeName,
                o = s.substr("can-".length),
                u = function(r) {
                    var o = n(t.getAttribute(s)),
                        u = i.scope.read(o, {
                            returnObserveMethods: !0,
                            isArgument: !0
                        });
                    return u.value.call(u.parent, i.scope._context, e.$(this), r)
                };
            if (r[o]) {
                var a = r[o](i, t, u);
                u = a.handler, o = a.event
            }
            e.bind.call(t, o, u)
        });
        var i = e.Control.extend({
                init: function() {
                    this.element[0].nodeName.toUpperCase() === "SELECT" ? setTimeout(e.proxy(this.set, this), 1) : this.set()
                },
                "{value} change": "set",
                set: function() {
                    if (!this.element) return;
                    var e = this.options.value();
                    this.element[0].value = e == null ? "" : e
                },
                change: function() {
                    if (!this.element) return;
                    this.options.value(this.element[0].value)
                }
            }),
            s = e.Control.extend({
                init: function() {
                    this.isCheckbox = this.element[0].type.toLowerCase() === "checkbox", this.check()
                },
                "{value} change": "check",
                check: function() {
                    if (this.isCheckbox) {
                        var t = this.options.value(),
                            n = this.options.trueValue || !0;
                        this.element[0].checked = t === n
                    } else {
                        var r = this.options.value() == this.element[0].value ? "set" : "remove";
                        e.attr[r](this.element[0], "checked", !0)
                    }
                },
                change: function() {
                    this.isCheckbox ? this.options.value(this.element[0].checked ? this.options.trueValue : this.options.falseValue) : this.element[0].checked && this.options.value(this.element[0].value)
                }
            }),
            o = i.extend({
                init: function() {
                    this.delimiter = ";", this.set()
                },
                set: function() {
                    var t = this.options.value();
                    typeof t == "string" ? (t = t.split(this.delimiter), this.isString = !0) : t && (t = e.makeArray(t));
                    var n = {};
                    e.each(t, function(e) {
                        n[e] = !0
                    }), e.each(this.element[0].childNodes, function(e) {
                        e.value && (e.selected = !!n[e.value])
                    })
                },
                get: function() {
                    var t = [],
                        n = this.element[0].childNodes;
                    return e.each(n, function(e) {
                        e.selected && e.value && t.push(e.value)
                    }), t
                },
                change: function() {
                    var t = this.get(),
                        n = this.options.value();
                    this.isString || typeof n == "string" ? (this.isString = !0, this.options.value(t.join(this.delimiter))) : n instanceof e.List ? n.attr(t, !0) : this.options.value(t)
                }
            }),
            u = e.Control.extend({
                init: function() {
                    this.set(), this.on("blur", "setValue")
                },
                "{value} change": "set",
                set: function() {
                    var e = this.options.value();
                    this.element[0].innerHTML = typeof e == "undefined" ? "" : e
                },
                setValue: function() {
                    this.options.value(this.element[0].innerHTML)
                }
            })
    }), define("can/component", ["can/util/library", "can/view/callbacks", "can/control", "can/observe", "can/view/mustache", "can/view/bindings"], function(e, t) {
        var n = /^(dataViewId|class|id)$/i,
            r = /\{([^\}]+)\}/g,
            i = e.Component = e.Construct.extend({
                setup: function() {
                    e.Construct.setup.apply(this, arguments);
                    if (e.Component) {
                        var t = this,
                            n = this.prototype.scope;
                        this.Control = s.extend(this.prototype.events), !n || typeof n == "object" && !(n instanceof e.Map) ? this.Map = e.Map.extend(n || {}) : n.prototype instanceof e.Map && (this.Map = n), this.attributeScopeMappings = {}, e.each(this.Map ? this.Map.defaults : {}, function(e, n) {
                            e === "@" && (t.attributeScopeMappings[n] = n)
                        });
                        if (this.prototype.template)
                            if (typeof this.prototype.template == "function") {
                                var r = this.prototype.template;
                                this.renderer = function() {
                                    return e.view.frag(r.apply(null, arguments))
                                }
                            } else this.renderer = e.view.mustache(this.prototype.template);
                        e.view.tag(this.prototype.tag, function(e, n) {
                            new t(e, n)
                        })
                    }
                }
            }, {
                setup: function(r, i) {
                    var s = {},
                        o = this,
                        u = {},
                        a, f, l;
                    e.each(this.constructor.attributeScopeMappings, function(t, n) {
                        s[n] = r.getAttribute(e.hyphenate(t))
                    }), e.each(e.makeArray(r.attributes), function(l, c) {
                        var h = e.camelize(l.nodeName.toLowerCase()),
                            p = l.value;
                        if (o.constructor.attributeScopeMappings[h] || n.test(h) || t.attr(l.nodeName)) return;
                        if (p[0] === "{" && p[p.length - 1] === "}") p = p.substr(1, p.length - 2);
                        else if (i.templateType !== "legacy") {
                            s[h] = p;
                            return
                        }
                        var d = i.scope.computeData(p, {
                                args: []
                            }),
                            v = d.compute,
                            m = function(e, t) {
                                a = h, f.attr(h, t), a = null
                            };
                        v.bind("change", m), s[h] = v(), v.hasDependencies ? (e.bind.call(r, "removed", function() {
                            v.unbind("change", m)
                        }), u[h] = d) : v.unbind("change", m)
                    });
                    if (this.constructor.Map) f = new this.constructor.Map(s);
                    else if (this.scope instanceof e.Map) f = this.scope;
                    else if (e.isFunction(this.scope)) {
                        var c = this.scope(s, i.scope, r);
                        c instanceof e.Map ? f = c : c.prototype instanceof e.Map ? f = new c(s) : f = new(e.Map.extend(c))(s)
                    }
                    var h = {};
                    e.each(u, function(e, t) {
                        h[t] = function(n, r) {
                            a !== t && e.compute(r)
                        }, f.bind(t, h[t])
                    }), e.bind.call(r, "removed", function() {
                        e.each(h, function(e, t) {
                            f.unbind(t, h[t])
                        })
                    }), (!e.isEmptyObject(this.constructor.attributeScopeMappings) || i.templateType !== "legacy") && e.bind.call(r, "attributes", function(t) {
                        var i = e.camelize(t.attributeName);
                        !u[i] && !n.test(i) && f.attr(i, r.getAttribute(t.attributeName))
                    }), this.scope = f, e.data(e.$(r), "scope", this.scope);
                    var p = i.scope.add(this.scope),
                        d = {
                            helpers: {}
                        };
                    e.each(this.helpers || {}, function(t, n) {
                        e.isFunction(t) && (d.helpers[n] = function() {
                            return t.apply(f, arguments)
                        })
                    }), this._control = new this.constructor.Control(r, {
                        scope: this.scope
                    }), this.constructor.renderer ? (d.tags || (d.tags = {}), d.tags.content = function v(t, n) {
                        var r = i.subtemplate || n.subtemplate;
                        r && (delete d.tags.content, e.view.live.replace([t], r(n.scope, n.options)), d.tags.content = v)
                    }, l = this.constructor.renderer(p, i.options.add(d))) : i.templateType === "legacy" ? l = e.view.frag(i.subtemplate ? i.subtemplate(p, i.options.add(d)) : "") : l = i.subtemplate ? i.subtemplate(p, i.options.add(d)) : document.createDocumentFragment(), e.appendChild(r, l)
                }
            }),
            s = e.Control.extend({
                _lookup: function(e) {
                    return [e.scope, e, window]
                },
                _action: function(t, n, i) {
                    var s, o;
                    r.lastIndex = 0, s = r.test(t);
                    if (!i && s) return;
                    if (!s) return e.Control._action.apply(this, arguments);
                    o = e.compute(function() {
                        var i, s = t.replace(r, function(t, r) {
                                var s;
                                return r === "scope" ? (i = n.scope, "") : (r = r.replace(/^scope\./, ""), s = e.compute.read(n.scope, r.split("."), {
                                    isArgument: !0
                                }).value, s === undefined && (s = e.getObject(r)), typeof s == "string" ? s : (i = s, ""))
                            }),
                            o = s.split(/\s+/g),
                            u = o.pop();
                        return {
                            processor: this.processors[u] || this.processors.click,
                            parts: [s, o.join(" "), u],
                            delegate: i || undefined
                        }
                    }, this);
                    var u = function(e, n) {
                        i._bindings.control[t](i.element), i._bindings.control[t] = n.processor(n.delegate || i.element, n.parts[2], n.parts[1], t, i)
                    };
                    return o.bind("change", u), i._bindings.readyComputes[t] = {
                        compute: o,
                        handler: u
                    }, o()
                }
            }, {
                setup: function(t, n) {
                    return this.scope = n.scope, e.Control.prototype.setup.call(this, t, n)
                },
                off: function() {
                    this._bindings && e.each(this._bindings.readyComputes || {}, function(e) {
                        e.compute.unbind("change", e.handler)
                    }), e.Control.prototype.off.apply(this, arguments), this._bindings.readyComputes = {}
                }
            });
        return window.$ && $.fn && ($.fn.scope = function(e) {
            return e ? this.data("scope").attr(e) : this.data("scope")
        }), e.scope = function(t, n) {
            return t = e.$(t), n ? e.data(t, "scope").attr(n) : e.data(t, "scope")
        }, i
    }), define("can", ["can/util/library", "can/control/route", "can/model", "can/view/mustache", "can/component"], function(e) {
        return e
    }), define("text", ["module"], function(e) {
        var t, n, r, i, s, o = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"],
            u = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
            a = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
            f = typeof location != "undefined" && location.href,
            l = f && location.protocol && location.protocol.replace(/\:/, ""),
            c = f && location.hostname,
            h = f && (location.port || undefined),
            p = {},
            d = e.config && e.config() || {};
        t = {
            version: "2.0.12",
            strip: function(e) {
                if (e) {
                    e = e.replace(u, "");
                    var t = e.match(a);
                    t && (e = t[1])
                } else e = "";
                return e
            },
            jsEscape: function(e) {
                return e.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029")
            },
            createXhr: d.createXhr || function() {
                var e, t, n;
                if (typeof XMLHttpRequest != "undefined") return new XMLHttpRequest;
                if (typeof ActiveXObject != "undefined")
                    for (t = 0; t < 3; t += 1) {
                        n = o[t];
                        try {
                            e = new ActiveXObject(n)
                        } catch (r) {}
                        if (e) {
                            o = [n];
                            break
                        }
                    }
                return e
            },
            parseName: function(e) {
                var t, n, r, i = !1,
                    s = e.indexOf("."),
                    o = e.indexOf("./") === 0 || e.indexOf("../") === 0;
                return s !== -1 && (!o || s > 1) ? (t = e.substring(0, s), n = e.substring(s + 1, e.length)) : t = e, r = n || t, s = r.indexOf("!"), s !== -1 && (i = r.substring(s + 1) === "strip", r = r.substring(0, s), n ? n = r : t = r), {
                    moduleName: t,
                    ext: n,
                    strip: i
                }
            },
            xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
            useXhr: function(e, n, r, i) {
                var s, o, u, a = t.xdRegExp.exec(e);
                return a ? (s = a[2], o = a[3], o = o.split(":"), u = o[1], o = o[0], (!s || s === n) && (!o || o.toLowerCase() === r.toLowerCase()) && (!u && !o || u === i)) : !0
            },
            finishLoad: function(e, n, r, i) {
                r = n ? t.strip(r) : r, d.isBuild && (p[e] = r), i(r)
            },
            load: function(e, n, r, i) {
                if (i && i.isBuild && !i.inlineText) {
                    r();
                    return
                }
                d.isBuild = i && i.isBuild;
                var s = t.parseName(e),
                    o = s.moduleName + (s.ext ? "." + s.ext : ""),
                    u = n.toUrl(o),
                    a = d.useXhr || t.useXhr;
                if (u.indexOf("empty:") === 0) {
                    r();
                    return
                }!f || a(u, l, c, h) ? t.get(u, function(n) {
                    t.finishLoad(e, s.strip, n, r)
                }, function(e) {
                    r.error && r.error(e)
                }) : n([o], function(e) {
                    t.finishLoad(s.moduleName + "." + s.ext, s.strip, e, r)
                })
            },
            write: function(e, n, r, i) {
                if (p.hasOwnProperty(n)) {
                    var s = t.jsEscape(p[n]);
                    r.asModule(e + "!" + n, "define(function () { return '" + s + "';});\n")
                }
            },
            writeFile: function(e, n, r, i, s) {
                var o = t.parseName(n),
                    u = o.ext ? "." + o.ext : "",
                    a = o.moduleName + u,
                    f = r.toUrl(o.moduleName + u) + ".js";
                t.load(a, r, function(n) {
                    var r = function(e) {
                        return i(f, e)
                    };
                    r.asModule = function(e, t) {
                        return i.asModule(e, f, t)
                    }, t.write(e, a, r, s)
                }, s)
            }
        };
        if (d.env === "node" || !d.env && typeof process != "undefined" && process.versions && !!process.versions.node && !process.versions["node-webkit"]) n = require.nodeRequire("fs"), t.get = function(e, t, r) {
            try {
                var i = n.readFileSync(e, "utf8");
                i.indexOf("﻿") === 0 && (i = i.substring(1)), t(i)
            } catch (s) {
                r && r(s)
            }
        };
        else if (d.env === "xhr" || !d.env && t.createXhr()) t.get = function(e, n, r, i) {
            var s = t.createXhr(),
                o;
            s.open("GET", e, !0);
            if (i)
                for (o in i) i.hasOwnProperty(o) && s.setRequestHeader(o.toLowerCase(), i[o]);
            d.onXhr && d.onXhr(s, e), s.onreadystatechange = function(t) {
                var i, o;
                s.readyState === 4 && (i = s.status || 0, i > 399 && i < 600 ? (o = new Error(e + " HTTP status: " + i), o.xhr = s, r && r(o)) : n(s.responseText), d.onXhrComplete && d.onXhrComplete(s, e))
            }, s.send(null)
        };
        else if (d.env === "rhino" || !d.env && typeof Packages != "undefined" && typeof java != "undefined") t.get = function(e, t) {
            var n, r, i = "utf-8",
                s = new java.io.File(e),
                o = java.lang.System.getProperty("line.separator"),
                u = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(s), i)),
                a = "";
            try {
                n = new java.lang.StringBuffer, r = u.readLine(), r && r.length() && r.charAt(0) === 65279 && (r = r.substring(1)), r !== null && n.append(r);
                while ((r = u.readLine()) !== null) n.append(o), n.append(r);
                a = String(n.toString())
            } finally {
                u.close()
            }
            t(a)
        };
        else if (d.env === "xpconnect" || !d.env && typeof Components != "undefined" && Components.classes && Components.interfaces) r = Components.classes, i = Components.interfaces, Components.utils["import"]("resource://gre/modules/FileUtils.jsm"), s = "@mozilla.org/windows-registry-key;1" in r, t.get = function(e, t) {
            var n, o, u, a = {};
            s && (e = e.replace(/\//g, "\\")), u = new FileUtils.File(e);
            try {
                n = r["@mozilla.org/network/file-input-stream;1"].createInstance(i.nsIFileInputStream), n.init(u, 1, 0, !1), o = r["@mozilla.org/intl/converter-input-stream;1"].createInstance(i.nsIConverterInputStream), o.init(n, "utf-8", n.available(), i.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER), o.readString(n.available(), a), o.close(), n.close(), t(a.value)
            } catch (f) {
                throw new Error((u && u.path || "") + ": " + f)
            }
        };
        return t
    }), define("mtemplate", ["text"], function(e) {
        var t = {},
            n = {},
            r = "define('{pluginName}!{moduleName}', ['can/view/mustache'], function (Mustache) { var template = '{content}';  return can.mustache( template );  });\n";
        return {
            version: "0.0.1",
            load: function(r, i, s, o) {
                if (n[r]) s(n[r]);
                else {
                    var u = o.stache && o.stache.extension || "",
                        a = o.stache && o.stache.path || "";
                    e.load(a + r + u, i, function(e) {
                        o.isBuild ? (t[r] = e, s()) : (n[r] = can.mustache(e), s(n[r]))
                    }, o)
                }
            },
            write: function(n, i, s, o) {
                var u = t[i],
                    a = u && e.jsEscape(u);
                a && s.asModule(n + "!" + i, r.replace("{pluginName}", n).replace("{moduleName}", i).replace("{content}", a))
            }
        }
    }), define("mtemplate!app/sitecontainer.html", ["can/view/mustache"], function(e) {
        var t = '\n\n<div class="statusbar-overlay"></div>\n\n<div class="panel-overlay"></div>\n<div class="appmenu-overlay open"></div>\n<div class="appmenu"></div>\n\n\n<div class="views tabs toolbar-through">\n\n <div class="view view-main" >\n   <div class="navbar">\n      \n    </div>\n    <div class="pages navbar-through toolbar-through">\n      \n    </div>\n  </div>\n</div>\n\n<div class="popup" style="display: none;">\n  <div class="view ">\n   <div class="navbar">\n      \n    </div>\n    <div class="pages navbar-through toolbar-through">\n      \n    </div>  \n  </div>\n</div>\n\n';
        return can.mustache(t)
    }), define("canjs-commons/extensions", ["jquery", "can"], function(e, t) {
        t.Control.prototype.find = function(e) {
            return this.element.find(e)
        }, t.Model.List.prototype.findById = function(e) {
            return this.filter(function(t) {
                return t.id == e
            })[0]
        }, t.Model.List.prototype.sort = function(e) {
            return [].sort.apply(this, [e]), this
        }, t.Model.List.prototype.remove = function(e) {
            var t = this.indexOf(e);
            if (t == -1) return;
            this.splice(t, 1)
        }, t.Model.List.prototype.grep = function(t, n) {
            return new this.constructor(e.grep(this, t, n))
        }, e.fn.model = function(e) {
            return e ? (this.data("model", e), this.addClass(e.constructor._shortName), this.addClass(e.constructor._shortName + "_" + e.id), this) : this.data("model")
        }, e.Event.prototype.stop = function() {
            this.stopPropagation(), this.preventDefault()
        }
    }), define("can/map/delegate", ["can/util/library", "can/map"], function(e) {
        var t = function(e, t) {
                var n = e.length,
                    r = 0,
                    i = [],
                    s;
                for (r; r < n; r++) {
                    s = t[r];
                    if (typeof s != "string") return null;
                    if (e[r] === "**") return t.join(".");
                    if (e[r] === "*") i.push(s);
                    else {
                        if (s !== e[r]) return null;
                        i.push(s)
                    }
                }
                return i.join(".")
            },
            n = function(n, r, i, s, o) {
                var u = r.split("."),
                    a = (this._observe_delegates || []).slice(0),
                    f, l, c, h, p;
                n.attr = r, n.lastAttr = u[u.length - 1];
                for (var d = 0; f = a[d++];) {
                    if (n.batchNum && f.batchNum === n.batchNum || f.undelegated) continue;
                    h = undefined, p = !0;
                    for (var v = 0; v < f.attrs.length; v++) l = f.attrs[v], c = t(l.parts, u), c && (h = c), l.value && p ? p = l.value === "" + this.attr(l.attr) : p && f.attrs.length > 1 && (p = this.attr(l.attr) !== undefined);
                    if (h && p) {
                        var m = r.replace(h + ".", "");
                        n.batchNum && (f.batchNum = n.batchNum), f.event === "change" ? (r = m, n.curAttr = h, f.callback.apply(this.attr(h), e.makeArray(arguments))) : f.event === i ? f.callback.apply(this.attr(h), [n, s, o, m]) : f.event === "set" && i === "add" && f.callback.apply(this.attr(h), [n, s, o, m])
                    }
                }
            };
        return e.extend(e.Map.prototype, {
            delegate: function(t, r, i) {
                t = e.trim(t);
                var s = this._observe_delegates || (this._observe_delegates = []),
                    o = [],
                    u = /([^\s=,]+)(?:=("[^",]*"|'[^',]*'|[^\s"',]*))?(,?)\s*/g,
                    a;
                while ((a = u.exec(t)) !== null) a[2] && e.inArray(a[2].substr(0, 1), ['"', "'"]) >= 0 && (a[2] = a[2].substr(1, -1)), o.push({
                    attr: a[1],
                    parts: a[1].split("."),
                    value: a[2],
                    or: a[3] === ","
                });
                return s.push({
                    selector: t,
                    attrs: o,
                    callback: i,
                    event: r
                }), s.length === 1 && this.bind("change", n), this
            },
            undelegate: function(t, r, i) {
                t = t && e.trim(t);
                var s = 0,
                    o = this._observe_delegates || [],
                    u;
                if (t)
                    while (s < o.length) u = o[s], u.callback === i || !i && u.selector === t ? (u.undelegated = !0, o.splice(s, 1)) : s++;
                else o = [];
                return o.length || this.unbind("change", n), this
            }
        }), e.Map.prototype.delegate.matches = t, e.Map
    }), define("can/construct/super", ["can/util/library", "can/construct"], function(e, t) {
        var n = e.isFunction,
            r = /xyz/.test(function() {
                return this.xyz
            }) ? /\b_super\b/ : /.*/;
        return e.Construct._overwrite = function(e, t, i, s) {
            e[i] = n(s) && n(t[i]) && r.test(s) ? function(e, n) {
                return function() {
                    var r = this._super,
                        i;
                    return this._super = t[e], i = n.apply(this, arguments), this._super = r, i
                }
            }(i, s) : s
        }, e.Construct._inherit = function(t, n, r) {
            r = r || t;
            for (var i in t) e.Construct._overwrite(r, n, i, t[i])
        }, e
    }), define("can/construct/proxy", ["can/util/library", "can/construct"], function(e, t) {
        var n = e.isFunction,
            r = e.isArray,
            i = e.makeArray,
            s = function(e) {
                var t = i(arguments),
                    n;
                return e = t.shift(), r(e) || (e = [e]), n = this,
                    function() {
                        var o = t.concat(i(arguments)),
                            u, a = e.length,
                            f = 0,
                            l;
                        for (; f < a; f++) {
                            l = e[f];
                            if (!l) continue;
                            u = typeof l == "string", o = (u ? n[l] : l).apply(n, o || []), f < a - 1 && (o = !r(o) || o._use_call ? [o] : o)
                        }
                        return o
                    }
            };
        e.Construct.proxy = e.Construct.prototype.proxy = s;
        var o = [e.Map, e.Control, e.Model],
            u = 0;
        for (; u < o.length; u++) o[u] && (o[u].proxy = s);
        return e
    }), define("can/control/plugin", ["jquery", "can/util/library", "can/control"], function(e, t) {
        var n, r = function(e, t) {
                var r = e.constructor.pluginName || e.constructor._shortName;
                for (n = 0; n < t.length; n++)
                    if (typeof t[n] == "string" ? r === t[n] : e instanceof t[n]) return !0;
                return !1
            },
            i = t.makeArray,
            s = t.Control.setup;
        return t.Control.setup = function() {
            if (this !== t.Control) {
                var e = this.pluginName || this._fullName;
                e !== "can_control" && this.plugin(e), s.apply(this, arguments)
            }
        }, e.fn.extend({
            controls: function() {
                var e = i(arguments),
                    n = [],
                    s, o;
                return this.each(function() {
                    s = t.$(this).data("controls");
                    if (!s) return;
                    for (var i = 0; i < s.length; i++) o = s[i], (!e.length || r(o, e)) && n.push(o)
                }), n
            },
            control: function(e) {
                return this.controls.apply(this, arguments)[0]
            }
        }), t.Control.plugin = function(n) {
            var r = this;
            e.fn[n] || (e.fn[n] = function(n) {
                var s = i(arguments),
                    o = typeof n == "string" && e.isFunction(r.prototype[n]),
                    u = s[0],
                    a;
                return this.each(function() {
                    var e = t.$(this).control(r);
                    e ? o ? a = e[u].apply(e, s.slice(1)) : e.update.apply(e, s) : r.newInstance.apply(r, [this].concat(s))
                }), a !== undefined ? a : this
            })
        }, t.Control.prototype.update = function(e) {
            t.extend(this.options, e), this.on()
        }, t
    }), define("can/util/object", ["can/util/library"], function(e) {
        var t = e.isArray;
        e.Object = {};
        var n = e.Object.same = function(i, s, o, u, a, f) {
            var l = typeof i,
                c = t(i),
                h = typeof o,
                p;
            if (h === "string" || o === null) o = r[o], h = "function";
            if (h === "function") return o(i, s, u, a);
            o = o || {};
            if (i === null || s === null) return i === s;
            if (i instanceof Date || s instanceof Date) return i === s;
            if (f === -1) return l === "object" || i === s;
            if (l !== typeof s || c !== t(s)) return !1;
            if (i === s) return !0;
            if (c) {
                if (i.length !== s.length) return !1;
                for (var d = 0; d < i.length; d++) {
                    p = o[d] === undefined ? o["*"] : o[d];
                    if (!n(i[d], s[d], i, s, p)) return !1
                }
                return !0
            }
            if (l === "object" || l === "function") {
                var v = e.extend({}, s);
                for (var m in i) {
                    p = o[m] === undefined ? o["*"] : o[m];
                    if (!n(i[m], s[m], p, i, s, f === !1 ? -1 : undefined)) return !1;
                    delete v[m]
                }
                for (m in v)
                    if (o[m] === undefined || !n(undefined, s[m], o[m], i, s, f === !1 ? -1 : undefined)) return !1;
                return !0
            }
            return !1
        };
        e.Object.subsets = function(t, n, r) {
            var i = n.length,
                s = [];
            for (var o = 0; o < i; o++) {
                var u = n[o];
                e.Object.subset(t, u, r) && s.push(u)
            }
            return s
        }, e.Object.subset = function(e, t, r) {
            r = r || {};
            for (var i in t)
                if (!n(e[i], t[i], r[i], e, t)) return !1;
            return !0
        };
        var r = {
            "null": function() {
                return !0
            },
            i: function(e, t) {
                return ("" + e).toLowerCase() === ("" + t).toLowerCase()
            },
            eq: function(e, t) {
                return e === t
            },
            similar: function(e, t) {
                return e == t
            }
        };
        return r.eqeq = r.similar, e.Object
    }), define("can/map/backup", ["can/util/library", "can/map", "can/util/object"], function(e) {
        var t = function(e, t) {
            var n = {};
            for (var r in e) typeof e[r] != "object" || e[r] === null || e[r] instanceof Date ? n[r] = e[r] : n[r] = t.attr(r);
            return n
        };
        return e.extend(e.Map.prototype, {
            backup: function() {
                return this._backupStore = this._attrs(), this
            },
            isDirty: function(t) {
                return this._backupStore && !e.Object.same(this._attrs(), this._backupStore, undefined, undefined, undefined, !!t)
            },
            restore: function(e) {
                var n = e ? this._backupStore : t(this._backupStore, this);
                return this.isDirty(e) && this._attrs(n, !0), this
            }
        }), e.Map
    }), define("can/map/define", ["can/util/library", "can/observe"], function(e) {
        e.Map.helpers.define = function(e) {
            var t = e.prototype.define;
            e.defaultGenerators = {};
            for (var n in t) "value" in t[n] && (typeof t[n].value == "function" ? e.defaultGenerators[n] = t[n].value : e.defaults[n] = t[n].value), typeof t[n].Value == "function" && function(t) {
                e.defaultGenerators[n] = function() {
                    return new t
                }
            }(t[n].Value)
        };
        var t = e.Map.prototype._setupDefaults;
        e.Map.prototype._setupDefaults = function() {
            var e = t.call(this),
                n = this.constructor;
            for (var r in n.defaultGenerators) e[r] = n.defaultGenerators[r].call(this);
            return e
        };
        var n = e.Map.prototype,
            r = n.__set;
        n.__set = function(t, n, i, s, o) {
            var u = function(n) {
                    var r = o && o.call(a, n);
                    return r !== !1 && e.trigger(a, "error", [t, n], !0), !1
                },
                a = this,
                f = this.define && this.define[t],
                l = f && f.set,
                c = f && f.get;
            if (l) {
                e.batch.start();
                var h = !1,
                    p = l.call(this, n, function(e) {
                        r.call(a, t, e, i, s, u), h = !0
                    }, u);
                if (c) {
                    e.batch.stop();
                    return
                }
                if (p === undefined && !h && l.length >= 2) {
                    e.batch.stop();
                    return
                }
                return h || r.call(a, t, l.length === 0 && p === undefined ? n : p, i, s, u), e.batch.stop(), this
            }
            return r.call(a, t, n, i, s, u), this
        };
        var i = {
                date: function(e) {
                    var t = typeof e;
                    return t === "string" ? (e = Date.parse(e), isNaN(e) ? null : new Date(e)) : t === "number" ? new Date(e) : e
                },
                number: function(e) {
                    return +e
                },
                "boolean": function(e) {
                    return e === "false" || e === "0" || !e ? !1 : !0
                },
                "*": function(e) {
                    return e
                },
                string: function(e) {
                    return "" + e
                }
            },
            s = n.__type;
        n.__type = function(e, t) {
            var n = this.define && this.define[t],
                r = n && n.type,
                o = n && n.Type,
                u = e;
            return typeof r == "string" && (r = i[r]), r || o ? (r && (u = r.call(this, u, t)), o && !(u instanceof o) && (u = new o(u)), u) : s.call(this, u, t)
        };
        var o = n._remove;
        n._remove = function(t, n) {
            var r = this.define && this.define[t] && this.define[t].remove,
                i;
            if (r) {
                e.batch.start(), i = r.call(this, n);
                if (i === !1) {
                    e.batch.stop();
                    return
                }
                return i = o.call(this, t, n), e.batch.stop(), i
            }
            return o.call(this, t, n)
        };
        var u = n._setupComputes;
        n._setupComputes = function(t) {
            u.apply(this, arguments);
            for (var n in this.define) {
                var r = this.define[n],
                    i = r.get;
                i && (this[n] = e.compute.async(t[n], i, this), this._computedBindings[n] = {
                    count: 0
                })
            }
        };
        var a = e.Map.helpers._serialize;
        e.Map.helpers._serialize = function(e, t, n) {
            return f(e, t, n)
        };
        var f = function(e, t, n) {
                var r = e.define && e.define[t] && e.define[t].serialize;
                if (r === undefined) return a.apply(this, arguments);
                if (r !== !1) return typeof r == "function" ? r.call(e, n, t) : a.apply(this, arguments)
            },
            l = n.serialize;
        return n.serialize = function(e) {
            var t = l.apply(this, arguments);
            if (e) return t;
            var n, r;
            for (var i in this.define) i in t || (n = this.define && this.define[i] && this.define[i].serialize, n && (r = f(this, i, this.attr(i)), r !== undefined && (t[i] = r)));
            return t
        }, e.Map
    }), define("can/map/validations", ["can/util/library", "can/map"], function(e) {
        var t = function(t, n, r) {
                r || (r = n, n = {}), n = n || {}, t = typeof t == "string" ? [t] : e.makeArray(t);
                if (n.testIf && !n.testIf.call(this)) return;
                var i = this;
                e.each(t, function(e) {
                    i.validations[e] || (i.validations[e] = []), i.validations[e].push(function(t) {
                        var i = r.call(this, t, e);
                        return i === undefined ? undefined : n.message || i
                    })
                })
            },
            n = e.Map.prototype.__set;
        return e.Map.prototype.__set = function(t, r, i, s, o) {
            var u = this,
                a = u.constructor.validations,
                f = function(n) {
                    var r = o && o.call(u, n);
                    return r !== !1 && e.trigger(u, "error", [t, n], !0), !1
                };
            n.call(u, t, r, i, s, f);
            if (a && a[t]) {
                var l = u.errors(t);
                l && f(l)
            }
            return this
        }, e.each([e.Map, e.Model], function(n) {
            if (n === undefined) return;
            var r = n.setup;
            e.extend(n, {
                setup: function(e) {
                    r.apply(this, arguments);
                    if (!this.validations || e.validations === this.validations) this.validations = {}
                },
                validate: t,
                validationMessages: {
                    format: "is invalid",
                    inclusion: "is not a valid option (perhaps out of range)",
                    lengthShort: "is too short",
                    lengthLong: "is too long",
                    presence: "can't be empty",
                    range: "is out of range",
                    numericality: "must be a number"
                },
                validateFormatOf: function(e, n, r) {
                    t.call(this, e, r, function(e) {
                        if (typeof e != "undefined" && e !== null && e !== "" && String(e).match(n) === null) return this.constructor.validationMessages.format
                    })
                },
                validateInclusionOf: function(e, n, r) {
                    t.call(this, e, r, function(e) {
                        if (typeof e == "undefined") return;
                        for (var t = 0; t < n.length; t++)
                            if (n[t] === e) return;
                        return this.constructor.validationMessages.inclusion
                    })
                },
                validateLengthOf: function(e, n, r, i) {
                    t.call(this, e, i, function(e) {
                        if ((typeof e == "undefined" || e === null) && n > 0 || typeof e != "undefined" && e !== null && e.length < n) return this.constructor.validationMessages.lengthShort + " (min=" + n + ")";
                        if (typeof e != "undefined" && e !== null && e.length > r) return this.constructor.validationMessages.lengthLong + " (max=" + r + ")"
                    })
                },
                validatePresenceOf: function(e, n) {
                    t.call(this, e, n, function(e) {
                        if (typeof e == "undefined" || e === "" || e === null) return this.constructor.validationMessages.presence
                    })
                },
                validateRangeOf: function(e, n, r, i) {
                    t.call(this, e, i, function(e) {
                        if ((typeof e == "undefined" || e === null) && n > 0 || typeof e != "undefined" && e !== null && (e < n || e > r)) return this.constructor.validationMessages.range + " [" + n + "," + r + "]"
                    })
                },
                validatesNumericalityOf: function(e) {
                    t.call(this, e, function(e) {
                        var t = !isNaN(parseFloat(e)) && isFinite(e);
                        if (!t) return this.constructor.validationMessages.numericality
                    })
                }
            })
        }), e.extend(e.Map.prototype, {
            errors: function(t, n) {
                t && (t = e.isArray(t) ? t : [t]);
                var r = {},
                    i = this,
                    s = function(t, s) {
                        e.each(s, function(e) {
                            var s = e.call(i, u ? i.__convert ? i.__convert(t, n) : n : i.attr(t));
                            s && (r[t] || (r[t] = []), r[t].push(s))
                        })
                    },
                    o = this.constructor.validations,
                    u = t && t.length === 1 && arguments.length === 2;
                return e.each(t || o || {}, function(e, t) {
                    typeof t == "number" && (t = e, e = o[t]), s(t, e || [])
                }), e.isEmptyObject(r) ? null : u ? r[t[0]] : r
            }
        }), e.Map
    }),
    function() {
        window.Framework7 = function(t) {
            function u(e) {
                var t = e.replace(/^./, function(e) {
                    return e.toUpperCase()
                });
                n["onPage" + t] = function(t, r) {
                    return n.onPage(e, t, r)
                }
            }

            function c() {
                var e = this,
                    t = e.scrollTop,
                    n = e.scrollHeight,
                    r = e.offsetHeight,
                    s = e.getAttribute("data-distance");
                s || (s = 50), typeof s == "string" && s.indexOf("%") >= 0 && (s = parseInt(s, 10) / 100 * r), s > r && (s = r), t + r >= n - s && i(e).trigger("infinite")
            }

            function h() {
                n.device.ipad && (document.body.scrollLeft = 0, setTimeout(function() {
                    document.body.scrollLeft = 0
                }, 0))
            }
            var n = this;
            n.version = "0.9.6", n.params = {
                cache: !0,
                cacheIgnore: [],
                cacheIgnoreGetParameters: !1,
                cacheDuration: 6e5,
                preloadPreviousPage: !0,
                uniqueHistory: !1,
                uniqueHistoryIgnoreGetParameters: !1,
                dynamicPageUrl: "content-{{index}}",
                router: !0,
                pushState: !1,
                pushStateRoot: undefined,
                pushStateNoAnimation: !1,
                pushStateSeparator: "#!/",
                fastClicks: !0,
                fastClicksDistanceThreshold: 0,
                activeState: !0,
                activeStateElements: "a, button, label, span",
                animateNavBackIcon: !1,
                swipeBackPage: !0,
                swipeBackPageThreshold: 0,
                swipeBackPageActiveArea: 30,
                swipeBackPageBoxShadow: !0,
                ajaxLinks: undefined,
                externalLinks: ["external"],
                sortable: !0,
                hideNavbarOnPageScroll: !1,
                hideToolbarOnPageScroll: !1,
                showBarsOnPageScrollEnd: !0,
                swipeout: !0,
                swipeoutNoFollow: !1,
                smartSelectBackTemplate: '<div class="left sliding"><a href="#" class="back link"><i class="icon icon-back"></i><span>{{backText}}</span></a></div>',
                smartSelectBackText: "Voltar",
                smartSelectInPopup: !1,
                smartSelectPopupCloseTemplate: '<div class="left"><a href="#" class="link close-popup"><i class="icon icon-back"></i><span>{{closeText}}</span></a></div>',
                smartSelectPopupCloseText: "Fechar",
                smartSelectSearchbar: !1,
                smartSelectBackOnSelect: !1,
                searchbarHideDividers: !0,
                searchbarHideGroups: !0,
                swipePanel: !1,
                swipePanelActiveArea: 0,
                swipePanelCloseOpposite: !0,
                swipePanelNoFollow: !1,
                swipePanelThreshold: 0,
                panelsCloseByOutside: !0,
                modalButtonOk: "OK",
                modalButtonCancel: "Cancel",
                modalUsernamePlaceholder: "Username",
                modalPasswordPlaceholder: "Password",
                modalTitle: "Framework7",
                modalCloseByOutside: !1,
                actionsCloseByOutside: !0,
                popupCloseByOutside: !0,
                modalPreloaderTitle: "Loading... ",
                viewClass: "view",
                viewMainClass: "view-main",
                viewsClass: "views",
                notificationCloseOnClick: !1,
                notificationCloseIcon: !0,
                animatePages: !0,
                templates: {},
                templatesData: {},
                template7Pages: !1,
                precompileTemplates: !1,
                init: !0
            };
            for (var r in t) n.params[r] = t[r];
            var i = e,
                s = Template7;
            n._compiledTemplates = {}, n.touchEvents = {
                start: n.support.touch ? "touchstart" : "mousedown",
                move: n.support.touch ? "touchmove" : "mousemove",
                end: n.support.touch ? "touchend" : "mouseup"
            }, n.ls = localStorage, n.rtl = i("body").css("direction") === "rtl", n.rtl && i("html").attr("dir", "rtl"), typeof n.params.statusbarOverlay != "undefined" && (n.params.statusbarOverlay ? i("html").addClass("with-statusbar-overlay") : i("html").removeClass("with-statusbar-overlay")), n.views = [];
            var o = function(e, t) {
                var r = {
                        dynamicNavbar: !1,
                        domCache: !1,
                        linksView: undefined,
                        uniqueHistory: n.params.uniqueHistory,
                        uniqueHistoryIgnoreGetParameters: n.params.uniqueHistoryIgnoreGetParameters,
                        swipeBackPage: n.params.swipeBackPage,
                        swipeBackPageBoxShadow: n.params.swipeBackPageBoxShadow,
                        swipeBackPageActiveArea: n.params.swipeBackPageActiveArea,
                        swipeBackPageThreshold: n.params.swipeBackPageThreshold,
                        animatePages: n.params.animatePages,
                        preloadPreviousPage: n.params.preloadPreviousPage
                    },
                    s;
                t = t || {};
                for (var o in r) typeof t[o] == "undefined" && (t[o] = r[o]);
                var u = this;
                u.params = t, u.selector = e;
                var a = i(e);
                u.container = a[0], u.contentCache = {}, u.pagesCache = {}, a[0].f7View = u, u.pagesContainer = a.find(".pages")[0], u.initialPages = [], u.initialNavbars = [];
                if (u.params.domCache) {
                    var f = a.find(".page");
                    for (s = 0; s < f.length; s++) u.initialPages.push(f[s]);
                    if (u.params.dynamicNavbar) {
                        var l = a.find(".navbar-inner");
                        for (s = 0; s < l.length; s++) u.initialNavbars.push(l[s])
                    }
                }
                u.allowPageChange = !0;
                var c = document.location.href;
                u.history = [];
                var h = c,
                    p = n.params.pushStateSeparator,
                    d = n.params.pushStateRoot;
                n.params.pushState && (d ? h = d : h.indexOf(p) >= 0 && h.indexOf(p + "#") < 0 && (h = h.split(p)[0]));
                var v, m;
                u.activePage || (v = i(u.pagesContainer).find(".page-on-center"), v.length === 0 && (v = i(u.pagesContainer).find(".page:not(.cached)"), v = v.eq(v.length - 1)), v.length > 0 && (m = v[0].f7PageData)), u.params.domCache && v ? (u.url = a.attr("data-url") || u.params.url || "#" + v.attr("data-page"), u.pagesCache[u.url] = v.attr("data-page")) : u.url = a.attr("data-url") || u.params.url || h, m && (m.view = u, m.url = u.url, u.activePage = m, v[0].f7PageData = m), u.url && u.history.push(u.url), u.main = a.hasClass(n.params.viewMainClass);
                var g = !1,
                    y = !1,
                    b = {},
                    w, E = [],
                    S = [],
                    x, T, N = !0,
                    C, k = [],
                    L = [],
                    A, O, M, _, D, P;
                u.handleTouchStart = function(e) {
                    if (!N || !u.params.swipeBackPage || g || n.swipeoutOpenedEl) return;
                    y = !1, g = !0, w = undefined, b.x = e.type === "touchstart" ? e.targetTouches[0].pageX : e.pageX, b.y = e.type === "touchstart" ? e.targetTouches[0].pageY : e.pageY, C = (new Date).getTime(), D = u.params.dynamicNavbar && a.find(".navbar-inner").length > 1
                }, u.handleTouchMove = function(e) {
                    if (!g) return;
                    var t = e.type === "touchmove" ? e.targetTouches[0].pageX : e.pageX,
                        r = e.type === "touchmove" ? e.targetTouches[0].pageY : e.pageY;
                    typeof w == "undefined" && (w = !!(w || Math.abs(r - b.y) > Math.abs(t - b.x)));
                    if (w || e.f7PreventSwipeBack || n.preventSwipeBack) {
                        g = !1;
                        return
                    }
                    if (!y) {
                        var s = !1;
                        x = a.width();
                        var o = i(e.target),
                            f = o.hasClass("swipeout") ? o : o.parents(".swipeout");
                        f.length > 0 && (!n.rtl && f.find(".swipeout-actions-left").length > 0 && (s = !0), n.rtl && f.find(".swipeout-actions-right").length > 0 && (s = !0)), E = o.is(".page") ? o : o.parents(".page"), E.hasClass("no-swipeback") && (s = !0), S = a.find(".page-on-left:not(.cached)");
                        var l = b.x - a.offset().left > u.params.swipeBackPageActiveArea;
                        n.rtl ? l = b.x < a.offset().left - a[0].scrollLeft + x - u.params.swipeBackPageActiveArea : l = b.x - a.offset().left > u.params.swipeBackPageActiveArea, l && (s = !0);
                        if (S.length === 0 || E.length === 0) s = !0;
                        if (s) {
                            g = !1;
                            return
                        }
                        D && (k = a.find(".navbar-on-center:not(.cached)"), L = a.find(".navbar-on-left:not(.cached)"), A = k.find(".left, .center, .right"), O = L.find(".left, .center, .right"), n.params.animateNavBackIcon && (M = k.find(".left.sliding .back .icon"), _ = L.find(".left.sliding .back .icon")))
                    }
                    e.f7PreventPanelSwipe = !0, y = !0, e.preventDefault();
                    var c = n.rtl ? -1 : 1;
                    T = (t - b.x - u.params.swipeBackPageThreshold) * c, T < 0 && (T = 0);
                    var h = T / x,
                        p = {
                            percentage: h,
                            activePage: E[0],
                            previousPage: S[0],
                            activeNavbar: k[0],
                            previousNavbar: L[0]
                        };
                    u.params.onSwipeBackMove && u.params.onSwipeBackMove(p), a.trigger("swipebackmove", p);
                    var d = T * c,
                        v = (T / 5 - x / 5) * c;
                    n.device.pixelRatio === 1 && (d = Math.round(d), v = Math.round(v)), E.transform("translate3d(" + d + "px,0,0)"), u.params.swipeBackPageBoxShadow && n.device.os !== "android" && (E[0].style.boxShadow = "0px 0px 12px rgba(0,0,0," + (.5 - .5 * h) + ")"), S.transform("translate3d(" + v + "px,0,0)"), S[0].style.opacity = .9 + .1 * h;
                    if (D) {
                        var m;
                        for (m = 0; m < A.length; m++) {
                            P = i(A[m]), P[0].style.opacity = 1 - h * 1.3;
                            if (P[0].className.indexOf("sliding") >= 0) {
                                var N = h * P[0].f7NavbarRightOffset;
                                n.device.pixelRatio === 1 && (N = Math.round(N)), P.transform("translate3d(" + N + "px,0,0)"), n.params.animateNavBackIcon && P[0].className.indexOf("left") >= 0 && M.length > 0 && M.transform("translate3d(" + -N + "px,0,0)")
                            }
                        }
                        for (m = 0; m < O.length; m++) {
                            P = i(O[m]), P[0].style.opacity = h * 1.3 - .3;
                            if (P[0].className.indexOf("sliding") >= 0) {
                                var C = P[0].f7NavbarLeftOffset * (1 - h);
                                n.device.pixelRatio === 1 && (C = Math.round(C)), P.transform("translate3d(" + C + "px,0,0)"), n.params.animateNavBackIcon && P[0].className.indexOf("left") >= 0 && _.length > 0 && _.transform("translate3d(" + -C + "px,0,0)")
                            }
                        }
                    }
                }, u.handleTouchEnd = function(e) {
                    if (!g || !y) {
                        g = !1, y = !1;
                        return
                    }
                    g = !1, y = !1;
                    if (T === 0) {
                        i([E[0], S[0]]).transform("").css({
                            opacity: "",
                            boxShadow: ""
                        }), D && (A.transform("").css({
                            opacity: ""
                        }), O.transform("").css({
                            opacity: ""
                        }), M && M.length > 0 && M.transform(""), _ && M.length > 0 && _.transform(""));
                        return
                    }
                    var t = (new Date).getTime() - C,
                        r = !1;
                    if (t < 300 && T > 10 || t >= 300 && T > x / 2) E.removeClass("page-on-center").addClass("page-on-right"), S.removeClass("page-on-left").addClass("page-on-center"), D && (k.removeClass("navbar-on-center").addClass("navbar-on-right"), L.removeClass("navbar-on-left").addClass("navbar-on-center")), r = !0;
                    i([E[0], S[0]]).transform("").css({
                        opacity: "",
                        boxShadow: ""
                    }).addClass("page-transitioning"), D && (A.css({
                        opacity: ""
                    }).each(function() {
                        var e = r ? this.f7NavbarRightOffset : 0,
                            t = i(this);
                        t.transform("translate3d(" + e + "px,0,0)"), n.params.animateNavBackIcon && t.hasClass("left") && M.length > 0 && M.addClass("page-transitioning").transform("translate3d(" + -e + "px,0,0)")
                    }).addClass("page-transitioning"), O.transform("").css({
                        opacity: ""
                    }).each(function() {
                        var e = r ? 0 : this.f7NavbarLeftOffset,
                            t = i(this);
                        t.transform("translate3d(" + e + "px,0,0)"), n.params.animateNavBackIcon && t.hasClass("left") && _.length > 0 && _.addClass("page-transitioning").transform("translate3d(" + -e + "px,0,0)")
                    }).addClass("page-transitioning")), N = !1, u.allowPageChange = !1;
                    if (r) {
                        var s = u.history[u.history.length - 2];
                        u.url = s, n.pageBackCallbacks("before", u, {
                            pageContainer: E[0],
                            url: s,
                            position: "center",
                            newPage: S,
                            oldPage: E,
                            swipeBack: !0
                        }), n.pageAnimCallbacks("before", u, {
                            pageContainer: S[0],
                            url: s,
                            position: "left",
                            newPage: S,
                            oldPage: E,
                            swipeBack: !0
                        })
                    }
                    E.transitionEnd(function() {
                        i([E[0], S[0]]).removeClass("page-transitioning"), D && (A.removeClass("page-transitioning").css({
                            opacity: ""
                        }), O.removeClass("page-transitioning").css({
                            opacity: ""
                        }), M && M.length > 0 && M.removeClass("page-transitioning"), _ && _.length > 0 && _.removeClass("page-transitioning")), N = !0, u.allowPageChange = !0, r && (n.params.pushState && history.back(), n.pageBackCallbacks("after", u, {
                            pageContainer: E[0],
                            url: s,
                            position: "center",
                            newPage: S,
                            oldPage: E,
                            swipeBack: !0
                        }), n.pageAnimCallbacks("after", u, {
                            pageContainer: S[0],
                            url: s,
                            position: "left",
                            newPage: S,
                            oldPage: E,
                            swipeBack: !0
                        }), n.router.afterBack(u, E, S))
                    })
                }, u.attachEvents = function(e) {
                    var t = e ? "off" : "on";
                    a[t](n.touchEvents.start, u.handleTouchStart), a[t](n.touchEvents.move, u.handleTouchMove), a[t](n.touchEvents.end, u.handleTouchEnd)
                }, u.detachEvents = function() {
                    u.attachEvents(!0)
                }, u.params.swipeBackPage && u.attachEvents(), n.views.push(u), u.main && (n.mainView = u), u.router = {
                    load: function(e) {
                        return n.router.load(u, e)
                    },
                    back: function(e) {
                        return n.router.back(u, e)
                    },
                    loadPage: function(e) {
                        e = e || {};
                        if (typeof e == "string") {
                            var t = e;
                            e = {}, t && t.indexOf("#") === 0 && u.params.domCache ? e.pageName = t.split("#")[1] : e.url = t
                        }
                        return n.router.load(u, e)
                    },
                    loadContent: function(e) {
                        return n.router.load(u, {
                            content: e
                        })
                    },
                    reloadPage: function(e) {
                        return n.router.load(u, {
                            url: e,
                            reload: !0
                        })
                    },
                    reloadContent: function(e) {
                        return n.router.load(u, {
                            content: e,
                            reload: !0
                        })
                    },
                    reloadPreviousPage: function(e) {
                        return n.router.load(u, {
                            url: e,
                            reloadPrevious: !0,
                            reload: !0
                        })
                    },
                    reloadPreviousContent: function(e) {
                        return n.router.load(u, {
                            content: e,
                            reloadPrevious: !0,
                            reload: !0
                        })
                    },
                    refreshPage: function() {
                        var e = {
                            url: u.url,
                            reload: !0,
                            ignoreCache: !0
                        };
                        return e.url && e.url.indexOf("#") === 0 && (u.params.domCache && u.pagesCache[e.url] ? (e.pageName = u.pagesCache[e.url], e.url = undefined, delete e.url) : u.contentCache[e.url] && (e.content = u.contentCache[e.url], e.url = undefined, delete e.url)), n.router.load(u, e)
                    },
                    refreshPreviousPage: function() {
                        var e = {
                            url: u.history[u.history.length - 2],
                            reload: !0,
                            reloadPrevious: !0,
                            ignoreCache: !0
                        };
                        return e.url && e.url.indexOf("#") === 0 && u.params.domCache && u.pagesCache[e.url] && (e.pageName = u.pagesCache[e.url], e.url = undefined, delete e.url), n.router.load(u, e)
                    }
                }, u.loadPage = u.router.loadPage, u.loadContent = u.router.loadContent, u.reloadPage = u.router.reloadPage, u.reloadContent = u.router.reloadContent, u.reloadPreviousPage = u.router.reloadPreviousPage, u.reloadPreviousContent = u.router.reloadPreviousContent, u.refreshPage = u.router.refreshPage, u.refreshPreviousPage = u.router.refreshPreviousPage, u.back = u.router.back, u.hideNavbar = function() {
                    return n.hideNavbar(a)
                }, u.showNavbar = function() {
                    return n.showNavbar(a)
                }, u.hideToolbar = function() {
                    return n.hideToolbar(a)
                }, u.showToolbar = function() {
                    return n.showToolbar(a)
                };
                if (n.params.pushState && u.main) {
                    var H;
                    d ? H = c.split(n.params.pushStateRoot + p)[1] : c.indexOf(p) >= 0 && c.indexOf(p + "#") < 0 && (H = c.split(p)[1]);
                    var B = n.params.pushStateNoAnimation ? !1 : undefined;
                    if (H) n.router.load(u, {
                        url: H,
                        animatePages: B,
                        pushState: !1
                    });
                    else if (c.indexOf(p + "#") >= 0) {
                        var j = history.state;
                        j.pageName && "viewIndex" in j && n.router.load(u, {
                            pageName: j.pageName,
                            pushState: !1
                        })
                    }
                }
                return u.destroy = function() {
                    u.detachEvents(), u = undefined
                }, n.pluginHook("addView", u), u
            };
            n.addView = function(e, t) {
                return new o(e, t)
            }, n.navbarInitCallback = function(e, t, r, s, o, u) {
                var a = {
                        container: r,
                        innerContainer: s
                    },
                    f = {
                        url: o,
                        query: i.parseUrlQuery(o || ""),
                        container: t,
                        name: i(t).attr("data-page"),
                        view: e,
                        from: u
                    },
                    l = {
                        navbar: a,
                        page: f
                    };
                n.pluginHook("navbarInit", a, f), i(s).trigger("navbarInit", l)
            }, n.sizeNavbars = function(e) {
                var t = e ? i(e).find(".navbar .navbar-inner:not(.cached)") : i(".navbar .navbar-inner:not(.cached)");
                t.each(function() {
                    var e = i(this);
                    if (e.hasClass("cached")) return;
                    var t = n.rtl ? e.find(".right") : e.find(".left"),
                        r = n.rtl ? e.find(".left") : e.find(".right"),
                        s = e.find(".center"),
                        o = t.length === 0,
                        u = r.length === 0,
                        a = o ? 0 : t.outerWidth(!0),
                        f = u ? 0 : r.outerWidth(!0),
                        l = s.outerWidth(!0),
                        c = e.width(),
                        h = e.hasClass("navbar-on-left"),
                        p, d;
                    u && (p = c - l), o && (p = 0), !o && !u && (p = (c - f - l + a) / 2);
                    var v = (c - l) / 2;
                    c - a - f > l ? (v < a && (v = a), v + l > c - f && (v = c - f - l), d = v - p) : d = 0;
                    var m = n.rtl ? -1 : 1,
                        g = d;
                    n.rtl && o && u && s.length > 0 && (g = -g), s.css({
                        left: g + "px"
                    }), s.hasClass("sliding") && (s[0].f7NavbarLeftOffset = -(p + d) * m, s[0].f7NavbarRightOffset = (c - p - d - l) * m, h && s.transform("translate3d(" + s[0].f7NavbarLeftOffset + "px, 0, 0)")), !o && t.hasClass("sliding") && (n.rtl ? (t[0].f7NavbarLeftOffset = -(c - t.outerWidth()) / 2 * m, t[0].f7NavbarRightOffset = a * m) : (t[0].f7NavbarLeftOffset = -a, t[0].f7NavbarRightOffset = (c - t.outerWidth()) / 2), h && t.transform("translate3d(" + t[0].f7NavbarLeftOffset + "px, 0, 0)")), !u && r.hasClass("sliding") && (n.rtl ? (r[0].f7NavbarLeftOffset = -f * m, r[0].f7NavbarRightOffset = (c - r.outerWidth()) / 2 * m) : (r[0].f7NavbarLeftOffset = -(c - r.outerWidth()) / 2, r[0].f7NavbarRightOffset = f), h && r.transform("translate3d(" + r[0].f7NavbarLeftOffset + "px, 0, 0)"))
                })
            }, n.hideNavbar = function(e) {
                return i(e).addClass("hidden-navbar"), !0
            }, n.showNavbar = function(e) {
                var t = i(e);
                return t.addClass("hiding-navbar").removeClass("hidden-navbar").find(".navbar").transitionEnd(function() {
                    t.removeClass("hiding-navbar")
                }), !0
            }, n.hideToolbar = function(e) {
                return i(e).addClass("hidden-toolbar"), !0
            }, n.showToolbar = function(e) {
                var t = i(e);
                t.addClass("hiding-toolbar").removeClass("hidden-toolbar").find(".toolbar").transitionEnd(function() {
                    t.removeClass("hiding-toolbar")
                })
            }, n.initSearchbar = function(e) {
                function v() {
                    s.val("").trigger("change"), t.removeClass("searchbar-active searchbar-not-empty"), u.length > 0 && u.css(d, -p + "px"), a && r.removeClass("searchbar-overlay-active"), n.device.ios ? setTimeout(function() {
                        s.blur(), a.trigger("disableSearch")
                    }, 400) : (s.blur(), a.trigger("disableSearch"))
                }

                function m() {
                    n.device.ios ? setTimeout(function() {
                        a && !t.hasClass("searchbar-active") && r.addClass("searchbar-overlay-active"), t.addClass("searchbar-active"), u.length > 0 && u.css(d, "0px"), a.trigger("enableSearch")
                    }, 400) : (a && !t.hasClass("searchbar-active") && r.addClass("searchbar-overlay-active"), t.addClass("searchbar-active"), u.length > 0 && u.css(d, "0px"), a.trigger("enableSearch"))
                }

                function g() {
                    s.val("").trigger("change"), a.trigger("clearSearch")
                }

                function y() {
                    setTimeout(function() {
                        var e = s.val().trim();
                        e.length === 0 ? (t.removeClass("searchbar-not-empty"), a && t.hasClass("searchbar-active") && r.addClass("searchbar-overlay-active")) : (t.addClass("searchbar-not-empty"), a && t.hasClass("searchbar-active") && r.removeClass("searchbar-overlay-active")), a.length > 0 && f && S(e)
                    }, 0)
                }

                function b(e) {
                    e.preventDefault()
                }

                function w(e) {
                    var n = e ? "off" : "on";
                    t[n]("submit", b), u[n]("click", v), r[n]("click", v), s[n]("focus", m), s[n]("change keydown keypress keyup", y), o[n]("click", g)
                }

                function E() {
                    w(!0)
                }

                function S(e) {
                    var t = e.trim().toLowerCase().split(" ");
                    a.find("li").removeClass("hidden-by-searchbar");
                    var r = [];
                    a.find("li").each(function(e, n) {
                        n = i(n);
                        var s = n.find(f);
                        if (s.length === 0) return;
                        var o;
                        o = s.text().trim().toLowerCase();
                        var u = 0;
                        for (var a = 0; a < t.length; a++) o.indexOf(t[a]) >= 0 && u++;
                        u !== t.length ? n.addClass("hidden-by-searchbar") : r.push(n[0])
                    }), n.params.searchbarHideDividers && a.find(".item-divider, .list-group-title").each(function() {
                        var e = i(this),
                            t = e.nextAll("li"),
                            n = !0;
                        for (var r = 0; r < t.length; r++) {
                            var s = i(t[r]);
                            if (s.hasClass("list-group-title") || s.hasClass("item-divider")) break;
                            s.hasClass("hidden-by-searchbar") || (n = !1)
                        }
                        n ? e.addClass("hidden-by-searchbar") : e.removeClass("hidden-by-searchbar")
                    }), n.params.searchbarHideGroups && a.find(".list-group").each(function() {
                        var e = i(this),
                            t = e.find("li:not(.hidden-by-searchbar)");
                        t.length === 0 ? e.addClass("hidden-by-searchbar") : e.removeClass("hidden-by-searchbar")
                    }), a.trigger("search", {
                        query: e,
                        foundItems: r
                    }), r.length === 0 ? (h.show(), c.hide()) : (h.hide(), c.show())
                }

                function x() {
                    E(), e.off("pageBeforeRemove", x)
                }
                e = i(e);
                var t = e.hasClass("searchbar") ? e : e.find(".searchbar");
                if (t.length === 0) return;
                e.hasClass("page") || (e = t.parents(".page").eq(0));
                var r = e.hasClass("page") ? e.find(".searchbar-overlay") : i(".searchbar-overlay"),
                    s = t.find('input[type="search"]'),
                    o = t.find(".searchbar-clear"),
                    u = t.find(".searchbar-cancel"),
                    a = i(t.attr("data-search-list")),
                    f = t.attr("data-search-in"),
                    l = t.attr("data-search-by"),
                    c = t.attr("data-searchbar-found");
                c ? c = i(c) : (c = e.find(".searchbar-found"), c.length === 0 && (c = i(".searchbar-found")));
                var h = t.attr("data-searchbar-not-found");
                h ? h = i(h) : (h = e.find(".searchbar-not-found"), h.length === 0 && (h = i(".searchbar-not-found")));
                var p, d = n.rtl ? "margin-left" : "margin-right";
                u.length > 0 && (p = u.width(), u.css(d, -p + "px")), t[0].f7DestroySearchbar = E, w(), e.hasClass("page") && e.on("pageBeforeRemove", x)
            }, n.destroySearchbar = function(e) {
                e = i(e);
                var t = e.hasClass("searchbar") ? e : e.find(".searchbar");
                if (t.length === 0) return;
                t[0].f7DestroySearchbar && t[0].f7DestroySearchbar()
            }, n.initMessagebar = function(e) {
                function u(e) {
                    e.preventDefault()
                }

                function a() {
                    n.css({
                        height: ""
                    });
                    var e = n[0].offsetHeight,
                        i = e - n[0].clientHeight,
                        u = n[0].scrollHeight;
                    if (u + i > e) {
                        var a = u + i,
                            f = s + (a - o),
                            l = t.attr("data-max-height") || t.parents(".view")[0].offsetHeight - 88;
                        f > l && (f = l, a = f - s + o), n.css("height", a + "px"), t.css("height", f + "px"), r.length > 0 && (r.css("padding-bottom", f + "px"), r.scrollTop(r[0].scrollHeight - r[0].offsetHeight))
                    } else r.length > 0 && (t.css({
                        height: ""
                    }), r.css({
                        "padding-bottom": ""
                    }))
                }

                function l(e) {
                    clearTimeout(f), f = setTimeout(function() {
                        a()
                    }, 0)
                }

                function c(e) {
                    var r = e ? "off" : "on";
                    t[r]("submit", u), n[r]("change keydown keypress keyup paste cut", l)
                }

                function h() {
                    c(!0)
                }

                function p() {
                    h(), e.off("pageBeforeRemove", p)
                }
                e = i(e);
                var t = e.hasClass("messagebar") ? e : e.find(".messagebar");
                if (t.length === 0) return;
                var n = t.find("textarea"),
                    r = t.parents(".page").find(".page-content"),
                    s = t[0].offsetHeight,
                    o = n[0].offsetHeight,
                    f;
                t[0].f7DestroyMessagebar = h, c(), e.hasClass("page") && e.on("pageBeforeRemove", p)
            }, n.destroyMessagebar = function(e) {
                e = i(e);
                var t = e.hasClass("messagebar") ? e : e.find(".messagebar");
                if (t.length === 0) return;
                t[0].f7DestroyMessagebar && t[0].f7DestroyMessagebar()
            }, n.cache = [], n.removeFromCache = function(e) {
                var t = !1;
                for (var r = 0; r < n.cache.length; r++) n.cache[r].url === e && (t = r);
                t !== !1 && n.cache.splice(t, 1)
            }, n.xhr = !1, n.get = function(e, t, r, s) {
                var o = e;
                n.params.cacheIgnoreGetParameters && e.indexOf("?") >= 0 && (o = e.split("?")[0]);
                if (n.params.cache && !r && e.indexOf("nocache") < 0 && n.params.cacheIgnore.indexOf(o) < 0)
                    for (var u = 0; u < n.cache.length; u++)
                        if (n.cache[u].url === o && (new Date).getTime() - n.cache[u].time < n.params.cacheDuration) return s(n.cache[u].content), !1;
                return n.xhr = i.ajax({
                    url: e,
                    method: "GET",
                    start: n.params.onAjaxStart,
                    complete: function(e) {
                        e.status === 200 || e.status === 0 ? (n.params.cache && !r && (n.removeFromCache(o), n.cache.push({
                            url: o,
                            time: (new Date).getTime(),
                            content: e.responseText
                        })), s(e.responseText, !1)) : s(e.responseText, !0), n.params.onAjaxComplete && n.params.onAjaxComplete(e)
                    },
                    error: function(e) {
                        s(e.responseText, !0), n.params.onAjaxError && n.params.onAjaxonAjaxError(e)
                    }
                }), t && (t.xhr = n.xhr), n.xhr
            }, n.pageCallbacks = {}, n.onPage = function(e, t, r) {
                if (t && t.split(" ").length > 1) {
                    var i = t.split(" "),
                        s = [];
                    for (var o = 0; o < i.length; o++) s.push(n.onPage(e, i[o], r));
                    return s.remove = function() {
                        for (var e = 0; e < s.length; e++) s[e].remove()
                    }, s.trigger = function() {
                        for (var e = 0; e < s.length; e++) s[e].trigger()
                    }, s
                }
                var u = n.pageCallbacks[e][t];
                return u || (u = n.pageCallbacks[e][t] = []), n.pageCallbacks[e][t].push(r), {
                    remove: function() {
                        var e;
                        for (var t = 0; t < u.length; t++) u[t].toString() === r.toString() && (e = t);
                        typeof e != "undefined" && u.splice(e, 1)
                    },
                    trigger: r
                }
            };
            var a = "beforeInit init reinit beforeAnimation afterAnimation back afterBack beforeRemove".split(" ");
            for (var f = 0; f < a.length; f++) n.pageCallbacks[a[f]] = {}, u(a[f]);
            n.triggerPageCallbacks = function(e, t, r) {
                var i = n.pageCallbacks[e]["*"];
                if (i)
                    for (var s = 0; s < i.length; s++) i[s](r);
                var o = n.pageCallbacks[e][t];
                if (!o || o.length === 0) return;
                for (var u = 0; u < o.length; u++) o[u](r)
            }, n.pageInitCallback = function(e, t, r, s, o) {
                if (t.f7PageInitialized && !e.params.domCache) return;
                var u = {
                    container: t,
                    url: r,
                    query: i.parseUrlQuery(r || ""),
                    name: i(t).attr("data-page"),
                    view: e,
                    from: s,
                    navbarInnerContainer: o
                };
                if (t.f7PageInitialized && e.params.domCache) {
                    n.reinitPage(t), n.pluginHook("pageReinit", u), n.params.onPageReinit && n.params.onPageBeforeInit(n, u), n.triggerPageCallbacks("reinit", u.name, u), i(u.container).trigger("pageReinit", {
                        page: u
                    });
                    return
                }
                t.f7PageInitialized = !0, t.f7PageData = u, e && (e.activePage = u), n.pluginHook("pageBeforeInit", u), n.params.onPageBeforeInit && n.params.onPageBeforeInit(n, u), n.triggerPageCallbacks("beforeInit", u.name, u), i(u.container).trigger("pageBeforeInit", {
                    page: u
                }), n.initPage(t), n.pluginHook("pageInit", u), n.params.onPageInit && n.params.onPageInit(n, u), n.triggerPageCallbacks("init", u.name, u), i(u.container).trigger("pageInit", {
                    page: u
                })
            }, n.pageRemoveCallback = function(e, t, r) {
                var s = {
                    container: t,
                    name: i(t).attr("data-page"),
                    view: e,
                    from: r
                };
                n.pluginHook("pageBeforeRemove", s), n.params.onPageBeforeRemove && n.params.onPageBeforeRemove(n, s), n.triggerPageCallbacks("beforeRemove", s.name, s), i(s.container).trigger("pageBeforeRemove", {
                    page: s
                })
            }, n.pageBackCallbacks = function(e, t, r) {
                var s = r.pageContainer,
                    o = {
                        container: r.pageContainer,
                        name: i(s).attr("data-page"),
                        url: s.f7PageData && s.f7PageData.url,
                        query: s.f7PageData && s.f7PageData.query,
                        view: t,
                        from: r.position,
                        swipeBack: r.swipeBack
                    };
                e === "after" && (n.pluginHook("pageAfterBack", o), n.params.onPageAfterBack && n.params.onPageAfterBack(n, o), n.triggerPageCallbacks("afterBack", o.name, o), i(s).trigger("pageAfterBack", {
                    page: o
                })), e === "before" && (n.pluginHook("pageBack", o), n.params.onPageBack && n.params.onPageBack(n, o), n.triggerPageCallbacks("back", o.name, o), i(o.container).trigger("pageBack", {
                    page: o
                }))
            }, n.pageAnimCallbacks = function(e, t, r) {
                var s = {
                        container: r.pageContainer,
                        url: r.url,
                        query: i.parseUrlQuery(r.url || ""),
                        name: i(r.pageContainer).attr("data-page"),
                        view: t,
                        from: r.position,
                        swipeBack: r.swipeBack
                    },
                    o = r.oldPage,
                    u = r.newPage;
                r.pageContainer.f7PageData = s, e === "after" && (n.pluginHook("pageAfterAnimation", s), n.params.onPageAfterAnimation && n.params.onPageAfterAnimation(n, s), n.triggerPageCallbacks("afterAnimation", s.name, s), i(s.container).trigger("pageAfterAnimation", {
                    page: s
                })), e === "before" && (i(t.container).attr("data-page", s.name), t && (t.activePage = s), u.hasClass("no-navbar") && !o.hasClass("no-navbar") && t.hideNavbar(), !u.hasClass("no-navbar") && (o.hasClass("no-navbar") || o.hasClass("no-navbar-by-scroll")) && t.showNavbar(), u.hasClass("no-toolbar") && !o.hasClass("no-toolbar") && t.hideToolbar(), !u.hasClass("no-toolbar") && (o.hasClass("no-toolbar") || o.hasClass("no-toolbar-by-scroll")) && t.showToolbar(), o.removeClass("no-navbar-by-scroll no-toolbar-by-scroll"), n.pluginHook("pageBeforeAnimation", s), n.params.onPageBeforeAnimation && n.params.onPageBeforeAnimation(n, s), n.triggerPageCallbacks("beforeAnimation", s.name, s), i(s.container).trigger("pageBeforeAnimation", {
                    page: s
                }))
            }, n.initPage = function(e) {
                n.sizeNavbars && n.sizeNavbars(i(e).parents("." + n.params.viewClass)[0]), n.initMessages && n.initMessages(e), n.initFormsStorage && n.initFormsStorage(e), n.initSmartSelects && n.initSmartSelects(e), n.initSlider && n.initSlider(e), n.initPullToRefresh && n.initPullToRefresh(e), n.initInfiniteScroll && n.initInfiniteScroll(e), n.initSearchbar && n.initSearchbar(e), n.initMessagebar && n.initMessagebar(e), n.initScrollToolbars && n.initScrollToolbars(e)
            }, n.reinitPage = function(e) {
                n.sizeNavbars && n.sizeNavbars(i(e).parents("." + n.params.viewClass)[0]), n.reinitSlider && n.reinitSlider(e)
            }, n.router = {
                temporaryDom: document.createElement("div"),
                findElement: function(e, t, r, s) {
                    t = i(t), s && (e += ":not(.cached)");
                    var o = t.find(e);
                    return o.length > 1 && (typeof r.selector == "string" && (o = t.find(r.selector + " " + e)), o.length > 1 && (o = t.find("." + n.params.viewMainClass + " " + e))), o.length === 1 ? o : (s || (o = n.router.findElement(e, t, r, !0)), o && o.length === 1 ? o : undefined)
                },
                animatePages: function(e, t, n, r) {
                    var i = "page-on-center page-on-right page-on-left";
                    n === "to-left" && (e.removeClass(i).addClass("page-from-center-to-left"), t.removeClass(i).addClass("page-from-right-to-center")), n === "to-right" && (e.removeClass(i).addClass("page-from-left-to-center"), t.removeClass(i).addClass("page-from-center-to-right"))
                },
                prepareNavbar: function(e, t, r) {
                    i(e).find(".sliding").each(function() {
                        var e = i(this),
                            s = r === "right" ? this.f7NavbarRightOffset : this.f7NavbarLeftOffset;
                        n.params.animateNavBackIcon && (e.hasClass("left") && e.find(".back .icon").length > 0 && e.find(".back .icon").transform("translate3d(" + -s + "px,0,0)"), r === "left" && e.hasClass("center") && i(t).find(".left .back .icon ~ span").length > 0 && (s += i(t).find(".left .back span")[0].offsetLeft)), e.transform("translate3d(" + s + "px,0,0)")
                    })
                },
                animateNavbars: function(e, t, r, s) {
                    var o = "navbar-on-right navbar-on-center navbar-on-left";
                    r === "to-left" && (t.removeClass(o).addClass("navbar-from-right-to-center"), t.find(".sliding").each(function() {
                        var e = i(this);
                        e.transform("translate3d(0px,0,0)"), n.params.animateNavBackIcon && e.hasClass("left") && e.find(".back .icon").length > 0 && e.find(".back .icon").transform("translate3d(0px,0,0)")
                    }), e.removeClass(o).addClass("navbar-from-center-to-left"), e.find(".sliding").each(function() {
                        var e = i(this);
                        n.params.animateNavBackIcon && (e.hasClass("center") && t.find(".sliding.left .back .icon").length > 0 && (this.f7NavbarLeftOffset += t.find(".sliding.left .back span")[0].offsetLeft), e.hasClass("left") && e.find(".back .icon").length > 0 && e.find(".back .icon").transform("translate3d(" + -this.f7NavbarLeftOffset + "px,0,0)")), e.transform("translate3d(" + this.f7NavbarLeftOffset + "px,0,0)")
                    })), r === "to-right" && (e.removeClass(o).addClass("navbar-from-left-to-center"), e.find(".sliding").each(function() {
                        var e = i(this);
                        e.transform("translate3d(0px,0,0)"), n.params.animateNavBackIcon && e.hasClass("left") && e.find(".back .icon").length > 0 && e.find(".back .icon").transform("translate3d(0px,0,0)")
                    }), t.removeClass(o).addClass("navbar-from-center-to-right"), t.find(".sliding").each(function() {
                        var e = i(this);
                        n.params.animateNavBackIcon && e.hasClass("left") && e.find(".back .icon").length > 0 && e.find(".back .icon").transform("translate3d(" + -this.f7NavbarRightOffset + "px,0,0)"), e.transform("translate3d(" + this.f7NavbarRightOffset + "px,0,0)")
                    }))
                },
                preprocess: function(e, t, r) {
                    n.pluginHook("routerPreprocess", e, t, r), e = n.pluginProcess("preprocess", e), n.params.preprocess ? (e = n.params.preprocess(e, t, r), typeof e != "undefined" && r(e)) : r(e)
                },
                template7Render: function(e, t) {
                    var r = t.url,
                        o = t.content,
                        u = t.content,
                        a = t.context,
                        f = t.contextName,
                        l = t.template,
                        c = t.pageName,
                        h, p;
                    typeof o == "string" ? r ? n.templatesCache[r] ? p = s.templatesCache[r] : (p = s.compile(o), s.templatesCache[r] = p) : p = s.compile(o) : l && (p = l);
                    if (a) h = a;
                    else {
                        if (f)
                            if (f.indexOf(".") >= 0) {
                                var d = f.split("."),
                                    v = s.data[d[0]];
                                for (var m = 1; m < d.length; m++) d[m] && (v = v[d[m]]);
                                h = v
                            } else h = s.data[f];
                        !h && r && (h = s.data["url:" + r]);
                        if (!h && typeof o == "string" && !l) {
                            var g = o.match(/(data-page=["'][^"^']*["'])/);
                            if (g) {
                                var y = g[0].split("data-page=")[1].replace(/['"]/g, "");
                                y && (h = s.data["page:" + y])
                            }
                        }
                        if (!h && l && s.templates)
                            for (var b in s.templates) s.templates[b] === l && (h = s.data[b]);
                        h || (h = {})
                    }
                    if (p && h) {
                        typeof h == "function" && (h = h());
                        if (r) {
                            var w = i.parseUrlQuery(r);
                            h.url_query = {};
                            for (var E in w) h.url_query[E] = w[E]
                        }
                        u = p(h)
                    }
                    return u
                }
            }, n.router._load = function(e, t) {
                function _() {
                    e.allowPageChange = !0, h.removeClass("page-from-right-to-center page-on-right").addClass("page-on-center"), p.removeClass("page-from-center-to-left page-on-center").addClass("page-on-left"), b && (g.removeClass("navbar-from-right-to-center navbar-on-right").addClass("navbar-on-center"), m.removeClass("navbar-from-center-to-left navbar-on-center").addClass("navbar-on-left")), n.pageAnimCallbacks("after", e, {
                        pageContainer: h[0],
                        url: r,
                        position: "right",
                        oldPage: p,
                        newPage: h
                    }), n.params.pushState && n.pushStateClearQueue();
                    if (!e.params.swipeBackPage && !e.params.preloadPreviousPage)
                        if (e.params.domCache) p.addClass("cached"), m.addClass("cached");
                        else if (r.indexOf("#") !== 0 || h.attr("data-page").indexOf("smart-select-") !== 0) n.pageRemoveCallback(e, p[0], "left"), p.remove(), b && m.remove();
                    e.params.uniqueHistory && L && e.refreshPreviousPage()
                }
                t = t || {};
                var r = t.url,
                    s = t.content,
                    o = t.content,
                    u = t.template,
                    a = t.pageName,
                    f = i(e.container),
                    l = i(e.pagesContainer),
                    c = t.animatePages,
                    h, p, d, v, m, g, y, b, w, E = typeof r == "undefined" && s || u,
                    S = t.pushState;
                typeof c == "undefined" && (c = e.params.animatePages), n.pluginHook("routerLoad", e, t);
                if (n.params.template7Pages && typeof s == "string" || u) o = n.router.template7Render(e, t), o && !s && (s = o);
                n.router.temporaryDom.innerHTML = "";
                if (!a)
                    if (r || typeof s == "string") n.router.temporaryDom.innerHTML = o;
                    else if ("length" in s && s.length > 1)
                    for (var x = 0; x < s.length; x++) i(n.router.temporaryDom).append(s[x]);
                else i(n.router.temporaryDom).append(s);
                w = t.reload && (t.reloadPrevious ? "left" : "center"), a ? h = l.find('.page[data-page="' + a + '"]') : h = n.router.findElement(".page", n.router.temporaryDom, e);
                if (!h || h.length === 0 || a && e.activePage && e.activePage.name === a) {
                    e.allowPageChange = !0;
                    return
                }
                h.addClass(t.reload ? "page-on-" + w : "page-on-right"), d = l.children(".page:not(.cached)");
                if (t.reload && t.reloadPrevious && d.length === 1) {
                    e.allowPageChange = !0;
                    return
                }
                if (t.reload) p = d.eq(d.length - 1);
                else {
                    if (d.length > 1) {
                        for (v = 0; v < d.length - 2; v++) e.params.domCache ? i(d[v]).addClass("cached") : (n.pageRemoveCallback(e, d[v], "left"), i(d[v]).remove());
                        e.params.domCache ? i(d[v]).addClass("cached") : (n.pageRemoveCallback(e, d[v], "left"), i(d[v]).remove())
                    }
                    p = l.children(".page:not(.cached)")
                }
                e.params.domCache && h.removeClass("cached");
                if (e.params.dynamicNavbar) {
                    b = !0, a ? g = f.find('.navbar-inner[data-page="' + a + '"]') : g = n.router.findElement(".navbar-inner", n.router.temporaryDom, e);
                    if (!g || g.length === 0) b = !1;
                    y = f.find(".navbar");
                    if (t.reload) m = y.find(".navbar-inner:not(.cached):last-child");
                    else {
                        m = y.find(".navbar-inner:not(.cached)");
                        if (m.length > 0) {
                            for (v = 0; v < m.length - 1; v++) e.params.domCache ? i(m[v]).addClass("cached") : i(m[v]).remove();
                            !g && m.length === 1 && (e.params.domCache ? i(m[0]).addClass("cached") : i(m[0]).remove()), m = y.find(".navbar-inner:not(.cached)")
                        }
                    }
                }
                b && (g.addClass(t.reload ? "navbar-on-" + w : "navbar-on-right"), e.params.domCache && g.removeClass("cached"), h[0].f7RelatedNavbar = g[0], g[0].f7RelatedPage = h[0]);
                if (!r) {
                    var T = a || h.attr("data-page");
                    E ? r = "#" + n.params.dynamicPageUrl.replace(/{{name}}/g, T).replace(/{{index}}/g, e.history.length - (t.reload ? 1 : 0)) : r = "#" + T, e.params.domCache || (e.contentCache[r] = s), e.params.domCache && a && (e.pagesCache[r] = a)
                }
                if (n.params.pushState && !t.reloadPrevious && e.main) {
                    typeof S == "undefined" && (S = !0);
                    var N = n.params.pushStateRoot || "",
                        C = t.reload ? "replaceState" : "pushState";
                    S && (!E && !a ? history[C]({
                        url: r,
                        viewIndex: n.views.indexOf(e)
                    }, "", N + n.params.pushStateSeparator + r) : E && s ? history[C]({
                        content: s,
                        url: r,
                        viewIndex: n.views.indexOf(e)
                    }, "", N + n.params.pushStateSeparator + r) : a && history[C]({
                        pageName: a,
                        url: r,
                        viewIndex: n.views.indexOf(e)
                    }, "", N + n.params.pushStateSeparator + r))
                }
                e.url = r;
                if (t.reload) {
                    var k = e.history[e.history.length - (t.reloadPrevious ? 2 : 1)];
                    k && k.indexOf("#") === 0 && k in e.contentCache && k !== r && (e.contentCache[k] = null, delete e.contentCache[k]), e.history[e.history.length - (t.reloadPrevious ? 2 : 1)] = r
                } else e.history.push(r);
                var L = !1;
                if (e.params.uniqueHistory) {
                    var A = e.history,
                        O = r;
                    if (e.params.uniqueHistoryIgnoreGetParameters) {
                        A = [], O = r.split("?")[0];
                        for (v = 0; v < e.history.length; v++) A.push(e.history[v].split("?")[0])
                    }
                    A.indexOf(O) !== A.lastIndexOf(O) && (e.history = e.history.slice(0, A.indexOf(O)), e.history.push(r), L = !0)
                }
                t.reloadPrevious ? (p = p.prev(".page"), h.insertBefore(p), b && (m = m.prev(".navbar-inner"), g.insertAfter(m))) : (l.append(h[0]), b && y.append(g[0])), t.reload && (e.params.domCache && e.initialPages.indexOf(p[0]) >= 0 ? (p.addClass("cached"), b && m.addClass("cached")) : (n.pageRemoveCallback(e, p[0], w), p.remove(), b && m.remove())), n.pageInitCallback(e, h[0], r, t.reload ? w : "right", b ? g[0] : undefined), b && n.navbarInitCallback(e, h[0], y[0], g[0], r, t.reload ? w : "right");
                if (t.reload) {
                    e.allowPageChange = !0, L && e.refreshPreviousPage();
                    return
                }
                b && c && n.router.prepareNavbar(g, m, "right");
                var M = h[0].clientLeft;
                n.pageAnimCallbacks("before", e, {
                    pageContainer: h[0],
                    url: r,
                    position: "right",
                    oldPage: p,
                    newPage: h
                }), c ? (n.router.animatePages(p, h, "to-left", e), b && setTimeout(function() {
                    n.router.animateNavbars(m, g, "to-left", e)
                }, 0), h.animationEnd(function(e) {
                    _()
                })) : _()
            }, n.router.load = function(e, t) {
                function u(i) {
                    n.router.preprocess(i, r, function(r) {
                        t.content = r, n.router._load(e, t)
                    })
                }
                var r = t.url,
                    i = t.content,
                    s = t.pageName,
                    o = t.template;
                if (!e.allowPageChange) return !1;
                if (r && e.url === r && !t.reload) return !1;
                e.allowPageChange = !1, n.xhr && e.xhr && e.xhr === n.xhr && (n.xhr.abort(), n.xhr = !1);
                if (i || s) {
                    u(i);
                    return
                }
                if (o) {
                    n.router._load(e, t);
                    return
                }
                if (!t.url || t.url === "#") {
                    e.allowPageChange = !0;
                    return
                }
                n.get(t.url, e, t.ignoreCache, function(t, n) {
                    if (n) {
                        e.allowPageChange = !0;
                        return
                    }
                    u(t)
                })
            }, n.router._back = function(e, t) {
                function N() {
                    n.pageBackCallbacks("after", e, {
                        pageContainer: g[0],
                        url: r,
                        position: "center",
                        oldPage: g,
                        newPage: y
                    }), n.pageAnimCallbacks("after", e, {
                        pageContainer: y[0],
                        url: r,
                        position: "left",
                        oldPage: g,
                        newPage: y
                    }), n.router.afterBack(e, g[0], y[0])
                }

                function C() {
                    n.pageBackCallbacks("before", e, {
                        pageContainer: g[0],
                        url: r,
                        position: "center",
                        oldPage: g,
                        newPage: y
                    }), n.pageAnimCallbacks("before", e, {
                        pageContainer: y[0],
                        url: r,
                        position: "left",
                        oldPage: g,
                        newPage: y
                    }), a ? (n.router.animatePages(y, g, "to-right", e), x && setTimeout(function() {
                        n.router.animateNavbars(w, b, "to-right", e)
                    }, 0), y.animationEnd(function() {
                        N()
                    })) : (w.find(".sliding, .sliding .back .icon").transform(""), N())
                }

                function k() {
                    n.router.temporaryDom.innerHTML = "";
                    if (r || typeof s == "string") n.router.temporaryDom.innerHTML = o;
                    else if ("length" in s && s.length > 1)
                        for (var t = 0; t < s.length; t++) i(n.router.temporaryDom).append(s[t]);
                    else i(n.router.temporaryDom).append(s);
                    y = n.router.findElement(".page", n.router.temporaryDom, e), e.params.dynamicNavbar && (w = n.router.findElement(".navbar-inner", n.router.temporaryDom, e))
                }

                function L() {
                    if (!y || y.length === 0) {
                        e.allowPageChange = !0;
                        return
                    }
                    e.params.dynamicNavbar && (!w || w.length === 0 ? x = !1 : x = !0), y.addClass("page-on-left").removeClass("cached"), x && (E = d.find(".navbar"), S = d.find(".navbar-inner:not(.cached)"), w.addClass("navbar-on-left").removeClass("cached"));
                    if (h) {
                        var t, s;
                        t = i(m[m.length - 2]), x && (s = i(t[0].f7RelatedNavbar || S[S.length - 2])), e.params.domCache && e.initialPages.indexOf(t[0]) >= 0 ? (t.addClass("cached"), x && s.addClass("cached")) : (t.remove(), x && s.remove()), m = v.children(".page:not(.cached)"), x && (S = d.find(".navbar-inner:not(.cached)")), e.history.indexOf(r) >= 0 ? e.history = e.history.slice(0, e.history.indexOf(r) + 2) : e.history[e.history.length - 2] = r
                    }
                    g = i(m[m.length - 1]), x && (b = i(S[S.length - 1])), x && (T && w.insertBefore(b), w[0].f7RelatedPage = y[0], y[0].f7RelatedNavbar = w[0]), T && y.insertBefore(g), n.pageInitCallback(e, y[0], r, "left", x ? w[0] : undefined), x && n.navbarInitCallback(e, y[0], E[0], w[0], r, "right"), x && w.hasClass("navbar-on-left") && a && n.router.prepareNavbar(w, b, "left");
                    if (f) {
                        e.allowPageChange = !0;
                        return
                    }
                    e.url = r;
                    var o = y[0].clientLeft;
                    C();
                    return
                }
                t = t || {};
                var r = t.url,
                    s = t.content,
                    o = t.content,
                    u = t.template,
                    a = t.animatePages,
                    f = t.preloadOnly,
                    l = t.pushState,
                    c = t.ignoreCache,
                    h = t.force,
                    p = t.pageName,
                    d = i(e.container),
                    v = i(e.pagesContainer),
                    m = v.children(".page:not(.cached)"),
                    g, y, b, w, E, S, x, T = !0;
                typeof a == "undefined" && (a = e.params.animatePages), n.pluginHook("routerBack", e, t);
                if (n.params.template7Pages && typeof s == "string" || u) o = n.router.template7Render(e, t), o && !s && (s = o);
                n.params.pushState && (typeof l == "undefined" && (l = !0), !f && history.state && l && history.back());
                if (m.length > 1 && !h) {
                    if (f) {
                        e.allowPageChange = !0;
                        return
                    }
                    e.url = e.history[e.history.length - 2], r = e.url, y = i(m[m.length - 2]), g = i(m[m.length - 1]), e.params.dynamicNavbar && (x = !0, S = d.find(".navbar-inner:not(.cached)"), w = i(S[0]), b = i(S[1])), T = !1, L();
                    return
                }
                if (!h) {
                    e.url = e.history[e.history.length - 2], r = e.url;
                    if (s) {
                        k(), L();
                        return
                    }
                    if (p) {
                        y = i(d).find('.page[data-page="' + p + '"]'), e.params.dynamicNavbar && (w = i(d).find('.navbar-inner[data-page="' + p + '"]')), L();
                        return
                    }
                    e.allowPageChange = !0;
                    return
                }
                if (r && r === e.url || p && e.activePage && e.activePage.name === p) {
                    e.allowPageChange = !0;
                    return
                }
                if (s) {
                    k(), L();
                    return
                }
                if (p && e.params.domCache) {
                    p && (r = "#" + p), y = i(d).find('.page[data-page="' + p + '"]'), y[0].f7PageData && y[0].f7PageData.url && (r = y[0].f7PageData.url), e.params.dynamicNavbar && (w = i(d).find('.navbar-inner[data-page="' + p + '"]'), w.length === 0 && (w = i(y[0].f7RelatedNavbar))), L();
                    return
                }
                e.allowPageChange = !0;
                return
            }, n.router.back = function(e, t) {
                function f(i) {
                    n.router.preprocess(i, r, function(r) {
                        t.content = r, n.router._back(e, t)
                    })
                }
                t = t || {};
                var r = t.url,
                    s = t.content,
                    o = t.pageName,
                    u = t.force;
                if (!e.allowPageChange) return !1;
                e.allowPageChange = !1, n.xhr && e.xhr && e.xhr === n.xhr && (n.xhr.abort(), n.xhr = !1);
                var a = i(e.pagesContainer).find(".page:not(.cached)");
                if (a.length > 1 && !u) {
                    n.router._back(e, t);
                    return
                }
                if (!u) {
                    r = t.url = e.history[e.history.length - 2];
                    if (!r) {
                        e.allowPageChange = !0;
                        return
                    }
                    if (r.indexOf("#") === 0 && e.contentCache[r]) {
                        f(e.contentCache[r]);
                        return
                    }
                    if (r.indexOf("#") === 0 && e.params.domCache) {
                        o || (t.pageName = r.split("#")[1]), f();
                        return
                    }
                    if (r.indexOf("#") < 0) {
                        n.get(t.url, e, t.ignoreCache, function(t, n) {
                            if (n) {
                                e.allowPageChange = !0;
                                return
                            }
                            f(t)
                        });
                        return
                    }
                } else {
                    if (!r && s) {
                        f(s);
                        return
                    }
                    if (!r && o) {
                        o && (r = "#" + o), f();
                        return
                    }
                    if (r) {
                        n.get(t.url, e, t.ignoreCache, function(t, n) {
                            if (n) {
                                e.allowPageChange = !0;
                                return
                            }
                            f(t)
                        });
                        return
                    }
                }
                e.allowPageChange = !0;
                return
            }, n.router.afterBack = function(e, t, r) {
                t = i(t), r = i(r), e.params.domCache && e.initialPages.indexOf(t[0]) >= 0 ? t.removeClass("page-from-center-to-right").addClass("cached") : (t.remove(), n.pageRemoveCallback(e, t[0], "right")), r.removeClass("page-from-left-to-center page-on-left").addClass("page-on-center"), e.allowPageChange = !0;
                var s = e.history.pop(),
                    o;
                if (e.params.dynamicNavbar) {
                    var u = i(e.container).find(".navbar-inner:not(.cached)"),
                        a = i(t[0].f7RelatedNavbar || u[1]);
                    e.params.domCache && e.initialNavbars.indexOf(a[0]) >= 0 ? a.removeClass("navbar-from-center-to-right").addClass("cached") : a.remove(), o = i(u[0]).removeClass("navbar-on-left navbar-from-left-to-center").addClass("navbar-on-center")
                }
                e.params.domCache && i(e.container).find(".page.cached").each(function() {
                    var t = i(this),
                        n = t.index(),
                        r = t[0].f7PageData && t[0].f7PageData.url;
                    r && e.history.indexOf(r) < 0 && e.initialPages.indexOf(this) < 0 && (t[0].f7RelatedNavbar && i(t[0].f7RelatedNavbar).remove(), t.remove())
                }), !e.params.domCache && s && s.indexOf("#") > -1 && s in e.contentCache && (e.contentCache[s] = null, delete e.contentCache[s]), n.params.pushState && n.pushStateClearQueue();
                if (e.params.preloadPreviousPage)
                    if (e.params.domCache && e.history.length > 1) {
                        var f = e.history[e.history.length - 2],
                            l, c;
                        f && e.pagesCache[f] ? (l = i(e.container).find('.page[data-page="' + e.pagesCache[f] + '"]'), l.insertBefore(r), o && (c = i(e.container).find('.navbar-inner[data-page="' + e.pagesCache[f] + '"]'), c.insertBefore(o))) : (l = r.prev(".page.cached"), o && (c = o.prev(".navbar-inner.cached"))), l && l.length > 0 && l.removeClass("cached page-on-right page-on-center").addClass("page-on-left"), c && c.length > 0 && c.removeClass("cached navbar-on-right navbar-on-center").addClass("navbar-on-left")
                    } else n.router.back(e, {
                        preloadOnly: !0
                    })
            };
            var l = document.createElement("div");
            n.modal = function(e) {
                e = e || {};
                var t = "";
                if (n.params.modalTemplate) n._compiledTemplates.modal || (n._compiledTemplates.modal = s.compile(n.params.modalTemplate)), t = n._compiledTemplates.modal(e);
                else {
                    var r = "";
                    if (e.buttons && e.buttons.length > 0)
                        for (var o = 0; o < e.buttons.length; o++) r += '<span class="modal-button' + (e.buttons[o].bold ? " modal-button-bold" : "") + '">' + e.buttons[o].text + "</span>";
                    var u = e.title ? '<div class="modal-title">' + e.title + "</div>" : "",
                        a = e.text ? '<div class="modal-text">' + e.text + "</div>" : "",
                        f = e.afterText ? e.afterText : "",
                        c = !e.buttons || e.buttons.length === 0 ? "modal-no-buttons" : "";
                    t = '<div class="modal ' + c + '"><div class="modal-inner">' + (u + a + f) + '</div><div class="modal-buttons">' + r + "</div></div>"
                }
                l.innerHTML = t;
                var h = i(l).children();
                return i("body").append(h[0]), h.find(".modal-button").each(function(t, r) {
                    i(r).on("click", function(r) {
                        e.buttons[t].close !== !1 && n.closeModal(h), e.buttons[t].onClick && e.buttons[t].onClick(h, r), e.onClick && e.onClick(h, t)
                    })
                }), n.openModal(h), h[0]
            }, n.alert = function(e, t, r) {
                return typeof t == "function" && (r = arguments[1], t = undefined), n.modal({
                    text: e || "",
                    title: typeof t == "undefined" ? n.params.modalTitle : t,
                    buttons: [{
                        text: n.params.modalButtonOk,
                        bold: !0,
                        onClick: r
                    }]
                })
            }, n.confirm = function(e, t, r, i) {
                return typeof t == "function" && (i = arguments[2], r = arguments[1], t = undefined), n.modal({
                    text: e || "",
                    title: typeof t == "undefined" ? n.params.modalTitle : t,
                    buttons: [{
                        text: n.params.modalButtonCancel,
                        onClick: i
                    }, {
                        text: n.params.modalButtonOk,
                        bold: !0,
                        onClick: r
                    }]
                })
            }, n.prompt = function(e, t, r, s) {
                return typeof t == "function" && (s = arguments[2], r = arguments[1], t = undefined), n.modal({
                    text: e || "",
                    title: typeof t == "undefined" ? n.params.modalTitle : t,
                    afterText: '<input type="text" class="modal-text-input">',
                    buttons: [{
                        text: n.params.modalButtonCancel
                    }, {
                        text: n.params.modalButtonOk,
                        bold: !0
                    }],
                    onClick: function(e, t) {
                        t === 0 && s && s(i(e).find(".modal-text-input").val()), t === 1 && r && r(i(e).find(".modal-text-input").val())
                    }
                })
            }, n.modalLogin = function(e, t, r, s) {
                return typeof t == "function" && (s = arguments[2], r = arguments[1], t = undefined), n.modal({
                    text: e || "",
                    title: typeof t == "undefined" ? n.params.modalTitle : t,
                    afterText: '<input type="text" name="modal-username" placeholder="' + n.params.modalUsernamePlaceholder + '" class="modal-text-input modal-text-input-double"><input type="password" name="modal-password" placeholder="' + n.params.modalPasswordPlaceholder + '" class="modal-text-input modal-text-input-double">',
                    buttons: [{
                        text: n.params.modalButtonCancel
                    }, {
                        text: n.params.modalButtonOk,
                        bold: !0
                    }],
                    onClick: function(e, t) {
                        var n = i(e).find('.modal-text-input[name="modal-username"]').val(),
                            o = i(e).find('.modal-text-input[name="modal-password"]').val();
                        t === 0 && s && s(n, o), t === 1 && r && r(n, o)
                    }
                })
            }, n.modalPassword = function(e, t, r, s) {
                return typeof t == "function" && (s = arguments[2], r = arguments[1], t = undefined), n.modal({
                    text: e || "",
                    title: typeof t == "undefined" ? n.params.modalTitle : t,
                    afterText: '<input type="password" name="modal-password" placeholder="' + n.params.modalPasswordPlaceholder + '" class="modal-text-input">',
                    buttons: [{
                        text: n.params.modalButtonCancel
                    }, {
                        text: n.params.modalButtonOk,
                        bold: !0
                    }],
                    onClick: function(e, t) {
                        var n = i(e).find('.modal-text-input[name="modal-password"]').val();
                        t === 0 && s && s(n), t === 1 && r && r(n)
                    }
                })
            }, n.showPreloader = function(e) {
                return n.modal({
                    title: e || n.params.modalPreloaderTitle,
                    text: '<div class="preloader"></div>'
                })
            }, n.hidePreloader = function() {
                n.closeModal(".modal.modal-in")
            }, n.showIndicator = function() {
                i("body").append('<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal"><span class="preloader preloader-white"></span></div>')
            }, n.hideIndicator = function() {
                i(".preloader-indicator-overlay, .preloader-indicator-modal").remove()
            }, n.actions = function(e, t) {
                var r = !1,
                    o, u, a;
                arguments.length === 1 ? t = e : n.device.ios ? n.device.ipad && (r = !0) : i(window).width() >= 768 && (r = !0), t = t || [], t.length > 0 && !i.isArray(t[0]) && (t = [t]);
                var f;
                if (r) {
                    var c = '<div class="popover actions-popover"><div class="popover-inner">{{#each this}}<div class="list-block"><ul>{{#each this}}{{#if label}}<li class="actions-popover-label {{#if color}}color-{{color}}{{/if}} {{#if bold}}actions-popover-bold{{/if}}">{{text}}</li>{{else}}<li><a href="#" class="item-link list-button {{#if color}}color-{{color}}{{/if}} {{#if bold}}actions-popover-bold{{/if}}">{{text}}</a></li>{{/if}}{{/each}}</ul></div>{{/each}}</div></div>';
                    n._compiledTemplates.actionsPopover || (n._compiledTemplates.actionsPopover = s.compile(c));
                    var h = n._compiledTemplates.actionsPopover(t);
                    o = i(n.popover(h, e, !0)), u = ".list-block ul", a = ".list-button"
                } else {
                    if (n.params.modalActionsTemplate) n._compiledTemplates.actions || (n._compiledTemplates.actions = s.compile(n.params.modalActionsTemplate)), f = n._compiledTemplates.actions(t);
                    else {
                        var p = "";
                        for (var d = 0; d < t.length; d++)
                            for (var v = 0; v < t[d].length; v++) {
                                v === 0 && (p += '<div class="actions-modal-group">');
                                var m = t[d][v],
                                    g = m.label ? "actions-modal-label" : "actions-modal-button";
                                m.bold && (g += " actions-modal-button-bold"), m.color && (g += " color-" + m.color), p += '<span class="' + g + '">' + m.text + "</span>", v === t[d].length - 1 && (p += "</div>")
                            }
                        f = '<div class="actions-modal">' + p + "</div>"
                    }
                    l.innerHTML = f, o = i(l).children(), i("body").append(o[0]), u = ".actions-modal-group", a = ".actions-modal-button"
                }
                var y = o.find(u);
                return y.each(function(e, s) {
                    var u = e;
                    i(s).children().each(function(e, s) {
                        var f = e,
                            l = t[u][f],
                            c;
                        !r && i(s).is(a) && (c = i(s)), r && i(s).find(a).length > 0 && (c = i(s).find(a)), c && c.on("click", function(e) {
                            l.close !== !1 && n.closeModal(o), l.onClick && l.onClick(o, e)
                        })
                    })
                }), r || n.openModal(o), o[0]
            }, n.popover = function(e, t, r) {
                function o() {
                    e.css({
                        left: "",
                        top: ""
                    });
                    var n = e.width(),
                        r = e.height(),
                        s = e.find(".popover-angle"),
                        o = s.width() / 2;
                    s.removeClass("on-left on-right on-top on-bottom").css({
                        left: "",
                        top: ""
                    });
                    var u = t.outerWidth(),
                        a = t.outerHeight(),
                        f = t.offset(),
                        l = t.parents(".page");
                    l.length > 0 && (f.top = f.top - l[0].scrollTop);
                    var c = i(window).height(),
                        h = i(window).width(),
                        p = 0,
                        d = 0,
                        v = 0,
                        m = "top";
                    r + o < f.top ? p = f.top - r - o : r + o < c - f.top - a ? (m = "bottom", p = f.top + a + o) : (m = "middle", p = a / 2 + f.top - r / 2, v = p, p < 0 ? p = 5 : p + r > c && (p = c - r - 5), v -= p), m === "top" || m === "bottom" ? (d = u / 2 + f.left - n / 2, v = d, d < 5 && (d = 5), d + n > h && (d = h - n - 5), m === "top" && s.addClass("on-bottom"), m === "bottom" && s.addClass("on-top"), v -= d, s.css({
                        left: n / 2 - o + v + "px"
                    })) : m === "middle" && (d = f.left - n - o, s.addClass("on-right"), d < 5 && (d = f.left + u + o, s.removeClass("on-right").addClass("on-left")), d + n > h && (d = h - n - 5, s.removeClass("on-right").addClass("on-left")), s.css({
                        top: r / 2 - o + v + "px"
                    })), e.css({
                        top: p + "px",
                        left: d + "px"
                    })
                }
                typeof r == "undefined" && (r = !0);
                if (typeof e == "string" && e.indexOf("<") >= 0) {
                    var s = document.createElement("div");
                    s.innerHTML = i.trim(e);
                    if (!(s.childNodes.length > 0)) return !1;
                    e = s.childNodes[0], r && e.classList.add("remove-on-close"), i("body").append(e)
                }
                return e = i(e), t = i(t), e.length === 0 || t.length === 0 ? !1 : (e.find(".popover-angle").length === 0 && e.append('<div class="popover-angle"></div>'), e.show(), o(), i(window).on("resize", o), e.on("close", function() {
                    i(window).off("resize", o)
                }), e.find("." + n.params.viewClass).length > 0 && n.sizeNavbars(e.find("." + n.params.viewClass)[0]), n.openModal(e), e[0])
            }, n.popup = function(e, t) {
                typeof t == "undefined" && (t = !0);
                if (typeof e == "string" && e.indexOf("<") >= 0) {
                    var r = document.createElement("div");
                    r.innerHTML = i.trim(e);
                    if (!(r.childNodes.length > 0)) return !1;
                    e = r.childNodes[0], t && e.classList.add("remove-on-close"), i("body").append(e)
                }
                return e = i(e), e.length === 0 ? !1 : (e.show(), e.find("." + n.params.viewClass).length > 0 && n.sizeNavbars(e.find("." + n.params.viewClass)[0]), n.openModal(e), e[0])
            }, n.loginScreen = function(e) {
                return e || (e = ".login-screen"), e = i(e), e.length === 0 ? !1 : (e.show(), e.find("." + n.params.viewClass).length > 0 && n.sizeNavbars(e.find("." + n.params.viewClass)[0]), n.openModal(e), e[0])
            }, n.openModal = function(e) {
                e = i(e);
                var t = e.hasClass("popover"),
                    n = e.hasClass("popup"),
                    r = e.hasClass("login-screen");
                !t && !n && !r && e.css({
                    marginTop: -Math.round(e.outerHeight() / 2) + "px"
                });
                var s;
                r || (i(".modal-overlay").length === 0 && !n && i("body").append('<div class="modal-overlay"></div>'), i(".popup-overlay").length === 0 && n && i("body").append('<div class="popup-overlay"></div>'), s = n ? i(".popup-overlay") : i(".modal-overlay"));
                var o = e[0].clientLeft;
                return e.trigger("open"), r || s.addClass("modal-overlay-visible"), e.removeClass("modal-out").addClass("modal-in").transitionEnd(function(t) {
                    e.hasClass("modal-out") ? e.trigger("closed") : e.trigger("opened")
                }), !0
            }, n.closeModal = function(e) {
                e = i(e || ".modal-in");
                if (typeof e != "undefined" && e.length === 0) return;
                var t = e.hasClass("popover"),
                    n = e.hasClass("popup"),
                    r = e.hasClass("login-screen"),
                    s = e.hasClass("remove-on-close"),
                    o = n ? i(".popup-overlay") : i(".modal-overlay");
                return n ? e.length === i(".popup.modal-in").length && o.removeClass("modal-overlay-visible") : o.removeClass("modal-overlay-visible"), e.trigger("close"), t ? (e.removeClass("modal-in modal-out").trigger("closed").hide(), s && e.remove()) : e.removeClass("modal-in").addClass("modal-out").transitionEnd(function(t) {
                    e.hasClass("modal-out") ? e.trigger("closed") : e.trigger("opened"), n || r ? (e.removeClass("modal-out").hide(), s && e.length > 0 && e.remove()) : e.remove()
                }), !0
            }, n.allowPanelOpen = !0, n.openPanel = function(e) {
                function a() {
                    o.transitionEnd(function(e) {
                        i(e.target).is(o) ? (t.hasClass("active") ? t.trigger("opened") : t.trigger("closed"), n.allowPanelOpen = !0) : a()
                    })
                }
                if (!n.allowPanelOpen) return !1;
                var t = i(".panel-" + e);
                if (t.length === 0 || t.hasClass("active")) return !1;
                n.closePanel(), n.allowPanelOpen = !1;
                var r = t.hasClass("panel-reveal") ? "reveal" : "cover";
                t.css({
                    display: "block"
                }).addClass("active"), t.trigger("open"), t.find("." + n.params.viewClass).length > 0 && n.sizeNavbars && n.sizeNavbars(t.find("." + n.params.viewClass)[0]);
                var s = t[0].clientLeft,
                    o = r === "reveal" ? i("." + n.params.viewsClass) : t,
                    u = !1;
                return a(), i("body").addClass("with-panel-" + e + "-" + r), !0
            }, n.closePanel = function() {
                var e = i(".panel.active");
                if (e.length === 0) return !1;
                var t = e.hasClass("panel-reveal") ? "reveal" : "cover",
                    r = e.hasClass("panel-left") ? "left" : "right";
                e.removeClass("active");
                var s = t === "reveal" ? i("." + n.params.viewsClass) : e;
                e.trigger("close"), n.allowPanelOpen = !1, s.transitionEnd(function() {
                    if (e.hasClass("active")) return;
                    e.css({
                        display: ""
                    }), e.trigger("closed"), i("body").removeClass("panel-closing"), n.allowPanelOpen = !0
                }), i("body").addClass("panel-closing").removeClass("with-panel-" + r + "-" + t)
            }, n.initSwipePanels = function() {
                function g(t) {
                    if (!n.allowPanelOpen || !n.params.swipePanel || r) return;
                    if (i(".modal-in, .photo-browser-in").length > 0) return;
                    if (!n.params.swipePanelCloseOpposite && i(".panel.active").length > 0 && !e.hasClass("active")) return;
                    u.x = t.type === "touchstart" ? t.targetTouches[0].pageX : t.pageX, u.y = t.type === "touchstart" ? t.targetTouches[0].pageY : t.pageY, n.params.swipePanelCloseOpposite && (i(".panel.active").length > 0 ? v = i(".panel.active").hasClass("panel-left") ? "left" : "right" : v = n.params.swipePanel), e = i(".panel.panel-" + v);
                    if (n.params.swipePanelActiveArea) {
                        if (v === "left" && u.x > n.params.swipePanelActiveArea) return;
                        if (v === "right" && u.x < window.innerWidth - n.params.swipePanelActiveArea) return
                    }
                    s = !1, r = !0, o = undefined, a = (new Date).getTime(), d = undefined
                }

                function y(i) {
                    if (!r) return;
                    if (i.f7PreventPanelSwipe) return;
                    var g = i.type === "touchmove" ? i.targetTouches[0].pageX : i.pageX,
                        y = i.type === "touchmove" ? i.targetTouches[0].pageY : i.pageY;
                    typeof o == "undefined" && (o = !!(o || Math.abs(y - u.y) > Math.abs(g - u.x)));
                    if (o) {
                        r = !1;
                        return
                    }
                    if (!d) {
                        g > u.x ? d = "to-right" : d = "to-left";
                        if (v === "left" && d === "to-left" && !e.hasClass("active") || v === "right" && d === "to-right" && !e.hasClass("active")) {
                            r = !1;
                            return
                        }
                    }
                    if (n.params.swipePanelNoFollow) {
                        var b = (new Date).getTime() - a;
                        b < 300 && (d === "to-left" && (v === "right" && n.openPanel(v), v === "left" && e.hasClass("active") && n.closePanel()), d === "to-right" && (v === "left" && n.openPanel(v), v === "right" && e.hasClass("active") && n.closePanel())), r = !1, s = !1;
                        return
                    }
                    s || (p = e.hasClass("panel-cover") ? "cover" : "reveal", e.show(), t.show(), c = e.hasClass("active"), h = e.width(), e.transition(0), e.find("." + n.params.viewClass).length > 0 && n.sizeNavbars && n.sizeNavbars(e.find("." + n.params.viewClass)[0])), s = !0, i.preventDefault();
                    var w = c ? 0 : -n.params.swipePanelThreshold;
                    v === "right" && (w = -w), f = g - u.x + w, v === "right" ? (l = f - (c ? h : 0), l > 0 && (l = 0), l < -h && (l = -h)) : (l = f + (c ? h : 0), l < 0 && (l = 0), l > h && (l = h)), p === "reveal" ? (m.transform("translate3d(" + l + "px,0,0)").transition(0), t.transform("translate3d(" + l + "px,0,0)"), n.pluginHook("swipePanelSetTransform", m[0], e[0], Math.abs(l / h))) : (e.transform("translate3d(" + l + "px,0,0)").transition(0), n.pluginHook("swipePanelSetTransform", m[0], e[0], Math.abs(l / h)))
                }

                function b(o) {
                    if (!r || !s) {
                        r = !1, s = !1;
                        return
                    }
                    r = !1, s = !1;
                    var u = (new Date).getTime() - a,
                        f, d = l === 0 || Math.abs(l) === h;
                    c ? l === -h ? f = "reset" : u < 300 && Math.abs(l) >= 0 || u >= 300 && Math.abs(l) <= h / 2 ? v === "left" && l === h ? f = "reset" : f = "swap" : f = "reset" : l === 0 ? f = "reset" : u < 300 && Math.abs(l) > 0 || u >= 300 && Math.abs(l) >= h / 2 ? f = "swap" : f = "reset", f === "swap" && (n.allowPanelOpen = !0, c ? (n.closePanel(), d && (e.css({
                        display: ""
                    }), i("body").removeClass("panel-closing"))) : n.openPanel(v), d && (n.allowPanelOpen = !0));
                    if (f === "reset")
                        if (c) n.allowPanelOpen = !0, n.openPanel(v);
                        else {
                            n.closePanel();
                            if (d) n.allowPanelOpen = !0, e.css({
                                display: ""
                            });
                            else {
                                var g = p === "reveal" ? m : e;
                                i("body").addClass("panel-closing"), g.transitionEnd(function() {
                                    n.allowPanelOpen = !0, e.css({
                                        display: ""
                                    }), i("body").removeClass("panel-closing")
                                })
                            }
                        }
                    p === "reveal" && (m.transition(""), m.transform("")), e.transition("").transform(""), t.css({
                        display: ""
                    }).transform("")
                }
                var e = i(".panel.panel-" + n.params.swipePanel);
                if (e.length === 0) return;
                var t = i(".panel-overlay"),
                    r, s, o, u = {},
                    a, f, l, c, h, p, d, v, m = i("." + n.params.viewsClass);
                v = n.params.swipePanel, i(document).on(n.touchEvents.start, g), i(document).on(n.touchEvents.move, y), i(document).on(n.touchEvents.end, b)
            }, n.initMessages = function(e) {
                var t = i(e),
                    r = t.find(".messages");
                if (r.length === 0) return;
                var s = t.find(".page-content");
                r.hasClass("new-messages-first") || (s[0].scrollTop = r.height() - s.height()), r.hasClass("messages-auto-layout") && n.updateMessagesLayout(r)
            }, n.addMessage = function(e) {
                e = e || {}, e.type = e.type || "sent";
                if (!e.text || e.length === 0) return !1;
                var t = i(".messages-content");
                if (t.length === 0) return !1;
                var r = t.find(".messages"),
                    s = r.hasClass("new-messages-first"),
                    o = "";
                e.day && (o += '<div class="messages-date">' + e.day + (e.time ? "," : "") + (e.time ? " <span>" + e.time + "</span>" : "") + "</div>");
                var u = e.text.indexOf("<img") >= 0 ? "message-pic" : "",
                    a = e.avatar ? "message-with-avatar" : "",
                    f = "message message-" + e.type + " " + u + " " + a + " message-appear";
                o += '<div class="' + f + '">' + (e.name ? '<div class="message-name">' + e.name + "</div>" : "") + '<div class="message-text">' + e.text + "</div>" + (e.avatar ? '<div class="message-avatar" style="background-image:url(' + e.avatar + ')"></div>' : "") + "</div>", s ? r.prepend(o) : r.append(o), r.hasClass("messages-auto-layout") && n.updateMessagesLayout(r), n.scrollMessagesContainer(t)
            }, n.updateMessagesLayout = function(e) {
                e.find(".message").each(function() {
                    var e = i(this);
                    e.find(".message-text img").length > 0 && e.addClass("message-pic"), e.find(".message-avatar").length > 0 && e.addClass("message-with-avatar")
                }), e.find(".message-sent").each(function() {
                    var e = i(this),
                        t = e.next(".message-sent"),
                        n = e.prev(".message-sent");
                    t.length === 0 ? e.addClass("message-last message-with-tail") : e.removeClass("message-last message-with-tail"), n.length === 0 ? e.addClass("message-first") : e.removeClass("message-first"), n.length > 0 && n.find(".message-name").length > 0 && e.find(".message-name").length > 0 && n.find(".message-name").text() !== e.find(".message-name").text() && (n.addClass("message-last message-with-tail"), e.addClass("message-first"))
                }), e.find(".message-received").each(function() {
                    var e = i(this),
                        t = e.next(".message-received"),
                        n = e.prev(".message-received");
                    t.length === 0 ? e.addClass("message-last message-with-tail") : e.removeClass("message-last message-with-tail"), n.length === 0 ? e.addClass("message-first") : e.removeClass("message-first"), n.length > 0 && n.find(".message-name").length > 0 && e.find(".message-name").length > 0 && n.find(".message-name").text() !== e.find(".message-name").text() && (n.addClass("message-last message-with-tail"), e.addClass("message-first"))
                })
            }, n.scrollMessagesContainer = function(e) {
                e = i(e || ".messages-content");
                if (e.length === 0) return;
                var t = e.find(".messages"),
                    n = t.hasClass("new-messages-first"),
                    r = e[0].scrollTop,
                    s = n ? 0 : t.height() - e.height();
                if (s === r) return;
                e.scrollTop(s, 300)
            }, n.swipeoutOpenedEl = undefined, n.allowSwipeout = !0, n.initSwipeout = function(e) {
                function N(e) {
                    if (!n.allowSwipeout) return;
                    r = !1, t = !0, s = undefined, o.x = e.type === "touchstart" ? e.targetTouches[0].pageX : e.pageX, o.y = e.type === "touchstart" ? e.targetTouches[0].pageY : e.pageY, u = (new Date).getTime()
                }

                function C(e) {
                    if (!t) return;
                    var u = e.type === "touchmove" ? e.targetTouches[0].pageX : e.pageX,
                        N = e.type === "touchmove" ? e.targetTouches[0].pageY : e.pageY;
                    typeof s == "undefined" && (s = !!(s || Math.abs(N - o.y) > Math.abs(u - o.x)));
                    if (s) {
                        t = !1;
                        return
                    }
                    if (!r) {
                        if (i(".list-block.sortable-opened").length > 0) return;
                        f = i(this), l = f.find(".swipeout-content"), c = f.find(".swipeout-actions-right"), h = f.find(".swipeout-actions-left"), p = d = y = b = S = E = null, h.length > 0 && (p = h.width(), y = h.children("a"), E = h.find(".swipeout-overswipe")), c.length > 0 && (d = c.width(), b = c.children("a"), S = c.find(".swipeout-overswipe")), m = f.hasClass("swipeout-opened"), m && (g = f.find(".swipeout-actions-left.swipeout-actions-opened").length > 0 ? "left" : "right"), f.removeClass("transitioning"), n.params.swipeoutNoFollow || (f.find(".swipeout-actions-opened").removeClass("swipeout-actions-opened"), f.removeClass("swipeout-opened"))
                    }
                    r = !0, e.preventDefault(), a = u - o.x, v = a, m && (g === "right" ? v -= d : v += p);
                    if (v > 0 && h.length === 0 || v < 0 && c.length === 0) {
                        if (!m) {
                            t = r = !1;
                            return
                        }
                        v = 0
                    }
                    v < 0 ? w = "to-left" : v > 0 ? w = "to-right" : w ? w = w : w = "to-left";
                    var C, k, L;
                    e.f7PreventPanelSwipe = !0;
                    if (n.params.swipeoutNoFollow) {
                        m ? (g === "right" && a > 0 && n.swipeoutClose(f), g === "left" && a < 0 && n.swipeoutClose(f)) : (a < 0 && c.length > 0 && n.swipeoutOpen(f, "right"), a > 0 && h.length > 0 && n.swipeoutOpen(f, "left")), t = !1, r = !1;
                        return
                    }
                    x = !1, T = !1;
                    var A;
                    if (c.length > 0) {
                        L = v / d, v < -d && (v = -d - Math.pow(-v - d, .8), S.length > 0 && (T = !0));
                        for (C = 0; C < b.length; C++) typeof b[C]._buttonOffset == "undefined" && (b[C]._buttonOffset = b[C].offsetLeft), k = b[C]._buttonOffset, A = i(b[C]), S.length > 0 && A.hasClass("swipeout-overswipe") && A.css({
                            left: (T ? -k : 0) + "px"
                        }), A.transform("translate3d(" + (v - k * (1 + Math.max(L, -1))) + "px,0,0)")
                    }
                    if (h.length > 0) {
                        L = v / p, v > p && (v = p + Math.pow(v - p, .8), E.length > 0 && (x = !0));
                        for (C = 0; C < y.length; C++) typeof y[C]._buttonOffset == "undefined" && (y[C]._buttonOffset = p - y[C].offsetLeft - y[C].offsetWidth), k = y[C]._buttonOffset, A = i(y[C]), E.length > 0 && A.hasClass("swipeout-overswipe") && A.css({
                            left: (x ? k : 0) + "px"
                        }), A.css("z-index", y.length - C).transform("translate3d(" + (v + k * (1 - Math.min(L, 1))) + "px,0,0)")
                    }
                    l.transform("translate3d(" + v + "px,0,0)")
                }

                function k(e) {
                    if (!t || !r) {
                        t = !1, r = !1;
                        return
                    }
                    t = !1, r = !1;
                    var s = (new Date).getTime() - u,
                        o, g, E, S, N;
                    E = w === "to-left" ? c : h, g = w === "to-left" ? d : p, s < 300 && (a < -10 && w === "to-left" || a > 10 && w === "to-right") || s >= 300 && Math.abs(v) > g / 2 ? o = "open" : o = "close", s < 300 && (Math.abs(v) === 0 && (o = "close"), Math.abs(v) === g && (o = "open"));
                    if (o === "open") {
                        n.swipeoutOpenedEl = f, f.trigger("open"), f.addClass("swipeout-opened transitioning");
                        var C = w === "to-left" ? -g : g;
                        l.transform("translate3d(" + C + "px,0,0)"), E.addClass("swipeout-actions-opened"), S = w === "to-left" ? b : y;
                        if (S)
                            for (N = 0; N < S.length; N++) i(S[N]).transform("translate3d(" + C + "px,0,0)");
                        T && c.find(".swipeout-overswipe")[0].click(), x && h.find(".swipeout-overswipe")[0].click()
                    } else f.trigger("close"), n.swipeoutOpenedEl = undefined, f.addClass("transitioning").removeClass("swipeout-opened"), l.transform(""), E.removeClass("swipeout-actions-opened");
                    var k;
                    if (y && y.length > 0 && y !== S)
                        for (N = 0; N < y.length; N++) k = y[N]._buttonOffset, typeof k == "undefined" && (y[N]._buttonOffset = p - y[N].offsetLeft - y[N].offsetWidth), i(y[N]).transform("translate3d(" + k + "px,0,0)");
                    if (b && b.length > 0 && b !== S)
                        for (N = 0; N < b.length; N++) k = b[N]._buttonOffset, typeof k == "undefined" && (b[N]._buttonOffset = b[N].offsetLeft), i(b[N]).transform("translate3d(" + -k + "px,0,0)");
                    l.transitionEnd(function(e) {
                        if (m && o === "open" || closed && o === "close") return;
                        f.trigger(o === "open" ? "opened" : "closed"), m && o === "close" && (c.length > 0 && b.transform(""), h.length > 0 && y.transform(""))
                    })
                }
                var t, r, s, o = {},
                    u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x, T;
                i(document).on(n.touchEvents.start, function(e) {
                    if (n.swipeoutOpenedEl) {
                        var t = i(e.target);
                        n.swipeoutOpenedEl.is(t[0]) || t.parents(".swipeout").is(n.swipeoutOpenedEl) || t.hasClass("modal-in") || t.parents(".modal-in").length > 0 || t.hasClass("modal-overlay") || n.swipeoutClose(n.swipeoutOpenedEl)
                    }
                }), e ? (i(e).on(n.touchEvents.start, N), i(e).on(n.touchEvents.move, C), i(e).on(n.touchEvents.end, k)) : (i(document).on(n.touchEvents.start, ".list-block li.swipeout", N), i(document).on(n.touchEvents.move, ".list-block li.swipeout", C), i(document).on(n.touchEvents.end, ".list-block li.swipeout", k))
            }, n.swipeoutOpen = function(e, t) {
                e = i(e);
                if (e.length === 0) return;
                e.length > 1 && (e = i(e[0]));
                if (!e.hasClass("swipeout") || e.hasClass("swipeout-opened")) return;
                t || (e.find(".swipeout-actions-right").length > 0 ? t = "right" : t = "left");
                var r = e.find(".swipeout-actions-" + t);
                if (r.length === 0) return;
                e.trigger("open").addClass("swipeout-opened").removeClass("transitioning"), r.addClass("swipeout-actions-opened");
                var s = r.children("a"),
                    o = r.width(),
                    u = t === "right" ? -o : o,
                    a;
                if (s.length > 1) {
                    for (a = 0; a < s.length; a++) t === "right" ? i(s[a]).transform("translate3d(" + -s[a].offsetLeft + "px,0,0)") : i(s[a]).css("z-index", s.length - a).transform("translate3d(" + (o - s[a].offsetWidth - s[a].offsetLeft) + "px,0,0)");
                    var f = s[1].clientLeft
                }
                e.addClass("transitioning");
                for (a = 0; a < s.length; a++) i(s[a]).transform("translate3d(" + u + "px,0,0");
                e.find(".swipeout-content").transform("translate3d(" + u + "px,0,0)").transitionEnd(function() {
                    e.trigger("opened")
                }), n.swipeoutOpenedEl = e
            }, n.swipeoutClose = function(e) {
                e = i(e);
                if (e.length === 0) return;
                if (!e.hasClass("swipeout-opened")) return;
                var t = e.find(".swipeout-actions-opened").hasClass("swipeout-actions-right") ? "right" : "left",
                    r = e.find(".swipeout-actions-opened").removeClass("swipeout-actions-opened"),
                    s = r.children("a"),
                    o = r.width();
                n.allowSwipeout = !1, e.trigger("close"), e.removeClass("swipeout-opened").addClass("transitioning"), e.find(".swipeout-content").transform("translate3d(0px,0,0)").transitionEnd(function() {
                    e.trigger("closed"), s.transform(""), n.allowSwipeout = !0
                });
                for (var u = 0; u < s.length; u++) t === "right" ? i(s[u]).transform("translate3d(" + -s[u].offsetLeft + "px,0,0)") : i(s[u]).transform("translate3d(" + (o - s[u].offsetWidth - s[u].offsetLeft) + "px,0,0)"), i(s[u]).css({
                    left: "0px"
                });
                n.swipeoutOpenedEl && n.swipeoutOpenedEl[0] === e[0] && (n.swipeoutOpenedEl = undefined)
            }, n.swipeoutDelete = function(e) {
                e = i(e);
                if (e.length === 0) return;
                e.length > 1 && (e = i(e[0])), n.swipeoutOpenedEl = undefined, e.trigger("delete"), e.css({
                    height: e.outerHeight() + "px"
                });
                var t = e[0].clientLeft;
                e.css({
                    height: "0px"
                }).addClass("deleting transitioning").transitionEnd(function() {
                    e.trigger("deleted"), e.remove()
                });
                var r = "-100%";
                e.find(".swipeout-content").transform("translate3d(" + r + ",0,0)")
            }, n.sortableToggle = function(e) {
                return e = i(e), e.length === 0 && (e = i(".list-block.sortable")), e.toggleClass("sortable-opened"), e.hasClass("sortable-opened") ? e.trigger("open") : e.trigger("close"), e
            }, n.sortableOpen = function(e) {
                return e = i(e), e.length === 0 && (e = i(".list-block.sortable")), e.addClass("sortable-opened"), e.trigger("open"), e
            }, n.sortableClose = function(e) {
                return e = i(e), e.length === 0 && (e = i(".list-block.sortable")), e.removeClass("sortable-opened"), e.trigger("close"), e
            }, n.initSortable = function() {
                function p(s) {
                    t = !1, e = !0, r = s.type === "touchstart" ? s.targetTouches[0].pageY : s.pageY, o = i(this).parent(), u = o.parent().find("li"), h = o.parents(".sortable"), s.preventDefault(), n.allowsPanelOpen = n.allowSwipeout = !1
                }

                function d(n) {
                    if (!e || !o) return;
                    var p = n.type === "touchmove" ? n.targetTouches[0].pageX : n.pageX,
                        d = n.type === "touchmove" ? n.targetTouches[0].pageY : n.pageY;
                    t || (o.addClass("sorting"), h.addClass("sortable-sorting"), a = o[0].offsetTop, f = o.parent().height() - o[0].offsetTop - o.height()), t = !0, n.preventDefault(), n.f7PreventPanelSwipe = !0, s = d - r;
                    var v = s;
                    v < -a && (v = -a), v > f && (v = f), o.transform("translate3d(0," + v + "px,0)"), c = l = undefined, u.each(function() {
                        var e = i(this);
                        if (e[0] === o[0]) return;
                        var t = e[0].offsetTop,
                            n = e.height(),
                            r = o[0].offsetTop + v;
                        r >= t - n / 2 && o.index() < e.index() ? (e.transform("translate3d(0,-100%,0)"), l = e, c = undefined) : r <= t + n / 2 && o.index() > e.index() ? (i(this).transform("translate3d(0,100%,0)"), l = undefined, c || (c = e)) : i(this).transform("translate3d(0, 0%,0)")
                    })
                }

                function v(r) {
                    n.allowsPanelOpen = n.allowSwipeout = !0;
                    if (!e || !t) {
                        e = !1, t = !1;
                        return
                    }
                    r.preventDefault(), u.transform(""), o.removeClass("sorting"), h.removeClass("sortable-sorting"), l && (o.insertAfter(l), o.trigger("sort")), c && (o.insertBefore(c), o.trigger("sort")), l = c = undefined, e = !1, t = !1
                }
                var e, t, r, s, o, u, a, f, l, c, h;
                i(document).on(n.touchEvents.start, ".list-block.sortable .sortable-handler", p), n.support.touch ? (i(document).on(n.touchEvents.move, ".list-block.sortable .sortable-handler", d), i(document).on(n.touchEvents.end, ".list-block.sortable .sortable-handler", v)) : (i(document).on(n.touchEvents.move, d), i(document).on(n.touchEvents.end, v))
            }, n.initSmartSelects = function(e) {
                var t = i(e);
                if (t.length === 0) return;
                var n = t.find(".smart-select");
                if (n.length === 0) return;
                n.each(function() {
                    var e = i(this),
                        t = e.find("select");
                    if (t.length === 0) return;
                    var n = t[0];
                    if (n.length === 0) return;
                    var r = [];
                    for (var s = 0; s < n.length; s++) n[s].selected && r.push(n[s].textContent.trim());
                    var o = e.find(".item-after");
                    o.length === 0 ? e.find(".item-inner").append('<div class="item-after">' + r.join(", ") + "</div>") : o.text(r)
                })
            }, n.smartSelectOpen = function(e) {
                function P(n) {
                    i(n).find('input[name="' + g + '"]').on("change", function() {
                        var n = this,
                            i = n.value,
                            s = [];
                        if (n.type === "checkbox") {
                            var u = [];
                            for (var a = 0; a < r.options.length; a++) {
                                var f = r.options[a];
                                f.value === i && (f.selected = n.checked), f.selected && s.push(f.textContent.trim())
                            }
                        } else s = [e.find('option[value="' + i + '"]').text()], r.value = i;
                        o.trigger("change"), e.find(".item-after").text(s.join(", ")), d && m === "radio" && t.router.back()
                    })
                }

                function H(e) {
                    var t = e.detail.page;
                    t.name === L && (i(document).off("pageInit", H), P(t.container))
                }
                e = i(e);
                if (e.length === 0) return;
                var t = e.parents("." + n.params.viewClass);
                if (t.length === 0) return;
                t = t[0].f7View;
                if (!t) return;
                var r = e.find("select")[0],
                    o = i(r);
                if (r.disabled || e.hasClass("disabled") || o.hasClass("disabled")) return;
                var u = {};
                u.length = r.length;
                var a;
                for (var f = 0; f < r.length; f++) a = i(r[f]), u[f] = {
                    value: r[f].value,
                    text: r[f].textContent.trim(),
                    selected: r[f].selected,
                    group: a.parent("optgroup")[0],
                    image: a.attr("data-option-image") || o.attr("data-option-image"),
                    icon: a.attr("data-option-icon") || o.attr("data-option-icon"),
                    disabled: r[f].disabled
                };
                var l = e.attr("data-open-in");
                l || (l = n.params.smartSelectInPopup ? "popup" : "page");
                var c = e.attr("data-page-title") || e.find(".item-title").text(),
                    h = e.attr("data-back-text") || n.params.smartSelectBackText,
                    p = e.attr("data-popup-close-text") || e.attr("data-back-text") || n.params.smartSelectPopupCloseText,
                    d = e.attr("data-back-onselect") ? e.attr("data-back-onselect") === "true" ? !0 : !1 : n.params.smartSelectBackOnSelect,
                    v = (new Date).getTime(),
                    m = r.multiple ? "checkbox" : "radio",
                    g = m + "-" + v,
                    y = "",
                    b;
                for (var w = 0; w < u.length; w++) {
                    if (u[w].disabled) continue;
                    var E = u[w].selected ? "checked" : "";
                    u[w].group && u[w].group !== b && (y += '<li class="item-divider">' + u[w].group.label + "</li>", b = u[w].group);
                    var S = "";
                    m === "checkbox" && (S += '<i class="icon icon-form-checkbox"></i>'), u[w].icon && (S += '<i class="icon ' + u[w].icon + '"></i>'), u[w].image && (S += '<img src="' + u[w].image + '">'), y += '<li><label class="label-' + m + ' item-content">' + '<input type="' + m + '" name="' + g + '" value="' + u[w].value + '" ' + E + ">" + (S !== "" ? '<div class="item-media">' + S + "</div>" : "") + '<div class="item-inner">' + '<div class="item-title">' + u[w].text + "</div>" + "</div>" + "</label>" + "</li>"
                }
                var x = l === "popup" ? n.params.smartSelectPopupCloseTemplate.replace(/{{closeText}}/g, p) : n.params.smartSelectBackTemplate.replace(/{{backText}}/g, h),
                    T = '<div class="navbar">  <div class="navbar-inner">' + x + '    <div class="center sliding">' + c + "</div>" + "  </div>" + "</div>";
                n.params.smartSelectNavbarTemplate && (n._compiledTemplates.smartSelectNavbar || (n._compiledTemplates.smartSelectNavbar = s.compile(n.params.smartSelectNavbarTemplate)), T = n._compiledTemplates.smartSelectNavbar({
                    pageTitle: c,
                    backText: h,
                    openIn: l,
                    inPopup: l === "popup",
                    inPage: l === "page",
                    id: v,
                    inputType: m
                }));
                var N = "",
                    C = "",
                    k;
                l === "page" ? (k = "static", e.parents(".navbar-through").length > 0 && (k = "through"), e.parents(".navbar-fixed").length > 0 && (k = "fixed"), C = e.parents(".page").hasClass("no-toolbar") ? "no-toolbar" : "", N = e.parents(".page").hasClass("no-navbar") ? "no-navbar" : "navbar-" + k) : k = "fixed";
                var L = "smart-select-" + g,
                    A = typeof e.data("searchbar") == "undefined" ? n.params.smartSelectSearchbar : e.data("searchbar") === "true" ? !0 : !1,
                    O, M;
                A && (O = e.data("searchbar-placeholder") || "Search", M = e.data("searchbar-cancel") || "Cancel");
                var _ = '<form class="searchbar" data-search-list=".smart-select-list-' + v + '" data-search-in=".item-title">' + '<div class="searchbar-input">' + '<input type="search" placeholder="' + O + '">' + '<a href="#" class="searchbar-clear"></a>' + "</div>" + '<a href="#" class="searchbar-cancel">' + M + "</a>" + "</form>" + '<div class="searchbar-overlay"></div>',
                    D = (k === "through" ? T : "") + '<div class="pages">' + '  <div data-page="' + L + '" class="page smart-select-page ' + N + " " + C + '">' + (k === "fixed" ? T : "") + (A ? _ : "") + '    <div class="page-content">' + (k === "static" ? T : "") + '      <div class="list-block smart-select-list-' + v + '">' + "        <ul>" + y + "        </ul>" + "      </div>" + "    </div>" + "  </div>" + "</div>";
                i(document).on("pageInit", H);
                if (l === "popup") {
                    var B = n.popup('<div class="popup smart-select-popup smart-select-popup-' + g + '">' + '<div class="view navbar-fixed">' + D + "</div>" + "</div>");
                    P(B)
                } else t.router.load({
                    content: D
                })
            }, n.initPullToRefresh = function(e) {
                function w(e) {
                    if (r) {
                        if (n.device.os !== "android") return;
                        if ("targetTouches" in e && e.targetTouches.length > 1) return
                    }
                    s = !1, r = !0, u = undefined, m = undefined, o.x = e.type === "touchstart" ? e.targetTouches[0].pageX : e.pageX, o.y = e.type === "touchstart" ? e.targetTouches[0].pageY : e.pageY, f = (new Date).getTime(), l = i(this)
                }

                function E(e) {
                    if (!r) return;
                    var t = e.type === "touchmove" ? e.targetTouches[0].pageX : e.pageX,
                        i = e.type === "touchmove" ? e.targetTouches[0].pageY : e.pageY;
                    typeof u == "undefined" && (u = !!(u || Math.abs(i - o.y) > Math.abs(t - o.x)));
                    if (!u) {
                        r = !1;
                        return
                    }
                    v = l[0].scrollTop, typeof m == "undefined" && v !== 0 && (m = !0);
                    if (!s) {
                        l.removeClass("transitioning");
                        if (v > l[0].offsetHeight) {
                            r = !1;
                            return
                        }
                        p = l.hasClass("refreshing") ? 44 : 0, l[0].scrollHeight === l[0].offsetHeight || n.device.os !== "ios" ? h = !0 : h = !1
                    }
                    s = !0, a = i - o.y;
                    if (!(a > 0 && v <= 0 || v < 0)) {
                        l.removeClass("pull-up pull-down"), c = !1;
                        return
                    }
                    n.device.os === "ios" && parseInt(n.device.osVersion.split(".")[0], 10) > 7 && v === 0 && !m && (h = !0), h && (e.preventDefault(), d = Math.pow(a, .85) + p, l.transform("translate3d(0," + d + "px,0)")), h && Math.pow(a, .85) > 44 || !h && a >= 88 ? (c = !0, l.addClass("pull-up").removeClass("pull-down")) : (c = !1, l.removeClass("pull-up").addClass("pull-down"))
                }

                function S(e) {
                    if (!r || !s) {
                        r = !1, s = !1;
                        return
                    }
                    d && (l.addClass("transitioning"), d = 0), l.transform(""), c ? (l.addClass("refreshing"), l.trigger("refresh", {
                        done: function() {
                            n.pullToRefreshDone(l)
                        }
                    })) : l.removeClass("pull-down"), r = !1, s = !1
                }

                function x() {
                    t.off(n.touchEvents.start, w), t.off(n.touchEvents.move, E), t.off(n.touchEvents.end, S), y.off("pageBeforeRemove", x)
                }
                var t = i(e);
                t.hasClass("pull-to-refresh-content") || (t = t.find(".pull-to-refresh-content"));
                if (t.length === 0) return;
                var r, s, o = {},
                    u, a, f, l, c = !1,
                    h = !1,
                    p = 0,
                    d, v, m, g, y = t.hasClass("page") ? t : t.parents(".page"),
                    b = !1;
                if (y.find(".navbar").length > 0 || y.parents(".navbar-fixed, .navbar-through").length > 0 || y.hasClass("navbar-fixed") || y.hasClass("navbar-through")) b = !0;
                y.hasClass("no-navbar") && (b = !1), b || t.addClass("pull-to-refresh-no-navbar"), t && (l = t), t.on(n.touchEvents.start, w), t.on(n.touchEvents.move, E), t.on(n.touchEvents.end, S);
                if (y.length === 0) return;
                y.on("pageBeforeRemove", x)
            }, n.pullToRefreshDone = function(e) {
                e = i(e), e.length === 0 && (e = i(".pull-to-refresh-content.refreshing")), e.removeClass("refreshing").addClass("transitioning"), e.transitionEnd(function() {
                    e.removeClass("transitioning pull-up pull-down")
                })
            }, n.pullToRefreshTrigger = function(e) {
                e = i(e), e.length === 0 && (e = i(".pull-to-refresh-content"));
                if (e.hasClass("refreshing")) return;
                e.addClass("transitioning refreshing"), e.trigger("refresh", {
                    done: function() {
                        n.pullToRefreshDone(e)
                    }
                })
            }, n.attachInfiniteScroll = function(e) {
                i(e).on("scroll", c)
            }, n.detachInfiniteScroll = function(e) {
                i(e).off("scroll", c)
            }, n.initInfiniteScroll = function(e) {
                function r() {
                    n.detachInfiniteScroll(t), e.off("pageBeforeRemove", r)
                }
                e = i(e);
                var t = e.find(".infinite-scroll");
                if (t.length === 0) return;
                n.attachInfiniteScroll(t), e.on("pageBeforeRemove", r)
            }, n.initScrollToolbars = function(e) {
                function y(i) {
                    if (e.hasClass("page-on-left")) return;
                    l = t[0].scrollTop, c = t[0].scrollHeight, h = t[0].offsetHeight, p = n.params.showBarsOnPageScrollEnd && l + h >= c - g, v = o.hasClass("hidden-navbar"), m = o.hasClass("hidden-toolbar"), f > l || p ? d = "show" : l > 44 ? d = "hide" : d = "show", d === "show" ? (u && r && v && (n.showNavbar(o), e.removeClass("no-navbar-by-scroll"), v = !1), a && s && m && (n.showToolbar(o), e.removeClass("no-toolbar-by-scroll"), m = !1)) : (u && r && !v && (n.hideNavbar(o), e.addClass("no-navbar-by-scroll"), v = !0), a && s && !m && (n.hideToolbar(o), e.addClass("no-toolbar-by-scroll"), m = !0)), f = l
                }
                e = i(e);
                var t = e.find(".page-content");
                if (t.length === 0) return;
                var r = n.params.hideNavbarOnPageScroll || t.hasClass("hide-navbar-on-scroll") || t.hasClass("hide-bars-on-scroll"),
                    s = n.params.hideToolbarOnPageScroll || t.hasClass("hide-toolbar-on-scroll") || t.hasClass("hide-bars-on-scroll");
                if (!r && !s) return;
                var o = t.parents("." + n.params.viewClass);
                if (o.length === 0) return;
                var u = o.find(".navbar").length > 0,
                    a = o.find(".toolbar").length > 0,
                    f, l;
                f = l = t[0].scrollTop;
                var c, h, p, d, v, m, g = a && s ? o.find(".toolbar")[0].offsetHeight : 0;
                t.on("scroll", y), t[0].f7ScrollToolbarsHandler = y
            }, n.destroyScrollToolbars = function(e) {
                e = i(e);
                var t = e.find(".page-content");
                if (t.length === 0) return;
                var n = t[0].f7ScrollToolbarsHandler;
                if (!n) return;
                t.off("scroll", t[0].f7ScrollToolbarsHandler)
            }, n.showTab = function(e, t) {
                var r = i(e);
                if (r.hasClass("active")) return !1;
                if (r.length === 0) return !1;
                var s = r.parent(".tabs");
                if (s.length === 0) return !1;
                n.allowSwipeout = !0;
                var o = s.parent().hasClass("tabs-animated-wrap");
                o && s.transform("translate3d(" + -r.index() * 100 + "%,0,0)");
                var u = s.children(".tab.active").removeClass("active");
                r.addClass("active"), r.trigger("show");
                if (!o && r.find(".navbar").length > 0) {
                    var a;
                    r.hasClass(n.params.viewClass) ? a = r[0] : a = r.parents("." + n.params.viewClass)[0], n.sizeNavbars(a)
                }
                t ? t = i(t) : (typeof e == "string" ? t = i('.tab-link[href="' + e + '"]') : t = i('.tab-link[href="#' + r.attr("id") + '"]'), (!t || t && t.length === 0) && i("[data-tab]").each(function() {
                    r.is(i(this).attr("data-tab")) && (t = i(this))
                }));
                if (t.length === 0) return;
                var f;
                if (u && u.length > 0) {
                    var l = u.attr("id");
                    l && (f = i('.tab-link[href="#' + l + '"]')), (!f || f && f.length === 0) && i("[data-tab]").each(function() {
                        u.is(i(this).attr("data-tab")) && (f = i(this))
                    })
                }
                return t && t.length > 0 && t.addClass("active"), f && f.length > 0 && f.removeClass("active"), !0
            }, n.accordionToggle = function(e) {
                e = i(e);
                if (e.length === 0) return;
                e.hasClass("accordion-item-expanded") ? n.accordionClose(e) : n.accordionOpen(e)
            }, n.accordionOpen = function(e) {
                e = i(e);
                var t = e.parents(".accordion-list"),
                    r = e.find(".accordion-item-content"),
                    s = t.find(".accordion-item-expanded");
                s.length > 0 && n.accordionClose(s), r.css("height", r[0].scrollHeight + "px").transitionEnd(function() {
                    if (e.hasClass("accordion-item-expanded")) {
                        r.transition(0), r.css("height", "auto");
                        var t = r[0].clientLeft;
                        r.transition(""), e.trigger("opened")
                    } else r.css("height", ""), e.trigger("closed")
                }), e.trigger("open"), e.addClass("accordion-item-expanded")
            }, n.accordionClose = function(e) {
                e = i(e);
                var t = e.find(".accordion-item-content");
                e.removeClass("accordion-item-expanded"), t.transition(0), t.css("height", t[0].scrollHeight + "px");
                var n = t[0].clientLeft;
                t.transition(""), t.css("height", "").transitionEnd(function() {
                    if (e.hasClass("accordion-item-expanded")) {
                        t.transition(0), t.css("height", "auto");
                        var n = t[0].clientLeft;
                        t.transition(""), e.trigger("opened")
                    } else t.css("height", ""), e.trigger("closed")
                }), e.trigger("close")
            }, n.initFastClicks = function() {
                function d(e) {
                    var t = i(e.target),
                        r = t.parents(n.params.activeStateElements);
                    return r.length > 0 ? r : t
                }

                function v() {
                    var e = c.parents(".page-content, .panel");
                    return e.length === 0 ? !1 : (e.prop("scrollHandlerSet") !== "yes" && (e.on("scroll", function() {
                        clearTimeout(h)
                    }), e.prop("scrollHandlerSet", "yes")), !0)
                }

                function m() {
                    c.addClass("active-state")
                }

                function g(e) {
                    c.removeClass("active-state")
                }

                function y(e) {
                    var t = "button checkbox file image radio submit input textarea".split(" ");
                    return document.activeElement && e !== document.activeElement && document.activeElement !== document.body ? t.indexOf(e.nodeName.toLowerCase()) >= 0 ? !1 : !0 : !1
                }

                function b(e) {
                    var t = i(e);
                    return e.nodeName.toLowerCase() === "input" && e.type === "file" ? !1 : t.hasClass("no-fastclick") || t.parents(".no-fastclick").length > 0 ? !1 : !0
                }

                function w(e) {
                    if (document.activeElement === e) return !1;
                    var t = e.nodeName.toLowerCase(),
                        r = "button checkbox file image radio submit".split(" ");
                    if (e.disabled || e.readOnly) return !1;
                    if (t === "textarea") return !0;
                    if (t === "select") return n.device.os === "android" ? !1 : !0;
                    if (t === "input" && r.indexOf(e.type) < 0) return !0
                }

                function E(e) {
                    e = i(e);
                    if (e.is("label") || e.parents("label").length > 0) {
                        if (n.device.os === "android") {
                            var t = n.device.osVersion.split(".");
                            return t[0] * 1 > 4 || t[0] * 1 === 4 && t[1] * 1 >= 4 ? !1 : !0
                        }
                        return !1
                    }
                    return !0
                }

                function S(e) {
                    d(e).addClass("active-state"), "which" in e && e.which === 3 && setTimeout(function() {
                        i(".active-state").removeClass("active-state")
                    }, 0)
                }

                function x(e) {
                    i(".active-state").removeClass("active-state")
                }

                function T(e) {
                    i(".active-state").removeClass("active-state")
                }

                function N(g) {
                    l = !1;
                    if (g.targetTouches.length > 1) return !0;
                    p = b(g.target);
                    if (!p) return o = !1, !0;
                    if (n.device.os === "ios") {
                        var w = window.getSelection();
                        if (w.rangeCount && w.focusNode !== document.body && (!w.isCollapsed || document.activeElement === w.focusNode)) return u = !0, !0;
                        u = !1
                    }
                    n.device.os === "android" && y(g.target) && document.activeElement.blur(), o = !0, s = g.target, r = (new Date).getTime(), e = g.targetTouches[0].pageX, t = g.targetTouches[0].pageY, n.device.os === "ios" && (a = undefined, i(s).parents().each(function() {
                        var e = this;
                        e.scrollHeight > e.offsetHeight && !a && (a = e, a.f7ScrollTop = a.scrollTop)
                    })), g.timeStamp - f < 200 && g.preventDefault(), n.params.activeState && (c = d(g), v(g) ? h = setTimeout(m, 80) : m())
                }

                function C(r) {
                    if (!o) return;
                    var i = !1,
                        u = n.params.fastClicksDistanceThreshold;
                    if (u) {
                        var a = r.targetTouches[0].pageX,
                            f = r.targetTouches[0].pageY;
                        if (Math.abs(a - e) > u || Math.abs(f - t) > u) i = !0
                    } else i = !0;
                    i && (o = !1, s = null, l = !0), n.params.activeState && (clearTimeout(h), g())
                }

                function k(e) {
                    clearTimeout(h);
                    if (!o) return !u && p && e.preventDefault(), !0;
                    if (document.activeElement === e.target) return !0;
                    u || e.preventDefault();
                    if (e.timeStamp - f < 200) return !0;
                    f = e.timeStamp, o = !1;
                    if (n.device.os === "ios" && a && a.scrollTop !== a.f7ScrollTop) return !1;
                    n.params.activeState && (m(), setTimeout(g, 0)), w(s) && s.focus(), e.preventDefault();
                    var t = e.changedTouches[0],
                        r = document.createEvent("MouseEvents"),
                        i = "click";
                    return n.device.os === "android" && s.nodeName.toLowerCase() === "select" && (i = "mousedown"), r.initMouseEvent(i, !0, !0, window, 1, t.screenX, t.screenY, t.clientX, t.clientY, !1, !1, !1, !1, 0, null), r.forwardedTouchEvent = !0, s.dispatchEvent(r), !1
                }

                function L(e) {
                    o = !1, s = null
                }

                function A(e) {
                    var t = !1;
                    return o ? (s = null, o = !1, !0) : e.target.type === "submit" && e.detail === 0 ? !0 : (s || (t = !0), document.activeElement === s && (t = !0), e.forwardedTouchEvent && (t = !0), e.cancelable || (t = !0), t || (e.stopImmediatePropagation(), e.stopPropagation(), s ? (E(s) || l) && e.preventDefault() : e.preventDefault(), s = null), t)
                }
                n.params.activeState && i("html").addClass("watch-active-state");
                var e, t, r, s, o, u, a, f, l, c, h, p;
                n.support.touch ? (document.addEventListener("click", A, !0), document.addEventListener("touchstart", N), document.addEventListener("touchmove", C), document.addEventListener("touchend", k), document.addEventListener("touchcancel", L)) : n.params.activeState && (document.addEventListener("mousedown", S), document.addEventListener("mousemove", x), document.addEventListener("mouseup", T))
            }, n.initClickEvents = function() {
                function e(e) {
                    function u(e) {
                        return e === "false" ? !1 : e === "true" ? !0 : undefined
                    }
                    var t = i(this),
                        r = t.attr("href"),
                        o = t[0].nodeName.toLowerCase() === "a";
                    if (o)
                        for (var a = 0; a < n.params.externalLinks.length; a++) {
                            if (t.hasClass(n.params.externalLinks[a])) return;
                            if (t[0].rel === n.params.externalLinks[a]) return
                        }
                    t.hasClass("smart-select") && n.smartSelectOpen && n.smartSelectOpen(t), t.hasClass("open-panel") && (i(".panel").length === 1 ? i(".panel").hasClass("panel-left") ? n.openPanel("left") : n.openPanel("right") : t.attr("data-panel") === "right" ? n.openPanel("right") : n.openPanel("left")), t.hasClass("close-panel") && n.closePanel(), t.hasClass("panel-overlay") && n.params.panelsCloseByOutside && n.closePanel();
                    if (t.hasClass("open-popover")) {
                        var f;
                        t.attr("data-popover") ? f = t.attr("data-popover") : f = ".popover", n.popover(f, t)
                    }
                    t.hasClass("close-popover") && n.closeModal(".popover.modal-in");
                    var l;
                    t.hasClass("open-popup") && (t.attr("data-popup") ? l = t.attr("data-popup") : l = ".popup", n.popup(l)), t.hasClass("close-popup") && (t.attr("data-popup") ? l = t.attr("data-popup") : l = ".popup.modal-in", n.closeModal(l));
                    var c;
                    t.hasClass("open-login-screen") && (t.attr("data-login-screen") ? c = t.attr("data-login-screen") : c = ".login-screen", n.loginScreen(c)), t.hasClass("close-login-screen") && n.closeModal(".login-screen.modal-in"), t.hasClass("modal-overlay") && (i(".modal.modal-in").length > 0 && n.params.modalCloseByOutside && n.closeModal(".modal.modal-in"), i(".actions-modal.modal-in").length > 0 && n.params.actionsCloseByOutside && n.closeModal(".actions-modal.modal-in"), i(".popover.modal-in").length > 0 && n.closeModal(".popover.modal-in")), t.hasClass("popup-overlay") && i(".popup.modal-in").length > 0 && n.params.popupCloseByOutside && n.closeModal(".popup.modal-in");
                    var h;
                    t.hasClass("tab-link") && (h = !0, n.showTab(t.attr("data-tab") || t.attr("href"), t));
                    if (t.hasClass("swipeout-delete"))
                        if (t.attr("data-confirm")) {
                            var p = t.attr("data-confirm"),
                                d = t.attr("data-confirm-title");
                            d ? n.confirm(p, d, function() {
                                n.swipeoutDelete(t.parents(".swipeout"))
                            }) : n.confirm(p, function() {
                                n.swipeoutDelete(t.parents(".swipeout"))
                            })
                        } else n.swipeoutDelete(t.parents(".swipeout"));
                    t.hasClass("toggle-sortable") && n.sortableToggle(t.data("sortable")), t.hasClass("open-sortable") && n.sortableOpen(t.data("sortable")), t.hasClass("close-sortable") && n.sortableClose(t.data("sortable"));
                    if (t.hasClass("accordion-item-toggle") || t.hasClass("item-link") && t.parent().hasClass("accordion-item")) {
                        var v = t.parents(".accordion-item");
                        v.length === 0 && (v = t.parents("li")), n.accordionToggle(v)
                    }
                    if (n.params.ajaxLinks && !t.is(n.params.ajaxLinks) || !o || !n.params.router) return;
                    o && e.preventDefault();
                    var m = r && r.length > 0 && r !== "#" && !h,
                        g = t.attr("data-template");
                    if (m || t.hasClass("back") || g) {
                        var y;
                        t.attr("data-view") ? y = i(t.attr("data-view"))[0].f7View : (y = t.parents("." + n.params.viewClass)[0] && t.parents("." + n.params.viewClass)[0].f7View, y && y.params.linksView && (y = i(y.params.linksView)[0].f7View));
                        if (!y)
                            for (var a = 0; a < n.views.length; a++) n.views[a].main && (y = n.views[a]);
                        if (!y) return;
                        var b;
                        if (!g) {
                            if (r.indexOf("#") === 0 && r !== "#") {
                                if (!y.params.domCache) return;
                                b = r.split("#")[1], r = undefined
                            }
                            if (r === "#" && !t.hasClass("back")) return
                        } else r = undefined;
                        var w;
                        t.attr("data-animatePages") ? w = u(t.attr("data-animatePages")) : (t.hasClass("with-animation") && (w = !0), t.hasClass("no-animation") && (w = !1));
                        var E = {
                            animatePages: w,
                            ignoreCache: u(t.attr("data-ignoreCache")),
                            force: u(t.attr("data-force")),
                            reload: u(t.attr("data-reload")),
                            reloadPrevious: u(t.attr("data-reloadPrevious")),
                            pageName: b,
                            url: r
                        };
                        if (n.params.template7Pages) {
                            E.contextName = t.attr("data-contextName");
                            var S = t.attr("data-context");
                            S && (E.context = JSON.parse(S))
                        }
                        g && g in s.templates && (E.template = s.templates[g]), t.hasClass("back") ? y.router.back(E) : y.router.load(E)
                    }
                }
                i(document).on("click", "a, .open-panel, .close-panel, .panel-overlay, .modal-overlay, .popup-overlay, .swipeout-delete, .close-popup, .open-popup, .open-popover, .open-login-screen, .close-login-screen .smart-select, .toggle-sortable, .open-sortable, .close-sortable, .accordion-item-toggle", e)
            }, n.initResize = function() {
                i(window).on("resize", n.resize), i(window).on("orientationchange", n.orientationchange)
            }, n.resize = function() {
                n.sizeNavbars && n.sizeNavbars(), h()
            }, n.orientationchange = function() {
                n.device && n.device.minimalUi && (window.orientation === 90 || window.orientation === -90) && (document.body.scrollTop = 0), h()
            }, n.formsData = {}, n.formStoreData = function(e, t) {
                n.formsData[e] = t, n.ls["f7form-" + e] = JSON.stringify(t)
            }, n.formDeleteData = function(e) {
                n.formsData[e] && (n.formsData[e] = "", delete n.formsData[e]), n.ls["f7form-" + e] && (n.ls["f7form-" + e] = "", n.ls.removeItem("f7form-" + e))
            }, n.formGetData = function(e) {
                if (n.ls["f7form-" + e]) return JSON.parse(n.ls["f7form-" + e]);
                if (n.formsData[e]) return n.formsData[e]
            }, n.formToJSON = function(e) {
                e = i(e);
                if (e.length !== 1) return !1;
                var t = {},
                    n = ["submit", "image", "button", "file"],
                    r = [];
                return e.find("input, select, textarea").each(function() {
                    var s = i(this),
                        o = s.attr("name"),
                        u = s.attr("type"),
                        a = this.nodeName.toLowerCase();
                    if (n.indexOf(u) >= 0) return;
                    if (r.indexOf(o) >= 0 || !o) return;
                    if (a === "select" && s.attr("multiple")) r.push(o), t[o] = [], e.find('select[name="' + o + '"] option').each(function() {
                        this.selected && t[o].push(this.value)
                    });
                    else switch (u) {
                        case "checkbox":
                            r.push(o), t[o] = [], e.find('input[name="' + o + '"]').each(function() {
                                this.checked && t[o].push(this.value)
                            });
                            break;
                        case "radio":
                            r.push(o), e.find('input[name="' + o + '"]').each(function() {
                                this.checked && (t[o] = this.value)
                            });
                            break;
                        default:
                            t[o] = s.val()
                    }
                }), t
            }, n.formFromJSON = function(e, t) {
                e = i(e);
                if (e.length !== 1) return !1;
                var n = ["submit", "image", "button", "file"],
                    r = [];
                e.find("input, select, textarea").each(function() {
                    var s = i(this),
                        o = s.attr("name"),
                        u = s.attr("type"),
                        a = this.nodeName.toLowerCase();
                    if (!t[o]) return;
                    if (n.indexOf(u) >= 0) return;
                    if (r.indexOf(o) >= 0 || !o) return;
                    if (a === "select" && s.attr("multiple")) r.push(o), e.find('select[name="' + o + '"] option').each(function() {
                        t[o].indexOf(this.value) >= 0 ? this.selected = !0 : this.selected = !1
                    });
                    else switch (u) {
                        case "checkbox":
                            r.push(o), e.find('input[name="' + o + '"]').each(function() {
                                t[o].indexOf(this.value) >= 0 ? this.checked = !0 : this.checked = !1
                            });
                            break;
                        case "radio":
                            r.push(o), e.find('input[name="' + o + '"]').each(function() {
                                t[o] === this.value ? this.checked = !0 : this.checked = !1
                            });
                            break;
                        default:
                            s.val(t[o])
                    }
                })
            }, n.initFormsStorage = function(e) {
                function r() {
                    var e = i(this),
                        t = e[0].id;
                    if (!t) return;
                    var r = n.formToJSON(e);
                    if (!r) return;
                    n.formStoreData(t, r), e.trigger("store", {
                        data: r
                    })
                }

                function s() {
                    t.off("change submit", r), e.off("pageBeforeRemove", s)
                }
                e = i(e);
                if (e.length === 0) return;
                var t = e.find("form.store-data");
                if (t.length === 0) return;
                t.each(function() {
                    var e = this.getAttribute("id");
                    if (!e) return;
                    var t = n.formGetData(e);
                    t && n.formFromJSON(this, t)
                }), t.on("change submit", r), e.on("pageBeforeRemove", s)
            }, i(document).on("submit change", "form.ajax-submit, form.ajax-submit-onchange", function(e) {
                var t = i(this);
                if (e.type === "change" && !t.hasClass("ajax-submit-onchange")) return;
                e.type === "submit" && e.preventDefault();
                var r = t.attr("method") || "GET",
                    s = t.attr("enctype"),
                    o = t.attr("action");
                if (!o) return;
                var u;
                r === "POST" ? u = new FormData(t[0]) : u = i.serializeObject(n.formToJSON(t[0]));
                var a = i.ajax({
                    method: r,
                    url: o,
                    contentType: s,
                    data: u,
                    success: function(e) {
                        t.trigger("submitted", {
                            data: e,
                            xhr: a
                        })
                    }
                })
            }), n.pushStateQueue = [], n.pushStateClearQueue = function() {
                if (n.pushStateQueue.length === 0) return;
                var e = n.pushStateQueue.pop(),
                    t;
                n.params.pushStateNoAnimation === !0 && (t = !1), e.action === "back" && n.router.back(e.view, {
                    animatePages: t
                }), e.action === "loadPage" && n.router.load(e.view, {
                    url: e.stateUrl,
                    animatePages: t,
                    pushState: !1
                }), e.action === "loadContent" && n.router.load(e.view, {
                    content: e.stateContent,
                    animatePages: t,
                    pushState: !1
                }), e.action === "loadPageName" && n.router.load(e.view, {
                    pageName: e.statePageName,
                    animatePages: t,
                    pushState: !1
                })
            }, n.initPushState = function() {
                function t(t) {
                    if (e) return;
                    var r;
                    for (var i = 0; i < n.views.length; i++) n.views[i].main && (r = n.views[i]);
                    if (!r) return;
                    var s = t.state;
                    s || (s = {
                        viewIndex: n.views.indexOf(r),
                        url: r.history[0]
                    });
                    if (s.viewIndex < 0) return;
                    var o = n.views[s.viewIndex],
                        u = s && s.url || undefined,
                        a = s && s.content || undefined,
                        f = s && s.pageName || undefined,
                        l;
                    n.params.pushStateNoAnimation === !0 && (l = !1), u !== o.url && (o.history.indexOf(u) >= 0 ? o.allowPageChange ? n.router.back(o, {
                        url: undefined,
                        animatePages: l,
                        pushState: !1,
                        preloadOnly: !1
                    }) : n.pushStateQueue.push({
                        action: "back",
                        view: o
                    }) : a ? o.allowPageChange ? n.router.load(o, {
                        content: a,
                        animatePages: l,
                        pushState: !1
                    }) : n.pushStateQueue.unshift({
                        action: "loadContent",
                        stateContent: a,
                        view: o
                    }) : f ? o.allowPageChange ? n.router.load(o, {
                        pageName: f,
                        animatePages: l,
                        pushState: !1
                    }) : n.pushStateQueue.unshift({
                        action: "loadPageName",
                        statePageName: f,
                        view: o
                    }) : o.allowPageChange ? n.router.load(o, {
                        url: u,
                        animatePages: l,
                        pushState: !1
                    }) : n.pushStateQueue.unshift({
                        action: "loadPage",
                        stateUrl: u,
                        view: o
                    }))
                }
                var e = !0;
                i(window).on("load", function() {
                    setTimeout(function() {
                        e = !1
                    }, 0)
                }), i(window).on("popstate", t)
            };
            var p = function(e, t) {
                var r = {
                    initialSlide: 0,
                    spaceBetween: 0,
                    speed: 300,
                    loop: !1,
                    slidesPerView: 1,
                    onlyExternal: !1,
                    direction: "horizontal",
                    paginationHide: !0,
                    slideClass: "slider-slide",
                    slideActiveClass: "slider-slide-active",
                    slideNextClass: "slider-slide-next",
                    slidePrevClass: "slider-slide-prev",
                    wrapperClass: "slider-wrapper",
                    bulletClass: "slider-pagination-bullet",
                    bulletActiveClass: "slider-pagination-active",
                    preventClicks: !0,
                    preventClicksPropagation: !0,
                    autoplay: !1,
                    autoplayDisableOnInteraction: !0
                };
                t = t || {};
                for (var s in r) typeof t[s] == "undefined" && (t[s] = r[s]);
                var o = this;
                o.params = t, o.container = i(e);
                if (o.container.length === 0) return;
                o.container[0].f7Slider = o, o.params.direction === "vertical" ? o.container.addClass("slider-container-vertical") : o.container.addClass("slider-container-horizontal"), o.wrapper = o.container.children("." + o.params.wrapperClass), o.params.pagination && (o.paginationContainer = i(o.params.pagination)), o.activeSlideIndex = o.previousSlideIndex = o.params.initialSlide || 0;
                var u = o.params.direction === "horizontal",
                    a = u ? n.rtl ? -1 : 1 : 1;
                o.updateSlides = function() {
                    o.slides = o.wrapper.children("." + o.params.slideClass);
                    if (o.params.spaceBetween !== 0) {
                        var e = n.rtl ? "marginLeft" : "marginRight";
                        u ? o.slides.css(e, o.params.spaceBetween + "px") : o.slides.css({
                            marginBottom: o.params.spaceBetween + "px"
                        })
                    }
                    if (o.params.slidesPerView > 1) {
                        var r = "(100% - " + (o.params.slidesPerView - 1) * t.spaceBetween + "px)/" + o.params.slidesPerView;
                        u ? (o.slides.css("width", "-webkit-calc(" + r + ")"), o.slides.css("width", "-moz-calc(" + r + ")"), o.slides.css("width", "calc(" + r + ")")) : (o.slides.css("height", "-webkit-calc(" + r + ")"), o.slides.css("height", "-moz-calc(" + r + ")"), o.slides.css("height", "calc(" + r + ")"))
                    }
                    o.isFirst = o.activeSlideIndex === 0, o.isLast = o.activeSlideIndex === o.slides.length - o.params.slidesPerView
                }, o.updatePagination = function() {
                    if (o.paginationContainer && o.paginationContainer.length > 0) {
                        var e = "",
                            t = o.slides.length - o.params.slidesPerView + 1;
                        o.params.loop && (t = o.slides.length - o.loopedSlides * 2);
                        for (var n = 0; n < t; n++) e += '<span class="' + o.params.bulletClass + '"></span>';
                        o.paginationContainer.html(e), o.bullets = o.paginationContainer.find("." + o.params.bulletClass)
                    }
                }, o.updateSize = function() {
                    o.width = o.container[0].offsetWidth, o.height = o.container[0].offsetHeight, o.size = u ? o.width : o.height
                }, o.attachEvents = function(e) {
                    var t = e ? "off" : "on";
                    o.container[t](n.touchEvents.start, o.onTouchStart), o.container[t](n.touchEvents.move, o.onTouchMove), o.container[t](n.touchEvents.end, o.onTouchEnd), i(window)[t]("resize", o.onResize), o.params.nextButton && i(o.params.nextButton)[t]("click", o.onClickNext), o.params.prevButton && i(o.params.prevButton)[t]("click", o.onClickPrev), o.params.indexButton && i(o.params.indexButton)[t]("click", o.onClickIndex), (o.params.preventClicks || o.params.preventClicksPropagation) && o.container[t]("click", o.onClick, !0)
                }, o.detachEvents = function() {
                    o.attachEvents(!0)
                }, o.onResize = function() {
                    o.updateSize(), o.slideTo(o.activeSlideIndex, 0, !1)
                };
                var f, l, c = {},
                    h = {},
                    p, d, v, m = Date.now(),
                    g;
                o.animating = !1, o.allowClick = !0, o.onClick = function(e) {
                    o.params.preventClicks && !o.allowClick && (e.preventDefault(), o.params.preventClicksPropagation && (e.stopPropagation(), e.stopImmediatePropagation()))
                }, o.onTouchStart = function(e) {
                    if (o.params.onlyExternal) return;
                    f = !0, l = !1, d = undefined, c.x = h.x = e.type === "touchstart" ? e.targetTouches[0].pageX : e.pageX, c.y = h.y = e.type === "touchstart" ? e.targetTouches[0].pageY : e.pageY, p = Date.now(), o.allowClick = !0, o.updateSize(), o.params.onTouchStart && o.params.onTouchStart(o, e), e.type === "mousedown" && e.preventDefault()
                }, o.onTouchMove = function(e) {
                    o.params.onTouchMove && o.params.onTouchMove(o, e), o.allowClick = !1;
                    if (e.targetTouches && e.targetTouches.length > 1) return;
                    h.x = e.type === "touchmove" ? e.targetTouches[0].pageX : e.pageX, h.y = e.type === "touchmove" ? e.targetTouches[0].pageY : e.pageY, typeof d == "undefined" && (d = !!(d || Math.abs(h.y - c.y) > Math.abs(h.x - c.x))), (u && d || !u && !d) && o.params.onOppositeTouchMove && o.params.onOppositeTouchMove(o, e);
                    if (!f) return;
                    if (u && d || !u && !d) {
                        f = !1;
                        return
                    }
                    o.params.onSliderMove && o.params.onSliderMove(o, e), e.preventDefault(), e.stopPropagation(), l || (t.loop && o.fixLoop(), v = i.getTranslate(o.wrapper[0], u ? "x" : "y") * a, o.wrapper.transition(0), o.animating && o.onTransitionEnd(), t.autoplay && b && (o.params.autoplayDisableOnInteraction ? o.stopAutoplay() : y && clearTimeout(y))), l = !0;
                    var n = u ? (h.x - c.x) * a : h.y - c.y;
                    n > 0 && o.activeSlideIndex === 0 ? n = Math.pow(n, .85) : n < 0 && o.activeSlideIndex === o.slides.length - o.params.slidesPerView ? n = -Math.pow(-n, .85) : n < 0 && o.activeSlideIndex === 0 && o.slides.length < o.params.slidesPerView && (n = -Math.pow(-n, .85));
                    var r = u ? (n + v) * a : 0,
                        s = u ? 0 : n + v;
                    o.wrapper.transform("translate3d(" + r + "px, " + s + "px,0)")
                }, o.onTouchEnd = function(e) {
                    o.params.onTouchEnd && o.params.onTouchEnd(o, e);
                    var t = Date.now(),
                        n = t - p;
                    o.allowClick && (n < 300 && t - m > 300 && (g && clearTimeout(g), g = setTimeout(function() {
                        if (!o) return;
                        o.params.paginationHide && o.paginationContainer && o.paginationContainer.toggleClass("slider-pagination-hidden"), o.params.onClick && o.params.onClick(o, e)
                    }, 300)), n < 300 && t - m < 300 && (g && clearTimeout(g), o.params.onDoubleTap && o.params.onDoubleTap(o, e)), o.params.onTap && o.params.onTap(o, e)), m = Date.now();
                    if (!f || !l) {
                        f = l = !1;
                        return
                    }
                    f = l = !1;
                    var r = u ? (h.x - c.x) * a : h.y - c.y;
                    Math.abs(r) < 5 && n < 300 && o.allowClick === !1 && (o.allowClick = !0), setTimeout(function() {
                        if (!o) return;
                        o.allowClick = !0
                    }, 100);
                    var i = o.params.autoplay && b && !o.params.autoplayDisableOnInteraction;
                    if (r === 0) {
                        i && o.startAutoplay();
                        return
                    }
                    var s = 1,
                        d = o.size / o.params.slidesPerView;
                    o.params.slidesPerView > 1 && (s = Math.abs((Math.abs(r) + d / 2) / d)), i && o.wrapper.transitionEnd(function() {
                        o.startAutoplay()
                    }), n > 300 ? r <= -d / 2 ? o.slideTo(o.activeSlideIndex + Math.floor(s)) : r > d / 2 ? o.slideTo(o.activeSlideIndex - Math.floor(s)) : o.slideReset() : Math.abs(r) < 10 ? o.slideReset() : r < 0 ? o.slideTo(o.activeSlideIndex + Math.round(s)) : o.slideTo(o.activeSlideIndex - Math.round(s))
                }, o.slideTo = function(e, t, n) {
                    typeof e == "undefined" && (e = 0), e > o.slides.length - o.params.slidesPerView && (e = o.slides.length - o.params.slidesPerView), e < 0 && (e = 0);
                    var r = -(o.size + o.params.spaceBetween) * e / o.params.slidesPerView;
                    typeof t == "undefined" && (t = o.params.speed), o.previousSlideIndex = o.activeSlideIndex, o.activeSlideIndex = Math.round(e), o.isFirst = o.activeSlideIndex === 0, o.isLast = o.activeSlideIndex === o.slides.length - o.params.slidesPerView, o.onTransitionStart();
                    var i = u ? r * a : 0,
                        s = u ? 0 : r;
                    t === 0 ? (o.wrapper.transition(0).transform("translate3d(" + i + "px," + s + "px,0)"), n !== !1 && o.onTransitionEnd()) : (o.animating = !0, o.wrapper.transition(t).transform("translate3d(" + i + "px," + s + "px,0)").transitionEnd(function() {
                        n !== !1 && o.onTransitionEnd()
                    }))
                }, o.updateClasses = function() {
                    o.slides.removeClass(o.params.slideActiveClass + " " + o.params.slideNextClass + " " + o.params.slidePrevClass);
                    var e = o.slides.eq(o.activeSlideIndex);
                    e.addClass(o.params.slideActiveClass), e.next().addClass(o.params.slideNextClass), e.prev().addClass(o.params.slidePrevClass);
                    if (o.bullets && o.bullets.length > 0) {
                        o.bullets.removeClass(o.params.bulletActiveClass);
                        var t = o.activeSlideIndex;
                        o.params.loop && (t -= o.loopedSlides, t < 0 && (t = o.bullets.length + t), t >= o.bullets.length && (t -= o.bullets.length)), o.bullets.eq(t).addClass(o.params.bulletActiveClass)
                    }
                }, o.onTransitionStart = function() {
                    o.updateClasses(), o.activeSlideIndex !== o.previousSlideIndex && o.params.onSlideChangeStart && o.params.onSlideChangeStart(o), o.params.onTransitionStart && o.params.onTransitionStart(o)
                }, o.onTransitionEnd = function() {
                    o.animating = !1, o.wrapper.transition(0), o.activeSlideIndex !== o.previousSlideIndex && o.params.onSlideChangeEnd && o.params.onSlideChangeEnd(o), o.params.onTransitionEnd && o.params.onTransitionEnd(o)
                }, o.slideNext = function() {
                    if (o.params.loop) {
                        if (o.animating) return;
                        o.fixLoop(), setTimeout(function() {
                            o.slideTo(o.activeSlideIndex + 1)
                        }, 0)
                    } else o.slideTo(o.activeSlideIndex + 1)
                }, o.slidePrev = function() {
                    if (o.params.loop) {
                        if (o.animating) return;
                        o.fixLoop(), setTimeout(function() {
                            o.slideTo(o.activeSlideIndex - 1)
                        }, 0)
                    } else o.slideTo(o.activeSlideIndex - 1)
                }, o.slideReset = function() {
                    o.slideTo(o.activeSlideIndex)
                }, o.onClickNext = function(e) {
                    e.preventDefault(), o.slideNext()
                }, o.onClickPrev = function(e) {
                    e.preventDefault(), o.slidePrev()
                }, o.onClickIndex = function(e) {
                    e.preventDefault(), o.slideTo(i(this).index())
                };
                var y, b;
                return o.startAutoplay = function() {
                    if (!o.params.autoplay) return;
                    b = !0, y && clearTimeout(y), y = setTimeout(function() {
                        o.wrapper.transitionEnd(function() {
                            o.startAutoplay()
                        });
                        var e = o.activeSlideIndex + 1;
                        e > o.slides.length - o.params.slidesPerView && (e = 0), o.slideTo(e)
                    }, o.params.autoplay)
                }, o.stopAutoplay = function() {
                    b = !1, y && clearTimeout(y)
                }, o.resetAutoplay = function() {
                    o.stopAutoplay(), o.startAutoplay()
                }, o.createLoop = function() {
                    o.wrapper.children("." + o.params.slideClass + ".slider-slide-duplicate").remove();
                    var e = o.wrapper.children("." + o.params.slideClass);
                    o.loopedSlides = parseInt(o.params.loopedSlides || o.params.slidesPerView, 10);
                    if (o.loopedSlides > e.length) {
                        o.loopedSlides = e.length;
                        return
                    }
                    var t = [],
                        n = [],
                        r;
                    e.each(function(r, s) {
                        var u = i(this);
                        r < o.loopedSlides && n.push(s), r < e.length && r >= e.length - o.loopedSlides && t.push(s), u.attr("data-slider-slide-index", r)
                    });
                    for (r = 0; r < n.length; r++) o.wrapper.append(i(n[r].cloneNode(!0)).addClass("slider-slide-duplicate"));
                    for (r = t.length - 1; r >= 0; r--) o.wrapper.prepend(i(t[r].cloneNode(!0)).addClass("slider-slide-duplicate"))
                }, o.fixLoop = function() {
                    var e;
                    o.activeSlideIndex < o.loopedSlides ? (e = o.slides.length - o.loopedSlides * 3 + o.activeSlideIndex, e += o.loopedSlides, o.slideTo(e, 0, !1)) : o.activeSlideIndex > o.slides.length - o.params.slidesPerView * 2 && (e = -o.slides.length + o.activeSlideIndex + o.loopedSlides, e += o.loopedSlides, o.slideTo(e, 0, !1))
                }, o.init = function() {
                    o.params.loop && o.createLoop(), o.updateSlides(), o.updatePagination(), o.updateSize(), o.params.loop ? o.slideTo(o.params.initialSlide + o.loopedSlides, 0, !1) : o.params.initialSlide > 0 ? o.slideTo(o.params.initialSlide, 0, !1) : o.updateClasses(), o.attachEvents(), o.params.autoplay && o.startAutoplay()
                }, o.update = function() {
                    o.params.loop && o.createLoop(), o.updateSlides(), o.updatePagination(), o.updateSize(), o.updateClasses()
                }, o.destroy = function() {
                    o.detachEvents(), o.params.onDestroy && o.params.onDestroy(), o = undefined
                }, o.init(), o
            };
            n.slider = function(e, t) {
                return new p(e, t)
            }, n.initSlider = function(e) {
                function s(e) {
                    function n() {
                        e.destroy(), t.off("pageBeforeRemove", n)
                    }
                    t.on("pageBeforeRemove", n)
                }
                var t = i(e),
                    r = t.find(".slider-init");
                if (r.length === 0) return;
                for (var o = 0; o < r.length; o++) {
                    var u = r.eq(o),
                        a;
                    u.data("slider") ? a = JSON.parse(u.data("slider")) : a = {
                        initialSlide: parseInt(u.data("initialSlide"), 10) || undefined,
                        spaceBetween: parseInt(u.data("spaceBetween"), 10) || undefined,
                        speed: parseInt(u.data("speed"), 10) || undefined,
                        slidesPerView: parseInt(u.data("slidesPerView"), 10) || undefined,
                        direction: u.data("direction"),
                        pagination: u.data("pagination"),
                        paginationHide: u.data("paginationHide") && (u.data("paginationHide") === "true" ? !0 : !1),
                        loop: u.data("loop") && (u.data("loop") === "true" ? !0 : !1),
                        onlyExternal: u.data("onlyExternal") && (u.data("onlyExternal") === "true" ? !0 : !1),
                        slideClass: u.data("slideClass"),
                        slideActiveClass: u.data("slideActiveClass"),
                        slideNextClass: u.data("slideNextClass"),
                        slidePrevClass: u.data("slidePrevClass"),
                        wrapperClass: u.data("wrapperClass"),
                        bulletClass: u.data("bulletClass"),
                        bulletActiveClass: u.data("bulletActiveClass"),
                        nextButton: u.data("nextButton"),
                        prevButton: u.data("prevButton"),
                        indexButton: u.data("indexButton"),
                        autoplay: u.data("autoplay")
                    };
                    var f = n.slider(u[0], a);
                    s(f)
                }
            }, n.reinitSlider = function(e) {
                var t = i(e),
                    n = t.find(".slider-init");
                if (n.length === 0) return;
                for (var r = 0; r < n.length; r++) {
                    var s = n[0].f7Slider;
                    s && s.onResize()
                }
            };
            var d = function(e) {
                function u() {
                    var e;
                    for (r = 0; r < n.views.length; r++) n.views[r].main && (e = n.views[r]);
                    return e
                }
                var t = this,
                    r, s = {
                        photos: [],
                        initialSlide: 0,
                        spaceBetween: 20,
                        speed: 300,
                        zoom: !0,
                        maxZoom: 3,
                        minZoom: 1,
                        exposition: !0,
                        expositionHideCaptions: !1,
                        type: "standalone",
                        navbar: !0,
                        toolbar: !0,
                        theme: "light",
                        swipeToClose: !0,
                        backLinkText: "Fechar",
                        ofText: "of",
                        loop: !1,
                        lazyLoading: !1,
                        lazyLoadingInPrevNext: !1,
                        lazyLoadingOnTransitionStart: !1
                    };
                e = e || {};
                for (var o in s) typeof e[o] == "undefined" && (e[o] = s[o]);
                t.params = e;
                var a = t.params.theme === "dark" ? "color-white" : "",
                    f = t.params.navbarTemplate || '<div class="navbar"><div class="navbar-inner"><div class="left sliding"><a href="#" class="link ' + (t.params.type === "page" && "back") + ' close-popup photo-browser-close-link" data-popup=".photo-browser-popup"><i class="icon icon-back ' + a + '"></i><span>' + t.params.backLinkText + "</span></a></div>" + '<div class="center sliding"><span class="photo-browser-current"></span> <span class="photo-browser-of">' + t.params.ofText + '</span> <span class="photo-browser-total"></span></div>' + '<div class="right"></div>' + "</div>" + "</div>",
                    l = n.rtl ? "next" : "prev",
                    c = n.rtl ? "prev" : "next",
                    h = t.params.toolbarTemplate || '<div class="toolbar tabbar"><div class="toolbar-inner"><a href="#" class="link photo-browser-prev"><i class="icon icon-' + l + " " + a + '"></i></a>' + '<a href="#" class="link photo-browser-next"><i class="icon icon-' + c + " " + a + '"></i></a>' + "</div>" + "</div>",
                    p = t.params.template || '<div class="photo-browser photo-browser-' + t.params.theme + '">' + '<div class="view navbar-fixed toolbar-fixed">' + "{{navbar}}" + '<div data-page="photo-browser-slides" class="page no-toolbar {{noNavbar}} toolbar-fixed navbar-fixed">' + "{{toolbar}}" + "{{captions}}" + '<div class="photo-browser-slider-container slider-container">' + '<div class="photo-browser-slider-wrapper slider-wrapper">' + "{{photos}}" + "</div>" + "</div>" + "</div>" + "</div>" + "</div>",
                    d = t.params.lazyLoading ? t.params.photoLazyTemplate || '<div class="photo-browser-slide photo-browser-slide-lazy slider-slide"><div class="preloader' + (t.params.theme === "dark" ? " preloader-white" : "") + '"></div><span class="photo-browser-zoom-container"><img data-src="{{url}}"></span></div>' : t.params.photoTemplate || '<div class="photo-browser-slide slider-slide"><span class="photo-browser-zoom-container"><img src="{{url}}"></span></div>',
                    v = t.params.captionsTheme || t.params.theme,
                    m = t.params.captionsTemplate || '<div class="photo-browser-captions photo-browser-captions-' + v + '">{{captions}}</div>',
                    g = t.params.captionTemplate || '<div class="photo-browser-caption" data-caption-index="{{captionIndex}}">{{caption}}</div>',
                    y = t.params.objectTemplate || '<div class="photo-browser-slide photo-browser-object-slide slider-slide">{{html}}</div>',
                    b = "",
                    w = "";
                for (r = 0; r < t.params.photos.length; r++) {
                    var E = t.params.photos[r],
                        S = "";
                    typeof E == "string" || E instanceof String ? E.indexOf("<") >= 0 || E.indexOf(">") >= 0 ? S = y.replace(/{{html}}/g, E) : S = d.replace(/{{url}}/g, E) : typeof E == "object" && (E.hasOwnProperty("html") && E.html.length > 0 ? S = y.replace(/{{html}}/g, E.html) : E.hasOwnProperty("url") && E.url.length > 0 && (S = d.replace(/{{url}}/g, E.url)), E.hasOwnProperty("caption") && E.caption.length > 0 ? w += g.replace(/{{caption}}/g, E.caption).replace(/{{captionIndex}}/g, r) : S = S.replace(/{{caption}}/g, "")), b += S
                }
                var x = p.replace("{{navbar}}", t.params.navbar ? f : "").replace("{{noNavbar}}", t.params.navbar ? "" : "no-navbar").replace("{{photos}}", b).replace("{{captions}}", m.replace(/{{captions}}/g, w)).replace("{{toolbar}}", t.params.toolbar ? h : "");
                t.activeSlideIndex = t.params.initialSlide, t.openIndex = t.activeSlideIndex, t.opened = !1, t.open = function(e) {
                    typeof e == "undefined" && (e = t.activeSlideIndex), e = parseInt(e, 10);
                    if (t.opened && t.slider) {
                        t.slider.slideTo(e);
                        return
                    }
                    t.opened = !0, t.openIndex = e, t.initialLazyLoaded = !1, t.params.type === "standalone" && i("body").append(x), t.params.type === "popup" && (t.popup = n.popup('<div class="popup photo-browser-popup">' + x + "</div>"), i(t.popup).on("closed", t.onPopupClose));
                    if (t.params.type === "page") {
                        i(document).on("pageBeforeInit", t.onPageBeforeInit), i(document).on("pageBeforeRemove", t.onPageBeforeRemove), t.params.view || (t.params.view = u()), t.params.view.loadContent(x);
                        return
                    }
                    t.layout(t.openIndex), t.params.onOpen && t.params.onOpen(t)
                }, t.close = function() {
                    t.opened = !1;
                    if (!t.sliderContainer || t.sliderContainer.length === 0) return;
                    t.params.onClose && t.params.onClose(t), t.attachEvents(!0), t.params.type === "standalone" && t.container.removeClass("photo-browser-in").addClass("photo-browser-out").animationEnd(function() {
                        t.container.remove()
                    }), t.slider.destroy(), t.slider = t.sliderContainer = t.sliderWrapper = t.slides = D = P = H = undefined
                }, t.onPopupClose = function(e) {
                    t.close(), i(t.popup).off("pageBeforeInit", t.onPopupClose)
                }, t.onPageBeforeInit = function(e) {
                    e.detail.page.name === "photo-browser-slides" && t.layout(t.openIndex), i(document).off("pageBeforeInit", t.onPageBeforeInit)
                }, t.onPageBeforeRemove = function(e) {
                    e.detail.page.name === "photo-browser-slides" && t.close(), i(document).off("pageBeforeRemove", t.onPageBeforeRemove)
                }, t.loadImageInSlide = function(e, n) {
                    if (!e || typeof n == "undefined") return;
                    if (e.slides.length === 0) return;
                    var r = e.slides.eq(n);
                    if (!r.hasClass("photo-browser-slide-lazy")) return;
                    var i = r.find("img");
                    if (i.length === 0) return;
                    var s = new Image,
                        o = i.attr("data-src");
                    s.onload = function() {
                        i.attr("src", o), i.removeAttr("data-src"), r.removeClass("photo-browser-slide-lazy").find(".preloader").remove(), t.params.onImageLoaded && t.params.onImageLoaded(t, r[0], i[0])
                    }, s.src = o, t.params.onImageLoad && t.params.onImageLoad(t, r[0], i[0])
                }, t.lazyLoading = function(e, n) {
                    t.loadImageInSlide(e, n);
                    if (t.params.lazyLoadingInPrevNext) {
                        var r = e.wrapper.find(".slider-slide-next.photo-browser-slide-lazy");
                        r.length > 0 && t.loadImageInSlide(e, r.index());
                        var i = e.wrapper.find(".slider-slide-prev.photo-browser-slide-lazy");
                        i.length > 0 && t.loadImageInSlide(e, i.index())
                    }
                }, t.onSliderTransitionStart = function(e) {
                    t.activeSlideIndex = e.activeSlideIndex;
                    var n = e.activeSlideIndex + 1,
                        r = e.slides.length;
                    t.params.loop && (r -= 2, n -= e.loopedSlides, n < 1 && (n = r + n), n > r && (n -= r)), t.container.find(".photo-browser-current").text(n), t.container.find(".photo-browser-total").text(r), i(".photo-browser-prev, .photo-browser-next").removeClass("photo-browser-link-inactive"), e.isFirst && !t.params.loop && i(".photo-browser-prev").addClass("photo-browser-link-inactive"), e.isLast && !t.params.loop && i(".photo-browser-next").addClass("photo-browser-link-inactive");
                    if (t.captions.length > 0) {
                        t.captionsContainer.find(".photo-browser-caption-active").removeClass("photo-browser-caption-active");
                        var s = t.params.loop ? e.slides.eq(e.activeSlideIndex).attr("data-slider-slide-index") : t.activeSlideIndex;
                        t.captionsContainer.find('[data-caption-index="' + s + '"]').addClass("photo-browser-caption-active")
                    }
                    t.params.lazyLoading && (t.params.lazyLoadingOnTransitionStart || !t.params.lazyLoadingOnTransitionStart && !t.initialLazyLoaded) && (t.initialLazyLoaded = !0, t.lazyLoading(e, t.activeSlideIndex));
                    var o = e.slides.eq(e.previousSlideIndex).find("video");
                    o.length > 0 && "pause" in o[0] && o[0].pause(), t.params.onSlideChangeStart && t.params.onSlideChangeStart(e)
                }, t.onSliderTransitionEnd = function(e) {
                    t.params.lazyLoading && !t.params.lazyLoadingOnTransitionStart && t.lazyLoading(e, t.activeSlideIndex), t.params.zoom && D && e.previousSlideIndex !== e.activeSlideIndex && (P.transform("translate3d(0,0,0) scale(1)"), H.transform("translate3d(0,0,0)"), D = P = H = undefined, B = j = 1), t.params.onSlideChangeEnd && t.params.onSlideChangeEnd(e)
                }, t.layout = function(e) {
                    t.params.type === "page" ? t.container = i(".photo-browser-slider-container").parents(".view") : t.container = i(".photo-browser"), t.params.type === "standalone" && (t.container.addClass("photo-browser-in"), n.sizeNavbars(t.container)), t.sliderContainer = t.container.find(".photo-browser-slider-container"), t.sliderWrapper = t.container.find(".photo-browser-slider-wrapper"), t.slides = t.container.find(".photo-browser-slide"), t.captionsContainer = t.container.find(".photo-browser-captions"), t.captions = t.container.find(".photo-browser-caption");
                    var r = {
                        nextButton: t.params.nextButton || ".photo-browser-next",
                        prevButton: t.params.prevButton || ".photo-browser-prev",
                        indexButton: t.params.indexButton,
                        initialSlide: e,
                        spaceBetween: t.params.spaceBetween,
                        speed: t.params.speed,
                        loop: t.params.loop,
                        onTap: function(e, n) {
                            t.params.onTap && t.params.onTap(e, n)
                        },
                        onClick: function(e, n) {
                            t.params.exposition && t.toggleExposition(), t.params.onClick && t.params.onClick(e, n)
                        },
                        onDoubleTap: function(e, n) {
                            t.toggleZoom(i(n.target).parents(".photo-browser-slide")), t.params.onDoubleTap && t.params.onDoubleTap(e, n)
                        },
                        onTransitionStart: function(e) {
                            t.onSliderTransitionStart(e)
                        },
                        onTransitionEnd: function(e) {
                            t.onSliderTransitionEnd(e)
                        }
                    };
                    t.params.swipeToClose && t.params.type !== "page" && (r.onTouchStart = t.swipeCloseTouchStart, r.onOppositeTouchMove = t.swipeCloseTouchMove, r.onTouchEnd = t.swipeCloseTouchEnd), t.slider = n.slider(t.sliderContainer, r), e === 0 && t.onSliderTransitionStart(t.slider), t.attachEvents()
                }, t.attachEvents = function(e) {
                    var r = e ? "off" : "on";
                    if (t.params.zoom) {
                        var i = t.params.loop ? t.slider.slides : t.slides;
                        i[r]("gesturestart", t.onSlideGestureStart), i[r]("gesturechange", t.onSlideGestureChange), i[r]("gestureend", t.onSlideGestureEnd), i[r](n.touchEvents.start, t.onSlideTouchStart), i[r](n.touchEvents.move, t.onSlideTouchMove), i[r](n.touchEvents.end, t.onSlideTouchEnd)
                    }
                    t.container.find(".photo-browser-close-link")[r]("click", t.close)
                };
                var T, N, C = {},
                    k = {},
                    L, A, O = !1,
                    M, _ = !0;
                t.exposed = !1, t.toggleExposition = function() {
                    t.container && t.container.toggleClass("photo-browser-exposed"), t.params.expositionHideCaptions && t.captionsContainer.toggleClass("photo-browser-captions-exposed"), t.exposed = !t.exposed
                }, t.enableExposition = function() {
                    t.container && t.container.addClass("photo-browser-exposed"), t.params.expositionHideCaptions && t.captionsContainer.addClass("photo-browser-captions-exposed"), t.exposed = !0
                }, t.disableExposition = function() {
                    t.container && t.container.removeClass("photo-browser-exposed"), t.params.expositionHideCaptions && t.captionsContainer.removeClass("photo-browser-captions-exposed"), t.exposed = !1
                };
                var D, P, H, B = 1,
                    j = 1,
                    F = !1;
                t.onSlideGestureStart = function(e) {
                    if (!D) {
                        D = i(this), P = D.find("img, svg, canvas"), H = P.parent(".photo-browser-zoom-container");
                        if (H.length === 0) {
                            P = undefined;
                            return
                        }
                    }
                    P.transition(0), F = !0
                }, t.onSlideGestureChange = function(e) {
                    if (!P || P.length === 0) return;
                    B = e.scale * j, B > t.params.maxZoom && (B = t.params.maxZoom - 1 + Math.pow(B - t.params.maxZoom + 1, .5)), B < t.params.minZoom && (B = t.params.minZoom + 1 - Math.pow(t.params.minZoom - B + 1, .5)), P.transform("translate3d(0,0,0) scale(" + B + ")")
                }, t.onSlideGestureEnd = function(e) {
                    if (!P || P.length === 0) return;
                    B = Math.max(Math.min(B, t.params.maxZoom), t.params.minZoom), P.transition(t.params.speed).transform("translate3d(0,0,0) scale(" + B + ")"), j = B, F = !1, B === 1 && (D = undefined)
                }, t.toggleZoom = function() {
                    D || (D = t.slider.slides.eq(t.slider.activeSlideIndex), P = D.find("img, svg, canvas"), H = P.parent(".photo-browser-zoom-container"));
                    if (!P || P.length === 0) return;
                    H.transition(300).transform("translate3d(0,0,0)"), B && B !== 1 ? (B = j = 1, P.transition(300).transform("translate3d(0,0,0) scale(1)"), D = undefined) : (B = j = t.params.maxZoom, P.transition(300).transform("translate3d(0,0,0) scale(" + B + ")"))
                };
                var I, q, R, U, z, W, X, V, J, K, Q = {},
                    G = {},
                    Y, Z, et, tt, nt, rt, it;
                t.onSlideTouchStart = function(e) {
                    if (!P || P.length === 0) return;
                    if (I) return;
                    n.device.os === "android" && e.preventDefault(), I = !0, Q.x = e.type === "touchstart" ? e.targetTouches[0].pageX : e.pageX, Q.y = e.type === "touchstart" ? e.targetTouches[0].pageY : e.pageY
                }, t.onSlideTouchMove = function(e) {
                    if (!P || P.length === 0) return;
                    t.slider.allowClick = !1;
                    if (!I || !D) return;
                    q || (J = P[0].offsetWidth, K = P[0].offsetHeight, Y = i.getTranslate(H[0], "x") || 0, Z = i.getTranslate(H[0], "y") || 0, H.transition(0));
                    var n = J * B,
                        r = K * B;
                    if (n < t.slider.width && r < t.slider.height) return;
                    z = Math.min(t.slider.width / 2 - n / 2, 0), X = -z, W = Math.min(t.slider.height / 2 - r / 2, 0), V = -W, G.x = e.type === "touchmove" ? e.targetTouches[0].pageX : e.pageX, G.y = e.type === "touchmove" ? e.targetTouches[0].pageY : e.pageY;
                    if (!q && !F)
                        if (Math.floor(z) === Math.floor(Y) && G.x < Q.x || Math.floor(X) === Math.floor(Y) && G.x > Q.x) {
                            I = !1;
                            return
                        }
                    e.stopPropagation(), q = !0, R = G.x - Q.x + Y, U = G.y - Q.y + Z, R < z && (R = z + 1 - Math.pow(z - R + 1, .8)), R > X && (R = X - 1 + Math.pow(R - X + 1, .8)), U < W && (U = W + 1 - Math.pow(W - U + 1, .8)), U > V && (U = V - 1 + Math.pow(U - V + 1, .8)), et || (et = G.x), rt || (rt = G.y), tt || (tt = Date.now()), nt = (G.x - et) / (Date.now() - tt) / 2, it = (G.y - rt) / (Date.now() - tt) / 2, Math.abs(G.x - et) < 2 && (nt = 0), Math.abs(G.y - rt) < 2 && (it = 0), et = G.x, rt = G.y, tt = Date.now(), H.transform("translate3d(" + R + "px, " + U + "px,0)")
                }, t.onSlideTouchEnd = function(e) {
                    if (!P || P.length === 0) return;
                    if (!I || !q) {
                        I = !1, q = !1;
                        return
                    }
                    I = !1, q = !1;
                    var n = 300,
                        r = 300,
                        i = nt * n,
                        s = R + i,
                        o = it * r,
                        u = U + o;
                    nt !== 0 && (n = Math.abs((s - R) / nt)), it !== 0 && (r = Math.abs((u - U) / it));
                    var a = Math.max(n, r);
                    R = s, U = u;
                    var f = J * B,
                        l = K * B;
                    z = Math.min(t.slider.width / 2 - f / 2, 0), X = -z, W = Math.min(t.slider.height / 2 - l / 2, 0), V = -W, R = Math.max(Math.min(R, X), z), U = Math.max(Math.min(U, V), W), H.transition(a).transform("translate3d(" + R + "px, " + U + "px,0)")
                };
                var st = !1,
                    ot = !0,
                    ut, at, ft, lt = !1,
                    ct, ht;
                return t.swipeCloseTouchStart = function(e, t) {
                    if (!ot) return;
                    st = !0
                }, t.swipeCloseTouchMove = function(e, n) {
                    if (!st) return;
                    lt || (lt = !0, at = n.type === "touchmove" ? n.targetTouches[0].pageY : n.pageY, ct = t.slider.slides.eq(t.slider.activeSlideIndex), ht = (new Date).getTime()), n.preventDefault(), ft = n.type === "touchmove" ? n.targetTouches[0].pageY : n.pageY, ut = at - ft;
                    var r = 1 - Math.abs(ut) / 300;
                    ct.transform("translate3d(0," + -ut + "px,0)"), t.slider.container.css("opacity", r).transition(0)
                }, t.swipeCloseTouchEnd = function(e, r) {
                    st = !1;
                    if (!lt) {
                        lt = !1;
                        return
                    }
                    lt = !1, ot = !1;
                    var i = Math.abs(ut),
                        s = (new Date).getTime() - ht;
                    if (s < 300 && i > 20 || s >= 300 && i > 100) {
                        setTimeout(function() {
                            t.params.type === "standalone" && t.close(), t.params.type === "popup" && n.closeModal(t.popup), t.params.onSwipeToClose && t.params.onSwipeToClose(t), ot = !0
                        }, 0);
                        return
                    }
                    i !== 0 ? ct.addClass("transitioning").transitionEnd(function() {
                        ot = !0, ct.removeClass("transitioning")
                    }) : ot = !0, t.slider.container.css("opacity", "").transition(""), ct.transform("")
                }, t
            };
            n.photoBrowser = function(e) {
                return new d(e)
            };
            var v;
            n.addNotification = function(e) {
                if (!e) return;
                typeof e.media == "undefined" && (e.media = n.params.notificationMedia), typeof e.title == "undefined" && (e.title = n.params.notificationTitle), typeof e.subtitle == "undefined" && (e.subtitle = n.params.notificationSubtitle), typeof e.closeIcon == "undefined" && (e.closeIcon = n.params.notificationCloseIcon), typeof e.hold == "undefined" && (e.hold = n.params.notificationHold), typeof e.closeOnClick == "undefined" && (e.closeOnClick = n.params.notificationCloseOnClick), v || (v = document.createElement("div"));
                var t = i(".notifications");
                t.length === 0 && (i("body").append('<div class="notifications list-block media-list"><ul></ul></div>'), t = i(".notifications"));
                var r = t.children("ul"),
                    s;
                e.custom ? s = "<li>" + e.custom + "</li>" : s = '<li class="notification-item notification-hidden"><div class="item-content">' + (e.media ? '<div class="item-media">' + e.media + "</div>" : "") + '<div class="item-inner">' + '<div class="item-title-row">' + (e.title ? '<div class="item-title">' + e.title + "</div>" : "") + (e.closeIcon ? '<div class="item-after"><a href="#" class="close-notification"><span></span></a></div>' : "") + "</div>" + (e.subtitle ? '<div class="item-subtitle">' + e.subtitle + "</div>" : "") + (e.message ? '<div class="item-text">' + e.message + "</div>" : "") + "</div>" + "</div></li>", v.innerHTML = s;
                var o = i(v).children();
                o.on("click", function(t) {
                    var r = !1;
                    i(t.target).is(".close-notification") || i(t.target).parents(".close-notification").length > 0 ? r = !0 : (e.onClick && e.onClick(t, o[0]), e.closeOnClick && (r = !0)), r && n.closeNotification(o[0])
                }), e.onClose && o.data("f7NotificationOnClose", function() {
                    e.onClose(o[0])
                }), e.additionalClass && o.addClass(e.additionalClass), e.hold && setTimeout(function() {
                    o.length > 0 && n.closeNotification(o[0])
                }, e.hold), r.prepend(o[0]), t.show();
                var u = o.height();
                o.css("marginTop", -u + "px"), o.transition(0);
                var a = o[0].clientLeft;
                return o.transition(""), o.css("marginTop", "0px"), t.transform("translate3d(0, 0,0)"), o.removeClass("notification-hidden"), o[0]
            }, n.closeNotification = function(e) {
                e = i(e);
                if (e.length === 0) return;
                if (e.hasClass("notification-item-removing")) return;
                var t = i(".notifications"),
                    n = e.height();
                e.css("height", n + "px").transition(0);
                var r = e[0].clientLeft;
                e.css("height", "0px").transition("").addClass("notification-item-removing"), e.data("f7NotificationOnClose") && e.data("f7NotificationOnClose")(), t.find(".notification-item:not(.notification-item-removing)").length === 0 && t.transform(""), e.addClass("notification-hidden").transitionEnd(function() {
                    e.remove(), t.find(".notification-item").length === 0 && t.hide()
                })
            }, n.initTemplate7Templates = function() {
                if (!window.Template7) return;
                Template7.templates = Template7.templates || n.params.templates || {}, Template7.data = Template7.data || n.params.template7Data || {}, Template7.templatesCache = {}, n.templates = Template7.templates, n.template7Data = Template7.data, n.templatesCache = Template7.templatesCache;
                if (!n.params.precompileTemplates) return;
                i('script[type="text/template7"]').each(function() {
                    var e = i(this).attr("id");
                    if (!e) return;
                    Template7.templates[e] = Template7.compile(i(this).html())
                })
            };
            var m = [];
            return n.initPlugins = function() {
                for (var e in n.plugins) {
                    var t = n.plugins[e](n, n.params[e]);
                    t && m.push(t)
                }
            }, n.pluginHook = function(e) {
                for (var t = 0; t < m.length; t++) m[t].hooks && e in m[t].hooks && m[t].hooks[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, n.pluginPrevent = function(e) {
                var t = !1;
                for (var n = 0; n < m.length; n++) m[n].prevents && e in m[n].prevents && m[n].prevents[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]) && (t = !0);
                return t
            }, n.pluginProcess = function(e, t) {
                var n = t;
                for (var r = 0; r < m.length; r++) m[r].preprocess && process in m[r].preprocess && (n = m[r].preprocess[process](t, arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]));
                return n
            }, n.init = function() {
                n.initPlugins && n.initPlugins(), n.getDeviceInfo && n.getDeviceInfo(), n.initFastClicks && n.params.fastClicks && n.initFastClicks(), n.initClickEvents && n.initClickEvents(), i(".page:not(.cached)").each(function() {
                    var e = i(this),
                        t = e.parents("." + n.params.viewClass);
                    if (t.length === 0) return;
                    var r = t[0].f7View || !1,
                        s = r && r.url ? r.url : !1;
                    t && t.attr("data-page", e.attr("data-page") || undefined), n.pageInitCallback(r, this, s, "center")
                }), n.initResize && n.initResize(), n.initPushState && n.params.pushState && n.initPushState(), n.initSwipeout && n.params.swipeout && n.initSwipeout(), n.initSortable && n.params.sortable && n.initSortable(), n.initSwipePanels && n.params.swipePanel && n.initSwipePanels(), n.params.onAppInit && n.params.onAppInit(), n.initTemplate7Templates && n.initTemplate7Templates(), n.pluginHook("appInit")
            }, n.params.init && n.init(), n
        };
        var e = function() {
            var e = function(e) {
                    var t = this,
                        n = 0;
                    for (n = 0; n < e.length; n++) t[n] = e[n];
                    return t.length = e.length, this
                },
                t = function(t, n) {
                    var r = [],
                        i = 0;
                    if (t && !n && t instanceof e) return t;
                    if (t)
                        if (typeof t == "string") {
                            var s = (n || document).querySelectorAll(t);
                            for (i = 0; i < s.length; i++) r.push(s[i])
                        } else if (t.nodeType || t === window || t === document) r.push(t);
                    else if (t.length > 0 && t[0].nodeType)
                        for (i = 0; i < t.length; i++) r.push(t[i]);
                    return new e(r)
                };
            e.prototype = {
                    addClass: function(e) {
                        if (typeof e == "undefined") return this;
                        var t = e.split(" ");
                        for (var n = 0; n < t.length; n++)
                            for (var r = 0; r < this.length; r++) this[r].classList.add(t[n]);
                        return this
                    },
                    removeClass: function(e) {
                        var t = e.split(" ");
                        for (var n = 0; n < t.length; n++)
                            for (var r = 0; r < this.length; r++) this[r].classList.remove(t[n]);
                        return this
                    },
                    hasClass: function(e) {
                        return this[0] ? this[0].classList.contains(e) : !1
                    },
                    toggleClass: function(e) {
                        var t = e.split(" ");
                        for (var n = 0; n < t.length; n++)
                            for (var r = 0; r < this.length; r++) this[r].classList.toggle(t[n]);
                        return this
                    },
                    attr: function(e, t) {
                        if (typeof t == "undefined") return this[0] ? this[0].getAttribute(e) : undefined;
                        for (var n = 0; n < this.length; n++) this[n].setAttribute(e, t);
                        return this
                    },
                    removeAttr: function(e) {
                        for (var t = 0; t < this.length; t++) this[t].removeAttribute(e)
                    },
                    prop: function(e, t) {
                        if (typeof t == "undefined") return this[0] ? this[0][e] : undefined;
                        for (var n = 0; n < this.length; n++) this[n][e] = t;
                        return this
                    },
                    data: function(e, t) {
                        if (typeof t == "undefined") {
                            if (this[0]) {
                                var n = this[0].getAttribute("data-" + e);
                                return n ? n : this[0].dom7ElementDataStorage && e in this[0].dom7ElementDataStorage ? this[0].dom7ElementDataStorage[e] : undefined
                            }
                            return undefined
                        }
                        for (var r = 0; r < this.length; r++) {
                            var i = this[r];
                            i.dom7ElementDataStorage || (i.dom7ElementDataStorage = {}), i.dom7ElementDataStorage[e] = t
                        }
                        return this
                    },
                    val: function(e) {
                        if (typeof e == "undefined") return this[0] ? this[0].value : null;
                        for (var t = 0; t < this.length; t++) this[t].value = e;
                        return this
                    },
                    transform: function(e) {
                        for (var t = 0; t < this.length; t++) {
                            var n = this[t].style;
                            n.webkitTransform = n.MsTransform = n.msTransform = n.MozTransform = n.OTransform = n.transform = e
                        }
                        return this
                    },
                    transition: function(e) {
                        typeof e != "string" && (e += "ms");
                        for (var t = 0; t < this.length; t++) {
                            var n = this[t].style;
                            n.webkitTransitionDuration = n.MsTransitionDuration = n.msTransitionDuration = n.MozTransitionDuration = n.OTransitionDuration = n.transitionDuration = e
                        }
                        return this
                    },
                    on: function(e, n, r, i) {
                        function s(e) {
                            var i = e.target;
                            if (t(i).is(n)) r.call(i, e);
                            else {
                                var s = t(i).parents();
                                for (var o = 0; o < s.length; o++) t(s[o]).is(n) && r.call(s[o], e)
                            }
                        }
                        var o = e.split(" "),
                            u, a;
                        for (u = 0; u < this.length; u++)
                            if (typeof n == "function" || n === !1) {
                                typeof n == "function" && (r = arguments[1], i = arguments[2] || !1);
                                for (a = 0; a < o.length; a++) this[u].addEventListener(o[a], r, i)
                            } else
                                for (a = 0; a < o.length; a++) this[u].dom7LiveListeners || (this[u].dom7LiveListeners = []), this[u].dom7LiveListeners.push({
                                    listener: r,
                                    liveListener: s
                                }), this[u].addEventListener(o[a], s, i);
                        return this
                    },
                    off: function(e, t, n, r) {
                        var i = e.split(" ");
                        for (var s = 0; s < i.length; s++)
                            for (var o = 0; o < this.length; o++)
                                if (typeof t == "function" || t === !1) typeof t == "function" && (n = arguments[1], r = arguments[2] || !1), this[o].removeEventListener(i[s], n, r);
                                else if (this[o].dom7LiveListeners)
                            for (var u = 0; u < this[o].dom7LiveListeners.length; u++) this[o].dom7LiveListeners[u].listener === n && this[o].removeEventListener(i[s], this[o].dom7LiveListeners[u].liveListener, r);
                        return this
                    },
                    once: function(e, t, n, r) {
                        function s(o) {
                            n(o), i.off(e, t, s, r)
                        }
                        var i = this;
                        typeof t == "function" && (t = !1, n = arguments[1], r = arguments[2]), i.on(e, t, s, r)
                    },
                    trigger: function(e, t) {
                        for (var n = 0; n < this.length; n++) {
                            var r;
                            try {
                                r = new CustomEvent(e, {
                                    detail: t,
                                    bubbles: !0,
                                    cancelable: !0
                                })
                            } catch (i) {
                                r = document.createEvent("Event"), r.initEvent(e, !0, !0), r.detail = t
                            }
                            this[n].dispatchEvent(r)
                        }
                        return this
                    },
                    transitionEnd: function(e) {
                        function s(r) {
                            if (r.target !== this) return;
                            e.call(this, r);
                            for (n = 0; n < t.length; n++) i.off(t[n], s)
                        }
                        var t = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
                            n, r, i = this;
                        if (e)
                            for (n = 0; n < t.length; n++) i.on(t[n], s);
                        return this
                    },
                    animationEnd: function(e) {
                        function s(r) {
                            e(r);
                            for (n = 0; n < t.length; n++) i.off(t[n], s)
                        }
                        var t = ["webkitAnimationEnd", "OAnimationEnd", "MSAnimationEnd", "animationend"],
                            n, r, i = this;
                        if (e)
                            for (n = 0; n < t.length; n++) i.on(t[n], s);
                        return this
                    },
                    width: function() {
                        return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css("width")) - parseFloat(this.css("padding-left")) - parseFloat(this.css("padding-right")) : null
                    },
                    outerWidth: function(e) {
                        return this.length > 0 ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
                    },
                    height: function() {
                        return this[0] === window ? window.innerHeight : this.length > 0 ? this[0].offsetHeight - parseFloat(this.css("padding-top")) - parseFloat(this.css("padding-bottom")) : null
                    },
                    outerHeight: function(e) {
                        return this.length > 0 ? e ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight : null
                    },
                    offset: function() {
                        if (this.length > 0) {
                            var e = this[0],
                                t = e.getBoundingClientRect(),
                                n = document.body,
                                r = e.clientTop || n.clientTop || 0,
                                i = e.clientLeft || n.clientLeft || 0,
                                s = window.pageYOffset || e.scrollTop,
                                o = window.pageXOffset || e.scrollLeft;
                            return {
                                top: t.top + s - r,
                                left: t.left + o - i
                            }
                        }
                        return null
                    },
                    hide: function() {
                        for (var e = 0; e < this.length; e++) this[e].style.display = "none";
                        return this
                    },
                    show: function() {
                        for (var e = 0; e < this.length; e++) this[e].style.display = "block";
                        return this
                    },
                    css: function(e, t) {
                        var n;
                        if (arguments.length === 1) {
                            if (typeof e != "string") {
                                for (n = 0; n < this.length; n++)
                                    for (var r in e) this[n].style[r] = e[r];
                                return this
                            }
                            if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(e)
                        }
                        if (arguments.length === 2 && typeof e == "string") {
                            for (n = 0; n < this.length; n++) this[n].style[e] = t;
                            return this
                        }
                        return this
                    },
                    each: function(e) {
                        for (var t = 0; t < this.length; t++) e.call(this[t], t, this[t]);
                        return this
                    },
                    html: function(e) {
                        if (typeof e == "undefined") return this[0] ? this[0].innerHTML : undefined;
                        for (var t = 0; t < this.length; t++) this[t].innerHTML = e;
                        return this
                    },
                    text: function(e) {
                        if (typeof e == "undefined") return this[0] ? this[0].textContent.trim() : null;
                        for (var t = 0; t < this.length; t++) this[0].textContent = e
                    },
                    is: function(n) {
                        if (!this[0]) return !1;
                        var r, i;
                        if (typeof n == "string") {
                            var s = this[0];
                            if (s === document) return n === document;
                            if (s === window) return n === window;
                            if (s.matches) return s.matches(n);
                            if (s.webkitMatchesSelector) return s.webkitMatchesSelector(n);
                            if (s.mozMatchesSelector) return s.mozMatchesSelector(n);
                            if (s.msMatchesSelector) return s.msMatchesSelector(n);
                            r = t(n);
                            for (i = 0; i < r.length; i++)
                                if (r[i] === this[0]) return !0;
                            return !1
                        }
                        if (n === document) return this[0] === document;
                        if (n === window) return this[0] === window;
                        if (n.nodeType || n instanceof e) {
                            r = n.nodeType ? [n] : n;
                            for (i = 0; i < r.length; i++)
                                if (r[i] === this[0]) return !0;
                            return !1
                        }
                        return !1
                    },
                    indexOf: function(e) {
                        for (var t = 0; t < this.length; t++)
                            if (this[t] === e) return t
                    },
                    index: function() {
                        if (this[0]) {
                            var e = this[0],
                                t = 0;
                            while ((e = e.previousSibling) !== null) e.nodeType === 1 && t++;
                            return t
                        }
                        return undefined
                    },
                    eq: function(t) {
                        if (typeof t == "undefined") return this;
                        var n = this.length,
                            r;
                        return t > n - 1 ? new e([]) : t < 0 ? (r = n + t, r < 0 ? new e([]) : new e([this[r]])) : new e([this[t]])
                    },
                    append: function(t) {
                        var n, r;
                        for (n = 0; n < this.length; n++)
                            if (typeof t == "string") {
                                var i = document.createElement("div");
                                i.innerHTML = t;
                                while (i.firstChild) this[n].appendChild(i.firstChild)
                            } else if (t instanceof e)
                            for (r = 0; r < t.length; r++) this[n].appendChild(t[r]);
                        else this[n].appendChild(t);
                        return this
                    },
                    prepend: function(t) {
                        var n, r;
                        for (n = 0; n < this.length; n++)
                            if (typeof t == "string") {
                                var i = document.createElement("div");
                                i.innerHTML = t;
                                for (r = i.childNodes.length - 1; r >= 0; r--) this[n].insertBefore(i.childNodes[r], this[n].childNodes[0])
                            } else if (t instanceof e)
                            for (r = 0; r < t.length; r++) this[n].insertBefore(t[r], this[n].childNodes[0]);
                        else this[n].insertBefore(t, this[n].childNodes[0]);
                        return this
                    },
                    insertBefore: function(e) {
                        var n = t(e);
                        for (var r = 0; r < this.length; r++)
                            if (n.length === 1) n[0].parentNode.insertBefore(this[r], n[0]);
                            else if (n.length > 1)
                            for (var i = 0; i < n.length; i++) n[i].parentNode.insertBefore(this[r].cloneNode(!0), n[i])
                    },
                    insertAfter: function(e) {
                        var n = t(e);
                        for (var r = 0; r < this.length; r++)
                            if (n.length === 1) n[0].parentNode.insertBefore(this[r], n[0].nextSibling);
                            else if (n.length > 1)
                            for (var i = 0; i < n.length; i++) n[i].parentNode.insertBefore(this[r].cloneNode(!0), n[i].nextSibling)
                    },
                    next: function(n) {
                        return this.length > 0 ? n ? this[0].nextElementSibling && t(this[0].nextElementSibling).is(n) ? new e([this[0].nextElementSibling]) : new e([]) : this[0].nextElementSibling ? new e([this[0].nextElementSibling]) : new e([]) : new e([])
                    },
                    nextAll: function(n) {
                        var r = [],
                            i = this[0];
                        if (!i) return new e([]);
                        while (i.nextElementSibling) {
                            var s = i.nextElementSibling;
                            n && t(s).is(n) ? r.push(s) : r.push(s), i = s
                        }
                        return new e(r)
                    },
                    prev: function(n) {
                        return this.length > 0 ? n ? this[0].previousElementSibling && t(this[0].previousElementSibling).is(n) ? new e([this[0].previousElementSibling]) : new e([]) : this[0].previousElementSibling ? new e([this[0].previousElementSibling]) : new e([]) : new e([])
                    },
                    prevAll: function(n) {
                        var r = [],
                            i = this[0];
                        if (!i) return new e([]);
                        while (i.previousElementSibling) {
                            var s = i.previousElementSibling;
                            n && t(s).is(n) ? r.push(s) : r.push(s), i = s
                        }
                        return new e(r)
                    },
                    parent: function(e) {
                        var n = [];
                        for (var r = 0; r < this.length; r++) e ? t(this[r].parentNode).is(e) && n.push(this[r].parentNode) : n.push(this[r].parentNode);
                        return t(t.unique(n))
                    },
                    parents: function(e) {
                        var n = [];
                        for (var r = 0; r < this.length; r++) {
                            var i = this[r].parentNode;
                            while (i) e ? t(i).is(e) && n.push(i) : n.push(i), i = i.parentNode
                        }
                        return t(t.unique(n))
                    },
                    find: function(t) {
                        var n = [];
                        for (var r = 0; r < this.length; r++) {
                            var i = this[r].querySelectorAll(t);
                            for (var s = 0; s < i.length; s++) n.push(i[s])
                        }
                        return new e(n)
                    },
                    children: function(n) {
                        var r = [];
                        for (var i = 0; i < this.length; i++) {
                            var s = this[i].childNodes;
                            for (var o = 0; o < s.length; o++) n ? s[o].nodeType === 1 && t(s[o]).is(n) && r.push(s[o]) : s[o].nodeType === 1 && r.push(s[o])
                        }
                        return new e(t.unique(r))
                    },
                    remove: function() {
                        for (var e = 0; e < this.length; e++) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
                        return this
                    },
                    detach: function() {
                        return this.remove()
                    }
                },
                function() {
                    function r(t) {
                        e.prototype[t] = function(e) {
                            var r;
                            if (typeof e == "undefined") {
                                for (r = 0; r < this.length; r++) n.indexOf(t) < 0 && this[r][t]();
                                return this
                            }
                            return this.on(t, e)
                        }
                    }
                    var t = "click blur focus focusin focusout keyup keydown keypress submit change mousedown mousemove mouseup mouseenter mouseleave mouseout mouseover touchstart touchend touchmove resize scroll".split(" "),
                        n = "resize scroll".split(" ");
                    for (var i = 0; i < t.length; i++) r(t[i])
                }();
            var n = 0;
            return t.ajax = function(e) {
                    var r = {
                        method: "GET",
                        data: !1,
                        async: !0,
                        cache: !0,
                        user: "",
                        password: "",
                        headers: {},
                        xhrFields: {},
                        statusCode: {},
                        processData: !0,
                        dataType: "text",
                        contentType: "application/x-www-form-urlencoded",
                        timeout: 0
                    };
                    e.type && (e.method = e.type);
                    for (var i in r) i in e || (e[i] = r[i]);
                    e.url || (e.url = window.location.toString());
                    var s = e.method.toUpperCase();
                    if ((s === "GET" || s === "HEAD") && e.data) {
                        var o;
                        typeof e.data == "string" ? e.data.indexOf("?") >= 0 ? o = e.data.split("?")[1] : o = e.data : o = t.serializeObject(e.data), e.url.indexOf("?") >= 0 ? e.url += "&" + o : e.url += "?" + o
                    }
                    if (e.dataType === "json" && e.url.indexOf("callback=") >= 0) {
                        var u = "f7jsonp_" + Date.now() + n++,
                            a, f, l = e.url.split("callback=");
                        if (l[1].indexOf("&") >= 0) {
                            var c = l[1].split("&").filter(function(e) {
                                return e.indexOf("=") > 0
                            }).join("&");
                            a = l[0] + "callback=" + u + (c.length > 0 ? "&" + c : "")
                        } else a = l[0] + "callback=" + u;
                        var h = document.createElement("script");
                        h.type = "text/javascript", h.onerror = function() {
                            clearTimeout(f), e.error && e.error()
                        }, h.src = a, window[u] = function(t) {
                            clearTimeout(f), e.success && e.success(t), h.parentNode.removeChild(h), h = null, delete window[u]
                        }, document.querySelector("head").appendChild(h), e.timeout > 0 && (f = setTimeout(function() {
                            h.parentNode.removeChild(h), h = null, e.error && e.error()
                        }, e.timeout));
                        return
                    }(s === "GET" || s === "HEAD") && e.cache === !1 && (e.url += "_nocache=" + Date.now());
                    var p = new XMLHttpRequest;
                    p.open(s, e.url, e.async, e.user, e.password);
                    var d = null;
                    if ((s === "POST" || s === "PUT") && e.data)
                        if (e.processData) {
                            var v = [ArrayBuffer, Blob, Document, FormData];
                            if (v.indexOf(e.data.constructor) >= 0) d = e.data;
                            else {
                                var m = "---------------------------" + Date.now().toString(16);
                                e.contentType === "multipart/form-data" ? p.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + m) : p.setRequestHeader("Content-Type", e.contentType), d = "";
                                var g = t.serializeObject(e.data);
                                if (e.contentType === "multipart/form-data") {
                                    m = "---------------------------" + Date.now().toString(16), g = g.split("&");
                                    var y = [];
                                    for (var b = 0; b < g.length; b++) y.push('Content-Disposition: form-data; name="' + g[b].split("=")[0] + '"\r\n\r\n' + g[b].split("=")[1] + "\r\n");
                                    d = "--" + m + "\r\n" + y.join("--" + m + "\r\n") + "--" + m + "--\r\n"
                                } else d = e.contentType === "application/x-www-form-urlencoded" ? g : g.replace(/&/g, "\r\n")
                            }
                        } else d = e.data;
                    if (e.headers)
                        for (var w in e.headers) p.setRequestHeader(w, e.headers[w]);
                    typeof e.crossDomain == "undefined" && (e.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(e.url) && RegExp.$2 !== window.location.host), e.crossDomain || p.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                    if (e.xhrFields)
                        for (var E in e.xhrFields) p[E] = e.xhrFields[E];
                    return p.onload = function(n) {
                        if (p.status === 200 || p.status === 0) {
                            t(document).trigger("ajaxSuccess", {
                                xhr: p
                            });
                            if (e.success) {
                                var r = p.responseText;
                                e.dataType === "json" && (r = JSON.parse(r)), e.success(r, p.status, p)
                            }
                        }
                        e.statusCode && e.statusCode[p.status] && e.statusCode[p.status](p), e.complete && e.complete(p), t(document).trigger("ajaxComplete", {
                            xhr: p
                        })
                    }, p.onerror = function(n) {
                        t(document).trigger("ajaxError", {
                            xhr: p
                        }), e.error && e.error(p)
                    }, e.start && e.start(p), t(document).trigger("ajaxStart", {
                        xhr: p
                    }), p.send(d), p
                },
                function() {
                    function n(e) {
                        t[e] = function(n, r, i) {
                            return t.ajax({
                                url: n,
                                method: e === "post" ? "POST" : "GET",
                                data: typeof r == "function" ? undefined : r,
                                success: typeof r == "function" ? r : i,
                                dataType: e === "getJSON" ? "json" : undefined
                            })
                        }
                    }
                    var e = "get post getJSON".split(" ");
                    for (var r = 0; r < e.length; r++) n(e[r])
                }(), t.parseUrlQuery = function(e) {
                    var t = {},
                        n, r, i;
                    if (e.indexOf("?") >= 0) {
                        e = e.split("?")[1], r = e.split("&");
                        for (n = 0; n < r.length; n++) i = r[n].split("="), t[i[0]] = i[1];
                        return t
                    }
                    return t
                }, t.isArray = function(e) {
                    return Object.prototype.toString.apply(e) === "[object Array]" ? !0 : !1
                }, t.unique = function(e) {
                    var t = [];
                    for (var n = 0; n < e.length; n++) t.indexOf(e[n]) === -1 && t.push(e[n]);
                    return t
                }, t.trim = function(e) {
                    return e.trim()
                }, t.serializeObject = function(e) {
                    if (typeof e == "string") return e;
                    var n = [],
                        r = "&";
                    for (var i in e)
                        if (t.isArray(e[i])) {
                            var s = [];
                            for (var o = 0; o < e[i].length; o++) s.push(i + "=" + e[i][o]);
                            n.push(s.join(r))
                        } else n.push(i + "=" + e[i]);
                    return n.join(r)
                }, t.getTranslate = function(e, t) {
                    var n, r, i, s;
                    return typeof t == "undefined" && (t = "x"), i = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? s = new WebKitCSSMatrix(i.webkitTransform === "none" ? "" : i.webkitTransform) : (s = i.MozTransform || i.OTransform || i.MsTransform || i.msTransform || i.transform || i.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), n = s.toString().split(",")), t === "x" && (window.WebKitCSSMatrix ? r = s.m41 : n.length === 16 ? r = parseFloat(n[12]) : r = parseFloat(n[4])), t === "y" && (window.WebKitCSSMatrix ? r = s.m42 : n.length === 16 ? r = parseFloat(n[13]) : r = parseFloat(n[5])), r || 0
                }, t.requestAnimationFrame = function(e) {
                    return window.requestAnimationFrame ? window.requestAnimationFrame(e) : window.webkitRequestAnimationFrame ? window.webkitRequestAnimationFrame(e) : window.mozRequestAnimationFrame ? window.mozRequestAnimationFrame(e) : window.setTimeout(e, 1e3 / 60)
                }, t.supportTouch = !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch), t.fn = e.prototype, t.fn.scrollTo = function(e, n, r) {
                    return this.each(function() {
                        function m(e) {
                            e === undefined && (e = (new Date).getTime()), v === null && (v = e);
                            var n, u, a;
                            p && (c = s + (e - v) / r * (f - s)), d && (h = o + (e - v) / r * (l - o)), p && f > s && c >= f && (i.scrollTop = f, a = !0), p && f < s && c <= f && (i.scrollTop = f, a = !0), d && l > o && h >= l && (i.scrollLeft = l, a = !0), d && l < o && h <= l && (i.scrollLeft = l, a = !0);
                            if (a) return;
                            p && (i.scrollTop = c), d && (i.scrollLeft = h), t.requestAnimationFrame(m)
                        }
                        var i = this,
                            s, o, u, a, f, l, c, h, p = n > 0 || n === 0,
                            d = e > 0 || e === 0;
                        p && (s = i.scrollTop, r || (i.scrollTop = n)), d && (o = i.scrollLeft, r || (i.scrollLeft = e));
                        if (!r) return;
                        p && (u = i.scrollHeight - i.offsetHeight, f = Math.max(Math.min(n, u), 0)), d && (a = i.scrollWidth - i.offsetWidth, l = Math.max(Math.min(e, a), 0));
                        var v = null;
                        p && f === s && (p = !1), d && l === o && (d = !1), t.requestAnimationFrame(m)
                    })
                }, t.fn.scrollTop = function(e, t) {
                    var n = this;
                    return typeof e == "undefined" ? n.length > 0 ? n[0].scrollTop : null : n.scrollTo(undefined, e, t)
                }, t.fn.scrollLeft = function(e, t) {
                    var n = this;
                    return typeof e == "undefined" ? n.length > 0 ? n[0].scrollLeft : null : n.scrollTo(e, undefined, t)
                }, t
        }();
        Framework7.$ = e;
        var t = e;
        window.Dom7 = e, Framework7.prototype.support = function() {
            var e = {
                touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
            };
            return e
        }(), Framework7.prototype.device = function() {
            var t = {},
                n = navigator.userAgent,
                r = e,
                i = n.match(/(Android);?[\s\/]+([\d.]+)?/),
                s = n.match(/(iPad).*OS\s([\d_]+)/),
                o = n.match(/(iPod)(.*OS\s([\d_]+))?/),
                u = !s && n.match(/(iPhone\sOS)\s([\d_]+)/);
            t.ios = t.android = t.iphone = t.ipad = !1, i && (t.os = "android", t.osVersion = i[2], t.android = !0);
            if (s || u || o) t.os = "ios", t.ios = !0;
            u && !o && (t.osVersion = u[2].replace(/_/g, "."), t.iphone = !0), s && (t.osVersion = s[2].replace(/_/g, "."), t.ipad = !0), o && (t.osVersion = o[3] ? o[3].replace(/_/g, ".") : null, t.iphone = !0), t.ios && t.osVersion && n.indexOf("Version/") >= 0 && t.osVersion.split(".")[0] === "10" && (t.osVersion = n.toLowerCase().split("version/")[1].split(" ")[0]), t.webView = (u || s || o) && n.match(/.*AppleWebKit(?!.*Safari)/i);
            if (t.os && t.os === "ios") {
                var a = t.osVersion.split(".");
                t.minimalUi = !t.webView && (o || u) && (a[0] * 1 === 7 ? a[1] * 1 >= 1 : a[0] * 1 > 7) && r('meta[name="viewport"]').length > 0 && r('meta[name="viewport"]').attr("content").indexOf("minimal-ui") >= 0
            }
            var f = r(window).width(),
                l = r(window).height();
            t.statusBar = !1, t.webView && f * l === screen.width * screen.height ? t.statusBar = !0 : t.statusBar = !1;
            var c = [];
            t.pixelRatio = window.devicePixelRatio || 1, t.pixelRatio >= 2 && c.push("retina");
            if (t.os) {
                c.push(t.os, t.os + "-" + t.osVersion.split(".")[0], t.os + "-" + t.osVersion.replace(/\./g, "-"));
                if (t.os === "ios") {
                    var h = parseInt(t.osVersion.split(".")[0], 10);
                    for (var p = h - 1; p >= 6; p--) c.push("ios-gt-" + p)
                }
            }
            return t.statusBar ? c.push("with-statusbar-overlay") : r("html").removeClass("with-statusbar-overlay"), c.length > 0 && r("html").addClass(c.join(" ")), t
        }(), Framework7.prototype.plugins = {}
    }(), window.Template7 = function() {
        function isArray(e) {
            return Object.prototype.toString.apply(e) === "[object Array]"
        }

        function isObject(e) {
            return e instanceof Object
        }

        function isFunction(e) {
            return typeof e == "function"
        }

        function helperToSlices(e) {
            var t = e.replace(/[{}#}]/g, "").split(" "),
                n = [],
                r, i, s;
            for (i = 0; i < t.length; i++) {
                var o = t[i];
                if (i === 0) n.push(o);
                else if (o.indexOf('"') === 0)
                    if (o.match(/"/g).length === 2) n.push(o);
                    else {
                        r = 0;
                        for (s = i + 1; s < t.length; s++) {
                            o += " " + t[s];
                            if (t[s].indexOf('"') >= 0) {
                                r = s, n.push(o);
                                break
                            }
                        }
                        r && (i = r)
                    }
                else if (o.indexOf("=") > 0) {
                    var u = o.split("="),
                        a = u[0],
                        f = u[1];
                    if (f.match(/"/g).length !== 2) {
                        r = 0;
                        for (s = i + 1; s < t.length; s++) {
                            f += " " + t[s];
                            if (t[s].indexOf('"') >= 0) {
                                r = s;
                                break
                            }
                        }
                        r && (i = r)
                    }
                    var l = [a, f.replace(/"/g, "")];
                    n.push(l)
                } else n.push(o)
            }
            return n
        }

        function stringToBlocks(e) {
            var t = [],
                n, r, i;
            if (!e) return [];
            var s = e.split(/({{[^{^}]*}})/);
            for (n = 0; n < s.length; n++) {
                var o = s[n];
                if (o === "") continue;
                if (o.indexOf("{{") < 0) t.push({
                    type: "plain",
                    content: o
                });
                else {
                    if (o.indexOf("{/") >= 0) continue;
                    if (o.indexOf("{#") < 0 && o.indexOf(" ") < 0 && o.indexOf("else") < 0) {
                        t.push({
                            type: "variable",
                            contextName: o.replace(/[{}]/g, "")
                        });
                        continue
                    }
                    var u = helperToSlices(o),
                        a = u[0],
                        f = [],
                        l = {};
                    for (r = 1; r < u.length; r++) {
                        var c = u[r];
                        isArray(c) ? l[c[0]] = c[1] === "false" ? !1 : c[1] : f.push(c)
                    }
                    if (o.indexOf("{#") >= 0) {
                        var h = n,
                            p = "",
                            d = "",
                            v = 0,
                            m, g = !1,
                            y = !1,
                            b = !1,
                            w = 0;
                        for (r = n + 1; r < s.length; r++) {
                            s[r].indexOf("{{#") >= 0 && w++, s[r].indexOf("{{/") >= 0 && w--;
                            if (s[r].indexOf("{{#" + a) >= 0) p += s[r], y && (d += s[r]), v++;
                            else if (s[r].indexOf("{{/" + a) >= 0) {
                                if (!(v > 0)) {
                                    m = r, g = !0;
                                    break
                                }
                                v--, p += s[r], y && (d += s[r])
                            } else s[r].indexOf("else") >= 0 && w === 0 ? y = !0 : (y || (p += s[r]), y && (d += s[r]))
                        }
                        g && (m && (n = m), t.push({
                            type: "helper",
                            helperName: a,
                            contextName: f,
                            content: p,
                            inverseContent: d,
                            hash: l
                        }))
                    } else o.indexOf(" ") > 0 && t.push({
                        type: "helper",
                        helperName: a,
                        contextName: f,
                        hash: l
                    })
                }
            }
            return t
        }
        var cache = {},
            Template7 = function(template) {
                function getCompileFn(e, t) {
                    return e.content ? compile(e.content, t) : function() {
                        return ""
                    }
                }

                function getCompileInverse(e, t) {
                    return e.inverseContent ? compile(e.inverseContent, t) : function() {
                        return ""
                    }
                }

                function getCompileVar(e, t) {
                    var n, r, i;
                    if (e.indexOf(".") > 0) e.indexOf("this") === 0 ? r = e.replace("this", t) : r = t + "." + e;
                    else if (e.indexOf("../") === 0) {
                        var s = e.split("../").length - 1,
                            o = e.split("../")[e.split("../").length - 1],
                            u = t.split("_")[1] - s;
                        r = "ctx_" + (u >= 1 ? u : 1) + "." + o
                    } else r = e === "this" ? t : t + "." + e;
                    return e && e.indexOf("@") >= 0 && (r = "(data && data." + e.replace("@", "") + ")"), r
                }

                function getCompiledArguments(e, t) {
                    var n = [];
                    for (var r = 0; r < e.length; r++) e[r].indexOf('"') === 0 ? n.push(e[r]) : n.push(getCompileVar(e[r], t));
                    return n.join(", ")
                }

                function compile(template, depth) {
                    depth = depth || 1, template = template || t.template;
                    if (typeof template != "string") throw new Error("Template7: Template must be a string");
                    var blocks = stringToBlocks(template);
                    if (blocks.length === 0) return function() {
                        return ""
                    };
                    var ctx = "ctx_" + depth,
                        resultString = "(function (" + ctx + ", data) {\n";
                    depth === 1 && (resultString += "function isArray(arr){return Object.prototype.toString.apply(arr) === '[object Array]';}\n", resultString += "function isFunction(func){return (typeof func === 'function');}\n", resultString += 'function c(val, ctx) {if (typeof val !== "undefined") {if (isFunction(val)) {return val.call(ctx);} else return val;} else return "";}\n'), resultString += "var r = '';\n";
                    var i, j, context;
                    for (i = 0; i < blocks.length; i++) {
                        var block = blocks[i];
                        if (block.type === "plain") {
                            resultString += "r +='" + block.content.replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/'/g, "\\'") + "';";
                            continue
                        }
                        var variable, compiledArguments;
                        block.type === "variable" && (variable = getCompileVar(block.contextName, ctx), resultString += "r += c(" + variable + ", " + ctx + ");");
                        if (block.type === "helper")
                            if (block.helperName in t.helpers) compiledArguments = getCompiledArguments(block.contextName, ctx), resultString += "r += (Template7.helpers." + block.helperName + ").call(" + ctx + ", " + (compiledArguments && compiledArguments + ",") + "{hash:" + JSON.stringify(block.hash) + ", data: data || {}, fn: " + getCompileFn(block, depth + 1) + ", inverse: " + getCompileInverse(block, depth + 1) + "});";
                            else {
                                if (block.contextName.length > 0) throw new Error('Template7: Missing helper: "' + block.helperName + '"');
                                variable = getCompileVar(block.helperName, ctx), resultString += "if (" + variable + ") {", resultString += "if (isArray(" + variable + ")) {", resultString += "r += (Template7.helpers.each).call(" + ctx + ", " + variable + ", {hash:" + JSON.stringify(block.hash) + ", data: data || {}, fn: " + getCompileFn(block, depth + 1) + ", inverse: " + getCompileInverse(block, depth + 1) + "});", resultString += "}else {", resultString += "r += (Template7.helpers.with).call(" + ctx + ", " + variable + ", {hash:" + JSON.stringify(block.hash) + ", data: data || {}, fn: " + getCompileFn(block, depth + 1) + ", inverse: " + getCompileInverse(block, depth + 1) + "});", resultString += "}}"
                            }
                    }
                    return resultString += "\nreturn r;})", eval.call(window, resultString)
                }
                var t = this;
                t.template = template, t.compile = function(e) {
                    return t.compiled || (t.compiled = compile(e)), t.compiled
                }
            };
        Template7.prototype = {
            options: {},
            helpers: {
                "if": function(e, t) {
                    return isFunction(e) && (e = e.call(this)), e ? t.fn(this, t.data) : t.inverse(this, t.data)
                },
                unless: function(e, t) {
                    return isFunction(e) && (e = e.call(this)), e ? t.inverse(this, t.data) : t.fn(this, t.data)
                },
                each: function(e, t) {
                    var n = "",
                        r = 0;
                    isFunction(e) && (e = e.call(this));
                    if (isArray(e)) {
                        t.hash.reverse && (e = e.reverse());
                        for (r = 0; r < e.length; r++) n += t.fn(e[r], {
                            first: r === 0,
                            last: r === e.length - 1,
                            index: r
                        });
                        t.hash.reverse && (e = e.reverse())
                    } else
                        for (var i in e) r++, n += t.fn(e[i], {
                            key: i
                        });
                    return r > 0 ? n : t.inverse(this)
                },
                "with": function(e, t) {
                    return isFunction(e) && (e = e.call(this)), t.fn(e)
                },
                join: function(e, t) {
                    return isFunction(e) && (e = e.call(this)), e.join(t.hash.delimeter)
                }
            }
        };
        var t7 = function(e, t) {
            if (arguments.length === 2) {
                var n = new Template7(e),
                    r = n.compile()(t);
                return n = null, r
            }
            return new Template7(e)
        };
        return t7.registerHelper = function(e, t) {
            Template7.prototype.helpers[e] = t
        }, t7.unregisterHelper = function(e) {
            Template7.prototype.helpers[e] = undefined, delete Template7.prototype.helpers[e]
        }, t7.compile = function(e, t) {
            var n = new Template7(e, t);
            return n.compile()
        }, t7.options = Template7.prototype.options, t7.helpers = Template7.prototype.helpers, t7
    }(), define("framework7", function() {}), define("mtemplate!canjsfm7-plugin/pagebase.mustache", ["can/view/mustache"], function(e) {
        var t = '<div class="navbar">\n \n  <div class="navbar-inner">\n    \n  </div>\n</div>\n<div class="pages">\n    <!-- Page, data-page contains page name-->\n    <div data-page="" class="page">\n    \n    </div>\n</div>\n';
        return can.mustache(t)
    }), define("mtemplate!canjsfm7-plugin/pagenavbar.mustache", ["can/view/mustache"], function(e) {
        var t = '{{#if showBackLink}}\n <div class="left sliding" style="">\n   <a href="#" class="back link">\n      <span>Voltar</span></a>\n </div>\n{{/if}}\n\n<div class="center sliding" style="">{{title}}</div>\n\n<div class="right">\n  <a href="#" class="open-login link icon-only"></a>\n</div>';
        return can.mustache(t)
    }), define("mtemplate!canjsfm7-plugin/popupnavbar.mustache", ["can/view/mustache"], function(e) {
        var t = '\n\n<div class="center sliding" style="">{{title}}</div>\n\n<div class="right">\n <a href="#" class="link close-popup">Fechar</a>\n</div>';
        return can.mustache(t)
    }), define("canjsfm7-plugin/plugin", ["framework7", "jquery", "mtemplate!canjsfm7-plugin/pagebase.mustache", "mtemplate!canjsfm7-plugin/pagenavbar.mustache", "mtemplate!canjsfm7-plugin/popupnavbar.mustache"], function(e, t, n, r, i) {
        Framework7.prototype.plugins.canjsPlugin = function(e, s) {
            var o = {},
                u = {};
            return e.openPage = function(e, r) {
                var i = {
                    animatePages: !0,
                    showBackLink: !0
                };
                r = can.extend(i, r), e.pageConfig = r, e.url = "", r.content = n.render(), r.element = t('<div class="page-content"></div>');
                var s = new r.pageController(r.element, r.options);
                return s._preRenderPhase().done(function() {
                    e.router.loadPage(r)
                })
            }, u.pageBeforeInit = function(e) {
                var n = t(e.container),
                    i = e.view.pageConfig;
                n.append(i.element);
                var s = n.find(".page-content").control(),
                    o = t(e.navbarInnerContainer);
                s.navbar = o;
                if (s.renderNavbar) s.renderNavbar(o);
                else {
                    var u = {
                        showBackLink: i.showBackLink
                    };
                    can.extend(u, s.navbarOptions);
                    var a = i.navbarTemplate || r;
                    o.html(a(u))
                }
                s._postRenderPhase(), e.view.pageConfig = null
            }, u.pageBeforeRemove = function(e) {
                var n = t(e.container).find(".page-content"),
                    r = n.control();
                r.destroy()
            }, e.openPopup = function(t, n) {
                var r = this,
                    s = {
                        animatePages: !1,
                        showBackLink: !1,
                        navbarTemplate: i
                    };
                n = can.extend(s, n), e.openPage(t, n).done(function() {
                    r.popup(".popup")
                })
            }, t(".popup").on("closed", function() {
                t(".popup .navbar").html(""), t(".popup .pages").html("")
            }), {
                hooks: u
            }
        }
    }), define("mtemplate!app/pages/listpage/listpage.html", ["can/view/mustache"], function(e) {
        var t = '<div class="list-block media-list issue-list" >\n<div class="list-group">\n\n  <ul>\n  {{#each statusMap}}\n   <li class="h2">{{statusText @key}}</li>\n   \n    \n    \n    {{#each .}}\n     <li  class="issue">\n       <a href="#" class="item-link" {{data \'model\'}}>\n         <div class="item-content">\n            <div class="item-inner">\n              <div class="item-title-row">\n                <div class="item-title title">{{title}}</div>\n             </div>\n              <div class="description">{{description}}</div>\n            </div>\n          </div>\n        </a>\n      </li>\n   {{/each}}\n   \n  {{/each}}\n </ul>\n</div>\n</div>';
        return can.mustache(t)
    }), define("mtemplate!app/pages/listpage/pagenavbar.html", ["can/view/mustache"], function(e) {
        var t = '\n\n\n<div class="center sliding" style="">Gerenciamento de Tarefas</div>\n\n\n<div class="right contact-edit-link">\n <a href="#" class="icon-only" id="create-new">\n    +\n </a>\n</div>';
        return can.mustache(t)
    }), define("canjs-commons/functions", ["jquery", "can"], function(e, t) {
        var n = {
            jsonajax: function(t) {
                return e.ajax({
                    url: t.url,
                    processData: !1,
                    data: JSON.stringify(t.data),
                    dataType: t.dataType || "json",
                    contentType: "application/json",
                    type: t.type || "POST"
                })
            },
            dfdMap: function(t) {
                var n = e.Deferred(),
                    r = [],
                    i = [];
                return e.map(t, function(e, t) {
                    r.push(e), i.push(t)
                }), e.when.apply(null, r).done(function() {
                    var t = arguments,
                        r = {};
                    e.each(t, function(e, t) {
                        var n = i[e];
                        n && (r[n] = t)
                    }), n.resolve(r)
                }).fail(function(e, t, r) {
                    n.reject()
                }), n
            }
        };
        return n
    }), define("basecontroller", ["can", "canjs-commons/functions", "jquery", "can/construct/super"], function(e, t, n) {
        return e.Control.extend({}, {
            init: function(e, t) {},
            render: function() {
                var e = this;
                return this._preRenderPhase().done(function() {
                    e._postRenderPhase()
                })
            },
            _preRenderPhase: function() {
                var r = this,
                    i = r.element,
                    s = n.Deferred(),
                    o = r.getData() || {};
                return n.when(t.dfdMap(o)).done(function(t) {
                    if (!r.element) {
                        s.fail();
                        return
                    }
                    e.extend(r.options, t), r.options = new e.Map(r.options), n.when(r.preRender(r.options)).done(function() {
                        s.resolve()
                    })
                }).fail(function() {
                    s.fail()
                }), s.promise()
            },
            _postRenderPhase: function() {
                var e = this,
                    t = this.element;
                t.html(e.template(e.options)), e.postRender(e.options), t.addClass("controller"), t.trigger("rendered")
            },
            reRender: function() {
                return this.render()
            },
            getData: function() {
                return {}
            },
            preRender: function(e) {},
            postRender: function(e) {},
            destroy: function() {
                this.element && this.element.removeClass("controller"), this._super()
            }
        })
    }), define("app/pages/listpage/listpage", ["mtemplate!app/pages/listpage/listpage.html", "mtemplate!app/pages/listpage/pagenavbar.html", "basecontroller"], function(e, t, n) {
        n.extend("Page.ListPage", {}, {
            template: e,
            getData: function() {
                return {
                    issues: Model.Issue.findAll()
                }
            },
            preRender: function(e) {
                e.attr("statusMap", new can.Map({
                    todo: e.issues.withStatus("todo"),
                    inprogress: e.issues.withStatus("inprogress"),
                    done: e.issues.withStatus("done")
                }))
            },
            renderNavbar: function(e) {
                e.html(t(this.options)), this.on(e.find("a#create-new"), "click", function(e) {
                    e.stop(), App.openPopup(Page.EditIssuePage, {})
                })
            },
            ".item-link click": function(e, t) {
                t.stop(), App.openPage(Page.IssuePage, {
                    issue: e.model()
                })
            },
            "{Model.Issue} statuschange": function(e, t, n) {
                var r = this.options.statusMap;
                if (n.from) {
                    var i = r.attr(n.from);
                    i.remove(n.issue)
                }
                if (n.to) {
                    var s = r.attr(n.to);
                    s.push(n.issue)
                }
            }
        })
    }), define("mtemplate!app/pages/issuepage/issuepage.html", ["can/view/mustache"], function(e) {
        var t = '\n    <div class="list-block issue-content">\n      <ul>\n        <li class="item-content">\n          <div class="item-inner title">\n            {{issue.title}}\n          </div>\n        </li>\n        <li class="item-content">\n          <div class="item-inner description">\n            {{issue.description}}\n          </div>\n        </li>\n       \n        <li>\n     <div class="item-content ">\n     \n        <div class="item-inner status">\n       <div class="item-title label">{{statusText issue.status}} </div>\n        <div class="item-input">\n          {{#if issue.nextStatus}}\n          <a class="button" id="move-to-next-status">Alterar Status para {{statusText issue.nextStatus}}</a>\n          {{/if}}\n       </div>\n        </div>\n      </div>\n    </li>\n      </ul>\n    </div>\n  \n  \n  \n  \n  \n  \n  <h2>Comentários</h2>\n \n  {{#each issue.comments}}\n  <div class="content-block comment">\n   <div class="title date">{{dateformat date}}</div>\n   <div class="text description">{{text}}</div>\n  </div>\n  {{/each}}\n {{#unless issue.comments.length}}\n <div class="content-block comment">\n   <div class="text description">Sem Comentários!</div>\n </div>\n  {{/unless}}\n\n <div class="content-block list-block">\n  \n  \n  \n  <textarea class="description new-comment" placeholder="Comentar" can-value="newComment.text"></textarea>\n  \n  <div class="row">\n   <div class="col-75"></div>\n    <div class="col-25">\n      <a class="button" id="post-comment">Publicar</a>\n    </div>\n  </div>\n         \n         \n         \n\n</div>\n';
        return can.mustache(t)
    }), define("mtemplate!app/pages/issuepage/pagenavbar.html", ["can/view/mustache"], function(e) {
        var t = '<div class="left sliding" style="">\n <a href="#" class="back link">\n    <span>Voltar</span></a>\n</div>\n\n\n<div class="center sliding" style=""></div>\n\n<div class="right contact-edit-link">\n <a href="#" class="icon-only" id="edit">\n    Editar\n  </a>\n</div>';
        return can.mustache(t)
    }), define("app/pages/issuepage/issuepage", ["mtemplate!app/pages/issuepage/issuepage.html", "mtemplate!app/pages/issuepage/pagenavbar.html", "basecontroller"], function(e, t, n) {
        n.extend("Page.IssuePage", {}, {
            template: e,
            preRender: function(e) {
                e.attr("newComment", new Model.Comment)
            },
            renderNavbar: function(e) {
                var n = this;
                e.html(t(this.options)), this.on(e.find("a#edit"), "click", function(e) {
                    e.stop(), App.openPopup(Page.EditIssuePage, {
                        issue: n.options.issue
                    })
                })
            },
            "a#post-comment click": function(e, t) {
                t.stop();
                var n = this.options.newComment;
                n.attr("date", new Date), this.options.issue.addComment(n), this.options.attr("newComment", new Model.Comment)
            },
            "a#move-to-next-status click": function(e, t) {
                t.stop();
                var n = this.options.issue;
                n.attr("status", n.nextStatus()), n.save()
            }
        })
    }), define("mtemplate!app/pages/editissuepage/editissuepage.html", ["can/view/mustache"], function(e) {
        var t = '    <div class="list-block issue-content">\n      <ul>\n       <li class="item-content">\n          <div class="item-inner title">\n            <input type="text" class="title" placeholder="Titulo" can-value="issue.title">\n          </div>\n        </li>\n        <li class="item-content">\n          <div class="item-inner description">\n            <textarea class="description" placeholder="Descrição" can-value="issue.description"></textarea>\n \n          </div>\n        </li>\n       \n        <li>\n      <div class="item-content ">\n     \n        <div class="item-inner status">\n       <div class="item-title label">Status</div>\n        <div class="item-input">\n          <select can-value="issue.status">\n   \n            <option value="todo">{{statusText "todo"}}</option>\n           <option value="inprogress">{{statusText "inprogress"}}</option>\n           <option value="done">{{statusText "done"}}</option>\n         \n          </select>\n       </div>\n        </div>\n      </div>\n    </li>\n      </ul>\n    </div>\n\n\n\n\n<div class="content-block">\n <div class="row">\n   <div class="col-50"><a href="#" id="cancel" class="button button-big">Cancelar</a></div>\n    <div class="col-50"><a href="#" id="save" class="button button-big button-fill">Salvar</a></div>\n\n  </div>\n\n</div>\n\n</div>';
        return can.mustache(t)
    }), define("mtemplate!app/pages/editissuepage/pagenavbar.html", ["can/view/mustache"], function(e) {
        var t = '\n\n\n<div class="center sliding" style="">{{navbarTitle}}</div>\n\n<div class="right contact-edit-link">\n  <a href="#" class="link close-popup">Fechar</a>\n</div>';
        return can.mustache(t)
    }), define("app/pages/editissuepage/editissuepage", ["mtemplate!app/pages/editissuepage/editissuepage.html", "mtemplate!app/pages/editissuepage/pagenavbar.html", "basecontroller"], function(e, t, n) {
        n.extend("Page.EditIssuePage", {}, {
            template: e,
            preRender: function(e) {
                e.issue == null ? (e.attr("issue", new Model.Issue), e.attr("navbarTitle", "Criar Tarefa")) : e.attr("navbarTitle", "Editar Tarefa")
            },
            renderNavbar: function(e) {
                var n = this,
                    r = this.options;
                e.html(t(r))
            },
            "a#cancel click": function(e, t) {
                t.stop(), this.element.trigger("close")
            },
            "a#save click": function(e, t) {
                t.stop();
                var n = this;
                this.options.issue.save().done(function(e) {
                    n.element.trigger("close")
                })
            },
            destroy: function() {
                this.options.issue.restore(), this._super()
            }
        })
    }), define("app/pages", ["app/pages/listpage/listpage", "app/pages/issuepage/issuepage", "app/pages/editissuepage/editissuepage"], function() {}), define("app/models/issue", ["can"], function(e) {
        e.Model.extend("Model.Issue", {
            findAll: "GET /issue",
            create: "POST /issue",
            update: "PUT /issue/{id}"
        }, {
            status: "todo",
            comments: [],
            init: function() {
                this.backup()
            },
            addComment: function(e) {
                this.comments.push(e)
            },
            save: function() {
                var t = this,
                    n;
                return this.id == null && (n = {
                    to: this.status
                }), this._super().done(function() {
                    n = n || {
                        from: t._backupStore.status,
                        to: t.status
                    }, t.backup(), n.from != n.to && (n.issue = t, e.trigger(Model.Issue, "statuschange", n))
                })
            },
            restore: function() {
                this._super()
            },
            nextStatus: function() {
                switch (this.attr("status")) {
                    case "todo":
                        return "inprogress";
                    case "inprogress":
                        return "done";
                    case "done":
                        return null
                }
            }
        }), Model.Issue.List = Model.Issue.List.extend({}, {
            withStatus: function(e) {
                return this.grep(function(t) {
                    return t.status == e
                })
            }
        })
    }), define("app/models/comment", ["can"], function(e) {
        e.Model.extend("Model.Comment", {}, {})
    }), define("app/models", ["app/models/issue", "app/models/comment"], function() {}), define("can/util/fixture", ["can/util/library", "can/util/string", "can/util/object"], function(e) {
        if (!e.Object) throw new Error("can.fixture depends on can.Object. Please include it before can.fixture.");
        var t = function(t) {
                return typeof steal != "undefined" ? e.isFunction(steal.config) ? steal.config().root.mapJoin(t).toString() : steal.root.join(t).toString() : (e.fixture.rootUrl || "") + t
            },
            n = function(n, r) {
                if (!e.fixture.on) return;
                var i = function() {};
                n.type = n.type || n.method || "GET";
                var s = a(n);
                if (!n.fixture) {
                    window.location.protocol === "file:" && i("ajax request to " + n.url + ", no fixture found");
                    return
                }
                typeof n.fixture == "string" && e.fixture[n.fixture] && (n.fixture = e.fixture[n.fixture]);
                if (typeof n.fixture == "string") {
                    var o = n.fixture;
                    /^\/\//.test(o) && (o = t(n.fixture.substr(2))), s && (o = e.sub(o, s)), delete n.fixture, n.url = o, n.data = null, n.type = "GET", n.error || (n.error = function(e, t, n) {
                        throw "fixtures.js Error " + t + " " + n
                    })
                } else n.dataTypes && n.dataTypes.splice(0, 0, "fixture"), s && r && (r.data = r.data || {}, e.extend(r.data, s))
            },
            r = function(e, t, n, r) {
                return typeof e != "number" && (r = t, n = e, t = "success", e = 200), typeof t != "string" && (r = n, n = t, t = "success"), e >= 400 && e <= 599 && (this.dataType = "text"), [e, t, i(this, n), r]
            },
            i = function(e, t) {
                var n = e.dataTypes ? e.dataTypes[0] : e.dataType || "json";
                if (!t || !t[n]) {
                    var r = {};
                    r[n] = t, t = r
                }
                return t
            };
        if (e.ajaxPrefilter && e.ajaxTransport) e.ajaxPrefilter(n), e.ajaxTransport("fixture", function(t, n) {
            t.dataTypes.shift();
            var s, o = !1;
            return {
                send: function(u, a) {
                    s = setTimeout(function() {
                        var e = function() {
                                o === !1 && a.apply(null, r.apply(t, arguments))
                            },
                            s = t.fixture(n, e, u, t);
                        s !== undefined && a(200, "success", i(t, s), {})
                    }, e.fixture.delay)
                },
                abort: function() {
                    o = !0, clearTimeout(s)
                }
            }
        });
        else {
            var s = e.ajax;
            e.ajax = function(t) {
                n(t, t);
                if (t.fixture) {
                    var i, o = new e.Deferred,
                        u = !1;
                    return o.getResponseHeader = function() {}, o.then(t.success, t.fail), o.abort = function() {
                        clearTimeout(i), u = !0, o.reject(o)
                    }, i = setTimeout(function() {
                        var e = function() {
                                var e = r.apply(t, arguments),
                                    n = e[0];
                                (n >= 200 && n < 300 || n === 304) && u === !1 ? o.resolve(e[2][t.dataType]) : o.reject(o, "error", e[1])
                            },
                            n = t.fixture(t, e, t.headers, t);
                        n !== undefined && o.resolve(n)
                    }, e.fixture.delay), o
                }
                return s(t)
            }
        }
        var o = [],
            u = function(e, t) {
                for (var n = 0; n < o.length; n++)
                    if (l._similar(e, o[n], t)) return n;
                return -1
            },
            a = function(e) {
                var t = u(e);
                if (t > -1) return e.fixture = o[t].fixture, l._getData(o[t].url, e.url)
            },
            f = function(e) {
                var t = e.data.id;
                return t === undefined && typeof e.data == "number" && (t = e.data), t === undefined && e.url.replace(/\/(\d+)(\/|$|\.)/g, function(e, n) {
                    t = n
                }), t === undefined && (t = e.url.replace(/\/(\w+)(\/|$|\.)/g, function(e, n) {
                    n !== "update" && (t = n)
                })), t === undefined && (t = Math.round(Math.random() * 1e3)), t
            },
            l = e.fixture = function(t, n) {
                if (n !== undefined) {
                    if (typeof t == "string") {
                        var r = t.match(/(GET|POST|PUT|DELETE) (.+)/i);
                        r ? t = {
                            url: r[2],
                            type: r[1]
                        } : t = {
                            url: t
                        }
                    }
                    var i = u(t, !!n);
                    i > -1 && o.splice(i, 1);
                    if (n == null) return;
                    t.fixture = n, o.push(t)
                } else e.each(t, function(e, t) {
                    l(t, e)
                })
            },
            c = e.replacer;
        return e.extend(e.fixture, {
            _similar: function(t, n, r) {
                return r ? e.Object.same(t, n, {
                    fixture: null
                }) : e.Object.subset(t, n, e.fixture._compare)
            },
            _compare: {
                url: function(e, t) {
                    return !!l._getData(t, e)
                },
                fixture: null,
                type: "i"
            },
            _getData: function(t, n) {
                var r = [],
                    i = t.replace(".", "\\.").replace("?", "\\?"),
                    s = (new RegExp(i.replace(c, function(e, t) {
                        return r.push(t), "([^/]+)"
                    }) + "$")).exec(n),
                    o = {};
                return s ? (s.shift(), e.each(r, function(e) {
                    o[e] = s.shift()
                }), o) : null
            },
            store: function(t, n, r) {
                var i = 0,
                    s = function(e) {
                        for (var t = 0; t < a.length; t++)
                            if (e == a[t].id) return a[t]
                    },
                    o = {},
                    u, a, l;
                e.isArray(t) && typeof t[0] == "string" ? (u = t, t = n, n = r, r = arguments[3]) : typeof t == "string" && (u = [t + "s", t], t = n, n = r, r = arguments[3]);
                if (typeof t == "number") a = [], l = function() {
                    a = [];
                    for (var r = 0; r < t; r++) {
                        var s = n(r, a);
                        s.id || (s.id = r), i = Math.max(s.id + 1, i + 1) || a.length, a.push(s)
                    }
                    e.isArray(u) && (e.fixture["~" + u[0]] = a, e.fixture["-" + u[0]] = o.findAll, e.fixture["-" + u[1]] = o.findOne, e.fixture["-" + u[1] + "Update"] = o.update, e.fixture["-" + u[1] + "Destroy"] = o.destroy, e.fixture["-" + u[1] + "Create"] = o.create)
                };
                else {
                    r = n;
                    var c = t;
                    l = function() {
                        a = c.slice(0)
                    }
                }
                return e.extend(o, {
                    findAll: function(t) {
                        t = t || {};
                        var n = a.slice(0);
                        t.data = t.data || {}, e.each((t.data.order || []).slice(0).reverse(), function(e) {
                            var t = e.split(" ");
                            n = n.sort(function(e, n) {
                                return t[1].toUpperCase() !== "ASC" ? e[t[0]] < n[t[0]] ? 1 : e[t[0]] === n[t[0]] ? 0 : -1 : e[t[0]] < n[t[0]] ? -1 : e[t[0]] === n[t[0]] ? 0 : 1
                            })
                        }), e.each((t.data.group || []).slice(0).reverse(), function(e) {
                            var t = e.split(" ");
                            n = n.sort(function(e, n) {
                                return e[t[0]] > n[t[0]]
                            })
                        });
                        var i = parseInt(t.data.offset, 10) || 0,
                            s = parseInt(t.data.limit, 10) || a.length - i,
                            o = 0;
                        for (var u in t.data) {
                            o = 0;
                            if (t.data[u] !== undefined && (u.indexOf("Id") !== -1 || u.indexOf("_id") !== -1))
                                while (o < n.length) t.data[u] != n[o][u] ? n.splice(o, 1) : o++
                        }
                        if (typeof r == "function") {
                            o = 0;
                            while (o < n.length) r(n[o], t) ? o++ : n.splice(o, 1)
                        } else if (typeof r == "object") {
                            o = 0;
                            while (o < n.length) e.Object.subset(n[o], t.data, r) ? o++ : n.splice(o, 1)
                        }
                        return {
                            count: n.length,
                            limit: t.data.limit,
                            offset: t.data.offset,
                            data: n.slice(i, i + s)
                        }
                    },
                    findOne: function(e, t) {
                        var n = s(f(e));
                        if (typeof n == "undefined") return t(404, "Requested resource not found");
                        t(n)
                    },
                    update: function(t, n) {
                        var r = f(t),
                            i = s(r);
                        if (typeof i == "undefined") return n(404, "Requested resource not found");
                        e.extend(i, t.data), n({
                            id: r
                        }, {
                            location: t.url || "/" + f(t)
                        })
                    },
                    destroy: function(e, t) {
                        var n = f(e),
                            r = s(n);
                        if (typeof r == "undefined") return t(404, "Requested resource not found");
                        for (var i = 0; i < a.length; i++)
                            if (a[i].id == n) {
                                a.splice(i, 1);
                                break
                            }
                        return {}
                    },
                    create: function(t, r) {
                        var s = n(a.length, a);
                        e.extend(s, t.data), s.id || (s.id = i++), a.push(s), r({
                            id: s.id
                        }, {
                            location: t.url + "/" + s.id
                        })
                    }
                }), l(), e.extend({
                    getId: f,
                    find: function(e) {
                        return s(f(e))
                    },
                    reset: l
                }, o)
            },
            rand: function h(e, t, n) {
                if (typeof e == "number") return typeof t == "number" ? e + Math.floor(Math.random() * (t - e)) : Math.floor(Math.random() * e);
                var r = h;
                if (t === undefined) return r(e, r(e.length + 1));
                var i = [];
                e = e.slice(0), n || (n = t), n = t + Math.round(r(n - t));
                for (var s = 0; s < n; s++) i.push(e.splice(r(e.length), 1)[0]);
                return i
            },
            xhr: function(t) {
                return e.extend({}, {
                    abort: e.noop,
                    getAllResponseHeaders: function() {
                        return ""
                    },
                    getResponseHeader: function() {
                        return ""
                    },
                    open: e.noop,
                    overrideMimeType: e.noop,
                    readyState: 4,
                    responseText: "",
                    responseXML: null,
                    send: e.noop,
                    setRequestHeader: e.noop,
                    status: 200,
                    statusText: "OK"
                }, t)
            },
            on: !0
        }), e.fixture.delay = 200, e.fixture.rootUrl = t(""), e.fixture["-handleFunction"] = function(t) {
            return typeof t.fixture == "string" && e.fixture[t.fixture] && (t.fixture = e.fixture[t.fixture]), typeof t.fixture == "function" ? (setTimeout(function() {
                t.success && t.success.apply(null, t.fixture(t, "success")), t.complete && t.complete.apply(null, t.fixture(t, "complete"))
            }, e.fixture.delay), !0) : !1
        }, e.fixture.overwrites = o, e.fixture.make = e.fixture.store, e.fixture
    }), define("app/models/fixtures", ["can/util/fixture"], function() {
        can.fixture.delay = 0;
        var e = function(e) {
                var t = can.fixture.store(e.length, function(t) {
                    var n = e[t];
                    return n == null ? {} : (n.id == null && (n.id = t), n)
                });
                return t
            },
            t = e([{
                title: "Testando cadastro de atividades",
                description: "testeeee",
                status: "todo"
            }, {
                title: "Insirindo Tarefas Andamento",
                description: "Testando layoutt",
                status: "inprogress"
            }, {
                title: "Tarefa",
                description: "Em proguresso",
                status: "done"
            }]);
        can.fixture({
            "GET /issue": t.findAll,
            "POST /issue": t.create,
            "PUT /issue/{id}": t.update
        })
    }), define("app/appcontrol", ["mtemplate!app/sitecontainer.html", "jquery", "can/view/mustache", "canjs-commons/extensions", "can/util/library", "can/control/route", "can/model", "can/component", "can/control", "can/route", "can/map/delegate", "can/construct/super", "can/construct/proxy", "can/control/plugin", "can/list", "can/map/backup", "can/map/define", "can/map/validations", "framework7", "canjs-commons/extensions", "canjsfm7-plugin/plugin", "app/pages", "app/models", "app/models/fixtures"], function(e) {
        can.Control.extend("AppControl", {}, {
            init: function() {
                var t = this;
                this.element.find("body").append(e({})), FM7App = new Framework7({
                    ajaxLinks: ".link",
                    swipeBackPage: !0,
                    debug: !0,
                    canjsPlugin: {}
                }), App = {
                    openPage: function(e, t) {
                        var n;
                        if (typeof e == "object") var n = e;
                        else n = {
                            pageController: e,
                            options: t
                        };
                        FM7App.openPage(App.mainView, n)
                    },
                    openPopup: function(e, t) {
                        var n;
                        if (typeof e == "object") var n = e;
                        else n = {
                            pageController: e,
                            options: t
                        };
                        FM7App.openPopup(App.popupView, n)
                    },
                    mainView: FM7App.addView(".view-main", {
                        dynamicNavbar: !0,
                        domCache: !0
                    }),
                    popupView: FM7App.addView(".popup > .view", {
                        dynamicNavbar: !0,
                        domCache: !0
                    })
                }, App.mainView.history = [], App.openPage({
                    pageController: Page.ListPage,
                    options: {},
                    animatePages: !1,
                    showBackLink: !1
                })
            },
            ".popup .controller close": function(e, t) {
                FM7App.closeModal(".popup")
            },
            ".view-main .controller close": function(e, t) {
                App.mainView.goBack()
            }
        }), can.mustache.registerHelper("statusText", function(e) {
            var t = can.isFunction(e) ? e() : e;
            switch (t) {
                case "todo":
                    return "Pendente";
                case "inprogress":
                    return "Em Execução";
                case "done":
                    return "Concluida"
            }
        }), can.mustache.registerHelper("dateformat", function(e) {
            var t = can.isFunction(e) ? e() : e;
            return t.toDateString()
        }), new AppControl(document, {})
    }), requirejs.config({
        paths: {
            jquery: "../bower_components/jquery/dist/jquery",
            can: "../bower_components/canjs/amd/can",
            framework7: "../bower_components/framework7/dist/js/framework7",
            text: "../bower_components/text/text",
            "canjs-commons": "app/canjs-commons",
            mtemplate: "app/canjs-commons/mustachetemplate",
            basecontroller: "app/canjs-commons/basecontroller",
            "canjsfm7-plugin": "app/canjsfm7-plugin"
        },
        shim: {
            can: ["jquery"],
            mtemplate: ["jquery", "can"]
        }
    }), define("app", ["app/appcontrol"], function() {});