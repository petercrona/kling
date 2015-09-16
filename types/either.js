module.exports = Either;

function Either(error, value) {
    if ( ! (this instanceof Either)) {
        return new Either(error, value);
    }

    this.fmap = fmap;
    this.isError = isError;
    this.ifError = ifError;
    this.ifSuccess = ifSuccess;
    this.bind = bind;

    function fmap(fn) {
        if (this.isError()) {
            return new Either(error);
        } else {
            return new Either(undefined, fn(value));
        }
    }

    function isError() {
        return error && (value === undefiend || value === null);
    }

    function ifError(fn) {
        if (isError()) {
            fn(error);
        }
        return this;
    }

    function ifSuccess(fn) {
        if (!isError()) {
            fn(value);
        }
        return this;
    }

    function isError() {
        return value === undefined;
    }

    function bind(fn) {
        if (isError()) {
            return new Either(error, undefined);
        } else {
            return new Either(error, fn(value));
        }

    }

}
