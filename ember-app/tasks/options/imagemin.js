module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd: 'tmp/result/assets/images',
      src: '**/*.{png,gif,jpg,jpeg}',
      dest: '../app/assets/images/lti_public_resources/'
    }]
  }
};