import React from 'react'
import API from '../API'

import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'

// function validate(username, email, password) {
//   // we are going to store errors for all fields
//   // in a signle array
//   const errors = [];

//   if (username.length === 0) {
//     errors.push("Name can't be empty");
//   }

//   if (email.length < 5) {
//     errors.push("Email should be at least 5 charcters long");
//   }
//   if (email.split("").filter(x => x === "@").length !== 1) {
//     errors.push("Email should contain a @");
//   }
//   if (email.indexOf(".") === -1) {
//     errors.push("Email should contain at least one dot");
//   }

//   if (password.length < 6) {
//     errors.push("Password should be at least 6 characters long");
//   }

//   return errors;
// }


class LoginPage extends React.Component {


    state ={
        loginForm: true,
        usernameLogin: '',
        passwordLogin: '',
        usernameSignup: '',
        passwordSignup: '',
        email: '',
        bio: '',
        profileImage: ''
    }

    handleLogin = (event) => {
      event.preventDefault()
        API.login(this.state.usernameLogin, this.state.passwordLogin)
          .then(data => {
            
            if (data.error) throw Error(data.error)
            this.props.login(data)
            this.props.history.push('/stories')
          })
          .catch(error => alert(error))
    }
      
    handleSignup = (event) => {
        event.preventDefault()
        API.createAccount(this.state.usernameSignup, this.state.passwordSignup, this.state.email, this.state.profileImage, this.state.bio )
        .then(data => {
          
          if (data.error) throw Error(data.error)
          this.props.login(data)
    
          this.props.history.push('/stories')
        })
        .catch(error => alert(error))  
    }
      
    
    handleChange = event => {
          this.setState({ [event.target.name]: event.target.value })
    }

    handleImageChange = e => {
      
      let files = e.target.files;
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);

      reader.onload= e =>{
        this.setState({
          profileImage: e.target.result
        })
      }
    }
    
    toggleLoginForm = () => {
        this.setState({ loginForm: !this.state.loginForm})
    }

    render () {
        const { usernameLogin, passwordLogin, usernameSignup, passwordSignup, email, bio } = this.state
        const { handleChange, handleLogin, toggleLoginForm, handleSignup } = this
        return (
            <div className="root-explanation">
              <div >
              <h4 className="explanation-font">Find where the best surf breaks and destinations are across the globe 
                 </h4>
                 <h4 className="secondline explanation-font">and share awesome images, videos and recommendations.</h4>
                 <h3 className="forsurfers">For surfers, by surfers ...</h3>
                 </div>
                {this.state.loginForm ?
                 <div className="loginForm">
                     <h3 className="explanation-font"><u>Enter your login details:</u></h3>

             <form onSubmit={handleLogin}>
               <TextField
                 label='Username'
                 value={usernameLogin}
                 onChange={handleChange}
                 margin='normal'
                 name='usernameLogin'
               />
               <br />
               <TextField
                 label='Password'
                 value={passwordLogin}
                 onChange={handleChange}
                 margin='normal'
                 name='passwordLogin'
                 type='password'
               />
       
               <br />
               <br />
               <Button className="button-color" type="submit" variant='contained' color='secondary'>
                 submit
               </Button>
            </form>

               <h3 className="explanation-font">Or need to...</h3>
               <Button className="button-color" onClick={toggleLoginForm} variant='contained' color='secondary'>
                 Sign Up
               </Button>
               </div>
                :
                <div className="signup">

        <h3 className="explanation-font"><u>Enter details to sign-up:</u></h3>

        <form onSubmit={handleSignup}>       
          <TextField
            label='Username'
            value={usernameSignup}
            onChange={handleChange}
            margin='normal'
            name='usernameSignup'
          />
          <br />
          <TextField
            label='Password'
            value={passwordSignup}
            onChange={handleChange}
            margin='normal'
            name='passwordSignup'
            type='password'
          />
          <br />
          <TextField
            label='Email'
            value={email}
            onChange={handleChange}
            margin='normal'
            name='email'
          />
          <br />
          <TextField
            label='Bio'
            value={bio}
            onChange={handleChange}
            margin='normal'
            name='bio'
          />
          <br />
          <br />

          <label className="text-color">Profile Image:  </label>
            <input
             accept="image/*"      
             id="outlined-button-file"
             multiple={false}
             type="file"
             name="image"
             onChange={(e) => this.handleImageChange(e)}
            />


          <br />
          <br />
          <Button type="submit" variant='contained' color='secondary'>
            Submit
          </Button>
        </form>   

          <h3 className="explanation-font">Or need to...</h3>
          <Button onClick={toggleLoginForm} variant='contained' color='secondary'>
            Log In
          </Button>
          </div>
                
                }

            </div>
        )
    }
}

export default LoginPage;