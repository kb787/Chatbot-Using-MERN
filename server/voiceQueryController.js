const queryModel = require('./queryModels');
const NodeCache = require('node-cache');
const voiceResponseModel = require('./voiceResponseModels');
const speechToText = require('@google-cloud/speech');
const textToSpeech = require('@google-cloud/text-to-speech') ;
var sendMessage = "Speak Something to spiky I am here to help you" ;
//  var ttsClient = new textToSpeech.SpeechClient();
let voiceMessage ;
const fs = require('fs');
const { promisify } = require('util');
const client = new speechToText.SpeechClient();
const dotenv = require('dotenv');
dotenv.config();
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const cache = new NodeCache();

const recorder = require('node-record-lpcm16');
const recordingOptions = {
  sampleRateHertz: 16000,
  channels: 1,
  verbose: true,
  recordProgram:'sox' 
};

const handleVoiceQuery = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).send({
        message: 'userQuery is undefined',
      });
    }

    var cachedResponse = cache.get(prompt);
    if (cachedResponse) {
      return res.status(200).json(cachedResponse);
    }
  //  voiceMessage = await ttsClient.synthesizeSpeech(sendMessage) ;
    const recording = recorder.record(recordingOptions);
    recording.start();
    console.log('Recording started...');

    setTimeout(async () => {
      recording.stop();
      console.log('Recording stopped.');

 
      const audioData = recording.getAudioData();
      const audioBuffer = Buffer.from(audioData);

    
      const [transcript] = await client.recognize({
        audio: { content: audioBuffer },
        config: {
          encoding: 'LINEAR16',
          sampleRateHertz: 16000,
          languageCode: 'en-US',
        },
      });

      var voiceQuery = transcript.results[0].alternatives[0].transcript;

      const newQuery = await new queryModel({ prompt });
      console.log(newQuery);
      await newQuery.save();

      const responseData = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${voiceQuery}`,
      });
      console.log(responseData);

      if (responseData) {
        const newResponse = new voiceResponseModel({voiceResponse : responseData });
        await newResponse.save();
        if (newResponse.voiceQuery) {
          return res.status(201).json(newResponse.voiceResponse);
        }
      }
    }, 5000);
  } catch (err) {
    console.log(err);
    return res.status(404).send({
      message: err.message,
    });
  }
};

const express = require('express');
const voiceRouter = express.Router();

const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
});

voiceRouter.post('/postVoiceQuery', limiter, handleVoiceQuery);
module.exports = voiceRouter;










