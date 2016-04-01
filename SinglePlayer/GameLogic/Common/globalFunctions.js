function buffer(object, time) {
    object.is = true;
    setTimeout(function () {
        object.is = false;
    }, time);
}
function createInvisiblePath(type, map, layer, game, group) {
    var result = [];
    map.objects[layer].forEach(function(element){
        if(element.type === type) {

            var newSPrite = game.add.sprite(element.x,element.y);
            newSPrite.width = element.width;
            newSPrite.height = element.height;

            group.add(newSPrite);
        }
    });
    return result;
}