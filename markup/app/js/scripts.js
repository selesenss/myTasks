window.onload=function() {
    AttendifyEventWall.startWall();

    var d = document;
    var container = d.querySelector('.event-wall');

    container.ondblclick = toggleBan;

    function toggleBan(e) {
        var target = e.target;
        
        if ((" " + target.className + " ").indexOf(" text ") > -1) {
            while (target != container) {
                if ((" " + target.className + " ").indexOf(" post ") > -1) {

                    var postId = target.getAttribute('data-id');

                    AttendifyEventWall.toggleBanMessage(postId);
                    return;

                }

                target = target.parentNode;
            }
        } else {
            return false;
        }
    }
};
