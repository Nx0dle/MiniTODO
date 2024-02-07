// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "jquery"

Turbo.StreamActions.action_assign = function() {
    optionsAction()
    addRemoveAction()
    taskAction()
    mainAction()
    gridAction()
}

function taskAction() {
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
}

function mainAction() {
    let action = document.querySelectorAll('.action-more')
    let action_open = document.querySelectorAll('.action-more-open')

        action.forEach((e, index) => {
            $(e).click(() => {
                e.style.backgroundColor = 'lightgrey'
                action_open[index].style.display = 'flex'
                e.classList.remove('hover')
            })

            $(action_open[index]).mouseover(() => {
                e.style.backgroundColor = 'lightgrey'
                action_open[index].style.display = 'flex'
                e.classList.remove('hover')
            })

            $(e).mouseout(() => {
                e.style.backgroundColor = 'transparent'
                action_open[index].style.display = 'none'
                e.classList.add('hover')
            })
        })
}

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
    let right_panel = document.querySelector('#right-panel')
    let grid_system = document.querySelector('#main')
    let list_tg = document.querySelectorAll('#list_tg')
    let task_tg = document.querySelectorAll('#task_tg')
    let collapse_right_panel = document.querySelector('.collapse-r-p')
    let collapse_middle_panel = document.querySelector('.collapse-m-p')

    let midView = window.matchMedia("(max-width: 1000px)")

    $(list_tg).click(() => {
        middle_panel.style.display = 'flex'
        if (right_panel.style.display === 'flex' && midView.matches) {
            grid_system.style.gridTemplate = '1fr 2fr 2fr / 1fr'
        }
        else if (midView.matches) {
            grid_system.style.gridTemplate = '1fr 2fr / 1fr'
        }
        else if (right_panel.style.display === 'flex') {
            grid_system.style.gridTemplate = '1fr / 1fr 2fr 2fr'
        }
        else {
            grid_system.style.gridTemplate = '1fr / 1fr 2fr'
        }
    })

    $(task_tg).click(() => {
        right_panel.style.display = 'flex'
        if (midView.matches) {
            grid_system.style.gridTemplate = '1fr 2fr 2fr / 1fr'
        }
        else {
            grid_system.style.gridTemplate = '1fr / 1fr 2fr 2fr'
        }
    })

    $(collapse_right_panel).click(() => {
        right_panel.style.display = 'none'
        if (middle_panel.style.display === 'flex' && midView.matches) {
            grid_system.style.gridTemplate = '1fr 2fr / 1fr'
        }
        else if (midView.matches) {
            grid_system.style.gridTemplate = '1fr / 1fr'
        }
        else if (middle_panel.style.display === 'flex') {
            grid_system.style.gridTemplate = '1fr / 1fr 2fr'
        }
        else {
            grid_system.style.gridTemplate = '1fr / 1fr'
        }
    })

    $(collapse_middle_panel).click(() => {
        middle_panel.style.display = 'none'
        if (right_panel.style.display == 'flex') {
            grid_system.style.gridTemplate = '1fr / 1fr 2fr'
        }
        else {
            grid_system.style.gridTemplate = '1fr / 1fr'
        }
    })
}

$(document).on('turbo:load', function(){

    let middle_panel  = document.querySelector('#middle-panel')
    let right_panel = document.querySelector('#right-panel')

    optionsAction()
    addRemoveAction()
    gridAction()
    mainAction()

    $(middle_panel).on('turbo:frame-render', () => {

        optionsAction()
        addRemoveAction()
        gridAction()
        taskAction()
    })

    $(right_panel).on('turbo:frame-render', () => {
        gridAction()
        mainAction()
        addRemoveAction()
        optionsAction()
    })
})