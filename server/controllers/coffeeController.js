const Coffee = require('../models/coffeeModel');
const factory = require('./handlerFactory');

/* USERS ROUTES HANDLERS */
//1. All products GET route handler
exports.getAllCoffee = factory.getAll(Coffee);

//2. Coffee GET route handler
exports.getCoffee = factory.getOne(Coffee);

//3. Coffee POST route handler
exports.createCoffee = factory.createOne(Coffee);

//4. Coffee PATCH route handler
exports.updateCoffee = factory.updateOne(Coffee);

//5. Coffee DELETE handler using Function Factory
exports.deleteCoffee = factory.deleteOne(Coffee);
