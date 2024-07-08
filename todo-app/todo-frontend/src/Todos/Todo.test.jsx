import { render, screen } from '@testing-library/react'
import Todo from './Todo'


describe('Renders Todo' ,() => {
  const todo = {
    text: 'I am a thing you should do but are avoiding doing!',
    done: false
  }

  test('shows todo text', () => {
    render(<Todo todo={todo} />)

    screen.getByText(todo.text)
  })

  test('shows that todo isn\'t done', () => {
    render(<Todo todo={todo} />)

    const element = screen.getByText('This todo is not done')
    expect(element).toBeDefined()
  })
})