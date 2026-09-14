export default function ProgressBar({progress,width}) {
    return <div style={{width:width+"px" || "270px", background:"#ddd",height:"5px", margin:"1vw",borderRadius:"15px"}}>
        <div style={{width:progress*(width/100 || 2.7)+"px", background:"#1972d6",height:"5px",borderRadius:"15px",transition:"all 1s"}}/>
    </div>
}