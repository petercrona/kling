module.exports = chunksOf;

function chunksOf(itemsPerChunk, list) {
    var result = [];

    for (var i = 0; i < list.length; i = i + itemsPerChunk) {
        var toGet = [];

        for (var j = i; j < i + itemsPerChunk && j < list.length; j++) {
            toGet.push(list[j]);
        }

        if (toGet.length > 0) {
            result.push(toGet);
        }
    }

    if (result.length === 0) {
        result.push([]);
    }

    return result;
}
