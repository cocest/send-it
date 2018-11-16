//initialise script
function init() {
    const goto_input_elem = document.getElementById("goto-parcel-order"); //search input
    const parcel_list_category = document.getElementById("parcel-list-category");

    //listen to goto to particular parcel enter event
    goto_input_elem.onkeypress = function(e) {

        let keycode = (e.keyCode ? e.keyCode : e.which);

        if (keycode == "13") {
            navigateParcelOrderListPage(e.currentTarget.value);
        }
    };

    //listen to search by category change event
    parcel_list_category.onchange = function(e) {
        
        switch (e.currentTarget.selectedIndex) {
            case 0: //All
                //code here

                break;

            case 1: //Deliverd
                //code here

                break;

            case 2:
                //code here

                break;

            default:
                //shouldn't be here
        }
    };

    //description here
    window.prevParcelOrderList = function() {
        console.log("previous page of list");
    };
    
    //description
    window.nextParcelOrderList = function() {
        console.log("next page of list");
    };

    //description here
    window.searchParcelOrderLIst = function() {
        console.log("search the list");
    };

    //utility function for navigating through parcel order page(s)
    function navigateParcelOrderListPage(goto) {
        //code here
    }
}

//initialise the script
if (window.addEventListener) {
    window.addEventListener("load", init, false);

} else if (window.attachEvent) {
    window.attachEvent("onload", init);

} else {
    document.addEventListener("load", init, false);
}