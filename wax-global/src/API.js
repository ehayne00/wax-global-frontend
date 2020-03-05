const BASEURL = 'http://localhost:3000'
const loginUrl = BASEURL + '/login'
const validateUrl = BASEURL + '/validate'
const usersUrl = BASEURL + '/users'

const fetchUserFavouritesUrl = BASEURL + '/user_favourites'
const fetchUserStoriesUrl = BASEURL + '/user_stories'


const get = url =>
  fetch(url, {
    headers: {
      Authorization: localStorage.token
    }
  }).then(resp => resp.json())

const post = (url, user ) => {
const formData = new FormData()
formData.append('picture', user.profileImage)
formData.append('username', user.usernameSignup)
formData.append('password', user.passwordSignup)
formData.append('email', user.email)
formData.append('bio', user.bio)

  return fetch(url, {
    method: 'POST',
      body: formData
  }).then(resp => resp.json())
}

const post2 = (url, story ) => {
  const formData = new FormData()
  formData.append('user_id', story.user_id)
  formData.append('picture', story.image)
  formData.append('title', story.title)
  formData.append('content', story.content)
  formData.append('address', story.address)
  formData.append('latitude', story.latitude)
  formData.append('longitude', story.longitude)
  formData.append('movie', story.video)
  formData.append('country', story.country)

  return fetch(url, {
    method: 'POST',
    body: formData
  }).then(resp => resp.json())
}

const post3 = (url, data) => 
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(resp => resp.json())
 


const patch = (url, id, user) => {
const formData = new FormData()

formData.append('username', user.username)
formData.append('password', user.password)
formData.append('email', user.email)
formData.append('picture', user.image)
formData.append('bio', user.bio)

  return fetch(`${url}/${id}`, {
      method: 'PATCH',
         body: formData
         }).then(resp => resp.json())
        }

const patch2 = (url, id, story) => {
  const formData = new FormData()
          
  formData.append('user_id', story.user_id)
  formData.append('picture', story.image)
  formData.append('title', story.title)
  formData.append('content', story.content)
  formData.append('address', story.address)
  formData.append('latitude', story.latitude)
  formData.append('longitude', story.longitude)
  formData.append('movie', story.video)
  formData.append('country', story.country)
          
     return fetch(`${url}/${id}`, {
        method: 'PATCH',
            body: formData
            }).then(resp => resp.json())
         }
         

const destroy = (url, id) =>
    fetch(`${url}/${id}`, {
      method: 'DELETE'
      })


const login = (username, password) => post3(loginUrl, 
    {user: 
        { username:username,
            password:password
        }
    }
  )

const createAccount = user => post(usersUrl, user)

      const fetchUserFavourites = (url) => get(fetchUserFavouritesUrl)

      const fetchUserStories = (url) => get(fetchUserStoriesUrl)


  

// const fetchusercart = (url) => get(fetchusercartUrl) 
  

const validate = () => get(validateUrl)

export default { login, validate, createAccount, post, post2, post3, patch, patch2, destroy, fetchUserFavourites, fetchUserStories }