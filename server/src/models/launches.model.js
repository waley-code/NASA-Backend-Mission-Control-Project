const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explore IS1',
    launchDate: new Date('December, 27, 2030'),
    target: 'Kepler-442 b',
    customer: ['Wale', 'NASA'],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch);

function existiLaunchWithId(launchId){
    return launches.has(launchId);
};

function getAllLaunches(){
    return Array.from(launches.values())
}

function addNewLaunch(aunch){
    latestFlightNumber += 1;
    launches.set(latestFlightNumber, Object.assign(aunch, {
        success: true,
        upcoming: true,
        customer: ['Gbenga', 'NASA'],
        flightNumber: latestFlightNumber,
    }));
};

function abortLaunchById(launchId){
    const abortedLaunch = launches.get(launchId);
    abortedLaunch.upcoming = false;
    abortedLaunch.success =false;
    return abortedLaunch;
};

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existiLaunchWithId,
    abortLaunchById,
};