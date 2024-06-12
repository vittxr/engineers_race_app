PROJECT_PATH="/home/vit/frontend"
GITHUB_REPO="https://github.com/vittxr/engineers_race_app.git"
PROJECT_NAME="engineers_race_frontend"

setup_filesystem() {
    if [ -d "$PROJECT_PATH" ]; then
        rm -rf "$PROJECT_PATH"
        setup_filesystem
    else 
        mkdir -p $PROJECT_PATH
        cd $PROJECT_PATH
        git clone $GITHUB_REPO . 
        find ./ -mindepth 1 ! -regex '^./react_frontend\(/.*\)?' -delete
        cd react_frontend/
        mv * ../
        cd ..
        rm -rf react_frontend/
        find ./ -mindepth 1 ! -regex '^./dist\(/.*\)?' -delete
        cd dist/
        mv * ../ 
        cd ..
        rm -rf dist/
        echo "Frontend setup complete"
    fi
}

setup_filesystem