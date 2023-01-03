const { response } = require('express');
const express = require('express');
const { request } = require('http');

const app = express();
const PORT = 3000;

let heroes = [];
let quests = [];

//NEEDED TO SEND RESPONSE
app.use(express.json());
app.use(express.urlencoded());

app.listen(PORT, () => console.log('Running Express Server on Port ${PORT}!'));

//GET WEBSITE
app.get('/heroes', (request, response) => {

    response.send(200);

});

//IF THERE IS AN ERROR
app.use((error, request, response, next) => {
    console.log("Error Handling Middleware called")
    console.log('Path: ', request.path)
    console.error('Error: ', error)

    if (error.type == 'redirect')
        response.redirect('/error')

    else (error.type == 'time-out') // arbitrary condition check
    response.status(404).send(error)

})
//SENDS RESPONSE TO A QUEST 
app.post('/heroes/:id/quests', (request, response) => {
    console.log(request.body);
    questID.push(request.body);
    response.send(201);
});


//CREATING AND DELETING A QUEST - SHOWS UPDATES VIA POSTMAN
app.post('heroes/:heroId/quests/:questId', (request, response) => {
    const heroesID = request.body;
    heroesID = shortid.generate()
    heroes.push(heroesID)
    response.status(204).json(heroesID)
});

app.get('heroes/:heroId/quests/:questId', (request, response) => {
    response.status(204).json(heroes)
});

app.delete('heroes/:heroId/quests/:questId', (request, response) => {

    const { id } = request.params;

    const deleted = heroes.find(hero => hero.id === id)
    if (deleted) {
        heroes = heroes.filter(heroes => heroes.id !== id)
        response.status(204).json(deleted)
    } else {
        response.status(404).json({ message: "Hero or Quest was not found for given IDs" });
    }
});

app.listen(3000, () => {
    console.log(`API is listening on port 3000`);
});
