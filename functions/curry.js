module.exports = curry;

curry._dependencies = ['identity', 'fmap'];

function curry(fn) {
    var nrArgsRequired = fn.length;
    var argsArray = getArgs(arguments).splice(1);
    return generateAccumulator(fn, argsArray, nrArgsRequired);
}

function generateAccumulator(fn, args, nrArgsRequired) {
    return function() {
        var newArgs = arguments;
        var allArgs = addNewArgs(args, newArgs);

        if (getNrOfSetArgs(allArgs) < nrArgsRequired) {
            return generateAccumulator(fn, allArgs, nrArgsRequired);
        } else {
            return fn.apply(null, allArgs);
        }
    }
}

function getArgs(args) {
    return curry.fmap(curry.identity, args);
}

function getNrOfSetArgs(args) {
    return args
        .filter(isNotUndefined)
        .length;
}

function isNotUndefined(value) {
    return value !== undefined;
}

function addNewArgs(args, newArgs) {
    var newArgsArray = getArgs(newArgs);

    var result = fillUndefinedAndGetRemainingNewArgs(args, newArgsArray);
    var remainingNewArgs = result.remaining;
    args = result.withNewArgs;

    return args.concat(remainingNewArgs);
}

function fillUndefinedAndGetRemainingNewArgs(args, newArgs) {
    var nrArgs = args.length;
    args = curry.fmap(
        takeAndSetArgIfUndefined.bind(null, newArgs),
        args);

    return {
        withNewArgs: args,
        remaining: newArgs
    };
}

function takeAndSetArgIfUndefined(newArgs, currentArg) {
    if (currentArg === undefined) {
        return newArgs.shift();
    } else {
        return currentArg;
    }
}
