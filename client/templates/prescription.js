


Template.InsertThuoc.onRendered(function () {
    $('#txtTime').dropdown();
});

//Bắt sự kiện form nhập thuốc
Template.InsertThuoc.events({
    'click #btnLuuthuoc': function (event) {
        
    }
});
//bắt sự kiện form nhập tên đơn thuốc
Template.prescriptionTemplate.events({

    'click [data-action="nhaptenthuoc"]': function () {
        SemanticModal.generalModal('InsertThuoc', { foo: 'bar' });
    }
});
