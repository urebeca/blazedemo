# Feature file generated from: exp003/test-plan-blazedemo-navegacion.md
# Site under test: https://blazedemo.com
# Issue: "Links, buttons and menu options aren't accessed correctly"

@navigation @blazedemo
Feature: Navigation through links, buttons and menu on BlazeDemo
  As a user of the travel agency
  I want to navigate the menu, links and buttons
  So that I can search and book flights without errors

  Background:
    Given the user opens the BlazeDemo home page

  # =====================================================================
  # Top menu (NAV-01 to NAV-07)
  # =====================================================================

  @menu @P1 @NAV-01
  Scenario: The "Travel The World" menu navigates home from the index page
    When the user clicks the "Travel The World" link
    Then the browser should navigate to "index.php"
    And the page should load without HTTP errors

  @menu @P1 @NAV-02
  Scenario: The "Travel The World" menu navigates home from the flight results page
    Given the user searches for a flight from "Boston" to "Rome"
    When the user clicks the "Travel The World" link from "reserve.php"
    Then the browser should navigate to "index.php"
    And the flights table should no longer be displayed

  @menu @P1 @NAV-03
  Scenario: The "Travel The World" menu navigates home from the purchase page
    Given the user reserves the flight in row 1
    When the user clicks the "Travel The World" link from "purchase.php"
    Then the browser should navigate to "index.php"
    And no HTTP error should occur

  @menu @P1 @NAV-04
  Scenario: The "home" menu navigates to /home from the index page
    When the user clicks the "home" link
    Then the browser should navigate to "/home"
    And the page should load without HTTP errors

  @menu @P1 @NAV-05
  Scenario: The "home" menu navigates to /home from the flight results page
    Given the user searches for a flight from "Boston" to "Rome"
    When the user clicks the "home" link from "reserve.php"
    Then the browser should navigate to "/home"

  @menu @P1 @NAV-06
  Scenario: The "home" menu navigates to /home from the purchase page
    Given the user reserves the flight in row 1
    When the user clicks the "home" link from "purchase.php"
    Then the browser should navigate to "/home"

  @menu @P2 @NAV-07
  Scenario: The "home" menu navigates to /home from the vacation page
    Given the user opens the "vacation.html" page
    When the user clicks the "home" link
    Then the browser should navigate to "/home"

  # =====================================================================
  # Content links (NAV-08 to NAV-11)
  # =====================================================================

  @links @P2 @NAV-08
  Scenario: The promotional link opens the destination of the week page
    When the user clicks the "destination of the week! The Beach!" link
    Then the browser should navigate to "vacation.html"
    And the text "Destination of the week: Hawaii !" should be displayed

  @links @P2 @NAV-09
  Scenario Outline: All links on the vacation page are valid
    Given the user opens the "vacation.html" page
    When the user clicks the "<link>" link
    Then the browser should navigate to "<target>"
    And no 404 error should be returned

    Examples:
      | link             | target    |
      | Travel The World | index.php |
      | home             | /home     |

  @links @P2 @NAV-10
  Scenario Outline: All links on the /home page are valid
    Given the user opens the "/home" page
    When the user clicks the "<link>" link
    Then the browser should navigate to "<target>"
    And no 404 error should be returned

    Examples:
      | link             | target    |
      | Travel The World | index.php |
      | home             | /home     |

  @links @P3 @NAV-11 @known-bug
  Scenario: The reservation.php link returns 404 (known BUG-01)
    When the user navigates directly to "reservation.php"
    Then the server should respond with HTTP status code "404"
    And the team should confirm that it matches the documented BUG-01

  # =====================================================================
  # Main flow buttons (NAV-12 to NAV-17)
  # =====================================================================

  @buttons @P0 @NAV-12 @happy-path
  Scenario: "Find Flights" displays the flights table with valid cities
    When the user searches for a flight from "Boston" to "Rome"
    Then the browser should navigate to "reserve.php"
    And the table should show at least 1 row
    And the table should show the columns "Flight #", "Airline", "Departs", "Arrives" and "Price"
    And every price should follow the "$X.XX" format

  @buttons @P1 @NAV-13 @negative
  Scenario: "Find Flights" without selecting cities does not cause a fatal error
    When the user leaves the dropdowns on "Choose" and clicks "Find Flights"
    Then no HTTP 500 error should be displayed
    And no blank page should be displayed
    And there should be no unhandled JavaScript exceptions

  @buttons @P0 @NAV-14 @happy-path
  Scenario: "Choose" in row 1 opens the purchase page with the flight data
    Given the user searches for a flight from "Boston" to "Rome"
    And the user notes the airline, flight number and price of row 1
    When the user clicks "Choose" in row 1
    Then the browser should navigate to "purchase.php"
    And the airline shown should match the one in row 1
    And the flight number shown should match the one in row 1
    And the "Total Cost" should equal "Price" plus "Arbitrary Fees and Taxes"

  @buttons @P1 @NAV-15
  Scenario: "Choose" in the last row opens the purchase page with the flight data
    Given the user searches for a flight from "Boston" to "Rome"
    And the user notes the data of the last row of the table
    When the user clicks "Choose" in the last row
    Then the browser should navigate to "purchase.php"
    And the data shown should match the one in the last row

  @buttons @P2 @NAV-16 @boundary
  Scenario: Rapid double click on "Choose" does not trigger double navigation
    Given the user searches for a flight from "Boston" to "Rome"
    When the user rapidly double-clicks "Choose" in row 1
    Then at most one navigation to "purchase.php" should occur
    And there should be no unhandled JavaScript exceptions

  @buttons @P1 @NAV-17
  Scenario: The purchase form submit button responds to click
    Given the user reserves the flight in row 1
    And the user fills in the purchase form with valid data
    When the user clicks the submit button
    Then the form should be processed without an HTTP 500 error

  # =====================================================================
  # Keyboard accessibility (NAV-18 to NAV-20)
  # =====================================================================

  @accessibility @keyboard @P2 @NAV-18
  Scenario: Tabbing cycles through interactive elements with visible focus
    When the user presses "TAB" repeatedly from the start
    Then the focus should move through the menu links
    And the focus should move through the dropdowns
    And the focus should reach the "Find Flights" button
    And every focused element should show a visual indicator

  @accessibility @keyboard @P2 @NAV-19
  Scenario: A link is activated with the Enter key
    Given the user focuses the "home" link with the keyboard
    When the user presses "Enter"
    Then the browser should navigate to "/home"

  @accessibility @keyboard @P2 @NAV-20
  Scenario: A button is activated with Enter or Space from the keyboard
    Given the user searches for a flight from "Boston" to "Rome"
    When the user focuses the "Choose" button in row 1 with the keyboard
    And the user presses "Enter" or "Space"
    Then the browser should navigate to "purchase.php"

  # =====================================================================
  # Secondary navigation (NAV-21 — new case)
  # =====================================================================

  @secondary-navigation @P1 @NAV-21 @new
  Scenario: The "change flight" link returns to the flight selection
    Given the user reserves the flight in row 1
    When the user clicks the "change flight" link from "purchase.php"
    Then the browser should navigate to "reserve.php"
    And the flights table should be displayed again
    And no HTTP error should occur
