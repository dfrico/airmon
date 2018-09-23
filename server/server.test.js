const request = require('supertest');
const app = require('./server.js');

describe('Todos list API Integration Tests', () => {
    describe('#GET / tasks', () => {
        it('should get all tasks', (done) => {
            request(app)
                .get('/rest/api/status/')
                .end((err, res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    done();
                });
        });
    });
});
