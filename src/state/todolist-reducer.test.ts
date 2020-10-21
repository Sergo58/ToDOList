
import {v1} from 'uuid';

import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistReducer
} from "./todolist-reducer";
import {FilterValuesType, ToDoListType} from "../App";
let todolistId1 : string
let todolistId2 : string
let startState: Array<ToDoListType>
beforeEach(()=>{
     todolistId1 = v1();
     todolistId2 = v1();
     startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})

test('correct todolist should be removed', () => {


    const endState = todolistReducer(startState, RemoveTodolistAC(todolistId2))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId1);
});

test('correct todolist should be added', () => {


    let newTodolistTitle = "New Todolist";



    const endState = todolistReducer(startState, AddTodolistAC(todolistId1))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(todolistId1);
});

test('correct todolist should change its name', () => {


    let newTodolistTitle = "New Todolist";


    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    };

    const endState = todolistReducer(startState, ChangeTodolistTitleAC(newTodolistTitle,todolistId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";



    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    };

    const endState = todolistReducer(startState, ChangeTodolistFilterAC(newFilter,todolistId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

