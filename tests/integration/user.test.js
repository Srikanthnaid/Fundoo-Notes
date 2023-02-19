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
  var token;
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
          token = res.body.data;
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

  var id;
  // 9 - Test case for create notes
  describe('Create notes', () => {
    const inputBody = {
      "title": "humanstyle",
      "description": "Ancentperiod"
    }
    it('Given notes details should be saved in database', (done) => {
      request(app)
        .post('/api/v1/notes/create')
        .set('authorization', `Bearer ${token}`)
        .send(inputBody)
        .end((err, res) => {
          id = res.body.data._id;
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });


  // 10 - Test case for invalid create notes
  describe('10.Invalid Create notes', () => {
    const inputBody = {
      "title": "humanstyle"
    }
    it('Given invalid notes details should throw error', (done) => {
      request(app)
        .post('/api/v1/notes/create')
        .set('authorization', `Bearer ${token}`)
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  // 11 - Test case for get all notes
  describe('Get all notes', () => {
    it('11.Given user login details should get all saved notes', (done) => {
      request(app)
        .get('/api/v1/notes/allNote')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });

  // 12 - Test case for get all notes invalid token
  describe('12.Get all notes with invalid token', () => {
    it('12.Given invalid token should throw error', (done) => {
      request(app)
        .get('/api/v1/notes/allNote')
        .set('authorization', `${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  // 13 - Test case for get all notes without authorization
  describe('13.Get all notes without authorization', () => {
    it('13.Given invalid authorization should throw error', (done) => {
      request(app)
        .get('/api/v1/notes/allNote')
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });

  // 14 - Test case for get note by id
  describe('14.Get note by id', () => {
    it('14.Given note id should fetch particular note', (done) => {
      request(app)
        .get(`/api/v1/notes/${id}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });

  // 15 - Test case for get note by invalid id
  describe('15.Get note by id', () => {
    it('15.Given invalid note id should throw error', (done) => {
      request(app)
        .get(`/api/v1/notes/shdvdv`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  // 16 - Test case for update note by id
  describe('16.Update note by id', () => {
    const inputBody = {
      "colour": "red"
    }
    it('16.Given note id should update particular note', (done) => {
      request(app)
        .put(`/api/v1/notes/${id}`)
        .set('authorization', `Bearer ${token}`)
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(202);
          done();
        });
    });
  });

  // 17 - Test case to delete note by id
  describe('17.Delete note by id', () => {
    it('17.Given note id should delete particular note', (done) => {
      request(app)
        .delete(`/api/v1/notes/${id}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });

  //18 test-case for Archive note.
  describe('18.Archive not by id with Authorization', () => {
    it('18.Given valid id', (done) => {
      request(app)
        .put(`/api/v1/notes/${id}/Archive`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(202);
          done()
        })
    })
  })

  //19 test-case for archive note with invalid id
  describe('19. Achive note bu invalid id',()=>{
    it('19. Given invalid id should throw the return satatus code 500',(done)=>{
      request(app)
      .put(`/api/v1/notes/scgh/Archive`)
      .set('authorization', `Bearer ${token}`)
      .end((err,res)=>{
        expect(res.statusCode).to.be.equal(500);
        done();
      })
    })
  })

  //20 test case for not Archive without  authorization
  describe('20.without authorization',()=>{
    it('20.Given data of archive note without authorization it will throw return status code 400 ',(done)=>{
      request(app)
      .put(`/api/v1/notes/${id}/Archive`)
      .end((err,res)=>{
        expect(res.statusCode).to.be.equal(400);
        done();
      })
    })
  })

  //21 test-case for trash note with id
  describe('21. Achive note with valid id',()=>{
    it('21. Given valid id should throw the return satatus code 200',(done)=>{
      request(app)
      .put(`/api/v1/notes/${id}/Trash`)
      .set('authorization', `Bearer ${token}`)
      .end((err,res)=>{
        expect(res.statusCode).to.be.equal(202);
        done();
      })
    })
  })

  /* //22 test-case for trash note with invalid id
  describe('22. Trash note but invalid id',()=>{
    it('22. Given invalid id should throw the return satatus code 500',(done)=>{
      request(app)
      .put(`/api/v1/notes/asdghsaxg/Trash`)
      .set('authorization', `Bearer ${token}`)
      .end((err,res)=>{
        expect(res.statusCode).to.be.equal(500);
        done();
      })
    })
  }) */

  //23 test-case of trash note without authorization
  describe('23.without authorization',()=>{
    it('23.Given data of trash note without authorization it will throw return status code 400 ',(done)=>{
      request(app)
      .put(`/api/v1/notes/${id}/Trash`)
      .end((err,res)=>{
        expect(res.statusCode).to.be.equal(400);
        done();
      })
    })
  })
});

