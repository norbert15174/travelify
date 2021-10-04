# Travelify
Głównym celem pracy inżynierskiej jest stworzenie aplikacji internetowej, która umożliwi integrację osób o zainteresowaniach podróżniczych. Pozwoli ona na utworzenie profilu osobowego, w którym będą przechowywane wspomnienia z odbytych podróży w formie albumów publicznych, bądź prywatnych. Profil ten będzie także zawierać podstawowe informacje o użytkowniku, co sprawi, że inni podróżnicy o podobnych zainteresowaniach będą mogli nawiązać komunikację w celu zawarcia znajomości - będzie ona realizowana przy użyciu komunikatora tekstowego.    

Dodatkowym aspektami naszej pracy są:  
- aktualności wyświetlające ostatnio dodane albumy,
- udostępnianie albumów prywatnych wybranym znajomym,  
- oznaczanie osób na zdjęciach,  
- komentowanie zdjęć,
- tworzenie albumów w ramach grup,   
- wyświetlanie lokalizacji albumów na mapie Google'a w formie pinezek.  
___
The main goal of our Engineering Thesis is to create social media web application, which will enable the integration of people interested in travelling. The user will create his profile in which he will store his travel memories in the form of public or private albums. Profile will also contain basic user information like interests and visited countries, which will make other people with similar interests make friends and communicate using built in chat.    

An additional aspect of our thesis are:  
- news feed with recently added albums,
- sharing private albums with selected friends,
- taging friends on album photos,  
- commenting album photos,  
- creating albums within groups
- displaying the location of album on Gooogle Map with a pin,

## Autorzy / Authors  
- [Norbert Faron - Backend](https://github.com/norbert15174)
- [Mikołaj Telec - Frontend](https://github.com/miki799)  
  
  Studenci Elektroniki i Telekomunikacji na Wydziale Informatyki, Elektroniki i Telekomunikacji Akademii Górniczo-Hutniczej im. Stanisława Staszica w Krakowie.  
  ___
  Students of Electronics and Telecommunications at the AGH University of Science and Technology in Cracow.

#	Proces tworzenia aplikacji / Application development process
##	Backend
#####	Stworzenie struktury bazy danych oraz implementacja mechanizmów integrujących bazę danych z aplikacją
#####	Połączenie aplikacji z Google Cloud Platform, które umożliwi na bezpieczne  przechowywanie danych użytkownika
#####	Autoryzacja użytkownika
#####	Stworzenie architektury funkcjonowania serwisu oraz wystawienie punktów końcowych pozwalających na komunikację z serwerem.
#####	Połączenie aplikacji z mechanizmem kolejkowania wiadomości  
___
##### Creating database structure and implementation of mechanisms integrating it with application
#####	Connecting apllication with Google Cloud Platform, which will enable safe storage of user data
#####	User authorization
#####	Stworzenie architektury funkcjonowania serwisu oraz wystawienie punktów końcowych pozwalających na komunikację z serwerem.
#####	Connecting application with message queue  
##	Frontend
#####	Stworzenie schematu wyglądu aplikacji przy użyciu edytora graficznego [Figma (link do projektu)](https://www.figma.com/file/i6w1K9kje8fKjfFuJhMrfc/TravelifyProjekt?node-id=0%3A1),
#####	Implementacja wyglądu aplikacji oraz logiki, która umożliwi prawidłowe korzystanie z platformy
#####	Implementacja mechanizmów pozwalających na połączenie z backendem,
#####	Połączenie aplikacji z Google Maps API
___
#####	Creating application design project in [Figma (link)](https://www.figma.com/file/i6w1K9kje8fKjfFuJhMrfc/TravelifyProjekt?node-id=0%3A1),
#####	Implementation of the design project and application logics, which will enable proper use of the application,
#####	Implementation of mechanisms enabling connection with backend,
#####	Connecting application with Google Maps API,
##	Wdrażanie aplikacji na serwer / Deploying the application to the server
#####	Implementacja certyfikatu SSL / SSL certificate implementation
##### Instalacja:
##### - bazy danych
#####	- systemu kolejkowania wiadomośc
#####	- serwera Tomcat oraz Node
##### - Dodanie plików uwierzytelniających, które pozwalają na łączenie aplikacji z Google Cloud Platform
##### - Utworzenie zmiennych środowiskowych, w celu bezpiecznego przechowywania informacji wrażliwych
___
##### Installation:
##### - database
#####	- message queue system,
#####	- Tomcat or Node server,
##### - adding of auth files for connection with GCP,
##### - creating env variables for safe storage of sensitive information

#	Wykorzystane technologie / Used technologies:

## Backend  
- Spring Boot Hibernate  
- MySQL  
- Kafka/RabbitMQ  
- Google Cloud Platform
##	Frontend  
- [Figma (project link)](https://www.figma.com/file/i6w1K9kje8fKjfFuJhMrfc/TravelifyProjekt?node-id=0%3A1),
- HTML, CSS( styled-components ),  
- JavaScript,  
- React,  
- React Redux,  
- Google Maps Platform,  
