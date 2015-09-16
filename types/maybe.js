module.exports = Maybe;

function Maybe(result) {
    if ( ! (this instanceof Maybe)) {
        return new Maybe(result);
    }

    this.ifJust = ifJust;
    this.ifNothing = ifNothing;
    this.fmap = fmap;
    this.bind = bind;

    function fmap(fn) {
        if (result !== undefined && result !== null) {
            return Maybe(fn(result));
        } else {
            return Maybe();
        }
    }

    function ifJust(fn) {
        if (result !== undefined && result !== null) {
            fn(result);
        }
        return this;
    }

    function ifNothing(fn) {
        if (result === undefined || result === null) {
            fn();
        }
        return this;
    }

    function bind(fn) {
        if (result !== undefined && result !== null) {
            return new Maybe(fn(result));
        } else {
            return new Maybe();
        }

    }

}
