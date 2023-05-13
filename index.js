// This function will help to add charcters in htm home page

var list=document.getElementById('character-list');
var showlist=document.getElementById('show-list');
var Input=document.getElementById('Text');
var showcharcter=document.getElementById('showcharcterbyclick')


//apply eventlistener in document
document.addEventListener('click',showbox);
function showbox(e)

{
    if(e.target.id!=="charcter1")
    {
showcharcter.style.display="none";
    }
    if(e.target.className=="text" )
    {
        showlist.style.display="block";
        showlist.style.overflow="scroll";
        
    }
if(e.target.className!=="text" && e.target.className!=="list-style" && e.target.className!=="favourite")
{
    
    showlist.style.display="none";
    list.innerText=" ";
    Input.value="";
   
    
}


}
// this function help to add elemnet in dom
async function add()
{

    const marvel=await fetch('http://gateway.marvel.com/v1/public/characters?ts=1&apikey=9acf637e6636769cbf95dcbbb5b64523&hash=424b73615615ef16f25f749805e60e00');	
    
    const data=await marvel.json();
    const task=data.data.results;
    console.log(task);
   
    task.forEach(element => {
       addtodom(element);
    });

    
}
add();

//this function add characters in dom
async function addtodom(element)
{
    const content=document.getElementById('content');
    const output=`<div class="card">
    
          <img src=${element.thumbnail.path}.${element.thumbnail.extension}>
          <div class="character">
          <div class="text-center">${element.name}</div>
          <div class="red text-center">Series:<span class="white">${element.series.available}</span></div>
          <div class="red text-center">Story: <span class="white">${element.stories.available}</span></div>
         <div> <button class="modification text-center mg-left"> <a href=" ${element.urls[2] ? element.urls[2].url : "..."}">Comics:${element.comics.available}</a></button></div>
         <div> <button class="modification text-center mg-left" onclick=characterdata(${element.id})>More Details</a></button></div>\
   
        


          </div>
        </div>`
content.innerHTML=content.innerHTML+output;

       

}
//this function will help to filter the results by searcing characters





Input.addEventListener('keyup',inputhandler);


function inputhandler(){
    
    var val=Input.value;
if(Input.value.length>=2)
{
    CharcterApi(val);
}
// this fucntion help to call API
async function CharcterApi(val)
{
    
   
    const character=await fetch(`http://gateway.marvel.com/v1/public/characters?ts=1&apikey=9acf637e6636769cbf95dcbbb5b64523&hash=424b73615615ef16f25f749805e60e00&nameStartsWith=${val}&limit=20`);
    const data=await character.json();
    Itreate(data.data.results);
    
}

function Itreate(data)
{
    
    data.map((item)=>{
return showList(item.name, item.id);
    })
}
// This function show the result of input search
function showList(data ,id)
{
    var li=document.createElement('li');
    li.classList.add("list-style")
    const localdata=window.localStorage.getItem("Id");



    
    li.innerHTML=`${data} <span id=${id} onclick=Renderfunction(${id}) class="favourite">${localdata.includes(id)?"Unfavouraite":"Add to Favouraite"}</span>`;

    list.append(li);
    
}
}

var array=[];
// this function help to store data in localstorage.
function Renderfunction(id)
{ 
const fav=document.getElementById(id);
fav.innerText="Unfavouraite";
    if(array.includes(id))
    {
        alert("It is alreday added");
        return;
    }
    else
    {
    alert("Charcter has added")
   
   array.push(id);
   let string = JSON.stringify(array);
    
window.localStorage.setItem("Id",string);

    }


}

//this function will help to fetch single charcter
async function characterdata(data)
{
    const result=await fetch(`https://gateway.marvel.com/v1/public/characters/${data}a?ts=1&apikey=9acf637e6636769cbf95dcbbb5b64523&hash=424b73615615ef16f25f749805e60e00`);
    const da=await result.json();
    
    da.data.results.map((item)=>{
        return addtodom1(item);
    })

}
 function addtodom1(element)
{

    console.log("hello");
    const showcharcterbyclick=document.getElementById('showcharcterbyclick');
    showcharcterbyclick.style.display="block";
    showcharcterbyclick.innerHTML=" ";
    const output=`<div class="card1">
    <div >
          <img src=${element.thumbnail.path}.${element.thumbnail.extension}>
          </div>
          <div class="character1">
          <div class="text-center">${element.name}</div>
          <div class="red text-center mg-top">Series:<span class="white">${element.series.available}</span></div>
          <div class="red text-center mg-top">Story: <span class="white">${element.stories.available}</span></div>
          <div class="red text-center mg-top">Story: <span class="white">${element.events.available}</span></div>
         <div> <button class="modification text-center mg-left1 mg-top"> <a href=" ${element.urls[2] ? element.urls[2].url : "..."}">Comics:${element.comics.available}</a></button></div>
           <div class="text-center mg-top">Description:${element.description}</div>
   
        


          </div>
        </div>`
        showcharcterbyclick.innerHTML=showcharcterbyclick.innerHTML+output;

       

}


// var heading=document.getElementById('heading');
// var task=[];

// async function add()
// {
//     const marvel=await fetch("http://gateway.marvel.com/v1/public/comics?ts=1&apikey=9acf637e6636769cbf95dcbbb5b64523&hash=424b73615615ef16f25f749805e60e00");
//     const data=await marvel.json();
//     console.log(data.data.results);
 
// let task=[];
// task=data.data.results;
// task.map(element => {
    
//     console.log(element.thumbnail.path);
// });

// //     for(let u of data.data.results)
// //     {
// //         console.log(u);
// // //   let  {id,...d}=u;
// // //     console.log(d);
        
// //     }
// }
// add();
