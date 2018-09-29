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

    // Adding new train to train schedule table
    $("#add-train").on("click", function (event) {

        event.preventDefault();

        //Grabs user input from form 
        name = $("#train-name").val().trim();
        destination = $("#train-destination").val().trim();
        time = $("#train-time").val().trim();
        freq = $("#train-freq").val().trim();

        // Temp object to hold train data
        var newTrain= {
            name: name,
            destination: destination,
            time: time,
            freq: freq
        }

        // Uploads new train to database
        database.ref().push(newTrain);

        $("#train-name").empty("");
        $("#train-destination").empty("");
        $("#train-time").empty("");
        $("#train-freq").empty("");
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
        </tr>
        `)
    });

    // //Calculating how many mins away the train is and the next arrival time
    // var firstTime = database.val().time

});