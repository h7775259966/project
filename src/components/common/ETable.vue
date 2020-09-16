<template>
	<div ref="tbArea" class="tb">
		<!-- 操作搜索区域 -->
		<div class="operation">
			<div v-if="showOperation" class="operationArea">
				<slot name="operationArea"></slot>
			</div>
			<template v-if="showSearch">
				<search-params class="searchArea" @change="searchParamsChange" :params="searchParamsConf"></search-params>
			</template>
		</div>
		<!-- 表格区域 -->
		<el-table :data="tbData" ref="table">
			<el-table-column v-if="showSelectionCol" type="selection" width="50" fixed="left">
			</el-table-column>
			<el-table-column v-if="expand" type="expand">
				<template slot-scope="props">
					<slot name="expand" :rowData="props.row"></slot>
				</template>
			</el-table-column>
			<el-table-column v-for="col in tableCols" :key="col.prop" :prop="col.prop" :label="col.label"
			:width="col.width" :formatter="col.formatter">
				<template v-if="$scopedSlots[col.prop]" #default="scope">
					<slot :name="col.prop" :rowData="scope.row"></slot>
				</template>
			</el-table-column>
		</el-table>
		<!-- 页码 -->
		<el-pagination
			class="pagination"
			background
			layout="total, prev, pager, next"
			:current-page="currentPage"
			:page-size="pageSize"
			:total="total"
			@current-change="handlePageChange"
		></el-pagination>
	</div>
</template>

<script>
import SearchParams from '../Base/searchParams';
import request from '../../utils/request.js';
export default {
	name: 'ETable',
	components: {
		SearchParams
	},
	props: {
		showOperation: {
			type: Boolean,
			default: false
		},
		showSearch: {
			type: Boolean,
			default: true
		},
		showSelectionCol: {
			type: Boolean,
			default: false
		},
		initDataimmediately: {
			type: Boolean,
			default: true
		},
		expand: {
			type: Boolean,
			default: false
		},
		dataOrigin: {
			type: Object,
			default: () => {data: []}
		},
		tableCols: {
			type: Array,
			default: () => []
		},
		customSearchList: {
			type: Array,
			default: () => []
		},
		customTime: {
			type: Array,
			default: () => []
		},
	},
	data() {
		return {
			tbData: [],
			total: 0,
			currentPage: 1,
			pageSize: 10,
			staticTablePageData: [],
			filterTbDataParams: {}
		}
	},
	created() {
		this.$nextTick(() => {
			this.initDataimmediately && this.initData();
		});
	},
	computed: {
		searchParamsConf() {
			return this.customSearchList.length > 0 ? this.customSearchList : this.tableCols.filter(el => el.search) || [];
			return this.customTime.length > 0 ? this.customSearchList : this.tableCols.filter(el => el.search) || [];
		}
	},
	methods: {
		searchParamsChange(val) {
			this.$set(this, 'filterTbDataParams', val);
			this.currentPage = 1;
			this.queryTableData();
		},
		generateQueryParams (method = 'get') {
			let params = JSON.parse(JSON.stringify(this.dataOrigin.params ? this.dataOrigin.params : {}));
			Object.assign(params, this.filterTbDataParams || {});
			if (method.toLowerCase() === 'get') {
				return {params:params};
			} else {
				return {data: params};
			}
		},
		initData () {
			if (this.dataOrigin.hasOwnProperty('data')) {
				this.staticPageChange();
				this.tbData = this.staticTablePageData;
				this.total = this.dataOrigin.data.length;
				this.selectRows();
				return;
			}
			this.queryTableData();
		},
		queryTableData () {
			let loading;
			if (this.$refs.tbArea) {
				loading = this.$loading({
					target: this.$refs.tbArea
				});
			}
			const actionAndParams = this.generateFetchTbDataOption();
			request(actionAndParams).then(res => {
				this.tbData = res.queryResult.list || [];
				this.total = res.queryResult.total;
			}).finally(() => {
				loading && loading.close();
			}).catch(err => {
				loading && loading.close();
			});
		},
		generateFetchTbDataOption () {
			let {url, method = 'get'} = this.dataOrigin;
			return {
				url: url + `${this.currentPage}/${this.pageSize}`,
				method,
				...this.generateQueryParams(method)
			};
		},
		staticPageChange () {
			this.staticTablePageData = this.dataOrigin.data.slice((this.currentPage - 1)*this.pageSize, this.currentPage*this.pageSize);
		},
		handlePageChange(page) {
			this.currentPage = page;
			this.queryTableData();
		}
	}
}
</script>

<style lang="less" scoped>
.tb {
	background: #fff;
	padding: 15px;
	.operation {
		margin-bottom: 10px;
		overflow: hidden;
		.operationArea {
			float: left;
		}
		.searchArea {
			float: right;
		}
	}
	.pagination {
		text-align: right;
	}
}
</style>
