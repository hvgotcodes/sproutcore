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
        frame, context;
    
    if (elem && elem.getContext) {
      if (this.didChange('height')) elem.height = this.height || 0;
      if (this.didChange('width')) elem.width = this.width || 0;
      
      if (this.didChange('value')) {
        context = elem.getContext('2d');
        
        context.clearRect(0, 0, this.width, this.height);
        
        if (this.backgroundColor) {
          context.fillStyle = this.backgroundColor;
          context.fillRect(0, 0, this.width, this.height);
        }
        
        frame = this.calculateFitFrame(this.fit, value.width, value.height);
        context.drawImage(value, 0, 0, value.width, value.height, frame.x, frame.y, frame.width, frame.height);
      }
    }
    
    this.resetChanges();
  },
  
  calculateFitFrame: function(fit, width, height) {
    var containerWidth = this.width,
        containerHeight = this.height,
        result = {x: 0, y: 0, width: containerWidth, height: containerHeight},
        scaleX, scaleY, scale;
    
    // fast path
    if (fit === SC.FILL) return result;
    
    scaleX = containerWidth / width;
    scaleY = containerHeight / height;
    scale = scaleX < scaleY ? scaleX : scaleY;
    
    if (fit === SC.FIT_WIDTH) {
      scale = scaleX;
    } else if (fit === SC.FIT_HEIGHT) {
      scale = scaleY;
    }
    
    width *= scale;
    result.width = width;
    result.x = (containerWidth / 2) - (width / 2);
    
    height *= scale;
    result.height = height;
    result.y = (containerHeight / 2) - (height / 2);
    
    return result;
  }

});

SC.BaseTheme.renderers.canvasImage = SC.BaseTheme.renderers.CanvasImage.create();