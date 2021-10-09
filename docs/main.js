(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\dev\github_projects\LeafletDemo\src\main.ts */"zUnb");


/***/ }),

/***/ "AV7T":
/*!*********************************************!*\
  !*** ./src/app/services/atlanta-service.ts ***!
  \*********************************************/
/*! exports provided: AtlantaService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AtlantaService", function() { return AtlantaService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");



class AtlantaService {
    constructor(http) {
        this.http = http;
    }
    getAll() {
        return this.http.get('assets/data/atlanta.json');
    }
}
AtlantaService.ɵfac = function AtlantaService_Factory(t) { return new (t || AtlantaService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
AtlantaService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AtlantaService, factory: AtlantaService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AtlantaService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! leaflet */ "4R65");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _services_birmingham_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/birmingham.service */ "g8n5");
/* harmony import */ var _services_atlanta_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/atlanta-service */ "AV7T");







class AppComponent {
    constructor(birminghamService, atlantaService) {
        this.birminghamService = birminghamService;
        this.atlantaService = atlantaService;
        this.title = 'LeafletDemo';
    }
    ngAfterViewInit() {
        this.initMap();
        const layerSwitcher = this.loadBaseMaps(this.map);
        const boundGroup = new leaflet__WEBPACK_IMPORTED_MODULE_1__["FeatureGroup"](); // hold features for fit bounds
        const birmingham$ = this.birminghamService.getAll();
        const atlanta$ = this.atlantaService.getAll();
        // using combineLatest. after everything is loaded i want to center the map
        Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["combineLatest"])(birmingham$, atlanta$).subscribe(([birminghamResults, atlantaResults]) => {
            const birminghamLayer = new leaflet__WEBPACK_IMPORTED_MODULE_1__["FeatureGroup"]();
            birminghamResults.features.forEach(result => {
                const tmp = leaflet__WEBPACK_IMPORTED_MODULE_1__["geoJSON"](result, {
                    style: (() => {
                        return { weight: 1, fillColor: 'red', fillOpacity: 0.5 };
                    })
                });
                tmp.bindPopup('');
                birminghamLayer.addLayer(tmp);
                boundGroup.addLayer(tmp);
            });
            birminghamLayer.addTo(this.map);
            layerSwitcher.addOverlay(birminghamLayer, 'Birmingham');
            const atlantaLayer = new leaflet__WEBPACK_IMPORTED_MODULE_1__["FeatureGroup"]();
            atlantaResults.features.forEach(result => {
                const tmp = leaflet__WEBPACK_IMPORTED_MODULE_1__["geoJSON"](result, {
                    style: (() => {
                        return { weight: 1, fillColor: 'red', fillOpacity: 0.5 };
                    })
                });
                tmp.bindPopup('');
                atlantaLayer.addLayer(tmp);
                boundGroup.addLayer(tmp);
            });
            atlantaLayer.addTo(this.map);
            layerSwitcher.addOverlay(atlantaLayer, 'Atlanta');
            if (boundGroup.getBounds().isValid()) {
                this.map.fitBounds(boundGroup.getBounds());
            }
            boundGroup.clearLayers().remove();
        });
    }
    initMap() {
        this.map = leaflet__WEBPACK_IMPORTED_MODULE_1__["map"]('map', {
            center: [33.520912, -86.849564],
            zoom: 9
        });
        this.map.on('popupopen', (e => {
            let result = '';
            const src = e.popup._source;
            for (const key in src.feature.properties) {
                if (Object.prototype.hasOwnProperty.call(src.feature.properties, key)) {
                    console.log(key + ' - ' + src.feature.properties[key]);
                    result = result + `<div><strong>${key}</strong>:${src.feature.properties[key]}</div>`;
                }
            }
            e.popup.setContent(result);
        }));
    }
    loadBaseMaps(map) {
        const openStreetMap = Object(leaflet__WEBPACK_IMPORTED_MODULE_1__["tileLayer"])('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            detectRetina: true,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        const mapboxStreet = Object(leaflet__WEBPACK_IMPORTED_MODULE_1__["tileLayer"])('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id: 'mapbox/streets-v11',
            accessToken: 'pk.eyJ1Ijoia2VtZXJ5YW1hciIsImEiOiJja3VlaWNkMmkwY3NhMnBudmNyMWQxZXNwIn0.uaRmmk3I8ijkdfzuKUJWLw'
        });
        const mapboxOutdoor = Object(leaflet__WEBPACK_IMPORTED_MODULE_1__["tileLayer"])('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id: 'mapbox/outdoors-v11',
            accessToken: 'pk.eyJ1Ijoia2VtZXJ5YW1hciIsImEiOiJja3VlaWNkMmkwY3NhMnBudmNyMWQxZXNwIn0.uaRmmk3I8ijkdfzuKUJWLw'
        });
        const mapboxLight = Object(leaflet__WEBPACK_IMPORTED_MODULE_1__["tileLayer"])('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id: 'mapbox/light-v10',
            accessToken: 'pk.eyJ1Ijoia2VtZXJ5YW1hciIsImEiOiJja3VlaWNkMmkwY3NhMnBudmNyMWQxZXNwIn0.uaRmmk3I8ijkdfzuKUJWLw'
        });
        const mapboxDark = Object(leaflet__WEBPACK_IMPORTED_MODULE_1__["tileLayer"])('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id: 'mapbox/dark-v10',
            accessToken: 'pk.eyJ1Ijoia2VtZXJ5YW1hciIsImEiOiJja3VlaWNkMmkwY3NhMnBudmNyMWQxZXNwIn0.uaRmmk3I8ijkdfzuKUJWLw'
        });
        const mapboxSatellite = Object(leaflet__WEBPACK_IMPORTED_MODULE_1__["tileLayer"])('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id: 'mapbox/satellite-v9',
            accessToken: 'pk.eyJ1Ijoia2VtZXJ5YW1hciIsImEiOiJja3VlaWNkMmkwY3NhMnBudmNyMWQxZXNwIn0.uaRmmk3I8ijkdfzuKUJWLw'
        });
        const mapboxSatelliteStreets = Object(leaflet__WEBPACK_IMPORTED_MODULE_1__["tileLayer"])('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id: 'mapbox/satellite-streets-v11',
            accessToken: 'pk.eyJ1Ijoia2VtZXJ5YW1hciIsImEiOiJja3VlaWNkMmkwY3NhMnBudmNyMWQxZXNwIn0.uaRmmk3I8ijkdfzuKUJWLw'
        });
        const baseMaps = {
            'OpenStreetMap': openStreetMap,
            'Mapbox Street': mapboxStreet,
            'Mapbox Outdoor': mapboxOutdoor,
            'Mapbox Light': mapboxLight,
            'Mapbox Dark': mapboxDark,
            'Mapbox Satellite': mapboxSatellite,
            'Mapbox Satellite Streets': mapboxSatelliteStreets
        };
        return leaflet__WEBPACK_IMPORTED_MODULE_1__["control"].layers(baseMaps).addTo(map);
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_birmingham_service__WEBPACK_IMPORTED_MODULE_3__["BirminghamService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_atlanta_service__WEBPACK_IMPORTED_MODULE_4__["AtlantaService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 3, vars: 0, consts: [[1, "map-container"], [1, "map-frame"], ["id", "map"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".map-container[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  margin: 30px;\n}\n\n.map-frame[_ngcontent-%COMP%] {\n  border: 2px solid black;\n  height: 100%;\n}\n\n#map[_ngcontent-%COMP%] {\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUVBO0VBQ0UsdUJBQUE7RUFDQSxZQUFBO0FBQ0Y7O0FBRUE7RUFDRSxZQUFBO0FBQ0YiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1hcC1jb250YWluZXIge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDA7XHJcbiAgbGVmdDogMDtcclxuICByaWdodDogMDtcclxuICBib3R0b206IDA7XHJcbiAgbWFyZ2luOiAzMHB4O1xyXG59XHJcblxyXG4ubWFwLWZyYW1lIHtcclxuICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcclxuICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuXHJcbiNtYXAge1xyXG4gIGhlaWdodDogMTAwJTtcclxufVxyXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss']
            }]
    }], function () { return [{ type: _services_birmingham_service__WEBPACK_IMPORTED_MODULE_3__["BirminghamService"] }, { type: _services_atlanta_service__WEBPACK_IMPORTED_MODULE_4__["AtlantaService"] }]; }, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _services_birmingham_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/birmingham.service */ "g8n5");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "tk/3");






class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [_services_birmingham_service__WEBPACK_IMPORTED_MODULE_3__["BirminghamService"]], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"]
                ],
                providers: [_services_birmingham_service__WEBPACK_IMPORTED_MODULE_3__["BirminghamService"]],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "g8n5":
/*!************************************************!*\
  !*** ./src/app/services/birmingham.service.ts ***!
  \************************************************/
/*! exports provided: BirminghamService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BirminghamService", function() { return BirminghamService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");



class BirminghamService {
    constructor(http) {
        this.http = http;
    }
    getAll() {
        return this.http.get('assets/data/birmingham.json');
    }
}
BirminghamService.ɵfac = function BirminghamService_Factory(t) { return new (t || BirminghamService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
BirminghamService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: BirminghamService, factory: BirminghamService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](BirminghamService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map