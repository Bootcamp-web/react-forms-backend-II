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

~~~