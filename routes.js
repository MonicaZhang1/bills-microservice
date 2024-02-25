const fetch = require("node-fetch");
const express = require('express');
const router = express.Router()
const dotenv = require('dotenv')

// Get 20 bills with the latest action from Congress API
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

// Format data from the Congress API
function formatBills(bills){
    const formatted_bills = bills.map(bill => ({
        "congress": bill.congress,
        "number": bill.number,
        "title": bill.title,
        "type": bill.type
    }));
    return formatted_bills
}

// GET call to send formatted bill data 
router.get('/', async (req, res)=>{
    bills =  await getBills();
    if (bills.length === 0){
        res.status(404).json({message: "There are no bills to be returned."})
    }else{
        res.json(formatBills(bills.bills))
    }
})


module.exports = router;