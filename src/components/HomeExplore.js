import {Link} from "react-router-dom";

export default function HomeExplore({explore}){
    const gradients = ["#1972d6", "#E8BC85", "#0BAB64", "#d40826", "#7B68EE", "#B0E0E6"];

    return <div className="explore" style={{display:"flex",flexDirection:"row",width:"100%",flexWrap:"wrap",color:"var(--color)"}}>
        {explore?.length ? explore.map((item, idx) => <Link to={item.link} style={{textDecoration:"none"}}>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center",boxShadow: "1px 1px 3px 0px var(--gradient-light)",background:"var(--background-ex)"}} className="home-explore-div">
                <i className={"fas fa-"+item.icon} style={{fontSize:"90px",marginLeft:"15px",background: `linear-gradient(to right bottom, ${gradients[idx%6]}dd, ${gradients[idx%6]}ff)`,"-webkit-background-clip": "text", backgroundClip: "text", "-webkit-text-fill-color": "transparent",color:"var(--color)"}}/>
                <div style={{display:"flex",flexDirection:"column" ,justifyContent:"center",background:"transparent"}}>
                    <h2 style={{fontFamily:"Poppins",textTransform:"capitalize",color:"var(--color)"}}>{item.title}</h2>
                    <span style={{fontSize:14,color:"var(--color)"}}>{item.text}</span>
                </div>
            </div>
        </Link>) : gradients.map(bg => <div style={{display:"flex",flexDirection:"row",alignItems:"center",background:`linear-gradient(to right bottom, ${bg}11, ${bg}66)`}}>
        <i className="loader" style={{width:"200px",height:"100px"}}/>
        <div style={{display:"flex",flexDirection:"column" ,justifyContent:"center",background:"transparent"}}>
            <h2 className="loader" style={{fontFamily:"Poppins",textTransform:"capitalize"}}></h2>
            <span className="loader" style={{fontSize:14}}></span>
        </div>
    </div>)}
    </div>;
}