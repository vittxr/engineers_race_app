file_path=/etc/nginx/sites-available/default

echo 'upstream backend {
    server unix:/home/vit/backend/run/gunicorn.sock fail_timeout=0;
}

server {
    listen 80;
	listen [::]:80;

    location / {
        alias /home/vit/frontend/;
        try_files $uri $uri/ /index.html;
    }

    location /backend/ {
        proxy_pass http://backend/;
    }
}' > "$file_path"

sudo nginx -t
sudo systemctl restart nginx