# 🎯 Prompt Playground

A powerful and intuitive UI interface for prompt engineering and AI model experimentation. Prompt Playground provides a comprehensive toolkit for crafting, testing, and managing prompts across different AI models.

![Next.js](https://img.shields.io/badge/Next.js-15.3-black?style=for-the-badge&labelColor=000)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge&labelColor=000)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&labelColor=000)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge&labelColor=000)

## ✨ Features

### 🔄 **Model Comparison**

- Side-by-side comparison of the same model with different prompts
- Real-time response analysis and performance metrics
- Export comparison results for further analysis

### 📚 **Prompt Library**

- Organized storage for your prompt collections
- Version history tracking for prompt iterations
- Tag and categorize prompts for easy discovery
- Import/export prompt libraries

### 🎛️ **Advanced Controls**

- Fine-tune model parameters (temperature, top-p, max tokens)
- Custom system prompts and context management
- Batch testing with multiple prompt variations

### 🎨 **Modern UI/UX**

- Clean, responsive design built with shadcn/ui
- Dark/light mode support
- Intuitive drag-and-drop interfaces
- Keyboard shortcuts for power users

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/lucasdoell/prompt-playground.git
   cd prompt-playground
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Add your API keys and configuration:

   ```env
   OPENAI_API_KEY=your_openai_api_key
   ANTHROPIC_API_KEY=your_anthropic_api_key
   # Add other model provider keys as needed
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to start using Prompt Playground!

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: React Context + Hooks
- **API Integration**: Native fetch with type-safe schemas

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (app)/             # Main application routes
│   └── api/               # API endpoints
├── components/            # Reusable UI components
│   ├── chat/              # Chat and messaging components
│   ├── icons/             # Custom icon components
│   └── ui/                # shadcn/ui base components
├── contexts/              # React context providers
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and schemas
└── types/                 # TypeScript type definitions
```

## 🔮 Roadmap

- [x] **Multi-Model Support**: Integrate OpenAI, Anthropic, Google, and more
- [ ] **Prompt Templates**: Pre-built templates for common use cases
- [ ] **Collaboration**: Share prompts and collaborate with teams
- [ ] **Analytics**: Detailed performance metrics and insights
- [ ] **Prompt Optimization**: AI-powered prompt suggestions
- [ ] **Export Formats**: Support for various export formats (JSON, CSV, etc.)

## 🤝 Contributing

We welcome contributions!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [shadcn/ui](https://ui.shadcn.com/)
- Inspired by the amazing prompt engineering community
- Special thanks to all contributors and early adopters

## Contributors

<a href="https://github.com/lucasdoell/prompt-playground/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=lucasdoell/prompt-playground" />
</a>

Thanks to all the contributors who have helped make Parsertime better!

---

<div align="center">
  <strong>Happy Prompting! 🎯</strong>
</div>
