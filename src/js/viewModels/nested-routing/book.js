define([
    'ojs/ojrouter',
    'knockout',
    'ojs/ojknockout', 'ojs/ojinputtext', 'ojs/ojdialog'
], function(Router, ko) {

    var chapters, viewModel;

    chapters = {
        'preface': 'Darn beamed hurriedly because banal more \
  giraffe shuffled and well rid placidly where hence or and and hound lantern cutely \
  instead inaudibly but demonstrable imitatively one regarding a where much fruitlessly \
  more depending goodness less as dear shark directed this one.',
        'chapter1': 'Affectingly and yikes one that along \
  versus growled unwitting vulnerably fish far pouting otter some as this hamster \
  hatchet where amicably far deftly curtsied.',
        'chapter2': 'More up mistaken for a kissed therefore \
  ahead thus on dear wow undertook flabbily less much far sourly impala resolutely and \
  and as overheard dachshund this.',
        'chapter3': 'Reindeer up while the far darn falcon \
  concurrent iguana this strived unicorn hedgehog depending more lemming was swam \
  unlike prosperously regarding shameful when and extravagant that then cat contagious.'
    };

    /**
     * The view model for the book page.
     */
    viewModel = {
        router: undefined,

        initialize: function(params) {
            var parentRouter;

            if (this.router) {
                return;
            }

            // The parentRouter is coming from parameter of the module.
            parentRouter = params.parentRouter;
            this.router = parentRouter.getChildRouter('chapter');

            // The RouterState value property is used to hold the chapter data
            this.router.states.forEach(function(state) {
                state.value = chapters[state.id];
            });

            // Synchronise the child router it with the URL
            return Router.sync();
        }
    };

    return viewModel;
});