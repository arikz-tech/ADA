
function loadData()
{
    $.ajax({
        url: '/profile',
        method: 'get',
        dataType: 'json',
        success: function (data){
            console.log(JSON.stringify(data));
        }
    });
}
$(document).ready(function() {             
    loadData();
});