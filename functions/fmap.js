module.exports = fmap;

function fmap(fn, obj) {
    if (!obj) {
        return;
    }

    if (obj.constructor === Array) {
        return obj.map(fn)
    } else {
        return mapOnObject(fn, obj);
    }
}

function mapOnObject(fn, obj) {
    var values = getValues(obj);
    return fmap(fn, values);
}

function getValues(obj) {
    var keys = Object.keys(obj);
    return keys.map(getValue);

    function getValue(key) {
        return obj[key];
    }
}
