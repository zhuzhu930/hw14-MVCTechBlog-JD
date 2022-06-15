const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

//Create a blog, use api/blogs/create-blog: NOT working

router.post('/create-blog', withAuth, async (req, res) => {
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

//Edit a blog route: 
router.post('/:id/edit-blog', withAuth, async (req, res) => {
  try {
    const editedBlog = await Blog.create({
      id: req.params.id,
      ...req.body,
      user_id: req.session.user_id,
    });
    //console logging data for debugging: 
    console.log('editedBlog', editedBlog);
    //if data okay, post newBlog
    res.status(200).json(editedBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

//delete route: 
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
