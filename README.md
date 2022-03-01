# React-forms-backend-II

0. [Viene de proyectos anteriores](#schema0)
1. [Inicializamos NPM con instalamos paquetes necesarios y ejecutamos tsc](#schema1)
1. [Modificamos estructura del proyecto y generamos node_modules para la parte general del proyecto.](#schema2)
1. [Instalamos en el front React hook form](#schema3)



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

<hr>

<a name="schema2"></a>

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

<hr>

<a name="schema2"></a>


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

# 5 LoadingSpinner
- Instalar
~~~
npm install @mui/material @emotion/react @emotion/styled
~~~
~~~ts
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';
import cx from 'classnames';
import propTypes from 'prop-types';

const LoadingOverlay = styled.div`
	position: absolute;
	flex-direction: column;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(255, 255, 255, 0.8);
	backdrop-filter: blur(2px);
	&.activado {
		opacity: 1;
		pointer-events: auto;
	}
`;

export const LoadingSpiner = ({
  children,
  isLoading,
  loadingText = 'Loading',
}) => (
  <div style={{ position: 'relative', display: 'inline-block' }}>
 
    {isLoading && (
    <LoadingOverlay className={cx({ activado: isLoading })}>
      {loadingText}
      <div style={{ paddingBottom: 15 }} />
      <CircularProgress />
    </LoadingOverlay>
    )}
    <div>{children}</div>
  </div>
);

// Valores por defecto del componente
LoadingSpiner.defaultProps = {
  isLoading: false,
  children: undefined,
  loadingText: '',
};

// node: componente de react
LoadingSpiner.propTypes = {
  isLoading: propTypes.bool,
  children: propTypes.node,
  loadingText: propTypes.string,
};
~~~
- Añadir el spinner en `InputItem`
~~~tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { LoadingSpiner } from './LoadingSpinner';

const FormFlex = styled.div`
display:flex
`;
const FormElement = styled.div`
display:flex;
flex-direction: colum;
margin:5px;
`;

const ErrorMessageText = styled.p`
margin:0;
color:red
`;


const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Error = ({ field, errors }) => {
  if (errors[field]) {
    return <ErrorMessageText>{errors[field].message}</ErrorMessageText>;
  }
  return <></>;
};

export const InputItem = ({ onAddItem }) => {

  const [item, setItem] = useState({ name: 'apples', quantity: 1 });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm(
    {
      defaultValues: { name: '', quantity: 1 },
    },
  );

  const submit = handleSubmit(async (data) => {
    await timeout(2000);
    await onAddItem(data);
    reset();
  });
  const internalState = watch(); 

  return (
    <div>
      <LoadingSpiner isLoading={isSubmitting}>
        <div style={{ padding: '20px' }}>
          <FormFlex>
            <FormElement>
              <input placeholder="Ingredient" {...register('name', { required: 'Add an ingrendient' })} />
              <Error field="name" errors={errors} />
            </FormElement>
            <FormElement>
              <input placeholder="" {...register('quantity', { required: 'Add quantity' })} />
              <Error field="quantity" errors={errors} />
            </FormElement>
            <FormElement>
              <button onClick={submit} type="button">Add item</button>
            </FormElement>
          </FormFlex>
        </div>
      </LoadingSpiner>
    </div>
  );
};
~~~

# 6 Borrado de elementos
- Modificamos `Item.tsx`
~~~tsx
import React from 'react';
import styled from 'styled-components';
import { useIngredient } from '../lib/useIngredients';

const ItemWrap = styled.div`
padding: 5px;
border: 1px solid red;
margin: 5px;
display: flex;
justify-content: space-between;
`;

export const Item = ({ item: { _id, name, quantity } }) => {
  const { removeIngredient } = useIngredient();
  const handleDelete = () => {
    console.log(`delete ${_id}`);
    removeIngredient(_id);
  };
  return (
    <ItemWrap>
      <div>
        {' '}
        {name}
        {' '}
        x
        {' '}
        {quantity}
      </div>
      <div>
        <a href="#" onClick={(handleDelete)}>Delete</a>
      </div>
    </ItemWrap>
  );
};
~~~
- Modficamos `api.ts`
~~~tsx
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

~~~
- Modificamos `ingredients_routers.ts`
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
  app.get('/:id/delete', async (request:Myrequest, reply:FastifyReply) => {

    const {id} = request.params;
    await Ingredient.findByIdAndDelete(id)
    return {status: 'delete'}
    
  });
};


~~~
- Modificamos `useIngredients.tsx`
~~~tsx

~~~
