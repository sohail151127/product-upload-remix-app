
import { json } from "@remix-run/node";
import CreateSectionForm from "../components/CreateSectionForm";
import { create, deleteSelected, deleteSingle, getAllData } from "../controllers/sectionStoreController";
import { useLoaderData } from "@remix-run/react";
import GetAllData from "../components/GetAllData";


export const loader = async() =>{
  const allData = await getAllData();
  // console.log("allData:", allData)

  return allData
}


export const action = async({request}) =>{
  console.log("request:",request);
  console.log("requestDelete:",request)
  const myFormData = await request.formData();
  console.log("myFormData:",myFormData)
  const title = myFormData.get("title");
  const description = myFormData.get("description")
  const myId = myFormData.get("id")
  const myIds = JSON.parse(myFormData.get("ids"))
  
  console.log("title and description and id:", title, description, myId, myIds)

  try {
  if(title || description || myId){
   if(title && description ) {
    const data = await create({title, description})
    return data || null
   }


}else{




  if(myId ) {
    const deleteData = await deleteSingle(myId)
    return deleteData || null
   
  }

  if(myIds ) {
    const deleteAllData = await deleteSelected(myIds)
    return deleteAllData || null
   
  }




  return null
}
   

  } catch (error) {
    console.log(error)
    return json(error)
  }



}



export default function AdditionalPage() {
  const allData = useLoaderData();
  // console.log("allData:", allData)



  return (
    <div>
      <CreateSectionForm />
      <GetAllData allData={allData} />
    </div>
  );
}
