module.exports = function (shipit) {

    require('shipit-deploy')(shipit);

    shipit.initConfig({
        default: {
            workspace: './build',
            deployTo: './app',
            repositoryUrl: '',
            ignores: ['.git', 'node_modules'],
            rsync: ['--del'],
            keepReleases: 2,
            // key: '~/.ssh/id_rsa.pub',
        },
        staging: {
            servers: 'root@178.62.85.145'
        }
    });


    shipit.on('published', () => {

        console.log('Done!')

        return shipit.remote('cd ./app/current && NODE_ENV=production sudo npm install').then((res) => {
            shipit.remote('cd ./app/current && NODE_ENV=production knex migrate:latest')
            shipit.remote('cd ./app/current && NODE_ENV=production forever start ./bin/www')
        });
                
    });


    shipit.task('deploy:clean', function () {
        shipit.local('rm -rf ./build')
    });

};
