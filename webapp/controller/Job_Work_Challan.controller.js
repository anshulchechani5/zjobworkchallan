sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
  
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("zjobworkchallan.controller.Job_Work_Challan", {
            onInit: function () {

            },

            onPress: function()
            {
                var oBusyDialog = new sap.m.BusyDialog({
                    title: "Loading",
                    text: "Please wait"
                });
                oBusyDialog.open();
                
                

                // Getting All the values 

                var challanNumber = this.getView().byId("id_challanNumber").getValue();
                var year = this.getView().byId("id_year").getValue();
                var vehicleNo = this.getView().byId("id_vehicleNo").getValue();
                var modeOfTransport = this.getView().byId("id_modeOfTransport").getValue();
                var nameOfTransport = this.getView().byId("id_nameOfTransport").getValue();
                var dispatchDate = this.getView().byId("id_dispatchDate").getValue();
                var dispatchTime = this.getView().byId("id_dispatchTime").getValue();
                var duration = this.getView().byId("id_duration").getValue();
                var radButton = this.getView().byId("id_radioButton").getSelectedButton().getText();
            
                if(challanNumber == '' || year == '' )
                {

                    debugger;
                    MessageBox.alert("Please Fill All the Mandatory Fields ( Mark with *) ");
                    

                    
                }
                else
                {

                 // https://my405100.s4hana.cloud.sap:443/sap/bc/http/sap/yjobwork_http?sap-client=080
    
                 var url1 = "/sap/bc/http/sap/yjobwork_http?";
                 var url2 = "&ChallanNumber=";
                 var url3 = "&Year=";
                 var url4 = "&selection=";
                 var url8 = "&DispatchDate="+dispatchDate;
                 var url9 = "&DispatchTime="+dispatchTime;
                 var url10 = "&Duration="+duration;
                 var url11 = "&modeoftransport="+modeOfTransport;
                 var url12 = "&nameofTransport="+nameOfTransport;
                 var url13 = "&vehicleNo="+vehicleNo;
                
                 var url5 = url2 + challanNumber;
                 var url6 = url3 + year ;
                 var url7 = url4+ radButton;
     
                 var url = url1 + url5 + url6 +url7 + url8 + url9 + url10 + url11 + url12 + url13;
     
                 // var username = "nvlabap3";
                 // var password = "Mike$1245";
                 $.ajax({
                     url: url,
                     type: "GET",
                     beforeSend: function (xhr) {
                         xhr.withCredentials = true;
                         // xhr.username = username;
                         // xhr.password = password;
                     },
                     success: function (result) {
                         var decodedPdfContent = atob(result);
                         var byteArray = new Uint8Array(decodedPdfContent.length);
                         for (var i = 0; i < decodedPdfContent.length; i++) {
                             byteArray[i] = decodedPdfContent.charCodeAt(i);
                         }
                         var blob = new Blob([byteArray.buffer], {
                             type: 'application/pdf'
                         });
                         var _pdfurl = URL.createObjectURL(blob);
     
                         if (!this._PDFViewer) {
                             this._PDFViewer = new sap.m.PDFViewer({
                                 width: "auto",
                                 source: _pdfurl
                             });
                             jQuery.sap.addUrlWhitelist("blob"); // register blob url as whitelist
                         }
                         else
                         {
                             this._PDFViewer = new sap.m.PDFViewer({
                                 width: "auto",
                                 source: _pdfurl
                             });
                             jQuery.sap.addUrlWhitelist("blob");
                         }
                         oBusyDialog.close();
                         this._PDFViewer.open();
                     }.bind(this)
                 });
                }
             

            }
        });
    });
