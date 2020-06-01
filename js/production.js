//select the table
let tableHead = document.querySelector(".productionHeader");
let datalist = document.querySelector(".productionBodyData");
let dropdown = document.querySelector("#productionArea");

var database = firebase.database();
var productionRef = database.ref("Data/Production"); 

let type = "Chicken";
let areaSelected = "Area1";
let productionObj;
let productionKeys;

productionRef.on("value",snap=>{
    productionObj = snap.val();
    productionKeys = Object.keys(productionObj);
    
    populateTables();
})


function populateTables(){
    if(type == "Chicken"){
        if(productionObj[type][areaSelected] == undefined){
            areaSelected = "Area1";
        }

        let html = "";
        let rowData = "";

        let header = `
            <tr class="text-muted">
                <th>#</th>
                <th>Timestamp</th>
                <th>Amount</th>
                <th>Average Weight (kg)</th>
                <th>Sick</th>
                <th>Runt</th>
                <th>Mortality</th>
                <th>Feed Given (kg)</th>
                <th>Feed Leftover (kg)</th>
                <th>Options</th>
        `;

        for(var x = 0; x < Object.keys(productionObj[type][areaSelected]).length; ++x){
            var keys = Object.keys(productionObj[type][areaSelected])[x];

            var d = new Date(productionObj[type][areaSelected][keys].timestamp);
            var options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
            var datetime = d.toLocaleString('en-us', options); 

            let tr = `
                <tr>
                    <td class="id">${x + 1}</td>
                    <td>${datetime}</td>
                    <td>${productionObj[type][areaSelected][keys].amount}</td>
                    <td>${productionObj[type][areaSelected][keys].average}</td>
                    <td>${productionObj[type][areaSelected][keys].sick}</td>
                    <td>${productionObj[type][areaSelected][keys].runt}</td>
                    <td>${productionObj[type][areaSelected][keys].mortality}</td>
                    <td>${productionObj[type][areaSelected][keys].give}</td>
                    <td>${productionObj[type][areaSelected][keys].left}</td>
                    <td>
                    <span class="table-remove"><button type="button" class="btn btn-outline-danger btn-sm" id="deleteBtn" data-toggle="tooltip" title="delete">&#10005;</button></span>
                    <span class="table-edit"><button type="button" class="btn btn-outline-warning btn-sm" data-toggle="tooltip" title="edit">&#9998;</button></span>
                    </td>
                </tr>
            `;
            rowData += tr;
        }

        for(var x = 0; x < Object.keys(productionObj[type]).length; ++x){
            let optionsList = "";
            if(areaSelected == `${Object.keys(productionObj[type])[x]}`){
                optionsList = `
                    <option value="${Object.keys(productionObj[type])[x]}" selected>${Object.keys(productionObj[type])[x]}</option>
                `;
            }

            else{
                optionsList = `
                    <option value="${Object.keys(productionObj[type])[x]}">${Object.keys(productionObj[type])[x]}</option>
                `;
            }
            html += optionsList;
        }
        dropdown.innerHTML = html;
        tableHead.innerHTML = header;
        datalist.innerHTML = rowData;
    }

    else if(type == "BSF"){
        if(productionObj[type][areaSelected] == undefined){
            areaSelected = "Area1";
        }

        let html = "";
        let rowData = "";

        let header = `
            <tr class="text-muted">
                <th>#</th>
                <th>Timestamp</th>
                <th>Eggs Produced (Grams)</th>
                <th>Options</th>
        `;

        for(var x = 0; x < Object.keys(productionObj[type][areaSelected]).length; ++x){
            var keys = Object.keys(productionObj[type][areaSelected])[x];

            var d = new Date(productionObj[type][areaSelected][keys].timestamp);
            var options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
            var datetime = d.toLocaleString('en-us', options); 

            let tr = `
                <tr>
                    <td class="id">${x + 1}</td>
                    <td>${datetime}</td>
                    <td>${productionObj[type][areaSelected][keys].eggs}</td>
                    <td>
                    <span class="table-remove"><button type="button" class="btn btn-outline-danger btn-sm" id="deleteBtn" data-toggle="tooltip" title="delete">&#10005;</button></span>
                    <span class="table-edit"><button type="button" class="btn btn-outline-warning btn-sm" data-toggle="tooltip" title="edit">&#9998;</button></span>
                    </td>
                </tr>
            `;
            rowData += tr;
        }

        for(var x = 0; x < Object.keys(productionObj[type]).length; ++x){
            let optionsList = "";
            if(areaSelected == `${Object.keys(productionObj[type])[x]}`){
                optionsList = `
                    <option value="${Object.keys(productionObj[type])[x]}" selected>${Object.keys(productionObj[type])[x]}</option>
                `;
            }

            else{
                optionsList = `
                    <option value="${Object.keys(productionObj[type])[x]}">${Object.keys(productionObj[type])[x]}</option>
                `;
            }
            html += optionsList;
        }

        tableHead.innerHTML = header;
        datalist.innerHTML = rowData;
        dropdown.innerHTML = html;
    }

    else if(type == "BSFL"){
        if(productionObj[type][areaSelected] == undefined){
            areaSelected = "Area1";
        }

        let html = "";
        let rowData = "";

        let header = `
            <tr class="text-muted">
                <th>#</th>
                <th>Timestamp</th>
                <th>Larvae Produced (Grams)</th>
                <th>Options</th>
        `;

        for(var x = 0; x < Object.keys(productionObj[type][areaSelected]).length; ++x){
            var keys = Object.keys(productionObj[type][areaSelected])[x];

            var d = new Date(productionObj[type][areaSelected][keys].timestamp);
            var options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
            var datetime = d.toLocaleString('en-us', options); 

            let tr = `
                <tr>
                    <td class="id">${x + 1}</td>
                    <td>${datetime}</td>
                    <td>${productionObj[type][areaSelected][keys].eggs}</td>
                    <td>
                    <span class="table-remove"><button type="button" class="btn btn-outline-danger btn-sm" id="deleteBtn" data-toggle="tooltip" title="delete">&#10005;</button></span>
                    <span class="table-edit"><button type="button" class="btn btn-outline-warning btn-sm" data-toggle="tooltip" title="edit">&#9998;</button></span>
                    </td>
                </tr>
            `;
            rowData += tr;
        }

        for(var x = 0; x < Object.keys(productionObj[type]).length; ++x){
            let optionsList = "";
            if(areaSelected == `${Object.keys(productionObj[type])[x]}`){
                optionsList = `
                    <option value="${Object.keys(productionObj[type])[x]}" selected>${Object.keys(productionObj[type])[x]}</option>
                `;
            }

            else{
                optionsList = `
                    <option value="${Object.keys(productionObj[type])[x]}">${Object.keys(productionObj[type])[x]}</option>
                `;
            }
            html += optionsList;
        }

        tableHead.innerHTML = header;
        datalist.innerHTML = rowData;
        dropdown.innerHTML = html;
    }
}

$("#addBtnC").click(function(){
    if(type == "Chicken"){
        $.showModal({
            title : "Chicken" + "-" + areaSelected,
            body : '<form><div class="form-group px-5">' +
            '<input type="number" step="any" min="0" class="form-control addCProduction" name="production" id="addAmountC" required>' + 
            '<label for="addAmountC" class="CLabel" id="productionLabel">(Amount)</label></div>' + 
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control addCProduction" name="avgWeight" id="addAvgC" required>' +
            '<label for="addAvgC" class="CLabel" id="weightLabel">(Weight/KG)</label></div>' +
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control addCProduction" name="amountSick" id="addSickC" required>' + 
            '<label for="addSickC" class="CLabel" id="sickLabel">(Sick)</label></div>' + 
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control addCProduction" name="amountRunt" id="addRuntC" required>' + 
            '<label for="addRuntC" class="CLabel" id="runtLabel">(Runt)</label></div>' + 
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control addCProduction" name="amountMortality" id="addMortC" required>' +
            '<label for="addMortC" class="CLabel" id="mortalityLabel">(Mortality)</label></div>' + 
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control addCProduction" name="feedGiven" id="addfeedGiven" required>' +
            '<label for="addfeedGiven" class="CLabel" id="givenLabel">(Feed Given)</label></div>' + 
            '<div class="form-group px-5"><input type="number" step="any" min="0" class="form-control addCProduction" name="feedLeftover" id="addfeedLeft" required>' + 
            '<label for="addfeedLeft" class="CLabel" id="leftLabel">(Feed Leftover)</label></div>' + 
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
                            "<b>Amount:</b> " + $form.find("#addAmountC").val() + "<br/>" +
                            "<b>Average Weight:</b> " + $form.find("#addAvgC").val() + "<br/>" +
                            "<b>Sick:</b> " + $form.find("#addSickC").val() + "<br/>" +
                            "<b>Runt:</b> " + $form.find("#addRuntC").val() + "<br/>" +
                            "<b>Mortality:</b> " + $form.find("#addMortC").val() + "<br/>" +
                            "<b>Feed Given (kg):</b> " + $form.find("#addfeedGiven").val() + "<br/>" +
                            "<b>Feed Leftover (kg):</b> " + $form.find("#addfeedLeft").val(),
                        onSubmit: function(result){
                            if(result){
                                $.showAlert({
                                    title: "Push Status",
                                    body: "Data has been added successfully",
                                })
                                let data = {
                                    amount: parseInt($form.find("#addAmountC").val()),
                                    average: parseInt($form.find("#addAvgC").val()),
                                    sick: parseInt($form.find("#addSickC").val()),
                                    runt: parseInt($form.find("#addRuntC").val()),
                                    mortality: parseInt($form.find("#addMortC").val()),
                                    give: parseInt($form.find("#addfeedGiven").val()),
                                    left: parseInt($form.find("#addfeedLeft").val()),
                                    timestamp: new Date().getTime()
                                }

                                let myref = database.ref("Data/Production/"+type+"/"+areaSelected);
                                myref.push(data);
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
            body : '<form><div class="form-group px-5">' +
            '<input type="number" step="any" min="0" class="form-control addBSFProduction" name="production" id="addAmountBSF" required>' + 
            '<label for="addAmountBSF" class="BSFLabel" id="productionLabel">(Egg Produced)</label></div>' + 
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
                            "<b>Eggs Produced (Grams):</b> " + $form.find("#addAmountBSF").val(),
                        onSubmit: function(result){
                            if(result){
                                $.showAlert({
                                    title: "Push Status",
                                    body: "Data has been added successfully",
                                })
                                let data = {
                                    eggs : parseInt($form.find("#addAmountBSF").val()),
                                    timestamp: new Date().getTime()
                                }

                                let myref = database.ref("Data/Production/"+type+"/"+areaSelected);
                                myref.push(data);
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
        $.showModal({
            title : "BSFL" + "-" + areaSelected,
            body : '<form><div class="form-group px-5">' +
            '<input type="number" step="any" min="0" class="form-control addBSFLProduction" name="production" id="addAmountBSFL" required>' + 
            '<label for="addAmountBSFL" class="BSFLLabel" id="productionLabel">(Larvae Produced)</label></div>' + 
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
                            "<b>Larvae Produced (Grams):</b> " + $form.find("#addAmountBSFL").val(),
                        onSubmit: function(result){
                            if(result){
                                $.showAlert({
                                    title: "Push Status",
                                    body: "Data has been added successfully",
                                })
                                let data = {
                                    eggs : parseInt($form.find("#addAmountBSFL").val()),
                                    timestamp: new Date().getTime()
                                }

                                let myref = database.ref("Data/Production/"+type+"/"+areaSelected);
                                myref.push(data);
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
})

$("#productionPage li").click(function(){
    if($(this).children().attr("id") == "btnChicken"){
        document.getElementById("tableTitle").innerHTML = "Chicken";
    }

    else if($(this).children().attr("id") == "btnBsf"){
        document.getElementById("tableTitle").innerHTML = "BSF";
    }

    else if($(this).children().attr("id") == "btnBsfl"){
        document.getElementById("tableTitle").innerHTML = "BSFL";
    }

    type = document.getElementById("tableTitle").textContent;
    areaSelected = "Area1";
    populateTables();
})

var remove = function(e){
    e.preventDefault();

    var index = $(this).parents("tr").find("td.id").text();
    var deleteIndex;

    for(var x = 0; x < Object.keys(productionObj[type][areaSelected]).length; ++x){
        if(index - 1 == x){
            deleteIndex = Object.keys(productionObj[type][areaSelected])[x];
        }
    }

    if(type == "Chicken"){
        $.showConfirm({
            title: "Are you sure",
            textTrue : "Yes",
            textFalse : "No",
            body: 
                "<b>Amount:</b>" + productionObj[type][areaSelected][deleteIndex].amount + "<br/>" + 
                "<b>Average Weight:</b>" + productionObj[type][areaSelected][deleteIndex].average + "<br/>" + 
                "<b>Sick:</b>" + productionObj[type][areaSelected][deleteIndex].sick + "<br/>" + 
                "<b>Runtr:</b>" + productionObj[type][areaSelected][deleteIndex].runt + "<br/>" + 
                "<b>Mortality:</b>" + productionObj[type][areaSelected][deleteIndex].mortality + "<br/>" + 
                "<b>Feed Given:</b>" + productionObj[type][areaSelected][deleteIndex].give + "<br/>" + 
                "<b>Feed Leftover:</b>" + productionObj[type][areaSelected][deleteIndex].left,
            onSubmit: function(result){
                if(result){
                    $.showAlert({
                        title: "Delete Status",
                        body: "Data has been deleted successfully",
                    })
                    let myref = database.ref("Data/Production/"+type+"/"+areaSelected);
                    myref.child(deleteIndex).remove();
                }
            }
        })
    }

    else if(type == "BSF"){
        $.showConfirm({
            title: "Are you sure",
            textTrue : "Yes",
            textFalse : "No",
            body: 
                "<b>Eggs produced:</b>" + productionObj[type][areaSelected][deleteIndex].eggs,
            onSubmit: function(result){
                if(result){
                    $.showAlert({
                        title: "Delete Status",
                        body: "Data has been deleted successfully",
                    })
                    let myref = database.ref("Data/Production/"+type+"/"+areaSelected);
                    myref.child(deleteIndex).remove();
                }
            }
        })
    }

    else if(type == "BSFL"){
        $.showConfirm({
            title: "Are you sure",
            textTrue : "Yes",
            textFalse : "No",
            body: 
                "<b>Larvae produced:</b>" + productionObj[type][areaSelected][deleteIndex].eggs,
            onSubmit: function(result){
                if(result){
                    $.showAlert({
                        title: "Delete Status",
                        body: "Data has been deleted successfully",
                    })
                    let myref = database.ref("Data/Production/"+type+"/"+areaSelected);
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
    for(var x = 0; x < Object.keys(productionObj[type][areaSelected]).length; ++x){
        if(tableID - 1 == x){
            keys = Object.keys(productionObj[type][areaSelected])[x];
            var d = new Date(productionObj[type][areaSelected][keys].timestamp);
            var options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
            var datetime = d.toLocaleString('en-us', options); 
        }
    }

    if(type == "Chicken"){
        $.showModal({
            title : "Chicken" + "-" + areaSelected,
            body : '<form><div class="form-group px-5">' +
            '<input type="text" step="any" min="0" name="Date" class="form-control updateDateData" id="updateDate" disabled value=' + datetime + '>' +
            '<label for="updateDate" class="CLabel" id="update"></label></div>' +
            '<div class="form-group px-5"><input type="number" step="any" min="0" name="amountChicken" class="form-control updateCProduction" id="updateAmountC" value=' +
            productionObj[type][areaSelected][keys].amount + '>' +  
            '<label for="updateAmountC" class="CLabel" id="updateproductionLabel">(Amount)</label></div>' + 
            '<div class="form-group px-5"><input type="number" step="any" min="0" name="weight" class="form-control updateCProduction" id="updateAvgC" value=' +
            productionObj[type][areaSelected][keys].average + '>' +
            '<label for="updateAvgC" class="CLabel" id="updateweightLabel">(Weight/KG)</label></div>' + 
            '<div class="form-group px-5"><input type="number" step="any" min="0" name="amountSick" class="form-control updateCProduction" id="updateSickC" value=' +
            productionObj[type][areaSelected][keys].sick + '>' +
            '<label for="updateSickC" class="CLabel" id="updatesickLabel">(Sick)</label></div>' + 
            '<div class="form-group px-5"><input type="number" step="any" min="0" name="amountRunt" class="form-control updateCProduction" id="updateRuntC" value=' +
            productionObj[type][areaSelected][keys].runt + '>' + 
            '<label for="updateRuntC" class="CLabel" id="updateruntLabel">(Runt)</label></div>' + 
            '<div class="form-group px-5"><input type="number" step="any" min="0" name="amountMortality" class="form-control updateCProduction" id="updateMortC" value=' +
            productionObj[type][areaSelected][keys].mortality + '>' +
            '<label for="updateMortC" class="CLabel" id="updatemortalityLabel">(Mortality)</label></div>' + 
            '<div class="form-group px-5"><input type="number" step="any" min="0" name="feedGiven" class="form-control updateCProduction" id="updatefeedGiven" value=' +
            productionObj[type][areaSelected][keys].give + '>' + 
            '<label for="updatefeedGiven" class="CLabel" id="updategivenLabel">(Feed Given)</label></div>' + 
            '<div class="form-group px-5"><input type="number" step="any" min="0" name="feedLeftover" class="form-control updateCProduction" id="updatefeedLeft" value=' + productionObj[type][areaSelected][keys].left + '>' +
            '<label for="updatefeedLeft" class="CLabel" id="updateleftLabel">(Feed Leftover)</label></div>' + 
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
                            "<b>Amount:</b> " + $form.find("#updateAmountC").val() + "<br/>" +
                            "<b>Average Weight:</b> " + $form.find("#updateAvgC").val() + "<br/>" +
                            "<b>Sick:</b> " + $form.find("#updateSickC").val() + "<br/>" +
                            "<b>Runt:</b> " + $form.find("#updateRuntC").val() + "<br/>" +
                            "<b>Mortality:</b> " + $form.find("#updateMortC").val() + "<br/>" +
                            "<b>Feed Given (kg):</b> " + $form.find("#updatefeedGiven").val() + "<br/>" +
                            "<b>Feed leftover (kg):</b> " + $form.find("#updatefeedLeft").val(),
                        onSubmit: function(result){
                            if(result){
                                $.showAlert({
                                    title: "Push Status",
                                    body: "Data has been updated successfully",
                                })
                                let data = {
                                    amount: parseInt($form.find("#updateAmountC").val()),
                                    average: parseInt($form.find("#updateAvgC").val()),
                                    sick: parseInt($form.find("#updateSickC").val()),
                                    runt: parseInt($form.find("#updateRuntC").val()),
                                    mortality: parseInt($form.find("#updateMortC").val()),
                                    give: parseInt($form.find("#updatefeedGiven").val()),
                                    left: parseInt($form.find("#updatefeedLeft").val()),
                                }
                                let myref = database.ref("Data/Production/"+type+"/"+areaSelected);
                                myref.child(keys).update(data);
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
            body : '<form><div class="form-group px-5">' +
            '<input type="text" step="any" min="0" name="Date" class="form-control updateDateData" id="updateDate" disabled value=' + datetime + '>' +
            '<div class="form-group px-5"><label for="updateDate" class="CLabel" id="update"></label></div>' +
            '<input type="number" step="any" min="0" name="amountEgg" class="form-control updateBSFProduction" id="updateAmountBSF" value=' +
            productionObj[type][areaSelected][keys].eggs + '>' +
            '<label for="updateAmountBSF" class="BSFLabel" id="updateproductionLabel">(Egg Produced)</label></div>' + 
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
                            "<b>Eggs Produced (grams):</b> " + $form.find("#updateAmountBSF").val(),
                        onSubmit: function(result){
                            if(result){
                                $.showAlert({
                                    title: "Push Status",
                                    body: "Data has been updated successfully",
                                })
                                let data = {
                                    eggs: parseInt($form.find("#updateAmountBSF").val()),
                                }
                                let myref = database.ref("Data/Production/"+type+"/"+areaSelected);
                                myref.child(keys).update(data);
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
        $.showModal({
            title : "BSFL" + "-" + areaSelected,
            body : '<form><div class="form-group px-5">' +
            '<input type="text" step="any" min="0" name="Date" class="form-control updateDateData" id="updateDate" disabled value=' + datetime + '>' +
            '<div class="form-group px-5"><label for="updateDate" class="CLabel" id="update"></label></div>' +
            '<input type="number" step="any" min="0" name="amountEgg" class="form-control updateBSFProduction" id="updateAmountBSF" value=' +
            productionObj[type][areaSelected][keys].eggs + '>' +
            '<label for="updateAmountBSF" class="BSFLabel" id="updateproductionLabel">(Larvae Produced)</label></div>' + 
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
                            "<b>Eggs Produced (grams):</b> " + $form.find("#updateAmountBSF").val(),
                        onSubmit: function(result){
                            if(result){
                                $.showAlert({
                                    title: "Push Status",
                                    body: "Data has been updated successfully",
                                })
                                let data = {
                                    eggs: parseInt($form.find("#updateAmountBSF").val()),
                                }
                                let myref = database.ref("Data/Production/"+type+"/"+areaSelected);
                                myref.child(keys).update(data);
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

function productionAreaChange(){
    areaSelected = document.getElementById("productionArea").value;

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