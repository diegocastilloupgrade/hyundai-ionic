const topModels = [
    { model:'Electric',
      code: 'EV',
      title: "There’s one car that best<BR />fits your lifestyle",
      subtitle: "There is a perfect choice to get you where you need to go.",
      text: "The next generation of electric zero-emissions driving."
  },
  { model:'Hybrid',
      code: 'HEV',
      title: "There’s one car that best<BR />fits your lifestyle",
      subtitle: "There is one car that can get you there.",
      text: "Electric power helps you go farther on a gallon."
  },
  { model:'Plug-in',
      code: 'PHEV',
      title: "There’s one car that best<BR />fits your lifestyle",
      subtitle: "There is one car that is the best of both worlds.",
      text: "Electric when you want it. Gas when you need it."
  }
];



$(function() {
    if (user.model=="") {
        user.model="EV";
        user.options[5]=1;
    }
    if (user.answered != nQuestions) {
        $("#modalcompletequiz").modal("show");
    } else {
        goToLogin();
    }
    printResults()
});

function goToLogin() {
    if (!user.name) {
      $("#modalyourioniq").modal("show");
      var oInput = document.getElementById("userName");
      if (oInput) oInput.focus();
    } else {
        initReport();
    }
}

function getUserName (bEnd) {
    var oInput = document.getElementById("userName");
    if (oInput) {
		if (oInput.value) {
			user.name = oInput.value;
			localStorageSet('user', JSON.stringify(user));
			bEnd = 1;
		}
		else {
			oInput.focus();
		}
	}
    if (bEnd) {
       initReport();
       $("#modalyourioniq").modal("hide");
    }
}

function initReport(){
    printTopModel()
}

function printTopModel(){
    let titleName = ".";
    if (user.name) {
        titleName = ", "+user.name+".";
        let userNames = document.getElementsByClassName("userName");
        for (let f = 0; f < userNames.length; f++) {
            userNames[f].innerHTML = user.name;
        }
    }
     const  topModel = topModels.find(model => model.code == user.model);
	document.getElementById("m_title").innerHTML =  topModel.title + titleName;
//    document.getElementById("m_subtitle").innerHTML =  topModel.subtitle;
    document.getElementById("m_image").src =  "imgs/summary-"+topModel.model.toLowerCase() +".png";
    document.getElementById("m_image").hidden = false;
    document.getElementById("m_model_1").innerHTML =  topModel.model;
    document.getElementById("m_model_2").innerHTML =  topModel.model;
    document.getElementById("m_text").innerHTML =  topModel.text;

}


var nStoriesWhy = 0;   //'summarycarstoryX' class of first story
var nStoriesOther = 0;   //'summarycarstoryX' class of first story

function printResults() {
    var sHtml, storyType;
    var sWhy = "";
    var sOther = "";
    for (var f = 0; f < nQuestions; f++) {
        var nOption = user.options[f];
        if (nOption) {
            storyType = "other";
            a_sModels = user.models[f];
            if (a_sModels) {
                if (typeof(a_sModels) == "string") a_sModels = [a_sModels];
                if (a_sModels.indexOf(user.model) != -1) {
                    storyType = "why";
                }
            }
            if (storyType == "why") {
                sWhy += drawAnswer(f + 1, nOption, nStoriesWhy++);
            }
            else {
                sOther += drawAnswer(f + 1, nOption, nStoriesOther++);
            }
        }
    }

    if ((user.model=="EV" && user.mildClimate==0) || (user.model=="HEV" && user.mildClimate==1) ) {  //Weather
        sOther += drawAnswer(6, user.mildClimate + 1, nStoriesOther++);
    }
    else{
        sWhy += drawAnswer(6, user.mildClimate + 1, nStoriesWhy++);
    }

    sHtml = drawAnswer(7, 1,nStoriesWhy++); //Savings
    sWhy += sHtml;

    document.getElementById("storyWhy").innerHTML = sWhy;
    document.getElementById("storyOther").innerHTML = sOther;

    if (!nStoriesOther) document.getElementById("storyOtherHead").style.display = "none";
}



function drawAnswer(nQuestion, nOption, nStory) {
    var sText1 = "";
    var sText2 = "";
    var sImg = "";

    if (nQuestion<=a_oQuestions.length) {
        const oQuestion = a_oQuestions.find(question => question.number === nQuestion);
        const oOption = oQuestion["option" + nOption];
        const oText1 = oOption.data.find(data => data.id === "q" + nQuestion + "_d4");
        sText1 = MultiModel(oText1.val,nQuestion, nOption);
        const oText2 = oOption.data.find(data => data.id === "q" + nQuestion + "_d5");
        sText2 = MultiModel(oText2.val,nQuestion, nOption);
        sImg = oOption.data.find(data => data.id === "q" + nQuestion + "_d6").val;
    }

    var sHtml = "<div class='summarystory summarycarstory"+(nStory&1)+"'>"
        + "<div>"
        + "<h3>"+sText1+"</h3>"
        + "<br/><p>"+sText2+"</p>"
        + "</div>"
        + "<div style='background-image:url("+sImg+")'></div>"
        + "</div>";

    return sHtml;
}

function MultiModel(sText,nQuestion, nOption){
    if (user.model=="EV" && (nQuestion==4 && nOption==2) || (nQuestion==5 && (nOption==1 || nOption==2)) ){
        sText = sText.replace("Plug-in", "EV");
    }
    else if (nQuestion==6 ) {
        if (nOption==1 && user.model=="PHEV") sText = sText.replace("Hybrid","Plug-in");
        if (nOption==2 && user.model=="PHEV") sText = sText.replace("Electric","Plug-in");
    }
    return sText;
}


function resetQuiz () {
    user.model = "";
    user.answered = 0;
    user.options = new Array(nQuestions);
    user.models = new Array(nQuestions);
	localStorageSet('user', JSON.stringify(user));
}
