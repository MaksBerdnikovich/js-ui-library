import $ from "../core";

$.prototype.createCards = (response, wrapper) => {
    response.forEach(({id, title, completed}) => {
        let card = document.createElement('div')
        $(card).addClass('col-4', 'mb-4', completed)
        $(card).setAttr('data-card-item', '').setAttr('data-filter')
        card.innerHTML = `
             <div class="card">
                 <svg class="bd-placeholder-img card-img-top" width="100%" height="180">
                     <rect width="100%" height="100%" fill="#868e96"></rect>
                     <text x="50%" y="50%" fill="#dee2e6" dy=".5em" dx="-1.5em">Image</text>
                 </svg>
                 <div class="card-body">
                     <h5 class="card-title">Todo #${id}</h5>
                     <p class="card-text">${title}</p>
                 </div>
             </div>
        `;

        wrapper.append(card)
    })
}

$.prototype.filteredCards = function () {
    const btns = document.querySelectorAll('[data-cards-filter-item]')

    const activeBtn = (target) => {
        btns.forEach(btn => {
            $(btn).removeClass('active')
        })
        $(target).addClass('active')
    }

    const hideElements = (items) => {
        items.forEach(item => $(item).hide())
    }

    const showElements = (items) => {
        if (items) {
            items.forEach(item => $(item).show())
        }
    }

    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault()

            const target = e.target
            const mark = $(e.target).getAttr('data-cards-filter-item')
            const list = document.querySelectorAll(mark)
            const items = document.querySelectorAll('[data-card-item]')

            activeBtn(target)
            hideElements(items)
            showElements(mark !== '*' ? list : items)
        })
    })
}

$.prototype.sortingCards = function (){
    const btns = document.querySelectorAll('[data-cards-sorting-item]')
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault()

            const mark = $(e.target).getAttr('data-cards-sorting-item')
            const items = document.querySelectorAll('[data-card-item]')

            items.forEach((item, i) => {
                item.style.order = (mark === 'asc') ? i : items.length - i
            })
        })
    })
}

$.prototype.cards = function (offset = 6) {
    for (let i = 0; i < this.length; i++) {
        const data = `https://jsonplaceholder.typicode.com/todos`

        $().get(data)
            .then(res => this.createCards(res.slice(0, offset), this[i]))
            .catch(error => console.log(error))

        $('[data-cards-loadmore]').on('click', (e) => {
            e.preventDefault()
            const itemsCount = $('[data-card-item]').length

            $().get(data)
                .then(res => {
                    this.createCards(res.slice(itemsCount, itemsCount + offset), this[i])

                    if (itemsCount + offset >= res.length) {
                        $(e.target).closest('div.row').remove()
                    }
                })
                .catch(error => console.log(error))
                .finally( () => {
                    $('[data-cards-filter-item="*"]').click()
                    $('[data-cards-sorting-item="asc"]').click()
                })
        })

        this.filteredCards()
        this.sortingCards()
    }
}

$('[data-cards]').cards()