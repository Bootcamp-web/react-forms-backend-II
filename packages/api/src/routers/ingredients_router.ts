
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

