'use strict';
$(function() {

    function checkUser(e, elements, users) {
        setTimeout(function () {
            elements.cursorPosition = elements.textArea.prop("selectionStart");
            if(elements.cursorPosition){
                let value = elements.textArea.val();
                elements.startPos = getStartPosition(value, elements.cursorPosition-1);
                if(elements.startPos){
                    let text = value.substring(elements.startPos, elements.cursorPosition);
                      return  find(text, users, elements);
                }
                return elements.showUsers.empty();
                }
        }, 0);

    }

    function getStartPosition(str, pos) {
        if (!str.substring(pos, pos + 1).match(/[A-Za-z]/)) {
            return str.substring(pos, pos + 1) === '@' ? pos + 1: null;
        } else if (pos === 0) {
            return 0
        } else {
            return getStartPosition(str, pos - 1);
        }
    }

    function find(user, users, elements) {
        elements.showUsers.empty();
        user = user.toLowerCase();
        for (let i = 0; i < users.length; i++) {
            if (i >= 10){
                return;
            }
            if (users[i]['name'].toLowerCase().indexOf(user) >= 0) {
                elements.showUsers.append('<div class="selectUser">' + users[i]['name'] + '</div>');
            }
        }
    }

    function fillName(e, elements, users){
        let text = $(e.target).text();
        let value = elements.textArea.val();
        value = value.substring(0, elements.startPos) + text + value.substring(elements.cursorPosition) + ' ';
        elements.textArea.val(value);
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
            textArea: $('#mention_user'),
            showUsers: $('.users')
        };

        if(elements.textArea){
            elements.textArea.on('keydown paste click', e => checkUser(e, elements, users));
        }

        if(elements.showUsers){
            elements.showUsers.on('click', '.selectUser', e => fillName(e, elements, users));
        }
    }

    initDialog();
});
