export default function Select({setOption, def2 = 0, label, options = [], unique=false, value,disabled, def, style, divMargin, oav=false}){ //OAV is Option As Value
    return <div className="textInput" style={{margin:divMargin}}>
      <label className="text-within label">{label}</label>
      <div>
        <select onChange={e=>setOption(e.target.value)} value={value} style={{width:"400px", ...style}} disabled={disabled || (!options.length ? true : false)}>
          <option selected hidden>Select {def || "an Option"}</option>
          {options.map((item, idx) => <option value={unique ? item._id : (oav ? item : parseInt(idx)+def2)}>{unique ? item.name : item}</option>)}
        </select>
      </div>
    </div>;
}