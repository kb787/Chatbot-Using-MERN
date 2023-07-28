import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMicrophone, faPause} from '@fortawesome/free-solid-svg-icons'
import { useState , useEffect } from 'react' ;
import axios from 'axios' ;
import {message} from 'antd' ;
import {StartRecording, StopRecording} from './VoiceQuery' ;
import {Link} from 'react-router-dom' ;

const SearchEngine = () => 
{
   const [prompt, setPrompt] = useState('') ;
   const [queryResponse,setQueryResponse] = useState('') ;
   let responseData ;
   var query = StartRecording() ;
   const handleQueryResponse = async(e) => 
   {
      e.preventDefault() ;
      try 
      {
          var answerResponse = await axios.post("http://localhost:3500/v2/api/queryresponses/postTextQuery" ,
              {
                  prompt:prompt
              } 
          )
          responseData = answerResponse.data.choices[0].text;
          setPrompt(responseData) ;
          document.querySelector('.searchTextArea').value = responseData ;
            
      }
      catch(error)
      {
          console.log(error) ;
      }
   }
  const HandleVoiceResponse = async (e) => {
     e.preventDefault() ;
      try
        {
        const voiceResponse = await axios.post("http://localhost:3500/v3/api/voiceresponses/postVoiceQuery", {
          prompt: query,
        });

        const responseData = voiceResponse.data.choices[0].text;
        setPrompt(responseData);
        document.querySelector('.searchTextArea').value = responseData;
      } catch (error) {
        console.log(error);
      }
      
    };
    return (
        <div className = "SearchEngine">
            <h3 className = "searchEngineHeading">
                 Spiky 
            </h3>
            <ul className = "featureOptions">
                <ul className = "featureCollection">
                <h5 className = "cardHeading">Examples</h5>      
                    <li className = "featureList">
                     <div className="searchCard">
                        <div className="card-body">
                           <p className="searchPara">
                           Provide me the javascript code 
                           </p>
                        </div>
                    </div>
                    </li>
                    <br/>
                    <li className = "featureList">
                     <div className="searchCard">
                        <div className="card-body">
                           <p className="searchPara">
                            Tell me about Chandrayaan 3 
                           </p>
                        </div>
                    </div>
                    </li>
                    <br/>
                    <li className = "featureList">
                     <div className="searchCard">
                        <div className="card-body">
                           <p className="searchPara">
                            Tell about yourself  
                           </p>
                        </div>
                    </div>
                    </li>
                    <br/>
                </ul>
                <ul className = "featureCollection">
                <h5 className = "cardHeading">Limitations</h5>      
                    <li className = "featureList">
                     <div className="searchCard">
                        <div className="card-body">
                           <p className="searchPara">
                           Can generate inaccurate results sometimes 
                           </p>
                        </div>
                    </div>
                    </li>
                    <br/>
                    <li className = "featureList">
                     <div className="searchCard">
                        <div className="card-body">
                           <p className="searchPara">
                           It is based on previous results so sometimes cannot answer certain questions  
                           </p>
                        </div>
                    </div>
                    </li>
                    <br/>
                    <li className = "featureList">
                     <div className="searchCard">
                        <div className="card-body">
                           <p className="searchPara">
                           May produce harmful content 
                           </p>
                        </div>
                    </div>
                    </li>
                    <br/>
                </ul>
                <ul className = "featureCollection">
                <h5 className = "cardHeading">Capabilities</h5>      
                    <li className = "featureList">
                     <div className="searchCard">
                        <div className="card-body">
                           <p className="searchPara">
                           Remembers the user inputs 
                           </p>
                        </div>
                    </div>
                    </li>
                    <br/>
                    <li className = "featureList">
                     <div className="searchCard">
                        <div className="card-body">
                           <p className="searchPara">
                           Works on both audio and text 
                           </p>
                        </div>
                    </div>
                    </li>
                    <br/>
                    <li className = "featureList">
                     <div className="searchCard">
                        <div className="card-body">
                           <p className="searchPara">
                            Can provide the sollutions to your majority queries 
                           </p>
                        </div>
                    </div>
                    </li>
                    <br/>
                </ul>
            </ul>
            <br/>
            <ul className = "inputCollection">
            <li className = "itemList"> 
            <div>
                    <textarea
                    className="searchTextArea"
                    placeholder="Type here"
                    value = {prompt} 
                    onChange = {(e) => setPrompt(e.target.value)} 
                    />
            </div>
            </li>
            <ul className = "iconCollection">
            <li className = "itemList">
             <FontAwesomeIcon className = "textAreaIcon" icon={faMicrophone} onClick={HandleVoiceResponse} />
            </li>
            <li className = "itemList">
            <FontAwesomeIcon className = "textAreaIcon" icon={faPause} onClick={StopRecording} />
            </li>
            </ul> 
            <li className = "itemList">
            <button type="button" className="inputButton" onClick={handleQueryResponse}>
             Send
            </button>
            </li>
            </ul>
            {responseData && (
           <div className="responseContainer">
            <h4>Response:</h4>
            <p>{responseData}</p>
           </div> 
            )}
           <Link to = "/ImageGeneration" className = "pageLinking">Generate Images</Link> 
        </div>
    )
}

export default SearchEngine ;
