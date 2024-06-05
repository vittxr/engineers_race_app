GITHUB_TOKEN="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"
GITHUB_REPO="https://$GITHUB_TOKEN@github.com/vittxr/engineers_race_app.git"
PROJECT_PATH="/home/vit/backend"
PROJECT_NAME="engineers_race_backend"

setup_filesystem() {
    if [ -d "$PROJECT_PATH" ]; then
        cd "$PROJECT_PATH"
        git pull 
        if [ -d venv ]; then rm -rf venv; fi
        python3 -m venv venv
        source ./venv/bin/activate
        pip install -r requirements.txt
    else 
        mkdir -p $PROJECT_PATH
        cd $PROJECT_PATH
        git clone $GITHUB_REPO .
        find ./ -mindepth 1 ! -regex '^./backend\(/.*\)?' -delete
        cd backend/
        mv * ../
        mv .env ../
        cd ..
        rm -rf backend/
        python3 -m venv venv 
        source ./venv/bin/activate
        pip install -r requirements.txt
        mkdir logs
        mkdir run 
    fi
}

setup_config_files() {
    # configuring gunicorn_start:
    file_path="$PROJECT_PATH/gunicorn_start"
    sudo echo " 
        #!/bin/bash
        cd $PROJECT_PATH
        source $PROJECT_PATH/venv/bin/activate

        exec gunicorn main:app \
        --name=$PROJECT_NAME \
        --workers=1 \
        --worker-class=uvicorn.workers.UvicornWorker \
        --user=root \
        --group=root \
        --bind=unix:$PROJECT_PATH/run/gunicorn.sock \
        --log-level=error \
        --log-file=- \
    " > $file_path
    chmod u+x $PROJECT_PATH/gunicorn_start


    # Configuring supervisor (WARNING: this will overwrite any existing config files):
    file_path="/etc/supervisor/conf.d/$PROJECT_NAME.conf"
    sudo echo "
        [program:$PROJECT_NAME]
        directory=$PROJECT_PATH
        command=bash $PROJECT_PATH/gunicorn_start
        user=root
        numprocs=1 
        stopasgroup=true
        stopsignal=QUIT
        autostart=true
        autorestart=true
        stdout_logfile=$PROJECT_PATH/logs/gunicorn-error.log
        startsecs=0
    " > $file_path
    sudo supervisorctl restart $PROJECT_NAME
    sudo supervisorctl reread
    sudo supervisorctl update
    sudo supervisorctl status  

    # ping application to check if it is running
    curl --unix-socket $PROJECT_PATH/run/gunicorn.sock localhost
}

setup_filesystem
setup_config_files