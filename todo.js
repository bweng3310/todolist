

document.querySelector('.add-button').addEventListener('click',
      function() {
        const input = document.querySelector('.input').value;
        const div = document.createElement('div');
        div.classList.add('row');
        div.innerHTML =
          '<span  class="box" style="width:280px"><input class="check" type="checkbox" name="box"><label class="label"">'+ input +'</label><button class="edit">edit</button></span><button class="delete">Delete</button>';
        document.querySelector('.inner').appendChild(div);
        $('.input').val('');

    })


    $('.inner').on('click', '.delete', function(e) {
         $(e.target).parent().remove()
       })

    $('.clear').click(() => {
    $('.inner').empty();
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



  
    $('.inner').on('click', '.edit', function() {
      $('.editarea').removeClass("hide");
      $('.inputarea').addClass("hide");
      $(event.target).addClass("mark");
      
    })


    $('.editbutton').on('click', function() {
        const input = $('.editinput').val();        
        $('.mark').prev().text(input);
          $('.editinput').val('');
          $('.editarea').addClass("hide");
          $('.inputarea').removeClass("hide"); 
          $('.edit').removeClass("mark");
               
      
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
          // var len2= weather.records.location[1].weatherElement
          // console.log(len2);
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
                //  $('.location').on('click', function() {    
                //   $('.wx').toggle();
                //  })
                 $('.location').on('change', function() {    
                 let val=$('.location').val();
                 console.log(val);
                 $('.wx').addClass('hide');
                 $('.'+val).removeClass('hide');
                })
              
              
     
              }}

              