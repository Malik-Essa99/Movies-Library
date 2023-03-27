# Movies-Library

# Movies-Library - v1.0

**Author Name**: Malik Alhudrub

## WRRC
 [Wrrc image](./assets/Wrrc.jpeg)

## Overview
This app is for practice purposes.

## Getting Started
on your terminal type steps are as follows:
1. Initialize : npm init -y
2. Install Packages : npm install express
3. Open vs code and run server.js file on terminal 

## Project Features
This app allows you to to send a Movie name as a request (url) and get a response as outputs on terminal, and also sends a message when requesting Favorite page it has 404 and 500 rules overidden by a function to show a specific message when any of these errors happen.

==============================

# Movies-Library - v2.0

**Author Name**: Malik Alhudrub

## WRRC
 [Wrrc image](./assets/Wrrc2.jpeg)

## Overview
This app is for practice purposes.

## Getting Started
on your terminal type steps are as follows:

1. fromt the code section clone repo to your local machine
2. Initialize : npm init -y
3. Install Packages : npm install the required packages (express,dotenv,cors,axios,nodemon)
4. Open vs code and run server.js file on terminal 

## Project Features
In this aupdate, I added a new feachure to the app, in which you can request data from a third party API called The Movie Database API, it allows you to to get and send data as query to search inside the websites information

The new features include:
+view trending movies
+search for movies
+search for actors
+view genres

==============================

# Movies-Library - v3.0

**Author Name**: Malik Alhudrub

## WRRC
 [Wrrc image](./assets/Wrrc3.jpeg)

## Overview
This app is for practice purposes.

## Getting Started
on your terminal type steps are as follows:
1. fromt the code section clone repo to your local machine
2. Initialize : npm init -y
3. Install Packages : npm install the required packages (express,dotenv,cors,axios,nodemon,pg,body-parser)
4. Open vs code and run server.js file on terminal 

## Project Features

In this update I added two new files (schema.sql and .env.sample).
created a new DB(moviesdatabase) and connected it to my app folder and .sql file
Added two new routes,/addMovie will send a (post) request and will save the body content inside the database using (body-Parser and pg)
the second routse is /getMovie will get all movie data from Database

==============================

# Movies-Library - v4.0

**Author Name**: Malik Alhudrub

## WRRC
 [Wrrc image](./assets/Wrrc4.jpeg)

## Overview
This app is for practice purposes.

## Getting Started
on your terminal type steps are as follows:
1. fromt the code section clone repo to your local machine
2. Initialize : npm init -y
3. Install Packages : npm install the required packages (express,dotenv,cors,axios,nodemon,pg,body-parser)
4. Open vs code and run server.js file on terminal 

## Project Features

In this update I added three new Routes that (Update, Delete and get) Data from database

+ Update by Id takes id from user as Query-Params and edits comments on database for a specific movie
+ Delete by Id takes id from user as Query-Params and deletes movie data from database for a specific movie
+ Update by Id takes id from user as Query-Params and display movie data from database for a specific movie
