define(['knockout', 'ojs/ojbootstrap', 'ojs/ojarraydataprovider', 'text!Data/dataTrail.json',
        'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojchart'],
    function (ko, Bootstrap, ArrayDataProvider, quarterData) {

        function ViewModel() {

            var self = this;
            var data = [], i, j;
            var _data = JSON.parse(quarterData);
           console.log(_data);
            for (i = 0; _data[i]; i++) {

                for (j = 0; _data[i]['transactions'][j]; j++) {

                    data.push({
                        'serviceType': _data[i]['serviceType'],
                        'count': _data[i]['transactions'][j]['count'],
                        'transactionRequestDateTime': _data[i]['transactions'][j]['transactionRequestDateTime']

                    });
                }
            }

            function GetSortOrder(prop) {
                return function(a, b) {
                    if (a[prop] > b[prop]) {
                        return 1;
                    } else if (a[prop] < b[prop]) {
                        return -1;
                    }
                    return 0;
                }
            }
            data.sort(GetSortOrder('transactionRequestDateTime'));


            var latest_datetime = data[data.length - 1]['transactionRequestDateTime'];
            var d = new Date(latest_datetime);

            var time = Number(latest_datetime.substring(11, 13));
            var x_data = [];


            //date changing if time recent time is between 6 to 0
            if (time < 6 && time >= 0) {
                for (i = 0; i <= 6; i++) {
                    if (time == -1) {
                        time = 23;
                        d.setDate(d.getDate() - 1);
                        latest_datetime = d.toISOString();
                    }

                    x_data.push(latest_datetime.substring(0, 11) + ("0" +time).slice(-2) + latest_datetime.substring(13, 20) + "");
                    time--;
                }
            } else {
                for (i = 0; i <= 6; i++) {
                    x_data.push(latest_datetime.substring(0, 11) + ("0" + time).slice(-2) + d.toISOString().substring(13, 20) + "");
                    time--;
                }

            }
            console.log("data here");
            console.log(data);
            console.log(x_data);
            var l = data.length - 1;
            _data = [];
            var x ;
               console.log(data[l]['transactionRequestDateTime']);
            for (i = 0; x_data[i]; i++) {
                x= x_data[i].substring(0,13);

                for (j = l; x == data[j]['transactionRequestDateTime'].substring(0,13); j--) {
                     console.log(data[j]['transactionRequestDateTime'].substring(0,13));

                    _data.push({
                        'serviceType': data[j]['serviceType'],
                        'count': data[j]['count'],
                        'transactionRequestDateTime': data[j]['transactionRequestDateTime'],
                        'modDateTime':  x_data[i].substring(10, 20),
                        'time':data[j]['transactionRequestDateTime'].substring(10,20)

                    });
                }l = j;
            }

            console.log(_data);
            var l=_data.length-1,dd=[];
            for(i=l;i>=0;i--)
                dd.push(_data[i]);


            this.orientationValue = ko.observable('vertical');
            this.dataProvider = new ArrayDataProvider(dd, {keyAttributes: 'serviceType'});

            this.hiddenCategories = ko.observableArray(['KYC']);
            this.categoryInfo = ko.pureComputed(function () {
                var categories = this.hiddenCategories();
                return categories.length > 0 ? categories.join(', ') : 'none';
            }.bind(this));

        }

        return new ViewModel();
    }
);