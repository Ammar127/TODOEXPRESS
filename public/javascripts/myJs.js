function foo(element,txt, id ){

  //  alert("Onclick"+element+id +txt);

element.innerHTML = " <form action=\"/UPD\" method=\"post\" id='fom' >  <input  name='ida' hidden value="+id+" > <input onblur='foo2()' class=\"new-todo\" name=\"tash\" value='"+txt+"' autofocus>" +
    "</form>\n" +
    " ";

}
function foo2() {

    document.forms["fom"].submit();


}