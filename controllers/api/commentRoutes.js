const router = require('express').Router();
const { Comment, User, Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// Get comment page: api/comments/
router.get('/', async (req, res) => {
  //add comment data
  Comment.findAll({})
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    }); 
});

// Get a comment: api/comments/:id
router.get('/blogs/:id', async (req, res) => {
  const commentData = await Comment.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['username'],
      },
      {
        model: Blog,
        include: {
          model: User,
          attributes: ['username'],
        },
      },
    ],
  });

  const comment = commentData.get({ plain: true });
  //Render blog-page to show the related comment
  res.render('blog-page', {
    ...comment,
    logged_in: true,
  });
});

//Under a certain blog, post comment
router.post('/blogs/:id', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      blog_id: req.params.id
    });
    //console logging data for debugging: 
    console.log('newComment', newComment);
    //if data okay, post newComment
    res.status(200).json(newComment);

    res.render('blog-page', {
      ...newComment,
      logged_in: true,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
