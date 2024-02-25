const cash  = document.getElementById("cash");
const changeDue = document.getElementById("change-due")
const purchaseBtn = document.getElementById("purchase-btn")
let price = 19.5
let cid = [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]
const total = document.querySelector(".total__div__p");
const cashInDrawer = document.querySelector(".body__cashier__ul");
total.textContent = `$${price}` ;





const curr = [
    ["ONE HUNDRED", 100],
    ["TWENTY", 20],
    ["TEN", 10],
    ["FIVE", 5],
    ["ONE", 1],
    ["QUARTER", 0.25],
    ["DIME", 0.1],
    ["NICKEL", 0.05],
    ["PENNY", 0.01]
]
const changeInDrawer = (arr) => {
   cashInDrawer.textContent = "";
   arr.map(el=> {
      const li = document.createElement("li")
      li.textContent = `${el[0]}: $${el[1]}`
      cashInDrawer.append(li)
   })
}

const checkCashRegister = (price, cash, cid) => {
   const copiedCid = cid.reverse();
   changeDue.textContent = "";
   let rest = Number(cash.value) - price;
   const newArr = [];

   let sum = Number(copiedCid.flat(2).filter(el=> typeof(el) === "number").reduce((acu, el)=> acu + el, 0));
   for (let i = 0; i < curr.length; i++) {
     if(rest === sum){
      newArr.push([...cid.find((el) => el[1] === rest)])
      cid.map((el) => el[1] === rest ? el[1] = 0 : el)
      break;
   }
     else if (rest >= curr[i][1]) {
       if (copiedCid[i][1] >= curr[i][1]) {
         rest = (rest - curr[i][1]).toFixed(2);
         copiedCid[i][1] -= curr[i][1];
            if(!newArr.length){
               newArr.push([...curr[i]]);
               i = 0;
            }
            else if (newArr.length > 0){
              const find = newArr.findIndex(el=> el[0] == curr[i][0]); 
              if(find !== -1){
                    newArr[find][1] += curr[i][1];
                    i = 0;
              } 
              else{
               newArr.push([...curr[i]])
               i = 0;
              }       
            }
        }
     }
   }  
   const rest1 = Number(rest);
   if(Number(cash.value) < price){
   return alert("Customer does not have enough money to purchase the item.")
   }
   else if(Number(cash.value) === price){
      changeDue.style.display = "block";
      return changeDue.textContent = "No change due - customer paid with exact cash";
   }
   
   else if(rest < sum && !rest1){
      console.log("ASDasdasd")
     const ul = document.createElement("ul")
     const li = document.createElement("li");
     li.textContent = "Status: OPEN"
     ul.append(li);
     console.log(newArr,"ASdasd")
     return newArr.map(el=> {
      const li = document.createElement("li");
      li.append(`${el[0]}: $${el[1]}`)
      ul.append(li);
      changeDue.style.display = "block";
      changeDue.append(ul);
   })
   }
   else if(Number(cash.value) - price === sum){
      changeDue.style.display = "block";
      return changeDue.textContent = `Status: CLOSED ${newArr[0][0]}: $${newArr[0][1]}`
   }
   else if(Number(cash.value) > price && sum < Number(cash.value)){
      changeDue.style.display = "block";
      return changeDue.textContent = "Status: INSUFFICIENT_FUNDS"
   }
   

 };
 

purchaseBtn.onclick = () =>{
   checkCashRegister(price, cash, cid);
   changeInDrawer(cid)  
   cash.value = "";
}

changeInDrawer(cid) 