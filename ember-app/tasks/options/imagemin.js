module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd: 'tmp/result',
      src: '**/*.{png,gif,jpg,jpeg}',
      dest: '../public/lti_public_resources/'
    }]
  }
};