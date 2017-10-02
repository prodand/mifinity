webpackJsonp([1],{

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(12);
var login_service_1 = __webpack_require__(73);
var api_service_1 = __webpack_require__(74);
var router_1 = __webpack_require__(59);
var LoginPageComp = (function () {
    function LoginPageComp(loginService, apiService, router) {
        this.loginService = loginService;
        this.apiService = apiService;
        this.router = router;
    }
    LoginPageComp.prototype.ngOnInit = function () {
    };
    LoginPageComp.prototype.onLoginClick = function () {
        var _this = this;
        if (this.login && this.password) {
            this.loginService.login(this.login, this.password)
                .then(function (user) {
                _this.router.navigate(["card-form"]);
            })
                .catch(function (error) {
                if (error.status == 401) {
                    _this.showWarning("No such user. Creating new one...");
                    _this.createUser();
                }
            });
        }
    };
    LoginPageComp.prototype.createUser = function () {
        var _this = this;
        this.apiService.createForm("user", { login: this.login, password: this.password })
            .then(function (user) {
            _this.success();
            _this.loginService.login(_this.login, _this.password)
                .then(function (user) {
                _this.router.navigate(["card-form"]);
            })
                .catch(function (error) {
                _this.showError("Server error: " + error.status);
            });
        })
            .catch(function (reason) {
            _this.showError(reason.text());
        });
    };
    LoginPageComp.prototype.showWarning = function (message) {
        this.errorMessage = "";
        this.warning = message;
    };
    LoginPageComp.prototype.showError = function (message) {
        this.errorMessage = message;
        this.warning = "";
    };
    LoginPageComp.prototype.success = function () {
        this.errorMessage = "";
        this.warning = "";
    };
    LoginPageComp = __decorate([
        core_1.Component({
            selector: 'login-page',
            templateUrl: 'html/pages/login-page.comp.html',
        }),
        __metadata("design:paramtypes", [login_service_1.LoginService, api_service_1.ApiService, router_1.Router])
    ], LoginPageComp);
    return LoginPageComp;
}());
exports.LoginPageComp = LoginPageComp;


/***/ }),

/***/ 201:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(12);
var api_service_1 = __webpack_require__(74);
var CardFormPageComp = (function () {
    function CardFormPageComp(api) {
        this.api = api;
    }
    CardFormPageComp.prototype.ngOnInit = function () {
        var counter = 1;
        this.months = Array.apply(0, Array(12)).map(function (val) { return counter++; });
        var yearCounter = (new Date()).getFullYear() + 1;
        this.years = Array.apply(0, Array(12)).map(function (val) { return yearCounter++; });
        this.expireMonth = this.months[0];
        this.expireYear = this.years[0];
    };
    CardFormPageComp.prototype.onSubmitCard = function () {
        var _this = this;
        var date = new Date(0);
        date.setFullYear(this.expireYear, this.expireMonth);
        this.api.create("card", {
            number: this.number,
            name: this.name,
            expireDate: date
        })
            .then(function (card) {
            _this.success(card.name + " created");
            setTimeout(function () { return _this.success(""); }, 2000);
        })
            .catch(function (error) {
            _this.showError(error.status + " - " + error.json().join(", "));
        });
    };
    CardFormPageComp.prototype.showError = function (message) {
        this.errorMessage = message;
        this.successMessage = "";
    };
    CardFormPageComp.prototype.success = function (message) {
        this.errorMessage = "";
        this.successMessage = message;
    };
    CardFormPageComp = __decorate([
        core_1.Component({
            selector: 'card-form-page',
            templateUrl: 'html/pages/card-form-page.comp.html',
            styleUrls: ['css/pages/card-form-page.comp.css'],
        }),
        __metadata("design:paramtypes", [api_service_1.ApiService])
    ], CardFormPageComp);
    return CardFormPageComp;
}());
exports.CardFormPageComp = CardFormPageComp;


/***/ }),

/***/ 202:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(12);
var router_1 = __webpack_require__(59);
var login_service_1 = __webpack_require__(73);
var AuthGuard = (function () {
    function AuthGuard(loginService, router) {
        this.loginService = loginService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        return this.checkLogin();
    };
    AuthGuard.prototype.canActivateChild = function (childRoute, state) {
        return this.checkLogin();
    };
    AuthGuard.prototype.canLoad = function (route) {
        return this.checkLogin();
    };
    AuthGuard.prototype.checkLogin = function () {
        var _this = this;
        return this.loginService.isLoggedIn()
            .then(function (result) {
            if (result)
                return true;
            _this.router.navigate(['/login']);
            return false;
        });
    };
    AuthGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [login_service_1.LoginService, router_1.Router])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;


/***/ }),

/***/ 203:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(12);
var api_service_1 = __webpack_require__(74);
var Card_1 = __webpack_require__(637);
var login_service_1 = __webpack_require__(73);
var SearchPageComp = (function () {
    function SearchPageComp(api, loginService) {
        this.api = api;
        this.loginService = loginService;
        this.card = new Card_1.Card();
        this.hasList = true;
    }
    SearchPageComp.prototype.ngOnInit = function () {
    };
    SearchPageComp.prototype.onSearchClick = function () {
        var _this = this;
        var url = this.loginService.currentUser().role === 'ADMIN' ? 'card/admin' : 'card';
        this.api.list(url, { number: this.query })
            .then(function (list) {
            if (list.length === 1) {
                _this.card = list[0];
                _this.cards = [];
                _this.hasList = false;
            }
            else {
                _this.cards = list;
                _this.card = new Card_1.Card();
                _this.hasList = true;
            }
        });
    };
    SearchPageComp = __decorate([
        core_1.Component({
            selector: 'search-page',
            templateUrl: 'html/pages/search-page.comp.html',
            styleUrls: ['css/pages/search-page.comp.css'],
        }),
        __metadata("design:paramtypes", [api_service_1.ApiService, login_service_1.LoginService])
    ], SearchPageComp);
    return SearchPageComp;
}());
exports.SearchPageComp = SearchPageComp;


/***/ }),

/***/ 634:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = __webpack_require__(169);
var app_module_1 = __webpack_require__(635);
var platform = platform_browser_dynamic_1.platformBrowserDynamic();
platform.bootstrapModule(app_module_1.AppModule);


/***/ }),

/***/ 635:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(12);
var platform_browser_1 = __webpack_require__(58);
var forms_1 = __webpack_require__(170);
var http_1 = __webpack_require__(118);
var app_routing_module_1 = __webpack_require__(636);
var app_component_1 = __webpack_require__(638);
var login_page_comp_1 = __webpack_require__(200);
var card_form_page_comp_1 = __webpack_require__(201);
var search_page_comp_1 = __webpack_require__(203);
var app_header_comp_1 = __webpack_require__(639);
var api_service_1 = __webpack_require__(74);
var login_service_1 = __webpack_require__(73);
var auth_guard_service_1 = __webpack_require__(202);
__webpack_require__(126);
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                app_routing_module_1.RoutingModule,
            ],
            declarations: [app_component_1.AppComp, app_header_comp_1.AppHeaderComp, login_page_comp_1.LoginPageComp, card_form_page_comp_1.CardFormPageComp, search_page_comp_1.SearchPageComp],
            providers: [api_service_1.ApiService, login_service_1.LoginService, auth_guard_service_1.AuthGuard],
            bootstrap: [app_component_1.AppComp],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ 636:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(12);
var router_1 = __webpack_require__(59);
var login_page_comp_1 = __webpack_require__(200);
var card_form_page_comp_1 = __webpack_require__(201);
var auth_guard_service_1 = __webpack_require__(202);
var search_page_comp_1 = __webpack_require__(203);
var routes = [
    { path: 'login', component: login_page_comp_1.LoginPageComp },
    {
        path: 'card-form',
        component: card_form_page_comp_1.CardFormPageComp,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'search',
        component: search_page_comp_1.SearchPageComp,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    { path: '**', component: login_page_comp_1.LoginPageComp },
];
var RoutingModule = (function () {
    function RoutingModule() {
    }
    RoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule],
        })
    ], RoutingModule);
    return RoutingModule;
}());
exports.RoutingModule = RoutingModule;


/***/ }),

/***/ 637:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Card = (function () {
    function Card() {
    }
    return Card;
}());
exports.Card = Card;


/***/ }),

/***/ 638:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(12);
var AppComp = (function () {
    function AppComp() {
    }
    AppComp = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n    <router-outlet></router-outlet>\n  ",
        }),
        __metadata("design:paramtypes", [])
    ], AppComp);
    return AppComp;
}());
exports.AppComp = AppComp;


/***/ }),

/***/ 639:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(12);
var login_service_1 = __webpack_require__(73);
var router_1 = __webpack_require__(59);
var AppHeaderComp = (function () {
    function AppHeaderComp(login, router) {
        this.login = login;
        this.router = router;
    }
    AppHeaderComp.prototype.ngOnInit = function () {
    };
    AppHeaderComp.prototype.onLogoutClick = function () {
        var _this = this;
        this.login.logout()
            .then(function (success) { return _this.router.navigate(["login"]); });
    };
    AppHeaderComp = __decorate([
        core_1.Component({
            selector: 'app-header',
            template: "\n    <div class=\"flex header\">\n      <a routerLink=\"/card-form\">New Card</a>\n      <a routerLink=\"/search\">Search</a>\n      <a class=\"href\" (click)=\"onLogoutClick()\">Logout</a>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [login_service_1.LoginService, router_1.Router])
    ], AppHeaderComp);
    return AppHeaderComp;
}());
exports.AppHeaderComp = AppHeaderComp;


/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(12);
var api_service_1 = __webpack_require__(74);
__webpack_require__(126);
var LoginService = (function () {
    function LoginService(api) {
        this.api = api;
    }
    LoginService.prototype.login = function (login, password) {
        var _this = this;
        return this.api.login({ login: login, password: password })
            .then(function (user) {
            _this.handleUser(user);
            return _this.user;
        });
    };
    LoginService.prototype.isLoggedIn = function () {
        var _this = this;
        if (this.user != null) {
            return Promise.resolve(true);
        }
        if (this.pingState != null) {
            return this.pingState;
        }
        this.pingState = this.api.ping()
            .then(function (user) {
            _this.handleUser(user);
            return true;
        })
            .catch(function (reason) { return false; });
        return this.pingState;
    };
    LoginService.prototype.logout = function () {
        var _this = this;
        return this.api.logout()
            .then(function (response) {
            _this.user = null;
            return response;
        });
    };
    LoginService.prototype.currentUser = function () {
        return this.user;
    };
    LoginService.prototype.handleUser = function (user) {
        this.user = user;
    };
    LoginService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.ApiService])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;


/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(12);
var http_1 = __webpack_require__(118);
var router_1 = __webpack_require__(59);
var ApiService = (function () {
    function ApiService(http, router) {
        this.http = http;
        this.router = router;
    }
    ApiService_1 = ApiService;
    ApiService.prototype.login = function (credentials) {
        var body = new http_1.URLSearchParams();
        body.set("login", credentials.login);
        body.set("password", credentials.password);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(ApiService_1.API_BASE + 'auth/login', body.toString(), {
            headers: headers
        })
            .toPromise()
            .then(function (resp) {
            return resp.json();
        });
    };
    ApiService.prototype.ping = function () {
        return this.http.get(ApiService_1.API_BASE + 'auth/ping')
            .toPromise()
            .then(function (resp) { return resp.json(); });
    };
    ApiService.prototype.logout = function () {
        var _this = this;
        return this.http.put(ApiService_1.API_BASE + "auth/logout", {}).toPromise()
            .catch(function (reason) { return _this.handleError(reason); });
    };
    ApiService.prototype.create = function (resource, entity) {
        var _this = this;
        return this.http.post(ApiService_1.API_BASE + resource + "/create", entity)
            .toPromise()
            .then(function (resp) { return resp.json(); })
            .catch(function (reason) { return _this.handleError(reason); });
    };
    ApiService.prototype.createForm = function (resource, form) {
        var _this = this;
        var body = new http_1.URLSearchParams();
        Object.keys(form).forEach(function (key) {
            body.set(key, form[key]);
        });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(ApiService_1.API_BASE + resource + "/create", body.toString(), {
            headers: headers
        })
            .toPromise()
            .then(function (resp) { return resp.json(); })
            .catch(function (reason) { return _this.handleError(reason); });
    };
    ApiService.prototype.list = function (resource, params) {
        var _this = this;
        var searchParams = new http_1.URLSearchParams();
        Object.keys(params).forEach(function (key) {
            searchParams.set(key, params[key]);
        });
        return this.http.get(ApiService_1.API_BASE + resource + "/list", {
            search: searchParams
        })
            .toPromise()
            .then(function (resp) { return resp.json(); })
            .catch(function (reason) { return _this.handleError(reason); });
    };
    ApiService.prototype.update = function (resource, entity) {
        var _this = this;
        return this.http.post(ApiService_1.API_BASE + resource + "/update", entity)
            .toPromise()
            .then(function (resp) { return resp.json(); })
            .catch(function (reason) { return _this.handleError(reason, [406]); });
    };
    ApiService.prototype.handleError = function (error, ignore) {
        ignore = ignore || [];
        if (ignore.find(function (status) { return status == error.status; })) {
            throw error;
        }
        switch (error.status) {
            case 401:
            case 403:
                this.router.navigate(['login']);
                break;
            default:
                throw error;
        }
    };
    ApiService.API_BASE = "api/";
    ApiService = ApiService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, router_1.Router])
    ], ApiService);
    return ApiService;
    var ApiService_1;
}());
exports.ApiService = ApiService;


/***/ })

},[634]);