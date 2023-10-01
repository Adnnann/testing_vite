
import Todo from '../models/todo.model.js'
import mongoose from 'mongoose'
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find()
        res.status(200).json(todos)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}



const addTodo = async (req, res) => {

    const { todo } = req.body
    console.log(todo)

    const newTodo = new Todo({
        todo: todo,
        done: false,
        editThisTodo: false
    })

    try {
        await newTodo.save()
        res.status(201).json(newTodo)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

const getTodoById = (req, res, next, id) => { 
   
        Todo.findById(id).exec((err, todo) => {
            console.log('todo', todo)
            if (err) {
                res.status(404).json({ message: err.message })
            } else {
                res.todo = todo
                next()
            }
        })   
}

const removeTodo = async (req, res) => {
    try{
        await Todo.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "Todo deleted"})
    }catch(error){  
        res.status(404).json({message: error.message})
    }
}

const updateTodo = (req, res) => {
    const { id } = req.params
    console.log(req.params)
    const { todo, done, editTodo } = req.body
    console.log('edit toso', req.body)
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No todo with id: ${id}`)

    const updatedTodo = { id, todo, done, editTodo }

    console.log('updated todo', updatedTodo)

    Todo.findByIdAndUpdate(id, updatedTodo,(err, result) => {
        if(err){
            res.status(404).json({message: err.message})
        }else{
            res.status(200).json({message: "Todo updated"})
        }
    })

    
}

export default { getTodos, addTodo, getTodoById, removeTodo, updateTodo };