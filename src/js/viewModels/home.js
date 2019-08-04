define(['knockout', 'ojs/ojbootstrap', 'ojs/ojarraydataprovider', 'text!Data/data2.json',
        'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojchart'],
    function(ko, Bootstrap, ArrayDataProvider, quarterData) {

        function ViewModel() {

            /*for notification setion*/

            this.createMessage = function(severity, detail, action, title, iconClass) {
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
                    'https://www.oracle.com/webfolder/technetwork/et/jetCookbook.html?component=home&demo=rootVisualizations',
                    'More Info'),
                this.createMessage('confirmation',
                    'This message uses the "detailTemplate" slot on "oj-messages" to \n\
                     override the message content, and the "detail" slot on \n\
                     "oj-message" to add a "help icon" link in-lined to the message \n\
                     detail text. An "oj-progress" component is also added at the \n\
                     end of detail area. ',
                    'https://www.facebook.com/',
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
            this.closeMessage = function(event){
                var parent = event.target.parentElement;
                for (; parent; parent = parent.parentElement) {
                    if (parent.nodeName === 'OJ-MESSAGE') {
                        parent.close();
                        return true;
                    }
                }
            };

            // remove the data for closed message
            this.removeMessageData = function(event){
                this.applicationMessages.remove(event.detail.message);
            }.bind(this);


            self.more = function(event,current, bindingContext) {
                // user's Logics will be inplimented here


                var data = new ko.observableArray;
                data = current;
                alert(data.length);
                router.go(current.data.messageType);
            }.bind(this);

            /*notification section ends*/

            var data=[],i,j;;
            var _data = JSON.parse(quarterData);

            for(i=0; _data[i] ; i++)
            {
                for(j=0; _data[i]['transactions'][j]; j++) {

                   var datetime= _data[i]['transactions'][j]['transactionRequestDateTime'];
                   var time= datetime.slice('T','z');
                    data.push({
                        'serviceType': _data[i]['serviceType'],
                        'count':_data[i]['transactions'][j]['count'],
                        'transactionRequestDateTime': _data[i]['transactions'][j]['transactionRequestDateTime'],


                    });
                }
            }


            this.orientationValue = ko.observable('vertical');
            this.dataProvider = new ArrayDataProvider(data, {keyAttributes: 'serviceType'});
            this.hiddenCategories = ko.observableArray(['KYC']);
            this.categoryInfo = ko.pureComputed(function() {
                var categories = this.hiddenCategories();
                return categories.length > 0 ? categories.join(', ') : 'none';
            }.bind(this));


        }

        return new ViewModel();
    }
);