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

const post = (url, data) => 
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(resp => resp.json())


const patch = (url, id, data) =>
  fetch(`${url}/${id}`, {
      method: 'PATCH',
      headers: {
         'Content-Type': 'application/json',
         'Accepts': 'application/json'
         },
         body: JSON.stringify(data)
         }).then(resp => resp.json())

const destroy = (url, id) =>
    fetch(`${url}/${id}`, {
      method: 'DELETE'
      })


const login = (username, password) => post(loginUrl, 
    {user: 
        { username:username,
            password:password
        }
    }
  )

const createAccount = (username, password, email, image, bio) => post(usersUrl,
      {user:
        {username: username,
          password: password,
          email: email,
          image: image,
          bio: bio
        }
      })

      const fetchUserFavourites = (url) => get(fetchUserFavouritesUrl)

      const fetchUserStories = (url) => get(fetchUserStoriesUrl)


  

// const fetchusercart = (url) => get(fetchusercartUrl) 
  

const validate = () => get(validateUrl)

export default { login, validate, createAccount, post, patch, destroy, fetchUserFavourites, fetchUserStories }