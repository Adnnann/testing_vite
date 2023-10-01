import express  from "express";
import todosController from "../controllers/todos.controller";


const router = express.Router();

router.get('/api/todos', todosController.getTodos);

router.post('/api/todos', todosController.addTodo);

router.delete('/api/todos/:id', todosController.removeTodo);

export default router;