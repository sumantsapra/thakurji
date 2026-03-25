# ThakurJi Hair Salon - Static Website

A modern, jazzy static website concept for **ThakurJi Hair Salon** with:
- call-only bookings (no online booking)
- Google Map embed in Contact section
- Google review testimonial section
- multiple visual theme options

## Files
- `index.html` - full page markup
- `styles.css` - visual design and responsive styling
- `script.js` - theme switching + current year
- `assets/logo.svg` - placeholder logo (replace with real logo)

## Important Next Steps

### 1) Replace logo with original business logo
- Keep same filename or update path in `index.html`.
- Current logo path: `assets/logo.svg`

### 2) Update business details
In `index.html`, replace these placeholders:
- Phone: `0395440478`
- Address: `147 carinish road Clayton VIC 3168`
- Email: `thakurjihairsalon@gmail.com`
- Opening hours

### 3) Map pin location
Map currently uses a search query embed:
- `https://www.google.com/maps?q=147+carinish+road+Clayton+VIC+3168&output=embed`

If you have exact coordinates/place URL, update this iframe source for precise pin placement.

### 4) Google testimonials
The testimonial cards currently use sample review snippets from public Google reviews. For compliance and freshness:
- keep names + source attribution as Google Review
- update the "Read More on Google" link to the exact Google Business profile review page

## Theme Options Included
- **Royal Gold** (premium luxe)
- **Neon Pop** (energetic and youthful)
- **Electric Purple** (bold and trendy)

Theme is switchable from the hero section and persists via browser local storage.

## Run locally
Just open `index.html` in a browser.

No build tools required.
