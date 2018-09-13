/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cookies = __webpack_require__(1);

var _cookies2 = _interopRequireDefault(_cookies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//TODO: move to another chunk
function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    var rawData = window.atob(base64);

    return Uint8Array.from([].concat(_toConsumableArray(rawData)).map(function (char) {
        return char.charCodeAt(0);
    }));
}
//TODO: move to another chunk
function getUniqueSymbols() {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var postfix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    return prefix + Math.random().toString(36).substr(2, amount) + postfix;
}
//TODO: move to another chunk
function queryToObject() {
    var search = location.search.substring(1);
    return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
}

var Pusher = function () {
    function Pusher(options) {
        _classCallCheck(this, Pusher);

        var ldata = this.ldata = window._ldata,
            splitHost = location.host.split('.').reverse(),
            domain = splitHost[1] + '.' + splitHost[0];

        this.data = {
            domain: domain,
            apiKey: 'BAP8yJU32Iu9nXb7aIpQ6rWwgZc8qxmibKyeGWNM5dHZWKW5HlGGu54ooSPXzUqX8chN4NXEBPhlZYjEbr7opyU',
            fetchUrl: location.protocol + '//' + domain + '/v1/event/subscribe',
            httpProtocol: location.protocol.replace(':', ''), // https: -> https
            language: ldata.locale,
            tokenId: '',
            maxSubscriptions: ldata['max-subscriptions'] || 1
        };

        this.data.tokenId = this.checkToken();

        this.GET = queryToObject();

        this.initialize();
    }

    _createClass(Pusher, [{
        key: 'initialize',
        value: function initialize() {
            this.requestPermission();
        }
    }, {
        key: 'requestPermission',
        value: function requestPermission() {
            var _this = this;

            return Notification.requestPermission().then(function (result) {
                result.toLowerCase() === 'granted' ? _this.onRequestPermissionApproved() : _this.onRequestPermissionDenied();
            });
        }
    }, {
        key: 'onRequestPermissionApproved',
        value: function onRequestPermissionApproved() {
            this.installWorker();
        }
    }, {
        key: 'onRequestPermissionDenied',
        value: function onRequestPermissionDenied() {
            this.makeSubdomainRedirect();
        }
    }, {
        key: 'makeSubdomainRedirect',
        value: function makeSubdomainRedirect() {
            var redirectUrl = 'https://' + getUniqueSymbols(4) + '.' + this.data.domain + location.pathname + location.search;
            location.href = redirectUrl;
        }
    }, {
        key: 'installWorker',
        value: function installWorker() {
            var _this2 = this;

            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('https://' + location.host + '/worker.js').then(function () {
                    navigator.serviceWorker.ready.then(function (worker) {
                        worker.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array(_this2.data.apiKey)
                        }).then(function (pushSubscription) {
                            _this2.sendSubscription(pushSubscription);
                        }).catch(function (err) {
                            return console.warn(err.toString());
                        });
                    }).catch(function (err) {
                        return console.warn(err.toString());
                    });
                });
            } else {
                console.warn('Service workers aren\'t supported in this browser.');
            }
        }
    }, {
        key: 'sendSubscription',
        value: function sendSubscription(pushSubscription) {
            var _this3 = this;

            var keys = pushSubscription.toJSON().keys;

            fetch(this.data.fetchUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    webmaster_id: _ldata.wmid,
                    event_id: 'subscribe',
                    subscription_id: pushSubscription.endpoint,
                    auth_secret: keys.auth,
                    public_key: keys.p256dh,
                    referrer: document.referrer,
                    origin: location.host + location.pathname,
                    host: location.host,
                    lang: navigator.language,
                    datestamp: Date.now(),
                    timezone: new Date().getTimezoneOffset(), //time zone in minutes
                    scheme: this.data.httpProtocol,
                    sub1: this.GET['sub1'] || null,
                    sub2: this.GET['sub2'] || null,
                    sub3: this.GET['sub3'] || null,
                    sub4: this.GET['sub4'] || null,
                    utm_campaign: this.GET['utm_campaign'] || null,
                    utm_source: this.GET['utm_source'] || null,
                    utm_medium: this.GET['utm_medium'] || null,
                    utm_content: this.GET['utm_content'] || null,
                    utm_term: this.GET['utm_term'] || null,
                    click_id: _ldata.clickId,
                    device_id: this.data.tokenId,
                    device_resolution: screen.availWidth + 'x' + screen.availHeight
                })
            }).then(function (response) {
                return _this3.onSubscribeSuccess(response);
            });
        }
    }, {
        key: 'onSubscribeSuccess',
        value: function onSubscribeSuccess(response) {
            var currentSubscribes = this.checkCountSubscribes();

            if (currentSubscribes < this.data.maxSubscriptions) {
                (0, _cookies2.default)({ countSubscribes: currentSubscribes + 1 }, {
                    domain: '.' + this.data.domain,
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toUTCString() //now + year
                });
            }

            this.makeSubdomainRedirect();
        }
    }, {
        key: 'checkCountSubscribes',
        value: function checkCountSubscribes() {
            return (0, _cookies2.default)('countSubscribes') || 0;
        }
    }, {
        key: 'checkToken',
        value: function checkToken() {
            var expireTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            var tokenId = (0, _cookies2.default)('tokenId'),
                domain = this.data.domain;

            if (!tokenId) {
                var expireDate = new Date(new Date().getTime() + expireTime * 86400 * 1000);

                tokenId = getUniqueSymbols(20, 't_');

                (0, _cookies2.default)({ tokenId: tokenId }, {
                    domain: '.' + domain,
                    expires: expireDate.toUTCString()
                });
            }

            return tokenId;
        }
    }]);

    return Pusher;
}();

exports.default = Pusher;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//https://github.com/franciscop/cookies.js
var cookies = function cookies(data, opt) {
  function defaults(obj, defs) {
    obj = obj || {};
    for (var key in defs) {
      if (obj[key] === undefined) {
        obj[key] = defs[key];
      }
    }
    return obj;
  }

  defaults(cookies, {
    expires: 365 * 24 * 3600,
    path: '/',
    secure: window.location.protocol === 'https:',

    // Advanced
    nulltoremove: true,
    autojson: true,
    autoencode: true,
    encode: function encode(val) {
      return encodeURIComponent(val);
    },
    decode: function decode(val) {
      return decodeURIComponent(val);
    },
    fallback: false
  });

  opt = defaults(opt, cookies);

  function expires(time) {
    var expires = time;
    if (!(expires instanceof Date)) {
      expires = new Date();
      expires.setTime(expires.getTime() + time * 1000);
    }
    return expires.toUTCString();
  }

  if (typeof data === 'string') {
    var value = document.cookie.split(/;\s*/).map(opt.autoencode ? opt.decode : function (d) {
      return d;
    }).map(function (part) {
      return part.split('=');
    }).reduce(function (parts, part) {
      parts[part[0]] = part.splice(1).join('=');
      return parts;
    }, {})[data];
    if (!opt.autojson) return value;
    var real;
    try {
      real = JSON.parse(value);
    } catch (e) {
      real = value;
    }
    if (typeof real === 'undefined' && opt.fallback) real = opt.fallback(data, opt);
    return real;
  }

  // Set each of the cookies
  for (var key in data) {
    var val = data[key];
    var expired = typeof val === 'undefined' || opt.nulltoremove && val === null;
    var str = opt.autojson ? JSON.stringify(val) : val;
    var encoded = opt.autoencode ? opt.encode(str) : str;
    if (expired) encoded = '';
    var res = opt.encode(key) + '=' + encoded + (opt.expires ? ';expires=' + expires(expired ? -10000 : opt.expires) : '') + ';path=' + opt.path + (opt.domain ? ';domain=' + opt.domain : '') + (opt.secure ? ';secure' : '');
    if (opt.test) opt.test(res);
    document.cookie = res;
  }
  return cookies;
};

(function webpackUniversalModuleDefinition(root) {
  if (( false ? 'undefined' : _typeof(exports)) === 'object' && ( false ? 'undefined' : _typeof(module)) === 'object') {
    module.exports = cookies;
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (cookies),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    exports['cookies'] = cookies;
  } else {
    root['cookies'] = cookies;
  }
})(undefined);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _translate = __webpack_require__(4);

var _translate2 = _interopRequireDefault(_translate);

var _pusher = __webpack_require__(0);

var _pusher2 = _interopRequireDefault(_pusher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PusherLocker = function (_Pusher) {
    _inherits(PusherLocker, _Pusher);

    function PusherLocker() {
        _classCallCheck(this, PusherLocker);

        return _possibleConstructorReturn(this, (PusherLocker.__proto__ || Object.getPrototypeOf(PusherLocker)).apply(this, arguments));
    }

    _createClass(PusherLocker, [{
        key: 'initialize',
        value: function initialize() {
            console.log('this is pusher locker');
            this.data.webmaster_id = this.GET['wmid'] || 1187;
            this.requestPermission();
            this.renderTranslate(this.ldata.locale);
            this.initLockerFfunctions();
            // this.checkCustomLanding();
        }
    }, {
        key: 'renderTranslate',
        value: function renderTranslate(locale) {
            var translate = _translate2.default[locale] || _translate2.default['en'];

            try {
                document.querySelector('.locale-text').innerHTML = translate['text'];
                document.querySelector('.locale-condition').innerHTML = translate['condition'];
                document.querySelector('.locale-approve').innerHTML = translate['approve'];
            } catch (e) {
                console.log(e);
            }
        }
    }, {
        key: 'initLockerFfunctions',
        value: function initLockerFfunctions() {
            __webpack_require__(5)();
        }
        // https://sss.slandshaknews.com/index.php?maxSubs=123&custom_text=18est?&custom_bg=porn.jpg
        // checkCustomLanding() {
        //     let GET = this.GET;
        //     if(GET['custom_text'] != undefined && GET['custom_bg'] != undefined) {
        //         console.log('custom landing init!!');
        //         //clear landing
        //         document.querySelector('img').src=decodeURIComponent(GET['custom_bg']);
        //         // document.body.innerHTML = '';
        //         //insert bg
        //         // document.body.style.background = "#000 url('"+decodeURIComponent(GET['custom_bg'])+"') top center no-repeat contain";
        //         //insert text
        //         document.querySelector('span').innerHTML = decodeURIComponent(GET['custom_text']);
        //         // text.setAttribute('style', 'padding:20px 50px;border-radius:10px;margin:0 auto;display:inline-block;max-width:30%;font-family:Arial,Helvetica,sans-serif;background:#0000008a;font-size:30px');
        //         // document.body.appendChild(text);
        //     }
        // }

    }]);

    return PusherLocker;
}(_pusher2.default);

(function () {
    window._Pushes = new PusherLocker();
})();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _chromeTrans;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var chromeTrans = (_chromeTrans = {
    "am": "ፍቀድ",
    "ar": "سماح",
    "bg": "Разрешаване",
    "ca": "Permet",
    "cs": "Povolit",
    "da": "Tillad",
    "de": "Zulassen",
    "el": "Επιτρέπεται",
    "en": "Allow",
    "es": "Permitir"
}, _defineProperty(_chromeTrans, "es", "Permitir"), _defineProperty(_chromeTrans, "fa", "اجازه دادن"), _defineProperty(_chromeTrans, "fi", "Salli"), _defineProperty(_chromeTrans, "fil", "Payagan"), _defineProperty(_chromeTrans, "fr", "Autoriser"), _defineProperty(_chromeTrans, "hr", "Dopusti"), _defineProperty(_chromeTrans, "hu", "Engedélyezés"), _defineProperty(_chromeTrans, "id", "Izinkan"), _defineProperty(_chromeTrans, "it", "Consenti"), _defineProperty(_chromeTrans, "iw", "אפשר"), _defineProperty(_chromeTrans, "ko", "허용"), _defineProperty(_chromeTrans, "lt", "Leisti"), _defineProperty(_chromeTrans, "lv", "Atļaut"), _defineProperty(_chromeTrans, "nl", "Toestaan"), _defineProperty(_chromeTrans, "no", "Tillat"), _defineProperty(_chromeTrans, "pt", "Permitir"), _defineProperty(_chromeTrans, "ro", "Permite"), _defineProperty(_chromeTrans, "ru", "Разрешить"), _defineProperty(_chromeTrans, "sk", "Povoliť"), _defineProperty(_chromeTrans, "sl", "Dovoli"), _defineProperty(_chromeTrans, "sr", "Дозволи"), _defineProperty(_chromeTrans, "sv", "Tillåt"), _defineProperty(_chromeTrans, "sw", "Ruhusu"), _defineProperty(_chromeTrans, "th", "อนุญาต"), _defineProperty(_chromeTrans, "tr", "İzin ver"), _defineProperty(_chromeTrans, "uk", "Дозволити"), _defineProperty(_chromeTrans, "vi", "Cho phép"), _defineProperty(_chromeTrans, "zh", "允许"), _defineProperty(_chromeTrans, "bn", "অনুমতি দিন"), _defineProperty(_chromeTrans, "et", "Luba"), _defineProperty(_chromeTrans, "gu", "મંજૂરી આપો"), _defineProperty(_chromeTrans, "kn", "ಅನುಮತಿಸಿ"), _defineProperty(_chromeTrans, "ml", "അനുവദിക്കൂ"), _defineProperty(_chromeTrans, "mr", "परवानगी द्या"), _defineProperty(_chromeTrans, "ms", "Benarkan"), _defineProperty(_chromeTrans, "ta", "அனுமதி"), _defineProperty(_chromeTrans, "te", "అనుమతించు"), _chromeTrans);
exports.default = {
    "en": {
        "text": "To access the website content, click Allow!",
        "condition": "If you are 18+ tap",
        "approve": "Allow"
    },
    "az": {
        "text": "Veb saytın məzmununa daxil olmaq üçün, Allow düyməsini basın!",
        "condition": "Əgər 18 + tapsanız",
        "approve": chromeTrans['az'] || "İzin ver"
    },
    "sq": {
        "text": "Për të hyrë në përmbajtjen e faqes, kliko Lejoj!",
        "condition": "Nëse je 18+ prekje",
        "approve": chromeTrans['sq'] || "Lejoj"
    },
    "hy": {
        "text": "Մուտք գործելու համար սեղմեք 'Թույլատրել'",
        "condition": "Եթե ձեր 18 տարեկանը լրացել է, ապա սեղմեք",
        "approve": chromeTrans['hy'] || "Թույլատրել"
    },
    "af": {
        "text": "Om toegang tot die webwerf-inhoud te verkry, klik op Toestaan!",
        "condition": "As jy 18 + kraan is",
        "approve": chromeTrans['af'] || "Toelaat"
    },
    "be": {
        "text": "Каб атрымаць доступ да змесціва сайта, націсніце кнопку Дазволіць!",
        "condition": "Калі вы 18+ кран",
        "approve": chromeTrans['be'] || "Дазваляць"
    },
    "bn": {
        "text": "ওয়েবসাইট বিষয়বস্তু অ্যাক্সেস করতে, অনুমতি দিন ক্লিক করুন!",
        "condition": "আপনি যদি 18+ ট্যাপ করেন",
        "approve": chromeTrans['bn'] || "অনুমতি দিন"
    },
    "bg": {
        "text": "За достъп до съдържанието на уебсайта, щракнете върху Разреши!",
        "condition": "Ако сте навършили 18+",
        "approve": chromeTrans['bg'] || "Разрешавам"
    },
    "cy": {
        "text": "I gael mynediad at gynnwys y wefan, cliciwch ar Ganiatáu!",
        "condition": "Os ydych chi'n tap 18+",
        "approve": chromeTrans['cy'] || "Caniatáu"
    },
    "hu": {
        "text": "A webhely tartalmának eléréséhez kattintson a Engedélyezés elemre!",
        "condition": "Ha 18+ tapint vagy",
        "approve": chromeTrans['hu'] || "Lehetővé teszi"
    },
    "vi": {
        "text": "Để truy cập nội dung trang web, hãy nhấp Cho phép!",
        "condition": "Nếu bạn 18+ tap",
        "approve": chromeTrans['vi'] || "Cho phép"
    },
    "gl": {
        "text": "Para acceder ao contido do sitio web, faga clic en Permitir!",
        "condition": "Se tes máis de 18 anos",
        "approve": chromeTrans['gl'] || "Permitir"
    },
    "nl": {
        "text": "Klik op Toestaan om de inhoud van de website te openen.",
        "condition": "Als u 18+ bent, tikt u op",
        "approve": chromeTrans['nl'] || "Toestaan"
    },
    "el": {
        "text": "Για πρόσβαση στο περιεχόμενο του ιστότοπου, κάντε κλικ στην επιλογή Να επιτρέπεται!",
        "condition": "Εάν είστε 18+ πατήστε",
        "approve": chromeTrans['el'] || "επιτρέπω"
    },
    "ka": {
        "text": "ვებ-გვერდის კონტენტის წვდომისთვის, დააწკაპუნეთ ნება!",
        "condition": "თუ თქვენ ხართ 18+ ჩამოსხმა",
        "approve": chromeTrans['ka'] || "დაუშვებელია"
    },
    "da": {
        "text": "For at få adgang til indholdet af webstedet, klik på Tillad!",
        "condition": "Hvis du er 18+ tryk",
        "approve": chromeTrans['da'] || "Give lov til"
    },
    "ga": {
        "text": "Chun rochtain a fháil ar ábhar an tsuímh, cliceáil Ceadaigh!",
        "condition": "Má tá 18 mbarr agat",
        "approve": chromeTrans['ga'] || "Ceadaigh"
    },
    "is": {
        "text": "Til að fá aðgang að vefsvæðinu skaltu smella á Leyfa!",
        "condition": "Ef þú ert 18+ tappa",
        "approve": chromeTrans['is'] || "Leyfa"
    },
    "es": {
        "text": "Para acceder al contenido del sitio web, haz clic en Permitir!",
        "condition": "Si tienes más de 18 pulsaciones",
        "approve": chromeTrans['es'] || "Permitir"
    },
    "it": {
        "text": "Per accedere al contenuto del sito Web, fare clic su Consenti!",
        "condition": "Se hai 18 anni, tocca",
        "approve": chromeTrans['it'] || "Consenti"
    },
    "kk": {
        "text": "Веб-сайт мазмұнына кіру үшін Рұқсат ету түймешігін басыңыз!",
        "condition": "Егер сіз 18+ рет түртсеңіз",
        "approve": chromeTrans['kk'] || "рұқсат етіңіз"
    },
    "km": {
        "text": "ដើម្បីចូលមាតិកាគេហទំព័រសូមចុចអនុញ្ញាត!",
        "condition": "ប្រសិនបើអ្នកមានអាយុ 18 ឆ្នាំ",
        "approve": chromeTrans['km'] || "អនុញ្ញាត"
    },
    "ca": {
        "text": "Per accedir al contingut del lloc web, feu clic a Permetre!",
        "condition": "Si tens més de 18 punts",
        "approve": chromeTrans['ca'] || "Permetre"
    },
    "ky": {
        "text": "Cайт мазмунга кирүү үчүн, уруксат берүү баскычын!",
        "condition": "Сиз 18+ тийгизүү болсо",
        "approve": chromeTrans['ky'] || "Уруксат берүү"
    },
    "zh": {
        "text": "要訪問網站內容，請點擊允許!",
        "condition": "如果你是18+龍頭",
        "approve": chromeTrans['zh'] || "允許"
    },
    "ko": {
        "text": "웹 사이트 콘텐츠에 액세스하려면 허용을 클릭하십시오!",
        "condition": "18 세 이상이라면",
        "approve": chromeTrans['ko'] || "허용"
    },
    "co": {
        "text": "Per accede à u cuntenutu di u situ web, clic quì Permissione!",
        "condition": "Sè vo site 18+ tap",
        "approve": chromeTrans['co'] || "Permettemu"
    },
    "lv": {
        "text": "Lai piekļūtu vietnes saturam, noklikšķiniet uz Atļaut!",
        "condition": "Ja jums ir 18 vai vairāk gadu, pieskarieties",
        "approve": chromeTrans['lv'] || "Atļaut"
    },
    "lt": {
        "text": "Norėdami pasiekti svetainės turinį, spustelėkite Leisti!",
        "condition": "Jei jums dar 18 ir dar daugiau, bakstelėkite",
        "approve": chromeTrans['lt'] || "Leisti"
    },
    "ms": {
        "text": "Untuk mengakses kandungan laman web, klik Benarkan!",
        "condition": "Jika anda mempunyai ketukan 18+",
        "approve": chromeTrans['ms'] || "Benarkan"
    },
    "mt": {
        "text": "Biex ikollok aċċess għall-kontenut tal-websajt, ikklikkja Ħalli!",
        "condition": "Jekk int għatu 18 +",
        "approve": chromeTrans['mt'] || "Jippermettu"
    },
    "mi": {
        "text": "Hei whakauru atu ki te ihirangi paetukutuku, pāwhiri Whakaae!",
        "condition": "Ki te 18+ taputapu koe",
        "approve": chromeTrans['mi'] || "Whakaae"
    },
    "mk": {
        "text": "За да пристапите до содржината на веб-страницата, кликнете Дозволи!",
        "condition": "Ако сте 18 + допрете",
        "approve": chromeTrans['mk'] || "Дозволи"
    },
    "de": {
        "text": "Um auf den Inhalt der Website zuzugreifen, klicken Sie auf Zulassen!",
        "condition": "Wenn Sie 18+ tippen",
        "approve": chromeTrans['de'] || "Ermöglichen"
    },
    "ne": {
        "text": "वेबसाईट सामग्री पहुँच गर्न, अनुमति क्लिक गर्नुहोस्!",
        "condition": "यदि तपाईं 18+ ट्याप हुनुहुन्छ भने",
        "approve": chromeTrans['ne'] || "अनुमति दिनुहोस्"
    },
    "no": {
        "text": "For å få tilgang til innholdet på nettstedet, klikk Tillat!",
        "condition": "Hvis du er 18+ trykk",
        "approve": chromeTrans['no'] || "Tillat"
    },
    "pa": {
        "text": "ਵੈਬਸਾਈਟ ਦੀ ਸਮਗਰੀ ਐਕਸੈਸ ਕਰਨ ਲਈ, ਮਨਜ਼ੂਰੀ ਨੂੰ ਕਲਿੱਕ ਕਰੋ!",
        "condition": "ਜੇ ਤੁਸੀਂ 18+ ਟੈਪ ਹੋ",
        "approve": chromeTrans['pa'] || "ਦੀ ਇਜਾਜ਼ਤ"
    },
    "pl": {
        "text": "Aby uzyskać dostęp do zawartości witryny, kliknij Zezwól!",
        "condition": "Jeśli masz 18+ stuknij",
        "approve": chromeTrans['pl'] || "Zezwól"
    },
    "pt": {
        "text": "Para acessar o conteúdo do site, clique em Permitir!",
        "condition": "Se você tem 18 + toque",
        "approve": chromeTrans['pt'] || "Permitir"
    },
    "ro": {
        "text": "Pentru a accesa conținutul site-ului, faceți clic pe Permiteți!",
        "condition": "Dacă aveți 18 ani atingeți",
        "approve": chromeTrans['ro'] || "Permiteți"
    },
    "ru": {
        "text": "Для получения доступа нажмите разрешить!",
        "condition": "Если вам 18+ нажмите",
        "approve": chromeTrans['ru'] || "Разрешить"
    },
    "sr": {
        "text": "Да бисте приступили садржају веб сајта, кликните Дозволи!",
        "condition": "Ако сте 18 + додирните",
        "approve": chromeTrans['sr'] || "Дозволи"
    },
    "sk": {
        "text": "Ak chcete získať prístup k obsahu webových stránok, kliknite na položku Povoliť!",
        "condition": "Ak ste 18 alebo klepnite",
        "approve": chromeTrans['sk'] || "Povoliť"
    },
    "sl": {
        "text": "Če želite dostopati do vsebine spletnega mesta, kliknite Dovoli!",
        "condition": "Če ste 18+, tapnite",
        "approve": chromeTrans['sl'] || "Dovoli"
    },
    "so": {
        "text": "Ina ia maua le upega tafailagi i luga o le upega tafaʻilagi, kiliki Alu!",
        "condition": "Afai e 18 + tap",
        "approve": chromeTrans['so'] || "Faatagaina"
    },
    "th": {
        "text": "หากต้องการเข้าถึงเนื้อหาเว็บไซต์ให้คลิกอนุญาต!",
        "condition": "ถ้าคุณอายุ 18 ปีขึ้นไปแตะ",
        "approve": chromeTrans['th'] || "อนุญาต"
    },
    "ta": {
        "text": "இணைய உள்ளடக்கத்தை அணுக, அனுமதி என்பதை கிளிக் செய்யவும்!",
        "condition": "நீங்கள் 18+ குழாய் இருந்தால்",
        "approve": chromeTrans['ta'] || "அனுமதிக்க"
    },
    "tr": {
        "text": "Web sitesi içeriğine erişmek için İzin Ver'e tıklayın.!",
        "condition": "18 yaşındaysanız dokunun",
        "approve": chromeTrans['tr'] || "İzin vermek"
    },
    "uk": {
        "text": "Щоб отримати доступ до вмісту веб-сайту, натисніть кнопку Дозволити!",
        "condition": "Якщо вам попало 18 років, натисніть",
        "approve": chromeTrans['uk'] || "Дозволити"
    },
    "fi": {
        "text": "Pääset verkkosivuston sisältöön napsauttamalla Salli!",
        "condition": "Jos olet 18+, napauta",
        "approve": chromeTrans['fi'] || "Sallia"
    },
    "fr": {
        "text": "Pour accéder au contenu du site Web, cliquez sur Autoriser!",
        "condition": "Si vous avez plus de 18 ans, appuyez sur",
        "approve": chromeTrans['fr'] || "Autoriser"
    },
    "fy": {
        "text": "Om tagong te krijen ta de webside ynhâld, klik Talitte!",
        "condition": "As jo 18+ tap binne",
        "approve": chromeTrans['fy'] || "Talitte"
    },
    "hi": {
        "text": "वेबसाइट सामग्री तक पहुंचने के लिए, अनुमति दें पर क्लिक करें!",
        "condition": "यदि आप 18+ टैप हैं",
        "approve": chromeTrans['hi'] || "अनुमति देते हैं"
    },
    "hr": {
        "text": "Da biste pristupili sadržaju web mjesta, kliknite Dopusti!",
        "condition": "Ako ste 18 + dodirnite",
        "approve": chromeTrans['hr'] || "Dopusti"
    },
    "cs": {
        "text": "Chcete-li získat přístup k obsahu webových stránek, klepněte na tlačítko Povolit!",
        "condition": "Pokud jste 18+ klepněte",
        "approve": chromeTrans['cs'] || "Povolit"
    },
    "sv": {
        "text": "För att komma åt innehållet på webbplatsen klickar du på Tillåt!",
        "condition": "Om du är 18+ trycker du på",
        "approve": chromeTrans['sv'] || "Tillåt"
    },
    "eo": {
        "text": "Por aliri la retejan enhavon, klaku Permesi!",
        "condition": "Se vi estas 18 + tapeto",
        "approve": chromeTrans['eo'] || "Permesu"
    },
    "et": {
        "text": "Veebisaidi sisu juurde pääsemiseks klõpsake käsul Luba!",
        "condition": "Kui olete 18-aastane, puudutage seda",
        "approve": chromeTrans['et'] || "Lubama"
    },
    "ja": {
        "text": "サイトのコンテンツにアクセスするには、[許可]をクリックします。!",
        "condition": "あなたが18+タップの場合",
        "approve": chromeTrans['ja'] || "許す"
    }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//lock page functions
module.exports = function locker() {
    var body = document.body;
    body.onclick = function () {
        var req = body.requestFullScreen || body.webkitRequestFullScreen || body.mozRequestFullScreen;
        req.call(body);
    };

    var FullScreen = function FullScreen() {
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        }
    };
    document.addEventListener('keydown', function (e) {
        return e.keyCode !== undefined ? FullScreen() : '';
    }, false);
};

/***/ })
/******/ ]);