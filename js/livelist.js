/* ===========================================================
 * livelist.js v0.9
 * http://github.com/tamtakoe/livelist
 * ========================================================== */

!function ($) {

  "use strict"; // jshint ;_;


 /* LIVELIST PUBLIC CLASS DEFINITION
  * =============================== */

  var Livelist = function (element, options) {
    this.init('livelist', element, options)
  }

  Livelist.prototype = {

    constructor: Livelist

  , init: function (type, element, options) {
	  var a = this
      this.type = type
      this.$element = $(element)
	  this.$element.find('[data-ll]').each(function() {
		var $this = $(this)
		var defoption = $.fn.livelist.defaults[$this.attr('data-ll')]
		switch ($this[0].nodeName.toLowerCase()) {
			case 'input': defoption = $this.val(); break
			case 'textarea': defoption = $this.html(''); break
			default: defoption = $this.attr('value')
		}
	  })
	  this.template = this.$element.html()
	  this.$element.html('')

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
	  var $closebtn = $item.find('.close')
      for (var key in options) if (options[key] === 'default') options[key] = $.fn.livelist.defaults[key]
	  $item.data().itemOptions = $.extend({}, $item.data('itemOptions'), options)
      if (typeof options.editable === 'boolean') {
		  if (options.editable === true) {
			$description.removeAttr('disabled')
		  } else {
			$description.attr('disabled','disabled')
		  }
	  }
	  if (typeof options.deletable === 'boolean') options.deletable === true ? $closebtn.show() : $closebtn.hide()
	  if (typeof options.sortable === 'boolean') options.sortable === true ? $item.addClass('sortable') : $item.removeClass('sortable')
  }
  
  , recordInputData: function ($item) {
	  $item.find('[data-ll]').each(function() {
		var $this = $(this)
		var defoption = $.fn.livelist.defaults[$this.attr('data-ll')]
		switch ($this[0].nodeName.toLowerCase()) {
			case 'input': defoption = $this.val(); break
			case 'textarea': defoption = $this.html(''); break
			default: defoption = $this.attr('value')
		}
	  })
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
	
  , makeList: function (options) {
      this.$list = $([]);
	  for (var i=0; i<options.length; i++) {	  
		  var $item = $(this.template)
		  var itemoptions = $.extend({}, $.fn.livelist.defaults, options[i])
		  this.editItem($item, itemoptions)
		  this.$list = this.$list.add($item);	  
	  }
	  this.$list.appendTo(this.$element)
  }
  
  , addItem: function (options) {
  	  options = options || {sortable:false, deletable:false}
	  var $item = $(this.template)
	  var itemoptions = $.extend({}, $.fn.livelist.defaults, options)
	  this.editItem($item, itemoptions)
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
				data.push($b.data('itemOptions'))
			}
		}
	  })
	  return JSON.stringify(data)
    }

  }


 /* LIVELIST PLUGIN DEFINITION
  * ========================= */

  $.fn.livelist = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('livelist')
        , options = typeof option == 'object' && option
      if (!data) $this.data('livelist', (data = new Livelist(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.livelist.Constructor = Livelist

  $.fn.livelist.defaults = {
    sortable: true
  , editable: true
  , deletable: true
  }

}(window.jQuery);