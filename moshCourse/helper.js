const uuid = require('uuidv4');


// function CreateTask(task) {
//     let x = uuid();
//     return {
//         id: x,
//         task
//     }
// }

const CreateTask = (task) => ({
    id: uuid(),
    task,
    completed: false
})

// let z = CreateTask("sayed");
// let d = CreateTask("Reemas");

// let y = [{ id: 1, task: "sayed", completed: false }, { id: 2, task: "mohand", completed: false }, { id: 3, task: "reemas", completed: false }];
// let y = [];
// AddToList(y, z);
// AddToList(y, d);
// console.log(y);

function AddToList(listArr, ItemToAdd) {

    listArr.push(ItemToAdd);
    return listArr;
}

function MarkAsCompleted(listArr, TaskId) {

    return listArr.map((element) => {

        return element.id == TaskId ? { id: element.id, task: element.task, completed: true } : element;

    });

}

function ListArray(listArr) {
    listArr.forEach(element => {
        console.log(element);
    });
}


module.exports = {
    AddToList: AddToList,
    MarkAsCompleted: MarkAsCompleted,
    CreateTask: CreateTask,
    ListArray: ListArray
};


// console.log(MarkAsCompleted(y, 1));