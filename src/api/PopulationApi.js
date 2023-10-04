const express = require('express');
const { CityPopulationModel } = require('../models/CityPopulation.model');
const { PopulationsService } = require('../services/PopulationService');


const populationRouter = express.Router();

const service = new PopulationsService();

populationRouter.get('/state/:state/city/:city', async (req, res) => {
  
  const { city, state } = req.params
  
  const cityPopulations = await service.findOneByCityAndState({city, state});
  if(!cityPopulations) {
    return res.status(404).json({
      message: "city not found!"
    });
  }
  return res.status(200).json({
    population: cityPopulations.populations
  });
});

populationRouter.put('/state/:state/city/:city', async (req, res) => {
  
  const { city, state } = req.params

  const { population } = req.body;

  if(!population || isNaN(population)){
    return res.status(400).json({
      message: 'invalid user inputs: population should be valid number'
    })
  }
  
  
  const updateResult = await service.updateOneByCityAndState({city, state, population})
  if(!updateResult){
    return res.status(404).json({
      message: "city not found!"
    });
  }
  return res.status(204).json({
    message: "City Population has been updated"
  });
});



module.exports = populationRouter;