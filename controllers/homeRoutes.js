const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

//this home get route is edited, should be correct.
router.get('/', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User, 
          attributes: ['username'],
        },
      ],
    });
    // serialize the data
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

router.get('/dashboard', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      //? didn't see what exactly happened, double check repo
      attributes: { exclude: ['password']},
      include: [{ model: Blog }],
    })

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user, 
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err)
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
