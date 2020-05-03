//connect to firebase database 
//get reference to the related child (Data)
var database = firebase.database();
var ref = database.ref("Data");

//select the table
var datalist = document.querySelector(".bodyData");
var key = [];
//fetch the data from database
ref.on("value", snap=>{
    var dataObj = snap.val();
    var keys = Object.keys(dataObj);
    
    while(key.length > 0){
        key.pop();
    }

    //populate the table with data
    populateTable(dataObj,keys);

})

function populateTable(dataObj,keys){
    //console.log("function");
    let html = "";

    //loop through the data
    for(var x = 0; x < keys.length; ++x){
        key.push(keys[x]);
        var k = keys[x];
        var d = new Date(dataObj[k].timestamp); //change the format of timestamp to be readable
        var datetime = d.toLocaleString(); //format the time 
        //var time = d.toLocaleTimeString(); //format the time 

        //add the html element
        if(dataObj[k].moisture == "Too Dry"){
            const tr = `
            <tr>
                <td class="id">${x + 1}</td>
                <td class="hehe">${datetime}</td>
                <td class="hehe">${dataObj[k].temperature}</td>
                <td class="hehe">${dataObj[k].humidity}</td>
                <td class="hehe"></td>
                <td class="hehe"><span class="badge badge-danger w-75 py-2">${dataObj[k].moisture}</span></td>
                <td>
                <span class="table-remove"><button type="button" class="btn btn-outline-danger btn-sm" data-toggle="tooltip" title="delete">&#10005;</button></span>
                <span class="table-edit" data-toggle="modal" data-target="#editData"><button type="button" class="btn btn-outline-warning btn-sm" data-toggle="tooltip" title="edit">&#9998;</button></span>
                </td>
            </tr>
        `;
        html += tr;
        }else if(dataObj[k].moisture == "Too Wet"){
            const tr = `
            <tr>
                <td class="id">${x + 1}</td>
                <td class="hehe">${datetime}</td>
                <td class="hehe">${dataObj[k].temperature}</td>
                <td class="hehe">${dataObj[k].humidity}</td>
                <td class="hehe"></td>
                <td class="hehe"><span class="badge badge-warning w-75 py-2">${dataObj[k].moisture}</span></td>
                <td><span class="table-remove"><button type="button" class="btn btn-outline-danger btn-sm" data-toggle="tooltip" title="delete">&#10005;</button></span>
                <span class="table-edit" data-toggle="modal" data-target="#editData"><button type="button" class="btn btn-outline-warning btn-sm" data-toggle="tooltip" title="edit">&#9998;</button></span></td>
            </tr>
        `;
        html += tr;
        }else if(dataObj[k].moisture == "Null"){
            const tr = `
            <tr>
                <td class="id">${x + 1}</td>
                <td class="hehe">${datetime}</td>
                <td class="hehe">${dataObj[k].temperature}</td>
                <td class="hehe">${dataObj[k].humidity}</td>
                <td class="hehe"></td>
                <td class="hehe"><span class="badge badge-info w-75 py-2">${dataObj[k].moisture}</span></td>
                <td><span class="table-remove"><button type="button" class="btn btn-outline-danger btn-sm" data-toggle="tooltip" title="delete">&#10005;</button></span>
                <span class="table-edit" data-toggle="modal" data-target="#editData"><button type="button" class="btn btn-outline-warning btn-sm" data-toggle="tooltip" title="edit">&#9998;</button></span></td>
            </tr>
        `;
        html += tr;
        }else{
            const tr = `
            <tr>
                <td class="id">${x + 1}</td>
                <td class="hehe">${datetime}</td>
                <td class="hehe">${dataObj[k].temperature}</td>
                <td class="hehe">${dataObj[k].humidity}</td>
                <td class="hehe"></td>
                <td class="hehe"><span class="badge badge-success w-75 py-2">${dataObj[k].moisture}</span></td>
                <td><span class="table-remove"><button type="button" class="btn btn-outline-danger btn-sm" data-toggle="tooltip" title="delete">&#10005;</button></span>
                <span class="table-edit" data-toggle="modal" data-target="#editData"><button type="button" class="btn btn-outline-warning btn-sm" data-toggle="tooltip" title="edit">&#9998;</button></span></td>
            </tr>
        `;
        html += tr;
        }
        
    }
    //append the table with fetched data
    datalist.innerHTML = html;

    //$('table tr td.hehe').click(function(){
    //    console.log($(this).text());
    //});
    $('[data-toggle="tooltip"]').tooltip();
}

//function dataSearch(){
//    var input = document.getElementById("searchInput").value;
 //   console.log(input);
//}

$("#addDataForm").submit(function(e){
    e.preventDefault();

    var temp = parseFloat(document.getElementById("addTemp").value);
    var hum = parseFloat(document.getElementById("addHum").value);
    var ph = parseFloat(document.getElementById("addpH").value);
    var moist = parseFloat(document.getElementById("addMoisture").value);
    var d = new Date().getTime();

    if(moist <50){
        moist = "Too Dry";
    }else if(moist >=50 && moist < 75){
        moist = "Perfect";
    }else{
        moist = "Too Wet";
    }

    var data = {
        humidity: hum,
        moisture: moist,
        temperature: temp,
        //ph : ph,
        timestamp: d
    }

    ref.push(data);
    $("#addDataForm")[0].reset();
});

$("#addData").on("hidden.bs.modal",function(){
    $(this).find("form")[0].reset();
})

var remove = function(e){
    e.preventDefault();

    var index = $(this).parents("tr").find("td.id").text();
    var deleteIndex;
    
    for(var x = 0; x < key.length; ++x){
        if(index-1 == x){
            deleteIndex = key[x];
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
    tableID = index;
}

$(document).on('click', '.table-edit', update);

$("#updateDataForm").submit(function(e){
    e.preventDefault();

    var temp = parseFloat(document.getElementById("updateTemp").value);
    var hum = parseFloat(document.getElementById("updateHum").value);
    var ph = parseFloat(document.getElementById("updatepH").value);
    var moist = parseFloat(document.getElementById("updateMoisture").value);
    var d = new Date().getTime();

    if(moist <50){
        moist = "Too Dry";
    }else if(moist >=50 && moist < 75){
        moist = "Perfect";
    }else{
        moist = "Too Wet";
    }

    var updateData = {
        humidity: hum,
        moisture: moist,
        temperature: temp,
        //ph : ph,
        //timestamp: d
    }

    var updateIndex;

    for(var x = 0; x < key.length; ++x){
        if(tableID-1 == x){
            updateIndex = key[x];
        }
    }

    if(confirm("Are you sure?")){
        ref.child(updateIndex).update(updateData);
    }
   
    $("#updateDataForm")[0].reset();
});