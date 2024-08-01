Feature: Checkout
    Scenario: Realizar um novo checkout
        Given Quando tenho um customerId
        And Quando tenho produtos com quantidades
        When Realizo o checkout 
        Then Obtenho o id do Pedido