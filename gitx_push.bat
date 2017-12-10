cls
D:
set date=  %DATE:~0,2%:%DATE:~3,2%:%DATE:~6,4%
set heure= %TIME:~0,2% Heures %TIME:~3,2% Minutes %TIME:~6,2% Sec %

set rep=D:\ZOB
del %rep%\*.*     /Q 
cd %rep%
git init 
git-remote rm origin 
git-remote add origin https://github.com/KBouchek/test.git
git config --global user.email zob@user.fr
git config --global user.name zob
cls
git-remote -v
rem pause

rem **********************************************************
rem **********************************************************
rem **********************************************************
copy d:\*.bat %rep%\
dir
rem pause
rem **********************************************************
rem **********************************************************
rem **********************************************************

git add *.bat
git status
git commit -am "......%date%%heure%...."%

git push origin master --force
pause
