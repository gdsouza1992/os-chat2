export function newMessageFromServerAction(data) {
  return (dispatch) => {
    dispatch(newMessageFromServer(data));
  }
}

function newMessageFromServer(payload){
    return {
      type: "NEW_MESSAGE_SERVER",
      payload
    }
}