//connect to firebase database 
//get reference to the related child (Data)
var database = firebase.database();
var ref = database.ref("Data/Chicken/Area1");
var bsfref = database.ref("Data/BSF/Area1");

//select the table for chicken
var datalist = document.querySelector(".bodyData");

//select the table for BSF
var datalistBSF = document.querySelector(".bodyDataBSF");

//fetch the data from database
ref.on("value", snap=>{
    var dataObj = snap.val();
    var keys = Object.keys(dataObj);
    
    //populate the table with data
    populateTable(dataObj,keys);

})

bsfref.on("value", snap=>{
    var bsfObj = snap.val();
    var key = Object.keys(bsfObj);

    
    //populate the table with data
    populateTableBSF(bsfObj,key);

})

//---------------------------------------Chicken Table---------------------------------//
function populateTable(obj,key){
    var html = "";
    
    //loop through the data
    for(var x = 0; x < key.length; ++x){
        var k = key[x];
        var d = new Date(obj[k].timestamp); //change the format of timestamp to be readable
        var datetime = d.toLocaleString(); //format the time 
        //var time = d.toLocaleTimeString(); //format the time 

        let tr = `
            <tr>
                <td class="id">${x + 1}</td>
                <td class="hehe">${datetime}</td>
                <td class="hehe">${obj[k].temperature}</td>
                <td class="hehe">${obj[k].humidity}</td>
                <td class="hehe"></td>
                <td class="hehe">${obj[k].moisture}</td>
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

$("#addDataForm").submit(function(e){
    e.preventDefault();

    var temp = parseFloat(document.getElementById("addTemp").value);
    var hum = parseFloat(document.getElementById("addHum").value);
    var ph = parseFloat(document.getElementById("addpH").value);
    var moist = parseFloat(document.getElementById("addMoisture").value);
    var d = new Date().getTime();


    var data = {
        humidity: hum,
        moisture: moist,
        temperature: temp,
        //ph : ph,
        timestamp: d
    }

    ref.push(data);
    $("#addDataForm")[0].reset();
    $('#addData').modal('hide');
});

//remove data on hiding modal
$("#addData").on("hidden.bs.modal",function(){
    $(this).find("form")[0].reset();
})

var remove = function(e){
    e.preventDefault();

    

    var index = $(this).parents("tr").find("td.id").text();
    var deleteIndex;
    
    for(var x = 0; x < dataKeys.length; ++x){
        if(index-1 == x){
            deleteIndex = dataKeys[x];
        }
    }

    if(confirm("Are you sure?")){
        ref.child(deleteIndex).remove();
    }
}

$(document).on('click', '.table-remove', remove);


var tableID;

var update = function(e){
    e.preventDefault();

    var index = $(this).parents("tr").find("td.id").text();
    /*var updateIndex;
    
    var updateData = {
        humidity: 1,
        moisture: 1,
        temperature: 1,
        //ph : ph,
        //timestamp: d
    }

    for(var x = 0; x < key.length; ++x){
        if(index-1 == x){
            updateIndex = key[x];
        }
    }

    if(confirm("Are you sure?")){
        ref.child(updateIndex).update(updateData);
    }*/

    
    ref.on("value", snap=>{
        var dataObj = snap.val();
        var keys = Object.keys(dataObj);

        var updateTemp;
        var updateHum;
        //var updatepH;
        var updateMois;
        for(var x = 0; x < keys.length; ++x){
            if(tableID-1 == x){
                updateTemp = dataObj[keys[x]].temperature; 
            }
        }
        for(var x = 0; x < keys.length; ++x){
            if(tableID-1 == x){
                updateHum = dataObj[keys[x]].humidity;   
            }
        }
        
        for(var x = 0; x < keys.length; ++x){
            if(tableID-1 == x){
                updateMois = dataObj[keys[x]].moisture;   
            }
        }
        
       
        var temp = document.getElementById("updateTemp");
        var humid = document.getElementById("updateHum");
        //var pH = document.getElementById("updatepH");
        var mois = document.getElementById("updateMoisture");

        temp.value = updateTemp;
        humid.value = updateHum;
        //pH.value = updatepH;
        mois.value = updateMois;
        
    })

  

    tableID = index;
    console.log(tableID);
    
    //var test = document.getElementById("updateTemp");
    //test.value = "100";
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

    for(var x = 0; x < dataKeys.length; ++x){
        if(tableID-1 == x){
            updateIndex = dataKeys[x];
        }
    }

    if(confirm("Are you sure?")){
        ref.child(updateIndex).update(updateData);
    }
   
    $("#updateDataForm")[0].reset();
    $('#editData').modal('hide');
});

//-------------------------------BSF Table------------------------------------------//
function populateTableBSF(obj,key){
    var html = "";
    
    //loop through the data
    for(var x = 0; x < key.length; ++x){
        var k = key[x];
        var d = new Date(obj[k].timestamp); //change the format of timestamp to be readable
        var datetime = d.toLocaleString(); //format the time 

        let tr = `
            <tr>
                <td class="id">${x + 1}</td>
                <td class="bsf">${datetime}</td>
                <td class="bsf">${obj[k].temperature}</td>
                <td class="bsf">${obj[k].humidity}</td>
                <td class="bsf">${obj[k].light}</td>
        `;
        html += tr;
        console.log(obj[k].temperature);

        
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
    datalistBSF.innerHTML = html;

    
    $('[data-toggle="tooltip"]').tooltip({
		trigger : 'hover'
	});
	
	$('[data-toggle="tooltip"]').on('click', function () {
        $(this).tooltip('hide')
    });
    
}





