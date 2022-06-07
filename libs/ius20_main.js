/*
TODO: progress bar could be animated on answer
TODO: question change could ne animated

emulate sessionStorage: gist.github.com/engelfrost/fd707819658f72b42f55
 */

const nQuestions = 5;

const g_nUserVersion = 1;
var user = {
    name: "",
    zipCode: 0,
    state : "",
    model: "",
    answered: 0,
    options: new Array(nQuestions),
    models: new Array(nQuestions),
    zevState : 0,    //Zero Emission Vehicle
    mildClimate: 0,
    version: 1
};

var geopositionUser = {
      city: ''
    , zipCode: ''
    , state: ''
    , country: ''
    , latitude: ''
    , longitude: ''
    , radius: 10    //miles
};

var geopositionDest = {
      city: ''
    , zipCode: ''
    , state: ''
    , latitude: ''
    , longitude: ''
    , radius: 10
};

let models = [
    { model:'Electric',
      code: 'EV',
      result: new Array(nQuestions),
      score: 0
  },
  { model:'Hybrid',
      code: 'HEV',
      result: new Array(nQuestions),
      score: 0
  },
  { model:'Plug-in',
      code: 'PHEV',
      result: new Array(nQuestions),
      score: 0
  }
];

const svg_moon = 'M95.04,65.76 C95.04,65.28 94.92,64.8 94.68,64.44 C94.2,63.84 93.36,63.6 92.64,63.72 C91.8,63.84 90.96,64.2 90.12,64.56 C89.52,64.8 88.92,65.04 88.2,65.28 C86.88,65.76 85.44,66.24 84.12,66.6 C82.68,66.96 81.36,67.32 79.92,67.56 C78.48,67.8 77.04,67.92 75.6,68.04 C74.64,68.16 73.56,68.16 72.6,68.16 C48,68.16 28.08,48.12 28.08,23.52 C28.08,20.64 28.32,17.64 28.92,14.76 C29.52,11.88 30.36,9.12 31.44,6.36 C31.8,5.52 32.28,4.68 32.4,3.72 C32.52,3.12 32.52,2.4 32.16,1.8 C31.56,0.84 30,0.84 29.04,1.2 C28.2,1.44 27.36,1.92 26.64,2.4 C25.8,2.88 24.96,3.24 24.24,3.84 C22.44,4.92 20.64,6.24 18.96,7.56 C17.28,8.88 15.72,10.32 14.28,11.88 C12.84,13.44 11.52,15 10.32,16.68 C9.12,18.36 8.04,20.04 6.96,21.96 C6,23.76 5.04,25.68 4.32,27.6 C3.6,29.52 2.88,31.44 2.4,33.48 C1.92,35.52 1.44,37.56 1.2,39.6 C0.96,41.64 0.84,43.68 0.72,45.84 C0.72,47.88 0.84,50.04 1.08,52.08 C1.32,54.24 1.68,56.28 2.28,58.32 C2.88,60.36 3.48,62.52 4.32,64.44 C4.68,65.28 5.04,66.12 5.4,66.96 C17.04,91.68 46.44,102.24 71.04,90.6 C72.12,90.12 73.2,89.52 74.28,88.92 C75.36,88.32 76.44,87.72 77.4,87 C78.48,86.28 79.44,85.56 80.4,84.84 C81.36,84.12 82.32,83.28 83.16,82.44 C86.04,79.92 88.56,77.04 90.72,73.92 C92.04,71.88 93.36,69.84 94.44,67.68 C94.8,67.08 95.04,66.48 95.04,65.76 Z M50.28,90.24 C25.68,90.24 5.76,70.44 5.64,45.84 C5.64,30.96 13.08,16.92 25.44,8.64 C17.28,34.68 31.8,62.4 57.72,70.56 C67.32,73.56 77.64,73.56 87.24,70.56 C78.96,82.92 65.04,90.24 50.28,90.24 Z M51.12,21.6 C51.12,20.28 52.2,19.2 53.52,19.2 L69.72,19.2 C71.04,19.2 72.12,20.28 72.12,21.6 C72.12,22.08 72,22.56 71.64,23.04 L60.24,38.76 L69.6,38.76 C70.92,38.76 72,39.84 72,41.16 C72,42.48 70.92,43.56 69.6,43.56 L55.56,43.56 C54.24,43.56 53.16,42.48 53.16,41.16 C53.16,40.68 53.28,40.2 53.64,39.72 L65.04,24 L53.52,24 C52.2,24.12 51.12,23.04 51.12,21.6 L51.12,21.6 Z M76.32,10.92 C76.32,9.6 77.4,8.52 78.72,8.52 L90.24,8.52 C91.56,8.52 92.64,9.6 92.64,10.92 C92.64,11.4 92.52,11.88 92.16,12.36 L84.84,22.44 L90.24,22.44 C91.56,22.44 92.64,23.52 92.64,24.84 C92.64,26.16 91.56,27.24 90.24,27.24 L80.16,27.24 C78.84,27.24 77.76,26.16 77.76,24.84 C77.76,24.36 77.88,23.88 78.24,23.4 L85.56,13.32 L78.72,13.32 C77.4,13.32 76.32,12.24 76.32,10.92 L76.32,10.92 Z';

const svg_electric = 'M4.12923871,40.536671 C4.14575484,51.264929 12.8384,59.9565419 23.5666581,59.9740903 L26.4879484,59.9740903 C37.218271,59.9627355 45.9140129,51.2669935 45.9253677,40.536671 L45.9253677,22.2140903 L4.12923871,22.2140903 L4.12923871,40.536671 Z M0.000206451612,40.536671 L0.000206451612,20.1495742 C0.000206451612,19.0099613 0.924077419,18.0850581 2.06472258,18.0850581 L11.3550452,18.0850581 L11.3550452,2.0644129 C11.3550452,0.923767742 12.2789161,-0.000103225806 13.4195613,-0.000103225806 C14.5591742,-0.000103225806 15.4840774,0.923767742 15.4840774,2.0644129 L15.4840774,18.0850581 L34.5395613,18.0850581 L34.5395613,2.0644129 C34.5395613,0.923767742 35.4634323,-0.000103225806 36.6040774,-0.000103225806 C37.7436903,-0.000103225806 38.6685935,0.923767742 38.6685935,2.0644129 L38.6685935,18.0850581 L47.9578839,18.0850581 C49.098529,18.0850581 50.0224,19.0099613 50.0224,20.1495742 L50.0224,40.536671 C50.0069161,53.1756387 40.034271,63.5570581 27.4066581,64.0824774 C27.4200774,64.2197677 27.4200774,64.3580903 27.4066581,64.4953806 C27.4066581,65.0424774 27.3137548,67.8295742 27.4066581,79.9792516 C27.5986581,86.4411871 32.9922065,91.5240258 39.4551742,91.3320258 C45.6466581,91.1482839 50.6242065,86.1707355 50.8079484,79.9792516 L50.8079484,78.4928 C50.8131097,69.7784774 57.8551742,62.7033806 66.570529,62.6579613 L83.2414968,62.6579613 C84.3821419,62.6579613 85.3060129,63.5828645 85.3060129,64.7224774 C85.3060129,65.8631226 84.3821419,66.7869935 83.2414968,66.7869935 L66.570529,66.7869935 C60.1075613,66.7931871 54.8709161,72.0298323 54.8647226,78.4928 L54.8647226,79.8657032 C54.6593032,88.608929 47.4045935,95.5302194 38.6624,95.3248 C30.2319484,95.1255742 23.4365935,88.3570581 23.2053677,79.9276387 C23.2053677,68.2631226 23.2053677,65.1044129 23.2776258,64.0628645 C10.3981419,63.8873806 0.0384,53.4171871 0.000206451612,40.536671 L0.000206451612,40.536671 Z M63.298271,32.3818323 C62.8781419,31.8357677 62.7573677,31.1152516 62.978271,30.4618323 L69.3163355,11.8811871 C69.6838194,10.8004129 70.8574968,10.2233806 71.938271,10.5908645 C73.0190452,10.9583484 73.5960774,12.1320258 73.2285935,13.2128 L67.9434323,28.8205419 L78.4414968,28.1082839 C79.5800774,28.0473806 80.5524645,28.9217032 80.6123355,30.0602839 C80.6267871,30.3224774 80.5906581,30.584671 80.5060129,30.8334452 L74.1679484,49.4140903 C73.8004645,50.4938323 72.6257548,51.072929 71.5460129,50.7044129 C70.4652387,50.336929 69.8882065,49.1622194 70.2556903,48.0824774 L75.5924645,32.4540903 L65.0944,33.1663484 C64.4017548,33.2241548 63.7266581,32.928929 63.298271,32.3818323 L63.298271,32.3818323 Z';

const svg_gas = 'M97.4,92.7h-9.3v-7.2c0-2.6-2-2.1-2-2.1h-7.2l0-30.7c3,1.3,3.1,4.4,3.1,4.4l0,12.7c0.7,6,6.2,5.9,6.2,5.9 c6.1-0.5,6.2-5.9,6.2-5.9l0-26.5h1.6c1.6-0.4,1.5-1.5,1.5-1.5V26.3c0-1.5-1.5-1.5-1.5-1.5h-1.6l0-10.5c0-1-0.4-1.4-0.4-1.4l-7.7-7.7 c-1.1-1.1-2.2,0-2.2,0c-1.1,0.9,0,2.2,0,2.2l7.3,7.3v10.2h-1.3c-1.8-0.2-1.8,1.5-1.8,1.5v15.5c0,1.4,1.5,1.5,1.5,1.5h1.6v26.3 c-0.3,3.2-3.1,3.1-3.1,3.1c-2.8,0-3.1-3.1-3.1-3.1L85,58c0-7.4-6.2-8.3-6.2-8.3V1.8c0-1.3-1.1-1.8-1.1-1.8L21.6,0 c-1.5,0-1.5,1.8-1.5,1.8l0,81.7l-7.5-0.1c-2.1,0.4-1.7,1.9-1.7,1.9l0,7.4l-9-0.1C0.3,92.5,0,94.3,0,94.3c0.1,1.3,1.5,1.5,1.5,1.5 h95.8c1.3,0,1.5-1.5,1.5-1.5C98.8,92.9,97.4,92.7,97.4,92.7z M91.2,27.8h3.1v12.4h-3.1V27.8z M23.2,3.1h52.6v80.4H23.2V3.1z M85,92.7H13.9v-6.2H85V92.7z M38.6,37.1h-9.3c-1.7,0-1.5,2-1.5,2v21.1c0,1.3,1.5,1.5,1.5,1.5h9.3c1.4-0.3,1.5-1.5,1.5-1.5l0-21.1 C40.2,37.1,38.6,37.1,38.6,37.1z M37.1,58.7h-6.2V40.2h6.2V58.7z M71.1,9.6c0-1.8-1.5-1.8-1.5-1.8H29.4c-1.6,0-1.5,1.5-1.5,1.5v18.6 c0,1.4,1.5,1.5,1.5,1.5h40.2c1.8-0.4,1.5-1.9,1.5-1.9V9.6z M68,26.3H30.9V10.8H68V26.3z';

const  a_oQuestions = [
  { number: 1
    ,question: ''
    ,option1 : {data: [
             {id:"q1_d1", type:"html", val:"You know where you are headed and how long it takes to get there."}
            ,{id:"q1_d2", type:"html", val:"The IONIQ EV is a perfect fit."}
            ,{id:"q1_d3", type:"class", val:"answercontainerright"}

            ,{id:"q1_d4", type:"html", val:"You're a planner."}
            ,{id:"q1_d5", type:"html", val:"With IONIQ EV you know exactly how far a charge will take you."}
            ,{id:"q1_d6", type:"img", val:"./imgs/img_summary_q1-a.jpg"}
        ]
        ,model: 'EV'
        ,EV:5, HEV:1, PHEV:3}
    ,option2 : {data: [
             {id:"q1_d1", type:"html", val:"You're flexible and you don't like to be tied down."}
            ,{id:"q1_d2", type:"html", val:"The IONIQ Plug-in is the best of both worlds"}
            ,{id:"q1_d3", type:"class", val:"answercontainerright half"}
            ,{id:"q1_d4", type:"html", val:"Sometimes you plan, sometimes you don't."}
            ,{id:"q1_d5", type:"html", val:"With IONIQ Plug-in you can gas up or charge up, whichever you choose."}
            ,{id:"q1_d6", type:"img", val:"./imgs/img_summary_q1-b.jpg"}
        ]
        ,model: 'PHEV'
        ,EV:3, HEV:1, PHEV:5}
    ,option3 : {data: [
             {id:"q1_d1", type:"html", val:"You never know where life is going to take you next."}
            ,{id:"q1_d2", type:"html", val:"IONIQ Hybrid will save you money and reduce CO2 emissions."}
            ,{id:"q1_d3", type:"class", val:"answercontainerright spontaneous"}
            ,{id:"q1_d4", type:"html", val:"You're spontaneous."}
            ,{id:"q1_d5", type:"html", val:"With IONIQ Hybrid you can drop everything and go, while still being energy-efficient."}
            ,{id:"q1_d6", type:"img", val:"./imgs/img_summary_q1-c.jpg"}
        ]
        ,model: 'HEV'
        ,EV:1, HEV:5, PHEV:3}
  }
  ,{ number: 2
    ,question: ''
    ,option1 : {data: [
             {id:"q2_d1", type:"html", val:"Plug in your IONIQ EV the same way you plug in your phone, and then get your beauty sleep."}
            ,{id:"q2_d2", type:"html", val:"."}
            ,{id:"q2_d3a", type:"class", val:"answercontainerleft"}
            ,{id:"q2_d3b", type:"class", val:"answercontainerright"}
            ,{id:"q2_svg_center", type:"d", val: svg_moon}
            ,{id:"q2_svg_left", type:"d", val: ''}
            ,{id:"q2_svg_right", type:"d", val: ''}
            ,{id:"q2_d4", type:"html", val:"You plug in your phone at night."}
            ,{id:"q2_d5", type:"html", val:"IONIQ EV charges while you sleep."}
            ,{id:"q2_d6", type:"img", val:"./imgs/img_summary_q2-a.jpg"}
        ]
        ,model: 'EV'
        ,EV:5, HEV:1, PHEV:3}
    ,option2 : {data: [
             {id:"q2_d1", type:"html", val:"Never worry about charging with IONIQ Plug-in.<BR/>Fill up the tank or fast charge in a snap."}
            ,{id:"q2_d2", type:"html", val:"."}
            ,{id:"q2_d3a", type:"class", val:"answercontainerleft day"}
            ,{id:"q2_d3b", type:"class", val:"answercontainerright day"}
            ,{id:"q2_svg_center", type:"d", val: ''}
            ,{id:"q2_svg_left", type:"d", val: svg_gas}
            ,{id:"q2_svg_right", type:"d", val: svg_electric}
            ,{id:"q2_d4", type:"html", val:"You depend on your charger."}
            ,{id:"q2_d5", type:"html", val:"IONIQ Plug-in lets you fill up or charge up."}
            ,{id:"q2_d6", type:"img", val:"./imgs/img_summary_q2-b.jpg"}
        ]
        ,model: 'PHEV'
        ,EV:3, HEV:1, PHEV:5}
    ,option3 : {data: [
             {id:"q2_d1", type:"html", val:"Never worry about your battery, but still feel good<BR/>about reducing CO2 emissions with IONIQ Hybrid."}
            ,{id:"q2_d2", type:"html", val:"."}
            ,{id:"q2_d3a", type:"class", val:"answercontainerleft differs"}
            ,{id:"q2_d3b", type:"class", val:"answercontainerright differs"}
            ,{id:"q2_svg_center", type:"d", val: svg_gas}
            ,{id:"q2_svg_left", type:"d", val: ''}
            ,{id:"q2_svg_right", type:"d", val: ''}
            ,{id:"q2_d4", type:"html", val:"Your phone battery runs on fumes."}
            ,{id:"q2_d5", type:"html", val:"IONIQ Hybrid reduces CO2 emissions with no battery worries."}
            ,{id:"q2_d6", type:"img", val:"./imgs/img_summary_q2-c.jpg"}
        ]
        ,model: 'HEV'
        ,EV:1, HEV:5, PHEV:3}
  }
  ,{ number: 3
    ,question: ''
    ,option1 : {data: [
             {id:"q3_d1", type:"html", val:"You have <span id='q3_s1'>&nbsp;&nbsp;&nbsp;</span> charging stations around your zip code."}
            ,{id:"q3_d2", type:"html", val:"You'll never need to worry about getting where you need to go near your home with IONIQ EV."}
            ,{id:"q3_d3", type:"img", val:""}
            ,{id:"q3_d4", type:"html", val:"You like to keep it local."}
            ,{id:"q3_d5", type:"html", val:"IONIQ EV has charging stations around the city."}
            ,{id:"q3_d6", type:"img", val:"./imgs/img_summary_q3-a.jpg"}
        ]
        ,model: 'EV'
        ,EV:5, PHEV:3, HEV:1}
    ,option2 : {data: [
             {id:"q3_d1", type:"html", val:"There are <span id='q3_s2'>&nbsp;&nbsp;&nbsp;</span> charging stations on your route."}
            ,{id:"q3_d2", type:"html", val:"You can charge up on the way or gas up and go with IONIQ Plug-in."}
            ,{id:"q3_d3", type:"img", val:""}
            ,{id:"q3_d4", type:"html", val:"You like a good weekend trip."}
            ,{id:"q3_d5", type:"html", val:"IONIQ Plug-in gets you there by fill up or charge."}
            ,{id:"q3_d6", type:"img", val:"./imgs/img_summary_q3-b.jpg"}

        ]
        ,model: 'PHEV'
        ,EV:3, PHEV:5, HEV:1}
    ,option3 : {data: [
             {id:"q3_d1", type:"html", val:"You like to go the distance, and while there are <span id='q3_s3'>&nbsp;&nbsp;&nbsp;</span> stations on your way."}
            ,{id:"q3_d2", type:"html", val:"You can still save money and the planet with IONIQ Hybrid."}
            ,{id:"q3_d3", type:"img", val:""}
            ,{id:"q3_d4", type:"html", val:"You're a road warrior."}
            ,{id:"q3_d5", type:"html", val:"IONIQ Hybrid reduces your carbon footprint, no charging necessary."}
            ,{id:"q3_d6", type:"img", val:"./imgs/img_summary_q3-c.jpg"}
        ]
        ,model: 'HEV'
        ,EV:1, PHEV:3, HEV:5}
  }
  ,{ number: 4
    ,question: ''
    ,option1 : {data: [
             {id:"summer", type:"html", val:[]}
            ,{id:"winter", type:"html", val:"."}
            ,{id:"q4_d1", type:"html", val:"Max. number of trips per charge"}
			,{id:"cars", type:"", data:['IONIQ Electric','BMW i3','Nissan Leaf','Ford Focus']}
			,{id:"carssurname", type:"", data:['','','','']}
            ,{id:"trips", type:"", number:[13,12,11,10]}
            ,{id:"q4_c1", type:"class", val:"carcomparison car_ioniqElectric"}
            ,{id:"q4_c2", type:"class", val:"carcomparison car_BMWi3"}
            ,{id:"q4_c3", type:"class", val:"carcomparison car_nissanLeaf"}
            ,{id:"q4_c4", type:"class", val:"carcomparison car_fordFocus"}
            ,{id:"q4_d4", type:"html", val:"You don't drive much daily."}
            ,{id:"q4_d5", type:"html", val:"IONIQ EV will get you there with a single charge."}
            ,{id:"q4_d6", type:"img", val:"./imgs/img_summary_q4-a.jpg"}
        ]
        ,model: 'EV'
        ,EV:5, HEV:1, PHEV:3}
    ,option2 : {data: [
             {id:"summer", type:"html", val:[]}
            ,{id:"winter", type:"html", val:"."}
            ,{id:"q4_d1", type:"html", val:"Max. number of trips per charge"}
            ,{id:"cars", type:"", data:['IONIQ','Ford Fusion','Toyota Prius','Chevy Volt']}
			,{id:"carssurname", type:"", data:['Plug-In','','','']}
            ,{id:"trips", type:"", number:[22,20,19,14]}
            ,{id:"q4_c1", type:"class", val:"carcomparison car_ioniqPlugIn"}
            ,{id:"q4_c2", type:"class", val:"carcomparison car_fordFusion"}
            ,{id:"q4_c3", type:"class", val:"carcomparison car_toyotaPrius"}
            ,{id:"q4_c4", type:"class", val:"carcomparison car_chevyVolt"}
            ,{id:"q4_d4", type:"html", val:"You drive an average number of miles daily."}
            ,{id:"q4_d5", type:"html", val:"With IONIQ Plug-in you can use battery os gas power."}
            ,{id:"q4_d6", type:"img", val:"./imgs/img_summary_q4-b.jpg"}
        ]
        ,model: ['PHEV','EV']
        ,EV:4, HEV:1, PHEV:4}
    ,option3 : {data: [
             {id:"summer", type:"html", val:[]}
            ,{id:"winter", type:"html", val:"."}
            ,{id:"q4_d1", type:"html", val:"Number of trips per full tank"}
            ,{id:"cars", type:"", data:['IONIQ Hybrid','Toyota Prius','Ford C-MAX','Chevy Volt']}
			,{id:"carssurname", type:"", data:['','','','']}
            ,{id:"trips", type:"", number:[7,6,5,4]}
            ,{id:"q4_c1", type:"class", val:"carcomparison car_ioniqHybrid"}
            ,{id:"q4_c2", type:"class", val:"carcomparison car_toyotaPrius"}
            ,{id:"q4_c3", type:"class", val:"carcomparison car_fordCMAX"}
            ,{id:"q4_c4", type:"class", val:"carcomparison car_chevyVolt"}
            ,{id:"q4_d4", type:"html", val:"You have a long commute."}
            ,{id:"q4_d5", type:"html", val:"IONIQ Hybrid lets you drive further per fill-up while still reducing CO2 emissions."}
            ,{id:"q4_d6", type:"img", val:"./imgs/img_summary_q4-c.jpg"}
        ]
        ,model: 'HEV'
        ,EV:1, HEV:5, PHEV:3}
  }
  ,{ number: 5
    ,question: ''
    ,option1 : {data: [
             {id:"q5_d1", type:"html", val:"Easy peasy."}
            ,{id:"q5_d2", type:"html", val:"IONIQ EV has two available charger options so you will always be ready to get things done around town."}
            ,{id:"q5_d3", type:"class", val:"answercontainerright garageanswer"}
            ,{id:"q5_d4", type:"html", val:"You park in a garage."}
            ,{id:"q5_d5", type:"html", val:"With IONIQ Plug-in you can charge-at-home or fill up and go."}
            ,{id:"q5_d6", type:"img", val:"./imgs/img_summary_q5-a.jpg"}
        ]
        ,model: ['PHEV','EV']
        ,EV:4, PHEV:4, HEV:1}
    ,option2 : {data: [
             {id:"q5_d1", type:"html", val:"No charger where you park?<BR/>No problem."}
            ,{id:"q5_d2", type:"html", val:"IONIQ Plug-in uses gas or charge. Plus, you can use one of 26 charging stations in your zip code."}
            ,{id:"q5_d3", type:"class", val:"answercontainerright apartmentanswer"}
            ,{id:"q5_d4", type:"html", val:"You rent a space or garage."}
            ,{id:"q5_d5", type:"html", val:"IONIQ Plug-in lets you fill up or charge up, depending on where you're headed."}
            ,{id:"q5_d6", type:"img", val:"./imgs/img_summary_q5-b.jpg"}
        ]
        ,model: ['PHEV','EV']
        ,EV:4, PHEV:4, HEV:1}
    ,option3 : {data: [
             {id:"q5_d1", type:"html", val:"No place to plug in at home?"}
            ,{id:"q5_d2", type:"html", val:"With IONIQ Hybrid, you can feel good about going further on a gallon of gas and reducing CO2 emissions at the same time."}
            ,{id:"q5_d3", type:"class", val:"answercontainerright streetanswer"}
            ,{id:"q5_d4", type:"html", val:"You park on the street."}
            ,{id:"q5_d5", type:"html", val:"IONIQ Hybrid reduces CO2 emissions with no worries about charging on-the-go."}
            ,{id:"q5_d6", type:"img", val:"./imgs/img_summary_q5-c.jpg"}
        ]
        ,model: 'HEV'
        ,EV:1, PHEV:3, HEV:5}
  }
  ,{ number: 6  //weather
    ,question: ''
    ,option1 : {data: [
             {id:"q6_d4", type:"html", val:"The IONIQ Hybrid is a great fit for the unpredictable weather where you live."}
            ,{id:"q6_d5", type:"html", val:""}
            ,{id:"q6_d6", type:"img", val:"./imgs/img_weather_climate-2.jpg"}
        ]
        ,model: ['HEV','PHEV']
        ,EV:1, PHEV:4, HEV:4}
    ,option2 : {data: [
             {id:"q6_d4", type:"html", val:"The IONIQ Electric is a great fit for the mild weather where you live."}
            ,{id:"q6_d5", type:"html", val:""}
            ,{id:"q6_d6", type:"img", val:"./imgs/img_weather_climate-3.jpg"}
        ]
        ,model: ['EV','PHEV']
        ,EV:4, PHEV:4, HEV:1}
  }
  ,{ number: 7  //savings
    ,question: ''
    ,option1 : {data: [
             {id:"q7_d4", type:"html", val:"IONIQ saves you money."}
            ,{id:"q7_d5", type:"html", val:"Decrease your costs, and reduce CO2 emissions, all while gettingwhere you need to go in style.<BR /><BR /><A href='learn-more.html?section=saving-A'>View Savings</A> "}
            ,{id:"q7_d6", type:"img", val:"./imgs/img_summary_savings-hybrid.jpg"}
        ]
        ,model: ['HEV','PHEV']
        ,EV:1, PHEV:4, HEV:4}
  }
 ];




$(function() {
//    if (sessionStorage.getItem("user") !== null) {
    if (localStorageGet("user") != null) {
//        var userTemp = JSON.parse(sessionStorage.user);
        var userTemp = JSON.parse(localStorageGet("user"));
//        if (typeof(userTemp.version)=="undefined" || userTemp.version!=g_nUserVersion) sessionStorage.removeItem('user');
        if (typeof(userTemp.version)=="undefined" || userTemp.version!=g_nUserVersion) localStorageRemove ('user');
    }
//    if (sessionStorage.getItem("user") !== null) {

    if (localStorageGet("user") != null) {
//        user = JSON.parse(sessionStorage.user);
        user = JSON.parse(localStorageGet("user"));
        console.log("[user]:" + JSON.stringify(user, null, 4));
    }

    if (user!=null) {
		if (user.zipCode) {
			document.getElementById("zipcode").value = user.zipCode;
			UpdateZipCode(user.zipCode, 1);
		}
		else {
			getGeoFromBrowser(geopositionUser);
			showConfirmZipCode();
		}
        updateProgressBar();
        /*
         if (sessionStorage.getItem("models") !== null) {
         models = JSON.parse(sessionStorage.models);
         }
         */
        for (var q=1; q<=nQuestions; q++){
            if (user.options[q-1]) {    //Quiz
                if (typeof(quiz)!="undefined") {
                   answerQuestion (q, user.options[q - 1])
                }
                else {  //Home
                    var question = document.getElementsByClassName("quizelement" + q);
                    if (question.length) question[0].classList.remove("completed");
                    updateHomeMenuQuestion(q, user.options[q - 1])
                }
            }
        }
    }
    else {
		getGeoFromBrowser(geopositionUser);
    	showConfirmZipCode();
    }

    window.onbeforeunload = function(){
//        if (user!=null) sessionStorage.setItem('user', JSON.stringify(user));
//        else sessionStorage.removeItem('user');
        if (user!=null) localStorageSet('user', JSON.stringify(user));
        else localStorageRemove('user');
    };

});


function ShowZipCodeByGeo(geopos) {
    const oZip = document.getElementById("zipcode");
   if (oZip) {
        oZip.value = geopos.zipCode;
        oZip.style.border = "0px";
        oZip.style.width="100px";
    }
    if (geopos.state) {
        user.state = geopos.state.toLowerCase();

        var a_sZevStates = ["ca", "ct", "me", "md", "ma", "nj", "ny", "or", "ri", "vt"];  //ZEV California, Connecticut, Maine, Maryland, Massachusetts, New Jersey, New York, Oregon, Rhode Island, Vermont
        user.zevState = 0;
        if (a_sZevStates.indexOf(user.state) != -1) user.zevState = 1;

        var a_sMildClimateStates = ["al","ar","ca","dc","in","ia","ky","md","o","e","nh","nj","nm","oh","or","pa","ri","va","wa","wv","wi","wy"];  //Climate
        user.mildClimate = 0;
        if (a_sMildClimateStates.indexOf(user.state) != -1) user.mildClimate = 1
    }

    var sInfo =  geopos.state + " | ZEV:"+ user.zevState + " | Mild climate: "+ user.mildClimate;
    oZip.setAttribute('title',sInfo);

//    sessionStorage.setItem('user', JSON.stringify(user));
    localStorageSet('user', JSON.stringify(user));
}

function ZipCodeError(){
    user.zipCode = 0;
    const oZip = document.getElementById("zipcode");
    if (oZip) {
        oZip.value = "";
        oZip.style.border = "1px solid #3EC3DE";
        oZip.focus();
    }
}

function focusZipCode(oZip){
  oZip.style.border = "1px solid";
  if ($('.hidden-xs').is(':visible')){
    oZip.style.width="210px";
  	oZip.placeholder="What's your zipcode?";
	oZip.style.fontSize="18px"
  }
  else {
    oZip.placeholder="Zipcode?";
	oZip.style.fontSize="14px"
  }
}

function UpdateZipCode(zip,bManual) {
//    if (!bManual) showConfirmZipCode();
    geopositionUser.zipCode = zip;
    getGeoByPostalCode(geopositionUser);
}

function showConfirmZipCode(){
  $('[data-toggle="popover"]').popover("show")
}

function confirmZipCode(){
    user.zipCode = document.getElementById("zipcode").value;
	if (user!=null) localStorageSet('user', JSON.stringify(user));
    $('[data-toggle="popover"]').popover("hide")
}

function cancelZipCode(){
    $('[data-toggle="popover"]').popover("hide");
    ZipCodeError()
}


function forceUsa () {
    UpdateZipCode("94063")
}


function getGeoFromBrowser(geopos, nOption) {
    if (document.location.protocol === 'https:' && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            geopos.latitude = position.coords.latitude;
            geopos.longitude = position.coords.longitude;
            getGeoByLatLng(geopos, nOption)
        }, function(){getGeoFromIp(geopos, nOption)} );  //error
    }
    else {
        getGeoFromIp(geopos, nOption);
    }
}

function getGeoFromIp(geopos,nOption) {
    $.getJSON("https://freegeoip.net/json/", function (jsonAddressByIp) {
        geopos.city = jsonAddressByIp.city;
        geopos.state = jsonAddressByIp.region_code;
        geopos.zipCode = jsonAddressByIp.zip_code;
        geopos.latitude = jsonAddressByIp.latitude;
        geopos.longitude = jsonAddressByIp.longitude;
        geopos.country = jsonAddressByIp.country_code;
        geoUpdated (geopos,nOption);
    })
}

function getGeoByPostalCode(geopos,nOption) {
    var sUrl = "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:" + geopos.zipCode + "&sensor=false&key=AIzaSyAZSneBeMNOo8ap7SgCSJ2VYwDuQWFQAWo";
    //let sUrl = `/geocode/postalcode/${geopos.zipCode}`;
    $.getJSON(sUrl, function (jsonAddress) {
        if (jsonAddress.results && jsonAddress.results.length) {
            geopos.city = getAddressDataByType(jsonAddress, "locality", "long_name");
            geopos.state = getAddressDataByType(jsonAddress, "administrative_area_level_1");
            geopos.latitude = jsonAddress.results[0].geometry.location.lat;
            geopos.longitude = jsonAddress.results[0].geometry.location.lng;
            geopos.country = getAddressDataByType(jsonAddress, "country");
            geoUpdated (geopos,nOption);
        }
        else {
            ZipCodeError()
        }
    });
}

function getGeoByLatLng(geopos,nOption) {
    var sUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + geopos.latitude + "," + geopos.longitude + "&sensor=false&key=AIzaSyAZSneBeMNOo8ap7SgCSJ2VYwDuQWFQAWo";
 //   let sUrl = `/geocode/latlng/${geopos.latitude},${geopos.longitude}`;
    $.getJSON(sUrl, function (jsonAddress) {
        if (jsonAddress.results && jsonAddress.results.length) {
            GetGeoByGoogle (geopos, jsonAddress,nOption)
        }
    });
}

function GetGeoByGoogle (geopos, jsonAddress, nOption) {
    geopos.city = getAddressDataByType(jsonAddress, "locality", "long_name");
    geopos.zipCode = getAddressDataByType(jsonAddress, "postal_code");
    geopos.state = getAddressDataByType(jsonAddress, "administrative_area_level_1");

    if (typeof(jsonAddress.results[0].geometry.location.lat)=="number") {
        geopos.latitude = jsonAddress.results[0].geometry.location.lat;
        geopos.longitude = jsonAddress.results[0].geometry.location.lng;
    }
    else {
        geopos.latitude = jsonAddress.results[0].geometry.location.lat();
        geopos.longitude = jsonAddress.results[0].geometry.location.lng();
    }
    geopos.country = getAddressDataByType(jsonAddress, "country");
    geoUpdated (geopos,nOption);
}


function geoUpdated (geopos,nOption) {
    if (geopos===geopositionUser) {
        if (geopos.country.indexOf("US")!=0) {
            forceUsa ();
        }
        ShowZipCodeByGeo (geopos);
    }
    else {
		if (nOption) {
			initGMaps(geopos)
		}
	}
}

/*
        var myAddress = []
        for (i = 0; i < jAddress.results.length; i++) {
            myAddress[i] = jAddress.results[i].formatted_address;
            if (jAddress.results[i].types == "locality") {
                console.log(i + ". [locality] " + jAddress.results[i].address_components[0].short_name)
                //      break
            }
            if (jAddress.results[i].types == "postal_code") {
                console.log(i + ". [postal_code] " + jAddress.results[i].address_components[0].short_name)
                //      break
            }
//            console.log(myAddress[i] + "-" + jAddress.results[i].types)
        }
*/



function getAddressDataByType (oJson, sType, sField) {
    let sAddressData = null;
    if (oJson.results && oJson.results.length) {
        if (!sField) sField = "short_name";
        const oAddress = oJson.results[0].address_components.find(result => result.types[0] == sType);
        if (oAddress) sAddressData = oAddress[sField];
    }
    return sAddressData;
/*
    for (i = 0; i < jAddress.results.length; i++) {
        myAddress[i] = jAddress.results[i].formatted_address;

        if (jAddress.results[i].types == "locality") {
            console.log(i + ". [locality] " + jAddress.results[i].address_components[0].short_name)
            //      break
        }
    }
*/

}

/*
for (i = 0; i < myJSONResult.results.length; i++) {
  myAddress[i] = myJSONResult.results[i].formatted_address;
}
*/



//function get
/*
Load JSON in JS
http://stackoverflow.com/questions/9922101/get-json-data-from-external-url-and-display-it-in-a-div-as-plain-text

//https://maps.googleapis.com/maps/api/geocode/json?latlng=40.421558999999995,-3.705448&key=AIzaSyBQHW9EuhvZxTp6T0OVp4TNAY90-HHxn-A

//http://www.webservicex.net/uszip.asmx

//Google Map tutorial
//https://developers.google.com/maps/documentation/javascript/tutorial?hl=es-419


*/

function updateHomeMenuQuestion (nQuestion, nOption) {
    var question = document.getElementsByClassName("quizelement" + nQuestion);
    if (question.length) question[0].classList.add("completed");
//    drawQuestion(nQuestion , nOption)
}


function updateProgressBar(){
    var oBar = document.getElementById("progressbar");
    if (oBar) {
        oBar.style.width = (user.answered*20)+"%";
    }
}


/*Emulate localStorage for Safari Private browsing*/
function localStorageGet( pKey ) {
    if( localStorageSupported() ) {
        return sessionStorage[pKey];
    } else {
        return docCookies.getItem( 'localstorage.'+pKey );
    }
}

function localStorageSet( pKey, pValue ) {
    if( localStorageSupported() ) {
        sessionStorage[pKey] = pValue;
    } else {
        docCookies.setItem( 'localstorage.'+pKey, pValue );
    }
}

function localStorageRemove( pKey) {
    if( localStorageSupported() ) {
        sessionStorage.removeItem(pKey);
    } else {
        docCookies.removeItem( 'localstorage.'+pKey);
    }
}

// global to cache value
var gStorageSupported = undefined;
function localStorageSupported() {
    var testKey = 'test', storage = window.sessionStorage;
    if( gStorageSupported === undefined ) {
        try {
            storage.setItem(testKey, '1');
            storage.removeItem(testKey);
            gStorageSupported = true;
        } catch (error) {
            gStorageSupported = false;
        }
    }
		return gStorageSupported;
}

