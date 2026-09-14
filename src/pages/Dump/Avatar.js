function Avatar(props) {
  return <div className="avatar">
    <div className="avatar-img" style={{borderRadius:!props.noRad ? "50%" : 0,margin:props.isMargin ? "-5px 0px 0 0" : 0}}>
      <img src={props.image} alt="Fetching...."/>
    </div>
  </div>;
}

export default Avatar;