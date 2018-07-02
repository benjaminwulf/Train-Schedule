  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD-3EiHgygh66XAfl37NZe_neMgBQCcOSc",
    authDomain: "train-schedule-d5b60.firebaseapp.com",
    databaseURL: "https://train-schedule-d5b60.firebaseio.com",
    projectId: "train-schedule-d5b60",
    storageBucket: "",
    messagingSenderId: "213660198524"
  };
  firebase.initializeApp(config);

// Reference form 
var formRef = firebase.database().ref('train-form');

// Listen for form submit
// In vanilla js
document.getElementById('train-form').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    console.log(123);

    // Get values
    var name = getInputVal('name');
    var destination = getInputVal('destination');
    var firstTrain = getInputVal('firstTrain');
    var frequency = getInputVal('frequency');

    // Save Form
    saveForm(name, destination, firstTrain, frequency);
};

// In jQuery //bww_not_working
//
// code goes here
//

// Function to get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save form to firebase
function saveForm(name, destination, firstTrain, frequency) {
    var newFormRef = formRef.push();
    newFormRef.set({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    });
}

// Display to Current Train Schedule in Table
var rootRef = firebase.database().ref().child("train-form")

rootRef.on("child_added", snap => {
    var displayName = snap.child("name").val();
    var displayDestination = snap.child("destination").val();
    var displayFirstTrain = snap.child("firstTrain").val();
    var displayFequency = snap.child("frequency").val();
  
    // Use Durations to compare
    var date = moment().format("MM/DD/YYYY " + displayFirstTrain);
    var ts = moment(date).unix();
    console.log("date", date);
    console.log("unix", ts);

    $("#train-schedule").append("<tr><td>" + displayName + "</td><td>" + displayDestination + "</td><td>" + displayFequency + "</td>")

});