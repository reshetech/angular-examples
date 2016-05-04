"undefined" != typeof jQuery && !function(e, t) {
    function i(e, t, i) {
        return new Array(i + 1 - e.length).join(t) + e
    }
    function n() {
        if (1 === arguments.length) {
            var t = arguments[0];
            return "string" == typeof t && (t = e.fn.timepicker.parseTime(t)),
            new Date(0,0,0,t.getHours(),t.getMinutes(),t.getSeconds())
        }
        return 3 === arguments.length ? new Date(0,0,0,arguments[0],arguments[1],arguments[2]) : 2 === arguments.length ? new Date(0,0,0,arguments[0],arguments[1],0) : new Date(0,0,0)
    }
    e.TimePicker = function() {
        var t = this;
        t.container = e(".ui-timepicker-container"),
        t.ui = t.container.find(".ui-timepicker"),
        0 === t.container.length && (t.container = e("<div></div>").addClass("ui-timepicker-container").addClass("ui-timepicker-hidden ui-helper-hidden").appendTo("body").hide(),
        t.ui = e("<div></div>").addClass("ui-timepicker").addClass("ui-widget ui-widget-content ui-menu").addClass("ui-corner-all").appendTo(t.container),
        t.viewport = e("<ul></ul>").addClass("ui-timepicker-viewport").appendTo(t.ui),
        e.fn.jquery >= "1.4.2" && t.ui.delegate("a", "mouseenter.timepicker", function() {
            t.activate(!1, e(this).parent())
        }).delegate("a", "mouseleave.timepicker", function() {
            t.deactivate(!1)
        }).delegate("a", "click.timepicker", function(i) {
            i.preventDefault(),
            t.select(!1, e(this).parent())
        }),
        t.ui.bind("click.timepicker, scroll.timepicker", function() {
            clearTimeout(t.closing)
        }))
    }
    ,
    e.TimePicker.count = 0,
    e.TimePicker.instance = function() {
        return e.TimePicker._instance || (e.TimePicker._instance = new e.TimePicker),
        e.TimePicker._instance
    }
    ,
    e.TimePicker.prototype = {
        keyCode: {
            ALT: 18,
            BLOQ_MAYUS: 20,
            CTRL: 17,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ENTER: 108,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            RIGHT: 39,
            SHIFT: 16,
            TAB: 9,
            UP: 38
        },
        _items: function(t, i) {
            var s, r, o = this, a = e("<ul></ul>"), l = null ;
            for (-1 === t.options.timeFormat.indexOf("m") && t.options.interval % 60 !== 0 && (t.options.interval = 60 * Math.max(Math.round(t.options.interval / 60), 1)),
            s = i ? n(i) : t.options.startTime ? n(t.options.startTime) : n(t.options.startHour, t.options.startMinutes),
            r = new Date(s.getTime() + 864e5); r > s; )
                o._isValidTime(t, s) && (l = e("<li>").addClass("ui-menu-item").appendTo(a),
                e("<a>").addClass("ui-corner-all").text(e.fn.timepicker.formatTime(t.options.timeFormat, s)).appendTo(l),
                l.data("time-value", s)),
                s = new Date(s.getTime() + 60 * t.options.interval * 1e3);
            return a.children()
        },
        _isValidTime: function(e, t) {
            var i = null 
              , s = null ;
            return t = n(t),
            null  !== e.options.minTime ? i = n(e.options.minTime) : (null  !== e.options.minHour || null  !== e.options.minMinutes) && (i = n(e.options.minHour, e.options.minMinutes)),
            null  !== e.options.maxTime ? s = n(e.options.maxTime) : (null  !== e.options.maxHour || null  !== e.options.maxMinutes) && (s = n(e.options.maxHour, e.options.maxMinutes)),
            null  !== i && null  !== s ? t >= i && s >= t : null  !== i ? t >= i : null  !== s ? s >= t : !0
        },
        _hasScroll: function() {
            var e = "undefined" != typeof this.ui.prop ? "prop" : "attr";
            return this.ui.height() < this.ui[e]("scrollHeight")
        },
        _move: function(e, t, i) {
            var n = this;
            if (n.closed() && n.open(e),
            !n.active)
                return void n.activate(e, n.viewport.children(i));
            var s = n.active[t + "All"](".ui-menu-item").eq(0);
            s.length ? n.activate(e, s) : n.activate(e, n.viewport.children(i))
        },
        register: function(t, i) {
            var n = this
              , s = {};
            s.element = e(t),
            s.element.data("TimePicker") || (s.options = e.metadata ? e.extend({}, i, s.element.metadata()) : e.extend({}, i),
            s.widget = n,
            e.extend(s, {
                next: function() {
                    return n.next(s)
                },
                previous: function() {
                    return n.previous(s)
                },
                first: function() {
                    return n.first(s)
                },
                last: function() {
                    return n.last(s)
                },
                selected: function() {
                    return n.selected(s)
                },
                open: function() {
                    return n.open(s)
                },
                close: function(e) {
                    return n.close(s, e)
                },
                closed: function() {
                    return n.closed(s)
                },
                destroy: function() {
                    return n.destroy(s)
                },
                parse: function(e) {
                    return n.parse(s, e)
                },
                format: function(e, t) {
                    return n.format(s, e, t)
                },
                getTime: function() {
                    return n.getTime(s)
                },
                setTime: function(e, t) {
                    return n.setTime(s, e, t)
                },
                option: function(e, t) {
                    return n.option(s, e, t)
                }
            }),
            n._setDefaultTime(s),
            n._addInputEventsHandlers(s),
            s.element.data("TimePicker", s))
        },
        _setDefaultTime: function(t) {
            "now" === t.options.defaultTime ? t.setTime(n(new Date)) : t.options.defaultTime && t.options.defaultTime.getFullYear ? t.setTime(n(t.options.defaultTime)) : t.options.defaultTime && t.setTime(e.fn.timepicker.parseTime(t.options.defaultTime))
        },
        _addInputEventsHandlers: function(t) {
            var i = this;
            t.element.bind("keydown.timepicker", function(e) {
                switch (e.which || e.keyCode) {
                case i.keyCode.ENTER:
                case i.keyCode.NUMPAD_ENTER:
                    e.preventDefault(),
                    i.closed() ? t.element.trigger("change.timepicker") : i.select(t, i.active);
                    break;
                case i.keyCode.UP:
                    t.previous();
                    break;
                case i.keyCode.DOWN:
                    t.next();
                    break;
                default:
                    i.closed() || t.close(!0)
                }
            }).bind("focus.timepicker", function() {
                t.open()
            }).bind("blur.timepicker", function() {
                t.close()
            }).bind("change.timepicker", function() {
                t.closed() && t.setTime(e.fn.timepicker.parseTime(t.element.val()))
            })
        },
        select: function(t, i) {
            var n = this
              , s = t === !1 ? n.instance : t;
            clearTimeout(n.closing),
            n.setTime(s, e.fn.timepicker.parseTime(i.children("a").text())),
            n.close(s, !0)
        },
        activate: function(e, t) {
            var i = this
              , n = e === !1 ? i.instance : e;
            if (n === i.instance) {
                if (i.deactivate(),
                i._hasScroll()) {
                    var s = t.offset().top - i.ui.offset().top
                      , r = i.ui.scrollTop()
                      , o = i.ui.height();
                    0 > s ? i.ui.scrollTop(r + s) : s >= o && i.ui.scrollTop(r + s - o + t.height())
                }
                i.active = t.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-item").end()
            }
        },
        deactivate: function() {
            var e = this;
            e.active && (e.active.children("a").removeClass("ui-state-hover").removeAttr("id"),
            e.active = null )
        },
        next: function(e) {
            return (this.closed() || this.instance === e) && this._move(e, "next", ".ui-menu-item:first"),
            e.element
        },
        previous: function(e) {
            return (this.closed() || this.instance === e) && this._move(e, "prev", ".ui-menu-item:last"),
            e.element
        },
        first: function(e) {
            return this.instance === e ? this.active && 0 === this.active.prevAll(".ui-menu-item").length : !1
        },
        last: function(e) {
            return this.instance === e ? this.active && 0 === this.active.nextAll(".ui-menu-item").length : !1
        },
        selected: function(e) {
            return this.instance === e && this.active ? this.active : null 
        },
        open: function(t) {
            var i = this
              , n = t.getTime()
              , s = t.options.dynamic && n;
            if (!t.options.dropdown)
                return t.element;
            switch ((t.rebuild || !t.items || s) && (t.items = i._items(t, s ? n : null )),
            (t.rebuild || i.instance !== t || s) && (e.fn.jquery < "1.4.2" ? (i.viewport.children().remove(),
            i.viewport.append(t.items),
            i.viewport.find("a").bind("mouseover.timepicker", function() {
                i.activate(t, e(this).parent())
            }).bind("mouseout.timepicker", function() {
                i.deactivate(t)
            }).bind("click.timepicker", function(n) {
                n.preventDefault(),
                i.select(t, e(this).parent())
            })) : (i.viewport.children().detach(),
            i.viewport.append(t.items))),
            t.rebuild = !1,
            i.container.removeClass("ui-helper-hidden ui-timepicker-hidden ui-timepicker-standard ui-timepicker-corners").show(),
            t.options.theme) {
            case "standard":
                i.container.addClass("ui-timepicker-standard");
                break;
            case "standard-rounded-corners":
                i.container.addClass("ui-timepicker-standard ui-timepicker-corners")
            }
            i.container.hasClass("ui-timepicker-no-scrollbar") || t.options.scrollbar || (i.container.addClass("ui-timepicker-no-scrollbar"),
            i.viewport.css({
                paddingRight: 40
            }));
            var r = i.container.outerHeight() - i.container.height()
              , o = t.options.zindex ? t.options.zindex : t.element.offsetParent().css("z-index")
              , a = t.element.offset();
            i.container.css({
                top: a.top + t.element.outerHeight(),
                left: a.left
            }),
            i.container.show(),
            i.container.css({
                left: t.element.offset().left,
                height: i.ui.outerHeight() + r,
                width: t.element.outerWidth(),
                zIndex: o,
                cursor: "default"
            });
            var l = i.container.width() - (i.ui.outerWidth() - i.ui.width());
            return i.ui.css({
                width: l
            }),
            i.viewport.css({
                width: l
            }),
            t.items.css({
                width: l
            }),
            i.instance = t,
            n ? t.items.each(function() {
                var s, r = e(this);
                return s = e.fn.jquery < "1.4.2" ? e.fn.timepicker.parseTime(r.find("a").text()) : r.data("time-value"),
                s.getTime() === n.getTime() ? (i.activate(t, r),
                !1) : !0
            }) : i.deactivate(t),
            t.element
        },
        close: function(e, t) {
            var i = this;
            return i.closed() || t ? (clearTimeout(i.closing),
            i.instance === e && (i.container.addClass("ui-helper-hidden ui-timepicker-hidden").hide(),
            i.ui.scrollTop(0),
            i.ui.children().removeClass("ui-state-hover"))) : i.closing = setTimeout(function() {
                i.close(e, !0)
            }, 150),
            e.element
        },
        closed: function() {
            return this.ui.is(":hidden")
        },
        destroy: function(e) {
            var t = this;
            return t.close(e, !0),
            e.element.unbind(".timepicker").data("TimePicker", null )
        },
        parse: function(t, i) {
            return e.fn.timepicker.parseTime(i)
        },
        format: function(t, i, n) {
            return n = n || t.options.timeFormat,
            e.fn.timepicker.formatTime(n, i)
        },
        getTime: function(t) {
            var i = this
              , n = e.fn.timepicker.parseTime(t.element.val());
            return n instanceof Date && !i._isValidTime(t, n) ? null  : n instanceof Date && t.selectedTime ? t.format(n) === t.format(t.selectedTime) ? t.selectedTime : n : n instanceof Date ? n : null 
        },
        setTime: function(t, i, s) {
            var r = this
              , o = t.selectedTime;
            if ("string" == typeof i && (i = t.parse(i)),
            i && i.getMinutes && r._isValidTime(t, i)) {
                if (i = n(i),
                t.selectedTime = i,
                t.element.val(t.format(i, t.options.timeFormat)),
                s)
                    return t
            } else
                t.selectedTime = null ;
            return (null  !== o || null  !== t.selectedTime) && (t.element.trigger("time-change", [i]),
            e.isFunction(t.options.change) && t.options.change.apply(t.element, [i])),
            t.element
        },
        option: function(t, i, n) {
            if ("undefined" == typeof n)
                return t.options[i];
            var s, r, o = t.getTime();
            "string" == typeof i ? (s = {},
            s[i] = n) : s = i,
            r = ["minHour", "minMinutes", "minTime", "maxHour", "maxMinutes", "maxTime", "startHour", "startMinutes", "startTime", "timeFormat", "interval", "dropdown"],
            e.each(s, function(i) {
                t.options[i] = s[i],
                t.rebuild = t.rebuild || e.inArray(i, r) > -1
            }),
            t.rebuild && t.setTime(o)
        }
    },
    e.TimePicker.defaults = {
        timeFormat: "hh:mm p",
        minHour: null ,
        minMinutes: null ,
        minTime: null ,
        maxHour: null ,
        maxMinutes: null ,
        maxTime: null ,
        startHour: null ,
        startMinutes: null ,
        startTime: null ,
        interval: 30,
        dynamic: !0,
        theme: "standard",
        zindex: null ,
        dropdown: !0,
        scrollbar: !1,
        change: function() {}
    },
    e.TimePicker.methods = {
        chainable: ["next", "previous", "open", "close", "destroy", "setTime"]
    },
    e.fn.timepicker = function(t) {
        if ("string" == typeof t) {
            var i, n, s = Array.prototype.slice.call(arguments, 1);
            return i = "option" === t && arguments.length > 2 ? "each" : -1 !== e.inArray(t, e.TimePicker.methods.chainable) ? "each" : "map",
            n = this[i](function() {
                var i = e(this)
                  , n = i.data("TimePicker");
                return "object" == typeof n ? n[t].apply(n, s) : void 0
            }),
            "map" === i && 1 === this.length ? e.makeArray(n).shift() : "map" === i ? e.makeArray(n) : n
        }
        if (1 === this.length && this.data("TimePicker"))
            return this.data("TimePicker");
        var r = e.extend({}, e.TimePicker.defaults, t);
        return this.each(function() {
            e.TimePicker.instance().register(this, r)
        })
    }
    ,
    e.fn.timepicker.formatTime = function(e, t) {
        var n = t.getHours()
          , s = n % 12
          , r = t.getMinutes()
          , o = t.getSeconds()
          , a = {
            hh: i((0 === s ? 12 : s).toString(), "0", 2),
            HH: i(n.toString(), "0", 2),
            mm: i(r.toString(), "0", 2),
            ss: i(o.toString(), "0", 2),
            h: 0 === s ? 12 : s,
            H: n,
            m: r,
            s: o,
            p: n > 11 ? "PM" : "AM"
        }
          , l = e
          , c = "";
        for (c in a)
            a.hasOwnProperty(c) && (l = l.replace(new RegExp(c,"g"), a[c]));
        return l = l.replace(new RegExp("a","g"), n > 11 ? "pm" : "am")
    }
    ,
    e.fn.timepicker.parseTime = function() {
        var t = [[/^(\d+)$/, "$1"], [/^:(\d)$/, "$10"], [/^:(\d+)/, "$1"], [/^(\d):([7-9])$/, "0$10$2"], [/^(\d):(\d\d)$/, "$1$2"], [/^(\d):(\d{1,})$/, "0$1$20"], [/^(\d\d):([7-9])$/, "$10$2"], [/^(\d\d):(\d)$/, "$1$20"], [/^(\d\d):(\d*)$/, "$1$2"], [/^(\d{3,}):(\d)$/, "$10$2"], [/^(\d{3,}):(\d{2,})/, "$1$2"], [/^(\d):(\d):(\d)$/, "0$10$20$3"], [/^(\d{1,2}):(\d):(\d\d)/, "$10$2$3"]]
          , i = t.length;
        return function(s) {
            var r = n(new Date)
              , o = !1
              , a = !1
              , l = !1
              , c = !1
              , u = !1;
            if ("undefined" == typeof s || !s.toLowerCase)
                return null ;
            s = s.toLowerCase(),
            o = /a/.test(s),
            a = o ? !1 : /p/.test(s),
            s = s.replace(/[^0-9:]/g, "").replace(/:+/g, ":");
            for (var h = 0; i > h; h += 1)
                if (t[h][0].test(s)) {
                    s = s.replace(t[h][0], t[h][1]);
                    break
                }
            return s = s.replace(/:/g, ""),
            1 === s.length ? l = s : 2 === s.length ? l = s : 3 === s.length || 5 === s.length ? (l = s.substr(0, 1),
            c = s.substr(1, 2),
            u = s.substr(3, 2)) : (4 === s.length || s.length > 5) && (l = s.substr(0, 2),
            c = s.substr(2, 2),
            u = s.substr(4, 2)),
            s.length > 0 && s.length < 5 && (s.length < 3 && (c = 0),
            u = 0),
            l === !1 || c === !1 || u === !1 ? !1 : (l = parseInt(l, 10),
            c = parseInt(c, 10),
            u = parseInt(u, 10),
            o && 12 === l ? l = 0 : a && 12 > l && (l += 12),
            l > 24 ? s.length >= 6 ? e.fn.timepicker.parseTime(s.substr(0, 5)) : e.fn.timepicker.parseTime(s + "0" + (o ? "a" : "") + (a ? "p" : "")) : (r.setHours(l, c, u),
            r))
        }
    }()
}(jQuery)


app.directive('rtTimepicker', function() {
    return {
		scope: {
		  'model': '='
		},
		link: function(scope, elem, attrs) {
			var $tiempicker = $(elem);
			$tiempicker.timepicker({ 'timeFormat': 'H:i' });
		}
    }
});
