import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import todoRouter from './routers/todo-router';

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json({limit: '30mb'}));

app.use(express.urlencoded({limit: '30mb' , extended: true}));

app.use(cors());

app.use('/todo' ,todoRouter);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(()=>{
    app.listen(PORT, ()=>{
      console.log(`Server is running on http://localhost:${PORT}`);
    })
  })
  .catch((error) => {
    console.log(error.message);
  });
mongoose.set('useFindAndModify' , false)