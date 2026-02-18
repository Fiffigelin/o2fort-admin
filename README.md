## Admin verktyg för O2FORT med event hantering för att ladda upp bilder till hemsidan.

Vad ska denna admin sida kunna göra och hur är flödet?

`table EVENTS`
`id: uuid`
`datum: Date`
`title: string/text`
`image: string/text`
`added_date: timestamp`
`added_user: User` <== nödvändigt? Prata med SpaceCode


# Vad ska en användare kunna göra?
- [ ] En användare ska kunna se alla event
- [ ] En användare ska kunna skapa ett event
- [ ] En användare ska kunna ändra ett event
- [ ] En användare ska kunna radera ett event

# Hur ska flödet vara?
- [ ] En användare ska kunna ladda upp en bild
- [ ] Bilden ska laddas upp till en folder /uploaded
- [ ] När sidan får tillbaka url från bucket ska användaren skickas till ny sida
- [ ] Nya sidan:
- - [ ] Här ska användaren kunna skapa ett event och fylla i datum för eventet, titel och med den uppladdade bilden
- - [ ] Skapas ett event skickas bilden från /uploaded till /events och bilden på /uploaded raderas samt en refresh körs på GET och användaren skickas tillbaka till startsidan
- - [ ] Skapas INTE ett event ska bilden raderas från /uploaded
- - [ ] Händer inget på säg 15min ska ett script köras så att bilden raderas automatiskt??? Hmmm.... kommande feature?

# Kommande features?
- [ ] En användare ska kunna ladda upp fler bilder och skapa flera events samtidigt
- [ ] Implementera AgGrid för snyggare visuell visning
- [ ] Ta bort gamla efter att datumet passerat alternativt lägga undan eventet eller sätta en flagga på klassobjektet <== inte tänkt klart här