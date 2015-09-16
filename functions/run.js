module.exports = workflow;

function workflow(monad) {
    if ( ! (this instanceof workflow) ) {
        return new workflow(monad);
    }

    var store = {};
    var jobQueue = [];

    this.write = write;
    this.execute = execute;
    this.run = run;

    function write(key, monadicValue) {
        jobQueue.push(new Job(key, monadicValue));
        return this;
    }

    function run(fn) {
        execute().bind(fn)
        return this;
    }

    function execute() {
        var setValueInState = _.curry(function(key, value) {
            store[key] = value;
            return store;
        });

        var jobQueueLength = jobQueue.length;
        var currentStep = jobQueue[0].monadicValue;

        if (typeof currentStep === 'function') {
            var monadicValue = currentStep(store);
            mustBeCompatibleType(monadicValue, monad);
            currentStep = monadicValue.bind(function(value) {
                setValueInState(jobQueue[0].key, value);
                return value;
            });
        } else {
            currentStep = currentStep.bind(function(value) {
                setValueInState(jobQueue[0].key, value);
                return value;
            });
        }

        for (var i = 1; i < jobQueueLength; i++) {
            var job = jobQueue[i];

            currentStep.bind(function() {

                if (typeof job.monadicValue === 'function') {
                    var monadicValue = job.monadicValue(store);
                    mustBeCompatibleType(monadicValue, monad);

                    monadicValue.bind(function(value) {
                        setValueInState(job.key, value);
                        currentStep = currentStep.bind(function() {
                            return value;
                        });
                    });
                    currentStep = monadicValue;

                } else {
                    currentStep = currentStep.bind(function() {
                        job.monadicValue.bind(setValueInState(job.key));
                    });
                    currentStep = job.monadicValue;
                }
            });

        }

        return currentStep.bind(function() {
            return store;
        });
    }
}

function Job(key, monadicValue) {
    this.key = key;
    this.monadicValue = monadicValue;
}

function mustBeCompatibleType(monadicValue, monad) {
    if ( ! (monadicValue instanceof monad) ) {
        throw "Tried to write incompatible data to monad";
    }
}
