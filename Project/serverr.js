const express = require('express')
const mongoose = require('mongoose');
require("dotenv").config();
const bodyParser = require("body-parser");
const { OpenAI } = require("openai");
const app = express()
const path = require('path');
const PORT = process.env.PORT || 3500;
const cors = require('cors')
const {logger} = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')



app.use(logger);

mongoose.connect('mongodb+srv://ericP:JEIZH4iHM99fWU0Z@cluster0.q8meogj.mongodb.net/Buildings?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err))

const buildingschema = new mongoose.Schema({
    Location: String,
    Latitude: Number,
    Longitude: Number
}, {collection: " Towson Buildings"});

const Building = mongoose.model('Building', buildingschema);
app.get('/api/allbuildings', async (req, res) => {
    const buildings = await Building.find({});
    res.json(buildings.map(b => b.Location));
  });
  
app.get('/api/coordinates/:locationCode', async (req, res) => {
    try {
      const locationCode = req.params.locationCode.toLowerCase();
      console.log("Looking for location:", locationCode);
  
      const doc = await Building.findOne({
        Location: { $regex: new RegExp(`^${locationCode}$`, 'i') }
      });
  
      if (!doc) {
        console.log("Building not found for code:", locationCode);
        return res.status(404).json({ error: 'Building not found' });
      }
  
      console.log("Found building:", doc);
  
      res.json({
        lat: doc.Latitude,
        lng: doc.Longitude
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
/*
const whitelist = ['https://www.towsonfinding.com','towsonfinding.com', 'localhost:3500','http://localhost:3500']
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}
    */
app.use(cors());
app.use(bodyParser.json());

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/style')))
app.use(express.static(path.join(__dirname, '/scripts')))
app.use(express.static(path.join(__dirname, '/images')))

//Insert API key if not using process env
key = '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'
const openai = new OpenAI({ apiKey: key });
app.post("/chat", async (req, res) => {
    const { message, page, year, major, home, buildings } = req.body;
  
    let systemPrompt = `You are a helpful campus assistant at a university. 
You know the campus well and can guide students based on:
- Home: ${home}
- Major: ${major}
- Year: ${year}

Available buildings on campus: ${buildings.join(", ")}

Suggest **THREE buildings** this student should focus on for their academic or daily life needs. Respond with clarity.
However if the user isnt asking for reccomended buildings and such
and just types some random letters or words, just reply to them as normal
asking if they need help. `;
  
    try {
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ]
      });
  
      const botReply = chatCompletion.choices[0].message.content;
      res.json({ reply: botReply });
    } catch (error) {
      console.error("OpenAI error:", error.response?.data || error.message);
      res.status(500).json({ error: "Something went wrong" });
    }
  });
   
  
  

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'home.html'));

});

app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'form.html'));

});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'home.html'));

});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'login.html'));

});
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'signup.html'));

});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));