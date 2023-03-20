const { Artboard } = require("scenegraph");

function getIsArtboard(node) {
  return node && node instanceof Artboard;
}

function getBoundsInParent(item) {
  var bounds = {};
  var x = 0;
  var y = 0;
  var parentX = 0;
  var parentY = 0;
  var parentWidth= 0;
  var parentHeight = 0;
  var width= 0;
  var height = 0;
  var parent = null;
  var offsetX = 0;
  var offsetY = 0;
  var centerX = 0;
  var centerY = 0;
  var centerDeltaX = 0;
  var centerDeltaY = 0;
  var globalCenterX = 0;
  var globalCenterY = 0;
  var globalDeltaX = 0;
  var globalDeltaY = 0;
  var isLine = item && item instanceof Line;
  var sizeAdjusted = false;
  var artboard = null;
  var xInArtboard = 0;
  var yInArtboard = 0;
  var parentXInArtboard = 0;
  var parentYInArtboard = 0;
  var usePrev = false;
  var hasRotation = item.rotation!=0;
  var unrotatedTransform = hasRotation ? item.transform.rotate(-item.rotation, item.localCenterPoint.x, item.localCenterPoint.y) : null;
  var unrotatedBounds = hasRotation ? unrotatedTransform.transformRect(item.localBounds) : null;
  var parentTranslate = [];

  if (item.parent) {
      artboard = getArtboard(item);
      parent = item.parent;
      
      parentTranslate = getComputedTranslation(item);

      x = item.globalBounds.x;
      y = item.globalBounds.y;
      width = item.globalBounds.width;
      height = item.globalBounds.height;
      xInArtboard = artboard ? item.globalBounds.x - artboard.globalBounds.x : 0;
      yInArtboard = artboard ? item.globalBounds.y - artboard.globalBounds.y : 0;

      parentXInArtboard = artboard ? parent.globalBounds.x - artboard.globalBounds.x : 0;
      parentYInArtboard = artboard ? parent.globalBounds.y - artboard.globalBounds.y : 0;

      if (isLine && width==0 && item instanceof Line) {
          width = item.strokeWidth;
          sizeAdjusted = true;
      }
      
      if (isLine && height==0 && item instanceof Line) {
          height = item.strokeWidth;
          sizeAdjusted = true;
      }

      parentX = parent.globalBounds.x;
      parentY = parent.globalBounds.y;
      parentWidth = parent.globalBounds.width;
      parentHeight = parent.globalBounds.height;

      // center cartisian position
      centerX = parentWidth/2 - width/2;
      centerY = parentHeight/2 - height/2;

      offsetX = x - parentX;
      offsetY = y - parentY;
      
      globalCenterX = parentX + centerX;
      globalCenterY = parentY + centerY;
      
      if (usePrev) {
        centerDeltaX = centerX - offsetX;
        centerDeltaY = centerY - offsetY;
      }
      else {
        centerDeltaX = offsetX - centerX;
        centerDeltaY = offsetY - centerY;
      }

      
      globalDeltaX = x + centerDeltaX;
      globalDeltaY = y - centerDeltaY;

      bounds.xInArtboard = xInArtboard;
      bounds.yInArtboard = yInArtboard;

      bounds.parentXInArtboard = parentXInArtboard;
      bounds.parentYInArtboard = parentYInArtboard;

      bounds.x = offsetX;
      bounds.y = offsetY;

      bounds.globalX = item.globalBounds.x;
      bounds.globalY = item.globalBounds.y;

      bounds.xInGroup = offsetX;
      bounds.yInGroup = offsetY;
      
      bounds.centerX = centerX;
      bounds.centerY = centerY;
      
      bounds.width = item.globalBounds.width;
      bounds.height = item.globalBounds.height;

      bounds.centerDeltaX = centerDeltaX;
      bounds.centerDeltaY = centerDeltaY;

      bounds.globalDeltaX = globalDeltaX;
      bounds.globalDeltaY = globalDeltaY;

      bounds.globalCenterX = globalCenterX;
      bounds.globalCenterY = globalCenterY;

      bounds.sizeAdjusted = sizeAdjusted;

      bounds.computedCenterX = getCenterPoint(item).x;
      bounds.computedCenterY = getCenterPoint(item).y;

      bounds.parentWidth = parentWidth;
      bounds.parentHeight = parentHeight;

      bounds.parentX = parentX;
      bounds.parentY = parentY;

      bounds.localBoundsWidth = item.localBounds.width;
      bounds.localBoundsHeight = item.localBounds.height;

      bounds.localBoundsX = item.localBounds.x;
      bounds.localBoundsY = item.localBounds.y;

      bounds.parentTransformX = parentTranslate[0];
      bounds.parentTransformY = parentTranslate[1];

      bounds.localCenterPointX = item.localCenterPoint.x;
      bounds.localCenterPointY = item.localCenterPoint.y;

      bounds.offsetX = offsetX;
      bounds.offsetY = offsetY;

      bounds.top = offsetY;
      bounds.left = offsetX;
      bounds.right = bounds.parentWidth - bounds.width - bounds.x;
      bounds.bottom = bounds.parentHeight - bounds.height - bounds.y;

      bounds.unrotatedTransform = unrotatedTransform;
      bounds.unrotatedBounds = unrotatedBounds;
  }

  return bounds;
}

function getCenterPoint(node) {
	return {
		x: node.boundsInParent.x + node.boundsInParent.width/2,
		y: node.boundsInParent.y + node.boundsInParent.height/2
	}
}

module.exports = { getIsArtboard, getBoundsInParent, getCenterPoint };
