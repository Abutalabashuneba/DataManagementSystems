if(sessionStorage.getItem("type") == "Admin"){
    document.getElementById("addBtn").style.display = "block";
}

var database = firebase.database();
var ref = database.ref("Data");

var type = document.getElementById("dataTitle").textContent;
var dropdown = document.querySelector("#chickenAreaData");
var areaSelected;
var datalistC = document.querySelector(".bodyDataC");
var dataheaderC = document.querySelector(".bodyHeaderC");
var datalistBSF = document.querySelector(".bodyDataBSF");
var dataHeaderBSF = document.querySelector(".bodyHeaderBSF");
var datalistBSFL = document.querySelector(".bodyDataBSFL");
var dataHeaderBSFL = document.querySelector(".bodyHeaderBSFL");

var dataObj;
var bsfObj;
var bsfkeys;
var bsflObj;
var bsflkeys;
var chickenObj;
var chickenkeys;

var tempPatt = /(^100$)|^[1-9]\d?$/;
var humidPatt = /(^100$)|^[1-9]\d?$/;
var moistPatt = /(^100$)|^[0-9]\d?$/;
var lightPatt = /^([1-9][0-9]{0,5}|100000)$/;

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
    
    populateTables();
    
})

function populateTables(){
    let html = "";
    let optionslist = "";
    let header = "";

    if(type == "Chicken"){
        header = `
                    <tr class="text-muted">
                        <th>#</th>
                        <th>Timestamp</th>
                        <th>Temperature (°C)</th>
                        <th>Humidity (%)</th>
                        <th>Light</th>
                `;
        
                if(sessionStorage.getItem("type") == "Admin"){
                    header += `
                        <th>Option</th>
                    </tr>
                    `;
                }
        
        dataheaderC.innerHTML = header;

        if(!$.fn.DataTable.isDataTable('#chickenTable-Area1')){
            $('#chickenTable-Area1').DataTable();
        }

        if(chickenkeys != undefined){
            if(chickenObj[areaSelected] == undefined){
                areaSelected = chickenkeys[0];
            }

            if($.fn.DataTable.isDataTable('#chickenTable-Area1')){
                $('#chickenTable-Area1').DataTable().clear().draw().destroy();
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
    
            var start = moment().subtract(31,"days");
            var end = moment();
    
            function dp(start, end){
                let rowData = "";
    
                $("#reportrange span").html(start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY"));
    
                for(var x = 0; x < Object.keys(chickenObj[areaSelected]).length; ++x){
                    var keys = Object.keys(chickenObj[areaSelected])[x];
                    var newstartdate = Date.parse(start.format("YYYY.MM.DD 00:00:00"));
                    var newenddate = Date.parse(end.format("YYYY.MM.DD 23:59:59"));
    
                    if(newstartdate <= chickenObj[areaSelected][keys].timestamp && newenddate >= chickenObj[areaSelected][keys].timestamp){
                        var d = new Date(chickenObj[areaSelected][keys].timestamp);
                        var options = { month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"};
                        var datetime = d.toLocaleString("en-us", options);
                        let tr = "";
    
                        tr = `
                            <tr>
                                <td class="id">${x + 1}</td>
                                <td class="searchVar">${datetime}</td>
                                <td>${chickenObj[areaSelected][keys].temperature}</td>
                                <td>${chickenObj[areaSelected][keys].humidity}</td>
                                <td>${chickenObj[areaSelected][keys].light}</td>
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
    
                        rowData += tr;
                    }
                    datalistC.innerHTML = rowData;
                }
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
            if(!$.fn.DataTable.isDataTable('#chickenTable-Area1')){
                $('#chickenTable-Area1').DataTable();
            }
        }

        else{
            if(dropdown) { dropdown.innerHTML = html; }
        }
    }

    else if(type == "BSF"){
        header = `
                <tr class="text-muted">
                    <th>#</th>
                    <th>Timestamp</th>
                    <th>Temperature (°C)</th>
                    <th>Humidity (%)</th>
                    <th>Light</th>
            `;

            if(sessionStorage.getItem("type") == "Admin"){
                header += `
                    <th>Option</th>
                </tr>
                `;
            }
        dataHeaderBSF.innerHTML = header;

        if(!$.fn.DataTable.isDataTable('#bsfTable-Area1')){
            $('#bsfTable-Area1').DataTable();
        }

        if(dataObj[type] != undefined){
            if($.fn.DataTable.isDataTable('#bsfTable-Area1')){
                $('#bsfTable-Area1').DataTable().clear().destroy();
            }
            
            if(bsfObj[areaSelected] == undefined) { 
                areaSelected = bsfkeys[0]; 
            }

            if(dataObj[type] != undefined){
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
    
                var start = moment().subtract(31,"days");
                var end = moment();
    
                function dp(start, end){
                    let rowData = "";
    
                    $("#reportrange span").html(start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY"));
                    if(bsfObj[areaSelected] != undefined){
                        for(var x = 0; x < Object.keys(bsfObj[areaSelected]).length; ++x){
                            var keys = Object.keys(bsfObj[areaSelected])[x];
                            var newstartdate = Date.parse(start.format("YYYY.MM.DD 00:00:00"));
                            var newenddate = Date.parse(end.format("YYYY.MM.DD 23:59:59"));
        
                            if(newstartdate <= bsfObj[areaSelected][keys].timestamp && newenddate >= bsfObj[areaSelected][keys].timestamp){
                                var d = new Date(bsfObj[areaSelected][keys].timestamp);
                                var options = { month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"};
                                var datetime = d.toLocaleString("en-us", options);
                                let tr = "";
        
                                tr = `
                                    <tr>
                                        <td class="id">${x + 1}</td>
                                        <td class="searchVar">${datetime}</td>
                                        <td>${bsfObj[areaSelected][keys].temperature}</td>
                                        <td>${bsfObj[areaSelected][keys].humidity}</td>
                                        <td>${bsfObj[areaSelected][keys].light}</td>
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
        
                                rowData += tr;
                            }
                            datalistBSF.innerHTML = rowData;
                        }
                    }
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
                if(!$.fn.DataTable.isDataTable('#bsfTable-Area1')){
                    $('#bsfTable-Area1').DataTable();
                }
            }

            else{
                if(dropdown) { dropdown.innerHTML = html; }
            }
        }
    }

    else if(type == "BSFL"){
        header = `
                <tr class="text-muted">
                    <th>#</th>
                    <th>Timestamp</th>
                    <th>Temperature (°C)</th>
                    <th>Humidity</th>
                    <th>Moisture</th>
                    <th>Soil Temperature</th>
            `;

            if(sessionStorage.getItem("type") == "Admin"){
                header += `
                    <th>Option</th>
                </tr>
                `;
            }
        dataHeaderBSFL.innerHTML = header;

        if(!$.fn.DataTable.isDataTable('#bsflTable-Area1')){
            $('#bsflTable-Area1').DataTable();
        }

        if(bsflkeys != undefined){
            if(bsflObj[areaSelected] == undefined) { areaSelected = bsflkeys[0]; }

            if($.fn.DataTable.isDataTable('#bsflTable-Area1')){
                $('#bsflTable-Area1').DataTable().clear().draw().destroy();
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

            var start = moment().subtract(31,"days");
            var end = moment();

            function dp(start, end){
                let rowData = "";

                $("#reportrange span").html(start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY"));

                for(var x = 0; x < Object.keys(bsflObj[areaSelected]).length; ++x){
                    var keys = Object.keys(bsflObj[areaSelected])[x];
                    var newstartdate = Date.parse(start.format("YYYY.MM.DD 00:00:00"));
                    var newenddate = Date.parse(end.format("YYYY.MM.DD 23:59:59"));

                    if(newstartdate <= bsflObj[areaSelected][keys].timestamp && newenddate >= bsflObj[areaSelected][keys].timestamp){
                        var d = new Date(bsflObj[areaSelected][keys].timestamp);
                        var options = { month: "2-digit", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"};
                        var datetime = d.toLocaleString("en-us", options);
                        let tr = "";

                        tr = `
                            <tr>
                                <td class="id">${x + 1}</td>
                                <td class="searchVar">${datetime}</td>
                                <td>${bsflObj[areaSelected][keys].temperature}</td>
                                <td>${bsflObj[areaSelected][keys].humidity}</td>
                                <td>${bsflObj[areaSelected][keys].moisture}</td>
                                <td>${bsflObj[areaSelected][keys].soilTemp}</td>
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

                        rowData += tr;
                    }
                    datalistBSFL.innerHTML = rowData;
                }
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
            if(!$.fn.DataTable.isDataTable('#bsflTable-Area1')){
                $('#bsflTable-Area1').DataTable();
            }
        }

        else{
            if(dropdown) { dropdown.innerHTML = html; }
        }
    }

    $('[data-toggle="tooltip"]').tooltip({
		trigger : 'hover'
	});
	
	$('[data-toggle="tooltip"]').on('click', function () {
        $(this).tooltip('hide')
    });
}

$("#dataPage li").click(function(){
    if($(this).children().attr("id") == "dataChickenBtn"){ 
        document.getElementById("dataTitle").innerHTML = "Chicken"; 
        $("#chickentab").show();
		$("#bsftab").hide();
		$("#bsfltab").hide();
    }

    else if($(this).children().attr("id") == "dataBSFBtn"){
        document.getElementById("dataTitle").innerHTML = "BSF";
        $("#chickentab").hide();
		$("#bsftab").show();
		$("#bsfltab").hide();
    }

    else if($(this).children().attr("id") == "dataBSFLBtn"){
        document.getElementById("dataTitle").innerHTML = "BSFL";
        $("#chickentab").hide();
		$("#bsftab").hide();
		$("#bsfltab").show();
    }

    type = document.getElementById("dataTitle").textContent;
    populateTables();
})

function dataAreaChange(){
    areaSelected = document.getElementById("chickenAreaData").value;
    
    populateTables();
}

var remove = function(e){
    e.preventDefault();

    var index = $(this).parents("tr").find("td.id").text();
    var deleteIndex;

    if(type == "Chicken"){
        for(var x = 0; x < Object.keys(chickenObj[areaSelected]).length; ++x){
            if(index - 1 == x) { deleteIndex = Object.keys(chickenObj[areaSelected])[x]; }
        }

        $.showConfirm({
            title: "Are you sure",
            textTrue : "Yes",
            textFalse : "No",
            body: 
                "<b>Temperature:</b> " + chickenObj[areaSelected][deleteIndex].temperature + "<br/>" +
                "<b>Humidity:</b> " + chickenObj[areaSelected][deleteIndex].humidity+ "<br/>" +
                "<b>Light:</b> " + chickenObj[areaSelected][deleteIndex].light,
            onSubmit: function(result){
                if(result){
                    $.showAlert({
                        title : "Delete status",
                        body : "Data has been deleted successfully"
                    })

                    let myref = database.ref("Data/"+type+"/"+areaSelected);
                    myref.child(deleteIndex).remove();
                }
            }
        })
    }

    else if(type == "BSF"){
        for(var x = 0; x < Object.keys(bsfObj[areaSelected]).length; ++x){
            if(index-1 == x){
                deleteIndex = Object.keys(bsfObj[areaSelected])[x];
            }
        }
    
        $.showConfirm({
            title: "Are you sure",
            textTrue : "Yes",
            textFalse : "No",
            body: 
                "<b>Temperature:</b> " + bsfObj[areaSelected][deleteIndex].temperature + "<br/>" +
                "<b>Humidity:</b> " + bsfObj[areaSelected][deleteIndex].humidity+ "<br/>" +
                "<b>Lux:</b> " + bsfObj[areaSelected][deleteIndex].light,
            onSubmit: function(result){
                if(result){
                    $.showAlert({
                        title : "Delete status",
                        body : "Data has been deleted successfully"
                    })

                    let myref = database.ref("Data/"+type+"/"+areaSelected);
                    myref.child(deleteIndex).remove();
                }
            }
        })
    }

    else if(type = "BSFL"){
        for(var x = 0; x < Object.keys(bsflObj[areaSelected]).length; ++x){
            if(index-1 == x){
                deleteIndex = Object.keys(bsflObj[areaSelected])[x];
            }
        }
    
        $.showConfirm({
            title: "Are you sure",
            textTrue : "Yes",
            textFalse : "No",
            body: 
                "<b>Temperature:</b> " + bsflObj[areaSelected][deleteIndex].temperature + "<br/>" +
                "<b>Humidity:</b> " + bsflObj[areaSelected][deleteIndex].humidity+ "<br/>" +
                "<b>Moisture:</b> " + bsflObj[areaSelected][deleteIndex].moisture+ "<br/>" +
                "<b>Soil Temperature:</b> " + bsflObj[areaSelected][deleteIndex].soilTemp,
            onSubmit: function(result){
                if(result){
                    $.showAlert({
                        title : "Delete status",
                        body : "Data has been deleted successfully"
                    })

                    let myref = database.ref("Data/"+type+"/"+areaSelected);
                    myref.child(deleteIndex).remove();
                }
            }
        })
    }
}

var update = function(e){
    e.preventDefault();

    var index = $(this).parents("tr").find("td.id").text();

    tableID = index;
    if(type == "Chicken"){
        for(var x = 0; x < Object.keys(chickenObj[areaSelected]).length; ++x){
            if(tableID-1 == x){
                var keys = Object.keys(chickenObj[areaSelected])[x];
                var d = new Date(chickenObj[areaSelected][keys].timestamp); //change the format of timestamp to be readable
                var options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
                var datetime = d.toLocaleString('en-us', options); //format the time 
            }
        }
        $.showModal({
            title : "Chicken" + "-" + areaSelected,
            body: '<form><div class="form-group px-5">' + 
            '<input type="text" step="any" min="0" name="Date" class="form-control updateDateData" id="updateDate" disabled value=' + datetime + '>' +
            '<label for="updateDate" class="CLabel" id="dateLabel"></label></div>' +
            '<div class="form-group px-5"><input type="number" step="any" min="0" name="Temperature" class="form-control updateChickenData" id="updateTemp" value=' +
            chickenObj[areaSelected][keys].temperature + '>' +
            '<label for="updateTemp" class="CLabel" id="tempLabel">(Temperature)</label></div>' +
            '<div class="form-group px-5"><input type="number" step="any" min="0" name="Humidity" class="form-control updateChickenData" id="updateHum" value=' +
            chickenObj[areaSelected][keys].humidity +'>' +
            '<label for="updateHum" class="CLabel" id="humidLabel">(Humidity)</label></div>' + 
            '<div class="form-group px-5"><input type="number" step="any" min="0" name="pH" class="form-control updateChickenData" id="updateLight" value=' +
            chickenObj[areaSelected][keys].light + '>' + 
            '<label for="updateLight" class="CLabel" id="phLabel">(Light Lux)</label></div>' +
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
                            "<b>Temperature:</b> " + $form.find("#updateTemp").val() + "<br/>" +
                            "<b>Humidity:</b> " + $form.find("#updateHum").val() + "<br/>" +
                            "<b>Light:</b> " + $form.find("#updateLight").val(),
                        onSubmit: function(result){
                            var errMSG = "";
                            if(result){
                                var tempCheck = tempPatt.test($form.find("#updateTemp").val());
                                var humidCheck = humidPatt.test($form.find("#updateHum").val());
                                var lightCheck = lightPatt.test($form.find("#updateLight").val());

                                let data = {
                                    humidity: parseInt($form.find("#updateHum").val()),
                                    light: parseInt($form.find("#updateLight").val()),
                                    temperature: parseInt($form.find("#updateTemp").val()),
                                }
                                
                                if(!isNaN(data.temperature) && !isNaN(data.light) && !isNaN(data.temperature)){
                                    if(!tempCheck){
                                        errMSG += "Temperature range 1~100<br/>";
                                    }

                                    if(!humidCheck){
                                        errMSG += "Humidity range 1~100<br/>";
                                    }

                                    if(!lightCheck){
                                        errMSG += "light range 1~99999<br/>";
                                    }


                                    if(tempCheck && humidCheck && lightCheck){
                                        $.showAlert({
                                            title: "Push Status",
                                            body: "Data has been added successfully",
                                        })
                                        modal.hide();
                                        let myref = database.ref("Data/"+type+"/"+areaSelected);
                                        myref.child(keys).update(data);
                                    }

                                    else{
                                        $.showAlert({
                                            title: "Update failed",
                                            body: errMSG
                                        })
                                    }
                                }

                                else{
                                    $.showAlert({
                                        title : "Update failed",
                                        body : "Please check if all inputs are filled"
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
        for(var x = 0; x < Object.keys(bsfObj[areaSelected]).length; ++x){
            if(tableID-1 == x){
                var keys = Object.keys(bsfObj[areaSelected])[x];
                var d = new Date(bsfObj[areaSelected][keys].timestamp); //change the format of timestamp to be readable
                var options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
                var datetime = d.toLocaleString('en-us', options); //format the time 
            }
        }
        $.showModal({
            title : "BSF" + "-" + areaSelected,
            body: '<form><div class="form-group px-5">' +
            '<input type="text" step="any" min="0" name="Date" class="form-control updateDateData" id="updateDateBSF" disabled value=' + datetime + '>' + 
            '<label for="updateDateBSF" class="CLabel" id="dateLabel"></label></div>' +
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control updateBSFData" name="Temperature" id="updatebsfTemp" value=' +
            bsfObj[areaSelected][keys].temperature + '>' +
            '<label for="updatebsfTemp" class="CLabel" id="tempLabelUpdate">(Temperature)</label></div>' + 
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control updateBSFData" name="Humidity" id="updatebsfHum" value=' +
            bsfObj[areaSelected][keys].humidity + '>' +
            '<label for="updatebsfHum" class="CLabel" id="humidLabelUpdate">(Humidity)</label></div>' + 
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control updateBSFData" name="LUX" id="updatebsfLux" value=' +
            bsfObj[areaSelected][keys].light + '>' + 
            '<label for="updatebsfLux" class="CLabel" id="luxLabelUpdate">(LUX value)</label></div>' +
            '<button type="submit" name="add" class="btn  btn-block addDataBtn text-white">Update</button></form>',
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
                            "<b>Date:</b> " + $form.find("#updateDateBSF").val() + "<br/>" +
                            "<b>Temperature:</b> " + $form.find("#updatebsfTemp").val() + "<br/>" +
                            "<b>Humidity:</b> " + $form.find("#updatebsfHum").val() + "<br/>" +
                            "<b>Light:</b> " + $form.find("#updatebsfLux").val(),
                        onSubmit: function(result){
                            var errBSFMSG = "";
                            if(result){
                                var humidBSFCheck = humidPatt.test($form.find("#updatebsfHum").val());
                                var tempBSFCheck = tempPatt.test($form.find("#updatebsfTemp").val());
                                var lightBSFCheck = lightPatt.test($form.find("#updatebsfLux").val());
                                
                                let data = {
                                    humidity: parseInt($form.find("#updatebsfHum").val()),
                                    light: parseInt($form.find("#updatebsfLux").val()),
                                    temperature: parseInt($form.find("#updatebsfTemp").val()),
                                }

                                if(!isNaN(data.temperature) && !isNaN(data.humidity) && !isNaN(data.light)){
                                    if(!humidBSFCheck){
                                        errBSFMSG += "Humidity range 1~100<br/>";
                                    }

                                    if(!tempBSFCheck){
                                        errBSFMSG += "Temperature range 1~100<br/>";
                                    }

                                    if(!lightBSFCheck){
                                        errBSFMSG += "light range 1~99999<br/>";
                                    }

                                    if(humidBSFCheck && tempBSFCheck && lightBSFCheck){
                                        $.showAlert({
                                            title: "Push Status",
                                            body: "Successfully update the data",
                                        })
                                        modal.hide();
                                        let myref = database.ref("Data/"+type+"/"+areaSelected);
                                        myref.child(keys).update(data);
                                    }

                                    else{
                                        $.showAlert({
                                            title: "Update status",
                                            body: errBSFMSG
                                        })
                                    }
                                }

                                else{
                                    $.showAlert({
                                        title: "Update Status",
                                        body: "Check if all inputs are filled"
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
        for(var x = 0; x < Object.keys(bsflObj[areaSelected]).length; ++x){
            if(tableID-1 == x){
                var keys = Object.keys(bsflObj[areaSelected])[x];
                var d = new Date(bsflObj[areaSelected][keys].timestamp); //change the format of timestamp to be readable
                var options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
                var datetime = d.toLocaleString('en-us', options); //format the time 
            }
        }
        $.showModal({
            title : "BSF Larvae" + "-" + areaSelected,
            body: '<form><div class="form-group px-5">' +
            '<input type="text" step="any" min="0" name="Date" class="form-control updateDateData" id="updateDateBSFL" disabled value=' + datetime + '>' +
            '<label for="updateDateBSFL" class="CLabel" id="dateLabel"></label></div>' +
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control updateBSFLData" name="Temperature" id="updatebsflTemp" value=' +
            bsflObj[areaSelected][keys].temperature + '>' +
            '<label for="updatebsflTemp" class="CLabel" id="tempLabelUpdateBSFL">(Temperature)</label></div>' +
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control updateBSFLData" name="Humidity" id="updatebsflhum" value=' +
            bsflObj[areaSelected][keys].humidity + '>' +  
            '<label for="updatebsflhum" class="CLabel" id="phLabelUpdateBSFL">(Humidity)</label></div>' + 
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control updateBSFLData" name="LUX" id="updatebsflMois" value=' +
            bsflObj[areaSelected][keys].moisture + '>' +
            '<label for="updatebsflMois" class="CLabel" id="moisLabelUpdateBSFL">(Moisture)</label></div>' + 
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control updateBSFLData" name="soil" id="updatebsflSoil" value=' +
            bsflObj[areaSelected][keys].soilTemp + '>' +
            '<label for="updatebsflSoil" class="CLabel" id="soilLabelUpdateBSFL">(Soil Temperature)</label></div>' +
            '<button type="submit" name="add" class="btn  btn-block addDataBtn text-white">Update</button></form>',
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
                            "<b>Date:</b> " + $form.find("#updateDateBSFL").val() + "<br/>" +
                            "<b>Temperature:</b> " + $form.find("#updatebsflTemp").val() + "<br/>" +
                            "<b>Humidity:</b> " + $form.find("#updatebsflhum").val() + "<br/>" +
                            "<b>Moisture:</b> " + $form.find("#updatebsflMois").val() + "<br/>" +
                            "<b>Soil Temperature:</b> " + $form.find("#updatebsflSoil").val(),
                        onSubmit: function(result){
                            var errBSFLMSG = "";
                            if(result){
                                var tempBSFLCheck = tempPatt.test($form.find("#updatebsflTemp").val());
                                var humidCheck = humidPatt.test($form.find("#updatebsflhum").val());
                                var moistBSFLCheck = moistPatt.test($form.find("#updatebsflMois").val());
                                var soilBSFLCheck = tempPatt.test($form.find("#updatebsflSoil").val());

                                let data = {
                                    humidity: parseInt($form.find("#updatebsflhum").val()),
                                    temperature: parseInt($form.find("#updatebsflTemp").val()),
                                    moisture: parseInt($form.find("#updatebsflMois").val()),
                                    soilTemp: parseInt($form.find("#updatebsflSoil").val()),
                                }
                                
                                if(!isNaN(data.temperature) && !isNaN(data.humidity) && !isNaN(data.moisture) && !isNaN(data.soilTemp)){
                                    if(!tempBSFLCheck){
                                        errBSFLMSG += "Temperature range 1~100<br/>"; 
                                    }

                                    if(!humidCheck){
                                        errBSFLMSG += "Humidity range 1~100<br/>";
                                    }

                                    if(!moistBSFLCheck){
                                        errBSFLMSG += "Moisture range 1~100<br/>"; 
                                    }

                                    if(!soilBSFLCheck){
                                        errBSFLMSG += "Soil temperature range 1~100<br/>"; 
                                    }

                                    if(tempBSFLCheck && humidCheck && moistBSFLCheck && soilBSFLCheck){
                                        $.showAlert({
                                            title: "Push Status",
                                            body: "Data has been added successfully",
                                        })
                                        modal.hide();
                                        let myref = database.ref("Data/"+type+"/"+areaSelected);
                                        myref.child(keys).update(data);
                                    }

                                    else{
                                        $.showAlert({
                                            title: "Update Status",
                                            body: errBSFLMSG
                                        })
                                    }
                                }
                                else{
                                    $.showAlert({
                                        title: "Update Status",
                                        body: "Please check if all inputs are filled"
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

var add = function(e){
    if(type == "Chicken"){
        $.showModal({
            title : "Chicken" + "-" + areaSelected,
            body: '<form><div class="form-group px-5">' +
            '<input type="number" step="any" min="0" class="form-control addChickenData" name="Temperature" id="cTemp" required>' + 
            '<label for="cTemp" class="CLabel" id="tempLabelAdd">(Temperature)</label></div>' + 
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control addChickenData" name="Humidity" id="cHum" required>' +
            '<label for="cHum" class="CLabel" id="humidLabelAdd">(Humidity)</label></div>' + 
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control addChickenData" name="pH" id="cLight" required>' + 
            '<label for="cLight" class="CLabel" id="phLabelAdd">(Light Lux)</label></div>' + 
            '<div class="form-group px-5"><input type="text" step="any" min="0" class="form-control addChickenData" name="area" id="cArea" value=' +
            areaSelected + '>' +
            '<label for="cArea" class="CLabel" id="moistureLabelAdd">(Area)</label></div>' +
            '<button type="submit" name="add" class="btn  btn-block addDataBtn text-white">Add</button></form></div>',
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
                            "<b>Temperature:</b> " + $form.find("#cTemp").val() + "<br/>" +
                            "<b>Humidity:</b> " + $form.find("#cHum").val() + "<br/>" +
                            "<b>Light:</b> " + $form.find("#cLight").val() + "<br/>" + 
                            "<b>Area:</b>" + $form.find("#cArea").val(),
                        onSubmit: function(result){
                            var errorMSG = "";
                            if(result){
                                var tempCheck = tempPatt.test($form.find("#cTemp").val());
                                var humidCheck = humidPatt.test($form.find("#cHum").val());
                                var lightCheck = lightPatt.test($form.find("#cLight").val());
                                areaSelected = $form.find("#cArea").val();
                                let data = {
                                    humidity: parseInt($form.find("#cHum").val()),
                                    light: parseInt($form.find("#cLight").val()),
                                    temperature: parseInt($form.find("#cTemp").val()),
                                    timestamp: new Date().getTime()
                                }

                                if(!isNaN(data.humidity) && !isNaN(data.light) && !isNaN(data.temperature)){
                                    if(!tempCheck){
                                        errorMSG += "Temperature range 1~100<br/>";
                                    }

                                    if(!humidCheck){
                                        errorMSG += "Humidity range 1~100<br/>";
                                    }

                                    if(!lightCheck){
                                        "Light range 1~99999<br/>";
                                    }

                                    if(tempCheck && humidCheck && lightCheck){
                                        $.showAlert({
                                            title: "Push Status",
                                            body: "Data has been added successfully",
                                        })

                                        modal.hide()
                                        let myref = database.ref("Data/"+type+"/"+areaSelected);
                                        myref.push(data);
                                    }

                                    else{
                                        $.showAlert({
                                            title: "Push failed",
                                            body: errorMSG
                                        })
                                    }
                                }
                                else{
                                    $.showAlert({
                                        title: "Push failed",
                                        body: "Check if all inputs are filled"
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
        $.showModal({
            title : "BSF" + "-" + areaSelected,
            body: '<form><div class="form-group px-5">' +
            '<input type="number" step="any" min="0" class="form-control addChickenData" name="Temperature" id="bsfTemp" required>' + 
            '<label for="bsfTemp" class="CLabel" id="bsftempLabelAdd">(Temperature)</label></div>' +
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control addChickenData" name="Humidity" id="bsfHum" required>' +
            '<label for="bsfHum" class="CLabel" id="bsfhumidLabelAdd">(Humidity)</label></div>' +
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control addChickenData" name="LUX" id="bsfLux" required>' +
            '<label for="bsfPh" class="CLabel" id="bsflightLabelAdd">(LUX value)</label></div>' + 
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
                            "<b>Temperature:</b> " + $form.find("#bsfTemp").val() + "<br/>" +
                            "<b>Humidity:</b> " + $form.find("#bsfHum").val() + "<br/>" +
                            "<b>Lux:</b> " + $form.find("#bsfLux").val(),
                        onSubmit: function(result){
                            var errorBSFMSG = "";
                            if(result){
                                var tempBSFCheck = tempPatt.test($form.find("#bsfTemp").val());
                                var humidBSFCheck = humidPatt.test($form.find("#bsfHum").val());
                                var lightBSFCheck = lightPatt.test($form.find("#bsfLux").val());

                                let data = {
                                    humidity: parseInt($form.find("#bsfHum").val()),
                                    light: parseInt($form.find("#bsfLux").val()),
                                    temperature: parseInt($form.find("#bsfTemp").val()),
                                    timestamp: new Date().getTime()
                                }

                                if(!isNaN(data.humidity) && !isNaN(data.light) && !isNaN(data.temperature)){
                                    if(!tempBSFCheck){                                        
                                        errorBSFMSG += "Temperature range 1~100<br/>";
                                    }

                                    if(!humidBSFCheck){                                        
                                        errorBSFMSG += "Humidity range 1~100<br/>";
                                    }

                                    if(!lightBSFCheck){                                        
                                        errorBSFMSG += "Light range 1~99999<br/>";
                                    }

                                    if(tempBSFCheck && humidBSFCheck && lightBSFCheck){
                                        $.showAlert({
                                            title: "Push Status",
                                            body: "Data has been added successfully",
                                        })

                                        modal.hide()
                                        let myref = database.ref("Data/"+type+"/"+areaSelected);
                                        myref.push(data);
                                    }

                                    else{
                                        $.showAlert({
                                            title: "Push failed",
                                            body: errorBSFMSG
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
            }
        })
    }

    else if(type == "BSFL"){
        $.showModal({
            title : "BSF Larvae" + "-" + areaSelected,
            body: '<form><div class="form-group px-5">' +
            '<input type="number" step="any" min="0" class="form-control addChickenData" name="Temperature" id="bsflTemp" required>' + 
            '<label for="bsflTemp" class="CLabel" id="tempLabelBSFLAdd">(Temperature)</label></div>' + 
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control addChickenData" name="hum" id="bsflHum" required>' + 
            '<label for="bsflHum" class="CLabel" id="PhLabelBSFLAdd">(Humidity)</label></div>' +
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control addChickenData" name="moist" id="bsflMois" required>' +
            '<label for="bsflMois" class="CLabel" id="moistureLabelBSFLAdd">(Moisture)</label></div>' +
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control addChickenData" name="soilTemp" id="soilTemp" required>' +
            '<label for="soilTemp" class="CLabel" id="soilTempLabelBSFLAdd">(Soil Temperature)</label></div>' +
            '<div class="form-group px-5"><input type="text" step="any" min="0" class="form-control addChickenData" name="bArea" id="bArea" required value='+ areaSelected + '>' +
            '<label for="bArea" class="CLabel" id="areaLabelBSFLAdd">(Area)</label></div>' +
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
                            "<b>Temperature:</b> " + $form.find("#bsflTemp").val() + "<br/>" +
                            "<b>Humidity:</b> " + $form.find("#bsflHum").val() + "<br/>" +
                            "<b>Moisture:</b> " + $form.find("#bsflMois").val() + "<br/>" +
                            "<b>Soil Temperature:</b> " + $form.find("#soilTemp").val() + "<br/>" +
                            "<b>Area:</b> " + $form.find("#bArea").val(),
                        onSubmit: function(result){
                            var errorBSFLMSG = "";
                            areaSelected = $form.find("#bArea").val();
                            if(result){
                                var tempBSFLCheck = tempPatt.test($form.find("#bsflTemp").val());
                                var humidCheck = humidPatt.test($form.find("#bsflHum").val());
                                var moistBSFLCheck = moistPatt.test($form.find("#bsflMois").val());
                                var soilBSFLCheck = tempPatt.test($form.find("#soilTemp").val());

                                let data = {
                                    humidity: parseInt($form.find("#bsflHum").val()),
                                    temperature: parseInt($form.find("#bsflTemp").val()),
                                    moisture: parseInt($form.find("#bsflMois").val()),
                                    soilTemp : parseInt($form.find("#soilTemp").val()),
                                    timestamp: new Date().getTime()
                                }

                                if(!isNaN(data.humidity) && !isNaN(data.temperature) && !isNaN(data.moisture) && !isNaN(data.soilTemp)){
                                    if(!tempBSFLCheck){
                                        errBSFLMSG += "Temperature range 1~100<br/>"; 
                                    }

                                    if(!humidCheck){
                                        errBSFLMSG += "Humidity range 1~100<br/>";
                                    }

                                    if(!moistBSFLCheck){
                                        errBSFLMSG += "Moisture range 1~100<br/>"; 
                                    }

                                    if(!soilBSFLCheck){
                                        errBSFLMSG += "Soil temperature range 1~100<br/>"; 
                                    }

                                    if(tempBSFLCheck && humidCheck && moistBSFLCheck && soilBSFLCheck){
                                        $.showAlert({
                                            title: "Push Status",
                                            body: "Data has been added successfully",
                                        })
                                        modal.hide()
                                        let myref = database.ref("Data/"+type+"/"+areaSelected);
                                        myref.push(data);
                                    }

                                    else{
                                        $.showAlert({
                                            title: "Push failed",
                                            body: errorBSFLMSG
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
            }
        })
    }
}

$(document).on("click", ".table-remove", remove);
$(document).on("click", ".table-edit", update);
$(document).on("click", "#addBtn", add);
