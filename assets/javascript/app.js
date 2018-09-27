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

    $("#add-train").on("click", function(event) {

        event.preventDefault();

        name = $("#train-name").val().trim();
        destination = $("#train-destination").val().trim();
        time = $("#train-time").val().trim();
        freq = $("#train-freq").val().trim();

        database.ref().set({

            name: name,
            destination: destination,
            time: time,
            freq: freq,

        });

    });
    
});