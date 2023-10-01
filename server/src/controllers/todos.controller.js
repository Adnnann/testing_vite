
import Todo from '../models/todo.model.js'
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find()
        res.status(200).json(todos)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}



const addTodo = async (req, res) => {
console.log(req.body)

    const { todo } = req.body
    console.log(todo)

    const newTodo = new Todo({
        todo: todo,
        done: false,
        editThisTodo: false
    })
    console.log(newTodo)
    try {
        await newTodo.save()
        res.status(201).json(newTodo)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

const getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)
        res.status(200).json(todo)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const removeTodo = async (req, res) => {
    try{
        await Todo.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "Todo deleted"})
    }catch(error){  
        res.status(404).json({message: error.message})
    }
}

export default { getTodos, addTodo, getTodoById, removeTodo };