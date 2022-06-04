const router = require('express').Router();
const { Blog } = require('../../models/Blog')

// Get all Blogs
router.get('/blog', async (req, res) => {
  //add all res data.
  res.render('homepage');
});

// Get a blog
router.get('/blog/:id', async (req, res) => {
  //add blog id info
  return res.render('blog-details', Blog[req.params.id]);
});

module.exports = router;
