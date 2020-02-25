import React from 'react'     
import API from '../API'

import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'
     
   
   class EditUserForm extends React.Component {

    state = {
        username: this.props.user.username,
        password: "",
        email: this.props.user.email,
        profileImage:this.props.user.image,
        bio:this.props.user.bio
    }


    handleSubmit = (event) => {
        event.preventDefault()
        const obj = {
           username: this.state.username,
           password: this.state.password,
           email: this.state.email,
           image: this.state.profileImage,
           bio: this.state.bio
        }

        API.patch('http://localhost:3000/users', this.props.user.id, obj)
        .then(data => {
          
          if (data.error) throw Error(data.error)
          this.setState({
              username: data.user.username,
              email: data.user.email,
              profileImage: data.user.image,
              bio: data.user.bio
          })
          
        })
        .catch(error => alert(error))  

        alert("Info updated!")
        this.props.toggleEditFormShowing()

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

    render() {
        const { user} = this.props
     return (
         <div>
     <h3>Enter the details you wish to change:</h3>

        <form onSubmit={this.handleSubmit}>       
          <TextField
            label='Username'
            value={this.state.username}
            onChange={this.handleChange}
            margin='normal'
            name='username'
          />
          <br />
          <TextField
            label='Password'
            value={this.state.password}
            onChange={this.handleChange}
            margin='normal'
            name='password'
            type='password'
          />
          <br />
          <TextField
            label='Email'
            value={this.state.email}
            onChange={this.handleChange}
            margin='normal'
            name='email'
          />
          <br />
          <TextField
            label='Bio'
            value={this.state.bio}
            onChange={this.handleChange}
            margin='normal'
            name='bio'
          />
          <br />
          <br />

          <label className="text-color">Profile Image:  </label>
            <input
             accept="image/*"      
             id="outlined-button-file"
             multiple
             type="file"
             name="file"
             value={this.state.image}
             onChange={(e) => this.handleImageChange(e)}
            />


          <br />
          <br />
          <Button type="submit" variant='contained' color='primary'>
            Submit
          </Button>
        </form>  
        </div> 
     )
    }
   }

   export default EditUserForm;