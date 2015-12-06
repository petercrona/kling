var kling = module.exports = {};

kling = loadCore();
kling = loadDependent();
kling.fmap(injectAllDependencies, kling);
kling = curryAll();

function loadCore() {
    kling.identity = identity;
    kling.Maybe = require('./types/maybe.js');
    kling.Either = require('./types/either.js');
    kling.foldr = require('./functions/reduce.js');
    kling.compose = require('./functions/compose.js');
    kling.do = require('./functions/run.js');
    return kling;
}

function loadDependent() {
    kling.fmap = require('./functions/fmap.js');
    kling.curry = require('./functions/curry.js');
    kling.reduce = require('./functions/reduce.js');
    kling.zip = require('./functions/zip.js');
    kling.chunksOf = require('./functions/chunks_of.js');
    return kling;
}

function curryAll() {
    kling.foldr = kling.curry(kling.foldr);
    kling.fmap = kling.curry(kling.fmap);
}

function injectAllDependencies(module) {
    var dependencies = new kling.Maybe(module._dependencies)
        .fmap(injectDependencies);

    dependencies.fmap(addAllDependenciesToModule.bind(null, module));

    return module;
}

function addAllDependenciesToModule(module, dependencies) {
    kling.fmap(
        addMaybeDependencyToModule.bind(null, module),
        dependencies);
}

function addMaybeDependencyToModule(module, maybeDependency) {
    maybeDependency.fmap(
        addDependencyToModule.bind(null, module)
    );
}

function addDependencyToModule(module, dependency) {
    module[dependency.name] = dependency;
}

function injectDependencies(dependencies) {
    return kling.fmap(injectDependency, dependencies);
}

function injectDependency(dependency) {
    return new kling.Maybe(kling[dependency]);
}

function identity(x) {
    return x;
}
