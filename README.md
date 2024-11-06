# Projeto de API de Gestão do Progresso e Feedbacks de Usuários

## 1. Definição do Cenário da Aplicação e Estruturação das APIs

Este projeto tem como objetivo a implementação de uma API para gerenciar configurações, progresso e feedback de usuários em um jogo. A API foi estruturada para possibilitar a criação, leitura, atualização e exclusão de dados, incluindo usuários, conquistas, níveis, progresso, configurações e feedbacks.

As rotas da API foram definidas conforme a necessidade do sistema e documentadas utilizando o padrão **Open API** (Swagger).

### Arquitetura da API
- **Framework**: Express.js
- **Banco de Dados**: PostgreSQL (PgAdmin)
- **ORM**: Sequelize
- **Ferramentas de Teste**: Postman
- **Documentação de API**: Swagger (Open API)

## 2. Documentação Usando o Padrão Open API

A documentação da API segue o padrão **Open API** (Swagger), o qual permite a visualização, teste e interação com os endpoints diretamente através de uma interface web. A documentação Swagger foi configurada para descrever todos os serviços disponíveis, incluindo métodos de requisição (`GET`, `POST`, `PUT`, `DELETE`) e os parâmetros necessários para interagir com a API. Abaixo está o link documentação da API!

[swagger.yalm](/swagger.yaml)

## 3. Implementação dos Serviços Descritos na API

A API foi desenvolvida utilizando o framework **Express.js** para construir as rotas e interações com o cliente. O **Sequelize** foi utilizado para realizar o mapeamento objeto-relacional entre a aplicação e o banco de dados PostgreSQL. A comunicação com o banco é facilitada pelo ORM, que cria uma camada de abstração, tornando o código mais legível e eficiente.

Abaixo está um exemplo da implementação das rotas da API:

### Endpoints da API

#### Usuários
- **GET** `/users`: Retorna todos os usuários.
- **POST** `/users`: Cria um novo usuário.
- **GET** `/users/{id}`: Retorna um usuário específico.
- **PUT** `/users/{id}`: Atualiza um usuário existente.
- **DELETE** `/users/{id}`: Deleta um usuário.

#### Níveis (Levels)
- **GET** `/levels`: Retorna todos os níveis.
- **POST** `/levels`: Cria um novo nível.
- **GET** `/levels/{id}`: Retorna um nível específico.
- **PUT** `/levels/{id}`: Atualiza um nível existente.
- **DELETE** `/levels/{id}`: Deleta um nível.

#### Conquistas (Achievements)
- **GET** `/achievements`: Retorna todas as conquistas.
- **POST** `/achievements`: Cria uma nova conquista.
- **GET** `/achievements/{id}`: Retorna uma conquista específica.
- **PUT** `/achievements/{id}`: Atualiza uma conquista existente.
- **DELETE** `/achievements/{id}`: Deleta uma conquista.

#### Progresso (Progress)
- **GET** `/progress`: Retorna todos os registros de progresso.
- **POST** `/progress/:usuarioId/level/:nivelId`: Registra o progresso de um usuário em um nível.
- **GET** `/progress/:usuarioId`: Retorna o progresso específico de um usuário.
- **PUT** `/progress/{id}`: Atualiza um progresso existente.
- **DELETE** `/progress/{id}`: Deleta um progresso.

#### Configurações (Configurations)
- **GET** `/configurations/:usuario_id`: Retorna a configuração específica de um usuário.
- **POST** `/configurations`: Registra a configuração de um usuário.
- **PUT** `/configurations/{id}`: Atualiza uma configuração existente.
- **DELETE** `/configurations/{id}`: Deleta uma configuração.

#### Feedback (Feedbacks)
- **GET** `/feedbacks`: Retorna todos os registros de feedback.
- **POST** `/feedbacks/:usuario_id/nivel/:nivel_id`: Registra o feedback de um usuário em um nível.
- **GET** `/feedbacks/:usuarioId`: Retorna o feedback específico de um usuário.
- **PUT** `/feedbacks/{id}`: Atualiza um feedback existente.
- **DELETE** `/feedbacks/{id}`: Atualiza um feedback existente.

## 4. Integração com Banco de Dados (PostgreSQL)

O banco de dados **PostgreSQL** foi utilizado para armazenar todas as informações de **Usuários**, **Conquistas**, **Feedbacks**, **Progressos** e **Níveis**. Utilizamos o **Sequelize** como ORM (Object-Relational Mapping) para abstrair as operações de banco de dados, permitindo a interação com o banco de dados de forma mais simples e intuitiva, sem a necessidade de escrever SQL diretamente.

### Configuração do Sequelize

Para configurar o **Sequelize** e conectar a aplicação ao **PostgreSQL**, foi criado um arquivo de configuração que define as credenciais e parâmetros de conexão.

### Modelos e Relacionamentos

No modelo do Sequelize, cada tabela é representada por um arquivo JavaScript que define as colunas e seus tipos de dados. Além disso, os relacionamentos entre as tabelas (como um para muitos, muitos para muitos, etc.) são definidos utilizando os métodos do Sequelize. Abaixo, explicamos os principais modelos e os relacionamentos entre as entidades do sistema.

#### **Usuários (Users)**
O modelo **User** representa os usuários da aplicação. Cada usuário tem um **nome**, **email** e **senha**. Os usuários podem ter múltiplos **Feedbacks** e **Configurações** associadas a eles. A tabela **users** é a tabela central, com outras tabelas dependentes dela.

- **Relacionamentos**: 
  - Um **usuário** pode ter muitos **Feedbacks**.
  - Um **usuário** pode ter muitas **Configurações**.

#### **Níveis (Levels)**
O modelo **Level** representa os diferentes níveis de um jogo ou sistema. Cada nível tem um **nome**, **descrição** e um campo de **dificuldade**. Ele pode estar associado a múltiplas **Conquistas** e **Progressos**.

- **Relacionamentos**: 
  - Um **nível** pode ter muitos **Progressos**.
  - Um **nível** pode ter muitas **Conquistas**.

#### **Conquistas (Achievements)**
O modelo **Achievement** representa as conquistas que os usuários podem alcançar ao completar certas metas no sistema. Cada conquista tem um **nome**, uma **descrição** e requisitos específicos para que o usuário a obtenha.

- **Relacionamentos**:
  - Uma **conquista** pertence a um **usuário** (referenciado por **usuario_id**).
  - Uma **conquista** pode estar associada a um ou mais **níveis**.

#### **Configurações (Configurations)**
O modelo **Configuration** armazena as configurações personalizadas dos usuários, como preferências de jogo ou sistema. Cada configuração está associada a um **usuário**.

- **Relacionamentos**:
  - Cada **configuração** pertence a um **usuário**.

#### **Progressos (Progress)**
O modelo **Progress** registra o progresso de um usuário em um nível específico. Ele contém informações sobre a **pontuação**, o número de **tentativas** e se o **nível foi completado**. Cada progresso está vinculado a um **usuário** e a um **nível**.

- **Relacionamentos**:
  - Um **progresso** pertence a um **usuário**.
  - Um **progresso** pertence a um **nível**.

#### **Feedbacks (Feedbacks)**
O modelo **Feedback** permite que os usuários enviem comentários ou avaliações sobre os níveis ou a aplicação. Cada feedback está associado a um **usuário** e contém uma **mensagem** e uma **nota**.

- **Relacionamentos**:
  - Um **feedback** pertence a um **usuário**.

### Relacionamentos no Banco de Dados

Com o Sequelize, podemos mapear os relacionamentos de forma eficiente, simplificando as operações entre as tabelas. Os principais tipos de relacionamentos que estamos utilizando são:

- **Um para Muitos (One-to-Many)**: 
  - Exemplo: Um **usuário** pode ter muitos **feedbacks**. Neste tipo de relacionamento, uma tabela (a "pai") pode estar associada a múltiplas instâncias em outra tabela (a "filha").
  
- **Muitos para Muitos (Many-to-Many)**:
  - Exemplo: **Níveis** e **Conquistas** podem estar associados de maneira mútua, onde um nível pode ter várias conquistas e uma conquista pode estar vinculada a múltiplos níveis. Este tipo de relacionamento é tratado com o uso de tabelas de junção.

### Sincronização e Criação das Tabelas

Uma vez que os modelos estão definidos, o Sequelize pode sincronizar esses modelos com o banco de dados, criando as tabelas e seus relacionamentos automaticamente. A sincronização pode ser feita a qualquer momento, e as tabelas podem ser recriadas usando a opção `force: true` durante o desenvolvimento, para garantir que as alterações nos modelos sejam refletidas no banco de dados.

### Exemplo de Relacionamento no Banco de Dados

Abaixo, um exemplo de como seriam os relacionamentos entre as tabelas no banco de dados:

- **Tabela Users**: Armazena os dados dos usuários, como nome, email e senha.
- **Tabela Levels**: Armazena os dados dos níveis, incluindo nome, descrição e dificuldade.
- **Tabela Achievements**: Armazena as conquistas dos usuários, incluindo nome, descrição e requisitos.
- **Tabela Configurations**: Armazena as configurações específicas de cada usuário, como preferências.
- **Tabela Progress**: Armazena o progresso de cada usuário em um nível específico, incluindo pontuação e status de conclusão.
- **Tabela Feedbacks**: Armazena o feedback dado pelos usuários sobre os níveis ou a aplicação em si.

Cada uma dessas tabelas está conectada por **relacionamentos de chave estrangeira** para garantir a integridade dos dados, permitindo que as operações de CRUD sejam feitas de maneira eficiente e segura.

---

Com esta estrutura, a aplicação está bem definida, com relacionamentos claros entre os modelos, o que permite uma fácil expansão e manutenção à medida que novas funcionalidades forem sendo implementadas.

## 5. Pesquisa e Apresentação do Trabalho Desenvolvido

A pesquisa realizada para este trabalho visou entender as tecnologias utilizadas e suas vantagens, comparando-as com outras soluções do mercado. Utilizamos as seguintes tecnologias e ferramentas:

### Express.js
**Express.js** é um framework minimalista para **Node.js**, que facilita a construção de APIs RESTful. Ele fornece uma estrutura simples e direta para roteamento, manipulação de requisições HTTP e integração com outras bibliotecas e middlewares, permitindo que o desenvolvedor se concentre em implementar a lógica de negócios sem precisar se preocupar com a configuração do servidor e o tratamento de solicitações HTTP.

**Vantagens do Express.js:**
- Simplicidade e flexibilidade.
- Suporte para middlewares, o que facilita a adição de funcionalidades como autenticação e verificação de dados.
- Grande comunidade e vasta documentação.

### Sequelize ORM
**Sequelize** é uma ferramenta de mapeamento objeto-relacional (**ORM**) que facilita a interação com bancos de dados relacionais, como o **PostgreSQL**, abstraindo o uso de SQL e permitindo a criação de consultas complexas de maneira mais simples e intuitiva.

**Vantagens do Sequelize:**
- Facilita o gerenciamento de dados com suporte a operações CRUD.
- Oferece migrações automáticas e gerenciamento de esquemas.
- Suporte para modelos de dados, associações e validações.
  
### PostgreSQL
**PostgreSQL** é um banco de dados relacional robusto e de código aberto. Ele oferece suporte a transações ACID, integridade referencial e escalabilidade. No contexto dessa aplicação, o PostgreSQL foi escolhido devido à sua confiabilidade e capacidade de lidar com consultas complexas de maneira eficiente.

**Vantagens do PostgreSQL:**
- Suporte a tipos de dados avançados, como JSON, arrays e full-text search.
- Suporte completo a transações e integridade de dados.
- Escalabilidade horizontal e vertical.
  
### 5.1 Tendências de Tecnologias

#### Conteúdo Estático e Renderizado no Servidor
Embora o foco desta aplicação seja uma API, muitas aplicações web modernas estão migrando para renderização do lado do servidor, utilizando frameworks como **Next.js**. Essa abordagem melhora o desempenho da aplicação, permitindo que o conteúdo seja pré-renderizado e entregue mais rapidamente aos usuários, especialmente em sites dinâmicos ou com grande volume de tráfego.

**Vantagens dessa tendência:**
- Aumento da performance e da experiência do usuário com páginas que carregam mais rápido.
- SEO melhorado, já que o conteúdo está disponível para os motores de busca no momento em que a página é carregada.

#### Microsserviços
A arquitetura de **microsserviços** é uma abordagem onde a aplicação é dividida em vários serviços independentes, cada um responsável por uma parte específica da lógica de negócios. Essa abordagem facilita a escalabilidade, a manutenção e a implementação de novas funcionalidades.

**Vantagens da Arquitetura de Microsserviços:**
- Cada serviço pode ser escalado de forma independente, otimizado conforme necessário.
- Permite o uso de tecnologias diferentes para cada serviço, conforme a necessidade específica de cada componente.
- Facilitando a manutenção e o desenvolvimento, pois as equipes podem trabalhar em serviços isolados sem afetar outros componentes da aplicação.

Neste projeto, podemos expandir a aplicação para microsserviços, onde cada entidade seria tratada por um serviço específico (ex.: um serviço para **Users**, outro para **Levels**, outro para **Progress**, etc.).

#### Middleware de Aplicações Descentralizadas: Blockchain
O uso de **blockchain** como middleware está ganhando destaque no desenvolvimento de sistemas descentralizados, especialmente em áreas como segurança de dados e autenticação. O blockchain garante a transparência, imutabilidade e segurança dos dados de maneira descentralizada, sem a necessidade de uma autoridade central.

**Vantagens do Blockchain:**
- **Segurança** aprimorada, com dados imutáveis e auditáveis.
- **Transparência**, onde todas as transações são registradas de forma acessível e auditável por todos os participantes.
- Potencial para transformar sistemas de **gestão de dados descentralizados**.

No caso dessa aplicação o **blockchain** não foi utilizado.

---

## 6. Testes da API

Todos os serviços da API foram testados utilizando o **Postman**, abrangendo os métodos **POST**, **GET**, **PUT** e **DELETE** para garantir a funcionalidade adequada de cada rota. Além disso, foram criados testes de **integração** para validar a correta interação entre a aplicação e o banco de dados **PostgreSQL**.

### Testes de API
Os testes realizados garantem que os métodos CRUD (Create, Read, Update, Delete) estejam funcionando conforme esperado para todas as rotas da API, permitindo que os dados sejam manipulados de forma consistente e eficiente.

**Exemplo de Testes:**
- **POST** para criar novos registros de usuários, níveis, conquistas, etc.
- **GET** para recuperar registros e verificar se a resposta contém os dados corretos.
- **PUT** para atualizar registros existentes e garantir que os dados sejam modificados corretamente.
- **DELETE** para remover registros e verificar se a exclusão foi feita com sucesso.

Esses testes são essenciais para garantir que a aplicação esteja funcionando conforme o esperado e para identificar possíveis falhas antes de colocar a API em produção.