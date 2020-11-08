var database = firebase.database();
var ref = database.ref("Data");

var bsfObj;
var bsfkeys;
var bsflObj;
var bsflkeys;
var chickenObj;
var chickenkeys;

var type = document.getElementById("dashboardTitle").textContent;
var dropdown = document.querySelector("#chickenAreaDash");
var areaSelected;

var card1 = document.getElementById("dashCard1Title");
var card2 = document.getElementById("dashCard2Title");
var card3 = document.getElementById("dashCard3Title");
var symbol1 = document.getElementById("symbolCard2");
var symbol2 = document.getElementById("symbolCard3");
var card1data;
var card2data;
var card3data;
var card4data;

ref.on("value", snap=>{
    var dataObj = snap.val();
    var keys = Object.keys(dataObj);
    for(var x = 0; x < keys.length; ++x){
        var k = keys[x];

        if(k == "BSF"){
            bsfObj = dataObj[k];
        }

        else if(k == "BSFL"){
            bsflObj = dataObj[k];
        }

        else if(k == "Chicken"){
            chickenObj = dataObj[k];
        }
    }

    if(bsfObj != undefined) bsfkeys = Object.keys(bsfObj);
    if(bsflObj != undefined) bsflkeys = Object.keys(bsflObj);
    if(chickenObj != undefined) chickenkeys = Object.keys(chickenObj);
    populateDashboard();
})

function populateDashboard(){
    let html = "";
    let optionslist = "";

    if(type == "Chicken"){
        document.getElementById("card4").style.display = "none";

        if(chickenkeys != undefined){
            document.getElementById("dash").style.display = "block";
            document.getElementById("nodash").style.display = "none";

            if(chickenObj[areaSelected] == undefined){
                areaSelected = chickenkeys[0];
            }
    
            for(var x = 0; x < chickenkeys.length; ++x){
                if(areaSelected == `${chickenkeys[x]}`){
                    optionslist = `
                        <option value="${chickenkeys[x]}" selected>${chickenkeys[x]}</option> 
                    `;
                }
        
                else{
                    optionslist = `
                        <option value="${chickenkeys[x]}">${chickenkeys[x]}</option>
                    `;
                }
        
                html = html + optionslist;
            }
        
            if(dropdown) { dropdown.innerHTML = html; }
        
            var lastKey = Object.keys(chickenObj[areaSelected])[Object.keys(chickenObj[areaSelected]).length-1];
            
            card1.innerHTML = "Chicken - Temperature";
            card2.innerHTML = "Chicken - Humidity";
            symbol1.innerHTML = "%";
            card3.innerHTML = "Chicken - Light";
            symbol2.innerHTML = "Lux";
            
            card1data = chickenObj[areaSelected][lastKey].temperature;
            var valueTemp = document.getElementById("temp");    
            var chkTemp = document.getElementById("dashCard-1");
            if(chkTemp) { chkTemp.innerHTML = card1data; }
            if(valueTemp) { valueTemp.setAttribute("data-value",card1data); }
        
            card2data = chickenObj[areaSelected][lastKey].humidity;
            var valueHumid = document.getElementById("humid");
            var chkHumid = document.getElementById("dashCard-2");
            if(chkHumid) { chkHumid.innerHTML = card2data; }
            if(valueHumid) { valueHumid.setAttribute("data-value",card2data); }
        
            card3data = chickenObj[areaSelected][lastKey].light;
            var valueMois = document.getElementById("mois");
            var chkMois = document.getElementById("dashCard-3");
            if(chkMois) { chkMois.innerHTML = card3data; }
            if(valueMois) { valueMois.setAttribute("data-value",card3data); }
        
            $(function(){
                $(".progress").each(function(){
                    var value = $(this).attr("data-value");
                    var left = $(this).find(".progress-left .progress-bar");
                    var right = $(this).find(".progress-right .progress-bar");
    
                    if($(this).attr("id") == "mois"){
                        if(value > 0){
                            if(value <= 50){
                                right.css("transform", "rotate(" + percentageToDegrees(value/1000) + "deg)")
                                left.css("transform","rotate(" + percentageToDegrees(0) + "deg)")
                            }
                            
                            else if(value > 50000){
                                right.css("transform", "rotate(180deg")
                                left.css("transform","rotate(" + percentageToDegrees((value-50000)/1000) + "deg)")
                            }
    
                            else if(value > 50){
                                right.css("transform", "rotate(" + percentageToDegrees(value/1000) + "deg)")
                                left.css("transform","rotate(" + percentageToDegrees(0) + "deg)")
                            }
        
                            else{
                                right.css("transform", "rotate(180deg)")
                                left.css("transform", "rotate(" + percentageToDegrees(value - 50) + "deg)")
                            }
                        }
                    }

                    else{
                        if(value > 0){
                            if(value <= 50){
                                right.css("transform", "rotate(" + percentageToDegrees(value) + "deg)")
                                left.css("transform","rotate(" + percentageToDegrees(0) + "deg)")
                            }
        
                            else{
                                right.css("transform", "rotate(180deg)")
                                left.css("transform", "rotate(" + percentageToDegrees(value - 50) + "deg)")
                            }
                        }
                    }
                })
            });
        }

        else{
            if(dropdown) { dropdown.innerHTML = html; }
            document.getElementById("dash").style.display = "none";
            document.getElementById("nodash").style.display = "block";
        }
    }

    else if(type == "BSF"){
        document.getElementById("card4").style.display = "none";

        if(bsfkeys != undefined){
            document.getElementById("dash").style.display = "block";
            document.getElementById("nodash").style.display = "none";

            if(bsfObj[areaSelected] == undefined){
                areaSelected = bsfkeys[0];
            }
    
            for(var x = 0; x < bsfkeys.length; ++x){
                if(areaSelected == `${bsfkeys[x]}`){
                    optionslist = `
                        <option value="${bsfkeys[x]}" selected>${bsfkeys[x]}</option> 
                    `;
                }
        
                else{
                    optionslist = `
                        <option value="${bsfkeys[x]}">${bsfkeys[x]}</option>
                    `;
                }
        
                html = html + optionslist;
            }
        
            if(dropdown) { dropdown.innerHTML = html; }
        
            var lastKey = Object.keys(bsfObj[areaSelected])[Object.keys(bsfObj[areaSelected]).length-1];
        
            card1.innerHTML = "BSF - Temperature";
            card2.innerHTML = "BSF - Humidity";
            symbol1.innerHTML = "%";
            card3.innerHTML = "BSF - Light";
            symbol2.innerHTML = "Lux";
        
            card1data = bsfObj[areaSelected][lastKey].temperature;
            var valueTemp = document.getElementById("temp");
            var chkTemp = document.getElementById("dashCard-1");
            if(chkTemp) { chkTemp.innerHTML = card1data; }
            if(valueTemp) { valueTemp.setAttribute("data-value",card1data); }
        
            card2data = bsfObj[areaSelected][lastKey].humidity;
            var valueHumid = document.getElementById("humid");
            var chkHumid = document.getElementById("dashCard-2");
            if(chkHumid) { chkHumid.innerHTML = card2data; }
            if(valueHumid) { valueHumid.setAttribute("data-value",card2data); }
        
            card3data = bsfObj[areaSelected][lastKey].light;
            var valueMois = document.getElementById("mois");
            var chkMois = document.getElementById("dashCard-3");
            if(chkMois) { chkMois.innerHTML = card3data; }
            if(valueMois) { valueMois.setAttribute("data-value",card3data); }
        }

        else{
            if(dropdown) { dropdown.innerHTML = html; }
            document.getElementById("dash").style.display = "none";
            document.getElementById("nodash").style.display = "block";
        }
    
        $(function(){
            $(".progress").each(function(){
                var value = $(this).attr("data-value");
                var left = $(this).find(".progress-left .progress-bar");
                var right = $(this).find(".progress-right .progress-bar");
    
                if(value > 0){
                    if(value <= 50){
                        right.css("transform", "rotate(" + percentageToDegrees(value) + "deg)")
                        left.css("transform","rotate(" + percentageToDegrees(0) + "deg)")
                    }
        
                    else{
                        right.css("transform", "rotate(180deg)")
                        left.css("transform", "rotate(" + percentageToDegrees(value - 50) + "deg)")
                    }
                }
            })
        });
    }

    else if(type == "BSFL"){
        document.getElementById("card4").style.display = "block";

        if(bsflkeys != undefined){
            document.getElementById("dash").style.display = "block";
            document.getElementById("nodash").style.display = "none";

            if(bsflObj[areaSelected] == undefined){
                areaSelected = bsflkeys[0];
            }
    
            for(var x = 0; x < bsflkeys.length; ++x){
                if(areaSelected == `${bsflkeys[x]}`){
                    optionslist = `
                        <option value="${bsflkeys[x]}" selected>${bsflkeys[x]}</option> 
                    `;
                }
        
                else{
                    optionslist = `
                        <option value="${bsflkeys[x]}">${bsflkeys[x]}</option>
                    `;
                }
        
                html = html + optionslist;
            }
        
            if(dropdown) { dropdown.innerHTML = html; }
        
            var lastKey = Object.keys(bsflObj[areaSelected])[Object.keys(bsflObj[areaSelected]).length-1];
        
            card1.innerHTML = "BSFL - Temperature";
            card2.innerHTML = "BSFL - Humidity";
            symbol1.innerHTML = "%";
            card3.innerHTML = "BSFL - Moisture";
            symbol2.innerHTML = "%";
        
            card1data = bsflObj[areaSelected][lastKey].temperature;
            var valueTemp = document.getElementById("temp");
            var chkTemp = document.getElementById("dashCard-1");
            if(chkTemp) { chkTemp.innerHTML = card1data; }
            if(valueTemp) { valueTemp.setAttribute("data-value",card1data); }
        
            card2data = bsflObj[areaSelected][lastKey].humidity;
            var valueHumid = document.getElementById("humid");
            var chkHumid = document.getElementById("dashCard-2");
            if(chkHumid) { chkHumid.innerHTML = card2data; }
            if(valueHumid) { valueHumid.setAttribute("data-value",card2data); }
        
            card3data = bsflObj[areaSelected][lastKey].moisture;
            var valueMois = document.getElementById("mois");
            var chkMois = document.getElementById("dashCard-3");
            if(chkMois) { chkMois.innerHTML = card3data; }
            if(valueMois) { valueMois.setAttribute("data-value",card3data); }

            card4data = bsflObj[areaSelected][lastKey].soilTemp;
            var valueSoil = document.getElementById("soil");
            var chkSoil = document.getElementById("dashCard-4");
            if(chkSoil) { chkSoil.innerHTML = card4data; }
            if(valueSoil) { valueSoil.setAttribute("data-value",card4data); }
        
            $(function(){
                $(".progress").each(function(){
                    var value = $(this).attr("data-value");
                    var left = $(this).find(".progress-left .progress-bar");
                    var right = $(this).find(".progress-right .progress-bar");
        
                    if(value > 0){
                        if(value <= 50){
                            right.css("transform", "rotate(" + percentageToDegrees(value) + "deg)")
                            left.css("transform","rotate(" + percentageToDegrees(0) + "deg)")
                        }
            
                        else{
                            right.css("transform", "rotate(180deg)")
                            left.css("transform", "rotate(" + percentageToDegrees(value - 50) + "deg)")
                        }
                    }
                })
            });
        }

        else{
            if(dropdown) { dropdown.innerHTML = html; }
            document.getElementById("dash").style.display = "none";
            document.getElementById("nodash").style.display = "block";
        }
    }
}

function percentageToDegrees(percentage){
    return percentage / 100 * 360;
}

function dataAreaChange(){
    areaSelected = document.getElementById("chickenAreaDash").value;

    populateDashboard();
}

$("#dashPage li").click(function(){
    if($(this).children().attr("id") == "dashChickenBtn"){
        document.getElementById("dashboardTitle").innerHTML = "Chicken";
    }

    else if($(this).children().attr("id") == "dashBSFBtn"){
        document.getElementById("dashboardTitle").innerHTML = "BSF";
    }
    
    else if($(this).children().attr("id") == "dashBSFLBtn"){
        document.getElementById("dashboardTitle").innerHTML = "BSFL";
    }

    type = document.getElementById("dashboardTitle").textContent;
    populateDashboard();
})

