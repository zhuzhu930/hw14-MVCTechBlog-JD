//require all Models
const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

//Establish relationships: 
//One User has many blogs, one blog has one user via user_id

User.hasMany(Blog, {
    foreignKey: 'user_id',
});

Blog.belongsTo(User, {
    foreignKey: 'user_id',
});

//One User has many comments, one comment belongsto user via user_id

User.hasMany(Comment, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

//One Blog has many comments, one comment belongs to one blog via blog_id

Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
});

Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
});

//export models: 
module.exports = { User, Blog, Comment };
