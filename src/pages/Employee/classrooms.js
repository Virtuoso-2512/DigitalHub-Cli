import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalParent";
import Button from "../../components/button";
import Select from "../../components/select";

export default function ClassStu() {
  const {get} = GlobalState(), [divId, setDivId] = useState({name:""}), [batchId, setBatchId] = useState(""), [div, setDiv] = useState([]), [batch, setBatch] = useState([]);

  useEffect(async() => {
    const hii = await get("batch/");
    setBatch(hii.batches);
  }, []);

  useEffect(async() => {
    if(batchId.length !== 24) return;

    const hii = await get("division/"+batchId);
    setDiv(hii.divisions);
  }, [batchId]);
    
  return <div style={{width:"97vw",marginLeft:"2vw",display:"flex",flexDirection:"column",justifyContent:"center"}}> 
    <div style={{width:"96vw",display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
      <h1>Classrooms</h1>
      <Link disabled={!divId._id} to={"classroom/"+divId._id}>
        <Button disabled={!divId._id} variant={4}>Go to {divId.name} Classroom</Button>
      </Link>
    </div>
    {batch.length ? <Select style={{width:"400px"}} label="Select Batch" value={batchId} setOption={setBatchId} unique options={batch}/> :  <h2 style={{fontFamily:"Poppins"}}>You don't have access to any Classroom !</h2>}
    
    <h3 style={{fontFamily:"Poppins",width:"96vw"}}>Select Division You want to access</h3>
    <div style={{width:"99vw",display:"flex",flexDirection:"row",alignItems:"center",flexWrap:"wrap"}}>
      {div.map(item => <div className={"theme-"+(item.theme%6 +1)} style={{width:"300px",height:"150px",borderRadius:"15px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",margin:"15px", border:("5px solid "+ (divId._id === item._id ? "var(--color)" : "transparent"))}} onClick={()=>setDivId(item)}>
        <h2 style={{fontFamily:"Poppins",color:"#000"}}>{item.name}</h2>
      </div>)}
    </div>   
  </div>
}