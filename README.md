# Etymolog UI

A Vue.js web application for exploring etymology dictionaries, word sources, and linguistic relationships.

## Features

- **Word Search**: Search through etymology dictionaries and explore word origins
- **Dictionary Browser**: Browse different etymology dictionaries and sources
- **Source Management**: View and manage linguistic sources and references
- **Tag System**: Organize and filter content using tags
- **Responsive Design**: Modern, mobile-friendly interface

## Technology Stack

- **Frontend**: Vue 2.6 with TypeScript
- **State Management**: Vuex
- **Routing**: Vue Router
- **Build Tool**: Vue CLI 4.3
- **Package Manager**: Yarn
- **Linting**: ESLint with TypeScript support

## Project Structure

```
src/
├── views/          # Main application views
│   ├── Main.vue           # Homepage
│   ├── Search.vue         # Search interface
│   ├── Word.vue           # Word detail view
│   ├── Dictionaries.vue   # Dictionary listing
│   ├── DictionaryDetail.vue
│   ├── Sources.vue        # Source management
│   ├── SourceDetail.vue
│   └── TagDetail.vue      # Tag-based filtering
├── store/          # Vuex store modules
├── router/         # Vue Router configuration
└── main.ts         # Application entry point
```

## Development Setup

### Prerequisites

- Node.js (version 14 or higher)
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd etymolog-ui
```

2. Install dependencies:
```bash
yarn install
```

### Development Commands

#### Start development server
```bash
yarn serve
```
Compiles and serves the application with hot-reload at `http://localhost:8080`

#### Build for production
```bash
yarn build
```
Compiles and minifies files for production deployment in the `dist/` directory

#### Run linter
```bash
yarn lint
```
Lints and fixes TypeScript/JavaScript files according to project standards

## Configuration

### Customize Vue CLI configuration
See [Vue CLI Configuration Reference](https://cli.vuejs.org/config/) for detailed configuration options.

### TypeScript Configuration
The project uses TypeScript with Vue class components and property decorators for enhanced type safety and development experience.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
