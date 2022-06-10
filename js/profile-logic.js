
function loadData()
{
    $.ajax({
        url: '/profile',
        method: 'get',
        dataType: 'json',
        success: function (data){
            data = $.parseJSON(data);
            alert(data);
        }
    });
}
$(document).ready(function() {             
    loadData();
});