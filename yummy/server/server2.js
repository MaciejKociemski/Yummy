import express from "express";
import session from "express-session";
import passport from "passport";
import process from "node:process";
import { Strategy as LocalStrategy } from "passport-local";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
const port = process.env.PORT || 3000;

// Połączenie z bazą danych MongoDB
mongoose.connect("mongodb://localhost/myapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Definicja modelu użytkownika
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    password: String,
  })
);

// Konfiguracja Passport.js
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Middleware dla sesji i Passport
app.use(
  session({ secret: "mysecretkey", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(bodyParser.json());

// Definicja opcji Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Express API with Swagger",
      version: "1.0.0",
    },
  },
  apis: ["./app.js"], 
};


const swaggerSpec = swaggerJsdoc(options);

// Middleware do wygenerowanej dokumentacji Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware do obsługi uwierzytelniania użytkownika
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Login failed" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ message: "Login successful" });
    });
  })(req, res, next);
});

app.get("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Logged out" });
});

// Middleware do sprawdzania stanu uwierzytelnienia
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Not authenticated" });
};

// Przykładowa chroniona ścieżka
app.get("/secure", isAuthenticated, (req, res) => {
  res.json({ message: "This is a protected resource" });
});

// Ścieżka dokumentacji Swagger
/**
 * @swagger
 * /api-docs:
 *   get:
 *     description: Otwiera interfejs Swagger UI z dokumentacją API
 *     responses:
 *       '200':
 *         description: Sukces
 */
app.get("/api-docs", (req, res) => {
  res.send('Dokumentacja Swagger: <a href="/api-docs">/api-docs</a>');
});

// Rozpoczęcie nasłuchiwania na określonym porcie
app.listen(port, () => {
  console.log(`Serwer Express nasłuchuje na porcie ${port}`);
});
