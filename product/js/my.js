$( document ).ready(function(){


	setInterval(get_product_list, 1000);
	//get_product_list();
	get_result_price();
	delete_product();
	

	
          // TABs


	$('.head_tabs > li').on('click',function(){
		$('.head_tabs >li').removeClass('active')
		$(this).addClass('active')
// -------------
		if($('#tab1').attr('class') === 'active')$('#tab1').removeClass("active")
		if($('#tab2').attr('class') === 'active')$('#tab2').removeClass("active")
		if($('#tab3').attr('class') === 'active')$('#tab3').removeClass("active")
		$(`#${$(this).attr("data-open-tabs")}`).addClass('active')
	})


    //Choose color and mass      // Lesson 24

	$( "ul.list_option > li" ).click(function(){ 
		$(this).parent(".list_option").children('li').removeClass('active');
		$(this).addClass("active");


	});
	

	$(".count_product button").click(function(){
		let current_btn, current_count, new_count;
		
		current_btn = $(this).attr('data-type');
		current_count = $(".count_product .js-number").val();
		
		if(current_count >0 ){
			if(current_btn == "plus"){
				new_count = +current_count+1;
			} else {
				new_count = +current_count-1;
		    }
		} else {
		    $(".count_product .js-number").val(0);
	    }

		$(".count_product .js-number").val(new_count);
	});




	// Lesson 25



	/*$( "a.add_to_cart" ).click(function(){
		console.log($("h1.title def_color_txt").text());
		console.log($(".product_color ul.list_option li.active span > span").text());	
   		console.log($(".product_massa ul.list_option li.active span > span").text());
        console.log($(".count_product .js-number").val());
        console.log($("ul#lightgallery > li:first-child > img").attr("src"));
	});*/


//Add to Cart


$( "a.add_to_cart" ).click(function(){ 
		event.preventDefault();

		var check_product_color, check_product_massa;


		if ( $(".product_color .list_option > li").hasClass("active") ) {

         	$(".product_color .list_option").css({'border' : '1px solid  transparent'});
         	check_product_color = 1;

		} else {
			$(".product_color .list_option").css({'border' : '1px solid red'});
			alert("Vyberite svet tovara");
		}

		if ( $(".product_massa .list_option > li").hasClass("active") ) {

         	$(".product_massa .list_option").css({'border' : '1px solid  transparent'});
         	check_product_massa = 1;
		} else {
			$(".product_massa .list_option").css({'border' : '1px solid red'});

			alert("Vyberite massu tovara");
		}

		if (check_product_color == 1 && check_product_massa == 1) {
			var name, cena, svet, massa, img_src, add_content, result_price, url, body_cart;

			$(".cart_ttl").css({"display": "none"});
		
			name 		= $("h1.ttle.def_color_txt").text();
			kolichestvo = $(".count_product .js-number").val();
			svet 		= $(".product_color ul.list_option li.active span > span").text();
			massa 		= $(".product_massa ul.list_option li.active span > span").text();;
			cena 		= $(".product_info .price .cena_za_odin").text();
			img_src 	= $("ul#lightgallery > li:first-child > img").attr("src");
			url 		= $("input[name='url']").val();

			result_price = cena * kolichestvo;


			add_content     = '<div class="dannye_tovarov"><a href=""><div class="kartinka_tovara"><img src="http://wp1.gulnuru-ablazova.m3rem.spectrum.myjino.ru/product/'+url+'/'+img_src+'" alt=""></div><div class="opisanie_tovara"><p>'+name+'</p><p class="cart_count"><span>Количество:</span><span>'+kolichestvo+'</span></p><p class="cart_color_massa"><span>'+svet+' </span><span>'+massa+'</span></p><div class="block_price"><span class="originalnaya_cena"><span class="synbol">$</span><span class="cena_za_odin">'+cena+'</span></span><sup><span>*</span><span>'+result_price+'</span></sup></div></div></a><div class="udalit_zakaz"><i class="far fa-trash-alt"></i></div></div>';
			
			$(add_content).appendTo(".listing_zakazov");

			body_cart 	=$(".block_opisanie_korziny").html();

			$.ajax({
			
				type: "POST",
				url: 'http://wp1.gulnuru-ablazova.m3rem.spectrum.myjino.ru/product/cart.php',
				data: { content: body_cart} 
			
			}).done(function( msg ) {
				//$(add_content).appendTo(".listing_zakazov");
				alert("Vash tovar uspeshno dobavlen v korzinu!");
			});

			
			delete_product();
			get_result_price();


			$(".list_option > li").removeClass('active');
			$(".js-number").val(1);


		}

	});
		
//Poluchenie dannyh iz faila s pomoshu Ajax
	function get_product_list(){
		$.ajax({
			method: "POST",
			url:'http://wp1.gulnuru-ablazova.m3rem.spectrum.myjino.ru/product/cart.php',
			dataType:'text',

			success: function (data) {

				if (data != "") {
				$(".block_opisanie_korziny").html(data);
			}
				get_result_price();
				delete_product();
			}
		});

	}
// Удаление товара в корзине
	function delete_product(){
		$( ".dannye_tovarov" ).on("click", ".udalit_zakaz", function(event) {
	    	$(this).parent(".dannye_tovarov").remove();
			
	    	body_cart	 =$(".block_opisanie_korziny").html();

			$.ajax({
				type: "POST",
				url:'http://wp1.gulnuru-ablazova.m3rem.spectrum.myjino.ru/product/cart.php',
				data: { content: body_cart}

			});
			get_result_price();			
		});
	}
			

	// Цикл для получения каждой цены товара внутри корзины
	function get_result_price(){
	
		var resultat = 0;
		var cout_pro = 0;

		$(".listing_zakazov .dannye_tovarov sup span:nth-child(2)").each(function( index ) {
			resultat = resultat + parseFloat($(this).text());
		});

		$(".listing_zakazov .dannye_tovarov .cart_count span:nth-child(2)").each(function( index ) {
			cout_pro = cout_pro + parseFloat($(this).text());
		});

		if (resultat == 0) {
			$( ".listing_zakazov" ).html("<span class='cart_ttl'>Prostite vasha korzina pusta!</span>");
			$('span.summa_v_korzine').html("$ 0");
			$('span.kol_tovarov').html("0");
			$('.itog').html("0");

		} else {
			$(".cart_ttl").remove();
			$('.itog').html("$ "+resultat);
			$('span.summa_v_korzine').html("/ "+resultat+ " $");
			$('span.kol_tovarov').html(cout_pro);
		}

	}

});