//Javascript for homepage or landing page

//initialise script
function init() {
    //global variable here
    const login_panel_elem = document.getElementById("signin-panel-cont");
    let is_drop_down_menu_active = false;
    let is_login_panel_open = false;

    //listen to page scroll event
    window.onscroll = function(e) {
        //change the menu bar
        changeMainMenuOnScroll();

        //position login panel relative to main header menu
        fixedLoginPanel();
    };

    //listen on page resize event
    window.onresize = function(e) {
        //login panel
        if (is_login_panel_open && window.innerWidth >= 800) {
            //enable page scrolling
            elem1 = document.getElementsByTagName("body")[0];
            elem1.removeAttribute("style");

        } else if (is_login_panel_open) {
            //disable page from scrolling
            elem1 = document.getElementsByTagName("body")[0];
            elem1.setAttribute("style", "overflow-y: hidden;");
        }

        //hide drop down menu when view switched to desktop
        if (is_drop_down_menu_active && window.innerWidth >= 800) {
            dropMainMenu();
        }
    };

    //show or hide mobile main menu
    window.dropMainMenu = function(e) {
        if (!is_drop_down_menu_active){ //show menu
            closeActivePanel();

            is_drop_down_menu_active = true;

            //reset header main menu to default
            defaultMainMenu();

            //show menu
            elem1 = document.getElementById("dropdown-main-menu-cont");
            elem1.className = "show elem-shadow";

            //show shadow
            elem1 = document.getElementById("bg-shade-for-active-menu");
            elem1.removeAttribute("class");

            //disable page from scrolling
            elem1 = document.getElementsByTagName("body")[0];
            elem1.setAttribute("style", "overflow-y: hidden;");

        } else { //hide menu
            is_drop_down_menu_active = false;
            changeMainMenuOnScroll(); //change to current state

            //hide menu
            elem1 = document.getElementById("dropdown-main-menu-cont");
            elem1.className = "hide";

            //hide shadow
            elem1 = document.getElementById("bg-shade-for-active-menu");
            elem1.className = "remove-elem";

            //enable page scrolling
            elem1 = document.getElementsByTagName("body")[0];
            elem1.removeAttribute("style");
        }
    };

    //listen for click event on shadow
    window.shawdowClicked = function(e) {
        closeActivePanel();
    };

    //change the menu bar on scroll event
    function changeMainMenuOnScroll() {
        if (is_login_panel_open) {
            return;
        }

        let scr_dis = getPageScrollTop();

        //reformat main menu bar
        if (scr_dis > 0) {
            changeMainMenu();

        } else { //restore previous format
            defaultMainMenu();
        }
    }

    //position login panel relative to main header menu
    function fixedLoginPanel() {
        if (is_login_panel_open){
            let y_pos = getPageScrollTop();
            login_panel_elem.setAttribute("style", "top: " + (68 + y_pos) + "px;"); //"top: " + (header menu height + y_pos)
        }
    }

    //show the login panel when user clicked the login button
    window.launchLoginPanel = function(e) {
        if (!is_login_panel_open) { //show
            closeActivePanel();

            is_login_panel_open = true;

            defaultMainMenu(); //change main menu bar to default
            fixedLoginPanel(); //position panel
            login_panel_elem.className = "theme-color-4"; //remove remove-elem class
            
            //change login launch button background color
            let elem = document.querySelector(".header-menu .menu-login-cont");
            elem.className = "menu-login-cont theme-color-4";
            elem = document.querySelector(".header-menu .menu-login-cont .login-icon-fmt");
            elem.className = "fas fa-user-circle login-icon-fmt theme-txt-color-2";
            elem = document.querySelector(".header-menu .menu-login-cont .login-txt-fmt");
            elem.className = "login-txt-fmt theme-txt-color-2";

            //show shadow
            elem = document.getElementById("bg-shade-for-active-menu");
            elem.removeAttribute("class");

            //check if view is mobile
            if (window.innerWidth < 800) {
                //disable page from scrolling
                elem = document.getElementsByTagName("body")[0];
                elem.setAttribute("style", "overflow-y: hidden;");
            }

        } else { //remove
            is_login_panel_open = false;
            login_panel_elem.className = "theme-color-4 remove-elem"; //remove remove-elem class

            changeMainMenuOnScroll();

            //change login launch button background color
            let elem = document.querySelector(".header-menu .menu-login-cont");
            elem.className = "menu-login-cont";
            elem = document.querySelector(".header-menu .menu-login-cont .login-icon-fmt");
            elem.className = "fas fa-user-circle login-icon-fmt theme-txt-color-1";
            elem = document.querySelector(".header-menu .menu-login-cont .login-txt-fmt");
            elem.className = "login-txt-fmt theme-txt-color-1";

            //hide shadow
            elem = document.getElementById("bg-shade-for-active-menu");
            elem.className = "remove-elem";

            //check if view is mobile
            if (window.innerWidth < 800) {
                //enable page scrolling
                elem = document.getElementsByTagName("body")[0];
                elem.removeAttribute("style");
            }
        }
    };

    //show and hide sign in password at given interval
    window.shownSignPassword = function(e) {
        let elem1 = document.getElementById("sigin-input-password");

        if (elem1.value == ''){
            return;
        }
        
        //show password
        let elem2 = document.getElementById("show-pass-btn");
        elem1.setAttribute("type", "text");
        elem2.className = "input-marker-left-icon show";

        //hide password
        setTimeout(() => {
            elem1.setAttribute("type", "password");
            elem2.className = "input-marker-left-icon hide";
        }, 1000)
    };

    //change main menu bar to default
    function defaultMainMenu() {
        let elem1 = document.querySelector("ul.hr-bar-menu");
        let elem2 = document.querySelector("div.header-menu");
        elem1.className = "hr-bar-menu hr-bar-menu-fm-1 right-align";
        elem2.className = "header-menu hr-menu-th-1";
    }

    //change main menu height and make it transparent
    function changeMainMenu() {
        let elem1 = document.querySelector("ul.hr-bar-menu");
        let elem2 = document.querySelector("div.header-menu");
        elem1.className = "hr-bar-menu hr-bar-menu-fm-2 right-align";
        elem2.className = "header-menu hr-menu-th-2";
    }

    //close any active menu and panel
    function closeActivePanel() {
        if (is_drop_down_menu_active) {
            //hide mobile main menu
            dropMainMenu();

        } else if (is_login_panel_open) {
            //hide login panel
            launchLoginPanel();
        }
    }

    //process sign in form
    window.processSignInForm = function(e) {
        e.preventDefault();

        //redirect user to account page.
        //this is for testing, your free to remove this
        window.location.replace('./user/parcel_delivery.html');

        //your code here
    }
}

//initialise the script
if(window.addEventListener){
    window.addEventListener("load", init, false);

} else if(window.attachEvent){
    window.attachEvent("onload", init);
    
} else{
    document.addEventListener("load", init, false);
}