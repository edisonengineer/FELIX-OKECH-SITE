# Felix Oketch — Solar Products Portfolio

A responsive single-page e-commerce portfolio for **Felix Oketch**, Renewable Energy Graduate, Energy Scientist & Researcher and Technical Sales Engineer based in Kasarani, Nairobi, Kenya.

Plain HTML, CSS and JavaScript. No build step and no dependencies apart from Google Fonts.

## Features

- Sticky, responsive navigation with a mobile menu and active-section highlighting
- Hero section with a "Browse Solar Products" call to action
- Product catalog (8 products) with category filters
- Hover overlay on each card with **Add to Cart** and **Order on WhatsApp**. On touch screens these buttons are always visible.
- Product detail modal: large image, description, key features, technical specification table, price, **Order on WhatsApp** and **Contact for Installation** buttons. It closes with the X button, the Escape key or a click on the backdrop.
- Cart drawer: change quantities, see a running total and **check out on WhatsApp** with an itemised order message. The cart is kept in `localStorage`.
- **Free Energy Assessment form**: a 4-step form (contact details, current power source and bill, appliance list, needs and budget) with a live solar sizing estimate. Submissions are emailed to Felix through [Web3Forms](https://web3forms.com), and there is a "send on WhatsApp" copy.
- **Client reviews**: testimonial cards (carousel on phones) and a "Leave a Review" form that emails new reviews to Felix
- About section with experience timeline, and a contact footer (email, phone/WhatsApp, LinkedIn, location)
- Accessible: keyboard support, focus trapping in dialogs, `prefers-reduced-motion` support

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure and content |
| `styles.css` | Design system and responsive layout |
| `script.js` | Product data, rendering, modal, cart and WhatsApp links |
| `assessment.js` | Energy assessment form, sizing estimate and submission |
| `reviews.js` | Client reviews list, photo gallery and "Leave a Review" form |
| `images/reviews/` | Client installation photos |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |

## Customising

All settings are at the top of `script.js`:

- **WhatsApp number**: `CONFIG.whatsappNumber` (international format, no `+`)
- **Products**: edit the `PRODUCTS` array to change name, price, description, features, specs or badge
- **Real product photos**: add an `image` field, e.g. `image: "images/panel-550w.jpg"`. It replaces the built-in SVG illustration.

- **Form delivery**: `CONFIG.web3formsKey` is the Web3Forms access key. Submissions go to the email address on that Web3Forms account.
- **Appliances and sizing assumptions**: `APPLIANCES` and `SIZING` at the top of `assessment.js`

### Client installation photos
Review photos live in `images/reviews/` with lowercase, no-space names (e.g. `lawrence-1.jpg`). Reference them in the `photos` list of the client's entry in `reviews.js`. The first photo is the cover; visitors click it to open a full-screen gallery.

### Adding real client reviews
Open `reviews.js` and edit the `REVIEWS` list at the top. When a client sends a review through the website you get an email with their name, location, rating and text; copy those into a new entry. Delete the three `sample: true` entries once you have real reviews. Sample cards are tagged "Sample" and are left out of the star-rating summary, which only appears once real reviews exist.

### Forms (Web3Forms)
Both forms (energy assessment and reviews) send through Web3Forms and arrive by email at the address registered on the Web3Forms account. No activation step is needed. Send one test submission after each upload to confirm.

### After uploading changes
`index.html` loads the other files with a version number (e.g. `script.js?v=5`). After changing any `.js` or `.css` file, increase this number (for example to `?v=6`) so visitors' browsers fetch the new file instead of an old cached copy.

The phone number also appears in the contact section of `index.html` (`tel:` link).

## Deploy to GitHub Pages

1. Push these files to the `main` branch.
2. On GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, then select `main` and `/ (root)`.
4. The site will go live at `https://<username>.github.io/<repo-name>/`.

To preview locally, open `index.html` in a browser, or run `python3 -m http.server` and visit http://localhost:8000.
