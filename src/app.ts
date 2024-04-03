import dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env')  });

import cors from 'cors';
import express from 'express';
import { getRedisClient } from './redis';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/add', async (req, res) => {
    const { number: numberRaw } = req.body;
    const isNumber = !Number.isNaN(parseInt(numberRaw));
    if(!isNumber) {
        return res.status(400).send({ code: 'ONLY_NUMBER_ALLOWED' });
    }
    
    const number = parseInt(numberRaw);
    const types = [15, 5, 3];

    getRedisClient().set(numberRaw.toString(), numberRaw);
    for(const [index, type] of types.entries()) {
        const inversedIndex = types.length - 1 - index
        if(number !== 0 && number % type === 0) {
            getRedisClient().set(numberRaw.toString(), `Type ${inversedIndex + 1}`);
            break;
        }    
    }

    res.sendStatus(200);
})

app.get('/retrieve/all', async (req, res) => {
    const keys = await getRedisClient().keys('*')
    const values = await getRedisClient().mGet(keys)

    const map = {}
    for(const [index, key] of keys.entries()) {
        map[key] = values[index];
    }

    return res.status(200).send({ values: map })
})

app.get('/retrieve/:number', async (req, res) => {
    const { number: numberRaw } = req.params;
    const isNumber = !Number.isNaN(parseInt(numberRaw));
    if(!isNumber) {
        return res.status(400).send({ code: 'ONLY_NUMBER_ALLOWED' });
    }

    const value = await getRedisClient().get(numberRaw.toString());
    
    if(value) {
        return res.status(200).send({ value })
    } else {
        return res.sendStatus(404);
    }
})


app.use((err: any, _req, res, _next) => {
    console.error(err.stack)

    res.status(err.status || 500);

    res.send({
        message: err.message || 'Unexpected error',
    });
});

export default app;
