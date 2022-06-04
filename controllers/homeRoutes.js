const router = require('express').Router();
const { User } = require('../models');
const { Blog } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const blogs = blogData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    // res.redirect('/api/login');
    res.render('login');
    return;
  }

  res.render('login');
});

router.get('/logout', (req, res) => {
  if(!req.session.logged_in) {
    // res.redirect('/api/logout');
    res.render('homepage');
    return;
  }
})

router.get('/signup', (req, res) => {
   res.render('signup');
})

module.exports = router;
