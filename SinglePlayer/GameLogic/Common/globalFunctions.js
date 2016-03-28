function buffer(object, time) {
    object.is = true;
    setTimeout(function () {
        object.is = false;
    }, time);
}
