import { GlobalState } from '../GlobalParent';
import Switch from './switch';
import toast from '../controllers/Alert';

export default function Theme() {
  const {theme, setTheme} = GlobalState();
  const handler = () => {
      if(theme === "dark") return setTheme("light");

      toast("We know you love dark mode, but it's still in progress !", 2)
      return setTheme("dark");
  };

  return <div style={{width:"50vw", background:"var(--background-h)",padding:"15px",margin:"45px 15px",borderRadius:"15px",display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
    <h3 style={{fontFamily:"Poppins"}}>Manage Device Theme</h3>
    <div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
      <h4 style={{marginRight:"10px",color:theme==="dark"?"":"#1972d6"}}>Light</h4>
      <Switch background="#999" state={theme === "dark" ? true : false} onChange={handler}/>
      <h4 style={{marginLeft:"10px",color:theme==="dark"?"#1972d6":""}}>Dark</h4>
    </div>
  </div>
}
