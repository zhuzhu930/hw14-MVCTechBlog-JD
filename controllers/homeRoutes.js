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
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    // if a user is looged in, redirect to dashboard
    res.render('dashboard');
    return;
  }
  // Otherwise, render login page
  res.render('login');
});

//Create blog page--should link to frontend
router.get('/create-blog', (req, res) => {
  res.render('create-blog', {
    logged_in: true,
  });
});

router.get('/edit-blog', (req, res) => {
  const blog = {
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    created_date: req.body.created_date,
  }

  res.render('edit-blog', {
    ...blog,
    logged_in: true,
  });
})

router.get('/blog/:id', async (req, res) => {
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

  res.render('blog-page', {
    ...blog,
    logged_in: true,
  });
});

//Need to figure out this page: 
router.get('/logout', (req, res) => {
  if(!req.session.logged_in) {
    // res.redirect('/api/logout');
    res.render('homepage');
    return;
  }
})

router.get('/signup', (req, res) => {
   res.render('signup', {
     //? Add sign up information here.
   });
})


module.exports = router;
