const res = require('express/lib/response');
const { Client } = require('pg');
const { port } = require('pg/lib/defaults');

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'root',
    password: 'root',
    database: 'mycontacts'
});

client.connect();

exports.query = async (query,values) => {
    const result = await client.query(query,values);
    return result.rows;

}

//Query('SELECT * FROM contacts').then(result => console.log(result));


