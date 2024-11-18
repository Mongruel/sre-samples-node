const http = require('http');

function simulateRateLimitError() {
    const options = {
        hostname: 'localhost',
        port: 8080,
        path: '/api/bulkhead',
        method: 'GET'
    };

    for (let i = 0; i <= 5; i++) {  // Enviar max requisições para exceder o limite de 5
        const req = http.request(options, (res) => {
            let data = '';

            // A acumulação dos dados recebidos
            res.on('data', (chunk) => {
                data += chunk;
            });

            // Quando todos os dados foram recebidos
            res.on('end', () => {
                console.log(`Resposta: ${data}`);
            });
        });

        req.on('error', (error) => {
            console.error(`Erro: ${error.message}`);
        });

        req.end();
    }
}

// Chama a função para simular o erro de Rate Limit
simulateRateLimitError();