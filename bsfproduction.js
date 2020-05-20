//select the table
var bsfdatalist = document.querySelector(".bsfproductionBodyData");

var bsfproductionObj;
var bsfproductionKeys;

//fetch the data from database
bsfproductionRef.on("value", snap=>{
    //var dataObj = snap.val();
    //var keys = Object.keys(dataObj);
    bsfproductionObj = snap.val();
    bsfproductionKeys = Object.keys(bsfproductionObj);

    //populate the table with data
    populateTableBSFP();
})

function populateTableBSFP(){
    var html = "";
    
    //loop through the data
		for(var x = 0; x < bsfproductionKeys.length; ++x){
        var k = bsfproductionKeys[x];
        var d = new Date(bsfproductionObj[k].timestamp); //change the format of timestamp to be readable
        var datetime = d.toLocaleString(); //format the time 
        //var time = d.toLocaleTimeString(); //format the time 

        let tr = `
                <td class="id">${x + 1}</td>
                <td class="hehe">${datetime}</td>
                <td class="hehe">${bsfproductionObj[k].amount}</td>
         <td>
                <span class="bsf-table-remove"><button type="button" class="btn btn-outline-danger btn-sm" data-toggle="tooltip" title="delete">&#10005;</button></span>
                <span class="bsf-table-edit" data-toggle="modal" data-target="#editDataBSFP"><button type="button" class="btn btn-outline-warning btn-sm" data-toggle="tooltip" title="edit">&#9998;</button></span>
                </td>
            </tr>
        `;

        html += tr;
    }
    
    //append the table with fetched data
	bsfdatalist.innerHTML = html;
	
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

$("#addDataFormBSFP").submit(function(e){
    e.preventDefault();

    var amountOfEgg = parseFloat(document.getElementById("addAmountBSF").value);
    var timestamp = new Date().getTime();

    var data = {
        amount: amountOfEgg,
		timestamp: timestamp
    }

    bsfproductionRef.push(data);
    $("#addDataFormBSFP")[0].reset();
    $('#addDataBSFP').modal('hide');
});

//remove data on hiding modal
$("#addDataBSFP").on("hidden.bs.modal",function(){
    $(this).find("form")[0].reset();
})

var removeBSF = function(f){
    f.preventDefault();

    if(confirm("Are you sure?")){
		var bsfindex = $(this).parents("tr").find("td.id").text();
	
		var bsfdeleteIndex;
		for(var x = 0; x < bsfproductionKeys.length; ++x){
			if(bsfindex-1 == x)
			{
				bsfdeleteIndex = bsfproductionKeys[x];
			}
		}
	
		//populate the table with data
		bsfproductionRef.child(bsfdeleteIndex).remove();
		if(bsfproductionObj === null)
		{
			bsfdatalist.innerHTML = "";
		}
	}
}

$(document).on('click', '.bsf-table-remove', removeBSF);

var tableID;

var updateBSF = function(e){
    e.preventDefault();

    var index = $(this).parents("tr").find("td.id").text();
   
    tableID = index;
    
    for(var x = 0; x < bsfproductionKeys.length; ++x){
        if(tableID-1 == x){
            document.getElementById("updateAmountBSF").value = bsfproductionObj[bsfproductionKeys[x]].amount;
        }
    }
}

$(document).on('click', '.bsf-table-edit', updateBSF);

$("#updateDataFormBSFP").submit(function(e){
    e.preventDefault();

    var amountOfEgg = parseFloat(document.getElementById("updateAmountBSF").value);

    var updateDataBSFP = {
        amount: amountOfEgg
    }

    var updateIndexBSFP;

    for(var x = 0; x < bsfproductionKeys.length; ++x){
        if(tableID-1 == x){
            updateIndexBSFP = bsfproductionKeys[x];
        }
    }

    if(confirm("Are you sure?")){
        bsfproductionRef.child(updateIndexBSFP).update(updateDataBSFP);
    }
   
    $("#updateDataFormBSFP")[0].reset();
    $('#editDataBSFP').modal('hide');
});