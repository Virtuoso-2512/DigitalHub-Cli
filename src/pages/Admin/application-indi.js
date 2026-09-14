import {useEffect, useState} from "react";
import {GlobalState} from "../../GlobalParent";

export default function Application() {
    const [Applications, setApplications] = useState([]), {get} = GlobalState();

    useEffect(async() => {
      const res = await get("application");
      setApplications(res.applications);
    }, [])
    
    return <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}}>
        <h2 style={{textAlign:"center"}}>Applications Page</h2>
        <table> 
            <tr><th>Sr. No.</th><th>Name</th><th>Phone Number</th><th>Email Address</th><th>Course</th><th>Time of Submission</th></tr>
            {Applications.map((item, idx)=><tr><td>{idx+1}</td><td>{item.name}</td><td>{item.phone}</td><td>{item.email}</td><td>{item?.course?.name}</td><td>{new Date(item?.createdAt).toLocaleString()}</td></tr>)}
        </table>
    </div>
}
