echo "Installing Node Packages"
npm install

echo "Linking zabbix to script"

ln -s $(pwd)/index.js /usr/lib/zabbix/externalscripts/xoa.command