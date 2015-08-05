'use strict';

var pbp = require('pbp');
var mixins = require('ce-mixin').mixins;
var Catamorphism = require('ce-catamorphism').Catamorphism;
var Stringify = require('ce-stringify').Stringify;

var value = pbp.value;
var enumerableValue = pbp.enumerableValue;

var Left, Right;
var Either = mixins([Catamorphism, Stringify], Object.create(null, {
  of: enumerableValue(Right),
}));

Left = function(x) {
  return Object.create(Either, {
    type: value('Left'),
    args: value([x]),
    ctor: value(Left),
    map: enumerableValue(function(_) {
      return this.ctor.apply(this, this.args);
    }),
    ap: enumerableValue(function(_) {
      return this.ctor.apply(this, this.args);
    }),
    chain: enumerableValue(function(_) {
      return this.ctor.apply(this, this.args);
    }),
  });
};

Right = function(x) {
  return Object.create(Either, {
    type: value('Right'),
    args: value([x]),
    ctor: value(Right),
    map: enumerableValue(function(f) {
      return this.ctor(f(x));
    }),
    ap: enumerableValue(function(y) {
      return y.map(x);
    }),
    chain: enumerableValue(function(f) {
      return f(x);
    }),
  });
};

module.exports = {
  Either: Either,
  Left: Left,
  Right: Right,
};
