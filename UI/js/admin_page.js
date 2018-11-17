//initialise script
function init() {
    let combo_box_active_menu_handler = null;
    let combo_box_menu_sync = 0;
    

    //change parcel delivery order
    window.changeParcelOrderStatus = function(status, parcel_id) {
        switch (status) {
            case 'intransit':
                //code here

                break;

            case 'delivered':
                //code here

                break;

            case 'cancel':
                //code here

                break;
        }
    }

    //save the edited parcel order location
    window.saveEditedOrderLocation = function(parcel_id) {
        //get edited location
        let elem = document.querySelector(".order-location-editor.id-13252374");
        let new_loc = formatEnteredOrderLocation(elem.innerHTML);
        console.log("Saved: " + new_loc);
    };

    //this function processes the input
    function formatEnteredOrderLocation(location) {
        //do the formating here
        return location;
    }

    /****************************************
    **********ComboBoxMenu section***********
    *****************************************/

    //listen on click event on page
    document.body.onclick = function (e) {
        if (combo_box_menu_sync == 0) { //close menu
            if (combo_box_active_menu_handler !== null) {
                //close menu opened by another combo box menu
                closeComboBoxActiveMneu();
            }

        } else { //menu close by combo box button
            combo_box_menu_sync = 0;
        }
    };

    window.comboBoxMenu = function (combo_box_launch_btn, menu_id) {
        if (forceModal(false)) {
            return;
        }

        let elem = document.getElementById(menu_id);

        //check if is not this combo box that opened menu if any
        if (elem !== combo_box_active_menu_handler) {
            //close menu opened by another combo box menu
            closeComboBoxActiveMneu();
        }

        //check menu state
        if (elem.getAttribute("state") == "0") { //show menu
            elem.setAttribute("state", "1");
            elem.className = "combo-box-menu theme-color-4 elem-shadow";

            //position menu
            let menu_pos = getComboBoxPos(combo_box_launch_btn, elem);
            elem.setAttribute("style", "top: " + menu_pos.y + "px; " + "left: " + menu_pos.x + "px;");

            combo_box_active_menu_handler = elem;

        } else { //close menu
            elem.setAttribute("state", "0");
            elem.className = "combo-box-menu theme-color-4 elem-shadow remove-elem";
        }

        combo_box_menu_sync = 1;
    };

    //calculate comboBox position
    function getComboBoxPos(relative_elem, combo_box) {
        let lb = relative_elem.getBoundingClientRect();
        let shift_w = combo_box.offsetWidth - lb.width
        let c_x = lb.x - shift_w;
        let c_y = lb.y + lb.height + 1;

        return {x: c_x, y: c_y};
    }

    //close menu opened by another combo box menu
    function closeComboBoxActiveMneu() {
        if (combo_box_active_menu_handler !== null) {
            combo_box_active_menu_handler.setAttribute("state", "0");
            combo_box_active_menu_handler.className = "combo-box-menu theme-color-4 elem-shadow remove-elem";
            combo_box_active_menu_handler = null;
        }
    }

    //adapt page UI height
    function adaptPageHeightUI() {
        let elem = document.querySelector(".page-content-cont"); //get page container
        let pc_h = elem.offsetHeight;
        let w_h = window.innerHeight;

        //check to set page height to window height
        if (pc_h < w_h) {
            //set page height to window height
            document.body.setAttribute("style", "height: " + (w_h - 2) + "px;");
        } else {
            document.body.removeAttribute("style");
        }
    }

    //listen to window resized
    window.onresize = function(e) {
        adaptPageHeightUI()
    };

    //adapt page UI height
    adaptPageHeightUI();
}

//initialise the script
if (window.addEventListener) {
    window.addEventListener("load", init, false);

} else if (window.attachEvent) {
    window.attachEvent("onload", init);

} else {
    document.addEventListener("load", init, false);
}