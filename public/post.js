$(document).ready(function() {
  /* Generic errorHandler fn for amount & mssidn input fields */
  function handleError(uiComponent) {
    var msg = uiComponent == "amount" ? "Amount" : "Phone Number";
    $("."+uiComponent).css("border","1px solid #e01515").attr("placeholder","Invalid " + msg);
  }
  
  /* Reset input fields' error messages  */
  function resetErrorMessages() {
    $("input").css("border","1px solid #eee");
    $(".amount").attr("placeholder","Enter Amount");
    $(".number").attr("placeholder", "Phone Number");
  }
  
  /* Convert valid mssidn to a uniform 254********* format */
  function parseMssidn(n) {
        var strArray = n.split("");
        strArray[0] == "0" ? strArray.splice(0, 1, "254") : 
                        (strArray[0] == "+" ? strArray.splice(0,1) : strArray);
        return strArray.join("");
  }
  
  /* Helper function to be used to update AppUI w.r.t. processing timeout */
  var defaultTimeout;
  function startCountdown() {
    $(".processing span span").text("[" + defaultTimeout + "s]");
    var counter = setInterval(function() {
      defaultTimeout--;
      var parsedTime = (defaultTimeout < 10) ? "0" + defaultTimeout : defaultTimeout; 
      if(defaultTimeout>=0) {
        $(".processing span span").text("[" + parsedTime + "s]");
      } else {
        $(".processing span span").text("");
        clearInterval(counter);
      }
    }, 1000);
  }
  
  $("input").click(function() {
    resetErrorMessages();
  });
  
 $("#inputForm").submit(function(e) {
    $(".processing span").text("Processing");
    $(".processing i").show();
    
    var amnt = $(".amount").val();
    var number = $(".number").val();
    
   /*Input validation - validation LY1*/
    if(amnt.length !=0 && !(isNaN(amnt)) && amnt>0) {
      /* Only allow +254*********, 254*********, 07******** */
      var regExPattern = /^(?:254|\+254|0)?(7(?:(?:[129][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$/;
      var isNumberValid = regExPattern.test(number);
      
      if(isNumberValid) {
        var data = {amnt: amnt,number: parseMssidn(number)}
        
        /* Form input check successful */
        alert('Post input data to Node server ' + JSON.stringify(data) +')');
        
        /* Incase of input error, reset input fields to default styling */
        resetErrorMessages();
        
        /* Make ajax call here */
        
        /* End ajax call */
      } else {
        handleError("number");
      }
    } else {
      handleError("amount");
    }
  });
});
