# Bonhomiee 

A modern travel homepage built with **Next.js 13+, TailwindCSS, and Framer Motion**.  
This project showcases a smooth landing experience with animated sections, gradients, and interactive UI.

---

## Getting Started


### Installation

1. **Clone this repository**
   ```bash
   git clone https://github.com/hitsmee814-bot/Mockup.git
   cd mockup-ui
   change .env file (image version)
   -->vi .env
   --> shift+i
   --> change the text (image version)


### Docker

Build and host the static site with a versioned image:

```bash
dokcer compose build (just to test image build )
docker compose up --build -d
```

The site is available at `http://150.241.244.100:35431/admin/`. Change the host port with
`MOCKUP_PORT=35431`. The deployed version is available at
`http://localhost:8080/Mockup/version.json`.

Edit `IMAGE_VERSION` in `.env` before rebuilding. This creates an image named
`mockup:<version>`:

```bash
docker compose up --build -d
```

