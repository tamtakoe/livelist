/* ===========================================================
 * livelist.js v0.7
 * http://github.com/tamtakoe/livelist
 * Created by Oleg Istomin 2012
 * ========================================================== */



!function ($) {

  "use strict"; // jshint ;_;


 /* LIVELIST PUBLIC CLASS DEFINITION
  * =============================== */

  var Livelist = function (element, template, options) {
    this.init('livelist', element, template, options)
  }

  Livelist.prototype = {

    constructor: Livelist

  , init: function (type, element, template, options) {
	  var a = this
	  
      this.type = type
	  this.template = template
      this.$element = $(element)

	  this.$element.on( 'keyup', 'input.linegen', function(){
	    a.checkLastItem()
	  })
	  
	  this.$element.on( 'click', '.close', function(e){
		a.delItem($(e.target).parent())
	  })
	  
	  this.makeList(options)	  
	  this.addItem()
    }
  
  , editItem: function ($item, options) {
      var $linegen = $item.find('input.linegen')
	  var $closebtn = $item.find('.close')
      for (var key in options) if (options[key] === 'default') options[key] = $.fn.livelist.defaults[key]
	  $item.data('itemOptions',$.extend({}, $.fn.livelist.defaults, options))
	  if (typeof options.description === 'string') $linegen.val(options.description)
      if (typeof options.editable === 'boolean') options.editable === true ? $linegen.removeAttr('disabled') : $linegen.attr('disabled','disabled')
	  if (typeof options.deletable === 'boolean') options.deletable === true ? $closebtn.show() : $closebtn.hide()
	  if (typeof options.sortable === 'boolean') options.sortable === true ? $item.addClass('sortable') : $item.removeClass('sortable')
  }
  
  , recordInputData: function ($item) {
      $item.data('itemOptions').description = $item.find('input.linegen').val()
	  $item.data('itemOptions').note = $item.find('input.note').val()
  }
  
  , checkLastItem: function () {
      var $lastitem = this.$element.children().eq(-1)
	  if ($lastitem.find('input.linegen').val() !== '') {
		this.editItem($lastitem, {sortable:'default', deletable:'default'})
		this.addItem()
	  } else if ($lastitem.prev().find('input.linegen').val() === '' && $lastitem.prev().data('itemOptions').deletable !== false) {
		this.editItem($lastitem.prev(), {sortable:false, deletable:false})
		this.delItem($lastitem)
	  }
  }
	
  , makeList: function (optionsList) {
      this.$list = $([]);
	  for (var i=0; i<optionsList.length; i++) {	  
		  var options = $.extend({}, $.fn.livelist.defaults, optionsList[i])
		  var $item = $(this.template)
		  this.editItem($item, options)
		  this.$list = this.$list.add($item);	  
	  }
	  this.$list.appendTo(this.$element)
  }
  
  , addItem: function () {
	  var $item = $(this.template).data('itemOptions', $.fn.livelist.defaults)
	  this.editItem($item, {sortable:false, deletable:false})
	  $item.appendTo(this.$element)
    }
	
  , delItem: function ($item) {
	  $item.remove()
    }
	
  , save: function () {
      var a = this
	  var data = []
	  var datalength = this.$element.children().length-1
      this.$element.children().each(function(i) {
		if (i < datalength) {
			var $b = $(this)
			if (typeof $b.data('itemOptions') !=='undefined') {
				a.recordInputData($b)
				var op = $b.data('itemOptions')
				data.push({'type': op.type, 'description': op.description, 'note': op.note})
			}
		}
	  })
	  console.log(JSON.stringify(data))
	  //console.log(encodeURIComponent(JSON.stringify(data)))
    }

  }


 /* LIVELIST PLUGIN DEFINITION
  * ========================= */

  $.fn.livelist = function ( template, option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('livelist')
        , options = typeof option == 'object' && option
	  if (!template) template = ''
      if (!data) $this.data('livelist', (data = new Livelist(this, template, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.livelist.Constructor = Livelist

  $.fn.livelist.defaults = {
    sortable: true
  , editable: true
  , deletable: true
  , type: 0
  , description: ''
  , note: ''
  }

}(window.jQuery);