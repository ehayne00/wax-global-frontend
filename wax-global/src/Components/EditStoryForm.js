import React from 'react'     
import API from '../API'

import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'
     
   
   class EditStoryForm extends React.Component {

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
        
    </div>
     )
    }
   }

   export default EditStoryForm;