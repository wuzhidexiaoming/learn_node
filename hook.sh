cd /home/ubuntu/code/web_front
git pull
echo pwd
cnpm i
npm run build
next export
rm -rf /home/ubuntu/wwwroot/llow22.com
cp -r out /home/ubuntu/wwwroot/llow22.com
sudo systemctl restart nginx
