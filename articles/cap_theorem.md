---
title: O Teorema CAP!
description : O que é o Teorema CAP
date: '2020-10-05'
tags: [ 'arquitetura' ]
---

O Teorema CAP é um dos conceitos mais importantes no desenvolvimento e utilização de sistemas distribuídos.

O Teorema CAP, também chamado de Teorema de Brewer, diz que em um sistema distribuído somente é possível ter duas das seguintes variáveis:

- **C**onsistency (Consistência)
- **A**vailability (Disponibilidade)
- **P**artition Tolerance (Tolerância a falha)

![Teorema CAP!](assets/cap_theorem.png)

Antes de explicar a sua importância, vamos explicar alguns conceitos:

## Sistema Distruidos

Um sistema distribuído está formado por um ou mais componentes que atendem requisições para diversos clientes. O mais importante é que essa comunicação entre cliente e servidor seja transparente. O cliente não sabe exatamente quantos componentes existem dentro do sistema distribuído. Essa lógica é transparente e a ideia é que pareça somente um componente só.

O sistema distribuído recebe requisições de leitura e escrita. Assim, quando um valor é escrito, cada componente precisa ficar ciente daquela mudança. Da mesma forma, quando um dos componentes recebe uma requisição de leitura, ele precisa retornar o valor atualizado.

Qual é o problema? Eu diria que o tempo: O tempo necessário para que todos os componentes sejam sincronizados vai definir a forma em que você deve construir ou utilizar o seu sistema distribuído.

A partir desse ponto será usada a palavra *node* para descrever os componentes do sistema distribuído. Esse é o termo usado em inglês.

![Sistema distribuído](assets/distributed_sys.png)*Sistema distribuído*

### Qual é a necessidade de um sistema distribuído

A necessidade aparece quando temos um sistema que é acessado por milhares de usuários ou quando o sistema é acessado por diversos clientes em diferentes posições geográficas. Sistemas como Netflix, Youtube, Google, Facebook, Amazon, entre outros. São exemplos de sistemas distribuídos.

------------

Agora vamos explicar as variáveis do CAP

## Consistência

Consistência é a variável que garante que se um dado foi alterado, você irá receber a versão mais recente desse dado, independentemente de qual for o *node* que vai responder a sua requisição.
Para que a consistência aconteça, deve existir uma sincronização de nodes toda vez que algum valor for alterado. Podemos dizer que cada *node* deve manter uma cópia do estado do sistema ou de alguma maneira ter acesso ao estado mais atualizado do mesmo.

![Consistência](assets/consistency_1.png)

![Consistência](assets/consistency_2.png)

O cliente fará requisições e a resposta pode vir de qualquer *node*. O mais importante é que esse valor deve ser o mesmo, independente de quem responde à requisição.

![Consistência](assets/consistency_3.png)

![Consistência](assets/consistency_4.png)

## Disponibilidade

Disponibilidade é uma variável que garante que seu sistema estará disponível sempre que você precisar dele. Chamamos de sistemas de Alta Disponibilidade quando o sistema está no ar o tempo todo. Toda requisição que seu sistema recebe deve ser atendida!

## Tolerância a Falha

A Tolerância a falha é uma variável que garante que se algum dos *nodes* no seu sistema cai, o seu sistema ainda será capaz de atender as requisições.

![Tolerância a falha](assets/partition_tolerance.png)

------------

Entendemos os principais conceitos. Agora vamos responder duas perguntas:

1. Por quê é impossível ter somente duas das três variáveis CAP?
2. Por quê é importante entender isso?

## Por quê é impossível ter somente duas das três variáveis CAP

Vamos pensar em vários cenários para entender melhor:

1. Se eu quiser um sistema consistente e disponível, quer dizer que a replicação de mensagens nos *nodes* tem que existir e ainda, o sistema tem que responder a todas as minhas requisições. Nesse caso, é impossível que ele seja tolerante a falha.

2. Se eu quiser um sistema disponível e tolerante a falha, quer dizer que o sistema tem que atender todas as minhas mensagens e ele pode continuar funcionando normalmente se a conexão interna entre alguns *nodes* cair. Embora, ele não vai conseguir ser consistente.

3. Se eu quiser um sistema tolerante a falha e consistente, ele precisa continuar funcionando apesar dos problemas de conexão entre *nodes* e tem que garantir que os dados retornados vão ser os mais atualizados. Nesse caso ele não conseguirá atender a disponibilidade.

Podemos ver então que cada um desses casos escolhe duas das três variáveis CAP.

- A primeira opção é chamada de sistema **CD**, Oracle E MySQL são exemplos desse tipo de sistemas.
- A segunda opção é chamada de **AP**, Amazon DynamoDB e Cassandra são exemplos desse tipo de sistemas.
- A última é chamada de **CP**, MongoDB e Google BigTable são exemplos desse tipo de sistemas.

## Por quê é importante entender isso

Primeiramente, se você está construindo um sistema distribuído, já sabe que terá que escolher uma das duas variáveis e seus clientes têm que entender os pros e contras disso.

Em segundo lugar, se você está consumindo um sistema **CA**, **CP** ou **CD**, é importante entender as limitações desse sistema. Vou dar um exemplo claro que acontece comigo hoje:

A AWS tem um banco de dados chamado DynamoDB. Ele é um banco NoSQL que trabalha muito bem e está otimizado para escalar horizontalmente de uma maneira bem rápida. Acontece que, por design, o DynamoDB é um Sistema **AP**. Ou seja, ele é um Sistema que escolheu estar disponível e ser tolerante a falha. Embora, a consistência foi sacrificada.

Por que é importante isso para mim como usuário? Pois bem! Toda vez que eu alterar um dado, eu tenho que entender que talvez o banco de dados vai responder com um dado não atualizado.

> Não existe uma bala de prata, a escolha vai depender 100% da sua necessidade e os requisitos do seu negócio. Por exemplo, não é o mesmo construir um sistema Bancário que um sistema de controle automático de um avião. As variáveis mudam e da mesma forma você precisa entender quais variáveis foram escolhidas para você atender a sua necessidade.

Espero que tenha ficado um pouco claro a importância das variáveis e quando escolher cada uma.

Obrigado 😀

### Referências

Newmann, S (2015). *Building Microservices. Designing Fine Grained Systems* (1st Edition)

Whittaker, M. *An Illustrated Proof of the CAP Theorem*. Retrieved on May 5th from this [link](https://mwhittaker.github.io/blog/an_illustrated_proof_of_the_cap_theorem/)
