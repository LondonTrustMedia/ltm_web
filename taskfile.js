export default async function (task) {
  // Process the CSS files
  await task.source('src/assets/css/*.css')
    .clear('dist')
    // .concat({ output: 'main.css' })
    .postcss({
      plugins: [
        require('autoprefixer')({
          browsers: ['last 2 versions']
        }),
        require('postcss-custom-media'),
        require('cssnano')
      ]
    })
    .target('dist/assets/css');

  await task.source('src/**/*.html')
    .htmlmin({ removeComments: false })
    .target('dist');

  await task.source('dist/**/*')
    .rev({
      ignores: ['.html', '.jpg', '.png', '.svg', '.json', '.js', '.woff', '.woff2']
    })
    .revManifest({
      dest: 'dist',
      file: 'manifest.json',
      trim: str => str.replace(/dist/i, '')
    })
    .revReplace()
    .target('dist');
    
  await task
    .shell('cp -R src/assets dist/')
    .shell('rm -fR dist/assets/fonts')
    .shell('cp src/.htaccess dist/');
}