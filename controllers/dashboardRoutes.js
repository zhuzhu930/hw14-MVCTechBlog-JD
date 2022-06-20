const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blog, User, Comment} = require('../models'); 
const withAuth = require('../utils/auth'); 

// Use withAuth middleware to prevent access to route
// Get all blogs written by the signed in user: 
router.get('/', withAuth, async (req, res) => 
{
    try {
        const blogData = await Blog.findAll({
            where: {
                //use ID from the session
                user_id: req.session.user_id
            }, 
            include: [
                {
                    model: Comment, 
                    include: {
                        model: User, 
                        attributes: ['username']
                    }
                },
                {
                    model: User, 
                    attributes: ['username']
                }
            ]
        }); 

        const blogs = blogData.map(blog => blog.get({ plain: true }));
        
        res.render('dashboard', { 
            blogs, 
            logged_in: true 
        }); 
    } catch (err) {
        res.status(500).json(err)
    }    
});

module.exports = router;