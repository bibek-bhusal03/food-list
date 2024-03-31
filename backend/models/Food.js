// models/Food.js
import { Schema, model } from 'mongoose';

const foodSchema = new Schema({
  name: String,
  calories: Number,
  category: String,
});

const Food = model('Food', foodSchema);

export default Food;
