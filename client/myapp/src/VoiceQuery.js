import { useState, useEffect } from 'react';
import SpeechRecognition , {useSpeechRecognition} from 'react-speech-recognition' 
var message = "Speak the query" ;

const StartRecording = (duration = 6000) => 
{
     console.log(message) ;
     SpeechRecognition.startListening({continuous:true}) ;
     const { transcript } = useSpeechRecognition() ;
     console.log(transcript) ;
     return transcript ;

}

const StopRecording = () => 
{
     SpeechRecognition.stopListening() ;
}


export {StartRecording , StopRecording} ;

