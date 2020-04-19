//connect to firebase database 
//get reference to the related child (Data)
var database = firebase.database();
var ref = database.ref("Data");

//select the table
var datalist = document.querySelector(".bodyData");

//fetch the data from database
ref.on("value", snap=>{
    var dataObj = snap.val();
    var keys = Object.keys(dataObj);
    
    //populate the table with data
    populateTable(dataObj,keys);
})

function populateTable(dataObj,keys){
    let html = "";

    //loop through the data
    for(var x = 0; x < keys.length; ++x){
        var k = keys[x];
        var d = new Date(dataObj[k].timestamp); //change the format of timestamp to be readable
        var datetime = d.toLocaleString(); //format the time 
        //var time = d.toLocaleTimeString(); //format the time 

        //add the html element
        if(dataObj[k].moisture == "Too Dry"){
            const tr = `
            <tr>
                <td>${x + 1}</td>
                <td>${datetime}</td>
                <td>${dataObj[k].temperature}</td>
                <td>${dataObj[k].humidity}</td>
                <td></td>
                <td><span class="badge badge-danger w-75 py-2">${dataObj[k].moisture}</span></td>
            </tr>
        `;
        html += tr;
        }else if(dataObj[k].moisture == "Too Wet"){
            const tr = `
            <tr>
                <td>${x + 1}</td>
                <td>${datetime}</td>
                <td>${dataObj[k].temperature}</td>
                <td>${dataObj[k].humidity}</td>
                <td></td>
                <td><span class="badge badge-warning w-75 py-2">${dataObj[k].moisture}</span></td>
            </tr>
        `;
        html += tr;
        }else{
            const tr = `
            <tr>
                <td>${x + 1}</td>
                <td>${datetime}</td>
                <td>${dataObj[k].temperature}</td>
                <td>${dataObj[k].humidity}</td>
                <td></td>
                <td><span class="badge badge-success w-75 py-2">${dataObj[k].moisture}</span></td>
            </tr>
        `;
        html += tr;
        }
        
    }
    //append the table with fetched data
    datalist.innerHTML = html;
}

function dataSearch(){
    var input = document.getElementById("searchInput").value;
    console.log(input);
}

