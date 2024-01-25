
# Phase 4 Group-Project, 22/1/2024

## REAL ESTATE MANAGEMENT APP/SYSTEM

## Authors

By:
- Brian Cherus
- Mark Mwangi
- Arnold Juma

## Table of Contents

- [Project Description](#project-description)
- [Key Features/MVP](#key-featuresmvp)
- [Setup/Installation Requirements](#setup/installation-requirements)
- [Live Link](#live-link)
- [Known Bugs](#known-bugs)
- [Technologies Used](#technologies-used)
- [Support and contact details](#support-and-contact-details)
- [License](#license)

## Project Description

For this project, we are going to collaborate on building a Full-Stack Real Estate Management System.The system will be built using React JS for the front-end and Flask, a Python Framework for the back-end. This application also ulitises class attributes and methods in addition to Object-relational mapping with SQLALchemy.

The system leverages SQLAlchemy ORM to interact with a well-structured database. It comprises of three interconnected tables:
1. User: Store details of users, including username, email and password.
2. Properties: Maintain Property information, such as name,price and address.
3. Reviews: Associate reviews with specific customers and propeerties.

### Overview

The Real Estate Management System provides a comprehensive solution for managing various aspects of a real estate firm/company, including:

- Propert Management: Easily add, update, and remove various properties from the system.
- User Management: Maintain a database of user/customer information for seamless transactions.
- Review Tracking: Keep track of user reviews associated with specific properties.

## Key Features/MVP

### A user can:

#### Create:

1. Create/Sign Up for an account.
2. Create a property.

#### Read: 

1. Retrieve their account details. i.e username, email.
2. View all properties listed.
3. Read reviews associated with a certain property.
4. Retrieve details of a particuar property.

#### Update: 

1. Update their account details.
2. Update a particular property details.
3. Update a review of a certain property.

#### Delete: 

1. Delete their account.
2. Delete a particular property in the listings.
3. Delete a review on a property.

### In addition to that, a user also can:

1. Login using their account details.
2. Logout of their account.

## Setup/Installation Requirements

1. Clone the repository to any desired folder in your computer.
2. Open the folder with Visual Studio Code or any editor of your choice.
3. There are two folders in the root directory, the `server` folder and the `front-end` folder.
4. To download the dependencies for the frontend run:

```sh
npm install 
```
5. To download the dependencies for the backend, run:

```sh
pipenv install && pipenv shell 
```

You can run your Flask API on [`localhost:5555`](http://localhost:5555) by navigating to the `server` folder and run:

```sh
python3 app.py
```

You can run your React app on [`localhost:4000`](http://localhost:4000) using a separate terminal by navigating to the `front-end` folder and run:

```sh
npm start
```

6. And your application is up and running successfully.

## Live link

The Deployed Frontend can be accessed here [Frontend]   
The Deployed Backend can also be accessed here [Backend]
       
## Known Bugs

- The application runs smoothly. No detected bugs.

## Technologies used

- HTML & CSS
- Bootstrap
- React JS
- Python
- Flask
- SQLAlchemy
- Terminal


## Support and contact details

1. Brian Cherus
- email :: brian.cherus@student.moringaschool.com
- phone :: +254720560979

2. Mark Mwangi
- email :: mark.mwangi1@student.moringaschool.com
- phone :: +254770614345

3. Arnold Juma
- email :: arnold.juma@student.moringaschool.com
- phone :: +254740290741

## License

MIT License

Copyright (c) 2024 BRIAN CHERUS, MARK MWANGI, ARNOLD JUMA

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.```

