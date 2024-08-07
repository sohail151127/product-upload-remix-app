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


export const getAllData = async() => {
    // console.log("query:",query)
    try {

        // let id = query.id? query.id : ""
        const res = await prisma.crud.findMany()

        // console.log("grtAllData res:",res)
        return res


    } catch (error) {
        console.log("error:", error)
        return error;
    }
}

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