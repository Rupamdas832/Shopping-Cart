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
        },

        
        seeds(server) {
            for(let i=0; i<12; i++){
                server.create("product",{
                    name: faker.commerce.productName(),
                    price: faker.commerce.price(),
                    img: faker.random.image(),
                    desc: faker.commerce.productDescription(),
                    quantity: 1,
                    discount: faker.datatype.number({"min": 10, "max": 50}),
                    inStock: faker.datatype.boolean() 
                    })
            }
        },
        routes() {
            this.namespace = "api";
            this.timing = 3000;
            this.resource("products");
        },
        
    })
}