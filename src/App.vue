<template>
  <div id="app">
	<!-- <div class="targetdiv">
		<p class="targetleft">{{targetLeft}}</p>/<p class="targetamount">{{targetAmount}}</p>
	</div> -->
	  <div class="wordbox">
		<el-input v-model="wordData.word" placeholder="单词" class="word"></el-input>
	  </div>
	<div class="operatbox">
		<div class="wordslice">
			<el-button @click="AddSlice">+</el-button>
			<el-button @click="RemoveSlice">-</el-button>
			<br>
			<div class="slice_box" v-for="(item,index) in wordData.wordslice"  :key="index">
				<el-input v-model="item.slice" class="slice" placeholder="词段"></el-input>
				<el-input v-model="item.explain" class="explain" placeholder="解析"></el-input>
				<br/>
			</div>
		</div>
		<div class="analysis">
			<el-button @click="AddAnalysis">+</el-button>
			<el-button @click="RemoveAnalysis">-</el-button>
			<br>
			<div class="analysisbox" v-for="(item,index) in wordData.analysis" :key="index">
				<el-input v-model="item.str" class="analysis_item" placeholder="释义"></el-input>
			</div>
		</div>
		<div class="meaning">
			<el-button @click="AddMeaning()">+</el-button>
			<el-button @click="RemoveMeaning()">-</el-button>
			<br />
			<div class="meaning_box" v-for="(item,index) in wordData.meaning" :key="index">
				<el-input v-model="item.class" placeholder="词性" class="wordclass"></el-input>
				<el-input v-model="item.explain" placeholder="词义" class="wordmeaning"></el-input>
			</div>
		</div>
	</div>
	<div class="submitbox">
		<button @click="submitWord()">提交</button>
	</div>
	<div class="historybox">
		<div v-for="item in wordhistory" :key="item.id" class="historyitem">
			<p>{{ item.word }}</p>
		</div>
	</div>

  </div>
</template>

<script>
import insertPage from './components/insertPage.vue'
import {wordinsert,wordhistoryget,latestword} from './api/api.js'
export default {
  data(){
    return{
		wordData:{
			word:"",
			wordslice:[
				{
					slice:"",
					explain:""
				}
			],
			analysis:[
				{
					str:""
				}
			],
			meaning:[
				{
					class:"",
					explain:""
				}
			]
		},
		wordhistory:[],
		targetAmount:40,
		targetLeft:40
    }
  },
  methods:{
	AddSlice(){
		this.wordData.wordslice.push({
						slice:"",
						explain:""
					})
	},
	RemoveSlice(){
		this.wordData.wordslice.pop()
	},
	AddAnalysis(){
		this.wordData.analysis.push({
					str:""
				})
	},
	RemoveAnalysis(){
		this.wordData.analysis.pop()
	},
	AddMeaning(){
		this.wordData.meaning.push({
					class:"",
					explain:""
				})
	},
	RemoveMeaning(){
		this.wordData.meaning.pop()
	},
	submitWord(){	
		this.axios.post(wordinsert, this.wordData)
		.then(res => {
			  //请求成功，触发then中的函数
			})
		.catch(error =>
		  //请求失败，触发catch中的函数 可省略
		  console.log(error)
		)
		this.wordhistory.push({
			word:this.wordData.word
		})
		this.wordData={
			word:"",
			wordslice:[
				{
					slice:"",
					explain:""
				}
			],
			analysis:[
				{
					str:""
				}
			],
			meaning:[
				{
					class:"",
					explain:""
				}
			]
		}
	},
	getHistory(){
		let url=latestword
		this.axios.get(url)
		.then(res=>{
			console.log(res)
			this.wordhistory.push({
				word:"Last Word-----"+res.data[0].word
			})
		})
	}
},
  name: 'app',
  components: {
    insertPage
  },
  created() {
  	this.getHistory()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 20px;
}
.targetdiv{
	display: flex;
	align-items: center;
	justify-content: center;
}
.targetamount{
	font-weight: 700;
	font-size: 30px;
}
.targetleft{
	font-weight: 600;
	font-size: 25px;
	color: #c10000;
}
.wordbox{
	display: flex;
	align-items: center;
	justify-content: center;
}
.operatbox {
  display: flex;
  width: 100vw;
  margin-top: 2vh;
  margin-bottom: 2vh;
}

.wordslice {
	width: 70px;
	width: 35vw;
}

.slice_box {
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slice {
  width: 80px;
}

.analysis{
	width: 30vw;
}
.meaning_box{
	display: flex;
	
}
.submitbox{
	display: flex;
	align-items: center;
	justify-content: center;
}
.wordclass{
	width: 80px;
}
.historybox{
	display: flex;
	width: 100vw;
	flex-flow: wrap;
}
.historyitem{
	margin-left: 5px;
}
</style>
