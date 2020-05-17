//connect to firebase database 
//get reference to the related child (Data)
var database = firebase.database();
var ref = database.ref("Data/Production");

//select the table
var datalist = document.querySelector(".productionBodyData");

var productionObj;
var productionKeys;

//fetch the data from database
ref.on("value", snap=>{
    //var dataObj = snap.val();
    //var keys = Object.keys(dataObj);
    productionObj = snap.val();
    productionKeys = Object.keys(productionObj);

    //populate the table with data
    populateTableCP();

})

function populateTableCP(){
    var html = "";
    
    //loop through the data
    for(var x = 0; x < productionKeys.length; ++x){
        var k = productionKeys[x];
        var d = new Date(productionObj[k].timestamp); //change the format of timestamp to be readable
        var datetime = d.toLocaleString(); //format the time 
        //var time = d.toLocaleTimeString(); //format the time 

        let tr = `
                <td class="id">${x + 1}</td>
                <td class="hehe">${datetime}</td>
                <td class="hehe">${productionObj[k].amount}</td>
                <td class="hehe">${productionObj[k].average}</td>
				<td class="hehe">${productionObj[k].sick}</td>
                <td class="hehe">${productionObj[k].runt}</td>
				<td class="hehe">${productionObj[k].mortality}</td>
                <td class="hehe">${productionObj[k].give}</td>
				<td class="hehe">${productionObj[k].left}</td>
        `;
		
        html += tr;

        tr = `
                <td>
                <span class="table-remove"><button type="button" class="btn btn-outline-danger btn-sm" data-toggle="tooltip" title="delete">&#10005;</button></span>
                <span class="table-edit" data-toggle="modal" data-target="#editDataCP"><button type="button" class="btn btn-outline-warning btn-sm" data-toggle="tooltip" title="edit">&#9998;</button></span>
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

$("#addDataFormCP").submit(function(e){
    e.preventDefault();

    var a = parseFloat(document.getElementById("addAmountC").value);
    var b = parseFloat(document.getElementById("addAvgC").value);
    var c = parseFloat(document.getElementById("addSickC").value);
    var d = parseFloat(document.getElementById("addRuntC").value);
	var e = parseFloat(document.getElementById("addMortC").value);
    var f = parseFloat(document.getElementById("addfeedGiven").value);
    var g = parseFloat(document.getElementById("addfeedLeft").value);
    var h = new Date().getTime();

    var data = {
        amount: a,
		average: b,
		sick: c,
		runt: d,
		mortality: e,
		give: f,
		left: g,
		timestamp: h
    }

    ref.push(data);
    $("#addDataFormCP")[0].reset();
});

//remove data on hiding modal
$("#addDataCP").on("hidden.bs.modal",function(){
    $(this).find("form")[0].reset();
})

var remove = function(e){
    e.preventDefault();

    var index = $(this).parents("tr").find("td.id").text();
    var deleteIndex;
    
    for(var x = 0; x < productionKeys.length; ++x){
        if(index-1 == x){
            deleteIndex = productionKeys[x];
        }
    }

    if(confirm("Are you sure?")){
        ref.child(deleteIndex).remove();
		if (index-1 == 0)
		{
			window.location.reload(true);
		}
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
    console.log(tableID);
}

$(document).on('click', '.table-edit', update);

$("#updateDataFormCP").submit(function(e){
    e.preventDefault();

    var aa = parseFloat(document.getElementById("updateAmountC").value);
    var bb = parseFloat(document.getElementById("updateAvgC").value);
    var cc = parseFloat(document.getElementById("updateSickC").value);
    var dd = parseFloat(document.getElementById("updateRuntC").value);
	var ee = parseFloat(document.getElementById("updateMortC").value);
    var ff = parseFloat(document.getElementById("updatefeedGiven").value);
    var gg = parseFloat(document.getElementById("updatefeedLeft").value);
    var hh = new Date().getTime();

    var updateDataCP = {
        amount: aa,
		average: bb,
		sick: cc,
		runt: dd,
		mortality: ee,
		give: ff,
		left: gg,
		timestamp: hh
    }

    var updateIndexCP;

    for(var x = 0; x < productionKeys.length; ++x){
        if(tableID-1 == x){
            updateIndexCP = productionKeys[x];
        }
    }

    if(confirm("Are you sure?")){
        ref.child(updateIndexCP).update(updateDataCP);
    }
   
    $("#updateDataFormCP")[0].reset();
});