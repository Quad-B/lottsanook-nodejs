module.exports = {
  apps : [{
    name: 'lotapi',
    script: 'index.js',
    error_file : "./err.log",
    out_file : "./out.log",
    watch : true,
    ignore_watch: ["node_modules","tmp","err.log",".env","Procfile","out.log"],
    max_memory_restart: "60M"
  }],
  deploy : {
    production : {
      user : 'pi',
      host : 'raspberrypi',
      ref  : 'origin/master',
      repo : 'git@github.com:boyphongsakorn/lottsanook-nodejs.git',
      path : '.',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
