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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = convertDurationToETA;
/* harmony export (immutable) */ __webpack_exports__["c"] = convertParsedDurationToETA;
/* harmony export (immutable) */ __webpack_exports__["f"] = parseDuration;
/* harmony export (immutable) */ __webpack_exports__["d"] = createTextSpan;
/* harmony export (immutable) */ __webpack_exports__["e"] = genericCleanup;
/* harmony export (immutable) */ __webpack_exports__["h"] = toFixed;
/* harmony export (immutable) */ __webpack_exports__["g"] = shorten;
/* harmony export (immutable) */ __webpack_exports__["a"] = colorizeType;
function convertDurationToETA(duration) {
    const parsedSeconds = parseDuration(duration);
    const eta = new Date();
    eta.setSeconds(eta.getSeconds() + parsedSeconds - eta.getTimezoneOffset() * 60);
    let ret = eta.toISOString().substr(5, 11).replace("-", ".").replace("T", ". ");
    return ret;
}
function convertParsedDurationToETA(parsedSeconds) {
    const eta = new Date();
    eta.setSeconds(eta.getSeconds() + parsedSeconds - eta.getTimezoneOffset() * 60);
    return eta.toISOString().substr(5, 11).replace("-", ".").replace("T", ". ");
}
function parseDuration(duration) {
    const days = duration.match(/(\d+)\s*d/);
    const hours = duration.match(/(\d+)\s*h/);
    const minutes = duration.match(/(\d+)\s*m/);
    const seconds = duration.match(/(\d+)\s*s/);
    let parsedSeconds = 0;
    if (days) {
        parsedSeconds += parseInt(days[1]) * 86400;
    }
    if (hours) {
        parsedSeconds += parseInt(hours[1]) * 3600;
    }
    if (minutes) {
        parsedSeconds += parseInt(minutes[1]) * 60;
    }
    if (seconds) {
        parsedSeconds += parseInt(seconds[1]);
    }
    return parsedSeconds;
}
function createTextSpan(text, className = "prun-remove-js") {
    const newSpan = document.createElement("span");
    newSpan.classList.add(className);
    newSpan.textContent = text;
    return newSpan;
}
function genericCleanup(className = "prun-remove-js") {
    Array.from(document.getElementsByClassName(className)).forEach((elem) => {
        elem.parentNode && elem.parentNode.removeChild(elem);
    });
}
function toFixed(value, precision = 2) {
    const power = Math.pow(10, precision || 0);
    const number = Math.round(value * power) / power;
    return number.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function shorten(text) {
    const shortTable = {
        "NEO Charter Exploration Market Maker": "NEO Charter MM",
        "Antares Initiative Market Maker": "Antares MM",
        "Insitor Cooperative Market Maker": "Insitor MM",
        "Castillo-Ito Mercantile Market Maker": "Castillo-Ito MM",
        "Station Commodity Exchange": "CX",
        "Currency": "Cur",
        "Amount": "Amt",
    };
    var re = new RegExp(Object.keys(shortTable).join("|"), "g");
    return text.replace(re, function (matched) {
        return shortTable[matched];
    });
}
function colorizeType(type, tag) {
    switch (type) {
        case "BUYING": {
            const typeNode = createTextSpan("BUY", tag);
            FontColor(60, 179, 113, typeNode);
            return typeNode;
        }
        case "SELLING": {
            const typeNode = createTextSpan("SEL", tag);
            FontColor(178, 34, 34, typeNode);
            return typeNode;
        }
        case "SHIPPING": {
            const typeNode = createTextSpan("SHI", tag);
            FontColor(79, 130, 180, typeNode);
            return typeNode;
        }
    }
}
function FontColor(r, g, b, textHolder) {
    textHolder.style.color = "rgb(" + r + "," + g + "," + b + ")";
    textHolder.style.fontFamily = "courier";
    textHolder.style.fontSize = "90%";
    textHolder.style.fontWeight = "600";
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Selector = {
    LMCommodityAdText: "div[class='_14L--Z4VrwQHE-Dayta1db']",
    LMCommodityAdInnerText: "div[class='_1owHJs3IjU2hxdT0zQ1ytB']",
    CXOBTable: "table[class='_3hdJGl6KSop3ReUzeVtjD2 _2Fog1ad46aZ4q-RoEgK3R6 _1vWRpdI8cKNMPyOPnzlXgX _33A_5lETf4HBqwJi_q-jhZ']",
    FXOBTable: "table[class='e9tTFVletB4P36C7c3_3t _2Fog1ad46aZ4q-RoEgK3R6 _1vWRpdI8cKNMPyOPnzlXgX _33A_5lETf4HBqwJi_q-jhZ']",
    CXOrdersExchangeName: "span[class='_3ifriA33o8WAhdFSaIgqWi']",
    CXOrdersTable: "table[class='_2HAbDk9YexRt4S5-IhEbvT _2Fog1ad46aZ4q-RoEgK3R6 _1vWRpdI8cKNMPyOPnzlXgX _33A_5lETf4HBqwJi_q-jhZ']",
    ProdLine: "div[class='z8O6A0dWYid_6Vb1y75qz _2NKqmMbW69tQxqvJOvKvLL']",
};
/* harmony export (immutable) */ __webpack_exports__["a"] = Selector;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Style = {
    Button: ["_1VPBeuov5AYlOu4s7pKIlY"],
    ButtonPrimary: ["_1Y9l3J20Xn-CyxMZIcH06i"],
    ButtonSuccess: ["_3yZx55zAhax66rAfv6d6Z1"],
    ButtonDanger: ["_31dQZugJBAqjKvME7bRBlA"],
    SidebarSectionHead: ["CCGkvrSnzJdaNZHYPPEHp", "_33A_5lETf4HBqwJi_q-jhZ"],
    SidebarSectionContent: ["LmT6E6SUymEKlbZEY3tQ8", "_33A_5lETf4HBqwJi_q-jhZ"],
    SidebarLine: ["_258LbKlZRnQLY888Zg1cXb", "_24sz11_G6VXEYloo9FtRtZ"],
    FontsRegular: ["_1EHFMt11olvELFgH4xaNE8"],
};
/* harmony export (immutable) */ __webpack_exports__["a"] = Style;

const WithStyles = (...style) => {
    return style.reduce(((previousValue, currentValue) => previousValue.concat(currentValue)));
};
/* harmony export (immutable) */ __webpack_exports__["b"] = WithStyles;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FlightplanETAs__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__LocalMarketAds__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ModuleRunner__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__OrderETAs__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ParseETAs__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__PostLM__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__QueueLoad__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__CXFX__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__FIN__ = __webpack_require__(14);









const runner = new __WEBPACK_IMPORTED_MODULE_2__ModuleRunner__["a" /* ModuleRunner */]([
    new __WEBPACK_IMPORTED_MODULE_1__LocalMarketAds__["a" /* LocalMarketAds */](),
    new __WEBPACK_IMPORTED_MODULE_4__ParseETAs__["a" /* ParseETAs */](),
    new __WEBPACK_IMPORTED_MODULE_3__OrderETAs__["a" /* OrderETAs */](),
    new __WEBPACK_IMPORTED_MODULE_0__FlightplanETAs__["a" /* FlightplanETAs */](),
    new __WEBPACK_IMPORTED_MODULE_5__PostLM__["a" /* PostLM */](),
    new __WEBPACK_IMPORTED_MODULE_6__QueueLoad__["a" /* QueueLoad */](),
    new __WEBPACK_IMPORTED_MODULE_7__CXFX__["a" /* CXFX */](),
    new __WEBPACK_IMPORTED_MODULE_8__FIN__["a" /* FIN */]()
]);
(function () {
    runner.loop();
})();


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);

class FlightplanETAs {
    constructor() {
        this.tag = "pb-flightplan-eta";
    }
    cleanup() {
        Object(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* genericCleanup */])(this.tag);
    }
    run() {
        const elements = Array.from(document.querySelectorAll("table[class='_1g8dfBRzDAqRXFqRvSaL75 _2Fog1ad46aZ4q-RoEgK3R6 _1vWRpdI8cKNMPyOPnzlXgX _33A_5lETf4HBqwJi_q-jhZ'] > tbody > tr"));
        elements.forEach(destinationRow => {
            const targetRow = destinationRow.children[3];
            const eta = Object(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* convertDurationToETA */])(targetRow.children[0].textContent);
            targetRow.appendChild(Object(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* createTextSpan */])(` (${eta})`, this.tag));
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FlightplanETAs;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Selector__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DB__ = __webpack_require__(6);



class LocalMarketAds {
    constructor() {
        this.tag = "pb-lm-ads";
    }
    cleanup() {
        Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* genericCleanup */])(this.tag);
    }
    run() {
        const elements = document.querySelectorAll(__WEBPACK_IMPORTED_MODULE_0__Selector__["a" /* Selector */].LMCommodityAdText);
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            const text = element.childNodes[0].textContent;
            const matches = text && text.match(/(?:BUYING|SELLING)\s*(\d+)\s(.*)\s@\s([\d,.]+)\s[A-Z]+/);
            if (matches) {
                const count = parseInt(matches[1]);
                const totalCents = parseInt(matches[3].replace(/[,.]/g, ''));
                const perItem = Object(__WEBPACK_IMPORTED_MODULE_1__util__["h" /* toFixed */])(totalCents / count / 100, 2);
                const entry = element.querySelector(__WEBPACK_IMPORTED_MODULE_0__Selector__["a" /* Selector */].LMCommodityAdInnerText);
                let shownEntry = entry.cloneNode(true);
                const adType = entry.childNodes[0].textContent;
                const priceSpan = shownEntry.querySelector(__WEBPACK_IMPORTED_MODULE_0__Selector__["a" /* Selector */].LMCommodityAdInnerText + " > span");
                priceSpan.appendChild(Object(__WEBPACK_IMPORTED_MODULE_1__util__["d" /* createTextSpan */])(` (${perItem} ea) `, this.tag));
                entry.childNodes[0].parentElement.style.display = "None";
                shownEntry.removeAttribute("style");
                shownEntry.classList.add(this.tag);
                shownEntry.replaceChild(Object(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* colorizeType */])(adType, this.tag), shownEntry.childNodes[0]);
                shownEntry.childNodes[1].textContent = ` ${count} ${Object(__WEBPACK_IMPORTED_MODULE_2__DB__["a" /* shortenMatName */])(matches[2])} `;
                shownEntry.childNodes[3].textContent = "";
                shownEntry.childNodes[4].textContent = "";
                shownEntry.childNodes[5].textContent = "";
                entry.parentElement.appendChild(shownEntry);
            }
            else {
                const matchesShip = text && text.match(/(?:SHIPPING)\s*([\d.]+)t\s\/\s([\d.]+)m³\s@\s([\d,.]+)\s[A-Z]+/);
                if (matchesShip) {
                    const totalCost = matchesShip[3];
                    const tonnage = parseFloat(matchesShip[1]);
                    const size = parseFloat(matchesShip[2]);
                    var unit;
                    var count;
                    if (tonnage > size) {
                        unit = 't';
                        count = tonnage;
                    }
                    else {
                        unit = 'm³';
                        count = size;
                    }
                    const totalCents = parseInt(totalCost.replace(/[,.]/g, ''));
                    const perItem = Object(__WEBPACK_IMPORTED_MODULE_1__util__["h" /* toFixed */])(totalCents / count / 100, 2);
                    const entry = element.querySelector(__WEBPACK_IMPORTED_MODULE_0__Selector__["a" /* Selector */].LMCommodityAdInnerText);
                    let shownEntry = entry.cloneNode(true);
                    const priceSpan = shownEntry.querySelector(__WEBPACK_IMPORTED_MODULE_0__Selector__["a" /* Selector */].LMCommodityAdInnerText + " > span");
                    priceSpan.appendChild(Object(__WEBPACK_IMPORTED_MODULE_1__util__["d" /* createTextSpan */])(` (${perItem}/${unit})`, this.tag));
                    entry.childNodes[0].parentElement.style.display = "None";
                    shownEntry.removeAttribute("style");
                    shownEntry.classList.add(this.tag);
                    shownEntry.replaceChild(Object(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* colorizeType */])("SHIPPING", this.tag), shownEntry.childNodes[0]);
                    shownEntry.childNodes[1].textContent = ` ` + shownEntry.childNodes[1].textContent;
                    shownEntry.childNodes[6].textContent = ` `;
                    shownEntry.childNodes[7].textContent = shownEntry.childNodes[7].textContent.replace(/ *\([^)]*\) */g, "");
                    shownEntry.childNodes[8].textContent = `->`;
                    shownEntry.childNodes[9].textContent = shownEntry.childNodes[9].textContent.replace(/ *\([^)]*\) */g, " ");
                    shownEntry.removeChild(shownEntry.childNodes[10]);
                    shownEntry.style.whiteSpace = "pre-wrap";
                    entry.parentElement.appendChild(shownEntry);
                }
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LocalMarketAds;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = shortenMatName;
function shortenMatName(text) {
    const shortTable = {
        'All-Purpose Fodder': 'FOD',
        'Flowery Hops': 'HOP',
        'Caffeinated Beans': 'CAF',
        'High-Carb Grains': 'GRN',
        'High-Carb Maize': 'MAI',
        'Raw Cotton Fiber': 'RCO',
        'Triglyceride Nuts': 'NUT',
        'Triglyceride Fruits': 'VEG',
        'Wine-Quality Grapes': 'GRA',
        'Spicy Herbs': 'HER',
        'Hydrocarbon Plants': 'HCP',
        'Meat Tissue Patties': 'MTP',
        'Protein-Rich Mushrooms': 'MUS',
        'Pineberries': 'PIB',
        'Protein-Rich Algae': 'ALG',
        'Protein-Rich Beans': 'BEA',
        'Protein Paste': 'PPA',
        'Raw Silk Strains': 'RSI',
        'Vita Essence': 'VIT',
        'Ferrominium': 'FAL',
        'Alpha-Stabilized Titanium': 'ASD',
        'Borosilicate': 'BOS',
        'Bronze': 'BRO',
        'Red Gold': 'RGO',
        'Blue Gold': 'BGO',
        'Ferro-Titanium': 'FET',
        'Alpha-Stabilized Tungsten': 'WAL',
        'Artificial Soil': 'SOI',
        'Helpful Bacteria': 'BAC',
        'Desaturation Agent': 'BLE',
        'Breathable Liquid': 'BL',
        'Chemical Reagents': 'REA',
        'Cryogenic Stabilizer': 'CST',
        'Enriched Einsteinium': 'EES',
        'Enriched Technetium': 'ETC',
        'Flux': 'FLX',
        'Indigo Colorant': 'IND',
        'Liquid Crystals': 'LCR',
        'Nano-Enhanced Resin': 'NR',
        'Nutrient Solution': 'NS',
        'Olfactory Substances': 'OLF',
        'DDT Plant Agent': 'DDT',
        'Premium Fertilizer': 'PFE',
        'Sedative Substance': 'JUI',
        'TCL Acid': 'TC',
        'ThermoFluid': 'THF',
        'Epoxy Resin': 'EPO',
        'InsuFoam': 'INS',
        'MegaTube Coating': 'MTC',
        'Mineral Construction Granulate': 'MCG',
        'Nano-Carbon Sheeting': 'NCX',
        'Nano Fiber': 'NFI',
        'Nano-Coated Glass': 'NG',
        'Reinforced Glass': 'RG',
        'Poly-Sulfite Sealant': 'SEA',
        'Glass': 'GL',
        'Aerostat Foundation': 'AEF',
        'Air Scrubber': 'AIR',
        'Decorative Elements': 'DEC',
        'Floating Tank': 'FLO',
        'Flow Control Device': 'FC',
        'Fluid Piping': 'FLP',
        'Cylindrical Gas Container': 'GC',
        'Gas Vent': 'GV',
        'Magnetic Ground Cover': 'MGC',
        'Metal-Halide Lighting System': 'MHL',
        'Neon Lighting System': 'LIT',
        'Pressure Shielding': 'PSH',
        'Radiation Shielding': 'RSH',
        'Stabilized Technetium': 'TCS',
        'Thermal Shielding': 'TSH',
        'Truss': 'TRU',
        'Advanced Bulkhead': 'ABH',
        'Advanced Deck Elements': 'ADE',
        'Advanced Structural Elements': 'ASE',
        'Advanced Transparent Aperture': 'ATA',
        'Basic Bulkhead': 'BBH',
        'Basic Deck Elements': 'BDE',
        'Basic Structural Elements': 'BSE',
        'Basic Transparent Aperture': 'BTA',
        'Hardened Structural Elements': 'HSE',
        'Lightweight Bulkhead': 'LBH',
        'Lightweight Deck Elements': 'LDE',
        'Lightweight Structural Elements': 'LSE',
        'Lightweight Transparent Aperture': 'LTA',
        'Reinforced Bulkhead': 'RBH',
        'Reinforced Deck Elements': 'RDE',
        'Reinforced Structural Elements': 'RSE',
        'Reinforced Transparent Aperture': 'RTA',
        'Drinking Water': 'DW',
        'Smart Space Suit': 'HSS',
        'Flavoured Insta-Meal': 'FIM',
        'Personal Data Assistant': 'PDA',
        'Basic Overalls': 'OVE',
        'Basic Rations': 'RAT',
        'AI-Assisted Lab Coat': 'LC',
        'Quality Meat Meal': 'MEA',
        'Scientific Work Station': 'WS',
        'Exoskeleton Work Suit': 'EXO',
        'Power Tools': 'PT',
        'HazMat Work Suit': 'HMS',
        'Basic Medical Kit': 'MED',
        'Multi-Purpose Scanner': 'SCN',
        'Einsteinium-Infused Gin': 'GIN',
        'VitaGel': 'VG',
        'Padded work overall': 'PWO',
        'Caffeinated Infusion': 'COF',
        'Smart Zinfandel': 'WIN',
        'NeuroStimulants': 'NST',
        'Kombucha': 'KOM',
        'Repair Kit': 'REP',
        'Stellar Pale Ale': 'ALE',
        'Stem Cell Treatment': 'SC',
        'Crowd Control Drone': 'CCD',
        'Drone Chassis': 'DCH',
        'Drone Frame': 'DRF',
        'Rescue Drone': 'RED',
        'Ship-Repair Drone': 'SRD',
        'Surgical Drone': 'SDR',
        'Surveillance Drone': 'SUD',
        'Antenna Array': 'AAR',
        'Body Scanner': 'BSC',
        'Full-Body Interaction Device': 'BID',
        'Holographic Display': 'HD',
        'Holographic Glasses': 'HOG',
        'Basic Mainframe': 'BMF',
        'Micro Headphones': 'MHP',
        'Radio Device': 'RAD',
        'Sensor Array': 'SAR',
        'Handheld Personal Console': 'HPC',
        'Active Water Filter': 'AWF',
        'Basic Workstation': 'BWS',
        'Audio Transmitter': 'TRA',
        'Active Cooling Device': 'FAN',
        'Memory Bank': 'RAM',
        'Micro-Processor': 'MPC',
        'Motherboard': 'MB',
        'non-volatile Memory': 'ROM',
        'Printed Circuit Board': 'PCB',
        'Sensor': 'SEN',
        'Tensor Processing Unit': 'TPU',
        'Capacitative Display': 'CD',
        'Information Display': 'DIS',
        'Shielded Connector': 'BGC',
        'Electric Field Capacitor': 'CAP',
        'Budget Connectors': 'BCO',
        'Medium Fastener Kit': 'MFK',
        'Small Fastener Kit': 'SFK',
        'Laser Diodes': 'LDI',
        'High-Capacity Connectors': 'HCC',
        'Advanced Transistor': 'TRN',
        'Medium Wafer': 'MWF',
        'Small Wafer': 'SWF',
        'Audio Distribution System': 'ADS',
        'Automated Cooling System': 'ACS',
        'Climate Controller': 'CC',
        'Communication System': 'COM',
        'Cryogenic Unit': 'CRU',
        'FTL Field Controller': 'FFC',
        'Life Support System': 'LIS',
        'Logistics System': 'LOG',
        'Stability Support System': 'STS',
        'Targeting Computer': 'TAC',
        'Water Reclaimer': 'WR',
        'Beryllium': 'BE',
        'Calcium': 'CA',
        'Carbon': 'C',
        'Chlorine': 'CL',
        'Einsteinium': 'ES',
        'Iodine': 'I',
        'Magnesium': 'MG',
        'Sodium': 'NA',
        'Sulfur': 'S',
        'Tantalum': 'TA',
        'Technetium': 'TC',
        'Zirconium': 'ZR',
        'Large Capacitor Bank': 'CBL',
        'Medium Capacitor Bank': 'CBM',
        'Power Cell': 'POW',
        'Small Capacitor Bank': 'CBS',
        'Solar Cell': 'SOL',
        'Solar Panel': 'SP',
        'FTL Fuel': 'FF',
        'STL Fuel': 'SF',
        'Ammonia': 'AMM',
        'Argon': 'AR',
        'Fluorine': 'F',
        'Helium': 'HE',
        'Helium-3 Isotope': 'HE3',
        'Hydrogen': 'H',
        'Neon': 'NE',
        'Nitrogen': 'N',
        'Oxygen': 'O',
        'Heliotrope Extract': 'HEX',
        'Liquid Einsteinium': 'LES',
        'Bacterial Tungsten Solution': 'BTS',
        'Water': 'H2O',
        'Auto-Doc': 'ADR',
        'Bandages': 'BND',
        'Medical Stretcher': 'STR',
        'Painkillers': 'PK',
        'Surgical Equipment': 'SEQ',
        'Test Tubes': 'TUB',
        'Aluminium': 'AL',
        'Copper': 'CU',
        'Gold': 'AU',
        'Iron': 'FE',
        'Lithium': 'LI',
        'Silicon': 'SI',
        'Steel': 'STL',
        'Titanium': 'TI',
        'Tungsten': 'W',
        'Beryl Crystals': 'BER',
        'Bioreactive Minerals': 'BRM',
        'Boron Crystals': 'BOR',
        'Caliche Rock': 'CLI',
        'Galerite Rock': 'GAL',
        'Halite Crystals': 'HAL',
        'Limestone': 'LST',
        'Magnesite': 'MGS',
        'Magnetite': 'MAG',
        'Sulfur Crystals': 'SCR',
        'Tantalite Rock': 'TAI',
        'Technetium Oxide': 'TCO',
        'Tectosilisite': 'TS',
        'Zircon Crystals': 'ZIR',
        'Aluminium Ore': 'ALO',
        'Copper Ore': 'CUO',
        'Gold Ore': 'AUO',
        'Iron Ore': 'FEO',
        'Lithium Ore': 'LIO',
        'Silicon Ore': 'SIO',
        'Titanium Ore': 'TIO',
        'Durable Casing L': 'DCL',
        'Polymer Sheet Type L': 'PSL',
        'Durable Casing M': 'DCM',
        'Polymer Sheet Type M': 'PSM',
        'Poly-Ethylene': 'PE',
        'Polymer Granulate': 'PG',
        'Durable Casing S': 'DCS',
        'Polymer Sheet Type S': 'PSS',
        'Advanced STL Engine': 'AEN',
        'Advanced Fuel Pump': 'AFP',
        'Advanced Fuel Rod': 'AFR',
        'Advanced Nozzle': 'ANZ',
        'Basic Fuel Pump': 'BFP',
        'Basic Fuel Rod': 'BFR',
        'Basic Nozzle': 'NOZ',
        'Combustion Chamber': 'CHA',
        'Fission Reactor': 'FIR',
        'Fuel-saving STL Engine': 'PSE',
        'Glass Combustion Chamber': 'GCH',
        'Glass-based STL Engine': 'GEN',
        'Glass Nozzle': 'GNZ',
        'High-power FTL Reactor': 'HPR',
        'Hyper-power Reactor': 'HYR',
        'Hyperthrust STL Engine': 'HTE',
        'Hyperthrust Nozzle': 'HNZ',
        'Large FTL Emitter': 'LFE',
        'Low-heat Fuel Pump': 'LFP',
        'Medium FTL Emitter': 'MFE',
        'Quick-charge FTL Reactor': 'QCR',
        'Radioisotope Generator': 'RAG',
        'Reactor Control System': 'RCS',
        'Small FTL Emitter': 'SFE',
        'Standard STL Engine': 'ENG',
        'Standard FTL Reactor': 'RCT',
        'High-load Cargo Bay Kit': 'WCB',
        'High-volume Cargo Bay Kit': 'VCB',
        'Large Cargo Bay Kit': 'LCB',
        'Large FTL Fuel Tank Kit': 'LFL',
        'Large STL Fuel Tank Kit': 'LSL',
        'Medium Cargo Bay Kit': 'MCB',
        'Medium FTL Fuel Tank Kit': 'MFL',
        'Medium STL Fuel Tank Kit': 'MSL',
        'Small Cargo Bay Kit': 'SCB',
        'Small FTL Fuel Tank Kit': 'SFL',
        'Small STL Fuel Tank Kit': 'SSL',
        'Tiny Cargo Bay Kit': 'TCB',
        'Very Small Cargo Bay Kit': 'VSC',
        'Advanced High-G Seats': 'AGS',
        'Advanced Hull Plate': 'AHP',
        'Advanced Thermal Protection Material': 'ATP',
        'Basic High-G Seats': 'BGS',
        'Basic Hull Plate': 'BHP',
        'Basic Thermal Protection Material': 'THP',
        'Hardened Hull Plate': 'HHP',
        'Lightweight Hull Plate': 'LHP',
        'Navigation Module MK1': 'NV1',
        'Navigation Module MK2': 'NV2',
        'Reinforced Hull Plate': 'RHP',
        'Structural Spacecraft Component': 'SSC',
        'Advanced Thermal Protection Tile': 'APT',
        'Advanced Anti-rad Plate': 'ARP',
        'Advanced Whipple Shielding': 'AWH',
        'Basic Thermal Protection Tile': 'BPT',
        'Basic Anti-rad Plate': 'BRP',
        'Basic Whipple Shielding': 'BWH',
        'Specialized Anti-rad Plate': 'SRP',
        'Basic AI Framework': 'BAI',
        'Local Database': 'LD',
        'Machine Learning Interface': 'MLI',
        'Networking Framework': 'NF',
        'Search Algorithm': 'SA',
        'Sorting Algorithm': 'SAL',
        'Window Manager': 'WM',
        'Information Data Core': 'IDC',
        'Information Management System': 'IMM',
        'Spatial Navigation Map': 'SNM',
        'Weak Artificial Intelligence': 'WAI',
        'Data Analyzer': 'DA',
        'Data Visualizer': 'DV',
        'Distributed Database': 'DD',
        'Entertainment Data core': 'EDC',
        'Neural Network': 'NN',
        'Operating System': 'OS',
        'Ceramic Fabric': 'CF',
        'Ceramic-tungsten Fabric': 'CTF',
        'Cotton Fabric': 'COT',
        'Kevlar Fabric': 'KV',
        'Nylon Fabric': 'NL',
        'Silken Fabric': 'SIL',
        'TechnoKevlar Fabric': 'TK',
        'Command Bridge MK1': 'BR1',
        'Command Bridge MK2': 'BR2',
        'Short-distance Command Bridge': 'BRS',
        'Crew Quarters (Large)': 'CQL',
        'Crew Quarters (Medium)': 'CQM',
        'Crew Quarters (Small)': 'CQS',
        'Crew Quarters (Tiny)': 'CQT',
        'Drone Operations Unit': 'DOU',
        'Entertainment Unit': 'FUN',
        'Habitat Unit': 'HAB',
        'Handcraft Workshop Unit': 'WOR',
        'Laboratory Unit': 'LU',
        'Large Ship-Repair Drone Operations Unit': 'RDL',
        'Small Ship-Repair Drone Operations Unit': 'RDS',
        'Surgery Unit': 'SU',
        'Trauma Care Unit': 'TCU',
        'Office Supplies': 'OFF',
        'Safety Uniform': 'SUN',
        'Universal Toolset': 'UTS',
        'Core Module Kit': 'CMK',
    };
    return shortTable[text] || text;
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Sidebar__ = __webpack_require__(8);

class ModuleRunner {
    constructor(modules) {
        this.modules = modules.map(m => this.moduleToME(m));
        this.sidebar = new __WEBPACK_IMPORTED_MODULE_0__Sidebar__["a" /* Sidebar */](this.modules);
        this.modules.push(this.moduleToME(this.sidebar));
    }
    moduleToME(module) {
        return {
            module,
            name: module.constructor.name,
            enabled: true,
            count: 0,
            cleanupTime: 0,
            runTime: 0,
        };
    }
    loop() {
        this.modules.map(entry => {
            if (entry.enabled) {
                const t0 = performance.now();
                entry.module.cleanup();
                const cleanupTime = performance.now() - t0;
                const t1 = performance.now();
                entry.module.run();
                const runTime = performance.now() - t1;
                entry.count++;
                entry.cleanupTime += cleanupTime;
                entry.runTime += runTime;
            }
        });
        window.setTimeout(() => this.loop(), 1000);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ModuleRunner;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Style__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);


class Sidebar {
    constructor(list) {
        this.tag = "pb-sidebar";
        this.list = list;
    }
    cleanup() {
        Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* genericCleanup */])(this.tag);
    }
    run() {
        const area = document.createElement('div');
        area.classList.add(this.tag);
        const h3 = document.createElement('h3');
        h3.appendChild(document.createTextNode("PMMG Beautifier"));
        h3.classList.add(...__WEBPACK_IMPORTED_MODULE_0__Style__["a" /* Style */].SidebarSectionHead);
        area.appendChild(h3);
        const content = document.createElement("div");
        content.classList.add(...__WEBPACK_IMPORTED_MODULE_0__Style__["a" /* Style */].SidebarSectionContent);
        area.appendChild(content);
        this.list.map(mp => {
            const line = document.createElement('div');
            line.classList.add(...Object(__WEBPACK_IMPORTED_MODULE_0__Style__["b" /* WithStyles */])(__WEBPACK_IMPORTED_MODULE_0__Style__["a" /* Style */].SidebarLine, __WEBPACK_IMPORTED_MODULE_0__Style__["a" /* Style */].FontsRegular));
            content.appendChild(line);
            line.appendChild(Object(__WEBPACK_IMPORTED_MODULE_1__util__["d" /* createTextSpan */])(mp.name));
            const right = document.createElement("span");
            right.style.flexGrow = "1";
            right.style.textAlign = "right";
            line.appendChild(right);
            const time = Object(__WEBPACK_IMPORTED_MODULE_1__util__["h" /* toFixed */])((mp.cleanupTime + mp.runTime) / mp.count, 2);
            right.appendChild(Object(__WEBPACK_IMPORTED_MODULE_1__util__["d" /* createTextSpan */])(`${time}ms `));
            const toggle = this.makeToggleButton("On", "Off", () => {
                mp.enabled = !mp.enabled;
            }, mp.enabled);
            right.appendChild(toggle);
            const cleanup = this.makePushButton("x", () => mp.module.cleanup());
            right.appendChild(cleanup);
        });
        Array.from(document.querySelectorAll("div[class^='MCrttK6SbK6k-5U-WEPmy']")).forEach(sidebar => {
            sidebar.appendChild(area);
        });
    }
    makePushButton(text, f, style = __WEBPACK_IMPORTED_MODULE_0__Style__["a" /* Style */].ButtonPrimary) {
        const button = document.createElement('button');
        button.classList.add(...__WEBPACK_IMPORTED_MODULE_0__Style__["a" /* Style */].Button);
        button.classList.add(...style);
        button.classList.add(this.tag);
        button.onclick = f;
        button.innerText = text;
        return button;
    }
    makeToggleButton(on, off, f, state = false) {
        const toggle = document.createElement('button');
        toggle.classList.add(...__WEBPACK_IMPORTED_MODULE_0__Style__["a" /* Style */].Button);
        const getState = !!toggle.getAttribute('data-state') || state;
        const setState = s => {
            toggle.setAttribute('data-state', String(s));
        };
        const setLook = (s) => {
            toggle.innerText = s ? on : off;
            if (s) {
                toggle.classList.remove(...__WEBPACK_IMPORTED_MODULE_0__Style__["a" /* Style */].ButtonPrimary);
                toggle.classList.add(...__WEBPACK_IMPORTED_MODULE_0__Style__["a" /* Style */].ButtonSuccess);
            }
            else {
                toggle.classList.remove(...__WEBPACK_IMPORTED_MODULE_0__Style__["a" /* Style */].ButtonSuccess);
                toggle.classList.add(...__WEBPACK_IMPORTED_MODULE_0__Style__["a" /* Style */].ButtonPrimary);
            }
        };
        setState(state);
        setLook(state);
        toggle.onclick = () => {
            const newState = !getState;
            setLook(newState);
            setState(newState);
            f();
        };
        return toggle;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Sidebar;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Selector__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);


class OrderETAs {
    constructor() {
        this.tag = "pb-order-eta";
    }
    cleanup() {
        Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* genericCleanup */])(this.tag);
    }
    run() {
        this.beautifyAggregateProductionQueue();
    }
    beautifyAggregateProductionQueue() {
        const prodLines = Array.from(document.querySelectorAll(__WEBPACK_IMPORTED_MODULE_0__Selector__["a" /* Selector */].ProdLine));
        prodLines.forEach(line => {
            const prodItems = Array.from(line.querySelectorAll("div[class='_1a75pC9Q0YF44bObHykWIA']"));
            let sumTimes = Array();
            for (let i = 0; i < prodItems.length; i++) {
                const itemETA = (prodItems[i].querySelector("div[class='_2wCEB4yaom4TdA4cxLZhbr'] div[class='_1j-lU9fMFzEgedyKKsPDtL _3dW9W1Qi1zDylwVf7nNSih'] > span"));
                if (itemETA) {
                    const progress = (prodItems[i].querySelector("span:nth-of-type(2)") && prodItems[i].querySelector("span[class='E1aHYdg2zdgvZCsPl3p9y _3RsFeLwUgZ4bFiiA1fteEe']"));
                    const etaValue = Object(__WEBPACK_IMPORTED_MODULE_1__util__["f" /* parseDuration */])(itemETA.textContent);
                    if (progress) {
                        const eta = Object(__WEBPACK_IMPORTED_MODULE_1__util__["c" /* convertParsedDurationToETA */])(etaValue);
                        const etaTag = Object(__WEBPACK_IMPORTED_MODULE_1__util__["d" /* createTextSpan */])(` (${eta})`, this.tag);
                        progress.parentElement.appendChild(etaTag);
                        sumTimes.push(etaValue);
                    }
                    else {
                        const lowestEta = Math.min(...sumTimes);
                        const summedEta = lowestEta + etaValue;
                        sumTimes[sumTimes.indexOf(lowestEta)] = summedEta;
                        const eta = Object(__WEBPACK_IMPORTED_MODULE_1__util__["c" /* convertParsedDurationToETA */])(summedEta);
                        prodItems[i].appendChild(Object(__WEBPACK_IMPORTED_MODULE_1__util__["d" /* createTextSpan */])(` (${eta})`, this.tag));
                    }
                }
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = OrderETAs;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);

class ParseETAs {
    constructor() {
        this.tag = "pb-other-etas";
    }
    cleanup() {
        Object(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* genericCleanup */])(this.tag);
    }
    run() {
        const elements = Array.from(document.querySelectorAll("table[class~='_38xIOphw1aA3t-LEbriQzq']"));
        elements.forEach(tableElem => {
            const tableRows = Array.from(tableElem.querySelectorAll("tbody > tr"));
            tableRows.forEach(row => {
                const etaCell = row.querySelectorAll("td").item(7);
                if (etaCell.textContent) {
                    const textContent = etaCell.textContent.split('(')[0];
                    const eta = Object(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* convertDurationToETA */])(textContent);
                    etaCell.appendChild(Object(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* createTextSpan */])(` (${eta})`, this.tag));
                }
            });
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ParseETAs;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Style__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);


class PostLM {
    constructor() {
        this.tag = "pb-post-lm-price";
        this.cleanups = [];
    }
    cleanup() {
        this.cleanups.forEach((f, i) => {
            f();
            delete this.cleanups[i];
        });
        Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* genericCleanup */])(this.tag);
    }
    run() {
        Array.from(document.querySelectorAll("article[class~='ftMvUGi7LmGCZmg3dJ0_f'] > div > div > form")).forEach(form => {
            const amountInput = document.evaluate("div[label/span[text()='Amount']]/div/div/input", form, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            const totalPriceInput = document.evaluate("div[label/span[text()='Total price']]/div/div/input", form, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            const displayElement = Object(__WEBPACK_IMPORTED_MODULE_1__util__["d" /* createTextSpan */])('-- ea', this.tag);
            totalPriceInput.parentNode.insertBefore(displayElement, totalPriceInput);
            const type = document.evaluate("div[label/span[text()='Type']]/div/div", form, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            const calculatePricePerUnit = () => {
                const amount = parseInt(amountInput.value);
                const total = parseInt(totalPriceInput.value);
                const postingFee = document.evaluate("div[label/span[text()='Fees']]/div/div/div/span", form, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText;
                const postingFeeValue = parseInt(postingFee.replace(/[,.]/g, '')) / 100;
                var pricePerUnitWithFee;
                switch (type.innerText) {
                    case "BUYING":
                        pricePerUnitWithFee = Object(__WEBPACK_IMPORTED_MODULE_1__util__["h" /* toFixed */])((total + postingFeeValue) / amount, 2);
                        break;
                    case "SELLING":
                        pricePerUnitWithFee = Object(__WEBPACK_IMPORTED_MODULE_1__util__["h" /* toFixed */])((total - postingFeeValue) / amount, 2);
                        break;
                }
                const pricePerUnit = Object(__WEBPACK_IMPORTED_MODULE_1__util__["h" /* toFixed */])(total / amount, 2);
                displayElement.textContent = `${pricePerUnit}ea \(${pricePerUnitWithFee}ea\)`;
            };
            calculatePricePerUnit();
            [amountInput, totalPriceInput].map(input => {
                input.addEventListener('beforeinput', calculatePricePerUnit);
                this.cleanups.push(() => input.removeEventListener('beforeinput', calculatePricePerUnit));
            });
            const postButton = document.evaluate("div/div/button[text()='post']", form, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (type && postButton) {
                switch (type.innerText) {
                    case "BUYING":
                        this.changeButton(postButton, __WEBPACK_IMPORTED_MODULE_0__Style__["a" /* Style */].ButtonSuccess, "Buy");
                        break;
                    case "SELLING":
                        this.changeButton(postButton, __WEBPACK_IMPORTED_MODULE_0__Style__["a" /* Style */].ButtonDanger, "Sell");
                        break;
                }
            }
        });
    }
    changeButton(button, className, text) {
        button.classList.remove("_1Y9l3J20Xn-CyxMZIcH06i");
        button.classList.add(...className);
        this.cleanups.push(() => {
            button.classList.remove(...className);
            button.classList.add("_1Y9l3J20Xn-CyxMZIcH06i");
        });
        const originalText = button.innerHTML;
        button.innerHTML = text;
        this.cleanups.push(() => button.innerHTML = originalText);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PostLM;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);

class QueueLoad {
    constructor() {
        this.tag = "pb-queue-load";
    }
    cleanup() {
        Object(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* genericCleanup */])(this.tag);
    }
    run() {
        this.calculateQueueLoad();
    }
    getEtaFromRow(row) {
        const etaCell = row.querySelectorAll("td").item(4);
        if (etaCell) {
            const etaSpan = etaCell.querySelector("span");
            if (etaSpan) {
                const eta = Object(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* parseDuration */])(etaSpan.textContent);
                return eta;
            }
        }
        return 0;
    }
    calculateQueueLoad() {
        const tables = Array.from(document.querySelectorAll("table[class~='B5JEuqpNoN-VT8jmA8g3l']"));
        tables.forEach(table => {
            const rows = Array.from(table.querySelectorAll("tbody:nth-of-type(2) > tr"));
            const totalTime = rows.reduce((total, row) => {
                const n = this.getEtaFromRow(row);
                return total + n;
            }, 0);
            if (totalTime > 0) {
                rows.forEach(row => {
                    const eta = this.getEtaFromRow(row);
                    const percent = Object(__WEBPACK_IMPORTED_MODULE_0__util__["h" /* toFixed */])(eta / totalTime * 100, 2);
                    const textField = row.querySelectorAll("td").item(5);
                    if (textField && eta > 0) {
                        const span = Object(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* createTextSpan */])(` ${percent}%`, this.tag);
                        textField.appendChild(span);
                    }
                });
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = QueueLoad;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Selector__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);


class CXFX {
    constructor() {
        this.tag = "pb-cx";
    }
    cleanup() {
        Object(__WEBPACK_IMPORTED_MODULE_1__util__["e" /* genericCleanup */])(this.tag);
    }
    run() {
        const elements = document.querySelectorAll(__WEBPACK_IMPORTED_MODULE_0__Selector__["a" /* Selector */].CXOBTable + " > tbody > tr > td");
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            const text = element.textContent;
            const matches = text && text.match(/^(NEO Charter Exploration|Antares Initiative|Insitor Cooperative|Castillo-Ito Mercantile) Market Maker$/);
            if (matches) {
                element.textContent = Object(__WEBPACK_IMPORTED_MODULE_1__util__["g" /* shorten */])(text);
            }
        }
        const companies = Array.from(document.querySelectorAll(__WEBPACK_IMPORTED_MODULE_0__Selector__["a" /* Selector */].CXOBTable + " > tbody > tr > td > span")).concat(Array.from(document.querySelectorAll(__WEBPACK_IMPORTED_MODULE_0__Selector__["a" /* Selector */].FXOBTable + " > tbody > tr > td > span")));
        for (let i = 0; i < companies.length; i++) {
            const element = companies[i];
            const text = element.textContent;
            if (text.length > 25) {
                element.textContent = text.substring(0, 23) + "\*";
            }
        }
        const orderCX = document.querySelectorAll(__WEBPACK_IMPORTED_MODULE_0__Selector__["a" /* Selector */].CXOrdersExchangeName);
        for (let i = 0; i < orderCX.length; i++) {
            const element = orderCX[i];
            const text = element.textContent;
            const matches = text && text.match(/Station Commodity Exchange$/);
            if (matches) {
                element.textContent = Object(__WEBPACK_IMPORTED_MODULE_1__util__["g" /* shorten */])(text);
            }
        }
        const orderAmountColumn = document.querySelectorAll(__WEBPACK_IMPORTED_MODULE_0__Selector__["a" /* Selector */].CXOrdersTable + " > thead > tr > th");
        for (let i = 0; i < orderAmountColumn.length; i++) {
            const element = orderAmountColumn[i];
            const text = element.textContent;
            const matches = text && text.match(/^Amount \(initial\)$/);
            if (matches) {
                element.textContent = "Amount \(i\)";
            }
        }
        const orderStatus = document.querySelectorAll(__WEBPACK_IMPORTED_MODULE_0__Selector__["a" /* Selector */].CXOrdersTable + " > tbody > tr > td:nth-of-type(7) > span");
        for (let i = 0; i < orderStatus.length; i++) {
            orderStatus[i].childNodes[0].parentElement.removeAttribute("style");
            if (orderStatus[i].textContent == "partially filled" || orderStatus[i].textContent == "part fill") {
                orderStatus[i].textContent = "part fill";
                orderStatus[i].childNodes[0].parentElement.style.color = "#d77342";
            }
        }
        workCXOSHeader(this.tag);
        workCXOSRows(this.tag);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CXFX;

const hideMatNameColumn = true;
const addOrderValueColumn = true;
function workCXOSHeader(tag) {
    const CXOSHeader = document.querySelector(__WEBPACK_IMPORTED_MODULE_0__Selector__["a" /* Selector */].CXOrdersTable + " > thead > tr");
    if (CXOSHeader) {
        if (hideMatNameColumn) {
            const orderMatNameHeader = CXOSHeader.querySelector("th:nth-of-type(4)");
            orderMatNameHeader.style.display = "None";
        }
        if (addOrderValueColumn) {
            const orderStatusHeader = CXOSHeader.querySelector("th:nth-of-type(7)");
            const newHeader = document.createElement("th");
            newHeader.classList.add(tag);
            newHeader.textContent = "Value";
            CXOSHeader.insertBefore(newHeader, orderStatusHeader);
        }
    }
}
function workCXOSRows(tag) {
    const orderRows = document.querySelectorAll(__WEBPACK_IMPORTED_MODULE_0__Selector__["a" /* Selector */].CXOrdersTable + " > tbody > tr");
    Array.from(orderRows).forEach((row) => {
        if (hideMatNameColumn) {
            const matNameCell = row.querySelector("td:nth-of-type(4)");
            matNameCell.style.display = "None";
        }
        if (addOrderValueColumn) {
            const orderStatusCell = row.querySelector("td:nth-of-type(7)");
            if (orderStatusCell.childElementCount) {
                const amount = parseInt(row.querySelector("td:nth-of-type(5)").childNodes[0].textContent.replace(/[,.]/g, ''));
                const unitPrice = parseInt(row.querySelector("td:nth-of-type(6)").childNodes[0].textContent.replace(/[,.]/g, '')) / 100;
                const type = row.querySelector("td:nth-of-type(2)").textContent;
                const newCell = document.createElement("td");
                newCell.classList.add(tag);
                newCell.textContent = Object(__WEBPACK_IMPORTED_MODULE_1__util__["h" /* toFixed */])(amount * unitPrice, 2);
                newCell.style.textAlign = "right";
                if (type == "BUY") {
                    newCell.style.color = "#50c878";
                }
                if (type == "SELL") {
                    newCell.style.color = "#d0312d";
                }
                row.insertBefore(newCell, orderStatusCell);
            }
        }
    });
}


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);

class FIN {
    constructor() {
        this.tag = "pb-fin";
    }
    cleanup() {
        Object(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* genericCleanup */])(this.tag);
    }
    run() {
        const finlaHeader = document.querySelectorAll("table[class^='t_JwOZxlVCPfN-FKRIoNo'] > thead > tr > th");
        Array.from(finlaHeader).forEach(element => {
            element.textContent = Object(__WEBPACK_IMPORTED_MODULE_0__util__["g" /* shorten */])(element.textContent);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FIN;



/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzA0NDQ0Y2M5MWJjOTY4YjJlNWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NlbGVjdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9TdHlsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvRmxpZ2h0cGxhbkVUQXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xvY2FsTWFya2V0QWRzLnRzIiwid2VicGFjazovLy8uL3NyYy9EQi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvTW9kdWxlUnVubmVyLnRzIiwid2VicGFjazovLy8uL3NyYy9TaWRlYmFyLnRzIiwid2VicGFjazovLy8uL3NyYy9PcmRlckVUQXMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhcnNlRVRBcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvUG9zdExNLnRzIiwid2VicGFjazovLy8uL3NyYy9RdWV1ZUxvYWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NYRlgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0ZJTi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOztRQUVBO1FBQ0E7Ozs7Ozs7O0FDN0RBO0FBQUE7QUFBQTtBQUFBO0FBQUE7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDM1ZBO0FBQW9DO0FBQzdCO0FBQ1A7QUFDQTtBQUNBLDJCQUEyQix5REFBTztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUFBO0FBQUE7QUFDRDtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsMkRBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELDJEQUFRO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLDhEQUFPO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7OztBQ3RHQTtBQUFrRDtBQUMzQztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxxRUFBYztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyw4REFBTztBQUN6QyxTQUFTO0FBQ1Q7QUFDQSxDQUFDO0FBQUE7QUFBQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYzA0NDQ0Y2M5MWJjOTY4YjJlNWUiLCJleHBvcnQgZnVuY3Rpb24gY29udmVydER1cmF0aW9uVG9FVEEoZHVyYXRpb24pIHtcclxuICAgIGNvbnN0IHBhcnNlZFNlY29uZHMgPSBwYXJzZUR1cmF0aW9uKGR1cmF0aW9uKTtcclxuICAgIGNvbnN0IGV0YSA9IG5ldyBEYXRlKCk7XHJcbiAgICBldGEuc2V0U2Vjb25kcyhldGEuZ2V0U2Vjb25kcygpICsgcGFyc2VkU2Vjb25kcyAtIGV0YS5nZXRUaW1lem9uZU9mZnNldCgpICogNjApO1xyXG4gICAgbGV0IHJldCA9IGV0YS50b0lTT1N0cmluZygpLnN1YnN0cig1LCAxMSkucmVwbGFjZShcIi1cIiwgXCIuXCIpLnJlcGxhY2UoXCJUXCIsIFwiLiBcIik7XHJcbiAgICByZXR1cm4gcmV0O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0UGFyc2VkRHVyYXRpb25Ub0VUQShwYXJzZWRTZWNvbmRzKSB7XHJcbiAgICBjb25zdCBldGEgPSBuZXcgRGF0ZSgpO1xyXG4gICAgZXRhLnNldFNlY29uZHMoZXRhLmdldFNlY29uZHMoKSArIHBhcnNlZFNlY29uZHMgLSBldGEuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwKTtcclxuICAgIHJldHVybiBldGEudG9JU09TdHJpbmcoKS5zdWJzdHIoNSwgMTEpLnJlcGxhY2UoXCItXCIsIFwiLlwiKS5yZXBsYWNlKFwiVFwiLCBcIi4gXCIpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUR1cmF0aW9uKGR1cmF0aW9uKSB7XHJcbiAgICBjb25zdCBkYXlzID0gZHVyYXRpb24ubWF0Y2goLyhcXGQrKVxccypkLyk7XHJcbiAgICBjb25zdCBob3VycyA9IGR1cmF0aW9uLm1hdGNoKC8oXFxkKylcXHMqaC8pO1xyXG4gICAgY29uc3QgbWludXRlcyA9IGR1cmF0aW9uLm1hdGNoKC8oXFxkKylcXHMqbS8pO1xyXG4gICAgY29uc3Qgc2Vjb25kcyA9IGR1cmF0aW9uLm1hdGNoKC8oXFxkKylcXHMqcy8pO1xyXG4gICAgbGV0IHBhcnNlZFNlY29uZHMgPSAwO1xyXG4gICAgaWYgKGRheXMpIHtcclxuICAgICAgICBwYXJzZWRTZWNvbmRzICs9IHBhcnNlSW50KGRheXNbMV0pICogODY0MDA7XHJcbiAgICB9XHJcbiAgICBpZiAoaG91cnMpIHtcclxuICAgICAgICBwYXJzZWRTZWNvbmRzICs9IHBhcnNlSW50KGhvdXJzWzFdKSAqIDM2MDA7XHJcbiAgICB9XHJcbiAgICBpZiAobWludXRlcykge1xyXG4gICAgICAgIHBhcnNlZFNlY29uZHMgKz0gcGFyc2VJbnQobWludXRlc1sxXSkgKiA2MDtcclxuICAgIH1cclxuICAgIGlmIChzZWNvbmRzKSB7XHJcbiAgICAgICAgcGFyc2VkU2Vjb25kcyArPSBwYXJzZUludChzZWNvbmRzWzFdKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXJzZWRTZWNvbmRzO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUZXh0U3Bhbih0ZXh0LCBjbGFzc05hbWUgPSBcInBydW4tcmVtb3ZlLWpzXCIpIHtcclxuICAgIGNvbnN0IG5ld1NwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgIG5ld1NwYW4uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG4gICAgbmV3U3Bhbi50ZXh0Q29udGVudCA9IHRleHQ7XHJcbiAgICByZXR1cm4gbmV3U3BhbjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJpY0NsZWFudXAoY2xhc3NOYW1lID0gXCJwcnVuLXJlbW92ZS1qc1wiKSB7XHJcbiAgICBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKSkuZm9yRWFjaCgoZWxlbSkgPT4ge1xyXG4gICAgICAgIGVsZW0ucGFyZW50Tm9kZSAmJiBlbGVtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbSk7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gdG9GaXhlZCh2YWx1ZSwgcHJlY2lzaW9uID0gMikge1xyXG4gICAgY29uc3QgcG93ZXIgPSBNYXRoLnBvdygxMCwgcHJlY2lzaW9uIHx8IDApO1xyXG4gICAgY29uc3QgbnVtYmVyID0gTWF0aC5yb3VuZCh2YWx1ZSAqIHBvd2VyKSAvIHBvd2VyO1xyXG4gICAgcmV0dXJuIG51bWJlci50b0xvY2FsZVN0cmluZygnZW4tR0InLCB7IG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMiwgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyIH0pO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzaG9ydGVuKHRleHQpIHtcclxuICAgIGNvbnN0IHNob3J0VGFibGUgPSB7XHJcbiAgICAgICAgXCJORU8gQ2hhcnRlciBFeHBsb3JhdGlvbiBNYXJrZXQgTWFrZXJcIjogXCJORU8gQ2hhcnRlciBNTVwiLFxyXG4gICAgICAgIFwiQW50YXJlcyBJbml0aWF0aXZlIE1hcmtldCBNYWtlclwiOiBcIkFudGFyZXMgTU1cIixcclxuICAgICAgICBcIkluc2l0b3IgQ29vcGVyYXRpdmUgTWFya2V0IE1ha2VyXCI6IFwiSW5zaXRvciBNTVwiLFxyXG4gICAgICAgIFwiQ2FzdGlsbG8tSXRvIE1lcmNhbnRpbGUgTWFya2V0IE1ha2VyXCI6IFwiQ2FzdGlsbG8tSXRvIE1NXCIsXHJcbiAgICAgICAgXCJTdGF0aW9uIENvbW1vZGl0eSBFeGNoYW5nZVwiOiBcIkNYXCIsXHJcbiAgICAgICAgXCJDdXJyZW5jeVwiOiBcIkN1clwiLFxyXG4gICAgICAgIFwiQW1vdW50XCI6IFwiQW10XCIsXHJcbiAgICB9O1xyXG4gICAgdmFyIHJlID0gbmV3IFJlZ0V4cChPYmplY3Qua2V5cyhzaG9ydFRhYmxlKS5qb2luKFwifFwiKSwgXCJnXCIpO1xyXG4gICAgcmV0dXJuIHRleHQucmVwbGFjZShyZSwgZnVuY3Rpb24gKG1hdGNoZWQpIHtcclxuICAgICAgICByZXR1cm4gc2hvcnRUYWJsZVttYXRjaGVkXTtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjb2xvcml6ZVR5cGUodHlwZSwgdGFnKSB7XHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICBjYXNlIFwiQlVZSU5HXCI6IHtcclxuICAgICAgICAgICAgY29uc3QgdHlwZU5vZGUgPSBjcmVhdGVUZXh0U3BhbihcIkJVWVwiLCB0YWcpO1xyXG4gICAgICAgICAgICBGb250Q29sb3IoNjAsIDE3OSwgMTEzLCB0eXBlTm9kZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0eXBlTm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSBcIlNFTExJTkdcIjoge1xyXG4gICAgICAgICAgICBjb25zdCB0eXBlTm9kZSA9IGNyZWF0ZVRleHRTcGFuKFwiU0VMXCIsIHRhZyk7XHJcbiAgICAgICAgICAgIEZvbnRDb2xvcigxNzgsIDM0LCAzNCwgdHlwZU5vZGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHlwZU5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgXCJTSElQUElOR1wiOiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHR5cGVOb2RlID0gY3JlYXRlVGV4dFNwYW4oXCJTSElcIiwgdGFnKTtcclxuICAgICAgICAgICAgRm9udENvbG9yKDc5LCAxMzAsIDE4MCwgdHlwZU5vZGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHlwZU5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIEZvbnRDb2xvcihyLCBnLCBiLCB0ZXh0SG9sZGVyKSB7XHJcbiAgICB0ZXh0SG9sZGVyLnN0eWxlLmNvbG9yID0gXCJyZ2IoXCIgKyByICsgXCIsXCIgKyBnICsgXCIsXCIgKyBiICsgXCIpXCI7XHJcbiAgICB0ZXh0SG9sZGVyLnN0eWxlLmZvbnRGYW1pbHkgPSBcImNvdXJpZXJcIjtcclxuICAgIHRleHRIb2xkZXIuc3R5bGUuZm9udFNpemUgPSBcIjkwJVwiO1xyXG4gICAgdGV4dEhvbGRlci5zdHlsZS5mb250V2VpZ2h0ID0gXCI2MDBcIjtcclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy91dGlsLnRzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBjb25zdCBTZWxlY3RvciA9IHtcclxuICAgIExNQ29tbW9kaXR5QWRUZXh0OiBcImRpdltjbGFzcz0nXzE0TC0tWjRWcndRSEUtRGF5dGExZGInXVwiLFxyXG4gICAgTE1Db21tb2RpdHlBZElubmVyVGV4dDogXCJkaXZbY2xhc3M9J18xb3dISnMzSWpVMmh4ZFQwelExeXRCJ11cIixcclxuICAgIENYT0JUYWJsZTogXCJ0YWJsZVtjbGFzcz0nXzNoZEpHbDZLU29wM1JlVXplVnRqRDIgXzJGb2cxYWQ0NmFaNHEtUm9FZ0szUjYgXzF2V1JwZEk4Y0tOTVB5T1BuemxYZ1ggXzMzQV81bEVUZjRIQnF3SmlfcS1qaFonXVwiLFxyXG4gICAgRlhPQlRhYmxlOiBcInRhYmxlW2NsYXNzPSdlOXRURlZsZXRCNFAzNkM3YzNfM3QgXzJGb2cxYWQ0NmFaNHEtUm9FZ0szUjYgXzF2V1JwZEk4Y0tOTVB5T1BuemxYZ1ggXzMzQV81bEVUZjRIQnF3SmlfcS1qaFonXVwiLFxyXG4gICAgQ1hPcmRlcnNFeGNoYW5nZU5hbWU6IFwic3BhbltjbGFzcz0nXzNpZnJpQTMzbzhXQWhkRlNhSWdxV2knXVwiLFxyXG4gICAgQ1hPcmRlcnNUYWJsZTogXCJ0YWJsZVtjbGFzcz0nXzJIQWJEazlZZXhSdDRTNS1JaEVidlQgXzJGb2cxYWQ0NmFaNHEtUm9FZ0szUjYgXzF2V1JwZEk4Y0tOTVB5T1BuemxYZ1ggXzMzQV81bEVUZjRIQnF3SmlfcS1qaFonXVwiLFxyXG4gICAgUHJvZExpbmU6IFwiZGl2W2NsYXNzPSd6OE82QTBkV1lpZF82VmIxeTc1cXogXzJOS3FtTWJXNjl0UXhxdkpPdkt2TEwnXVwiLFxyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9TZWxlY3Rvci50c1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgY29uc3QgU3R5bGUgPSB7XHJcbiAgICBCdXR0b246IFtcIl8xVlBCZXVvdjVBWWxPdTRzN3BLSWxZXCJdLFxyXG4gICAgQnV0dG9uUHJpbWFyeTogW1wiXzFZOWwzSjIwWG4tQ3l4TVpJY0gwNmlcIl0sXHJcbiAgICBCdXR0b25TdWNjZXNzOiBbXCJfM3laeDU1ekFoYXg2NnJBZnY2ZDZaMVwiXSxcclxuICAgIEJ1dHRvbkRhbmdlcjogW1wiXzMxZFFadWdKQkFxakt2TUU3YlJCbEFcIl0sXHJcbiAgICBTaWRlYmFyU2VjdGlvbkhlYWQ6IFtcIkNDR2t2clNuekpkYU5aSFlQUEVIcFwiLCBcIl8zM0FfNWxFVGY0SEJxd0ppX3EtamhaXCJdLFxyXG4gICAgU2lkZWJhclNlY3Rpb25Db250ZW50OiBbXCJMbVQ2RTZTVXltRUtsYlpFWTN0UThcIiwgXCJfMzNBXzVsRVRmNEhCcXdKaV9xLWpoWlwiXSxcclxuICAgIFNpZGViYXJMaW5lOiBbXCJfMjU4TGJLbFpSblFMWTg4OFpnMWNYYlwiLCBcIl8yNHN6MTFfRzZWWEVZbG9vOUZ0UnRaXCJdLFxyXG4gICAgRm9udHNSZWd1bGFyOiBbXCJfMUVIRk10MTFvbHZFTEZnSDR4YU5FOFwiXSxcclxufTtcclxuZXhwb3J0IGNvbnN0IFdpdGhTdHlsZXMgPSAoLi4uc3R5bGUpID0+IHtcclxuICAgIHJldHVybiBzdHlsZS5yZWR1Y2UoKChwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpID0+IHByZXZpb3VzVmFsdWUuY29uY2F0KGN1cnJlbnRWYWx1ZSkpKTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvU3R5bGUudHNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgRmxpZ2h0cGxhbkVUQXMgfSBmcm9tIFwiLi9GbGlnaHRwbGFuRVRBc1wiO1xyXG5pbXBvcnQgeyBMb2NhbE1hcmtldEFkcyB9IGZyb20gJy4vTG9jYWxNYXJrZXRBZHMnO1xyXG5pbXBvcnQgeyBNb2R1bGVSdW5uZXIgfSBmcm9tIFwiLi9Nb2R1bGVSdW5uZXJcIjtcclxuaW1wb3J0IHsgT3JkZXJFVEFzIH0gZnJvbSBcIi4vT3JkZXJFVEFzXCI7XHJcbmltcG9ydCB7IFBhcnNlRVRBcyB9IGZyb20gXCIuL1BhcnNlRVRBc1wiO1xyXG5pbXBvcnQgeyBQb3N0TE0gfSBmcm9tIFwiLi9Qb3N0TE1cIjtcclxuaW1wb3J0IHsgUXVldWVMb2FkIH0gZnJvbSBcIi4vUXVldWVMb2FkXCI7XHJcbmltcG9ydCB7IENYRlggfSBmcm9tIFwiLi9DWEZYXCI7XHJcbmltcG9ydCB7IEZJTiB9IGZyb20gXCIuL0ZJTlwiO1xyXG5jb25zdCBydW5uZXIgPSBuZXcgTW9kdWxlUnVubmVyKFtcclxuICAgIG5ldyBMb2NhbE1hcmtldEFkcygpLFxyXG4gICAgbmV3IFBhcnNlRVRBcygpLFxyXG4gICAgbmV3IE9yZGVyRVRBcygpLFxyXG4gICAgbmV3IEZsaWdodHBsYW5FVEFzKCksXHJcbiAgICBuZXcgUG9zdExNKCksXHJcbiAgICBuZXcgUXVldWVMb2FkKCksXHJcbiAgICBuZXcgQ1hGWCgpLFxyXG4gICAgbmV3IEZJTigpXHJcbl0pO1xyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgcnVubmVyLmxvb3AoKTtcclxufSkoKTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbWFpbi50c1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBjb252ZXJ0RHVyYXRpb25Ub0VUQSwgY3JlYXRlVGV4dFNwYW4sIGdlbmVyaWNDbGVhbnVwIH0gZnJvbSBcIi4vdXRpbFwiO1xyXG5leHBvcnQgY2xhc3MgRmxpZ2h0cGxhbkVUQXMge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy50YWcgPSBcInBiLWZsaWdodHBsYW4tZXRhXCI7XHJcbiAgICB9XHJcbiAgICBjbGVhbnVwKCkge1xyXG4gICAgICAgIGdlbmVyaWNDbGVhbnVwKHRoaXMudGFnKTtcclxuICAgIH1cclxuICAgIHJ1bigpIHtcclxuICAgICAgICBjb25zdCBlbGVtZW50cyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInRhYmxlW2NsYXNzPSdfMWc4ZGZCUnpEQXFSWEZxUnZTYUw3NSBfMkZvZzFhZDQ2YVo0cS1Sb0VnSzNSNiBfMXZXUnBkSThjS05NUHlPUG56bFhnWCBfMzNBXzVsRVRmNEhCcXdKaV9xLWpoWiddID4gdGJvZHkgPiB0clwiKSk7XHJcbiAgICAgICAgZWxlbWVudHMuZm9yRWFjaChkZXN0aW5hdGlvblJvdyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldFJvdyA9IGRlc3RpbmF0aW9uUm93LmNoaWxkcmVuWzNdO1xyXG4gICAgICAgICAgICBjb25zdCBldGEgPSBjb252ZXJ0RHVyYXRpb25Ub0VUQSh0YXJnZXRSb3cuY2hpbGRyZW5bMF0udGV4dENvbnRlbnQpO1xyXG4gICAgICAgICAgICB0YXJnZXRSb3cuYXBwZW5kQ2hpbGQoY3JlYXRlVGV4dFNwYW4oYCAoJHtldGF9KWAsIHRoaXMudGFnKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvRmxpZ2h0cGxhbkVUQXMudHNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgU2VsZWN0b3IgfSBmcm9tIFwiLi9TZWxlY3RvclwiO1xyXG5pbXBvcnQgeyBjcmVhdGVUZXh0U3BhbiwgZ2VuZXJpY0NsZWFudXAsIHRvRml4ZWQsIGNvbG9yaXplVHlwZSB9IGZyb20gXCIuL3V0aWxcIjtcclxuaW1wb3J0IHsgc2hvcnRlbk1hdE5hbWUgfSBmcm9tIFwiLi9EQlwiO1xyXG5leHBvcnQgY2xhc3MgTG9jYWxNYXJrZXRBZHMge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy50YWcgPSBcInBiLWxtLWFkc1wiO1xyXG4gICAgfVxyXG4gICAgY2xlYW51cCgpIHtcclxuICAgICAgICBnZW5lcmljQ2xlYW51cCh0aGlzLnRhZyk7XHJcbiAgICB9XHJcbiAgICBydW4oKSB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLkxNQ29tbW9kaXR5QWRUZXh0KTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBlbGVtZW50c1tpXTtcclxuICAgICAgICAgICAgY29uc3QgdGV4dCA9IGVsZW1lbnQuY2hpbGROb2Rlc1swXS50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHRleHQgJiYgdGV4dC5tYXRjaCgvKD86QlVZSU5HfFNFTExJTkcpXFxzKihcXGQrKVxccyguKilcXHNAXFxzKFtcXGQsLl0rKVxcc1tBLVpdKy8pO1xyXG4gICAgICAgICAgICBpZiAobWF0Y2hlcykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY291bnQgPSBwYXJzZUludChtYXRjaGVzWzFdKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRvdGFsQ2VudHMgPSBwYXJzZUludChtYXRjaGVzWzNdLnJlcGxhY2UoL1ssLl0vZywgJycpKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBlckl0ZW0gPSB0b0ZpeGVkKHRvdGFsQ2VudHMgLyBjb3VudCAvIDEwMCwgMik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbnRyeSA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihTZWxlY3Rvci5MTUNvbW1vZGl0eUFkSW5uZXJUZXh0KTtcclxuICAgICAgICAgICAgICAgIGxldCBzaG93bkVudHJ5ID0gZW50cnkuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYWRUeXBlID0gZW50cnkuY2hpbGROb2Rlc1swXS50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByaWNlU3BhbiA9IHNob3duRW50cnkucXVlcnlTZWxlY3RvcihTZWxlY3Rvci5MTUNvbW1vZGl0eUFkSW5uZXJUZXh0ICsgXCIgPiBzcGFuXCIpO1xyXG4gICAgICAgICAgICAgICAgcHJpY2VTcGFuLmFwcGVuZENoaWxkKGNyZWF0ZVRleHRTcGFuKGAgKCR7cGVySXRlbX0gZWEpIGAsIHRoaXMudGFnKSk7XHJcbiAgICAgICAgICAgICAgICBlbnRyeS5jaGlsZE5vZGVzWzBdLnBhcmVudEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiTm9uZVwiO1xyXG4gICAgICAgICAgICAgICAgc2hvd25FbnRyeS5yZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcclxuICAgICAgICAgICAgICAgIHNob3duRW50cnkuY2xhc3NMaXN0LmFkZCh0aGlzLnRhZyk7XHJcbiAgICAgICAgICAgICAgICBzaG93bkVudHJ5LnJlcGxhY2VDaGlsZChjb2xvcml6ZVR5cGUoYWRUeXBlLCB0aGlzLnRhZyksIHNob3duRW50cnkuY2hpbGROb2Rlc1swXSk7XHJcbiAgICAgICAgICAgICAgICBzaG93bkVudHJ5LmNoaWxkTm9kZXNbMV0udGV4dENvbnRlbnQgPSBgICR7Y291bnR9ICR7c2hvcnRlbk1hdE5hbWUobWF0Y2hlc1syXSl9IGA7XHJcbiAgICAgICAgICAgICAgICBzaG93bkVudHJ5LmNoaWxkTm9kZXNbM10udGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgc2hvd25FbnRyeS5jaGlsZE5vZGVzWzRdLnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHNob3duRW50cnkuY2hpbGROb2Rlc1s1XS50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBlbnRyeS5wYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKHNob3duRW50cnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hlc1NoaXAgPSB0ZXh0ICYmIHRleHQubWF0Y2goLyg/OlNISVBQSU5HKVxccyooW1xcZC5dKyl0XFxzXFwvXFxzKFtcXGQuXSspbcKzXFxzQFxccyhbXFxkLC5dKylcXHNbQS1aXSsvKTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzU2hpcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvdGFsQ29zdCA9IG1hdGNoZXNTaGlwWzNdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvbm5hZ2UgPSBwYXJzZUZsb2F0KG1hdGNoZXNTaGlwWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzaXplID0gcGFyc2VGbG9hdChtYXRjaGVzU2hpcFsyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVuaXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0b25uYWdlID4gc2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bml0ID0gJ3QnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudCA9IHRvbm5hZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bml0ID0gJ23Csyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ID0gc2l6ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdG90YWxDZW50cyA9IHBhcnNlSW50KHRvdGFsQ29zdC5yZXBsYWNlKC9bLC5dL2csICcnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGVySXRlbSA9IHRvRml4ZWQodG90YWxDZW50cyAvIGNvdW50IC8gMTAwLCAyKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbnRyeSA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihTZWxlY3Rvci5MTUNvbW1vZGl0eUFkSW5uZXJUZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2hvd25FbnRyeSA9IGVudHJ5LmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmljZVNwYW4gPSBzaG93bkVudHJ5LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3IuTE1Db21tb2RpdHlBZElubmVyVGV4dCArIFwiID4gc3BhblwiKTtcclxuICAgICAgICAgICAgICAgICAgICBwcmljZVNwYW4uYXBwZW5kQ2hpbGQoY3JlYXRlVGV4dFNwYW4oYCAoJHtwZXJJdGVtfS8ke3VuaXR9KWAsIHRoaXMudGFnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZW50cnkuY2hpbGROb2Rlc1swXS5wYXJlbnRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIk5vbmVcIjtcclxuICAgICAgICAgICAgICAgICAgICBzaG93bkVudHJ5LnJlbW92ZUF0dHJpYnV0ZShcInN0eWxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3duRW50cnkuY2xhc3NMaXN0LmFkZCh0aGlzLnRhZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd25FbnRyeS5yZXBsYWNlQ2hpbGQoY29sb3JpemVUeXBlKFwiU0hJUFBJTkdcIiwgdGhpcy50YWcpLCBzaG93bkVudHJ5LmNoaWxkTm9kZXNbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3duRW50cnkuY2hpbGROb2Rlc1sxXS50ZXh0Q29udGVudCA9IGAgYCArIHNob3duRW50cnkuY2hpbGROb2Rlc1sxXS50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgICAgICAgICBzaG93bkVudHJ5LmNoaWxkTm9kZXNbNl0udGV4dENvbnRlbnQgPSBgIGA7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd25FbnRyeS5jaGlsZE5vZGVzWzddLnRleHRDb250ZW50ID0gc2hvd25FbnRyeS5jaGlsZE5vZGVzWzddLnRleHRDb250ZW50LnJlcGxhY2UoLyAqXFwoW14pXSpcXCkgKi9nLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICBzaG93bkVudHJ5LmNoaWxkTm9kZXNbOF0udGV4dENvbnRlbnQgPSBgLT5gO1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3duRW50cnkuY2hpbGROb2Rlc1s5XS50ZXh0Q29udGVudCA9IHNob3duRW50cnkuY2hpbGROb2Rlc1s5XS50ZXh0Q29udGVudC5yZXBsYWNlKC8gKlxcKFteKV0qXFwpICovZywgXCIgXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3duRW50cnkucmVtb3ZlQ2hpbGQoc2hvd25FbnRyeS5jaGlsZE5vZGVzWzEwXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd25FbnRyeS5zdHlsZS53aGl0ZVNwYWNlID0gXCJwcmUtd3JhcFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGVudHJ5LnBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoc2hvd25FbnRyeSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvTG9jYWxNYXJrZXRBZHMudHNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGZ1bmN0aW9uIHNob3J0ZW5NYXROYW1lKHRleHQpIHtcclxuICAgIGNvbnN0IHNob3J0VGFibGUgPSB7XHJcbiAgICAgICAgJ0FsbC1QdXJwb3NlIEZvZGRlcic6ICdGT0QnLFxyXG4gICAgICAgICdGbG93ZXJ5IEhvcHMnOiAnSE9QJyxcclxuICAgICAgICAnQ2FmZmVpbmF0ZWQgQmVhbnMnOiAnQ0FGJyxcclxuICAgICAgICAnSGlnaC1DYXJiIEdyYWlucyc6ICdHUk4nLFxyXG4gICAgICAgICdIaWdoLUNhcmIgTWFpemUnOiAnTUFJJyxcclxuICAgICAgICAnUmF3IENvdHRvbiBGaWJlcic6ICdSQ08nLFxyXG4gICAgICAgICdUcmlnbHljZXJpZGUgTnV0cyc6ICdOVVQnLFxyXG4gICAgICAgICdUcmlnbHljZXJpZGUgRnJ1aXRzJzogJ1ZFRycsXHJcbiAgICAgICAgJ1dpbmUtUXVhbGl0eSBHcmFwZXMnOiAnR1JBJyxcclxuICAgICAgICAnU3BpY3kgSGVyYnMnOiAnSEVSJyxcclxuICAgICAgICAnSHlkcm9jYXJib24gUGxhbnRzJzogJ0hDUCcsXHJcbiAgICAgICAgJ01lYXQgVGlzc3VlIFBhdHRpZXMnOiAnTVRQJyxcclxuICAgICAgICAnUHJvdGVpbi1SaWNoIE11c2hyb29tcyc6ICdNVVMnLFxyXG4gICAgICAgICdQaW5lYmVycmllcyc6ICdQSUInLFxyXG4gICAgICAgICdQcm90ZWluLVJpY2ggQWxnYWUnOiAnQUxHJyxcclxuICAgICAgICAnUHJvdGVpbi1SaWNoIEJlYW5zJzogJ0JFQScsXHJcbiAgICAgICAgJ1Byb3RlaW4gUGFzdGUnOiAnUFBBJyxcclxuICAgICAgICAnUmF3IFNpbGsgU3RyYWlucyc6ICdSU0knLFxyXG4gICAgICAgICdWaXRhIEVzc2VuY2UnOiAnVklUJyxcclxuICAgICAgICAnRmVycm9taW5pdW0nOiAnRkFMJyxcclxuICAgICAgICAnQWxwaGEtU3RhYmlsaXplZCBUaXRhbml1bSc6ICdBU0QnLFxyXG4gICAgICAgICdCb3Jvc2lsaWNhdGUnOiAnQk9TJyxcclxuICAgICAgICAnQnJvbnplJzogJ0JSTycsXHJcbiAgICAgICAgJ1JlZCBHb2xkJzogJ1JHTycsXHJcbiAgICAgICAgJ0JsdWUgR29sZCc6ICdCR08nLFxyXG4gICAgICAgICdGZXJyby1UaXRhbml1bSc6ICdGRVQnLFxyXG4gICAgICAgICdBbHBoYS1TdGFiaWxpemVkIFR1bmdzdGVuJzogJ1dBTCcsXHJcbiAgICAgICAgJ0FydGlmaWNpYWwgU29pbCc6ICdTT0knLFxyXG4gICAgICAgICdIZWxwZnVsIEJhY3RlcmlhJzogJ0JBQycsXHJcbiAgICAgICAgJ0Rlc2F0dXJhdGlvbiBBZ2VudCc6ICdCTEUnLFxyXG4gICAgICAgICdCcmVhdGhhYmxlIExpcXVpZCc6ICdCTCcsXHJcbiAgICAgICAgJ0NoZW1pY2FsIFJlYWdlbnRzJzogJ1JFQScsXHJcbiAgICAgICAgJ0NyeW9nZW5pYyBTdGFiaWxpemVyJzogJ0NTVCcsXHJcbiAgICAgICAgJ0VucmljaGVkIEVpbnN0ZWluaXVtJzogJ0VFUycsXHJcbiAgICAgICAgJ0VucmljaGVkIFRlY2huZXRpdW0nOiAnRVRDJyxcclxuICAgICAgICAnRmx1eCc6ICdGTFgnLFxyXG4gICAgICAgICdJbmRpZ28gQ29sb3JhbnQnOiAnSU5EJyxcclxuICAgICAgICAnTGlxdWlkIENyeXN0YWxzJzogJ0xDUicsXHJcbiAgICAgICAgJ05hbm8tRW5oYW5jZWQgUmVzaW4nOiAnTlInLFxyXG4gICAgICAgICdOdXRyaWVudCBTb2x1dGlvbic6ICdOUycsXHJcbiAgICAgICAgJ09sZmFjdG9yeSBTdWJzdGFuY2VzJzogJ09MRicsXHJcbiAgICAgICAgJ0REVCBQbGFudCBBZ2VudCc6ICdERFQnLFxyXG4gICAgICAgICdQcmVtaXVtIEZlcnRpbGl6ZXInOiAnUEZFJyxcclxuICAgICAgICAnU2VkYXRpdmUgU3Vic3RhbmNlJzogJ0pVSScsXHJcbiAgICAgICAgJ1RDTCBBY2lkJzogJ1RDJyxcclxuICAgICAgICAnVGhlcm1vRmx1aWQnOiAnVEhGJyxcclxuICAgICAgICAnRXBveHkgUmVzaW4nOiAnRVBPJyxcclxuICAgICAgICAnSW5zdUZvYW0nOiAnSU5TJyxcclxuICAgICAgICAnTWVnYVR1YmUgQ29hdGluZyc6ICdNVEMnLFxyXG4gICAgICAgICdNaW5lcmFsIENvbnN0cnVjdGlvbiBHcmFudWxhdGUnOiAnTUNHJyxcclxuICAgICAgICAnTmFuby1DYXJib24gU2hlZXRpbmcnOiAnTkNYJyxcclxuICAgICAgICAnTmFubyBGaWJlcic6ICdORkknLFxyXG4gICAgICAgICdOYW5vLUNvYXRlZCBHbGFzcyc6ICdORycsXHJcbiAgICAgICAgJ1JlaW5mb3JjZWQgR2xhc3MnOiAnUkcnLFxyXG4gICAgICAgICdQb2x5LVN1bGZpdGUgU2VhbGFudCc6ICdTRUEnLFxyXG4gICAgICAgICdHbGFzcyc6ICdHTCcsXHJcbiAgICAgICAgJ0Flcm9zdGF0IEZvdW5kYXRpb24nOiAnQUVGJyxcclxuICAgICAgICAnQWlyIFNjcnViYmVyJzogJ0FJUicsXHJcbiAgICAgICAgJ0RlY29yYXRpdmUgRWxlbWVudHMnOiAnREVDJyxcclxuICAgICAgICAnRmxvYXRpbmcgVGFuayc6ICdGTE8nLFxyXG4gICAgICAgICdGbG93IENvbnRyb2wgRGV2aWNlJzogJ0ZDJyxcclxuICAgICAgICAnRmx1aWQgUGlwaW5nJzogJ0ZMUCcsXHJcbiAgICAgICAgJ0N5bGluZHJpY2FsIEdhcyBDb250YWluZXInOiAnR0MnLFxyXG4gICAgICAgICdHYXMgVmVudCc6ICdHVicsXHJcbiAgICAgICAgJ01hZ25ldGljIEdyb3VuZCBDb3Zlcic6ICdNR0MnLFxyXG4gICAgICAgICdNZXRhbC1IYWxpZGUgTGlnaHRpbmcgU3lzdGVtJzogJ01ITCcsXHJcbiAgICAgICAgJ05lb24gTGlnaHRpbmcgU3lzdGVtJzogJ0xJVCcsXHJcbiAgICAgICAgJ1ByZXNzdXJlIFNoaWVsZGluZyc6ICdQU0gnLFxyXG4gICAgICAgICdSYWRpYXRpb24gU2hpZWxkaW5nJzogJ1JTSCcsXHJcbiAgICAgICAgJ1N0YWJpbGl6ZWQgVGVjaG5ldGl1bSc6ICdUQ1MnLFxyXG4gICAgICAgICdUaGVybWFsIFNoaWVsZGluZyc6ICdUU0gnLFxyXG4gICAgICAgICdUcnVzcyc6ICdUUlUnLFxyXG4gICAgICAgICdBZHZhbmNlZCBCdWxraGVhZCc6ICdBQkgnLFxyXG4gICAgICAgICdBZHZhbmNlZCBEZWNrIEVsZW1lbnRzJzogJ0FERScsXHJcbiAgICAgICAgJ0FkdmFuY2VkIFN0cnVjdHVyYWwgRWxlbWVudHMnOiAnQVNFJyxcclxuICAgICAgICAnQWR2YW5jZWQgVHJhbnNwYXJlbnQgQXBlcnR1cmUnOiAnQVRBJyxcclxuICAgICAgICAnQmFzaWMgQnVsa2hlYWQnOiAnQkJIJyxcclxuICAgICAgICAnQmFzaWMgRGVjayBFbGVtZW50cyc6ICdCREUnLFxyXG4gICAgICAgICdCYXNpYyBTdHJ1Y3R1cmFsIEVsZW1lbnRzJzogJ0JTRScsXHJcbiAgICAgICAgJ0Jhc2ljIFRyYW5zcGFyZW50IEFwZXJ0dXJlJzogJ0JUQScsXHJcbiAgICAgICAgJ0hhcmRlbmVkIFN0cnVjdHVyYWwgRWxlbWVudHMnOiAnSFNFJyxcclxuICAgICAgICAnTGlnaHR3ZWlnaHQgQnVsa2hlYWQnOiAnTEJIJyxcclxuICAgICAgICAnTGlnaHR3ZWlnaHQgRGVjayBFbGVtZW50cyc6ICdMREUnLFxyXG4gICAgICAgICdMaWdodHdlaWdodCBTdHJ1Y3R1cmFsIEVsZW1lbnRzJzogJ0xTRScsXHJcbiAgICAgICAgJ0xpZ2h0d2VpZ2h0IFRyYW5zcGFyZW50IEFwZXJ0dXJlJzogJ0xUQScsXHJcbiAgICAgICAgJ1JlaW5mb3JjZWQgQnVsa2hlYWQnOiAnUkJIJyxcclxuICAgICAgICAnUmVpbmZvcmNlZCBEZWNrIEVsZW1lbnRzJzogJ1JERScsXHJcbiAgICAgICAgJ1JlaW5mb3JjZWQgU3RydWN0dXJhbCBFbGVtZW50cyc6ICdSU0UnLFxyXG4gICAgICAgICdSZWluZm9yY2VkIFRyYW5zcGFyZW50IEFwZXJ0dXJlJzogJ1JUQScsXHJcbiAgICAgICAgJ0RyaW5raW5nIFdhdGVyJzogJ0RXJyxcclxuICAgICAgICAnU21hcnQgU3BhY2UgU3VpdCc6ICdIU1MnLFxyXG4gICAgICAgICdGbGF2b3VyZWQgSW5zdGEtTWVhbCc6ICdGSU0nLFxyXG4gICAgICAgICdQZXJzb25hbCBEYXRhIEFzc2lzdGFudCc6ICdQREEnLFxyXG4gICAgICAgICdCYXNpYyBPdmVyYWxscyc6ICdPVkUnLFxyXG4gICAgICAgICdCYXNpYyBSYXRpb25zJzogJ1JBVCcsXHJcbiAgICAgICAgJ0FJLUFzc2lzdGVkIExhYiBDb2F0JzogJ0xDJyxcclxuICAgICAgICAnUXVhbGl0eSBNZWF0IE1lYWwnOiAnTUVBJyxcclxuICAgICAgICAnU2NpZW50aWZpYyBXb3JrIFN0YXRpb24nOiAnV1MnLFxyXG4gICAgICAgICdFeG9za2VsZXRvbiBXb3JrIFN1aXQnOiAnRVhPJyxcclxuICAgICAgICAnUG93ZXIgVG9vbHMnOiAnUFQnLFxyXG4gICAgICAgICdIYXpNYXQgV29yayBTdWl0JzogJ0hNUycsXHJcbiAgICAgICAgJ0Jhc2ljIE1lZGljYWwgS2l0JzogJ01FRCcsXHJcbiAgICAgICAgJ011bHRpLVB1cnBvc2UgU2Nhbm5lcic6ICdTQ04nLFxyXG4gICAgICAgICdFaW5zdGVpbml1bS1JbmZ1c2VkIEdpbic6ICdHSU4nLFxyXG4gICAgICAgICdWaXRhR2VsJzogJ1ZHJyxcclxuICAgICAgICAnUGFkZGVkIHdvcmsgb3ZlcmFsbCc6ICdQV08nLFxyXG4gICAgICAgICdDYWZmZWluYXRlZCBJbmZ1c2lvbic6ICdDT0YnLFxyXG4gICAgICAgICdTbWFydCBaaW5mYW5kZWwnOiAnV0lOJyxcclxuICAgICAgICAnTmV1cm9TdGltdWxhbnRzJzogJ05TVCcsXHJcbiAgICAgICAgJ0tvbWJ1Y2hhJzogJ0tPTScsXHJcbiAgICAgICAgJ1JlcGFpciBLaXQnOiAnUkVQJyxcclxuICAgICAgICAnU3RlbGxhciBQYWxlIEFsZSc6ICdBTEUnLFxyXG4gICAgICAgICdTdGVtIENlbGwgVHJlYXRtZW50JzogJ1NDJyxcclxuICAgICAgICAnQ3Jvd2QgQ29udHJvbCBEcm9uZSc6ICdDQ0QnLFxyXG4gICAgICAgICdEcm9uZSBDaGFzc2lzJzogJ0RDSCcsXHJcbiAgICAgICAgJ0Ryb25lIEZyYW1lJzogJ0RSRicsXHJcbiAgICAgICAgJ1Jlc2N1ZSBEcm9uZSc6ICdSRUQnLFxyXG4gICAgICAgICdTaGlwLVJlcGFpciBEcm9uZSc6ICdTUkQnLFxyXG4gICAgICAgICdTdXJnaWNhbCBEcm9uZSc6ICdTRFInLFxyXG4gICAgICAgICdTdXJ2ZWlsbGFuY2UgRHJvbmUnOiAnU1VEJyxcclxuICAgICAgICAnQW50ZW5uYSBBcnJheSc6ICdBQVInLFxyXG4gICAgICAgICdCb2R5IFNjYW5uZXInOiAnQlNDJyxcclxuICAgICAgICAnRnVsbC1Cb2R5IEludGVyYWN0aW9uIERldmljZSc6ICdCSUQnLFxyXG4gICAgICAgICdIb2xvZ3JhcGhpYyBEaXNwbGF5JzogJ0hEJyxcclxuICAgICAgICAnSG9sb2dyYXBoaWMgR2xhc3Nlcyc6ICdIT0cnLFxyXG4gICAgICAgICdCYXNpYyBNYWluZnJhbWUnOiAnQk1GJyxcclxuICAgICAgICAnTWljcm8gSGVhZHBob25lcyc6ICdNSFAnLFxyXG4gICAgICAgICdSYWRpbyBEZXZpY2UnOiAnUkFEJyxcclxuICAgICAgICAnU2Vuc29yIEFycmF5JzogJ1NBUicsXHJcbiAgICAgICAgJ0hhbmRoZWxkIFBlcnNvbmFsIENvbnNvbGUnOiAnSFBDJyxcclxuICAgICAgICAnQWN0aXZlIFdhdGVyIEZpbHRlcic6ICdBV0YnLFxyXG4gICAgICAgICdCYXNpYyBXb3Jrc3RhdGlvbic6ICdCV1MnLFxyXG4gICAgICAgICdBdWRpbyBUcmFuc21pdHRlcic6ICdUUkEnLFxyXG4gICAgICAgICdBY3RpdmUgQ29vbGluZyBEZXZpY2UnOiAnRkFOJyxcclxuICAgICAgICAnTWVtb3J5IEJhbmsnOiAnUkFNJyxcclxuICAgICAgICAnTWljcm8tUHJvY2Vzc29yJzogJ01QQycsXHJcbiAgICAgICAgJ01vdGhlcmJvYXJkJzogJ01CJyxcclxuICAgICAgICAnbm9uLXZvbGF0aWxlIE1lbW9yeSc6ICdST00nLFxyXG4gICAgICAgICdQcmludGVkIENpcmN1aXQgQm9hcmQnOiAnUENCJyxcclxuICAgICAgICAnU2Vuc29yJzogJ1NFTicsXHJcbiAgICAgICAgJ1RlbnNvciBQcm9jZXNzaW5nIFVuaXQnOiAnVFBVJyxcclxuICAgICAgICAnQ2FwYWNpdGF0aXZlIERpc3BsYXknOiAnQ0QnLFxyXG4gICAgICAgICdJbmZvcm1hdGlvbiBEaXNwbGF5JzogJ0RJUycsXHJcbiAgICAgICAgJ1NoaWVsZGVkIENvbm5lY3Rvcic6ICdCR0MnLFxyXG4gICAgICAgICdFbGVjdHJpYyBGaWVsZCBDYXBhY2l0b3InOiAnQ0FQJyxcclxuICAgICAgICAnQnVkZ2V0IENvbm5lY3RvcnMnOiAnQkNPJyxcclxuICAgICAgICAnTWVkaXVtIEZhc3RlbmVyIEtpdCc6ICdNRksnLFxyXG4gICAgICAgICdTbWFsbCBGYXN0ZW5lciBLaXQnOiAnU0ZLJyxcclxuICAgICAgICAnTGFzZXIgRGlvZGVzJzogJ0xESScsXHJcbiAgICAgICAgJ0hpZ2gtQ2FwYWNpdHkgQ29ubmVjdG9ycyc6ICdIQ0MnLFxyXG4gICAgICAgICdBZHZhbmNlZCBUcmFuc2lzdG9yJzogJ1RSTicsXHJcbiAgICAgICAgJ01lZGl1bSBXYWZlcic6ICdNV0YnLFxyXG4gICAgICAgICdTbWFsbCBXYWZlcic6ICdTV0YnLFxyXG4gICAgICAgICdBdWRpbyBEaXN0cmlidXRpb24gU3lzdGVtJzogJ0FEUycsXHJcbiAgICAgICAgJ0F1dG9tYXRlZCBDb29saW5nIFN5c3RlbSc6ICdBQ1MnLFxyXG4gICAgICAgICdDbGltYXRlIENvbnRyb2xsZXInOiAnQ0MnLFxyXG4gICAgICAgICdDb21tdW5pY2F0aW9uIFN5c3RlbSc6ICdDT00nLFxyXG4gICAgICAgICdDcnlvZ2VuaWMgVW5pdCc6ICdDUlUnLFxyXG4gICAgICAgICdGVEwgRmllbGQgQ29udHJvbGxlcic6ICdGRkMnLFxyXG4gICAgICAgICdMaWZlIFN1cHBvcnQgU3lzdGVtJzogJ0xJUycsXHJcbiAgICAgICAgJ0xvZ2lzdGljcyBTeXN0ZW0nOiAnTE9HJyxcclxuICAgICAgICAnU3RhYmlsaXR5IFN1cHBvcnQgU3lzdGVtJzogJ1NUUycsXHJcbiAgICAgICAgJ1RhcmdldGluZyBDb21wdXRlcic6ICdUQUMnLFxyXG4gICAgICAgICdXYXRlciBSZWNsYWltZXInOiAnV1InLFxyXG4gICAgICAgICdCZXJ5bGxpdW0nOiAnQkUnLFxyXG4gICAgICAgICdDYWxjaXVtJzogJ0NBJyxcclxuICAgICAgICAnQ2FyYm9uJzogJ0MnLFxyXG4gICAgICAgICdDaGxvcmluZSc6ICdDTCcsXHJcbiAgICAgICAgJ0VpbnN0ZWluaXVtJzogJ0VTJyxcclxuICAgICAgICAnSW9kaW5lJzogJ0knLFxyXG4gICAgICAgICdNYWduZXNpdW0nOiAnTUcnLFxyXG4gICAgICAgICdTb2RpdW0nOiAnTkEnLFxyXG4gICAgICAgICdTdWxmdXInOiAnUycsXHJcbiAgICAgICAgJ1RhbnRhbHVtJzogJ1RBJyxcclxuICAgICAgICAnVGVjaG5ldGl1bSc6ICdUQycsXHJcbiAgICAgICAgJ1ppcmNvbml1bSc6ICdaUicsXHJcbiAgICAgICAgJ0xhcmdlIENhcGFjaXRvciBCYW5rJzogJ0NCTCcsXHJcbiAgICAgICAgJ01lZGl1bSBDYXBhY2l0b3IgQmFuayc6ICdDQk0nLFxyXG4gICAgICAgICdQb3dlciBDZWxsJzogJ1BPVycsXHJcbiAgICAgICAgJ1NtYWxsIENhcGFjaXRvciBCYW5rJzogJ0NCUycsXHJcbiAgICAgICAgJ1NvbGFyIENlbGwnOiAnU09MJyxcclxuICAgICAgICAnU29sYXIgUGFuZWwnOiAnU1AnLFxyXG4gICAgICAgICdGVEwgRnVlbCc6ICdGRicsXHJcbiAgICAgICAgJ1NUTCBGdWVsJzogJ1NGJyxcclxuICAgICAgICAnQW1tb25pYSc6ICdBTU0nLFxyXG4gICAgICAgICdBcmdvbic6ICdBUicsXHJcbiAgICAgICAgJ0ZsdW9yaW5lJzogJ0YnLFxyXG4gICAgICAgICdIZWxpdW0nOiAnSEUnLFxyXG4gICAgICAgICdIZWxpdW0tMyBJc290b3BlJzogJ0hFMycsXHJcbiAgICAgICAgJ0h5ZHJvZ2VuJzogJ0gnLFxyXG4gICAgICAgICdOZW9uJzogJ05FJyxcclxuICAgICAgICAnTml0cm9nZW4nOiAnTicsXHJcbiAgICAgICAgJ094eWdlbic6ICdPJyxcclxuICAgICAgICAnSGVsaW90cm9wZSBFeHRyYWN0JzogJ0hFWCcsXHJcbiAgICAgICAgJ0xpcXVpZCBFaW5zdGVpbml1bSc6ICdMRVMnLFxyXG4gICAgICAgICdCYWN0ZXJpYWwgVHVuZ3N0ZW4gU29sdXRpb24nOiAnQlRTJyxcclxuICAgICAgICAnV2F0ZXInOiAnSDJPJyxcclxuICAgICAgICAnQXV0by1Eb2MnOiAnQURSJyxcclxuICAgICAgICAnQmFuZGFnZXMnOiAnQk5EJyxcclxuICAgICAgICAnTWVkaWNhbCBTdHJldGNoZXInOiAnU1RSJyxcclxuICAgICAgICAnUGFpbmtpbGxlcnMnOiAnUEsnLFxyXG4gICAgICAgICdTdXJnaWNhbCBFcXVpcG1lbnQnOiAnU0VRJyxcclxuICAgICAgICAnVGVzdCBUdWJlcyc6ICdUVUInLFxyXG4gICAgICAgICdBbHVtaW5pdW0nOiAnQUwnLFxyXG4gICAgICAgICdDb3BwZXInOiAnQ1UnLFxyXG4gICAgICAgICdHb2xkJzogJ0FVJyxcclxuICAgICAgICAnSXJvbic6ICdGRScsXHJcbiAgICAgICAgJ0xpdGhpdW0nOiAnTEknLFxyXG4gICAgICAgICdTaWxpY29uJzogJ1NJJyxcclxuICAgICAgICAnU3RlZWwnOiAnU1RMJyxcclxuICAgICAgICAnVGl0YW5pdW0nOiAnVEknLFxyXG4gICAgICAgICdUdW5nc3Rlbic6ICdXJyxcclxuICAgICAgICAnQmVyeWwgQ3J5c3RhbHMnOiAnQkVSJyxcclxuICAgICAgICAnQmlvcmVhY3RpdmUgTWluZXJhbHMnOiAnQlJNJyxcclxuICAgICAgICAnQm9yb24gQ3J5c3RhbHMnOiAnQk9SJyxcclxuICAgICAgICAnQ2FsaWNoZSBSb2NrJzogJ0NMSScsXHJcbiAgICAgICAgJ0dhbGVyaXRlIFJvY2snOiAnR0FMJyxcclxuICAgICAgICAnSGFsaXRlIENyeXN0YWxzJzogJ0hBTCcsXHJcbiAgICAgICAgJ0xpbWVzdG9uZSc6ICdMU1QnLFxyXG4gICAgICAgICdNYWduZXNpdGUnOiAnTUdTJyxcclxuICAgICAgICAnTWFnbmV0aXRlJzogJ01BRycsXHJcbiAgICAgICAgJ1N1bGZ1ciBDcnlzdGFscyc6ICdTQ1InLFxyXG4gICAgICAgICdUYW50YWxpdGUgUm9jayc6ICdUQUknLFxyXG4gICAgICAgICdUZWNobmV0aXVtIE94aWRlJzogJ1RDTycsXHJcbiAgICAgICAgJ1RlY3Rvc2lsaXNpdGUnOiAnVFMnLFxyXG4gICAgICAgICdaaXJjb24gQ3J5c3RhbHMnOiAnWklSJyxcclxuICAgICAgICAnQWx1bWluaXVtIE9yZSc6ICdBTE8nLFxyXG4gICAgICAgICdDb3BwZXIgT3JlJzogJ0NVTycsXHJcbiAgICAgICAgJ0dvbGQgT3JlJzogJ0FVTycsXHJcbiAgICAgICAgJ0lyb24gT3JlJzogJ0ZFTycsXHJcbiAgICAgICAgJ0xpdGhpdW0gT3JlJzogJ0xJTycsXHJcbiAgICAgICAgJ1NpbGljb24gT3JlJzogJ1NJTycsXHJcbiAgICAgICAgJ1RpdGFuaXVtIE9yZSc6ICdUSU8nLFxyXG4gICAgICAgICdEdXJhYmxlIENhc2luZyBMJzogJ0RDTCcsXHJcbiAgICAgICAgJ1BvbHltZXIgU2hlZXQgVHlwZSBMJzogJ1BTTCcsXHJcbiAgICAgICAgJ0R1cmFibGUgQ2FzaW5nIE0nOiAnRENNJyxcclxuICAgICAgICAnUG9seW1lciBTaGVldCBUeXBlIE0nOiAnUFNNJyxcclxuICAgICAgICAnUG9seS1FdGh5bGVuZSc6ICdQRScsXHJcbiAgICAgICAgJ1BvbHltZXIgR3JhbnVsYXRlJzogJ1BHJyxcclxuICAgICAgICAnRHVyYWJsZSBDYXNpbmcgUyc6ICdEQ1MnLFxyXG4gICAgICAgICdQb2x5bWVyIFNoZWV0IFR5cGUgUyc6ICdQU1MnLFxyXG4gICAgICAgICdBZHZhbmNlZCBTVEwgRW5naW5lJzogJ0FFTicsXHJcbiAgICAgICAgJ0FkdmFuY2VkIEZ1ZWwgUHVtcCc6ICdBRlAnLFxyXG4gICAgICAgICdBZHZhbmNlZCBGdWVsIFJvZCc6ICdBRlInLFxyXG4gICAgICAgICdBZHZhbmNlZCBOb3p6bGUnOiAnQU5aJyxcclxuICAgICAgICAnQmFzaWMgRnVlbCBQdW1wJzogJ0JGUCcsXHJcbiAgICAgICAgJ0Jhc2ljIEZ1ZWwgUm9kJzogJ0JGUicsXHJcbiAgICAgICAgJ0Jhc2ljIE5venpsZSc6ICdOT1onLFxyXG4gICAgICAgICdDb21idXN0aW9uIENoYW1iZXInOiAnQ0hBJyxcclxuICAgICAgICAnRmlzc2lvbiBSZWFjdG9yJzogJ0ZJUicsXHJcbiAgICAgICAgJ0Z1ZWwtc2F2aW5nIFNUTCBFbmdpbmUnOiAnUFNFJyxcclxuICAgICAgICAnR2xhc3MgQ29tYnVzdGlvbiBDaGFtYmVyJzogJ0dDSCcsXHJcbiAgICAgICAgJ0dsYXNzLWJhc2VkIFNUTCBFbmdpbmUnOiAnR0VOJyxcclxuICAgICAgICAnR2xhc3MgTm96emxlJzogJ0dOWicsXHJcbiAgICAgICAgJ0hpZ2gtcG93ZXIgRlRMIFJlYWN0b3InOiAnSFBSJyxcclxuICAgICAgICAnSHlwZXItcG93ZXIgUmVhY3Rvcic6ICdIWVInLFxyXG4gICAgICAgICdIeXBlcnRocnVzdCBTVEwgRW5naW5lJzogJ0hURScsXHJcbiAgICAgICAgJ0h5cGVydGhydXN0IE5venpsZSc6ICdITlonLFxyXG4gICAgICAgICdMYXJnZSBGVEwgRW1pdHRlcic6ICdMRkUnLFxyXG4gICAgICAgICdMb3ctaGVhdCBGdWVsIFB1bXAnOiAnTEZQJyxcclxuICAgICAgICAnTWVkaXVtIEZUTCBFbWl0dGVyJzogJ01GRScsXHJcbiAgICAgICAgJ1F1aWNrLWNoYXJnZSBGVEwgUmVhY3Rvcic6ICdRQ1InLFxyXG4gICAgICAgICdSYWRpb2lzb3RvcGUgR2VuZXJhdG9yJzogJ1JBRycsXHJcbiAgICAgICAgJ1JlYWN0b3IgQ29udHJvbCBTeXN0ZW0nOiAnUkNTJyxcclxuICAgICAgICAnU21hbGwgRlRMIEVtaXR0ZXInOiAnU0ZFJyxcclxuICAgICAgICAnU3RhbmRhcmQgU1RMIEVuZ2luZSc6ICdFTkcnLFxyXG4gICAgICAgICdTdGFuZGFyZCBGVEwgUmVhY3Rvcic6ICdSQ1QnLFxyXG4gICAgICAgICdIaWdoLWxvYWQgQ2FyZ28gQmF5IEtpdCc6ICdXQ0InLFxyXG4gICAgICAgICdIaWdoLXZvbHVtZSBDYXJnbyBCYXkgS2l0JzogJ1ZDQicsXHJcbiAgICAgICAgJ0xhcmdlIENhcmdvIEJheSBLaXQnOiAnTENCJyxcclxuICAgICAgICAnTGFyZ2UgRlRMIEZ1ZWwgVGFuayBLaXQnOiAnTEZMJyxcclxuICAgICAgICAnTGFyZ2UgU1RMIEZ1ZWwgVGFuayBLaXQnOiAnTFNMJyxcclxuICAgICAgICAnTWVkaXVtIENhcmdvIEJheSBLaXQnOiAnTUNCJyxcclxuICAgICAgICAnTWVkaXVtIEZUTCBGdWVsIFRhbmsgS2l0JzogJ01GTCcsXHJcbiAgICAgICAgJ01lZGl1bSBTVEwgRnVlbCBUYW5rIEtpdCc6ICdNU0wnLFxyXG4gICAgICAgICdTbWFsbCBDYXJnbyBCYXkgS2l0JzogJ1NDQicsXHJcbiAgICAgICAgJ1NtYWxsIEZUTCBGdWVsIFRhbmsgS2l0JzogJ1NGTCcsXHJcbiAgICAgICAgJ1NtYWxsIFNUTCBGdWVsIFRhbmsgS2l0JzogJ1NTTCcsXHJcbiAgICAgICAgJ1RpbnkgQ2FyZ28gQmF5IEtpdCc6ICdUQ0InLFxyXG4gICAgICAgICdWZXJ5IFNtYWxsIENhcmdvIEJheSBLaXQnOiAnVlNDJyxcclxuICAgICAgICAnQWR2YW5jZWQgSGlnaC1HIFNlYXRzJzogJ0FHUycsXHJcbiAgICAgICAgJ0FkdmFuY2VkIEh1bGwgUGxhdGUnOiAnQUhQJyxcclxuICAgICAgICAnQWR2YW5jZWQgVGhlcm1hbCBQcm90ZWN0aW9uIE1hdGVyaWFsJzogJ0FUUCcsXHJcbiAgICAgICAgJ0Jhc2ljIEhpZ2gtRyBTZWF0cyc6ICdCR1MnLFxyXG4gICAgICAgICdCYXNpYyBIdWxsIFBsYXRlJzogJ0JIUCcsXHJcbiAgICAgICAgJ0Jhc2ljIFRoZXJtYWwgUHJvdGVjdGlvbiBNYXRlcmlhbCc6ICdUSFAnLFxyXG4gICAgICAgICdIYXJkZW5lZCBIdWxsIFBsYXRlJzogJ0hIUCcsXHJcbiAgICAgICAgJ0xpZ2h0d2VpZ2h0IEh1bGwgUGxhdGUnOiAnTEhQJyxcclxuICAgICAgICAnTmF2aWdhdGlvbiBNb2R1bGUgTUsxJzogJ05WMScsXHJcbiAgICAgICAgJ05hdmlnYXRpb24gTW9kdWxlIE1LMic6ICdOVjInLFxyXG4gICAgICAgICdSZWluZm9yY2VkIEh1bGwgUGxhdGUnOiAnUkhQJyxcclxuICAgICAgICAnU3RydWN0dXJhbCBTcGFjZWNyYWZ0IENvbXBvbmVudCc6ICdTU0MnLFxyXG4gICAgICAgICdBZHZhbmNlZCBUaGVybWFsIFByb3RlY3Rpb24gVGlsZSc6ICdBUFQnLFxyXG4gICAgICAgICdBZHZhbmNlZCBBbnRpLXJhZCBQbGF0ZSc6ICdBUlAnLFxyXG4gICAgICAgICdBZHZhbmNlZCBXaGlwcGxlIFNoaWVsZGluZyc6ICdBV0gnLFxyXG4gICAgICAgICdCYXNpYyBUaGVybWFsIFByb3RlY3Rpb24gVGlsZSc6ICdCUFQnLFxyXG4gICAgICAgICdCYXNpYyBBbnRpLXJhZCBQbGF0ZSc6ICdCUlAnLFxyXG4gICAgICAgICdCYXNpYyBXaGlwcGxlIFNoaWVsZGluZyc6ICdCV0gnLFxyXG4gICAgICAgICdTcGVjaWFsaXplZCBBbnRpLXJhZCBQbGF0ZSc6ICdTUlAnLFxyXG4gICAgICAgICdCYXNpYyBBSSBGcmFtZXdvcmsnOiAnQkFJJyxcclxuICAgICAgICAnTG9jYWwgRGF0YWJhc2UnOiAnTEQnLFxyXG4gICAgICAgICdNYWNoaW5lIExlYXJuaW5nIEludGVyZmFjZSc6ICdNTEknLFxyXG4gICAgICAgICdOZXR3b3JraW5nIEZyYW1ld29yayc6ICdORicsXHJcbiAgICAgICAgJ1NlYXJjaCBBbGdvcml0aG0nOiAnU0EnLFxyXG4gICAgICAgICdTb3J0aW5nIEFsZ29yaXRobSc6ICdTQUwnLFxyXG4gICAgICAgICdXaW5kb3cgTWFuYWdlcic6ICdXTScsXHJcbiAgICAgICAgJ0luZm9ybWF0aW9uIERhdGEgQ29yZSc6ICdJREMnLFxyXG4gICAgICAgICdJbmZvcm1hdGlvbiBNYW5hZ2VtZW50IFN5c3RlbSc6ICdJTU0nLFxyXG4gICAgICAgICdTcGF0aWFsIE5hdmlnYXRpb24gTWFwJzogJ1NOTScsXHJcbiAgICAgICAgJ1dlYWsgQXJ0aWZpY2lhbCBJbnRlbGxpZ2VuY2UnOiAnV0FJJyxcclxuICAgICAgICAnRGF0YSBBbmFseXplcic6ICdEQScsXHJcbiAgICAgICAgJ0RhdGEgVmlzdWFsaXplcic6ICdEVicsXHJcbiAgICAgICAgJ0Rpc3RyaWJ1dGVkIERhdGFiYXNlJzogJ0REJyxcclxuICAgICAgICAnRW50ZXJ0YWlubWVudCBEYXRhIGNvcmUnOiAnRURDJyxcclxuICAgICAgICAnTmV1cmFsIE5ldHdvcmsnOiAnTk4nLFxyXG4gICAgICAgICdPcGVyYXRpbmcgU3lzdGVtJzogJ09TJyxcclxuICAgICAgICAnQ2VyYW1pYyBGYWJyaWMnOiAnQ0YnLFxyXG4gICAgICAgICdDZXJhbWljLXR1bmdzdGVuIEZhYnJpYyc6ICdDVEYnLFxyXG4gICAgICAgICdDb3R0b24gRmFicmljJzogJ0NPVCcsXHJcbiAgICAgICAgJ0tldmxhciBGYWJyaWMnOiAnS1YnLFxyXG4gICAgICAgICdOeWxvbiBGYWJyaWMnOiAnTkwnLFxyXG4gICAgICAgICdTaWxrZW4gRmFicmljJzogJ1NJTCcsXHJcbiAgICAgICAgJ1RlY2hub0tldmxhciBGYWJyaWMnOiAnVEsnLFxyXG4gICAgICAgICdDb21tYW5kIEJyaWRnZSBNSzEnOiAnQlIxJyxcclxuICAgICAgICAnQ29tbWFuZCBCcmlkZ2UgTUsyJzogJ0JSMicsXHJcbiAgICAgICAgJ1Nob3J0LWRpc3RhbmNlIENvbW1hbmQgQnJpZGdlJzogJ0JSUycsXHJcbiAgICAgICAgJ0NyZXcgUXVhcnRlcnMgKExhcmdlKSc6ICdDUUwnLFxyXG4gICAgICAgICdDcmV3IFF1YXJ0ZXJzIChNZWRpdW0pJzogJ0NRTScsXHJcbiAgICAgICAgJ0NyZXcgUXVhcnRlcnMgKFNtYWxsKSc6ICdDUVMnLFxyXG4gICAgICAgICdDcmV3IFF1YXJ0ZXJzIChUaW55KSc6ICdDUVQnLFxyXG4gICAgICAgICdEcm9uZSBPcGVyYXRpb25zIFVuaXQnOiAnRE9VJyxcclxuICAgICAgICAnRW50ZXJ0YWlubWVudCBVbml0JzogJ0ZVTicsXHJcbiAgICAgICAgJ0hhYml0YXQgVW5pdCc6ICdIQUInLFxyXG4gICAgICAgICdIYW5kY3JhZnQgV29ya3Nob3AgVW5pdCc6ICdXT1InLFxyXG4gICAgICAgICdMYWJvcmF0b3J5IFVuaXQnOiAnTFUnLFxyXG4gICAgICAgICdMYXJnZSBTaGlwLVJlcGFpciBEcm9uZSBPcGVyYXRpb25zIFVuaXQnOiAnUkRMJyxcclxuICAgICAgICAnU21hbGwgU2hpcC1SZXBhaXIgRHJvbmUgT3BlcmF0aW9ucyBVbml0JzogJ1JEUycsXHJcbiAgICAgICAgJ1N1cmdlcnkgVW5pdCc6ICdTVScsXHJcbiAgICAgICAgJ1RyYXVtYSBDYXJlIFVuaXQnOiAnVENVJyxcclxuICAgICAgICAnT2ZmaWNlIFN1cHBsaWVzJzogJ09GRicsXHJcbiAgICAgICAgJ1NhZmV0eSBVbmlmb3JtJzogJ1NVTicsXHJcbiAgICAgICAgJ1VuaXZlcnNhbCBUb29sc2V0JzogJ1VUUycsXHJcbiAgICAgICAgJ0NvcmUgTW9kdWxlIEtpdCc6ICdDTUsnLFxyXG4gICAgfTtcclxuICAgIHJldHVybiBzaG9ydFRhYmxlW3RleHRdIHx8IHRleHQ7XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvREIudHNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgU2lkZWJhciB9IGZyb20gXCIuL1NpZGViYXJcIjtcclxuZXhwb3J0IGNsYXNzIE1vZHVsZVJ1bm5lciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihtb2R1bGVzKSB7XHJcbiAgICAgICAgdGhpcy5tb2R1bGVzID0gbW9kdWxlcy5tYXAobSA9PiB0aGlzLm1vZHVsZVRvTUUobSkpO1xyXG4gICAgICAgIHRoaXMuc2lkZWJhciA9IG5ldyBTaWRlYmFyKHRoaXMubW9kdWxlcyk7XHJcbiAgICAgICAgdGhpcy5tb2R1bGVzLnB1c2godGhpcy5tb2R1bGVUb01FKHRoaXMuc2lkZWJhcikpO1xyXG4gICAgfVxyXG4gICAgbW9kdWxlVG9NRShtb2R1bGUpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtb2R1bGUsXHJcbiAgICAgICAgICAgIG5hbWU6IG1vZHVsZS5jb25zdHJ1Y3Rvci5uYW1lLFxyXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICBjb3VudDogMCxcclxuICAgICAgICAgICAgY2xlYW51cFRpbWU6IDAsXHJcbiAgICAgICAgICAgIHJ1blRpbWU6IDAsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGxvb3AoKSB7XHJcbiAgICAgICAgdGhpcy5tb2R1bGVzLm1hcChlbnRyeSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlbnRyeS5lbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0MCA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgICAgICAgICAgZW50cnkubW9kdWxlLmNsZWFudXAoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNsZWFudXBUaW1lID0gcGVyZm9ybWFuY2Uubm93KCkgLSB0MDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHQxID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgICAgICAgICBlbnRyeS5tb2R1bGUucnVuKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBydW5UaW1lID0gcGVyZm9ybWFuY2Uubm93KCkgLSB0MTtcclxuICAgICAgICAgICAgICAgIGVudHJ5LmNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBlbnRyeS5jbGVhbnVwVGltZSArPSBjbGVhbnVwVGltZTtcclxuICAgICAgICAgICAgICAgIGVudHJ5LnJ1blRpbWUgKz0gcnVuVGltZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHRoaXMubG9vcCgpLCAxMDAwKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9Nb2R1bGVSdW5uZXIudHNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgU3R5bGUsIFdpdGhTdHlsZXMgfSBmcm9tIFwiLi9TdHlsZVwiO1xyXG5pbXBvcnQgeyBjcmVhdGVUZXh0U3BhbiwgZ2VuZXJpY0NsZWFudXAsIHRvRml4ZWQgfSBmcm9tIFwiLi91dGlsXCI7XHJcbmV4cG9ydCBjbGFzcyBTaWRlYmFyIHtcclxuICAgIGNvbnN0cnVjdG9yKGxpc3QpIHtcclxuICAgICAgICB0aGlzLnRhZyA9IFwicGItc2lkZWJhclwiO1xyXG4gICAgICAgIHRoaXMubGlzdCA9IGxpc3Q7XHJcbiAgICB9XHJcbiAgICBjbGVhbnVwKCkge1xyXG4gICAgICAgIGdlbmVyaWNDbGVhbnVwKHRoaXMudGFnKTtcclxuICAgIH1cclxuICAgIHJ1bigpIHtcclxuICAgICAgICBjb25zdCBhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgYXJlYS5jbGFzc0xpc3QuYWRkKHRoaXMudGFnKTtcclxuICAgICAgICBjb25zdCBoMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XHJcbiAgICAgICAgaDMuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJQTU1HIEJlYXV0aWZpZXJcIikpO1xyXG4gICAgICAgIGgzLmNsYXNzTGlzdC5hZGQoLi4uU3R5bGUuU2lkZWJhclNlY3Rpb25IZWFkKTtcclxuICAgICAgICBhcmVhLmFwcGVuZENoaWxkKGgzKTtcclxuICAgICAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBjb250ZW50LmNsYXNzTGlzdC5hZGQoLi4uU3R5bGUuU2lkZWJhclNlY3Rpb25Db250ZW50KTtcclxuICAgICAgICBhcmVhLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xyXG4gICAgICAgIHRoaXMubGlzdC5tYXAobXAgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGxpbmUuY2xhc3NMaXN0LmFkZCguLi5XaXRoU3R5bGVzKFN0eWxlLlNpZGViYXJMaW5lLCBTdHlsZS5Gb250c1JlZ3VsYXIpKTtcclxuICAgICAgICAgICAgY29udGVudC5hcHBlbmRDaGlsZChsaW5lKTtcclxuICAgICAgICAgICAgbGluZS5hcHBlbmRDaGlsZChjcmVhdGVUZXh0U3BhbihtcC5uYW1lKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgICAgIHJpZ2h0LnN0eWxlLmZsZXhHcm93ID0gXCIxXCI7XHJcbiAgICAgICAgICAgIHJpZ2h0LnN0eWxlLnRleHRBbGlnbiA9IFwicmlnaHRcIjtcclxuICAgICAgICAgICAgbGluZS5hcHBlbmRDaGlsZChyaWdodCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSB0b0ZpeGVkKChtcC5jbGVhbnVwVGltZSArIG1wLnJ1blRpbWUpIC8gbXAuY291bnQsIDIpO1xyXG4gICAgICAgICAgICByaWdodC5hcHBlbmRDaGlsZChjcmVhdGVUZXh0U3BhbihgJHt0aW1lfW1zIGApKTtcclxuICAgICAgICAgICAgY29uc3QgdG9nZ2xlID0gdGhpcy5tYWtlVG9nZ2xlQnV0dG9uKFwiT25cIiwgXCJPZmZcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbXAuZW5hYmxlZCA9ICFtcC5lbmFibGVkO1xyXG4gICAgICAgICAgICB9LCBtcC5lbmFibGVkKTtcclxuICAgICAgICAgICAgcmlnaHQuYXBwZW5kQ2hpbGQodG9nZ2xlKTtcclxuICAgICAgICAgICAgY29uc3QgY2xlYW51cCA9IHRoaXMubWFrZVB1c2hCdXR0b24oXCJ4XCIsICgpID0+IG1wLm1vZHVsZS5jbGVhbnVwKCkpO1xyXG4gICAgICAgICAgICByaWdodC5hcHBlbmRDaGlsZChjbGVhbnVwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJkaXZbY2xhc3NePSdNQ3J0dEs2U2JLNmstNVUtV0VQbXknXVwiKSkuZm9yRWFjaChzaWRlYmFyID0+IHtcclxuICAgICAgICAgICAgc2lkZWJhci5hcHBlbmRDaGlsZChhcmVhKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIG1ha2VQdXNoQnV0dG9uKHRleHQsIGYsIHN0eWxlID0gU3R5bGUuQnV0dG9uUHJpbWFyeSkge1xyXG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKC4uLlN0eWxlLkJ1dHRvbik7XHJcbiAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoLi4uc3R5bGUpO1xyXG4gICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKHRoaXMudGFnKTtcclxuICAgICAgICBidXR0b24ub25jbGljayA9IGY7XHJcbiAgICAgICAgYnV0dG9uLmlubmVyVGV4dCA9IHRleHQ7XHJcbiAgICAgICAgcmV0dXJuIGJ1dHRvbjtcclxuICAgIH1cclxuICAgIG1ha2VUb2dnbGVCdXR0b24ob24sIG9mZiwgZiwgc3RhdGUgPSBmYWxzZSkge1xyXG4gICAgICAgIGNvbnN0IHRvZ2dsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIHRvZ2dsZS5jbGFzc0xpc3QuYWRkKC4uLlN0eWxlLkJ1dHRvbik7XHJcbiAgICAgICAgY29uc3QgZ2V0U3RhdGUgPSAhIXRvZ2dsZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3RhdGUnKSB8fCBzdGF0ZTtcclxuICAgICAgICBjb25zdCBzZXRTdGF0ZSA9IHMgPT4ge1xyXG4gICAgICAgICAgICB0b2dnbGUuc2V0QXR0cmlidXRlKCdkYXRhLXN0YXRlJywgU3RyaW5nKHMpKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHNldExvb2sgPSAocykgPT4ge1xyXG4gICAgICAgICAgICB0b2dnbGUuaW5uZXJUZXh0ID0gcyA/IG9uIDogb2ZmO1xyXG4gICAgICAgICAgICBpZiAocykge1xyXG4gICAgICAgICAgICAgICAgdG9nZ2xlLmNsYXNzTGlzdC5yZW1vdmUoLi4uU3R5bGUuQnV0dG9uUHJpbWFyeSk7XHJcbiAgICAgICAgICAgICAgICB0b2dnbGUuY2xhc3NMaXN0LmFkZCguLi5TdHlsZS5CdXR0b25TdWNjZXNzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRvZ2dsZS5jbGFzc0xpc3QucmVtb3ZlKC4uLlN0eWxlLkJ1dHRvblN1Y2Nlc3MpO1xyXG4gICAgICAgICAgICAgICAgdG9nZ2xlLmNsYXNzTGlzdC5hZGQoLi4uU3R5bGUuQnV0dG9uUHJpbWFyeSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHNldFN0YXRlKHN0YXRlKTtcclxuICAgICAgICBzZXRMb29rKHN0YXRlKTtcclxuICAgICAgICB0b2dnbGUub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmV3U3RhdGUgPSAhZ2V0U3RhdGU7XHJcbiAgICAgICAgICAgIHNldExvb2sobmV3U3RhdGUpO1xyXG4gICAgICAgICAgICBzZXRTdGF0ZShuZXdTdGF0ZSk7XHJcbiAgICAgICAgICAgIGYoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB0b2dnbGU7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvU2lkZWJhci50c1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBTZWxlY3RvciB9IGZyb20gXCIuL1NlbGVjdG9yXCI7XHJcbmltcG9ydCB7IGNvbnZlcnRQYXJzZWREdXJhdGlvblRvRVRBLCBjcmVhdGVUZXh0U3BhbiwgZ2VuZXJpY0NsZWFudXAsIHBhcnNlRHVyYXRpb24gfSBmcm9tIFwiLi91dGlsXCI7XHJcbmV4cG9ydCBjbGFzcyBPcmRlckVUQXMge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy50YWcgPSBcInBiLW9yZGVyLWV0YVwiO1xyXG4gICAgfVxyXG4gICAgY2xlYW51cCgpIHtcclxuICAgICAgICBnZW5lcmljQ2xlYW51cCh0aGlzLnRhZyk7XHJcbiAgICB9XHJcbiAgICBydW4oKSB7XHJcbiAgICAgICAgdGhpcy5iZWF1dGlmeUFnZ3JlZ2F0ZVByb2R1Y3Rpb25RdWV1ZSgpO1xyXG4gICAgfVxyXG4gICAgYmVhdXRpZnlBZ2dyZWdhdGVQcm9kdWN0aW9uUXVldWUoKSB7XHJcbiAgICAgICAgY29uc3QgcHJvZExpbmVzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLlByb2RMaW5lKSk7XHJcbiAgICAgICAgcHJvZExpbmVzLmZvckVhY2gobGluZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2RJdGVtcyA9IEFycmF5LmZyb20obGluZS5xdWVyeVNlbGVjdG9yQWxsKFwiZGl2W2NsYXNzPSdfMWE3NXBDOVEwWUY0NGJPYkh5a1dJQSddXCIpKTtcclxuICAgICAgICAgICAgbGV0IHN1bVRpbWVzID0gQXJyYXkoKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9kSXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1FVEEgPSAocHJvZEl0ZW1zW2ldLnF1ZXJ5U2VsZWN0b3IoXCJkaXZbY2xhc3M9J18yd0NFQjR5YW9tNFRkQTRjeExaaGJyJ10gZGl2W2NsYXNzPSdfMWotbFU5Zk1GekVnZWR5S0tzUER0TCBfM2RXOVcxUWkxekR5bHdWZjduTlNpaCddID4gc3BhblwiKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbUVUQSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2dyZXNzID0gKHByb2RJdGVtc1tpXS5xdWVyeVNlbGVjdG9yKFwic3BhbjpudGgtb2YtdHlwZSgyKVwiKSAmJiBwcm9kSXRlbXNbaV0ucXVlcnlTZWxlY3RvcihcInNwYW5bY2xhc3M9J0UxYUhZZGcyemRndlpDc1BsM3A5eSBfM1JzRmVMd1VnWjRiRmlpQTFmdGVFZSddXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBldGFWYWx1ZSA9IHBhcnNlRHVyYXRpb24oaXRlbUVUQS50ZXh0Q29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2dyZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGV0YSA9IGNvbnZlcnRQYXJzZWREdXJhdGlvblRvRVRBKGV0YVZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXRhVGFnID0gY3JlYXRlVGV4dFNwYW4oYCAoJHtldGF9KWAsIHRoaXMudGFnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3MucGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChldGFUYWcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW1UaW1lcy5wdXNoKGV0YVZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvd2VzdEV0YSA9IE1hdGgubWluKC4uLnN1bVRpbWVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VtbWVkRXRhID0gbG93ZXN0RXRhICsgZXRhVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bVRpbWVzW3N1bVRpbWVzLmluZGV4T2YobG93ZXN0RXRhKV0gPSBzdW1tZWRFdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGV0YSA9IGNvbnZlcnRQYXJzZWREdXJhdGlvblRvRVRBKHN1bW1lZEV0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2RJdGVtc1tpXS5hcHBlbmRDaGlsZChjcmVhdGVUZXh0U3BhbihgICgke2V0YX0pYCwgdGhpcy50YWcpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9PcmRlckVUQXMudHNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgY29udmVydER1cmF0aW9uVG9FVEEsIGNyZWF0ZVRleHRTcGFuLCBnZW5lcmljQ2xlYW51cCB9IGZyb20gXCIuL3V0aWxcIjtcclxuZXhwb3J0IGNsYXNzIFBhcnNlRVRBcyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnRhZyA9IFwicGItb3RoZXItZXRhc1wiO1xyXG4gICAgfVxyXG4gICAgY2xlYW51cCgpIHtcclxuICAgICAgICBnZW5lcmljQ2xlYW51cCh0aGlzLnRhZyk7XHJcbiAgICB9XHJcbiAgICBydW4oKSB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJ0YWJsZVtjbGFzc349J18zOHhJT3BodzFhQTN0LUxFYnJpUXpxJ11cIikpO1xyXG4gICAgICAgIGVsZW1lbnRzLmZvckVhY2godGFibGVFbGVtID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdGFibGVSb3dzID0gQXJyYXkuZnJvbSh0YWJsZUVsZW0ucXVlcnlTZWxlY3RvckFsbChcInRib2R5ID4gdHJcIikpO1xyXG4gICAgICAgICAgICB0YWJsZVJvd3MuZm9yRWFjaChyb3cgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXRhQ2VsbCA9IHJvdy5xdWVyeVNlbGVjdG9yQWxsKFwidGRcIikuaXRlbSg3KTtcclxuICAgICAgICAgICAgICAgIGlmIChldGFDZWxsLnRleHRDb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGV4dENvbnRlbnQgPSBldGFDZWxsLnRleHRDb250ZW50LnNwbGl0KCcoJylbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXRhID0gY29udmVydER1cmF0aW9uVG9FVEEodGV4dENvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV0YUNlbGwuYXBwZW5kQ2hpbGQoY3JlYXRlVGV4dFNwYW4oYCAoJHtldGF9KWAsIHRoaXMudGFnKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL1BhcnNlRVRBcy50c1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgU3R5bGUgfSBmcm9tIFwiLi9TdHlsZVwiO1xyXG5pbXBvcnQgeyBjcmVhdGVUZXh0U3BhbiwgZ2VuZXJpY0NsZWFudXAsIHRvRml4ZWQgfSBmcm9tIFwiLi91dGlsXCI7XHJcbmV4cG9ydCBjbGFzcyBQb3N0TE0ge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy50YWcgPSBcInBiLXBvc3QtbG0tcHJpY2VcIjtcclxuICAgICAgICB0aGlzLmNsZWFudXBzID0gW107XHJcbiAgICB9XHJcbiAgICBjbGVhbnVwKCkge1xyXG4gICAgICAgIHRoaXMuY2xlYW51cHMuZm9yRWFjaCgoZiwgaSkgPT4ge1xyXG4gICAgICAgICAgICBmKCk7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNsZWFudXBzW2ldO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGdlbmVyaWNDbGVhbnVwKHRoaXMudGFnKTtcclxuICAgIH1cclxuICAgIHJ1bigpIHtcclxuICAgICAgICBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJhcnRpY2xlW2NsYXNzfj0nZnRNdlVHaTdMbUdDWm1nM2RKMF9mJ10gPiBkaXYgPiBkaXYgPiBmb3JtXCIpKS5mb3JFYWNoKGZvcm0gPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBhbW91bnRJbnB1dCA9IGRvY3VtZW50LmV2YWx1YXRlKFwiZGl2W2xhYmVsL3NwYW5bdGV4dCgpPSdBbW91bnQnXV0vZGl2L2Rpdi9pbnB1dFwiLCBmb3JtLCBudWxsLCBYUGF0aFJlc3VsdC5GSVJTVF9PUkRFUkVEX05PREVfVFlQRSwgbnVsbCkuc2luZ2xlTm9kZVZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCB0b3RhbFByaWNlSW5wdXQgPSBkb2N1bWVudC5ldmFsdWF0ZShcImRpdltsYWJlbC9zcGFuW3RleHQoKT0nVG90YWwgcHJpY2UnXV0vZGl2L2Rpdi9pbnB1dFwiLCBmb3JtLCBudWxsLCBYUGF0aFJlc3VsdC5GSVJTVF9PUkRFUkVEX05PREVfVFlQRSwgbnVsbCkuc2luZ2xlTm9kZVZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBkaXNwbGF5RWxlbWVudCA9IGNyZWF0ZVRleHRTcGFuKCctLSBlYScsIHRoaXMudGFnKTtcclxuICAgICAgICAgICAgdG90YWxQcmljZUlucHV0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGRpc3BsYXlFbGVtZW50LCB0b3RhbFByaWNlSW5wdXQpO1xyXG4gICAgICAgICAgICBjb25zdCB0eXBlID0gZG9jdW1lbnQuZXZhbHVhdGUoXCJkaXZbbGFiZWwvc3Bhblt0ZXh0KCk9J1R5cGUnXV0vZGl2L2RpdlwiLCBmb3JtLCBudWxsLCBYUGF0aFJlc3VsdC5GSVJTVF9PUkRFUkVEX05PREVfVFlQRSwgbnVsbCkuc2luZ2xlTm9kZVZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBjYWxjdWxhdGVQcmljZVBlclVuaXQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhbW91bnQgPSBwYXJzZUludChhbW91bnRJbnB1dC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0b3RhbCA9IHBhcnNlSW50KHRvdGFsUHJpY2VJbnB1dC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwb3N0aW5nRmVlID0gZG9jdW1lbnQuZXZhbHVhdGUoXCJkaXZbbGFiZWwvc3Bhblt0ZXh0KCk9J0ZlZXMnXV0vZGl2L2Rpdi9kaXYvc3BhblwiLCBmb3JtLCBudWxsLCBYUGF0aFJlc3VsdC5GSVJTVF9PUkRFUkVEX05PREVfVFlQRSwgbnVsbCkuc2luZ2xlTm9kZVZhbHVlLmlubmVyVGV4dDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBvc3RpbmdGZWVWYWx1ZSA9IHBhcnNlSW50KHBvc3RpbmdGZWUucmVwbGFjZSgvWywuXS9nLCAnJykpIC8gMTAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIHByaWNlUGVyVW5pdFdpdGhGZWU7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHR5cGUuaW5uZXJUZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkJVWUlOR1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmljZVBlclVuaXRXaXRoRmVlID0gdG9GaXhlZCgodG90YWwgKyBwb3N0aW5nRmVlVmFsdWUpIC8gYW1vdW50LCAyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlNFTExJTkdcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2VQZXJVbml0V2l0aEZlZSA9IHRvRml4ZWQoKHRvdGFsIC0gcG9zdGluZ0ZlZVZhbHVlKSAvIGFtb3VudCwgMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJpY2VQZXJVbml0ID0gdG9GaXhlZCh0b3RhbCAvIGFtb3VudCwgMik7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5RWxlbWVudC50ZXh0Q29udGVudCA9IGAke3ByaWNlUGVyVW5pdH1lYSBcXCgke3ByaWNlUGVyVW5pdFdpdGhGZWV9ZWFcXClgO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjYWxjdWxhdGVQcmljZVBlclVuaXQoKTtcclxuICAgICAgICAgICAgW2Ftb3VudElucHV0LCB0b3RhbFByaWNlSW5wdXRdLm1hcChpbnB1dCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmVpbnB1dCcsIGNhbGN1bGF0ZVByaWNlUGVyVW5pdCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFudXBzLnB1c2goKCkgPT4gaW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmVmb3JlaW5wdXQnLCBjYWxjdWxhdGVQcmljZVBlclVuaXQpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvc3RCdXR0b24gPSBkb2N1bWVudC5ldmFsdWF0ZShcImRpdi9kaXYvYnV0dG9uW3RleHQoKT0ncG9zdCddXCIsIGZvcm0sIG51bGwsIFhQYXRoUmVzdWx0LkZJUlNUX09SREVSRURfTk9ERV9UWVBFLCBudWxsKS5zaW5nbGVOb2RlVmFsdWU7XHJcbiAgICAgICAgICAgIGlmICh0eXBlICYmIHBvc3RCdXR0b24pIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodHlwZS5pbm5lclRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiQlVZSU5HXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQnV0dG9uKHBvc3RCdXR0b24sIFN0eWxlLkJ1dHRvblN1Y2Nlc3MsIFwiQnV5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiU0VMTElOR1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUJ1dHRvbihwb3N0QnV0dG9uLCBTdHlsZS5CdXR0b25EYW5nZXIsIFwiU2VsbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGNoYW5nZUJ1dHRvbihidXR0b24sIGNsYXNzTmFtZSwgdGV4dCkge1xyXG4gICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiXzFZOWwzSjIwWG4tQ3l4TVpJY0gwNmlcIik7XHJcbiAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3NOYW1lKTtcclxuICAgICAgICB0aGlzLmNsZWFudXBzLnB1c2goKCkgPT4ge1xyXG4gICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZSguLi5jbGFzc05hbWUpO1xyXG4gICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcIl8xWTlsM0oyMFhuLUN5eE1aSWNIMDZpXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IG9yaWdpbmFsVGV4dCA9IGJ1dHRvbi5pbm5lckhUTUw7XHJcbiAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9IHRleHQ7XHJcbiAgICAgICAgdGhpcy5jbGVhbnVwcy5wdXNoKCgpID0+IGJ1dHRvbi5pbm5lckhUTUwgPSBvcmlnaW5hbFRleHQpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL1Bvc3RMTS50c1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgY3JlYXRlVGV4dFNwYW4sIGdlbmVyaWNDbGVhbnVwLCBwYXJzZUR1cmF0aW9uLCB0b0ZpeGVkIH0gZnJvbSBcIi4vdXRpbFwiO1xyXG5leHBvcnQgY2xhc3MgUXVldWVMb2FkIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMudGFnID0gXCJwYi1xdWV1ZS1sb2FkXCI7XHJcbiAgICB9XHJcbiAgICBjbGVhbnVwKCkge1xyXG4gICAgICAgIGdlbmVyaWNDbGVhbnVwKHRoaXMudGFnKTtcclxuICAgIH1cclxuICAgIHJ1bigpIHtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0ZVF1ZXVlTG9hZCgpO1xyXG4gICAgfVxyXG4gICAgZ2V0RXRhRnJvbVJvdyhyb3cpIHtcclxuICAgICAgICBjb25zdCBldGFDZWxsID0gcm93LnF1ZXJ5U2VsZWN0b3JBbGwoXCJ0ZFwiKS5pdGVtKDQpO1xyXG4gICAgICAgIGlmIChldGFDZWxsKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGV0YVNwYW4gPSBldGFDZWxsLnF1ZXJ5U2VsZWN0b3IoXCJzcGFuXCIpO1xyXG4gICAgICAgICAgICBpZiAoZXRhU3Bhbikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXRhID0gcGFyc2VEdXJhdGlvbihldGFTcGFuLnRleHRDb250ZW50KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBldGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgICBjYWxjdWxhdGVRdWV1ZUxvYWQoKSB7XHJcbiAgICAgICAgY29uc3QgdGFibGVzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwidGFibGVbY2xhc3N+PSdCNUpFdXFwTm9OLVZUOGptQThnM2wnXVwiKSk7XHJcbiAgICAgICAgdGFibGVzLmZvckVhY2godGFibGUgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByb3dzID0gQXJyYXkuZnJvbSh0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKFwidGJvZHk6bnRoLW9mLXR5cGUoMikgPiB0clwiKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRvdGFsVGltZSA9IHJvd3MucmVkdWNlKCh0b3RhbCwgcm93KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuID0gdGhpcy5nZXRFdGFGcm9tUm93KHJvdyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG90YWwgKyBuO1xyXG4gICAgICAgICAgICB9LCAwKTtcclxuICAgICAgICAgICAgaWYgKHRvdGFsVGltZSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJvd3MuZm9yRWFjaChyb3cgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGV0YSA9IHRoaXMuZ2V0RXRhRnJvbVJvdyhyb3cpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBlcmNlbnQgPSB0b0ZpeGVkKGV0YSAvIHRvdGFsVGltZSAqIDEwMCwgMik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGV4dEZpZWxkID0gcm93LnF1ZXJ5U2VsZWN0b3JBbGwoXCJ0ZFwiKS5pdGVtKDUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ZXh0RmllbGQgJiYgZXRhID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzcGFuID0gY3JlYXRlVGV4dFNwYW4oYCAke3BlcmNlbnR9JWAsIHRoaXMudGFnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEZpZWxkLmFwcGVuZENoaWxkKHNwYW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvUXVldWVMb2FkLnRzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBTZWxlY3RvciB9IGZyb20gXCIuL1NlbGVjdG9yXCI7XHJcbmltcG9ydCB7IGdlbmVyaWNDbGVhbnVwLCBzaG9ydGVuLCB0b0ZpeGVkIH0gZnJvbSBcIi4vdXRpbFwiO1xyXG5leHBvcnQgY2xhc3MgQ1hGWCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnRhZyA9IFwicGItY3hcIjtcclxuICAgIH1cclxuICAgIGNsZWFudXAoKSB7XHJcbiAgICAgICAgZ2VuZXJpY0NsZWFudXAodGhpcy50YWcpO1xyXG4gICAgfVxyXG4gICAgcnVuKCkge1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChTZWxlY3Rvci5DWE9CVGFibGUgKyBcIiA+IHRib2R5ID4gdHIgPiB0ZFwiKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBlbGVtZW50c1tpXTtcclxuICAgICAgICAgICAgY29uc3QgdGV4dCA9IGVsZW1lbnQudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXMgPSB0ZXh0ICYmIHRleHQubWF0Y2goL14oTkVPIENoYXJ0ZXIgRXhwbG9yYXRpb258QW50YXJlcyBJbml0aWF0aXZlfEluc2l0b3IgQ29vcGVyYXRpdmV8Q2FzdGlsbG8tSXRvIE1lcmNhbnRpbGUpIE1hcmtldCBNYWtlciQvKTtcclxuICAgICAgICAgICAgaWYgKG1hdGNoZXMpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBzaG9ydGVuKHRleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGNvbXBhbmllcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChTZWxlY3Rvci5DWE9CVGFibGUgKyBcIiA+IHRib2R5ID4gdHIgPiB0ZCA+IHNwYW5cIikpLmNvbmNhdChBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuRlhPQlRhYmxlICsgXCIgPiB0Ym9keSA+IHRyID4gdGQgPiBzcGFuXCIpKSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21wYW5pZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGNvbXBhbmllc1tpXTtcclxuICAgICAgICAgICAgY29uc3QgdGV4dCA9IGVsZW1lbnQudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0Lmxlbmd0aCA+IDI1KSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gdGV4dC5zdWJzdHJpbmcoMCwgMjMpICsgXCJcXCpcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBvcmRlckNYID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChTZWxlY3Rvci5DWE9yZGVyc0V4Y2hhbmdlTmFtZSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcmRlckNYLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBvcmRlckNYW2ldO1xyXG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gZWxlbWVudC50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHRleHQgJiYgdGV4dC5tYXRjaCgvU3RhdGlvbiBDb21tb2RpdHkgRXhjaGFuZ2UkLyk7XHJcbiAgICAgICAgICAgIGlmIChtYXRjaGVzKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gc2hvcnRlbih0ZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBvcmRlckFtb3VudENvbHVtbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuQ1hPcmRlcnNUYWJsZSArIFwiID4gdGhlYWQgPiB0ciA+IHRoXCIpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3JkZXJBbW91bnRDb2x1bW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IG9yZGVyQW1vdW50Q29sdW1uW2ldO1xyXG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gZWxlbWVudC50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHRleHQgJiYgdGV4dC5tYXRjaCgvXkFtb3VudCBcXChpbml0aWFsXFwpJC8pO1xyXG4gICAgICAgICAgICBpZiAobWF0Y2hlcykge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9IFwiQW1vdW50IFxcKGlcXClcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBvcmRlclN0YXR1cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuQ1hPcmRlcnNUYWJsZSArIFwiID4gdGJvZHkgPiB0ciA+IHRkOm50aC1vZi10eXBlKDcpID4gc3BhblwiKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9yZGVyU3RhdHVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG9yZGVyU3RhdHVzW2ldLmNoaWxkTm9kZXNbMF0ucGFyZW50RWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcclxuICAgICAgICAgICAgaWYgKG9yZGVyU3RhdHVzW2ldLnRleHRDb250ZW50ID09IFwicGFydGlhbGx5IGZpbGxlZFwiIHx8IG9yZGVyU3RhdHVzW2ldLnRleHRDb250ZW50ID09IFwicGFydCBmaWxsXCIpIHtcclxuICAgICAgICAgICAgICAgIG9yZGVyU3RhdHVzW2ldLnRleHRDb250ZW50ID0gXCJwYXJ0IGZpbGxcIjtcclxuICAgICAgICAgICAgICAgIG9yZGVyU3RhdHVzW2ldLmNoaWxkTm9kZXNbMF0ucGFyZW50RWxlbWVudC5zdHlsZS5jb2xvciA9IFwiI2Q3NzM0MlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdvcmtDWE9TSGVhZGVyKHRoaXMudGFnKTtcclxuICAgICAgICB3b3JrQ1hPU1Jvd3ModGhpcy50YWcpO1xyXG4gICAgfVxyXG59XHJcbmNvbnN0IGhpZGVNYXROYW1lQ29sdW1uID0gdHJ1ZTtcclxuY29uc3QgYWRkT3JkZXJWYWx1ZUNvbHVtbiA9IHRydWU7XHJcbmZ1bmN0aW9uIHdvcmtDWE9TSGVhZGVyKHRhZykge1xyXG4gICAgY29uc3QgQ1hPU0hlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3IuQ1hPcmRlcnNUYWJsZSArIFwiID4gdGhlYWQgPiB0clwiKTtcclxuICAgIGlmIChDWE9TSGVhZGVyKSB7XHJcbiAgICAgICAgaWYgKGhpZGVNYXROYW1lQ29sdW1uKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9yZGVyTWF0TmFtZUhlYWRlciA9IENYT1NIZWFkZXIucXVlcnlTZWxlY3RvcihcInRoOm50aC1vZi10eXBlKDQpXCIpO1xyXG4gICAgICAgICAgICBvcmRlck1hdE5hbWVIZWFkZXIuc3R5bGUuZGlzcGxheSA9IFwiTm9uZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWRkT3JkZXJWYWx1ZUNvbHVtbikge1xyXG4gICAgICAgICAgICBjb25zdCBvcmRlclN0YXR1c0hlYWRlciA9IENYT1NIZWFkZXIucXVlcnlTZWxlY3RvcihcInRoOm50aC1vZi10eXBlKDcpXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBuZXdIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XHJcbiAgICAgICAgICAgIG5ld0hlYWRlci5jbGFzc0xpc3QuYWRkKHRhZyk7XHJcbiAgICAgICAgICAgIG5ld0hlYWRlci50ZXh0Q29udGVudCA9IFwiVmFsdWVcIjtcclxuICAgICAgICAgICAgQ1hPU0hlYWRlci5pbnNlcnRCZWZvcmUobmV3SGVhZGVyLCBvcmRlclN0YXR1c0hlYWRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHdvcmtDWE9TUm93cyh0YWcpIHtcclxuICAgIGNvbnN0IG9yZGVyUm93cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuQ1hPcmRlcnNUYWJsZSArIFwiID4gdGJvZHkgPiB0clwiKTtcclxuICAgIEFycmF5LmZyb20ob3JkZXJSb3dzKS5mb3JFYWNoKChyb3cpID0+IHtcclxuICAgICAgICBpZiAoaGlkZU1hdE5hbWVDb2x1bW4pIHtcclxuICAgICAgICAgICAgY29uc3QgbWF0TmFtZUNlbGwgPSByb3cucXVlcnlTZWxlY3RvcihcInRkOm50aC1vZi10eXBlKDQpXCIpO1xyXG4gICAgICAgICAgICBtYXROYW1lQ2VsbC5zdHlsZS5kaXNwbGF5ID0gXCJOb25lXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhZGRPcmRlclZhbHVlQ29sdW1uKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9yZGVyU3RhdHVzQ2VsbCA9IHJvdy5xdWVyeVNlbGVjdG9yKFwidGQ6bnRoLW9mLXR5cGUoNylcIik7XHJcbiAgICAgICAgICAgIGlmIChvcmRlclN0YXR1c0NlbGwuY2hpbGRFbGVtZW50Q291bnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFtb3VudCA9IHBhcnNlSW50KHJvdy5xdWVyeVNlbGVjdG9yKFwidGQ6bnRoLW9mLXR5cGUoNSlcIikuY2hpbGROb2Rlc1swXS50ZXh0Q29udGVudC5yZXBsYWNlKC9bLC5dL2csICcnKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB1bml0UHJpY2UgPSBwYXJzZUludChyb3cucXVlcnlTZWxlY3RvcihcInRkOm50aC1vZi10eXBlKDYpXCIpLmNoaWxkTm9kZXNbMF0udGV4dENvbnRlbnQucmVwbGFjZSgvWywuXS9nLCAnJykpIC8gMTAwO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHJvdy5xdWVyeVNlbGVjdG9yKFwidGQ6bnRoLW9mLXR5cGUoMilcIikudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xyXG4gICAgICAgICAgICAgICAgbmV3Q2VsbC5jbGFzc0xpc3QuYWRkKHRhZyk7XHJcbiAgICAgICAgICAgICAgICBuZXdDZWxsLnRleHRDb250ZW50ID0gdG9GaXhlZChhbW91bnQgKiB1bml0UHJpY2UsIDIpO1xyXG4gICAgICAgICAgICAgICAgbmV3Q2VsbC5zdHlsZS50ZXh0QWxpZ24gPSBcInJpZ2h0XCI7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PSBcIkJVWVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3Q2VsbC5zdHlsZS5jb2xvciA9IFwiIzUwYzg3OFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT0gXCJTRUxMXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdDZWxsLnN0eWxlLmNvbG9yID0gXCIjZDAzMTJkXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByb3cuaW5zZXJ0QmVmb3JlKG5ld0NlbGwsIG9yZGVyU3RhdHVzQ2VsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9DWEZYLnRzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBzaG9ydGVuLCBnZW5lcmljQ2xlYW51cCwgfSBmcm9tIFwiLi91dGlsXCI7XHJcbmV4cG9ydCBjbGFzcyBGSU4ge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy50YWcgPSBcInBiLWZpblwiO1xyXG4gICAgfVxyXG4gICAgY2xlYW51cCgpIHtcclxuICAgICAgICBnZW5lcmljQ2xlYW51cCh0aGlzLnRhZyk7XHJcbiAgICB9XHJcbiAgICBydW4oKSB7XHJcbiAgICAgICAgY29uc3QgZmlubGFIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwidGFibGVbY2xhc3NePSd0X0p3T1p4bFZDUGZOLUZLUklvTm8nXSA+IHRoZWFkID4gdHIgPiB0aFwiKTtcclxuICAgICAgICBBcnJheS5mcm9tKGZpbmxhSGVhZGVyKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gc2hvcnRlbihlbGVtZW50LnRleHRDb250ZW50KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9GSU4udHNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=