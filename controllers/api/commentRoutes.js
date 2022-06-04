const router = require('express').Router();
const { Comment } = require('../../models/Comment')

// Get comment page
router.get('/comment', async (req, res) => {
  res.render('comment');
});

// Get a comment
router.get('/comment/:id', async (req, res) => {
  return res.render('comment-details', Comment[req.params.id]);
});

module.exports = router;
