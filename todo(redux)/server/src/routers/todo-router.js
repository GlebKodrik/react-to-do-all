import { Router } from 'express';
import Todo from '../models/Todo';

const todoRouter = Router();

todoRouter.get('/', async(req, res) =>{
  const todo = await Todo.find({});
  res.send(todo);
});

todoRouter.post('/', async(req, res) =>{
  const todo = new Todo(req.body);
  await todo.save((err) => {
    if(err){
      res.status(400).send('Ошибка');
      return;
    }
  });
  res.send(todo);
});

todoRouter.delete('/:id' , async(req, res) =>{
  let number = req.params.id;
  await Todo.findOneAndRemove({_id: number},((err) => {
    if(err){
      console.log(err);
      return res.status(500).send();
    }
    return res.status(200).send();
  }));
});

todoRouter.put('/:id' , async(req, res) =>{
  let number = req.params.id;
  await Todo.findByIdAndUpdate({_id: number}, req.body , ((err) => {
    if(err){
      return res.status(500).send();
    }
    return res.status(200).send();
  }));
});

export default todoRouter;