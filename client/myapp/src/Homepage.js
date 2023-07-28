import {Link} from 'react-router-dom' 

const Homepage = () => 
{
    return (
    <div className = "Homepage">
        <div className = "homepageIntro">
                Welcome to Spiky An AI based chatbot that is capable for generating the answer to your queries such as a search engine for answering your problems. Creating scipy images . Summarising text , generating in depth paragraph for a text through typing and voice commands. 
        </div>
        <br/>
        <br/>
        <br/>
            <ul className = "cardListCollection">
                <li className = "listItem">
                    <div className="card">
                      <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxS7imIKJV6DA1Dk42cPkXXTllXpLPfw-kHA&usqp=CAU"
                      className="cardImages"
                      alt="..."
                      />
                      <div className="card-body">
                       <h5 className="card-title">Code Debugging</h5>
                         <p className="card-text">
                           While developing the software stuck with an error
                         </p>
                       </div>
                    </div>
                </li>
                <li className = "listItem">
                    <div className="card">
                      <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQChZBY-RHKQ2IFq7DeNyqu0fDFQgGVa0gQ_g&usqp=CAU"
                      className="cardImages"
                      alt="..."
                      />
                      <div className="card-body">
                       <h5 className="card-title">Content writing</h5>
                         <p className="card-text">
                           A freelancer who earns by generating contents for websites
                         </p>
                       </div>
                    </div>
                </li>
            </ul>
        <br/>
        <br/>
        <br/>
            <ul className = "cardListCollection">
                <li className = "listItem">
                    <div className="card">
                      <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT65axAWqINlG7RYKEcNj56mF9c-UHY7heC6A&usqp=CAU"
                      className="cardImages"
                      alt="..."
                      />
                      <div className="card-body">
                       <h5 className="card-title">Image Generation</h5>
                         <p className="card-text">
                             Require images get it by the action of typing or voice commands.
                         </p>
                       </div>
                    </div>
                </li>
                <li className = "listItem">
                    <div className="card">
                      <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcClvViZ-AoTVHJRhsT8EbYSv8qBcylAaLvw&usqp=CAU"
                      className="cardImages"
                      alt="..."
                      />
                      <div className="card-body">
                       <h5 className="card-title">Code Generation</h5>
                         <p className="card-text">
                           Improve your productivity 10x by using the software
                         </p>
                       </div>
                    </div>
                </li>
            </ul>
            <br/>
            <br/>
            <br/>
             <Link to = "/RegisterPage" className = "homepageLinking">
                  Explore Spiky 
             </Link>
               
    </div>
    )
}

export default Homepage ;