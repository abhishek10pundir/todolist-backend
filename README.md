# todolist-backend
 
<h1><b>Project Description-</b><h1></br>
This project is aimed to create a ready to deploy Live TODO List management system.</br>
<h2><b>Features of the Application -</b></h2></br>
<b>1) User management System -</b></br>
a) Signup - User is be able to sign up on the platform providing all
details like FirstName, LastName, Email and Mobile number. Country
code for mobile number (like 91 for India) is also be stored.  </br>
b) Login - user is be able to login using the credentials provided at
signup.</br>
c) Forgot password - User is be able to recover password using a link or
code on email.Nodemailer is used to send emails.  
<h2><b>2) To do list management (single user) -</b></h2></br>
a) Once user logs into the system, he will see an option to create a ToDo
List</br>
b) User is be able to create, a new empty list, by clicking on a create
button</br>
c) User is  able to add, delete and edit items to the list</br>
d) User is also be able to add sub-todo-items, as child of any item node.
Such that, complete list should take a tree shape, with items and their
child items.To display tree like structure I used DFS Algorithm .</br>
e) User is be able to mark an item as "done" or "open".</br>
f) User is be able to see his old ToDo Lists, once logged in.</br>
g)User is able to undo, any number of actions, done in past.
Each undo action, should remove the last change, done by any user. So,
history of all actions is persisted in database, so as, not to
lose actions done in past.</br>
h) Undo action is happen by a button on screen, as well as, through
keyboard command, which is "ctrl+z" on windows .</br>
<h2><b>3) Friend List -</b></h2></br>
a) User is also be able to send friend requests, to the users on the
system. Once requests are accepted, the friend is  added in user's
friend list. Friends will be Notified, in real time using notifications.</br>
<h2><b>4) To do List management (multi-user) -</b></h2></br>
a) Friends is be able to edit, delete, update the list of the user.</br> 
5) Error Views and messages - Each major error response
(like 404 or 500)are handled with a different page. Also, all kind of errors, exceptions and
messages are  be handled on frontend.  
