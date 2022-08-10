const CategoriesRepository = require('../repositories/CategoriesRepository')

class CategoryController{

     async index(request, response){
       const categories = await CategoriesRepository.findAll();

       response.json(categories);
    }

    async show(request,response){
        const { id } = request.params;
    
        const category = await CategoriesRepository.findById(id);
    
        if(!category){
          return response.status(404).json({ error: 'Category not found'});
        }
    
        //else
        response.json(category);
    
      }

    async store(request, response){
       const {name} = request.body;

       if(!name){
           return response.status(400).json({error: 'Name is required'});
       }

       const category = await CategoriesRepository.create({name});

       response.json(category);
    }

    update(request, response){
        response.send('ok store');
    }

   async delete(request, response){
        const { id } = request.params;
    
    
        //else
        await CategoriesRepository.delete(id);
    
    
        response.sendStatus(204);
    }

    async update(request,response){
        const { id } = request.params;
        const { category_id,name } = request.body;
       
    
    
        const categoryExists = await CategoriesRepository.findById(id);
    
        if(!categoryExists){
          return response.status(404).json({error: 'Categoria not encontrada '});
        }
    
        if(!name){
          return response.status(400).json({ error : 'Nome obrigatóried plis' });
        }
    
        /*
        const contactByEmail = await ContactsRepository.findByEmail(email);
    
        if(contactByEmail && contactByEmail.id !== id){
          return response.status(400).json({error:'email já em uso'});
        }
        */
    
        const category = await CategoriesRepository.update(id,{
          name
        });
    
        response.json(category);
    
      }


}

module.exports = new CategoryController();