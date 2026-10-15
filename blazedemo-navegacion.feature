# language: es
# Feature file generado a partir de: exp003/test-plan-blazedemo-navegacion.md
# Sitio bajo prueba: https://blazedemo.com
# Issue: "Links, botones y opciones de menú no funcionan correctamente"

@navegacion @blazedemo
Caracteristica: Navegación por enlaces, botones y menú en BlazeDemo
  Como usuario de la agencia de viajes
  Quiero navegar por el menú, los enlaces y los botones
  Para poder buscar y reservar vuelos sin errores

  Antecedentes:
    Dado que el usuario abre la página de inicio de BlazeDemo

  # =====================================================================
  # Menú superior (NAV-01 a NAV-07)
  # =====================================================================

  @menu @P1 @NAV-01
  Escenario: El menú "Travel The World" navega al inicio desde la página de inicio
    Cuando el usuario hace clic en el enlace "Travel The World"
    Entonces el navegador debe navegar a "index.php"
    Y la página debe cargar sin errores HTTP

  @menu @P1 @NAV-02
  Escenario: El menú "Travel The World" navega al inicio desde la tabla de vuelos
    Dado que el usuario busca un vuelo de "Boston" a "Rome"
    Cuando el usuario hace clic en el enlace "Travel The World" desde "reserve.php"
    Entonces el navegador debe navegar a "index.php"
    Y la tabla de vuelos ya no debe mostrarse

  @menu @P1 @NAV-03
  Escenario: El menú "Travel The World" navega al inicio desde la página de compra
    Dado que el usuario reserva el vuelo de la fila 1
    Cuando el usuario hace clic en el enlace "Travel The World" desde "purchase.php"
    Entonces el navegador debe navegar a "index.php"
    Y no debe producirse ningún error HTTP

  @menu @P1 @NAV-04
  Escenario: El menú "home" navega a /home desde la página de inicio
    Cuando el usuario hace clic en el enlace "home"
    Entonces el navegador debe navegar a "/home"
    Y la página debe cargar sin errores HTTP

  @menu @P1 @NAV-05
  Escenario: El menú "home" navega a /home desde la tabla de vuelos
    Dado que el usuario busca un vuelo de "Boston" a "Rome"
    Cuando el usuario hace clic en el enlace "home" desde "reserve.php"
    Entonces el navegador debe navegar a "/home"

  @menu @P1 @NAV-06
  Escenario: El menú "home" navega a /home desde la página de compra
    Dado que el usuario reserva el vuelo de la fila 1
    Cuando el usuario hace clic en el enlace "home" desde "purchase.php"
    Entonces el navegador debe navegar a "/home"

  @menu @P2 @NAV-07
  Escenario: El menú "home" navega a /home desde la página de vacaciones
    Dado que el usuario abre la página "vacation.html"
    Cuando el usuario hace clic en el enlace "home"
    Entonces el navegador debe navegar a "/home"

  # =====================================================================
  # Enlaces de contenido (NAV-08 a NAV-11)
  # =====================================================================

  @enlaces @P2 @NAV-08
  Escenario: El enlace promocional abre la página de destino de la semana
    Cuando el usuario hace clic en el enlace "destination of the week! The Beach!"
    Entonces el navegador debe navegar a "vacation.html"
    Y debe mostrarse el texto "Destination of the week: Hawaii !"

  @enlaces @P2 @NAV-09
  Escenario Esquema: Todos los enlaces de la página de vacaciones son válidos
    Dado que el usuario abre la página "vacation.html"
    Cuando el usuario hace clic en el enlace "<enlace>"
    Entonces el navegador debe navegar a "<destino>"
    Y no debe devolverse un error 404

    Ejemplos:
      | enlace          | destino     |
      | Travel The World | index.php   |
      | home             | /home       |

  @enlaces @P2 @NAV-10
  Escenario Esquema: Todos los enlaces de la página /home son válidos
    Dado que el usuario abre la página "/home"
    Cuando el usuario hace clic en el enlace "<enlace>"
    Entonces el navegador debe navegar a "<destino>"
    Y no debe devolverse un error 404

    Ejemplos:
      | enlace           | destino     |
      | Travel The World | index.php   |
      | home             | /home       |

  @enlaces @P3 @NAV-11 @bug-conocido
  Escenario: El enlace reservation.php devuelve 404 (BUG-01 conocido)
    Cuando el usuario accede directamente a "reservation.php"
    Entonces el servidor debe responder con el código HTTP "404"
    Y el equipo debe confirmar que corresponde al defecto BUG-01 documentado

  # =====================================================================
  # Botones del flujo principal (NAV-12 a NAV-17)
  # =====================================================================

  @botones @P0 @NAV-12 @flujo-principal
  Escenario: "Find Flights" muestra la tabla de vuelos con ciudades válidas
    Cuando el usuario busca un vuelo de "Boston" a "Rome"
    Entonces el navegador debe navegar a "reserve.php"
    Y la tabla debe mostrar al menos 1 fila
    Y la tabla debe mostrar las columnas "Flight #", "Airline", "Departs", "Arrives" y "Price"
    Y cada precio debe tener el formato "$X.XX"

  @botones @P1 @NAV-13 @negativo
  Escenario: "Find Flights" sin seleccionar ciudades no produce un error fatal
    Cuando el usuario deja los desplegables en "Choose" y hace clic en "Find Flights"
    Entonces no debe mostrarse un error HTTP 500
    Y no debe mostrarse una pantalla en blanco
    Y no debe haber excepciones de JavaScript sin controlar

  @botones @P0 @NAV-14 @flujo-principal
  Escenario: "Choose" de la fila 1 abre la compra con los datos del vuelo
    Dado que el usuario busca un vuelo de "Boston" a "Rome"
    Y el usuario anota la aerolínea, el número de vuelo y el precio de la fila 1
    Cuando el usuario hace clic en "Choose" de la fila 1
    Entonces el navegador debe navegar a "purchase.php"
    Y la aerolínea mostrada debe coincidir con la de la fila 1
    Y el número de vuelo mostrado debe coincidir con el de la fila 1
    Y el "Total Cost" debe ser igual a "Price" más "Arbitrary Fees and Taxes"

  @botones @P1 @NAV-15
  Escenario: "Choose" de la última fila abre la compra con los datos del vuelo
    Dado que el usuario busca un vuelo de "Boston" a "Rome"
    Y el usuario anota los datos de la última fila de la tabla
    Cuando el usuario hace clic en "Choose" de la última fila
    Entonces el navegador debe navegar a "purchase.php"
    Y los datos mostrados deben coincidir con los de la última fila

  @botones @P2 @NAV-16 @borde
  Escenario: Doble clic rápido en "Choose" no provoca doble navegación
    Dado que el usuario busca un vuelo de "Boston" a "Rome"
    Cuando el usuario hace doble clic rápido en "Choose" de la fila 1
    Entonces debe producirse como máximo una única navegación a "purchase.php"
    Y no debe haber excepciones de JavaScript sin controlar

  @botones @P1 @NAV-17
  Escenario: El botón de envío del formulario de compra responde al clic
    Dado que el usuario reserva el vuelo de la fila 1
    Y el usuario rellena el formulario de compra con datos válidos
    Cuando el usuario hace clic en el botón de envío
    Entonces el formulario debe procesarse sin error HTTP 500

  # =====================================================================
  # Accesibilidad por teclado (NAV-18 a NAV-20)
  # =====================================================================

  @accesibilidad @teclado @P2 @NAV-18
  Escenario: La tabulación recorre los elementos interactivos con foco visible
    Cuando el usuario pulsa "TAB" repetidamente desde el inicio
    Entonces el foco debe recorrer los enlaces del menú
    Y el foco debe recorrer los desplegables
    Y el foco debe llegar al botón "Find Flights"
    Y cada elemento enfocado debe mostrar un indicador visual

  @accesibilidad @teclado @P2 @NAV-19
  Escenario: Un enlace se activa con la tecla Enter
    Dado que el usuario enfoca el enlace "home" con el teclado
    Cuando el usuario pulsa "Enter"
    Entonces el navegador debe navegar a "/home"

  @accesibilidad @teclado @P2 @NAV-20
  Escenario: Un botón se activa con Enter o Space desde el teclado
    Dado que el usuario busca un vuelo de "Boston" a "Rome"
    Cuando el usuario enfoca el botón "Choose" de la fila 1 con el teclado
    Y el usuario pulsa "Enter" o "Space"
    Entonces el navegador debe navegar a "purchase.php"

  # =====================================================================
  # Navegación secundaria (NAV-21 — nuevo caso)
  # =====================================================================

  @navegacion-secundaria @P1 @NAV-21 @nuevo
  Escenario: El enlace "cambiar vuelo" permite volver a la selección de vuelos
    Dado que el usuario reserva el vuelo de la fila 1
    Cuando el usuario hace clic en el enlace "cambiar vuelo" desde "purchase.php"
    Entonces el navegador debe navegar a "reserve.php"
    Y la tabla de vuelos debe volver a mostrarse
    Y no debe producirse ningún error HTTP
