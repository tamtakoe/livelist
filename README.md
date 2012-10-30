livelist
========

list with dinamyc-added field

Список с динамически-добавляемыми полями

Подключение:
<pre>
$(document).ready(function() {
  var template = '&lt;div&gt;&lt;input type="text" class="linegen"&gt;&lt;a href="#" class="close"&gt;×&lt;/a&gt;&lt;/div&gt;'
  var data = [{description:'8 (812) 123-12-12', sortable:false, deletable:false},{description:'+7 921 123-45-67'}]
  $('#cont').livelist(template, data).sortable({axis: 'y', items:'.sortable'});

  $('#save').on('click', function(){
    $('#cont').livelist().data().livelist.save()
  })
});
</pre>
Работающий пример:
http://tamtakoe.github.com/livelist/
		