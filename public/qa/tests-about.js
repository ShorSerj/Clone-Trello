suite('test-about', function(){
    test('У данной страницы есть ссылка на контакты', function(){
        assert(document.querySelector('a[href="/contacts12"]'))
    })
})