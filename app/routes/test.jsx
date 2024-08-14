import { json } from "@remix-run/node";

export const loader = async() => {

let myData = {
    "name":"sohail",
    "country":"Pak"
}


return json({myData, otherData:"hello world", customData:{"sohail":"cool"}})


}

