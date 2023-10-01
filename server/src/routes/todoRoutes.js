import express  from "express";
import todosController from "../controllers/todos.controller";


const router = express.Router();

router.get('/api/todos', todosController.getTodos);

router.post('/api/todos', todosController.addTodo);

router.delete('/api/todos/:id', todosController.removeTodo);

router.patch('/api/todos/:id', todosController.updateTodo);

router.param('id', todosController.getTodoById)

export default router;