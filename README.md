# hw14-MVCTechBlog-JD

A CMS-style blog site using Handlebars.js, Sequelize and Express-session npm pakcage.

Plan:

1. writing sample html and css; ----almost done;
2. writing schema.sql, models and seeds

- schema.sql should have one database: blogs_db---done
- models:
  - User model, with (id, username, password), id will be a primary key
  - Blog model, with (id, title, content, author_name, created_date, user_id); user_id will be a foreign key;
  - comment model, with (id, comment, user_id, blog_id);
    user_id is a foreign key, and blog_id is a foreign key;
- based on the models, write userData.json and blogData.json and seeds.js to seed to database.

3. separate sample html into handlebars, including partials.

- break out sample html into main, homepage and partials, by using handlebars.

4. write routes, to send correct page to certain stage.

5. debug.
