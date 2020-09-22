import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}
export type FilterValuesType = "all" | "active" | "completed"


function App() {

    /*let [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "GraphQL", isDone: true},
            {id: v1(), title: "Rest API", isDone: true},
            {id: v1(), title: "Rest API2", isDone: false}

        ]
    )*/

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [toDoLists, setToDoLists] = useState<Array<ToDoListType>>([
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [{id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "GraphQL", isDone: true},
            {id: v1(), title: "Rest API", isDone: true},
            {id: v1(), title: "TS", isDone: false}],
        [todolistID2]: [{id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Books", isDone: false},
            {id: v1(), title: "Butter", isDone: true},
            {id: v1(), title: "Onion", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Fish", isDone: false}]
    })

    function addTask(title: string, toDoListID: string) {
        let toDoListTasks = tasks[toDoListID]
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        tasks[toDoListID] = [newTask, ...toDoListTasks]
        setTasks({...tasks})
    }

    function removeTasks(taskID: string, toDoListID: string) {
        let toDoListTasks = tasks[toDoListID]
        tasks[toDoListID] = toDoListTasks.filter(t => t.id !== taskID)
        setTasks({...tasks})

    }


    function changeFilter(value: FilterValuesType, toDoListID: string) {
        let toDoList = toDoLists.find(tl => tl.id === toDoListID)
        if (toDoList) {
            toDoList.filter = value
            setToDoLists([...toDoLists])
        }
    }


    function changeStatus(taskID: string, isDone: boolean, toDoListID: string) {
        let toDoListTasks = tasks[toDoListID]
        let task = toDoListTasks.find(t => t.id === taskID);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    function removeTodoList(toDoListID: string) {
        setToDoLists(toDoLists.filter(tl => tl.id !== toDoListID))
        delete tasks[toDoListID]
        setTasks({...tasks})
    }

    function addToDoList(title:string) {
        const newToDoListId=v1()
        const newToDOList:ToDoListType={
            id:newToDoListId,
            title:title,
            filter: "all"
        }
        setToDoLists([...toDoLists,newToDOList])
        setTasks({...tasks,[newToDoListId]:[]})
    }

     function changeTaskTitle(taskID: string, title: string, toDoListID: string){
       const toDOListTasks=tasks[toDoListID]
         const task = toDOListTasks.find(task =>task.id===taskID)
         if (task){
             task.title=title
             setTasks({...tasks})
         }
    }
    function changeToDoListTitle( title: string, toDoListID: string){
        const toDolist = toDoLists.find(tl =>tl.id===toDoListID)
        if (toDolist){
            toDolist.title=title
            setToDoLists([...toDoLists])
        }
    }
    return (
        <div className="App">
            <AddItemForm addItem={addToDoList}/>
            {
                toDoLists.map(tl => {
                    let tasksForTodoList = tasks[tl.id];

                    if (tl.filter === "active") {
                        tasksForTodoList = tasks[tl.id].filter(t => t.isDone === false)
                    }
                    if (tl.filter === "completed") {
                        tasksForTodoList = tasks[tl.id].filter(t => t.isDone === true)
                    }
                    return (
                        <TodoList
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodoList}
                            filter={tl.filter}
                            changeFilter={changeFilter}
                            removeToDoList={removeTodoList}
                            addTask={addTask}
                            removeTask={removeTasks}
                            changeStatus={changeStatus}
                            changeTaskTitle={changeTaskTitle}
                            changeToDoListTitle={changeToDoListTitle}


                        />
                    )

                })
            }


        </div>
    );
}

export default App;


