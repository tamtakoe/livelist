livelist
========

list with dinamyc-added field

Список с динамически-добавляемыми полями. Может использоваться для ввода неопределенного количества данных: телефонных номеров, адресов, участников и т.д.

Подключение:
<pre>
$(document).ready(function() {
  var data = [{description:'8 (812) 123-12-12', sortable:false, deletable:false},{description:'+7 921 123-45-67'}]
  $('#cont').livelist(template, data).sortable({axis: 'y', items:'.sortable'});

  $('#save').on('click', function(){
    $('#cont').livelist().data().livelist.save()
  })
});
</pre>
Шаблон для элементов берется из html-содержимого #cont, которое перед генерацией списка удаляется.
Выходные данные содержат информацию из полей с data-ll-атрибутами.
<pre>
&lt;div id="cont"&gt;
  &lt;div&gt;
    &lt;input type="checkbox" class="flag" data-ll="flag"&gt;
    &lt;input type="text" class="linegen" data-ll="description"&gt;&lt;/input&gt;
    &lt;a href="#" class="close"&gt;×&lt;/a&gt;
  &lt;/div&gt;
&lt;/div&gt;
</pre>
Работающий пример:
http://tamtakoe.github.com/livelist/
		