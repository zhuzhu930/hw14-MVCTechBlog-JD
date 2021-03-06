const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');


//Post a blog, using api/blogs/create
router.post('/create', withAuth, async (req, res) => {
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

//Edit a blog, using put request and api/blogs/:id/edit
router.put('/:id/edit', withAuth, async (req, res) => {
  try {
    const editedBlog = await Blog.update(
      {
        title: req.body.title,
        content: req.body.content
      }, 
      {
        where: {
          id: req.params.id
        }
      }
    );
    //console logging data for debugging: 
    console.log('editedBlog', editedBlog);
    //if data okay, post edited blog
    res.status(200).json(editedBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Delete a blog route: 
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
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
