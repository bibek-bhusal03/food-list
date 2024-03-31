import { Schema, model } from 'mongoose';

const nutritionistSchema = new Schema({
  firstName: String,
  lastname: String,
  username: String,
  email: String,
  password: String,
  image: String ,
});

const Nutritionist = model('Nutritionist', nutritionistSchema);

export default Nutritionist;