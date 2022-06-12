const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all Blogs api/blogs/
router.get('/', (req, res) => {
  //add all res data.
  res.render('homepage');
});

// this post route is added
// router.post('/', withAuth, async (req, res) => {
//   try {
//     const newBlog = await Blog.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newBlog);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// })

// Get a blog: api/blogs/:id not working
router.get('/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      // include: [{model: User}, {model: Comment }]
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
          },
        },
      ],
    });
  
    const blog = blogData.get({ plain: true });
    console.log("Logging this blog", blog);
  
    res.render('blog-page', {
      ...blog,
      logged_in: true,
    });
  } catch(err) {
    console.log(err)
    res.status(500).json(err);
  }  
});

//Create a blog, use api/blogs/create-blog: NOT working
router.get('/create-blog', (req, res) => {
  // try {
  //   res.render('create-blog', {
  //     logged_in: true,
  //   });
  // } catch (err) {
  //   console.log(err)
  //   res.status(400).json(err);
  // }
  res.render('create-blog', {
    logged_in: true,
  });
});

router.post('/create-blog', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    //console logging data for debugging: 
    console.log('newBlog', newBlog);
    //if data okay, post newBlog
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});
//Edit a blog
router.get('/:id/edit-blog', (req, res) => {
  const blog = {
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
  }

  res.render('edit-blog', {
    ...blog,
    logged_in: true,
  });
});

router.post('/:id/edit-blog', withAuth, async (req, res) => {
  try {
    const editedBlog = await Blog.create({
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
//this route should be correct.
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
