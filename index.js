import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
const port = 3000;
dotenv.config(); 
const db = new pg.Client({
  /* user: "postgres",
  host: "localhost",
  database: "world",
  password: "2021",
  port: 5432, */
   user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
     ssl: {
    rejectUnauthorized: false, // Required for Render
  },
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries");
  
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

// GET home page
app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  res.render("index.ejs", { countries: countries, total: countries.length });
});

//INSERT new country
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryCode]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
      const countries = await checkVisisted();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country has already been added, try again.",
      });
    }
  } catch (err) {
    console.log(err);
    const countries = await checkVisisted();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country name does not exist, try again.",
    });
  }
});

app.post("/clear", async (req, res) => {

      try {
        await db.query('TRUNCATE TABLE visited_countries RESTART IDENTITY');
        await db.query('ALTER SEQUENCE visited_countries_id_seq RESTART WITH 1');
        res.redirect("/");
      } catch (err) {
        console.log(err);
        const countries = await checkVisisted();
        res.render("index.ejs", {
          countries: countries,
          total: countries.length,
          error: "we can't RESET"
        });
      }
});

/*app.post("/display", async (req, res) => {
  
  const result = await db.query("SELECT country_name FROM countries");
  const countries = await checkVisisted();
  res.render("index.ejs",{
    result:result,
    countries:countries,
    total: countries.length,

  });
});*/

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
