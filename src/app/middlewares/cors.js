module.exports = (request,response,next) => { //toda requisição do backend vai passar antes por esse midleware para definir um header, ai sim vai cair no controller e reoslver a rota de fato
    response.setHeader('Access-Control-Allow-Origin','http://localhost:3000');  //valor q será permitido é a origem q está fazendo as requisições pra mim, q no caso é o front
    response.setHeader('Access-Control-Allow-Methods','*'); //liberar o acesso dos metedos post,get,options,delete... se for só get deixa só um argumento de get, ou bota separado por virgula quais eu quiser,inclusive o curing wildcard *
    response.setHeader('Access-Control-Allow-Headers','*'); //liberar header 
    response.setHeader('Access-Control-Max-Age','10')//botar cache para não ter q ficar requisitando toda vez o preflight, ou seja, mantem por um tempo o allow methods e o allow headers... se eu nao quiser cache, bota -1, toda vez vai fazer
    next(); //pula pro próximo middleware
};
