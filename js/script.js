'use strict';
$(function() {

    function checkUser(e, elements, users) {
        let active = elements.activeName;
        let open = elements.isOpen;
        switch (e.keyCode){
            case 40:
                e.preventDefault();
                elements.activeName = open && active!== null && active >= 0 && active < 9? active + 1 : 0;
                makeElemActive(active, elements.activeName);
                break;
            case 38:
                e.preventDefault();
                elements.activeName = open && active!== null && active > 0 && active <= 9? active - 1 : 9;
                makeElemActive(active, elements.activeName);
                break;
            case 13:
                if(elements.isOpen && elements.hasOwnProperty('activeName')){
                    e.preventDefault();
                    let text = $('.selectUser:eq(' + elements.activeName + ')').text();
                    fillName(null, elements, text, users);
                }
                break;
            default:
                setTimeout(() => findText(elements, users), 0);
                }
    }

    function emptyUsers(elements) {
        elements.textArea.focus();
        elements.activeName = null;
        elements.showUsers.empty();
    }

    function makeElemActive(oldIndex, newIndex) {
        $('.selectUser:eq(' + oldIndex + ')').removeClass('active');
        $('.selectUser:eq(' + newIndex + ')').addClass('active');
    }

    function findText(elements, users) {
        let position = elements.cursorPosition = elements.textArea.prop("selectionStart"),
            value = elements.textArea.val(),
            startPosition,
            text = '';
        if(position){
            elements.isOpen = false;
            startPosition = elements.startPos = getStartPosition(value, position-1);
            if(startPosition){
                elements.match = true;
                text = value.substring(startPosition, position);
                return  find(text, users, elements);
            }else if(elements.match){
                startPosition = elements.startPos = getStartPosition(value, position-2);
                text = value.substring(startPosition, position-1);
                fillName(null, elements, text, users);
                elements.match = false;
            }
            return emptyUsers(elements);
        }
    }

    function getStartPosition(str, pos) {
        if (!str.substring(pos, pos + 1).match(/[A-Za-z]/)) {
            return str.substring(pos, pos + 1) === '@'?  pos + 1 : null;
            } else if (pos === 0) {
            return 0
        }
            return getStartPosition(str, pos - 1);
    }

    function getEndPosition(str, pos) {
        if (!str.substring(pos, pos + 1).match(/[A-Za-z]/)) {
            return pos;
        }
        return getEndPosition(str, pos + 1);
    }

    function find(user, users, elements) {
        let usersElem = elements.showUsers;
        usersElem.empty();
        users = users.length > 10 ? users.slice(0, 10) : users;
        user = user.toLowerCase();
        for (let i = 0; i < users.length; i++) {
            let name = users[i]['name'];
            if (name.toLowerCase().indexOf(user) >= 0) {
                elements.isOpen = true;
                usersElem.append('<div class="selectUser">' + name + '</div>');
            }
        }
    }

    function fillName(e, elements, targetText, users){
        let text = targetText? targetText : $(e.target).text(),
            textarea = elements.textArea,
            value = textarea.val(),
            position = elements.cursorPosition,
        startPos = elements.startPos;
        elements.cursorPosition = getEndPosition(value, position);
        value = value.substring(0, startPos) + text + value.substring(position) + ' ';
        textarea.val(value);
        let userID = users.find(user => (user.name).toLowerCase() === text.toLowerCase());
        if(userID){
            userID = userID.id;
            if(elements.mentionUsers.indexOf(userID) < 0){
                elements.mentionUsers.push(userID);
            }
        }else{
            for(let i = 0; i < elements.mentionUsers; i++){
                let username = users[i];
                if(value.indexOf('@'+username.name) < 0){
                    let index = elements.mentionUsers.indexOf(username.id);
                    if(index >= 0){
                        elements.mentionUsers.splice(index, 1);
                    }
                }
            }
        }
        return emptyUsers(elements);
    }


    function initDialog() {
        let users = [
                {
                    name: 'Jewel',
                    image: 'path',
                    id: '1'
                },
                {
                    name: 'Ren',
                    image: 'path',
                    id: '2'
                },
                {
                    name: 'Sonny',
                    image: 'path',
                    id: '3'
                },
                {
                    name: 'Lillian',
                    image: 'path',
                    id: '4'
                },
                {
                    name: 'Alinta',
                    image: 'path',
                    id: '5'
                },
                {
                    name: 'Athalie',
                    image: 'path',
                    id: '6'
                },
                {
                    name: 'Ederne',
                    image: 'path',
                    id: '7'
                },
                {
                    name: 'Eduardo',
                    image: 'path',
                    id: '8'
                },
                {
                    name: 'Jessica',
                    image: 'path',
                    id: '9'
                },
                {
                    name: 'Medea',
                    image: 'path',
                    id: '10'
                },
                {
                    name: 'Svetlana',
                    image: 'path',
                    id: '11'
                },
                {
                    name: 'Erick',
                    image: 'path',
                    id: '12'
                },
                {
                    name: 'Laura',
                    image: 'path',
                    id: '13'
                }
            ],
        elements = {
            searchUser: false,
            textArea: $('.mention_user'),
            showUsers: $('.users'),
            mentionUsers: []
        };

        if(elements.textArea){
            elements.textArea.on('keydown paste click', e => checkUser(e, elements, users));
        }

        if(elements.showUsers){
            elements.showUsers.on('click', '.selectUser', e => fillName(e, elements, null, users));
        }
    }

    initDialog();
});
