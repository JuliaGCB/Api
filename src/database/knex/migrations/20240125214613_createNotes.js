exports.up = knex => knex.schema.createTable("notes", table =>{
    table.increments("id");
    table.text("title");
    table.text("description");
    table.integer("user_id").references("id").inTable("users"); //integer = guardar numero // o user_id faz uma referencia com o id que está dentro da tabela users

    table.timestamp("created_at").default(knex.fn.now());// fn = função
    table.timestamp("updated_at").default(knex.fn.now());

    
}); //criando a tabela no banco de dados 
  

exports.down = knex => knex.schema.dropTable("notes");// deletando a tabela no banco de dados
