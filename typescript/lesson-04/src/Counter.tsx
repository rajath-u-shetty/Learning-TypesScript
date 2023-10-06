import { ChangeEvent, ReactNode, useReducer } from "react";


const initState = {count: 0, text: " "}

const enum REDUCER_ACTION_TYPE {
    INCREMENT,
    DECREMENT,
    NEW_INPUT
}

type ReducerAction = {
    type: REDUCER_ACTION_TYPE,
    payload?: string,
}

const reducer = (state: typeof initState, action: ReducerAction): typeof initState => {
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


type ChildrenType = {
    children: (num: number) => ReactNode
}

const Counter = ({ children }: ChildrenType) => {
    const [state, dispatch] = useReducer(reducer, initState)

    const increase = () => dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT})
    const decrease = () => dispatch({ type: REDUCER_ACTION_TYPE.DECREMENT})
    const handleTextInput = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: REDUCER_ACTION_TYPE.NEW_INPUT,
        payload: e.target.value
    })
    }

    return (
        <>
        <h1>{children(state.count)}</h1>
        <div>
            <button onClick={increase}>+</button>
            <button onClick={decrease}>-</button>
        </div>
        <input type="text" onChange={handleTextInput} />
        <h2>{state.text}</h2>
        </>
    )
}

export default Counter;