
function loadData()
{
    $.ajax({
        url: '/profile',
        method: 'get',
        dataType: 'json',
        success: function (data){
            console.log(JSON.stringify(data));
            $.each(data, function(key, val) {
                console.log(`${key} = ${val}`);
                $('#'+`${key}`).html(`${val}`);
                $('#'+`${key}`).css({'font-size': '24px', 'font-weight': 'bold', 'color': 'mediumblue'});
            });
        }
    });
}
$(document).ready(function() {             
    loadData();
});