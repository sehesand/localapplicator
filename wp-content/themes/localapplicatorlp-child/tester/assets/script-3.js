$(function(){
    
    oldhtml='';

/*	$('.container .checkmark').on('click',function(){
		$(this).toggleClass('checked');
	})
*/

	var Now = new Date(),
  CurrentDay = Now.getDay(),
  OpeningTime = new Date(Now.getFullYear(), Now.getMonth(), Now.getDate(), 8, 0),
  ClosingTime = new Date(Now.getFullYear(), Now.getMonth(), Now.getDate(), 18, 0),
  Open = (Now.getTime() > OpeningTime.getTime() && Now.getTime() < ClosingTime.getTime());

if (CurrentDay !== 6 && CurrentDay !== 0 && Open) {
    //console.log('open');
    $('.topBar .contact').show()
}

else {
	console.log('closed')
	$('.topBar .contact').hide();
}

thisurl = window.location.href.split('?')[0]
thisurlpath = window.location.pathname.split('?')[0];
    
    $(document).on("click", "#frameredirect" , function() {
        formpos=1;
        allfilled=0;
        window.location.href = "https://www.localapplicator.com/pages/prostata";
        console.log('clicked NEW BUTTON')
    });


        steps=10;
    
    
    formpos = 1;
    
    result_number = 0;
    allfilled = 0
   
    el = $("#frame");
    $( "#framecontroll" ).click(function() {
         allfilled = 0
         
        // count the checkbox value only if its a number
        if( $(".check"+formpos+":checkbox:checked").val() != null && !isNaN($(".check"+formpos+":checkbox:checked").val()) ){
            result_number = result_number + parseInt ( $(".check"+formpos+":checkbox:checked").val() );
        }
        
        // trim all text fields
        
        $(".answers input[type='text']").each(function(){
            this.value=$(this).val().trim();
        })
        
        //console.log("steps: "+steps);
        console.log("formpos: "+(formpos));
        
        //console.log(formpos);
        
       virtualpage = "/virtual/"+$(location).attr('href').split("/").splice(0, 5)[3] + "/step-" + formpos
        
        
         if(formpos == 8){
         
             
              allfilled=1;
                $("#framecontroll").css('visibility','hidden');
            setTimeout( function(){ 
                 $("#framecontroll").trigger("click");
            }  , 5000 );
            
          }else if(formpos == 9){
        allfilled=1;
        $("#framecontroll").html("ANTWORTEN ERHALTEN &gt;&gt;");
            $("#framecontroll").css('visibility','visible');
            virtualpage = "/virtual/"+$(location).attr('href').split("/").splice(0, 5)[3] + "/step-kontakt"
         }else if(formpos == 10){
            console.log("loop 9")
            allfilled=1;
            $("#framecontroll").html("ANTWORTEN� ERHALTEN &gt;&gt;");
            $("#framecontroll").css('visibility','visible');
            
            $('#step'+formpos+' input[type="text"]').each(function(){
                if($(this).val()==""){
                   $("#step"+formpos+" .errorcheck").css("display","block");
                   allfilled=0;
                 }
            });
            $('#step'+formpos+' input[type="text"]').each(function(){
                if($(this).val()==""){
                   $("#step"+formpos+" .errorcheck").css("display","block");
                   allfilled=0;
                 }else{

                     
                 }
                    if(allfilled==1){
                        if($(this).attr('id') == 'email' ){
                        if( !isEmail($(this).val()) ){

                            $("#step"+formpos+" .errorcheck").html("Bitte geben Sie eine gültige E-Mail Adresse ein");
                            $("#step"+formpos+" .errorcheck").css("display","block");
                            allfilled=0;
                            }
                        }
                    }
                    
                    if(allfilled==1){
                        if($(this).attr('id') == 'phone' ){
                        if( !isPhone($(this).val()) ){

                            $("#step"+formpos+" .errorcheck").html("Bitte geben Sie eine gültige Telefonnummer ein");
                            $("#step"+formpos+" .errorcheck").css("display","block");
                            allfilled=0;
                            }
                        }
                    }

              });
              virtualpage = "/virtual/"+$(location).attr('href').split("/").splice(0, 5)[3] + "/step-danke"
            
            if(result_number <8){
                cont = '#result1';
            }else if(result_number >7 && result_number < 19 ){
                cont = '#result2';
            }else{
                cont = '#result3';
            }
            $("#framecontroll").html("WEITERE INFORMATIONEN &gt;&gt;");
             $("#step"+(formpos+1)).html($(cont).html().replace('{number}',result_number));
                   
        }else if(formpos == 11){     
            console.log("loop 10")
            
            allfilled=1;
          //  $("#framecontroll").html("WEITERE INFORMATIONEN &gt;&gt;");
                       
                      
            
           /* if(result_number <8){
                cont = '#result1';
            }else if(result_number >7 && result_number < 19 ){
                cont = '#result2';
            }else{
                cont = '#result3';
            }
            
            $("#step"+(formpos)).html($(cont).html().replace('{number}',result_number));
                
            */
        }else if(formpos == 11){
            allfilled=1;
        }else{  
            
            console.log("loop else")
            
            if( $("#step"+formpos+" input:checked").val() == undefined){
                $("#step"+formpos+" .errorcheck").css("display","block");
                
            }else{
                allfilled=1;
            }
            
        }
        ///console.log(formpos);
      //console.log(allfilled);
        //console.log(result_number);
        
        if(formpos >=1 &&  formpos<steps && allfilled==1){
            
            
            
            gtag('config', 'UA-132900342-1', {
               'page_title' : 'homepage',
                'page_path': virtualpage
            });

            oldhtml = $("#step"+formpos+" .errorcheck").html();
            if((formpos+1)==steps){
                //$("#framecontroll").html("Jetzt Absenden");
            }
            formpos = formpos+1;
            mrg = -((formpos-1) * 438);
            //el.css('margin-left',mrg+'px');
            //
            el.animate({
                marginLeft: mrg+'px'
            }, 200);
            

        }else if (formpos==steps && allfilled==1){
            
            // send virtual page to google
            gtag('config', 'UA-132900342-1', {
               'page_title' : 'homepage',
                'page_path': "/virtual/"+$(location).attr('href').split("/").splice(0, 5)[3] + "/step-" + formpos
            });
            
            ipss                    = result_number;
            firstname               = $("#firstname").val();
            lastname                = $("#lastname").val();
            phone                   = $("#phone").val();
            email                   = $("#email").val();
            problem                 = $(location).attr('href').split("/").splice(0, 5)[3].split("-")[0];
            
            
            
            
            // temp
          console.log('sending');
            //allfilled = 0;
            
            
            if(window.location.pathname == '/prostata-test/'){
                datatosend = {
                        'loesung_schnell': loesung_schnell,
                        'nachts_aufstehen': nachts_aufstehen,
                        'strahl_schwaeche': strahl_schwaeche,
                        'wasserlassen_aufh_ren': wasserlassen_aufh_ren,
                        'blase_wie_oft': blase_wie_oft,
                        'firstname': firstname,
                        'lastname': lastname,
                        'phone': phone,
                        'email': email, 
                        'beschwerde': problem,
                        'formid':'25489722-3bac-40b7-a60e-9a7da473ea6a',
                        'url': thisurl,
                        'pagename' : thisurlpath.substring(1, thisurlpath.length-1)
                }
            }else if(window.location.pathname == '/prostata-test-2/'){
                datatosend = {
                        'ipss': ipss,
                        'firstname': firstname,
                        'lastname': lastname,
                        'phone': phone,
                        'email': email, 
                        'formid':'31ca8e6e-f9ef-4e72-a57d-6fee522f87d9',
                        'url': thisurl,
                        'pagename' : thisurlpath.substring(1, thisurlpath.length-1)
                };
            }else if(window.location.pathname == '/prostata-test-3/'){
                datatosend = {
                        'ipss': ipss,
                        'firstname': firstname,
                        'lastname': lastname,
                        'phone': phone,
                        'email': email, 
                        'formid':'79cafca8-cdbb-4a55-a713-57173f1b8bf9',
                        'url': thisurl,
                        'pagename' : thisurlpath.substring(1, thisurlpath.length-1),
                        
                        
                        'nicht_ganz_entleert': $(".nicht_ganz_entleert:checkbox:checked").attr('data-value'),
                        'n2_stunden_zweites_mal': $(".n2_stunden_zweites_mal:checkbox:checked").attr('data-value'),
                        'harnstottern': $(".harnstottern:checkbox:checked").attr('data-value'),
                        'wasserlassen_hinauszoergern_schwierig': $(".wasserlassen_hinauszoergern_schwierig:checkbox:checked").attr('data-value'),
                        'schwacher_strahl': $(".schwacher_strahl:checkbox:checked").attr('data-value'),
                        'pressen_beim_wasserlassen': $(".pressen_beim_wasserlassen:checkbox:checked").attr('data-value'),
                        'nachts_aufstehen_wie_oft': $(".nachts_aufstehen_wie_oft:checkbox:checked").attr('data-value'),
                        'was_wenn_weitere_verschlechterung': $(".was_wenn_weitere_verschlechterung:checkbox:checked").val()
                        
                };
            }else{
                
                datatosend = {
                        'ipss': ipss,
                        'firstname': firstname,
                        'lastname': lastname,
                        'phone': phone,
                        'email': email, 
                        'formid': $('#maincont').attr('data-hubspot'),
                        'url': thisurl,
                        'pagename' : thisurlpath.substring(1, thisurlpath.length-1),
                        
                        'nicht_ganz_entleert': $(".nicht_ganz_entleert:checkbox:checked").attr('data-value'),
                        'n2_stunden_zweites_mal': $(".n2_stunden_zweites_mal:checkbox:checked").attr('data-value'),
                        'harnstottern': $(".harnstottern:checkbox:checked").attr('data-value'),
                        'wasserlassen_hinauszoergern_schwierig': $(".wasserlassen_hinauszoergern_schwierig:checkbox:checked").attr('data-value'),
                        'schwacher_strahl': $(".schwacher_strahl:checkbox:checked").attr('data-value'),
                        'pressen_beim_wasserlassen': $(".pressen_beim_wasserlassen:checkbox:checked").attr('data-value'),
                        'nachts_aufstehen_wie_oft': $(".nachts_aufstehen_wie_oft:checkbox:checked").attr('data-value'),
                        'was_wenn_weitere_verschlechterung': $(".was_wenn_weitere_verschlechterung:checkbox:checked").val()
                }
            }
            
            
            
            if(allfilled == 1){
                $.ajax({
                    type: 'POST',
                    url: '/sendtohs_1.php',
                    data: datatosend,
                    success: function(msg){
                        
                        
                        //$("#step"+formpos).html($("#dankesatz").html());
                        //window.location.href = "https://www.localapplicator.com/pages/prostata";
                        //$("#framecontroll").hide();
                        $("#framecontroll").html("WEITERE INFORMATIONEN &gt;&gt;");
                        $('#framecontroll').attr('id', 'frameredirect');
                        $("#step"+(formpos)).html($(cont).html().replace('{number}',result_number));
                    }
                });
            }
            
            
            
        }
        
      
        
    });

    
    /* back button /*
     * 
     */

//** checkboxes

    // list of pathnames with exclusive checkboxes
    var exclusivepaths = ["/arthrose-tester/","/prostata-test/","/prostata-test-1/","/prostata-test-2/","/prostata-test-a/","/prostata-test-b/","/prostata-test-3/","/prostata-test-6/","/prostata-test-7/","/prostata-test-8/","/prostata-test-9/","/prostata-test-10/"];
    var isexclusivepath = (exclusivepaths.indexOf( window.location.pathname ) > -1);
    //console.log(isexclusivepath);
    //placesdynamic
    
    

 $('.checkmark').on('click',  function(e) {
     $("#step"+formpos+" .errorcheck").css("display","none");

     
        var activeCheckbox = $(this).find('input');
        checkBoxes();
        activeCheckbox.change();
        if( activeCheckbox.is(":checked") === false){
            
            if( isexclusivepath ){ 
                uncheckAllBoxes($(this).parent().parent());
            }
            activeCheckbox.prop('checked', true);
            
            $(this).addClass('wpcf7-list-item-checked');
            $(this).children('span').addClass('wpcf7-list-item-label-active'); 
            $(this).change();
        }else{
            activeCheckbox.prop('checked', false);
            $(this).removeClass('wpcf7-list-item-checked');
            $(this).children('span').removeClass('wpcf7-list-item-label-active'); 
            checkBoxes();
        }
 });
 

checkBoxes();

function checkBoxes(){  
    //console.log("checkBoxes triggered");
    setTimeout(function() { 
    $('input[type="checkbox"]').each(function(){
        $(this).change();
    
    //console.log( $(this).prop( "checked" )  );
    
    
    if( $(this).prop('checked') === true ){
        //console.log( $(this) );
        $(this).parent().addClass('wpcf7-list-item-checked'); 
        $(this).siblings('span').addClass('wpcf7-list-item-label-active'); 
    }
    
    });
},50);
 };


function uncheckAllBoxes(ele){  
    //console.log("checkBoxes triggered");
    //console.log(ele);
    
    $(ele).find(':checkbox').each(function(){

    
    $(this).prop('checked', false);
    
    
        //console.log( $(this) );
        $(this).parent().removeClass('wpcf7-list-item-checked'); 
        $(this).siblings('span').removeClass('wpcf7-list-item-label-active'); 
    
    
    });

 };

 
 function isEmail(email) {
  
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,20})+$/;
  return regex.test(email);
}


 
 function isPhone(phone) {
  
  var regex = /^[0-9\-\(\)\s]+$/;
  return regex.test(phone);
}



function minutesFromMidnight() {
    var midnight = new Date();
    midnight.setHours( 0 );
    midnight.setMinutes( 0 );
    midnight.setSeconds( 0 );
    midnight.setMilliseconds( 0 );
    return ( Math.round(  (new Date().getTime() - midnight.getTime() )  / 1000 / 60  ));
}

function freePlaces( minutes ){
    var top     = 65;
    var step    = 15;
    block = Math.round( minutes / step );
    
    if((block+1) > top){
        return top - (block * Math.round( (top/block) ) - top);
    }else{
        return top - block;
    }
    
    
}

    $("#dynamicplaces").html( freePlaces( minutesFromMidnight() ) );



});
