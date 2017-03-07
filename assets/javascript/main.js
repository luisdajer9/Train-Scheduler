var config = {
    apiKey: "AIzaSyBXQmZ5t3JCyuy6BzULNZMv1D678VS4s48",
    authDomain: "train-fc225.firebaseapp.com",
    databaseURL: "https://train-fc225.firebaseio.com",
    storageBucket: "train-fc225.appspot.com",
    messagingSenderId: "310100948585"
  };

firebase.initializeApp(config);

var database = firebase.database();

$("#submitButton").on("click", function (event) {
	event.preventDefault()

    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrainTime = $("#trainTimeInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();

     var trainObj = {
        Name: trainName,
        Destination: destination,
        trainTime: firstTrainTime,
        Frequency: frequency,
    }

     console.log(trainObj);

     database.ref().push(trainObj);


});


database.ref().on("child_added", function (snapshot){

    console.log(snapshot);

    var firstTimeConverted = moment(snapshot.val().trainTime, "hh:mm");
    console.log("Time Converted: " + firstTimeConverted);
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("Difference in time: " + diffTime);
    var tRemainder = diffTime % snapshot.val().Frequency;
    console.log(tRemainder);
    var tMinutesTillTrain = snapshot.val().Frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    var nextTrainOfficial = moment(nextTrain).format("hh:mm")


    var trainName2 = snapshot.val().Name;
    var destination2 = snapshot.val().Destination;
    var frequency2 = snapshot.val().Frequency;

    $("#mainTable > tbody").append("<tr><td>" + trainName2 + "</td><td>" + destination2 + "</td><td>" +
  frequency2 + "</td><td>" + nextTrainOfficial + "</td><td>" + tMinutesTillTrain + "</td></tr>")


});