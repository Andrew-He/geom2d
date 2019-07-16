
/**
 * @file utils.js
 * @author Andrew He
 */


export const arrayUtil = {
    pluck: function (collection, attr) {
        let newCollection = [];
        for (let i = 0; i < collection.length; i++) {
            newCollection.push(collection[i][attr]);
        }
        return newCollection;
    },

};


export const functional = {
    compose: function (...funcs) {
        return predicates.match(funcs)
            .on(funcs => funcs.length == 0, arg => arg)
            .on(funcs => funcs.length == 1, _ => funcs[0])
            .otherwise(funcs => funcs.reduce((f1, f2) => (...args) => f1(f2(...args))));
    },

    isFunction: function (func) { return Boolean(func && func.constructor && func.call && func.apply); },
};


export const predicates = {

    match: x => ({
        on: (pred, fn) => pred(x) ? predicates.matched(fn(x)) : predicates.match(x),
        otherwise: fn => fn(x)
    }),

    matched: x => ({
        on: () => predicates.matched(x),
        otherwise: () => x
    }),

    someEmpty: function (objs = []) { return objs.some(this.isEmptyObj); },

    allEmpty:  function (objs = []) { return objs.map(this.isEmptyObj).reduce((a, b) => a && b, true) },

    emptyObj: (obj = {}) => obj === null || Object.keys(obj).length === 0 && obj.constructor === Object,

};




