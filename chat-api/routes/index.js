// const chat = require('./chat');
const conversation = require('./conversation');
const groupMember = require('./groupMember');
const message = require('./message');
const middleware = require('./middleware');
const search = require('./search');
const user = require('./user');

module.exports = function attachRoutes(app) {
    console.log('Called this 2')

    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    //Conversation routes
    app.use('/api/conversation', conversation);
    app.use('/api/conversations', conversation);
    
    // //GroupMember routes
    app.use('/api/groupMember', groupMember);
    app.use('/api/groupMembers', groupMember);

    // Message routes
    app.use('/api/message', message);
    app.use('/api/messages', message);

    //Search route
    app.use('/api/search', search);

    // User routes
    app.use('/api/user', user);
    app.use('/api/users', user);





};

