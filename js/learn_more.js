 
 var containersLearnMore = ['design', 'blue-drive', 'battery', 'saving-A', 'saving-B'];
 var divSelectBlueHyundai = ['divHyundai1', 'divHyundai2', 'divHyundai3',];
 var divSelectBlueComparation = ['divComparation1', 'divComparation2'];
 var showTrees;



function searchParams(){
    var querystring = window.location.href.split("?")[1] || false;

    if (querystring && querystring.indexOf("section=") !== -1 ){
	    section = querystring.split('section=')[1].split('&')[0];
        if (containersLearnMore.includes(section) ){
            changePage(section)
        } else {
            changePage('design')
        }
    } else {
	   changePage('design')
    }
}

function changeCarruselBlueDrivePrev(){
    var index;
    switch($('#carousel-example-car1 .item.active').index()){
        case 0:
            index = 2;
            break;
        case 1:
            index = 0;
            break;
        case 2:
            index = 1;
            break;
        default:
            index = 0;
            break;
        }
    $('#carousel-example-car1').carousel('prev');
    changeConsumeBlueElectric(index)
    
}



function changeCarruselBlueDriveNext(){
    $('#carousel-example-car1').carousel('next');
    var index;
    switch($('#carousel-example-car1 .item.active').index()){
        case 0:
            index = 1;
            break;
        case 1:
            index = 2;
            break;
        case 2:
            index = 0;
            break;
        default:
            index = 1;
            break;
    }
    changeConsumeBlueElectric(index)
}

	function splitIdCarrusel(value){
		if (value.indexOf("-A")>=0){
		   	value = value.split("-A")[0]
		}else if (value.indexOf("-B")>=0){
			value = value.split("-B")[0]
		}
		return value;
	}

	function changePage(section){
		containersLearnMore.splice( containersLearnMore.indexOf(section) ,1 );
			$.each( containersLearnMore, function( index, value ){
		   		$('.learn-more-'+value).hide();
		   		value = splitIdCarrusel(value);
				//$('#learn-more-'+value+'-option').removeClass('current')
                $('#learn-more-'+section+'-option').css({"background-color": "","opacity": "1"});
			});
			$('.learn-more-'+section).show();
			section = splitIdCarrusel(section);
			//$('#learn-more-'+section+'-option').addClass('current')
            $('#learn-more-'+section+'-option').css({"background-color": "#3EC3DE","opacity": ".5"});
	}



	function animateTrees(number){

		if(showTrees > number){
            var subTrees= $('.bluedrivetrees').children().length  - number;
            $.each( $('.bluedrivetrees').children(), function( index, value ){
                if(index<=subTrees-1){
                    $(value).hide();
                }
            });
		}else if (showTrees < number){
            var sumTrees= number - showTrees;
            $.each( $('.bluedrivetrees').children(), function( index, value ) {
                if (sumTrees+1>0 && !$(value).is(":visible")) {
                    $(value).show();
                    sumTrees--;
                }
            });
		}
        showTrees = number;


 	}

	function animateNumber(id){
        $('#'+id).each(function () {
            var $this = $(this);
            jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
                duration: 1000,
                easing: 'swing',
                step: function () {
                    $this.text(Math.ceil(this.Counter));
                }
            });
        });
	}


	function showVisibilityDecimalsNumbers(bool){
		if (bool){
            $('#co2Decimal').show();
            $('#co2comma').show();
		}else {
            $('#co2Decimal').hide();
            $('#co2comma').hide();
		}
	}


	function changeConsumeBlueElectric(index){
        switch (index){
            case 0:
                $('#treesNumber').text('56');
                animateTrees($('#treesNumber').text());
                animateNumber('treesNumber');
                showVisibilityDecimalsNumbers(true);
                $('#co2Number').text('2');
                $('#co2Decimal').text('185');
                animateNumber('co2Number');
                animateNumber('co2Decimal');

                break;
            case 1:

                $('#treesNumber').text('32');
                animateTrees($('#treesNumber').text());
                animateNumber('treesNumber');
                showVisibilityDecimalsNumbers(true);
                $('#co2Number').text('1');
                $('#co2Decimal').text('680');
                animateNumber('co2Number');
                animateNumber('co2Decimal');
                break;
            case 2:
                $('#treesNumber').text('10');
                animateTrees($('#treesNumber').text());
                animateNumber('treesNumber');
                showVisibilityDecimalsNumbers(false);
                $('#co2Number').text('659');
                animateNumber('co2Number');
                break;
            default:
                $('#treesNumber').text('56');
                animateTrees($('#treesNumber').text());
                animateNumber('treesNumber');
                showVisibilityDecimalsNumbers(true);
                $('#co2Number').text('2');
                $('#co2Decimal').text('185');
                animateNumber('co2Number');
                animateNumber('co2Decimal');
                break;
        }
	}

function changSavingAHyundai(index){
    var indexSelectComparation = selectedSelectIndex(divSelectBlueComparation);
    switch (index){
            case "1":
                $('#learn-more-saving-A-car').attr("src", 'imgs/ionic_front_electric.png');
                $('#learn-more-saving-A-brand').text('2017 Hyundai');
                $('#learn-more-saving-A-model').text('IONIQ electric');
                $('#learn-more-saving-A-money').text('You save $4,250');
                $('#titleComparationSelect1').text("Nissan Leaf");
                $('#titleComparationSelect2').text("Volkswagen Golf");
                changSavingAComparate("1", indexSelectComparation)
                break;
            case "2":
                $('#learn-more-saving-A-car').attr("src", 'imgs/ionic_front_plug-in.png');
                $('#learn-more-saving-A-brand').text('2017 Hyundai');
                $('#learn-more-saving-A-model').text('IONIQ plug-in');
                $('#learn-more-saving-A-money').text('You save $3,500');
                $('#titleComparationSelect1').text("Ford Fusion");
                $('#titleComparationSelect2').text("Volkswagen Golf");
                changSavingAComparate("2", indexSelectComparation)
                break;
            case "3":
                $('#learn-more-saving-A-car').attr("src", 'imgs/ionic_front_hybrid.png');
                $('#learn-more-saving-A-brand').text('2017 Hyundai');
                $('#learn-more-saving-A-model').text('IONIQ hybrid');
                $('#learn-more-saving-A-money').text('You save $3,750');
                $('#titleComparationSelect1').text("Toyota Prius");
                $('#titleComparationSelect2').text("Volkswagen Golf");
                changSavingAComparate("3", indexSelectComparation);
                break;
            default:
                $('#learn-more-saving-A-car').attr("src", 'imgs/ionic_front_electric.png');
                $('#learn-more-saving-A-brand').text('2017 Hyundai');
                $('#learn-more-saving-A-model').text('IONIQ electric');
                $('#learn-more-saving-A-money').text('You save $4,500');
                $('#titleComparationSelect1').text("Nissan Leaf");
                $('#titleComparationSelect2').text("Volkswagen Golf");
                changSavingAComparate("1", indexSelectComparation);
                break;
        }
}


function changSavingAComparate(indexIonic, indexComparate){
    
    switch (indexIonic){
            case "1":
                    if (indexComparate==="1"){
                    $('#learn-more-saving-A-comparate-car').attr("src", 'imgs/savings_nissan_leaf.png');
                    $('#learn-more-saving-A-comparate-brand').text('2017 Nissan');
                    $('#learn-more-saving-A-comparate-model').text('Leaf');
                    $('#learn-more-saving-A-comparate-money').text('You save $3,750');
                }else{
                    $('#learn-more-saving-A-comparate-car').attr("src", 'imgs/savings_volkswagen_golf.png');
                    $('#learn-more-saving-A-comparate-brand').text('2017 Volkswagen');
                    $('#learn-more-saving-A-comparate-model').text('Golf');
                    $('#learn-more-saving-A-comparate-money').text('You save $750');
                }
                break;
            case "2":
                if (indexComparate==="1"){
                    $('#learn-more-saving-A-comparate-car').attr("src", 'imgs/savings_ford_fusion.png');
                    $('#learn-more-saving-A-comparate-brand').text('2017 Ford');
                    $('#learn-more-saving-A-comparate-model').text('Fusion');
                    $('#learn-more-saving-A-comparate-money').text('You save $3,000');
                }else{
                    $('#learn-more-saving-A-comparate-car').attr("src", 'imgs/savings_volkswagen_golf.png');
                    $('#learn-more-saving-A-comparate-brand').text('2017 Volkswagen');
                    $('#learn-more-saving-A-comparate-model').text('Golf');
                    $('#learn-more-saving-A-comparate-money').text('You save $750');   
                }
                break;
            case "3":
                if (indexComparate==="1"){
                $('#learn-more-saving-A-comparate-car').attr("src", 'imgs/savings_toyota_prius.png');
                $('#learn-more-saving-A-comparate-brand').text('2017 Toyota');
                $('#learn-more-saving-A-comparate-model').text('Prius');
                $('#learn-more-saving-A-comparate-money').text('You save $3,700');
                }else{
                    $('#learn-more-saving-A-comparate-car').attr("src", 'imgs/savings_volkswagen_golf.png');
                    $('#learn-more-saving-A-comparate-brand').text('2017 Volkswagen');
                    $('#learn-more-saving-A-comparate-model').text('Golf');
                    $('#learn-more-saving-A-comparate-money').text('You save $750');  
                }
                break;
            default:
                    if (indexComparate==="1"){
                    $('#learn-more-saving-A-comparate-car').attr("src", 'imgs/car_outline-2x.png');
                    $('#learn-more-saving-A-comparate-brand').text('2017 Nissan');
                    $('#learn-more-saving-A-comparate-model').text('Leaf');
                    $('#learn-more-saving-A-comparate-money').text('You save $3,750');
                }else{
                    $('#learn-more-saving-A-comparate-car').attr("src", 'imgs/car_outline-2x.png');
                    $('#learn-more-saving-A-comparate-brand').text('2017 Volkswagen');
                    $('#learn-more-saving-A-comparate-model').text('Golf');
                    $('#learn-more-saving-A-comparate-money').text('You save $750');
                }
                break;
        }
}


function hideSelect(idSelect, arrSelect, select){
    if(idSelect!=="select-saving-A-hyundai" && idSelect!=="select-saving-A-comparation"){
        $.each( arrSelect, function( index, value ){
            if (value!==idSelect){
              $('#'+value).hide();
              $('#'+value).removeClass('active');
            }
        });
        $('#'+idSelect).show();
        $('#'+idSelect).addClass('active');
        $('#'+idSelect).css('border-bottom', '1px solid #3EC3DE');
        $('#div' + select + '1').removeClass('open')
    }
}


function showSelect(idSelectCar, arrSelect, select){
    if(idSelectCar!=="select-saving-A-hyundai" && idSelectCar!=="select-saving-A-comparation"){

        if ($('#div' + select + '1').hasClass('open')){
            hideSelect(idSelectCar, arrSelect, select);
        } else {
            $('#'+idSelectCar).css('border-bottom', '');
            $.each( arrSelect, function( index, value ){
              $('#'+value).show();
            });
            orderSelectedFirst(idSelectCar);
            $('#div' + select + '1').addClass('open')
        }
    }
}


function changeSelected(e){
    var arrSelect;
    var select="";
    var idSelectedCar;
    if (e.target){
       idSelectedCar = $('#'+e.target.id).parent()[0].id;
    } else {
        idSelectedCar = e;
    }
    if (idSelectedCar.includes("Hyundai")){
        select = "Hyundai";
        arrSelect = divSelectBlueHyundai;
        changSavingAHyundai(idSelectedCar.slice(-1) )
    } else if (idSelectedCar.includes("Comparation")) {
        select = "Comparation";
        arrSelect = divSelectBlueComparation;
        indexHyundaySelected = selectedSelectIndex(divSelectBlueHyundai)
        changSavingAComparate( indexHyundaySelected, idSelectedCar.slice(-1) );
    }
                                     
    if ($('#'+idSelectedCar).hasClass('active')){
        showSelect(idSelectedCar, arrSelect, select);
    }else{
        hideSelect(idSelectedCar, arrSelect, select);
    }
}



function selectedSelectIndex(select){
    var indexSelect="1";
        $.each( $(select), function( index, value ){
            if ($('#'+value).hasClass("active")){
              indexSelect = value.slice(-1);
            }
        });
    return indexSelect;
}


function orderSelectedFirst(idSelected){
    $('#'+idSelected).parent().prepend($( '#'+idSelected ));
    
}


	$(document).ready(function(){
        hideSelect("divHyundai1", divSelectBlueHyundai, "Hyundai");
        hideSelect("divComparation1", divSelectBlueComparation, "Comparation");
		var section;
        showTrees = $('.bluedrivetrees').children().length;
        searchParams();
        $('#divHyundai1').click(changeSelected);
        $('#divComparation1').click(changeSelected);
        $('#divComparation2').click(changeSelected);
        $('#divHyundai2').click(changeSelected);
        $('#divHyundai3').click(changeSelected);
	    $('#carousel-example-car1-prev').click(changeCarruselBlueDrivePrev);
        $('#carousel-example-car1-next').click(changeCarruselBlueDriveNext);
        changSavingAComparate("1", "1");
	  });


