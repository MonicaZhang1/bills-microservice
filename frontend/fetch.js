async function getRecentActionBills(){
    try {
        const url = `http://localhost:3000/bills/`
        const res = await fetch(url, {
            method: "GET", 
            headers:{
                "Content-Type":"application/json"
            },
        })
        return res.json()
    }catch(error){
        return res.status(error.status).json({message: "Error retrieving bills"})
    }
}

