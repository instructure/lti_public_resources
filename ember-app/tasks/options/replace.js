module.exports = {
  dist: {
    src: ['dist/index.html'],
    overwrite: true,
    replacements: [{ 
      from: /src=\"assets/g,
      to: "src=\"../assets"
    },{ 
      from: /href=\"assets/g,
      to: "href=\"../assets"
    }]
  }
}
