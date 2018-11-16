//initialise script
function init() {
    const goto_input_elem = document.getElementById("goto-parcel-del"); //search input
    let delivery_order_view_count = 3; //default
    let delivery_order_length = 14; //number of parcel order yet to deliverd
    let current_page = 1; //use this variable to hold current page
    let combo_box_active_menu_handler = null;
    let combo_box_menu_sync = 0;
    let current_parcel_delivery_id;

    //search for active parcel delivery
    window.searchParcelDelivery = function () {
        if (forceModal(false)) {
            return;
        }

        //code here
    };

    //listen to goto to particular parcel enter event
    goto_input_elem.onkeypress = function (e) {
        if (forceModal(false)) {
            return;
        }

        let keycode = (e.keyCode ? e.keyCode : e.which);

        if (keycode == "13") {
            navigateParcelDeliveryOrderPage(e.currentTarget.value);
        }
    };

    //listen to next parcel delivery click event
    window.nextParcelDelivery = function (e) {
        if (forceModal(false)) {
            return;
        }

        //check if is not last page
        if (current_page + 1 <= getPageCount(delivery_order_view_count, delivery_order_length)) {
            navigateParcelDeliveryOrderPage(current_page + 1);
        }
    };

    //listen to previous parcel delivery click event
    window.prevParcelDelivery = function (e) {
        if (forceModal(false)) {
            return;
        }

        if (current_page - 1 > 0) {
            navigateParcelDeliveryOrderPage(current_page - 1);
        }
    };

    //utility function for navigating through parcel delivery order page
    function navigateParcelDeliveryOrderPage(goto) {
        let goto_page = parseInt(goto);

        if (goto_page && goto_page > 0 &&
            goto_page < getPageCount(delivery_order_view_count, delivery_order_length) + 1) {

            let list_start_index = (goto_page * delivery_order_view_count) - delivery_order_view_count; //index to start from and list to view

            //create table row from list and append to table
            listParcelDeliveryOrder(list_start_index, delivery_order_view_count);

            current_page = goto_page; //set current page

            //update goto input value
            goto_input_elem.value = current_page;

        } else {
            //reset user entered number to previous number
            //code here

            //update goto input value
            goto_input_elem.value = current_page;
        }
    }

    //create table row from list and append to table
    function listParcelDeliveryOrder(start_index, count) {
        //do the appendment here
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

    window.comboBoxMenu = function (menu_id) {
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
            combo_box_active_menu_handler = elem;

        } else { //close menu
            elem.setAttribute("state", "0");
            elem.className = "combo-box-menu theme-color-4 elem-shadow remove-elem";
        }

        combo_box_menu_sync = 1;
    };

    //launch window where change can be made
    window.changeParcelDeliveryDestination = function (parcel_id) {
        if (forceModal()) {
            return;
        }

        //set parcel id to know which package to cancel
        current_parcel_delivery_id = parcel_id;

        //get window refrence
        let elem1 = document.getElementById("change-parcel-delivery-destination-win");

        //show dialog box
        elem1.className = "theme-color-4 elem-shadow";

        //put your code here
    };

    //change delivery destination
    function processChangeParcelDeliveryDestination(win_id, win_btn) {
        //close dialog box
        let elem = document.getElementById(win_id);
        elem.className = "theme-color-4 elem-shadow remove-elem";

        //processing input
        if (win_btn == 'ok') {
            //do other processing here
            console.log("Changing location of delivery: " + current_parcel_delivery_id);

        } else {
            console.log("Change delivery canceled");
        }
    }

    //prompt the user if he is sure to cancel the delivery
    window.cancelParcelDelivery = function (parcel_id) {
        if (forceModal()) {
            return;
        }

        //set parcel id to know which package to cancel
        current_parcel_delivery_id = parcel_id;

        //get dialog refrence
        let elem1 = document.getElementById("cancel-parcel-delivery-box");

        //set dialog message, it can be text or html
        let elem2 = elem1.querySelector(".body .msg");
        elem2.innerHTML = `Are you sure you want to cancel parcel order of ID: ${parcel_id}`;

        //show dialog box
        elem1.className = "theme-color-4 elem-shadow";
    };

    //cancel parcel delivery order
    function processCancelParcelDelivery(win_id, win_btn) {
        //close dialog box
        let elem = document.getElementById(win_id);
        elem.className = "theme-color-4 elem-shadow remove-elem";

        //processing input
        if (win_btn == 'ok') {
            //do other processing here
            console.log("Cancelling Parcel ID: " + current_parcel_delivery_id);

        } else {
            console.log("Cancel parcel comfirm dialog closed");
        }
    }

    //close menu opened by another combo box menu
    function closeComboBoxActiveMneu() {
        if (combo_box_active_menu_handler !== null) {
            combo_box_active_menu_handler.setAttribute("state", "0");
            combo_box_active_menu_handler.className = "combo-box-menu theme-color-4 elem-shadow remove-elem";
            combo_box_active_menu_handler = null;
        }
    }

    /********************************************
    **********Window and dialog section**********
    ********************************************/

    //process dialog or window button event, like close, ok and cancel
    window.closeWindow = function (win_id, win_btn) {
        disableModal();

        switch (win_id) {

            case 'cancel-parcel-delivery-box':

                if (win_btn == 'ok') {
                    //cancel parcel delivery order
                    processCancelParcelDelivery(win_id, win_btn);

                } else if (win_btn == 'cancel') {
                    //don't cancel parcel delivery order
                    processCancelParcelDelivery(win_id, win_btn);

                } else if (win_btn == 'close') {
                    //don't cancel parcel delivery order
                    processCancelParcelDelivery(win_id, win_btn);
                }

                break;

            case 'change-parcel-delivery-destination-win':

                if (win_btn == 'cancel') {
                    //cancel the change
                    processChangeParcelDeliveryDestination(win_id, win_btn)

                } else if (win_btn == 'close') {
                    //cancel the change
                    processChangeParcelDeliveryDestination(win_id, win_btn)
                }

                break;

            default:
            //shouldn't be here
        }
    };

    //adapt change delivery destination window when page is resized
    function adaptChangeDeliveryDestinationWindow() {
        let elem1 = document.getElementById("change-parcel-delivery-destination-win");
        let elem2 = elem1.querySelector(".title-bar");
        let elem3 = elem1.querySelector(".body");

        let win_height = 473; //window total height
        let body_top_and_bottom_padding = 40; //body top padding + bottom padding

        //calculate window new height
        let ds = window.innerHeight - (elem1.offsetTop + win_height);
        let nh = (window.innerHeight - elem1.offsetTop) - (elem2.offsetHeight + body_top_and_bottom_padding);

        //check if we need to resize the window height
        if ((ds - body_top_and_bottom_padding) <= 0) {
            //set height
            elem3.setAttribute("style", "height: " + (nh - 20) + "px;");

        } else {
            elem3.removeAttribute("style");
        }
    }

    /********************************************
    ***************Tabe section******************
    ********************************************/

    let current_switch_tab_handler = document.getElementById("tab-cont-1");

    //switch tab container
    window.switchTabContainer = function (switch_tab_id, btn_ref) {
        if (forceModal(false)) {
            return;
        }

        let elem = document.getElementById(switch_tab_id);

        //exit if is the same tab menu
        if (current_switch_tab_handler == elem) {
            return;
        }

        //hide current tab view
        current_switch_tab_handler.className = "remove-elem";

        //change current tab menu
        btn_ref.className = "tab-menu active elem-height-50 theme-txt-color-2 txt-clr-hover theme-color-4";

        //switch to click tab view
        elem.className = "tab-cont";

        current_switch_tab_handler = elem;

        if (switch_tab_id == "tab-cont-1") {
            elem = document.getElementById("tab-menu-2");

            //change tab menu to active
            elem.className = "tab-menu elem-height-50 theme-txt-color-2 txt-clr-hover theme-color-4";

        } else {
            elem = document.getElementById("tab-menu-1");

            //change tab menu to active
            elem.className = "tab-menu elem-height-50 theme-txt-color-2 txt-clr-hover theme-color-4";
        }
    };

    //listen to page resize event
    window.onresize = function (e) {
        adaptChangeDeliveryDestinationWindow();
    };

    //process change delivery form
    window.processChangeDeliveryForm = function (e) {
        e.preventDefault();

        disableModal();

        //change delivery destination
        processChangeParcelDeliveryDestination('change-parcel-delivery-destination-win', 'ok');

        //other code here
    };

    //process parcel quote form for delivery
    window.processParcelDeliveryQuoteForm = function (e) {
        e.preventDefault();

        //other code here

        //navigate to pick up and destination address form
        let elem = document.getElementById("create-parcel-section-1");
        elem.className = "remove-elem";
        elem = document.getElementById("create-parcel-section-2");
        elem.className = "create-parcel-section-2";

        //scroll the page to top
        window.scrollTo(0, 0);
    };

    //process pickup and destination address form
    window.processPickupAndDestinationForm = function (e) {
        e.preventDefault();

        //other code here

        //navigate to payment page
        let elem = document.getElementById("create-parcel-section-2");
        elem.className = "remove-elem";
        elem = document.getElementById("create-parcel-section-3");
        elem.className = "create-parcel-section-3";

        //scroll the page to top
        window.scrollTo(0, 0)
    };

    //process user payment and place order
    window.processPaymentForm = function (e) {
        e.preventDefault();

        //other code here

        //reset the form
        resetForm(['parcelquoteform', 'pickupanddestform', 'paymentform']);

        //set to first panel
        resetNavigation("create-parcel-section-1", "create-parcel-section-3");

        //switch to 'My Order' tab
        switchTabContainer('tab-cont-1', document.getElementById("tab-menu-1"));

        //scroll page to top
        window.scrollTo(0, 0);
    }

    //cancel create order process, closing the tab by switching 
    //to 'My Order' tab
    window.cancelCreateOrder = function (page) {
        switch (page) {
            case 1:
                //reset the form
                resetForm(['parcelquoteform']);

                //switch to 'My Order' tab
                switchTabContainer('tab-cont-1', document.getElementById("tab-menu-1"));

                //scroll page to top
                window.scrollTo(0, 0);

                break;

            case 2:
                //reset the form
                resetForm(['parcelquoteform', 'pickupanddestform']);

                //set to first panel
                resetNavigation("create-parcel-section-1", "create-parcel-section-2");

                //switch to 'My Order' tab
                switchTabContainer('tab-cont-1', document.getElementById("tab-menu-1"));

                //scroll page to top
                window.scrollTo(0, 0);

                break;

            case 3:
                //reset the form
                resetForm(['parcelquoteform', 'pickupanddestform', 'paymentform']);

                //set to first panel
                resetNavigation("create-parcel-section-1", "create-parcel-section-3");

                //switch to 'My Order' tab
                switchTabContainer('tab-cont-1', document.getElementById("tab-menu-1"));

                //scroll page to top
                window.scrollTo(0, 0);

                break;

            default:
            //shouldn't be here
        }
    };

    //adapt change delivery destination window when page is resized
    adaptChangeDeliveryDestinationWindow();
}

//initialise the script
if (window.addEventListener) {
    window.addEventListener("load", init, false);

} else if (window.attachEvent) {
    window.attachEvent("onload", init);

} else {
    document.addEventListener("load", init, false);
}