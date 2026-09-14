import { useState } from 'react';
import Input from '../../../components/input';
import Button from '../../../components/button';
import { GlobalState } from '../../../GlobalParent';
import toast from '../../../controllers/Alert';
import Select from '../../../components/select';
import { useEffect } from 'react';

export default function BatchNew() {
    const {post, username, get,InstituteName} = GlobalState();
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [dept, setDept] = useState(0);
    const [deptOp, setDeptOp] = useState([]);

    useEffect(async() => {
      const depts = await get("department/get?type=0");
      setDeptOp(depts.departments);
    }, [])

    const createBatch = async() => {
        setLoading(true);
        const res = await post("batch/create", {name, department:dept});
        setLoading(false);
        
        if (!res.success) return toast("Error in creating the Batch !");
        toast("*" + name + "* created successfully.", 1);
        setName("");
        setDept(0);
        return;
    }
    
    return <div style={{marginLeft:"1vw",display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
        <h2>Create a new Batch for <span style={{color:"#1976d2"}}>{username}</span></h2>
        <Input label="Enter Batch Name" value={name} onChange={setName}/>
        <Select label="Batch Department" value={dept} setOption={setDept} options={deptOp} unique/>
        <Button disabled={loading || !name} onClick={createBatch} variant={1} style={{ margin: "20px 0" }} >
            Create Batch
        </Button>
        <div style={{margin:"1vw",display:"flex", flexDirection:"column", alignItems:"start", justifyContent:"start",width:"100%"}}>
            <h4 style={{fontFamily:"Poppins"}}>Please Note :-</h4>
            <ol style={{margin:"1vw"}}>
                <li>1. All batches name should be unique throughout <b>{InstituteName}</b>.</li>
                <li>2. Batches are very helpful to categorise students based on the Standards. They must not be recreated to cut tasks, You can create batch and rename it every each year. Also, there are many such functions that help reduce work.</li>
                <li>3. After Creating batch, Go to Batch Manage and Configure Subjects, Classrooms, and Assign Students & Teachers.</li>
            </ol>
        </div>
    </div>;
}