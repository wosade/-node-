@echo off
echo ========================================
echo 修复 Git 代理配置并推送代码到 GitHub
echo ========================================
echo.

cd /d "c:\Users\Administrator\Desktop\node练习"

echo [1/5] 检查当前目录...
cd
echo.

echo [2/5] 取消代理配置...
git config --global --unset http.proxy
git config --global --unset https.proxy
echo 代理配置已取消
echo.

echo [3/5] 检查 git 状态...
git status
echo.

echo [4/5] 添加文件到暂存区...
git add .
echo.

echo [5/5] 提交并推送...
git commit -m "Initial commit"
if %errorlevel% equ 0 (
    git push -u origin main
    echo.
    echo ========================================
    echo 推送完成！请检查上面的输出是否成功。
    echo ========================================
) else (
    echo.
    echo 提交失败，可能是因为没有文件变更
    echo ========================================
)

pause