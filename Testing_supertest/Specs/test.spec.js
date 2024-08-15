// Test: test.spec.js
const request = require('supertest'); // import supertest
const chai = require('chai'); // import chai
const expect = require('chai').expect; // import expect
const addContext = require('mochawesome/addContext');

let name = "dummy_name"
let password = "123456"
let email ="dummy_email@gmail.com"
let token="dummy";


// Test Suite 1 
describe('Test Suite 1 - Verify that API Routes for mock-user-auth returns correctly (Valid)', function(){
        // Test case 1
        it('Verify that the "CREATE USER" API returns correctly', function(done){
            request('http://localhost:8081') // Test endpoint
                .post('/api/v1/users') // API endpoint
                .send({
                    "name": name,
                    "email": email,
                    "password": password
                  }) // request body
                .expect(200) // expected response status code
                .expect(function (res) {
                    expect(res.body.message).to.equal("User registered with success" )
                    expect(res.body).to.have.property('token');   
                    }) // expected response body
                .end((err, res) => {
                        addContext(this, { // Log the response body
                            title: 'Response Body',
                            value: res.body
                        })
                        if (err) {
                            addContext(this, { // Log error to report
                                title: 'Error',
                                value: err
                            })
                            return
                            
                        }

                        done()
                    }); // end the test case

        });

        // Test case 2
        it('Verify that the "AUTH USER" API returns correctly', function(done){
            request('http://localhost:8081') // Test endpoint
                .post('/api/v1/auth') // API endpoint
                .send({
                        "email": email,
                        "password": password
                }) // request body
                .expect(200) // expected response status code
                .expect(function (res) {
                    expect(res.body).to.have.property('token');
                    }) // expected response body
                .end((err, res) => {
                        addContext(this, { // Log the response body
                            title: 'Response Body',
                            value: res.body
                        })
                        if (err) {
                            addContext(this, { // Log error to report
                                title: 'Error',
                                value: err
                            })
                            return
                            
                        }
                        //set token to be used in next test cases
                        token =res.body.token
                        done()
                }); // end the test case

        });

        // Test case 3
        it('Verify that the "GET USER BY TOKEN" API returns correctly', function(done){
            request('http://localhost:8081') // Test endpoint
                .get('/api/v1/users') // API endpoint
                .set('Authorization', token) //set token
                .expect(200) // expected response status code
                .expect(function (res) {
                    expect(res.body).to.have.property('id');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('email');
                    expect(res.body).to.have.property('password');
                    expect(res.body).to.have.property('imageUrl');
                    expect(res.body.name).to.equal(name)
                    expect(res.body.email).to.equal(email)
                    expect(res.body.password).to.equal(password)
                    }) // expected response body
                .end((err, res) => {
                        addContext(this, { // Log the response body
                            title: 'Response Body',
                            value: res.body
                        })
                        if (err) {
                            addContext(this, { // Log error to report
                                title: 'Error',
                                value: err
                            })
                            return
                            
                        }

                        done()
                }); // end the test case

        });

        // Test case 4
        it('Verify that the "PATCH USER BY TOKEN" API returns correctly', function(done){
            request('http://localhost:8081') // Test endpoint
                .patch('/api/v1/users') // API endpoint
                .set('Authorization', token) //set token
                .send({
                    "name": name+"patch",
                    "email": email,
                    "password": password+"patch"
                  }) // request body
                .expect(200) // expected response status code
                .expect(function (res) {
                    expect(res.body.message).to.equal("User updated with success") //Todo
                    }) // expected response body
                .end((err, res) => {
                        addContext(this, { // Log the response body
                            title: 'Response Body',
                            value: res.body
                        })
                        if (err) {
                            addContext(this, { // Log error to report
                                title: 'Error',
                                value: err
                            })
                            return
                            
                        }

                        done()
                }); // end the test case

        });

        // Test case 5
        it('Verify that the "DELETE USER BY TOKEN" API returns correctly', function(done){
            request('http://localhost:8081') // Test endpoint
                .delete('/api/v1/users') // API endpoint
                .set('Authorization', token) //set token
                .expect(200) // expected response status code
                .expect(function (res) {
                   expect(res.body.message).to.equal("User deleted with success") //Todo
                    }) // expected response body
                .end((err, res) => {
                        addContext(this, { // Log the response body
                            title: 'Response Body',
                            value: res.body
                        })
                        if (err) {
                            addContext(this, { // Log error to report
                                title: 'Error',
                                value: err
                            })
                            return
                            
                        }

                        done()
                }); // end the test case

        });

        // Test case 6
        it('Verify that the "DELETE ALL USERS" API returns correctly', function(done){
            request('http://localhost:8081') // Test endpoint
                .delete('/api/v1/all-users') // API endpoint
                .send({
                        "key_admin": "keyadmin123" 
                }) 
                .expect(200) // expected response status code
                .expect(function (res) {
                   expect(res.body.message).to.equal("Users deleted with success") 
                    }) // expected response body
                .end((err, res) => {
                        addContext(this, { // Log the response body
                            title: 'Response Body',
                            value: res.body
                        })
                        if (err) {
                            addContext(this, { // Log error to report
                                title: 'Error',
                                value: err
                            })
                            return
                            
                        }

                        done()
                }); // end the test case

        });


        
});

