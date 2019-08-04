define(['knockout', 'ojs/ojbootstrap', 'ojs/ojarraydataprovider', 'ojs/ojmessages',
        'ojs/ojbutton', 'ojs/ojprogress'],
    function(ko, Bootstrap, ArrayDataProvider) {

        function MessagesViewModel() {

            this.createMessage = function (severity, detail, action, title, iconClass) {
                var initCapSeverity = severity.charAt(0).toUpperCase() + severity.slice(1);
                return {
                    closeAffordance: 'none',
                    severity: severity,
                    summary: initCapSeverity + ' message summary',
                    detail: detail,
                    messageAction: {
                        action: action,
                        title: title,
                        icon: iconClass
                    }
                };
            };

            this.applicationMessages = ko.observableArray([
                this.createMessage('error',
                    'This message uses the "detailTemplate" slot on "oj-messages" to \n\
                     override the message content, and the "detail" slot on \n\
                     "oj-message" to add an "oj-button" at the end of detail area. \n\
                     Click on the "Close" button to close the message.'),
                this.createMessage('info',
                    'This message uses the "detailTemplate" slot on "oj-messages" to \n\
                     override the message content, and the "detail" slot on \n\
                     "oj-message" to add a link in-lined to the message detail text.',
                    '#',
                    'More Info'),
                this.createMessage('confirmation',
                    'This message uses the "detailTemplate" slot on "oj-messages" to \n\
                     override the message content, and the "detail" slot on \n\
                     "oj-message" to add a "help icon" link in-lined to the message \n\
                     detail text. An "oj-progress" component is also added at the \n\
                     end of detail area. ',
                    '#',
                    null,
                    'oj-fwk-icon-help'),
                this.createMessage('warning',
                    'This message does not use any slots, and hence the default \n\
                     template is rendered for the detail section. Demonstrates that \n\
                     applications choose to take over custom rendering of the detail \n\
                     section for some of the messages.')
            ]);

            this.dataprovider = new ArrayDataProvider(this.applicationMessages);

            // close message in response to button click
            this.closeMessage = function (event) {
                var parent = event.target.parentElement;
                for (; parent; parent = parent.parentElement) {
                    if (parent.nodeName === 'OJ-MESSAGE') {
                        parent.close();
                        return true;
                    }
                }
            };

            // remove the data for closed message
            this.removeMessageData = function (event) {
                this.applicationMessages.remove(event.detail.message);
            }.bind(this);
        }


            return new ViewModel();

    }
);