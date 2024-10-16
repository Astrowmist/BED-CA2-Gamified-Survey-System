# Pet Kingdom: Rise of Guardians (Gamified Survey System) 

## Table of Contents
  - [Introduction](#introduction)
  - [Features](#features)
  - [Setup](#setup)
    - [Clone the Repository](#clone-the-repository)
    - [Setting Up Environment Variables](#setting-up-environment-variables)
  - [Important Note](#important-note)
  - [Install Dependencies](#install-dependencies)
  - [Database Initialization](#database-initialization)
  - [Database Schema](#database-schema)
    - [Tables](#tables)
  - [Front-End Documentation](#front-end-documentation)
    - [Main Webpages](#main-webpages)
      - [Home Page](#home-page)
      - [Login Page](#login-page)
      - [Register Page](#register-page)
      - [Owned Pets Page](#owned-pets-page)
      - [Users Page](#users-page)
      - [Survey Page](#survey-page)
      - [Quests Page](#quests-page)
      - [Store Page](#store-page)
      - [Reviews Page](#reviews-page)
      - [Profile Page](#profile-page)
    - [Other Key Pages](#other-key-pages)
  - [API Documentation](#api-documentation)
    - [Login/Register Endpoints](#loginregister-endpoints)
      - [-\> POST /api/register](#--post-apiregister)
      - [-\> POST /api/login](#--post-apilogin)
    - [User Endpoints](#user-endpoints)
      - [-\> GET /api/users](#--get-apiusers)
      - [-\> GET /api/users/{user\_id}](#--get-apiusersuser_id)
      - [-\> GET /api/users/survey/points](#--get-apiuserssurveypoints)
      - [-\> PUT /api/users/{user\_id}](#--put-apiusersuser_id)
      - [-\> GET /api/questions](#--get-apiquestions)
      - [-\> PUT /api/questions/{questions\_id}](#--put-apiquestionsquestions_id)
      - [-\> DELETE /api/questions/{questions\_id}](#--delete-apiquestionsquestions_id)
      - [-\> POST /api/questions/{questions\_id}/answers](#--post-apiquestionsquestions_idanswers)
      - [-\> GET /api/questions/{questions\_id}/answers](#--get-apiquestionsquestions_idanswers)
    - [Review Endpoints](#review-endpoints)
      - [-\> POST /api/review/{id}](#--post-apireviewid)
      - [-\> GET /api/review](#--get-apireview)
      - [-\> PUT /api/review/{id}](#--put-apireviewid)
      - [-\> DELETE /api/review/{id}](#--delete-apireviewid)
    - [Ownedpet Endpoints](#ownedpet-endpoints)
      - [-\> GET /api/ownedpet/{owner\_id}](#--get-apiownedpetowner_id)
      - [-\> GET /api/ownedpet/{owned\_pet\_id}/pet](#--get-apiownedpetowned_pet_idpet)
      - [-\> PUT /api/ownedpet/{owned\_pet\_id}/feed](#--put-apiownedpetowned_pet_idfeed)
      - [-\> PUT /api/ownedpet/{owned\_pet\_id}/shower](#--put-apiownedpetowned_pet_idshower)
      - [-\> PUT /api/ownedpet/{owned\_pet\_id}/play](#--put-apiownedpetowned_pet_idplay)
    - [Store Endpoints](#store-endpoints)
      - [-\> GET /store](#--get-store)
      - [-\> POST /api/store/{user\_id}/buy/commonchest](#--post-apistoreuser_idbuycommonchest)
      - [-\> POST /api/store/{user\_id}/buy/premiumchest](#--post-apistoreuser_idbuypremiumchest)
      - [-\> POST /api/store/{user\_id}/buy/ultimatechest](#--post-apistoreuser_idbuyultimatechest)
      - [-\> PUT /api/store/{owned\_pet\_id}/buy/{item\_id}](#--put-apistoreowned_pet_idbuyitem_id)
    - [Quest Endpoints](#quest-endpoints)
      - [-\> GET /api/quest](#--get-apiquest)
      - [-\> GET /api/quest/{quest\_id}](#--get-apiquestquest_id)
      - [-\> PUT /api/quest/{quest\_id}/pet/{owned\_pet\_id}](#--put-apiquestquest_idpetowned_pet_id)
  
## Introduction
Pet Kingdom: Rise of Guardians is an exciting RPG-inspired game where players engage in various activities with their digital pets. Players earn points by answering survey questions, which they can then use within the game. These points allow players to acquire, feed, shower, and play with their pets. Additionally, players can open chests to discover new pets, purchase armor to strengthen their pets, complete challenging quests, and even breed their pets to create unique offspring. Drawing inspiration from popular games like Dragon City and Talking Tom, Pet Kingdom: Rise of Guardians offers a rich and interactive experience for all players.


## Features
1. Pet Management: Feed, shower, and play with your pets to keep them happy and healthy.
2. Chest System: Open chests to obtain new pets of varying rarities.
3. Store: Buy new armor for your pets to enhance their abilities.
4. Quests: Complete quests to earn rewards and progress through the game.

## Setup
### Clone the Repository

1. Open Visual Studio Code (VSCode) on your local machine.

2. Click on the "Source Control" icon in the left sidebar (the icon looks like a branch).

3. Click on the "Clone Repository" button.

4. In the repository URL input field, enter ``.

5. Choose a local directory where you want to clone the repository.

6. Click on the "Clone" button to start the cloning process.

### Setting Up Environment Variables

This repository provides instructions for setting up environment variables using a `.env` file in an Express.js application. The environment variables will be used in the `db.js` file located in the `src/services` directory.


To set up environment variables for your Express.js application, follow these steps:

1. Create a file named `.env` in the root directory of your project.
2. Open the `.env` file and add the following lines:

   ```
   DB_HOST=<your_database_host>
   DB_USER=<your_database_user>
   DB_PASSWORD=<your_database_password>
   DB_DATABASE=<your_database_name>
   JWT_SECRET_KEY=<your_secret_key>
   JWT_EXPIRES_IN=<duration>
   JWT_ALGORITHM=<selected_algorithm>
   ```

   Replace `<your_database_host>`, `<your_database_user>`, `<your_database_password>`, and `<your_database_name>` with the appropriate values for your database connection.

   Replace `<your_secret_key>`, `<duration>`, and `<selected_algorithm>` with the appropriate values for your JSON web token usage.

   For example:

   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=1234
   DB_DATABASE=reviews
   JWT_SECRET_KEY=your-secret-key
   JWT_EXPIRES_IN=15m
   JWT_ALGORITHM=HS256
   ```

   Note: Make sure there are no spaces around the equal sign (=) in each line.

3. Save the `.env` file.


## Important Note

Ensure that the `.env` file is included in your `.gitignore` file to prevent sensitive information (such as database credentials) from being exposed in your version control system.

That's it! You have successfully set up environment variables using a `.env` file in your Express.js application. These variables can now be accessed in the `db.js` file or any other part of your application where needed.

Now you can move on to next part below.

## Install Dependencies

1. Open the terminal in VSCode by going to `View` > `Terminal` or using the shortcut `Ctrl + ``.

2. Navigate to the project root directory.

3. Install the required dependencies using npm:

   ```
   npm install
   ```

## Database Initialization

1. Make sure you have a MySQL database available for the mock test. Update the database configuration details in the `.env` file.

2. To initialize the database tables and populate them with sample data, open the terminal in VSCode and run the following command:

   ```
   npm run init_tables
   ```

## Database Schema
### Tables
- **user**: Stores user information.
- **surveyquestion**: Stores survey questions.
- **useranswer**: Stores the user's answers for survey questions.
- **pets**: Stores all pet information.
- **ownedpet**: Stores information about pets owned by users.
- **store**: Stores information about store items (chests,armours).
- **quests**: Stores quest information.
- **completedquest**: Stores the completed quests for each pet.  
  
Look at `src/configs/initTables.js` for more information
## Front-End Documentation
### Main Webpages

#### Home Page
**URL:** `/index.html`

**Description:** 
The Home Page serves as the entry point to the website. It provides an overview of the site's features and allows users to navigate to different sections.

**Key Features:**
- Welcome message
- Introduction to the website
- Instructions on how to interact with the gamified elements

#### Login Page
**URL:** `/login.html`

**Description:** 
The login page is where the users login to access their account and profile. Note that without registering/logging in most of the webiste's functionality is limited.

**Key Features:**
- Login form

#### Register Page
**URL:** `/register.html`

**Description:** 
The Register page is where the users create their account.

**Key Features:**
- Register form
  
#### Owned Pets Page
**URL:** `/pets.html`

**Description:**
The Owned Pets Page lists pets owned by different users. Users can view their pets and see details about each one.

**Key Features:**
- List of owned pets
- Pet details (name, type, etc.)

#### Users Page
**URL:** `/users.html`

**Description:**
The Users page lists all the registered users

**Key Features:**
- List of users with thier details

#### Survey Page
**URL:** `/survey.html`

**Description:**
The Survey Page displays the survey questions and the options to update/delete/create questions. There is also a button to view all answers of a particular question, which would redirect to another html.

**Key Features:**
- List of survey questions
- Buttons to edit/delete/create questions
- Button to view all answers of a particular question

#### Quests Page
**URL:** `/quest.html`

**Description:**
The Store Page displays all the quests

**Key Features:**
- List all the quests, including the quest description and boss stats
- Buttons to accept quests

#### Store Page
**URL:** `/store.html`

**Description:**
The Store Page displays all the store items such as the Chests and Armours

**Key Features:**
- List all the store items
- Button to buy store items


#### Reviews Page
**URL:** `/review.html`

**Description:**
The Review Page displays all the reviews created and the options to update/delete/create reviews.

**Key Features:**
- List of Reviews
- Buttons to edit/delete/create Reviews

#### Profile Page
**URL:** `/profile.html`

**Description:**
The Profile page displays the user's details, including the user's points and the number of completed questions. It also displays the user's pets.

**Key Features:**
- List of User's Pets
- Button to update User's username
- Buttons to Play/Shower/Feed Pets
- Buttons to view Pet details

### Other Key Pages
- **URL:** `/showAnswers.html`
  - **Description:** Webpage to show all answers of a particular question
- **URL:** `/singlePetInfo.html.html`
  - **Description:** Webpage to display pet details
- **URL:** `/singlePetInfoProfile.html`
  - **Description:** Webpage to display pet details with slightly more details
- **URL:** `/updateQuestion.html`
  - **Description:** Webpage to update a survey question
- **URL:** `/chooseArmourPet.html`
  - **Description:** Webpage to choose the pet which you want to equip the armour from the Store
- **URL:** `/chooseQuestPet.html`
  - **Description:** Webpage to choose the pet which you want to embark on the quest
## API Documentation
### Login/Register Endpoints
#### -> POST /api/register
Register a user. Essentially creating a new user in the database. Note that every new user will get a default pet, either a dog or a cat.

**Example Request:**
```json
{
 "username": "superSOC",
 "password": "superSOC"
}
```

**Response:** 
- **200 OK**, if successful. Example Response body:
```json
[
 {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInRpbWVzdGFtcCI6IjIwMjQtMDctMzBUMDU6NTI6NTEuNDc3WiIsImlhdCI6MTcyMjMxODc3MSwiZXhwIjoxNzIyMzE5NjcxfQ.InjnOyLdvTD52_kdHLwXLqVhyWYMDxVHtV2WuK2hPUM"
 }
]
```
**Error Handling:**
- **409 Conflict**, if username is already associated with another user.
- **400 Bad Request**, if the username/password is undefined

#### -> POST /api/login
Register a user. Essentially creating a new user in the database.

**Example Request:**
```json
{
 "username": "superSOC",
 "password": "superSOC"
}
```

**Response:** 
- **200 OK**, if successful. Example Response body:
```json
[
 {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInRpbWVzdGFtcCI6IjIwMjQtMDctMzBUMDU6NTI6NTEuNDc3WiIsImlhdCI6MTcyMjMxODc3MSwiZXhwIjoxNzIyMzE5NjcxfQ.InjnOyLdvTD52_kdHLwXLqVhyWYMDxVHtV2WuK2hPUM"
 }
]
```
**Error Handling:**
- **400 Bad Request**, if the username/password is undefined
- **404 Not Found**, if the user not found
- **401 Unauthorized**, if the user not found

### User Endpoints
#### -> GET /api/users 
Retrieve a list of all users with their respective user_id, username, and points

**Response:**
- **200 OK**, if successful. Example Response body:
```json
[
 {
  "user_id": 1,
  "username": "socuser321",
  "points": 0
 },
 {
  "user_id": 2,
  "username": "surveyKing",
  "points": 0
 }
]
```
#### -> GET /api/users/{user_id}
Retrieve details of a specific user by providing their user_id.

**Response:** 
- **200 OK**, if successful. Example Response body:
```json
{
 "user_id": 1,
 "username": "greenUser123",
 "completed_questions": 10,
 "points ": 10
}
```
**Error Handling:**
- **404 Not Found**, if the requested user_id does not exist.
- **401 Unauthorized**, if the token is expired or empty.

#### -> GET /api/users/survey/points
Retrieve the points of a specific user by providing their token

**Response:** 
- **200 OK**, if successful. Example Response body:
```json
[ 
 {
  "points ": 10
 }
]
```
**Error Handling:**
- **401 Unauthorized**, if the token is expired or empty.


#### -> PUT /api/users/{user_id}
Update user details by providing user_id in the URL and updating username in the request body.  

**Example Request:**
```json
{
 "username": " superSOC"
}
```

**Response:**
- **200 OK**, if successful. Example Response body:
```json
{
 "user_id": 1,
 "username": " superSOC ",
 "points ": 10
}
```
**Error Handling:**
- **404 Not Found**, if the requested user_id does not exist.
- **409 Conflict**, if the provided username is already associated with another user.
- **401 Unauthorized**, if the token is expired or empty.
#### -> GET /api/questions
Retrieve a list of all questions with their respective question_id, question, and creator_id.

**Response:**
- **200 OK**, if successful. Example Response body:
```json
[
 {
  "question_id": 1,
  "question": "Do you buy fruits from FC6?",
  "creator_id ": 1
 },
 {
  "question_id": 2,
  "question": "Is the fried chicken at FC5 salty?",
  "creator_id ": 1
 }
]
```

#### -> PUT /api/questions/{questions_id}
Update question details by providing question_id in the URL and updating questions in the request body.

**Example Request:**
```json
{
  "user_id": 1,
  "question": "Do you buy fruits from FC4?"
}
```

**Response:**
- **200 OK**, if successful. Example Response body:
```json
{
 "question_id": 1,
 "question": "Do you buy fruits from FC4?",
 "creator_id ": 1
}
```
**Error Handling:**
- **400 Bad Request**, if the request body is missing question or user_id.
- **404 Not Found**, if the requested question_id does not exist.
- **403 Forbidden**, if creator_id is different from user_id due to not correct owner.
- **401 Unauthorized**, if the token is expired or empty.
  

#### -> DELETE /api/questions/{questions_id}
Delete a question by providing its question_id. The question's associated user answer, if any, will also be deleted

**Response:**
- **204 No Content**, if successful.  

**Error Handling:**  
 - **404 Not Found**, if the requested question_id does not exist.
 - **401 Unauthorized**, if the token is expired or empty.
 - **403 Forbidden**, if creator_id is different from user_id due to not correct owner.


#### -> POST /api/questions/{questions_id}/answers
Create an answer from a user (marking a survey question complete) by providing question_id in URL parameter and user_id, answer creation_date, and additional_notes in the request body. Upon successfully completing a survey question, the user will receive 5
points.

**Example Request:**
```json
{
 "user_id": 1,
 "answer": true,
 "creation_date": "2023-07-30",
 "additional_notes": "I love it"
}
```

**Response:**
- **201 Created**, if successful. Example Response body:
```json
{
 "answer_id": 1,
 "answered_question_id": 1,
 "participant_id": 1,
 "answer": true,
 "creation_date" :"2023-07-30",
 "additional_notes": "I love it"
}
```
**Error Handling:**
- **400 Bad Request**, if the request body is missing creation_date,answer or user_id.
- **404 Not Found**, if the requested user_id does not exist.
- **401 Unauthorized**, if the token is expired or empty.
  
#### -> GET /api/questions/{questions_id}/answers
Retrieve answers given by participant on a particular question by providing its questions_id. 

**Response:**
- **200 OK**, if successful. Example Response body:
```json
[
 {
  "participant_id": 2,
  "answer": true,
  "creation_date" :"2023-07-30",
  "additional_notes": "I love it"
 },
 {
  "participant_id": 3,
  "answer": false,
  "creation_date" :"2023-07-30",
  "additional_notes": "I don’t like fruits"
 }
]
```
**Error Handling:**
- **404 Not Found**, if the requested question_id does not have any answer.
- **401 Unauthorized**, if the token is expired or empty.

### Review Endpoints
#### -> POST /api/review/{id}
Create an review from a user. The review amount can only be 1-5.

**Example Request:**
```json
{
 "review_amt": 1
}
```

**Response:**
- **201 Created**, if successful. Example Response body:
```json
{
 "message": "Review successfully created"
}
```
**Error Handling:**
- **400 Bad Request**, if the request body is missing review amount or the review amount is more than 5 or less than 5.
- **401 Unauthorized**, if the token is expired or empty.

#### -> GET /api/review
Retrieve all reviews given by users.

**Response:**
- **200 OK**, if successful. Example Response body: 
```json
[
  {
    id: 1,
    review_amt: 4,
    user_id: 1,
    created_at: '2024-07-29 09:55:16',
    username: 'no'
  },
  {
    id: 3,
    review_amt: 5,
    user_id: 2,
    created_at: '2024-07-30 11:45:45',
    username: 'hi'
  }
]
```

#### -> PUT /api/review/{id}
Update review by providing review_id in the URL and updating in the request body.

**Example Request:**
```json
{
  "review_amt": 5
}
```

**Response:**
- **204 No Content**, if successful. Example Response body:

**Error Handling:**
- **400 Bad Request**, if the request body is missing review amount or the review amount is more than 5 or less than 5.
- **401 Unauthorized**, if the token is expired or empty.
- **403 Forbidden**, if you are not the owner of this Review.
  

#### -> DELETE /api/review/{id}
Delete a review by providing its id.

**Response:**
- **204 No Content**, if successful.  

**Error Handling:**  
 - **404 Not Found**, if the requested review does not exist.
 - **401 Unauthorized**, if the token is expired or empty.
 - **403 Forbidden**, if you are not the owner of this Review.

### Ownedpet Endpoints

#### -> GET /api/ownedpet/{owner_id}
Retrieve  all pets owned by a user by providing their owner_id. 

**Response:**
- **200 OK**, if successful. Example Response body:
```json
[
    {
        "pet_name": "Dog",
        "category": "common",
        "type1": "Melee",
        "type2": null,
        "type3": null,
        "owned_pet_id": 1,
        "owner_id": 1,
        "pet_id": 1,
        "pet_level": 1,
        "pet_hp": 20,
        "pet_atk": 30,
        "pet_def": 25,
        "last_fed": "2024-06-23 12:17:53",
        "last_showered": "2024-06-23 12:17:53",
        "last_time_spent": "2024-06-23 12:17:53",
        "armour_id": null,
        "armour_atk": null,
        "armour_def": null,
        "armour_name": null,
        "armour_desc": null
    },
    {
        "pet_name": "Aquacat",
        "category": "common",
        "type1": "Water",
        "type2": "Melee",
        "type3": null,
        "owned_pet_id": 4,
        "owner_id": 1,
        "pet_id": 4,
        "pet_level": 1,
        "pet_hp": 22,
        "pet_atk": 28,
        "pet_def": 30,
        "last_fed": "2024-06-23 12:32:35",
        "last_showered": "2024-06-23 12:32:35",
        "last_time_spent": "2024-06-23 12:32:35",
        "armour_id": null,
        "armour_atk": null,
        "armour_def": null,
        "armour_name": null,
        "armour_desc": null
    }
]
```
**Error Handling:**
- **404 Not Found**, if the requested owner_id does not have any pets.
- **401 Unauthorized**, if the token is expired or empty.

#### -> GET /api/ownedpet/{owned_pet_id}/pet
Retrieve a specific pet's details by providing its owned_pet_id. 

**Response:**
- **200 OK**, if successful. Example Response body:
```json
[
    {
        "pet_name": "Dog",
        "category": "common",
        "type1": "Melee",
        "type2": null,
        "type3": null,
        "owned_pet_id": 1,
        "owner_id": 1,
        "pet_id": 1,
        "pet_level": 1,
        "pet_hp": 20,
        "pet_atk": 30,
        "pet_def": 25,
        "last_fed": "2024-06-23 12:17:53",
        "last_showered": "2024-06-23 12:17:53",
        "last_time_spent": "2024-06-23 12:17:53",
        "armour_id": null,
        "armour_atk": null,
        "armour_def": null,
        "armour_name": null,
        "armour_desc": null
    }
]
```
**Error Handling:**
- **404 Not Found**, if the requested owned_pet_id does not exist.
  
#### -> PUT /api/ownedpet/{owned_pet_id}/feed
Feed a pet by providing its owned_pet_id.
Cooldown: 1 hour  
Cannot feed pet if cooldown is not over

**Response:**
- **200 OK**, if successful. Example Response body:
```json
{
    "message": "Yum! Your pet just had a delicious meal and is feeling full and happy."
}
```
**Error Handling:**
- **404 Not Found**, if the requested owned_pet_id does not exist.
- **409 Conflict**, if the cooldown is not over yet
- **401 Unauthorized**, if the token is expired or empty.

#### -> PUT /api/ownedpet/{owned_pet_id}/shower
Shower a pet by providing its owned_pet_id.
Cooldown: 1.5 hour  
Cannot shower pet if cooldown is not over

**Response:**
- **200 OK**, if successful. Example Response body:
```json
{
    "message": "Splish splash! Your pet just had a refreshing shower and smells fantastic."
}
```
**Error Handling:**
- **404 Not Found**, if the requested owned_pet_id does not exist.
- **409 Conflict**, if the cooldown is not over yet.
- **401 Unauthorized**, if the token is expired or empty.

#### -> PUT /api/ownedpet/{owned_pet_id}/play
Play with your pet by providing its owned_pet_id.
Cooldown: 1 hour  
Cannot play with pet if cooldown is not over.

**Response:**
- **200 OK**, if successful. Example Response body:
```json
{
    "message": "Woohoo! Your pet just had an epic playtime session"
}
```
**Error Handling:**
- **404 Not Found**, if the requested owned_pet_id does not exist.
- **409 Conflict**, if the cooldown is not over yet.
- **401 Unauthorized**, if the token is expired or empty.

### Store Endpoints

#### -> GET /store
Retrieve all store items. 

**Response:**
- **200 OK**, if successful. Example Response body:
```json
[
    {
        "item_id": 1,
        "item_name": "Common Chest",
        "item_desc": "Has a chance to drop a common or rare pet",
        "cost": 50,
        "atk": null,
        "def": null,
        "category": "common"
    },
    {
        "item_id": 2,
        "item_name": "Premium Chest",
        "item_desc": "Has a chance to drop a common, rare, very rare, or unique pet",
        "cost": 100,
        "atk": null,
        "def": null,
        "category": "premium"
    },
    {
        "item_id": 3,
        "item_name": "Ultimate Chest",
        "item_desc": "Has a chance to drop a very rare, unique, mythic, or god pet",
        "cost": 150,
        "atk": null,
        "def": null,
        "category": "ultimate"
    },
    {
        "item_id": 4,
        "item_name": "Leather Armor",
        "item_desc": "Basic leather armor set",
        "cost": 20,
        "atk": 20,
        "def": 30,
        "category": "common"
    },
    ...
]
```

#### -> POST /api/store/{user_id}/buy/commonchest
Buy a common chest from store by providing the player's user_id.  
Has a chance to drop a common or rare pet.   
Cost: *50 points*

**Probability**  
Common Pet - 75%   
Rare Pet - 25%    

**Response:**
- **200 OK**, if successful. Example Response body:
```json
{
    "message": "You just got a common pet !!!",
    "Pet Stats": {
        "pet_name": "Lynx",
        "category": "common",
        "type1": "Melee",
        "type2": null,
        "type3": null,
        "owned_pet_id": 6,
        "owner_id": 2,
        "pet_id": 13,
        "pet_level": 1,
        "pet_hp": 26,
        "pet_atk": 28,
        "pet_def": 25,
        "last_fed": "2024-06-23 13:13:12",
        "last_showered": "2024-06-23 13:13:12",
        "last_time_spent": "2024-06-23 13:13:12",
        "armour_id": null,
        "armour_atk": null,
        "armour_def": null,
        "armour_name": null,
        "armour_desc": null
    }
}
```
**Error Handling:**
- **404 Not Found**, if user_id does not exist.
- **402 Payment Required**, if player does not have enough points to purchase the chest
- **401 Unauthorized**, if the token is expired or empty.


#### -> POST /api/store/{user_id}/buy/premiumchest
Buy a premium chest from store by providing the player's user_id.  
Has a chance to drop a common, rare, very rare, or unique pet   
Cost: *100 points*

**Probability**  
Common Pet - 55%   
Rare Pet - 25%  
Very Rare - 15%  
Unique - 5%    

**Response:**
- **200 OK**, if successful. Example Response body:
```json
{
    "message": "You just got a rare pet !!!",
    "Pet Stats": {
        "pet_name": "Thunderclaw",
        "category": "rare",
        "type1": "Electric",
        "type2": "Melee",
        "type3": null,
        "owned_pet_id": 7,
        "owner_id": 2,
        "pet_id": 31,
        "pet_level": 1,
        "pet_hp": 35,
        "pet_atk": 38,
        "pet_def": 32,
        "last_fed": "2024-06-23 13:23:14",
        "last_showered": "2024-06-23 13:23:14",
        "last_time_spent": "2024-06-23 13:23:14",
        "armour_id": null,
        "armour_atk": null,
        "armour_def": null,
        "armour_name": null,
        "armour_desc": null
    }
}
```
**Error Handling:**
- **404 Not Found**, if user_id does not exist.
- **402 Payment Required**, if player does not have enough points to purchase the chest
- **401 Unauthorized**, if the token is expired or empty.


#### -> POST /api/store/{user_id}/buy/ultimatechest
Buy a ultimate chest from store by providing the player's user_id.  
Has a chance to drop a very rare, unique, mythic, or god pet  
Cost: *150 points*

**Probability**  
Very Rare - 55%  
Unique - 20%   
Mythic - 15%  
God - 5%   

**Response:**
- **200 OK**, if successful. Example Response body:
```json
{
    "message": "You just got a unique pet !!!",
    "Pet Stats": {
        "pet_name": "Aqualisk",
        "category": "unique",
        "type1": "Water",
        "type2": "Dragon",
        "type3": null,
        "owned_pet_id": 8,
        "owner_id": 2,
        "pet_id": 57,
        "pet_level": 1,
        "pet_hp": 110,
        "pet_atk": 140,
        "pet_def": 120,
        "last_fed": "2024-06-23 13:29:13",
        "last_showered": "2024-06-23 13:29:13",
        "last_time_spent": "2024-06-23 13:29:13",
        "armour_id": null,
        "armour_atk": null,
        "armour_def": null,
        "armour_name": null,
        "armour_desc": null
    }
}
```
**Error Handling:**
- **404 Not Found**, if user_id does not exist.
- **402 Payment Required**, if player does not have enough points to purchase the chest
- **401 Unauthorized**, if the token is expired or empty.


#### -> PUT /api/store/{owned_pet_id}/buy/{item_id}
Buy armour from store by providing the pet's owned_pet_id and the armour's item_id. Armour will be immediately equipped by the pet. If the pet had armour already on, it would get replaced and the old armour would get deleted. 
Cost: *Depends on type of armour*

**Response:**
- **200 OK**, if successful. Example Response body:
```json
{
    "message": "Congratulations! Cat just got equipped with the awesome Iron Armor! Ready to take on the world in style and strength!",
    "Pet Stats": {
        "pet_name": "Cat",
        "category": "common",
        "type1": "Melee",
        "type2": null,
        "type3": null,
        "owned_pet_id": 2,
        "owner_id": 2,
        "pet_id": 2,
        "pet_level": 1,
        "pet_hp": 18,
        "pet_atk": 25,
        "pet_def": 32,
        "last_fed": "2024-06-23 12:18:04",
        "last_showered": "2024-06-23 12:18:04",
        "last_time_spent": "2024-06-23 12:18:04",
        "armour_id": 5,
        "armour_atk": 25,
        "armour_def": 35,
        "armour_name": "Iron Armor",
        "armour_desc": "Sturdy iron armor set"
    }
}
```
**Error Handling:**
- **404 Not Found**, if owned_pet_id or item_id does not exist.
- **402 Payment Required**, if player does not have enough points to purchase the armour
- **401 Unauthorized**, if the token is expired or empty.
- **400 Bad Request**, if item_id is < 4. item_id 1-3 is reserved for the 3 chests.

### Quest Endpoints

#### -> GET /api/quest
Retrieve details of all quests. 

**Response:**
- **200 OK**, if successful. Example Response body:
```json
[
    {
        "quest_id": 1,
        "quest_level": 1,
        "quest_name": "The Goblin Menace",
        "quest_desc": "Defeat the Goblin King terrorizing the village.",
        "boss_atk": 15,
        "boss_def": 10,
        "boss_hp": 100
    },
    {
        "quest_id": 2,
        "quest_level": 2,
        "quest_name": "Bandit Hideout",
        "quest_desc": "Clear out the bandits hiding in the forest.",
        "boss_atk": 20,
        "boss_def": 15,
        "boss_hp": 120
    },
    {
        "quest_id": 3,
        "quest_level": 3,
        "quest_name": "Wolf Pack",
        "quest_desc": "Defeat the leader of the wild wolves.",
        "boss_atk": 25,
        "boss_def": 20,
        "boss_hp": 140
    },
    ...
]
```

#### -> GET /api/quest/{quest_id}
Retrieve details of a specific quest by specifying its quest_id. 

**Response:**
- **200 OK**, if successful. Example Response body:
```json
{
    "quest_id": 1,
    "quest_level": 1,
    "quest_name": "The Goblin Menace",
    "quest_desc": "Defeat the Goblin King terrorizing the village.",
    "boss_atk": 15,
    "boss_def": 10,
    "boss_hp": 100
}
```
**Error Handling:**
- **404 Not Found**, if the requested quest_id does not exist
  
#### -> PUT /api/quest/{quest_id}/pet/{owned_pet_id}
Complete a quest by specifying the quest_id of the quest and the owned_pet_id of the pet that the player wants to use for the quest. The pet's stats and the quest's boss's stats are computed to determine the winner. If the pet wins, it levels up, increasing all its stats by 5.  
A Pet cannot redo a quest that it has already completed.

**Response:**
- **200 OK**, if:
  - Pet ***wins***. Example Response body:
```json
{
    "message": "Congratulations! Cat triumphed in the quest The Goblin Menace and came back victorious!",
    "Your pet has leveled up !\n": {
        "pet_name": "Cat",
        "category": "common",
        "type1": "Melee",
        "type2": null,
        "type3": null,
        "pet_level": 2,
        "pet_hp": 23,
        "pet_atk": 30,
        "pet_def": 37
    }
}
```
 - Pet ***loses***. Example Response body:
```json
{
    "message": "Oh no! Dog gave it their all but couldn't complete the quest this time. Mission Failed, We'll get'em next time"
}
```
**Error Handling:**
- **404 Not Found**, if the requested quest_id or owned_pet_id does not exist.
- **409 Conflict**, if the pet has already completed the quest.
- **409 Conflict**, if the pet is dirty.
- **409 Conflict**, if the pet is hungry.
- **409 Conflict**, if the pet is upset.
- **401 Unauthorized**, if the token is expired or empty.