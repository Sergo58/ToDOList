import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolist-reducer";



export type changeTaskTitleActionType ={
    type: 'CHANGE-TITLE-TASK'
    taskID: string
    toDoListID: string
    title:string
}

export type removeTaskActionType = {
    type: 'REMOVE-TASK'
    taskID: string
    toDoListID: string
}
export type addTaskActionType = {
    type: 'ADD-TASK'
    title: string
    toDoListID: string
}

export type changeTaskStatusActionType ={
    type: 'CHANGE-STATUS-TASK'
    taskID: string
    toDoListID: string
    isDone:boolean
}
let initialState:TaskStateType= {
    ["todolistID1"]: [{id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: true},
        {id: v1(), title: "GraphQL", isDone: true},
        {id: v1(), title: "Rest API", isDone: true},
        {id: v1(), title: "TS", isDone: false}],
    ["todolistID2"]: [{id: v1(), title: "Bread", isDone: true},
        {id: v1(), title: "Books", isDone: false},
        {id: v1(), title: "Butter", isDone: true},
        {id: v1(), title: "Onion", isDone: true},
        {id: v1(), title: "Beer", isDone: true},
        {id: v1(), title: "Fish", isDone: false}]
}

type ActionType = changeTaskTitleActionType|removeTaskActionType|addTaskActionType|changeTaskStatusActionType|AddTodolistActionType|RemoveTodolistActionType

export const tasksReducer = (state: TaskStateType=initialState, action: ActionType) => {
    switch (action.type) {
        case "CHANGE-TITLE-TASK":{
            let toDoListTasks=state[action.toDoListID];
            let task = toDoListTasks.find(t => t.id === action.taskID);
            if (task) {
                if (task) {
task.title=action.title
                }
            }

            return {...state, [action.toDoListID]:toDoListTasks};
        }
        case 'REMOVE-TASK':{ let copyState = {...state}
            copyState[action.toDoListID] = copyState[action.toDoListID].filter(t => t.id != action.taskID)
            return copyState}
        case "ADD-TASK":{
            let task={id:v1(),title:action.title,isDone:false};
            return {...state,[action.toDoListID]:[task,...state[action.toDoListID]]}
        }
        case "CHANGE-STATUS-TASK":{
            let toDoListTasks=state[action.toDoListID];
            let task = toDoListTasks.find(t => t.id === action.taskID);
            if (task) {
                task.isDone = action.isDone;


        }
            return {...state, [action.toDoListID]:toDoListTasks};

        }
        case "ADD-TODOLIST":{
            const stateCopy={...state};
            stateCopy[action.todolistId]=[]
            return stateCopy
        }
        case "REMOVE-TODOLIST":{
            const stateCopy={...state};
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state


    }

}

export const removeTaskAC = (taskID: string, toDoListID: string): removeTaskActionType => {
    return {type: 'REMOVE-TASK', taskID: taskID, toDoListID: toDoListID}
}



export const addTaskAC = (title: string, toDoListID: string): addTaskActionType => {
    return {type: 'ADD-TASK', title: title, toDoListID: toDoListID}
}


export const changeTaskStatusAC = (taskID: string, toDoListID: string, isDone: boolean): changeTaskStatusActionType => {
    return {type: "CHANGE-STATUS-TASK", taskID: taskID, toDoListID: toDoListID, isDone: isDone}
}

export const changeTaskTitleAC = (taskID: string, toDoListID: string, title: string): changeTaskTitleActionType => {
    return {type: "CHANGE-TITLE-TASK", taskID: taskID, toDoListID: toDoListID, title: title}
}

