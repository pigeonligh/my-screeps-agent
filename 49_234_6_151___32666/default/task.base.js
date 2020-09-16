// Task: base

var State = require('defination.state');

function pipeline(creep, list) {
    for (var index in list) {
        step = list[index];
        var caller = require(step.caller);
        if (step.state == State.StepPending) {
            caller.start(step, creep);
        }
        if (step.state == State.StepRunning) {
            caller.run(step, creep);
            if (caller.check(step, creep)) {
                caller.end(step, creep);
            }
            return false;
        }
    }
    return true;
}

module.exports.create = function(name, tasks, cycle) {
    var task = {
        name: name,
        list: tasks,
        cycle: cycle,
    };

    return task;
};

module.exports.step = function(task, creep) {
    if (!pipeline(creep, task.list)) {
        return false;
    }
    if (task.cycle && task.cycle.length > 0) {
        if (!pipeline(creep, task.cycle)) {
            return false;
        }
        for (var index in task.cycle) {
            step = task.cycle[index];
            step.state = State.StepPending;
        }
        return false;
    }
    return true;
};