# hw14-MVCTechBlog-JD

A CMS-style blog site using Handlebars.js, Sequelize and Express-session npm pakcage.

Plan:

1. writing sample html and css; ----almost done;
2. writing schema.sql, models and seeds

- schema.sql should have one database: blogs_db---done
- models:

  - User model, with (id, username, password), id will be a primary key
    ---done
  - Blog model, with (id, title, content, author, created_date, user_id); user_id will be a foreign key;---done
  - comment model, with (id, comment, user_id, blog_id);
    user_id is a foreign key, and blog_id is a foreign key; ---done

  - write index.js in model ---done
    one user has many blogs,
    one blog has one user via user_id

  one user has many comment,
  one comment has one user via user_id

  one blog has many comment,
  one comment has one blog via blog_id

- based on the models, write userData.json and blogData.json and seeds.js to seed to database.

---model folder, seed folder, db folder all done...database seeded successfully.

3. separate sample html into handlebars, including partials.

- break out sample html into main, homepage and partials, by using handlebars. ---mainly done, but need to test all files later

4. write js files in the public folder, including login.js, logout.js, probably signup.js and comment.js

5. write routes, to send correct page to certain stage.

6. debug.

Homework session:

- question: edit-blog.handlebars should be checked.
- In the blog model, maybe add a column of comment directly to the blog, or link the comment model to the blog.
- Trey's model is set up as Post, not Blog
