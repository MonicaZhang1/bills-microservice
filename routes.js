const fetch = require("node-fetch");
const express = require('express');
const router = express.Router()
const dotenv = require('dotenv')

// Get all the bills of latest action 
async function getBills(){
    try {
        const url = `http://api.congress.gov/v3/bill?api_key=${process.env.API_KEY}`
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


router.get('/', async (req, res)=>{
    bills =  await getBills();
    if (bills.length === 0){
        res.status(404).json({message: "There are no bills to be returned."})
    }else{
        res.json(formatBills(bills.bills))
    }
})

// router.get('/:bill_number', async (req, res)=>{
//     bills =  await getBills();
//     console.log(bills);
//     if (bills.length === 0){
//         res.status(404).json({message: "Bill cannot be found"})
//     }else{
//         filtered_bills = 
//         res.json(bills)
//     }
// })

function formatBills(bills){
    const formatted_bills = bills.map(bill => ({
        "congress": bill.congress,
        "number": bill.number,
        "title": bill.title,
        "type": bill.type
    }));
    return formatted_bills
}

module.exports = router;