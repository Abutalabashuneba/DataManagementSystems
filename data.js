//select the table for chicken
var datalist = document.querySelector(".bodyData");

//select the table for BSF
var datalistBSF = document.querySelector(".bodyDataBSF");

//select the table for BSFL
var datalistBSFL = document.querySelector(".bodyDataBSFL");

var chickenData1;
var chickenKey1;
//fetch the chicken data from database
chicken1ref.on("value", snap=>{
    chickenData1 = snap.val();
    chickenKey1 = Object.keys(chickenData1);
    
    //populate the table with data
    populateTable();

})

var bsfObj1;
var bsfKey1;
//fetch the BSF data from database
bsfref.on("value", snap=>{
    bsfObj1 = snap.val();
    bsfKey1 = Object.keys(bsfObj1);

    //populate the table with data
    populateTableBSF();

})

var bsflObj1;
var bsflKey1;
//fetch the BSF data from database
bsflref.on("value", snap=>{
    bsflObj1 = snap.val();
    bsflKey1 = Object.keys(bsflObj1);

    //populate the table with data
    populateTableBSFL();

})

//---------------------------------------Chicken Table---------------------------------//
function populateTable(){
    var html = "";
    
    //loop through the data
    for(var x = 0; x < chickenKey1.length; ++x){
        var k = chickenKey1[x];
        var d = new Date(chickenData1[k].timestamp); //change the format of timestamp to be readable
        var datetime = d.toLocaleString(); //format the time 
        //var time = d.toLocaleTimeString(); //format the time 

        let tr = `
            <tr>
                <td class="id">${x + 1}</td>
                <td class="searchVar">${datetime}</td>
                <td>${chickenData1[k].temperature}</td>
                <td>${chickenData1[k].humidity}</td>
                <td></td>
                <td>${chickenData1[k].moisture}</td>
        `;
        html += tr;

        tr = `
                <td>
                <span class="table-remove"><button type="button" class="btn btn-outline-danger btn-sm" data-toggle="tooltip" title="delete">&#10005;</button></span>
                <span class="table-edit" data-toggle="modal" data-target="#editData"><button type="button" class="btn btn-outline-warning btn-sm" data-toggle="tooltip" title="edit">&#9998;</button></span>
                </td>
            </tr>
        `;

        html += tr;
    }
    //append the table with fetched data
    datalist.innerHTML = html;

    //$('table tr td.hehe').click(function(){
    //    console.log($(this).text());
    //});
    $('[data-toggle="tooltip"]').tooltip({
		trigger : 'hover'
	});
	
	$('[data-toggle="tooltip"]').on('click', function () {
        $(this).tooltip('hide')
    });
    
}

//add chicken data intable
$("#addDataFormC").submit(function(e){
    e.preventDefault();

    var temp = parseFloat(document.getElementById("cTemp").value);
    var hum = parseFloat(document.getElementById("cHum").value);
    var ph = parseFloat(document.getElementById("cPh").value);
    var moist = parseFloat(document.getElementById("cMoisture").value);
    var d = new Date().getTime();


    var data = {
        humidity: hum,
        moisture: moist,
        temperature: temp,
        //ph : ph,
        timestamp: d
    }

    chicken1ref.push(data);
    $("#addDataFormC")[0].reset();
    $('#addDataChicken').modal('hide');
});

//remove data on hiding modal
$("#addDataChicken").on("hidden.bs.modal",function(){
    $(this).find("form")[0].reset();
})

//Remove data
var remove = function(e){
    e.preventDefault();

    

    var index = $(this).parents("tr").find("td.id").text();
    var deleteIndex;
    
    for(var x = 0; x < dataKeys.length; ++x){
        if(index-1 == x){
            deleteIndex = dataKeys[x];
        }
    }

    if(confirm("Are you sure want to remove this data?")){
        chicken1ref.child(deleteIndex).remove();
		if(chickenData1 === null)
		{
			datalist.innerHTML = "";
		}
    }
}

$(document).on('click', '.table-remove', remove);


var tableID;

var update = function(e){
    e.preventDefault();

    var index = $(this).parents("tr").find("td.id").text();

    tableID = index;
    
   
    for(var x = 0; x < chickenKey1.length; ++x){
        if(tableID-1 == x){
            var k = chickenKey1[x];
            var d = new Date(chickenData1[k].timestamp); //change the format of timestamp to be readable
            var datetime = d.toLocaleString(); //format the time 
            console.log(datetime);
            document.getElementById("updateDate").value = datetime;
            document.getElementById("updateTemp").value = chickenData1[chickenKey1[x]].temperature;
            document.getElementById("updateHum").value = chickenData1[chickenKey1[x]].humidity;
            // document.getElementById("updatepH").value = chickenData1[chickenKey1[x]].ph;
            document.getElementById("updateMoisture").value = chickenData1[chickenKey1[x]].moisture;
        }
    }
}

$(document).on('click', '.table-edit', update);

$("#updateDataForm").submit(function(e){
    e.preventDefault();

    var temp = parseFloat(document.getElementById("updateTemp").value);
    var hum = parseFloat(document.getElementById("updateHum").value);
    var ph = parseFloat(document.getElementById("updatepH").value);
    var moist = parseFloat(document.getElementById("updateMoisture").value);
    var d = new Date().getTime();

    var updateData = {
        humidity: hum,
        moisture: moist,
        temperature: temp,
        //ph : ph,
        //timestamp: d
    }

    var updateIndex;

    for(var x = 0; x < chickenKey1.length; ++x){
        if(tableID-1 == x){
            updateIndex = chickenKey1[x];
        }
    }

    if(confirm("Are you sure want to update this data?")){
        chicken1ref.child(updateIndex).update(updateData);
    }
   
    $("#updateDataForm")[0].reset();
    $('#editData').modal('hide');
});

//-------------------------------BSF Table------------------------------------------//
function populateTableBSF(){
    var html = "";
    
    //loop through the data
    for(var x = 0; x < bsfKey1.length; ++x){
        var k = bsfKey1[x];
        var d = new Date(bsfObj1[k].timestamp); //change the format of timestamp to be readable
        var datetime = d.toLocaleString(); //format the time 

        let tr = `
            <tr>
                <td class="id">${x + 1}</td>
                <td class="bsf">${datetime}</td>
                <td class="bsf">${bsfObj1[k].temperature}</td>
                <td class="bsf">${bsfObj1[k].humidity}</td>
                <td class="bsf">${bsfObj1[k].light}</td>
        `;
        html += tr;
        
        tr = `
                <td>
                <span class="table-remove-bsf"><button type="button" class="btn btn-outline-danger btn-sm" data-toggle="tooltip" title="delete">&#10005;</button></span>
                <span class="table-edit-bsf" data-toggle="modal" data-target="#editDataBSF"><button type="button" class="btn btn-outline-warning btn-sm" data-toggle="tooltip" title="edit">&#9998;</button></span>
                </td>
            </tr>
        `;

        html += tr;
    }
    //append the table with fetched data
    datalistBSF.innerHTML = html;

    
    $('[data-toggle="tooltip"]').tooltip({
		trigger : 'hover'
	});
	
	$('[data-toggle="tooltip"]').on('click', function () {
        $(this).tooltip('hide')
    });

}

//Add data to BSF table
$("#addDataFormBSF").submit(function(e){
    e.preventDefault();

    var temp = parseFloat(document.getElementById("bsfTemp").value);
    var hum = parseFloat(document.getElementById("bsfHum").value);
    var lux = parseFloat(document.getElementById("bsfLux").value);
    var d = new Date().getTime();


    var data = {
        humidity: hum,
        temperature: temp,
        light: lux,
        timestamp: d
    }

    bsfref.push(data);
    $("#addDataFormBSF")[0].reset();
    $('#addDataBSF').modal('hide');
});

//remove data on hiding modal
$("#addDataBSF").on("hidden.bs.modal",function(){
    $(this).find("form")[0].reset();
})

//Remove BSF data function
var removeBSF = function(e){
    e.preventDefault();

    var indexBSF = $(this).parents("tr").find("td.id").text();
    var deleteIndexBSF;
    
    for(var x = 0; x < bsfKey1.length; ++x){
        if(indexBSF-1 == x){
            deleteIndexBSF = bsfKey1[x];
        }
    }

    if(confirm("Are you sure want to remove this data?")){
        bsfref.child(deleteIndexBSF).remove();
		if(bsfObj1 === null)
		{
			datalistBSF.innerHTML = "";
		}
    }
}

$(document).on('click', '.table-remove-bsf', removeBSF);

var tableIDBSF;

//Show update value to form
var update = function(e){
    e.preventDefault();

    var index = $(this).parents("tr").find("td.id").text();

    tableIDBSF = index;
    
   
    for(var x = 0; x < bsfKey1.length; ++x){
        if(tableIDBSF-1 == x){
            var k = bsfKey1[x];
            var d = new Date(bsfObj1[k].timestamp); //change the format of timestamp to be readable
            var datetime = d.toLocaleString(); //format the time 
            console.log(datetime);
            document.getElementById("updateDateBSF").value = datetime;
            document.getElementById("updatebsfTemp").value = bsfObj1[bsfKey1[x]].temperature;
            document.getElementById("updatebsfHum").value = bsfObj1[bsfKey1[x]].humidity;
            document.getElementById("updatebsfLux").value = bsfObj1[bsfKey1[x]].light;
            console.log(bsfObj1[bsfKey1[x]].light);
        }
    }
}

$(document).on('click', '.table-edit-bsf', update);

//update BSF table
$("#updateDataFormBSF").submit(function(e){
    e.preventDefault();

    var temp = parseFloat(document.getElementById("updatebsfTemp").value);
    var hum = parseFloat(document.getElementById("updatebsfHum").value);
    var lux = parseFloat(document.getElementById("updatebsfLux").value);

    var updateData = {
        humidity: hum,
        light: lux,
        temperature: temp,
        
    }

    var updateIndex;

    for(var x = 0; x < bsfKey1.length; ++x){
        if(tableIDBSF-1 == x){
            updateIndex = bsfKey1[x];
        }
    }

    if(confirm("Are you sure want to update this data?")){
        bsfref.child(updateIndex).update(updateData);
    }
   
    $("#updateDataFormBSF")[0].reset();
    $('#editDataBSF').modal('hide');
});


//-------------------------------BSFL Table------------------------------------------//
function populateTableBSFL(){
    var html = "";
    
    //loop through the data
    for(var x = 0; x < bsflKey1.length; ++x){
        var k = bsflKey1[x];
        var d = new Date(bsflObj1[k].timestamp); //change the format of timestamp to be readable
        var datetime = d.toLocaleString(); //format the time 
        
        let tr = `
            <tr>
                <td class="id">${x + 1}</td>
                <td class="bsfl">${datetime}</td>
                <td class="bsfl">${bsflObj1[k].temperature}</td>
                <td class="bsfl">${bsflObj1[k].pH}</td>
                <td class="bsfl">${bsflObj1[k].moisture}</td>
        `;
        html += tr;
        
        tr = `
                <td>
                <span class="table-remove-bsfl"><button type="button" class="btn btn-outline-danger btn-sm" data-toggle="tooltip" title="delete">&#10005;</button></span>
                <span class="table-edit-bsfl" data-toggle="modal" data-target="#editDataBSFL"><button type="button" class="btn btn-outline-warning btn-sm" data-toggle="tooltip" title="edit">&#9998;</button></span>
                </td>
            </tr>
        `;

        html += tr;
    }
    //append the table with fetched data
    datalistBSFL.innerHTML = html;

    
    $('[data-toggle="tooltip"]').tooltip({
		trigger : 'hover'
	});
	
	$('[data-toggle="tooltip"]').on('click', function () {
        $(this).tooltip('hide')
    });

}

//Add data to BSFL table
$("#addDataFormBSFL").submit(function(e){
    e.preventDefault();

    var temp = parseFloat(document.getElementById("bsflTemp").value);
    var ph = parseFloat(document.getElementById("bsflPh").value);
    var mois = parseFloat(document.getElementById("bsflMois").value);
    var d = new Date().getTime();


    var data = {
        pH: ph,
        temperature: temp,
        moisture: mois,
        timestamp: d
    }

    bsflref.push(data);
    $("#addDataFormBSFL")[0].reset();
    $('#addDataBSFL').modal('hide');
});

//remove data on hiding modal
$("#addDataBSFL").on("hidden.bs.modal",function(){
    $(this).find("form")[0].reset();
})

//Remove data function
var removeBSFL = function(e){
    e.preventDefault();

    

    var indexBSFL = $(this).parents("tr").find("td.id").text();
    var deleteIndexBSFL;
    
    for(var x = 0; x < bsflKey1.length; ++x){
        if(indexBSFL-1 == x){
            deleteIndexBSFL = bsflKey1[x];
            console.log(deleteIndexBSFL);
        }
    }

    if(confirm("Are you sure want to remove this data?")){
        bsflref.child(deleteIndexBSFL).remove();
		if(bsflObj1 === null)
		{
			datalistBSFL.innerHTML = "";
		}
    }
}

$(document).on('click', '.table-remove-bsfl', removeBSFL);

var tableIDBSFL;

//Show update value to form
var update = function(e){
    e.preventDefault();

    var index = $(this).parents("tr").find("td.id").text();

    tableIDBSFL = index;
    
   
    for(var x = 0; x < bsflKey1.length; ++x){
        if(tableIDBSFL-1 == x){
            var k = bsflKey1[x];
            var d = new Date(bsflObj1[k].timestamp); //change the format of timestamp to be readable
            var datetime = d.toLocaleString(); //format the time 
            console.log(datetime);
            document.getElementById("updateDateBSFL").value = datetime;
            document.getElementById("updatebsflTemp").value = bsflObj1[bsflKey1[x]].temperature;
            document.getElementById("updatebsflPh").value = bsflObj1[bsflKey1[x]].pH;
            document.getElementById("updatebsflMois").value = bsflObj1[bsflKey1[x]].moisture;
        }
    }
}

$(document).on('click', '.table-edit-bsfl', update);

//Update table data
$("#updateDataFormBSFL").submit(function(e){
    e.preventDefault();

    var temp = parseFloat(document.getElementById("updatebsflTemp").value);
    var ph = parseFloat(document.getElementById("updatebsflPh").value);
    var mois = parseFloat(document.getElementById("updatebsflMois").value);

    var updateData = {
        moisture: mois,
        pH: ph,
        temperature: temp,
        
    }

    var updateIndex;

    for(var x = 0; x < bsfKey1.length; ++x){
        if(tableIDBSF-1 == x){
            updateIndex = bsfKey1[x];
        }
    }

    if(confirm("Are you sure want to update this data?")){
        bsfref.child(updateIndex).update(updateData);
    }
   
    $("#updateDataFormBSFL")[0].reset();
    $('#editDataBSFL').modal('hide');
}); 





