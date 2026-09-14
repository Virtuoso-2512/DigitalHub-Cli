import { useEffect, useState } from 'react';
import Input from '../../components/input';
import TextInput from '../../components/TextInput';
import Button from '../../components/button';
import { GlobalState } from '../../GlobalParent';
import toast from '../../controllers/Alert';

export default function SendMail() {
    const global = GlobalState();
    const mailDef = `<h3 class="ql-align-center">Dear {Name},</h3><h3><br></h3><p class="ql-align-center">Body of the mail</p><h3 class="ql-align-center">Regards,</h3><h3 class="ql-align-center">IT Admin</h3>`
    const [email, setEmail] = useState(""), [reason, setReason] = useState(""), [available, setAvailable] = useState(false), [loading, setLoading] = useState(false);
    const [salutation, setSalutation] = useState(""), [body, setBody] = useState(mailDef), [subject, setSubject] = useState("");

    const sendMail = async() => {
        setLoading(true);
        setAvailable(false);
        setEmail("");
        setSalutation("");
        setBody(mailDef);
        setReason("");
        setSubject("");

        const res = await global.post("mail", {email, salutation, body, subject, reason});
        setLoading(false);

        if (!res.success) return toast("Error in sending the mail !");
        return toast("Mail Sent Successfully !", 1);
    }

    useEffect(async() => {
        if(!(email && email.includes("@") && email.includes(".") && email[email.length-1] !== ".")) return setAvailable(false);
        
        return setAvailable(true)
    }, [email])
    

    return <><div style={{display:"flex",alignItems:"center",width:"100%",justifyContent:"center",flexDirection:"row",flexWrap:"wrap"}}>
        <div style={{display:"flex",width:"50%",justifyContent:"center",flexDirection:"column"}}>
            <h2>Send a new email</h2>
            <div style={{display:"flex", flexDirection:"row",alignItems:"center"}}>
                <Input id="email" value={email} label="Email Id to mail" onChange={setEmail}/>
                <i className={"fas fa-"+(available ? "check" : "x")} title={(available ? "V" : "Inv") + "alid Email Id"}/>
            </div>
            <Input style={{width:"600px"}} id="subject" value={subject} label="Subject" onChange={setSubject}/>
            <Input style={{width:"600px"}} id="reason" value={reason} label="Reason for sending this mail" onChange={setReason}/>
            <Input id="salutation" value={salutation} label="Mail Header(if needed)" onChange={setSalutation}/>
        </div>
        <TextInput state={body} onChange={setBody}/>

        
    </div><Button variant={1} disabled={loading || !(email && available && body && subject)} style={{margin:"0 44vw"}} onClick={sendMail}>
        {loading ? "" : "Send Mail"}
    </Button></>
}