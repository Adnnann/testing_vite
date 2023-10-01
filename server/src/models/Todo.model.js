
import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        required: true,
        default: false
    },
    editTodo: {
        type: Boolean,
        required: true,
        default: false
    },
});

const Todo = mongoose.model('Todo', TodoSchema);
export default Todo;