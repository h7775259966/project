<template>
    <div>
        <div class="bg-gray">
            <table class="tabsearch" cellspacing="0" cellpadding="0" width="100%">
                <tbody>
                    <tr>
                        <td class="lefttd" style="width: 120px;">
                            <label>统计方式选择：</label>
                        </td>
                        <td>
                            <label>
                                <input
                                    type="radio"
                                    name="options"
                                    value="1"
                                    onclick="selectSearchType(this);"
                                    checked
                                />
                                医疗机构
                            </label>
                            <label style="padding-left: 20px;">
                                <input
                                    type="radio"
                                    name="options"
                                    value="2"
                                    onclick="selectSearchType(this);"
                                /> 科室
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td class="lefttd">
                            <label>起止时间选择：</label>
                        </td>
                        <td colspan="3">
                            <span class="k-widget k-datetimepicker k-header" style="width: 220px;">
                                <span class="k-picker-wrap k-state-default">
                                    <input
                                        id="startTime"
                                        style="width: 100%;"
                                        data-role="datetimepicker"
                                        type="text"
                                        class="k-input"
                                        role="combobox"
                                        aria-expanded="false"
                                        autocomplete="off"
                                        aria-disabled="false"
                                    />
                                    <span unselectable="on" class="k-select">
                                        <span
                                            class="k-link k-link-date"
                                            aria-label="Open the date view"
                                        >
                                            <span
                                                unselectable="on"
                                                class="k-icon k-i-calendar"
                                                aria-controls="startTime_dateview"
                                            ></span>
                                        </span>
                                        <span
                                            class="k-link k-link-time"
                                            aria-label="Open the time view"
                                        >
                                            <span
                                                unselectable="on"
                                                class="k-icon k-i-clock"
                                                aria-controls="startTime_timeview"
                                            ></span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                            <span class="k-widget k-datetimepicker k-header" style="width: 220px;">
                                <span class="k-picker-wrap k-state-default">
                                    <input
                                        id="endTime"
                                        style="width: 100%;"
                                        data-role="datetimepicker"
                                        type="text"
                                        class="k-input"
                                        role="combobox"
                                        aria-expanded="false"
                                        autocomplete="off"
                                        aria-disabled="false"
                                    />
                                    <span unselectable="on" class="k-select">
                                        <span
                                            class="k-link k-link-date"
                                            aria-label="Open the date view"
                                        >
                                            <span
                                                unselectable="on"
                                                class="k-icon k-i-calendar"
                                                aria-controls="endTime_dateview"
                                            ></span>
                                        </span>
                                        <span
                                            class="k-link k-link-time"
                                            aria-label="Open the time view"
                                        >
                                            <span
                                                unselectable="on"
                                                class="k-icon k-i-clock"
                                                aria-controls="endTime_timeview"
                                            ></span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td class="lefttd" style="width: 120px;">
                            <label>监管区域选择：</label>
                        </td>
                        <td style="width: 450px">
                            <span
                                title
                                class="k-widget k-dropdowntree"
                                unselectable="on"
                                role="listbox"
                                aria-haspopup="true"
                                aria-expanded="false"
                                tabindex="0"
                                aria-disabled="false"
                                style="width: 450px; background-color: white; border-style: none;"
                            >
                                <span
                                    unselectable="on"
                                    class="k-dropdown-wrap k-state-default"
                                    style="height: 30px;"
                                >
                                    <span unselectable="on" class="k-input">
                                        <span
                                            style="position:absolute;margin-top: 8px;margin-left: 10px;"
                                        >湖南省</span>
                                    </span>
                                    <span unselectable="on" class="k-select" aria-label="select">
                                        <span class="k-icon k-i-arrow-60-down"></span>
                                    </span>
                                </span>
                                <div
                                    id="orgModels"
                                    style="width: 450px; background-color: white; border-style: none; display: none;"
                                    data-role="dropdowntree"
                                ></div>
                            </span>
                        </td>
                    </tr>
                    <tr id="patientTr" style="display: none">
                        <td class="lefttd" style="width: 120px;">
                            <label>科室选择：</label>
                        </td>
                        <td colspan="2">
                            <div
                                class="k-widget k-dropdowntree"
                                unselectable="on"
                                title
                                role="listbox"
                                aria-activedescendant="7cae8e4d-e93d-4f48-a1c9-57337c0d88ed"
                                aria-haspopup="true"
                                aria-expanded="false"
                                aria-owns="fc521f48-07fd-46ae-b2d2-fe15247ac338_tagList"
                                tabindex="0"
                                aria-disabled="false"
                                style="width: 64%;"
                            >
                                <div class="k-multiselect-wrap k-floatwrap" unselectable="on">
                                    <ul
                                        role="listbox"
                                        unselectable="on"
                                        data-template="tagTemplate"
                                        data-bind="source: tags"
                                        class="k-reset"
                                        id="fc521f48-07fd-46ae-b2d2-fe15247ac338_tagList"
                                        data-stop="true"
                                    ></ul>
                                    <span unselectable="on" class="k-input k-readonly"></span>
                                </div>
                                <div
                                    id="patientModels"
                                    style="width: 64%; display: none;"
                                    data-role="dropdowntree"
                                    multiple="multiple"
                                ></div>
                            </div>
                        </td>
                    </tr>
                    <tr id="orgLevelTr">
                        <td class="lefttd" style="width: 120px;">
                            <label>机构级别选择：</label>
                        </td>
                        <td>
                            <div id="orgLevelDiv">
                                <input
                                    type="checkbox"
                                    name="orgLevelType"
                                    value="-1"
                                    style="margin-left: 10px"
                                    checked
                                    class="checkAll"
                                    id="checkAll"
                                />全部
                                <input
                                    type="checkbox"
                                    name="orgLevelType"
                                    style="margin-left: 10px"
                                    value="0"
                                    checked
                                    class="checknum"
                                    onchange="setAll()"
                                />其他
                                <input
                                    type="checkbox"
                                    name="orgLevelType"
                                    style="margin-left: 22px"
                                    value="1"
                                    checked
                                    class="checknum"
                                    onchange="setAll()"
                                />一级
                                <input
                                    type="checkbox"
                                    name="orgLevelType"
                                    style="margin-left: 22px"
                                    value="2"
                                    checked
                                    class="checknum"
                                    onchange="setAll()"
                                />二级
                                <input
                                    type="checkbox"
                                    name="orgLevelType"
                                    style="margin-left: 22px"
                                    value="3"
                                    checked
                                    class="checknum"
                                    onchange="setAll()"
                                />三级
                            </div>
                        </td>
                    </tr>

                    <tr id="dispositionTr">
                        <td class="lefttd" style="width: 120px;">
                            <label>处置方式选择：</label>
                        </td>
                        <td>
                            <div id="dispositionDiv">
                                <input
                                    type="radio"
                                    name="disposition"
                                    value="-1"
                                    style="margin-left: 10px"
                                    checked
                                />全部
                                <input
                                    type="radio"
                                    name="disposition"
                                    value="0"
                                    style="margin-left: 10px"
                                />集中处置
                                <input
                                    type="radio"
                                    name="disposition"
                                    value="1"
                                    style="margin-left: 22px"
                                />自行处置
                            </div>
                        </td>
                    </tr>

                    <tr id="modalityTr">
                        <td class="lefttd" style="width: 120px;">
                            <label>所有制选择：</label>
                        </td>
                        <td>
                            <div id="modalityDiv">
                                <input
                                    type="radio"
                                    name="modality"
                                    value="-1"
                                    style="margin-left: 10px"
                                    checked
                                />全部
                                <input
                                    type="radio"
                                    name="modality"
                                    value="0"
                                    style="margin-left: 10px"
                                />公立
                                <input
                                    type="radio"
                                    name="modality"
                                    value="1"
                                    style="margin-left: 22px"
                                />民营
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="lefttd" style="width: 120px;">
                            <label>医废类型选择：</label>
                        </td>
                        <td>
                            <div id="wasteTypeDiv">
                                <input
                                    type="checkbox"
                                    name="wasteType"
                                    value="-1"
                                    style="margin-left: 10px"
                                    id="checkAllType"
                                    class="checkAllType"
                                    checked
                                />
                                <span class="checkSpan">全部</span>
                                <input
                                    type="checkbox"
                                    name="wasteType"
                                    value="1"
                                    style="margin-left: 10px"
                                    class="checkType"
                                    onchange="setAllType()"
                                    checked
                                />
                                <span class="checkSpan">感染性</span>
                                <input
                                    type="checkbox"
                                    name="wasteType"
                                    value="2"
                                    style="margin-left: 10px"
                                    onchange="setAllType()"
                                    class="checkType"
                                    checked
                                />
                                <span class="checkSpan">损伤性</span>
                                <input
                                    type="checkbox"
                                    name="wasteType"
                                    value="3"
                                    style="margin-left: 10px"
                                    onchange="setAllType()"
                                    class="checkType"
                                    checked
                                />
                                <span class="checkSpan">药物性</span>
                                <input
                                    type="checkbox"
                                    name="wasteType"
                                    value="4"
                                    style="margin-left: 10px"
                                    onchange="setAllType()"
                                    class="checkType"
                                    checked
                                />
                                <span class="checkSpan">病理性</span>
                                <input
                                    type="checkbox"
                                    name="wasteType"
                                    value="5"
                                    style="margin-left: 10px"
                                    onchange="setAllType()"
                                    class="checkType"
                                    checked
                                />
                                <span class="checkSpan">化学性</span>
                            </div>
                        </td>
                        <td>
                            <div style="float: right;margin-right: 200px;">
                                <button class="btn btn-primary btn-sm" onclick="selectByDetail()">查询</button>
                                <button class="btn btn-primary btn-sm" onclick="exporReport(1)">统计报表</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div style="overflow-y: auto;overflow-x:hidden;max-height:600px;">
            <div id="detailShow">
                <div
                    id="detailGrid"
                    style="width: 100%; overflow-y: auto; min-height: 450px;"
                    data-role="grid"
                    class="k-grid k-widget k-display-block"
                >
                    <div class="k-grid-header" style="padding-right: 17px;">
                        <div class="k-grid-header-wrap k-auto-scrollable">
                            <table role="grid">
                                <colgroup>
                                    <col />
                                    <col />
                                    <col />
                                    <col />
                                    <col />
                                    <col />
                                    <col />
                                    <col />
                                    <col />
                                    <col />
                                    <col />
                                    <col />
                                    <col />
                                </colgroup>
                                <thead role="rowgroup">
                                    <tr role="row">
                                        <th
                                            scope="col"
                                            role="columnheader"
                                            data-field="patientName"
                                            aria-haspopup="true"
                                            rowspan="1"
                                            data-title="机构名称"
                                            data-index="0"
                                            id="0c24cede-c974-4b2f-9c23-7b791d63e0de"
                                            class="k-header"
                                        >机构名称</th>
                                        <th
                                            scope="col"
                                            role="columnheader"
                                            data-field="infectiousType"
                                            aria-haspopup="true"
                                            rowspan="1"
                                            data-title="感染性"
                                            data-index="1"
                                            id="a5a8bbe5-78e6-47dd-971e-615ccefea6a5"
                                            class="k-header"
                                        >感染性</th>
                                        <th
                                            scope="col"
                                            role="columnheader"
                                            data-field="infectiousCount"
                                            aria-haspopup="true"
                                            rowspan="1"
                                            data-title="感染数"
                                            data-index="2"
                                            id="c1785c89-fdb5-4cdd-9582-2081e71fbd51"
                                            class="k-header"
                                        >感染数</th>
                                        <th
                                            scope="col"
                                            role="columnheader"
                                            data-field="damageType"
                                            aria-haspopup="true"
                                            rowspan="1"
                                            data-title="损伤性"
                                            data-index="3"
                                            id="adc970bd-d229-4b79-bd93-4501cdcb68f3"
                                            class="k-header"
                                        >损伤性</th>
                                        <th
                                            scope="col"
                                            role="columnheader"
                                            data-field="damageCount"
                                            aria-haspopup="true"
                                            rowspan="1"
                                            data-title="损伤数"
                                            data-index="4"
                                            id="ac5883b6-2d59-4179-8c5b-c8e08909e33f"
                                            class="k-header"
                                        >损伤数</th>
                                        <th
                                            scope="col"
                                            role="columnheader"
                                            data-field="pathologyType"
                                            aria-haspopup="true"
                                            rowspan="1"
                                            data-title="病理性"
                                            data-index="5"
                                            id="d647cd92-6c8b-42c9-9d0f-3d48171ce7e0"
                                            class="k-header"
                                        >病理性</th>
                                        <th
                                            scope="col"
                                            role="columnheader"
                                            data-field="pathologyCount"
                                            aria-haspopup="true"
                                            rowspan="1"
                                            data-title="病理数"
                                            data-index="6"
                                            id="b3635de7-304a-47c7-86f0-9a291a24b078"
                                            class="k-header"
                                        >病理数</th>
                                        <th
                                            scope="col"
                                            role="columnheader"
                                            data-field="drugyType"
                                            aria-haspopup="true"
                                            rowspan="1"
                                            data-title="药物性"
                                            data-index="7"
                                            id="7bd654d4-4f9f-40c2-b1b2-d2bd8875ee09"
                                            class="k-header"
                                        >药物性</th>
                                        <th
                                            scope="col"
                                            role="columnheader"
                                            data-field="drugyCount"
                                            aria-haspopup="true"
                                            rowspan="1"
                                            data-title="药物数"
                                            data-index="8"
                                            id="ffcd10c8-357b-40ef-956b-9c74ab2dc711"
                                            class="k-header"
                                        >药物数</th>
                                        <th
                                            scope="col"
                                            role="columnheader"
                                            data-field="chemicalType"
                                            aria-haspopup="true"
                                            rowspan="1"
                                            data-title="化学性"
                                            data-index="9"
                                            id="6f147223-013c-46c1-aa2f-cbacd09c478b"
                                            class="k-header"
                                        >化学性</th>
                                        <th
                                            scope="col"
                                            role="columnheader"
                                            data-field="chemicalCount"
                                            aria-haspopup="true"
                                            rowspan="1"
                                            data-title="化学数"
                                            data-index="10"
                                            id="039d3932-fd7f-4c72-b062-94549746e882"
                                            class="k-header"
                                        >化学数</th>
                                        <th
                                            scope="col"
                                            role="columnheader"
                                            data-field="totalWeight"
                                            aria-haspopup="true"
                                            rowspan="1"
                                            data-title="合计重量"
                                            data-index="11"
                                            id="88d28d31-e50e-486f-b4a8-42f55fb03a9a"
                                            class="k-header"
                                        >合计重量</th>
                                        <th
                                            scope="col"
                                            role="columnheader"
                                            data-field="totalCount"
                                            aria-haspopup="true"
                                            rowspan="1"
                                            data-title="合计数目"
                                            data-index="12"
                                            id="2b0fb533-f392-44d7-9efc-8f3e4c7d24f7"
                                            class="k-header"
                                        >合计数目</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div class="k-grid-content k-auto-scrollable">
                        <table role="grid">
                            <colgroup>
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                                <col />
                            </colgroup>
                            <tbody role="rowgroup">
                                <tr data-uid="d3554b91-6e3f-4015-bb03-b8b5f4ffe98d" role="row">
                                    <td style="text-align: center;" class role="gridcell">合计</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                </tr>
                                <tr
                                    class="k-alt"
                                    data-uid="5585a28b-19ca-4710-b490-802fd436ff1c"
                                    role="row"
                                >
                                    <td style="text-align: center;" class role="gridcell">岳阳市</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                </tr>
                                <tr data-uid="035c03f9-02e5-4339-9d38-929b6c7f932b" role="row">
                                    <td style="text-align: center;" class role="gridcell">张家界市</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                </tr>
                                <tr
                                    class="k-alt"
                                    data-uid="a020ad87-e435-4bd4-bc22-8e43ffc0165d"
                                    role="row"
                                >
                                    <td style="text-align: center;" class role="gridcell">衡阳市</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                </tr>
                                <tr data-uid="7af70ddf-2443-4491-96e5-4119fbe0915b" role="row">
                                    <td style="text-align: center;" class role="gridcell">长沙市</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                    <td style="text-align: center;" class role="gridcell">0</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="k-pager-wrap k-grid-pager k-widget k-floatwrap" data-role="pager">
                        <a
                            aria-label="首页"
                            title="首页"
                            class="k-link k-pager-nav k-pager-first k-state-disabled"
                            data-page="1"
                            tabindex="-1"
                        >
                            <span class="k-icon k-i-arrow-end-left"></span>
                        </a>
                        <a
                            aria-label="上一页"
                            title="上一页"
                            class="k-link k-pager-nav k-state-disabled"
                            data-page="1"
                            tabindex="-1"
                        >
                            <span class="k-icon k-i-arrow-60-left"></span>
                        </a>
                        <ul class="k-pager-numbers k-reset">
                            <li class="k-current-page">
                                <span class="k-link k-pager-nav">1</span>
                            </li>
                            <li>
                                <span class="k-state-selected">1</span>
                            </li>
                        </ul>
                        <a
                            aria-label="下一页"
                            title="下一页"
                            class="k-link k-pager-nav k-state-disabled"
                            data-page="1"
                            tabindex="-1"
                        >
                            <span class="k-icon k-i-arrow-60-right"></span>
                        </a>
                        <a
                            aria-label="末页"
                            title="末页"
                            class="k-link k-pager-nav k-pager-last k-state-disabled"
                            data-page="1"
                            tabindex="-1"
                        >
                            <span class="k-icon k-i-arrow-end-right"></span>
                        </a>
                        <span class="k-pager-sizes k-label">
                            <span
                                title
                                class="k-widget k-dropdown k-header"
                                unselectable="on"
                                role="listbox"
                                aria-haspopup="true"
                                aria-expanded="false"
                                tabindex="0"
                                aria-owns
                                aria-live="polite"
                                aria-disabled="false"
                                aria-busy="false"
                                aria-activedescendant="d6f93155-a369-405e-84af-e6c3de6317d7"
                                style
                            >
                                <span unselectable="on" class="k-dropdown-wrap k-state-default">
                                    <span unselectable="on" class="k-input">30</span>
                                    <span unselectable="on" class="k-select" aria-label="select">
                                        <span class="k-icon k-i-arrow-60-down"></span>
                                    </span>
                                </span>
                                <select
                                    data-role="dropdownlist"
                                    style="display: none;"
                                    aria-label="30"
                                >
                                    <option value="30" selected="selected">30</option>
                                    <option value="50">50</option>
                                    <option value="40">40</option>
                                </select>
                            </span>条/页
                        </span>
                        <span class="k-pager-info k-label">共 5 条</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'weightstatistics',
    data() {
        return {};
    },
    components: {},
    computed: {},

    methods: {}
};
</script>


<style lang="less" scoped>

.bg-gray {
    background: #f9f9f9;
    padding: 3px;
}

table.tabsearch td {
    padding: 3px 5px;
    border: 1px solid #fff;
}

table.tabsearch td.lefttd {
    width: 80px;
    background: #f1f1f1;
}

.fontInfo {
    height: 30px;
}

.fontInfo span {
    line-height: 30px;
    font-size: 14px;
    display: block;
}

ul.list li {
    float: left;
    width: 50%;
    text-align: left;
    line-height: 25px;
    border: 1px solid #ddd;
}

ul.list li label {
    width: 52%;
    display: inline-block;
    font-weight: 400;
    border-right: 1px solid #ddd;
    padding-left: 5px;
    margin-right: 5px;
    line-height: 25px;
    margin-bottom: 0;
}

.table th {
    background-image: none, linear-gradient(to bottom, rgba(255, 255, 255, .45) 0, rgba(255, 255, 255, 0) 100%);
    background-position: 50% 50%;
    background-color: #f3f3f4;
}

.k-grid-content table tr.k-alt:hover, .k-grid tr:hover {
    /*background-image: none,linear-gradient(to bottom,rgba(215,209,206,0) 0,rgba(189,180,175,0) 100%) !important;*/
    background-color: #ebf4fe !important;
    color: #444;
}

.k-state-selected {
    background-color: #1581ff !important;
}


</style>
