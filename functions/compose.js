module.exports = compose;

function compose() {
    var fns = arguments;

    if (fns.length > 0) {
        return composeFunctions(fns);
    }
}

function composeFunctions(fns) {
    return function(result) {
        var nrFns = fns.length;
        for (var i = nrFns-1; i >= 0; i--) {
            result = fns[i](result);
        }

        return result;
    }

}
