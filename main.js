const {
  selection,
  Artboard,
  Ellipse,
  Group,
  Line,
  Path,
  Polygon,
  Rectangle,
  Text,
} = require("scenegraph");

const { getIsArtboard } = require("./Utils.js");

const {
  GlobalModel,
  Model,
  HTMLConstants,
  XDConstants,
  ArtboardModel,
} = require("./Library.js");

const fileSystem = require("uxp").storage.localFileSystem;
let panel;
let extractLocation;

var globalModel = new GlobalModel();
var globalArtboardModel = new ArtboardModel();

async function browseForExportFolder() {
  try {
    return await fileSystem.getFolder();
  } catch (error) {
    return error;
  }
}

/**
 *
 * function to get the path of
 */
async function sceneNodeListAsHTML(selection, documentRoot) {
  if (selection.items.length > 0 && selection.items[0] instanceof Artboard) {
    // extractLocation = await browseForExportFolder();
    // globalModel.selectedArtboardModel = selection.items[0];
    // globalModel.selectedArtboard = selection.items[0];
    // globalModel.currentArtboard = selection.items[0];
    // await exportSelectedArtboard(selection.items[0]);
    var doc;
    createHtmlDoc(selection.items[0], doc);
  } else {
    console.log("Artboard");
  }
}

function createHtmlDoc(item) {
	var type = item.constructor.name;
  var items = item.children;

	if (item.isContainer && items && items.length) {

		for (let index = 0; index < items.length; index++) {
			const element = items.at(index);
			createHtmlDoc(element);
		}
	}
  console.log(item)
}

// async function initializeGlobalModel(
//   selection,
//   rootNode,
//   showingElementDialog = false,
//   alternativeArtboard = null,
//   showingPanel = false
// ) {
//   var rootDesignViewItems = rootNode.children;
//   var numberOfDesignViewItems = rootDesignViewItems
//     ? rootDesignViewItems.length
//     : 0;
//   var numberOfSelectedArtboards = 0;
//   var preferenceData = null;
//   var focusedArtboard = null;
//   var selectedArtboard = null;
//   var noArtboardsFound = false;
//   var exportList = null;
//   var allArtboards = selection.items[0];
//   var selectedArtboards = selection.items[0];
//   var numberOfArtboards = allArtboards.length;
//   var numberOfSelectedArtboards = selectedArtboards.length;
//   var artboards = allArtboards;

//   //log(getStackTrace())

//   globalModel.allArtboards = artboards;
//   globalModel.numberOfSelectedArtboards = numberOfSelectedArtboards;
//   globalModel.numberOfArtboards = numberOfArtboards;
//   globalModel.numberOfDesignViewItems = numberOfDesignViewItems;

//   globalModel.hasSelection = true;

//   if (numberOfArtboards == 0) {
//     noArtboardsFound = true;
//     //return false;
//   }

//   // verify this works with export item
//   selectedArtboard = selection.items[0];

//   //if (exportAllArtboards==false) {
//   //globalModel.exportToSinglePage = false;
//   //}

//   globalModel.showingElementDialog = showingElementDialog;
//   globalModel.showingPanel = showingPanel;
//   globalModel.selection = selection;
//   globalModel.focusedArtboard = focusedArtboard;

//   globalModel.documentRoot = rootNode;
//   globalModel.cssOutput = "";
//   globalModel.markupOutput = "";
//   globalModel.pageOutput = "";
//   globalModel.artboardIds = [];
//   globalModel.artboards = rootDesignViewItems; // todo refactor
//   globalModel.artboardWidths = [];
//   globalModel.artboardWidthsCounts = 0;
//   globalModel.originalArtboard = selectedArtboard;
//   globalModel.selectedArtboard = selectedArtboard;
//   globalModel.selectedElement = null;
//   globalModel.selectedModelData = null;
//   globalModel.originalModelPreferences = null;
//   globalModel.selectedModel = null;
//   globalModel.selectedModels = [];
//   globalModel.typesDictionary = {};
//   globalModel.ids = {};
//   globalModel.itemCount = 0;
//   globalModel.artboardGUIDs = {};
//   globalModel.selectedArtboardModel = selectedArtboard
//     ? createModel(selection.items[0], 0, 0, true, true)
//     : null;
//   globalModel.originalArtboardModel = globalModel.selectedArtboardModel;
//   globalModel.homeArtboard = interactions.homeArtboard;
//   globalModel.firstArtboard = numberOfArtboards > 0 ? artboards[0] : null;

//   // need to remove this global variable for good
//   globalArtboardModel = globalModel.selectedArtboardModel;

//   var selectedArtboardModel = globalModel.selectedArtboardModel;
//   var exportRangeValue = null;
//   var exportRangeArray = [];
//   var exportType = null;
//   var userSelectedArtboards = [];
//   var userSelectedArtboardNames = [];
//   var exportMultipleArtboards = false;

//   if (selectedArtboardModel) {
//     exportRangeValue = selectedArtboardModel.exportArtboardsRange;
//     exportRangeArray =
//       exportRangeValue != "" &&
//       exportRangeValue != null &&
//       exportRangeValue.split
//         ? exportRangeValue.split(",")
//         : [];
//     userSelectedArtboards = getArtboardsFromGUIDs(exportRangeArray);
//     userSelectedArtboardNames = getArtboardNames(userSelectedArtboards);
//     globalModel.userSelectedArtboards = userSelectedArtboards;
//     exportType = selectedArtboardModel.exportType;
//     exportList = selectedArtboardModel.exportList;

//     // value can be null so default to selected artboard
//     if (exportList == null) {
//       exportList = XDConstants.SELECTED_ARTBOARD;
//       selectedArtboardModel.exportList = exportList;
//     }

//     exportMultipleArtboards =
//       exportList == XDConstants.SELECTED_ARTBOARDS ||
//       exportList == XDConstants.ALL_ARTBOARDS;

//     if (exportMultipleArtboards) {
//       if (
//         exportType == XDConstants.SINGLE_PAGE_NAVIGATION ||
//         exportType == XDConstants.SINGLE_PAGE_MEDIA_QUERY ||
//         exportType == XDConstants.SINGLE_PAGE_APPLICATION
//       ) {
//         globalModel.exportToSinglePage = true;
//       } else {
//         globalModel.exportToSinglePage = false;
//       }
//     }

//     if (globalModel.exportToSinglePage) {
//       globalModel.embedImages = selectedArtboardModel.embedImages;
//       globalModel.image2x = selectedArtboardModel.image2x;
//       globalModel.imagesExportFolder = selectedArtboardModel.imagesExportFolder;
//     }

//     updateGlobalModelValues(selectedArtboardModel);

//     globalModel.exportList = selectedArtboardModel.exportList;
//   } else if (exportMultipleArtboards == false) {
//     globalModel.exportToSinglePage = false;
//   }

//   globalModel.exportMultipleArtboards = exportMultipleArtboards;

//   // Selected Element
//   // no multiple selection support currently
//   // get last selected item to match artboard selection behavior
//   var element = selection.items.length
//     ? selection.items[selection.items.length - 1]
//     : selectedArtboard;

//   if (
//     showingElementDialog &&
//     element == null &&
//     globalModel.showingPanel &&
//     selectedArtboard
//   ) {
//     element = selectedArtboard;
//   }

//   globalModel.selectedElement = element;

//   if (numberOfArtboards == 0 && element == null) {
//     globalModel.hasSelection = false;
//   }

//   globalModel.isPasteboardItem = getIsPasteboardItem(
//     globalModel.selectedElement
//   );

//   // EXPORT ALL ARTBOARDS
//   // get preferences for other artboards
//   // if showing element dialog we need all artboard models to get a list of links to other artboards

//   var getAllArtboardsBecauseLinksDontWorkOtherwise = true;

//   if (
//     exportMultipleArtboards ||
//     showingElementDialog ||
//     getAllArtboardsBecauseLinksDontWorkOtherwise
//   ) {
//     b && log("Caching artboards for all artboards export");

//     // add selected artboard
//     if (selectedArtboard) {
//       globalModel.artboardModels[selectedArtboard.guid] =
//         globalModel.selectedArtboardModel;
//     }

//     // add artboards to cache
//     for (let index = 0; index < numberOfArtboards; index++) {
//       const currentArtboard = artboards[index];
//       var currentArtboardModel;

//       try {
//         b && log("1 Caching artboard: " + currentArtboard.name);

//         if (currentArtboard == selectedArtboard) {
//           currentArtboardModel = globalModel.selectedArtboardModel;
//         } else {
//           currentArtboardModel = getArtboardModelInstance(currentArtboard);
//         }

//         currentArtboardModel.index = index;

//         globalModel.currentArtboard = currentArtboard;
//         globalModel.currentArtboardModel = currentArtboardModel;

//         setArtboardID(currentArtboardModel);
//         // reset if calling export more than once
//         resetArtboardModel(currentArtboardModel);

//         globalModel.artboardModels[currentArtboard.guid] = currentArtboardModel;

//         if (currentArtboardModel.export != false) {
//           globalModel.artboardIds.push("#" + currentArtboardModel.elementId);
//         }

//         var data = null;

//         if (GlobalModel.supportsPluginData) {
//           data = getSceneNodePluginData(currentArtboard);

//           if (data == null) {
//             data = currentArtboardModel.getPreferencesData();

//             try {
//               if (isInEditContext(selection.editContext, currentArtboard)) {
//                 setSceneNodePluginData(currentArtboard, data);
//               } else {
//                 // outside of context - can't set scene node plugin data
//               }
//             } catch (error) {}
//           }

//           // TODO:
//           // name and id are linked
//           // but we have no way of knowing when the name is changed outside of the plugin
//           // and no way to update the plugin data yet
//           // so we are updating it when we run the plugin
//           if (currentArtboard.name != data.name) {
//             data.name = currentArtboard.name;
//             currentArtboardModel.name = data.name; // need to set this out of

//             if (isInEditContext(selection.editContext, currentArtboard)) {
//               setSceneNodePluginData(currentArtboard, data);
//             }
//           }

//           if (currentArtboardModel.originalPreferencesDataValue == null) {
//             currentArtboardModel.originalPreferencesDataValue =
//               currentArtboard.pluginData;
//           }

//           storePluginDataInArtboardModel(
//             currentArtboardModel,
//             currentArtboardModel,
//             data
//           );
//         } else {
//           data = await getPreferenceData(
//             currentArtboard,
//             currentArtboardModel,
//             currentArtboard
//           );
//         }

//         b &&
//           log(
//             "2.1 Preference data created for artboard:" + currentArtboard.name
//           );
//         b && object(data, "2.12 Preference Data");

//         updateArtboardModelFromPreferences(currentArtboardModel, data);

//         b &&
//           log(
//             "3 After getting preferences for artboard:" + currentArtboard.name
//           );
//       } catch (error) {
//         log("Caching artboard error:" + error.stack);
//       }
//     }

//     for (const boardGUID in globalModel.artboardModels) {
//       b && log("Cached artboards: " + board);
//     }

//     // showing main UI dialog
//     if (showingElementDialog == false) {
//       b &&
//         log(
//           "Setting artboard model to selected artboard:" +
//             globalModel.selectedArtboardModel.artboard
//         );

//       globalArtboardModel = globalModel.selectedArtboardModel;

//       preferenceData = globalModel.selectedArtboardModel.preferencesData;

//       !showElementDialog && updateMainFormWithArtboardModelValues();
//     }
//   }

//   // EXPORT SINGLE ARTBOARD or ELEMENT OPTIONS
//   // get selected artboard and it's elements data
//   if (exportMultipleArtboards == false) {
//     globalArtboardModel = globalModel.selectedArtboardModel;

//     for (let index = 0; index < numberOfArtboards; index++) {
//       var board = artboards[index];

//       if (board == selectedArtboard) {
//         globalArtboardModel.index = index;
//         break;
//       }
//     }

//     if (GlobalModel.supportsPluginData) {
//       if (selectedArtboard) {
//         preferenceData = getSceneNodePluginData(selectedArtboard);

//         if (preferenceData == null) {
//           preferenceData = globalArtboardModel.getPreferencesData();

//           if (showingElementDialog == false) {
//             setSceneNodePluginData(
//               selectedArtboard,
//               globalArtboardModel.getPreferencesData()
//             );
//           }

//           storePluginDataInArtboardModel(
//             globalArtboardModel,
//             globalArtboardModel,
//             preferenceData
//           );
//         } else {
//           //log("existing preferences found for artboard")
//         }

//         if (globalArtboardModel.originalPreferencesDataValue == null) {
//           globalArtboardModel.originalPreferencesDataValue =
//             selectedArtboard.pluginData;
//         }

//         updateArtboardModelFromPreferences(
//           globalModel.selectedArtboardModel,
//           preferenceData
//         );
//       }
//     } else {
//       preferenceData = await getPreferenceData(
//         selectedArtboard,
//         globalModel.selectedArtboardModel,
//         selectedArtboard
//       );

//       updateArtboardModelFromPreferences(
//         globalModel.selectedArtboardModel,
//         preferenceData
//       );
//     }
//   }

//   // ELEMENT OPTIONS - create selected models and elements for other functions
//   if (showingElementDialog || true) {
//     if (element == null) {
//       b && log("No items selected");
//       return;
//     }

//     if (element instanceof Artboard) {
//       b && log("Selected item is artboard:");
//     }

//     if (element) {
//       b && log("Item selected:" + getSanitizedIDName(element.name));

//       // since version 14 we can store a JSON string on each scene node
//       if (GlobalModel.supportsPluginData) {
//         var elementIsPasteboardItem = getIsPasteboardItem(element);
//         if (elementIsPasteboardItem && numberOfArtboards == 0) {
//           //return;
//         }

//         preferenceData = getSceneNodePluginData(element);
//         var elementModel = createModel(element, 0, 0, true, true);
//         elementModel.originalPreferencesDataValue = element.pluginData;

//         if (preferenceData == null) {
//           preferenceData = elementModel.getPreferencesData();

//           if (isInEditContext(selection.editContext, selectedArtboard)) {
//             //log("Artboard is in edit context. Can save")
//             //setSceneNodePluginData(selectedArtboard, elementModel.getPreferencesData());
//             //setSceneNodePluginData(selectedArtboard, artboardModel.getPreferencesData());
//           } else {
//             //log("Artboard is NOT in edit context. Can NOT save")
//           }
//         }

//         globalModel.selectedModelData = preferenceData;

//         if (globalArtboardModel) {
//           storePluginDataInArtboardModel(
//             elementModel,
//             globalArtboardModel,
//             preferenceData
//           );
//         }
//         globalModel.selectedModels = getSelectedModels(
//           selection.items,
//           globalArtboardModel
//         ); // does nothing right now
//         globalModel.selectedModel = elementModel;
//       } else {
//         globalModel.selectedModelData = getSelectedModelPreferences(
//           element,
//           globalArtboardModel
//         );
//         globalModel.selectedModels = getSelectedModels(
//           selection.items,
//           globalArtboardModel
//         );
//         globalModel.selectedModel = getModel(element); // models may not be created yet
//       }
//     }
//   }

//   return preferenceData;
// }

// function createModel(
//   item,
//   nestLevel,
//   index,
//   skipExport = false,
//   addInPluginData = true,
//   existingModel = null
// ) {
//   var b = debugModel.createModel;
//   var type = item.constructor.name;
//   var guid = item.guid;
//   var isBooleanGroup = item;
//   var isGroup = item.isContainer;
//   var preferenceData = null;
//   var isArtboard = getIsArtboard(item);
//   var hasMarkupInside = false;
//   var hasHTMLTemplate = false;
//   var isText = item instanceof Text;
//   var model = null;

//   if (existingModel) {
//     model = existingModel;
//   } else {
//     model =
//       globalArtboardModel &&
//       globalArtboardModel.models &&
//       globalArtboardModel.models[guid];
//   }

//   if (model == null) {
//     if (isArtboard && globalModel.artboardModels[guid]) {
//       //model = globalModel.artboardModels[guid];
//     }
//   }

//   if (model == null) {
//     if (isArtboard) {
//       model = new ArtboardModel();
//     } else {
//       model = new Model();
//       model.overflow = model.getDefaultOverflowValue(item);
//     }

//     addModel(item, model);
//   }

//   b && log("Creating model for: " + type + " " + nestLevel + ":" + index);

//   model.version = globalModel.version;
//   // console.log("item",item)
//   // console.log("model", model)
//   // create properties
//   model.nestLevel = nestLevel;
//   model.index = index;
//   model.bounds = getBoundsInParent(item);
//   model.groupBounds = getBoundsInParentLocal(item, false);
//   model.parentBounds = item.parent
//     ? Object.assign({}, item.parent.globalBounds)
//     : null;
//   model.displayType = getDisplayTypeName(type);
//   model.type = type;
//   model.guid = guid;
//   model.name = item.name;
//   model.artboard = getArtboard(item);
//   model.isBooleanGroup = isBooleanGroup;
//   model.isGroup = isGroup;
//   model.isLayoutGroup = isGroup && isBooleanGroup == false;

//   if (addInPluginData) {
//     preferenceData = getSceneNodePluginData(item);

//     if (preferenceData) {
//       parsePluginData(model, preferenceData);
//     } else {
//       // add default plugin data
//     }
//   }

//   hasMarkupInside = model.markupInside != null && model.markupInside != "";
//   hasHTMLTemplate = model.template != null && model.template != "";

//   if (b == false && model.debug) {
//     b && log("Creating model for: " + type + " " + nestLevel + ":" + index);
//   }
//   return model;
// }

// function addModel(item, model) {
// 	if (globalArtboardModel) {
// 		globalArtboardModel.models[item] = model;
// 		globalArtboardModel.items[model] = item;
// 	}

// 	if (item instanceof Artboard) {
// 		globalModel.artboardModels[item.guid] = model;
// 	}
// }

// async function exportSelectedArtboard(currentArtboard, createFiles = true) {
// 	var artboardName = null;
// 	var currentArtboardModel;

// 	//log("Exporting the selected artboard");

// 	try {

// 		globalModel.currentArtboard = currentArtboard;
// 		globalModel.currentArtboardModel = currentArtboardModel;

// 		// setArtboardID(currentArtboardModel);

// 		// create each node
// 		console.log("globalModel", globalModel)
// 		console.log("currentArtboardModel", currentArtboardModel)
// 		console.log("currentArtboard", currentArtboard)
// 		// createModel(currentArtboard, 0, 0);

// 		// we are getting base 64 separately from create model bc too many errors appear when using with await and create model
// 		// todo: refactor
// 		// await getBase64DataModel(currentArtboard, currentArtboardModel, currentArtboardModel);

// 		// await exportDocument(currentArtboardModel, createFiles);

// 	}
// 	catch(error) {
// 	 console.log("Export error");
// 	}

// 	// export single artboard or multiple artboards to separate pages
// 	// var files = currentArtboardModel.files;
// 	// var stylesheetFile = null;
// 	// var scriptFile = null;

// 	// try {

// 	// 	if (currentArtboardModel.externalStylesheet) {
// 	// 		stylesheetFile = new FileInfo();
// 	// 		stylesheetFile.content = currentArtboardModel.cssOutput;
// 	// 		stylesheetFile.fileName = currentArtboardModel.getStylesheetFilename();
// 	// 		stylesheetFile.fileExtension = currentArtboardModel.cssExtension;

// 	// 		files.push(stylesheetFile);
// 	// 	}

// 	// 	if (currentArtboardModel.externalScript) {
// 	// 		scriptFile = new FileInfo();
// 	// 		scriptFile.content = currentArtboardModel.scriptOutput;
// 	// 		scriptFile.fileName = currentArtboardModel.getJavaScriptFilename();
// 	// 		scriptFile.fileExtension = currentArtboardModel.jsExtension;

// 	// 		files.push(scriptFile);
// 	// 	}

// 	// 	globalModel.scriptOutput = currentArtboardModel.scriptOutput;
// 	// 	globalModel.cssOutput = currentArtboardModel.cssOutput;
// 	// 	globalModel.markupOutput = currentArtboardModel.markupOutput;
// 	// 	globalModel.pageOutput = currentArtboardModel.pageOutput;

// 	// 	globalModel.lastArtboardModel = currentArtboardModel;
// 	// 	globalModel.lastModel = globalModel.selectedModel;

// 	// 	if (createFiles && files.length) {
// 	// 		updateFileLocation(files[0], currentArtboardModel, true);
// 	// 	}

// 	// 	if (currentArtboardModel.uploadOnExport) {
// 	// 		if (currentArtboardModel.postLinkID && globalModel.userSite) {
// 	// 			await uploadArtboard();
// 	// 		}
// 	// 	}
// 	// }
// 	// catch(error) {
// 	// 	console.log("Export error");
// 	// }

// 	//log("Exported the selected artboard");
// 	return true;
// }

module.exports = {
  commands: {
    sceneNodeListAsHTML: sceneNodeListAsHTML,
  },
};
