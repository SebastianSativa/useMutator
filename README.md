# 🧬 useMutator 🧬
So you want to _reduce_ time spent writing reducer code, eh?
Say hello to your friendly neighbourhood useReducer wrapper - useMutator 🦸 - that lets you do just that and more:

- Lends itself to auto-completion 🤖 
- Automatically merges your state changes, but can just as easily overwrite the existing state, with the flip of a switch 💡
- Works with simple mutator _functions_ instead of ugly _strings of actions_ and cumbersome _switch statements_ 😵
- Mutator functions can return objects OR functions that get enriched with state, that then return objects - YOU decide what you need! 🎯

Now you too, can reduce with minimal boilerplate and with minimal dependencies - thanks to just a few extra lines of code ⚡🎉

Simply ```yarn add useMutator``` or ```npm i useMutator``` to get started 😎

## Easy as 3, 2, 1! 🏎️💨 ###

```
import useMutator from 'useMutator'
...
const MyShinyForm = () => {
    const { state, mutate } = useMutator(MyShinyForm.initialState)
    const onFormFieldChange = (e) => mutate(MyShinyForm.mutators.FORM_INPUT(e.target.name, e.target.value))
    return <input type="text" name="full_name" value={state.full_name} onChange={onFormFieldChange} />
}
...
MyShinyForm.mutators = {
    FORM_INPUT: (name, value) => ({ [name]: value }),
}
MyShinyForm.initialState = {}
```

## How it works
First you run the useMutator hook with an initial state, which gives you an object with __state__ and __mutate__. Unless you've been living under a rock you already know __state__, but __mutate__ is the magic sauce:
`mutate(mutation: Object|function(any) => Object, replace=false)`
__mutate__ is by itself just a function, which takes two arguments: first argument is either an object or a function that returns an object. This is the __mutation__ to apply. The second argument is __replace__ - this is simply a boolean which by default is off. If you manually switch it to true, you force mutate to swap out the current state with your mutation.

## Advanced usage 🧠✨ ##
```
import useMutator from 'useMutator'

const MyTodo = ({ children, done, ...props }) => <li {...props} style={{ textDecoration: done ? 'line-through' : null }}>{children}</li>

const Todos = () => {
    const { state, mutate } = useMutator(Todos.initialState)
    const onFormInputChange = (e) => mutate(Todos.mutators.FORM_INPUT(e.target.name, e.target.value))
    return (
        <>
            <h1>ToDo:</h1>
            <ul>
                {state.todos.map((todo, index) => (
                    <>
                        <MyTodo key={index} done={todo.done}>
                            <input type="checkbox" checked={todo.done} onChange={() => mutate((state) => Todos.mutators.TOGGLE_TODO_DONE(state, index))} />&nbsp;
                            {todo.todoText}&nbsp;
                            <button type="button" onClick={() => mutate((state) => Todos.mutators.REMOVE_TODO(state, index))}>Remove</button>
                        </MyTodo>
                    </>
                ))}
            </ul>
            <form onSubmit={(e) => {e.preventDefault(); mutate((state) => Todos.mutators.ADD_TODO(state, state.new_todo_text))}}>
                <label>
                    Add todo: <input type="text" name="new_todo_text" value={state.new_todo_text} onChange={onFormInputChange} />
                    <button type="button" onClick={() => mutate((state) => Todos.mutators.ADD_TODO(state, state.new_todo_text))}>Add</button>
                </label>
            </form>
        </>
    )
}
Todos.initialState = {
    todos: [],
}
Todos.mutators = {
    ADD_TODO: (state, todoText) => {
        const todos = todoText ? [ ...state.todos, { todoText } ] : state.todos
        return { todos, new_todo_text: '' }
    },
    REMOVE_TODO: (state, index) => {
        state.todos.splice(index, 1)
        return state
    },
    TOGGLE_TODO_DONE: (state, index) => {
        state.todos[index].done = !state.todos[index].done
        return state
    },
    FORM_INPUT: (name, value) => ({ [name]: value }),
}
```