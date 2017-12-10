cls
D:
set date=  %DATE:~0,2%:%DATE:~3,2%:%DATE:~6,4%
set heure= %TIME:~0,2% Heures %TIME:~3,2% Minutes %TIME:~6,2% Sec %
rem git commit -am "......%date%%heure%...."%
set rep=D:\ZOB
rd %rep%     /Q /S 
git-remote rm origin 
git-remote add origin https://github.com/Papaxx/xx.git
git-remote -v
pause
rem **********************************************************
rem **********************************************************
rem **********************************************************
git-clone https://github.com/Papaxx/xx.git %rep%

git fetch
git pull origin master 
cd %rep%
dir

pause
