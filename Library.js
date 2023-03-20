const { Artboard } = require("scenegraph");

class HTMLConstants {
  // HTML Element Constants
  static get HTML() {
    return "html";
  }
  static get BITMAP_FILL() {
    return "bitmapFill";
  }
  static get ANCHOR() {
    return "a";
  }
  static get BODY() {
    return "body";
  }
  static get BUTTON() {
    return "button";
  }
  static get CLIP_PATH() {
    return "clipPath";
  }
  static get DEFINITIONS() {
    return "defs";
  }
  static get DIVISION() {
    return "div";
  }
  static get ELLIPSE() {
    return "ellipse";
  }
  static get FORM() {
    return "form";
  }
  static get FOOTER() {
    return "footer";
  }
  static get H1() {
    return "h1";
  }
  static get H2() {
    return "h2";
  }
  static get H3() {
    return "h3";
  }
  static get HR() {
    return "hr";
  }
  static get IMAGE() {
    return "img";
  }
  static get IMAGE_FILL() {
    return "image";
  }
  static get INPUT() {
    return "input";
  }
  static get ITALIC() {
    return "i";
  }
  static get LINE() {
    return "line";
  }
  static get LINEAR_GRADIENT() {
    return "linearGradient";
  }
  static get LIST_ITEM() {
    return "li";
  }
  static get MASK() {
    return "mask";
  }
  static get OPTION() {
    return "option";
  }
  static get ORDERED_LIST() {
    return "ol";
  }
  static get PARAGRAPH() {
    return "p";
  }
  static get PATH() {
    return "path";
  }
  static get PATTERN() {
    return "pattern";
  }
  static get RADIAL_GRADIENT() {
    return "radialGradient";
  }
  static get RECTANGLE() {
    return "rect";
  }
  static get STYLE() {
    return "style";
  }
  static get SCRIPT() {
    return "script";
  }
  static get SELECT() {
    return "select";
  }
  static get SPAN() {
    return "span";
  }
  static get STOP() {
    return "stop";
  }
  static get SVG() {
    return "svg";
  }
  static get TABLE() {
    return "table";
  }
  static get TABLE_HEAD() {
    return "thead";
  }
  static get TABLE_HEADER() {
    return "th";
  }
  static get TABLE_ROW() {
    return "tr";
  }
  static get TABLE_COLUMN() {
    return "td";
  }
  static get TEXTAREA() {
    return "textarea";
  }
  static get UNORDERED_LIST() {
    return "ul";
  }

  // SVG
  static get STOP_COLOR() {
    return "stop-color";
  }
  static get STOP_OPACITY() {
    return "stop-opacity";
  }
  static get OFFSET() {
    return "offset";
  }

  /// HTML Attributes
  static get HREF() {
    return "href";
  }
  static get XLINK_HREF() {
    return "xlink:href";
  }

  /// Spectrum Components
  static get SPECTRUM_ACTION_MENU() {
    return "sp-action-menu";
  }
  static get SPECTRUM_CHECKBOX() {
    return "sp-checkbox";
  }
  static get SPECTRUM_DROPDOWN() {
    return "sp-dropdown";
  }
  static get SPECTRUM_ICON() {
    return "sp-icon";
  }
  static get SPECTRUM_MENU() {
    return "sp-menu";
  }
  static get SPECTRUM_MENU_ITEM() {
    return "sp-menu-item";
  }
  static get SPECTRUM_THEME() {
    return "sp-theme";
  }
}

class Model {
  /**
   */
  constructor(item = null) {
    this.guid = null;
    this.id = null;
    this.elementId = null;
    this.name = null;
    this.artboard = null;
    this.artboardModel = null;
    this.sanitizedID = null;
    this.type = "";
    this.displayType = "";
    this.elementTagName = null;
    this.elementSubTagName = null;
    this.componentName = "";
    this.singleTag = false; // is composite component or singleton (svg>rect) or (span)
    this.tagName = "";
    this.svgTagName = "svg";
    this.containerTagName = "div";
    this.anchorTagName = "a";
    this.classNamePost = "_Class";
    this.addedAsMask = false;
    this.selector = null;
    this.javascript = null;
    this.useClasses = false; // use classes versus ids - see document model.useClassesForElements
    this.svgUseClasses = true; // use classes on svg tags
    this.exportSVGStylesAsAttributes = false;
    this.useSelector = false;
    this.isBooleanGroup = false;
    this.isGroup = false;
    this.isLayoutGroup = false;
    this.bounds = {}; // relative bounds inside group using second method
    this.groupBounds = {}; // relative bounds inside group
    this.parentBounds = {}; // parent bounds
    this.cssStyles = {}; // store tag inline style value
    this.svgStyles = {}; // store svg tag inline style value
    this.cssProperties = {}; // store tag css values
    this.svgAttributes = {}; // store svg css values
    this.attributes = {}; // store tag attribute values
    this.containerClassesArray = []; // store container classes values
    this.containerAttributes = {}; // store container tag attribute values
    this.containerStyles = {}; // store container styles values
    this.nestLevel = 0; // how many groups it is nested in
    this.index = 0; // index in container
    this.currentIndent = 0; // indentation indicator
    this.markup = ""; // usually generated markup with body tag surrounding
    this.innerMarkup = ""; // generated markup without body tag
    this.scriptOutput = ""; // generated script without script tag
    this.mask = ""; // mask generated tag
    this.maskCloseTag = ""; // mask generated close tag
    this.imageFolder = "";
    this.definitionBefore = "";
    this.definitionAfter = "";
    this.containerBefore = "";
    this.containerAfter = "";
    this.svgBefore = "";
    this.svgAfter = "";
    this.cssBefore = "";
    this.cssAfter = "";
    this.svgCSSBefore = "";
    this.svgCSSAfter = "";
    this.hyperlinkBefore = "";
    this.hyperlinkAfter = "";
    this.cssText = "";
    this.cssOutput = "";
    this.svgCSS = "";
    this.cssArray = [];
    this.styleRules = [];
    this.classesArray = [];
    this.subClassesArray = [];
    this.svgClassesArray = [];
    this.colorStops = [];
    this.definition = null;
    this.renditions = [];
    this.fill = "";
    this.beforeContent = null;
    this.beforeContentLineNumber = null;
    this.afterContent = null;
    this.innerContent = null;
    this.textValue = null;
    this.plainTextValue = null;
    this.setContainer = false; // not used?
    this.addContainer = false;
    this.setAdditionalClassesOnContainer = false;
    this.setAdditionalAttributesOnContainer = false;
    this.addSVGContainer = false;
    this.exportRectangleAsDiv = false;
    this.addEndTag = false;
    this.addCloseTag = false;
    this.addContainerCloseTag = true;
    this.linebreakInnerContent = true;
    this.markupCloseTag = null;
    this.markupOpenTag = null;
    this.useCrispEdges = false;
    this.liftTextUp = false;
    this.cssOnly = false;
    this.originalPreferencesDataValue = null;
    this.originalPreferencesData = null;
    this.isHTML = false;
    this.imageDefinition = null;
    this.propertyChanges = [];
    this.elementPropertyChanges = [];

    // SETTABLE OPTIONS
    this.additionalAttributes = "";
    this.additionalClasses = "";
    this.additionalStyles = "";
    this.excludeDefaultStyles = false;
    this.alternateWidth = null;
    this.alternateHeight = null;
    this.alternateTagName = null;
    this.constrainTop = false;
    this.constrainLeft = false;
    this.constrainRight = false;
    this.constrainBottom = false;
    this.centerHorizontally = false;
    this.centerVertically = false;
    this.consolidateStyles = false;
    this.cursor = "unset";
    this.linebreaks = "break";
    this.debug = false;
    this.displayed = true;
    this.embedImage = false;
    this.embedColorLimit = null;
    this.enabled = true;
    this.export = true;
    this.exportAsImage = false;
    this.exportAsString = false;
    this.exportImageRectanglesAsImages = true;
    this.hoverElementGUID = null;
    this.hoverStyles = null;
    this.hyperlink = "";
    this.hyperlinkElement = "";
    this.hyperlinkTarget = "";
    this.hyperlinkedArtboardGUID = null;
    this.inheritPrototypeLink = true;
    this.imageFormat = XDConstants.PNG;
    this.imageQuality = 100;
    this.image2x = true;
    this.layout = "default";
    this.layoutVerticalAlign = Styles.DEFAULT;
    this.layoutHorizontalAlign = Styles.DEFAULT;
    this.layoutWrapping = Styles.NO_WRAP;
    this.layoutSpacing = Styles.DEFAULT;
    this.markupInside = "";
    this.markupBefore = "";
    this.markupAfter = "";
    this.overflow = item ? this.getDefaultOverflowValue(item) : Styles.DEFAULT;
    this.position = Styles.DEFAULT;
    this.positionBy = Styles.DEFAULT;
    this.scriptTemplate = null;
    this.selfAlignment = Styles.AUTO;
    this.showOutline = false;
    this.sizing = Styles.DEFAULT;
    this.subAttributes = "";
    this.subClasses = "";
    this.subStyles = "";
    this.subTagName = null;
    this.stylesheetTemplate = "";
    this.template = null;
    this.textIds = "";
    this.textTokens = "";
    this.useAsGroupBackground = false;
    this.useBase64Data = false;
    this.version = Model.VERSION;

    // PROPERTIES WE WANT TO SAVE
    this.preferenceProperties = [
      "id",
      "type",
      "additionalAttributes",
      "additionalClasses",
      "additionalStyles",
      "alternateTagName",
      "alternateWidth",
      "alternateHeight",
      "constrainLeft",
      "constrainTop",
      "constrainBottom",
      "constrainRight",
      "centerHorizontally",
      "centerVertically",
      "consolidateStyles",
      "cursor",
      "debug",
      "displayed",
      "embedImage",
      "embedColorLimit",
      "enabled",
      "excludeDefaultStyles",
      "export",
      "exportAsImage",
      "exportAsString",
      "hoverElementGUID",
      "hoverStyles",
      "hyperlink",
      "hyperlinkElement",
      "hyperlinkTarget",
      "hyperlinkedArtboardGUID",
      "image2x",
      "imageFormat",
      "imageQuality",
      "inheritPrototypeLink",
      "layout",
      "layoutVerticalAlign",
      "layoutHorizontalAlign",
      "layoutWrapping",
      "layoutSpacing",
      "linebreaks",
      "markupInside",
      "markupBefore",
      "markupAfter",
      "overflow",
      "position",
      "positionBy",
      "scriptTemplate",
      "selfAlignment",
      "showOutline",
      "sizing",
      "stylesheetTemplate",
      "subAttributes",
      "subClasses",
      "subStyles",
      "subTagName",
      "useBase64Data",
      "template",
      "textIds",
      "textTokens",
      "useAsGroupBackground",
      "version",
    ];

    this.nonUserProperties = ["type", "version"];
  }

  /**
   * Static getter setter
   **/
  static get VERSION() {
    if ("_version" in Model === false) {
      Model._version = null;
    }

    return Model._version;
  }

  static set VERSION(value) {
    Model._version = value;
  }

  /**
   * Get an array of properties that you want to store
   **/
  getPreferencesProperties(userProperties = false) {
    if (userProperties) {
      var userArray = this.preferenceProperties.slice();
      userArray = userArray.filter((x) => !this.nonUserProperties.includes(x));
      return userArray;
    }
    return this.preferenceProperties.slice();
  }

  /**
   * Get an object containing all the properties and values that you want to store
   **/
  getPreferencesData() {
    var data = {};
    var property = "";
    var properties = this.getPreferencesProperties();
    var numOfProperties = properties.length;

    for (var i = 0; i < numOfProperties; i++) {
      property = properties[i];
      data[property] = this[property];
    }

    return data;
  }

  /**
   * Get an object containing all the properties and values that have changed from the default value
   **/
  getChangedPropertiesData(userData = false, item = null) {
    var isArtboardModel = "artboardPreferenceProperties" in this;
    var defaultModel = isArtboardModel ? new ArtboardModel() : new Model();
    var property = "";
    var overflowValue = this.getDefaultOverflowValue(item);
    defaultModel.overflow = overflowValue;
    var properties = this.getPreferencesProperties(userData);
    var numOfProperties = properties.length;
    var changeList = {};

    for (var i = 0; i < numOfProperties; i++) {
      property = properties[i];

      if (defaultModel[property] != this[property]) {
        changeList[property] = this[property];
      }
    }

    return changeList;
  }

  /**
   * Returns default overflow values.
   * Area text is visible unless being clipped
   */
  getDefaultOverflowValue(item) {
    var { Text } = require("scenegraph");
    var type = "";

    var value = null;
    if (item && typeof item == "object" && item.constructor.name) {
      type = item.constructor.name;
    } else if (item && typeof item == "string") {
      type = item;
    }

    switch (type) {
      case XDConstants.TEXT:
        if (item instanceof Text && item.areaBox && item.clippedByArea) {
          value = OverflowOptions.HIDDEN;
        } else {
          value = OverflowOptions.VISIBLE;
        }
        break;
      case XDConstants.ELLIPSE:
      case XDConstants.RECTANGLE:
      case XDConstants.PATH:
      case XDConstants.POLYGON:
      case XDConstants.LINE:
      case XDConstants.GROUP:
      case XDConstants.BOOLEAN_GROUP:
      case XDConstants.SYMBOL_INSTANCE:
        value = OverflowOptions.VISIBLE;
        break;
      case XDConstants.SCROLLABLE_GROUP:
      case XDConstants.REPEAT_GRID:
      case XDConstants.ARTBOARD:
        value = OverflowOptions.HIDDEN;
        break;
      default:
        value = OverflowOptions.HIDDEN;
    }
    return value;
  }

  /**
   * Copies values from an object into this instance
   * @param {Object} object
   **/
  parse(object) {
    for (const key in object) {
      if (key in this) {
        if (key == "type") continue;
        //log("Setting:" + key + " to " + object[key]);
        this[key] = object[key];
      }
    }

    this.updateDefaultValues(object["type"]);
  }

  /**
   * Update model default values for newer versions
   */
  updateDefaultValues(item) {
    var total = getVersionSum(this.version);
    var major = getVersionSum(this.version, "major");
    var model = new Model(item);

    if (model.type == "" && typeof item == "string") {
      model.overflow = model.getDefaultOverflowValue(item);
      model.type = item;
    }

    if (this.cursor == "default" && major < 7) {
      this.cursor = "unset";
    }

    if (this.layoutVerticalAlign == "stretch" && major < 7) {
      this.layoutVerticalAlign = model.layoutVerticalAlign;
    }

    if (this.layoutHorizontalAlign == "stretch" && major < 7) {
      this.layoutHorizontalAlign = model.layoutHorizontalAlign;
    }

    if (
      (this.layoutSpacing == "stretch" || this.layoutSpacing == "flex-start") &&
      major < 7
    ) {
      this.layoutSpacing = model.layoutSpacing;
    }

    if (this.positionBy == "constraint" && major < 7) {
      this.positionBy = model.positionBy;
    }

    //this.version = model.version;
  }

  /**
   * Resets values in this object to the default values
   **/
  reset(item) {
    var data = new Model(item).getPreferencesData();
    this.parse(data);
  }
}
class OverflowOptions {
  static get HIDDEN () { return "hidden"; }
  static get AUTO () { return "auto"; }
  static get VISIBLE () { return "visible"; }
  static get ON () { return "on"; }
  static get VERTICAL_ON () { return "verticalOn"; }
  static get VERTICAL_AUTO () { return "verticalAuto"; }
  static get HORIZONTAL_ON () { return "horizontalOn"; }
  static get HORIZONTAL_AUTO () { return "horizontalAuto"; }
}
class Styles {
  
  // styles
  static get ALL () { return "all"; }
  static get ALIGN_ITEMS () { return "align-items"; }
  static get ALIGN_CONTENT () { return "align-content"; }
  static get ALIGN_SELF() { return "align-self"; }
  static get ANIMATION () { return "animation"; }
  static get BACKGROUND () { return "background"; }
  static get BACKGROUND_COLOR () { return "background-color"; }
  static get BASELINE () { return "baseline"; }
  static get BOX_SIZING() { return "box-sizing"; }
  static get BORDER() { return "border"; }
  static get BORDER_TOP() { return "border-top"; }
  static get BORDER_BOTTOM() { return "border-bottom"; }
  static get BORDER_RADIUS() { return "border-radius"; }
  static get BOTTOM() { return "bottom"; }
  static get CLIP_PATH() { return "clip-path"; }
  static get COLOR() { return "color"; }
  static get CURSOR() { return "cursor"; }
  static get DASHED() { return "dashed"; }
  static get DEFAULT() { return "default"; }
  static get DISPLAY() { return "display"; }
  static get FLEX_WRAP() { return "flex-wrap"; }
  static get FILTER() { return "filter"; }
  static get FONT_FAMILY() { return "font-family"; }
  static get FONT_STYLE () { return "font-style"; }
  static get FONT_WEIGHT () { return "font-weight"; }
  static get FONT_SIZE() { return "font-size"; }
  static get HEIGHT() { return "height"; }
  static get LETTER_SPACING() { return "letter-spacing"; }
  static get LEFT() { return "left"; }
  static get LINE_HEIGHT() { return "line-height"; }
  static get JUSTIFY_CONTENT() { return "justify-content"; }
  static get MARGIN() { return "margin"; }
  static get MARGIN_LEFT() { return "margin-left"; }
  static get MARGIN_RIGHT() { return "margin-right"; }
  static get MARGIN_TOP() { return "margin-top"; }
  static get MARGIN_BOTTOM() { return "margin-bottom"; }
  static get MAX_WIDTH() { return "max-width"; }
  static get MIDDLE() { return "middle"; }
  static get MIN_WIDTH() { return "min-width"; }
  static get MIX_BLEND_MODE() { return "mix-blend-mode"; }
  static get OPACITY() { return "opacity"; }
  static get OUTLINE() { return "outline"; }
  static get OVERFLOW() { return "overflow"; }
  static get OVERFLOW_X() { return "overflow-x"; }
  static get OVERFLOW_Y() { return "overflow-y"; }
  static get PADDING() { return "padding"; }
  static get PADDING_LEFT() { return "padding-left"; }
  static get PADDING_RIGHT() { return "padding-right"; }
  static get PADDING_TOP() { return "padding-top"; }
  static get PADDING_BOTTOM() { return "padding-bottom"; }
  static get POINTER() { return "pointer"; }
  static get POINTER_EVENTS() { return "pointer-events"; }
  static get POSITION() { return "position"; }
  static get RIGHT() { return "right"; }
  static get SHAPE_RENDERING() { return "shape-rendering"; }
  static get SOLID () { return "solid"; }
  static get STRETCH () { return "stretch"; }
  static get STRIKE_THROUGH () { return "strike"; }
  static get STROKE_WIDTH() { return "stroke-width"; }
  static get STROKE_LINE_JOIN() { return "stroke-linejoin"; }
  static get STROKE_LINE_CAP() { return "stroke-linecap"; }
  static get STROKE_DASH_ARRAY() { return "stroke-dasharray"; }
  static get STROKE_DASH_OFFSET() { return "stroke-dashoffset"; }
  static get STROKE_MITER_LIMIT() { return "stroke-miterlimit"; }
  static get STROKE_POSITION() { return "stroke-position"; }
  static get STROKE_ALIGNMENT() { return "stroke-alignment"; }
  static get STROKE_LOCATION() { return "stroke-location"; }
  static get TEXT_ALIGN() { return "text-align"; }
  static get TEXT_DECORATION() { return "text-decoration"; }
  static get TEXT_TRANSFORM() { return "text-transform"; }
  static get TOP() { return "top"; }
  static get TRANSFORM() { return "transform"; }
  static get TRANSITION() { return "transition"; }
  static get TRANSFORM_ORIGIN() { return "transform-origin"; }
  static get UNSET() { return "unset"; }
  static get WIDTH() { return "width"; }
  static get WHITE_SPACE() { return "white-space"; }
  static get VERTICAL_ALIGN () { return "vertical-align"; }
  static get VIEW_BOX() { return "viewBox"; }
  static get VISIBILITY() { return "visibility"; }

  // values
  static get ABSOLUTE () { return "absolute"; }
  static get ALL_SCROLL () { return "all-scroll"; }
  static get ALIAS () { return "alias"; }
  static get AUTO () { return "auto"; }
  static get BLOCK () { return "block"; }
  static get BORDER_BOX () { return "border-box"; }
  static get CAPITALIZE() { return "capitalize"; }
  static get CELL() { return "cell"; }
  static get CENTER() { return "center"; }
  static get COLUMN() { return "column"; }
  static get COLUMN_RESIZE() { return "column-resize"; }
  static get COLUMN_REVERSE() { return "column-reverse"; }
  static get CONTEXT_MENU() { return "context-menu"; }
  static get COPY() { return "copy"; }
  static get CRISP_EDGES() { return "crispedges"; }
  static get CROSSHAIR() { return "crosshair"; }
  static get END () { return "end"; }
  static get GEOMETRIC_PRECISION() { return "geometricPrecision"; }
  static get GRAB() { return "grab"; }
  static get GRABBING() { return "grabbing"; }
  static get FIXED () { return "fixed"; }
  static get FLEX () { return "flex"; }
  static get FLEX_DIRECTION () { return "flex-direction"; }
  static get FLEX_END () { return "flex-end"; }
  static get FLEX_START () { return "flex-start"; }
  static get FONT_STYLE_NORMAL () { return "normal"; }
  static get FONT_STYLE_ITALIC () { return "italic"; }
  static get FONT_WEIGHT_LIGHT () { return "lighter"; }
  static get FONT_WEIGHT_NORMAL () { return "normal"; }
  static get FONT_WEIGHT_BOLD () { return "bold"; }
  static get GRID () { return "grid"; }
  static get HELP () { return "help"; }
  static get HIDDEN () { return "hidden"; }
  static get HORIZONTAL() { return "horizontal"; }
  static get INHERIT () { return "inherit"; }
  static get INLINE_BLOCK () { return "inline-block"; }
  static get LINE_THROUGH () { return "line-through"; }
  static get LOWER_CASE () { return "lowercase"; }
  static get MOVE () { return "move"; }
  static get NO_DROP () { return "no-drop"; }
  static get NO_WRAP () { return "nowrap"; }
  static get NONE () { return "none"; }
  static get NORMAL () { return "normal"; }
  static get NOT_ALLOWED () { return "not-allowed"; }
  static get PIXEL () { return "px"; }
  static get PROGRESS () { return "progress"; }
  static get RELATIVE () { return "relative"; }
  static get ROW() { return "row"; }
  static get ROW_RESIZE() { return "row-resize"; }
  static get ROW_REVERSE() { return "row-reverse"; }
  static get SCROLL () { return "scroll"; }
  static get SPACE_BETWEEN () { return "space-between"; }
  static get SPACE_AROUND () { return "space-around"; }
  static get SPACE_EVENLY () { return "space-evenly"; }
  static get START () { return "start"; }
  static get SIZING_ELEMENT () { return "sizingElement"; }
  static get STICKY () { return "sticky"; }
  static get SUB_SCRIPT () { return "sub"; }
  static get SUPER_SCRIPT () { return "super"; }
  static get TEXT () { return "text"; }
  static get TEXT_DECORATION_UNDERLINE () { return "underline"; }
  static get TITLE_CASE () { return "titlecase"; }
  static get UPPER_CASE () { return "uppercase"; }
  static get VERTICAL_TEXT () { return "vertical-text"; }
  static get VISIBLE () { return "visible"; }
  static get VERTICAL() { return "vertical"; }
  static get WAIT() { return "wait"; }
  static get WRAP() { return "wrap"; }
  static get WRAP_REVERSE() { return "wrap-reverse"; }
  static get ZOOM_IN() { return "zoom-in"; }
  static get ZOOM_OUT() { return "zoom-out"; }
  
  // CUSTOM CSS VARIABLES
  // must use two dashes to store in css 
  static get PROPERTY_PREFIX () { return "--web-"; }
  static get ACTUAL_SIZE_ON_DOUBLE_CLICK () { return Styles.PROPERTY_PREFIX + "actual-size-on-double-click"; }
  static get STYLESHEET_ID () { return Styles.PROPERTY_PREFIX + "stylesheet-id"; }
  static get ARTBOARD_NAME () { return Styles.PROPERTY_PREFIX + "view-name"; }
  static get ARTBOARD_ID () { return Styles.PROPERTY_PREFIX + "view-id"; }
  static get ARTBOARD_IDS () { return Styles.PROPERTY_PREFIX + "view-ids"; }
  static get NAVIGATE_ON_KEYPRESS () { return Styles.PROPERTY_PREFIX + "navigate-on-keypress"; }
  static get CENTER_HORIZONTALLY () { return Styles.PROPERTY_PREFIX + "center-horizontally"; }
  static get CENTER_VERTICALLY () { return Styles.PROPERTY_PREFIX + "center-vertically"; }
  static get SCALE_ON_DOUBLE_CLICK () { return Styles.PROPERTY_PREFIX + "scale-on-double-click"; }
  static get SCALE_TO_FIT () { return Styles.PROPERTY_PREFIX + "scale-to-fit"; }
  static get SCALE_TO_FIT_TYPE () { return Styles.PROPERTY_PREFIX + "scale-to-fit-type"; }
  static get ENABLE_SCALE_UP () { return Styles.PROPERTY_PREFIX + "enable-scale-up"; }
  static get SCALE_ON_RESIZE () { return Styles.PROPERTY_PREFIX + "scale-on-resize"; }
  static get REFRESH_FOR_CHANGES () { return Styles.PROPERTY_PREFIX + "refresh-for-changes"; }
  static get ADD_IMAGE_COMPARE () { return Styles.PROPERTY_PREFIX + "add-image-compare"; }
  static get SHOW_NAVIGATION_CONTROLS () { return Styles.PROPERTY_PREFIX + "show-navigation-controls"; }
  static get ENABLE_DEEP_LINKING () { return Styles.PROPERTY_PREFIX + "enable-deep-linking"; }
  static get IS_OVERLAY () { return Styles.PROPERTY_PREFIX + "is-overlay"; }
  static get SHOW_SCALE_CONTROLS () { return Styles.PROPERTY_PREFIX + "show-scale-controls"; }
  static get STATE () { return Styles.PROPERTY_PREFIX + "state"; }
  static get PAGE_FONT () { return Styles.PROPERTY_PREFIX + "page-font"; }
  static get SHOW_BY_MEDIA_QUERY () { return Styles.PROPERTY_PREFIX + "show-by-media-query"; }
  static get SINGLE_PAGE_APPLICATION () { return Styles.PROPERTY_PREFIX + "application"; }
  static get COMPARE_IMAGE_NAME () { return "_snapshot"; }
  static get ACTION_TARGET () { return Styles.PROPERTY_PREFIX + "action-target"; }
  static get ACTION_TYPE () { return Styles.PROPERTY_PREFIX + "action-type"; }
  static get ANIMATION_DATA () { return Styles.PROPERTY_PREFIX + Styles.ANIMATION; }

  static get TEXT_STYLES () { return [this.FONT_FAMILY, this.FONT_SIZE, this.FONT_STYLE, this.LETTER_SPACING, this.TEXT_DECORATION, this.COLOR]; }
  static get HOVER_STYLES () { return [this.ACTION_TARGET, this.ACTION_TYPE, this.ANIMATION_DATA]; }

}
class ArtboardModel extends Model {
  /**
   */
  constructor(item = null) {
    super(item);
    // used when adding multiple artboards to a page to add the index of the artboard to the name
    this.index = 0;
    this.guid = null;
    this.additionalStyles = "";
    this.alternativeFont = null;
    this.userStyles = "";
    this.markup = "";
    this.innerMarkup = "";
    this.css = "";
    this.cssOutput = "";
    this.markupOutput = "";
    this.pageOutput = "";
    this.svg = "";
    this.scriptArray = [];
    this.markupArray = [];
    this.cssArray = [];
    this.svgArray = [];
    this.definitionsArray = [];
    this.warnings = [];
    this.messages = [];
    this.errors = [];
    this.files = [];
    this.renditions = [];
    this.exportMessage = "";
    this.exportedRenditions = [];
    this.exportScaledRenditions = true;
    this.exportBooleanGroupsAsPaths = true;
    this.scriptOutput = null;
    this.scripts = null;
    this.documents = [];
    this.ids = {};
    this.idsArray = [];
    this.duplicateIds = {};
    this.defaultRenditionScales = [1, 2];
    this.maxDecimalPlaces = 3;
    this.hasDuplicateIds = false;
    this.artboard = null;
    this.currentNestLevel = 0;
    this.nameCounter = 0;
    this.nestLevel = 0;
    this.startingIndent = 0;
    this.ignoreStartingNestDepthIndent = false;
    this.ignoreStartingNestDepth = 0;
    this.getItemOutput = false;
    this.startingStylesIndent = 1;
    this.additionalTextWidth = 1;
    this.scaleFactor = 1;
    this.scaleToFit = false;
    this.scaleToFitType = null;
    this.enableScaleUp = false;
    this.scaleOnResize = true;
    this.scaleOnDoubleClick = false;
    this.actualSizeOnDoubleClick = false;
    this.navigateOnKeypress = false;
    this.transformOrigin = "0 0";
    this.addSpaceBetweenStyleAndValue = true;
    this.useStyleLineBreaks = true;
    this.overflow = null;
    this.lastMaskID = null;
    this.convertMasksToImages = true;
    this.supportLightFonts = true; // if font typeface is thin or light
    this.items = {};
    this.models = {};
    this.model = new Model();
    this.globalModel = new Model();
    this.launchInBrowser = true;
    this.setSVGDefinitionsInline = false;
    this.hoistSVGDefinitions = false;
    this.generator = "Web Export";
    this.generatorTag =
      "<!-- Generator: [name] [version], [language] Exporter, http://www.velara3.com -->";
    this.outlineStyle = "1px dashed red";
    this.borderStyle = "1px solid #A1A1A1";
    this.bodyBackgroundStyle = "#E5E5E5";
    this.setBodyBackgroundStyle = false; // only true when adding root container
    this.setBorderOnDocument = false;
    this.setSizeOnDocument = false;
    this.setBorderByOutline = false; // sometimes content overflows border - outline fixes this
    this.centerUsingTransform = true;
    this.itemToExport = null;
    this.extension = "html";
    this.cssExtension = "css";
    this.jsExtension = "js";
    this.exportArtboardList = [];
    this.totalImageSize = 0;
    this.totalImage2xSize = 0;
    this.totalExportSize = 0;
    this.totalPageSize = 0;
    this.totalPagesSize = 0;
    this.imageExportFormat = XDConstants.JPG;
    this.upDirectorySymbol = "..";
    this.upDirectorySymbolSlash = "../";

    this.preferencesData = {};

    // SETTABLE OPTIONS
    this.addDataNames = false;
    this.addImageComparison = false;
    this.addRootContainer = true;
    this.alternateWidth = null;
    this.alternateHeight = null;
    this.customDomain = false;
    this.enableDeepLinking = true;
    this.exportFolder = null;
    this.exportList = null;
    /** @type {String} */
    this.exportArtboardsRange = null;
    this.exportToSinglePage = false;
    this.expectedOutput = null;
    this.expectedCSSOutput = null;
    this.expectedScriptOutput = null;
    this.externalScript = false;
    this.externalStylesheet = false;
    this.exportType = null;
    this.filename = null;
    this.imageComparisonDuration = 5;
    this.imagesExportFolder = null;
    this.embedImages = false;
    this.imagesPrefix = null;
    this.inheritCommonStyles = false;
    this.isGlobalArtboard = false;
    this.markupOnly = false;
    this.postLinkID = null;
    this.uploadOnExport = false;
    this.refreshPage = false;
    this.scriptFilename = null;
    this.scriptSubFolder = null;
    this.server = null;
    this.setStylesInline = false;
    this.showArtboardsByControls = false;
    this.singlePageApplication = false;
    this.showArtboardsByMediaQuery = false;
    this.showOutline = false;
    this.showScaleSlider = false;
    this.stylesheetFilename = null;
    this.stylesheetSubFolder = null;
    this.subFolder = null;
    this.templateFile = null;
    this.title = null;
    this.type = "Artboard";
    this.useClassesToStyleElements = false;

    // ARTBOARD PROPERTIES WE WANT TO SAVE
    this.artboardPreferenceProperties = [
      "name",
      "type",
      "actualSizeOnDoubleClick",
      "additionalStyles",
      "addRootContainer",
      "alternateHeight",
      "alternateWidth",
      "alternativeFont",
      "addImageComparison",
      "addDataNames",
      "centerHorizontally",
      "centerVertically",
      "customDomain",
      "debug",
      "embedImages",
      "enableScaleUp",
      "enableDeepLinking",
      "expectedOutput",
      "expectedCSSOutput",
      "expectedScriptOutput",
      "exportArtboardsRange",
      "exportFolder",
      "exportList",
      "exportToSinglePage",
      "exportType",
      "externalScript",
      "externalStylesheet",
      "extension",
      "filename",
      "imagesExportFolder",
      "imagesPrefix",
      "inheritCommonStyles",
      "isGlobalArtboard",
      "markupOnly",
      "navigateOnKeypress",
      "overflow",
      "postLinkID",
      "refreshPage",
      "scaleFactor",
      "scaleToFit",
      "scaleToFitType",
      "scaleOnDoubleClick",
      "scaleOnResize",
      "scriptSubFolder",
      "scriptFilename",
      "server",
      "setStylesInline",
      "singlePageApplication",
      "showArtboardsByMediaQuery",
      "showArtboardsByControls",
      "showScaleSlider",
      "showOutline",
      "stylesheetFilename",
      "stylesheetSubFolder",
      "subFolder",
      "templateFile",
      "title",
      "uploadOnExport",
      "useClassesToStyleElements",
    ];
  }

  /**
   * Return the names of the properties that we want to save
   */
  getPreferencesProperties() {
    return this.artboardPreferenceProperties.concat(
      this.preferenceProperties.slice()
    );
  }

  /**
   * An object containing name value pair of the preferences
   **/
  getPreferencesData() {
    var properties = this.getPreferencesProperties();
    var numOfProperties = properties.length;
    var data = {};
    var property = "";

    for (var i = 0; i < numOfProperties; i++) {
      property = properties[i];
      data[property] = this[property];
    }

    return data;
  }

  /**
   * Resets values in this object to the default values
   **/
  reset(item) {
    var data = new ArtboardModel(item).getPreferencesData();
    this.parse(data);
  }

  toString() {
    return this.type + " - " + this.name;
  }

  getFilename() {
    if (this.filename != null) {
      if (this.filename.indexOf(".") != -1) {
        return this.filename;
      } else {
        return this.filename + "." + this.extension;
      }
    } else {
      let value = this.name;
      value = value.replace(/\s/gs, "_");
      value = value.replace(/\W/gs, "_");
      return value + "." + this.extension;
    }
  }

  getSubdirectoryPath() {
    if (this.subFolder != null && this.subFolder != "") {
      return this.subFolder;
    } else {
      return "";
    }
  }

  hasSubdirectory() {
    if (this.subFolder != null && this.subFolder != "") {
      return true;
    } else {
      return false;
    }
  }

  getDiffContent(diffHTML) {
    return (
      `<html><head><meta charset="utf-8"/>
    <style>
    * {font-size:10px;font-family: monospace; white-space:pre-wrap; -moz-tab-size:3; -o-tab-size:3; tab-size:3; letter-spacing: .1rem; line-height:1.2rem}
    ins {background:#e6ffe6;text-decoration:none;}
    del {background:#ffe6e6;}
    .style {font-style:italic;outline:.5px dotted rgba(0,0,0,.35);text-decoration:underline;}
    .style:before {content:'\\25BA';display:block;position:absolute;margin-top:-1.2rem; margin-left:-1rem;}
    .style:after {content:'\\25C4';display:block;position:absolute;margin-top:-1.2rem;margin-left:-1rem;right:1rem;}
    .title {background: rgba(0,0,0,.1); display: block; padding: 1rem; margin-bottom: 2em; margin-top: 2em}
    .header {position: fixed; top:0;right:0; margin-right: 2em; margin-top: 2em}
    body {margin:2rem;margin-top:2rem;outline:1px solid rgba(0,0,0,.1)}
    </style>
    <script>
    var current = -1;
    var nodes = null;
    var lastElement = null;

    function scrollIntoView(element, index) {
      element.scrollIntoView({behavior:'smooth', block:'center'});
      if (lastElement) {
        lastElement.classList.remove("style");
      }
      lastElement = element;
      if (index!=0) {
        lastElement.classList.add("style");
      }
    }
    
    window.addEventListener("keyup", function (e) {
      if (nodes==null) {
        var editor = document.getElementById("editor");
        nodes = [];
        editor.childNodes.forEach((item,i) => {
          var name = item.nodeName.toLowerCase();
          if (name=="ins" || name=="del" || i==0) {
            nodes.push(item);
          }
        })
      }

      var insCount = nodes.length;

      if (e.keyCode==13 && insCount) {
        if (e.shiftKey) {
          if (current-1<0) {
            current = insCount-1;
          }
          else {
            current = current-1;
          }
        }
        else {
          current = current+1>=insCount ? 0 : current+1;
        }
        element = nodes[current];
        scrollIntoView(element, current);
      }
    });
    </script>
    <body><div id="editor">` +
      diffHTML +
      `</div></body>
    <div class="header">CHANGES - Press enter to step through changes</div>
    </html>`
    );
  }

  getEditorContent(diffHTML) {
    var editor =
      `<html><head><style>#editor{position:absolute;top:0;left:0;right:0;bottom:0}</style>
      <body>
      <div id="editor">` +
      diffHTML +
      `</div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.3/ace.js" type="text/javascript" charset="utf-8"></script>
      <script>
      var editor = ace.edit("editor");
      editor.setTheme("ace/theme/monokai");
      editor.session.setMode("ace/mode/html");
      </script>
      </body></html>`;
    return editor;
  }

  getDiffFilename() {
    var diff = "_diff";
    if (this.filename != null) {
      if (this.filename.indexOf(".") != -1) {
        return (
          this.filename.split(".").slice(0, -1).join(".") +
          diff +
          "." +
          this.extension
        );
      } else {
        return this.filename + diff + "." + this.extension;
      }
    } else {
      let value = this.name + diff;

      if (value.indexOf(".") != -1) {
        value = value.replace(/\.[^/.]+$/, "");
      }

      value = value.replace(/\s/gs, "_");
      value = value.replace(/\W/gs, "_");
      return value + "." + this.extension;
    }
  }

  getStylesheetFilename() {
    if (this.stylesheetFilename != null) {
      if (this.stylesheetFilename.indexOf(".") != -1) {
        return this.stylesheetFilename;
      } else {
        return this.stylesheetFilename + "." + this.cssExtension;
      }
    } else {
      let value = this.filename != null ? this.filename : this.name;

      if (value.indexOf(".") != -1) {
        value = value.replace(/\.[^/.]+$/, "");
      }

      value = value.replace(/\s/gs, "_");
      value = value.replace(/\W/gs, "_");

      return value + "." + this.cssExtension;
    }
  }

  getStylesheetFullPath() {
    var value = this.getStylesheetFilename();
    var prefix = this.hasSubdirectory() ? this.upDirectorySymbolSlash : "";

    if (this.stylesheetSubFolder != "" && this.stylesheetSubFolder != null) {
      return prefix + this.stylesheetSubFolder + "/" + value;
    }
    return value;
  }

  getJavaScriptFilename() {
    if (this.scriptFilename != null) {
      if (this.scriptFilename.indexOf(".") != -1) {
        return this.scriptFilename;
      } else {
        return this.scriptFilename + "." + this.jsExtension;
      }
    } else {
      let value = this.filename != null ? this.filename : this.name;

      if (value.indexOf(".") != -1) {
        value = value.replace(/\.[^/.]+$/, "");
      }

      value = value.replace(/\s/gs, "_");
      value = value.replace(/\W/gs, "_");
      return value + "." + this.jsExtension;
    }
  }

  getJavaScriptFullPath() {
    var value = this.getJavaScriptFilename();
    var prefix = this.hasSubdirectory() ? this.upDirectorySymbolSlash : "";

    if (this.scriptSubFolder != "" && this.scriptSubFolder != null) {
      return prefix + this.scriptSubFolder + "/" + value;
    }
    return value;
  }

  getPageTitle() {
    if (this.title != "" && this.title != null) {
      return this.title;
    }

    return this.name;
  }
}

class XDConstants {
  // XD Fill Constants
  static get COLOR_FILL() {
    return "Color";
  }
  static get IMAGE_FILL() {
    return "ImageFill";
  }
  static get LINEAR_GRADIENT_FILL() {
    return "LinearGradientFill";
  }
  static get RADIAL_GRADIENT_FILL() {
    return "RadialGradientFill";
  }

  static get MAC_PLATFORM() {
    return "darwin";
  }

  static get SELECTED_ARTBOARD() {
    return "selectedArtboard";
  }
  static get SELECTED_ARTBOARDS() {
    return "selectedArtboards";
  }
  static get ALL_ARTBOARDS() {
    return "allArtboards";
  }

  static get MULTIPAGE() {
    return "multipage";
  }
  static get SINGLE_PAGE() {
    return "singlepage";
  }
  static get SINGLE_PAGE_MEDIA_QUERY() {
    return "singlePageMediaQuery";
  }
  static get SINGLE_PAGE_NAVIGATION() {
    return "singlePageNavigation";
  }
  static get SINGLE_PAGE_APPLICATION() {
    return "singlePageApplication";
  }

  static get MEDIA_QUERY() {
    return "mediaQuery";
  }
  static get NAVIGATION_CONTROLS() {
    return "navigationControls";
  }

  static get LINE_BREAK() {
    return "\n";
  }
  static get LINE_BREAK_FULL() {
    return "\n\r";
  }
  static get SPACE() {
    return " ";
  }
  static get TAB() {
    return "\t";
  }
  static get AT_SYMBOL() {
    return "@";
  }
  static get PERIOD() {
    return ".";
  }
  static get HASH() {
    return "#";
  }
  static get COMMA() {
    return ",";
  }

  static get PNG() {
    return "png";
  }
  static get JPG() {
    return "jpg";
  }

  static get AREA_TEXT() {
    return "AreaText";
  }
  static get ARTBOARD() {
    return "Artboard";
  }
  static get BOOLEAN_GROUP() {
    return "BooleanGroup";
  }
  static get COMPONENT() {
    return "Component";
  }
  static get ELLIPSE() {
    return "Ellipse";
  }
  static get FIT_TEXT() {
    return "AreaText";
  }
  static get IMAGE() {
    return "Image";
  }
  static get HTML() {
    return "HTML";
  }
  static get HTML_TEMPLATE() {
    return "HTMLTemplate";
  }
  static get GRAPHICS_NODE() {
    return "GraphicsNode";
  }
  static get GROUP() {
    return "Group";
  }
  static get LINE() {
    return "Line";
  }
  static get LINKED_GRAPHIC() {
    return "LinkedGraphic";
  }
  static get PATH() {
    return "Path";
  }
  static get POINT_TEXT() {
    return "PointText";
  }
  static get POLYGON() {
    return "Polygon";
  }
  static get RECTANGLE() {
    return "Rectangle";
  }
  static get REPEAT_GRID() {
    return "RepeatGrid";
  }
  static get ROOT_NODE() {
    return "RootNode";
  }
  static get SCROLLABLE_GROUP() {
    return "ScrollableGroup";
  }
  static get SCENE_NODE() {
    return "SceneNode";
  }
  static get SYMBOL_INSTANCE() {
    return "SymbolInstance";
  }
  static get TEXT() {
    return "Text";
  }

  // text types
  static get AREA() {
    return "area";
  }
  static get AUTO_HEIGHT() {
    return "autoHeight";
  }
  static get POINT() {
    return "point";
  }

  // methods to position
  static get CONSTRAINT() {
    return "constraint";
  }
  static get HORIZONTAL_MARGIN() {
    return "horizontalMargin";
  }
  static get VERTICAL_MARGIN() {
    return "verticalMargin";
  }
  static get HORIZONTAL_PADDING() {
    return "horizontalPadding";
  }
  static get VERTICAL_PADDING() {
    return "verticalPadding";
  }
  static get HORIZONTAL_CONSTRAINT() {
    return "horizontalConstraint";
  }
  static get VERTICAL_CONSTRAINT() {
    return "verticalConstraint";
  }

  // self align items in flexbox group
  static get PUSH_LEFT() {
    return "pushLeft";
  }
  static get PUSH_RIGHT() {
    return "pushRight";
  }
  static get PUSH_TOP() {
    return "pushTop";
  }
  static get PUSH_BOTTOM() {
    return "pushBottom";
  }
  static get PUSH_LEFT_RIGHT() {
    return "pushLeftRight";
  }
  static get PUSH_TOP_BOTTOM() {
    return "pushTopBottom";
  }
  static get PUSH_ALL() {
    return "pushAll";
  }

  static get VIEW() {
    return "view";
  }
  static get PAGE() {
    return "page";
  }

  static get BOTH() {
    return "both";
  }
  static get DEFAULT() {
    return "default";
  }
  static get STACK() {
    return "stack";
  }
  static get LAYOUT_STACK() {
    return "layoutStack";
  }
  static get STACK_HORIZONTAL() {
    return "stackHorizontal";
  }
  static get STACK_VERTICAL() {
    return "stackVertical";
  }
  static get UNSET() {
    return "unset";
  }
  static get NONE() {
    return "none";
  }
  static get CURSOR_UNSET() {
    return "cursor (unset)";
  }

  // UI names
  static get LEFT_NAME() {
    return "Left";
  }
  static get RIGHT_NAME() {
    return "Right";
  }
  static get TOP_NAME() {
    return "Top";
  }
  static get BOTTOM_NAME() {
    return "Bottom";
  }
  static get VERTICAL_NAME() {
    return "Vertical";
  }
  static get HORIZONTAL_NAME() {
    return "Horizontal";
  }

  static get PADDING_LEFT_NAME() {
    return "Padding Left";
  }
  static get PADDING_RIGHT_NAME() {
    return "Padding Right";
  }
  static get PADDING_TOP_NAME() {
    return "Padding Top";
  }
  static get PADDING_BOTTOM_NAME() {
    return "Padding Bottom";
  }

  static get MARGIN_LEFT_NAME() {
    return "Margin Left";
  }
  static get MARGIN_RIGHT_NAME() {
    return "Margin Right";
  }
  static get MARGIN_TOP_NAME() {
    return "Margin Top";
  }
  static get MARGIN_BOTTOM_NAME() {
    return "Margin Bottom";
  }
}

class GlobalModel {
  constructor() {
    this.id = "*";
    this.model = new Model();
    this.selection = null;
    this.documentRoot = null;
    this.focusedArtboard = null;
    this.selectedArtboard = null;
    this.originalArtboard = null;
    this.currentArtboard = null;
    this.firstArtboard = null;
    this.homeArtboard = null;
    this.selectedArtboardModel = null;
    this.currentArtboardModel = null;
    this.originalArtboardModel = null;
    this.artboardModel = null;
    this.lastArtboardModel = null;
    this.lastModel = null;
    this.selectedArtboards = [];
    this.userSelectedArtboards = [];
    this.nonSelectedArtboards = [];
    this.allArtboards = [];

    this.showBasicScreen = true;
    this.createExportingFile = true; // used with auto refresh
    this.showingElementDialog = false;
    this.showingPanel = false;
    this.showLabelsInPanel = false;
    this.imageExportFormat = XDConstants.PNG; // XDConstants.JPG;
    this.imageExportQuality = 100;
    this.embedImageColorLimit = 3;
    this.exportFromElementPanel = false;
    this.panelVisible = false;
    this.showWarnings = true;
    this.useTemplate = false;
    this.lastFileLocation = null;
    this.selectedElement = null;
    this.lastSelectedElement = null;
    this.lastFormElement = null;
    this.skipThisUpdate = false;
    this.preventDialogInEditContext = false;
    this.selectedModelData = null;
    this.originalModelPreferences = null;
    this.selectedModels = [];
    this.selectedModelChanges = false;
    this.selectedModel = null;
    this.minDebugScale = 5;
    this.maxDebugScale = 400;
    this.hideArtboardsUsingDisplay = true;
    this.showCSSCodeView = false;
    this.showHTMLCodeView = false;
    this.showJSCodeView = false;
    this.useRotation2 = true;
    this.showImageSizeOnChange = true;
    this.temporaryImageFilename = "imageSize";
    this.liveExport = false;
    this.exportOnUpdate = false;
    this.liveExportLabel = "(live)";
    this.exporting = false;
    this.exportType = null;
    this.exportList = null;
    this.exportButtonLabel = "Export";
    this.exportButtonLiveLabel = "Export Live";
    this.exportArtboardLabel = "Export Artboard";
    this.exportSelectedArtboardsToPageLabel =
      "Export selected artboards to a single page";
    this.exportSelectedArtboardsToPagesLabel =
      "Export selected artboards to multiple pages";
    this.exportAllArtboardsToPageLabel =
      "Export all artboards to a single page";
    this.exportAllArtboardsToPagesLabel =
      "Export all artboards to multiple pages";
    this.stylesheetId = "applicationStylesheet";
    this.scriptId = "applicationScript";
    this.typesDictionary = {};
    this.macros = null;
    this.itemCount = 0;
    this.scriptOutput = "";
    this.cssOutput = "";
    this.markupOutput = "";
    this.innerMarkup = "";
    this.pageOutput = "";
    this.artboards = null;
    this.artboardModels = {}; // new WeakMap(); is not iterable
    this.ids = {};
    this.artboardGUIDs = {};
    this.artboardIds = [];
    this.artboardIdsObject = {};
    this.artboardWidths = [];
    this.artboardWidthsCounts = 0;
    this.nonArtboards = [];
    this.cssArray = [];
    this.markupArray = [];
    this.exportedItems = [];
    this.warnings = [];
    this.messages = [];
    this.errors = [];
    this.files = [];
    this.exportedRenditions = [];
    this.renditions = [];
    this.exportMessage = "";
    this.isOnRootNode = false;
    this.exportAllArtboards = false;
    this.exportMultipleArtboards = false;
    this.exportArtboardsRange = null;
    this.exportArtboardsList = [];
    this.exportToSinglePage = false;
    this.showArtboardsByMediaQuery = false;
    this.showArtboardsByControls = false;
    this.exportAsSinglePageApplication = false;
    this.imagesExportFolder = null;
    this.image2x = null;
    this.embedImages = false;
    this.tagNames = [];
    this.cssTextfield = null;
    this.htmlTextfield = null;
    this.jsTextfield = null;
    this.navigationControls = null;
    this.pageControlsScript = null;
    this.zoomSliderControls = null;
    this.applicationDescriptor = null;
    this.requestingFolder = false;
    this.version = 0; /* saved user settings version */
    this.previousVersion = 0;
    this.pluginVersion = 0;
    this.applicationVersion = 0;
    this.pluginFolderModifiedDate = 0;
    this.exportedThisSession = false;
    this.exportDuration = 0;
    this.startTime = 0;
    this.quickExportNotificationDuration = 4000;
    this.exportProgressCompleteDuration = 500;
    this.quickExportIconDuration = 500;
    this.runPauseDuration = 250;
    this.numberOfDesignViewItems = 0;
    this.numberOfArtboards = 0;
    this.numberOfSelectedArtboards = 0;
    this.isPasteboardItem = false;
    this.hasSelection = false;
    this.isDesignMode = false;
    this.preferencesExtension = ".txt";
    this.settingsFilename = "user_settings.txt";
    this.hostField1 = null;
    this.hostField2 = null;
    this.hostField3 = null;
    this.hostField4 = null;
    this.token = null;
    this.site = null;
    this.userSite = null;
    this.previousSiblingLabel = "";
    this.nextSiblingLabel = "";
    this.descendantLabel = "";
    this.previousSiblingIcon = "";
    this.nextSiblingIcon = "";
    this.descendantIcon = "";

    // PROPERTIES WE WANT TO SAVE
    this.preferenceProperties = [
      "version",
      "applicationVersion",
      "showBasicScreen",
      "hostField1",
      "hostField2",
      "hostField3",
      "hostField4",
    ];

    this.template = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><!--page_title--></title>
<!--styles_content-->
<!--scripts-->
</head>
<body>
<!--application_content-->
</body>
</html>`;
  }

  static get documentationURL() {
    return "https://velara-3.gitbook.io/web-export/";
  }
  static get forumURL() {
    return "https://discuss.velara3.com";
  }
  //static get redirectHost() { return "https://www.velara3.com/launcher.html?l="; }
  static get redirectHost() {
    return "https://velara3.github.io/WebExport/index.html?l=";
  }
  static get host() {
    return "https://www.velara3.com/a";
  }
  static get rest() {
    return "/wp-json";
  }
  static get route() {
    return "/wp-json";
  }
  static get endPoint() {
    return "/wp/v2/posts/";
  }
  static get linkEndPoint() {
    return "/wp/v2/posts";
  }
  static get postPath() {
    return "/?p=";
  }
  static get jwt() {
    return "/jwt-auth/v1/token";
  }
  static get maxIDLength() {
    return 30;
  }
  static get characterSpacingFactor() {
    return 100;
  }
  static get supportOpenFolders() {
    return false;
  }

  static get lastFileLocation() {
    if (GlobalModel.hasOwnProperty("_lastFileLocation") === false) {
      GlobalModel._lastFileLocation = null;
    }

    return GlobalModel._lastFileLocation;
  }

  static set lastFileLocation(value) {
    GlobalModel._lastFileLocation = value;
  }

  /**
   * The URL in the form file://directory/page.html
   **/
  static get lastURLLocation() {
    if (GlobalModel.hasOwnProperty("_lastURLLocation") === false) {
      GlobalModel._lastURLLocation = null;
    }

    return GlobalModel._lastURLLocation;
  }

  static set lastURLLocation(value) {
    GlobalModel._lastURLLocation = value;
  }

  /**
   * The URL in the form http://site.com/launcher.html?l=file://directory/page.html
   **/
  static get lastRURLLocation() {
    if (GlobalModel.hasOwnProperty("_lastRURLLocation") === false) {
      GlobalModel._lastRURLLocation = null;
    }

    return GlobalModel._lastRURLLocation;
  }

  static set lastRURLLocation(value) {
    GlobalModel._lastRURLLocation = value;
  }

  /**
   * The URL encoded in the form http://site.com/launcher.html?l=file://directory/page.html
   **/
  static get lastRURLLocationEnc() {
    if (GlobalModel.hasOwnProperty("_lastRURLLocationEnc") === false) {
      GlobalModel._lastRURLLocationEnc = null;
    }

    return GlobalModel._lastRURLLocationEnc;
  }

  static set lastRURLLocationEnc(value) {
    GlobalModel._lastRURLLocationEnc = value;
  }

  /**
   * The URL to the diff in the form file://directory/page_diff.html
   **/
  static get lastDiffLocation() {
    if (GlobalModel.hasOwnProperty("_lastDiffLocation") === false) {
      GlobalModel._lastDiffLocation = null;
    }

    return GlobalModel._lastDiffLocation;
  }

  static set lastDiffLocation(value) {
    GlobalModel._lastDiffLocation = value;
  }

  /**
   * Indicates there is expected output to compare output to
   **/
  static get hasVerifyCheck() {
    if (GlobalModel.hasOwnProperty("_hasVerifyCheck") === false) {
      GlobalModel._hasVerifyCheck = false;
    }

    return GlobalModel._hasVerifyCheck;
  }

  /**
   * Indicates if the export has verification output
   * @param {Boolean} value
   */
  static set hasVerifyCheck(value) {
    GlobalModel._hasVerifyCheck = value;
  }

  /**
   * Indicates if host is defined
   **/
  static get hasHost() {
    if (GlobalModel.hasOwnProperty("_hasHost") === false) {
      GlobalModel._hasHost = false;
    }

    return GlobalModel._hasHost;
  }

  /**
   * Indicates if host is defined
   * @param {Boolean} value
   */
  static set hasHost(value) {
    GlobalModel._hasHost = value;
  }

  /**
   * The name of the last exported file name and extension, page.html
   **/
  static get lastFilename() {
    if (GlobalModel.hasOwnProperty("_lastFilename") === false) {
      GlobalModel._lastFilename = null;
    }

    return GlobalModel._lastFilename;
  }

  static set lastFilename(value) {
    GlobalModel._lastFilename = value;
  }

  /**
   * The name of the last location on localhost, http://localhost/page.html
   **/
  static get lastHostPath() {
    if (GlobalModel.hasOwnProperty("_lastHostPath") === false) {
      GlobalModel._lastHostPath = null;
    }

    return GlobalModel._lastHostPath;
  }

  static set lastHostPath(value) {
    GlobalModel._lastHostPath = value;
  }

  /**
   * The name of the last folder, file://directory/
   **/
  static get lastFolderPath() {
    if (GlobalModel.hasOwnProperty("_lastFolderPath") === false) {
      GlobalModel._lastFolderPath = null;
    }

    return GlobalModel._lastFolderPath;
  }

  static set lastFolderPath(value) {
    GlobalModel._lastFolderPath = value;
  }

  static get supportsPluginData() {
    return parseInt(require("application").version) >= 14;
  }

  /**
   * Get if the operating system is Mac, "darwin"
   **/
  static get isMac() {
    if (GlobalModel.hasOwnProperty("_isMac") === false) {
      GlobalModel._isMac = require("os").platform() == "darwin";
    }

    return GlobalModel._isMac;
  }

  /**
   * Get an array of properties that you want to store
   **/
  getPreferencesProperties() {
    return this.preferenceProperties.slice();
  }

  /**
   * An object containing name value pair to save to as preferences for the user
   **/
  getPreferencesData() {
    var properties = this.getPreferencesProperties();
    var numberOfProperties = properties.length;
    var data = new UserGlobalPreferences();
    var property;

    for (var i = 0; i < numberOfProperties; i++) {
      property = properties[i];
      data[property] = this[property];
    }

    return data;
  }

  /**
   * An object containing export paths for debugging
   **/
  getLocationObject() {
    var properties = [
      "lastFolderPath",
      "lastHostPath",
      "lastFilename",
      "lastDiffLocation",
      "lastRURLLocationEnc",
      "lastRURLLocation",
      "lastURLLocation",
      "lastFileLocation",
      "hasHost",
    ];
    var numberOfProperties = properties.length;
    var data = new Object();
    var property;

    for (var i = 0; i < numberOfProperties; i++) {
      property = properties[i];
      data[property] = this[property];
    }

    return data;
  }

  /**
   * Copies values from an object into this instance
   * @param {Object} object
   **/
  setPreferencesData(object) {
    var properties = this.getPreferencesProperties();

    for (const key in object) {
      if (key in this && properties.includes(key)) {
        this[key] = object[key];
      }
    }
  }
}

module.exports = {
  GlobalModel,
  HTMLConstants,
  Model,
  ArtboardModel,
  XDConstants,
  OverflowOptions,
  Styles
};
