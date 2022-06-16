const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');

//Homepage Route:
router.get('/', async (req, res) => {
  try {
    //GET all blog data and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User, 
          attributes: ['username'],
        },
      ],
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

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session Id
    const userData = await User.findByPk(req.session.user_id, {
      //not showing password to protect user privacy
      attributes: { exclude: ['password']},
      include: [{ model: Blog }],
    });
    // Serialize user data
    const user = userData.get({ plain: true });

    res.render('dashboard', {
      //destructuring user
      ...user, 
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err)
  }
});

//?why is a login in the homeroutes and a login in the userroutes?
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    // if a user is logged in, redirect to dashboard
    res.redirect('/dashboard');
    return;
  } else {
    res.render('login')
  };
});

//Need to figure out this page: 
router.get('/logout', (req, res) => {
  if(!req.session.logged_in) {
    // res.redirect('/api/users/logout');
    res.render('login');
    return;
  }
});

router.get('/api/blogs/create-blog', (req, res) => {
  res.render('create-blog');
});

router.get('/api/blogs/:id/edit-blog', (req, res) => {
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
