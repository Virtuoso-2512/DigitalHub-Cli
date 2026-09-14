import { useState } from "react";
import Input from "../../components/input";
import { GlobalState } from "../../GlobalParent";
import Button from "../../components/button";
import Switch from "../../components/switch";

export default function MakeGroup(){
  const {userId, username} = GlobalState();
  const [grpname, setGrpName] = useState(""), [members, setMembers] = useState([{userId, username:username + " (You)"}]);
  const [permSendMsg, setPermSendMsg] = useState(true);
  const [permAddMember, setPermAddMember] = useState(false);
  const [search, setSearch] = useState("");

  const handleChipRemove = (chipToRemove) => {
    setMembers(members.filter(chip => chip.userId !== chipToRemove));
  };

  return <div className="chatBox">
      <div style={{display:"flex",flexDirection:"row",marginBottom:"15px",alignItems:"center",width:"95%"}}>
        <Input label="New Group Name" value={grpname} style={{width:"550px"}} divStyle={{marginLeft:0,marginRight:"auto"}} onChange={setGrpName}/>
        <Button variant={4} style={{margin:"0 15px"}} disabled={!grpname}>Create Group</Button>
      </div>
      <h3 style={{fontFamily:"Poppins"}}>Add Members <code>({members.length}/500)</code></h3>
      
      <div className="chips">
        {members.map((member,idx) => <Chip idx={idx} member={member} onRemove={handleChipRemove}/>)}
      </div>
      <hr style={{width:"95%",margin:"20px 0"}}/>
      <h3 style={{fontFamily:"Poppins"}}>Group Permissions</h3>
      <div style={{display:"flex", flexDirection:"row",justifyContent:"space-around"}}>
        <div style={{width:"25vw"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <h3><i className="fas fa-message" style={{marginTop:5, marginRight:5}}/> Send Messages</h3>
            <Switch state={permSendMsg} onChange={setPermSendMsg} margin="0 10px"/>
          </div>
          <p>This setting implies that <code>{permSendMsg ? "Everyone" : "ONLY Group Admins"}</code> can send Messages{!permSendMsg && ", while other Members can only view/comment them"}.</p>
        </div>
        <div style={{width:"25vw"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <h3><i className="fas fa-user-plus" style={{marginTop:5, marginRight:5}}/> Add new Members</h3>
            <Switch state={permAddMember} onChange={setPermAddMember} margin="0 10px"/>
          </div>
          <p>This setting implies that <code>{permAddMember ? "Everyone" : "ONLY Group Admins"}</code> can add new Members</p>
        </div>
      </div>
  </div>
}

const Chip = ({ member, onRemove, idx }) => {
  return (
    <div className="chip">
      <span className="themed-p chip-label">{member.username}</span>
      {idx === 0 ? null : <Button variant={6} className="chip-remove-button" onClick={()=>onRemove(member.userId)}> X </Button>}
    </div>
  );
};