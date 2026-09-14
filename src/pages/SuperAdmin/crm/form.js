import { useEffect, useState } from "react";
import Input from '../../../components/input';
import axios from "axios";
import Select from "../../../components/select";
import './form.css';
import Button from "../../../components/button";

export default function App(){
  const getPropertyValueByKey = (key) => {
    var query = window.location.search.substring(1); // Remove leading '?' character
    var params = {};        
    var pairs = query.split('&'); // Split the query string into an array of key-value pairs
  
    // Iterate through the key-value pairs
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split('=');
      var paramKey = decodeURIComponent(pair[0]);
      var paramValue = decodeURIComponent(pair[1]);
  
      // Store the key-value pair in the JSON object
      params[paramKey] = paramValue;
    }

  return params[key];
}, BrowFind = () => {
  const userAgent = window.navigator.userAgent;
  if (/Opera|OPR/i.test(userAgent)) {
    return "Opera";
  } else if (/Edg/i.test(userAgent)) {
    return "Microsoft Edge";
  } else if (/Chrome/i.test(userAgent)) {
    return "Google Chrome";
  } else if (/Safari/i.test(userAgent)) {
    return "Apple Safari";
  } else if (/Firefox/i.test(userAgent)) {
    return "Mozilla Firefox";
  } else {
    return "Unknown";
  }
}, detectDeviceType = () => {
  const userAgent = navigator.userAgent;

  // Regular expressions to match laptop and phone user agent patterns
  const laptopRegex = /Windows NT|Macintosh|Linux x86_64/;
  const phoneRegex = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i;

  if (laptopRegex.test(userAgent)) {
    return "Laptop";
  } else if (phoneRegex.test(userAgent)) {
    return "Phone";
  } else {
    return "Unknown";
  }
};

  const SERVER = "../api/crm/"; //Server Endpoint

  const post = async(link, body) => {
      const data = await axios.post(SERVER+link, body)
      .then(res => { return res.data })
      .catch(err => { return "" });
  
      return data;
  }, get = async(link) => {
      const data = await axios.get(SERVER+link)
      .then(res => { return res.data })
      .catch(err => { return "" });
  
      return data;
  }

  const [name, setName] = useState(""), [utm, setUTM] = useState({}), [email, setEmail] = useState(""), [city, setCity] = useState(""), [phone, setPhone] = useState(""), [course, setCourse] = useState(-1), [state, setState] = useState(-1), [WAAsk, setWAAsk] = useState(0), [agree, setAgree] = useState(false), [institute, setInstitute] = useState(-1), [acceptForms, setacceptForms] = useState(true), [instituteOptions, setInstituteOptions] = useState([]), [courseOptions, setCourseOptions] = useState([]), [stateOptions, setStateOptions] = useState([]), [resq, setResq] = useState("");
  
  const campaign = getPropertyValueByKey("campaign");
  //Comment out below BOTH UseEffect
    /*useEffect(async() => {
      var instituteData = getPropertyValueByKey("institute"), courseData = getPropertyValueByKey("course");

      const campCheck = await get("campaign/"+campaign);
      if(!campCheck.active) setacceptForms(false);

      const res = await get("states_institutes?"+(instituteData?.length === 24 ? "&institute="+instituteData : "")+(courseData?.length === 24 ? "&course="+courseData : ""))

      setStateOptions(res.states);
 
      if(typeof res.institutes === "string"){
        setInstituteOptions([{_id:instituteData, name:res.institutes}]);
        setInstitute(instituteData);

        if(typeof res.courses === "string"){ 
          setCourseOptions([{_id:courseData, name:res.courses}]);
          setCourse(courseData);
        }else{ 
          setCourseOptions(res.courses);
          if(res.courses.length === 1) setCourse(res.courses[0]._id);
        }
      }else setInstituteOptions(res.institutes);

      window.addEventListener('message', event => {
        if (event.origin === getPropertyValueByKey("org") || event.origin === "http://127.0.0.1:5500/") setUTM(event.data); //Get UTM
      });
    }, [])
  
    useEffect(async() => {
      if(institute === -1) return;
      const res = await get("coursesof/"+institute);
      setCourseOptions(res.courses);
      if(res.courses.length === 1) setCourse(res.courses[0]._id);
    }, [institute]);*/
  
    const submit = async(e) => {
      e.preventDefault();

      //Configure for Phone Number
      var newphone = phone
      if(phone.includes("+")) newphone = newphone.split("+")[1];

      const aa = await post("submit", {name, email, phone:newphone, course, state, institute,campaign, city, WAAsk:WAAsk==1?true:false, BROWSER:BrowFind(), DEVICE:detectDeviceType(), referrer:document.referrer, utm });
      return setResq(aa.success ? `You will get a Mail ${WAAsk == 1 ? "and a WhatsApp message" : ""}.` : ("Error in submitting form ! " + (aa.err || "")))
    }

    const searchDocumentById = (docsArr, id) => {
      for (var i = 0; i < docsArr.length; i++) {
        if (docsArr[i]._id === id) return docsArr[i]["name"];
      }
      return null; // Document with the specified ID not found
    }
  
    return <div className='Ssec'>
        {/* Comment out below */}
      {/*acceptForms && campaign && campaign.toString().length === 24*/ true ? (resq ? <><h2>Thanks for Showing Your Interest ! </h2><h3> {resq}</h3></> :<>
      <form id='holder'>
        <Input label="Name" text={name} setText={setName}/>
        <Input label="Email Address" text={email} type="email" setText={setEmail}/>
        <Input label="Phone Number (No spaces)" maxLength={13} text={phone} setText={setPhone}/>
        <span style={{fontSize:"12px",color:"#333",margin:"0 5px 7px"}}>We expect the above number to be Indian (+91). If not, enter with country code</span>
        <Select label="OPT for WhatsApp notifications on the above number ?" value={WAAsk} setOption={setWAAsk} options={["No","Yes"]}/>
        <Select label="State" value={state} setOption={setState} options={stateOptions}/>
        <Input label="City/District" text={city} setText={setCity}/>
        {instituteOptions.length === 1 ? <div/> : <Select label="Select Institute" value={institute} setOption={setInstitute} options={instituteOptions} unique/>}
        {courseOptions.length === 1 ? <div/> : <Select label="Select Course" value={course} setOption={setCourse} options={courseOptions} unique/>}
        
        <div className="checkInput" onClick={e=>setAgree(!agree)}>
          <input type="checkbox" checked={agree}/>
          <label>I agree to receive information regarding my submitted enquiry{searchDocumentById(instituteOptions, institute) ? " on " + searchDocumentById(instituteOptions, institute) : ""}{instituteOptions.length === 1 && courseOptions.length === 1 ? (" for " + searchDocumentById(courseOptions, course)) : ""}.</label>
        </div>

        <Button variant={1} disabled={!(name && email && (phone.length === 10 || phone.length === 12 || phone.length === 13) && phone && institute && course && state && agree && city)} onClick={submit}>Submit</Button>
         
      </form>
      </>)  : <h4>Sorry, We are not accepting any Forms currently !</h4>}  
      <h5>&copy; Arnav Thakare 2023. All rights reserved.</h5>
    </div>
}