# Para depurar no Angular

Para que seja possivel depurar o codigo do angular no navegador, são necessarios alguns passos 
(considerando os diretorios a partir da raiz do projeto):

* copiar a pasta 'core/src' para o diretorio 'angular2/src/angular2';
* copiar a pasta 'core/src' para o diretorio 'angular2/example';
* copiar a pasta 'addons/src' para o diretorio 'angular2/example';

Após copiar as pastas para os devidos diretorios é necessario mapear os arquivos .js do diretorio 'angular2/addons'

Para cada um dos arquivos .js da pasta voce deve criiar um arquivo .ts cujo nome vai ser identico ao nome do
arquivo .js, porém a extensão dele vai ser '.d.ts' e dentro dele voce deve escrever a "assinatura" do metodo que é 
exportado pelo arquivo .js como por exemplo no caso do arquivo 'createNumberMask.js', ele exporta uma unica function como
 
visto abaixo

```typescript
...

export default function createNumberMask({...}) {
    ...
}
...
```

Seguindo a logica, você deve criar um arquivo de nome 'angular2/example/addons/createNumberMask.d.ts' e escrever dentro 
dele apenas o seguinte codigo :

```typescript

```
