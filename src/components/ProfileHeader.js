import {useState} from 'react';
import Image from "./Image";
import Theme from "./theme";
import Button from './button';
import { GlobalState } from '../GlobalParent';
import Popup from './Popup';
import ProgressBar from './ProgressBar';
import toast from '../controllers/Alert';

export default function ProfileHeader() {
    const {pfp, username, post, setPfp} = GlobalState();
    const [open, setOpen] = useState(false);
    const [imageURL, setImageURL] = useState("");
    const [progress, setProgress] = useState(0);

    const dataURLtoFile = (dataurl, filename) => { 
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = window.atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                
        while(n--) u8arr[n] = bstr.charCodeAt(n);
            
        return new File([u8arr], filename, {type:mime});
    }

    const imageHandler = async(file) => {
        if(!file) return;
        if(["jpeg","jpg","png"].indexOf(file.name.split('.').reverse()[0]) < 0) return toast("File Type Not Accepted !");
        
        const reader = new FileReader(), MAX_HEIGHT=192;
        reader.readAsDataURL(file);

        reader.onload = function (event) {
            const imgElement = document.createElement("img");
            imgElement.src = event.target.result;

            imgElement.onload = e => {
                const canvas = document.createElement("canvas");
        
                canvas.height = MAX_HEIGHT; 
                canvas.width = MAX_HEIGHT;
        
                const ctx = canvas.getContext("2d");
                ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);
        
                const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpg");

                setImageURL(srcEncoded);
                setProgress(9);
            }
        }
    }, uploadToServer = async() => {
        setProgress(15);
        var fileToUpload = dataURLtoFile(imageURL, "my.jpg");
        
        if(fileToUpload.size >= 1e+6) {
            setProgress(5);
            return toast("File too Large !");
        }
        setProgress(25);

        const formData = new FormData();
        formData.append("file", fileToUpload);
        formData.append("upload_preset", "docs_upload_example_us_preset");
        setProgress(50);

        fetch("https://api.cloudinary.com/v1_1/demo/image/upload"/*image or video*/, {method: "POST",body: formData})
        .then((response) => { return response.text() })
            .then(async(data) => {
                const dataParsed = JSON.parse(data);
                setPfp("media/" + dataParsed.secure_url.slice(46) );
                setProgress(80);

                const pfpUpdate = await post("profile/", {pfp: dataParsed.secure_url});
                setOpen(false);
                setImageURL("");
                setProgress(100);

                if(!pfpUpdate.success) return toast("Error in profile pfp Updation !");
                return toast("Profile pfp Updated !", 1);
            });
    }

    return <div style={{width:"70vw", display:'flex',flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <Popup open={open} noclick={progress>10} setOpen={setOpen} title={<span style={{fontFamily:"Poppins"}}>Add new Profile Picture</span>}>
            <div style={{display:'flex',flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                <Image plain src={imageURL} wh={120} br="50%" style={{border:"1px solid #999",marginTop:"20px"}}/>
                {progress<10 ? <Button variant={4} onClick={imageURL ? uploadToServer :  ()=>document.getElementById("spfp").click()}>Upload Picture</Button> : <p style={{fontFamily:"Poppins",fontSize:18,margin:"25px auto"}}>Uploading to server  <div class="jumping-dot-container">
        <span class="jumping-dot dot-1"></span>
        <span class="jumping-dot dot-2"></span>
        <span class="jumping-dot dot-3"></span>
      </div></p>}
                <input id="spfp" type="file" style={{opacity:0}} accept="image/jpg, image/jpeg, image/png" onChange={e=>imageHandler(e.target.files[0])}/>
                <ProgressBar progress={progress} width={400}/>
            </div>
        </Popup>
        <Image src={pfp} wh={120} br="50%" style={{border:"1px solid #999",marginTop:"20px"}}/>
        <Button variant={7} onClick={()=>setOpen(true)}><i className="fa-solid fa-plus" style={{marginRight:"10px"}}/>Add new Profile Picture</Button>
        <h1 style={{fontFamily:"Poppins"}}>Welcome, {username} !</h1>
        <p style={{margin:"5px"}}>Manage your info, privacy, and security to make us work better for you.</p>
        <p style={{margin:"5px"}}>Make sure that this information is updated at all times !</p>
        <h3 style={{margin:"5px",color:"#06c",fontFamily:"Poppins"}}>{"{Company_Name}"} keeps your data private, safe, and secure.</h3>
        <Theme/>
    </div>
}
