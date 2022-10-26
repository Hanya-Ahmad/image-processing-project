import app from '../index';
import supertest from 'supertest';

const request = supertest(app);


describe('Endpoint test', () => {
    describe('Test valid parameters response', () => {
        it('gets the image processor endpoint with valid paramters.', async () => {
            const response = await request.get(
                '/imageProcessor?filename=palmtunnel&width=300&height=100'
            );
            expect(response.status).toBe(200);
        });
    });

    describe('Test invalid parameters response', () => {
        it('sends 400 error code when filename parameter is not specified.', async () => {
            const response = await request.get('/imageProcessor?file=fjord');
            expect(response.status).toBe(400);
        });
        it('sends 400 error code when height and width are invalid.', async () => {
            const response = await request.get(
                '/imageProcessor?filename=fjord&width=-10'
            );
            expect(response.status).toBe(400);
        });
        it('sends 404 error code when an invalid filename parameter is entered.', async () => {
            const response = await request.get('/imageProcessor?filename=a');
            expect(response.status).toBe(404);
        });
    });
});
