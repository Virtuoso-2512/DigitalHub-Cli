import {useEffect, useState} from 'react';
import { GlobalState } from '../GlobalParent';
import Button from '../components/button';
import Select from '../components/select';
import Input from '../components/input';

//Classwork GET is now Bulletin GET (IMPORTANT)

export default function BulletinGet({div}) {
  const [cw, setCw] = useState([]), {get} = GlobalState(), [total, setTotal] = useState(0), [subs, setSubs] = useState([]), [page, setPage] = useState(1), [option, setOption] = useState(0),[name, setName] = useState("");

  useEffect(async() => {
    const gg = await get("division/"+div+"/classwork");
    setCw(gg);
    setTotal(gg.length);
  }, [])

  return <div style={{display:"flex",flexDirection:"column",width:"90vw",justifyContent:"center",alignItems:"center"}}>
    <div style={{display:"flex",flexDirection:"row",alignItems:"center",width:"90vw",marginTop:"5vh"}}>
      <Select label="Filter By" def="Option" style={{width:"10vw"}} value={option} setOption={setOption} options={subs}/>
      <Input label="Title" type="text" style={{width:"300px"}} value={name} onChange={setName}/>
      <Button variant={4} style={{marginLeft:"auto"}} disabled={page === 1} onClick={()=>setPage(page-1)}><i className='fas fa-arrow-left'/></Button>
      <span>{((page-1)*10)+1 > total ? total : ((page-1)*10)+1}-{page*10 > total ? total : page*10} Class Work of {total} {name ? "Found" : "Total"}</span>
      <Button variant={4} disabled={page*10 > total} onClick={()=>setPage(page+1)}><i className='fas fa-arrow-right'/></Button>
    </div>

    {cw.length ? (cw.map(cs => <div style={{width:"80vw",background:"var(--gradient)",margin:"25px 0",padding:"0 25px",borderRadius:"20px",display:"flex",justifyContent:"center",alignItems:"center"}}>
      <i className='fas fa-pager' style={{fontSize:"32px",margin:"0 10px"}}/>
      <h2 style={{fontFamily:"Poppins",marginRight:"auto"}}>{cs.name}</h2>
      <h5>{new Date(cs.time).toString().split(":").slice(0,2).join(":")}</h5>
    </div>)) : <h3 style={{fontFamily:"Poppins"}}>No Class Work Found !</h3>}
  </div>
}
