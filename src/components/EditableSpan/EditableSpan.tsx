import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@material-ui/core';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
    disabled:boolean
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    console.log("EditableSpan called");
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);
    let entityStatus=useSelector<AppRootStateType>(state => state.app.status)
    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ?    <TextField disabled={props.disabled} value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
        : <span aria-disabled={props.disabled} onDoubleClick={activateEditMode}>{props.value}</span>
});
