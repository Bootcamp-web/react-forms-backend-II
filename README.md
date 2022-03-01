# React-forms-backend-II

0. [Viene de proyectos anteriores](#schema0)
1. [Inicializamos NPM con instalamos paquetes necesarios y ejecutamos tsc](#schema1)
1. [# 2 Modificamos estructura del proyecto y generamos node_modules para la parte general del proyecto.](#schema2)
1. [ # 3 Modificamos lerna](#schema3)
1. [ # 4 Configuramos `api`](#schema4)
1. [ # 5 Creamos el `server.ts`, `config.ts` y `main_routers.ts`](#schema5)
1. [ Modificamos `FullRecipe.tsx` para dejar solo el componente y ponemos la lógica en el contexto.](#schema6)
1. [ Crearmos `ShoppingListManager` en `useIngredients.tsx` ](#schema7)
1. [ Le ponemos estilos a `App.tsx`](#schema8)


<hr>

<a name="schema0"></a>

# 0 Viene de proyectos anteriores

https://github.com/Bootcamp-web/react-forms-backend-I


<hr>

<a name="schema1"></a>


# 1 Inicializamos NPM con instalamos paquetes necesarios y ejecutamos tsc
~~~
npm install
~~~
~~~
tsc --init
~~~
~~~
npm init @eslint/config
~~~


# 2 Creamos método post para añadir más ingredientes a la BBDD
- Modificamos `api.ts` añadimos `addIngredient`
~~~ts
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
~~~
- modificamos `ingredients_routers.ts`
Personalizamos el `Myrequest` para poder recibir `name`y `quantity`
~~~ts
import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { Ingredient } from '../models/Ingredient.model';


type Myrequest = FastifyRequest<{
  Body: {name: string, quantity: string};
  Params: {id: string}
}>


export const ingredients_router: FastifyPluginAsync = async (app) => {
  app.get('/', async () => {

      const ingredients = await Ingredient.find().lean();
      return ingredients;
      
    });
    app.post('/', async (request:Myrequest, reply:FastifyReply) => {
      const {name,quantity}= request.body
      const ingredient = new Ingredient({name,quantity})
      await ingredient.save()
      return ingredient;
      
    });
};
~~~
- modificamos `ShoppingList.ts`
~~~ts
import React, { useEffect } from 'react';
import {Item} from './Item'
import {InputItem} from './InputItem'
import { useIngredient } from '../lib/useIngredients';
import { addIngredient, getIngredients } from '../lib/api';

export const ShoppingList = ()=>{
 
    const { addItem , ingredients } =useIngredient();
    useEffect(()=>{
        console.log("get ingredientes api")
        getIngredients().then((ingredient)=>{
            ingredient.forEach((ing)=>addItem(ing));
        });
    },[])

    const saveOnServer = async (ingredientFormData: any) => {
        const ing = await addIngredient(ingredientFormData);
        addItem(ing);
      };

    return(

        <div>
            {ingredients.map((it)=><Item  key={it._id} item={it}/>)}
            <div>
                <InputItem onAddItem={saveOnServer}/>
            </div>      
        </div>
    )
}
~~~

# 3 Instalamos en el front React hook form
~~~
npm install react-hook-form
~~~

Ahora hacemos limpieza en `InputItem.tsx`
~~~tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const ErrorMessageText = styled.p`
margin:0;
color:red
`;
export const InputItem = ({ onAddItem })=>{
    
    const [item, setItem] = useState({name:'', quantity:1})

    const handleAddItem =()=>{
      onAddItem(item); 
      setItem({ name: '', quantity: 1 });
         
    }


    const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting },
     
    } = useForm(
      {
        defaultValues: { name: '', quantity: 1 },
      },
    );

    const submit = handleSubmit((data)=>{
      console.log(data)
      reset()
    })
    console.log('errors',errors)
    return(
      <div>
        <input placeholder='Ingredient' {...register('name', { required: 'Add an ingrendient' })}/>
        <input placeholder='Quantity'{...register('quantity', { required: 'Add an quantity' })}/>
        <button  onClick={ submit} type='button'>Add Item</button>
      </div>
    )
}
~~~

- Creamos componente error dentro de  `InputItem.tsx`
~~~tsx
const ErrorMessageText = styled.p`
margin:0;
color:red
`;

const Error = ({ field, errors }) => {
  if (errors[field]) {
    return <ErrorMessageText>{errors[field].message}</ErrorMessageText>;
  }
  return <></>;
};

export const InputItem = ({ onAddItem })=>{
    
    const [item, setItem] = useState({name:'', quantity:1})

    const handleAddItem =()=>{
      onAddItem(item); 
      setItem({ name: '', quantity: 1 });
         
    }


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    
  } = useForm(
    {
      defaultValues: { name: '', quantity: 1 },
    },
  );

  const submit = handleSubmit((data)=>{
   
    reset()
  })
  
  return(
    <div>
      <input placeholder='Ingredient' {...register('name', { required: 'Add an ingrendient' })}/>
      <Error field="name" errors={errors}></Error>
      <input placeholder='Quantity'{...register('quantity', { required: 'Add an quantity' })}/>
      <Error field="quantity" errors={errors}></Error>
      <button  onClick={ submit} type='button'>Add Item</button>
    </div>
  )
}
~~~
