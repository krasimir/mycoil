(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Mycoil = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.atom = atom;
exports.useMycoilState = useMycoilState;
exports.selector = selector;
exports.useMycoilValue = useMycoilValue;

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var State = {};
var Selectors = {};

function atom(options) {
  State[options.key] = {
    key: options.key,
    value: options.default,
    subscribers: [],
    get: function get() {
      return this.value;
    },
    set: function set(newValue) {
      this.value = newValue;
      this.subscribers.forEach(function (s) {
        return s(newValue);
      });
    },
    subscribe: function subscribe(callback) {
      this.subscribers.push(callback);
    },
    unsubscribe: function unsubscribe(callback) {
      this.subscribers = this.subscribers.filter(function (s) {
        return s !== callback;
      });
    }
  };
}

function useMycoilState(key) {
  if (!State[key]) throw new Error("There is no state matching key " + key);

  var state = State[key];

  var _useState = (0, _react.useState)(state.get()),
      _useState2 = _slicedToArray(_useState, 2),
      bridgeValue = _useState2[0],
      setBridgeValue = _useState2[1];

  (0, _react.useEffect)(function () {
    var subscription = function subscription(updatedValue) {
      setBridgeValue(updatedValue);
    };
    state.subscribe(subscription);
    return function () {
      state.unsubscribe(subscription);
    };
  }, []);

  return [state.get(), function (newValue) {
    state.set(newValue);
  }];
}

function selector(options) {
  Selectors[options.key] = options.get;
}

function useMycoilValue(key) {
  if (!Selectors[key]) throw new Error("There is no selector matching key " + key);

  var selector = Selectors[key];
  return selector({
    get: function get(stateKey) {
      if (!State[stateKey]) throw new Error("There is no state matching key " + stateKey);

      var state = State[stateKey];
      return state.get();
    }
  });
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});
