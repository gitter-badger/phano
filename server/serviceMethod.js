Meteor.methods({
  'checkBarcode': function(barcodeResult) {
    this.unblock();
    console.log("runing check barcode with service")
    return Meteor.http.call("GET", "http://crmservice.phanopharmacy.vn/MainService.svc/GetCustInfoByBarCode/" + barcodeResult);
  },

  updateGiftInfo: function() {
    // Get top songs from iTunes server
    HTTP.get('http://crmservice.phanopharmacy.vn/MainService.svc/GetRuleOfGiftInfo', function(error, giftReponse) {
      var listGifts = [];
      var entries = giftReponse.data;
      var sort = 0;
      _.each(entries, function(gitf) {
        var insertGift = {};
        insertGift._id = gitf.Oid;
        insertGift.Point = gitf.Point;
        insertGift.ProdCode = gitf.ProdCode;
        insertGift.ProdName = gitf.ProdName;
        insertGift.Quantity = gitf.Quantity;
        insertGift.UnitName = gitf.UnitName;
        // Add news to list
        listGifts.push(insertGift);
        // Increase sort
        sort++;
      }, this);

      // Delete all existing songs from database
      GiftInfo.remove();

      // Insert new songs into database
      _.each(listGifts, function(gift) {
        GiftInfo.upsert(gift._id, gift);
      }, this);
    });
  },
  updateNews: function() {
    // Get top songs from iTunes server
    HTTP.get('http://crmservice.phanopharmacy.vn/MainService.svc/GetPromotionInfo', function(error, newsReponse) {
      var listNews = [];
      var entries = newsReponse.data;
      var sort = 0;
      _.each(entries, function(news) {
        var insertNews = {};
        insertNews._id = news.Oid;
        insertNews.Description = news.Description;
        insertNews.Name = news.Name;
        // Add news to list
        listNews.push(insertNews);
        // Increase sort
        sort++;
      }, this);

      // Delete all existing songs from databas,e
      News.remove();

      // Insert new songs into database
      _.each(listNews, function(news) {
        News.upsert(news._id, news);
      }, this);
    });
  },
  ShowPhama: function() {
    // Get top songs from iTunes server
    HTTP.get('http://www.phanopharmacy.com/api/webmethod', function(error, phamaReponse) {
      var listPhama = [];
      console.log(phamaReponse.data);
      var entries = phamaReponse.data;
      var sort = 0;
      _.each(entries, function(phama) {
        var insertPhama = {};
        insertPhama._id = phama.ID;
        insertPhama.ADDRESS = phama.ADDRESS;
        insertPhama.PHAMANAME = phama.PHAMANAME;
        insertPhama.PHONE = phama.PHONE;
        insertPhama.ADDRESS_EN = phama.ADDRESS_EN;
        insertPhama.PHAMANAME_EN = phama.PHAMANAME_EN;
        insertPhama.PHONE_EN = phama.PHONE_EN;
        insertPhama.CITY = phama.CITY;
        insertPhama.DISTRICT_EN = phama.DISTRICT_EN;
        insertPhama.CITY_EN = phama.CITY_EN;
        insertPhama.DESCRIPTION = phama.DESCRIPTION;
        insertPhama.LAT = phama.LAT;
        insertPhama.LONG = phama.LONG;
        insertPhama.STATUS = phama.STATUS;
        insertPhama.ORTHER = phama.ORTHER;
        insertPhama.CREATEDDATE = phama.CREATEDDATE;
        insertPhama.CREATEDBY = phama.CREATEDBY;
        insertPhama.UPDATEDDATE = phama.UPDATEDDATE;
        insertPhama.UPDATEDBY = phama.UPDATEDBY;
        // Add news to list
        listPhama.push(insertPhama);
        // Increase sort
        sort++;
      }, this);

      // Delete all existing songs from databas,e
      SearchAllPhano.remove();

      // Insert new songs into database
      _.each(listPhama, function(phama) {
        SearchAllPhano.upsert(phama._id, phama);
      }, this);
    });
  },
});
