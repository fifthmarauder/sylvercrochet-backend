const users = []; // temporary (replace with DB later)

export const getAllUsers = async () => {
  return users;
};

export const createAllUsers = async (data) => {
  users.push(data);
  return data;
};

export default {
  getAllUsers,
  createAllUsers,
};
