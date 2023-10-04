const { CityPopulationModel } =  require("../models/CityPopulation.model");

 class PopulationsService {

    async findOneByCityAndState({city, state}){
        const cityPopulations = await CityPopulationModel.findOne(
            {
                city: {$regex : new RegExp(city, "i")} , 
                state: {$regex : new RegExp(state, "i")}
            }
          );
        if(!cityPopulations){
            return false;
        }
        return cityPopulations;
    }

    async updateOneByCityAndState({city, state, population}){
        const cityPopulations = await this.findOneByCityAndState({city, state});
        
        if(!cityPopulations) return false;

        await CityPopulationModel.updateOne({_id: cityPopulations._id}, {$set: {populations: population}});
        return true;
    }
}

module.exports = {
    PopulationsService
}