// import React from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import { onSearchUserResultsAction } from "../actions/userActions";
// import Select from 'react-select';


// import 'react-select/dist/react-select.css';

// const _ = require('lodash');

// class SearchResults extends React.Component {
//     constructor(props){
//         super(props);
//         this.props.client.on('load-username-suggestions-search', this.onLoadUsersSearchResults);
//     }

//     onLoadUsersSearchResults = (data) => {
//         this.props.onSearchUserResultsAction(data);
//     }

//     sendMessage = () => {
//         const message = this.state.message; 
//         const userId = this.props.activeUser.activeUserId;
//         const conversationId = this.props.activeConversation;

//         if( !conversationId ){
//             console.log('Please select a conversation first');
//             return;
//         }

//         if(message !== '' && userId ){
//             this.props.client.sendMessage(userId, conversationId, message);
//             this.clearText();
//         } else {
//             console.log('empty message');
//         }
//     }

//     logChange = (val) => {
//         console.log("Selected: " + JSON.stringify(val));
//     }

//     renderSearchResultsList(){
//         if(this.props.searchType === 'users'){
//             const searchUsers = this.props.users;
//             const options = searchUsers.map((user)=>{
//                 return { value: user.id, label: user.username };
//             });

//             return (
//                 <Select
//                     name="form-field-name"
//                     value="one"
//                     options={options}
//                     multi={true}
//                     onChange={this.logChange}
//                 />
//             );

//             // return searchUsers.map((user) => {
//             //     console.log(user)
//             //     return(
//             //         <li key={user.id}>
//             //             {user.username}
//             //             <button onClick={this.sendMessage}>
//             //                 Send
//             //             </button>
//             //         </li>
//             //     )
//             // });
//         }
        
//     }

//     render() {
//         return(
//             <div>
//                 Search results
//                 {this.renderSearchResultsList()}
//             </div>
//         );
//     }
// }

// // function mapStateToProps(state){
// //     return {
// //         rosterUserIds: state.conversations.rosterUserIds,
// //         users: state.users.users
// //     }
// // }

// // function mapDispatchToProps(dispatch){
// //     return bindActionCreators({onLoadConverationRosterAction}, dispatch)
// // }

// // ConversationPanel.contextTypes = {
// //     store : React.PropTypes.object
// // }

// function mapStateToProps(state){
//     return {
//         users: state.users.searchResults,
//         searchType : state.users.searchType
//     }
// }

// function mapDispatchToProps(dispatch){
//     return bindActionCreators({onSearchUserResultsAction}, dispatch)
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);