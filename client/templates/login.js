
Template.loginTemplate.events({
  'click #btnLogin': function(event) {
    $('#loadingScreen').addClass("active");
    //start scan barcode!
    var barcodeResult = "0";
    var customerInfo;
  //  ------for test with web browser, comment it if build for device!!!!!-------------
  //  ===========start comment from here================
    if (barcodeResult == "0" || barcodeResult == "8625455007804") {
      alert("Chưa nhận được barcode hoặc barcode nhận được không có trên service, hệ thống sẽ tự động đăng nhập bằng mã 8625455321023 (chỉ dành cho demo)!");
      barcodeResult = "8625455321023";
    }
    //-----------call webservice to check this barcode--------------
    Meteor.call("checkBarcode", barcodeResult, function(error, result) {
      if (error) {
        alert("Khong the ket noi voi service !!!");
        $('#loadingScreen').removeClass("active");
      } else {
        console.log("da lay ra ket qua tai client: " + JSON.stringify(result.data));
        customerInfo = result.data; //results.data should be a JSON object
        //console.log("Parse data:" + customerInfo.Name);
        if (typeof customerInfo !== "undefined" && customerInfo !== null) {
          console.log("da verify voi service xong!")
          //--------------if service return true----------------------------
          //barcodeResult = "123456";
          console.log("call update News");
          Meteor.call("updateNews");
          console.log("call update GiftInfo");
          Meteor.call("updateGiftInfo");
          console.log("call update SearchAllPhano");
          Meteor.call("ShowPhama");
          Meteor.loginWithPassword(barcodeResult, barcodeResult, function(err, res) {
            if (err) {
              //không thể đăng nhập vì user này chưa tạo trong hệ thống!
              //tạo user
              var userObject = {
                username: barcodeResult,
                password: barcodeResult,
                profile: customerInfo
              };
              Meteor.call("createNewUser", userObject, function(err, result) {
                if (err) {
                  alert("Không thể  tạo user!!!" + err);
                  $('#loadingScreen').removeClass("active");
                } else {
                  Meteor.loginWithPassword(barcodeResult, barcodeResult, function(loginErr, loginres) {
                    if (!loginErr) {
                      Router.go("/");
                    }
                  });
                }
              });
            } else {
              Router.go("/");
            }
          });
        }
        //--------------if service return false----------------------------
        else {
          console.log(barcodeResult);
          alert("Không tìm thấy Barcode này trong hệ thống, xin hãy thử lại!!!");
          $('#loadingScreen').removeClass("active");
        }
      }
    });
  //============End test browser============

    // ======comment below block to test with browser=====================
    // -----------------Call barcode scanner-----------------
    // cordova.plugins.barcodeScanner.scan(
    //   function(result) {
    //     barcodeResult = result.text;
    //     //Only run with test purpose
    //     if (barcodeResult == "0" || barcodeResult == "8625455007804") {
    //       alert("Chưa nhận được barcode hoặc barcode nhận được không có trên service, hệ thống sẽ tự động đăng nhập bằng mã 8625455321023 (chỉ dành cho demo)!");
    //       barcodeResult = "8625455321023";
    //     }
    //     //-----------call webservice to check this barcode--------------
    //     Meteor.call("checkBarcode", barcodeResult, function(error, result) {
    //       if (error) {
    //         alert("Khong the ket noi voi service !!!");
    //         $('#loadingScreen').removeClass("active");
    //       } else {
    //         console.log("da lay ra ket qua tai client: " + JSON.stringify(result.data));
    //         customerInfo = result.data; //results.data should be a JSON object
    //         //console.log("Parse data:" + customerInfo.Name);
    //
    //         if (typeof customerInfo !== "undefined" && customerInfo !== null) {
    //           console.log("da verify voi service xong!")
    //           //--------------if service return true----------------------------
    //           //barcodeResult = "123456";
    //           console.log("call update News");
    //           Meteor.call("updateNews");
    //           console.log("call update GiftInfo");
    //           Meteor.call("updateGiftInfo");
    //           console.log("call update SearchAllPhano");
    //           Meteor.call("ShowPhama");
    //           Meteor.loginWithPassword(barcodeResult, barcodeResult, function(err, res) {
    //             if (err) {
    //               //không thể đăng nhập vì user này chưa tạo trong hệ thống!
    //               //tạo user
    //               var userObject = {
    //                 username: barcodeResult,
    //                 password: barcodeResult,
    //                 profile: customerInfo
    //               };
    //               Meteor.call("createNewUser", userObject, function(err, result) {
    //                 if (err) {
    //                   alert("Không thể  tạo user!!!" + err);
    //                   $('#loadingScreen').removeClass("active");
    //                 } else {
    //                   Meteor.loginWithPassword(barcodeResult, barcodeResult, function(loginErr, loginres) {
    //                     if (!loginErr) {
    //                       Router.go("/");
    //                     }
    //                   });
    //                 }
    //               });
    //             } else {
    //               Router.go("/");
    //             }
    //           });
    //         }
    //         //--------------if service return false----------------------------
    //         else {
    //           console.log(barcodeResult);
    //           alert("Không tìm thấy Barcode này trong hệ thống, xin hãy thử lại!!!");
    //           $('#loadingScreen').removeClass("active");
    //         }
    //       }
    //     });
    //   },
    //   function(error) {
    //     alert("Có lồi xảy ra, mã lỗi:" + EJSON.stringify(error));
    //     $('#loadingScreen').removeClass("active");
    //   });
    // ======comment upper block to test with browser=====================
  }
});
