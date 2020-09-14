// Task: base

var State = require('constant.state');

module.exports.create = function(tasks) {
    var task = new Object;

    task.list = tasks

    task.run = function(creep) {
        for (var index in task.list) {
            step = task.list[index];
            if (step.state == State.StepPending) {
                step.start(creep);
            }
            if (step.state == State.StepRunning) {
                step.run(creep);
                if (step.check(creep)) {
                    step.end(creep);
                }
                return false;
            }
        }
        return true;
    }

    return task;
}
