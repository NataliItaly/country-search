import ghpages from 'gh-pages'

ghpages.publish(
  '.',
  {
    branch: 'gh-pages',

    src: ['index.html', 'dist/**', 'src/style.css', 'assets/**'],

    remove: ['index.html', 'dist/**', 'src/style.css', 'assets/**'],

    nojekyll: true,
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
