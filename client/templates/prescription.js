


Template.InsertThuoc.onRendered(function () {
    $('#txtTime').dropdown();
});

Template.prescriptionTemplate.events({
    'click [data-action="nhaptenthuoc"]': function () {
        SemanticModal.generalModal('InsertThuoc', { foo: 'bar' });
    }
});

Template.InsertThuoc.events({
    'click #btnLuuthuoc': function (event) {
        
    }
});
