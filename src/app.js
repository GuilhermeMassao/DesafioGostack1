const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
//{ id: "uuid", title: 'Desafio Node.js', url: 'http://github.com/...', techs: ["Node.js", "..."], likes: 0 }

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const id = uuid();
  const requestBody = request.body;
  const {title, url, techs} = requestBody;
  const repository = {id: id, title: title, url: url, techs: techs, likes: 0};
  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const {title, url, techs} = request.body;
  const repIndex = repositories.findIndex(rep=>rep.id == id);

  if(repIndex<0){
    return response.status(400).json({error: 'repositorio não encontrado.'});
  }else{
    let repository =  repositories[repIndex];
    repository.title = title;
    repository.url = url;
    repository.techs = techs;
    return response.json(repository)
  }
  
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const repIndex = repositories.findIndex(rep=>rep.id == id);

  if(repIndex<0){
    return response.status(400).json({error: 'repositorio não encontrado.'});
  }else{
    repositories.splice(repIndex,1);
    return response.status(204).send();
  }

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;
  const repIndex = repositories.findIndex(rep=>rep.id == id);

  if(repIndex<0){
    return response.status(400).json({error: 'repositorio não encontrado.'});
  }else{
    let repository =  repositories[repIndex];
    repository.likes++;
    return response.json(repository);
  }
});

module.exports = app;
