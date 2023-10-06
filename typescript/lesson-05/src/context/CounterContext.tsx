import { ChangeEvent, ReactElement, createContext, useReducer, useCallback, useContext } from "react";

type stateType = {
    count: number,
    text: string,
}

export const initState: stateType = {count: 0, text: " "}

const enum REDUCER_ACTION_TYPE {
    INCREMENT,
    DECREMENT,
    NEW_INPUT
}

type ReducerAction = {
    type: REDUCER_ACTION_TYPE,
    payload?: string,
}

const reducer = (state: stateType, action: ReducerAction): stateType => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.INCREMENT:
            return { ...state, count: state.count + 1 }
        case REDUCER_ACTION_TYPE.DECREMENT:
            return { ...state, count: state.count - 1 }
        case REDUCER_ACTION_TYPE.NEW_INPUT:
            return { ...state, text: action.payload ?? '' }
        default:
            throw new Error()
    }
}

const useCounterContext = (initState: stateType) => {
    const [state, dispatch] = useReducer(reducer, initState)

    const increase = useCallback(() => dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT}),[])
    const decrease = useCallback(() => dispatch({ type: REDUCER_ACTION_TYPE.DECREMENT}),[])
    const handleTextInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: REDUCER_ACTION_TYPE.NEW_INPUT,
        payload: e.target.value
    })
    },[])

    return { state, increase, decrease, handleTextInput}
}

type UseCounterContextType = ReturnType<typeof useCounterContext>

const initContextState: UseCounterContextType ={
    state: initState,
    increase: () => {},
    decrease: () => {},
    handleTextInput: (e: ChangeEvent<HTMLInputElement>) => {},
}

export const CounterContext = createContext<UseCounterContextType>(initContextState)

type ChildrenType = {
    children?: ReactElement | undefined
}

export const CounterProvider = ({
    children, ...initState
}: ChildrenType & stateType): ReactElement => {
    return (
        <CounterContext.Provider value={useCounterContext(initState)}>
            {children}
        </CounterContext.Provider>
    )
}

type UseCounterHookType = {
    count: number,
    increase: () => void,
    decrease: () => void,
}

export const useCounter = (): UseCounterHookType => {
    const { state: {count}, increase, decrease } = useContext(CounterContext)
    return { count, increase, decrease}
}

type UseCounterTextHookType = {
    text: string,
    handleTextInput: (e: ChangeEvent<HTMLInputElement>) => void,
}

export const useCounterText = (): UseCounterTextHookType => {
    const { state: {text}, handleTextInput } = useContext(CounterContext)
    return { text, handleTextInput}
}