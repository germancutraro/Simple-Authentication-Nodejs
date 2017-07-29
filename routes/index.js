module.exports = app => {

  const User = require('../models/user');
  const expressValidator = require('express-validator');

  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/register', (req, res) => {
    if (req.session.email)
      res.redirect('private');
    else
      res.render('register');
  });

  app.get('/login', (req, res) => {
    if (req.session.email)
      res.redirect('private');
    else
      res.render('login');
  });

  app.get('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        res.negotiate(err);
      }
        res.redirect('/');
    });
  });

  app.get('/private', (req, res) => {
    if (req.session.email)
      res.render('private');
     else
      res.redirect('/login');
});

  app.post('/register', (req, res) => {
    // Simple form input validation
    req.check('email', 'Invalid email!').isEmail();
    req.check('name', 'name field is not valid!').notEmpty().isLength({min: 4});
    req.check('password', 'password field is not valid!').isLength({min: 4}).equals(req.body.rpassword);



    req.getValidationResult().then( result => {
      if (!result.isEmpty()) {
        res.redirect('/register');
        console.info('Error to register! verify if the information is correct.');
      } else {
        User.create(req.body).then( user => {
          console.log(`${user.name} created!`);
          req.session.email = req.body.email; // Create session
          res.redirect('/private')
        }).catch(err => console.log(err));
      }
    }); // Finish validation result
  });

  app.post('/login', (req, res) => {
    let data = { email: req.body.email, password: req.body.password };
    let query = { email: data.email, password: data.password };
    User.findOne(query).then( user => {
      if (!user) {
        console.log('Email or password incorrect!');
        return res.redirect('/login');
      }
      console.log(`${user.name} Logged!`);
      req.session.email = data.email;
      res.redirect('/private');
    }).catch(err => console.log(err));
  });

  app.get('*', (req, res) => res.redirect('/')); // 404

};
