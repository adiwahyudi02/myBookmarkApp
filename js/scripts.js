const ctn = document.getElementById('bookmark-list');
const form = document.querySelector('form');
const msg_no_items = document.getElementById('msg-no-items');
const button = document.getElementById('btn-clear-all');
const inputSearch = document.getElementById('input-search');
const inputTitle = document.getElementById('title');
const inputUrl = document.getElementById('url');

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

if(itemsArray.length == 0){
  button.disabled = true;
  button.classList.remove('hover-btn-clear-all');
  button.style.cssText = "cursor: not-allowed";
  button.setAttribute('title', 'no items');

  msg_no_items.style.cssText = 'display: block';

  inputSearch.disabled = true;
  inputSearch.style.cssText = "cursor: ''";
  inputSearch.setAttribute('title', 'no items');
}


const liMaker = (text, index) => {

  localStorage.key(index)

  const row = document.createElement('div');
  row.className = 'row';
  ctn.appendChild(row);

  const col = document.createElement('div');
  col.className = 'col';
  row.appendChild(col);

  const title = document.createElement('p');
  title.textContent = text.title;
  title.setAttribute("id", "paragraph-" + index);
  col.appendChild(title);

  const url = document.createElement('small');
  url.textContent = text.url;
  col.appendChild(url);

  const ctn_btn = document.createElement('div');
  ctn_btn.className = 'ctn-btn';
  row.appendChild(ctn_btn);

  const see_link = document.createElement('a');
  see_link.setAttribute('href',text.url);
  see_link.setAttribute('target','_blank');
  ctn_btn.appendChild(see_link);

  const see = document.createElement('button');
  see.type = 'button';
  see.className = 'see far fa-eye';
  see_link.setAttribute('title','view bookmark');
  see_link.appendChild(see);

  const remove = document.createElement('button');
  remove.type = 'submit';
  remove.value = index;
  remove.className = 'remove far fa-trash-alt';
  remove.setAttribute('title','remove bookmark');
  remove.setAttribute('onclick','unbookmark(' + index + ')');
  ctn_btn.appendChild(remove);
  
}


function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);

}

function save() {

  if(inputTitle.value == ''){
    alert('field title cannot be empty !')
  }
  else if(inputUrl.value == ''){
    alert('field url cannot be empty !')
  }
  else if(!validURL(inputUrl.value)){
    alert('Enter the correct URL!')
  }
  else{

    var items = {
      'title': inputTitle.value, 'url': inputUrl.value
    }

    itemsArray.push(items);

    localStorage.setItem('items', JSON.stringify(itemsArray));

    itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];


    liMaker(items, itemsArray.length - 1);

    inputTitle.value = "";
    inputUrl.value = "";

    if(itemsArray.length != 0){
      button.disabled = false;
      button.classList.add('hover-btn-clear-all');
      button.style.cssText = "cursor: pointer";
      button.setAttribute('title', '');
    
      msg_no_items.style.cssText = 'display: none';

      inputSearch.disabled = false;
      inputSearch.style.cssText = "cursor: text";
      inputSearch.setAttribute('title', '');
    }
  }

};

function unbookmark(key){

  itemsArray.splice(key, 1);
  localStorage['items'] = JSON.stringify(itemsArray);

  if(ctn.childElementCount == 1){
    ctn.removeChild(ctn.firstChild);
  }
  else{
    ctn.removeChild(ctn.children[key]);
  }

  if(itemsArray.length == 0){
    button.disabled = true;
    button.classList.remove('hover-btn-clear-all');
    button.style.cssText = "cursor: not-allowed";
    button.setAttribute('title', 'no items');
  
    msg_no_items.style.cssText = 'display: block';

    inputSearch.disabled = true;
    inputSearch.style.cssText = "cursor: ''";
    inputSearch.setAttribute('title', 'no items');
  }
}

data.forEach(listbookmark);

function listbookmark(item, index) {
    liMaker(item, index);
}

function search() {

  var filter, p, i, txtValue, rows;
  var search = document.getElementById('input-search');
  var filter = search.value.toUpperCase();
  
  var container = document.getElementById("bookmark-list");
  rows = container.getElementsByClassName('row');
  
  for (i = 0; i < rows.length; i++) {
    
    p = document.getElementById("paragraph-" + i);
  
    txtValue = p.textContent || p.innerText;

    if (txtValue.toUpperCase().indexOf(filter) > -1) {

      rows[i].style.display = "";

    } else {

      rows[i].style.display = "none";

    }
  }
}

button.addEventListener('click', function () {
  
  localStorage.clear();
  while (ctn.firstChild) {
    ctn.removeChild(ctn.firstChild);
  }

  itemsArray = [];

  if(itemsArray.length == 0){
    button.disabled = true;
    button.classList.remove('hover-btn-clear-all');
    button.style.cssText = "cursor: not-allowed";
    button.setAttribute('title', 'no items');
  
    msg_no_items.style.cssText = 'display: block';

    inputSearch.disabled = true;
    inputSearch.style.cssText = "cursor: ''";
    inputSearch.setAttribute('title', 'no items');
  }
});