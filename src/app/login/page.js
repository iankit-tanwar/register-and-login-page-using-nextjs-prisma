'use client'
import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function LoginPage() {
    const [payload, setPayload] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setPayload({
            ...payload,
            [e.target.name]: e.target.value,
        });
    };

    const isValidEmail = (email) => {
        // Basic email format validation (for Gmail addresses)
        const emailPattern = /^[a-zA-Z0-9._-]+@gmail.com$/;
        return emailPattern.test(email);
    };

    const submitLogin = () => {
        if (!payload.email || !payload.password) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please fill in the required fields (Email, Password).',
            });
            return;
        }

        if (!isValidEmail(payload.email)) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please enter a valid Gmail address.',
            });
            return;
        }

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                if (data.status === 404) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Validation Error',
                        text: 'Please Register First.',
                    });
                } else if (data.status === 500) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Validation Error',
                        text: 'Invalid Password.',
                    });
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Successful',
                        text: 'You have successfully logged in!',
                    });
                    
                }
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="container d-flex justify-content-center">
            <div className="card mt-5 col-6">
                <h5 className="card-header text-center">Login</h5>
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                name="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                name="password"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-primary" onClick={submitLogin}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
