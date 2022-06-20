const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');

//Homepage Route: localhost:3001/
router.get('/', async (req, res) => {
  try {
    //GET all blog data and JOIN with user and comment data
    const blogData = await Blog.findAll({
      include: [
        {
          model: Comment, 
          attributes: ['id', 'comment', 'blog_id', 'user_id'],
          include: {
            model: User, 
            attributes: ['id', 'username']
          }
        },
        {
          model: User, 
          attributes: ['id', 'username']
        }
      ]
    });
    // Serialize the data
    const blogs = blogData.map((blog) => blog.get({ plain: true })); 

    // render homepage
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Route to get a single blog: 
router.get('/blogs/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });

    const blog = blogData.get({ plain: true });
    console.log("Logging this blog", blog);
  
    res.render('blog-page', {
      ...blog,
      logged_in: req.session.logged_in,
    });
  } catch(err) {
    console.log(err)
    res.status(500).json(err);
  }
});

//login
router.get('/api/users/login', (req, res) => {
  if (req.session.logged_in) {
    // if a user is logged in, redirect to dashboard
    res.redirect('/dashboard');
    return;
  } else {
    res.render('login')
  };
});

//logout: 
router.get('/api/users/logout', (req, res) => {
  if(!req.session.logged_in) {
    // res.redirect('/api/users/logout');
    res.render('login');
    return;
  }
});

//Create blogs: 
router.get('/api/blogs/create', (req, res) => {
  res.render('create-blog');
});

//Edit a blog
router.get('/api/blogs/:id/edit', (req, res) => {
  const blog = {
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
  }

  res.render('edit-blog', {
    ...blog,
    logged_in: true,
  });
});


module.exports = router;
