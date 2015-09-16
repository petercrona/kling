module.exports = zip;

zip._dependencies = ['reduce'];

function zip(listA, listB) {
    var listBReversed = listB.reverse();

    return _.reduce(mergeWithB, [], listA);

    function mergeWithB(memo, elementFromA) {
        memo.push(elementFromA);
        memo.push(listB.pop());
        return memo;
    }
}
