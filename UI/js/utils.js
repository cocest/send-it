//This script contain all the javascript utilities function

(function(){
    //constant and variables
    let window_is_opened = false;

    //utility function for setting cookies
    window.setCookie = function(cookie_name, cookie_value, exdays = 1) {
        let date = new Date();
        date.setTime(date.getTime() + (exdays*24*60*60*1000));
        let expires = "expires=" + date.toUTCString();
        document.cookie = cookie_name + "=" + cookie_value + "; " + expires;
    };

    //utility function for getting cookies
    window.getCookie = function(cookie_name) {
        let name = cookie_name + "=";
        let ca = document.cookie.split(';');
        let i = 0;
        for(; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0 )=== ' ') c = c.substring(1);
            if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
        }

        return "";
    }

    //this function prevent any action that launch 
    //windowm or panel when used
    window.forceModal = function(enable = true) {
        if (window_is_opened) {
            return true;

        } else if (enable) {
            window_is_opened = true;
            return false;
        }
    };

    //disable modal
    window.disableModal = function() {
        window_is_opened = false;
    };

    //get page scroll top position
    window.getPageScrollTop = function() {
        return document.body.scrollTop || document.documentElement.scrollTop;
    };

    //utility function to calculate number of pages base on view count
    window.getPageCount = function(view_count, count) {
        if (view_count >= count) {
            return 1;

        } else {
            let temp_num = count / view_count;

            if (temp_num % 1 == 0) {
                return temp_num;
            } else {
                return parseInt(temp_num) + 1;
            }
        }
    };

    //utility function for calculating list start index for a page. 
    //This function is important if we search list and want to use 
    //the index of the found item.
    window.getListStartIndex = function(view_count, count, index) {
        let counter = 0;

        while (counter < count) {
                        
            if (counter <= index && (counter + view_count) > index) {
                    return counter;
            }

            counter += view_count;
        }

        return 0; //not found
    };

    //utility function to remove all child element
    window.removeAllChildElement = function(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }

        //OR 

        /*
        //this method is slower
        parent.innerHTML = "";
        */
    };

    //utility function for resetting form input to default state
    window.resetForm = function(forms_name) {
        for (let i = 0; i < forms_name.length; i++) {
            document.forms[forms_name[i]].reset();
        }
    };

    //utility function that allow only one check box be selected
    window.allowOneCheckBox = function(id, check_boxes_id) {
        for (let i = 0; i < check_boxes_id.length; i++) {
            document.getElementById(check_boxes_id[i]).checked = false;
        }

        document.getElementById(id).checked = true;
    };

    //utility function used to navigate panel(div) to first panel(div)
    window.resetNavigation = function(panel_id1, panel_id2) {
        //hide current panel
        document.getElementById(panel_id2).className = "remove-elem";

        //navigate to first panel
        document.getElementById(panel_id1).removeAttribute("class");
    };
})()