import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox, TextFields} from "@material-ui/icons";
type AddItemFormType={
    addItem:(title:string)=>void
}
export function AddItemForm(props:AddItemFormType) {
    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim()!=="") {
            props.addItem(title)
            setTitle("")
        } else {
            setError("Title is required")
        }

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)



    }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem();
        }
    }

    return (
        <div>
           {/* <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyUpHandler}
                className={error ? "error" : ""}
            />*/}

            <TextField
                size={"small"}
                variant={"outlined"}
                value={title}
                label={"Title"}
                helperText={error}
                error={!!error}
                onChange={onChangeHandler}
                onKeyPress={onKeyUpHandler}

            />

            {/*<Button size={"small"} variant={"contained"} color={"primary"} onClick={addItem} >+</Button>*/}
<IconButton onClick={addItem}
            color={"primary"}
>
    <AddBox/>
</IconButton>

            {/*{error && <div className={"error-message"}>{error}</div>}*/}
        </div>
    )
};