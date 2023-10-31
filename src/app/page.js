'use client'

import { useState } from "react"
import Swal from "sweetalert2";

export default function Home() {


  const [payload,setPayload]=useState({
                                          "username":"",
                                          "email":"",
                                          "password": "",
                                          "firstName":"",
                                          "lastName":"",
                                          "role":"CUSTOMER"
                                        
                                      });

  let handleChange=(e)=>{
   
    setPayload({
      ...payload,
      [e.target.name]:e.target.value
    })
  }


  const isValidEmail = (email) => {
    // Regular expression for a basic email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

let submitData= ()=>{

  if (!payload.username || !payload.email || !payload.password) {
    // Show a SweetAlert error
    Swal.fire({
      icon: "error",
      title: "Validation Error",
      text: "Please fill in the required fields (Username, Email, Password).",
    });
    return; // Stop form submission
  }
  
 // Check if the email is valid
 if (!isValidEmail(payload.email)) {
  Swal.fire({
    icon: "error",
    title: "Validation Error",
    text: "Please enter a valid email address.",
  });
  return;
}

  fetch(`/api/register`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(payload)
  })
  .then((res)=>{
    return res.json()
  })
  .then((data) => {
    console.log(data);
    if (data.status === 409) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Email already in use. Please enter a different email address.",
      });
      return; // Stop further processing
    } else if (data.status === 400) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Username already in use. Please enter a different username.",
      });
      return; // Stop further processing
    } else {
      // Handle successful response here
      // You can show a success message or redirect the user to another page
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have successfully registered!',
        showCancelButton: false,
        showConfirmButton: true,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          // Reload the page after the user clicks "OK"
          window.location.reload();
          
        }
      });
    }
  })
  .catch((e)=>{
    console.log(e)
  })
}



  return (
    <main >
    <div className="container">
        <div className="card  mt-5">
          <h5 className="card-header text-center">Register</h5>
          <div className="card-body">
            <form>
              <div className="mb-3">
                <label htmlFor="Username" className="form-label">Username</label>
                <input type="Username" 
                className="form-control" 
                id="Username" 
                aria-describedby="Username" 
                name="username"
                onChange={handleChange}
                
                />
               
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" 
                className="form-control" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp" 
                name="email"
                onChange={handleChange}
                />
              
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" 
                className="form-control" 
                id="exampleInputPassword1" 
                name="password"
                onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input type="firstName" 
                className="form-control" 
                id="firstName" 
                aria-describedby="firstName" 
                name="firstName"
                onChange={handleChange}
                />
                
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input type="lastName" 
                className="form-control" 
                id="lastName" 
                aria-describedby="lastName" 
                name="lastName"
                onChange={handleChange}
                />
             
              </div>
              
             <div className=" d-flex justify-content-center">
              <button type="button" className="btn btn-primary" onClick={submitData}>Submit</button>

             </div>
            
            </form>
          </div>
        </div>

    </div>
  


    </main>
  )
}
