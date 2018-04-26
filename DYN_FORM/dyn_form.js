var formDef1= [
  {label:'Название сайта:',kind:'longtext',name:'sitename'},
  {label:'URL сайта:',kind:'longtext',name:'siteurl'},
  {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
  {label:'E-mail для связи:',kind:'shorttext',name:'email'},
  {label:'Рубрика каталога:',kind:'combo',name:'division',
    variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
  {label:'Размещение:',kind:'radio',name:'payment',
    variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
  {label:'Разрешить отзывы:',kind:'check',name:'votes'},
  {label:'Описание сайта:',kind:'memo',name:'description'},
  {label:'Опубликовать:',kind:'submit'},
];

var formDef2= [
  {label:'Фамилия:',kind:'longtext',name:'lastname'},
  {label:'Имя:',kind:'longtext',name:'firstname'},
  {label:'Отчество:',kind:'longtext',name:'secondname'},
  {label:'Возраст:',kind:'number',name:'age'},
  {label:'Зарегистрироваться:',kind:'submit'},
]; 

document.getElementById("button_1").addEventListener("click", function() {addDynamicForm(formDef1, "form_1")});
document.forms.form_2.addEventListener("click", function() {addDynamicForm(formDef2, "form_2")});

function addDynamicForm(arg, destination){
    for (i=0; i<arg.length; i++){
        var newdiv = document.createElement('div');
        switch(arg[i].kind){
            case 'shorttext':
                  newdiv.innerHTML = arg[i].label + "<input type='email' name='"+arg[i].name+"'>";
                  break;
            case 'longtext':
                  newdiv.innerHTML = arg[i].label + "<input type='text' name='"+arg[i].name+"'>";
                  break;       
            case 'check':
                newdiv.innerHTML = arg[i].label + "<input type='checkbox' name='"+arg[i].name+"'>";
                break;
            case 'memo':
                newdiv.innerHTML = arg[i].label + "<br><textarea name='"+arg[i].name+"''></textarea>";
                break;
            case 'number':
                newdiv.innerHTML = arg[i].label + "<input type='number' name='"+arg[i].name+"'>";
                break; 
            case 'radio':
                var str="<p>"+arg[i].label+"<p/>";
                for (var j=0; j<arg[i].variants.length; j++){
                    str+="<input type='radio' name='"+arg[i].name+"'value='"+arg[i].variants[j].value+"'>"+arg[i].variants[j].text;
                }    
                newdiv.innerHTML = str;
                break;    
            case 'combo':                
                var str=arg[i].label+"<br><select name='"+arg[i].name+"'>";
                for (var j=0; j<arg[i].variants.length; j++){
                    str+="<option value='"+arg[i].variants[j].value+"'>"+arg[i].variants[j].text+"</option>";
                }    
                str+="</select>";
                newdiv.innerHTML = str;
                break;  
            case 'submit':
                newdiv.innerHTML = "<input type='submit' value='"+arg[i].label+"'></br>";
                break;                   
        }
        document.forms.namedItem(destination).appendChild(newdiv);
    }
}