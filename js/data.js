//select the table for chicken
let datalist = document.querySelector(".bodyData");
let dataHeader = document.querySelector(".bodyHeader");

var database = firebase.database();
var ref = database.ref("Data");   

let allObj = [];
let allKeys = [];

let type = document.getElementById("dataTitle").textContent;
let dropdown = document.querySelector("#chickenAreaData");
let areaSelected = "Area1";

ref.on("value", snap=>{
    var dataObj = snap.val();
    var keys = Object.keys(dataObj);

    if(allObj.length > 0){
        allObj.splice(0,allObj.length);
        allKeys.splice(0,allKeys.length);
    }

    for(var x = 0; x < keys.length; ++x){
        var k = keys[x];

        allObj.push(dataObj[k]);
        allKeys.push(Object.keys(allObj[x]));
    }

    bsfObj = allObj[0];
    bsfKeys = Object.keys(bsfObj);

    bsflObj = allObj[1];
    bsflKeys = Object.keys(bsflObj);
    
    chickenObj = allObj[2];
    chickenKeys = Object.keys(chickenObj);

    populateTables(type);
})

function populateTables(type){
    if(type == "Chicken"){
        let html = "";
        let rowData = "";

        let header = `
            <tr class="text-muted">
                <th>#</th>
                <th>Timestamp</th>
                <th>Temperature (°C)</th>
                <th>Humidity (%)</th>
                <th>pH</th>
                <th>Moisture</th>
                <th>Option</th>
            </tr>
        `;

        for(var x = 0; x < Object.keys(chickenObj[areaSelected]).length; ++x){
            var keys =  Object.keys(chickenObj[areaSelected])[x];
            
            var d = new Date(chickenObj[areaSelected][keys].timestamp);
            var options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
            var datetime = d.toLocaleString('en-us', options); 

            let tr = `
                <tr>
                    <td class="id">${x + 1}</td>
                    <td class="searchVar">${datetime}</td>
                    <td>${chickenObj[areaSelected][keys].temperature}</td>
                    <td>${chickenObj[areaSelected][keys].humidity}</td>
                    <td>${chickenObj[areaSelected][keys].ph}</td>
                    <td>${chickenObj[areaSelected][keys].moisture}</td>
                    <td>
                    <span class="table-remove"><button type="button" class="btn btn-outline-danger btn-sm" id="deleteBtn">&#10005;</button></span>
                    <span class="table-edit"><button type="button" class="btn btn-outline-warning btn-sm" data-toggle="tooltip" title="edit">&#9998;</button></span>
                    </td>
                </tr>
            `;
        
            rowData += tr;
        }
        dataHeader.innerHTML = header;
        datalist.innerHTML = rowData;

        for(var x = 0; x < chickenKeys.length; ++x){
            let optionslist = `
                <option value="Area${x + 1}" >Area ${x + 1}</option>
            `;
            html += optionslist;
        }
        dropdown.innerHTML = html;
    }

    else if(type == "BSF"){
        let html = "";
        let rowData = "";

        let header = `
            <tr class="text-muted">
                <th>#</th>
                <th>Timestamp</th>
                <th>Temperature (°C)</th>
                <th>Humidity (%)</th>
                <th>Light (LUX)</th>
                <th>Option</th>
            </tr>
        `;

        for(var x = 0; x < Object.keys(bsfObj[areaSelected]).length; ++x){
            var keys =  Object.keys(bsfObj[areaSelected])[x];

            var d = new Date(bsfObj[areaSelected][keys].timestamp);
            var options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
            var datetime = d.toLocaleString('en-us', options); 

            let tr =`
                <tr>
                    <td class="id">${x + 1}</td>
                    <td class="searchVar">${datetime}</td>
                    <td>${bsfObj[areaSelected][keys].temperature}</td>
                    <td>${bsfObj[areaSelected][keys].humidity}</td>
                    <td>${bsfObj[areaSelected][keys].light}</td>
                    <td>
                    <span class="table-remove"><button type="button" class="btn btn-outline-danger btn-sm" data-toggle="tooltip" title="delete">&#10005;</button></span>
                    <span class="table-edit"><button type="button" class="btn btn-outline-warning btn-sm" data-toggle="tooltip" title="edit">&#9998;</button></span>
                    </td>
                </tr>
            `;
            rowData += tr;
        }
        dataHeader.innerHTML = header;
        datalist.innerHTML = rowData;

        for(var x = 0; x < bsfKeys.length; ++x){
            let optionslist = `
                <option value="Area${x + 1}" >Area ${x + 1}</option>
            `;
            html += optionslist;
        }

        dropdown.innerHTML = html;
    }

    else if(type == "BSFL"){
        let html = "";
        let rowData = "";

        let header = `
            <tr class="text-muted">
                <th>#</th>
                <th>Timestamp</th>
                <th>Temperature (°C)</th>
                <th>pH</th>
                <th>Moisture</th>
                <th>Option</th>
            </tr>
        `;

        for(var x = 0; x < Object.keys(bsflObj[areaSelected]).length; ++x){
            var keys =  Object.keys(bsflObj[areaSelected])[x];

            var d = new Date(bsflObj[areaSelected][keys].timestamp);
            var options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
            var datetime = d.toLocaleString('en-us', options); 

            let tr =`
                <tr>
                    <td class="id">${x + 1}</td>
                    <td class="searchVar">${datetime}</td>
                    <td>${bsflObj[areaSelected][keys].temperature}</td>
                    <td>${bsflObj[areaSelected][keys].pH}</td>
                    <td>${bsflObj[areaSelected][keys].moisture}</td>
                    <td>
                    <span class="table-remove"><button type="button" class="btn btn-outline-danger btn-sm" data-toggle="tooltip" title="delete">&#10005;</button></span>
                    <span class="table-edit"><button type="button" class="btn btn-outline-warning btn-sm" data-toggle="tooltip" title="edit">&#9998;</button></span>
                    </td>
                </tr>
            `;

            rowData += tr;
        }
        
        datalist.innerHTML = rowData;
        dataHeader.innerHTML = header;

        for(var x = 0; x < bsflKeys.length; ++x){
            let optionslist = `
                <option value="Area${x + 1}" >Area ${x + 1}</option>
            `;
            html += optionslist;
        }

        dropdown.innerHTML = html;
    }

    $('[data-toggle="tooltip"]').tooltip({
		trigger : 'hover'
	});
	
	$('[data-toggle="tooltip"]').on('click', function () {
        $(this).tooltip('hide')
    });
}

$("#addBtn").click(function(){
    if(type == "Chicken"){
        $.showModal({
            title : "Chicken" + "-" + areaSelected,
            body: '<form id="addData"><div class="form-group px-5">' +
            '<input type="number" step="any" min="0" class="form-control addChickenData" name="Temperature" id="cTemp" required>' + 
            '<label for="cTemp" class="CLabel" id="tempLabelAdd">(Temperature)</label></div>' + 
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control addChickenData" name="Humidity" id="cHum" required>' +
            '<label for="cHum" class="CLabel" id="humidLabelAdd">(Humidity)</label></div>' + 
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control addChickenData" name="pH" id="cPh" required>' + 
            '<label for="cPh" class="CLabel" id="phLabelAdd">(ph value)</label></div>' + 
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control addChickenData" name="Moisture" id="cMoisture" required>' +
            '<label for="cMoisture" class="CLabel" id="moistureLabelAdd">(Moisture)</label></div>' +
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
                            "<b>pH:</b> " + $form.find("#cPh").val() + "<br/>" +
                            "<b>Moisture:</b> " + $form.find("#cMoisture").val(),
                        onSubmit: function(result){
                            if(result){
                                $.showAlert({
                                    title: "Push Status",
                                    body: "Data has been added successfully",
                                })
                                let data = {
                                    humidity: parseInt($form.find("#cHum").val()),
                                    moisture: parseInt($form.find("#cMoisture").val()),
                                    temperature: parseInt($form.find("#cTemp").val()),
                                    ph : parseInt($form.find("#cPh").val()),
                                    timestamp: new Date().getTime()
                                }

                                // chickenObj[areaSelected].push(data);
                                let myref = database.ref("Data/"+type+"/"+areaSelected);
                                myref.push(data);

                                areaSelected = "Area1";
                                populateTables(type);

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
                            if(result){
                                $.showAlert({
                                    title: "Push Status",
                                    body: "Data has been added successfully",
                                })
                                let data = {
                                    humidity: parseInt($form.find("#bsfHum").val()),
                                    light: parseInt($form.find("#bsfLux").val()),
                                    temperature: parseInt($form.find("#bsfTemp").val()),
                                    timestamp: new Date().getTime()
                                }
                                let myref = database.ref("Data/"+type+"/"+areaSelected);
                                myref.push(data);

                                areaSelected = "Area1";
                                populateTables(type);
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
            }
        })
    }

    else if(type == "BSFL"){
        $.showModal({
            title : "BSF Larvae" + "-" + areaSelected,
            body: '<form><div class="form-group px-5">' +
            '<input type="number" step="any" min="0" class="form-control addChickenData" name="Temperature" id="bsflTemp" required>' + 
            '<label for="bsflTemp" class="CLabel" id="tempLabelBSFLAdd">(Temperature)</label></div>' + 
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control addChickenData" name="ph" id="bsflPh" required>' + 
            '<label for="bsflPh" class="CLabel" id="PhLabelBSFLAdd">(pH value)</label></div>' +
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control addChickenData" name="moist" id="bsflMois" required>' +
            '<label for="bsflMois" class="CLabel" id="moistureLabelBSFLAdd">(Moisture)</label></div>' +
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
                            "<b>pH:</b> " + $form.find("#bsflPh").val() + "<br/>" +
                            "<b>Moisture:</b> " + $form.find("#bsflMois").val(),
                        onSubmit: function(result){
                            if(result){
                                $.showAlert({
                                    title: "Push Status",
                                    body: "Data has been added successfully",
                                })
                                let data = {
                                    pH: parseInt($form.find("#bsflPh").val()),
                                    temperature: parseInt($form.find("#bsflTemp").val()),
                                    moisture: parseInt($form.find("#bsflMois").val()),
                                    timestamp: new Date().getTime()
                                }
                                let myref = database.ref("Data/"+type+"/"+areaSelected);
                                myref.push(data);

                                areaSelected = "Area1";
                                populateTables(type);
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
            }
        })
    }
})

$("#dataPage li").click(function(){
    // document.getElementById("dataTitle").innerHTML =
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
    areaSelected = "Area1";
    populateTables(type);
})

//Remove data
var remove = function(e){
    e.preventDefault();

    var index = $(this).parents("tr").find("td.id").text();
    var deleteIndex;
    
    if(type == "Chicken"){
        for(var x = 0; x < Object.keys(chickenObj[areaSelected]).length; ++x){
            if(index-1 == x){
                deleteIndex = Object.keys(chickenObj[areaSelected])[x];
            }
        }
    
        $.showConfirm({
            title: "Are you sure",
            textTrue : "Yes",
            textFalse : "No",
            body: 
                "<b>Temperature:</b> " + chickenObj[areaSelected][deleteIndex].temperature + "<br/>" +
                "<b>Humidity:</b> " + chickenObj[areaSelected][deleteIndex].humidity+ "<br/>" +
                "<b>pH:</b> " + chickenObj[areaSelected][deleteIndex].ph + "<br/>" +
                "<b>Moisture:</b> " + chickenObj[areaSelected][deleteIndex].moisture,
            onSubmit: function(result){
                let myref = database.ref("Data/"+type+"/"+areaSelected);
                myref.child(deleteIndex).remove();
                if(chickenObj === null)
                {
                    datalist.innerHTML = "";
                }
                areaSelected = "Area1";
                populateTables(type);
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
                let myref = database.ref("Data/"+type+"/"+areaSelected);
                myref.child(deleteIndex).remove();
                if(chickenObj === null)
                {
                    datalist.innerHTML = "";
                }
                areaSelected = "Area1";
                populateTables(type);
            }
        })
        populateTables(type);
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
                "<b>pH:</b> " + bsflObj[areaSelected][deleteIndex].pH+ "<br/>" +
                "<b>Moisture:</b> " + bsflObj[areaSelected][deleteIndex].moisture,
            onSubmit: function(result){
                let myref = database.ref("Data/"+type+"/"+areaSelected);
                myref.child(deleteIndex).remove();
                if(chickenObj === null)
                {
                    datalist.innerHTML = "";
                }
                areaSelected = "Area1";
                populateTables(type);
            }
        })
        populateTables(type);
    }
}

$(document).on('click', '.table-remove', remove);

var tableID;

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
            '<div class="form-group px-5"><input type="number" step="any" min="0" name="pH" class="form-control updateChickenData" id="updatepH" value=' +
            chickenObj[areaSelected][keys].ph + '>' + 
            '<label for="updatepH" class="CLabel" id="phLabel">(ph value)</label></div>' +
            '<div class="form-group px-5"><input type="number" step="any" min="0" name="Moisture" class="form-control updateChickenData" id="updateMoisture" value=' +
            chickenObj[areaSelected][keys].moisture + '>' +
            '<label for="updateMoisture" class="CLabel" id="moistureLabel">(Moisture)</label></div>' +
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
                            "<b>pH:</b> " + $form.find("#updatepH").val() + "<br/>" +
                            "<b>Moisture:</b> " + $form.find("#updateMoisture").val(),
                        onSubmit: function(result){
                            if(result){
                                $.showAlert({
                                    title: "Push Status",
                                    body: "Data has been added successfully",
                                })
                                let data = {
                                    humidity: parseInt($form.find("#updateHum").val()),
                                    moisture: parseInt($form.find("#updateMoisture").val()),
                                    temperature: parseInt($form.find("#updateTemp").val()),
                                    ph : parseInt($form.find("#updatepH").val()),
                                }

                                // chickenObj[areaSelected].push(data);
                                let myref = database.ref("Data/"+type+"/"+areaSelected);
                                myref.child(keys).update(data);
                                // areaSelected = "Area1";
                                populateTables(type);
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
                            if(result){
                                $.showAlert({
                                    title: "Push Status",
                                    body: "Data has been added successfully",
                                })
                                let data = {
                                    humidity: parseInt($form.find("#updatebsfHum").val()),
                                    light: parseInt($form.find("#updatebsfLux").val()),
                                    temperature: parseInt($form.find("#updatebsfTemp").val()),
                                }
                                let myref = database.ref("Data/"+type+"/"+areaSelected);
                                myref.child(keys).update(data);
                                areaSelected = "Area1";
                                populateTables(type);
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
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control updateBSFLData" name="Humidity" id="updatebsflPh" value=' +
            bsflObj[areaSelected][keys].pH + '>' +  
            '<label for="updatebsflPh" class="CLabel" id="phLabelUpdateBSFL">(pH value)</label></div>' + 
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control updateBSFLData" name="LUX" id="updatebsflMois" value=' +
            bsflObj[areaSelected][keys].moisture + '>' +
            '<label for="updatebsflMois" class="CLabel" id="moisLabelUpdateBSFL">(Moisture)</label></div>' + 
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
                            "<b>pH:</b> " + $form.find("#updatebsflPh").val() + "<br/>" +
                            "<b>Moisture:</b> " + $form.find("#updatebsflMois").val(),
                        onSubmit: function(result){
                            if(result){
                                $.showAlert({
                                    title: "Push Status",
                                    body: "Data has been added successfully",
                                })
                                let data = {
                                    pH: parseInt($form.find("#updatebsflPh").val()),
                                    temperature: parseInt($form.find("#updatebsflTemp").val()),
                                    moisture: parseInt($form.find("#updatebsflMois").val()),
                                }
                                let myref = database.ref("Data/"+type+"/"+areaSelected);
                                myref.child(keys).update(data);
                                areaSelected = "Area1";
                                populateTables(type);
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

$(document).on('click', '.table-edit', update);

function dataAreaChange(){
    areaSelected = document.getElementById("chickenAreaData").value;
    
    if(type == "Chicken"){
        let rowData = "";

        for(var x = 0; x < Object.keys(chickenObj[areaSelected]).length; ++x){
            var keys =  Object.keys(chickenObj[areaSelected])[x];

            var d = new Date(chickenObj[areaSelected][keys].timestamp);
            var options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
            var datetime = d.toLocaleString('en-us', options); 

            let tr = `
                <tr>
                    <td class="id">${x + 1}</td>
                    <td class="searchVar">${datetime}</td>
                    <td>${chickenObj[areaSelected][keys].temperature}</td>
                    <td>${chickenObj[areaSelected][keys].humidity}</td>
                    <td>${chickenObj[areaSelected][keys].ph}</td>
                    <td>${chickenObj[areaSelected][keys].moisture}</td>
                    <td>
                    <span class="table-remove"><button type="button" class="btn btn-outline-danger btn-sm" data-toggle="tooltip" title="delete">&#10005;</button></span>
                    <span class="table-edit" data-toggle="modal" data-target="#editData"><button type="button" class="btn btn-outline-warning btn-sm" data-toggle="tooltip" title="edit">&#9998;</button></span>
                    </td>
                </tr>
            `;

            
            rowData += tr;
        }
        datalist.innerHTML = rowData;
    }

    else if(type == "BSF"){
        let rowData = "";

        for(var x = 0; x < Object.keys(bsfObj[areaSelected]).length; ++x){
            var keys =  Object.keys(bsfObj[areaSelected])[x];

            var d = new Date(bsfObj[areaSelected][keys].timestamp);
            var options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
            var datetime = d.toLocaleString('en-us', options); 

            let tr =`
                <tr>
                    <td class="id">${x + 1}</td>
                    <td class="searchVar">${datetime}</td>
                    <td>${bsfObj[areaSelected][keys].temperature}</td>
                    <td>${bsfObj[areaSelected][keys].humidity}</td>
                    <td>${bsfObj[areaSelected][keys].light}</td>
                    <td>
                    <span class="table-remove"><button type="button" class="btn btn-outline-danger btn-sm" data-toggle="tooltip" title="delete">&#10005;</button></span>
                    <span class="table-edit" data-toggle="modal" data-target="#editData"><button type="button" class="btn btn-outline-warning btn-sm" data-toggle="tooltip" title="edit">&#9998;</button></span>
                    </td>
                </tr>
            `;
            rowData += tr;
        }

        datalist.innerHTML = rowData;
    }

    else if(type == "BSFL"){
        let rowData = "";

        for(var x = 0; x < Object.keys(bsflObj[areaSelected]).length; ++x){
            var keys =  Object.keys(bsflObj[areaSelected])[x];

            var d = new Date(bsflObj[areaSelected][keys].timestamp);
            var options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
            var datetime = d.toLocaleString('en-us', options); 

            let tr =`
                <tr>
                    <td class="id">${x + 1}</td>
                    <td class="searchVar">${datetime}</td>
                    <td>${bsflObj[areaSelected][keys].temperature}</td>
                    <td>${bsflObj[areaSelected][keys].pH}</td>
                    <td>${bsflObj[areaSelected][keys].moisture}</td>
                    <td>
                    <span class="table-remove"><button type="button" class="btn btn-outline-danger btn-sm" data-toggle="tooltip" title="delete">&#10005;</button></span>
                    <span class="table-edit" data-toggle="modal" data-target="#editData"><button type="button" class="btn btn-outline-warning btn-sm" data-toggle="tooltip" title="edit">&#9998;</button></span>
                    </td>
                </tr>
            `;

            rowData += tr;
        }
        datalist.innerHTML = rowData;
    }
}
