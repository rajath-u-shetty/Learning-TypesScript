import './style.css'

interface Todo {
  title: string,
  isCompleted: boolean,
  readonly id: string
}

const todos: Array<Todo> = []

const todosContainer = document.querySelector(".todoContainer") as HTMLDivElement

const todoInput = document.getElementsByTagName("input")[0] as HTMLInputElement

const myForm = document.getElementById("myForm") as HTMLFormElement

myForm.onsubmit = ( e: SubmitEvent) => {
  e.preventDefault()

  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.random()*1000)
  };

  todos.push(todo);
  todoInput.value = " "

}

const generateTodoItem = (title: string, isCompleted: boolean, id: string) => {
  const todo = document.createElement("div") as HTMLDivElement
  todo.className = "todo";
  const checkBox: HTMLInputElement = document.createElement("input")
  checkBox.setAttribute("type", "checkbox");
  checkBox.className="isCompleted"
  checkBox.checked = isCompleted;
  checkBox.onchange=()=>{

    todos.find(item => {
      if(item.id===id) item.isCompleted=checkBox.checked
    })
    paragraph.className = checkBox.checked?"textcut": "" ;
  }

  const paragraph: HTMLParagraphElement = document.createElement("p");
  paragraph.innerText = title;
  paragraph.className = checkBox.checked?"textcut": "" ;


  const btn: HTMLButtonElement = document.createElement("button")
  btn.innerText = "X";
  btn.className = "deleteBtn";
  btn.onclick = () => {
    deleteTodo(id)
  }

  todo.append(checkBox, paragraph, btn)

  todosContainer.append(todo)
}

const deleteTodo = (id: string) => {
  const idx = todos.findIndex(item => item.id===id);

  todos.splice(idx,1);
  renderTodo(todos)
}

const renderTodo = (todos: Todo[])=> {
  todosContainer.innerText = " ";
  todos.forEach(item => {
    generateTodoItem(item.title, item.isCompleted, item.id)
  })
}