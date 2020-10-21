import {FilterValuesType, ToDoListType} from "../App";
import {v1} from "uuid";
import {type} from "os";


type ActionType =RemoveTodolistActionType |AddTodolistActionType|ChangeTitleActionType|ChangeFilterActionType


export type RemoveTodolistActionType={
    type:'REMOVE-TODOLIST'
    id:string
}
export type AddTodolistActionType={
    type:'ADD-TODOLIST'
    title:string
    todolistId:string
}

type ChangeTitleActionType={
    type:'CHANGE-TODOLIST-TITLE'
    id:string
    title:string
}

type ChangeFilterActionType={
    type:'CHANGE-TODOLIST-FILTER'
    id:string
    filter:FilterValuesType
}

let initialState:Array<ToDoListType>=[
    {id: "todolistID1", title: "What to learn", filter: "all"},
    {id: "todolistID2", title: "What to buy", filter: "all"}
]

export const todolistReducer = (state: Array<ToDoListType>=initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':

            return state.filter(tl=>tl.id!==action.id)
        case 'ADD-TODOLIST':
            const newToDoList:ToDoListType={
                id:action.todolistId,
                title:action.title,
                filter:"all"

            }
            return [...state,newToDoList]
        case 'CHANGE-TODOLIST-TITLE':
            const todoList=state.find(tl=>tl.id===action.id)
            if (todoList){
                todoList.title=action.title
                return [...state]
            }
            return state
        case 'CHANGE-TODOLIST-FILTER':
            const todoListFilter=state.find(tl=>tl.id===action.id)
            if (todoListFilter){
                todoListFilter.filter=action.filter
                return [...state]
            }
            return state
        default:
            return state
    }
}

export const RemoveTodolistAC=(todolistID:string):RemoveTodolistActionType=>{
    return {type:'REMOVE-TODOLIST',id: todolistID }
}
export const AddTodolistAC=(title:string):AddTodolistActionType=>{
    return {type:"ADD-TODOLIST",title,todolistId:v1() }
}
export const ChangeTodolistTitleAC=(title:string,todolistID:string):ChangeTitleActionType=>{
    return {id:todolistID,title:title,type:"CHANGE-TODOLIST-TITLE" }
}

export const ChangeTodolistFilterAC=(filter:FilterValuesType,todolistID:string):ChangeFilterActionType=>{
    return {id:todolistID,filter:filter,type:"CHANGE-TODOLIST-FILTER" }
}