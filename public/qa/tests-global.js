suite('global-test', function(){
    test('У данной страницы доступен заголовок', function(){
        assert(document.title && document.title.match(/\S/) && document.title.toUpperCase() != 'TODO')
    })
})