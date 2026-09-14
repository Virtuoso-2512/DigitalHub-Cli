import { useState } from 'react';
import Input from '../../../components/input';
import Button from '../../../components/button';
import { GlobalState } from '../../../GlobalParent';
import toast from '../../../controllers/Alert';
import Select from '../../../components/select';

export default function Department_New() {
    const {post, username} = GlobalState();
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [deptType, setDeptType] = useState(0);

    const createDepartment = async() => {
        setLoading(true);
        const res = await post("department/create", {name, type:deptType});
        setLoading(false);
        
        if (!res.success) return toast("Error in creating the Department !");
        toast("*" + name + "* created successfully.", 1);
        setName("");
        setDeptType(0);
        return;
    }
    
    return <div style={{marginLeft:"1vw",display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
        <h2>Create a new Department for <span style={{color:"#1976d2"}}>{username}</span></h2>
        <Input label="Enter Department Name" value={name} onChange={setName}/>
        <Select label="Type of Department" value={deptType} setOption={setDeptType} options={["Teaching (Staff & Students)", "Non-Teaching (Staff Only)"]}/>
        <div>
            <p>This means that :</p>
            <p>1. You <b>can{deptType > 0 ? "'t" : ""}</b> add Students under this department.</p>
            <p>2. You can add Staff under <b>{deptType > 0 ? "only either a General Teacher or Head of Department." : "various roles like General Teacher, Class Teacher, Head of Department and Principal."}</b></p>
        </div>
        <Button disabled={loading || !name} onClick={createDepartment} variant={1} style={{ margin: "20px 0" }} >
            Create Department
        </Button>
    </div>;
}