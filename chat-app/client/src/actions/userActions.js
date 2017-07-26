// const config = require('../config');
// "baseURL": "http://localhost:3001/api/"

console.log("UserAction")

export function setActiveUserAction(userId){
  return (dispatch) => {
    dispatch(setActiveUser(userId))
  }
}


function setActiveUser(userId){
  return {
      type: "SET_ACTIVE_USER",
      payload : userId
  }
}

export function initializeUsersStateAction(data) {
  return (dispatch) => {
    dispatch(initializeUsersState(data));
  }
}

function initializeUsersState(payload){
    return {
      type: "INIT_USERS_STATE",
      payload
    }
}

// Add an array of users to the the arry of all users in state
export function addUsersToAllUsers(data){
    const payload = data.entities.user;
    return {
      type: "ON_GET_NEW_ROSTER",
      payload
    }
}


export function addUserToAllUsersAction(data){
    const payload = data.user;
    return {
      type: "ADD_USER_TO_ALL_USERS",
      payload
    }
}

//Add a single user to the array of all users in the state
export function addUserToAllUsers(data){
  if(typeof data.createdAt !== undefined){
      delete data.createdAt;
  }
  if(typeof data.updatedAt !== undefined){
    delete data.updatedAt;
  }

  const payload = data;
    return {
      type: "ON_ADD_NEW_USER_ROSTER",
      payload
    }
}

export function onSearchResultsAction(data){
  return (dispatch) => {
      // dispatch(addUsersToAllUsers(data));
      dispatch(initializeSearchData(data));
  }
}

function initializeSearchData(payload){
  return {
    type: "INIT_DATA_SEARCH",
    payload
  }
}