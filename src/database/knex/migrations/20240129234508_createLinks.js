exports.up = knex => knex.schema.createTable("Links", table =>{
    table.increments("id");
    table.text("url").notNullable();  // não aceita nulo
    
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE"); // se eu deletar a nota que esse link esta vinculado, automaticamente os links será excluido.
    table.timestamp("created_at").default(knex.fn.now());  
 
}); //criando a tabela no banco de dados 
  

exports.down = knex => knex.schema.dropTable("Links");// deletando a tabela no banco de dados
