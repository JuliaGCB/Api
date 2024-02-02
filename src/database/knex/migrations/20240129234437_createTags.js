exports.up = knex => knex.schema.createTable("tags", table =>{
    table.increments("id");
    table.text("name").notNullable();  // não aceita nulo
    
    table.integer("user_id").references("id").inTable("users"); //integer = guardar numero // o user_id faz uma referencia com o id que está dentro da tabela users
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE"); // se eu deletar a nota que essa tag esta vinculada, automaticamente a tag será excluida.

 
}); //criando a tabela no banco de dados 
  

exports.down = knex => knex.schema.dropTable("tags");// deletando a tabela no banco de dados
