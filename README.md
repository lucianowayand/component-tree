# Asset Tree View Application

This project implements a dynamic Tree View Application for visualizing a company's assets, components, and locations. The hierarchy is represented through a tree structure, providing features like search, filtering by sensor types, and critical sensor status. Built with Vite and React and styled using Material-UI, this application is optimized for deployment on Vercel.

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [API-Endpoints](#api-endpoints)
- [Improvements](#improvements)
- [Prerequisites](#prerequisites)
- [License](#license)

## Getting Started

To get started with this template, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/lucianowayand/component-tree.git
   ```

2. Install dependencies:
    ```bash
    cd component-tree
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

4. Open your browser and navigate to `http://localhost:5173`

## Features

The core feature of this application is a Tree View that represents a company's asset hierarchy. This includes components, assets, and locations, displayed in a dynamic tree structure.

* Dynamic Tree Structure: Display the hierarchy of locations, sub-locations, assets, sub-assets, and components.
* Component Representation: Icons are used to differentiate between locations, assets, and components.
* Sensor Information: Components display additional details such as vibration or energy sensor types and their operational status (operating or alert).
* Modular: Built with reusable React components.
* Responsive UI: Ensures a smooth experience across devices.

## API Endpoints

The application fetches data from a mock API, using the following endpoints:

1. `/companies`: Retrieves all companies.
2. `/companies/:companyId/locations`: Returns all locations and sub-locations of a specific company.
3. `/companies/:companyId/assets`: Returns all assets, sub-assets, and components of a specific company.

## Improvements
Given more time, I would improve the following aspects of the project:

1. Performance Enhancements: Optimize the tree rendering for larger datasets by implementing virtualization or lazy-loading.
2. Real-Time Updates: Integrate WebSocket or long polling to fetch real-time status updates for assets and components.
3. Enhanced UI/UX: Add animations for better navigation and user experience within the tree structure.

## Prerequisites
Before you begin, ensure you have the following installed:

* Node.js (v14 or higher)
* npm or yarn
* Vercel CLI (optional but recommended for easy deployment)

## License
This project is licensed under the MIT License - see the LICENSE file for details.