//Javascript for registeration page

//initialise script
function init() {
    
    //listen to page scroll event
    window.onscroll = function(e) {
        //change the menu bar
        changeMainMenuOnScroll();
    };

    //change the menu bar on scroll event
    function changeMainMenuOnScroll() {
        let scr_dis = getPageScrollTop();
        let elem = document.querySelector(".header-menu");

        //reformat main menu bar
        if (scr_dis > 0) {
            //check if is mobile view
            if (window,innerWidth < 800) {
                elem.className = "header-menu hd-menu-height-50 theme-color-1 elem-shadow-1";

            } else { //desktop view
                elem.className = "header-menu hd-menu-height-55 theme-color-1 elem-shadow-1";
            }

        } else { //restore previous format
            //check if is mobile view
            if (window,innerWidth < 800) {
                elem.className = "header-menu hd-menu-height-50 theme-color-1";

            } else { //desktop view
                elem.className = "header-menu hd-menu-height-70 theme-color-1";
            }
        }
    }

    //this function validate user input as the user type
    function inputValidator(input_field) {
        if (input_field.name === "password") {

            let elem1 = document.getElementById("strength-bar");
            let elem2 = document.getElementById("pass-status-msg");
            
            //check if value is not empty
            if (input_field.value.length > 0) {
                //check password strength
                let pass_strength = zxcvbn(input_field.value);

                if (pass_strength.score === 0 && input_field.value.length > 0) {
                    elem1.className = "pass-str-bar1";
                    elem2.className = "status theme-txt-color-4";
                    elem2.innerHTML = "Too weak";

                } else if (pass_strength.score === 1) {
                    elem1.className = "pass-str-bar25";
                    elem2.className = "status theme-txt-color-4";
                    elem2.innerHTML = "Still weak";

                } else if (pass_strength.score === 2) {
                    elem1.className = "pass-str-bar50";
                    elem2.className = "status theme-txt-color-5";
                    elem2.innerHTML = "Acceptable";

                } else if (pass_strength.score === 3) {
                    elem1.className = "pass-str-bar75";
                    elem2.className = "status theme-txt-color-5";
                    elem2.innerHTML = "Strong";

                } else if (pass_strength.score === 4) {
                    elem1.className = "pass-str-bar100";
                    elem2.className = "status theme-txt-color-5";
                    elem2.innerHTML = "Good";
                }

                //validate user password
                if (pass_strength.score > 1){
                    //password acceptable

                } else {
                    //password not acceptable
                }

            } else {
                elem1.className = "pass-str-bar";
                elem2.className = "status theme-txt-color-3";
                elem2.innerHTML = "Status";
            }

            //check if the two typed password match each other
            let value = checkPasswordMatch(input_field.value, document.getElementById("retype-password").value); //you can use the returned value for validation

        } else if (input_field.name === "retypepassword") {
            //check if the two typed password match each other
            let value = checkPasswordMatch(input_field.value, document.getElementById("password").value); //you can use the returned value for validation
        }

        //you can add more "else if" to validate more user input in real time here
    }

    //get all input element
    var inputs = document.getElementsByTagName("input");

    //listen to different event
    for (var i = 0; i < inputs.length; i++) {
        //check if input is password
        if (inputs[i].getAttribute("name") === "password") {
            //listen to keyup event
            inputs[i].addEventListener('keyup', function(){
               //validate user input
               inputValidator(this);
            }, false);
        }

        //check if input is retype password
        if (inputs[i].getAttribute("name") === "retypepassword") {
            //listen to keyup event
            inputs[i].addEventListener('keyup', function(){
               //validate user input
               inputValidator(this);
            }, false);
        }

        //add more input here to listen to keyup and other event
    }

    //display help message about an input to the user
    window.openInputHelp = function(msg_panel_id) {
        if (msg_panel_id == "user-id-help") {
            document.getElementById("user-id-help").className = "input-help-msg-panel-cont theme-color-8";
        }

        //other code here
    };

    //close help message panel
    window.closeInputHelp = function(msg_panel_id) {
        if (msg_panel_id == "user-id-help") {
            document.getElementById("user-id-help").className = "input-help-msg-panel-cont theme-color-8 remove-elem";
        }

        //other code here
    };

    //check if the two typed password match and indicate that to the user
    function checkPasswordMatch(value1, value2) {
        if (!(value1.length > 0 || value2.length > 0)) {
            return false;
        }
        
        let elem = document.getElementById("pass-match-cont");

        if (value1 == value2) {
            elem.className = "input-marker-left-icon theme-txt-color-2";
            return true;
            
        }
        
        elem.className = "input-marker-left-icon theme-txt-color-2 hide";
        return false;
    }

    //process sign up form
    window.processSignUpForm = function(e) {
        e.preventDefault();

        //redirect user to account page.
        //this is for testing, your free to remove this
        window.location.replace('../user/index.html');

        //your code here
    };
}

//initialise the script
if(window.addEventListener){
    window.addEventListener("load", init, false);
    
} else if(window.attachEvent){
    window.attachEvent("onload", init);

} else{
    document.addEventListener("load", init, false);
}