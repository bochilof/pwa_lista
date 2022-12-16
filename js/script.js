// verifica se existem dados salvos no cache do navegador
// caso positivo, adiciona os itens na lista
if(localStorage.length > 0){
    Object.keys(localStorage).forEach(function(tipo){
        // separa os itens de uma categoria
        let categoria = localStorage.getItem(tipo).split(';');
        
        // adiciona os itens na lista (DOM)
        for(let item of categoria){
            if(item != ''){
                let div = document.createElement('div');
                div.classList.add('item');
                div.innerHTML = item;
                div.addEventListener('click',function(){
                    this.classList.toggle('item-ok');
                });
                document.getElementById(tipo).appendChild(div);
            }
        }
    });
}

// evento do botão '-' (remove os itens riscados da lista e do localStorage)
document.getElementById('btn-remover').addEventListener('click',function(){
    let itensRemover = document.getElementsByClassName('item-ok');
    for(let i = itensRemover.length - 1; i >= 0; i--){
        // revome do localStorage
        let chaveStorage = itensRemover[i].parentNode.id;
        let strStorage = localStorage.getItem(chaveStorage);
        let novaStrStorage = strReplace(strStorage,itensRemover[i].innerHTML);
        localStorage.setItem(chaveStorage,novaStrStorage);
        itensRemover[i].remove();
    }
});


// evento do botão '+' (adiciona itens na lista e no localStorage)
document.getElementById('btn-add').addEventListener('click',function(){
    addItem();
});

// evento para adicionar item com a tecla 'enter'
window.addEventListener('keyup',function(e){
    if(e.key == 'Enter'){
        addItem();
    }
});

window.addEventListener('onPress',function(e){
    alert(e);
});

// evento do botão 'limpar' (exclui todos os itens da lista)
document.getElementById('btn-limpar').addEventListener('click',function(){
    let setores = document.getElementsByClassName('setor');
    
    for(let setor of setores){
        setor.innerHTML = "";
    }

    localStorage.clear();
});

// adiciona itens na lista e no localStorage
function addItem(){
    let input = document.getElementById('input-item');
    let select = document.getElementById('select');
    let setor = select.options[select.selectedIndex].value;
    
    // define o container destino do item
    let destino = 'container-' + setor;

    // adiciona o item ao localStorage
    let str = localStorage.getItem(destino);
    if(str != null){
        str = str + ';' + input.value;
        localStorage.setItem(destino,str);
    }else{
        localStorage.setItem(destino,input.value);
    }
    
    // adiciona o item na tela
    let div_item = document.createElement('div');
    div_item.classList.add('item');
    div_item.innerHTML = input.value;
    
    div_item.addEventListener('click',function(){
        this.classList.toggle('item-ok');
    });
    
    document.getElementById(destino).appendChild(div_item);
    
    input.value = '';
    input.focus();
}

// remove itens da string vinda do localStorage e retorna uma nova string
function strReplace(str,remover){
    let array = str.split(';');
    str = '';
    array.forEach(function(valor){
        if(valor != remover){
            str = str + ';' + valor;
        }
    });
    return str.substring(1);
}