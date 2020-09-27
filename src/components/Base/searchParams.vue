<template>
	<div>
		<div class="search_form_container" :style="{width:seachWidth + 'px'}">
			<template v-for="(item, index) in isTime">
				<el-date-picker :key="index" v-model="paramsEntity[item.prop]" type="datetime" value-format="yyyy-MM-dd" :placeholder="'选择'+item.label" />
			</template>
			<el-select v-model="selectSearchParams" @change="searchParamsPropChange" class="search_pre_select"
				popper-class="ali_compatible">
				<el-option v-for="param in notTime" :key="param.prop" :label="param.label" :value="param.prop"></el-option>
			</el-select>
			
			<template v-if="currentSearchParamsItem !== null">
				<el-input class="param_form" v-if="currentSearchParamsItem.type === 'input'" v-model="paramsEntity[currentSearchParamsItem.prop]" clearable
					:placeholder="currentSearchParamsItem.placeholder || `请输入${currentSearchParamsItem.label}`"></el-input>
				<el-select class="param_form" v-if="currentSearchParamsItem.type === 'select'" v-model="paramsEntity[currentSearchParamsItem.prop]"
					:placeholder="currentSearchParamsItem.placeholder || `请选择${currentSearchParamsItem.label}`">
						<el-option v-for="option in currentSearchParamsItem.options" :key="option.value"
						:label="option.label" :value="option.value"></el-option>
				</el-select>
				<el-date-picker
						v-if="currentSearchParamsItem.type === 'datetime'"
						v-model="paramsEntity[currentSearchParamsItem.prop]"
						type="datetime"
      					value-format="yyyy-MM-dd"
						placeholder="选择日期时间">
				</el-date-picker>
			</template>
			
			<el-button type="primary" size="small" class="el-icon-search" @click="search"></el-button>
		</div>
		<span class="reset" v-show="allSearchParamsTags.length > 0" @click="resetParamsEntity">重置</span>
		<el-tag
			class="tag_container"
			:type="selectSearchParams === tag.prop ? 'danger' : ''"
			v-for="tag in allSearchParamsTags"
			:key="tag.prop"
			closable size="mini"
			:disable-transitions="false"
			@close="closeTag(tag)"
			@click="clickTag(tag)">
			{{tag.label}}
		</el-tag>
	</div>
</template>

<script>
export default {
	name: 'search-params',
	props: {
		multipleLine: {
			type: Boolean,
			default: false,
		},
		params: {
			type: Array,
			default: () => []
		},
		seachWidth: {
			type: Number,
			default: 800
		}
	},
	data () {
		return {
			paramsEntity: {},
			selectSearchParams: '',
			currentSearchParamsItem: null,
			allSearchParamsTags: [],
			pickerOptions: {
          	shortcuts: [{
					text: '最近一周',
					onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
					picker.$emit('pick', [start, end]);
					}
				}, {
					text: '最近一个月',
					onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
					picker.$emit('pick', [start, end]);
					}
				}, {
					text: '最近三个月',
					onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
					picker.$emit('pick', [start, end]);
					}
				}]
        	},
		};
	},
	mounted() {
		this.selectSearchParams = this.params.length > 0 ? this.params[0].prop : '';
		this.filterParamsItem(this.selectSearchParams);
	},
	computed: {
		isTime() {
			return this.params.filter(item => item.type === 'datetime')
		},
		notTime() {
			return this.params.filter(item => item.type !== 'datetime')
		}
	},
	methods: {
		searchParamsPropChange(prop) {
			this.filterParamsItem(prop);
		},
		filterParamsItem(prop) {
			const filterItem = this.params.filter(el => {
				return el.prop === prop;
			});
			this.currentSearchParamsItem = filterItem[0];
		},
		search () {
			let isNewSearchParams = true;
			for(let i = 0; i < this.allSearchParamsTags.length; i++) {
				if(this.allSearchParamsTags[i].prop === this.currentSearchParamsItem.prop) {
					this.allSearchParamsTags.splice(i, 1, this.currentSearchParamsItem);
					isNewSearchParams = false;
					break;
				}
			}
			(isNewSearchParams && this.judgeAddSearchParams()) && this.allSearchParamsTags.push(this.currentSearchParamsItem);
			this.structParmasChange();
		},
		judgeAddSearchParams() {
			const propVal = this.paramsEntity[this.currentSearchParamsItem.prop];
			if(this.paramsEntity.hasOwnProperty(this.currentSearchParamsItem.prop) && (propVal !== '' && propVal !== null)) {
				return true;
			}
			return false;
		},
		structParmasChange() {
			this.$emit('change', this.paramsEntity);
		},
		clickTag(tag) {
			this.currentSearchParamsItem = tag;
			this.selectSearchParams = tag.prop;
		},
		closeTag(tag) {
			for(let i = 0; i < this.allSearchParamsTags.length; i++) {
				if(this.allSearchParamsTags[i].prop === tag.prop) {
					this.$delete(this.paramsEntity, [tag.prop]);
					this.allSearchParamsTags.splice(i, 1);
					this.structParmasChange();
					break;
				}
			}
		},
		resetParamsEntity () {
			this.allSearchParamsTags = [];
			this.paramsEntity = {};
			this.structParmasChange();
		}
	},
};
</script>

<style lang="less" scoped>
	.param_form {
		flex: 1;
	}
	.search {
		float: left;
	}
	.search_form_container {
		display: flex;
		align-items: center;
		justify-content: center;
		.search_pre_select{
			width: 100px;
		}
		.el-input + .e_button:first-of-type,.el-select + .e_button:first-of-type {
			margin-left: 0;
		}
	}
	.tag_container {
		margin-top: 4px;
		cursor: pointer;
	}
	.reset {
		padding: 2px 4px;
		margin-right: 2px;
		color: #fff;
		background-color: #4da2ec;
		cursor: pointer;
	}
</style>