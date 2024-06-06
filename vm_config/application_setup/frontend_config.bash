PROJECT_PATH="/home/vit/frontend"
GITHUB_TOKEN="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" # expire 15/07/2024
GITHUB_REPO="https://$GITHUB_TOKEN@github.com/vittxr/engineers_race_app.git"
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