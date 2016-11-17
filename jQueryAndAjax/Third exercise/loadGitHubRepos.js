/**
 * Created by r3v3nan7 on 15.11.16.
 */

function loadRepos() {
    $('#repos').empty();

    let user = $('#username').val();
    let url = "https://api.github.com/users/" + $('#username').val() + "/repos";

    $.ajax({url,
        success: displayRepos,
        error: displayError
    });

    function displayRepos(repos) {

        for(let repo of repos){
            let link = $('<a>').text(repo.full_name);
            link.attr('href', repo.html_url);
            $('#repos').append($("<li>").append(link));
        }


    }


    function displayError(err) {
        let errorAppend = $("<li>Error</li>");

    }


}