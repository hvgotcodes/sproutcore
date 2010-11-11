// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

sc_require("renderers/renderer");

/** @class
  @extends SC.Renderer
  @since SproutCore 1.1
*/
SC.BaseTheme.renderers.CanvasImage = SC.Renderer.extend({

  // we don't have a layer yet, so canvas is useless!
  render: function(context) {
    context.attr('width', this.width);
    context.attr('height', this.height);
    
    this.resetChanges();
  },
  
  update: function() {
    var elem = this.$()[0],
        value = this.value,
        context;
    
    if (this.didChange('value') && elem && elem.getContext) {
      context = elem.getContext('2d');
      context.drawImage(value, 0, 0, value.width, value.height, 0, 0, this.width, this.height);
    }
    
    this.resetChanges();
  }
});

SC.BaseTheme.renderers.canvasImage = SC.BaseTheme.renderers.CanvasImage.create();