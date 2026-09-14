import { useEffect, useState,forwardRef, useRef } from "react";
import { GlobalState } from "../../GlobalParent";
import Select from "../../components/select";
import Button from "../../components/button";
import Swal from "sweetalert2";
import toast from "../../controllers/Alert";
import ProfileHeader from "../../components/ProfileHeader";

const Input = forwardRef(({ label, helper, auto, divStyle, big, type,...rest}, ref) => {
  return <div className="ti-new" style={{width:big ? "70vw" : (auto ? "auto" : "40vw"), display:"flex",flexDirection:"column", ...divStyle}}>
    <h5>{label}</h5>
    <div className="textInput">
      <div>
        <input type={type || "text"} {...rest} ref={ref}/>
      </div>
    </div>
    <span style={{fontSize:12}}>{helper}</span>
  </div>;
});

export default function Profile() {
  const [tab, setTab] = useState(0);
  
  const links = [
    {name:"Home", icon:"user-circle"},
    {name:"Personal Info", icon:"address-card"},
    {name:"Identifications", icon:"id-card-clip"},
    {name:"Family Details", icon:"users"}
  ], components = [<ProfileHeader/>,<PersonalDetails/>,<Identifications/>,<Family/>];

  return <div style={{display:"flex",flexDirection:"row",width:"100%"}}>
    <div style={{width:"15vw",display:"flex",flexDirection:"column",height:"100%",padding:"15px 0"}}>
      {links.map((link, idx) => <h3 onClick={()=>setTab(idx)} style={{width:"100%", color:idx === tab ? "#1972d6" : "#888", background:idx === tab ? "#1972d633" : "transparent",height:"50px",borderTopRightRadius:"20px",borderBottomRightRadius:"20px",margin:"2px 0",padding:"auto 10px",fontSize:"16px", display:"flex",alignItems:"center"}}><i style={{fontSize:"24px",margin:"0 15px"}} className={"fa-solid fa-"+link.icon}/> {link.name}</h3>)}
    </div>

    <div style={{maxWidth:"70vw"}}>{components[tab]}</div>
  </div>
}

function PersonalDetails(){
  const name = useRef(""), email = useRef(""), mobile = useRef(""), dob = useRef(""), nationality = useRef("Indian"), medHis = useRef(""), address = useRef(""), pin = useRef("");

  const [gender, setGender] = useState(0);
  const [bldGrp, setBldGrp] = useState(0);
  const [caste, setCaste] = useState(0);
  const [cat, setcat] = useState(0);
  const [mt, setMt] = useState(0);
  const [rel, setRel] = useState(0);
  const [marital, setMarital] = useState(0);

  const [genderop, setGenderop] = useState([]);
  const [bldGrpop, setBldGrpop] = useState([]);
  const [casteop, setCasteop] = useState([]);
  const [catop, setcatop] = useState([]);
  const [mtop, setMtop] = useState([]);
  const [relOp, setRelOp] = useState([]);
  const [maritalOp, setMaritalOp] = useState([]), {get, post} = GlobalState();

  useEffect(async() => {
    const bldGrp1 = await get("static/bldGrp");
    setBldGrpop(bldGrp1.options);
    
    const caste1 = await get("static/caste");
    setCasteop(caste1.options);
    
    const category1 = await get("static/category");
    setcatop(category1.options);
    
    const gender1 = await get("static/gender");
    setGenderop(gender1.options);
    
    const marital1 = await get("static/marital");
    setMaritalOp(marital1.options);
    
    const mothertongues1 = await get("static/mother-tongues");
    setMtop(mothertongues1.options);
    
    const religion1 = await get("static/religion");
    setRelOp(religion1.options);

    const stu = await get("profile/personal");
    name.current.value = stu.name;
    email.current.value = stu.email;
    mobile.current.value = stu.mobile;
    dob.current.value = stu.dob;

    setGender(stu.gender);
    setBldGrp(stu.bloodGroup);
    setRel(stu.religion);
    setCaste(stu.caste);
    setcat(stu.category);
    setMt(stu.motherTongue);
    setMarital(stu.marital)
    
    nationality.current.value = stu.nationality || "Indian";
    medHis.current.value = stu.medHis || "N/A";
    address.current.value = stu.address;
    pin.current.value = stu.pin;

  }, []);

  function Selector({label, state, set, auto, ...rest}){
    return <div style={{width:auto ? "auto" : "40vw", display:"flex",flexDirection:"column"}}>
      <h5 style={{fontFamily:"Poppins",width:"90%",margin:"45px 0 0 0"}}>{label}</h5>
      <Select {...rest} value={state} def={label} setOption={set}/>
    </div>
  }

  const gr = (ref) => ref.current.value // "gr" stands for "get reference"

  const save = async() =>{
    const tosend = {
      name:gr(name),
      mobile:gr(mobile),
      dob:gr(dob),
      gender,
      bloodGroup:bldGrp,
      religion:rel,
      caste,
      category: cat,
      motherTongue: mt,
      marital,
      nationality:gr(nationality),
      medHis:gr(medHis),
      address:gr(address),
      pin:gr(pin)
    }

    const stu = await post("profile/", tosend);

    if(stu.success) return toast("Profile Updated Successfully !", 1)
    return toast("Error in Profile Updation !")
  }

  return <div style={{width:"80vw", display:'flex',flexDirection:"row",alignItems:"center",flexWrap:"wrap",marginLeft:"10vw"}}>
    <h2 style={{fontFamily:"Poppins",width:"65vw"}}>Personal Info</h2>
    <Button variant={4} onClick={save}>Save</Button>
    <h4 style={{margin:'5px 0',width:"80vw"}}>Manage Personal Information including phone numbers and email address where you can be contacted.</h4>
    
    <Input label="Name (First & Last)" ref={name} big/>
    <Input label="Email Address" ref={email} disabled/>
    <Input type="number" label="Phone Number (10-digit)" pattern="[1-9]{1}[0-9]{9}" ref={mobile} helper="The Phone Number must be Indian."/>
    <Input type="date" label="Date of Birth" ref={dob} max="2002-12-31"/>
    
    <Selector label="Gender" state={gender} set={setGender} options={genderop}/>
    <Selector label="Blood Group" state={bldGrp} set={setBldGrp} options={bldGrpop}/>
    <Selector label="Religion" state={rel} set={setRel} options={relOp}/>
    <Selector label="Caste" state={caste} set={setCaste} options={casteop}/>
    <Selector label="Category" state={cat} set={setcat} options={catop}/>
    <Selector label="Mother Tongue" state={mt} set={setMt} options={mtop}/>
    <Selector label="Marital Status" state={marital} set={setMarital} options={maritalOp}/>

    <Input label="Nationality" ref={nationality}/>
    <Input style={{width:"1040px"}} auto label="Medical History" ref={medHis}/>
    <br/>
    <Input style={{width:"850px"}} auto label="Address" ref={address}/>
    <Input style={{width:"150px"}} auto type="number" label="Pin Code" ref={pin}/>
    <br/>
  </div>
}

function Identifications(){
  const doj = useRef(""), aadhar = useRef(""), ifsc = useRef(""), pan = useRef(""), pf = useRef(""), uan = useRef(""), {get, post} = GlobalState();

  useEffect(async() => {
    const stu = await get("profile/identifications");
    doj.current.value = stu.doj;
    aadhar.current.value = stu.aadhar;
    ifsc.current.value = stu.ifsc;
    pan.current.value = stu.pan;
    pf.current.value = stu.pf;
    uan.current.value = stu.uan;
  }, []);

  const gr = (ref) => ref.current.value // "gr" stands for "get reference"

  const save = async() =>{
    const tosend = {
      doj:gr(doj),
      aadhar:gr(aadhar),
      ifsc:gr(ifsc),
      pan:gr(pan),
      pf:gr(pf),
      uan:gr(uan)
    }

    const stu = await post("profile/", tosend);

    if(stu.success) return toast("Profile Updated Successfully !", 1)
    return toast("Error in Profile Updation !")
  }

  return <div style={{width:"80vw", display:'flex',flexDirection:"row",alignItems:"center",flexWrap:"wrap",marginLeft:"10vw"}}>
    <h2 style={{fontFamily:"Poppins",width:"65vw"}}>Identification Details</h2>
    <Button variant={4} onClick={save}>Save</Button>
    <Input type="date" label="Date of Joining" ref={doj} disabled/>
    <Input type="number" label="Aadhar No." ref={aadhar}/>
    <Input label="IFSC code" ref={ifsc}/>
    <Input label="Pan Card No." ref={pan}/>
    <Input label="Provident Fund No." ref={pf}/>
    <Input label="Universal Account No." ref={uan}/>
  </div>
}

function Family(){
  const eName = useRef(""), eRel = useRef(""), eNo = useRef(""), fn1 = useRef(""), fr1 = useRef(""), fno1 = useRef(""), fn2 = useRef(""), fr2 = useRef(""), fno2 = useRef(""), fn3 = useRef(""), fr3 = useRef(""), fno3= useRef(""), {get, post} = GlobalState();

  useEffect(async() => {
    const stu = await get("profile/family");
    eName.current.value = stu.eName;
    eRel.current.value = stu.eRel;
    eNo.current.value = stu.eNo;
    fn1.current.value = stu.fn1;
    fr1.current.value = stu.fr1;
    fno1.current.value = stu.fno1;
    fn2.current.value = stu.fn2;
    fr2.current.value = stu.fr2;
    fno2.current.value = stu.fno2;
    fn3.current.value = stu.fn3;
    fr3.current.value = stu.fr3;
    fno3.current.value = stu.fno3;
  }, []);

  const gr = (ref) => ref.current.value // "gr" stands for "get reference"

  const save = async() =>{
    const tosend = {
      eName: gr(eName),
      eRel: gr(eRel),
      eNo: gr(eNo),
      fn1: gr(fn1),
      fr1: gr(fr1),
      fno1: gr(fno1),
      fn2: gr(fn2),
      fr2: gr(fr2),
      fno2: gr(fno2),
      fn3: gr(fn3),
      fno3: gr(fno3),
      fr3: gr(fr3)
    }

    const stu = await post("profile/", tosend);

    if(stu.success) return toast("Profile Updated Successfully !", 1)
    return toast("Error in Profile Updation !")
  }

  return <div style={{width:"80vw", display:'flex',flexDirection:"row",alignItems:"center",flexWrap:"wrap",marginLeft:"10vw"}}>
    <h2 style={{fontFamily:"Poppins",width:"65vw"}}>Family Details</h2>
    <Button variant={4} onClick={save}>Save</Button>
    <h4 style={{margin:'5px 0',width:"80vw"}}>Leave Blank(s) empty if no family member(s)</h4>

    <FamMember no="1" name={fn1} p={fr1} np={fno1}/>
    <FamMember no="2" name={fn2} p={fr2} np={fno2}/>
    <FamMember no="3" name={fn3} p={fr3} np={fno3}/>
    
    <h2 style={{fontFamily:"Poppins",width:"80vw",margin:0,marginTop:"50px"}}>Emergency Details</h2>
    <Input label="Emergency Contact" ref={eName} big/>
    <Input label="Relation" ref={eRel}/>
    <Input type="number" label="Contact Number" ref={eNo}/>

  </div>
}

function FamMember({no, name, p, np}){ //p as in relation, np as in nominee percentage
  return <>
    <Input label={"Name of Family Member " + no} ref={name} big/>
    <Input label="Relation" ref={p}/>
    <Input type="number" label="Family Member (Nominee Percentage)" ref={np}/>
  </>
}

function Logout(){
  const {token, get, setToken} = GlobalState();

  const logout = () => Swal.fire({
    title:"Do you want to Logout ?",
    html:"<i class='fa-solid fa-arrow-right-from-bracket' style='font-size:100px'/>",
    showCancelButton:true,
    cancelButtonText:"Return",
    confirmButtonText:"Logout",
    confirmButtonColor: "#1976d2"
  }).then(async(result)=>{
    if (!result.isConfirmed) return;

    const res = await get("../session/logout/"+token);
    if(!res.success) return toast("Error in Logout !");

    toast("Logged You Out !", 1)
    window.localStorage.clear();
    setToken("");
    window.location = "/login";
  });

  useEffect(() => logout(), [])
  
  return <div/>;
}