import {useEffect, useState} from 'react';
import Button from '../../components/button';
import Input from '../../components/input';
import Select from '../../components/select';
import { GlobalState } from '../../GlobalParent';
import Switch from '../../components/switch';

export default function Forms() {
    const {get} = GlobalState(), [agree, setAgree] = useState(false), [permanantAdd, setPemAdd] = useState(true), [th10, setth10] = useState(true), [th12, setth12] = useState(true), [diploma, setDiploma] = useState(true);

    function isInViewport(element) {
        if(!element) return;
        const rect = element.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    return <div className='formwala' style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"99.7vw",background:"var(--gradient)",marginTop:"20px",marginLeft:"-4vw"}}>
        <h2>Application Form</h2>
        <Aaccordion title="Basic" children={<>
            <Input label="Name"/>
            <Input label="Email"/>
            <Input label="Application No."/>
            <Input label="Date of Application"/>
            <Input label="Current Status"/>
            <Input label="Course"/>
            <Input label="Specialization"/>
        </>}/>
        <Button id="submitbtn" variant={1} style={{position:"sticky",zIndex:300,top:0}}>Submit Application</Button>
        <Aaccordion title="Personal" children={<>
            <Input label="First Name"/>
            <Input label="Middle Name"/>
            <Input label="Last Name"/>
            <Input label="Email"/>
            <Input label="Phone No."/>
            <Input label="Date of Birth"/>
            <Input label="Blood Group"/>
            <Input label="Mother Tongue"/>
            <Input label="Nationality"/>
            <Input label="Category"/>
            <Input label="Religion"/>
            <Input label="Aadhaar Card No."/>
            <Input type="file" label="Upload Your Recent Passport-Size Photo"/>
        </>}/>
        <Aaccordion title="Parents" children={<>
            <h4 style={{fontFamily:"Poppins"}}>Father's Details</h4>
            <Input label="Name"/>
            <Input label="Email"/>
            <Input label="Phone No."/>
            <br/>
            <br/>
            <br/>
            <h4 style={{fontFamily:"Poppins"}}>Mother's Details</h4>
            <Input label="Name"/>
            <Input label="Email"/>
            <Input label="Phone No."/>
        </>}/>
        <Aaccordion title="Address" children={<>
            <Input style={{width:"850px"}} label="Current Address"/>
            <Input label="City/District"/>
            <Input label="State"/>
            <Input label="Country"/>
            <Input label="Pin Code (6-digit)"/>
            <div style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
                <Switch state={permanantAdd} onChange={setPemAdd}/>
                <h4 style={{margin:"10px 15px"}}>Is Current Address same as the Permanant Address ?</h4>
            </div>
            {permanantAdd ? <div/> : <Input style={{width:"850px"}} label="Permanant Address"/>}
        </>}/>
        <Aaccordion title="Academic" children={<>
            <div style={{display:"flex",alignItems:"center",marginLeft:"15px"}}>
                <Switch state={th10} onChange={setth10}/>
                <h4 style={{margin:"10px 15px", fontFamily:"Poppins"}}>10th Details</h4>
            </div>
            {th10 ? <><Input label="School Name"/>
                <Input label="School Location"/>
                <Input label="Board"/>
                <Input label="Seat No./Roll No."/>
                <Input label="Year of Passing"/>
                <Input label="Obtained Percentage (CGPA)"/>
                <Input type="file" label="Upload 10th Marksheet"/>

                <div style={{display:"flex",alignItems:"center",marginLeft:"15px",marginTop:"40px"}}>
                    <Switch state={th12} onChange={setth12}/>
                    <h4 style={{margin:"10px 15px", fontFamily:"Poppins"}}>12th Details</h4>
                </div>
                {th12 ? <><Input label="School Name"/>
                    <Input label="School Location"/>
                    <Input label="Board"/>
                    <Input label="Seat No./Roll No."/>
                    <Input label="Year of Passing"/>
                    <Input label="Obtained Percentage (CGPA)"/>
                    <Input type="file" label="Upload 12th Marksheet"/>
                    
                    <div style={{display:"flex",alignItems:"center",marginLeft:"15px",marginTop:"40px"}}>
                        <Switch state={diploma} onChange={setDiploma}/>
                        <h4 style={{margin:"10px 15px", fontFamily:"Poppins"}}>Graduation/Diploma Details</h4>
                    </div>
                    {diploma ? <><Input label="College Name"/>
                    <Input label="College Location"/>
                    <Input label="Year of Passing"/>
                    <Input label="Obtained Percentage (CGPA)"/>
                    <Input type="file" label="Upload Graduation/Diploma Marksheet"/></> : <div/>}
                </> : <div/>}            
            </> : <><Input label="Last School Attended"/>
                <Input label="School Location"/>
                <Input label="Name of Board"/>
                <Input label="Last Class Passed"/>
                <Input label="Year of Passing"/>
                <Input type="file" label="Upload Proof as Marksheet"/>
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
    return <div style={{margin:"1vw 5vw"}}>
        <h3>{props.title} Details</h3>
        <div>
            {props.children}
        </div>
    </div>
}