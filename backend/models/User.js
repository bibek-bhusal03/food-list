import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  firstName: String,
  lastname: String,
  username: String,
  email: String,
  password: String, // Password will be stored as a hash
  image: String ,
  NutritionistData:{
    bmi: { type: Number, default: null },
    bee: { type: Number, default: null },
  }
});

const User = model('User', userSchema);

export default User;