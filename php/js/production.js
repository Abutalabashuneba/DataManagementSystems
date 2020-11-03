if(sessionStorage.getItem("type") == "Admin") {
    document.getElementById("addBtnC").style.display = "block";
    document.getElementById("addBtnC2").style.display = "block"; 
}

//Chicken table 1
var tableHeadC = document.querySelector(".productionHeaderC");
var datalistC = document.querySelector(".productionBodyDataC");
//Chicken table 2
var tableHeadC2 = document.querySelector(".productionHeaderC2");
var datalistC2 = document.querySelector(".productionBodyDataC2");

var tableHeadBSF = document.querySelector(".productionHeaderBSF");
var datalistBSF = document.querySelector(".productionBodyDataBSF");
var tableHeadBSFL = document.querySelector(".productionHeaderBSFL");
var datalistBSFL = document.querySelector(".productionBodyDataBSFL");

var dropdownC = document.querySelector("#productionArea");

var database = firebase.database();
var productionRef = database.ref("Production");

var datatype1 = "feed";
var datatype2 = "health";

var type = document.getElementById("tableTitle").textContent;
var areaSelected = "";
var productionObj;
var productionKeys;
var productionbsfObj;
var productionbsflObj;
var productionchickenObj;

productionRef.on("value", snap=>{
    productionObj = snap.val();
    if(productionObj != undefined) productionKeys = Object.keys(productionObj);
    populateProductionTable();
})

function populateProductionTable(){
    let html = "";
    let header = "";
    let optionsList = "";
    let start = moment().subtract(31, 'days');
    let end = moment();
    
    if(type == "Chicken"){
        if(productionKeys != undefined){
            document.getElementById("prod").style.display = "block";
            document.getElementById("noprod").style.display = "none";

            if(productionObj[type][areaSelected] == undefined) { areaSelected = Object.keys(productionObj[type])[0]; }

            if(productionObj[type][areaSelected] != undefined){
                for(var x = 0; x < Object.keys(productionObj[type]).length; ++x){
                    if(areaSelected == `${Object.keys(productionObj[type])[x]}`){
                        optionsList = `
                            <option value="${Object.keys(productionObj[type])[x]}" selected>${Object.keys(productionObj[type])[x]}</option>
                        `;
                    }

                    else{
                        optionsList = `
                            <option value="${Object.keys(productionObj[type])[x]}">${Object.keys(productionObj[type])[x]}</option>
                        `;
                    }
                    html += optionsList;
                }
                
                dropdownC.innerHTML = html;

                //---Table 1----//
                header = `
                <tr class="text-muted">
                    <th>#</th>
                    <th>Timestamp</th>
                    <th>Feed Given (KG)</th>
                    <th>Feed Leftover (KG)</th>
                    <th>Feed Actual Consumption (KG)</th>
                    <th>Water Given (KG)</th>
                    <th>Water Leftover (KG)</th>
                    <th>Water Actual Consumption (KG)</th>
                `;

                if(sessionStorage.getItem("type") == "Admin"){
                    header += `
                        <th>Options</th>
                    </tr>
                    `;
                }

                //---Table 2----//
                header2 = `
                <tr class="text-muted">
                    <th>#</th>
                    <th>Timestamp</th>
                    <th>Healthy Chicken</th>
                    <th>Sick Chicken </th>
                    <th>Injured</th>
                    <th>Cull </th>
                    <th>Dead </th>
                    <th>Cummulative No. of Dead Chickens</th>
                    <th>Running Mortality (%)</th>
                `;

                if(sessionStorage.getItem("type") == "Admin"){
                    header2 += `
                        <th>Options</th>
                    </tr>
                    `;
                }

                tableHeadC.innerHTML = header;
                tableHeadC2.innerHTML = header2;

                function dp(start,end){
                    let rowData = "";
                    let rowData2 = "";

                    $("#reportrange span").html(start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY"));

                    //Chicken Table 1
                    for(var x = 0; x < Object.keys(productionObj[type][areaSelected][datatype1]).length; ++x){
                        var keys = Object.keys(productionObj[type][areaSelected][datatype1])[x];

                        var newstartdate = Date.parse(start.format("YYYY.MM.DD 00:00:00"));
                        var newenddate = Date.parse(end.format("YYYY.MM.DD 23:59:59"));

                        if(newstartdate <= productionObj[type][areaSelected][datatype1][keys].timestamp && newenddate >= productionObj[type][areaSelected][datatype1][keys].timestamp){
                            var d = new Date(productionObj[type][areaSelected][datatype1][keys].timestamp);
                            var options = { month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" };
                            var datetime = d.toLocaleString("en-us", options);
                            let tr = "";

                            tr = `
                            <tr>
                                <td class="id">${x + 1}</td>
                                <td>${datetime}</td>
                                <td>${productionObj[type][areaSelected][datatype1][keys].feedGiven}</td>
                                <td>${productionObj[type][areaSelected][datatype1][keys].feedLeft}</td>
                                <td>${productionObj[type][areaSelected][datatype1][keys].feedGiven - productionObj[type][areaSelected][datatype1][keys].feedLeft}</td>
                                <td>${productionObj[type][areaSelected][datatype1][keys].waterGiven}</td>
                                <td>${productionObj[type][areaSelected][datatype1][keys].waterLeft}</td>
                                <td>${productionObj[type][areaSelected][datatype1][keys].waterGiven - productionObj[type][areaSelected][datatype1][keys].waterLeft}</td>
                            `;

                            if(sessionStorage.getItem("type") == "Admin"){
                                tr += `
                                    <td>
                                    <span class="table-remove"><button type="button" class="btn btn-outline-danger btn-sm" id="deleteBtn" data-toggle="tooltip" title="delete">&#10005;</button></span>
                                    <span class="table-edit"><button type="button" class="btn btn-outline-warning btn-sm" data-toggle="tooltip" title="edit">&#9998;</button></span>
                                    </td>
                                </tr>
                                `;
                            }

                            else{
                                tr += `
                                    </tr>;
                                `;
                            }
                            rowData += tr;
                        }
                    }
                    datalistC.innerHTML = rowData;

                    //Chicken Table 2
                    var cumulativeDeath = 0;
                    var first = Object.keys(productionObj[type][areaSelected][datatype2])[0];
                    for(var x = 0; x < Object.keys(productionObj[type][areaSelected][datatype2]).length; ++x){
                        var keys = Object.keys(productionObj[type][areaSelected][datatype2])[x];

                        var newstartdate = Date.parse(start.format("YYYY.MM.DD 00:00:00"));
                        var newenddate = Date.parse(end.format("YYYY.MM.DD 23:59:59"));

                        if(newstartdate <= productionObj[type][areaSelected][datatype2][keys].timestamp && newenddate >= productionObj[type][areaSelected][datatype2][keys].timestamp){
                            var d = new Date(productionObj[type][areaSelected][datatype2][keys].timestamp);
                            var options = { month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" };
                            var datetime = d.toLocaleString("en-us", options);
                            let tr2 = "";

                            cumulativeDeath += productionObj[type][areaSelected][datatype2][keys].dead;

                            tr2 = `
                            <tr>
                                <td class="id">${x + 1}</td>
                                <td>${datetime}</td>
                                <td>${productionObj[type][areaSelected][datatype2][keys].healthy}</td>
                                <td>${productionObj[type][areaSelected][datatype2][keys].sick}</td>
                                <td>${productionObj[type][areaSelected][datatype2][keys].injured}</td>
                                <td>${productionObj[type][areaSelected][datatype2][keys].cull}</td>
                                <td>${productionObj[type][areaSelected][datatype2][keys].dead}</td>
                                <td>${cumulativeDeath}</td>
                                <td>${((cumulativeDeath / productionObj[type][areaSelected][datatype2][first].healthy)*100).toFixed(2)}</td>
                            `;

                            if(sessionStorage.getItem("type") == "Admin"){
                                tr2 += `
                                    <td>
                                    <span class="table-remove-table2"><button type="button" class="btn btn-outline-danger btn-sm" id="deleteBtn" data-toggle="tooltip" title="delete">&#10005;</button></span>
                                    <span class="table-edit-table2"><button type="button" class="btn btn-outline-warning btn-sm" data-toggle="tooltip" title="edit">&#9998;</button></span>
                                    </td>
                                </tr>
                                `;
                            }

                            else{
                                tr2 += `
                                    </tr>;
                                `;
                            }
                            rowData2 += tr2;
                        }
                       
                    }
                    datalistC2.innerHTML = rowData2;
                   

                }
                $("#reportrange").daterangepicker({
                    startDate : start,
                    endDate : end,
                    ranges : {
                        "Today" : [moment(), moment()],
                        "Yesterday" : [moment().subtract(1, "days"), moment().subtract(1, "days")],
                        "Last 7 days" : [moment().subtract(6, "days"), moment()],
                        "Last 30 Days" : [moment().subtract(29, "days"), moment()],
                        "This Month" : [moment().startOf("month"),moment().endOf("month")],
                        "Last Month" : [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
                        "Lifetime" : [moment().subtract(50,"year"), moment()]
                    }
                }, dp)

                dp(start, end);
                $('#chickenTable-Area1').DataTable();
            }
        }

        else{
            document.getElementById("prod").style.display = "none";
            document.getElementById("noprod").style.display = "block";
        }
    }

    else if(type == "BSF"){
        if(productionKeys != undefined){
            document.getElementById("prod").style.display = "block";
            document.getElementById("noprod").style.display = "none";

            if(productionObj[type][areaSelected] == undefined) { areaSelected = Object.keys(productionObj[type])[0]; }

            for(var x = 0; x < Object.keys(productionObj[type]).length; ++x){
                if(areaSelected == `${Object.keys(productionObj[type])[x]}`){
                    optionsList = `
                        <option value="${Object.keys(productionObj[type])[x]}" selected>${Object.keys(productionObj[type])[x]}</option>
                    `;
                }

                else{
                    optionsList = `
                        <option value="${Object.keys(productionObj[type])[x]}">${Object.keys(productionObj[type])[x]}</option>
                    `;
                }
                html += optionsList;
            }
            
            dropdownC.innerHTML = html;

            header = `
            <tr class="text-muted">
                <th>#</th>
                <th>Timestamp</th>
                <th>Eggs Produced (Grams)</th>
            `;

            if(sessionStorage.getItem("type") == "Admin"){
                header += `
                    <th>Options</th>
                </tr>
                `;
            }

            else{
                header += `
                    </tr>
                `;
            }

            tableHeadBSF.innerHTML = header;

            function dp(start,end){
                let rowData = "";

                $("#reportrange span").html(start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY"));

                for(var x = 0; x < Object.keys(productionObj[type][areaSelected]).length; ++x){
                    var keys = Object.keys(productionObj[type][areaSelected])[x];

                    var newstartdate = Date.parse(start.format("YYYY.MM.DD 00:00:00"));
                    var newenddate = Date.parse(end.format("YYYY.MM.DD 23:59:59"));

                    if(newstartdate <= productionObj[type][areaSelected][keys].timestamp && newenddate >= productionObj[type][areaSelected][keys].timestamp){
                        var d = new Date(productionObj[type][areaSelected][keys].timestamp);
                        var options = { month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" };
                        var datetime = d.toLocaleString("en-us", options);
                        let tr = "";

                        tr = `
                        <tr>
                            <td class="id">${x + 1}</td>
                            <td>${datetime}</td>
                            <td>${productionObj[type][areaSelected][keys].eggs}</td>
                        `;

                        if(sessionStorage.getItem("type") == "Admin"){
                            tr += `
                                <td>
                                <span class="table-remove"><button type="button" class="btn btn-outline-danger btn-sm" id="deleteBtn" data-toggle="tooltip" title="delete">&#10005;</button></span>
                                <span class="table-edit"><button type="button" class="btn btn-outline-warning btn-sm" data-toggle="tooltip" title="edit">&#9998;</button></span>
                                </td>
                            </tr>
                            `;
                        }

                        else{
                            tr += `
                                </tr>;
                            `;
                        }
                        rowData += tr;
                    }
                }
                datalistBSF.innerHTML = rowData;
            }
            $("#reportrange").daterangepicker({
                startDate : start,
                endDate : end,
                ranges : {
                    "Today" : [moment(), moment()],
                    "Yesterday" : [moment().subtract(1, "days"), moment().subtract(1, "days")],
                    "Last 7 days" : [moment().subtract(6, "days"), moment()],
                    "Last 30 Days" : [moment().subtract(29, "days"), moment()],
                    "This Month" : [moment().startOf("month"),moment().endOf("month")],
                    "Last Month" : [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
                    "Lifetime" : [moment().subtract(50,"year"), moment()]
                }
            }, dp)

            dp(start, end);
        }

        else{
            document.getElementById("prod").style.display = "none";
            document.getElementById("noprod").style.display = "block";
        }
    }

    else if(type == "BSFL"){
        if(productionKeys != undefined){
            document.getElementById("prod").style.display = "block";
            document.getElementById("noprod").style.display = "none";

            if(productionObj[type][areaSelected] == undefined) { areaSelected = Object.keys(productionObj[type])[0]; }

            for(var x = 0; x < Object.keys(productionObj[type]).length; ++x){
                if(areaSelected == `${Object.keys(productionObj[type])[x]}`){
                    optionsList = `
                        <option value="${Object.keys(productionObj[type])[x]}" selected>${Object.keys(productionObj[type])[x]}</option>
                    `;
                }

                else{
                    optionsList = `
                        <option value="${Object.keys(productionObj[type])[x]}">${Object.keys(productionObj[type])[x]}</option>
                    `;
                }
                html += optionsList;
            }
            
            dropdownC.innerHTML = html;

            header = `
            <tr class="text-muted">
                <th>#</th>
                <th>Timestamp</th>
                <th>Eggs Produced (Grams)</th>
            `;

            if(sessionStorage.getItem("type") == "Admin"){
                header += `
                    <th>Options</th>
                </tr>
                `;
            }

            else{
                header += `
                    </tr>
                `;
            }

            tableHeadBSFL.innerHTML = header;

            function dp(start,end){
                let rowData = "";

                $("#reportrange span").html(start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY"));

                for(var x = 0; x < Object.keys(productionObj[type][areaSelected]).length; ++x){
                    var keys = Object.keys(productionObj[type][areaSelected])[x];

                    var newstartdate = Date.parse(start.format("YYYY.MM.DD 00:00:00"));
                    var newenddate = Date.parse(end.format("YYYY.MM.DD 23:59:59"));

                    if(newstartdate <= productionObj[type][areaSelected][keys].timestamp && newenddate >= productionObj[type][areaSelected][keys].timestamp){
                        var d = new Date(productionObj[type][areaSelected][keys].timestamp);
                        var options = { month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" };
                        var datetime = d.toLocaleString("en-us", options);
                        let tr = "";

                        tr = `
                        <tr>
                            <td class="id">${x + 1}</td>
                            <td>${datetime}</td>
                            <td>${productionObj[type][areaSelected][keys].eggs}</td>
                        `;

                        if(sessionStorage.getItem("type") == "Admin"){
                            tr += `
                                <td>
                                <span class="table-remove"><button type="button" class="btn btn-outline-danger btn-sm" id="deleteBtn" data-toggle="tooltip" title="delete">&#10005;</button></span>
                                <span class="table-edit"><button type="button" class="btn btn-outline-warning btn-sm" data-toggle="tooltip" title="edit">&#9998;</button></span>
                                </td>
                            </tr>
                            `;
                        }

                        else{
                            tr += `
                                </tr>;
                            `;
                        }
                        rowData += tr;
                    }
                }
                datalistBSFL.innerHTML = rowData;
            }
            $("#reportrange").daterangepicker({
                startDate : start,
                endDate : end,
                ranges : {
                    "Today" : [moment(), moment()],
                    "Yesterday" : [moment().subtract(1, "days"), moment().subtract(1, "days")],
                    "Last 7 days" : [moment().subtract(6, "days"), moment()],
                    "Last 30 Days" : [moment().subtract(29, "days"), moment()],
                    "This Month" : [moment().startOf("month"),moment().endOf("month")],
                    "Last Month" : [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
                    "Lifetime" : [moment().subtract(50,"year"), moment()]
                }
            }, dp)

            dp(start, end);
        }

        else{
            document.getElementById("prod").style.display = "none";
            document.getElementById("noprod").style.display = "block";
        }
    }
}

$("#productionPage li").click(function(){
    if($(this).children().attr("id") == "btnChicken"){
        document.getElementById("tableTitle").innerHTML = "Chicken";
		$("#chickentab").show();
		$("#bsftab").hide();
		$("#bsfltab").hide();
    }

    else if($(this).children().attr("id") == "btnBsf"){
        document.getElementById("tableTitle").innerHTML = "BSF";
		$("#chickentab").hide();
		$("#bsftab").show();
		$("#bsfltab").hide();
		
    }

    else if($(this).children().attr("id") == "btnBsfl"){
        document.getElementById("tableTitle").innerHTML = "BSFL";
		$("#chickentab").hide();
		$("#bsftab").hide();
		$("#bsfltab").show();
    }

    type = document.getElementById("tableTitle").textContent;
    populateProductionTable();
})

function productionAreaChange(){
    areaSelected = document.getElementById("productionArea").value;

    if(type == "Chicken"){
        $('#chickenTable-Area1').DataTable().clear().draw().destroy();
    }

    populateProductionTable();
}

var add = function(e){
    // dd/mm/yyyy
    var d = new Date();
    var day = d.getDate().toString().padStart(2, "0");
    var month = (d.getMonth() + 1).toString().padStart(2,"0");
    var year = d.getFullYear();
    var hour = d.getHours().toString().padStart(2, "0");
    var minute = d.getMinutes().toString().padStart(2, "0");
    var date = year + "-" + month + "-" + day + "T" + hour + ":" + minute;

    if(type == "Chicken"){
        $.showModal({
            title : "Chicken" + "-" + areaSelected,
            body : '<form><div class="form-group px-5">' +
            '<input type="number" step="any" min="0" class="form-control addCProduction" name="given" id="given" required>' + 
            '<label for="given" class="CLabel" id="productionLabel">(Feed Given in KG)</label></div>' + 
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control addCProduction" name="leftover" id="leftover" required>' +
            '<label for="leftover" class="CLabel" id="weightLabel">(Feed Leftover in KG)</label></div>' +
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control addCProduction" name="leftover" id="wgiven" required>' +
            '<label for="wgiven" class="CLabel" id="wgivenlabel">(Water Leftover in KG)</label></div>' +
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control addCProduction" name="leftover" id="wleftover" required>' +
            '<label for="wleftover" class="CLabel" id="wleftoverlabel">(Water Leftover in KG)</label></div>' +
            '<div class="form-group px-5"><input type="text" step="any" min="0" class="form-control addCProduction" name="areaC" id="areaC" required value='+ areaSelected +'>' + 
            '<label for="areaC" class="CLabel" id="sickLabel">(Area)</label></div>' + 
            '<div class="form-group px-5"><input type="datetime-local" step="any" min="0" class="form-control addCProduction" name="date" id="date" required value='+ date + '>' + 
            '<label for="date" class="CLabel" id="givenLabel">(Date)</label></div>' + 
            '<button type="submit" name="add" class="btn  btn-block addDataBtn text-white">Add</button></form>',
            onCreate: function (modal) {
                // create event handler for form submit and handle values
                $(modal.element).on("click", "button[type='submit']", function (event) {
                    event.preventDefault()
                    var $form = $(modal.element).find("form")
                    $.showConfirm({
                        title: "Checking",
                        textTrue : "Yes",
                        textFalse : "No",
                        body:
                            "<b>Date:</b> " + $form.find("#date").val() + "<br/>" +
                            "<b>Feed Given:</b> " + $form.find("#given").val() + "<br/>" +
                            "<b>Feed Leftover:</b> " + $form.find("#leftover").val() + "<br/>" +
                            "<b>Water Given:</b> " + $form.find("#wgiven").val() + "<br/>" +
                            "<b>Water Leftover:</b> " + $form.find("#wleftover").val() + "<br/>" +
                            "<b>Area:</b> " + $form.find("#areaC").val(),
                        onSubmit: function(result){
                            if(result){
                                date = $form.find("#date").val();
                                areaSelected = $form.find("#areaC").val();
                                var data = {
                                    feedGiven: parseInt($form.find("#given").val()),
                                    feedLeft:  parseInt($form.find("#leftover").val()),
                                    waterGiven: parseInt($form.find("#wgiven").val()),
                                    waterLeft:  parseInt($form.find("#wleftover").val()),
                                    timestamp: new Date(date).getTime()
                                }

                                if(!isNaN(data.feedGiven) && !isNaN(data.feedLeft)  && !isNaN(data.waterLeft)  && !isNaN(data.waterGiven)){
                                    if(data.feedLeft < data.feedGiven && data.waterLeft < data.waterGiven){
                                        $.showAlert({
                                            title: "Push Status",
                                            body: "Data has been added successfully",
                                        })
                                        
                                        modal.hide()
                                        var myref = database.ref("Production/"+type+"/"+areaSelected+"/"+datatype1);
                                        myref.push(data);
                                    }

                                    else{
                                        $.showAlert({
                                            title: "Push failed",
                                            body: "leftover must not be greater than given"
                                        })
                                    }
                               }
                                
                                else{
                                    $.showAlert({
                                        title: "Push failed",
                                        body: "Check if all the inputs are filled"
                                    })
                                }
                            }
                        }
                    })
                })
            },
        })
    }

    else if(type == "BSF"){
        if(areaSelected == undefined) areaSelected = "Area1";
        $.showModal({
            title : "BSF" + "-" + areaSelected,
            body : '<form><div class="form-group px-5">' +
            '<input type="number" step="any" min="0" class="form-control addBSFProduction" name="production" id="addAmountBSF" required>' + 
            '<label for="addAmountBSF" class="BSFLabel" id="productionLabel">(Egg Produced)</label></div>' + 
            '<button type="submit" name="add" class="btn  btn-block addDataBtn text-white">Add</button></form>',
            onCreate: function (modal) {
                // create event handler for form submit and handle values
                $(modal.element).on("click", "button[type='submit']", function (event) {
                    event.preventDefault()
                    var $form = $(modal.element).find("form")
                    $.showConfirm({
                        title: "Checking",
                        textTrue : "Yes",
                        textFalse : "No",
                        body:
                            "<b>Eggs Produced (Grams):</b> " + $form.find("#addAmountBSF").val(),
                        onSubmit: function(result){
                            if(result){
                                var data = {
                                    eggs : parseInt($form.find("#addAmountBSF").val()),
                                    timestamp: new Date().getTime()
                                }

                                if(!isNaN(data.eggs)){
                                    $.showAlert({
                                        title: "Push Status",
                                        body: "Data has been added successfully",
                                    })
                                    modal.hide()
                                    var myref = database.ref("Production/"+type+"/"+areaSelected);
                                    myref.push(data);
                                }
                                else{
                                    $.showAlert({
                                        title: "Push failed",
                                        body: "Check if all the inputs are filled"
                                    })
                                }
                            }
                        }
                    })
                })
            },
        })
    }

    else if(type == "BSFL"){
        $.showModal({
            title : "BSFL" + "-" + areaSelected,
            body : '<form><div class="form-group px-5">' +
            '<input type="number" step="any" min="0" class="form-control addBSFLProduction" name="production" id="addAmountBSFL" required>' + 
            '<label for="addAmountBSFL" class="BSFLLabel" id="productionLabel">(Larvae Produced)</label></div>' + 
            '<button type="submit" name="add" class="btn  btn-block addDataBtn text-white">Add</button></form>',
            onCreate: function (modal) {
                // create event handler for form submit and handle values
                $(modal.element).on("click", "button[type='submit']", function (event) {
                    event.preventDefault()
                    var $form = $(modal.element).find("form")
                    $.showConfirm({
                        title: "Checking",
                        textTrue : "Yes",
                        textFalse : "No",
                        body:
                            "<b>Larvae Produced (Grams):</b> " + $form.find("#addAmountBSFL").val(),
                        onSubmit: function(result){
                            if(result){
                                var data = {
                                    eggs : parseInt($form.find("#addAmountBSFL").val()),
                                    timestamp: new Date().getTime()
                                }

                                if(!isNaN(data.eggs)){
                                    $.showAlert({
                                        title: "Push Status",
                                        body: "Data has been added successfully",
                                    })
                                   
                                    modal.hide()
                                    var myref = database.ref("Production/"+type+"/"+areaSelected);
                                    myref.push(data);
                                }

                                else{
                                    $.showAlert({
                                        title: "Push Status",
                                        body: "Data has not been added successfully"
                                    })
                                }
                            }
                            
                        }
                    })
                })
            },
        })
    }
}

var remove = function(e){
    e.preventDefault();

    var index = $(this).parents("tr").find("td.id").text();
    var deleteIndex;

    for(var x = 0; x < Object.keys(productionObj[type][areaSelected][datatype1]).length; ++x){
        if(index - 1 == x){
            deleteIndex = Object.keys(productionObj[type][areaSelected][datatype1])[x];
        }
    }

    if(type == "Chicken"){
        $.showConfirm({
            title: "Are you sure",
            textTrue : "Yes",
            textFalse : "No",
            body: 
                "<b>Feed Given:</b>" + productionObj[type][areaSelected][datatype1][deleteIndex].feedGiven + "<br/>" + 
                "<b>Feed Leftover:</b>" + productionObj[type][areaSelected][datatype1][deleteIndex].feedLeft + "<br/>"+
                "<b>Feed Given:</b>" + productionObj[type][areaSelected][datatype1][deleteIndex].waterGiven + "<br/>" + 
                "<b>Feed Given:</b>" + productionObj[type][areaSelected][datatype1][deleteIndex].waterLeft,
            onSubmit: function(result){
                if(result){
                    $.showAlert({
                        title: "Delete Status",
                        body: "Data has been deleted successfully",
                    })
                    var myref = database.ref("Production/"+type+"/"+areaSelected+"/"+datatype1);
                    myref.child(deleteIndex).remove();
					if (x == 1)
					{
					    datalistC.innerHTML = "";
					}
                }
            }
        })
    }

    else if(type == "BSF"){
        $.showConfirm({
            title: "Are you sure",
            textTrue : "Yes",
            textFalse : "No",
            body: 
                "<b>Eggs produced:</b>" + productionObj[type][areaSelected][deleteIndex].eggs,
            onSubmit: function(result){
                if(result){
                    $.showAlert({
                        title: "Delete Status",
                        body: "Data has been deleted successfully",
                    })
                    var myref = database.ref("Data/Production/"+type+"/"+areaSelected);
                    myref.child(deleteIndex).remove();
					if (x == 1)
					{
						
					datalistBSF.innerHTML = "";
					}
                }
            }
        })
    }

    else if(type == "BSFL"){
        $.showConfirm({
            title: "Are you sure",
            textTrue : "Yes",
            textFalse : "No",
            body: 
                "<b>Larvae produced:</b>" + productionObj[type][areaSelected][deleteIndex].eggs,
            onSubmit: function(result){
                if(result){
                    $.showAlert({
                        title: "Delete Status",
                        body: "Data has been deleted successfully",
                    })
                    var myref = database.ref("Data/Production/"+type+"/"+areaSelected);
                    myref.child(deleteIndex).remove();
					if (x == 1)
					{
						
					datalistBSFL.innerHTML = "";
					}
                }
            }
        })
    }
}



var update = function(e){
    e.preventDefault();

    var index = $(this).parents("tr").find("td.id").text();
   
    var tableID = index;
    for(var x = 0; x < Object.keys(productionObj[type][areaSelected][datatype1]).length; ++x){
        if(tableID - 1 == x){
            keys = Object.keys(productionObj[type][areaSelected][datatype1])[x];
            var d = new Date(productionObj[type][areaSelected][datatype1][keys].timestamp);
            var options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
            var datetime = d.toLocaleString('en-us', options); 
        }
    }

    if(type == "Chicken"){
        $.showModal({
            title : "Chicken" + "-" + areaSelected,
            body : '<form><div class="form-group px-5">' +
            '<input type="text" step="any" min="0" name="Date" class="form-control updateDateData" id="updateDate" disabled value=' + datetime + '>' +
            '<label for="updateDate" class="CLabel" id="update"></label></div>' +
            '<div class="form-group px-5"><input type="number" step="any" min="0" name="amountChicken" class="form-control updateCProduction" id="given" value=' +
            productionObj[type][areaSelected][datatype1][keys].feedGiven + '>' +  
            '<label for="given" class="CLabel" id="updateproductionLabel">(Feed Given)</label></div>' + 
            '<div class="form-group px-5"><input type="number" step="any" min="0" name="weight" class="form-control updateCProduction" id="left" value=' +
            productionObj[type][areaSelected][datatype1][keys].feedLeft + '>' +
            '<label for="left" class="CLabel" id="updateweightLabel">(Feed Leftover)</label></div>' + 
            '<div class="form-group px-5"><input type="number" step="any" min="0" name="wgiven" class="form-control updateCProduction" id="wgiven" value=' +
            productionObj[type][areaSelected][datatype1][keys].waterGiven + '>' +
            '<label for="wgiven" class="CLabel" id="updatesickLabel">(Water Given)</label></div>' + 
            '<div class="form-group px-5"><input type="number" step="any" min="0" name="wleft" class="form-control updateCProduction" id="wleft" value=' +
            productionObj[type][areaSelected][datatype1][keys].waterLeft + '>' +
            '<label for="wleft" class="CLabel" id="updateruntLabel">(Water Leftover)</label></div>' + 
            '<button type="submit" name="add" class="btn  btn-block updateDataBtn text-white">Update</button></form>',
            onCreate: function (modal) {
                // create event handler for form submit and handle values
                $(modal.element).on("click", "button[type='submit']", function (event) {
                    var $form = $(modal.element).find("form");
                    event.preventDefault()
                    $.showConfirm({
                        title: "Checking",
                        textTrue : "Yes",
                        textFalse : "No",
                        body:
                            "<b>Date:</b> " + $form.find("#updateDate").val() + "<br/>" +
                            "<b>Feed Given:</b> " + $form.find("#given").val() + "<br/>" +
                            "<b>Feed LeftOver:</b> " + $form.find("#left").val()  + "<br/>" +
                            "<b>Water Given:</b> " + $form.find("#wgiven").val() + "<br/>" +
                            "<b>Water LeftOver:</b> " + $form.find("#wleft").val(),
                        onSubmit: function(result){
                            if(result){
                                var data = {
                                    feedGiven: parseInt($form.find("#given").val()),
                                    feedLeft: parseInt($form.find("#left").val()),
                                    waterGiven: parseInt($form.find("#wgiven").val()),
                                    waterLeft: parseInt($form.find("#wleft").val()),
                                }
                                
                               if(!isNaN(data.feedGiven) && !isNaN(data.feedLeft)  && !isNaN(data.waterLeft)  && !isNaN(data.waterGiven)){
                                    if(data.feedLeft < data.feedGiven && data.waterLeft < data.waterGiven){
                                        $.showAlert({
                                            title: "Push Status",
                                            body: "Data has been updated successfully",
                                        })
                                        
                                        var myref = database.ref("Production/"+type+"/"+areaSelected+"/"+datatype1);
                                        myref.child(keys).update(data); 
                                    }

                                    else{
                                        $.showAlert({
                                            title: "Push failed",
                                            body: "leftover must not be greater than given"
                                        })
                                    }
                               }

                               else{
                                    $.showAlert({
                                        title: "Push failed",
                                        body: "Check if all the inputs are filled"
                                    })
                               }
                            }
                        }
                    })
                    modal.hide()
                })
            },
        })
    }
    
    else if(type == "BSF"){
        $.showModal({
            title : "BSF" + "-" + areaSelected,
            body : '<form><div class="form-group px-5">' +
            '<input type="text" step="any" min="0" name="Date" class="form-control updateDateData" id="updateDate" disabled value=' + datetime + '>' +
            '<div class="form-group px-5"><label for="updateDate" class="CLabel" id="update"></label></div>' +
            '<input type="number" step="any" min="0" name="amountEgg" class="form-control updateBSFProduction" id="updateAmountBSF" value=' +
            productionObj[type][areaSelected][keys].eggs + '>' +
            '<label for="updateAmountBSF" class="BSFLabel" id="updateproductionLabel">(Egg Produced)</label></div>' + 
            '<button type="submit" name="add" class="btn  btn-block updateDataBtn text-white">Update</button></form>',
            onCreate: function (modal) {
                // create event handler for form submit and handle values
                $(modal.element).on("click", "button[type='submit']", function (event) {
                    var $form = $(modal.element).find("form");
                    event.preventDefault()
                    $.showConfirm({
                        title: "Checking",
                        textTrue : "Yes",
                        textFalse : "No",
                        body:
                            "<b>Date:</b> " + $form.find("#updateDate").val() + "<br/>" +
                            "<b>Eggs Produced (grams):</b> " + $form.find("#updateAmountBSF").val(),
                        onSubmit: function(result){
                            if(result){
                                $.showAlert({
                                    title: "Push Status",
                                    body: "Data has been updated successfully",
                                })
                                var data = {
                                    eggs: parseInt($form.find("#updateAmountBSF").val()),
                                }
                                var myref = database.ref("Data/Production/"+type+"/"+areaSelected);
                                myref.child(keys).update(data);
                            }
                            else{
                                $.showAlert({
                                    title: "Push Status",
                                    body: "Data has not been added successfully"
                                })
                            }
                        }
                    })
                    modal.hide()
                })
            },
        })
    }

    else if(type == "BSFL"){
        $.showModal({
            title : "BSFL" + "-" + areaSelected,
            body : '<form><div class="form-group px-5">' +
            '<input type="text" step="any" min="0" name="Date" class="form-control updateDateData" id="updateDate" disabled value=' + datetime + '>' +
            '<div class="form-group px-5"><label for="updateDate" class="CLabel" id="update"></label></div>' +
            '<input type="number" step="any" min="0" name="amountEgg" class="form-control updateBSFProduction" id="updateAmountBSF" value=' +
            productionObj[type][areaSelected][keys].eggs + '>' +
            '<label for="updateAmountBSF" class="BSFLabel" id="updateproductionLabel">(Larvae Produced)</label></div>' + 
            '<button type="submit" name="add" class="btn  btn-block updateDataBtn text-white">Update</button></form>',
            onCreate: function (modal) {
                // create event handler for form submit and handle values
                $(modal.element).on("click", "button[type='submit']", function (event) {
                    var $form = $(modal.element).find("form");
                    event.preventDefault()
                    $.showConfirm({
                        title: "Checking",
                        textTrue : "Yes",
                        textFalse : "No",
                        body:
                            "<b>Date:</b> " + $form.find("#updateDate").val() + "<br/>" +
                            "<b>Eggs Produced (grams):</b> " + $form.find("#updateAmountBSF").val(),
                        onSubmit: function(result){
                            if(result){
                                $.showAlert({
                                    title: "Push Status",
                                    body: "Data has been updated successfully",
                                })
                                var data = {
                                    eggs: parseInt($form.find("#updateAmountBSF").val()),
                                }
                                var myref = database.ref("Data/Production/"+type+"/"+areaSelected);
                                myref.child(keys).update(data);
                            }
                            else{
                                $.showAlert({
                                    title: "Push Status",
                                    body: "Data has not been added successfully"
                                })
                            }
                        }
                    })
                    modal.hide()
                })
            },
        })
    }
}

var add2 = function(e){
    var d = new Date();
    var day = d.getDate().toString().padStart(2, "0");
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var date = year + "-" + month + "-" + day;
    console.log(date);
    if(type == "Chicken"){
        $.showModal({
            title : "Chicken" + "-" + areaSelected,
            body : '<form><div class="form-group px-5">' +
            '<input type="number" step="any" min="0" class="form-control addCProduction" name="healthy" id="healthy" required>' + 
            '<label for="healthy" class="CLabel" id="productionLabel">(Number of Healthy Chicken)</label></div>' + 

            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control addCProduction" name="sick" id="sick" required>' +
            '<label for="sick" class="CLabel" id="weightLabel">(Number of Sick Chicken)</label></div>' +

            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control addCProduction" name="injured" id="injured" required>' +
            '<label for="injured" class="CLabel" id="wgivenlabel">(Number of Injured Chicken)</label></div>' +

            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control addCProduction" name="cull" id="cull" required>' +
            '<label for="cull" class="CLabel" id="wleftoverlabel">(Number of Cull Chicken)</label></div>' +

            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control addCProduction" name="dead" id="dead" required>' +
            '<label for="dead" class="CLabel" id="sickLabel">(Number of dead Chicken)</label></div>' +

            '<div class="form-group px-5"><input type="text" step="any" min="0" class="form-control addCProduction" name="areaC" id="areaC" required value='+ areaSelected +'>' + 
            '<label for="areaC" class="CLabel" id="givenLabel">(Area)</label></div>' + 
            
            '<div class="form-group px-5"><input type="date" step="any" min="0" class="form-control addCProduction" name="date" id="date" required value='+ date + '>' + 
            '<label for="date" class="CLabel" id="updategivenLabel">(Date)</label></div>' + 
            '<button type="submit" name="add" class="btn  btn-block addDataBtn text-white">Add</button></form>',
            onCreate: function (modal) {
                // create event handler for form submit and handle values
                $(modal.element).on("click", "button[type='submit']", function (event) {
                    event.preventDefault()
                    var $form = $(modal.element).find("form")
                    $.showConfirm({
                        title: "Checking",
                        textTrue : "Yes",
                        textFalse : "No",
                        body:
                            "<b>Date:</b> " + $form.find("#date").val() + "<br/>" +
                            "<b>No. Of Healthy Chicken:</b> " + $form.find("#healthy").val() + "<br/>" +
                            "<b>No. Of Sick Chicken:</b> " + $form.find("#sick").val() + "<br/>" +
                            "<b>No. Of Injured Chicken:</b> " + $form.find("#injured").val() + "<br/>" +
                            "<b>No. Of Cull Chicken:</b> " + $form.find("#cull").val() + "<br/>" +
                            "<b>No. Of Dead Chicken:</b> " + $form.find("#dead").val() + "<br/>" +
                            "<b>Area:</b> " + $form.find("#areaC").val(),
                        onSubmit: function(result){
                            if(result){
                                date = $form.find("#date").val();
                                areaSelected = $form.find("#areaC").val();
                                var data = {
                                    healthy: parseInt($form.find("#healthy").val()),
                                    sick:  parseInt($form.find("#sick").val()),
                                    injured: parseInt($form.find("#injured").val()),
                                    cull:  parseInt($form.find("#cull").val()),
                                    dead:  parseInt($form.find("#dead").val()),
                                    // mortality:  parseInt($form.find("#mortality").val()),
                                    timestamp: new Date(date).getTime()
                                }

                                if(!isNaN(data.healthy) && !isNaN(data.sick)  && !isNaN(data.injured)  && !isNaN(data.cull)  && !isNaN(data.dead)){
                                    $.showAlert({
                                        title: "Push Status",
                                        body: "Data has been added successfully",
                                    })
                                    
                                    modal.hide()
                                    var myref = database.ref("Production/"+type+"/"+areaSelected+"/"+datatype2);
                                    myref.push(data);
                               }
                                
                                else{
                                    $.showAlert({
                                        title: "Push failed",
                                        body: "Check if all the inputs are filled"
                                    })
                                }
                            }
                        }
                    })
                })
            },
        })
    }
}

var remove2 = function(e){
    e.preventDefault();

    var index = $(this).parents("tr").find("td.id").text();
    var deleteIndex;

    for(var x = 0; x < Object.keys(productionObj[type][areaSelected][datatype2]).length; ++x){
        if(index - 1 == x){
            deleteIndex = Object.keys(productionObj[type][areaSelected][datatype2])[x];
        }
    }

    if(type == "Chicken"){
        $.showConfirm({
            title: "Are you sure",
            textTrue : "Yes",
            textFalse : "No",
            body: 
                "<b>Healthy Chicken:</b>" + productionObj[type][areaSelected][datatype2][deleteIndex].healthy + "<br/>" + 
                "<b>Injured Chicken:</b>" + productionObj[type][areaSelected][datatype2][deleteIndex].injured + "<br/>"+
                "<b>Sick Chicken:</b>" + productionObj[type][areaSelected][datatype2][deleteIndex].sick + "<br/>" + 
                "<b>Cull Chicken:</b>" + productionObj[type][areaSelected][datatype2][deleteIndex].cull + "<br/>" + 
                "<b>Dead Chicken:</b>" + productionObj[type][areaSelected][datatype2][deleteIndex].dead,
            onSubmit: function(result){
                if(result){
                    $.showAlert({
                        title: "Delete Status",
                        body: "Data has been deleted successfully",
                    })
                    var myref = database.ref("Production/"+type+"/"+areaSelected+"/"+datatype2);
                    myref.child(deleteIndex).remove();
					if (x == 1)
					{
					    datalistC2.innerHTML = "";
					}
                }
            }
        })
    }
}

var update2 = function(e){
    e.preventDefault();

    var index = $(this).parents("tr").find("td.id").text();
   
    var tableID = index;
    for(var x = 0; x < Object.keys(productionObj[type][areaSelected][datatype2]).length; ++x){
        if(tableID - 1 == x){
            keys = Object.keys(productionObj[type][areaSelected][datatype2])[x];
            var d = new Date(productionObj[type][areaSelected][datatype2][keys].timestamp);
            var options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
            var datetime = d.toLocaleString('en-us', options); 
        }
    }

    if(type == "Chicken"){
        $.showModal({
            title : "Chicken" + "-" + areaSelected,
            body : '<form><div class="form-group px-5">' +
            '<input type="text" step="any" min="0" name="Date" class="form-control updateDateData" id="updateDate" disabled value=' + datetime + '>' +
            '<label for="updateDate" class="CLabel" id="update"></label></div>' +

            '<div class="form-group px-5"><input type="number" step="any" min="0" name="healthy" class="form-control updateCProduction" id="healthy" value=' +
            productionObj[type][areaSelected][datatype2][keys].healthy + '>' +  
            '<label for="healthy" class="CLabel" id="updateproductionLabel">(Healthy Chicken)</label></div>' + 

            '<div class="form-group px-5"><input type="number" step="any" min="0" name="sick" class="form-control updateCProduction" id="sick" value=' +
            productionObj[type][areaSelected][datatype2][keys].sick + '>' +
            '<label for="sick" class="CLabel" id="updateweightLabel">(Sick Chicken)</label></div>' + 

            '<div class="form-group px-5"><input type="number" step="any" min="0" name="injured" class="form-control updateCProduction" id="injured" value=' +
            productionObj[type][areaSelected][datatype2][keys].injured + '>' +
            '<label for="injured" class="CLabel" id="updatesickLabel">(Injured Chicken)</label></div>' + 

            '<div class="form-group px-5"><input type="number" step="any" min="0" name="cull" class="form-control updateCProduction" id="cull" value=' +
            productionObj[type][areaSelected][datatype2][keys].cull + '>' +
            '<label for="cull" class="CLabel" id="updateruntLabel">(Cull Chicken)</label></div>' + 

            '<div class="form-group px-5"><input type="number" step="any" min="0" name="dead" class="form-control updateCProduction" id="dead" value=' +
            productionObj[type][areaSelected][datatype2][keys].dead + '>' +
            '<label for="dead" class="CLabel" id="areatable2Label">(Dead Chicken)</label></div>' + 

            '<button type="submit" name="add" class="btn  btn-block updateDataBtn text-white">Update</button></form>',
            onCreate: function (modal) {
                // create event handler for form submit and handle values
                $(modal.element).on("click", "button[type='submit']", function (event) {
                    var $form = $(modal.element).find("form");
                    event.preventDefault()
                    $.showConfirm({
                        title: "Checking",
                        textTrue : "Yes",
                        textFalse : "No",
                        body:
                            "<b>Date:</b> " + $form.find("#date").val() + "<br/>" +
                            "<b>No. Of Healthy Chicken:</b> " + $form.find("#healthy").val() + "<br/>" +
                            "<b>No. Of Sick Chicken:</b> " + $form.find("#sick").val() + "<br/>" +
                            "<b>No. Of Injured Chicken:</b> " + $form.find("#injured").val() + "<br/>" +
                            "<b>No. Of Cull Chicken:</b> " + $form.find("#cull").val() + "<br/>" +
                            "<b>No. Of Dead Chicken:</b> " + $form.find("#dead").val(),
                            
                        onSubmit: function(result){
                            if(result){
                                var data = {
                                    healthy: parseInt($form.find("#healthy").val()),
                                    injured: parseInt($form.find("#injured").val()),
                                    sick: parseInt($form.find("#sick").val()),
                                    cull: parseInt($form.find("#cull").val()),
                                    dead: parseInt($form.find("#dead").val()),
                                }
                                
                               if(!isNaN(data.healthy) && !isNaN(data.injured)  && !isNaN(data.sick)  && !isNaN(data.cull) && !isNaN(data.dead)){
                                    $.showAlert({
                                        title: "Push Status",
                                        body: "Data has been updated successfully",
                                    })
                                    
                                    var myref = database.ref("Production/"+type+"/"+areaSelected+"/"+datatype2);
                                    myref.child(keys).update(data); 
                               }

                               else{
                                    $.showAlert({
                                        title: "Push failed",
                                        body: "Check if all the inputs are filled"
                                    })
                               }
                            }
                        }
                    })
                    modal.hide()
                })
            },
        })
    }
 
}

$(document).on("click", "#addBtnC", add);
$(document).on('click', '.table-edit', update);
$(document).on('click', '.table-remove', remove);

$(document).on("click", "#addBtnC2", add2);
$(document).on('click', '.table-edit-table2', update2);
$(document).on('click', '.table-remove-table2', remove2);