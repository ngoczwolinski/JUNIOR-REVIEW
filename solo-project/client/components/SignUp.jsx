import React from 'react'
 
const SignUp = () => {
  return (
    <div>
       <h1>Sign Up</h1>
       {/* 
      1. When 'submit' button is clicked, the FORM will make a POST request to '/login'
      2. In the POST body, we will have key value pairs as (designated by the name attribute):
      - username: text that is input in the username box
      - password: text that is input in the password box
      
      NOTE: Currently, the POST method is sent to https:/localhost8080/login. We need to configure proxy in webpack to send the request to https:/localhost3000/login
      */}
      <form action="/signup" method="POST">
        <div>
          <input name="username" placeholder="username" type="text"></input>
        </div>
        <div>
          <input name="password" placeholder="password" type="password"></input>
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  )
}
 
export default SignUp