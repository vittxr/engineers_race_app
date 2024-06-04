sudo apt update 
sudo apt install supervisor -y 
sudo systemctl enable supervisor
sudo systemctl start supervisor
sudo systemctl status supervisor