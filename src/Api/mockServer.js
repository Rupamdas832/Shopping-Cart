import {createServer, Model, RestSerializer} from "miragejs"
import faker from "faker"

faker.seed(111);

export default function MockServer() {
    createServer({

        serializers: {
            application: RestSerializer
        },

        models: {
            product: Model,
            cart: Model,
            wishlist: Model
        },

        
        seeds(server) {
            for(let i=0; i<25; i++){
                server.create("product",{
                    name: faker.commerce.productName(),
                    price: faker.commerce.price(),
                    img: faker.random.image(),
                    desc: faker.commerce.productDescription(),
                    quantity: 1,
                    rating: parseFloat((Math.random()*5).toFixed(1)),
                    discount: faker.datatype.number({"min": 10, "max": 50}),
                    inStock: faker.datatype.boolean(),
                    isPrimeChoice: faker.datatype.boolean(),
                    category: faker.random.arrayElement([
                        "AAA", "SPORTS", "RPG", "ACTION"
                    ]),
                    date: faker.date.past(),
                    })
            }
        },
        routes() {
            this.namespace = "api";
            this.timing = 1500;

            this.get("/products", (schema) => {
                return schema.products.all()
            })


            this.get("/cart", (schema) => {
                return schema.carts.all()
            })
            this.post("/cart", (schema, request) => {
                let attrs = JSON.parse(request.requestBody)

                return schema.carts.create(attrs)
            })
            this.delete("/cart/:id", (schema, request) => {
                const id = request.params.id;

                return schema.carts.find(id).destroy()
            })

            this.get("/wishlist", (schema) => {
                return schema.wishlists.all()
            })
            this.post("/wishlist", (schema, request) => {
                let attrs = JSON.parse(request.requestBody)

                return schema.wishlists.create(attrs)
            })
        },
        
    })
}