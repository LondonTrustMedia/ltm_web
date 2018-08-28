export default async function (task) {
  // Post-process the CSS files
  // - autoprefixer takes care of adding prefixes so that we can keep our CSS source clean
  // - cssnano minifies the output
  await task.source('src/assets/css/*.css')
    .clear('dist')
    // .concat({ output: 'main.css' })
    .postcss({
      plugins: [
        require('autoprefixer')({
          browsers: ['last 2 versions']
        }),
        require('cssnano')
      ]
    })
    .target('dist/assets/css');

  // Minify the HTML
  await task.source('src/**/*.html')
    .htmlmin({ removeComments: false })
    .target('dist');

  // Generate the suffix (only for CSS files right now),
  // and replace the path it in HTML files
  await task.source('dist/**/*')
    .rev({
      ignores: ['.html', '.jpg', '.png', '.svg', '.json', '.js', '.woff', '.woff2']
    })
    .revManifest({
      dest: 'dist',
      file: 'manifest.json',
      // Remove the dist folder from the path
      trim: str => str.replace(/dist/i, '')
    })
    .revReplace()
    .target('dist');

  // Copy over some necessary files (assets, .htaccess),
  // drop the fonts folder which is not nedded (only kept in repo as backup)
  await task
    .shell('cp -R src/assets dist/')
    .shell('rm -fR dist/assets/fonts')
    .shell('cp src/.htaccess dist/');
}
