const ContactsRepository = require('../repositories/ContactsRepository');
const isValidUUID = require('../utils/isValidUUID')


class ContactController
 {

  async index(request,response){
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);

   
    response.json(contacts); //toda vez que dá um .json, o express já tem por baixo dos panos alguns headers como é o caso do content-type, caso n tivesse teriamos q por antes o setHeader assim como no cors ....
  }

  async show(request,response){
    //backend precisa ser resiliente, isto é, tratar ,por exemplo, se o client vai mandar pra cá um uuid válido, por exemplo

    if(!isValidUUID){//dentro do request params n tá válido, tá false esse uuid
      return response.status(400).json({error: 'Invalid user id'})
    }

    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if(!contact){
      return response.status(404).json({ error: 'User not found'});
    }

    //else
    return response.json(contact);

  }

  async store(request,response){

    const { name,email,phone,category_id } = request.body;

    if(!name){
      return response.status(400).json({ error : 'Nome obrigatóried plis' });
    }

    if(category_id && !isValidUUID(category_id)){//dentro do request params n tá válido, tá false esse uuid, primeiro veririfico se o usuáriuo mandou um categoryid... aqui só entra no if se for true o valor de category, ou seja, valores direfeentes de : false, nan, undefnid, '',stringvvazia
      return response.status(400).json({error: 'Invalid category'})
    }

    //checar o emmail, pois quando manda sting vazia, não preenche com null ainda o email, dai fica existrente um email com string vazia pra um usuário, se eu for cadastrar outro usuario com string vazia vai dar erro de email ja em uso, q é o email string vazia, logo, vamos ajeitar isso aqui
    if(email){ //se existir um email, isto é, for true o valor de email, ai sim faz a validação
      const contactExists = await ContactsRepository.findByEmail(email);
      if(contactExists){
        return response.status(400).json({ error : 'Email already been usado' });
      }
    }

  

    //else
    const contact = await ContactsRepository.create(
      {name,email:email || null,phone,category_id: category_id || null,} //faço a verificação para que se category_id for false, preencha com o valor de nulo, assim, mesmo quando mandar string vazia, que é false, não entra no bloco do if pra validar o uuid porém eu preencho com null e nao dou erro de servidor na aplicação
    );

    response.status(201).json(contact);
  }

 async update(request,response){
    const { id } = request.params;
    const { name,email,phone,category_id, } = request.body;

    if(!isValidUUID){//dentro do request params n tá válido, tá false esse uuid,verifico se o uuid é válido
      return response.status(400).json({error: 'Invalid user id'})
    }

    if(category_id && !isValidUUID(category_id)){//dentro do request params n tá válido, tá false esse uuid, primeiro veririfico se o usuáriuo mandou um categoryid... aqui só entra no if se for true o valor de category, ou seja, valores direfeentes de : false, nan, undefnid, '',stringvvazia
      return response.status(400).json({error: 'Invalid category'})
    }

    if(!name){
      return response.status(400).json({ error : 'Nome obrigatóried plis' });
    }

    const contactExists = await ContactsRepository.findById(id);

    if(!contactExists){
      return response.status(404).json({error: 'User não encontrado'});
    }

    if(email){ //explicado no store, mesma coisa de lá
      const contactByEmail = await ContactsRepository.findByEmail(email);
      if(contactByEmail && contactByEmail.id !== id){
        return response.status(400).json({error:'email já em uso if'});
      }
    }
 

    const contact = await ContactsRepository.update(id,{
      name,email:email || null,phone,category_id:category_id || null,
    });

    response.json(contact);

  }

  async delete(request,response){

    const { id } = request.params;

    if(!isValidUUID){//dentro do request params n tá válido, tá false esse uuid.. garanto q o uuid será válido, se n for , retorna erro de uuid invalido
      return response.status(400).json({error: 'Invalid user id'})
    }
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
