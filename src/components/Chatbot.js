import { useEffect, useRef, useState } from 'react';
import { GlobalState } from '../GlobalParent';
import "./Chatbot.css";

export default function Chatbot() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [recording, setRecording] = useState(false);
  const [valid, setValid] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [interim, setInterim] = useState('');
  const {navbar, SERVER, userLevel} = GlobalState();
  const [messages, setMessages] = useState([
    { content: 'Hello! How can I assist you today?' },
  ]);
  const messagesRef = useRef(null);
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition;

  useEffect(() => {
    if(!showChatbot) return;
    messagesRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [showChatbot,messages]);

  const addMsg = (msg) => setMessages([...messages, msg])

   const stopRecording = () => {
        recognition.stop();
        setRecording(false);
   }

  const startRecording = () => {
    try {
        setRecording(true);
        recognition = new SpeechRecognition();
        recognition.interimResults = true;
        recognition.start();

        recognition.onresult = (event) => {
          const speechResult = event.results[0][0].transcript;
          //detect when intrim results
          if (event.results[0].isFinal) {
            addMsg({self:true, content:speechResult});
            setInterim("");
          } else {
            setInterim(speechResult)
          }
          //downloadBtn.disabled = false;
        };

        recognition.onspeechend = () => {
          startRecording();
          stopRecording();
        };

        recognition.onerror = (event) => {
          stopRecording();

          var content = "Error occurred in recognition: " + event.error;
          if (event.error === "no-speech") content = "No speech was detected. Stopping!";
          else if (event.error === "audio-capture") content =  "No microphone was found. Ensure that a microphone is installed.";
          else if (event.error === "not-allowed") content = "Permission to use microphone is blocked.";
          else if (event.error === "aborted") content = "Listening Stopped.";
          
          addMsg({sys:true, content})
        };
      } catch (error) {
        setRecording(false);
        addMsg({sys:true, content:error})
      }
  }

  const chatMessage = () => {
    addMsg({self:true, content:inputValue});
    setInputValue("");
  };

  const startBtn = async() => {
    if(inputValue) chatMessage()
    else if(recording) stopRecording()
    else startRecording()
  }
  // Useful to disable chatbot on certain pages
  // useEffect(() => {
  //   if(window.location.pathname.includes("/")) return setValid(false);
  //   return setValid(true);
  // }, [window.location.pathname])
  

  return navbar && typeof userLevel === "number" && valid ? <div className="chatbot">
    <div className={`chat-window ${showChatbot ? "" : "toggle-btn"}`} onClick={showChatbot ? ()=>{} : () => setShowChatbot(!showChatbot)}>
        {showChatbot ?<>
            <div style={{display:"flex",alignItems:"center",padding:"0 10px"}}>
              <img style={{width: '40px', height: '40px'}} src={SERVER + "robot.png"}/>
              <h2 id="heading" style={{margin:"15px auto 15px 5px"}}>Chatbot</h2>
              <button className="close-button" onClick={()=>setShowChatbot(false)} > X </button>
            </div>
            <div style={{ flex: '1', padding: '10px', overflowY: 'auto' }}>
                {messages.map(message => <div className='chat' key={message.content} style={{ flexDirection: !message.self ? 'row' : 'row-reverse' }} >
                    <div className={message.self ? "self" : ""} style={message.sys ? { backgroundColor: 'transparent',textAlign:"center",minWidth:"350px" ,maxWidth:"350px" } : {}} >
                    {message.content}
                    </div>
                </div>)}
                <div ref={messagesRef}/>
            </div>
            <div className='footer'>
                {recording || interim ? <p>{interim}</p> : <textarea onKeyDown={e=>{
            if(e.key === "Enter") return startBtn()
            return;
          }} value={inputValue} rows={1} onChange={e=>setInputValue(e.target.value)} placeholder="Send a message" />}
                <button onClick={startBtn}>
                    {inputValue ? <i className='fas fa-paper-plane' /> : (recording ? <img style={{width: '20px', height: '25px'}} src={SERVER +"chat-bars.svg"}/> : <i className='fas fa-microphone' />)}
                </button>
            </div>
        </> : <img style={{width: '30px', height: '30px'}} src={SERVER + "robot.png"}/>}  
    </div>
    </div> : <></>;
};

const TypingEffect = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [text]);

  return <div>{displayedText}</div>;
};