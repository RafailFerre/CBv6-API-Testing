import 'dotenv/config';
import request from 'supertest';

before(async () => {
    const response = await request(process.env.BASE_URL)
        .post('/user/login')
        .send({ email: process.env.EMAIL, password: process.env.PASSWORD });

    process.env.TOKEN = response.body.payload.token;
});


before(async () => {
    const resLoginToken = (await request(process.env.BASE_URL)
        .post('/user/login')
        .send({ email: process.env.EMAIL, password: process.env.PASSWORD })).body.payload.token

    const resAuth = await request(process.env.BASE_URL)
        .get('/user/auth')
        .set('Authorization', resLoginToken);

    process.env.AUTHORIZATION = resAuth.request.header['Authorization'];
});
