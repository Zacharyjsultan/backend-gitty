[Oauth Notes](https://github.com/alchemycodelab/student-resources/blob/main/curriculum-notes/express/lecture-notes/06a-oauth.md)

## Scripts

| command                | description                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `npm start`            | starts the app - should only be used in production as changes will not get reloaded |
| `npm run start:watch`  | runs the app using `nodemon` which watches for changes and reloads the app          |
| `npm test`             | runs the tests once                                                                 |
| `npm run test:watch`   | continually watches and runs the tests when files are updated                       |
| `npm run setup-db`     | sets up the database locally                                                        |
| `npm run setup-heroku` | sets up the database on heroku                                                      |

## User Routes

| Route                    | HTTP Method | HTTP Body                                                                              | Description                                        |
| ------------------------ | ----------- | -------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `/api/v1/users/`         | `POST`      | `{email: 'example@test.com', password: '123456', firstName: 'Test', lastName: 'User'}` | Creates new user                                   |
| `api/v1/users/sessions/` | `POST`      | `{email: 'example@test.com', password: '123456'}`                                      | Signs in existing user                             |
| `/api/v1/users/me/`      | `GET`       | None                                                                                   | Returns current user                               |
| `/api/v1/users/`         | `GET`       | None                                                                                   | Authorized endpoint - returns all users for admin. |
| `api/v1/users/sessions/` | `DELETE`    | None                                                                                   | Deletes a user session                             |
