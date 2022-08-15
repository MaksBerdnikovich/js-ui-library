import './lib/lib';
import $ from './lib/lib';
console.dir($)

$('#dynamicModal').click(() => $('#dynamicModal').createModal({
    text: {
        title : 'Modal title',
        body: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>'
    },
    btns: {
        count: 3,
        settings: [
            [
                'Close',
                ['btn', 'btn-secondary'],
                true
            ],
            [
                'Save',
                ['btn', 'btn-primary'],
                false,
                () => alert('Save data!')
            ],
            [
                'Delete',
                ['btn', 'btn-danger'],
                false,
                () => alert('Delete data!')
            ]
        ]
    }
}))

/*
$().get('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => console.log(res))

$().post('https://jsonplaceholder.typicode.com/posts')
    .then(res => console.log(res))
 */

