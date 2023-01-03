import express, { response } from 'express';

export function questsRouter() {
    const router = express.Router();

    // TODO: Task 1
    // instead of app.get...
    router.get("/heroes", (request, response) => {
        return response.json(heroes);
    });

    router.get("/heroes/:id", (request, response) => {
        const hero = heroes.find(val => val.id === Number(request.params.id));
        return response.json(heroes);
    });

    // TODO: Task 2
    // instead of app.post...
    router.post("/heroes", (request, response) => {
        heroes.push({
            name: request.body.name,
            id: ++id
        });
        return response.json({ message: "Quest was added to the databased" });
    });

    // TODO: Task 3
    // instead of app.patch...
    router.patch("/heroes/:heroId/quests/:questId", (request, response) => {
        const hero = heroes.find(val => val.id === Number(request.params.id));
        hero.name = request.body.name;
        return response.json({ message: "UpQuest was updated in the database" });
    });

    // TODO: Task 4
    // instead of app.delete...
    router.delete("/heroes/:heroId/quests/:questId", (request, response) => {
        const heroIndex = heroes.findIndex(val => val.id === Number(request.params.id));
        heroes.splice(heroIndex, 1);
        return response.json({ message: "DeletedQuest was deleted in the database" });
    });
    return router;
}