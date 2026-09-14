export default function Input(props){
  return <div className="textInput" style={props.divStyle}>
    <label className={(props.value || props.disabled || props.type === "date" || props.textwithin ? "text-within" : "") + " label"}>{props.label}</label>
    <div>
      <input type="text" {...props} name={props.name} onChange={e=>props.onChange(e.target.value)}/>
    </div>
  </div>;
}