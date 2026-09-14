import { GlobalState } from "../GlobalParent";
import toast from "../controllers/Alert";

export default function File(props){
  const {post} = GlobalState();

  const upload = e => {
    const file = e.target.files[0];

    if(!file) return;

    if(["jpeg","jpg","png"].indexOf(file.name.split('.').reverse()[0]) < 0) return toast("File Type Not Accepted !");

    const reader = new FileReader(), MAX_HEIGHT= props.height || 80;
    reader.readAsDataURL(file);

    reader.onload = event => {
        const imgElement = document.createElement("img");
        imgElement.src = event.target.result;

        imgElement.onload = async(e) => {
            const canvas = document.createElement("canvas");
    
            canvas.height = MAX_HEIGHT; 
            canvas.width = props.width || MAX_HEIGHT;
    
            const ctx = canvas.getContext("2d");
            ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);

            const fileToUpload = ctx.canvas.toDataURL(e.target, "image/jpg");//dataURLtoFile(, "icon.jpg");

            const body = new FormData();
            body.append("file", fileToUpload);
            body.append("upload_preset", "docs_upload_example_us_preset");
          
            fetch("https://api.cloudinary.com/v1_1/demo/image/upload"/*image or video*/, {method: "POST",body})
            .then((response) => { return response.text() })
              .then(async(data) => {
                const dataParsed = JSON.parse(data);

                const newFile = await post("../cloud/upload", {link:dataParsed.secure_url});
                if(!newFile.id) return toast("Error in Uploading Image to Server !");

                props.onChange(newFile.id);
              });
        }
    }
  }

  return <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
    <span style={{marginRight:"15px"}}>{props.label}</span>
    <div className="textInput">
      <div>
        <input type="text" {...props} onChange={upload}/>
      </div>
    </div>
  </div>;
}