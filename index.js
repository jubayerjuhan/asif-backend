const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const uri =
  "mongodb+srv://admin:admin@cluster0.611ds.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("ecom").collection("orders");

  app.get("/", (req, res) => {
    console.log("first");
  });
  app.post("/insert-order", (req, res) => {
    collection.insertOne(req.body).then(() => {
      res.send(true);
    });
  });

  app.get("/orders", async (req, res) => {
    collection.find({}).toArray((err, doc) => {
      res.send(doc);
    });
  });
});

app.listen(4001, () => {
  console.log("Server Running...");
});
