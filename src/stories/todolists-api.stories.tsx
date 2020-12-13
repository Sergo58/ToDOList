import React, {useEffect, useState} from 'react'
import axios from "axios"
import {settings} from "cluster";
import {todoApi} from "../api/todolist-api";
export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoApi.getTodos()
.then((res)=>{
setState(res.data)
})
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title="58888"
     todoApi.postTodos(title).then((res) => {
             setState(res.data);
         }
     )

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = "777ed927-2fb1-4f80-ae58-a6cd1d967bc2"
    useEffect(() => {
        todoApi.deletTodos(todolistId).then( (res) => {
            setState(res.data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = "777ed927-2fb1-4f80-ae58-a6cd1d967bc2"
    let title="58888"
    useEffect(() => {
        todoApi.putTodos(todolistId,title)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
