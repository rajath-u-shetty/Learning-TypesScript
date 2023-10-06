import Counter from "./components/Counter"
import Heading from "./components/Heading"
import { Section } from "./components/section"
import { useState } from 'react'
import List from "./components/List"


function App() {
    const [ count, setCount ] = useState<number>(0)

  return (
    <>
    <Heading title={"Hello"} />
    <Section title={"Different title"}>This is my section</Section>
    <Counter setCount={setCount}>Count is {count} </Counter>
    <List items={["coffee", "tacos", "code"]} render={(item: string) => <span className="bold">{item}</span>} />
    </>
)
}

export default App
