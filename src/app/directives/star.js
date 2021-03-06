angular.module("proton.star", [])
  .directive('ptStar', function (CONSTANTS, gettextCatalog, tools, action) {

    /**
     * Check in LabelIDs to see if the conversation or message is starred
     * @param {Object} item
     */
    function isStarred(item) {
      return Array.isArray(item.LabelIDs) && item.LabelIDs.indexOf(CONSTANTS.MAILBOX_IDENTIFIERS.starred) !== -1;
    }

    /**
     * Star or unstar a message/conversation
     * @param {Object} element - conversation or message
     * @param {String} type Type of message, conversation or message
     */
    function toggleStar(item, type) {
      var todoAction = isStarred(item) ? 'unstar' : 'star';

      if (type === 'conversation') {
        action[todoAction + 'Conversation'](item.ID);
      }

      if(type === 'message') {
        action[todoAction + 'Message'](item.ID);
      }
    }

    return {
      scope: {
        model: '='
      },
      replace: true,
      templateUrl: 'templates/directives/star.tpl.html',
      link: function (scope, el, attr) {

        var customType = attr.ptStarType || tools.typeList();

        scope.isStarred = function() {
          return isStarred(scope.model);
        };

        function onClick(e) {
          if (e.target.nodeName === 'A') {
            e.preventDefault();
            e.stopPropagation();
            toggleStar(scope.model, customType);
          }
        }

        el.on('click', onClick);

        scope
          .$on('$destroy', function() {
            el.off('click', onClick);
          });
      }
    };
  });
