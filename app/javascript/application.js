// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "jquery"
import {add} from "@hotwired/stimulus";

$(document).on('turbo:load', function(){

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

    let add_sign = document.querySelectorAll('.add')
    let remove_sign = document.querySelectorAll('.remove')
    let subcategory = document.querySelectorAll('.list details')

    add_sign.forEach((e, index) => {
        e.addEventListener('click', () => {
            e.style.display = 'none'
            remove_sign[index].style.display = 'block'
            add_sign[index].classList.remove('const-hover')
            remove_sign[index].classList.add('const-hover')
            subcategory[index].open = true
        })
    })

    remove_sign.forEach((e, index) => {
        e.addEventListener('click', () => {
            e.style.display = 'none'
            add_sign[index].style.display = 'block'
            remove_sign[index].classList.remove('const-hover')
        })
    })

    let task_completed = document.querySelectorAll('details .item input')

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

    let task = document.querySelectorAll('.item')
    let task_options = document.querySelectorAll('.options')
    let task_options_open = document.querySelectorAll('.options-open')

    task.forEach((e, index) => {
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

        task[index].addEventListener('mouseout', () => {
            e.style.backgroundColor = 'transparent'
            task_options_open[index].style.display = 'none'
            e.classList.add('hover')
        })
    })


})