<p align="center" >
<img src="https://i.imgur.com/SbhNaFr.png" />
</p>
<h1 align="center"><strong>NLW - Valoriza</strong></h1>

# 📌 Description

"NLW Valoriza" is a system that allow users to git compliments to others by using tags.

---

# ⚒️ Authors

This project was made on next level week by [Dani Leão](https://github.com/danileao), instructor at [Rocketseat](https://rocketseat.com.br/).
Some functionalites or security procedures were made by the [project owner](https://github.com/galleonpt/).

---

# 💻 Tech Stack

- [**Typescript**](https://www.typescriptlang.org/) - Javascript superset to add static types to the language.
- [**NPM**](https://www.npmjs.com/) - Node Package Manager.
- [**Node.js**](https://nodejs.org/) - Plataform to run Javascript on server side.
- [**Express**](https://expressjs.com/) - Back end web application framework for Node.​js.
- [**TypeORM**](https://typeorm.io/) - ORM to query database.
- [**Sqlite**](https://www.sqlite.org/) - SQL databse.
- [**Rollbar**](https://rollbar.com/) - Log and error tracker.
- [**Send Grid**](https://sendgrid.com/) - Cloud-based SMTP provider that allows users to send email without having to maintain email server.

---

# 🔥 Features

- User Registration

  - It is not allowed to register more than one user with the same email
  - It is not allowed to register user without e-mail

- Tag Registration

  - It is not allowed to register more than one tag with the same name
  - It is not allowed to register an unnamed tag
  - Registration by users who are not administrators is not allowed

- Compliment Registration
  - The user must be authenticated in the application
  - Users are not allowed to register a compliment for themselves
  - It is not allowed to register compliments for invalid users

---

# 🚀 Optimizations / Diferent Functionalities

- Encrypt and decrypt email
- Tags must have 1st letter capitalized
- Use exception/ Custom errors
- List users by tag
- Have a error tracker - [Rollbar](https://rollbar.com/)
- Send email when an user receive a compliment

---

# 📖 Documentation

To devolop the api documentation I used [open api](https://swagger.io/specification/) and you can check it [here](https://github.com/galleonpt/NLW-Valoriza/blob/master/docs/docs.yaml).

#### Advice

Copy the docs and past it on [insomnia](https://insomnia.rest/) or [swagger editor](https://editor.swagger.io/) to have a better experience.

---

# 🤝 Contributing

Contributions are always welcome!

If you want to contribute you **must**:

- Clone the project
- Create a branch and code what you want
- Commit your modification
- Push your modifications
- Create a pull request

---

# Environment Variables

To run this project, you will need to add the following environment variables to your .env file.
On .env.sample you have all environment variables used so you must fill all of them.

### Atention

If you don't fill `PORT`, by default it is 3333.

---

## 🏃 Run Locally

- Clone the project

```bash
  git clone git@github.com:galleonpt/NLW-Valoriza.git <folder_name>
```

- Go to the project directory

```bash
  cd <folder_name>
```

- Install dependencies

```bash
  npm install
```

- Start the server

```bash
  npm run start
```
