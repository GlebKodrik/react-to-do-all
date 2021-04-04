import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  title: String,
  checker: Boolean,
  date: String,
  created: {
    type: Date,
    default: Date.now(),
  },
});

const Todo = mongoose.model('Todo' , schema);

export default Todo;
