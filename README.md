# Laboratório de API Express — Mariane Silva Flores

Fork de [fabioivi/express-hello-world](https://github.com/fabioivi/express-hello-world), com os seis desafios em commits separados. O histórico e a licença do projeto original foram preservados.

## Endpoints

| Método | Caminho | Resposta |
| --- | --- | --- |
| GET | `/req` | `Yo!` |
| GET | `/meunome` | `Meu nome é Mariane Silva Flores` |
| GET | `/tico` | `teco` |
| GET | `/pokemons` | Lista JSON de dez Pokémon |
| POST | `/series` | Brooklyn Nine-Nine, Miraculous e Gilmore Girls, em JSON |
| GET | `/erro` | Erro intencional HTTP 500; mantém o servidor funcionando |
| GET | `/pokemon-publico` | Dados de Pikachu consultados na PokeAPI |

### Critério da lista de Pokémon

Usamos a ordem de entrada na equipe principal de Kanto, contando uma vez cada Pokémon, sem evoluções duplicadas: Pikachu, Caterpie, Pidgeotto, Bulbasaur, Charmander, Squirtle, Krabby, Primeape, Muk e Tauros. Pikachu foi recebido, não capturado; Raticate foi uma troca temporária e não entra nesta interpretação. Os 30 Tauros são representados por um item. Referência: [personagem e Pokémon de Ash no Serebii](https://www.serebii.net/anime/ash.shtml).

## Executar

Node.js 22 (versão definida para a Render):

```sh
npm ci
npm start
```

Acesse `http://localhost:3001/req`. A aplicação usa `process.env.PORT` quando fornecida pela hospedagem.

Em outro terminal, execute os testes HTTP:

```sh
node test-endpoints.mjs
```

Os testes verificam respostas, JSON, método POST, erro 500, disponibilidade após o erro e uma consulta real à PokeAPI. A última verificação requer internet. Também foram executados localmente com Node.js 24.

## Exemplos com curl

```sh
curl http://localhost:3001/meunome
curl http://localhost:3001/tico
curl http://localhost:3001/pokemons
curl -X POST http://localhost:3001/series
curl -i http://localhost:3001/erro
curl http://localhost:3001/pokemon-publico
```

No Windows, use `curl.exe` caso `curl` seja um alias do PowerShell. Para testar online, substitua a origem local pela URL real do serviço Render.

## Publicação na Render

A publicação ainda depende da conclusão do login e da criação do serviço na conta da autora.

- Tipo: Web Service, runtime Node.
- Repositório: `marianesilvaflores/express-hello-world`.
- Branch: `main`.
- Build: `npm ci`.
- Start: `npm start`.
- Instância: **Free**.
- Health check: `/req`.

O arquivo `render.yaml` registra a configuração gratuita. Não contém credenciais. O endpoint externo usa timeout de 10 segundos, retorna 502 quando o provedor falha e 504 quando excede o tempo limite.

## Referências

- [Deploy Express na Render](https://render.com/docs/deploy-node-express-app)
- [Documentação PokeAPI](https://pokeapi.co/docs/v2)

Atividade acadêmica desenvolvida por Mariane Silva Flores com apoio de IA.

A resposta da PokeAPI é mantida em cache em memória por cinco minutos para evitar consultas repetidas. O projeto utiliza npm e package-lock.json para a instalação reproduzível.

