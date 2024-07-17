const knex = require("../database/knex");

class NotesController{
    async create(request, response){
        const {title, description, tags, links} = request.body;
        const user_id = request.user.id;

        const [note_id] = await knex("notes").insert({ // Usando para cadastrar o id da nota
            title,
            description,
            user_id
        });

        const linksInsert = links.map(link => { //Para cada link eu vou retornar o id da nota e a url 
            return {
                note_id,
                url: link
            }
        });

        await knex("links").insert(linksInsert);


        const tagsInsert = tags.map(name => { //Para cada tag vou retornar um id, nome e o id do usuario
            return{
                note_id,
                name,
                user_id
            }
        });

        await knex("tags").insert(tagsInsert);

         return response.json();

    }

    async show(request, response) { //criando uma estrutura para ver a nota
        const {id} = request.params;

        const note = await knex("notes").where({id}).first(); //mostrando os dados da nossa nota com o id
        const tags = await knex("tags").where({note_id: id}).orderBy("name"); // puxando as tags por ordem alfabetica
        const links = await knex("links").where({note_id: id}).orderBy("created_at"); // puxando os links por ordem alfabetica


        return response.json({
            ...note,
            tags, // o jeito que deve se retornar// ... é para mostrar as coisas antes tbm
            links
        });

    }

    async delete(request, response){ //deletando a nota
        const { id } = request.params; //puzando pelo id

        await knex("notes").where({ id }).delete();
        
        return response.json();
    }

    async index(request, response){  // Listando as notas do usuário
        const {title, tags} = request.query;

        const user_id = request.user.id;

        let notes;

        if(tags){

            const filterTags = tags.split(',').map(tag => tag.trim()); // Vetor

            notes = await knex("tags")
            .select([ //Para fazer a conexão com outra tabela
                "notes.id",
                "notes.title",
                "notes.user_id",
            ])
            .where("notes.user_id", user_id)
            .whereLike("notes.title", `%${title}%`)
            .whereIn("name", filterTags)
            .innerJoin("notes", "notes.id", "tags.note_id")
            .groupBy("notes.id")
            .orderBy("notes.title")
           

        }else{
            notes = await knex("notes")
            .where({ user_id })
            .whereLike("title", `%${title}%`) //%% verifcar antes e depois // Valores aproximados
            .orderBy("title");
        }

        const userTags = await knex("tags").where({ user_id });
        const notesWithTags = notes.map(note => {
            const noteTags = userTags.filter (tag => tag.note_id === note.id);

            return{
                ...note,
                tags: noteTags
            }
        })

        return response.json(notesWithTags);
    }
}

module.exports = NotesController;