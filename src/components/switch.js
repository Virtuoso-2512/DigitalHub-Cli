export default function Switch({state, onChange, margin,background}) {
  const id_as = Math.round(new Date().getTime() + Math.floor(Math.random() * (100000 - 1) + 1));

  return <div className="switch-container" style={{margin}}>
    <input type="checkbox" checked={state} onChange={e=>onChange(e.target.checked)} className="switch-checkbox" id={id_as}/>
    <label for={id_as} className="switch-background" style={{background}}>
        <div className="slider"/>
    </label>
  </div>
}
