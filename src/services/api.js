import axios from "axios";


export const api = axios.create({
    baseURL: "http://localhost:3333" // pegando o url da API // aqui vamos reutizilar a api para não ficar escrevendo localhost toda vez
});

