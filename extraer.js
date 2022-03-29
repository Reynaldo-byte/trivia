var preguntas=[]
var correctas=[]
var contador=0;

function cargar_preguntas() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.responseText;
            var converRes= JSON.parse(res);
            for(let i=0;i<converRes.results.length;i++){
                document.getElementById('preguntas').innerHTML=document.getElementById('preguntas').innerHTML+'<p id="pregunta_'+i+'" hidden><j class="category">'+converRes.results[i].category+'</j><br><br>'+converRes.results[i].question+'<br><br><br><button class="true"  id=True_'+i+' onclick=comprobar("True",'+i+') >True</button><button class="false"  id=False_'+i+' onclick=comprobar("False",'+i+') >False</button></p>'
               preguntas.push(converRes.results[i].question);

                correctas.push(converRes.results[i].correct_answer);


            }
            document.getElementById('preguntas').innerHTML=document.getElementById('preguntas').innerHTML+'<button onclick="window.location.reload()" id="reinicio" hidden> PLAY AGAIN?</button>'
        }
    };

    xhttp.open("GET", "prueba.json", true);
    xhttp.send();}
    function comprobar(value,id){
    const valor=value;
    console.log(valor)
                 document.getElementById('False_'+id).setAttribute('disabled','')
                 document.getElementById('True_'+id).setAttribute('disabled','')
    if (correctas[id]==valor) {
        contador=contador+1;
        document.getElementById(valor+'_'+id).setAttribute('style','border-color:green;border-style:solid;border-width:0.5rem;')

        }
    
    else{
                       
            document.getElementById(valor+'_'+id).setAttribute('style','border-color:red;border-style:solid;border-width:0.5rem;')
            document.getElementById('True_'+id).setAttribute('diabled','')
            document.getElementById('False_'+id).setAttribute('disabled','')

        }
   
    


    document.getElementById('pregunta_'+(id)).setAttribute('hidden','')

    if (id==9) {
        for (var k = 0; k <preguntas.length-1 ; k++) {
            document.getElementById('pregunta_'+(k)).removeAttribute('hidden')
            document.getElementById('preguntas').removeAttribute('hidden','')
            document.getElementById('puntaje').removeAttribute('hidden')
            document.getElementById('fin').removeAttribute('hidden')
            document.getElementById('reinicio').removeAttribute('hidden')
        }
    }
    else{

    document.getElementById('pregunta_'+(id+1)).removeAttribute('hidden')
    }
    document.getElementById('puntaje').innerHTML=contador+'/'+preguntas.length
}
function comenzar(){
    document.getElementById('inicio').setAttribute('hidden','')
    document.getElementById('preguntas').removeAttribute('hidden')
    document.getElementById('pregunta_0').removeAttribute('hidden')
}