const request = require('supertest');
const app = require('./server');

const mockupMovie = {
  title: 'Microsoft',
  director: 'Bill gates',
  cast: 'Val Kilmer, Tom Cruise',
  country: 'USA',
  date_added: 'January 28, 2020',
  release_year: 2020,
  rating: 'TV-20',
  duration: '120 min',
  listed_in: 'Comedy',
  description: 'Intense movie!',
  type: 'Movie'
};

const MOVIE_ID_NOT_FOUND = 8101989409834509835;
const MOVIE_ID_INVALID = `lksdlkjfaslkjfasldfjlaskdjf`;
const MOVIE_ID_VALID = 81019894;

describe('API endpoint /', () => {
  describe('GET', () => {
    it('Should respond to request with status code 200', () => {
      return request(app)
        .get('/')
        .then(response => {
          expect(response.status).toBe(200);
        });
    });
  });
});

describe('API endpoint /api/movies', () => {
  describe('GET', () => {
    it('Should respond to request with status code 200', () => {
      return request(app)
        .get('/api/movies')
        .then(response => {
          expect(response.status).toBe(200);
          expect(response.body.status).toBe('200 OK');
          expect(response.body).toHaveProperty('message');
          expect(response.body).toHaveProperty('totalPages');
          expect(response.body).toHaveProperty('remainingPages');
          expect(response.body).toHaveProperty('query');
          expect(response.body).toHaveProperty('data');
          expect(response.body.message).toBe('Movies fetched successfully');
        });
    });
  });
  describe('POST', () => {
    it('Should respond to request with status code 200', () => {
      return request(app)
        .post('/api/movies')
        .send(mockupMovie)
        .then(response => {
          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty('message');
          expect(response.body).toHaveProperty('data');
          expect(response.body.status).toBe('200 OK');
          expect(response.body.message).toBe('Movie created successfully');
        });
    });
    it('Should respond to invalid request data with status code 422', () => {
      return request(app)
        .post('/api/movies')
        .send({
          title: 'Microsoft',
          director: 'Bill gates',
          cast: 'Val Kilmer, Tom Cruise',
          country: 'USA',
          date_added: 'January 28, 2020',
          release_year: 2020,
          rating: 'TV-20',
          duration: '120 min'
        })
        .then(response => {
          expect(response.status).toBe(422);
          expect(response.body).toHaveProperty('status');
          expect(response.body).toHaveProperty('message');
          expect(response.body).toHaveProperty('error');
          expect(response.body.status).toBe('422 Unprocessable Entity');
          expect(response.body.message).toBe('Invalid request data');
        });
    });
  });
});

describe('API endpoint /api/movies/:id', () => {
  describe('GET', () => {
    it('Should respond to request with status code 200', () => {
      return request(app)
        .get(`/api/movies/${MOVIE_ID_VALID}`)
        .then(response => {
          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty('status');
          expect(response.body).toHaveProperty('message');
          expect(response.body).toHaveProperty('data');
          expect(response.body.status).toBe('200 OK');
          expect(response.body.message).toBe('Movie fetched successfully');
        });
    });
    it('Should respond with status code 404 when movie is not found', () => {
      return request(app)
        .get(`/api/movies/${MOVIE_ID_NOT_FOUND}`)
        .then(response => {
          expect(response.status).toBe(404);
          expect(response.body).toHaveProperty('status');
          expect(response.body).toHaveProperty('message');
          expect(response.body).toHaveProperty('params');
          expect(response.body.status).toBe('404 Not Found');
          expect(response.body.message).toBe(
            `No movie found with id ${MOVIE_ID_NOT_FOUND}.`
          );
        });
    });
    it('Should respond to incorrect request parameters with status code 400', () => {
      return request(app)
        .get(`/api/movies/${MOVIE_ID_INVALID}`)
        .then(response => {
          expect(response.status).toBe(400);
          expect(response.body.status).toBe('400 Bad Request');
        });
    });
  });
  describe('PUT', () => {
    it('Should respond to request with status code 200', () => {
      return request(app)
        .put(`/api/movies/${MOVIE_ID_VALID}`)
        .send(mockupMovie)
        .then(response => {
          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty('status');
          expect(response.body).toHaveProperty('message');
          expect(response.body).toHaveProperty('data');
          expect(response.body.status).toBe('200 OK');
          expect(response.body.message).toBe('Movie updated successfully');
        });
    });
    it('Should respond with status code 404 when movie is not found', () => {
      return request(app)
        .put(`/api/movies/${MOVIE_ID_NOT_FOUND}`)
        .send(mockupMovie)
        .then(response => {
          expect(response.status).toBe(404);
          expect(response.body).toHaveProperty('status');
          expect(response.body).toHaveProperty('message');
          expect(response.body).toHaveProperty('params');
          expect(response.body.status).toBe('404 Not Found');
          expect(response.body.message).toBe(
            `No movie found with id ${MOVIE_ID_NOT_FOUND}.`
          );
        });
    });
    it('Should respond to incorrect request parameters with status code 400', () => {
      return request(app)
        .put(`/api/movies/${MOVIE_ID_INVALID}`)
        .send(mockupMovie)
        .then(response => {
          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty('status');
          expect(response.body.status).toBe('400 Bad Request');
        });
    });
  });
  describe('DELETE', () => {
    it('Should respond to request with status code 200', () => {
      return request(app)
        .delete(`/api/movies/${MOVIE_ID_VALID}`)
        .then(response => {
          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty('message');
          expect(response.body).toHaveProperty('data');
          expect(response.body).toHaveProperty('status');
          expect(response.body.status).toBe('200 OK');
          expect(response.body.message).toBe('Movie deleted successfully');
        });
    });
    it('Should respond with status code 404 when movie is not found', () => {
      return request(app)
        .delete(`/api/movies/${MOVIE_ID_NOT_FOUND}`)
        .then(response => {
          expect(response.status).toBe(404);
          expect(response.body).toHaveProperty('status');
          expect(response.body).toHaveProperty('message');
          expect(response.body).toHaveProperty('params');
          expect(response.body.status).toBe('404 Not Found');
          expect(response.body.message).toBe(
            `No movie found with id ${MOVIE_ID_NOT_FOUND}.`
          );
        });
    });
    it('Should respond to incorrect request parameters with status code 400', () => {
      return request(app)
        .delete(`/api/movies/${MOVIE_ID_INVALID}`)
        .then(response => {
          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty('status');
          expect(response.body.status).toBe('400 Bad Request');
        });
    });
  });
});
