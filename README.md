<!-- PROJECT LOGO -->
<p align="center" style="margin-top: -80px;">
  <a href="https://www.hotlapmode.app/">
   <img src="https://www.hotlapmode.app/images/hlm.png" alt="Logo">
  </a>

  <h3 align="center" style="margin-top: -100px;"><a href="https://hotlapmode.app/"><strong>hotlapmode.app</strong></a></h3>

  <p align="center">
    An interactive website where you can discover everything you need to know about f1 driver/team comparisons and more!
    <br />
    <a href="https://hotlapmode.app/"><strong>View more »</strong></a>
</p>

## About The Project

[hotlapmode.app](https://hotlapmode.app) is an interactive website where you can discover everything you need to know about teammate comparisons and more! Through various functions within the website Formula 1 fans will now have a more accurate insight in the pace differences between drivers and teams. And more is to come!

### Built With

- [SvelteKit](https://kit.svelte.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [ChartJS](https://www.chartjs.org/)
- [Vite](https://vitejs.dev/)
- [lru-cache](https://www.npmjs.com/package/lru-cache)
- [satori-html](https://www.npmjs.com/package/satori-html) - for url previews
- [google-spreadsheet](https://www.npmjs.com/package/google-spreadsheet) - to get the data from the google sheet

Deployed on [Vercel](https://vercel.com/)

## Getting started

### Prerequisites

What you need to run it locally:

- Node.js 16.0.0 or higher (https://nodejs.org/en/download/)

Create a .env file in the root of the project and add the following:

```bash
SPREADSHEET_ID=''
GOOGLE_SHEETS_CLIENT_EMAIL=''
GOOGLE_SHEETS_PRIVATE_KEY=''
```

### Run locally

```bash
npm install
npm run dev
```

### Deployment

The project is deployed on [Vercel](https://vercel.com/). When you push to the prod branch, Vercel will automatically deploy the project.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
