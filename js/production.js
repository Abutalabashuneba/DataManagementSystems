//select the table
var datalist = document.querySelector(".productionBodyData");

var productionObj;
var productionKeys;

//fetch the data from database
cproductionRef.on("value", snap=>{
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

    var amountOfChicken = parseFloat(document.getElementById("addAmountC").value);
    var averageWeight = parseFloat(document.getElementById("addAvgC").value);
    var sick = parseFloat(document.getElementById("addSickC").value);
    var runt = parseFloat(document.getElementById("addRuntC").value);
	var mortality = parseFloat(document.getElementById("addMortC").value);
    var feedGiven = parseFloat(document.getElementById("addfeedGiven").value);
    var feedLeft = parseFloat(document.getElementById("addfeedLeft").value);
    var timestamp = new Date().getTime();

    var data = {
        amount: amountOfChicken,
		average: averageWeight,
		sick: sick,
		runt: runt,
		mortality: mortality,
		give: feedGiven,
		left: feedLeft,
		timestamp: timestamp
    }

    cproductionRef.push(data);
    $("#addDataFormCP")[0].reset();
    $('#addDataCP').modal('hide');
    
});

//remove data on hiding modal
$("#addDataCP").on("hidden.bs.modal",function(){
    $(this).find("form")[0].reset();
})

var remove = function(e){
    e.preventDefault();

    if(confirm("Are you sure?")){
		var index = $(this).parents("tr").find("td.id").text();
		var deleteIndex;
    
		for(var x = 0; x < productionKeys.length; ++x){
			if(index-1 == x){
				deleteIndex = productionKeys[x];
			}
		}
		
        cproductionRef.child(deleteIndex).remove();
		if(productionObj === null)
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
    
    for(var x = 0; x < productionKeys.length; ++x){
        if(tableID-1 == x){
            document.getElementById("updateAmountC").value = productionObj[productionKeys[x]].amount;
            document.getElementById("updateAvgC").value = productionObj[productionKeys[x]].average;
            document.getElementById("updateSickC").value = productionObj[productionKeys[x]].sick;
            document.getElementById("updateRuntC").value = productionObj[productionKeys[x]].runt;
            document.getElementById("updateMortC").value = productionObj[productionKeys[x]].mortality;
            document.getElementById("updatefeedGiven").value = productionObj[productionKeys[x]].give;
            document.getElementById("updatefeedLeft").value = productionObj[productionKeys[x]].left;
        }
    }
}

$(document).on('click', '.table-edit', update);

$("#updateDataFormCP").submit(function(e){
    e.preventDefault();

    var amountOfChicken = parseFloat(document.getElementById("updateAmountC").value);
    var averageWeight = parseFloat(document.getElementById("updateAvgC").value);
    var sick = parseFloat(document.getElementById("updateSickC").value);
    var runt = parseFloat(document.getElementById("updateRuntC").value);
	var mortality = parseFloat(document.getElementById("updateMortC").value);
    var feedGiven = parseFloat(document.getElementById("updatefeedGiven").value);
    var feedLeft = parseFloat(document.getElementById("updatefeedLeft").value);

    var updateDataCP = {
        amount: amountOfChicken,
		average: averageWeight,
		sick: sick,
		runt: runt,
		mortality: mortality,
		give: feedGiven,
		left: feedLeft,
    }

    var updateIndexCP;

    for(var x = 0; x < productionKeys.length; ++x){
        if(tableID-1 == x){
            updateIndexCP = productionKeys[x];
        }
    }

    if(confirm("Are you sure?")){
        cproductionRef.child(updateIndexCP).update(updateDataCP);
    }
   
    $("#updateDataFormCP")[0].reset();
    $('#editDataCP').modal('hide');
});