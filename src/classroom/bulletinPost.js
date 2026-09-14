import { useEffect, useState } from "react";
import { GlobalState } from "../GlobalParent";
import toast from "../controllers/Alert";
import Button from "../components/button";
import Input from "../components/input";
import Select from "../components/select";
import Popup from "../components/Popup";
import ProgressBar from "../components/ProgressBar";
import axios from "axios";

export default function BulletinPost(){
  const [name, setName] = useState(""), [desc, setDesc] = useState(""), [sub, setSub] = useState(""), [subs, setSubs] = useState([]), [open, setOpen] = useState(false), [attach, setAttach] = useState([]), {post,get, token} = GlobalState();

  useEffect(async() => {
    const res = await get("batch/subjects/");
    setSubs(res.subs);
  }, [])
  
  const poster = async() => {     
    const res = await post("division/"+"/classwork",{name,desc,attach,sub});
    
    if(!res.success) return toast("Error in uploading Classwork !");
    return toast("Classwork Posted !",1);
  }

  const [progress, setProgress] = useState(0);

  const supported = ["pptx","ppt","doc", "docx", "xlsx", "pdf", "jpg", "jpeg", "png"];
  const icons = ["file-powerpoint","file-powerpoint","file-word","file-word","table-cells","file-pdf","image","image","image"];

  const fileHandler = async(file) => {
    if(!file) return;
    if(supported.indexOf(file.name.split('.').reverse()[0]) < 0) return toast("File Not Accepted !");
    setProgress(11);
      
    const formData = new FormData();
    formData.append('file', file);

    axios.post("http://localhost:8099/api/upload", formData, { headers: {authorisation:token, 'Content-Type': 'multipart/form-data', }, })
    .then((response) => {
      console.log('File uploaded successfully:', response.data);
      setProgress(100);
      setAttach([...attach, {id:response.data._id, name:file.name, icon: supported.indexOf(file.name.split('.').reverse()[0])}]);
    })
    .catch((error) => {
      console.error('Error uploading file:', error);
    });
  };

  const delIdx = (idx) => {
    var newarr = attach;
    newarr.splice(idx, 1);
    setAttach([...newarr]);
  }

  return <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",height:"100%",width:"90vw"}}>
     <Popup open={open} noclick={progress>10} setOpen={setOpen} title={<span style={{fontFamily:"Poppins"}}>Add Attachment</span>}>
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        {progress<10 ? (attach.length === 5 ? <h4>You can't attach more than 5 files at once !</h4> : <Button variant={4} onClick={"" ? fileHandler :  ()=>document.getElementById("aatach").click()}>Add Attachment</Button>) : (progress>=100 ? <><p style={{fontFamily:"Poppins",fontSize:18,margin:"25px auto"}}>File Uploaded to Server !</p><Button variant={4} onClick={()=>{setOpen(false);setProgress(0)}}>Close</Button></> : <p style={{fontFamily:"Poppins",fontSize:18,margin:"25px auto"}}>Uploading to server  <div class="jumping-dot-container">
        <span class="jumping-dot dot-1"></span>
        <span class="jumping-dot dot-2"></span>
        <span class="jumping-dot dot-3"></span>
      </div></p>)}
        <input id="aatach" type="file" style={{opacity:0}} onChange={e=>fileHandler(e.target.files[0])}/>
        <ProgressBar progress={progress} width={400}/>
        <p style={{fontSize:18}}>The following extensions are supported - pptx, ppt, doc, docx, xlsx, pdf, jpg.</p>
        </div>
      </Popup>

      <div style={{display:"flex",width:"80%",marginLeft:"10%",justifyContent:"space-between"}}>
        <h2 style={{textAlign:"center", fontFamily:"Poppins"}}>New Bulletin Post</h2>
        <Button variant={7} style={{marginRight:"100px"}} onClick={()=>setOpen(true)}><i className="fa-solid fa-x" style={{marginRight:"5px"}}/>Close</Button>
      </div>
      
      <div style={{display:"flex",flexDirection:"row"}}>
        <Input style={{width:500}} label="Title" value={name} onChange={setName}/>
        <Select style={{width:250}} label="Subject" value={sub} setOption={setSub} options={subs} unique/>
      </div>
      <Input label="Description" style={{width:800}} value={desc} onChange={setDesc}/>

      <div style={{display:"flex",flexDirection:"row"}}>
        <h3 style={{fontFamily:"Poppins"}}>Attachments</h3>
        <Button variant={7} onClick={()=>setOpen(true)}><i className="fa-solid fa-plus" style={{marginRight:"10px"}}/>Add Attachment</Button>
      </div>

      <h3>Attachments</h3>
      {attach.map((item, idx) => <><div style={{width:"800px",display:"flex",flexDirection:"row",alignItems:"center"}}>
        <i style={{fontSize:"32px"}} className={"fas fa-"+icons[item.icon]}/>
        <h4 style={{marginRight:"auto",marginLeft:"25px",fontFamily:"Poppins"}}>{item.name}</h4>
        <Button variant={7} onClick={()=>delIdx(idx)}>X</Button>
      </div><hr style={{minWidth:"800px"}}/></>)}
      
      <Button variant={4} disabled={!(name && desc && sub)} onClick={poster}>Post Bulletin</Button>
    </div>
}