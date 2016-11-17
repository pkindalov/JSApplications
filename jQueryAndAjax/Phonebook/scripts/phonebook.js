/**
 * Created by r3v3nan7 on 16.11.16.
 */
$(document).ready(function () {

    $(function () {
       $('#btnLoad').click(loadContacts);
       $('#btnCreate').click(createContact);

       let baseServiceURL = 'https://phonebook-nakob.firebaseio.com/phonebook';


       //Main functions
       function loadContacts() {
           $('#phonebook').empty();

            $.get(baseServiceURL + '.json')
                .then(displayContacts)
                .catch(displayError);
       }


        function displayError() {
            $('#phonebook').append($('<li>Error</li>'));
        }



        function displayContacts(contacts) {
            for(let key in contacts){
                let person = contacts[key]['person'];
                let phone = contacts[key]['phone'];
                let li = $('<li>');
                li.text(person + ': ' + phone + ' ');
                $('#phonebook').append(li);

                let link = $("<a href='#'>[Delete]</a>");
                li.append(link).click(function () {
                   deleteContact(key);
                });
            }
        }



        function createContact() {
            let newContactJSON = JSON.stringify({
                person: $('#person').val(),
                phone: $('#phone').val()
            });


            $.post(baseServiceURL + '.json', newContactJSON)
                .then(loadContacts)
                .catch(displayError);

            $('#person').val('');
            $('#phone').val('');
        }


        function deleteContact(key) {
           let request = {
                method: 'DELETE',
                url: baseServiceURL + '/' + key + '.json'
           };


           $.ajax(request)
               .then(loadContacts)
               .catch(displayError);
            
        }






    });



});
