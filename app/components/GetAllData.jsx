import { useFetcher } from '@remix-run/react';
import { BlockStack, Card, DataTable, IndexTable, Page, Text, useIndexResourceState } from "@shopify/polaris";
import {  DeleteIcon } from '@shopify/polaris-icons';



export default function GetAllData({allData}){
  const fetcher = useFetcher();
    console.log("allData:",allData)
    // const arrayOfArrays = allData.map(object => Object.values(object));
    // console.log("arrayOfArrays:",arrayOfArrays)

    const resourceName = {
      singular: 'order',
      plural: 'orders',
    };

    const {selectedResources, allResourcesSelected, handleSelectionChange} = useIndexResourceState(allData);


    const rowMarkup = allData?.map(
      (
        {id, title, description, createdAt, updatedAt},
        index,
      ) => (
        <IndexTable.Row
          id={id}
          key={id}
          selected={selectedResources.includes(id)}
          position={index}
        >
 
          <IndexTable.Cell>{id}</IndexTable.Cell>

          <IndexTable.Cell>

            <Text variant="bodyMd" fontWeight="bold" as="span">
              {title}
            </Text>

          </IndexTable.Cell>

          <IndexTable.Cell>{description}</IndexTable.Cell>

          <IndexTable.Cell>{createdAt}</IndexTable.Cell>
          <IndexTable.Cell>{updatedAt}</IndexTable.Cell>

        </IndexTable.Row>
      ),
    );

    const deleteItem = async() => {
      console.log('delete button clicked')
      console.log("selectedResources:", selectedResources)  
      try {
      let myFormData = new FormData();
      myFormData.append("id",selectedResources);
      fetcher.submit(myFormData, { method: "post", action: "/app/additional" });
        // const res = await fetch("/app/additional",{
        //   method:"POST",
        //   body: myFormData
        // }) 
        // console.log("res:",res)
      } catch (error) {
        console.log("error:",error)
      }
    }



    const deleteSelectedItem = async() => {
      console.log('deleteSelected button clicked')
      console.log("selectedResources:", selectedResources)  
      try {
        let myFormData = new FormData();
        myFormData.append("ids",JSON.stringify(selectedResources));
        fetcher.submit(myFormData,{method:"post", action:"/app/additional"})


      } catch (error) {
        console.log("error:",error)
      }
    }


    const bulkActions = [
      {
        icon: DeleteIcon,
        destructive: true,
        content: 'Delete',
        onAction: () => deleteItem(),
      },
      {
        icon: DeleteIcon,
        destructive: true,
        content: 'Delete Selected',
        onAction: () => deleteSelectedItem(),
      },
    ];

    return(
        <Page>
        <h1><b>Output of your data</b></h1>
        <br />
        <Card>
        <IndexTable
        resourceName={resourceName}
        bulkActions={bulkActions}
        itemCount={allData.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={[
          {title: 'Id'},
          {title: 'Title'},
          {title: 'Description'},
          {title: 'createdAt'},
          {title: 'updatedAt'},
        ]}
      >
        {rowMarkup}
        </IndexTable>
    </Card>
        </Page>
    )
}