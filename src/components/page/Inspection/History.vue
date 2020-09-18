<script type="text/javascript">
    var basePath = 'http://47.92.83.41:8787/wqm/';
    var statusValues = [
        { text: '整改中', value: 1 },
        { text: '待审批', value: 2 },
        { text: '待销号(超时)', value: 3 },
        { text: '已驳回', value: 4 },
        { text: '已通过', value: 5 },
        { text: '已关闭', value: 6 }
    ];
    var dealStatus = -1;
    var startTime = '2020-09-10 00:00:00';
    var endTime = '2020-09-17 00:00:00';
    var flag = false;
    var carouselPictureFileIds = '';
    var batchCloseId = '';
    var $resources = {
        salesNumber: true,

        close: true
    };
    $(function () {
        kendo.culture('zh-CN');
        var height = $(window).height();
        var width = $(window).width();
        $('.foot').width(width - 135);

        $('.violationInfo').parents('ul').slideDown(100).children('li');
        $('.left .violationInfo').siblings().removeClass('now').end().addClass('now');
        $('#startTime').kendoDateTimePicker({
            value: getDate(-6),
            format: 'yyyy-MM-dd HH:mm:ss',
            change: function onOpen(e) {
                startTime = null;
            }
        });
        $('#endTime').kendoDateTimePicker({
            value: getDate(1),
            format: 'yyyy-MM-dd HH:mm:ss',
            change: function onOpen(e) {
                endTime = null;
            }
        });

        $('#dealStatus').kendoDropDownList({
            dataTextField: 'text',
            dataValueField: 'value',
            dataSource: [
                { text: '全部', value: '-1' },
                { text: '整改中', value: '1' },
                { text: '待审批', value: '2' },
                { text: '已驳回', value: '4' },
                { text: '已通过', value: '5' },
                { text: '已关闭', value: '6' }
            ],
            index: 0,
            change: function (e) {
                dealStatus = null;
            },
            dataBound: function (e) {
                this.select(0);
                this.trigger('change');
            }
        });

        var dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: 'selectViolationInfoByParams.do',
                    dataType: 'json',
                    type: 'POST'
                },
                parameterMap: function (options, operation) {
                    if (operation == 'read') {
                        options.startTime = startTime == null ? $('#startTime').val() : startTime;
                        options.endTime = endTime == null ? $('#endTime').val() : endTime;
                        options.status = dealStatus == null ? $('#dealStatus').val() : dealStatus;
                        return options;
                    }
                    return kendo.stringify(options.models[0]);
                }
            },
            serverPaging: true,
            batch: true,
            schema: {
                data: function (response) {
                    return response.data;
                },
                total: function (response) {
                    return response.total;
                },
                model: {
                    id: 'id',
                    fields: {
                        orgId: { type: 'number', editable: true, defaultValue: null },
                        orgName: { type: 'string', editable: true, defaultValue: null },
                        punishmentMethods: { type: 'string', editable: true, defaultValue: null },
                        createTime: { type: 'date', editable: true, defaultValue: null },
                        violationOfContent: { type: 'string', editable: true, defaultValue: 1 },
                        status: { type: 'number', defaultValue: 1 }
                    }
                }
            },
            pageSize: 20
        });

        $('#grid').kendoGrid({
            dataSource: dataSource,
            autoBind: false,
            resizable: true,
            height: $(window).height() - 150,
            reorderable: true,
            sortable: true,
            filterable: {
                extra: false,
                operators: {
                    string: {
                        contains: '包含'
                    }
                }
            },
            pageable: {
                pageSizes: [20, 30, 40],
                numeric: true,
                buttonCount: 3,
                messages: {
                    empty: '无数据',
                    display: '显示条目 {0}-{1} 共 {2} 条',
                    page: '第',
                    of: '页 共{0}页',
                    itemsPerPage: '条/页'
                },
                input: true
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="check-all-violation" onclick="clickCheckAll();" />',
                    width: '30px',
                    attributes: {
                        style: 'text-align:center;'
                    },
                    template: function (dataItem) {
                        if (dataItem.status != 5 && dataItem.status != 6) {
                            return '<input type="checkbox" onclick="checkItem(this);" class="test"/>';
                        }
                        return '';
                    }
                },
                {
                    field: 'orgId',
                    title: '违规单位ID',
                    attributes: {
                        style: 'text-align:center;'
                    },
                    width: '120px',
                    template: function (item) {
                        var res = '';
                        if (item.orgName != null) {
                            res = item.orgName;
                        }
                        return res;
                    },
                    hidden: true
                },
                {
                    field: 'orgName',
                    title: '违规单位',
                    attributes: {
                        style: 'text-align:center;'
                    },
                    width: '120px'
                },
                {
                    attributes: {
                        style: 'text-align:center;'
                    },
                    field: 'createTime',
                    title: '录入时间',
                    width: '60px',
                    format: '{0: yyyy-MM-dd HH:mm:ss}',
                    filterable: false
                },
                {
                    field: 'punishmentMethods',
                    title: '处置方式',
                    attributes: {
                        style: 'text-align:center;'
                    },
                    width: '120px',
                    filterable: false
                },
                {
                    attributes: {
                        style: 'text-align:center;'
                    },
                    field: 'violationOfContent',
                    title: '违规内容',
                    width: '120px',
                    filterable: false
                },
                {
                    attributes: {
                        style: 'text-align:center;'
                    },
                    field: 'status',
                    title: '状态',
                    width: '60px',
                    template: function (item) {
                        var result = '';
                        $(statusValues).each(function () {
                            if (this.value == item.status) {
                                result = this.text;
                                return false;
                            }
                        });
                        return result;
                    },
                    filterable: {
                        ui: function (e) {
                            e.kendoDropDownList({
                                dataTextField: 'text',
                                dataValueField: 'value',
                                dataSource: statusValues
                            });
                        }
                    }
                },
                {
                    title: '操作',
                    template: function (e) {
                        return operateButtons(e);
                    },
                    width: '120px',
                    attributes: { class: 'text-center' }
                }
            ],
            height: $(window).height() - 200,
            resizable: true,
            selectable: 'row',
            change: function (e) {
                selectRow = this.select()[0];
                selectObj = this.dataItem(selectRow);
            },
            filterable: {
                operators: {
                    string: {
                        contains: '包含',
                        eq: '等于'
                    },
                    number: {
                        eq: '等于',
                        neq: '不等于'
                    }
                },
                extra: false
            }
        });
        initDebugGrid();
    });

    function clickCheckAll() {
        var head = $('#check-all-violation');
        var checked = head.prop('checked');
        if (!checked) {
            batchCloseId = '';
        }
        $('#grid')
            .find(':checkbox[class=test]')
            .each(function (i, item) {
                this.checked = checked;
                if (checked) {
                    var grid = $('#grid').data('kendoGrid');
                    var dataitem = grid.dataItem($(item).closest('tr'));
                    batchCloseId += dataitem.id + ',';
                }
            });
    }

    function openDetaiWindow(obj, operateType) {
        var orgId = 0;
        if (operateType == 3) {
            var selectRow = $(obj).parents('tr');
            var selectObj = $('#grid').data('kendoGrid').dataItem(selectRow);
            orgId = selectObj.id;
        }
        var startTime = $('#startTime').val();
        var endTime = $('#endTime').val();
        var dealStatus = $('#dealStatus').val();
        window.location.href =
            basePath +
            '/violationInfo/insertPage.do?orgId=' +
            orgId +
            '&operateType=' +
            operateType +
            '&dealStatus=' +
            dealStatus +
            '&startTime=' +
            startTime +
            '&endTime=' +
            endTime;
    }

    function checkItem(e) {
        var selectRow = $(e).closest('tr');
        var dataItem = $('#grid').data('kendoGrid').dataItem(selectRow);
        if (selectRow.context.checked) {
            batchCloseId += dataItem.id + ',';
        } else {
            batchCloseId = batchCloseId.replace(dataItem.id + ',', '');
        }
    }

    function getDate(index) {
        var date = new Date(); //当前日期
        var newDate = new Date();
        newDate.setDate(date.getDate() + index);
        var time = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
        return time;
    }

    function initDebugGrid() {
        var startTime = $('#startTime').val();
        var endTime = $('#endTime').val();
        var dealStatus = $('#dealStatus').val();
        $('#grid').data('kendoGrid').dataSource.transport.options.read.data = {
            startTime: startTime,
            endTime: endTime,
            status: dealStatus
        };
        $('#grid').data('kendoGrid').dataSource.read();
    }

    function operateButtons(e) {
        var result =
            '<a class="k-button btn-success btn-sm btn-proc" ' +
            "style='margin: 0 3px;\n" +
            " ' title=\"查看\" onclick='openViewWindow(this,1);'>查看</a>";
        // if (e.status == 1) {
        // if ($resources.update) {
        //     result += "<a class=\"k-button k-primary btn-sm btn-proc\" " +
        //         "style='margin: 0 3px;' title=\"编辑\" onclick=' openDetaiWindow(this,3);'>编辑</a>";
        // }
        // if ($resources.delete) {
        //     result += "<a class=\"k-button btn-danger btn-sm btn-proc\" " +
        //         "style='margin: 0 3px;' title=\"删除\" onclick='del(this)'>删除</a>";
        // }
        // if ($resources.close) {
        //     result += "<a class=\"k-button btn-info btn-sm btn-danger\" " +
        //         "style='margin: 0 3px;' title=\"关闭\" onclick='closeViolation(this)'>关闭</a>";
        // }
        // } else if ($resources.salesNumber && e.status != 5 && e.status != 6) {
        //     result += "<a class=\"k-button btn-info btn-sm btn-proc\" " +
        //         "style='margin: 0 3px;' title=\"通过\" onclick='openViewWindow(this,2)'>通过</a>";
        //     result += "<a class=\"k-button btn-info btn-sm btn-danger\" " +
        //         "style='margin: 0 3px;' title=\"关闭\" onclick='closeViolation(this)'>关闭</a>";
        // }
        if ($resources.salesNumber && e.status != 5 && e.status != 6) {
            result +=
                '<a class="k-button btn-info btn-sm btn-proc" ' +
                "style='margin: 0 3px;' title=\"处理\" onclick='openViewWindow(this,2)'>处理</a>";
        }
        if ($resources.close) {
            result +=
                '<a class="k-button btn-info btn-sm btn-danger" ' +
                "style='margin: 0 3px;' title=\"关闭\" onclick='closeViolation(this)'>关闭</a>";
        }
        return result;
    }

    function del(obj) {
        var selectRow = $(obj).parents('tr');
        var selectObj = $('#grid').data('kendoGrid').dataItem(selectRow);
        Dialog.confirmDialog('删除确认', 'warn', '确定删除该违规吗?', function (e) {
            var url = basePath + '/violationInfo/delete.do';
            var params = { id: selectObj.id };
            $.ajax({
                async: false,
                type: 'POST',
                url: url,
                data: JSON.stringify(params),
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    initDebugGrid();
                }
            });
        });
    }

    function closeViewWindow() {
        $('#detailTemplate').empty();
        $('#detailWindow').data('kendoWindow').close();
    }

    function openViewWindow(e, operateType) {
        var selectRow = $(e).closest('tr');
        var model = $('#grid').data('kendoGrid').dataItem(selectRow);
        model.operateType = operateType;
        var startTime = $('#startTime').val();
        var endTime = $('#endTime').val();
        var dealStatus = $('#dealStatus').val();
        window.location.href =
            basePath +
            '/violationInfo/viewPage.do?id=' +
            model.id +
            '&fromPage=info' +
            '&operateType=' +
            operateType +
            '&dealStatus=' +
            dealStatus +
            '&startTime=' +
            startTime +
            '&endTime=' +
            endTime;
    }

    function batchClose() {
        if (batchCloseId == null || batchCloseId == '') {
            Dialog.alertDialog('批量关闭', 'error', '请先选择要关闭的违规事件', null);
            return;
        }
        Dialog.confirmDialog('批量关闭', 'warn', '确定关闭全部选择的违规事件吗?', function (e) {
            var url = basePath + '/violationInfo/batchClose.do?batchCloseId=' + batchCloseId;
            $.ajax({
                async: false,
                type: 'POST',
                url: url,
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    if (data.success) {
                        Dialog.alertDialog('批量关闭', 'info', '关闭成功', null);
                        initDebugGrid();
                    }
                }
            });
        });
    }

    function closeViolation(e) {
        var selectRow = $(e).parents('tr');
        var selectObj = $('#grid').data('kendoGrid').dataItem(selectRow);
        Dialog.confirmDialog('关闭违规', 'warn', '确定关闭该条违规吗?', function (e) {
            var url = basePath + '/violationInfo/close.do';
            var params = { id: selectObj.id };
            $.ajax({
                async: false,
                type: 'POST',
                url: url,
                data: JSON.stringify(params),
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    initDebugGrid();
                }
            });
        });
    }
</script>