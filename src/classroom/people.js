import {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import Image from "../components/Image";
import Button from "../components/button";
import { GlobalState } from '../GlobalParent';

export default function People({div}) {
  const [stuList, setStuList] = useState([]), {get} = GlobalState();

  useEffect(async() => {
    const studn = await get("division/stu/"+div);
    setStuList(studn.stu || []);
  }, []);  

  return <div style={{width:"90vw"}}>
    <h2 style={{fontFamily:"Poppins"}}>People</h2>
    <div style={{display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center",alignItems:"center",width:"90vw"}}>
      {stuList.length ? stuList.map((user,idx) => <Link to={"/stu/"+user._id} style={{textDecoration:"none"}}><Button variant={7}><div style={{display:"flex",flexDirection:"row",alignItems:'center',justifyContent:'left',minWidth:"40vw"}}>
        <Image src={"user/"+user._id} style={{margin: "0 10px 0 0"}} wh="60px" br="50%"/>     
        <h4 style={{marginLeft:"10px", fontFamily:"Poppins"}}>{idx+1}. {user.name}</h4>
      </div></Button></Link>) : <h4>No Students Allocated in this Division !</h4>}  
    </div>
  </div>
}
