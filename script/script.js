instaChecker('cat');
let counter = 0;


function instaChecker(tag_name) {
    let params = {
        tag_name,
        "first": 3,
    };

    $.ajax({
        url: `https://www.instagram.com/graphql/query/?query_hash=174a5243287c5f3a7de741089750ab3b&variables=${JSON.stringify(params)}`,
        dataType: "json",
        success: function(dannye) {
            let edges = dannye.data.hashtag.edge_hashtag_to_media.edges;
            let result = edges.map(elem => elem.node);
            result.forEach(render);
        }
    });
}

function render(obj) {

    let parsedImg = obj.display_url;
    let newBox = $('<div>');
    newBox.addClass('newDiv');
    newBox.css('background-image', `url("${parsedImg}")`);
    $('#root').append(newBox);
    $(".newDiv").click(function() {
        $(this).siblings().removeClass('selected');
        $(this).addClass('selected');
        $(this).addClass('cliknutaya');
    });
}

$('#steelbutton').bind('click', function() {
    $(".newDiv").filter('.cliknutaya').css('box-shadow', '20px 20px 20px black');
    $(".newDiv").not('.cliknutaya').css('box-shadow', 'inset 20px 20px 20px black');
})