var MAX=25;
var PP="";
var ss=" ==> ";
var rc='\n';
var cc;
var I,N,NN,bufx,bufy,expediteur,destinataire,msg,pseudo;
var port=880;
var dirx=__dirname+'/public/index.html';
var version ='.. 20-Aout-2017  93.19.12.55 Port '+port;
var TABY= [];TABZ=[];
var PSEUDO=["zobxx","table","totox","tatax","titix","popox","papax","cohen","karim","pouet","tabxx"];
N=PSEUDO.length;
for (var i = 0; i < N; i++) TABY[i]=new toto(null);

for (var i = 1; i < MAX; i++) TABZ[i]=new conserve(null,null,null);

var SOCKX;
NN=0;
function toto(id) {this.id= id;}

 function conserve(destinataire,expedideur,msg) {this.destinataie=destinataire,this.expediditeur=expediteur,this.msg=msg};
   
  
//*********************************************************************
//**************************** REQUIRE *************************************
//*********************************************************************
var colors =require('colors');
var express = require('express');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var iox = require('socket.io');
var app = express();
var http = require('http').Server(app);
//var url = require('url');
var io = require('socket.io')(http);
app.use('/', express.static(__dirname + "/public"));
//*****************************************************
//********* CLEAR                     ********************
//*****************************************************
function clear()
{
process.stdout.write('\033c');
}
//*****************************************************
//********* control                ********************
//*****************************************************
function control(C)
{
for (var i = 1; i < N; i++)
{
//console.log("CONTROL  "+PSEUDO[i]+"  "+TABY[i].id);
if (PSEUDO[i] ==C) return i;
}
return -1;
}

//*****************************************************
//********* INFORM_A                 ********************
//*****************************************************
function INFORM_A()
{

for (var i = 1; i < N; i++)
{
if (TABY[i].id !=null) io.sockets.connected[TABY[i].id].emit("LISTY",pseudo);
}
}
//*****************************************************
//********* INFORM_B        ********************
//*****************************************************
function INFORM_B()
{
for (var j = 1; j < N; j++)
{

if (TABY[j].id !=null)
{
io.sockets.connected[TABY[I].id].emit("LISTY",PSEUDO[j]);
}
}
}

//***************************************************
//********* NETTOIE            ********************
//*****************************************************
function NETTOIE(p)
{
for (var i = 1; i < MAX; i++)
{

if (TABZ[i].destinataire ==p) TABZ[i].destinataire=null;
}
}


//*****************************************************
//********* affiche_log               ********************
//*****************************************************
function affiche_log(C)
{
/*
console.log(N+' =============== PSEUDO DECONNECT==========================');
console.log(PSEUDO);
console.log(N+'================TABY  DECONNECT========================');
console.log(TABY);
*/
}


//******************************************************
//******************  connection **********************
//******************************************************
//***************************************************
//********* STOCK              ********************
//*****************************************************
function STOCK(e,d,m)
{
var k;
for (var i = 1; i < MAX; i++)
{

if (TABZ[i].destinataire == null)
{
TABZ[i].destinataire=d;
TABZ[i].expediteur=e;
TABZ[i].msg=m;
console.log("STOCK  "+i+ss+e+ss+d+ss+m);
return;
}
}
}

//***************************************************
//********* RETROUVE             ********************
//*****************************************************
function RETROUVE(p)
{
//console.log("RETROUVE "+p);

for (var i = 1; i < MAX; i++)
{

if (TABZ[i].destinataire ==p)
{

destinataire=TABZ[i].destinataire
expediteur=TABZ[i].expediteur;

msg=TABZ[i].msg;
console.log("RETROUVE  ENVOI "+i+expediteur+ss+expediteur+ss+msg);

SOCKX.broadcast.emit("GENERAL",{'expediteur' : expediteur,'destinataire' : destinataire, 'message' : msg });
SOCKX.emit("GENERAL",{ 'expediteur' : expediteur,'destinataire' : destinataire, 'message' : msg });
TABZ[i].destinataire=null;

}
}
}

//******************************************************
//******************  connection **********************
//******************************************************

io.on('connection', function (socket)
{
clear();
SOCKX=socket;
//console.log(io.sockets.clients());
//console.log(io.engine.clients);

console.log('....  CONNECTION GENERALE  ....'.yellow.bold.bgBlack+N);
 //console.log("Engine; ",Object.keys(io.engine.clients));


//******************************************************  
//*********************  disconnect **********************
//******************************************************  
socket.on('disconnect', function ()
{
if (!socket.x) return;
pseudo=socket.x;
I=control(pseudo);
if (I <=0)return;
TABY[I].id=null;
console.log('Deconnection de ===> '+pseudo+ss+I);
socket.broadcast.emit('DECONNECT',pseudo);

});

//*************************************************************
//************   PSEUDOX            ***************************
//*************************************************************
socket.on('PSEUDOX', function (msgp)
{

pseudo=msgp;
I=control(pseudo);
if (I<=0)
{
io.emit('PSEUDOY', 'KO'); return;
}
io.emit('PSEUDOY', pseudo);
TABY[I].id=socket.id;
socket.x=pseudo;
console.log('Connection de ===> '+pseudo+ss+TABY[I].id+ss+I+ss+PSEUDO[I]);
INFORM_A();
INFORM_B();
RETROUVE(pseudo);
//NETTOIE(pseudo);

});
//*************************************************************
//************   ENVOI                ***************************
//*************************************************************
socket.on('ENVOI', function (msgy)
{
expediteur=msgy.expediteur;
destinataire=msgy.destinataire;
msg=msgy.message;

I=control(destinataire);
console.log("ENVOI "+expediteur+ss+destinataire+ss+msg+ss+I);
if (TABY[I].id==null )
{ 
STOCK(expediteur,destinataire,msg);
return;
}

socket.broadcast.emit("GENERAL",{'expediteur' : expediteur,'destinataire' : destinataire, 'message' : msg });
socket.emit("GENERAL",{ 'expediteur' : expediteur,'destinataire' : destinataire, 'message' : msg });
});


//*************************************************************
//************ LISTX                  *********************
//*************************************************************
socket.emit('LISTX', PSEUDO);

});//***** fine connections ********* 


//******************************************************
//******************  fin de socket ***************
//******************************************************

http.listen(port, function () 
{
console.log(version+' '+dirx+" Port = "+port);
});
http.on('error', function (e) 
{
 console.log('....  TRAVAILLLE DEJA ....'.red.bold.bgWhite);
});


