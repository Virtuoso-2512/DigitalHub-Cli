import { useState } from "react";
import Swal from "sweetalert2";
import { GlobalState } from "../../../GlobalParent";
import Button from "../../../components/button";

export default function Refer() {
    const [copy, setCopy] = useState(false),{SERVER} = GlobalState();

    const setCopied = () => {
        navigator.clipboard.writeText("https://company_name.com/refer?q=1213213");
        setCopy(true);

        setInterval(() => setCopy(false), 5000);
    }, viewBenefits = () => Swal.fire({title:"Benefits of Refer & Earn !",confirmButtonColor:"#1976d2",html:`<h4 style='text-align:center'>These referring policies provide benefits both to the Referrer and Referee <br/><br/> We advice you to enjoy benefits of these schemes to the fullest in order to reduce your bill cost <br/><br/> You get <span style="color:#1972d6">5% discount on your bill</span> for the next 6 months, while the other institution also enjoys <span style="color:#1972d6">5% discount on thier bill</span> for the next 6 months</h4><br/> Please refer the <span style="color:#1972d6;cursor:pointer" onclick="window.open('/refer/tnc')">Terms & Conditions of Refer & Earn</span>`});

    return <div id="refer" style={{background:"url('"+SERVER+ "assets/home/confetti.svg')"}}>
        <h2>Refer {"&"} Earn</h2>
        <h4 style={{color:"#1976d2"}}>Refer other Institutions and Enjoy the Benefits !!</h4>
        <br/>
        <img src={SERVER + "../assets/home/gift.png"} width="250px"/>
        <div onClick={setCopied} id='referBox'>https://company_name.com/refer?q=1213213</div>
        <div style={{display:"flex"}}>
        <Button variant={4} onClick={setCopied}>C{copy ? "opied to Clipboard" : "lick to Copy"}  !</Button>
        <Button variant={5} onClick={viewBenefits}>View Benefits</Button></div>
        <h4 style={{color:"#1976d2"}}>You will recieve a mail once the other institution registers with us. Thank You for your support to increase the {`{{Product_Name}}`} family.</h4>
    </div>
}