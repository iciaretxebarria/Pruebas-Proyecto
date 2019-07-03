// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + " says " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("loqueseabutton").addEventListener("click", function () {
    connection.invoke("DiHola");
})
connection.on("RecibeHola", function () {
    alert("hola");
})

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    var latitud = 3.3238383;
    var longitud = 2.3838383;
    connection.invoke("SendMessage", user, message, latitud, longitud).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

//****************MAPA**********************************************************************

var mymap = L.map('mapid').setView([43.257, -2.92344], 13);


//************************************************************************

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibWlubmFoZWkiLCJhIjoiY2p4a2w5eDV1MjlrZzN6bno4YndzcGoycyJ9.t6dIk600zRcR4wHtWNZH_Q'
}).addTo(mymap);


mymap.locate({ setView: true, watch: false }) /* This will return map so you can do chaining */
    .on('locationfound', function (e) {
        var marker = L.marker([e.latitude, e.longitude]).bindPopup('Your are here :)');
        var circle = L.circle([e.latitude, e.longitude], e.accuracy / 2, {
            weight: 1,
            color: 'blue',
            fillColor: '#cacaca',
            fillOpacity: 0.2
        });
        mymap.addLayer(marker);
        mymap.addLayer(circle);
        console.log(e.latitude);
    })
    .on('locationerror', function (e) {
        console.log(e);
        alert("Location access denied.");
    });

