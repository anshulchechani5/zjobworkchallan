/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zjob_work_challan/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
