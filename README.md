## Admin verktyg för O2FORT med event hantering för att ladda upp bilder till hemsidan.

Vad ska denna admin sida kunna göra och hur är flödet?

`table EVENTS`
`id: uuid`
`datum: Date`
`title: string/text`
`image: string/text`
`added_date: timestamp`
`added_user: User` <== nödvändigt? Prata med SpaceCode

// databastabell för Events 2026-02-23
id: uuid,
created_at: timestamptz
title: text,
image_url: text
duration_number: int4
start_at_utc: timestamptz


# Vad ska en användare kunna göra?
- [ ] En användare ska kunna se alla event
- [x] En användare ska kunna skapa ett event
- [ ] En användare ska kunna ändra ett event
- [ ] En användare ska kunna radera ett event
- [x] En användare ska kunna se kommande event

# Hur ska flödet vara?
- [x] En användare ska kunna ladda upp en bild
- [x] Bilden ska laddas upp till en folder /uploaded
- [x] När sidan får tillbaka url från bucket ska användaren skickas till ny sida
- [ ] Nya sidan:
- - [x] Här ska användaren kunna skapa ett event och fylla i datum för eventet, titel och med den uppladdade bilden
- - [x] Skapas ett event skickas bilden från /uploaded till /events och bilden på /uploaded raderas samt en refresh körs på GET och användaren skickas tillbaka till startsidan
- - [ ] Hantera felaktiga inputs
- - [ ] Knappen är inactive om inte alla valideringar === true
- - [x] Skapas INTE ett event ska bilden raderas från /uploaded

# Kommande features?
- [ ] En användare ska kunna ladda upp fler bilder och skapa flera events samtidigt
- [ ] Implementera AgGrid för snyggare visuell visning
- [ ] Ta bort gamla efter att datumet passerat alternativt lägga undan eventet eller sätta en flagga på klassobjektet <== inte tänkt klart här
- [ ] kolla hantering av nya users