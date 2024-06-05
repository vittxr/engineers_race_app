sudo apt update
sudo apt upgrade

sudo apt install mariadb-server -y

sudo systemctl start mariadb
sudo systemctl enable mariadb

# ALTER USER 'root'@'localhost' IDENTIFIED BY '123';
