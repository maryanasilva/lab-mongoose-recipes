const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    //Iteration 2
    let newRecipe = {
      title: 'Mousse',
      level: 'Easy Peasy',
      ingredients: ['chocolate', 'ovos'],
      cuisine: 'Portuguesa',
      dishType: 'dessert',
      duration: 20,
      creator: 'Mariana'
    };

    let newRecipeDb = await Recipe.create(newRecipe);
    console.log(newRecipeDb);

    //Iteration 3
    let multipleRecipes = await Recipe.insertMany(data)
 /*    multipleRecipes.forEach((recipe) => {
      console.log(recipe.title)
    }); */

    //Iteration 4
    await Recipe.findOneAndUpdate(
      {title: 'Rigatoni alla Genovese'},
      {duration: 100}
    );

    let checkDuration = await Recipe.find({
      title: 'Rigatoni alla Genovese'
    });

    console.log(checkDuration);

    //Iteration 5
    await Recipe.deleteOne({title: 'Carrot Cake'});

    //Iteration 6
    mongoose.connection.close();

    // Run your code here, after you have insured that the connection was made
  } catch (error) {
    console.log(error);
  }
};

manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
