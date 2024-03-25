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

### Kontrolery
- Autoryzacja użytkownika (logowanie i rejestracja)
- Raport o wynikach użytkownika (czas, błędy)
- Personalizacja konta (baza własnych słów)

### API
Na ten moment do pobierania słów korzystamy z API: https://random-word-api.herokuapp.com/home