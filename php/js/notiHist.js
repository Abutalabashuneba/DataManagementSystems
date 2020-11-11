var database = firebase.database();
var ref = database.ref("Data"); 

var type = document.getElementById("dataTitle").textContent;
var areaSelected;
var areaDrop = document.querySelector("#chickenAreaData");
var cardArea = document.querySelector("#notificationCard");

var dataObj;
var bsfObj;
var bsfkeys;
var bsflObj;
var bsflkeys;
var chickenObj;
var chickenkeys;
var notikeys = [];

ref.on("value", snap=>{
    dataObj = snap.val();
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

    populateNotification();
})

function populateNotification(){
    let html = "";
    let optionslist = "";
    notikeys = [];
    let count = 1;

    if(type == "Chicken"){
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
    
        if(areaDrop) { areaDrop.innerHTML = html; }
        
        let cardData = "";

        for(var x = 0; x < Object.keys(chickenObj[areaSelected]).length; ++x){
            var keys = Object.keys(chickenObj[areaSelected])[x];

            let card = "";

            var d = new Date(chickenObj[areaSelected][keys].timestamp);
            var options = { month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" };
            var datetime = d.toLocaleString("en-us", options);

            if(chickenObj[areaSelected][keys].Threshold == 1){
                notikeys.push(keys);

                card = `
                    <div class="card mt-2">
                        <div class="card-header">
                            <h4>
                                Warning #<span class="index">${count++}</span><b style="color:green;">(New)</b>
                                <button type="button" class="close" id="closeNoti"><span>&times;</span></button>
                                <button type="button" class="close" id="checkNoti"><span>&check;</span></button>
                            </h4>
                        </div>

                        <div class="card-body">
                            <p>Date and Time : <span style="font-weight:bold;
                            ">${datetime}</span></p>
                            <p>Temperature : <span style="font-weight:bold;
                            ">${chickenObj[areaSelected][keys].temperature}</span></p>
                            <p>Humidity : <span style="font-weight:bold;
                            ">${chickenObj[areaSelected][keys].humidity}</span></p>
                            <p>Light : <span style="font-weight:bold;
                            ">${chickenObj[areaSelected][keys].light}</span></p>
                        </div>
                    </div>
                    `;

                cardData += card;  
            }

            else if(chickenObj[areaSelected][keys].Threshold == 2){
                notikeys.push(keys);

                card = `
                    <div class="card mt-2">
                        <div class="card-header">
                            <h4>
                                Warning #<span class="index">${count++}</span>
                                <button type="button" class="close" id="closeNoti"><span>&times;</span></button>
                                <button type="button" class="close" id="checkNoti"><span>&check;</span></button>
                            </h4>
                        </div>

                        <div class="card-body">
                            <p>Date and Time : <span style="font-weight:bold;
                            ">${datetime}</span></p>
                            <p>Temperature : <span style="font-weight:bold;
                            ">${chickenObj[areaSelected][keys].temperature}</span></p>
                            <p>Humidity : <span style="font-weight:bold;
                            ">${chickenObj[areaSelected][keys].humidity}</span></p>
                            <p>Light : <span style="font-weight:bold;
                            ">${chickenObj[areaSelected][keys].light}</span></p>
                        </div>
                    </div>
                `;
                cardData += card;  
            }
        }

        cardArea.innerHTML = cardData;
    }

    else if(type == "BSF"){
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
    
        if(areaDrop) { areaDrop.innerHTML = html; }
        
        let cardData = "";
        
        for(var x = 0; x < Object.keys(bsfObj[areaSelected]).length; ++x){
            var keys = Object.keys(bsfObj[areaSelected])[x];

            let card = "";

            var d = new Date(bsfObj[areaSelected][keys].timestamp);
            var options = { month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" };
            var datetime = d.toLocaleString("en-us", options);

            if(bsfObj[areaSelected][keys].Threshold == 1){
                notikeys.push(keys);

                card = `
                <div class="card mt-2">
                    <div class="card-header">
                        <h4 class="m-0">
                            Warning #<span class="index">${count++}</span><b style="color:green;">(New)</b>
                            <button type="button" class="close" id="closeNoti"><span>&times;</span></button>
                            <button type="button" class="close" id="checkNoti"><span>&check;</span></button>
                        </h4>
                    </div>

                    <div class="card-body">
                            <p>Date and Time : <span style="font-weight:bold;
                            ">${datetime}</span></p>
                            <p>Temperature : <span style="font-weight:bold;
                            ">${bsfObj[areaSelected][keys].temperature}</span></p>
                            <p>Humidity : <span style="font-weight:bold;
                            ">${bsfObj[areaSelected][keys].humidity}</span></p>
                            <p>Light : <span style="font-weight:bold;
                            ">${bsfObj[areaSelected][keys].light}</span></p>
                        </div>
                </div>
                `;
                cardData += card;  
            }

            else if(bsfObj[areaSelected][keys].Threshold == 1){
                notikeys.push(keys);

                card = `
                <div class="card mt-2">
                    <div class="card-header">
                        <h4 class="m-0">
                            Warning #<span class="index">${count++}</span>
                            <button type="button" class="close" id="closeNoti"><span>&times;</span></button>
                            <button type="button" class="close" id="checkNoti"><span>&check;</span></button>
                        </h4>
                    </div>

                    <div class="card-body">
                            <p>Date and Time : <span style="font-weight:bold;
                            ">${datetime}</span></p>
                            <p>Temperature : <span style="font-weight:bold;
                            ">${bsfObj[areaSelected][keys].temperature}</span></p>
                            <p>Humidity : <span style="font-weight:bold;
                            ">${bsfObj[areaSelected][keys].humidity}</span></p>
                            <p>Light : <span style="font-weight:bold;
                            ">${bsfObj[areaSelected][keys].light}</span></p>
                        </div>
                </div>
                `;
                cardData += card;  
            }
        }

        cardArea.innerHTML = cardData;
    }

    else if(type == "BSFL"){
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
    
        if(areaDrop) { areaDrop.innerHTML = html; }
        
        let cardData = "";

        for(var x = 0; x < Object.keys(bsflObj[areaSelected]).length; ++x){
            var keys = Object.keys(bsflObj[areaSelected])[x];

            let card = "";

            var d = new Date(bsflObj[areaSelected][keys].timestamp);
            var options = { month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" };
            var datetime = d.toLocaleString("en-us", options);

            if(bsflObj[areaSelected][keys].Threshold == 1){
                notikeys.push(keys);

                card = `
                    <div class="card mt-2">
                        <div class="card-header">
                            <h4 class="m-0">
                                Warning #<span class="index">${count++}</span><b style="color:green;">(New)</b>
                                <button type="button" class="close" id="closeNoti"><span>&times;</span></button>
                                <button type="button" class="close" id="checkNoti"><span>&check;</span></button>
                            </h4>
                        </div>

                        <div class="card-body">
                            <p>Date and Time : <span style="font-weight:bold;
                            ">${datetime}</span></p>
                            <p>Temperature : <span style="font-weight:bold;
                            ">${bsflObj[areaSelected][keys].temperature}</span></p>
                            <p>Humidity : <span style="font-weight:bold;
                            ">${bsflObj[areaSelected][keys].humidity}</span></p>
                            <p>Moisture : <span style="font-weight:bold;
                            ">${bsflObj[areaSelected][keys].moisture}</span></p>
                            <p>Soil Temperature : <span style="font-weight:bold;
                            ">${bsflObj[areaSelected][keys].soilTemp}</span></p>
                        </div>
                    </div>
                `;

                cardData += card;  
            }

            else if(bsflObj[areaSelected][keys].Threshold == 2){
                notikeys.push(keys);

                card = `
                    <div class="card mt-2">
                        <div class="card-header">
                            <h4 class="m-0">
                                Warning#<span class="index">${count++}</span>
                                <button type="button" class="close" id="closeNoti"><span>&times;</span></button>
                                <button type="button" class="close" id="checkNoti"><span>&check;</span></button>
                            </h4>
                        </div>

                        <div class="card-body">
                            <p>Date and Time : <span style="font-weight:bold;
                            ">${datetime}</span></p>
                            <p>Temperature : <span style="font-weight:bold;
                            ">${bsflObj[areaSelected][keys].temperature}</span></p>
                            <p>Humidity : <span style="font-weight:bold;
                            ">${bsflObj[areaSelected][keys].humidity}</span></p>
                            <p>Moisture : <span style="font-weight:bold;
                            ">${bsflObj[areaSelected][keys].moisture}</span></p>
                            <p>Soil Temperature : <span style="font-weight:bold;
                            ">${bsflObj[areaSelected][keys].soilTemp}</span></p>
                        </div>
                    </div>
                `;

                cardData += card;  
            }   
        }
        cardArea.innerHTML = cardData;
    }
}

$("#dataPage li").click(function(){
    if($(this).children().attr("id") == "dataChickenBtn"){ 
        document.getElementById("dataTitle").innerHTML = "Chicken"; 
    }

    else if($(this).children().attr("id") == "dataBSFBtn"){
        document.getElementById("dataTitle").innerHTML = "BSF";
    }

    else if($(this).children().attr("id") == "dataBSFLBtn"){
        document.getElementById("dataTitle").innerHTML = "BSFL";
    }

    type = document.getElementById("dataTitle").textContent;
    populateNotification();
})

function dataAreaChange(){
    areaSelected = document.getElementById("chickenAreaData").value;
    
    populateNotification();
}

var remove = function(e){
    e.preventDefault();

    var toberemove = $(this).parents("h4").children(".index").text() - 1;

    if(type == "Chicken"){
        $.showConfirm({
            title : "Are you sure",
            textTrue : "Yes",
            textFalse : "No",
            body : "Remove Notification",
    
            onSubmit : function(result){
                if(result){
                    $.showAlert({
                        title : "Delete status",
                        body : "Notification has been removed"
                    })
    
                    let myref = database.ref("Data/Chicken/"+areaSelected);
                    myref.child(notikeys[toberemove]).update({Threshold : null});
                }
            }
        })
    }

    else if(type == "BSF"){
        $.showConfirm({
            title : "Are you sure",
            textTrue : "Yes",
            textFalse : "No",
            body : "Remove Notification",
    
            onSubmit : function(result){
                if(result){
                    $.showAlert({
                        title : "Delete status",
                        body : "Notification has been removed"
                    })
    
                    let myref = database.ref("Data/BSF/"+areaSelected);
                    myref.child(notikeys[toberemove]).update({Threshold : null});
                }
            }
        })
    }

    else if(type == "BSFL"){
        $.showConfirm({
            title : "Are you sure",
            textTrue : "Yes",
            textFalse : "No",
            body : "Remove Notification",
    
            onSubmit : function(result){
                if(result){
                    $.showAlert({
                        title : "Delete status",
                        body : "Notification has been removed"
                    })
    
                    let myref = database.ref("Data/BSFL/"+areaSelected);
                    myref.child(notikeys[toberemove]).update({Threshold : null});
                }
            }
        })
    }
}

var update = function(e){
    e.preventDefault();

    var toberemove = $(this).parents("h4").children(".index").text() - 1;

    if(type == "Chicken"){
        $.showConfirm({
            title : "Are you sure",
            textTrue : "Yes",
            textFalse : "No",
            body : "Check Notification",
    
            onSubmit : function(result){
                if(result){
                    $.showAlert({
                        title : "Check status",
                        body : "Notification has been checked"
                    })
    
                    let myref = database.ref("Data/Chicken/"+areaSelected);
                    myref.child(notikeys[toberemove]).update({Threshold : 2});
                }
            }
        })
    }

    else if(type == "BSF"){
        $.showConfirm({
            title : "Are you sure",
            textTrue : "Yes",
            textFalse : "No",
            body : "Check Notification",
    
            onSubmit : function(result){
                if(result){
                    $.showAlert({
                        title : "Check status",
                        body : "Notification has been checked"
                    })
    
                    let myref = database.ref("Data/BSF/"+areaSelected);
                    myref.child(notikeys[toberemove]).update({Threshold : 2});
                }
            }
        })
    }

    else if(type == "BSFL"){
        $.showConfirm({
            title : "Are you sure",
            textTrue : "Yes",
            textFalse : "No",
            body : "Check Notification",
    
            onSubmit : function(result){
                if(result){
                    $.showAlert({
                        title : "Check status",
                        body : "Notification has been checked"
                    })
    
                    let myref = database.ref("Data/BSFL/"+areaSelected);
                    myref.child(notikeys[toberemove]).update({Threshold : 2});
                }
            }
        })
    }
}

$(document).on("click", "#closeNoti", remove);
$(document).on("click", "#checkNoti", update);

