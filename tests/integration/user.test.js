import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';
import { token } from 'morgan';

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => { });
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });


  // 1 Test case for user registration with valid data
  describe('UserRegistration', () => {
    const userDetails = {
      "firstname": "Srikanth",
      "lastname": "naidu",
      "email": "srikanthnaidu019@gmail.com",
      "password": "Srikanth9640@"
    }
    it('Given user registration details should be saved in database', (done) => {
      request(app)
        .post('/api/v1/users/Register')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });

  // 2 Testcase for invalid firstname
  describe('UserRegistration', () => {
    const userDetails = {
      "firstName": "Srik",
      "lastName": "naidu",
      "email": "srikanthnaidu019@gmail.com",
      "password": "Srikanth9640@"
    }
    it('Given user registration details should not be saved in database', (done) => {
      request(app)
        .post('/api/v1/users/Register')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  // 3 test case for lastname-invalid
  describe('UserRegistration', () => {
    const userDetails = {
      "firstName": "Srikanth",
      "lastName": "",
      "email": "srikanthnaidu019@gmail.com",
      "password": "Srikanth9640@"
    }
    it('Given user registration details should not be saved in database', (done) => {
      request(app)
        .post('/api/v1/users/Register')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
  // 4 Testcase for invalid email,
  describe('UserRegistration', () => {
    const userDetails = {
      "firstName": "Srikanth",
      "lastName": "naidu",
      "email": "srikanthnaidu019",
      "password": "Srikanth9640@"
    }
    it('Given user registration details should not be saved in database', (done) => {
      request(app)
        .post('/api/v1/users/Register')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  // 5 Testcase for invalid password,
  describe('UserRegistration', () => {
    const userDetails = {
      "firstName": "Srikanth",
      "lastName": "naidu",
      "email": "srikanthnaidu019@gmail.com",
      "password": "Srikanth"
    }
    it('Given user registration details should not be saved in database', (done) => {
      request(app)
        .post('/api/v1/users/Register')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  // 6 Test case for login 
  describe('UserLogin', () => {
    const loginDetails = {
      "email": "srikanthnaidu019@gmail.com",
      "password": "Srikanth9640@"
    }
    it('Given unregistered user login details should not get logged in', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(loginDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });

  // 7 Test case for login with invalid email
  describe('UserLogin', () => {
    const loginDetails = {
      "email": "srikanthnaidu019",
      "password": "Srikanth9640@"
    }
    it('Given unregistered user login details should not get logged in', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(loginDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  // 8 Test case for login with invalid password
  describe('UserLogin', () => {
    const loginDetails = {
      "email": "srikanthnaidu019@gmail.com",
      "password": "Srikan"
    }
    it('Given unregistered user login details should not get logged in', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(loginDetails)
        .end((err, res) => {

          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
  
});

