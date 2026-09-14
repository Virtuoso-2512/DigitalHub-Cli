import Button from '../../../components/button';
import { useState } from 'react';
import Input from '../../../components/input';
import Select from '../../../components/select';
import { GlobalState } from '../../../GlobalParent';
import { non_teaching_types } from "../../../ENV";
import Swal from 'sweetalert2';
import Switch from '../../../components/switch';
import toast from '../../../controllers/Alert';

export default function Post_New(){
    const [name, setName] = useState(""),
          [loading, setLoading] = useState(false),
          [perm, setPerm] = useState({}),
          [type, setPost] = useState(0),
          {InstituteName, post} = GlobalState();

    const createPost = async() => {
        console.log(perm);
        setLoading(true);
        const res = await post("post/create", {name, permissions:perm, type});
        setLoading(false);
        
        if (!res.success) return toast("Error in creating the Post !");
        return toast(`Post '${name}' is created successfully.`, 1);
    }, postDetails = () => Swal.fire({
        title:"Non-Teaching Department Roles",
        html:`<ol>
            <li><b>Director/Principal:</b> The head of the institution who oversees all departments and is responsible for the overall functioning of the institute.</li>
            <li><b>Department Director:</b> This person is responsible for the day-to-day administration of any department of the institute, like IT, finance, maintenance.</li>
            <li><b>Assistant:</b> They assist in the day-to-day work of the department.</li>
            <li><b>Support Staff:</b> This includes various personnel such as peons, cleaners, drivers, and security guards who help in the smooth functioning of the institute.</li>
        </ol>`,
        confirmButtonColor:"#1972d6",
        cancelButtonText:"Okay, Got it !"
    }), handlePerm = (nest, prop, value) => setPerm({...perm, [nest]:{...perm[nest], [prop]:value}});

    return <div style={{marginLeft:"1vw",display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
        <h2 style={{textAlign:"center",margin:"1vw auto"}}>Create a new Post</h2>
        <span>Posts created here will be visible and could be used only to Faculty directly under the <b>{InstituteName}</b></span>
        <span>Posts are ONLY Applicable to under NON-TEACHING DEPARTMENTS and NOT any other Users.</span>
        <Input id="name" label="Post Name" value={name} style={{width:"400px"}} onChange={setName}/>
        <div>
            <Select id="name" label="Post Type" value={type} style={{width:"400px"}} setOption={setPost} options={non_teaching_types}/>
            <i className='fas fa-info' onClick={postDetails} style={{border:"1px solid #333",padding:"5px 10px",borderRadius:"50%"}}/>
        </div>
        <div style={{textAlign:"left",width:"70vw",margin:"auto"}}>
            <h3 style={{marginTop:"50px",marginBottom:"6px"}}>Institute-based Permissions</h3>
            <Permission parent={perm} nest="institute" onClick={handlePerm} state="view" title="View Institutes" description="Allow these users to view new institutes without ANY other permissions."/>    
            <Permission parent={perm} nest="institute" onClick={handlePerm} state="create" title="Create Institute" description="Allow these users to create new institutes."/>    
            <Permission parent={perm} nest="institute" onClick={handlePerm} state="manage" title="Manage Institutes" description="Allow these users to manage, edit, delete, allocate and login through allow institutes." danger/>
            
            <h3 style={{marginTop:"50px",marginBottom:"6px"}}>Post-based Permissions</h3>
            <Permission parent={perm} nest="post" onClick={handlePerm} state="create" title="Create Post" description="Allow these users to create new posts."/>    
            <Permission parent={perm} nest="post" onClick={handlePerm} state="manage" title="Manage Posts" description="Allow these users to manage, view, edit, delete all posts." danger/>    
            
            <h3 style={{marginTop:"50px",marginBottom:"6px"}}>CRM (Customer Relationship Management) Permissions</h3>
            <Permission parent={perm} nest="crm" onClick={handlePerm} state="view" title="Access Lead Manager" description="Allow these users to access all leads that are in the system. if this permission is not granted, users will only see leads assigned through them."/>    
            <Permission parent={perm} nest="crm" onClick={handlePerm} state="manage" title="Manage Leads" description="Allow these users to manage and edit leads." danger/>
        </div>
        <br/>
        <Button disabled={loading || !(name)} onClick={createPost} variant={1} style={{ margin: "10px" }} > Add this <b>{name}</b> Post</Button>
    </div>;
}

function Permission({parent,nest,state, onClick, title, description, danger}){
    return <><div style={{display:"flex"}}>
        <div style={{width:"85%"}}>
            <h4>{title}</h4>
            <span style={{marginTop:"0",marginBottom:"70px"}}>{description} <b>{danger ? "This is a DANGEROUS permission to grant." : ""}</b></span>
        </div>
        <div style={{marginLeft:"auto"}}>
            <Switch state={parent?.[nest]?.[state]} onChange={val=>onClick(nest,state, val)}/>
        </div>
    </div><hr style={{color:"#333"}}/></>
}