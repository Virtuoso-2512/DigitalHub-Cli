import {useEffect, useRef, useState} from 'react';
import Select from '../../../components/select';
import toast from '../../../controllers/Alert';
import { GlobalState } from '../../../GlobalParent';
import { CRMHeader } from './dashboard';
import Switch from '../../../components/switch';

export default function LeadSettings() {
    const {get, SERVER} = GlobalState(), [forms, setForms] = useState(true), [camp, setCamp] = useState(-1), [caop, setCaop] = useState([]);

    useEffect(async() => {
      const res2 = await get("./crm/campaigns");
      setCaop(res2.campaigns || [])
    }, []);
    
    const select1 = `<script src="${SERVER}crm-tracking.js"/>`;
    const select2 = `<iframe id="atds-forms" src="${SERVER}crm/?campaign=${camp === -1 ? "" : camp}" style="width:500px;overflow:hidden;height:700px;margin:0;border-radius:10px;border:0"></iframe>`;

    return <><CRMHeader/><div style={{display:"flex",flexDirection:"column",justifyContent:"center",width:"92vw",flexWrap:"wrap",padding:"0 20px"}}>
        
        <h2 style={{margin:"10px auto",fontFamily:"poppins"}}>CRM Settings</h2>
        <h3>Accepting Forms ?</h3>
        <div style={{display:"flex",alignItems:"center",marginLeft:"2px",marginBottom:"40px"}}>
          <Switch state={forms} onChange={setForms}/>
          <h4 style={{margin:"10px 15px", fontFamily:"Poppins"}}>Are you Accepting New Admission Forms Now ?</h4>
        </div>
        <h3>Embed/Redirect Settings</h3>
        <span>Select the appropriate Settings, you want to display on the Widget Form you apply on your website.</span>
        <span>Remember, you can change these settings afterwards on this page or setup multiple types of forms.</span>
        <h4 style={{fontFamily:"poppins"}}>Step 1 : Add the below script in the <code>{"<body>"}</code> tag of Your website</h4>
        <CodeWithCopyButton code={select1}/>
        <br/>
        <h4 style={{fontFamily:"poppins"}}>Step 2 : Select Campaign (If none, then Form will not be Active)</h4>
        <span>Choose Wisely, Campaign provides important insights and helps sort through your institutes.</span>
        <br/>
        <Select label="Campaigns" def="Campaigns" unique value={camp} setOption={setCamp} options={caop}/>
        <span>{camp === -1 ? "Please Select an Campaign" : "The Form will be for " + camp} !</span>
        <br/>
        <h4 style={{margin:"5px 0", fontFamily:"poppins"}}>You are all set ! Now copy the Code below to the site you want to the form !</h4>
        <span style={{fontSize:"14px",marginBottom:"15px"}}>We recommend you to do not change any styling properties to preserve the best Experience Possible</span>
        <CodeWithCopyButton code={select2}/>
        <br/>
        <br/>
    </div></>
}

function CodeWithCopyButton({ code }) {
    const codeRef = useRef(null);

    const handleCopyClick = async () => {
        if (codeRef.current) {
          try {
            await navigator.clipboard.writeText(codeRef.current.textContent);
            toast('Code copied to Clipboard!', 2);
          } catch (error) {
            console.error('Failed to copy code to clipboard:', error);
            toast('Failed to copy code to clipboard.');
          }
        }
    };
  
    return (
      <div className="code-container">
        <code ref={codeRef}>{code}</code>
        <button className="copy-button" onClick={handleCopyClick}>
          Copy
        </button>
      </div>
    );
  }