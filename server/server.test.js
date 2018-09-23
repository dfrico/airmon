const request = require('supertest');
const app = require('./server.js');

describe('Airmon API Integration Tests', () => {
    describe('#GET /rest/api/status/', () => {
        it('should get status', (done) => {
            request(app)
                .get('/rest/api/status/')
                .end((err, res) => {
                    expect(res.statusCode).toEqual(200);
                    expect(res.body).toBeInstanceOf(Object);
                    done();
                });
        });
    });
});
