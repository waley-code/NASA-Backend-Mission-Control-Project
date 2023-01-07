const request = require('supertest');
const app = require('../../app');

describe('Test GET /launches', ()=>{
    test('Should return 200 success code', async ()=>{
        const response = await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200);
    });
});

describe('Test POST /launch', ()=>{
    const completeLaunchDate = {                
                mission: "US Enterprise",
                rocket: "NCC 1880-C",
                target: "Kepler -442 b",
                launchDate: "January 5, 2039"
            };

    const launchDataWithoutDate = {                
        mission: "US Enterprise",
        rocket: "NCC 1880-C",
        target: "Kepler -442 b",
    };

    test('Should return 201 created', async ()=>{
        const response = await request(app)
            .post('/launches')
            .send(completeLaunchDate)
            .expect('Content-Type', /json/)
            .expect(201);
        const requestDate = new Date(completeLaunchDate.launchDate).valueOf();
        const responseDate =new Date(response.body.launchDate).valueOf();
        expect(requestDate).toBe(responseDate);
        expect(response.body).toMatchObject(launchDataWithoutDate);
    });
    test('Should catch missing required properties', async ()=>{
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body).toStrictEqual({
            error: "Missing required launch property",
        })
    });
    test('Should catch invalid date format', async ()=>{
        const response = await request(app)
        .post('/launches')
        .send({
            mission: "US Enterprise",
            rocket: "NCC 1880-C",
            target: "Kepler -442 b",
            launchDate: "hello"
        })
        .expect('Content-Type', /json/)
        .expect(400);
    expect(response.body).toStrictEqual({
        error: "Invalid launch date",
    })
    });
});