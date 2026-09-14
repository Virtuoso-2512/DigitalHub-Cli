import { useEffect, useState,forwardRef, useRef } from "react";
import { GlobalState } from "../../GlobalParent";
import Select from "../../components/select";
import Button from "../../components/button";
import Swal from "sweetalert2";
import toast from "../../controllers/Alert";
import ProfileHeader from "../../components/ProfileHeader";

const Input = forwardRef(({ label, helper, auto, big, type,...rest}, ref) => {
  return <div className="ti-new" style={{width:auto ? "auto" : "40vw", display:"flex",flexDirection:"column"}}>
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
  const [tab, setTab] = useState(0), links = [
    {name:"Home", icon:"user-circle"},
    {name:"Personal Info", icon:"address-card"},
    {name:"Family Details", icon:"users"},
    {name:"Important Documents", icon:"file"}
  ], components = [<ProfileHeader/>,<PersonalDetails/>,<Family/>,<Identifications/>];

  return <div style={{display:"flex",flexDirection:"row",width:"100%"}}>
    <div style={{width:"15vw",display:"flex",flexDirection:"column",height:"100%",padding:"15px 0"}}>
      {links.map((link, idx) => <h4 onClick={()=>setTab(idx)} style={{width:"100%", color:idx === tab ? "var(--color)" : "#888", background:idx === tab ? "var(--gradient)" : "transparent",height:"50px",borderRadius:"15px",margin:"2px 0",padding:"auto 10px",fontSize:"16px", display:"flex",alignItems:"center"}}><i style={{fontSize:"20px",margin:"0 15px"}} className={"fa-solid fa-"+link.icon}/> {link.name}</h4>)}
    </div>

    <div style={{maxWidth:"70vw"}}>{components[tab]}</div>
  </div>
}

function PersonalDetails(){
  const name = useRef(""), email = useRef(""), aadhar = useRef(""), mobile = useRef(""), dob = useRef(""), nationality = useRef("Indian"), medHis = useRef(""), address = useRef(""), pin = useRef("");

  const [gender, setGender] = useState(0);
  const [bldGrp, setBldGrp] = useState(0);
  const [caste, setCaste] = useState(0);
  const [cat, setcat] = useState(0);
  const [mt, setMt] = useState(0);
  const [rel, setRel] = useState(0);

  const [genderop, setGenderop] = useState([]);
  const [bldGrpop, setBldGrpop] = useState([]);
  const [casteop, setCasteop] = useState([]);
  const [catop, setcatop] = useState([]);
  const [mtop, setMtop] = useState([]);
  const [relOp, setRelOp] = useState([]);
  const {get, post} = GlobalState();

  useEffect(async() => {
    const bldGrp1 = await get("static/bldGrp");
    setBldGrpop(bldGrp1.options);
    
    const caste1 = await get("static/caste");
    setCasteop(caste1.options);
    
    const category1 = await get("static/category");
    setcatop(category1.options);
    
    const gender1 = await get("static/gender");
    setGenderop(gender1.options);
    
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
    
    nationality.current.value = stu.nationality || "Indian";
    aadhar.current.value = stu.aadhar;
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
      nationality:gr(nationality),
      aadhar:gr(aadhar),
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
    <Input type="date" label="Date of Birth" ref={dob} min="2002-12-31"/>
    
    <Selector label="Gender" state={gender} set={setGender} options={genderop}/>
    <Selector label="Blood Group" state={bldGrp} set={setBldGrp} options={bldGrpop}/>
    <Selector label="Religion" state={rel} set={setRel} options={relOp}/>
    <Selector label="Caste" state={caste} set={setCaste} options={casteop}/>
    <Selector label="Category" state={cat} set={setcat} options={catop}/>
    <Selector label="Mother Tongue" state={mt} set={setMt} options={mtop}/>

    <Input label="Nationality" ref={nationality}/>
    <Input type="number" label="Aadhar No." ref={aadhar}/>

    <Input style={{width:"1040px"}} auto label="Medical History" ref={medHis} helper="Write 'N/A', if nothing"/>
    <br/>
    <Input style={{width:"850px"}} auto label="Address" ref={address}/>
    <Input style={{width:"150px"}} auto type="number" label="Pin Code" ref={pin}/>
    <br/>
  </div>
}

function Identifications(){
  return <div style={{width:"80vw", display:'flex',flexDirection:"row",alignItems:"center",flexWrap:"wrap",marginLeft:"10vw"}}>
    <h2 style={{fontFamily:"Poppins",width:"65vw"}}>Important Documents</h2>
  </div>
}

function Family(){
  const eName = useRef(""), eRel = useRef(""), eNo = useRef("");
  const sname = useRef(""), sstd = useRef(""), sgrno = useRef("");
  const mname = useRef(""), mqual = useRef(""), mpno = useRef(""), mocc = useRef(""), mani = useRef(""), mphoto = useRef("");
  const fname = useRef(""), fqual = useRef(""), fpno = useRef(""), focc = useRef(""), fani = useRef(""), fphoto = useRef("");
  const {get, post} = GlobalState();

  useEffect(async() => {
    const stu = await get("profile/family");
    mname.current.value = stu.m_name;
    mqual.current.value = stu.m_qual;
    mocc.current.value = stu.m_occ;
    mani.current.value = stu.m_income;
    mpno.current.value = stu.m_mobile;

    fname.current.value = stu.f_name;
    fqual.current.value = stu.f_qual;
    focc.current.value = stu.f_occ;
    fani.current.value = stu.f_income;
    fpno.current.value = stu.f_mobile;

    sname.current.value = stu.sib_name;
    sstd.current.value = stu.sib_qual;
    sgrno.current.value = stu.sib_gr;

    eName.current.value = stu.emer_contact;
    eNo.current.value = stu.emer_mobile;
    eRel.current.value = stu.emer_contactRel;
  }, []);

  const gr = (ref) => ref.current.value // "gr" stands for "get reference"

  const save = async() =>{
    const tosend = {
      m_name: gr(mname),
      m_qual: gr(mqual),
      m_occ: gr(mocc),
      m_income: gr(mani),
      m_mobile: gr(mpno),
      
      f_name: gr(fname),
      f_qual: gr(fqual),
      f_occ: gr(focc),
      f_income: gr(fani),
      f_mobile: gr(fpno),
      
      sib_name: gr(sname),
      sib_qual: gr(sstd),
      sib_gr: gr(sgrno),

      emer_contact:gr(eName),
      emer_mobile:gr(eNo),
      emer_contactRel:gr(eRel)
    }

    const stu = await post("profile/", tosend);

    if(stu.success) return toast("Profile Updated Successfully !", 1)
    return toast("Error in Profile Updation !")
  }

  return <div style={{width:"80vw", display:'flex',flexDirection:"row",alignItems:"center",flexWrap:"wrap",marginLeft:"10vw"}}>
    <h2 style={{fontFamily:"Poppins",width:"65vw"}}>Family Details</h2>
    <Button variant={4} onClick={save}>Save</Button>
    <h4 style={{margin:'5px 0',width:"80vw"}}>Manage the details of your Mother, Father and sibling(s)</h4>

    <ParentDetails parent="Mother" name={mname} qual={mqual} pno={mpno} occ={mocc} ani={mani} photo={mphoto}/>
    <ParentDetails parent="Father" name={fname} qual={fqual} pno={fpno} occ={focc} ani={fani} photo={fphoto}/>

    <Input label="Name of Sibling" ref={sname} big/>
    <Input label="Qualification/Standard of Sibling" ref={sstd}/>
    <Input type="number" label="GR Number" ref={sgrno}/>
    
    <h2 style={{fontFamily:"Poppins",width:"80vw",margin:0,marginTop:"50px"}}>Emergency Details</h2>
    <Input label="Emergency Contact" ref={eName} big/>
    <Input label="Relation with Child" ref={eRel}/>
    <Input type="number" label="Contact Number" ref={eNo}/>

  </div>
}

function ParentDetails({parent,name, qual, pno, occ, ani, photo}){
  return <>
    <h2 style={{fontFamily:"Poppins",width:"100%",margin:0,marginTop:"50px"}}>{parent} Details</h2>
    <Input label={"Name of "+parent} ref={name} big/>
    <Input label={parent+"'s Qualification"} ref={qual}/>
    <Input label={parent+"'s Phone number"} ref={pno}/>
    <Input label={parent+"'s Occupation"} ref={occ}/>
    <Input type="number" label={parent+"'s Annual Income"} ref={ani}/>
    <p style={{width:"100%"}}>{parent+" Photo"}</p>
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