# Guia de estudo do código da Divertin

Este guia apresenta um caminho para aprender com o projeto sem precisar entender todos os arquivos de uma vez.

## 1. Comece pelos dados

Leia `src/data/contatoData.ts` e `src/data/servicosData.ts`.

- O `contatoData.ts` centraliza informações usadas por mais de um componente. Assim, telefone e endereço não precisam ser copiados em várias páginas.
- O `servicosData.ts` descreve cada especialidade com um tipo TypeScript (`Service`) e uma lista de áreas (`ServiceArea`). O tipo ajuda o editor e o compilador a detectar erros de estrutura.
- `getServicoBySlug` é uma função pequena e previsível: recebe um slug e retorna o serviço correspondente ou `undefined`.

**Experimento:** acrescente temporariamente uma área a uma especialidade e observe em quais partes do site os dados são exibidos automaticamente.

## 2. Entenda as rotas do Next.js

O diretório `src/app/` define os caminhos do site:

- `page.tsx`: `/`.
- `quem-somos/page.tsx`: `/quem-somos`.
- `servicos/page.tsx`: `/servicos`.
- `servicos/[slug]/page.tsx`: rota dinâmica para uma especialidade, como `/servicos/pediatria`.
- `contato/page.tsx`: `/contato`.
- `api/contato/route.ts`: endpoint da API, não uma página visual.

A página dinâmica chama `getServicoBySlug`. Se não encontrar a especialidade, usa `notFound()` para apresentar a experiência de página não encontrada do Next.js. `generateStaticParams` lista os slugs conhecidos para geração estática quando compatível com a configuração do projeto.

## 3. Componentes de servidor e de cliente

No App Router, componentes são de servidor por padrão. Eles são bons para renderizar conteúdo e ler dados sem enviar JavaScript adicional ao navegador.

Quando um componente precisa de estado ou eventos do navegador, ele começa com `'use client'`. Exemplos neste projeto:

- `NavBar.tsx`: controla o menu aberto/fechado, a interação com o scroll e as animações.
- `ContactForm.tsx`: guarda o conteúdo dos campos e o estado do envio.
- `ScreenSaver.tsx`: observa eventos de atividade, temporizadores e o estado de inatividade.
- `ClinicSection.tsx` e `ImageModal.tsx`: controlam a abertura e navegação da galeria de fotos.

Evite adicionar `'use client'` em páginas que só organizam componentes estáticos: a diretiva deve ficar no menor componente que realmente precisa de interatividade.

## 4. Estude o botão reutilizável

Abra `src/components/Botao.tsx`.

- `BotaoProps` define a API pública do componente.
- `keyof typeof CORES_DISPONIVEIS` limita `cor` às variantes que realmente existem.
- Quando `href` existe, o componente renderiza um link (`<a>`); caso contrário, renderiza um botão (`<button>`).
- `CSSProperties` permite definir a largura e a altura com tipos reconhecidos pelo React.

**Experimento:** crie uma variante de cor em `CORES_DISPONIVEIS` e teste-a numa chamada de `Botao`. O nome da variante precisa corresponder exatamente à chave do objeto.

## 5. Acompanhe um formulário de ponta a ponta

Leia na ordem:

1. `src/components/contato/ContactForm.tsx`: o estado dos campos, a atualização dos valores e a chamada `fetch`.
2. `src/app/api/contato/route.ts`: a validação da requisição e a resposta HTTP.
3. `src/data/contatoData.ts`: o endereço de e-mail da clínica usado como destinatário futuro.

Os campos são controlados: o valor exibido no input vem de `form`, e `onChange` atualiza esse estado. No envio, `fetch` faz um POST JSON sem recarregar a página. A resposta HTTP informa ao formulário se a operação foi aceita ou falhou.

**Atenção:** a API de contato retorna `501 Not Implemented` depois da validação, pois ainda não envia e-mail. Não interprete a resposta como envio concluído; essa integração precisa ser desenvolvida e testada separadamente.

## 6. Por que a API usa validação e códigos HTTP

A rota separa algumas situações:

- `400 Bad Request`: JSON malformado, formato de corpo incorreto, campos obrigatórios ausentes ou e-mail inválido.
- `501 Not Implemented`: os dados são válidos, mas o envio automático ainda não está implementado.
- `500 Internal Server Error`: falha inesperada durante o processamento.

A função `readTextField` normaliza valores para texto e remove espaços nas extremidades. Isso facilita validar o conteúdo antes de o entregar a um serviço externo.

**Próximo passo de estudo:** implementar um provedor de e-mail no servidor usando variáveis de ambiente. Não use chaves privadas no cliente e não altere o retorno para `200` antes de confirmar que o provedor aceitou a mensagem.

## 7. Padrões úteis para observar

- **Fonte única da verdade:** dados compartilhados ficam em `src/data/`.
- **Tipos em vez de suposições:** interfaces e tipos deixam claro quais propriedades cada componente espera.
- **Nomes de eventos específicos:** `onSubmit`, `onChange` e `onClick` tornam a interação explícita.
- **Limpeza de efeitos:** todo `addEventListener` ou temporizador criado dentro de um `useEffect` deve ser removido/cancelado no retorno de limpeza quando apropriado.
- **Acessibilidade:** imagens têm textos alternativos quando relevantes; elementos decorativos ficam ocultos para leitores de tela; botões têm tipos explícitos e campos têm `name`/`autoComplete`.
- **Separação de responsabilidades:** a página organiza as seções; cada componente cuida do próprio pedaço visual; arquivos `data` guardam conteúdo.

## 8. Roteiro recomendado para praticar

1. Faça uma pequena mudança de conteúdo em `servicosData.ts`.
2. Crie uma variante visual de botão e use-a numa página.
3. Adicione um campo opcional ao formulário, atualize o tipo inicial e trate-o na API.
4. Teste os cenários de erro do endpoint com JSON inválido e campos ausentes.
5. Quando tiver o projeto completo, rode lint, TypeScript e build de produção antes de publicar.

Faça cada exercício em uma cópia/branch própria e verifique a interface em telas pequenas e grandes. Como os arquivos `public/` não vieram no pacote analisado, preserve as imagens originais ao aplicar as alterações.
