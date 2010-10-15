// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require("renderers/renderer");

/** @class
  @extends SC.Renderer
  @since SproutCore 1.1
*/
SC.BaseTheme.renderers.Image = SC.Renderer.extend({

  render: function(context) {
    var src = this.src,
        sprite = this.sprite,
        toolTip = this.toolTip || "";
    
    context.attr('src', src);
    
    if (sprite) {
      context.addClass(sprite);
      this._last_class = sprite;
    }
    
    context.attr('title', toolTip);
    context.attr('alt', toolTip);
    
    this.resetChanges();
  },
  
  update: function() {
    var cq = this.$(),
        src = this.src,
        sprite = this.sprite,
        toolTip = this.toolTip;
    
    if (this.didChange('src')) {
      cq.attr('src', src);
    }
    
    if (this.didChange('sprite')) {
      if (this._last_class) cq.setClass(this._last_class, NO);
      cq.addClass(sprite);
      this._last_class = sprite;
    }
    
    if (this.didChange('toolTip')) {
      cq.attr('title', toolTip);
      cq.attr('alt', toolTip);
    }
    
    this.resetChanges();
  }

});

SC.BaseTheme.renderers.image = SC.BaseTheme.renderers.Image.create();
