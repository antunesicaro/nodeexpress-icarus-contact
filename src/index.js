const express = require('express');
require('express-async-errors');

const cors = require('./app/middlewares/cors')
const errorHandler = require('./app/middlewares/errorHandler')
const routes = require('./routes');

const app = express();


app.use(express.json());//precisa pra fazer o bodyparser

//midleware precisa estar antes das rotas, pois é o cors que vai estar permitindo o acesso de coltrole de origem difrente...
//primeiro define o header no objeto de resposta e depois vai cair dentro do controller
 //dentro da resposta da request, defino um novo header
//CORS: cross origin resoruce sharing, compartilhamento de recursos entre origens cruzadas
//no backend, vamo ter q criar um header q diz "olha, se a entrada for direfente, pode dar acesso"... temos q definir com acess control allow origin, passando a origem q desejamos permitir... como se tivesse dizendo pra aplicação.. olha, eu sei q não tá em SOP, porém quero permitir essa origem aqui... e diz qual a origem, que no caso é a url como visto acima... se a requisicao estiver saindo de localhost:3000 q é o front, eu acredito q é confiante... conhecer a origem... todos ajustes sao no back
//seta um novo header dentro da resposta q vai ser dada para a requisição permitindo como argumento o acesso 
//obs: usa wildcard se quiser q todos tenham acesso e nao apenas alguns como setado acima... coloca um * no acess de segundo parametro... geralmente usao curinga pra api publica em q todos tenham acesso
 app.use(cors)   

   

app.use(routes);

//midleware com 4 argumentos é error handler, manipulador de erros... precisa estar depois das rotas.... se for usar async, lembrar de dar o yarn add express-async-erross para conseguir ler erros assicncrronos.
app.use(errorHandler);

app.listen(3001, () => console.log('Server started at http://localhost:3001')); //porta 3001 pois 3000 é usada pelo react geralemnte
