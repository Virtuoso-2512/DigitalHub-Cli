import {useState} from 'react';

export default function Tabs({tabsData, mainStyle}) {
    const [active, setActive] = useState(0);

    return <div className="tab" style={mainStyle}>
        <div style={{display:"flex"}}>{tabsData.map((tab, idx)=><button className={"tablinks"+(active===idx ? " active":"")} style={{padding:"auto"}}  onClick={()=>setActive(idx)}>{tab.name}</button>)}
        </div>      
        <div className="tab-content active">{tabsData[active].child}</div>
    </div>
}
