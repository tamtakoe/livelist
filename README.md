livelist
========

list with dinamyc-added field

Список с динамически-добавляемыми полями

Как подключать:
<pre>
$(document).ready(function() {
  var template = '&lt;div&gt;&lt;input type="checkbox" class="flag"&gt;&lt;input type="text" class="linegen"&gt;&lt;a href="#" class="close"&gt;×&lt;/a&gt;&lt;/div&gt;'
  var data = [{description:'ля-ля', sortable:false, deletable:false},{description:'э'}]
  $('#cont').livelist(template, data).sortable({axis: 'y', items:'.sortable'});

  $('#save').on('click', function(){
    $('#cont').livelist().data().livelist.save()
  })
});
</pre>
Пример:
http://tamtakoe.github.com/livelist/
		