import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {

  return (
    <div>
      {todos.map(todo => {
        return (
          <Todo
            key={todo._id}
            todo={todo}
            onClickComplete={() => completeTodo(todo)}
            onClickDelete={() => deleteTodo(todo)}
          />
        )
      })}
    </div>
  )
}

export default TodoList
