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

    add_sign.forEach((e, index) => {
        e.addEventListener('click', () => {
            e.style.display = 'none'
            remove_sign[index].style.display = 'block'
        })
    })

    remove_sign.forEach((e, index) => {
        e.addEventListener('click', () => {
            e.style.display = 'none'
            add_sign[index].style.display = 'block'
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

})