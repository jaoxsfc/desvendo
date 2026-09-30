# Sua landing page

Site estático em HTML, CSS e JavaScript. Abra `index.html` no navegador para visualizar. Não requer instalação ou compilação.

## Personalizar antes de publicar

No início de `script.js`, altere `SITE_CONFIG`:

```js
const SITE_CONFIG = {
  brand: 'Nome da sua empresa',
  whatsapp: '5511999999999', // Substitua pelo seu número real.
  email: ''
};
```

Use o número com código do país e DDD. Se WhatsApp e e-mail estiverem preenchidos, o WhatsApp terá prioridade. O formulário pede nome, tipo de projeto e uma breve descrição; prepara uma mensagem para o visitante revisar e enviar no aplicativo escolhido. Não envia automaticamente e não tem servidor ou banco de dados. Sem canal configurado, apresenta um resumo para copiar ou baixar e informa claramente que não houve envio.

Atualize também o nome inicial no `index.html`, o título, a descrição e `favicon.svg`. Os textos estão em `index.html`; cores, fontes e medidas, em `styles.css`. As fontes são carregadas do Google Fonts, com alternativas locais se não houver conexão. O visual usa preto, cinza e fundo claro, sem projetos fictícios. Os links diretos de WhatsApp também estão no `index.html`; atualize-os se mudar o número.

A página segue uma sequência curta: apresentação, três serviços, portfólio real, quem faz o trabalho e contato. Mantenha apenas os serviços que você realmente oferece. A conversa sobre escopo, prazo e investimento aparece perto do contato, sem uma seção separada de etapas.

## Portfólio

A seção “Portfólio” mostra a landing page Village Lustres, criada para informar sobre a marca e direcionar visitantes aos canais de venda, com link para o projeto publicado. A prévia usa versões JPEG otimizadas das capturas reais (`desktop-otimizado.jpg` e `mobile-otimizado.jpg`). Os PNGs originais foram preservados para futuras edições. Ao incluir outros projetos, use material do trabalho real e descreva apenas resultados que possam ser comprovados.

## Publicação

Envie `index.html`, `styles.css`, `script.js`, `favicon.svg`, `desktop-otimizado.jpg` e `mobile-otimizado.jpg` juntos para uma hospedagem de sites estáticos, preservando os nomes. Os PNGs originais não precisam ser publicados. Configure seu domínio e HTTPS na hospedagem. O formulário não armazena os dados no navegador.
