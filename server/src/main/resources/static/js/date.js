window.onload = function() {
    moment.locale('vi');
    var dateElements = document.getElementsByClassName('dateElement');
    for (var i = 0; i < dateElements.length; i++) {
        var date = dateElements[i].lastChild.data;
        var formattedDate = moment(date).fromNow();
        dateElements[i].innerText = formattedDate;
    }


    var dateDetailElements = document.getElementsByClassName('dateDetailElement');
    for (var i = 0; i < dateDetailElements.length; i++) {
        var date = dateDetailElements[i].lastChild.data;
        var formattedDate = moment(date).format("DD/MM/YYYY HH:mm");
        dateDetailElements[i].innerText = formattedDate;
    }
}