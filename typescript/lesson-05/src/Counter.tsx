import { ReactNode } from "react";
import { useCounter } from "./context/CounterContext";
import { useCounterText } from "./context/CounterContext";

type ChildrenType = {
    children: (num: number) => ReactNode
}

const Counter = ({ children }: ChildrenType) => {
    const {count, increase, decrease} = useCounter()    
    const {text, handleTextInput} = useCounterText()    

    return (
        <>
        <h1>{children(count)}</h1>
        <div>
            <button onClick={increase}>+</button>
            <button onClick={decrease}>-</button>
        </div>
        <input type="text" onChange={handleTextInput} />
        <h2>{text}</h2>
        </>
    )
}

export default Counter;