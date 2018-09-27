import './index.scss'
import '@assets/sass/test'
import '@assets/js/a'
import * as _ from 'lodash'
console.log("At page 'A' :", _)

$(document).ready(function() {
    $('#test').click(function() {
        alert(1)
    })
})