# Forkify 🍳

Forkify is a recipe search web app for food enthusiasts. Search thousands of recipes, view ingredients and servings, build a shopping list, save favorites, and follow step-by-step cooking directions.

## ✨ Features

- Search recipes by keyword
- View a recipe's ingredients, servings, and cooking directions
- Adjust servings and add ingredients to a shopping list
- Favorite recipes (persisted in the browser's `localStorage`)
- Browse saved favorites from the heart icon in the top-right corner

## 🛠️ Tech Stack

- **JavaScript (ES6+)** with Babel
- **Webpack 4** for bundling and dev server
- **MVC architecture** — models (`Search`, `Recipe`, `ShoppingList`, `Like`) and views
- **[Food2Fork API](https://www.food2fork.com/about/api)** for recipe data
- **Axios** for HTTP requests

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v8 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A Food2Fork API key

## 🚀 Getting Started

### 1️⃣ Get an API key

1. Register at [food2fork.com](https://www.food2fork.com/).
2. Request your API key from the [Food2Fork API page](https://www.food2fork.com/about/api).

### 2️⃣ Configure the API key

Add your key to `env.json` in the project root:

```json
{
  "api_key": "your_api_key_here"
}
```

> **Note:** Do not commit your real API key. Keep `env.json` out of version control if you fork this project.

### 3️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Run the development server

```bash
npm run build
```

This starts **webpack-dev-server** and opens the app in your browser (default: `http://localhost:8080`).

### 5️⃣ Build for production

```bash
npm run build:prod
```

Output is written to the `dist/` folder.

## 📸 Screenshot

![forkify_part1](https://i.imgur.com/hDWmJeI.png)

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm run build` | Start the webpack dev server with hot reload |
| `npm run build:prod` | Create an optimized production build in `dist/` |
| `npm test` | Placeholder — no tests configured yet |

## 📁 Project Structure

```
forkify/
├── src/
│   ├── css/           # Styles
│   ├── img/           # Icons and images
│   ├── js/
│   │   ├── models/    # Data layer (Search, Recipe, ShoppingList, Like)
│   │   ├── views/     # UI rendering
│   │   ├── app.js     # App controllers and state
│   │   └── shared.js  # API key, CORS proxy, alerts
│   └── index.html
├── env.json           # API key (not for production secrets)
├── webpack.config.babel.js
└── package.json
```

## ⚠️ Important Notes

- **Food2Fork API:** The Food2Fork service has been discontinued. The app may not return live recipe data unless you point it at a compatible API or mock data source.
- **CORS proxy:** Requests go through `cors-anywhere.herokuapp.com`. That public proxy often requires manual activation and is not suitable for production use.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🔗 Acknowledgments

Recipe data was originally provided by [Food2Fork](https://www.food2fork.com/).
