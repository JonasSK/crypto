<template>
	<div id="app">
		<form @submit.prevent="addCoin(selectedCoin)">
			<div class="field has-addons">
				<div class="control">
					<div class="select">
						<select v-model="selectedCoin" required>
							<option value="">Track coin</option>
							<option v-for="item in coins" :key="item.id" :value="item">{{item.name}} ({{item.symbol}})</option>
						</select>
					</div>
				</div>
				<div class="control">
					<button type="submit" class="button is-primary">Add</button>
				</div>
			</div>
		</form>

		<table class="table">
			<thead>
				<tr>
					<th>Rank</th>
					<th>Name</th>
					<th>Symbol</th>
					<th>Price USD</th>
					<th>Price BTC</th>
					<th>1h</th>
					<th>24h</th>
					<th>7d</th>
					<th></th>
				</tr>
			</thead>
			<tr v-for="item in visibleCoins" :key="item.id">
				<td>{{item.rank}}</td>
				<td>{{item.name}}</td>
				<td>{{item.symbol}}</td>
				<td>${{item.price_usd.toLocaleString()}}</td>
				<td>฿{{item.price_btc.toLocaleString()}}</td>
				<td :class="percentageClassName(item.percent_change_1h)">{{item.percent_change_1h}}%</td>
				<td :class="percentageClassName(item.percent_change_24h)">{{item.percent_change_24h}}%</td>
				<td :class="percentageClassName(item.percent_change_7d)">{{item.percent_change_7d}}%</td>
				<td>
					<a class="delete" @click="removeCoin(item)"></a>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
import api from "./api";

export default {
	name: "app",
	data() {
		return {
			coins: [],
			myCoins: [],
			selectedCoin: ""
		};
	},

	methods: {
		percentageClassName(number) {
			return number < 0 ? "has-text-danger" : "has-text-success";
		},

		addCoin(coin) {
			const id = coin.id;
			if (this.myCoins.indexOf(id) < 0) {
				this.myCoins.push(id);
			}

			this.saveMyCoins();
		},

		removeCoin(coin) {
			const id = coin.id;
			const index = this.myCoins.indexOf(id)
			if (index > -1) {
				this.myCoins.splice(index, 1);
			}

			this.saveMyCoins();
		},

		saveMyCoins() {
			localStorage.setItem("myCoins", JSON.stringify(this.myCoins));
		}
	},

	computed: {
		visibleCoins() {
			return this.coins.filter(x => {
				return this.myCoins.indexOf(x.id) > -1;
			})
		}
	},

	async created() {
		const myCoins = localStorage.getItem("myCoins");
		if (myCoins) {
			this.myCoins = JSON.parse(myCoins);
		}

		try {
			const coins = await api.getAllCoins();
			this.coins = coins;
		} catch (err) {
			this.error = err;
		}
	}
};
</script>
