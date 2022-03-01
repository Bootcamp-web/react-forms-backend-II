import axios from 'axios';

const apiBaseURL = 'http://localhost:3000';

const api = axios.create({ baseURL: apiBaseURL });

export const getIngredients = async () => {
    const res = await api.get('/ingredients');
    return res.data;
};

export const addIngredient = async (data)=>{
  const res = await api.post('/ingredients',data)
  return res.data
}

export const deleteIngredient = async (ingid)=>{
  const res = await api.get(`/ingredients/${ingid}/delete`)
  return res.data
}

