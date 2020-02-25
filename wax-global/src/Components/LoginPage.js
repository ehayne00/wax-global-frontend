import React from 'react'
import API from '../API'

import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'

  

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
            <div>
                {this.state.loginForm ?
                 <div>
                     <h3>Enter your login details:</h3>

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
               <Button type="submit" variant='contained' color='primary'>
                 submit
               </Button>
            </form>

               <h3>Or need to...</h3>
               <Button onClick={toggleLoginForm} variant='contained' color='primary'>
                 Sign Up
               </Button>
               </div>
                :
                <div>
                <h3>Enter details to sign-up:</h3>

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
             name="file"
             onChange={(e) => this.handleImageChange(e)}
            />


          <br />
          <br />
          <Button type="submit" variant='contained' color='primary'>
            Submit
          </Button>
        </form>   

          <h3>Or need to...</h3>
          <Button onClick={toggleLoginForm} variant='contained' color='primary'>
            Log In
          </Button>
          </div>
                
                }

            </div>
        )
    }
}

export default LoginPage;