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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./backend/frontend/src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./backend/frontend/src/components/App.js":
/*!************************************************!*\
  !*** ./backend/frontend/src/components/App.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: D:\\\\git-repos\\\\v9-bears-team-15\\\\backend\\\\frontend\\\\src\\\\components\\\\App.js: Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>? (11:12)\\n\\n\\u001b[0m \\u001b[90m  9 | \\u001b[39m        \\u001b[36mreturn\\u001b[39m(\\u001b[0m\\n\\u001b[0m \\u001b[90m 10 | \\u001b[39m            \\u001b[33m<\\u001b[39m\\u001b[33mh1\\u001b[39m\\u001b[33m>\\u001b[39m\\u001b[33mBears\\u001b[39m \\u001b[33mStock\\u001b[39m \\u001b[33mGame\\u001b[39m\\u001b[33m!\\u001b[39m\\u001b[33m<\\u001b[39m\\u001b[33m/\\u001b[39m\\u001b[33mh1\\u001b[39m\\u001b[33m>\\u001b[39m\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 11 | \\u001b[39m            \\u001b[33m<\\u001b[39m\\u001b[33mStockSearch\\u001b[39m \\u001b[33m/\\u001b[39m\\u001b[33m>\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m    | \\u001b[39m            \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 12 | \\u001b[39m        )\\u001b[0m\\n\\u001b[0m \\u001b[90m 13 | \\u001b[39m    }\\u001b[0m\\n\\u001b[0m \\u001b[90m 14 | \\u001b[39m}\\u001b[0m\\n    at Object.raise (D:\\\\git-repos\\\\v9-bears-team-15\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:6344:17)\\n    at Object.jsxParseElementAt (D:\\\\git-repos\\\\v9-bears-team-15\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:3577:12)\\n    at Object.jsxParseElement (D:\\\\git-repos\\\\v9-bears-team-15\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:3587:17)\\n    at Object.parseExprAtom (D:\\\\git-repos\\\\v9-bears-team-15\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:3594:19)\\n    at Object.parseExprSubscripts (D:\\\\git-repos\\\\v9-bears-team-15\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:8413:23)\\n    at Object.parseMaybeUnary (D:\\\\git-repos\\\\v9-bears-team-15\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:8393:21)\\n    at Object.parseExprOps (D:\\\\git-repos\\\\v9-bears-team-15\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:8280:23)\\n    at Object.parseMaybeConditional (D:\\\\git-repos\\\\v9-bears-team-15\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:8253:23)\\n    at Object.parseMaybeAssign (D:\\\\git-repos\\\\v9-bears-team-15\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:8200:21)\\n    at Object.parseParenAndDistinguishExpression (D:\\\\git-repos\\\\v9-bears-team-15\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:8963:28)\\n    at Object.parseExprAtom (D:\\\\git-repos\\\\v9-bears-team-15\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:8760:21)\\n    at Object.parseExprAtom (D:\\\\git-repos\\\\v9-bears-team-15\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:3599:20)\\n    at Object.parseExprSubscripts (D:\\\\git-repos\\\\v9-bears-team-15\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:8413:23)\\n    at Object.parseMaybeUnary (D:\\\\git-repos\\\\v9-bears-team-15\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:8393:21)\\n    at Object.parseExprOps (D:\\\\git-repos\\\\v9-bears-team-15\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:8280:23)\\n    at Object.parseMaybeConditional (D:\\\\git-repos\\\\v9-bears-team-15\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:8253:23)\\n    at Object.parseMaybeAssign (D:\\\\git-repos\\\\v9-bears-team-15\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:8200:21)\\n    at Object.parseExpression (D:\\\\git-repos\\\\v9-bears-team-15\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:8148:23)\\n    at Object.parseReturnStatement (D:\\\\git-repos\\\\v9-bears-team-15\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:10157:28)\\n    at Object.parseStatementContent (D:\\\\git-repos\\\\v9-bears-team-15\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9836:21)\\n    at Object.parseStatement (D:\\\\git-repos\\\\v9-bears-team-15\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9788:17)\\n    at Object.parseBlockOrModuleBlockBody (D:\\\\git-repos\\\\v9-bears-team-15\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:10364:25)\\n    at Object.parseBlockBody (D:\\\\git-repos\\\\v9-bears-team-15\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:10351:10)\\n    at Object.parseBlock (D:\\\\git-repos\\\\v9-bears-team-15\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:10335:10)\\n    at Object.parseFunctionBody (D:\\\\git-repos\\\\v9-bears-team-15\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9408:24)\\n    at Object.parseFunctionBodyAndFinish (D:\\\\git-repos\\\\v9-bears-team-15\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9378:10)\\n    at Object.parseMethod (D:\\\\git-repos\\\\v9-bears-team-15\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:9332:10)\\n    at Object.pushClassMethod (D:\\\\git-repos\\\\v9-bears-team-15\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:10767:30)\\n    at Object.parseClassMemberWithIsStatic (D:\\\\git-repos\\\\v9-bears-team-15\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:10692:12)\\n    at Object.parseClassMember (D:\\\\git-repos\\\\v9-bears-team-15\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:10631:10)\");\n\n//# sourceURL=webpack:///./backend/frontend/src/components/App.js?");

/***/ }),

/***/ "./backend/frontend/src/index.js":
/*!***************************************!*\
  !*** ./backend/frontend/src/index.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/App */ \"./backend/frontend/src/components/App.js\");\n/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_App__WEBPACK_IMPORTED_MODULE_0__);\n\n\n//# sourceURL=webpack:///./backend/frontend/src/index.js?");

/***/ })

/******/ });