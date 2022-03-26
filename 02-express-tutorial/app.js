const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { products } = require("./data");

// app.use(express.static("./public"));
// const data = fs.readFileSync("./data.js", "utf8");
// console.log(data);

app.get("/api", (req, res) => {
  //   res.sendFile(path.resolve("./navbar-app/index.html"), (error) => {
  //     console.log(error);
  //   });

  res.json(products);
});
app.get("/api/:id", (req, res) => {
  //   res.sendFile(path.resolve("./navbar-app/index.html"), (error) => {
  //     console.log(error);
  //   });
  //   console.log(req);
  const { id } = req.params;
  //   const uniqProduct = req.url.split("/").pop();
  console.log(id);
  const result = products.find((p) => p.id === +id) || "not found";
  //   console.log(uniqProduct);
  res.json(result);
});

app.get("/api/v1/search", (req, res) => {
  const { search, limit } = req.query;
  console.log(search, limit);
  //   res.send("Hi");

  if (search && !limit) {
    console.log("inside search");
    res.json(products.filter((p) => p.name.startsWith(search)));
  }
  if (limit && !search) {
    res.json([...products].slice(0, limit));
  }
  if (limit && search) {
    res.json(
      [...products].slice(0, limit).filter((p) => p.name.startsWith(search))
    );
  } else {
    res.json(products);
  }
});
app.get("/", (req, res) => {
  //   res.send("<h1>About page</h1>");
  res.send(
    "<h1>Products api</h1> <a href ='/api'>Click here to see products</a>"
  );
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>Page not found</h1>");
});
app.listen(5000, () => {
  console.log("server listening on port 5000...");
});
