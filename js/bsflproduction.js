//select the table
var bsfldatalist = document.querySelector(".bsflproductionBodyData");

var bsflproductionObj;
var bsflproductionKeys;

//fetch the data from database
bsflproductionRef.on("value", snap=>{
    //var dataObj = snap.val();
    //var keys = Object.keys(dataObj);
    bsflproductionObj = snap.val();
    bsflproductionKeys = Object.keys(bsflproductionObj);

    //populate the table with data
    populateTableBSFLP();

})

function populateTableBSFLP(){
    var html = "";
    
    //loop through the data
    for(var x = 0; x < bsflproductionKeys.length; ++x){
        var k = bsflproductionKeys[x];
        var d = new Date(bsflproductionObj[k].timestamp); //change the format of timestamp to be readable
        var datetime = d.toLocaleString(); //format the time 
        //var time = d.toLocaleTimeString(); //format the time 

        let tr = `
                <td class="id">${x + 1}</td>
                <td class="hehe">${datetime}</td>
                <td class="hehe">${bsflproductionObj[k].amount}</td>
        `;
		
        html += tr;

        tr = `
                <td>
                <span class="bsfl-table-remove"><button type="button" class="btn btn-outline-danger btn-sm" data-toggle="tooltip" title="delete">&#10005;</button></span>
                <span class="bsfl-table-edit" data-toggle="modal" data-target="#editDataBSFLP"><button type="button" class="btn btn-outline-warning btn-sm" data-toggle="tooltip" title="edit">&#9998;</button></span>
                </td>
            </tr>
        `;

        html += tr;
    }
    //append the table with fetched data
    bsfldatalist.innerHTML = html;

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

$("#addDataFormBSFLP").submit(function(e){
    e.preventDefault();

    var amountOfLarvae = parseFloat(document.getElementById("addAmountBSFL").value);
    var timestamp = new Date().getTime();

    var data = {
        amount: amountOfLarvae,
		timestamp: timestamp
    }

    bsflproductionRef.push(data);
    $("#addDataFormBSFLP")[0].reset();
    $('#addDataBSFLP').modal('hide');
    
});

//remove data on hiding modal
$("#addDataBSFLP").on("hidden.bs.modal",function(){
    $(this).find("form")[0].reset();
})

var removeBSFL = function(f){
    f.preventDefault();

    if(confirm("Are you sure?")){
		var bsflindex = $(this).parents("tr").find("td.id").text();
		var bsfldeleteIndex;
		
		for(var x = 0; x < bsflproductionKeys.length; ++x){
			if(bsflindex-1 == x){
				bsfldeleteIndex = bsflproductionKeys[x];
			}
		}
        bsflproductionRef.child(bsfldeleteIndex).remove();
		if(bsflproductionObj === null)
		{
			bsfldatalist.innerHTML = "";
		}
    }
}

$(document).on('click', '.bsfl-table-remove', removeBSFL);

var tableID;

var updateBSFL = function(e){
    e.preventDefault();

    var index = $(this).parents("tr").find("td.id").text();
   
    tableID = index;
    
    for(var x = 0; x < bsflproductionKeys.length; ++x){
        if(tableID-1 == x){
            document.getElementById("updateAmountBSFL").value = bsflproductionObj[bsflproductionKeys[x]].amount;
        }
    }
}

$(document).on('click', '.bsfl-table-edit', updateBSFL);

$("#updateDataFormBSFLP").submit(function(e){
    e.preventDefault();

    var amountOfLarvae = parseFloat(document.getElementById("updateAmountBSFL").value);

    var updateDataBSFLP = {
        amount: amountOfLarvae
    }

    var updateIndexBSFLP;

    for(var x = 0; x < bsflproductionKeys.length; ++x){
        if(tableID-1 == x){
            updateIndexBSFLP = bsflproductionKeys[x];
        }
    }

    if(confirm("Are you sure?")){
        bsflproductionRef.child(updateIndexBSFLP).update(updateDataBSFLP);
    }
   
    $("#updateDataFormBSFLP")[0].reset();
    $('#editDataBSFLP').modal('hide');
});