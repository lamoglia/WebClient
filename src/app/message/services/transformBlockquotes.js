angular.module('proton.message')
.factory('transformBlockquotes', function(gettextCatalog) {
    const quotes = [
        '.protonmail_quote',
        '.gmail_quote',
        '.yahoo_quoted',
        // '.WordSection1',
        '#isForwardContent',
        '#isReplyContent',
        '#mailcontent',
        '#origbody',
        '#reply139content',
        '#oriMsgHtmlSeperator',
        '#OLK_SRC_BODY_SECTION',
        'blockquote'
    ].join(',');

    return function(html, message) {

        var blockquotes = html.querySelectorAll(quotes);
        var blockquote = blockquotes[0];

        if (blockquote) {
            if (blockquote.textContent.trim() < html.textContent.trim()) {
                var button = document.createElement('button');
                var title = gettextCatalog.getString('Show previous message', null, 'Title');

                button.className = 'fa fa-ellipsis-h pm_button more proton-message-blockquote-toggle';
                button.setAttribute('title', title);
                blockquote.parentNode.insertBefore(button, blockquote);
            }
        }

        return html;
    };
});
