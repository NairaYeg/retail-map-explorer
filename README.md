# 🗺️ Store & Product Price Explorer

A React-based dashboard for visualizing store locations and product prices using Ant Design, Leaflet, and ECharts.

---

## 📝 Overview

Interactive dashboard displaying store locations, product prices, and store counts by **insegna** and **gruppo**. Features a responsive UI, map, charts, and product search with price-based marker coloring.

---

## Tech Stack

- **Framework:** React  
- **Map:** react-leaflet / Leaflet 🗺️  
- **Charts:** ECharts for React 📊  
- **UI:** Ant Design 🎨  

---

## ✨ Features

- **Dashboard Shell:** Ant Design Layout with navigation.
- **Map:** Leaflet map with store markers, tooltips (address, insegna, gruppo, prices), and modal on click.
- **Charts:** ECharts bar charts for store counts by insegna and gruppo.
- **Product Search:** Ant Design AutoComplete to filter stores by product, with yellow-to-blue gradient markers (optimized for color-blind friendliness) based on base_price.

---

## 🚀 Setup

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:NairaYeg/retail-map-explorer.git
    cd retail-map-explorer
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Start the development server:**
    ```bash
    npm start
    ```

5.  **Open the application:**
    Open [http://localhost:3000](http://localhost:3000) in your browser.


## 🚧  Improvements

- **Accessibility:** Add ARIA tags for screen readers.
- **Responsiveness:** Improve mobile map and layout scaling.
- **Edge Cases:** Show clear errors for data or network issues.
- **Testing:** Add unit test case coverage.

Built with ❤️ by Naira - June 16, 2025

Connect with me on [LinkedIn](https://www.linkedin.com/in/naira-yeghiazaryan-35398413b/) or [GitHub](https://github.com/NairaYeg)