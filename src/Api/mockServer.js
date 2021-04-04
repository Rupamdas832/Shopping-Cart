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
            for(let i=0; i<12; i++){
                server.create("product",{
                    name: faker.commerce.productName(),
                    price: faker.commerce.price(),
                    img: faker.random.image(),
                    desc: faker.commerce.productDescription(),
                    quantity: 1,
                    rating: faker.datatype.number({"min": 1, "max": 5}),
                    discount: faker.datatype.number({"min": 10, "max": 50}),
                    inStock: faker.datatype.boolean(),
                    isPrimeChoice: faker.datatype.boolean()
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