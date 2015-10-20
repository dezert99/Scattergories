var session = null;
var User = Parse.Object.extend("Session");
var user = new User();
Parse.initialize("DgBDs1CzUnMIm8x5yECBoIR5OyPxSncvBiKPop2R", "GJFbCRMyG6CXeTQu1kYUPWx2JhufPPMQndya6OPu");
console.log("Activated");
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

      user.set("User","Chris");
      user.set("sessionName",document.getElementById("lobby").value);
      user.save(null, {
       success: function(object) {
         $(".success").show();
       },
       error: function(model, error) {
        $(".error").show();
       }
      });
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