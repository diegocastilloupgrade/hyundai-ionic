/**
 * Created by Clara on 17/02/2017.
 */

var g_nCars=4;


function changeMiles(nOption){
  	const oQuestion = a_oQuestions.find(question => question.number === 4)
  	if (!oQuestion)
    	return

	const oData = (oQuestion["option" + nOption].data)
	if (!oData)
		return

	let oCars = oData.find(data => data.id === "cars")
	let oCarsSurnames = oData.find(data => data.id === "carssurname")
	let oTrips = oData.find(data => data.id === "trips")
	if (!oCars || !oTrips)
  		return

	for (var i = 0; i < g_nCars; i++) {
		let elementName = $(`#car${i+1}Name`)
		elementName.text(oCars.data[i])
		if(oCarsSurnames.data[i]) {
			elementName.append($(`<no_style class="nowrap" id="car1surname"> ${oCarsSurnames.data[i]}</no_style>`))
		}
		$(`#car${i+1}NumberTrips`).text([oTrips.number[i]]);
	}
	animateNumbersAndCars(oData);
}

function animateCars(oData) {
    var oTrips = oData.find(data => data.id === "trips")
    if (oTrips) {
        var nMaxTrips = oTrips.number[0]
        var nPixels = 600;
        var oCars = document.getElementsByClassName("answercontainerright")
        if (oCars && oCars.length>=4){
           nPixels = oCars[3].getBoundingClientRect().width* 0.65;
        }
        for (var f = 1; f <= g_nCars; f++) {
            var nTrips = oTrips.number[f - 1]
            var nDist = parseInt(nPixels * nTrips / nMaxTrips)
            var nTime = 1800 - (f * 100)
            $('#car' + f + 'Name').animate({"left": "+=" + nDist + "px"}, nTime);
            $("#trip_line" + f).css( "width", (nDist-98)+"px").show(nTime+100);
            animateNumber('#car'+f+'NumberTrips',nTime);
        }
    }
}

function animateNumber(id,nTime){
    $(id).each(function () {
        var $this = $(this);
        jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
            duration: nTime,
            easing: 'swing',
            step: function () {
                $this.text(Math.ceil(this.Counter));
            }
        });
    });
}


function resetCarsPosition(){
    for (var f = 1; f <= g_nCars; f++) {
        $('#car'+f+'Name' ).css( "left", "0px");
        $("#trip_line" + f).css( "width", "0px").hide();
    }
}

function animateNumbersAndCars(oData){
    if ($('#car1Name').css('left') === 0) {
        animateCars(oData)
    } else {
        resetCarsPosition();
        animateCars(oData);
    }
}


