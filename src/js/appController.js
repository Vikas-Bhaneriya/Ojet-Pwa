
define(['knockout', 'ojs/ojmodule-element-utils', 'ojs/ojknockouttemplateutils', 'ojs/ojrouter', 'ojs/ojresponsiveutils', 'ojs/ojresponsiveknockoututils', 'ojs/ojarraydataprovider',
        'ojs/ojoffcanvas', 'ojs/ojmodule-element', 'ojs/ojknockout', 'ojs/ojaccordion', 'ojs/ojradioset', 'ojs/ojlabel', 'ojs/ojmenu','ojs/ojtoolbar', 'text'],
    function(ko, moduleUtils, KnockoutTemplateUtils, Router, ResponsiveUtils, ResponsiveKnockoutUtils, ArrayDataProvider, OffcanvasUtils) {

        function ControllerViewModel() {
            var self = this;

            this.KnockoutTemplateUtils = KnockoutTemplateUtils;
            var smQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
            self.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
            var mdQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
            self.mdScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

            // Router setup
            self.router = Router.rootInstance;
            self.router.configure({
                'home': {label: 'Home', isDefault: true},
                'servicepro': {label: 'Service Provider'},
                'mobileop': {label: 'Mobile Operators'},
                'services': {label: 'Services'},
                'profile': {label:'Profile'},

               /* 'signout': {label:'Signout',value:'signout'}*/

            });

            Router.defaults['urlAdapter'] = new Router.urlParamAdapter();

            self.moduleConfig = ko.observable({'view':[], 'viewModel':null});

            self.loadModule = function() {
                ko.computed(function() {
                    var name = self.router.moduleConfig.name();
                    var viewPath = 'views/' + name + '.html';
                    var modelPath = 'viewModels/' + name;
                    var masterPromise = Promise.all([
                        moduleUtils.createView({'viewPath':viewPath}),
                        moduleUtils.createViewModel({'viewModelPath':modelPath})
                    ]);
                    masterPromise.then(
                        function(values){
                            self.moduleConfig({'view':values[0],'viewModel':values[1]});
                        }
                    );
                });
            };

            // Navigation setup
            var navData = [

                {name: 'Home', id: 'home',
                    iconClass: ' oj-navigationlist-item-icon demo-icon-font-24 demo-home-icon-24'},
                {name: 'Service Provider', id: 'servicepro' ,
                    iconClass: ' oj-navigationlist-item-icon  demo-icon-font-24 demo-catalog-icon-24'},

                {name: 'Mobile Operators', id: 'mobileop',
                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24  demo-people-icon-24'},
                /*  demon can be includede to change the icon*/

                {name: 'Services', id: 'services',
                    iconClass: ' oj-navigationlist-item-icon demo-icon-font-24 icon-religion'}

            ];

            self.navDataProvider = new ArrayDataProvider(navData, {keyAttributes: 'id'});
            /*  for implimenting the nested routing*/
            var folders = [
                {label: 'Profile', id: 'profile',
                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},

                {label: 'Login', id: 'login',
                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},


                {label: 'Signout', id: 'signout',
                    iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'}

            ];
            self.drawerDataProvider = new ArrayDataProvider(folders, {keyAttributes: 'id'});



            self.go = function(event,current, bindingContext) {
                // user's Logics will be inplimented here
                var router= Router.rootInstance;

                if(current.data.id=='login')
                {
                    alert("login code goes here");
                }

                if(current.data.id=="signout")

                {
                    alert("signout code goes here");
                }
                if (current.data.id=='profile')
                    router.go(current.data.id);
            }.bind(this);



            // Drawer
            // Close offcanvas on medium and larger screens
            self.mdScreen.subscribe(function() {OffcanvasUtils.close(self.drawerParams);});
            self.drawerParams = {
                displayMode: 'push',
                selector: '#navDrawer',
                content: '#pageContent'
            };
            self.toggleDrawer = function() {
                return OffcanvasUtils.toggle(self.drawerParams);
            };
            // Add a close listener so we can move focus back to the toggle button when the drawer closes
            document.getElementById('navDrawer').addEventListener("ojclose", document.getElementById('drawerToggleButton').focus());



            self.appName = ko.observable("Vikas bhaneriya");
            // User Info used in Global Navigation area
            self.userLogin = ko.observable("john.hancock@oracle.com");

            // Footer
            function footerLink(name, id, linkTarget) {
                this.name = name;
                this.linkId = id;
                this.linkTarget = linkTarget;
            }



            self.footerLinks = ko.observableArray([
                new footerLink('About Oracle', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about'),
                new footerLink('Contact Us', 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html'),
                new footerLink('Legal Notices', 'legalNotices', 'http://www.oracle.com/us/legal/index.html'),
                new footerLink('Terms Of Use', 'termsOfUse', 'http://www.oracle.com/us/legal/terms/index.html'),
                new footerLink('Your Privacy Rights', 'yourPrivacyRights', 'http://www.oracle.com/us/legal/privacy/index.html')
            ]);
        }

        return new ControllerViewModel();
    }
);
