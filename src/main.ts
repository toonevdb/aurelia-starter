import 'aurelia-polyfills';
import {load} from 'aurelia-environment';
import {Aurelia, LogManager} from 'aurelia-framework';
import {I18N, TCustomAttribute} from 'aurelia-i18n';
import {ConsoleAppender} from 'aurelia-logging-console';
import Backend from 'i18next-xhr-backend';
import {PLATFORM} from 'aurelia-pal';

export function configure(aurelia: Aurelia) {
  return load().then(() => {
    // Setup logging, everything is logged to console
    LogManager.addAppender(new ConsoleAppender());
    LogManager.setLevel(LogManager.logLevel.debug);
    
    aurelia.use
      .standardConfiguration();

    // Plugin requires "allowSyntheticDefaultImports": true in tsconfig which i don't like, don't know yet why
    // There are some usefull other i18n plugins like caching to local storage (http://i18next.com/docs/options/)
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-i18n'), (instance) => {
      let aliases = ['t', 'i18n'];

      TCustomAttribute.configureAliases(aliases);

      instance.i18next.use(Backend);

      return instance.setup({
        backend: {
          loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        lng: 'en',
        attributes: aliases,
        fallbackLng: 'en',
        debug: true,
      });
    });

    return aurelia.start().then(() => {
      return aurelia.setRoot(PLATFORM.moduleName('app'));
    });
  });
}
