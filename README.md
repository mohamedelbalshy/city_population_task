# city_population_task

## to run the project you need to have docker installed and run:
`docker-compose up --build`


## to run migrations uncomment this line in `app.js`:
`// readCSVFile();`

To increase the api performance we can add redis for caching the most common population reads 