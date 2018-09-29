$(document).ready(function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyB1ex1ubIz602BPsYqueJwVUVqtWTcvczE",
        authDomain: "myfirstapp-fd038.firebaseapp.com",
        databaseURL: "https://myfirstapp-fd038.firebaseio.com",
        projectId: "myfirstapp-fd038",
        storageBucket: "myfirstapp-fd038.appspot.com",
        messagingSenderId: "419460281424"
    };
    firebase.initializeApp(config);


    var database = firebase.database();

    $("#add-train").on("click", function (event) {

        event.preventDefault();

        name = $("#train-name").val().trim();
        destination = $("#train-destination").val().trim();
        time = $("#train-time").val().trim();
        freq = $("#train-freq").val().trim();

        database.ref().push({

            name: name,
            destination: destination,
            time: time,
            freq: freq,

        });

    });

    database.ref().on("value", function(snapshot) {

        console.log(snapshot.val());
        console.log(snapshot.val().name);
        console.log(snapshot.val().destination);
        console.log(snapshot.val().time);
        console.log(snapshot.val().freq);

        $("#train-name").text(snapshot.val().name);
        $("#train-destination").text(snapshot.val().destination);
        $("#train-time").text(snapshot.val().time);
        $("#train-freq").text(snapshot.val().freq);

        }, function(errorObject) {
            console.log("Error handled: " + errorObject.code);
        
        console.log(snapshot);

    });

    database.ref().on("child_added", function(snapshot){
        $("#current-schedule").append(`
        <tr>
            <td>${snapshot.val().name}</td>
            <td>${snapshot.val().destination}</td>
            <td>${snapshot.val().freq}</td>
            <td>${snapshot.val().time}</td>
        </tr>
        `)
    });
});