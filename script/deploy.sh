#!/bin/bash

current_dir=$(cd "$(dirname $0)" && pwd)
deploy_dir=$current_dir/.deploy

# if [[ $(hostname) != *"mcd2"* ]]; then
#     echo deploy from mcd2
#     exit 1
# fi

([ -e $deploy_dir ] || (git clone git@codex.londontrustmedia.com:web/ltm_web $deploy_dir)) && cd $deploy_dir && git pull

rsync -hPvaz $deploy_dir/web/ steve@ltmweb.londontrustmedia.com:/home/steve/sites/londontrustmedia.com/

echo "Done!"
