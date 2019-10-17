---
title: Como manter a qualidade do código
description: Dicas para manter a qualidade do código durante seu ciclo de vida
date: '2019-10-16'
tags: [ 'liderança' ]
image: /assets/code-icon.png
---

## Refactoring

*Refactoring* é um termo muito usado no dia a dia de um desenvolvedor de Software. É utilizado para descrever o processo de reconstrução de Software, onde o desafio principal está relacionado a modificar a base de código para melhorar, normalmente, a arquitetura do projeto ou então fazer com que o código tenha uma melhor estrutura para ser mais **manutenível**. Em portugês as pessoas adotaram o anglicismo *refatorar* ou *refatoração*.

Alguns dos motivos mais comuns para fazer *refactor* do código são:

1. A Arquitetura ou estrutura do código não foi pensada o suficientemente bem antes de começar o projeto
2. As tecnologias do projeto não atendem mais as necessidades e, portanto, decide-se migrar para outra tecnologia/framework/biblioteca
3. Os requerimentos mudaram

Em geral, o propósito é tornar o código melhor.

## O problema

O maior problema do processo de *refactor*, baseado nas experiências que eu tive, é que ele só é feito em um ponto do jogo onde é extremamente caro de se fazer. Sim! Básicamente todo mundo vai deixando para o futuro as melhorias necessárias, pois o cliente precisa urgentemente de uma funcionalidade nova e não há tempo para "perder".

É seu papel como lider técnico ou desenvolvedor, explicar as necessidades da **melhoria continua** aos seus superiores. Se você perguntar para o seu chefe se você poderia tirar um tempo da semana para se dedicar à melhoria da qualidade do código, provavelmente a resposta será **não**. É por isso que você deve mostrar a necessidade do processo de *refactor* e deixar claro que nunca é perder tempo. Isso faz parte de um processo de transformação cultural de um time, mas sinto dizer que tal vez você não consiga convencer os seus superiores.

O processo de *refactor* está muito relacionado à um conceito chamado débito técnico.

O Débito Técnico é um conceito que indica quão custoso é corrigir um problema ou adicionar uma nova funcionalidade na sua aplicação. Um débito téncico baixo é **bom**, e alto quer dizer: **ruim**.

![Débito Técnico](/assets/technical_debt.png)*Crédito da imagem: [techblog](http://techblog.kuka-atx.com/index.php/2017/03/08/its-never-too-early-to-do-the-right-thing/)*

A imagem anterior mostra que a medida que o débito técnico aumenta, a produtividade do desenvolvimento cai, tornando-se cada vez mais difícil mudar a estrutura do seu código ou introduzir novas funcionalidades.

A gente faz *refactoring* para tentar manter o débito técnico baixo e a produtividade alta. Em outras palavras, má qualidade no código se traduz em débito técnico alto ao longo do tempo.

## Existe uma solução ?

Existem duas ações extremamente importantes para manter ou tentar manter uma boa qualidade de código na sua aplicação.

Como tudo na vida, requer-se disciplina e constância no processo. Não é algo que você vai aplicar uma ou duas vezes e pronto. Será sim algo que deve tornar-se um hábito na sua rotina de planejamento de tarefas nas suas *sprints*.

Cabe ressaltar que a maior parte da minha vida trabalhei para empresas que possuem **produtos** e não projetos. Isso faz muita diferença, embora o ideal é que você consiga manter boa qualidade no código em ambos casos.

### 1. Cobertura de testes

Cobertura de testes é um assunto muito extenso, embora quero deixar claro que ter cobertura de testes ajuda MUITO em um processo de *refactoring*.

A idea dos testes é exatamente garantir que sempre que você muda o seu código, os resultados continuem se mantendo iguais. Assim, durante um processo de *refactor* é muito comum trocar alguma parte do código, atualizar a versão de uma biblioteca ou refazer do zero uma parte da sua aplicação, e imediatamente olhar os testes que falharam. Dessa forma você garante que a qualidade fica intacta, e vai corrigindo conforme necessário.

### 2. Refactoring constante

Tenho o costume de adicionar tarefas de *refactoring* pelo menos uma vez no mês. Assim, fico muito de olho em como cresce a aplicação e sua complexidade depois de cada sprint. Dessa forma, é nítido quando começa a ficar difícil a introdução de uma nova funcionalidade ou a mudança de uma funcionalidade já existente. Nesse momento, já crio uma tarefa de revisão de arquitetura e qualidade para ver o motivo pelo qual está sendo tão complicado executar alguma das ações mencionadas.

Quando você analisa constantemente a qualidade do código e toma ações rápidas, fica muito mais fácil de mudar. Um exemplo análogo é um jardim. Se você corta as pontinhas das suas plantas toda semana, será muito melhor do que revisar a cada 3 meses o estado da sua planta e perceber que existem muitos galhos podres.

Envolver todo o time de desenvolvimento é muito importante também, para incentivar a cultura de qualidade com perguntas simples como:

> Essa é a melhor forma de fazer o que estou fazendo?

ou

> É fácil extender o meu código usando essa estrutura?

Sou um dos que acredita que você deve resolver os problemas que tem **HOJE**, mas sempre se perguntando se essa é a melhor forma para fazer o que está fazendo.

Em conclusão, para manter uma boa qualidade no código é preciso um trabalho constante. Não deixe que o tempo passe, revise constantemente seu código e exija tempo para ter uma *limpeza constante* do seu código. Entre mais tempo passa, mais caro vai lhe custar!

---------

Finalmente, deixo um link de uma palestra fantástica chamada *All the little things*. Nessa palestra, Sandi Metz explica alguns conceitos muito importantes na hora de fazer *refactoring* no seu código. Eventualmente a complexidade do seu código vai aumentar, mas aplicando a metodologia certa, você tera um código mais fácil de entender e de se manter no futuro.

[All the little thigns, Sandi Metz, RailsConf 2014](https://www.youtube.com/watch?v=8bZh5LMaSmE)

`video: https://www.youtube.com/watch?v=8bZh5LMaSmE`

Nos próximos artigos, vou entrar mais em detalhe sobre as mêtricas de complexidade de código e análise de complexidade. Fique ligado!

**Obrigado pela Visita!**
