(function() {
    Reveal.initialize({
        slideNumber: true,
        history: true,
        embedded: false,
        dependencies: [
            { src: '//cdnjs.cloudflare.com/ajax/libs/socket.io/0.9.10/socket.io.min.js', async: true },
            { src: '/js/multiplex/client.js', async: true },
            { src: '/js/notes/notes.js', async: true }
        ],
        multiplex: {
            id: '411b6caa5d7bca2d',
            url: 'http://{{url}}:80'
        }
    });
})();