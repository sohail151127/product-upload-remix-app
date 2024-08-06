import { useFetcher } from '@remix-run/react';
import { Button, FormLayout, Page, TextField } from '@shopify/polaris';
import React, { useEffect, useState } from 'react';

export default function CreateSectionForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const fetcher = useFetcher();


  // const handleCreateForm = async(event) => {
  //   event.preventDefault();

    // try {
    //   let myFormData = new FormData();
    //   myFormData.append("title",title)
    //   myFormData.append("description", description)

    //   const response = await fetch("/app/additional", {
    //     method:"POST",
    //     body:myFormData
    //   })

    //   console.log("response:",response)
    // } catch (error) {
    //   console.log(error)
    // }

  // }



        useEffect(() => {
          if (fetcher.state === 'loading') {
            setTitle('');       
            setDescription('');  
          }
        }, [fetcher]);



  return (
    <Page>
    <h1><b>Input your data here</b></h1>
    <br />
    <FormLayout>
    <fetcher.Form method="post" action="/app/additional">
      <TextField 
        label="Title" 
        name="title"
       value={title}
        onChange={(value) => setTitle(value)} 
        autoComplete="off" 
      />
      <TextField
        type="text"
        name="description" 
        label="Description"
       value={description}
        onChange={(value) => setDescription(value)}
        autoComplete="off"
      />

      <Button submit type="submit">Submit</Button>
      </fetcher.Form>
    </FormLayout>
    </Page>
  );
}
