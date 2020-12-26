import axios from "axios";
const instance=axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    withCredentials:true,
    headers:{
        'API-KEY':'1cdd9f77-c60e-4af5-b194-659e4ebd5d41'
    }
})
type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}


type ResponseType<D={}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors:Array<string>
    data: D
}



export const todoApi={
    getTodos(){
        return instance.get<Array<TodolistType>>('todo-lists',
             )
    },
    postTodos(title:string){
        return instance.post<ResponseType<{item:TodolistType}>>('todo-lists',{title},)
    },
    deletTodos(todolistId:string){
        ;
        return  instance.delete<ResponseType>(`todo-lists/${todolistId}`,)
    },
    putTodos( todolistId:string,title:string){

        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title},)
    }
}