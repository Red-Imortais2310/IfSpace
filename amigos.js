// Espera o conteúdo da página carregar antes de rodar o script
document.addEventListener('DOMContentLoaded', function() {

    // Onde vamos inserir os cards de amigos
    const grid = document.getElementById('amigosGrid');

    // Lista de 50 nomes fictícios (pode adicionar ou remover)
    const nomes = [
        "Ana Silva", "Bruno Costa", "Carla Dias", "Daniel Martins", "Eduarda Ferreira",
        "Fábio Almeida", "Gabriela Pereira", "Heitor Santos", "Isabela Ribeiro", "João Oliveira",
        "Karen Souza", "Lucas Barbosa", "Mariana Castro", "Nathan Rocha", "Olívia Azevedo",
        "Pedro Lima", "Quintino Mendes", "Rafaela Gonçalves", "Sérgio Nogueira", "Tatiana Correia",
        "Ulisses Vieira", "Valentina Cunha", "William Matos", "Xavier Pinto", "Yasmin Farias",
        "Zeca Andrade", "Beatriz Melo", "Caio Gomes", "Diana Freire", "Elisa Brandão",
        "Felipe Tavares", "Giovana Dantas", "Hugo Lemos", "Íris Peixoto", "Jorge Valente",
        "Larissa Sampaio", "Miguel Arantes", "Nicole Bicalho", "Otávio Drummond", "Paula Queiroz",
        "Ricardo Neves", "Sofia Bernardes", "Thiago Uchoa", "Vanessa Galvão", "Wagner Rangel",
        "Amanda Teodoro", "César Gusmão", "Débora Fontes", "Elias Pimenta", "Fernanda Ourique"
    ];

    // Loop para criar 50 amigos
    for (let i = 0; i < 50; i++) {
        // Pega um nome da lista. O operador '%' (módulo) faz a lista repetir se tivermos mais de 50 iterações.
        const nome = nomes[i % nomes.length]; 
        
        // Gera um ID aleatório para a foto (de 1 a 70)
        const fotoId = Math.floor(Math.random() * 70) + 1;

        // URL da imagem fictícia do site Picsum Photos
        const fotoUrl = `https://picsum.photos/id/${fotoId}/200/200`;

        // Cria o HTML para o card do amigo
        const amigoHTML = `
            <div class="amigo-card">
                <img src="${fotoUrl}" alt="Foto de perfil de ${nome}">
                <p>${nome}</p>
            </div>
        `;

        // Insere o novo card na grade
        grid.innerHTML += amigoHTML;
    }
} );
