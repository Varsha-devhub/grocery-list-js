const input=document.getElementById('input');
const addBtn=document.getElementById('addBtn');
const gList=document.getElementById('gList');
const clrBtn=document.getElementById('clrBtn');
const STORE_KEY="loc_store";

function addItem(textItem) {
    const item=loadItem();
item.push({text:textItem,done:false});
saveItem(item);
render();
}
function dltItem(i) {
    const item=loadItem();
    item.splice(i,1);
    saveItem(item);
    render();
}
function editItem(newtext,i) {
    const item=loadItem();
    item[i].text=newtext;
    saveItem(item);
    render();
}
function saveItem(item) {
    localStorage.setItem(STORE_KEY,JSON.stringify(item));
}
function loadItem() {
    try{
        return JSON.parse(localStorage.getItem(STORE_KEY))||[];
    }catch{
        return[];
    }
}
function render() {
    const item=loadItem();
  gList.innerHTML="";
  item.forEach((t,i)=>{
 const li=document.createElement('li');
  const checkBox=document.createElement('input');
 checkBox.type='checkbox';
 checkBox.checked=t.done;
  const deltBtn=document.createElement('button');
  deltBtn.textContent='x';
  const span=document.createElement('span');
  span.textContent=t.text;
  
    deltBtn.addEventListener('click',()=>{
    dltItem(i);
})
checkBox.addEventListener('change',()=>{
    const item=loadItem();
    item[i].done=checkBox.checked;
    saveItem(item);
})
span.addEventListener('dblclick',(e)=>{
    if(e.target.tagName==='SPAN'){
const editInput=document.createElement('input');
editInput.value=span.textContent;
li.replaceChild(editInput,span);
editInput.focus();
editInput.addEventListener('keydown',(e)=>{
    if(e.key==='Enter'){
        const newtext=editInput.value.trim();
        editItem(newtext,i);
    }
    if(e.key==='Escape'){
        li.replaceChild(span,editInput);
    }
    
})
    }
})
gList.appendChild(li);
     li.append(span,checkBox,deltBtn);
  });
     
}
addBtn.addEventListener('click',()=>{
    const textItem=input.value.trim();
    if(textItem===""){
        return;
    }
    addItem(textItem);
    input.value="";
    input.focus();
})
clrBtn.addEventListener('click',()=>{
    localStorage.removeItem(STORE_KEY);
    render();
})

render();
