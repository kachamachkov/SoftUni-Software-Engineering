# Express App building algorithm

1. Initialize project
2. Nodemon
   1. install nodemon
   2. config start script
3. Express
   1. install express
   2. start initial express server
   3. add static 
   4. consume static folder
   5. add body parser urlencoded
   6. add routes module
4. Handlebars
   1. install handlebars
   2. config handlebars with express
   3. add views folder with resources
   4. add home view
   5. add home controller
   6. add home controller to routes
   7. add main layout
   8. add partials dir
5. Database
   1. install mongoose
   2. setup db connection
   3. add user model
6. Register
   1. fix navigation links
   2. add register page (controller, view, route)
   3. fix register form
   4. add auth service
   5. install bcrypt
   6. hash password
   7. check confirm password
7. Login
   1. install jsonwebtoken
   2. install cookie-parser
   3. add cookie-parser middleware
   4. Optionally: convert to promise based
   5. add login page
   6. fix login form
   7. add login post action
   8. add auth service login method
      1. validate user
      2. validate password
      3. generate token
   9. return cookie to client
8. Logout
9. Authentication & Authorization
   1.  add auth middleware
   2.  check token if guest
   3.  verify token
   4.  attach user to request object and res.locals
   5.  use middleware in express
   6.  add isAuth route guard
10. Error handling
    1.  add notifications
    2.  add getErrorMessage util
    3.  add register error handling
    4.  add login error handling
11. Last fixes
    1.  dynamic navigation