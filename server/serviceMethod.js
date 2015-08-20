Meteor.methods({
  'checkBarcode': function(barcodeResult) {
    this.unblock();
    console.log("runing get barcode")
    return Meteor.http.call("GET", "http://crmservice.phanopharmacy.vn/MainService.svc/GetCustInfoByBarCode/" + barcodeResult);
    // HTTP.call("GET", "http://crmservice.phanopharmacy.vn/MainService.svc/GetCustInfoByBarCode/" + barcodeResult,
    //   function(error, result) {
    //     debugger;
    //     if (!error) {
    //       console.log("ket qua tra ve " + JSON.stringify(result.data));
    //       return result;
    //     } else {
    //       console.log(error);
    //     }
    //   });

  },
  'getNews': function() {
    this.unblock();

    HTTP.call("GET", "http://crmservice.phanopharmacy.vn/MainService.svc/GetPromotionInfo",
      function(error, result) {
        if (!error) {
          return result;
        }
      });

  },
  'getGif': function() {
    this.unblock();
    HTTP.call("GET", "http://crmservice.phanopharmacy.vn/MainService.svc/GetRuleOfGiftInfo",
      function(error, result) {
        if (!error) {
          return result;
        }
      });
  }
});
