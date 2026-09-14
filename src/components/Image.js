import { useState, useEffect } from 'react';
import { GlobalState } from '../GlobalParent';

function fetchWithAuthentication(url, authToken) {
    const headers = new Headers();
    headers.set('authorisation', authToken);
    return fetch(url, { headers });
}

export default function Image(props) {
    const { SERVER, token, roles, userLevel} = GlobalState(), [url, setUrl] = useState("");

    useEffect(async() => {
        const response = await fetchWithAuthentication( (props.plain ? "" : SERVER+"api/"+(typeof userLevel === "number" ? (roles[userLevel+1]+"/") : "")+"cloud/")+props.src, token);
        
        // Convert the data to Base64 and build a data URL.
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setUrl(objectUrl)
        
      return () => URL.revokeObjectUrl(objectUrl)
    }, [])
    
    return <img src={url} style={{width:props.wh,height:props.wh,borderRadius:props.br,margin:0,padding:0, ...props.style}}/>
}
