import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { GlobalState } from "../GlobalParent";
import Error from "./error";

export default function Offline() {
  const { online } = GlobalState(),[load, setload] = useState(true);

  useEffect(() => setTimeout(() => setload(false), 2000), [])

  return online ? <Error/> : (load ? <Loader/> : <div id="errorDiv">
    <h1 style={{fontFamily:"Roboto",letterSpacing:"1.5px",width:"35vw",fontSize:"3vw",textAlign:"center"}}>You Lost Your Internet Connection. </h1>
    <h2 style={{letterSpacing:"-.5px",width:"35vw",fontSize:"2vw",textAlign:"center"}}>Just Connect to a network and We shall redirect You back !</h2>
  </div>)
}