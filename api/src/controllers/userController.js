import { createUser, listUsers, loginUser, getExpenses, listContacts, addContact, dashBoardData } from '../services/userService.js';

export const register = async (req, res) => {
  try {
    console.dir(req.body);
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const list = async (req, res) => {
  try {
    const users = await listUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const login = async (req, res) => {
  try {
    const {token, userId, name} = await loginUser(req.body);
    res.status(200).json({ "id": userId, "token": token, "name": name });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const expenses = async (req, res) => {
  try {
    const user = await getExpenses(req.params.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const logout = async (req, res) => {
  res.clearCookie('Bearer');
  res.status(200).json({ message: 'Logged out' });
}

export const contacts = async (req, res) => {
  try {
    const user = await listContacts({userId: req.params.userId});
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const newContact = async (req, res) => {
  try {
    const contact = await addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const dashboardData = async (req, res) => {
  try {
    const data = await dashBoardData({userId: req.params.userId});
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
