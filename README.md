# PostIt
https://postits-app.herokuapp.com/

PostIt is a clone of the popular website Reddit. It is a fullstack app for people to share and comment on photos they have taken. It is a simple way to upload your photos with a title and allows them and others to post comments on them.

## Frontend Technologies Implemented
   * React
   * Redux

## Backend Technologies Implemented
   * Flask
   * PostgresSQL
   * PsycoPG
   * Alembic
   * AWS S3

## Upcoming Features
What is coming next for PostIt is as following:
   * The ability to upvote/downvote posts.
   * The ability to upvote/downvote comments.
   * User's will be able to create their own subreddits.
      * As a creator, they will be able to set rules and remove posts/comments which violates those rules.
      * Creators will be able to assign moderator roles, moderators would have the same remove abilities as creators.
   * Users will be able to see other user profiles and their posts.
   * The ability to leave or join any subreaddt the user wants.


## Frontend
### React
Postit is an application that uses React to display it's logic.
### Redux
To manage its state, Postit uses Redux. All calls made to the backend are done using Redux thunks.


## Backend
### Flask
Since the Backend of Postit is Python, to structure the application Flask was used to set up and manage all the routes.
### PostgresSQL
To store and help manage data for python, PostgresSQL was used.
### PsycoPG
For Postit's python backend, PsycoPG is used to translate the data from the database for python to understand it.
### Alembic
Alembic is used in Postit to help data migrate data.
### AWS S3
To handle uploading images to Postit, Amazon Web Services S3 was used.

How photos are uploaded to AWS on the backend
![Post](https://raw.githubusercontent.com/mkoerner570/postit/search/assets/Screen%20Shot%202022-01-27%20at%2011.13.31%20AM.png)

Additional functions to assist in uploading to AWS
![Helper](https://raw.githubusercontent.com/mkoerner570/postit/search/assets/Screen%20Shot%202022-01-27%20at%2010.59.38%20AM.png)

## Getting started

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/mkoerner570/postit
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:

   ```bash
   pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

## Deploy to Heroku

1. Before you deploy, don't forget to run the following command in order to
ensure that your production environment has all of your up-to-date
dependencies. You only have to run this command when you have installed new
Python packages since your last deployment, but if you aren't sure, it won't
hurt to run it again.

   ```bash
   pipenv lock -r > requirements.txt
   ```

2. Create a new project on Heroku
3. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres"
4. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
5. Run

   ```bash
   heroku login
   ```

6. Login to the heroku container registry

   ```bash
   heroku container:login
   ```

7. Update the `REACT_APP_BASE_URL` variable in the Dockerfile.
   This should be the full URL of your Heroku app: i.e. "https://flask-react-aa.herokuapp.com"
8. Push your docker container to heroku from the root directory of your project.
   (If you are using an M1 mac, follow [these steps below](#for-m1-mac-users) instead, then continue on to step 9.)
   This will build the Dockerfile and push the image to your heroku container registry.

   ```bash
   heroku container:push web -a {NAME_OF_HEROKU_APP}
   ```

9. Release your docker container to heroku

      ```bash
      heroku container:release web -a {NAME_OF_HEROKU_APP}
      ```

10. set up your database

      ```bash
      heroku run -a {NAME_OF_HEROKU_APP} flask db upgrade
      heroku run -a {NAME_OF_HEROKU_APP} flask seed all
      ```

11. Under Settings find "Config Vars" and add any additional/secret .env
variables.

12. profit

### For M1 Mac users

(Replaces **Step 8**)

1. Build image with linux platform for heroku servers. Replace
{NAME_OF_HEROKU_APP} with your own tag:

   ```bash=
   docker buildx build --platform linux/amd64 -t {NAME_OF_HEROKU_APP} .
   ```

2. Tag your app with the url for your apps registry. Make sure to use the name
of your Heroku app in the url and tag name:

   ```bash=2
   docker tag {NAME_OF_HEROKU_APP} registry.heroku.com/{NAME_OF_HEROKU_APP}/web
   ```

3. Use docker to push the image to the Heroku container registry:

   ```bash=3
   docker push registry.heroku.com/{NAME_OF_HEROKU_APP}/web
   ```
