const yagrs = require('yargs');
const myPromises = require('./fspromise');
const myHelper = require("./helper");

const myArguments = yagrs.argv;

async function SwitchCases(filename, arguments) {
    console.log(arguments);
    switch (arguments.operation) {
        case 'add':
            if (arguments.task != null) {
                let Tasks = await myPromises.ReadFile(filename);
                console.log(Tasks);
                if (Array.isArray(Tasks)) {
                    let task = myHelper.CreateTask(arguments.task);
                    console.log(task);
                    let newTasks = myHelper.AddToList(Tasks, task);
                    myPromises.WriteFile(filename, newTasks);

                } else {
                    Tasks = [];
                    let task = myHelper.CreateTask(arguments.task);
                    console.log(task);
                    let newTasks = myHelper.AddToList(Tasks, task);
                    myPromises.WriteFile(filename, newTasks);

                }
            }
            break;
        case 'complete':
            if (arguments.id != null) {
                let Tasks = await myPromises.ReadFile(filename);
                if (Tasks.length > 0) {

                    let newTasks = myHelper.MarkAsCompleted(Tasks, arguments.id);
                    console.log(newTasks);
                    myPromises.WriteFile(filename, newTasks);
                }
            }

            break;
        case 'list':
            let Tasks = await myPromises.ReadFile(filename);
            if (Tasks.lenght > 0) {

                myHelper.ListArray(Tasks);
            }
            break;
        default:
            break;
    }

}
SwitchCases("loai", myArguments);