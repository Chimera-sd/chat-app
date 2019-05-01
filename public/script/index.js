
var socket = io();
socket.on('connect',function(){
    nameAndRoom =jQuery.deparam(window.location.search)
    socket.emit('join',nameAndRoom , function(errMessage){
        if(errMessage){
            alert(errMessage);
            window.location.href='/';
        }else{

        }
    });
});
function scrollToBottom(){   
    let messages =jQuery('#messages'),
        newMessage = messages.children('li:last-child'),
        clientHeight = messages.prop('clientHeight'),
        scrollTop = messages.prop('scrollTop'),
        scrollHeight = messages.prop('scrollHeight'),
        lastMessageHeight = newMessage.prev().innerHeight(),
        newMessageHeight = newMessage.innerHeight(); 
    if(clientHeight +scrollTop + newMessageHeight +lastMessageHeight>= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}
socket.on('newMessage',function(message) {
    let messageTime = moment(message.createdAt).format('H:mm a');
    let template = jQuery('#message-template').html();
    let html = Mustache.render(template , {
        from : message.from,
        time : messageTime,
        text :message.text
    });
    jQuery('#messages').append(html);
    scrollToBottom();
})
socket.on('createMessage',function(email) {
    console.log('new email',email);
})
socket.on('disconnect',function(data) {
    console.log('User Disconnect',data); 
});


jQuery('#message-info').on('submit',function(e){
    e.preventDefault();
    let sendMessage = jQuery('[name=text-message]');
    socket.emit('createMessage',{
        from : nameAndRoom.name,
        text : sendMessage.val()
    },function(){
        sendMessage.val('');
    });
})
var locationButton = jQuery('#send-location')
locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('your browser dosnt support this ability');
    }
    locationButton.attr('disabled','disabled').text('sendding location ...');

    navigator.geolocation.getCurrentPosition(function(location){
        locationButton.removeAttr('disabled').text('send location');
        socket.emit('createLocationMessage',{
            from : nameAndRoom.name,
            latitude : location.coords.latitude,
            longitude : location.coords.longitude
        })
    },function(){
        locationButton.removeAttr('disabled').text('send location');
        alert('We Cant find your posotion');
    });
})
socket.on('createLocationMessage',function(locationMessage){
    let locationTime = moment(locationMessage.createdAt).format('H:mm a');
    // let li = jQuery('<li></li>');
    // let a = jQuery(`<a target="_blank"> Your location </a>`);
    let location = jQuery('#location-message-template').html();
    let html = Mustache.render(location , {
        from :locationMessage.from,
        time :locationTime,
        url :locationMessage.link
    })
    // li.text(`${locationMessage.from} ${locationTime} : `);
    // a.attr('href',locationMessage.link);
    // li.append(a);
    jQuery('#messages').append(html);
    scrollToBottom();
});
