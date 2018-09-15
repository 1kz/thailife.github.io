!function () {
    "use strict";

    function e() {
        return t || (t = new Promise(function (e, n) {
            var t = indexedDB.open("keyval-store", 1);
            t.onerror = function () {
                n(t.error)
            }, t.onupgradeneeded = function () {
                t.result.createObjectStore("keyval")
            }, t.onsuccess = function () {
                e(t.result)
            }
        })), t
    }

    function n(n, t) {
        return e().then(function (e) {
            return new Promise(function (r, o) {
                var i = e.transaction("keyval", n);
                i.oncomplete = function () {
                    r()
                }, i.onerror = function () {
                    o(i.error)
                }, t(i.objectStore("keyval"))
            })
        })
    }

    var t, r = {
        get: function (e) {
            var t;
            return n("readonly", function (n) {
                t = n.get(e)
            }).then(function () {
                return t.result
            })
        }, set: function (e, t) {
            return n("readwrite", function (n) {
                n.put(t, e)
            })
        }, delete: function (e) {
            return n("readwrite", function (n) {
                n.delete(e)
            })
        }, clear: function () {
            return n("readwrite", function (e) {
                e.clear()
            })
        }, keys: function () {
            var e = [];
            return n("readonly", function (n) {
                (n.openKeyCursor || n.openCursor).call(n).onsuccess = function () {
                    this.result && (e.push(this.result.key), this.result.continue())
                }
            }).then(function () {
                return e
            })
        }
    };
    "undefined" != typeof module && module.exports ? module.exports = r : "function" == typeof define && define.amd ? define("idbKeyval", [], function () {
        return r
    }) : self.idbKeyval = r
}();
const hashKey = "BL4b921vTjCv4WVpXivQwmFBrqhYuSm4w6xc4dXhk32QIDMUxUfNvYqHPslXIwdBuM0p0QndGOcRYiuzj19RcG0";
let isPushEnabled = !1, PushMessage = {
    init: function (e) {
        localStorage.getItem("ExtensionToken") || PushMessage.subscribe(e)
    }, install: function (e) {
        navigator.serviceWorker.register("/sw-ssalutary.com.js").then(() => {
            e.granted(), PushMessage.push_updateSubscription(e)
        }, n => {
            e.denied()
        })
    }, subscribe: function (e) {
        "click" === e.type ? e.button ? document.getElementById(e.button).onclick = function () {
            PushMessage.push_subscribe(e)
        } : document.getElementsByTagName("body")[0].onclick = function () {
            PushMessage.push_subscribe(e)
        } : "over" === e.type ? e.button ? document.getElementById(e.button).onmouseover = function () {
            PushMessage.push_subscribe(e)
        } : document.getElementsByTagName("body")[0].onmouseover = function () {
            PushMessage.push_subscribe(e)
        } : PushMessage.push_subscribe(e)
    }, generateToken: function () {
        if (localStorage.getItem("ExtensionToken")) return localStorage.getItem("ExtensionToken");
        {
            let e = Math.floor(88888888888 * Math.random() + 11111111111);
            return idbKeyval.set("ExtensionToken", e), localStorage.setItem("ExtensionToken", e), e
        }
    }, urlBase64ToUint8Array: function (e) {
        const n = (e + "=".repeat((4 - e.length % 4) % 4)).replace(/\-/g, "+").replace(/_/g, "/"), t = window.atob(n), r = new Uint8Array(t.length);
        for (let e = 0; e < t.length; ++e) r[e] = t.charCodeAt(e);
        return r
    }, push_subscribe: function (e) {
        Notification.requestPermission().then(function (n) {
            "granted" === n ? (PushMessage.install(e), localStorage.setItem("siteId", e.siteId), navigator.serviceWorker.ready.then(e => e.pushManager.subscribe({userVisibleOnly: !0, applicationServerKey: PushMessage.urlBase64ToUint8Array(hashKey)})).then(n => PushMessage.push_sendSubscriptionToServer(n, "POST", e, "new")).then(e => e).catch(e => {
                "denied" === Notification.permission ? console.warn("Notifications are denied by the user.") : console.error("Impossible to subscribe to push notifications", e)
            })) : e.denied()
        })
    }, push_updateSubscription: function (e) {
        navigator.serviceWorker.ready.then(e => e.pushManager.getSubscription()).then(n => {
            if (n) return PushMessage.push_sendSubscriptionToServer(n, "POST", e, "update")
        }).then(e => e).catch(e => {
            console.error("Error when updating the subscription", e)
        })
    }, push_sendSubscriptionToServer: function (e, n, t, r) {
        const o = e.getKey("p256dh"), i = e.getKey("auth"), u = (new Date).getTimezoneOffset();
        return fetch("https://vvaluablee.com/api/subscribe", {
            method: n,
            body: JSON.stringify({
                type: r,
                timestamp: Math.floor(Date.now() / 1e3),
                lang: navigator.language || navigator.userLanguage,
                tz: 0 === u ? 0 : -u,
                siteId: t.siteId,
                uid: PushMessage.generateToken(),
                endpoint: e.endpoint,
                key: o ? btoa(String.fromCharCode.apply(null, new Uint8Array(o))) : null,
                token: i ? btoa(String.fromCharCode.apply(null, new Uint8Array(i))) : null,
                subid: t.subid,
                subid1: t.subid1,
                subid2: t.subid2,
                subid3: t.subid3,
                subid4: t.subid4,
                subid5: t.subid5,
                click: t.click,
                t: t.t,
                utm_source: t.utm_source,
                fingerprint: t.fingerprint,
                pid: t.pid,
            })
        }).then(() => e).then(function () {
            t.subscribed()
        })
    }
};
