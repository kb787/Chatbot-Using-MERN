import {useState} from 'react' ;
import axios from 'axios' ;

const ImageGeneration = () => 
{
  const [prompt, setPrompt] = useState('') ;
  const [image,setImage] = useState('') ;
  
  
  const handleImageResponse = async(e) => 
  {
    try 
    {
      var imageResponse = await axios.post("http://localhost:3500/v4/api/imageresponses/postImageQuery" ,
          {
              prompt:prompt 
          }
      )
      image = imageResponse.data.data[0].url ;
      setImage(image) ;
      document.querySelector('.searchTextArea').value = image ; 
    }
    catch(error)
    {
       console.log(error) ;
    }  
  }
  return (  
    <div className = "ImageGeneration">
    <br/>
    <br/>    
       <div>
            <ul className = "inputGroup">
              <li className = "groupItem">  
                <textarea
                    className="imageTextArea"
                    placeholder="Type here"
                    value = {prompt} 
                    onChange = {(e) => setPrompt(e.target.value)} 
                />
              </li>
              <li className = "groupItem">  
                 <button type="button" className="imageButton" onClick={handleImageResponse}>
                      Get Image
                  </button>
              </li>
            </ul>
            <br/>
            <image src = {image} 
                    className="imageText"
            />
        </div>
    </div>
  ) 
}

export default ImageGeneration ;