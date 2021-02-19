

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType as string,
    error: null}

type InitialStateType = {
    status: string
    error:string|null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}
export const setAppStatusAC = (status: string) =>
    ({type: 'APP/SET-STATUS', status:status} as const)

export const setAppErrorAC = (error: string|null) =>
    ({type: 'APP/SET-ERROR', error:error} as const)


type ActionsType = |ReturnType<typeof setAppErrorAC>|ReturnType<typeof setAppStatusAC>