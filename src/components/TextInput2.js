import Twemoji from 'react-twemoji';

const TextInput2 = ({onChange, state}, ...props) => {
  return <div className="textInput" style={{margin:"20px 40px"}}>
    <label className={(props.value || props.disabled || props.type === "date" ? "text-within" : "") + " label"}>{props.label}</label>
    <div>
      <Twemoji>
        <textarea type="text" onChange={e=>onChange(e.target.value)} rows="1" cols="100">
          {state}
        </textarea>
      </Twemoji>
    </div>
  </div>; 
}

export default TextInput2;