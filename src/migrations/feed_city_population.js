const fs = require('fs'); 
const { parse } = require('csv-parse');

const { CityPopulationModel } = require("../models/CityPopulation.model");
const { join } = require('path');


const data = [];
const readCSVFile = async () => {
    const csvFilePath = join(process.cwd(), "/city_populations.csv")
    await fs.createReadStream(csvFilePath)
        .pipe(parse({delimiter: ','}))
        .on('data', function(csvrow) {
            if(!isNaN(csvrow[2]) && csvrow[0] && csvrow[1]){
                data.push({city: csvrow[0], state: csvrow[1], populations: parseInt(csvrow[2])});
            }
                
        }).on('end', function(){
            feedPopulationsToDB(data);
        })
}

readCSVFile();
const feedPopulationsToDB = async (cityPopulations) => {
    const savedPopulations = await CityPopulationModel.create(cityPopulations);
    console.log("data saved succesfully : ", savedPopulations.length);
}
module.exports = {
    readCSVFile
}