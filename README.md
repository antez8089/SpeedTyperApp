# SpeedTyping

## PAP24 - Z02

##  Autorzy:
- Kacper Bielak
- Antoni Grajek
- Paweł Grzankowski
- Igor Szabłowski

## Opis aplikacji
Aplikacja webowa do testowania i trenowania szybkiego pisania. Użytkownik będzie miał możliwość założenia konta co umożliwi mu śledzenie progresu oraz zbieranie osiągnięć. Użytkownik będzie mógł także tworzyć swój własny zbiór słów, bądź tekstów na których będzie mógł trenować. Domyślnie aplikacja będzie dobierać użytkownikowi częściej słowa na których się najczęściej mylił. Niezalogowany użytkownik będzie miał dostęp do sprawdzenia swojego WPM na narzuconych przez stronę słowach.

## Założenia projektowe
### Architektura rozwiązania
Aplikacja zostanie stworzona w architekturze trzywarstwowej z podziałem na bazę danych, serwer i klienta. Baza danych będzie stworzona w PostgreSQL, serwer w języku Java z wykorzystaniem Springa, natomiast klient w React. Komunikacja pomiędzy klientem, a serwerem będzie odbywać się za pomocą protokołów REST.

#### Klient

#### Serwer

#### Baza Danych


### Kontrolery
- Autoryzacja użytkownika (logowanie i rejestracja)
- Raport o wynikach użytkownika (czas, błędy)
- Personalizacja konta (baza własnych słów)

### Wstępne założenia struktury bazy danych
#### Tabele:
 - Users:\
 Tabela zawierająca dane do uwierzytelniania użytkownika.
 - WordsContainers:\
 Tabela zawierająca między innymi swoją nazwę, będąca połączona relacją z użytkownikiem.
 - Words:\
 Tabela zaweierająca słowo, współczynnik pomyłek (dobierany na zasadzie tego jak często użytkownik mylił się na danym słowie), będąca połączona relacją ze zbiorem słów.

Oraz inne tabele związane z osiągnięciami użytkownika, oraz jego personalnymi ustawieniami.\

Daje nam to wstępną bazę danych w której użytkownik może mieć wiele swoich zbiorów słów, a każdy zbiór może posiadać wiele słów.\
Dzięki temu użytkownik będzie miał swobodny wybór treningu pomiędzy swoimi zbiorami.

### API
Na ten moment do pobierania słów korzystamy z API: https://random-word-api.herokuapp.com/home