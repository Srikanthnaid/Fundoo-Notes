import { error } from 'winston';
import User from '../models/user.model';

//register new user
export const register = async (body) => {
const data = await User.create(body);
return data;
};

// user login
export const login = async (body) => {
  const data = await User.findOne({ email: body.email });
  if (data != null) {
    if (body.password == data.password) {
      return data;
    }
    else {
      throw new Error("Invalid Password");
    }
  }
  else {
    throw new Error("Invalid Email");
  }
};