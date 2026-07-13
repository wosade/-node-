@echo off
cd /d "c:\Users\Administrator\Desktop\node练习"
git config --global --unset http.proxy
git config --global --unset https.proxy
git add .
git commit -m "Initial commit"
git push -u origin main
pause