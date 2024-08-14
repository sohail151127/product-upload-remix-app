import { json } from "@remix-run/node"
import { authenticate } from "../shopify.server.js";



export const loader = async({request}) =>{


    const {session} = await authenticate.admin(request);
    console.log("sessionnn:", session)

    let storedData = {
        "city":"FSD",
        "road":"college",
        "sessionn":session
    }

    return json({storedData})

    
    // let data;
    // try {
    //     const response = await fetch("https://official-joke-api.appspot.com/random_joke")
    //     if(!response.ok){
    //         throw new Error(`error status: ${response.status}`)
    //     }
    //     data =  await response.json()
    //     console.log("dataaa:",data)
    //     return json({data}, {status:response.status})
    // } catch (error) {
    //     console.log("errorrr:", error.message)
    //     return json({data}, error.status)
    // }



}