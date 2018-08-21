import {autoinject} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';
import 'jquery';
import 'popper.js';
import 'bootstrap';

/**
 * Main application class.
 *
 * @author Anthony Vanden Bossche <toonevdb@gmail.com>
 */
@autoinject
export class App {
    /**
     * Creates an instance of App.
     *
     * @param {Router} router Router
     *
     * @memberOf App
     */
    constructor(protected router: Router) {

    }

    /**
     * Configures the router.
     *
     * @param {RouterConfiguration} config
     * @param {Router} router
     *
     * @memberOf App
     */
    public configureRouter(config: RouterConfiguration, router: Router) {
        this.router = router;
        config.title = 'appName';
        config.options.pushState = true;
        config.options.root = '/';
        config.map([
            {
                route: '', redirect: '/welcome',
            },
            {
                route: 'welcome',
                name: 'welcome',
                moduleId: PLATFORM.moduleName('./resources/modules/welcome'),
            },
        ]);
    }
}
