var database = firebase.database();
var ref = database.ref("Data");

var datalist = document.querySelector(".bodyData");

ref.once("value", snap=>{
    var dataObj = snap.val();
    var keys = Object.keys(dataObj);
    
    let html = "";

    for(var x = 0; x < keys.length; ++x){
        var k = keys[x];

        //console.log(dataObj[k].temperature,dataObj[k].humidity,dataObj[k].moisture,dataObj[k].timestamp);
        const tr = `
            <tr>
                <td>${x + 1}</td>
                <td>${dataObj[k].timestamp}</td>
                <td>${dataObj[k].temperature}</td>
                <td>${dataObj[k].humidity}</td>
                <td></td>
                <td>${dataObj[k].moisture}</td>
            </tr>
        `;
        html += tr;
    }
    datalist.innerHTML = html;
})