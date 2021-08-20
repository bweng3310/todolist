var TODO = []
var id = 1

function setData(){
    //localStorage
    window.localStorage.setItem('todoapp',JSON.stringify(TODO))
}

$(document).ready(function(){

  const todoData = window.localStorage.getItem('todoapp')

  if(todoData === "[]"){
    window.localStorage.removeItem('todoapp');
  }
  else if(todoData){
    TODO = JSON.parse(todoData)
    for(var i = 0; i < TODO.length; i++){
        $('.inner').append(
        `
        <div class="row " data-id="${TODO[i].id}">
        <span  class="box" style="width:280px">
          <input class="check" type="checkbox" name="box" ${TODO[i].isChecked ? 'checked' : ''}>
          <label class="label1 ${TODO[i].isChecked ? 'label' : ''}">${TODO[i].text}</label>
          <button class="edit">edit</button>
        </span>
        <button class="delete">Delete</button>
        </div>
        ` )
    }
    id = TODO[TODO.length -1 ].id +1
    
} 

//add todo
  $('.add-button').on('click',function() {
    const input = $('.input').val();
  
  
    if(input){
      TODO.push(
        {
            text: input,
            isChecked: false,
            id: id
        }
    )
      $('.inner').append(`<div class="row" data-id="${id}"><span  class="box" style="width:280px">
      <input class="check" type="checkbox" name="box">
      <label  class="label1">${input}</label>
      <button class="edit">edit</button>
      </span>
      <button class="delete">Delete</button></div>`)
      setData()
        
      $('.input').val('');
      id++
    }else{
      alert('You have to type sth...')
    }
    
})

//remove todo
$('.inner').on('click', '.delete', function(e) {
      const item = $(e.target)
      const id = item.parent().attr('data-id')
     
     TODO = TODO.filter(TODO => TODO.id !== Number(id))
     item.parent().remove()
     
     setData()
    
   })

//clear all
$('.clear').click(() => {
$('.inner').empty();
TODO = []
setData()
 })


//change checked
$('.inner').on('click', '.check',function(){
  const item = $(event.target);
  
  item.parent().find('.label1').toggleClass("label");
  const id = Number(item.parent().parent().attr('data-id'))
  TODO = TODO.map(
    array=>{
        if (array.id !==id) {
            return array
        }
        return{
            ...array,
            isChecked: !array.isChecked
        }
    })
    setData()
})







$('.unfinished').on('click', function() {
  $("input:checkbox:checked").parent().parent().hide();
  $("input:checkbox:not(:checked)").parent().parent().show();
})



$('.finished').on('click', function() {
  $("input:checkbox:checked").parent().parent().show();
  $("input:checkbox:not(:checked)").parent().parent().hide();
})



$('.active').on('click', function() {
  $("input:checkbox:checked").parent().parent().show();
  $("input:checkbox:not(:checked)").parent().parent().show();
})


//edit
$('.inner').on('click', '.edit', function(e) {
  $('.editarea').removeClass("hide");
  $('.inputarea').addClass("hide");
  $(e.target).addClass("mark");
})



$('.editbutton').on('click', function(event) {
    const val = $('.editinput').val();   
    const editid = Number($('.mark').parent().parent().attr('data-id'))
    const check = $('.mark').prev().prev().prop('checked')
    console.log(check)
    $('.mark').prev().text(val);
    
      
      $('.editarea').addClass("hide");
      $('.inputarea').removeClass("hide"); 
      $('.edit').removeClass("mark"); 
      TODO = TODO.filter(TODO => TODO.id !== editid)
     console.log(TODO)
     setData()
     TODO.push(
      {
          text: val,
          isChecked: check,
          id: editid
      }
  )
        $('.editinput').val('');
        
        setData()
        
})



var counter = 1;
setInterval(function(){
  document.getElementById('radio' + counter).checked = true;
  counter++;
  if(counter > 2){
    counter = 1;
  }
}, 2000);



const request2 = new XMLHttpRequest();
request2.open('GET', 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-F75AB82D-F2EF-4479-977F-85DBE7F2DD9E&locationName=&elementName=', true);

  request2.send(null);
  request2.onload = function() {
    if (request2.status >= 200 && request2.status < 400) {
      const weather = JSON.parse(request2.response);
      var len = weather.records.location.length;
      for(let i=0; i<len; i++ ) {
        let element = document.createElement('div');
        document.querySelector('.location').appendChild(element);
        element.outerHTML = `
        <option  class="`+ i +`" value="`+ i +`">`+ weather.records.location[i].locationName+ `</option> `
        
          let div = document.createElement('div');
          document.querySelector('.weather').appendChild(div);
          
          div.outerHTML = `
          <div class="`+ i +` wx hide">今天最高溫`+ weather.records.location[i].weatherElement[4].time[0].parameter.parameterName+`度，降雨機率`+ weather.records.location[i].weatherElement[1].time[0].parameter.parameterName+`%，天氣狀況`+ weather.records.location[i].weatherElement[0].time[0].parameter.parameterName+`</div>`
             }

             $('.location').on('change', function() {    
             let val=$('.location').val();
             console.log(val);
             $('.wx').addClass('hide');
             $('.'+val).removeClass('hide');
            })
          }}
})
