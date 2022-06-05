const router = require('express').Router();
const { User } = require('../../models');
const { Blog } = require('../../models/Blog')

// Get all Blogs
router.get('/blog', async (req, res) => {
  //add all res data.
  res.render('homepage');
});

// Get a blog
router.get('/blog/:id', async (req, res) => {
  //add blog id info
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
        }
      }
    ]
  });
  //? add the blog content
  // const 
  return res.render('blog-details', Blog[req.params.id]);
});

module.exports = router;
