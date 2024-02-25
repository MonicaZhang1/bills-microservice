
async function displayPage(){
    const billContainer = document.getElementById('bill-container')

    const mainContainer = document.getElementById('main-container')
    mainContainer.append(billContainer)

    const bills = await getRecentActionBills()

    if (bills.length === 0){
        msg = document.createElement('h2')
        msg.innerText = "No bills found."
        mainContainer.append(msg)
    }else{
        await displayAllBills(bills)
    }

}

async function displayBill(bill){
    const container = document.createElement('div')
    container.classList.add('card')

    const title = document.createElement('p')
    title.className = 'card-title'
    title.innerText = bill.title

    const number = document.createElement('p')
    number.className = 'card-number'
    number.innerText = `Bill Number: ${bill.number}`

    const congress = document.createElement('p')
    congress.className = 'card-congress'
    congress.innerText = `Congress: ${bill.congress}`

    const type = document.createElement('p')
    type.className = 'card-type'
    type.innerText = `Bill Type: ${bill.type}`
  
    container.append(title)
    container.append(number)
    container.append(congress)
    container.append(type)

    document.getElementById('bill-container').append(container)
}

async function displayAllBills(bills){
    for (bill of bills){
        displayBill(bill)
    }
}

window.onload = async () =>{
    await displayPage()
}