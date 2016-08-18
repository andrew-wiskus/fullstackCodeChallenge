$(document).ready(function() {

    console.log("clientapp.js connected");
    getAnimals();
    $('#submitAnimal').on('click', postAnimal);

});

function postAnimal() {
    event.preventDefault();

    var animal = {};

    $.each($('#animalType').serializeArray(), function(i, field) {
        animal[field.name] = field.value;
    });

    $.ajax({
        type: 'POST',
        url: '/animals',
        data: animal,
        success: function() {
            console.log('POST /animals works!');
            $('#animalList').empty();
            getAnimals();
        },

        error: function(response) {
            console.log('POST /animals does not work...');
        },
    });

}

function getAnimals() {
    $.ajax({
        type: 'GET',
        url: '/animals',
        success: function(animals) {
            console.log("animals received", animals);
            animals.forEach(function(animal) {
                var $el = $('<div></div>');

                var animalProperties = ['animal_name', 'animal_amount'];
                animalProperties.forEach(function(property) {

                    var $input = $('<input type="text" id="' + property + '"name="' + property + '" />');
                    $input.val(animal[property]);
                    $el.append($input);
                });
                $el.data("animalID", animal.id);
                $('#animalList').append($el);
            });
        },
        error: function() {
            console.log('GET /animals didnt work')
        }
    });


}
