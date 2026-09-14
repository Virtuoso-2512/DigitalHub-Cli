import { GlobalState } from "../../GlobalParent";
import { useEffect, useRef, useState } from "react";
import Button from "../../components/button";
import Switch from "../../components/switch";
import Input from "../../components/input";
import toast from "../../controllers/Alert";
import Forms from "./Form";

export default function ApplicationProcess(){
    const [Steps, setSteps] = useState([]), [active, setActive] = useState(1), {get} = GlobalState(), Components = [<div/>, <Verify addActive={()=>setActive(active+1)}/>, <Forms/>, <Payment/>, <ApplicationStatus/>];

    useEffect(async() => {
      const req = await get("stage");
      if(req?.stage) setActive(req.stage+1);

      const req2 = await get("static/lead-stages");
      setSteps(req2.options);
    }, [])

    return <div style={{display:"flex",flexDirection:"column",width:"100%",padding:"2vw 4vw"}}>
      <div className="stepper-container">
        {Steps.map((step,idx) => <><div className={"step "+(active >= idx ? "active" : "")}>
            <label style={idx < active ? {padding:"8px"} : {}}>{idx < active ? <i className="fas fa-check"/> : (idx+1)}</label>
            <span>{step}</span>
        </div>{idx+1 === Steps.length ? <div/> : <div className={"connector"+(active > idx ? " active" : "")}><span/></div>}</>)}
      </div>
      {Components[active]}
    </div>
};

function Verify({addActive}){
    const [option, setOption] = useState(0), [OTP, setOTP] = useState(""), [OTPD, setOTPD] = useState(false), [value, setValue] = useState(""), {get} = GlobalState();

    useEffect(async() => {
      const reqq = await get("home/prerify?type="+option);
      setValue(reqq.value);
    }, [option])

    const sendOtp = async() => {
        const reqOTP = await get("home/send?type="+option);
        if(reqOTP.success) return setOTPD(true);
        
        if(!option && !reqOTP.wa) return toast("WhatsApp Service is facing some problems at the moment !");
        return toast("Error in Sending OTP !");
    }, verifyOTP = async() => {
      if(OTP.length !== 6) return toast("Not a valid OTP !");
    
      const reqOTP2 = await get("home/verify?otp="+OTP+"&type="+(option?2:1));
      if(reqOTP2.success){ addActive();return toast("OTP Verification Successfully !", 1);}
      return toast("Error in Verifying OTP !");
  };

    return <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:"90%",justifyContent:"center"}}>
        <h2 style={{fontFamily:"Poppins"}}>Verify Your Email or Phone Number</h2>
        {OTPD ? <div style={{display:"flex",flexDirection:"column",alignItems:"center",margin:"10px auto",width:"30%",justifyContent:"center"}}>
            <OtpInput setParent={setOTP}/>
            <Button variant={1} disabled={!OTP} onClick={verifyOTP}>Verify OTP</Button>
        </div> :<><div style={{display:"flex",flexDirection:"row",alignItems:"center",width:"90%",justifyContent:"center"}}>
            <h4 style={{color:!option ? "#1972d6" : "var(--color)"}}>Verify By Phone Number</h4>
            <Switch state={option} onChange={setOption} margin="0 10px"/>
            <h4 style={{color:!option ? "var(--color)" : "#1972d6"}}>Verify By Email</h4>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <Input value={option ? value : "+91 "+ value} disabled label={option ? "Email Address" : "Phone No."}/>
            <Button variant={2} onClick={sendOtp}>Send OTP on {option ? "Mail" : "WhatsApp"}</Button>
        </div></>}
    </div>
}

const OtpInput = ({setParent}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  useEffect(() => {
    var trulyArr = otp.filter(value => /^-?\d+\.?\d*$/.test(value));
    if(trulyArr.length === 6) setParent(otp.join(""));
    else setParent("");
  }, [otp])

  const handleOtpChange = (event, index) => {
    const newOtp = [...otp];
    const inputValue = event.target.value;

    if(event.key === "-") {event.preventDefault();return};

    // Limit input to one digit
    if (inputValue.length > 1) {
      newOtp[index] = inputValue.charAt(inputValue.length - 1);
    } else {
      newOtp[index] = inputValue;
    }

    setOtp(newOtp);

    // Move focus to the next input field or the previous field if backspace is pressed
    if (inputValue && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    } else if (event.key === 'Backspace' && !inputValue && index > 0) {
      console.log('Moving focus to previous field');
      inputRefs.current[index - 1].focus();
      console.log('Focus moved to previous field');
      newOtp[index - 1] = '';
      setOtp(newOtp);
    }
  };

  const handleOtpPaste = (event) => {
    event.preventDefault();
    const pastedOtp = event.clipboardData.getData('text').slice(0, 6).split('');
    const newOtp = [...otp];

    for (let i = 0; i < inputRefs.current.length; i++) {
      if (pastedOtp[i]) {
        newOtp[i] = pastedOtp[i];
      }
    }

    setOtp(newOtp);
  };

  const handleOtpKeyDown = (event, index) => {
    if(event.key === "-") {event.preventDefault();return};
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const renderInputs = () => {
    const inputs = [];

    for (let i = 0; i < 6; i++) {
      inputs.push(
        <input
          key={i}
          type="number"
          maxLength="1"
          value={otp[i]}
          onChange={(e) => handleOtpChange(e, i)}
          onPaste={handleOtpPaste}
          onKeyDown={(e) => handleOtpKeyDown(e, i)}
          ref={(el) => inputRefs.current[i] = el}
        />
      );
    }

    return inputs;
  };

  return (
    <div className="otp-container">
      {renderInputs()}
    </div>
  );
};  

function Payment(){
    return <h1>Payment</h1>
}

function ApplicationStatus(){
    return <h1>Application Status</h1>
}