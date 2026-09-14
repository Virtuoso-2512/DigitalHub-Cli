import {useState} from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/button';
import Select from '../../../components/select';

function CRMHeader(){
  const btns = [
    {link:"dashboard",icon:"home"},
    {link:"leads",icon:"table"},
    {link:"forms",icon:"newspaper"},
    {link:"campaigns",icon:"bullhorn"},
    {link:"payment",icon:"indian-rupee-sign"},
    {link:"settings",icon:"gears"}
  ]
  
  return <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding:"2px auto",background:"var(--background)",width:"100vw"}}>
    <h2 style={{marginLeft:"10px",fontFamily:"Poppins"}}>Customer Relationship Management</h2>
    <div>
      {btns.map(item => window.location.pathname === "/crm/"+item.link ? <></> : <Link to={"/crm/"+item.link}><Button variant={1}><i className={"fas fa-"+item.icon}/></Button></Link>)}
    </div>
  </div>
}

function TimeRange({val, set}){
  return <Select style={{width:"10vw"}} value={val} setOption={set} options={["This Week", "Last Week", "Last 30 Days", "This Year", "Lifetime"]}/>
}

export default function LeadDashboard() {
  return <div style={{display:"flex",flexDirection:"column",background:"var(--gradient)",height:"100%"}} id="CRM">
    <CRMHeader/>
    <p>// This is just a concept DUMMY DATA</p>
    <AppStage/>
    <ScoreBoard/>
    <PublishersView/>
    <CampaignView/>
  </div>
}

function PublishersView(){
  const [option, setOption] = useState(2), options=[
    {name:"Collegedunia",value:1100,paid:500,enrolled:300},
    {name:"GoogleAds",value:900,paid:500,enrolled:300},
    {name:"Organic/Direct",value:800,paid:500,enrolled:300},
    {name:"Social (Facebook, Instagram, Twitter)",value:600,paid:400,enrolled:300},
    {name:"Offline/Walk-in",value:400,paid:300,enrolled:300},
    {name:"Telephony Inbound",value:300,paid:250,enrolled:200},
    {name:"Not Mapped",value:0,paid:0}
  ], total = 4100;

  return <div style={{margin:"30px 20px"}}>
    <div style={{display:"flex"}}>
      <h3 style={{fontFamily:"Poppins",marginRight:"auto"}}>Top Performing Publishers (Channels)</h3>
      <TimeRange val={option} set={setOption}/>
    </div>
    <div>
    <div style={{display:"flex",width:"95vw",flexDirection:"column",borderRadius:"10px",background:"var(--background)",padding:"15px 10px"}}>
      <div>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
          <div style={{ width: '100%', height: '5px', borderRadius: '15px', position: 'relative'}}></div>
            <code style={{margin:"0 15px",minWidth:"50px",maxWidth:"50px"}}>Total Leads</code>
            <code style={{minWidth:"50px",maxWidth:"50px"}}>Paid Leads</code>
            <code style={{margin:"0 15px",minWidth:"55px",maxWidth:"55px"}}>Enrolled</code>
          </div>
        </div>
        {options.map(item => <div style={{margin:"10px 0"}}>
          <h3 style={{margin:"2px"}}>{item.name}</h3>
          <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
            <div style={{ width: '100%', height: '5px', background: '#d6dbe0', borderRadius: '15px', position: 'relative'}} >
              <div style={{ width: `${(item.value/total)*100}%`, height: '100%', background: '#1972d6', borderRadius: '15px' }}/>
            </div>
            <code style={{margin:"0 15px",minWidth:"50px",maxWidth:"50px"}}>{item.value} ({((item.value/total)*100).toPrecision(3)}%)</code>
            <code style={{minWidth:"50px",maxWidth:"50px"}}>{item.paid || 0}</code>
            <code style={{margin:"0 15px",minWidth:"55px",maxWidth:"55px"}}>{item.enrolled || 0}</code>
          </div>
        </div>)}
      </div>
    </div>
  </div>
}

function CampaignView(){
  const [option, setOption] = useState(2), options=[
    {name:"CAMP/2324/GEN/201",value:1100},
    {name:"CAMP/2324/GEN/221",value:900},
    {name:"CAMP/2324/GEN/981",value:800},
    {name:"CAMP/2223/GEN/901",value:600},
    {name:"CAMP/2324/GEN/123",value:400},
    {name:"CAMP/2324/GEN/071",value:300},
    {name:"CAMP/2324/GEN/101",value:0}
  ], total = 4100;

  return <div style={{margin:"10px 20px"}}>
    <div style={{display:"flex"}}>
      <h3 style={{fontFamily:"Poppins",marginRight:"auto"}}>Top Performing Campaigns</h3>
      <TimeRange val={option} set={setOption}/>
    </div>
    <div>
    <div style={{display:"flex",width:"95vw",flexDirection:"column",borderRadius:"10px",background:"var(--background)",padding:"15px 10px"}}>
      <div>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
          <div style={{ width: '100%', height: '5px', borderRadius: '15px', position: 'relative'}}></div>
          <code style={{margin:"0 15px",minWidth:"100px",maxWidth:"100px"}}>Total Leads</code>
        </div>
      </div>
      {options.map(item => <div style={{margin:"10px 0"}}>
        <h3 style={{margin:"2px"}}>{item.name}</h3>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
          <div style={{ width: '100%', height: '5px', background: '#d6dbe0', borderRadius: '15px', position: 'relative'}} >
            <div style={{ width: `${(item.value/total)*100}%`, height: '100%', background: '#1972d6', borderRadius: '15px' }}/>
          </div>
          <code style={{margin:"0 15px",minWidth:"100px",maxWidth:"100px"}}>{item.value} ({((item.value/total)*100).toPrecision(3)}%)</code>
        </div>
      </div>)}
      </div>
    </div>
  </div>
}

function ScoreBoard(){
  const [option, setOption] = useState(2);

  return <div style={{margin:"30px 20px"}}>
    <div style={{display:"flex"}}>
      <h3 style={{fontFamily:"Poppins",marginRight:"auto"}}>Scoreboard</h3>
      <TimeRange val={option} set={setOption}/>
    </div>
    <div style={{display:"flex",justifyContent:"space-between"}}>
      <ScoreBoardDiv span="Total Leads" total={4100} options={[
        {name:"Verified",value:3000},
        {name:"Unverified",value:1100}
      ]}/>
      <ScoreBoardDiv span="Total Paid Applications" total={1000} options={[
        {name:"Online",value:600},
        {name:"Offline",value:380},
        {name:"Cash",value:20},
        {name:"DD",value:0}
      ]}/>
      <ScoreBoardDiv span="Total Unpaid Applications" total={2000} options={[
        {name:"Payment Initiated",value:500},
        {name:"Payment Not Initiated",value:1500}
      ]}/>
      <ScoreBoardDiv span="Communication" total={6000} options={[
        {name:"Email",value:3500},
        {name:"WhatsApp",value:2500}
      ]}/>
    </div>
  </div>
}

function ScoreBoardDiv({span, total, options}){
  return <div style={{display:"flex",width:"20vw",flexDirection:"column",borderRadius:"10px",background:"var(--background)",padding:"25px 10px"}}>
    <span>{span}</span>
    <h2 style={{margin:"2px"}}>{total}</h2>
    {options.map(item => <div style={{marginTop:"15px"}}>
      <h5 style={{margin:"2px"}}>{item.name} <code>{item.value}</code></h5>
      <div style={{ width: '100%', height: '5px', background: '#d6dbe0', borderRadius: '15px', position: 'relative', }} >
        <div style={{ width: `${(item.value/total)*100}%`, height: '100%', background: '#1972d6', borderRadius: '15px' }}/>
      </div>
    </div>)}
  </div>
}

function AppStage(){
  const [option, setOption] = useState(2), analyticsDiv = [
    {color:"#1972d6",icon:"users",h1:"21777",span:"Total Leads"},
    {color:"#a32cc4",icon:"hand-pointer",h1:"2008",span:"Paid Leads"},
    {color:"#e6cc00",icon:"building-columns",h1:"1400",span:"Leads Enrolled"},
    {color:"#06c258",icon:"hand",h1:"6.42%",span:"Engagement Rate"}
  ];

  return <div style={{margin:"20px 20px 50px"}}>
    <div style={{display:"flex",justifyContent:"space-between"}}>
      <h3 style={{fontFamily:"Poppins"}}>Analytics Overview</h3>
      <TimeRange val={option} set={setOption}/>
    </div>
    <div style={{display:"flex",justifyContent:"space-between"}}>
      {analyticsDiv.map(item => <div style={{display:"flex",width:"18vw",flexDirection:"column",alignItems:"center",borderRadius:"10px",background:"var(--background)",padding:"25px 10px"}}>
        <div style={{borderRadius:"50%",background:item.color+"66",height:"70px",width:"70px",display:"flex",justifyContent:"center",alignItems:"center",padding:"10px"}}>
        <i className={'fas fa-'+item.icon} style={{fontSize:"40px",color:item.color}}/>
        </div>
        <h1 style={{fontFamily:"Poppins",marginBottom:0}}>{item.h1}</h1>
        <span>{item.span}</span>
      </div>)}
    </div>  
  </div>
}

export {CRMHeader};