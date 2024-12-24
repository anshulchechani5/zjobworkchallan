/*global QUnit*/

sap.ui.define([
	"zjob_work_challan/controller/Job_Work_Challan.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Job_Work_Challan Controller");

	QUnit.test("I should test the Job_Work_Challan controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
