const router = require('express').Router();
const { User } = require('../models');
const { Blog } = require('../models');
const withAuth = require('../utils/auth');
//Testing blogs data
// const blogs = [
//   {
//     title: "title",
//     content: "content",
//     author: "author",
//     created_date: "1/17/2022"
//   }
// ]

router.get('/', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll();

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

router.get('/create-blog', (req, res) => {
   res.render('create-blog');
});

router.get('/edit-blog', (req, res) => {
  res.render('edit-blog');
})

module.exports = router;
