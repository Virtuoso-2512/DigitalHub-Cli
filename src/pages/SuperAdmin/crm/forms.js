import {useEffect, useState} from 'react';
import Button from '../../../components/button';
import Input from '../../../components/input';
import Select from '../../../components/select';
import { GlobalState } from '../../../GlobalParent';
import { CRMHeader } from './dashboard';
import Switch from '../../../components/switch';

export default function Forms() {
    const {get} = GlobalState(), [statuses, setStatuses] = useState([]), [agree, setAgree] = useState(false), [permanantAdd, setPemAdd] = useState(true), [th10, setth10] = useState(true), [th12, setth12] = useState(true), [diploma, setDiploma] = useState(true);

    useEffect(async() => {        
        const reqq = await get("static/lead-status");
        setStatuses(reqq.options);
    }, [])

    return <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",background:"var(--gradient)"}}>
        <CRMHeader/>
        <h1 style={{margin:"0 auto"}}>Forms</h1>
        <span style={{margin:"0 auto 15px"}}>Forms are the 3<sup>rd</sup> to 5<sup>th</sup> stage of Applicant Process. These steps are guided by our Intelligent and Robust Systems.</span>
        <Aaccordion title="Basic" children={<>
            <Input label="Name" disabled/>
            <Input label="Email" disabled/>
            <Input label="Application No." disabled/>
            <Input label="Date of Application" disabled/>
            <Input label="Current Status" disabled/>
            <Input label="Course" disabled/>
            <Input label="Specialization" disabled/>
        </>}/>
        <Aaccordion title="Personal" children={<>
            <Input label="First Name" disabled/>
            <Input label="Middle Name" disabled/>
            <Input label="Last Name" disabled/>
            <Input label="Email" disabled/>
            <Input label="Phone No." disabled/>
            <Input label="Date of Birth" disabled/>
            <Input label="Blood Group" disabled/>
            <Input label="Mother Tongue" disabled/>
            <Input label="Nationality" disabled/>
            <Input label="Category" disabled/>
            <Input label="Religion" disabled/>
            <Input label="Aadhaar Card No." disabled/>
            <Input type="file" label="Upload Your Recent Passport-Size Photo" disabled/>
        </>}/>
        <Aaccordion title="Parents" children={<>
            <h4 style={{fontFamily:"Poppins"}}>Father's Details</h4>
            <Input label="Name" disabled/>
            <Input label="Email" disabled/>
            <Input label="Phone No." disabled/>
            <br/>
            <br/>
            <br/>
            <h4 style={{fontFamily:"Poppins"}}>Mother's Details</h4>
            <Input label="Name" disabled/>
            <Input label="Email" disabled/>
            <Input label="Phone No." disabled/>
        </>}/>
        <Aaccordion title="Address" children={<>
            <Input style={{width:"850px"}} label="Current Address" disabled/>
            <Input label="City/District" disabled/>
            <Input label="State" disabled/>
            <Input label="Country" disabled/>
            <Input label="Pin Code (6-digit)" disabled/>
            <div style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
                <Switch state={permanantAdd} onChange={setPemAdd}/>
                <h4 style={{margin:"10px 15px"}}>Is Current Address same as the Permanant Address ?</h4>
            </div>
            {permanantAdd ? <div/> : <Input style={{width:"850px"}} label="Permanant Address" disabled/>}
        </>}/>
        <Aaccordion title="Academic" children={<>
            <div style={{display:"flex",alignItems:"center",marginLeft:"15px"}}>
                <Switch state={th10} onChange={setth10}/>
                <h4 style={{margin:"10px 15px", fontFamily:"Poppins"}}>10th Details</h4>
            </div>
            {th10 ? <><Input label="School Name" disabled/>
                <Input label="School Location" disabled/>
                <Input label="Board" disabled/>
                <Input label="Seat No./Roll No." disabled/>
                <Input label="Year of Passing" disabled/>
                <Input label="Obtained Percentage (CGPA)" disabled/>
                <Input type="file" label="Upload 10th Marksheet" disabled/>

                <div style={{display:"flex",alignItems:"center",marginLeft:"15px",marginTop:"40px"}}>
                    <Switch state={th12} onChange={setth12}/>
                    <h4 style={{margin:"10px 15px", fontFamily:"Poppins"}}>12th Details</h4>
                </div>
                {th12 ? <><Input label="School Name" disabled/>
                    <Input label="School Location" disabled/>
                    <Input label="Board" disabled/>
                    <Input label="Seat No./Roll No." disabled/>
                    <Input label="Year of Passing" disabled/>
                    <Input label="Obtained Percentage (CGPA)" disabled/>
                    <Input type="file" label="Upload 12th Marksheet" disabled/>
                    
                    <div style={{display:"flex",alignItems:"center",marginLeft:"15px",marginTop:"40px"}}>
                        <Switch state={diploma} onChange={setDiploma}/>
                        <h4 style={{margin:"10px 15px", fontFamily:"Poppins"}}>Graduation/Diploma Details</h4>
                    </div>
                    {diploma ? <><Input label="College Name" disabled/>
                    <Input label="College Location" disabled/>
                    <Input label="Year of Passing" disabled/>
                    <Input label="Obtained Percentage (CGPA)" disabled/>
                    <Input type="file" label="Upload Graduation/Diploma Marksheet" disabled/></> : <div/>}
                </> : <div/>}            
            </> : <><Input label="Last School Attended" disabled/>
                <Input label="School Location" disabled/>
                <Input label="Name of Board" disabled/>
                <Input label="Last Class Passed" disabled/>
                <Input label="Year of Passing" disabled/>
                <Input type="file" label="Upload Proof as Marksheet" disabled/>
            </>}
        </>}/>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"40px 0"}}>
            <Switch state={agree} onChange={setAgree}/>
            <span style={{maxWidth:"700px",fontSize:"16px",marginLeft:"20px"}}>I Certify That The Information Submitted By Me In Support Of This Application, Is True To The Best Of Knowledge And Belief. I Understand That In The Event Of Any Information Being Found False Or Incorrect, My Admission Is Liable To Be Rejected/Cancelled at any stage Of The Program. I Undertake To Abide By The Disciplinary Rules And Regulations Of The Institute. </span>
        </div>
    </div>
}

function Aaccordion(props){
    const [basic, setBasic] = useState(false);
    return <div className={'accordion embed '+(basic?"active":"")}>
        <div className='accordion-header' onClick={()=>setBasic(!basic)}>{props.title} Details <div className='accordion-header-bef'/></div>
        <div className='accordion-content'>
            {props.children}
        </div>
    </div>
}