const _ = require('lodash');

export default function(state = {}, action) {
    let data;
    let users;
    // let newusers;
    // let oldusers;
    // let updatedUsers;

    // console.log("UserReducer")

  switch (action.type) {
    // case "INIT_USERS_STATE":
    //     if(state.users){
    //         return state
    //     }
    //     users = {}
    //     data = Object.assign({}, state, {'users': users});
    //     return data

    case "ON_ADD_ALL_USERS":
        users = action.payload.entities.user;
        const allUsers = Object.assign({}, state.users, users)
        data = Object.assign({}, state, {'users': allUsers});
        return data;



    // case "INIT_DATA_SEARCH":
    //     const searchResults = action.payload;
    //     console.log(searchResults)
    //     data = Object.assign({}, state, {'searchResults': searchResults.data, searchType : searchResults.filter});
    //     return data;

    // case "ADD_USER_TO_ALL_USERS":

    //     console.log("TEST")
    //     var newuser = action.payload;
    //     delete newuser.createdAt;
    //     delete newuser.updatedAt;
    //     updatedUsers = state.users;
    //     updatedUsers[newuser.id] = newuser;
    //     data = Object.assign({}, state, {'users': updatedUsers});
    //     return data;


    default:
      return state;
  }
} 

