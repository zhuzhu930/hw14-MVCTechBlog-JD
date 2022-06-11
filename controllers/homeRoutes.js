const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

//this home get route is edited, should be correct.
router.get('/', async (req, res) => {
  try {
    //GET all blog data and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User, 
          attributes: ['username'],
        },
        // {
        //   model: Blog,
        //   attributes: ['createdAt'],
        // }
      ],
    });
    // Serialize the data
    const blogs = blogData.map((blog) => blog.get({ plain: true })); 
    //Print to console for debugging
    console.log('blogs', blogs);

    // render homepage
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
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
    // logging out user data for debugging
    console.log('user', user);

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

module.exports = router;
