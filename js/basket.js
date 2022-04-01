let container = document.querySelector('.row')
let basketList = document.querySelector('.cart-wrapper')
let basketCartEmpty = document.querySelector('.alert-secondary')
// counter on the card
container.addEventListener('click', (event) => {
	let cartItem = document.querySelectorAll('.cart-item')
	// counter-plus
	if (event.target.dataset.action == 'plus') {
		event.target.previousElementSibling.textContent = +event.target.previousElementSibling.textContent + 1
		resultItems()
	}
	// counter-minus
	if (event.target.dataset.action == 'minus') {
		if (+event.target.nextElementSibling.textContent == 1) {
			event.target.nextElementSibling.textContent = 1
			resultItems()
			if (event.target.closest('.cart-wrapper')) {
				console.log('IN CART!!!!');
				event.target.closest('.cart-item').remove();

				resultItems()
			}
		}
		else {
			event.target.nextElementSibling.textContent = +event.target.nextElementSibling.textContent - 1
			resultItems()
		}
	}
	basketCartEmpty.classList.add('none')
	// add item to the basket
	let name = event.target.parentElement.children[0].textContent;
	let price = event.target.previousElementSibling.children[1].children[1].textContent
	let weight = event.target.previousElementSibling.children[1].children[0].textContent
	let currentCounter = event.target.previousElementSibling.children[0].children[1].textContent
	let imgSrc = event.target.parentElement.previousElementSibling.src

	if (event.target.classList.contains('btn-block')) {
		for (let i = 0; i < cartItem.length; i++) {
			if (cartItem[i].children[0].children[1].children[0].textContent == name) {
				cartItem[i].children[0].children[1].children[2].children[0].children[1].textContent = +cartItem[i].children[0].children[1].children[2].children[0].children[1].textContent + 1
				resultItems()
				return
			}
		}
		basketList.insertAdjacentHTML('beforeend', `<div class="cart-item" data-id="02">
		<div class="cart-item__top">
			<div class="cart-item__img">
				<img src="${imgSrc}" alt="">
			</div>
			<div class="cart-item__desc">
				<div class="cart-item__title">${name}</div>
				<div class="cart-item__weight">6 шт. / ${weight}</div>

				 <!-- // cart-item__details  -->
				<div class="cart-item__details">

					<div class="items items--small counter-wrapper">
						<div class="items__control minusItem" data-action="minus">-</div>
						<div class="items__current" data-counter="">${currentCounter}</div>
						<div class="items__control" data-action="plus">+</div>
					</div>

					<div class="price">
						<div class="price__currency">${price}</div>
					</div>

				</div>
				 <!-- // cart-item__details  -->

			</div>
		</div>
	</div>`)




		let currentCartItems = document.querySelectorAll('.cart-item')
		let cardBody = document.querySelector('.basketCard-body')
		if (currentCartItems.length == 1 && cardBody.lastElementChild.id != 'order-form') {
			basketList.insertAdjacentHTML('afterend', `<div class="cart-total">
			<p><span class="h5">Доставка:</span> <span class="delivery-cost free">бесплатно</span> <br>
			<span class="small">Бесплатно при заказе от 600₽</span> </p>
			<p><span class="h5">Заказ на:</span> <span class="total-price">330</span> <span
					class="rouble">₽</span></p>
		</div> 
		<div id="order-form" class="card-body border-top">
						<h5 class="card-title">Оформить заказ</h4>
							<form>
								<div class="form-group">
									<input type="text" class="form-control" placeholder="Ваш номер телефона">
								</div>
								<button type="submit" class="btn btn-primary">Заказать</button>
							</form>
					</div>`)
		}
	}
	resultItems()
})

function resultItems() {
	let result = 0;
	let cardBody = document.querySelector('.basketCard-body')
	let resaltingItems = document.querySelectorAll('.cart-item')
	let deliveryCost = document.querySelector('.delivery-cost')
	let small = document.querySelector('.small')
	for (let i = 0; i < resaltingItems.length; i++) {
		let price = resaltingItems[i].children[0].children[1].children[2].children[1].children[0].textContent.slice(0, 3)
		let items = resaltingItems[i].children[0].children[1].children[2].children[0].children[1].textContent
		result += price * items
		if (result < 600) {
			deliveryCost.innerHTML = "250₽"
			deliveryCost.classList.add('total-price')
			small.classList.remove('none')
		}
		else {
			deliveryCost.innerHTML = 'бесплатно'
			deliveryCost.classList.remove('total-price')
			small.classList.add('none')

		}
	}
	cardBody.lastElementChild.previousElementSibling.children[1].children[1].textContent = result

}
let card = document.querySelector('.card')
card.addEventListener('click', (event) => {
	if (event.target.classList.contains('minusItem')) {
		console.log('asdsad')
	}
})

