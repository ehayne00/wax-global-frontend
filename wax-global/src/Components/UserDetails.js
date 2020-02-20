import React from 'react'

const UserDetails = ({selectedUser}) => {
    return (
        <div>
            <h1>{selectedUser.username}</h1>
        </div>
    )
}

export default UserDetails;