import prisma from "../db.server"


export const create = async(query) => {
    console.log("query:",query)
    try {

        let id = query.id? query.id : ""
        const res = await prisma.crud.upsert(
            {
                where:{
                    id:id,
                },
                update:query,
                create:query
            }
        )

        console.log("res:",res)



    } catch (error) {
        console.log("error:", error)
        return error;
    }
}


export const getAllData = async () => {
    try {
        const res = await prisma.crud.findMany();

        // Ensure res is an array
        if (Array.isArray(res)) {
            return res;
        } else {
            console.error("Unexpected result:", res);
            return [];
        }
    } catch (error) {
        console.log("Error fetching data:", error);
        return []; // Return an empty array in case of an error
    }
};


export const deleteSingle = async(ids) => {
    try {
        let id = ids? ids : ""
        const res = await prisma.crud.delete({
            where:{id:id}
        })
        return res
    } catch (error) {
        console.log("error:",error)
    }
}

export const deleteSelected = async(ids=[]) => {
    console.log("idssssssss:",ids)

    if (ids.length <= 0) {
        return "id is not found"
    }

    try {
        
        const res = await prisma.crud.deleteMany({
            where:{id:{
                in: ids
            }}
        })
        return res
    } catch (error) {
        console.log("error:",error)
    }
}

export const createProduct = async (sessionAccessToken,sessionShop ) => {
    const response = await fetch(`https://${sessionShop}/admin/api/2024-01/products.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': sessionAccessToken,
      },
      body: JSON.stringify({
        product: {
          title: "Test product",
          body_html: "<strong>Product Description</strong>: This product is created by using rest api. To create a product we need session.shop and session.accessToken which we can get from authenticate.admin by passing request parameter.",
          vendor: "Sohail",
          product_type: "Test product",
          variants: [{ option1: "Size", price: "20", sku: "SKU123" }]
        }
      })
    });
    const data = await response.json();
    console.log(data);
  };
  