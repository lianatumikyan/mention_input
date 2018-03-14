'use strict';
$(function() {

    function checkUser(e, elements, users) {
        setTimeout(function () {
            let cursorPosition = elements.textArea.prop("selectionStart");
            if(cursorPosition){
                let value = elements.textArea.val();
                let startPos = getStartPosition(value, cursorPosition-1);
                if(startPos){
                    let text = value.substring(startPos, cursorPosition);
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
            if (users[i]['name'].toLowerCase().indexOf(user) >= 0) {
                elements.showUsers.append('<div>' + users[i]['name'] + '</div>');
            }
        }
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
    }

    initDialog();
});
