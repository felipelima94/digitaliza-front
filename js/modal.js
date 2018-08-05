$(document).ready(function(){
	$("a[rel=modal]").click( function(ev){
		ev.preventDefault();

		var id = $(this).attr("href");

		// var alturaTela = $(document).height();
		// var larguraTela = $(window).width();

		//colocando o fundo preto
		//$('#mascara').css({'width':larguraTela,'height':alturaTela});
		// $('#mascara').fadeIn(1000);	
		$('#mascara').fadeIn("slow");


		// var left = ($(window).width() /2) - ( $(id).width() / 2 );
		// var top = ($(window).height() / 2) - ( $(id).height() / 2 );

		var height = $(id).height() / 2;
		var width = $(id).height() / 2;

		$(id).css({'top':"calc(50% - "+height+"px)",'left':"calc(50% - "+width+"px)"});
		$(id).show();
		$('body').css('overflow','hidden');
	});

	$("#mascara").click( function(){
		$(this).hide();
		$(".window").hide();
		$('body').css("overflow", "visible");
	});

	$('.fechar').click(function(ev){
		ev.preventDefault();
		$("#mascara").hide();
		$(".window").hide();
		$('body').css("overflow", "visible");
		});
});

			/* Quando o usuário clica no botão,
alternar entre esconder e mostrar o conteúdo suspenso */
function myFunction() {
		document.getElementById("myDropdown").classList.toggle("show");
}

// Fecha a lista suspensa se o usuário clicar fora dela
window.onclick = function(event) {
	if (!event.target.matches('#dropbtn')) {

		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
}