import ghpages from 'gh-pages'

ghpages.publish(
  '.',
  {
    branch: 'gh-pages',

    src: ['index.html', 'dist/**', 'src/style.css', 'assets/**', 'favicon.png'],

    add: true,
    nojekyll: true,

    beforeAdd(git) {
      return git.rm('.gitignore')
    },
  },
  (error) => {
    if (error) {
      console.error('Deployment failed:', error)
      process.exitCode = 1
      return
    }

    console.log('Deployment completed successfully!')
  }
)
