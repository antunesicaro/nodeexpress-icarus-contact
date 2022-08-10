const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController
 {

  async index(request,response){
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);

   
    response.json(contacts);
  }

  async show(request,response){
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if(!contact){
      return response.status(404).json({ error: 'User not found'});
    }

    //else
    response.json(contact);

  }

  async store(request,response){

    const { name,email,phone,category_id } = request.body;

    if(!name){
      return response.status(400).json({ error : 'Nome obrigatóried plis' });
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if(contactExists){
      return response.status(400).json({ error : 'Email already been usado' });
    }

    //else
    const contact = await ContactsRepository.create(
      {name,email,phone,category_id,}
    );

    response.json(contact);
  }

 async update(request,response){
    const { id } = request.params;
    const { name,email,phone,category_id, } = request.body;


    const contactExists = await ContactsRepository.findById(id);

    if(!contactExists){
      return response.status(404).json({error: 'User não encontrado'});
    }

    if(!name){
      return response.status(400).json({ error : 'Nome obrigatóried plis' });
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);

    if(contactByEmail && contactByEmail.id !== id){
      return response.status(400).json({error:'email já em uso if'});
    }

    const contact = await ContactsRepository.update(id,{
      name,email,phone,category_id,
    });

    response.json(contact);

  }

  async delete(request,response){

    const { id } = request.params;
    /* 
    const contact = await ContactsRepository.findById(id);

    if(!contact){
      return response.status(404).json({ error: 'User not found'});
    }
    */

    //else
    await ContactsRepository.delete(id);


    response.sendStatus(204);
  }


}

module.exports = new ContactController();
