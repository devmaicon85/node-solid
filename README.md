# APP GYMPASS STYLE APP

## RFs (Requisitos funcionais)

    - [x] Deve ser possível se cadastrar;
    - [x] Deve ser possível se autenticar;
    - [x] Deve ser possível obter o perfil de um usuário logado;
    - [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
    - [x] Deve ser possível o usuário obter seu histórico de check-ins;
    - [x] Deve ser possível o usuário buscar academias próximas (até 10km);
    - [x] Deve ser possível o usuário buscar academias pelo nome;
    - [x] Deve ser possível o usuário realizar check-in em uma academia;
    - [x] Deve ser possível validar o check-in de usuário;
    - [x] Deve ser possível cadastrar uma academia; 

## RNs (Regras de negócios)

    - [x] O usuário não deve conseguir se cadastrar com um e-mail duplicado;
    - [x] O usuário não deve conseguir fazer 2 check-ins no mesmo dia;
    - [x] O usuário não deve conseguir fazer check--in se não estiver perto (100m) da academia;
    - [x] O check-in só pode ser validado até 20 minutos após criado;
    - [x] O check-in só pode ser validado por administradores;
    - [x] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não funcionais)

    requisitos que usuário nem precisa saber
    - [x] A senha do usuário precisa estar criptografada;
    - [x] Os dados do app precisam sstar persistidos em um banco POSTgreesSQL;
    - [x] Todas as listas de dados precisam estar paginadas com 20 itens por páginas;
    - [x] O usuário identificado por um JWT (Json Web Token)