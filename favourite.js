var arrayofitem=[];
// this function help to get ittem form localstorage
function Item()
{

    const getitem=window.localStorage.getItem("Id");
const data=JSON.parse(getitem);
console.log(data);
arrayofitem=data;
arrayofitem.map((item)=>{
// console.log(item);
return charcterApi(item);

})

// this function will help to fetch data of single charcter
async function charcterApi(item)
{

    const charcterdata=await fetch(`http://gateway.marvel.com/v1/public/characters/${item}?ts=1&apikey=9acf637e6636769cbf95dcbbb5b64523&hash=424b73615615ef16f25f749805e60e00`);
    const comingcharcter=await charcterdata.json();
    const task=comingcharcter.data.results;
    // display(comingcharcter.data.results);
  task.map((item)=>{
    // console.log(item);
   return display(item);
  })

   

}
// this fucntion display the data on favouraite page
function display(element){
    // console.log(element);

    const content=document.getElementById('content');
    const output=`<div class="card">
    
          <img src=${element.thumbnail.path}.${element.thumbnail.extension}>
          <div class="character">
          <div class="text-center">${element.name}</div>
          <div class="red text-center">Series:<span class="white">${element.series.available}</span></div>
          <div class="red text-center">Story: <span class="white">${element.stories.available}</span></div>
         <div> <button class="modification text-center mg-left"> <a href=" ${element.urls[2].url}">Comics:${element.comics.available}</a></button></div>
         <div> <button class="modification text-center mg-left">More Details"</button></div>
         <div> <button class="modification text-center mg-left" onclick=Remove(${element.id})>Unfavouriate</button></div>
   
        


          </div>
        </div>`
content.innerHTML=content.innerHTML+output;
 
}



} 
Item();
//this fucntion remove the charcter from favouraite page
function Remove(id)
 {
    console.log("hello");
const newarray=arrayofitem.filter((item)=>{
    return item!==id;
    })
    // arrayofitem=newarray;
    let string = JSON.stringify(newarray);
    
    window.localStorage.setItem("Id",string);
    
location.reload();


 }
// console.log(arrayofitem);

