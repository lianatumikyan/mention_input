'use strict';
$(function() {

    function checkUser(e, elements, users) {
        if(e.key === '@'){
            elements.searchUser = true;
            return;
        }else if(e.keyCode === 32){
            elements.searchUser = false;
            return;
        }
        if(elements.searchUser === true){
            let cursorPosition = elements.textArea.prop("selectionStart");
            setTimeout(function () {
                let value = elements.textArea.val();
                let startPos = getStartPosition(value, cursorPosition);
                let text = value.substring(startPos, cursorPosition + 1);
                }, 0)
        }
    }

    function getStartPosition(str, pos) {
        if (!str.substring(pos, pos + 1).match(/[A-Za-z]/)) {
            return pos + 1;
        } else if (pos === 0) {
            return 0;
        } else {
            return getStartPosition(str, pos - 1);
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
            elements.textArea.on('keydown paste', e => checkUser(e, elements, users));
        }
        for (let i = 0; i < users.length; i++) {
            elements.showUsers.append('<div>' + users[i]['name'] + '</div>');
        }
    }

    initDialog();
});
