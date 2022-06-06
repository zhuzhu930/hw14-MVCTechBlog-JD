const router = require('express').Router();
const { Comment, User, Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// Get comment page: api/comments/
router.get('/', async (req, res) => {
  //add comment data
  res.render('comment');
});

// Get a comment: api/comments/:id
router.get('/:id', async (req, res) => {
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
  //? check to see if it's okay to render comment-details
  res.render('comment-details', {
    ...comment,
    logged_in: true,
  });
});

//post a comment, api/comments/
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    //console logging data for debugging: 
    console.log('newComment', newComment);
    //if data okay, post newComment
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
