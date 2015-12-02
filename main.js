console.log("Activated");
Parse.initialize("DgBDs1CzUnMIm8x5yECBoIR5OyPxSncvBiKPop2R", "GJFbCRMyG6CXeTQu1kYUPWx2JhufPPMQndya6OPu");
var session = null;
var Session = Parse.Object.extend("Session");
var session = new Session();
var Player= Parse.Object.extend("Player");
var player = new Player();
var creator;
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
    query.include("Creator");
    query.include("Players");
    query.find({
    success: function(results) {
      console.log("Successfully retrieved " + results.length );
      // Do something with the returned Parse.Object values
      session = results[0];
      player.set("ansID",session.get("userCount")+1);
      console.log("Set");
      console.log(session.get("Players").length);
      player.save(null, {
        success: function(object) {
          $(".success").show();
          console.log("Player saved...");
        },
        error: function(model, error) {
          $(".error").show();
          console.log("Player failed to save. Error code: "+error.code);
        }
      });
      addPlayer(session,player);
      console.log("session joined: "+session.get("Name"));
      console.log("The creator is: "+session.get("Creator").get("Name"));
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });  
}    
var crap;
function sendAnswers(){
	//var ansID = player.get("ansID");
	var answers=[];
	for(var x = 1; x<=12; x++){
		answers.push(document.getElementById(""+x).value);
	}
	answers.push(player.get("ansID"));
	session.add("Answers", answers);
    session.save(null, {
      success: function(object) {
        $(".success").show();
        crap = object;
        console.log("Answers sent");
      },
      error: function(model, error) {
        $(".error").show();
        console.log("Session failed to create. Error code: "+error.code);
      }
    });  
}
function createLobby() {
  var ses = Parse.Object.extend("Session");
  var query = new Parse.Query(ses);
  query.equalTo("sessionName", document.getElementById("lobby").value);
  query.find({
    success: function(results) {
      console.log("Successfully retrieved " + results.length );
      // Do something with the returned Parse.Object values
      //session = document.getElementById("lobby").value;
      if(results.length !=0 ){
        alert("Session already exists");
        return;
      }

      session.set("Creator", player);
      session.set("sessionName", document.getElementById("lobby").value);
      player.set("ansID",0);
      player.save(null, {
        success: function(object) {
          //$(".success").show();
          console.log("Player saved...");
        },
        error: function(model, error) {
          //$(".error").show();
          console.log("Player failed to save. Error code: "+error.code);
        }
      });      
      addPlayer(session, player);
      session.set("userCount",1);
      session.save(null, {
      	success: function(object){
      		console.log("Session saved");
      	},
      	error: function(model, error){
      		console.log("Session failed to save");
      	}

      })

    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  }); 
	$("#Starter").hide(3);
	$("#inSes").show(3);
}
function addPlayer(session, player){
      console.log("Creating session...");
      session.add("Players", player);
      session.set("userCount",session.get("userCount")+1);
      session.save(null, {
        success: function(object) {
          $(".success").show();
          console.log("Session created!");
        },
        error: function(model, error) {
          $(".error").show();
          console.log("Session failed to create. Error code: "+error.code);
        }
      });
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
function getAns(){
	for(var x=0;x<session.get("Answers").length;x++){
		var answers = session.get("Answers")[x];
		var answerOBJ = {
			a1:answers[0],
			a2:answers[1],
			a3:answers[2],
			a4:answers[3],
			a5:answers[4],
			a6:answers[5],
			a7:answers[6],
			a8:answers[7],
			a9:answers[8],
			a10:answers[9],
			a11:answers[10],
			a12:answers[11]
		}
		var template = $("#template").html();
		var html=Mustache.render(template, answerOBJ);
		$("#test").append(html);
	}
}
$(document).ready(function(){
	var testing = {
	a1:"1",
	a2:"2",
	a3:"3"
	}
	var template = $("#template").html();
	var html=Mustache.render(template, testing);
	$("#test").html(html);
});


// function sendAnswers(){
//   var answers = [document.getElementById("1").value,
//   document.getElementById("2").value,
//   document.getElementById("3").value,
//   document.getElementById("4").value,
//   document.getElementById("5").value,
//   document.getElementById("6").value,
//   document.getElementById("7").value,
//   document.getElementById("8").value,
//   document.getElementById("9").value,
//   document.getElementById("10").value,
//   document.getElementById("11").value,
//   document.getElementById("12").value,];
//   user.set("Answers",answers);
//       user.save(null, {
//        success: function(object) {
//          $(".success").show();
//        },
//        error: function(model, error) {
//         $(".error").show();
//        }
//       });  
// }