**Members Only Club**

A full-stack authentication and authorization project built with Node.js, Express, PostgreSQL, Passport.js, and EJS.

The app allows users to sign up, log in, join a private club using a secret passcode, post messages, and gain admin privileges to manage content. It demonstrates real-world patterns such as secure authentication, role-based permissions, and session handling.
<img width="1449" height="421" alt="image" src="https://github.com/user-attachments/assets/da3d5fa7-0f59-4585-adb2-ced4b9d15ba2" />


**Features**

User registration with hashed passwords (bcrypt)
<img width="1418" height="622" alt="image" src="https://github.com/user-attachments/assets/c99f81a8-e705-439c-9075-a8fec5abe899" />


Login and logout using Passport.js
<img width="1408" height="398" alt="image" src="https://github.com/user-attachments/assets/354b19c8-cb64-4e1f-8194-c29188900a8b" />


Members-only access to author names and timestamps

Admin role with permission to delete messages

Private club access via secret passcode

Session storage in PostgreSQL

Clean MVC-style structure with EJS views



**Roles & Permissions**

Guest – Can view messages only

User – Can create messages

Member – Can see author names and timestamps

Admin – Can delete messages

**Tech Stack**

Node.js

Express

PostgreSQL

Passport.js

EJS

bcrypt

connect-pg-simple

**Live Demo**

https://membersonly-2hf5.onrender.com/


