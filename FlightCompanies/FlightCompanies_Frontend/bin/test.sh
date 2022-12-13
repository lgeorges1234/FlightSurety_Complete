env | grep CHROME_BIN
CHROME_BIN=/usr/bin/google-chrome karma start --single-run
ng test --browsers=ChromeHeadless --watch=false