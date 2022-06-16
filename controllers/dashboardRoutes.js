const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blog, User, Comment} = require('../models'); 
const withAuth = require('../utils/auth'); 

// Use withAuth middleware to prevent access to route
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

//create a blog route: dashboard/create
router.get('/create', (req, res) => {
    res.render('create-blog');
});


router.post('/create', withAuth, async (req, res) => {
    try {
      const newBlog = await Blog.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      //if data okay, post newBlog
      res.status(200).json(newBlog);
    } catch (err) {
      res.status(400).json(err);
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

router.put('/edit/:id', withAuth, async (req, res) => {
    try {
      const editedBlog = await Blog.update(
        {
          title: req.body.title,
          content: req.body.content
        }, 
        {
          where: {
            id: req.params.id
          }
        }
      );
      //console logging data for debugging: 
      console.log('editedBlog', editedBlog);
      //if data okay, post newBlog
      res.status(200).json(editedBlog);
    } catch (err) {
      res.status(400).json(err);
    }

    res.render('dashboard');
});

module.exports = router;