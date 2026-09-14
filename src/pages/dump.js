import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Button from "../components/button";
import { NavLink as Link } from "react-router-dom";
import MakeGroup from "./Dump/NewGroup";
import Switch from "../components/switch";
import { GlobalState } from "../GlobalParent";
import Popup from "../components/Popup";
import Avatar from "./Dump/Avatar";
import Input from "../components/input";
import BulletinPost from "../classroom/bulletinPost";

export default function Dump() {
  const [load, setload] = useState(false);

  return <div>
    <h2 style={{fontFamily:"Roboto",letterSpacing:"1.5px",width:"35vw",fontSize:"2vw",textAlign:"center"}}>This is a temporary dump page created to dump useful components which can be used in future (for development purposes ONLY) !</h2>

    <h3><code>New BulltenIn Post</code></h3>
    <BulletinPost/>
    <h3><code>Search Users</code></h3>
    <SearchUsers open={load} setOpen={setload}/>
    <Switch state={load} onChange={setload} />
    
    <h3><code>Create a New Group</code></h3>
    <MakeGroup/>
  </div>
}

function SearchUsers({open, setOpen}) {
  const [search, setSearch] = useState(""), {get} = GlobalState(), [results, setResults] = useState([]);

  const Searcher = async() => {
    if(search.length >= 4){
      const gg = await get("chat/search?search="+search);
      setResults(gg.users);
    }else setResults([]);
  }

  return <Popup backgroundStyle={{background:"var(--gradient-light)",backdropFilter: "blur(0px)"}} modalStyle={{minWidth:"25vw",width:"27vw", height:"60vh"}} open={open} setOpen={setOpen} title={<span style={{fontFamily:"Poppins"}} className="themed-p">Search Users</span>}>
    <div style={{width:"300px", display:"flex",flexDirection:"row",marginBottom:"15px",justifyContent:"center",alignItems:"center"}}>
      <div id="search">
        <div id="search_wrap"> <Input type="text" placeholder="Search" value={search} onChange={e=>setSearch(e.target.value)}/> </div>
      </div>
      <Button variant={7} style={{margin:"0 15px"}} onClick={Searcher}>Go</Button>
    </div>

    <div id="chatList">
      {results ? results.map(item => <SearchListItems admin={item.admin} _id={item._id} name={item.name} image={item.photo} chat={()=>{
        setSearch("");
        setResults([]);
      }}/>): null}
    </div>
  </Popup>
}

function SearchListItems(props) {
  const {SERVER} = GlobalState();
  return <Link to={"/user/"+props._id} style={{color:"var(--color)",textDecoration:"none"}} onClick={props.chat}><div style={{marginTop:"10px",paddingBottom:"10px"}} className="chatlist__item">
    <Avatar image={ props.photo || SERVER+"user_default.jpg"} isMargin online/>
    <div className="userMeta">
      <h5>{props.name}</h5>
      {props.admin ? <p>Admin Account</p> : null}
    </div>
  </div></Link>;
}