function buffer(object, time, game) {
    object.is = true;
    game.time.events.add(time, function() {
        object.is = false
    } , RedPlanetGame.Game);
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