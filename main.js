console.log("Activated");
Parse.initialize("DgBDs1CzUnMIm8x5yECBoIR5OyPxSncvBiKPop2R", "GJFbCRMyG6CXeTQu1kYUPWx2JhufPPMQndya6OPu");
var session = null;
var Session = Parse.Object.extend("Session");
var session = new Session();
var Player= Parse.Object.extend("Player");
var player = new Player();
player.set("Name", prompt("Enter your username"));
player.save(null, {
       success: function(object) {
         $(".success").show();
       },
       error: function(model, error) {
        $(".error").show();
       }
});  
function joinLobby(){
  var ses = Parse.Object.extend("Session");
    var query = new Parse.Query(ses);
    query.equalTo("sessionName", document.getElementById("lobby").value);
    query.find({
    success: function(results) {
      console.log("Successfully retrieved " + results.length );
      // Do something with the returned Parse.Object values
      session = document.getElementById("lobby").value;
      console.log("session: "+session);
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });  
}    
function createLobby(){
  var ses = Parse.Object.extend("Session");
    var query = new Parse.Query(ses);
    var exists = false;
    query.equalTo("sessionName", document.getElementById("lobby").value);
    query.find({
    success: function(results) {
      console.log("Successfully retrieved " + results.length );
      if(results.length!=0){
        alert("Session already exists");
        exists = true;
      }
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });  
  if(exists==false){
      session.set("sessionName",document.getElementById("lobby").value);
      var Players = Parse.Object.extend("Player");
      var query = new Parse.Query(Players);
      query.equalTo("Name", "zzz");
      query.find({

      success: function(results) {
        var query2 = new Parse.Query(Players);
        query2.get(results[0].id, {
          success: function(k) {
            console.log(k);
            session.add("Players", k);
           },
           error: function(object, error) {
              // The object was not retrieved successfully.
              // error is a Parse.Error with an error code and message.
            }
      });
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
      });  
      
      session.save(null, {
       success: function(object) {
         $(".success").show();
       },
       error: function(model, error) {
        $(".error").show();
       }
      }); 
  }
}  
function test(){
 var ses = Parse.Object.extend("Session");
    var query = new Parse.Query(ses);
    query.equalTo("sessionName", document.getElementById("lobby").value);
    query.find({
    success: function(results) {
      console.log("Successfully retrieved " + results.length + " locations");
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) {
        var object = results[i];
        console.log('hello');
        console.log(object.get('Players')[0]);
      }
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });  
}
function sendAnswers(){
  var answers = [document.getElementById("1").value,
  document.getElementById("2").value,
  document.getElementById("3").value,
  document.getElementById("4").value,
  document.getElementById("5").value,
  document.getElementById("6").value,
  document.getElementById("7").value,
  document.getElementById("8").value,
  document.getElementById("9").value,
  document.getElementById("10").value,
  document.getElementById("11").value,
  document.getElementById("12").value,];
  user.set("Answers",answers);
      user.save(null, {
       success: function(object) {
         $(".success").show();
       },
       error: function(model, error) {
        $(".error").show();
       }
      });  
}