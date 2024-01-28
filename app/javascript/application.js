// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "jquery"

$(document).ready(function(){

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