// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "jquery"

window.addEventListener('DOMContentLoaded', () => {

    let l_panel = document.querySelector('#left-panel')
    let m_panel = document.querySelector('#middle-panel')
    let r_panel = document.querySelector('#right-panel')

    let collapse = document.querySelector('span.collapse')

    collapse.addEventListener('click', () => {
        r_panel.style.display = 'none'
        document.body.style.gridTemplate = '1fr / 1fr 4fr'
    })

    let task_completed = document.querySelectorAll('details .item input')

    task_completed.forEach( (e) => {
        e.addEventListener('change', () => {
            if (e.checked) {
                e.parentElement.classList.add('done')
            }

            if (!e.checked) {
                e.parentElement.classList.remove('done')
                e.parentElement.classList.remove('const-done')
            }

        })
        if (e.checked) {
            e.parentElement.classList.add('const-done')
        }

        if (!e.checked) {
            e.parentElement.classList.remove('done')
            e.parentElement.classList.remove('const-done')
        }
    })

    let grid = document.querySelector('span.grid')
    let iterView = 0

    grid.addEventListener('click', () => {
        iterView++
        if (iterView % 2 === 0) {
            let mid_panel_grid = document.querySelector('#middle-panel .lists')
            mid_panel_grid.style.display = 'grid'
            mid_panel_grid.style.gridTemplate = '1fr 1fr 1fr / 1fr 1fr 1fr'
        }
        else {
            let mid_panel_grid = document.querySelector('#middle-panel .lists')
            mid_panel_grid.style.display = 'flex'
        }
    })
})