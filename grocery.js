const form=document.querySelector(".grocery-form");
const Input=document.querySelector(".grocery-input");
const submitbtn=document.querySelector(".submit-btn");
const clearbtn=document.querySelector(".clear-btn");
const Container=document.querySelector(".grocery-container");
const list=document.querySelector(".grocery-list");
const alert=document.querySelector(".alert");

let editElement;
let editID = '';
let editFlag =false;

//***********Event listener********//
form.addEventListener("submit",additem);
clearbtn.addEventListener("click",clearItem);
window.addEventListener("DOMContentLoaded",setup);
//*******functions*********//
function additem(e)
{
    e.preventDefault();
    const value = Input.value;
    const id = new Date().getTime().toString();
    if (value && !editFlag)
    {
        createItem(id,value);
     Container.classList.add("show-container");
     displayAlert("item added to the list",'success');
     addLocalStorage(id,value);
     setBackDefault();
    }
    else if (value && editFlag)
    {
        editElement.innerHTML=value;
        displayAlert("value changed","success");
        editLocalStorage(editID,value);
        setBackDefault();

    }
    else
    {
       displayAlert("empty value",'danger');
    }

}
///clearitem
function clearItem()
{
    const items = document.querySelectorAll(".groceryBox");
    if(items.length>0)
    {
    items.forEach(item=>{
        list.removeChild(item);
    });
    }
    Container.classList.remove("show-container");
    displayAlert("all items deleted","danger");
    localStorage.removeItem("list");
    setBackDefault();
}
//alert 
function displayAlert(text,action)
{
    alert.textContent=text;
    alert.classList.add(`alert-${action}`);
    setTimeout(function()
    {
        alert.textcontent='';
    alert.classList.remove(`alert-${action}`);
    
    },1000);
}
function setBackDefault()
{
    Input.value='';
    editFlag=false;
    editID='';
    submitbtn.textContent="submit";
    
}
function delItem(e)
{
 const delitem = e.currentTarget.parentElement.parentElement;
 list.removeChild(delitem);
 const id =delitem.dataset.id;
 if(list.childElementCount === 0)
 {
     Container.classList.remove("show-container");
 }
 displayAlert("item deleted","danger");
 removeLocalStorage(id);
 setBackDefault();
}
function editItem(e)
{
    const edititem = e.currentTarget.parentElement.parentElement;
     editElement=e.currentTarget.parentElement.previousElementSibling;
    editID=edititem.dataset.id;
    Input.value=editElement.innerHTML;
    editFlag =true ;
    submitbtn.textContent="edit";
}
function createItem(id,value)
{
    const element = document.createElement("article");
     element.classList.add("groceryBOX");
     const attr = document.createAttribute("data-id");
     attr.value= id;
     element.setAttributeNode(attr);
     element.innerHTML = `<p class="grocery-item">${value}</p>
     <div class="btn-container">
         <button type="button" class="edit-btn btn">
             <i class="fa fa-pencil-square" aria-hidden="true"></i>
        </button>
         <button type="button" class="del-btn btn">
             <i class="fa fa-trash" aria-hidden="true"></i>
         </button>
     </div>`
     const delbtn=element.querySelector('.del-btn');
     const editbtn=element.querySelector('.edit-btn');
     delbtn.addEventListener("click",delItem);
     editbtn.addEventListener("click",editItem);
     list.appendChild(element);
     
}

function setup()
{
 let items =getLocalStorage();
 items.forEach(item=> {
     createItem(item.id,item.value);
 });
 Container.classList.add("show-container");
}
//********Local Storage********//
function addLocalStorage(id,value)
{
    const grocery ={id,value};
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem("list",JSON.stringify(items));
}
function removeLocalStorage(id)
{
    let items =getLocalStorage();
    items = items.filter(function(item){
        if(item.id !== id)
        {
           return item;
        }
   });
   localStorage.setItem("list",JSON.stringify(items));
}
function editLocalStorage(id,value)
{
     let items = getLocalStorage();
     items = items.filter(item=>{
         if(item.id === id)
         {
             item.value = value;
         }
         return item;
     });
     localStorage.setItem("list",JSON.stringify(items));
}
function getLocalStorage()
{
    return localStorage.getItem("list")?JSON.parse(localStorage.getItem("list")):[];
}
