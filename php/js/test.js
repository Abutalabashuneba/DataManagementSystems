var database = firebase.database();
var ref = database.ref("Data");

ref.on("value", snap=>{
    var dataObj = snap.val();
    var keys = Object.keys(dataObj);
})

// var type = document.getElementById("dataTitle").textContent;
// var dropdown = document.querySelector("#chickenAreaData");
// var areaSelected;
// var datalistC = document.querySelector(".bodyDataC");
// var dataheaderC = document.querySelector(".bodyHeaderC");
// var datalistBSF = document.querySelector(".bodyDataBSF");
// var dataHeaderBSF = document.querySelector(".bodyHeaderBSF");
// var datalistBSFL = document.querySelector(".bodyDataBSFL");
// var dataHeaderBSFL = document.querySelector(".bodyHeaderBSFL");

// var chickenObj;
// var chickenKeys;

// ref.on("value", snap=>{
//     var dataObj = snap.val();
//     var keys = Object.keys(dataObj);

//     for(var x = 0; x < keys.length; ++x){
//         var k = keys[x];

//         if(k == "Chicken"){
//             chickenObj = dataObj[k];
//         }
//     }

//     chickenKeys = Object.keys(chickenObj);

//     populateTables();
// })

// function populateTables(){
//     let html = "";
//     let optionslist = "";
//     let header = "";

//     if(type == "Chicken" && chickenKeys[0] != undefined){
//         if(chickenObj[areaSelected] == undefined){
//             areaSelected = chickenKeys[0];
//         }

//         for(var x = 0; x < chickenKeys.length; ++x){
//             if(areaSelected == `${chickenKeys[x]}`){
//                 optionslist = `
//                     <option value="${chickenKeys[x]}" selected>${chickenKeys[x]}</option> 
//                 `;
//             }
    
//             else{
//                 optionslist = `
//                     <option value="${chickenKeys[x]}">${chickenKeys[x]}</option>
//                 `;
//             }
    
//             html = html + optionslist;
//         }
    
//         if(dropdown) { dropdown.innerHTML = html; }

//         header = `
//             <tr class="text-muted">
//                 <th>#</th>
//                 <th>Timestamp</th>
//                 <th>Temperature (°C)</th>
//                 <th>Humidity (%)</th>
//                 <th>Light</th>
//         `;

//         if(sessionStorage.getItem("type") == "Admin"){
//             header += `
//                 <th>Option</th>
//             </tr>
//             `;
//         }

//         dataheaderC.innerHTML = header;

//         var start = moment().subtract(31,"days");
//         var end = moment();

//         function dp(start, end){
//             let rowData = "";

//             $("#reportrange span").html(start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY"));

//             for(var x = 0; x < Object.keys(chickenObj[areaSelected]).length; ++x){
//                 var prev = Object.keys(chickenObj[areaSelected])[x-1];
//                 var keys = Object.keys(chickenObj[areaSelected])[x];
//                 var newstartdate = Date.parse(start.format("YYYY.MM.DD 00:00:00"));
//                 var newenddate = Date.parse(end.format("YYYY.MM.DD 23:59:59"));
                
//                 var d = new Date(chickenObj[areaSelected][keys].timestamp);
//                 if(prev != undefined){
//                     console.log(d.getMilliseconds() == (new Date(chickenObj[areaSelected][prev].timestamp)).getMilliseconds());
//                 }

//                 if(newstartdate <= d && newenddate >= d){
//                     var options = { month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"};
//                     var datetime = d.toLocaleString("en-us", options);
//                     let tr = "";

                    
//                 }
//             }
//         }
//         $("#reportrange").daterangepicker({
//             startDate : start,
//             endDate : end,
//             ranges : {
//                 "Today" : [moment(), moment()],
//                 "Yesterday" : [moment().subtract(1, "days"), moment().subtract(1, "days")],
//                 "Last 7 days" : [moment().subtract(6, "days"), moment()],
//                 "Last 30 Days" : [moment().subtract(29, "days"), moment()],
//                 "This Month" : [moment().startOf("month"),moment().endOf("month")],
//                 "Last Month" : [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
//                 "Lifetime" : [moment().subtract(50,"year"), moment()]
//             }
//         }, dp)

//         dp(start, end);
//     }
// }