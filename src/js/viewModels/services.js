define(['knockout', 'ojs/ojbootstrap', 'ojs/ojarraydataprovider', 'text!Data/dataTrail.json',
        'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojchart'],
    function (ko, Bootstrap, ArrayDataProvider, quarterData) {

        function ViewModel() {
            // tries
            var currentDateTime = new Date();
            var offst = new Date().getTimezoneOffset();
            console.log(offst);
            // I have moved 38 days back so that the given data cab be used
            // I have to move only 6 hours back as such

            /*for Regular time Axis Kind */

            var BackDateTime = new Date(currentDateTime.getTime() - 40 * 24 * 60 * 60 * 1000);
            console.log("Current date is :" + currentDateTime.toISOString());

            console.log("back date  is :" + BackDateTime.toISOString());
            var _data = JSON.parse(quarterData);
            var moddata = [];
            var group = [];

            for (i = 0; _data[i]; i++) {
                moddata.push({
                    name: _data[i]['serviceType'],
                    items: []
                });
                for (j = 0; _data[i]['transactions'][j]; j++) {

                    if (_data[i]['transactions'][j]['transactionRequestDateTime'] > BackDateTime.toISOString()) {

                        moddata[i]['items'].push(_data[i]['transactions'][j]['count']);
                        var da = new Date(Date.parse(_data[i]['transactions'][j]['transactionRequestDateTime']) + offst * 60 * 1000);
                        group.push(da.toISOString());
                    }

                }

            }
            let uniq = [...new Set(group)];
            console.log(uniq);


            this.regularSeriesValue = ko.observableArray(moddata);
            this.regularGroupsValue = ko.observableArray(uniq);


            /*for Mixes Frequency*/


            var mixed = [];

            for (i = 0; _data[i]; i++) {
                mixed.push({
                    name: _data[i]['serviceType'],
                    items: []
                });
                for (j = 0; _data[i]['transactions'][j]; j++) {
                    if (_data[i]['transactions'][j]['transactionRequestDateTime'] > BackDateTime.toISOString()) {
                        var da = new Date(Date.parse(_data[i]['transactions'][j]['transactionRequestDateTime']) + offst * 60 * 1000);
                        mixed[i]['items'].push({
                            x: da.toISOString(),
                            y: _data[i]['transactions'][j]['count']
                        });
                    }

                }


            }


            this.mixedSeriesValue = ko.observableArray(mixed);

            // Previous method

            var stepedData  = [];

            for (i = 0; _data[i]; i++) {

                for (j = 0; _data[i]['transactions'][j]; j++) {
                    if (_data[i]['transactions'][j]['transactionRequestDateTime'] > BackDateTime.toISOString()) {

                        var da = new Date(Date.parse(_data[i]['transactions'][j]['transactionRequestDateTime']) + offst * 60 * 1000);

                        stepedData.push({
                            'serviceType': _data[i]['serviceType'],
                            'count': _data[i]['transactions'][j]['count'],
                            'transactionRequestDateTime': da.toISOString()

                        });

                    }
                }


            }
             console.log(stepedData);
            this.dataProvider = new ArrayDataProvider(stepedData, {keyAttributes: 'serviceType'});





        }

        return new ViewModel();
    }
);