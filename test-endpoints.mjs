import assert from 'node:assert/strict';
const base = process.env.API_URL || 'http://localhost:3001';
async function request(path, method = 'GET') {
  const response = await fetch(base + path, { method, signal: AbortSignal.timeout(20000) });
  const text = await response.text();
  return { status: response.status, text, type: response.headers.get('content-type') };
}
for (const [path, expected] of [['/req','Yo!'], ['/meunome','Meu nome é Mariane Silva Flores'], ['/tico','teco']]) {
  const result = await request(path); assert.equal(result.status,200); assert.equal(result.text,expected);
  console.log('OK GET '+path);
}
const pokemon = await request('/pokemons');
assert.equal(pokemon.status,200); assert.match(pokemon.type,/application\/json/);
assert.deepEqual(JSON.parse(pokemon.text), ['Pikachu','Caterpie','Pidgeotto','Bulbasaur','Charmander','Squirtle','Krabby','Primeape','Muk','Tauros']);
console.log('OK GET /pokemons: 10 itens em ordem');
const series = await request('/series','POST');
assert.equal(series.status,200); assert.match(series.type,/application\/json/);
assert.deepEqual(JSON.parse(series.text), ['Brooklyn Nine-Nine','Miraculous: As Aventuras de Ladybug','Gilmore Girls']);
assert.equal((await request('/series')).status,404);
console.log('OK POST /series; GET não expõe a rota POST');
assert.equal((await request('/erro')).status,500);
assert.equal((await request('/req')).text,'Yo!');
console.log('OK erro 500 sem derrubar a aplicação');
const external=await request('/pokemon-publico');
assert.equal(external.status,200,external.text);
const data=JSON.parse(external.text);assert.equal(data.id,25);assert.equal(data.nome,'pikachu');assert.ok(data.tipos.includes('electric'));
console.log('OK consulta real à PokeAPI');
