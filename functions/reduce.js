module.exports = reduce;

function reduce(fn, memo, list) {
    var nrItems = list.length;

    for (var i in list) {
        memo = fn(memo, list[i]);
    }

    return memo;
}
