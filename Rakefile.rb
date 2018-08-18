desc "Deploy the site"
task :deploy do
  system "./script/deploy.sh"
end
