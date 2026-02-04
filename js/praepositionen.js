/**
 * Logik zur Überprüfung der Übereinstimmung von Datenattributen (data-parent vs data-owner)
 */
$('#test').click(function(){
    let score = 0;
    let totalItems = $('.draggable').length;

    $('.draggable').each(function(){
        const parentBox = $(this).parent();
        
        // Prüfung, ob das Element in einer gültigen Zielbox liegt
        if(parentBox.hasClass('box')){
            if($(this).data('parent') === parentBox.data('owner')){
                $(this).css({background:'#12a6a4', color:'white', borderColor:'#12a6a4'}); 
                score++;
            } else {
                $(this).css({background:'#ff7675', color:'white', borderColor:'#ff7675'});
            }
        }
    });
    
    $('#result').html('Ergebnis: ' + score + ' von 8 richtig!');
    $('.neuesSpiel').removeClass('hide');
});

/**
 * Event-Handler für Drag & Drop Funktionalität (HTML5 API)
 */
function allowDrop(e) {
    e.preventDefault();
}

function drag(e) {
    e.dataTransfer.setData("text", e.target.id);
}

function drop(e) {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("text");
    const draggedEl = document.getElementById(draggedId);
    const targetBox = e.target.classList.contains('box') ? e.target : e.target.closest('.box');

    if (!targetBox) return;

    // Logik für Feld-Austausch: Wenn Feld besetzt, altes Wort zurück in den Pool verschieben
    if (targetBox.children.length > 0) {
        const existingChild = targetBox.children[0];
        document.getElementById('wordPool').appendChild(existingChild);
        // Reset der Farben falls vorher schon geprüft wurde
        $(existingChild).css({background:'white', color:'#12a6a4', borderColor:'#12a6a4'});
    }

    targetBox.appendChild(draggedEl);
}

/**
 * Utility-Funktionen zur Status-Steuerung
 */
function check(btn) {
    btn.classList.add("btn-clicked");
}

function tryAgain() {
    location.reload();
}