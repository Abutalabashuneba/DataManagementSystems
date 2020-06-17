//select the table for chicken
var datalistC = document.querySelector(".bodyDataC");
var datalistBSF = document.querySelector(".bodyDataBSF");
var datalistBSFL = document.querySelector(".bodyDataBSFL");

var dataHeaderC = document.querySelector(".bodyHeaderC");
var dataHeaderBSF = document.querySelector(".bodyHeaderBSF");
var dataHeaderBSFL = document.querySelector(".bodyHeaderBSFL");

var database = firebase.database();
var ref = database.ref("Data");   

var allObj = [];
var allKeys = [];

var bsfObj;
var bsflObj;
var chickenObj;

var tempPatt = /(^100$)|^[1-9]\d?$/;
var humidPatt = /(^100$)|^[1-9]\d?$/;
var phPatt = /\b(0?[1-9]|1[0-4])\b/;
var moistPatt = /(^100$)|^[1-9]\d?$/;
var lightPatt = /^([1-9][0-9]{0,5}|100000)$/;

var type = document.getElementById("dataTitle").textContent;
var dropdown = document.querySelector("#chickenAreaData");
var areaSelected = "Area1";

ref.on("value", snap=>{
    var dataObj = snap.val();
    var keys = Object.keys(dataObj);

    if(allObj.length > 0){
        allObj.splice(0,allObj.length);
        allKeys.splice(0,allKeys.length);
    }

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
    
    bsfKeys = Object.keys(bsfObj);
    bsflKeys = Object.keys(bsflObj);
    chickenKeys = Object.keys(chickenObj);

    populateTables();
})

function populateTables(){
    if(type == "Chicken"){
        if(chickenObj[areaSelected] == undefined){
            areaSelected = "Area1";
        }

        let html = "";
        let header = "";
        let rowData = "";

        if(sessionStorage.getItem("type") == "Admin"){
            header = `
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
        }else{
            header = `
            <tr class="text-muted">
                <th>#</th>
                <th>Timestamp</th>
                <th>Temperature (°C)</th>
                <th>Humidity (%)</th>
                <th>pH</th>
                <th>Moisture</th>
            </tr>
            `;
        }
        var start = moment().subtract(31, 'days');
        var end = moment();
        function cb(start, end) {
		
		let rowData = "";
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        for(var x = 0; x < Object.keys(chickenObj[areaSelected]).length; ++x){
            var keys =  Object.keys(chickenObj[areaSelected])[x];
			var newstartdate = Date.parse(start.format('YYYY.MM.DD 00:00:00'));
			
			var newenddate = Date.parse(end.format('YYYY.MM.DD 23:59:59'));
            if (newstartdate <= chickenObj[areaSelected][keys].timestamp && newenddate >= chickenObj[areaSelected][keys].timestamp)
		{
            var d = new Date(chickenObj[areaSelected][keys].timestamp);
            var options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
            var datetime = d.toLocaleString('en-us', options); 
            let tr = "";
            if(sessionStorage.getItem("type") == "Admin"){
                tr = `
                <tr>
                    <td class="id">${x + 1}</td>
                    <td class="searchVar">${datetime}</td>
                    <td>${chickenObj[areaSelected][keys].temperature}</td>
                    <td>${chickenObj[areaSelected][keys].humidity}</td>
                    <td>${chickenObj[areaSelected][keys].ph}</td>
                    <td>${chickenObj[areaSelected][keys].moisture}</td>
                    <td>
                    <span class="table-remove"><button type="button" class="btn btn-outline-danger btn-sm" id="deleteBtn" data-toggle="tooltip" title="delete">&#10005;</button></span>
                    <span class="table-edit"><button type="button" class="btn btn-outline-warning btn-sm" data-toggle="tooltip" title="edit">&#9998;</button></span>
                    </td>
                </tr>
                `;
            }

            else{
                tr = `
                <tr>
                    <td class="id">${x + 1}</td>
                    <td class="searchVar">${datetime}</td>
                    <td>${chickenObj[areaSelected][keys].temperature}</td>
                    <td>${chickenObj[areaSelected][keys].humidity}</td>
                    <td>${chickenObj[areaSelected][keys].ph}</td>
                    <td>${chickenObj[areaSelected][keys].moisture}</td>
                </tr>
                `;
            }
            rowData += tr;
        }}
        datalistC.innerHTML = rowData;
	}
    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);

    cb(start, end);
        dataHeaderC.innerHTML = header;

        for(var x = 0; x < chickenKeys.length; ++x){
            let optionslist = "";
            if(areaSelected == `${chickenKeys[x]}`){
                optionslist = `
                    <option value="${chickenKeys[x]}" selected>${chickenKeys[x]}</option>
                `;
            }

            else{
                optionslist = `
                    <option value="${chickenKeys[x]}" >${chickenKeys[x]}</option>
                `;
            }
            html += optionslist;
        }
        dropdown.innerHTML = html;
    
    }

    else if(type == "BSF"){
        if(bsfObj[areaSelected] == undefined){
            areaSelected = "Area1";
        }

        let html = "";
        let rowData = "";
        let header2 = "";
        if(sessionStorage.getItem("type") == "Admin"){
            header2 = `
            <tr class="text-muted">
                <th>#</th>
                <th>Timestamp</th>
                <th>Temperature (°C)</th>
                <th>Humidity (%)</th>
                <th>Light (LUX)</th>
                <th>Option</th>
            </tr>
        `;
        }

        else{
            header2 = `
            <tr class="text-muted">
                <th>#</th>
                <th>Timestamp</th>
                <th>Temperature (°C)</th>
                <th>Humidity (%)</th>
                <th>Light (LUX)</th>
            </tr>
        `;
        }
    var start = moment().subtract(31, 'days');
    var end = moment();
    function cb(start, end) {
		
		let rowData = "";
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));

        for(var x = 0; x < Object.keys(bsfObj[areaSelected]).length; ++x){
            var keys =  Object.keys(bsfObj[areaSelected])[x];

			var newstartdate = Date.parse(start.format('YYYY.MM.DD 00:00:00'));
			
			var newenddate = Date.parse(end.format('YYYY.MM.DD 23:59:59'));
            if (newstartdate <= bsfObj[areaSelected][keys].timestamp && newenddate >= bsfObj[areaSelected][keys].timestamp)
		{
            var d = new Date(bsfObj[areaSelected][keys].timestamp);
            var options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
            var datetime = d.toLocaleString('en-us', options); 
            let tr2 = "";
            if(sessionStorage.getItem("type") == "Admin"){
                tr2 =`
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
            }

            else{
                tr2 =`
                <tr>
                    <td class="id">${x + 1}</td>
                    <td class="searchVar">${datetime}</td>
                    <td>${bsfObj[areaSelected][keys].temperature}</td>
                    <td>${bsfObj[areaSelected][keys].humidity}</td>
                    <td>${bsfObj[areaSelected][keys].light}</td>
                </tr>
            `;
            }
            rowData += tr2;
        }}
        datalistBSF.innerHTML = rowData;
	}
    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);

    cb(start, end);
        dataHeaderBSF.innerHTML = header2;

        for(var x = 0; x < bsfKeys.length; ++x){
            let optionslist = "";
            if(areaSelected == `${bsfKeys[x]}`){
                optionslist = `
                    <option value="${bsfKeys[x]}" selected>${bsfKeys[x]}</option>
                `;
            }

            else{
                optionslist = `
                    <option value="${bsfKeys[x]}" >${bsfKeys[x]}</option>
                `;
            }
            html += optionslist;
        }

        dropdown.innerHTML = html;
    }

    else if(type == "BSFL"){
        if(bsflObj[areaSelected] == undefined){
            areaSelected = "Area1";
        }

        let html = "";
        let rowData = "";
        let header3 = "";
        if(sessionStorage.getItem("type") == "Admin"){
            header3 = `
            <tr class="text-muted">
                <th>#</th>
                <th>Timestamp</th>
                <th>Temperature (°C)</th>
                <th>pH</th>
                <th>Moisture</th>
                <th>Option</th>
            </tr>
        `;
        }

        else{
            header3 = `
            <tr class="text-muted">
                <th>#</th>
                <th>Timestamp</th>
                <th>Temperature (°C)</th>
                <th>pH</th>
                <th>Moisture</th>
            </tr>
        `;
        }
    var start = moment().subtract(31, 'days');
    var end = moment();
    function cb(start, end) {
		
		let rowData = "";
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));

        for(var x = 0; x < Object.keys(bsflObj[areaSelected]).length; ++x){
            var keys =  Object.keys(bsflObj[areaSelected])[x];

			var newstartdate = Date.parse(start.format('YYYY.MM.DD 00:00:00'));
			
			var newenddate = Date.parse(end.format('YYYY.MM.DD 23:59:59'));
            if (newstartdate <= bsflObj[areaSelected][keys].timestamp && newenddate >= bsflObj[areaSelected][keys].timestamp)
		{
            var d = new Date(bsflObj[areaSelected][keys].timestamp);
            var options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
            var datetime = d.toLocaleString('en-us', options); 
            let tr3 = "";
            if(sessionStorage.getItem("type") == "Admin"){
                tr3 =`
                <tr>
                    <td class="id">${x + 1}</td>
                    <td class="searchVar">${datetime}</td>
                    <td>${bsflObj[areaSelected][keys].temperature}</td>
                    <td>${bsflObj[areaSelected][keys].ph}</td>
                    <td>${bsflObj[areaSelected][keys].moisture}</td>
                    <td>
                    <span class="table-remove"><button type="button" class="btn btn-outline-danger btn-sm" data-toggle="tooltip" title="delete">&#10005;</button></span>
                    <span class="table-edit"><button type="button" class="btn btn-outline-warning btn-sm" data-toggle="tooltip" title="edit">&#9998;</button></span>
                    </td>
                </tr>
            `;
            }

            else{
                tr3 =`
                <tr>
                    <td class="id">${x + 1}</td>
                    <td class="searchVar">${datetime}</td>
                    <td>${bsflObj[areaSelected][keys].temperature}</td>
                    <td>${bsflObj[areaSelected][keys].ph}</td>
                    <td>${bsflObj[areaSelected][keys].moisture}</td>
                </tr>
            `;
            }

            rowData += tr3;
        }}
        datalistBSFL.innerHTML = rowData;
	}
    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);

    cb(start, end);
        dataHeaderBSFL.innerHTML = header3;

        for(var x = 0; x < bsflKeys.length; ++x){
            let optionslist = "";
            if(areaSelected == `${bsflKeys[x]}`){
                optionslist = `
                    <option value="${bsflKeys[x]}" selected>${bsflKeys[x]}</option>
                `;
            }

            else{
                optionslist = `
                    <option value="${bsflKeys[x]}" >${bsflKeys[x]}</option>
                `;
            }
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
            body: '<form><div class="form-group px-5">' +
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
                            var errorMSG = "";
                            if(result){
                                var tempCheck = tempPatt.test($form.find("#cTemp").val());
                                var humidCheck = humidPatt.test($form.find("#cHum").val());
                                var phCheck = phPatt.test($form.find("#cPh").val());
                                var moistCheck = moistPatt.test($form.find("#cMoisture").val());

                                let data = {
                                    humidity: parseInt($form.find("#cHum").val()),
                                    moisture: parseInt($form.find("#cMoisture").val()),
                                    temperature: parseInt($form.find("#cTemp").val()),
                                    ph : parseInt($form.find("#cPh").val()),
                                    timestamp: new Date().getTime()
                                }

                                if(!isNaN(data.humidity) && !isNaN(data.moisture) && !isNaN(data.temperature) && !isNaN(data.ph)){
                                    if(!tempCheck){
                                        errorMSG += "Temperature range 1~100<br/>";
                                    }

                                    if(!humidCheck){
                                        errorMSG += "Humidity range 1~100<br/>";
                                    }

                                    if(!phCheck){
                                        errorMSG += "ph range 1~14<br/>";
                                    }

                                    if(!moistCheck){
                                        errorMSG += "Moisture range 1~100<br/>";
                                    }

                                    if(tempCheck && humidCheck && phCheck && moistCheck){
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
                            var errorBSFLMSG = "";
                            if(result){
                                var tempBSFLCheck = tempPatt.test($form.find("#bsflTemp").val());
                                var phBSFLCheck = phPatt.test($form.find("#bsflPh").val());
                                var moistBSFLCheck = moistPatt.test($form.find("#bsflMois").val());

                                let data = {
                                    ph: parseInt($form.find("#bsflPh").val()),
                                    temperature: parseInt($form.find("#bsflTemp").val()),
                                    moisture: parseInt($form.find("#bsflMois").val()),
                                    timestamp: new Date().getTime()
                                }

                                if(!isNaN(data.ph) && !isNaN(data.temperature) && !isNaN(data.moisture)){
                                    if(!tempBSFLCheck){
                                        errorBSFLMSG += "Temperature range 1~100<br/>";
                                    }

                                    if(!phBSFLCheck){
                                        errorBSFLMSG += "ph range 1~14<br/>";
                                    }

                                    if(!moistBSFLCheck){
                                        errorBSFLMSG += "Moisture range 1~100<br/>";
                                    }

                                    if(tempBSFLCheck && phBSFLCheck && moistBSFLCheck){
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
})

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
    areaSelected = "Area1";
    populateTables();
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
                "<b>pH:</b> " + bsflObj[areaSelected][deleteIndex].ph+ "<br/>" +
                "<b>Moisture:</b> " + bsflObj[areaSelected][deleteIndex].moisture,
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
                            var errMSG = "";
                            if(result){
                                var tempCheck = tempPatt.test($form.find("#updateTemp").val());
                                var humidCheck = humidPatt.test($form.find("#updateHum").val());
                                var phCheck = phPatt.test($form.find("#updatepH").val());
                                var moistCheck = moistPatt.test($form.find("#updateMoisture").val());

                                let data = {
                                    humidity: parseInt($form.find("#updateHum").val()),
                                    moisture: parseInt($form.find("#updateMoisture").val()),
                                    temperature: parseInt($form.find("#updateTemp").val()),
                                    ph : parseInt($form.find("#updatepH").val()),
                                }
                                
                                if(!isNaN(data.temperature) && !isNaN(data.ph) && !isNaN(data.temperature) && !isNaN(data.moisture)){
                                    if(!tempCheck){
                                        errMSG += "Temperature range 1~100<br/>"
                                    }

                                    if(!humidCheck){
                                        errMSG += "Humidity range 1~100<br/>"
                                    }

                                    if(!phCheck){
                                        errMSG += "ph range 1~14<br/>"
                                    }

                                    if(!moistCheck){
                                        errMSG += "Moisture range 1~100<br/>"
                                    }

                                    if(tempCheck && humidCheck && phCheck && moistCheck){
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
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control updateBSFLData" name="Humidity" id="updatebsflPh" value=' +
            bsflObj[areaSelected][keys].ph + '>' +  
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
                            var errBSFLMSG = "";
                            if(result){
                                var tempBSFLCheck = tempPatt.test($form.find("#updatebsflTemp").val());
                                var phBSFLCheck = phPatt.test($form.find("#updatebsflPh").val());
                                var moistBSFLCheck = moistPatt.test($form.find("#updatebsflMois").val());

                                let data = {
                                    ph: parseInt($form.find("#updatebsflPh").val()),
                                    temperature: parseInt($form.find("#updatebsflTemp").val()),
                                    moisture: parseInt($form.find("#updatebsflMois").val()),
                                }
                                
                                if(!isNaN(data.temperature) && !isNaN(data.ph) && !isNaN(data.moisture)){
                                    if(!tempBSFLCheck){
                                        errBSFLMSG += "Temperature range 1~100<br/>"; 
                                    }

                                    if(!phBSFLCheck){
                                        errBSFLMSG += "ph range 1~14<br/>"; 
                                    }

                                    if(!moistBSFLCheck){
                                        errBSFLMSG += "Moisture range 1~100<br/>"; 
                                    }

                                    if(tempBSFLCheck && phBSFLCheck && moistBSFLCheck){
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

$(document).on('click', '.table-edit', update);

function dataAreaChange(){
    areaSelected = document.getElementById("chickenAreaData").value;
    
    if(type == "Chicken"){
        populateTables();
    }

    else if(type == "BSF"){
        populateTables();
    }

    else if(type == "BSFL"){
        populateTables();
    }
}

