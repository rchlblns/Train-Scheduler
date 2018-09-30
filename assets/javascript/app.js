$(document).ready(function () {

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
        name = $(".train-name").val().trim();
        destination = $(".train-destination").val().trim();
        time = $(".train-time").val().trim();
        freq = $(".train-freq").val().trim();

        // Temp object to hold train data
        var newTrain = {
            name: name,
            destination: destination,
            time: time,
            freq: freq
        }

        // Uploads new train to database
        database.ref().push(newTrain);

        //Empties submitted form data
        $(".train-name").val("");
        $(".train-destination").val("");
        $(".train-time").val("");
        $(".train-freq").val("");

    });

    // Display added train information from database to page
    database.ref().on("child_added", function (snapshot) {

        var trainFreq = snapshot.val().freq;
        console.log(snapshot.val().freq);

        var firstTrain = snapshot.val().time;
        var convertedFirstTrain = moment(firstTrain, "HH:mm").subtract(1, "years");
        console.log(convertedFirstTrain);

        var currentTime = moment().format("HH:mm");
        console.log("current time: " + currentTime);

        var diffTime = moment().diff(moment(convertedFirstTrain), "minutes");
        console.log("difference in time: " + diffTime);

        var timeApart = diffTime % trainFreq;
        console.log(timeApart);

        var minutesAway = trainFreq - timeApart;

        var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");
        console.log("Next train at: " + nextArrival);

        $(".current-time").html("<h2> Current time: " + currentTime + "</h2>");

        $("#current-schedule").append(`
        <tr>
            <td>${snapshot.val().name}</td>
            <td>${snapshot.val().destination}</td>
            <td>${snapshot.val().freq}</td>
            <td>${nextArrival}</td>
            <td>${minutesAway}</td>
        </tr>
        `)
    });

});