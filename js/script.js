'use strict';
$(function() {

    function checkUser(e, elements, users) {
        let active = elements.activeName;
        if(e.keyCode === 40){
            if(elements.isOpen && active >= 0 && active < 9){
                elements.activeName = active + 1;
                }else {
                elements.activeName = 0;
                }
            return makeElemActive(active, elements.activeName)
            }
            if(e.keyCode === 38) {
                if (elements.isOpen && active > 0 && active <= 9) {
                    elements.activeName = active - 1;
                    } else {
                    elements.activeName = 9;
                    }
                return makeElemActive(active, elements.activeName);
            }
            if (e.keyCode === 13 && elements.isOpen && elements.activeName){
            e.preventDefault();
            let text = $('.selectUser:eq(' + elements.activeName + ')').text();
                return fillName(null, elements, text);
            }

        setTimeout(function () {
            elements.cursorPosition = elements.textArea.prop("selectionStart");
            if(elements.cursorPosition){
                let value = elements.textArea.val();
                elements.startPos = getStartPosition(value, elements.cursorPosition-1);
                elements.isOpen = false;
                if(elements.startPos){
                    let text = value.substring(elements.startPos, elements.cursorPosition);
                      return  find(text, users, elements);
                }
                return elements.showUsers.empty();
                }
        }, 0);

    }

    function makeElemActive(oldIndex, newIndex) {
        $('.selectUser:eq(' + oldIndex + ')').blur();
        $('.selectUser:eq(' + newIndex + ')').focus();
    }
    function getStartPosition(str, pos) {
        if (str.substring(pos, pos + 1) === '@') {
            return pos + 1;
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

    function fillName(e, elements, targetText){
        let text = targetText? targetText : $(e.target).text(),
            textarea = elements.textArea,
            value = textarea.val();
        elements.cursorPosition = getEndPosition(value, elements.cursorPosition);
        value = value.substring(0, elements.startPos) + text + value.substring(elements.cursorPosition) + ' ';
        textarea.val(value);
        elements.showUsers.empty();
        elements.textArea.focus();
    }


    function initDialog() {
        let users = [
            {
                name: 'John',
                image: 'path'
            },
            {
                name: 'Annie',
                image: 'path'
            },
            {
                name: 'Jessica',
                image: 'path'
            },
            {
                name: 'Jessica',
                image: 'path'
            },
            {
                name: 'Jessica',
                image: 'path'
            },
            {
                name: 'Jessica',
                image: 'path'
            },
            {
                name: 'Jessica',
                image: 'path'
            },
            {
                name: 'Jessica',
                image: 'path'
            },
            {
                name: 'Jessica',
                image: 'path'
            },
            {
                name: 'Jessica',
                image: 'path'
            },
            {
                name: 'Jessica',
                image: 'path'
            },
            {
                name: 'Jessica',
                image: 'path'
            },
            {
                name: 'Jessica',
                image: 'path'
            }
        ],
        elements = {
            searchUser: false,
            textArea: $('.mention_user'),
            showUsers: $('.users')
        };

        if(elements.textArea){
            elements.textArea.on('keydown paste click', e => checkUser(e, elements, users));
        }

        if(elements.showUsers){
            elements.showUsers.on('click', '.selectUser', e => fillName(e, elements));
        }
    }

    initDialog();
});
