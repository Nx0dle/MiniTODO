// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "jquery"


function optionsAction() {
    let container = document.querySelectorAll('.opt-tg')
    let task_options = document.querySelectorAll('.options')
    let task_options_open = document.querySelectorAll('.options-open')

    container.forEach((e, index) => {
        e.addEventListener('mouseover', () => {
            task_options[index].style.display = 'flex'
        })
        e.addEventListener('mouseout', () => {
            task_options[index].style.display = 'none'
        })
    })

    task_options.forEach((e, index) => {
        let iter = 0
        e.addEventListener('click', () => {
            e.style.backgroundColor = 'lightgrey'
            task_options_open[index].style.display = 'flex'
            e.classList.remove('hover')
        })

        task_options_open[index].addEventListener('mouseover', () => {
            e.style.backgroundColor = 'lightgrey'
            task_options_open[index].style.display = 'flex'
            e.classList.remove('hover')
        })

        container[index].addEventListener('mouseout', () => {
            e.style.backgroundColor = 'transparent'
            task_options_open[index].style.display = 'none'
            e.classList.add('hover')
        })
    })
}

function addRemoveAction() {
    let add_sign = document.querySelectorAll('.add')
    let remove_sign = document.querySelectorAll('.remove')
    let add_outer_sign = document.querySelectorAll('.add_outer')
    let remove_outer_sign = document.querySelectorAll('.remove_outer')
    let dropdown = document.querySelectorAll('details')

    add_sign.forEach((e, index) => {
        e.addEventListener('click', () => {
            e.style.display = 'none'
            remove_sign[index].style.display = 'flex'
            add_sign[index].classList.remove('const-hover')
            remove_sign[index].classList.add('const-hover')
            dropdown[index].open = true
        })
    })

    remove_sign.forEach((e, index) => {
        e.addEventListener('click', () => {
            e.style.display = 'none'
            add_sign[index].style.display = 'flex'
            remove_sign[index].classList.remove('const-hover')
        })
    })

    add_outer_sign.forEach((e, index) => {
        e.addEventListener('click', () => {
            e.style.display = 'none'
            remove_outer_sign[index].style.display = 'flex'
            add_outer_sign[index].classList.remove('const-hover')
            remove_outer_sign[index].classList.add('const-hover')
        })
    })

    remove_outer_sign.forEach((e, index) => {
        e.addEventListener('click', () => {
            e.style.display = 'none'
            add_outer_sign[index].style.display= 'flex'
            remove_outer_sign[index].classList.remove('const-hover')
        })
    })
}

function gridAction() {
    let middle_panel  = document.querySelector('#middle-panel')
    let grid_system = document.querySelector('#main')
    let list_tg = document.querySelectorAll('#list_tg')

    $(list_tg).click(() => {
        middle_panel.style.display = 'flex'
        grid_system.style.gridTemplate = '1fr / 1fr 2fr'
    })
}

$(document).on('turbo:load', function(){

    let middle_panel  = document.querySelector('#middle-panel')

    optionsAction()
    addRemoveAction()
    gridAction()

    $(middle_panel).on('turbo:frame-render', () => {

        optionsAction()
        addRemoveAction()

        $('input[type=checkbox]').change(function() {
            $.ajax({
                url: '/main/' + $(this).attr('id').split('_')[1] + '/toggle',
                type: 'POST',
                dataType: 'json',
                success: function(response) {
                    console.log("success")
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status == 422) {
                        alert("Validation failed: " + jqXHR.responseText);
                    }
                }
            })
        })
        let task_completed = document.querySelectorAll('#middle-panel details .item input')

        task_completed.forEach((e) => {
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
    })
})