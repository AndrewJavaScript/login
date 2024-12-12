import mongoose from 'mongoose';
import express from 'express';
import router from './routes.ts';

const app = express();

mongoose.connect('mongodb://admin:admin@127.0.0.1:27017/')
  .then(() => console.log('Connected!'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(express.json());

app.use(router);

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);
