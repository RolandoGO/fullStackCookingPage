const path = require("path")
const { app, port } = require("../app")
const request = require("supertest")




describe("ALL RECEPIE ROUTES", () => {



    test("recepie route GET/", async () => {

        const response = await request(app).get('/recepies').send()

    })




    // test('should create a new recipe', async () => {

    //     const obj = {
    //         title: "test jest",
    //         instructions: "yfhjgkhljl",
    //         ingredients: "aswdfcsdmcsckscksd,sdcds,sdcds,csdc,sdcds",
    //         userId: "534232sdkndslc12"


    //     }
    //     const response = await request(app).post('/recipes').send(obj)



    // });



})


