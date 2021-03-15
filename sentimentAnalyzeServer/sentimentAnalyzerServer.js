const express = require('express');
const app = new express();

const dotenv = require('dotenv');
dotenv.config();

function getNLUInstance() {
  let api_key = process.env.API_KEY;
  let api_url = process.env.API_URL;

  const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
  const { IamAuthenticator } = require('ibm-watson/auth');

  const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2020-08-01',
    authenticator: new IamAuthenticator({
      apikey: api_key,
    }),
    serviceUrl: api_url,
  });

  return naturalLanguageUnderstanding;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
  res.render('index.html');
});

app.get("/url/emotion", (req,res) => {
  naturalLanguageUnderstanding = getNLUInstance();

  const analyzeParams = {
    "url": req.query.url,
    "features": {
      "emotion": {}
    }
  }

  naturalLanguageUnderstanding.analyze(analyzeParams).then(analysisResults => {
    let emotions = "emotions -> " +
      "sadness: " + JSON.stringify(analysisResults.result.emotion.document.emotion.sadness, null, 2) + ", " +
        "joy: " + JSON.stringify(analysisResults.result.emotion.document.emotion.joy, null, 2) + ", " +
          "fear: " + JSON.stringify(analysisResults.result.emotion.document.emotion.fear, null, 2) + ", " +
            "disgust: " + JSON.stringify(analysisResults.result.emotion.document.emotion.disgust, null, 2) + ", " +
              "anger: " + JSON.stringify(analysisResults.result.emotion.document.emotion.anger, null, 2);
    return res.send(emotions);
  }).catch(err => {
    return res.send('error:' + err);
  });
});

app.get("/url/sentiment", (req,res) => {
  naturalLanguageUnderstanding = getNLUInstance();

  const analyzeParams = {
    "url": req.query.url,
    "features": {
      "sentiment": {},
    }
  }
  
  naturalLanguageUnderstanding.analyze(analyzeParams).then(analysisResults => {
    let sentiment = "sentiment: " + JSON.stringify(analysisResults.result.sentiment.document.label, null, 2);
    return res.send(sentiment);
  }).catch(err => {
    return res.send('error:' + err);
  });
});

app.get("/text/emotion", (req,res) => {
  naturalLanguageUnderstanding = getNLUInstance();

  const analyzeParams = {
    "text": req.query.text,
    "features": {
      "emotion": {}
    }
  }

  naturalLanguageUnderstanding.analyze(analyzeParams).then(analysisResults => {
    let emotions = "emotions -> " +
      "sadness: " + JSON.stringify(analysisResults.result.emotion.document.emotion.sadness, null, 2) + ", " +
        "joy: " + JSON.stringify(analysisResults.result.emotion.document.emotion.joy, null, 2) + ", " +
          "fear: " + JSON.stringify(analysisResults.result.emotion.document.emotion.fear, null, 2) + ", " +
            "disgust: " + JSON.stringify(analysisResults.result.emotion.document.emotion.disgust, null, 2) + ", " +
              "anger: " + JSON.stringify(analysisResults.result.emotion.document.emotion.anger, null, 2);
    return res.send(emotions);
  }).catch(err => {
    return res.send('error:' + err);
  });

});

app.get("/text/sentiment", (req,res) => {
  naturalLanguageUnderstanding = getNLUInstance();

  const analyzeParams = {
    "text": req.query.text,
    "features": {
      "sentiment": {},
    }
  }
  
  naturalLanguageUnderstanding.analyze(analyzeParams).then(analysisResults => {
    let sentiment = "sentiment: " + JSON.stringify(analysisResults.result.sentiment.document.label, null, 2);
    return res.send(sentiment);
  }).catch(err => {
    return res.send('error:' + err);
  });
});

let server = app.listen(8080, () => {
  console.log('Listening', server.address().port)
})

