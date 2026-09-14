//Secure Local Storage Controllers (stores all data in base64 - as base level security measure)
const prefix = "ThissIsUrSecreett";

async function set(key, value){
    const secureKey = window.btoa(prefix+key), secureValue = window.btoa(prefix+value);

    await localStorage.setItem(secureKey, secureValue);

    return true;
}

function get(key){
    const secureKey = window.btoa(prefix+key);

    const rawValue = window.atob(localStorage.getItem(secureKey));

    const Value = rawValue.split(prefix)[1];

    return Value;
}

export default {set, get};