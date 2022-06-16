const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blog, User, Comment} = require('../models'); 
const withAuth = require('../utils/auth'); 

// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async (req, res) => 
// {
//     try {
//       // Find the logged in user based on the session Id
//       const userData = await User.findByPk(req.session.user_id, {
//         //not showing password to protect user privacy
//         attributes: { exclude: ['password']},
//         include: [{ model: Blog }],
//       });
//       // Serialize user data
//       const user = userData.get({ plain: true });
  
//       res.render('dashboard', {
//         //destructuring user
//         ...user, 
//         logged_in: true
//       });
//     } catch (err) {
//       res.status(500).json(err)
//     }
//   }
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

//edit a blog route: dashboard/edit/:id
router.get(
    //Old route: '/api/blogs/:id/edit-blog', 
    '/edit/:id', withAuth, async (req, res) => 
    {
        try {
            const blogData = await Blog.findOne({
                where: {
                    //use blog id 
                    id: req.params.id
                }, 
                attributes: [
                    'id', 'title', 'content'
                ],
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
    
            const blog = blogData.get({ plain: true });

            res.render('edit-blog', { 
                ...blog, 
                logged_in: true 
            }); 
        } catch (err) {
            res.status(500).json(err)
        }  
  });


module.exports = router;