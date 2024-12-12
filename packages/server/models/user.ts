import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now
  },
});

//const UserModel = mongoose.model('User', userSchema);

export default mongoose.model('user', userSchema);