/*$( ".jq_click > li" ).click(function(event) {
        event.preventDefault();
        if($(this).children(".spisok_gorodov").hasClass("dnone")){
        alert("yes class"):
        } else {
        alert("no class")
        } */

/*
        $( ".spisok_gorodov" ).mouseleave(function() {
        alert("privet ya poisk");
    });*/
    

  /*Urok 6 - using JQ dlya poluchenie 
        dannyh iz kakogo-to pole*/


/*$( ".pokazat_rezultat" ).click(function() {
    event.preventDefault();
    alert("Handler for .click() called." );
}); 


$( ".pokazat_rezultat" ).click(function() {
    alert("Handler for .click() called." );
});

$("[name='poisk']").val()


$( ".pokazat_rezultat" ).click(function() {
    event.preventDefault();
     var znachenie_poiska;
     znachenie_poiska = $("[name='poisk']").val()
     alert( znachenie_poiska );
     });


*/

      /*Urok 7
1. kak sdelat klik?(.click(function) {}) (+)
    1.Kak ubrat perezagruzku stranisy posle clicka? event.preventDefault(); (-)
    2.Click doljen proishoddit tolko po glavnomu bloku (-)
2. kak otobrazit blok? (-)(css display: block,none)
3. kak dobavit klass?(+)
4. kak udalit klass?
5. kka proverit suw-e klassa?(+)
6. kak dobavit Uslovie otobrajeniya togo ili inogo klassa(if,else)(+)


$( ".jq_click > li" ).click(function(event) {
        event.preventDefault();
        alert(i'm jq_click);
        });


$( ".spisok_gorodov" ).addClass("dblock")

if($(this).children(".spisok_gorodov").hasClass("dnone")){
*/

/* bez znaka dollara,cena za odin*/
$( ".listing_zakazov .dannye_tovarov .cena_za_odin").each(function(index) {
  console.log($(this).text());
  
});


var resultat = new Array();
$( ".listing_zakazov .dannye_tovarov .cena_za_odin").each(function(index) {
  resultat = resultat.push($(this).text());
});


//Zadacha:urok 12
1)korzina
        1)poluchit vse seny
      var resultat = new Array();
      $( ".listing_zakazov .dannye_tovarov .cena_za_odin").each(function(index) {
         resultat.push($(this).text());
      });

        2)perekonvertirovat poluchennoe znachenie v chislo
      var resultat = new Array();
      $( ".listing_zakazov .dannye_tovarov .cena_za_odin").each(function(index) {
         parseFloat($(this).text());
      });

        3)slojit +
      var resultat = 0;
      $( ".listing_zakazov .dannye_tovarov .cena_za_odin").each(function(index) {
         resultat = resultat + parseFloat($(this).text());
      });
  4)vyvesti

/*UROK 13*/
/*$(".product_btns").mouseover(function() {
     console.log($(this))
});

$(".product_btns").mouseover(function() {
     console.log($(this).parents().children(".stars"))
});

$(".product_btns").mouseover(function() {
     console.log($(this).parents().children(".stars").css({"display": "none"}))
});


/*LESSON 14*/


/*$( ".product_btns" ).mouseover(function() {
          $(this).parents(".product_cont").children(".stars").css({"display": "none"});
        $(".stars").css({"display": "none"})    
    });


$( ".product_btns" ).mouseleave(function() {
     $(this).parents(".product_cont").children(".stars").css({"display": "block"});
        $(".stars").css({"display": "block"})    
    });


$( ".product_cont" ).mouseover(function() {
  $(this).children(".product_btns").css({"display": "block"});
  $(this).children("a").children(".product_desc").children(".stars").css({"display": "none"});
});

$( ".product_cont" ).mouseleave(function() {
  $(this).children(".product_btns").css({"display": "none"});
  $(this).children(".stars").css({"display": "block"});
});


$( ".product_cont" ).mouseover(function() {
  $(this).children(".product_btns").css({"display": "block"});
  $(this).children("a").children(".product_desc").children(".stars").css({"display": "none"});
});

$( ".product_cont" ).mouseleave(function() {
  $(this).children(".product_btns").css({"display": "block"});
  $(this).children("a").children(".product_desc").children(".stars").css({"display": "block"});
});

$(".product_btns .add_to_cart").click(function(event){
  event.preventDefault();
  var name;
  name = $(this).parent(".product_btns").children('input[name="nazvanie_tovara"]').val();
  alert(name);
});


/* LESSON 15
   OPREDELIT RODITELSKIY ELEMENT

$(".product_btns .add_to_cart").click(function(event){
  event.preventDefault();
  console.log($(this).parent(".product_btns"));
});

$(".product_btns .add_to_cart").click(function(event){
    event.preventDefault();
    console.log($(this).parent(".product_btns").parent(".product_cont"));
});


$(".product_btns .add_to_cart").click(function(event){
  event.preventDefault();
  console.log($(this).parent(".product_btns").parent(".product_cont").children("a").children(".block_img img"));
});
        

        DOBAVLENIE VYBRANNYH ELEMENTOV V KORZINU

$(".product_btns .add_to_cart").click(function(event){
    event.preventDefault();

    var name, cena, svet, massa, img_src, add_content;

  
      name = $(this).parent(".product_btns").children('input[name="nazvanie_tovara"]').val();
      cena = $(this).parent(".product_btns").children('input[name="cena"]').val();
      svet = $(this).parent(".product_btns").children('input[name="svet"]').val();
      massa = $(this).parent(".product_btns").children('input[name="massa"]').val();


      add_content = '<div class="dannye_tovarov"><a href=""><div class="kartinka_tovara"><img src="'+img_src+'" alt=""></div><div class="opsinaie_tovara"><p>'+name+'</p><span class="originalnaya_cena"><span            class="symbol">$</span><span class="cena_za_odin">'+cena+'</span></span><span class="staraya_cena">$42.00</span></div></a><div class="udalit_zakaz"><i class="far fa-trash-alt"></i></div></div>';
      $(add_content).appendTo(".listing_zakazov");
    });
});

VYVESTI SVET

$(".color > span" ).on("click" , function(event) {
    event.preventDefault();
  console.log($(this).text());
  });
  NAJIMAEM NA SVET

