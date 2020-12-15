// IMPORT OUR ENOVIRNMENTAL VARIABLE AND SET IT TO TEST 
process.env.NODE_ENV = "test";
// IMPORT SUPERTEST FROM NODE_MODULES 
const request = require("supertest")

// IMPORT APP FILE 
const app = require("./app")
// IMPORT DATABASE 
const Items = require("./fakeDatabase")

// Create Item to Try our Test with 
const item = {name: "chocolate", price: 2.45}

// CALL BEFORE EACH FUNCTION TO EXECUTE BEFORE EACH ROUTE TESTING 
beforeEach(() => {
    Items.push(item)}
    )

// CALL AFTER EACH FUNCTION TO EXECUTE AFTER EACH ROUTE IS TESTED 
afterEach(() => {
    Items.length = 0;
})

// TEST ALL ITEMS GET ROUTES 
describe("Get /items", () => {
    test('should Show all the items in the Shopping list', async() => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({Items: [item]})
    })  
})


// TEST POST ROUTE 
describe("Post /items", ()=>{
    test('should Create an Item ', async() => {
    const res = await request(app).post("/items").send({name: "milk", price: 2.45})
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({item: {name: "milk", price: 2.45}})
    })
    
})


// TEST PATCH ROUTE 
describe("Get /:name", ()=>{
    test('should Get Item By Name', async() => {
    const res = await request(app).get(`/items/${item.name}`)
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({item: item})
    })
    
})

// TEST DELETE ROUTE 
describe("Get /:name", ()=>{
    test('should Get Item By Name', async() => {
    const res = await request(app).delete(`/items/${item.name}`)
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({message: "Item Deleted"})
    })
    
})


