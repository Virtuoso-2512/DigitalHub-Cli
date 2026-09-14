import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/button';
import Input from '../../../components/input';
import Select from '../../../components/select';
import { GlobalState } from '../../../GlobalParent';

export default function UsersManage() {
    const [leads, setLeads] = useState([]), [filter, setFilter] = useState(false), [roles, setRoles] = useState([]), [selected, setSelected] = useState([]), {get} = GlobalState(), [total, setTotal] = useState(0), [page, setPage] = useState(1), [prop, setProp] = useState(0),[value, setValue] = useState("");

    useEffect(async() => {
        const query = (filter ? ("&prop="+prop+"&value="+value) : "");

        const res = await get("user?page="+page+query);

        setLeads(res.users || []);
        setTotal(res.total || 0);
        if(res?.roles?.length) setRoles(res.roles)
    }, [page, filter, prop, value])

    return <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",width:"97vw"}}>
            {selected.length ? <>
                <Button variant={2} onClick={()=>setSelected([])}><i className='fas fa-x'/></Button>
                <h4>{selected.length} User{selected.length-1 ? "s" : ""} Selected</h4>
            </> : <><Button variant={5} disabled={!total} onClick={()=>setFilter(!filter)}><i className='fas fa-filter'/></Button><Link to="/user/create"><Button variant={4}><i className='fas fa-user-plus'/></Button></Link></>}
            <h2 style={{margin:"0 auto 0 10px"}}>User Manager</h2>
            <Button variant={4} disabled={page === 1} onClick={()=>setPage(page-1)}><i className='fas fa-arrow-left'/></Button>
            <span>{((page-1)*10)+1 > total ? total : ((page-1)*10)+1}-{page*10 > total ? total : page*10} Users of {total} {filter ? "Found" : "Total"}</span>
            <Button variant={4} disabled={page*10 > total} onClick={()=>setPage(page+1)}><i className='fas fa-arrow-right'/></Button>
        </div>
        {filter ? <Filter setProp={setProp} setValue={setValue} roles={roles}/> : <div/>}
        <table style={{marginBottom:"40px",width:"80%"}}>
            <thead>
                <tr>
                    <th>User Name <i className='fas fa-arrow-down' style={{marginLeft:"10px"}}/></th>
                    <th>Registered Email</th>
                    <th>User Type</th>
                </tr>
            </thead>
            <tbody>
                {leads.length ? leads.map(lead => <tr style={{height:"80px"}}>
                    <td><Link to={(lead?.emp || lead?.dept ? "/user/" : "/stu/")+lead._id}><Button variant={6} style={{padding:"8px 12px",margin:0}}>{lead.name}</Button></Link></td>
                    <td>{lead?.email}</td>
                    <td><code>{lead?.emp || lead?.dept ? "Employee" : "Student"}</code></td>
                </tr>) : <><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/><LeadSkeleton/></>}
            </tbody>
        </table>
    </div>
}

function LeadSkeleton(){
    return <tr style={{width:"100%"}}><td><h1 className="loader"/></td><td><h1 className="loader"/></td><td><h1 className="loader"/></td><td><h1 className="loader"/></td></tr>;
}

function Filter({setProp, setValue, roles}){
    const [option, setOption] = useState(0), [name, setName] = useState(""), [email, setEmail] = useState(""), [role, setRole] = useState(0);

    const inputs = [
        <Input label="Name" type="text" style={{width:"300px"}} value={name} onChange={setName}/>,
        <Input label="Email" type="text" style={{width:"300px"}} value={email} onChange={setEmail}/>,
        <Select label="User Role" def="User Role" style={{width:"300px"}} value={role} setOption={setRole} options={roles} unique/>
    ], setters = [name, email, role];

    useEffect(() => {
      setProp(option);
      setValue(setters[option]);
    }, [option, name, email, role])
    
    return <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",width:"93vw"}}>
        <Select label="Filter By" def="Option" style={{width:"15vw"}} value={option} setOption={setOption} options={["Name", "Email", "Role"]}/>
        {inputs[option]}
    </div>
}
