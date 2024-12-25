import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import Product from '../models/product.model.js';
import { connectDB } from '../lib/db.js';
dotenv.config();


async function seedProducts(qty) {
    await connectDB();

    const products = [];
    const quantity = qty;

    for (let i = 0; i < quantity; i++) {
        const numOfImages = Math.floor(Math.random() * 5) + 1;
        const images = Array.from({ length: numOfImages }).map(() => faker.image.url({ width: 640, height: 480 }));
        products.push({
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            images: images,
            description: faker.commerce.productDescription(),
            discount: Math.floor(Math.random() * 100),
            stock: faker.datatype.boolean({ probability: 0.7 }),
            isFeatured: faker.datatype.boolean({ probability: 0.3 })
        });
    }

    try {
        await Product.create(products);
        console.log('Products seeded successfully');
    } catch (err) {
        console.error(`Error seeding products: ${err}`);
    }
    finally {
        mongoose.connection.close();
    }
}

async function deleteProducts() {
    await connectDB();

    try {
        await Product.deleteMany();
        console.log('Products deleted successfully');
    } catch (err) {
        console.error(`Error deleting products: ${err}`);
    }
    finally {
        mongoose.connection.close();
    }
}

function getArgs(argv) {
    return argv.slice(2).reduce((args, arg) => {
        let [key, value] = arg.split('=');
        args[key.replace('--', '')] = value || true;
        return args;
    }, {});
}

function main() {
    const args = getArgs(process.argv);
    if (args.deleteAll) {
        deleteProducts().catch(err => {
            console.error(err)
            process.exit(1);
        });
    }

    if (args.seed) {
        if (args.seed === true) {
            console.error('Please provide the quantity of products to seed');
            return;
        } else {
            let qty = args.seed;
            seedProducts(qty).catch(err => {
                console.error(err)
                process.exit(1);
            });
        }
    }
}


/*  
DELETE ALL PRODUCTS 
npm run genProd -- --deleteAll
*/

/* 
SEED PRODUCTS 
npm run genProd -- --seed=10
*/

main();