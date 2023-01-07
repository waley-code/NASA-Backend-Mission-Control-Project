const fs = require('fs');
const PATH = require('path');
const { parse } = require('csv-parse');


const habitablePlanets = []

function isHabitablePlanet(planet){
    return planet['koi_disposition'] === 'CONFIRMED' 
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

function loadPlanets(){
    new Promise((resolve, reject)=>{
        fs.createReadStream(PATH.join(__dirname,'../../data/kepler_data.csv'))
        .pipe(parse({
            comment: '#',
            columns: true,
        }))
        .on('data', (data) =>{
            if (isHabitablePlanet(data)){
                habitablePlanets.push(data)
            }
        })
        .on('error', (err)=>{
            reject(err);
        })
        .on('end', ()=>{
            resolve();
            console.log(`${habitablePlanets.length} habitable Planets found!`);
        });
    });
};

function getAllPlanets(){
    return habitablePlanets
}

module.exports = {
    loadPlanets,
   getAllPlanets,
}