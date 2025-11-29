import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
app.use(cors()); // Enable Cross Origin
app.use(express.json()); // Enable JSON for transactions

const url = "mongodb+srv://admin:admin@cluster0.cc1ovsi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "project";
const client = new MongoClient(url); // Object for MongoDB

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Testing Service
app.get("/", async (req, res) => {
  res.status(200).json("Hello World from Property Value Enhancer API");
});

// SIGN UP OPERATION
app.post("/signup", async (req, res) => {
  try {
    await client.connect(); // Establish connection with MongoDB
    const db = client.db(dbName); // Connecting with the DB

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).json("302::User already exists");
    }

    const newUser = {
      ...req.body,
      createdAt: new Date(),
      role: req.body.role || 'user'
    };

    await db.collection("users").insertOne(newUser); // INSERT

    res.status(200).json("300::Registered Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json("500::Error during signup");
  } finally {
    await client.close(); // Close the Connection
  }
});

// LOGIN OPERATION
app.post("/login", async (req, res) => {
  try {
    await client.connect(); // Establish connection with MongoDB
    const db = client.db(dbName); // Connecting with the DB

    const user = await db.collection("users").findOne({
      email: req.body.email,
      password: req.body.password
    });

    if (!user)
      return res.status(200).json("301::Invalid Credentials!");

    res.status(200).json("300::Login Success");
  } catch (err) {
    console.log(err);
    res.status(500).json("500::Error during login");
  } finally {
    await client.close(); // Close the Connection
  }
});

// GET USER BY EMAIL
app.post("/getfullname", async (req, res) => {
  try {
    await client.connect(); // Establish connection with MongoDB
    const db = client.db(dbName); // Connecting with the DB

    const user = await db.collection("users").findOne({ email: req.body.email });
    if (!user)
      return res.status(200).json("301::Invalid User!");

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json("500::Error fetching user");
  } finally {
    await client.close(); // Close the Connection
  }
});

// PROPERTIES OPERATIONS
// Get all properties
app.get("/api/properties", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const properties = await db.collection("properties").find({}).toArray();
    res.status(200).json(properties);
  } catch (err) {
    console.log(err);
    res.status(500).json("500::Error fetching properties");
  } finally {
    await client.close();
  }
});

// Create property
app.post("/api/properties", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const newProperty = {
      ...req.body,
      createdAt: new Date()
    };
    const result = await db.collection("properties").insertOne(newProperty);
    res.status(201).json({ _id: result.insertedId, ...newProperty });
  } catch (err) {
    console.log(err);
    res.status(500).json("500::Error creating property");
  } finally {
    await client.close();
  }
});

// Update property
app.put("/api/properties/:id", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const result = await db.collection("properties").findOneAndUpdate(
      { id: req.params.id },
      { $set: { ...req.body, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
    res.status(200).json(result.value);
  } catch (err) {
    console.log(err);
    res.status(500).json("500::Error updating property");
  } finally {
    await client.close();
  }
});

// Delete property
app.delete("/api/properties/:id", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    await db.collection("properties").deleteOne({ id: req.params.id });
    res.status(200).json("Property deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json("500::Error deleting property");
  } finally {
    await client.close();
  }
});

// RECOMMENDATIONS OPERATIONS
// Get all recommendations
app.get("/api/recommendations", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const recommendations = await db.collection("recommendations").find({}).toArray();
    res.status(200).json(recommendations);
  } catch (err) {
    console.log(err);
    res.status(500).json("500::Error fetching recommendations");
  } finally {
    await client.close();
  }
});

// Create recommendation
app.post("/api/recommendations", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const newRecommendation = {
      ...req.body,
      createdAt: new Date()
    };
    const result = await db.collection("recommendations").insertOne(newRecommendation);
    res.status(201).json({ _id: result.insertedId, ...newRecommendation });
  } catch (err) {
    console.log(err);
    res.status(500).json("500::Error creating recommendation");
  } finally {
    await client.close();
  }
});

// Update recommendation
app.put("/api/recommendations/:id", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const result = await db.collection("recommendations").findOneAndUpdate(
      { id: req.params.id },
      { $set: { ...req.body, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );
    res.status(200).json(result.value);
  } catch (err) {
    console.log(err);
    res.status(500).json("500::Error updating recommendation");
  } finally {
    await client.close();
  }
});

// Delete recommendation
app.delete("/api/recommendations/:id", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    await db.collection("recommendations").deleteOne({ id: req.params.id });
    res.status(200).json("Recommendation deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json("500::Error deleting recommendation");
  } finally {
    await client.close();
  }
});
