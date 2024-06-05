import 'dotenv/config';
import request from 'supertest';

before(async () => {
    const response = await request(process.env.BASE_URL)
        .post('user/login')
        .send({ email: process.env.Email, password: process.env.PASSWORD });

    process.env.TOKEN = response.body.payload.token;
});
