# SpeedTyping


## Application Description
A web application for testing and training typing speed. Users will have the ability to create an account, allowing them to track progress and earn achievements. Users will also be able to create their own set of words or texts for training. By default, the application will more frequently select words that the user commonly mistypes. Unregistered users will have access to checking their WPM using predefined words from the platform. Additionally, a ranking system will be implemented based on users' typing speed and error rates.

## Project Assumptions
### Solution Architecture
The application will be developed using a three-tier architecture consisting of a database, a server, and a client. The database will be built using PostgreSQL, the server will be developed in Java with Spring, and the client will be built using React. Communication between the client and server will be carried out using REST protocols.

### Controllers
- User authentication (login and registration)
- User performance reports (time, errors)
- Account personalization (custom word database)

### Initial Database Structure Assumptions
#### Tables:
 - Users:
 A table containing user authentication data.
 - WordsContainers:
 A table containing, among other things, its name, associated with a user.
 - Words:
 A table containing words, an error coefficient (determined based on how often a user mistypes a word), associated with a word collection.

Additional tables related to user achievements and personal settings will be added during development.
This structure provides a database where a user can have multiple word collections, and each collection can contain multiple words.
This allows users to freely choose training sets from their own collections.

### API
Currently, we use the API: https://random-word-api.herokuapp.com/home to fetch words.