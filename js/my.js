$( document ).ready(function() {
	//get_product_list();
	setInterval(get_product_list, 1000);

	get_result_price();
	delete_product();


       //POISK

	$ (".pokazat_rezultat").click(function() {
		event.preventDefault();
		
		var znachenie_poiska;
		
		znachenie_poiska = $("[name='poisk']").val();
				
		if (znachenie_poiska == "") {
			znachenie_poiska = "vvedite v pole poiska iskomoe slovo!";

		} 

			alert( znachenie_poiska );
	});

			/*urok 12* Novaya versiya otobrajeniya menu:*/

	$( ".jq_click > li" ).on("click " , function(event) {
				
			$(this).children(".jq_open").slideToggle(300);
	});

		$( ".cart_open" ).on("click " , function(event) {
				
			$(".cart_open ~ .jq_open").slideToggle(300);
	});


//DOBAVLENIE TOVARA V KORZINU

	$(".product_btns .add_to_cart").click(function(event){
		event.preventDefault();

		var name, cena, svet, massa, img_src, add_content, body_cart;

		$(".cart_ttl").css({"display": "none"});

		name 	  	= $(this).parent(".product_btns").children('input[name="nazvanie_tovara"]').val();
		cena  		= $(this).parent(".product_btns").children('input[name="cena"]').val();
		svet 		= $(this).parent(".product_btns").children('input[name="svet"]').val();
		massa 		= $(this).parent(".product_btns").children('input[name="massa"]').val();
		img_src 	= $(this).parent(".product_btns").parent(".product_cont").children("a").children(".block_img").children("img").attr('src');
		kolichestvo = 1;

		result_price = cena * 1;

		add_content 	= '<div class="dannye_tovarov"><a href=""><div class="kartinka_tovara"><img src="http://wp1.gulnuru-ablazova.m3rem.spectrum.myjino.ru/'+img_src+'" alt=""></div><div class="opisanie_tovara"><p>'+name+'</p><p class="cart_count"><span>Количество:</span><span>'+kolichestvo+'</span></p><p class="cart_color_size"><span>'+svet+' </span><span>'+massa+'</span></p><div class="block_price"><span class="originalnaya_cena"><span class="synbol">$</span><span class="cena_za_odin">'+cena+'</span></span><sup> <span>*</span> <span>'+result_price+'</span></sup></div></div></a><div class="udalit_zakaz"><i class="far fa-trash-alt"></i></div></div>';
				
		$(add_content).appendTo(".listing_zakazov");

		body_cart 		= $(".block_opisanie_korziny").html();

		$.ajax({
			
			type: "POST",
			url: 'http://wp1.gulnuru-ablazova.m3rem.spectrum.myjino.ru/product/cart.php',
			data: { content: body_cart}
			
		}).done(function( msg ) {
			alert("Ваш товар успешно добавлен в корзину!");
		});
			
		delete_product();
		get_result_price();
	});

			


	// Скрытие и раскрытие звездочки
	$( ".product_cont" ).mouseover(function() {
		$(this).children(".product_btns").css({"display": "block"});
		$(this).children("a").children(".product_desc").children(".stars").css({"display": "none"});
	});
	
	$( ".product_cont" ).mouseleave(function() {
		$(this).children(".product_btns").css({"display": "none"});
		$(this).children("a").children(".product_desc").children(".stars").css({"display": "block"});
	});








// Для оптимизации  / Выбор размера и цвета
	$(".color > span" ).on("click" , function(event) {
		event.preventDefault();
		var get_curr_color;
		get_curr_color = $(this).text();
		$('input[name="svet"]').val(get_curr_color);
	});


	$(".massa > span" ).on("click" , function(event) {
		event.preventDefault();
		var ger_curr_massa;
		get_curr_massa = $(this).text();
		$('input[name="massa"]').val(get_curr_massa);
	});

	$( ".color > span" ).on("click" , function(event) {
			$(this).css({"border": "1px solid red"});
	});

	$( ".size > span" ).on("click" , function(event) {
			$(this).css({"border": "1px solid red"});
	});

	$(".open_menu, .menu_close").click(function(){
		
		if($(".open_menu ~ .dnone").hasClass("dnone")){
			$(".open_menu ~ .dnone").removeClass("dnone").addClass("dblock")
		} else {
			$(".open_menu ~ .dblock").removeClass("dblock").addClass("dnone")
		}
		
	});

// Получение данных из файла с помощью Ajax
	function get_product_list(){
		$.ajax({
			method: "POST",
			url:'http://wp1.gulnuru-ablazova.m3rem.spectrum.myjino.ru/product/cart.php',
			dataType:'text',

			success: function (data) {
                if (data != "") {
					$(".block_opisanie_korziny").html(data);
					console.log(data);
				}
				get_result_price();
        		delete_product();
			}
		});
	}

/*Lesson 17*/
// Удаление товара в корзине
	function delete_product(){
		$( ".dannye_tovarov" ).on("click", ".udalit_zakaz", function(event) {
				$(this).parent(".dannye_tovarov").remove();

				body_cart 		= $(".block_opisanie_korziny").html();
				$.ajax({
			
					type: "POST",
					url: 'http://wp1.gulnuru-ablazova.m3rem.spectrum.myjino.ru/product/cart.php',
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
			//cout_pro.push($(this).text());
		});

		$(".listing_zakazov .dannye_tovarov .cart_count span:nth-child(2)").each(function( index ) {
			cout_pro = cout_pro + parseFloat($(this).text());
		});

		if (resultat == 0) {
			$( ".listing_zakazov" ).html("<span class='cart_ttl'>Простите, Ваша корзина пуста!</span>");
			$('span.summa_v_korzine').html("$ 0");
			$('span.kol_tovarov').html("0");
			$('.itog').html("0");
		} else {
			$(".cart_ttl" ).remove();
			$('.itog').html("$ "+resultat);
			$('span.summa_v_korzine').html("/ "+resultat+ " $");
			$('span.kol_tovarov').html(cout_pro);
		}		
	}
});
