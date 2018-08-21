const pkg = require('./package.json');

const options = {
  production: {
    branch: 'master',
    servers: {host: 'xxx', user: 'root'}
  },

  default: {
    workspace: '/tmp/shipit',
    deployTo: '/var/www/frontend',
    repositoryUrl: pkg.repository.url,
    ignores: ['.git', 'node_modules'],
    rsync: ['--del'],
    keepReleases: 5,
    shallowClone: true,
    shared: {
      files: [
        {
          path: 'aurelia.env',
          overwrite: true
        }
      ],
    }
  }
}

module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  require('shipit-shared')(shipit);

  shipit.initConfig(options);

  shipit.blTask('npm:install', function () {
    return shipit.local('npm install --loglevel=error', {cwd: options.default.workspace});
  });

  shipit.blTask('webpack:build', function () {
    return shipit.local('npm start webpack.build.production', {cwd: options.default.workspace});
  });

  shipit.task('deploy', [
    'deploy:init',
    'deploy:fetch',
    'npm:install',
    'webpack:build',
    'deploy:update',
    'deploy:publish',
    'deploy:clean',
    'deploy:finish'
  ]);
};
