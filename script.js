const categorys = document.querySelector('[data-categorys]')
const result = document.querySelector('[data-result]')

const getResults = async () => {
    const URL = './data.json'
    
    const response = await fetch(URL)
    const json = await response.json()

    return json
}

const Category = (category, score, icon, color) => {
    const element = document.createElement('div')
    element.classList.add('category')
    element.classList.add(color)

    const html = `
        <div class="category__label">
            <img class="category__icon" src=${icon} alt="Category ${category} icon"/>
            <span class="">${category}</span>
        </div>

        <p class="category__result"><strong>${score}</strong> / 100</p>
    `

    element.innerHTML = html

    return element
}

const showCategorys = (results) => {
    // const results = await getResults()

    results.forEach((result) => {
        categorys.appendChild(Category(result.category, result.score, result.icon, result.color))
    })
}

const showTotalScore = (results) => {
    const scores = results.map(result => result.score)
    const sum = scores.reduce((sum, score) => sum += score)

    const totalResult = (sum / 4)

    result.textContent = Math.round(totalResult)
}

const init = async () => {
    const results = await getResults()

    showCategorys(results)
    showTotalScore(results)
}   

init()