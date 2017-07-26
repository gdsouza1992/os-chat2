import { normalize, schema } from 'normalizr';
 
const Schema = {}

// Define a users schema
Schema.user = new schema.Entity('users');

// Define your comments schema
Schema.comment = new schema.Entity('comments', {
  commenter: Schema.user
});

// Define your article 
Schema.article = new schema.Entity('articles', { 
  author: Schema.user,
  comments: [ Schema.comment ]
});
 
module.exports = Schema