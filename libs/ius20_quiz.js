
const quiz = { question: 1,
  mode : "a",   //a-b
  option: 0,     //1-3
  lastQuestion: 1
};

$(function() {
    var arrowsL = document.getElementsByClassName("navigationprev");
    for (var i = 0; i < arrowsL.length; ++i) {
       arrowsL[i].onclick = function(){ quizArrow(-1); return false; };
    }
    var arrowsR = document.getElementsByClassName("navigationnext");
    for (var i = 0; i < arrowsR.length; ++i) {
       arrowsR[i].onclick = function(){ quizArrow(1); return false; };
    }

    var quizParam = window.location.href.split("?quiz=")[1] || false;
    if (quizParam>=1 && quizParam<=nQuestions){
        gotoQuizQuestion(parseInt(quizParam));
    }

});


function quizArrow(nDir, nQuestion){    //nDir:-1/+1
// hide current Q TODO: anims
    quizDisplay ("none");
    quiz.lastQuestion = quiz.question;
// set next Q
    if (nQuestion) {
        quiz.question = nQuestion;
        quiz.mode = "a";
    }
    else {
        if (quiz.mode=="a") {
            quiz.mode = "b";
            if (nDir==-1) quiz.question +=nDir
        }
        else {
            quiz.mode = "a";
            if (nDir==1) quiz.question +=nDir
        }
    }
//updateQuizMenu
    updateQuizMenu()

// funciones especiales
    if (quiz.question == 3 && quiz.mode == "b") initGoogle(geopositionUser);


// swow Q. TODO: anims
    quizDisplay ("inline")

}

/*
const  a_oQuestions = [
  { number: 1
    ,question: ''
    ,option1 : {data: [{id:10},{id:11}],
*/




function quizDisplay (sMode){
    var sQuiz = "q"+quiz.question+quiz.mode
    var oQuiz = document.getElementById(sQuiz)
    if (oQuiz) {
        oQuiz.style.display = sMode;
    }
    else {
        console.log ("quizDisplay(): unknown ["+sQuiz+"]")
    }
}


function quizOption (nOption, bSameQuiz) {
    if (!bSameQuiz) quizArrow(1)
    quiz.option = nOption;

    answerQuestion(quiz.question, nOption);

    var oQuiz = document.getElementById("q"+quiz.question+quiz.mode)
    if (oQuiz) {
        var items = oQuiz.getElementsByClassName("selectbullet");
        for (var i = 0; i < items.length; ++i) {
            items[i].classList.remove("selected")
        }
        if (nOption && items && items[nOption - 1]) {
            items[nOption - 1].classList.add("selected")
        }
    }

    switch (quiz.question){
		case 3:
			prepareQuestion3(nOption)
			break
		case 4:
			changeMiles(nOption)
			break
    }
}

function prepareQuestion3(nOption) {
	var oLocation = document.getElementById('autocomplete')
	let zipCode
	let cityName
	switch (nOption) {
		case 1:
			zipCode = 90401
			cityName = 'Santa Monica'
			break;
		case 2:
			zipCode = 93101
			cityName = 'Santa Barbara'
			break;
		case 3:
			zipCode = 94102
			cityName = 'San Francisco'
			break;
	}
	RouteToZipCodeDest(zipCode, nOption)
	if (oLocation) {
		oLocation.value = ''
		oLocation.placeholder = cityName
	}
}

function RouteToZipCodeDest(zip,nOption) {
    geopositionDest.zipCode = zip
    getGeoByPostalCode(geopositionDest, nOption)
}



function drawRanking () {
    var sRanking = "[Ranking] "
    models.forEach (model => {
      let ranking = 0;
      for (let i=0; i<nQuestions; i++){
          ranking += (model.result[i] || 0);  //avoid NaN trick
      }
      model.score = ranking;
      sRanking +=  model.code + ": " + ranking + " - "
    });
//    console.log (sRanking);

    var modelsSorted = models.sort(function(a, b){
        return b.score - a.score;
    });
    user.model = modelsSorted[0].code;
    var nPos=1;
    var sNoActive =  "";
    modelsSorted.forEach (model => {
        var oIcon = document.getElementById("ranking"+nPos++)
        oIcon.getElementsByTagName("img")[0].src="imgs/icon_"+model.model.toLowerCase()+ sNoActive +".png"
        oIcon.getElementsByTagName("h4")[0].innerHTML= model.model.toUpperCase();
        sNoActive =  "_noactive";
    });

    var oCar = document.getElementById("ranking_car")
    if (oCar){
        if (user.model=="EV") sModel="imgs/car2_ev.png";
        else sModel = "imgs/car2.png"
		oCar.src = sModel;
    }

//    sessionStorage.setItem('models', JSON.stringify(models));
    localStorageSet('models', JSON.stringify(models));
}


function resetQuestion (nQuestion) {
    user.answered = 0;
    models.forEach (model => {
          model.result[nQuestion - 1] = 0;
        }
    );
  drawRanking ();
}



function answerQuestion (nQuestion, nOption) {
    const oQuestion = a_oQuestions.find(question => question.number === nQuestion);

    var sLog = "answerQuestion(): [Q:" + nQuestion + " - O:" + nOption + "] ";
    const oOption = oQuestion["option" + nOption];

//    if (!models[0].result[nQuestion - 1]) {
    if (!user.options[nQuestion - 1]) {
        user.answered++;
        updateProgressBar()
    }
    user.options[nQuestion - 1] = nOption;

    drawQuestion(nQuestion, nOption);

    updateQuizMenuQuestion(nQuestion);

    // console.log("answerQuestion(): user.answered=["+user.answered+"]")
    if (oOption) {
        user.models[nQuestion - 1] = oOption.model;
        models.forEach(model => {
			let sCode = model.code;
			let nRanking = oOption[sCode];
			model.result[nQuestion - 1] = nRanking;
			sLog += "[" + sCode + ": " + nRanking + "]";
		});
//        console.log(sLog);
    }
    drawRanking ();
    if (user!=null) {
//    	sessionStorage.setItem('user', JSON.stringify(user));
    	localStorageSet('user', JSON.stringify(user));
	}

}


function showStationsByRouteSteps(map, routeSteps) {
    var nDistance = 2;
    var sRoute = "LINESTRING(";
    for (var f=0;f<routeSteps.length;f++) {
        oStartLocation = routeSteps[f].start_location;
        sRoute += oStartLocation.lng() +"+"+oStartLocation.lat()+",";
    }
    sRoute = sRoute.slice(0, -1)+")";
    var sUrl = "https://developer.nrel.gov/api/alt-fuel-stations/v1/nearby-route.json?api_key=EGT7EDl6FE4ZhLrxON8FnWJMvt2mSfxFWIDPpM25&distance="+nDistance+"&route="+sRoute;
    //let sUrl = `/station/routesteps?distance=${nDistance}&route=${sRoute}`;
    $.getJSON(sUrl, function (jsonStations) {
//        geopos.city = getAddressDataByType(jsonAddress, "locality", "long_name")
//        setMarkers(map, myMarkers);
//        const oStations = jsonStations.results.find(result => result == "fuel_stations");
        const oStations = jsonStations.fuel_stations;

        var oNStations = document.getElementById ('q'+quiz.question+'_s'+quiz.option);
        if (oNStations) {
            oNStations.innerHTML = oStations.length;
        }
        setMarkersByJson (map, oStations);
    });

}


function showStationsByGeo(map, geopos) {
    var radius = 10;
    if (geopos.radius) radius = geopos.radius;
    var sUrl = "https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?limit=50&access=public&status=E&radius=" + radius + "&latitude=" + geopos.latitude + "&longitude=" + geopos.longitude + "&api_key=EGT7EDl6FE4ZhLrxON8FnWJMvt2mSfxFWIDPpM25";
    //let sUrl = `/station/geoposition?radius=${radius}&latitude=${geopos.latitude}&longitude=${geopos.longitude}`;
    $.getJSON(sUrl, function (jsonStations) {
//        geopos.city = getAddressDataByType(jsonAddress, "locality", "long_name")
//        setMarkers(map, myMarkers);

//            const oStations = jsonStations.results.find(result => result == "fuel_stations");
        const oStations = jsonStations.fuel_stations;
//console.log (oStations)
        setMarkersByJson(map, oStations)
    });
}


function drawQuestion(nQuestion , nOption) {
    const oQuestion = a_oQuestions.find(question => question.number === nQuestion)
    const oOption = oQuestion["option" + nOption];
    if (!oOption || !oOption.data)
        return;

    for (var f=0;f<oOption.data.length;f++) {
        oData = oOption.data[f]
        var oQuiz = document.getElementById(oData.id)
        if (!oQuiz)
            continue;
        switch (oData.type) {
        case "html":
            oQuiz.innerHTML = oData.val;
            break;
        case "img":
            oQuiz.style.backgroundImage=`url(${oData.val})`;
            break;
        case "class":
            oQuiz.className = oData.val;
            break;
        default:
            oQuiz.setAttribute(oData.type, oData.val);
            break;
        }
    }
}


function updateQuizMenu() {
    if (quiz.lastQuestion!=quiz.question) {
        var lastQuestion = document.getElementsByClassName("otherquestion" + quiz.lastQuestion);
        if (lastQuestion.length) lastQuestion[0].classList.remove("current")

        var question = document.getElementsByClassName("otherquestion" + quiz.question);
        if (question.length) question[0].classList.add("current");
    }
}

function updateQuizMenuQuestion (nQuestion) {
//console.log("updateQuizMenuQuestion: "+nQuestion)
    var sId = "menu_q" + nQuestion;
    document.getElementById(sId).style.display = "none";
    document.getElementById(sId + "a").style.display = "block";

    var question = document.getElementsByClassName("otherquestion" + nQuestion);
    question[0].classList.add("completed");
}


function gotoQuizQuestion (nQuestion) {
  window.scroll(0,0);
  quizArrow(0, nQuestion)
};
