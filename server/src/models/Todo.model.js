
import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        required: true,
    },
    editThisTodo: {
        type: Boolean,
        required: true,
    },
});

const Todo = mongoose.model('Todo', TodoSchema);
export default Todo;