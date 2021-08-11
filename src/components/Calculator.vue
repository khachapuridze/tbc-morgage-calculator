<template>
	<div class="bg-secondary">
		<div class="calculator container flex-box">
			<div class="calculator-title flex-box">
				<div class="percentage flex-center">
					<span>%</span>
				</div>
				<h2 class="tbc-bold font-24 uppercase">Mortgage Calculator</h2>
			</div>

			<div class="calculator-content">
				<div
					class="tabs"
					id="tabs"
					:style="{ transform: `translate3d(${-tabWidth}px, 0px, 0px)` }"
					:class="{ 'transform-mobile': selectedOption === 'loan' }"
				>
					<div
						class="tab tbc-bold"
						:class="{
							active: selectedOption === 'income',
						}"
						@click="changeCalculatorType('income')"
					>
						სესხზე დაყრდნობით
					</div>
					<div
						class="tab tbc-bold"
						:class="{
							active: selectedOption === 'loan',
						}"
						@click="changeCalculatorType('loan')"
					>
						According to the loan amount
					</div>
				</div>

				<!-- mobile swiper Calculator -->
				<swiper
					ref="calcSwiper"
					class="calcSwiper mobile-calcSwiper"
					:options="swiperOptions"
					:class="{ active2: selectedOption === 'loan' }"
				>
					<swiper-slide>
						<div class="content" :class="{ active: calculated }">
							<div class="desc tbc-medium">
								Calculate the amount of the loan will pay off based on your
								income
							</div>

							<div class="calculator-inputs flex-box">
								<div class="relative input-label">
									<input
										type="number"
										class="br-6 font-14 calculator-input"
										:class="[{ validated: calculator.income }]"
										v-model="calculator.income"
									/>

									<label for="personal" class="font-14 placeholder"
										>Type Income</label
									>
									<div class="currencies">
										<div
											class="currency"
											v-for="item in currencies"
											:key="item.value"
											:class="{ active: selectedCurrency === item.value }"
											@click="selectedCurrency = item.value"
										>
											{{ item.label }}
										</div>
									</div>
								</div>

								<div class="relative input-label">
									<div class="br-6 font-14 calculator-input" />

									<label for="personal2" class="font-14 placeholder"
										>Select the term in years:</label
									>
									<div
										class="year-choice"
										@click="openDropdown = !openDropdown"
									>
										<div class="selected-option">{{ selectedYear }}</div>

										<div
											class="dropdown-options"
											:class="{ open: openDropdown }"
										>
											<div
												class="option-item"
												v-for="item in years"
												:key="item.value"
												@click="selectItem(item.value)"
											>
												{{ item.label }}
											</div>
										</div>
									</div>
								</div>

								<div
									class="calculate-button animated-link flex-center"
									@click="calculate"
									:class="{ disabled: calculated }"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 14 14"
									>
										<path
											id="Combined_Shape_Copy_2"
											data-name="Combined Shape Copy 2"
											d="M6.175,13.658a1.167,1.167,0,0,1,0-1.65l3.842-3.842H1.166a1.167,1.167,0,0,1,0-2.334h8.85L6.175,1.992A1.167,1.167,0,0,1,7.825.342l5.834,5.833.02.021.01.01.01.01.012.013.007.008.013.015.005.006.014.017,0,.005.014.018,0,0,.013.018,0,0,.013.018,0,.006.012.018,0,.007.01.016.005.009.008.014.007.012.006.011.009.016,0,.007.011.021v0a1.166,1.166,0,0,1-.24,1.359L7.825,13.658a1.167,1.167,0,0,1-1.65,0Z"
											transform="translate(0 0)"
											fill="#ffffff"
										/>
									</svg>
									<span class="uppercase">calculate</span>
								</div>
							</div>

							<div class="success-step" :class="{ active: calculated }">
								<div class="row">
									<div class="payment-label">Payment in Month</div>
									<div class="amount font-55 tbc-bold">
										589
										{{
											selectedCurrency === 'gel'
												? '₾'
												: selectedCurrency === 'eur'
												? '€'
												: '$'
										}}
									</div>
									<div
										class="calculate-button get-it-today animated-link flex-center"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="14"
											height="14"
											viewBox="0 0 14 14"
										>
											<path
												id="Combined_Shape_Copy_2"
												data-name="Combined Shape Copy 2"
												d="M6.175,13.658a1.167,1.167,0,0,1,0-1.65l3.842-3.842H1.166a1.167,1.167,0,0,1,0-2.334h8.85L6.175,1.992A1.167,1.167,0,0,1,7.825.342l5.834,5.833.02.021.01.01.01.01.012.013.007.008.013.015.005.006.014.017,0,.005.014.018,0,0,.013.018,0,0,.013.018,0,.006.012.018,0,.007.01.016.005.009.008.014.007.012.006.011.009.016,0,.007.011.021v0a1.166,1.166,0,0,1-.24,1.359L7.825,13.658a1.167,1.167,0,0,1-1.65,0Z"
												transform="translate(0 0)"
												fill="#ffffff"
											/>
										</svg>
										<span class="uppercase">GET IT TODAY</span>
									</div>
								</div>
								<div class="row">
									<div class="loan-info">
										<div class="info-row">
											<p>Term:</p>
											<p>12 Month</p>
										</div>
										<div class="info-row">
											<p>Cost of collateral:</p>
											<p>50 000 ₾</p>
										</div>
										<div class="info-row">
											<p>Interest rate:</p>
											<p>8.4 %</p>
										</div>
										<div class="info-row">
											<p>Effective:</p>
											<p>10.3 %</p>
										</div>
										<div class="info-row">
											<p>Payment in Month:</p>
											<p>589 ₾</p>
										</div>
									</div>
									<div class="calculator-warning lh-24">
										The calculator is simulation and does not display accurate
										data. Please start the application for a customized offer.
									</div>
								</div>
							</div>
						</div>
					</swiper-slide>
					<swiper-slide>
						<div class="content" :class="{ active: calculated }">
							<div class="desc tbc-medium">
								Calculate the amount of the loan will pay off based on your
								income
							</div>

							<div class="calculator-inputs flex-box">
								<div class="relative input-label">
									<input
										type="number"
										class="br-6 font-14 calculator-input"
										:class="[{ validated: calculator.income }]"
										v-model="calculator.income"
									/>

									<label for="personal" class="font-14 placeholder"
										>Type Income</label
									>
									<div class="currencies">
										<div
											class="currency"
											v-for="item in currencies"
											:key="item.value"
											:class="{ active: selectedCurrency === item.value }"
											@click="selectedCurrency = item.value"
										>
											{{ item.label }}
										</div>
									</div>
									<!--              <div class="error-label font-12" :class="{error: hasPersonalNumberError && isClicked}">{{ !registration.personal_number ?  'Personal Number is Important' : registration.personal_number.length < 11 ? 'Personal Number Must be 11' : '' }}</div>-->
								</div>

								<div class="relative input-label">
									<div class="br-6 font-14 calculator-input" />

									<label for="personal2" class="font-14 placeholder"
										>Select the term in years:</label
									>
									<div
										class="year-choice"
										@click="openDropdown = !openDropdown"
									>
										<div class="selected-option">{{ selectedYear }}</div>

										<div
											class="dropdown-options"
											:class="{ open: openDropdown }"
										>
											<div
												class="option-item"
												v-for="item in years"
												:key="item.value"
												@click="selectItem(item.value)"
											>
												{{ item.label }}
											</div>
										</div>
									</div>
									<!--              <div class="error-label font-12" :class="{error: hasPersonalNumberError && isClicked}">{{ !registration.personal_number ?  'Personal Number is Important' : registration.personal_number.length < 11 ? 'Personal Number Must be 11' : '' }}</div>-->
								</div>

								<div
									class="calculate-button animated-link flex-center"
									@click="calculate"
									:class="{ disabled: calculated }"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 14 14"
									>
										<path
											id="Combined_Shape_Copy_2"
											data-name="Combined Shape Copy 2"
											d="M6.175,13.658a1.167,1.167,0,0,1,0-1.65l3.842-3.842H1.166a1.167,1.167,0,0,1,0-2.334h8.85L6.175,1.992A1.167,1.167,0,0,1,7.825.342l5.834,5.833.02.021.01.01.01.01.012.013.007.008.013.015.005.006.014.017,0,.005.014.018,0,0,.013.018,0,0,.013.018,0,.006.012.018,0,.007.01.016.005.009.008.014.007.012.006.011.009.016,0,.007.011.021v0a1.166,1.166,0,0,1-.24,1.359L7.825,13.658a1.167,1.167,0,0,1-1.65,0Z"
											transform="translate(0 0)"
											fill="#ffffff"
										/>
									</svg>
									<span class="uppercase">calculate</span>
								</div>
							</div>

							<div class="success-step" :class="{ active: calculated }">
								<div class="row">
									<div class="payment-label">Payment in Month</div>
									<div class="amount font-55 tbc-bold">
										589
										{{
											selectedCurrency === 'gel'
												? '₾'
												: selectedCurrency === 'eur'
												? '€'
												: '$'
										}}
									</div>
									<div
										class="calculate-button get-it-today animated-link flex-center"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="14"
											height="14"
											viewBox="0 0 14 14"
										>
											<path
												id="Combined_Shape_Copy_2"
												data-name="Combined Shape Copy 2"
												d="M6.175,13.658a1.167,1.167,0,0,1,0-1.65l3.842-3.842H1.166a1.167,1.167,0,0,1,0-2.334h8.85L6.175,1.992A1.167,1.167,0,0,1,7.825.342l5.834,5.833.02.021.01.01.01.01.012.013.007.008.013.015.005.006.014.017,0,.005.014.018,0,0,.013.018,0,0,.013.018,0,.006.012.018,0,.007.01.016.005.009.008.014.007.012.006.011.009.016,0,.007.011.021v0a1.166,1.166,0,0,1-.24,1.359L7.825,13.658a1.167,1.167,0,0,1-1.65,0Z"
												transform="translate(0 0)"
												fill="#ffffff"
											/>
										</svg>
										<span class="uppercase">GET IT TODAY</span>
									</div>
								</div>
								<div class="row">
									<div class="loan-info">
										<div class="info-row">
											<p>Term:</p>
											<p>12 Month</p>
										</div>
										<div class="info-row">
											<p>Cost of collateral:</p>
											<p>50 000 ₾</p>
										</div>
										<div class="info-row">
											<p>Interest rate:</p>
											<p>8.4 %</p>
										</div>
										<div class="info-row">
											<p>Effective:</p>
											<p>10.3 %</p>
										</div>
										<div class="info-row">
											<p>Payment in Month:</p>
											<p>589 ₾</p>
										</div>
									</div>
									<div class="calculator-warning lh-24">
										The calculator is simulation and does not display accurate
										data. Please start the application for a customized offer.
									</div>
								</div>
							</div>
						</div>
					</swiper-slide>
				</swiper>

				<!-- desktop version -->
				<div class="calc-content-wrapper">
					<div class="content" :class="{ active: calculated }">
						<div class="desc tbc-medium">
							Calculate the amount of the loan will pay off based on your income
						</div>

						<div class="calculator-inputs flex-box">
							<div class="relative input-label">
								<input
									type="number"
									class="br-6 font-14 calculator-input error"
									:class="[{ validated: calculator.income }]"
									v-model="calculator.income"
								/>

								<label for="personal" class="font-14 placeholder"
									>Type Income</label
								>
								<div class="placeholder error-message">error</div>
								<div class="currencies">
									<div
										class="currency"
										v-for="item in currencies"
										:key="item.value"
										:class="{ active: selectedCurrency === item.value }"
										@click="selectedCurrency = item.value"
									>
										{{ item.label }}
									</div>
								</div>
							</div>

							<div class="relative input-label">
								<div class="br-6 font-14 calculator-input" />

								<label for="personal2" class="font-14 placeholder"
									>Select the term in years:</label
								>
								<div class="year-choice" @click="openDropdown = !openDropdown">
									<div class="selected-option">{{ selectedYear }}</div>

									<div class="dropdown-options" :class="{ open: openDropdown }">
										<div
											class="option-item"
											v-for="item in years"
											:key="item.value"
											@click="selectItem(item.value)"
										>
											{{ item.label }}
										</div>
									</div>
								</div>
							</div>

							<div
								class="calculate-button animated-link flex-center"
								@click="calculate"
								:class="{ disabled: calculated }"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="14"
									height="14"
									viewBox="0 0 14 14"
								>
									<path
										id="Combined_Shape_Copy_2"
										data-name="Combined Shape Copy 2"
										d="M6.175,13.658a1.167,1.167,0,0,1,0-1.65l3.842-3.842H1.166a1.167,1.167,0,0,1,0-2.334h8.85L6.175,1.992A1.167,1.167,0,0,1,7.825.342l5.834,5.833.02.021.01.01.01.01.012.013.007.008.013.015.005.006.014.017,0,.005.014.018,0,0,.013.018,0,0,.013.018,0,.006.012.018,0,.007.01.016.005.009.008.014.007.012.006.011.009.016,0,.007.011.021v0a1.166,1.166,0,0,1-.24,1.359L7.825,13.658a1.167,1.167,0,0,1-1.65,0Z"
										transform="translate(0 0)"
										fill="#ffffff"
									/>
								</svg>
								<span class="uppercase">calculate</span>
							</div>
						</div>

						<div class="success-step" :class="{ active: calculated }">
							<div class="row">
								<div class="payment-label">Payment in Month</div>
								<div class="amount font-55 tbc-bold">
									589
									{{
										selectedCurrency === 'gel'
											? '₾'
											: selectedCurrency === 'eur'
											? '€'
											: '$'
									}}
								</div>
								<div
									class="calculate-button get-it-today animated-link flex-center"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 14 14"
									>
										<path
											id="Combined_Shape_Copy_2"
											data-name="Combined Shape Copy 2"
											d="M6.175,13.658a1.167,1.167,0,0,1,0-1.65l3.842-3.842H1.166a1.167,1.167,0,0,1,0-2.334h8.85L6.175,1.992A1.167,1.167,0,0,1,7.825.342l5.834,5.833.02.021.01.01.01.01.012.013.007.008.013.015.005.006.014.017,0,.005.014.018,0,0,.013.018,0,0,.013.018,0,.006.012.018,0,.007.01.016.005.009.008.014.007.012.006.011.009.016,0,.007.011.021v0a1.166,1.166,0,0,1-.24,1.359L7.825,13.658a1.167,1.167,0,0,1-1.65,0Z"
											transform="translate(0 0)"
											fill="#ffffff"
										/>
									</svg>
									<span class="uppercase">GET IT TODAY</span>
								</div>
							</div>
							<div class="row">
								<div class="loan-info">
									<div class="info-row">
										<p>Term:</p>
										<p>12 Month</p>
									</div>
									<div class="info-row">
										<p>Cost of collateral:</p>
										<p>50 000 ₾</p>
									</div>
									<div class="info-row">
										<p>Interest rate:</p>
										<p>8.4 %</p>
									</div>
									<div class="info-row">
										<p>Effective:</p>
										<p>10.3 %</p>
									</div>
									<div class="info-row">
										<p>Payment in Month:</p>
										<p>589 ₾</p>
									</div>
								</div>
								<div class="calculator-warning lh-24">
									The calculator is simulation and does not display accurate
									data. Please start the application for a customized offer.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['contentData', 'evenOdd'],
		computed: {
			calcSwiper() {
				return this.$refs.calcSwiper.$swiper;
			},
			tabWidth() {
				if (this.selectedOption === 'loan') {
					return document.getElementById('tabs').offsetWidth / 2.8;
				} else {
					return 0;
				}
			},
		},
		data() {
			const self = this;
			return {
				pTopDesktop: 89,
				pBottomDesktop: 144,
				pTopTablet: 89,
				pBottomTablet: 89,
				pTopMobile: 55,
				pBottomMobile: 89,
				calculator: {
					income: '',
				},
				selectedCurrency: 'gel',
				selectedYear: '1',

				selectedOption: 'income',
				openDropdown: false,
				years: [
					{
						value: '1',
						label: '1',
					},
					{
						value: '2',
						label: '2',
					},
					{
						value: '3',
						label: '3',
					},
					{
						value: '4',
						label: '4',
					},
					{
						value: '5',
						label: '5',
					},
				],
				ruleForm: {
					year: '1',
				},
				currencies: [
					{
						value: 'gel',
						label: '₾',
					},
					{
						value: 'usd',
						label: '$',
					},
					{
						value: 'eur',
						label: '€',
					},
				],
				calculated: false,
				swiperOptions: {
					speed: 850,
					watchOverflow: true,
					slidesPerView: 1,
					on: {
						slideChange(swiper) {
							switch (swiper.realIndex) {
								case 0:
									self.selectedOption = 'income';
									break;
								case 1:
									self.selectedOption = 'loan';
									break;
								default:
									self.selectedOption = 'income';
									break;
							}
						},
					},
				},
			};
		},

		methods: {
			calculate() {
				this.calculated = !this.calculated;
			},
			changeCalculatorType(type) {
				this.selectedOption = type;
				switch (type) {
					case 'income':
						this.calcSwiper.slideTo(0, 800, false);
						break;
					case 'loan':
						this.calcSwiper.slideTo(1, 800, false);
						break;
					default:
						this.calcSwiper.slideTo(0, 800, false);
						break;
				}
			},
			selectItem(val) {
				this.selectedYear = val;
				// this.openDropdown = false;
			},
		},
	};
</script>

<style scoped>
	.calculator {
		padding-top: 89px;
		padding-bottom: 144px;
	}
	.bg-secondary {
		background: var(--gray);
	}
	.relative {
		position: relative;
	}
	.input-label input:focus {
		outline: none;
	}
	.input-label .placeholder.error-message {
		top: unset;
		bottom: -25px;
		left: 5px;
		font-size: 12px;
		color: red;
	}
	.calc-content-wrapper {
		display: block;
	}
	.mobile-calcSwiper {
		display: none;
	}
	.modal-input p {
		color: #737373;
		margin-top: 21px;
	}
	.calculator-input {
		border: 1px solid #dadada;
		height: 60px;
		padding-left: 25px;
		padding-top: 15px;
		width: 100%;
		background: #f4f4f4;
		color: #333333;
	}

	body[data-theme='night'] .calculator-input {
		background-color: var(--gray);
		border: 1px solid var(--primary);
	}
	.input-label .placeholder {
		position: absolute;
		pointer-events: none;
		top: 50%;
		left: 26px;
		color: #737373;
		transform: translate(-0px, -50%);
		transition: 0.2s;
	}
	.input-label {
		max-width: 411px;
		/* margin-bottom: 30px; */
		width: 100%;
	}

	.relative.input-label.flex-between > div {
		width: 47%;
	}
	input.completed {
		pointer-events: none;
	}
	input.error {
		border: 1px solid red !important;
	}
	.error-label {
		color: red;
		position: absolute;
		bottom: -20px;
		opacity: 0;
		visibility: hidden;
		transition: 0.3s;
	}
	.error-label.error {
		opacity: 1;
		visibility: visible;
	}
	input:focus {
		border: 1px solid #00aeef;
	}
	input:focus + label,
	.validated + label {
		top: 25% !important;
		font-size: 12px;
		transform: translate(-0px, -15%) !important;
		transition: 0.2s;
	}

	.background {
		background-color: #f7f7f7;
		min-height: 726px;
		padding-top: 84px;
		padding-bottom: 100px;
		transition: 0.6s;
	}
	.calculator {
		flex-direction: column;
	}
	.calculator-title {
		align-items: center;
		margin-bottom: 32px;
	}
	.calculator-title h2 {
		margin-left: 17px;
	}
	.percentage {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background-color: #00aeef;
	}
	.percentage span {
		font-size: 24px;
		font-weight: 500;
		margin-top: 4px;
		color: #ffffff;
	}
	.tabs {
		display: flex;
		align-items: center;
		transform: translate3d(0px, 0px, 0px);
		transition: 850ms;
	}
	.tabs.transform-mobile {
		transform: unset;
	}
	.tabs .tab {
		padding: 16px 34px;
		text-transform: capitalize;
		color: #7d8a98;
		cursor: pointer;
		border-radius: 12px 12px 0 0;
		transition: 0.6s;
	}
	body[data-theme='night'] .tabs .tab.active {
		color: #ffffff;
	}
	.tabs .tab.active {
		background-color: var(--primary);
		color: #676767;
	}
	.calculator-content .content {
		background-color: var(--primary);
		border-radius: 0px 12px 12px 12px;
		padding: 34px;
		text-align: left;
	}
	.calcSwiper.active2 .content {
		border-top-right-radius: 0px;
	}
	.calculator-content .content .desc {
		margin-bottom: 34px;
	}
	.currencies {
		display: flex;
		position: absolute;
		top: 50%;
		right: 35px;
		transform: translate(0px, -50%);
	}
	.year-choice {
		position: absolute;
		top: 50%;
		right: 35px;
		transform: translate(0px, -50%);
		cursor: pointer;
	}
	.currencies .currency.active {
		background-color: #7d8a98;
		color: #ffffff;
	}
	.calculator-inputs .input-label:first-child {
		margin-right: 30px;
	}
	.calculate-button {
		background-color: #00aeef;
		height: 60px;
		padding: 0 40px;
		margin-left: 30px;
		border-radius: 6px;
		transition: 0.3s;
	}
	.calculate-button.disabled {
		background-color: #7d8a98;
	}

	.calculate-button span {
		color: #ffffff !important;
	}
	.currencies .currency {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 30px;
		height: 30px;
		cursor: pointer;

		color: #676767;
		background-color: transparent;
		border-radius: 50%;
		transition: background-color 0.6s ease;
	}
	.success-step {
		display: flex;
		opacity: 0;
		visibility: hidden;
		max-height: 0;
		margin-top: 0;
		transition: 0.6s ease;
	}
	.success-step.active {
		opacity: 1;
		max-height: 500px;
		visibility: visible;
		margin-top: 55px;
		transition: max-height 1s ease, opacity 0.6s ease 0.3s,
			margin-top 0.6s ease 0.1s;
	}
	.success-step .row:first-child {
		width: 411px;
		min-width: 411px;
		position: relative;
		text-align: left;
	}
	.success-step .row:last-child {
		padding-left: 35px;
	}
	.success-step .row:first-child:after {
		content: '';
		position: absolute;
		right: 0;
		top: 0;
		width: 1px;
		height: 100%;
		border-radius: 12px;
		background-color: #7d8a98;
	}
	.success-step .payment-label {
		color: #676767;
	}
	body[data-theme='night'] .success-step .payment-label {
		color: #ffffff;
	}
	body[data-theme='night'] .calculator-warning {
		color: #989898;
	}

	.success-step .amount {
		color: #00aeef;
		margin-top: 18px;
		margin-bottom: 31px;
	}
	.success-step .get-it-today {
		background: linear-gradient(
			to right,
			#26dffe 0%,
			#21cdf5 30%,
			#0c81d3 75%,
			#015bc1 100%
		);
		max-width: 225px;
		margin-left: 0;
		height: 48px;
	}
	.loan-info .info-row {
		display: flex;
	}
	.loan-info .info-row:not(:first-child) {
		margin: 8px 0;
	}
	.loan-info .info-row p:last-child {
		color: #00aeef;
		margin-left: 10px;
	}
	.calculator-warning {
		margin-top: 20px;
		color: #575757;
		text-align: left;
	}
	@media (max-width: 1299px) {
		.input-label .placeholder {
			max-width: 100px;
		}
	}
	@media (min-width: 415px) {
		.tabs.transform-mobile {
			transform: translate3d(-75px, 0px, 0px) !important;
		}
	}
	@media (min-width: 768px) {
		.tabs.transform-mobile {
			transform: unset !important;
		}
	}
	@media (max-width: 1023px) {
		.calculator {
			padding-top: 89px;
			padding-bottom: 89px;
		}
		.calculator-inputs {
			flex-wrap: wrap;
			justify-content: space-between;
		}
		.input-label {
			margin-bottom: 30px;
		}
		.calc-background {
			min-height: 610px;
		}
	}
	@media (max-width: 810px) {
		.calculator-inputs .calculate-button {
			margin-left: 0;
		}
	}
	@media (max-width: 767px) {
		.calc-content-wrapper {
			display: none;
		}
		.tabs.transform-mobile {
			transform: translate3d(-75px, 0px, 0px);
		}
		.mobile-calcSwiper {
			display: block;
		}
		.input-label {
			max-width: 47%;
			margin-bottom: 33px;
		}
		.calculator-inputs .calculate-button {
			width: 100%;
		}
		.success-step .row:first-child {
			min-width: 50%;
		}
		.calculator-inputs .calculate-button {
			margin-left: 0;
		}
		.success-step .amount {
			margin-top: 25px;
			margin-bottom: 35px;
		}
		.input-label .placeholder {
			max-width: 100px;
		}
	}
	@media (max-width: 767px) {
		.calculator-content {
			overflow: hidden;
		}
		.calculator {
			padding-top: 55px;
			padding-bottom: 89px;
		}
		.success-step .amount {
			margin-top: 11px;
			margin-bottom: 20px;
		}
		.input-label {
			max-width: unset;
		}
		.success-step {
			flex-direction: column;
			position: relative;
		}
		.calculator-inputs .input-label:first-child {
			margin-right: 0;
		}

		.success-step .row:last-child {
			padding-left: unset;
			margin-bottom: 70px;
		}
		.success-step .row:first-child {
			position: unset;
		}
		.success-step .row:first-child:after {
			content: unset;
		}
		.success-step .get-it-today {
			position: absolute;
			bottom: 0px;
		}
		.tabs {
			width: max-content;
			overflow: visible;
		}
		.tabs .tab {
			min-width: 260px;
			padding: 0 34px;
			height: 48px;
			display: flex;
			align-items: center;
		}
	}
	@media (max-width: 550px) {
		.calculator-content .content {
			padding: 20px 16px;
		}
		.year-choice {
			right: 16px;
		}
		.input-label .placeholder {
			left: 16px;
			max-width: 100px;
		}
	}
</style>

<style>
	/* gloabal styles for elemnt ui dropdown */
	.calculator .year-choice {
		height: 34px;
		border-radius: 6px;

		min-width: 100px;
		display: flex;
		align-items: center;
		padding: 0 20px;
		border: 1px solid var(--border);
	}
	.dropdown-options::-webkit-scrollbar {
		width: 4px;
		background: transparent;
		border-radius: 4px;
		border-left: 1px solid transparent;
		border-right: 1px solid transparent;
		background-clip: padding-box;
	}

	.dropdown-options::-webkit-scrollbar-thumb {
		background: linear-gradient(
			to bottom,
			#26dffe 0%,
			#21cdf5 30%,
			#0dbff4 75%,
			#00aeef 100%
		);
		border-radius: 4px;
		border-left: 1px solid transparent;
		border-right: 1px solid transparent;
	}
	.calculator .year-choice .dropdown-options {
		position: absolute;
		top: 40px;
		min-width: 100px;
		padding: 0 20px;
		left: 0;
		background: var(--order-kit-inputs);
		border: 1px solid var(--border);
		opacity: 0;
		visibility: hidden;
		max-height: 200px;
		overflow: auto;
		transition: 0.6s ease;
	}
	.calculator .year-choice .dropdown-options.open {
		opacity: 1;
		visibility: visible;
	}
	.year-choice .option-item {
		padding: 10px 0px;
	}
	.calculator .form-col.form-col-left {
		width: 100%;
	}
	@media (max-width: 767px) {
		.calculator .year-choice .dropdown-options {
			max-height: 80px;
			overflow: auto;
		}
	}
</style>
