# 📊 Dynamic Table Manager

A modern, interactive table management application built with **Next.js 15**, **Redux Toolkit**, and **TypeScript**. Create, edit, and manage dynamic tables with real-time editing capabilities.

## ✨ Features

### 🎯 Core Functionality
- **Dynamic Table Creation** - Create tables with custom headers
- **Real-time Editing** - Edit cells and headers inline
- **Row & Column Management** - Add/remove rows and columns dynamically
- **Table Operations** - Copy and delete entire tables

### 🛠️ Technical Features
- **Type-safe** with TypeScript
- **State Management** with Redux Toolkit
- **Component Architecture** following Feature-Sliced Design (FSD)
- **Modern UI** with Tailwind CSS and Radix UI components
- **Form Validation** with React Hook Form and Zod

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd example
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

```
example/
├── app/                          # Next.js App Router
│   ├── favicon.ico              # App favicon
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout with providers
│   └── page.tsx                 # Home page
├── components/                   # Reusable UI components
│   ├── ui/                      # Shadcn/ui components
│   │   ├── button.tsx           # Button component
│   │   ├── dialog.tsx           # Dialog/modal component
│   │   ├── form.tsx             # Form components
│   │   ├── input.tsx            # Input component
│   │   ├── label.tsx            # Label component
│   │   ├── popover.tsx          # Popover component
│   │   ├── separator.tsx        # Separator component
│   │   └── table.tsx            # Table component
│   └── components.json          # Shadcn/ui config
├── feature/                      # Feature-based modules (FSD)
│   ├── AddTable/                # Table creation feature
│   │   ├── ui/                  # UI components
│   │   │   ├── AddTable.tsx     # Main table creation component
│   │   │   ├── HeaderField.tsx  # Individual header field
│   │   │   └── AddHeaderField.tsx # Add new header field
│   │   └── index.ts             # Feature exports
│   ├── Tables/                   # Table display feature
│   │   ├── Tables.tsx           # Tables container component
│   │   └── index.ts             # Feature exports
│   ├── EditTable/               # Table editing feature
│   │   ├── ui/                  # UI components
│   │   │   ├── EditCell.tsx     # Editable cell component
│   │   │   ├── EditHeaderField.tsx # Editable header field
│   │   │   └── EditTable.tsx    # Main edit table component
│   │   └── index.ts             # Feature exports
│   ├── AddColl/                 # Add column feature
│   │   ├── AddColl.tsx          # Add column component
│   │   └── index.ts             # Feature exports
│   ├── AddRow/                  # Add row feature
│   │   ├── AddRow.tsx           # Add row component
│   │   └── index.ts             # Feature exports
│   ├── CopyTable/               # Copy table feature
│   │   ├── CopyTable.tsx        # Copy table component
│   │   └── index.ts             # Feature exports
│   └── DeleteTable/             # Delete table feature
│       ├── DeleteTable.tsx      # Delete table component
│       └── index.ts             # Feature exports
├── shared/                       # Shared utilities (FSD)
│   ├── hooks/                   # Custom React hooks
│   │   ├── index.ts             # Hooks exports
│   │   ├── useAppDispatch.ts    # Typed Redux dispatch hook
│   │   ├── useAppSelector.ts    # Typed Redux selector hook
│   │   └── useAppStore.ts       # App store hook
│   ├── providers/               # Context providers
│   │   └── StoreProvider/       # Redux store provider
│   │       └── StoreProvider.tsx # Store provider component
│   ├── store/                   # Redux store configuration
│   │   ├── index.ts             # Store exports
│   │   ├── store.ts             # Store configuration
│   │   └── slice/               # Redux slices
│   │       └── table/           # Table state management
│   │           └── tableSlice.ts # Table Redux slice
│   └── ui/                      # Shared UI components
│       ├── EditableField/       # Reusable editable field
│       │   ├── EditableField.tsx # Editable field component
│       │   └── index.ts         # Component exports
│       └── index.ts             # UI exports
├── lib/                         # Utility functions
│   └── utils.ts                 # General utilities
```

## 🧩 Key Components

### AddTable Feature
**Location:** `feature/AddTable/`

Creates new tables with dynamic headers:
- **AddTable.tsx** - Main creation form with popover interface
- **HeaderField.tsx** - Editable header field with delete functionality  
- **AddHeaderField.tsx** - Input field for adding new headers

### Tables Feature  
**Location:** `feature/Tables/`

Displays and manages all created tables:
- **Tables.tsx** - Container component that renders all tables
- Integrates with EditTable for inline editing capabilities

### State Management
**Location:** `shared/store/slice/table/`

Redux Toolkit slice managing:
- Table creation and deletion
- Row and column operations
- Cell and header editing
- Table copying

## 🎨 Technology Stack

### Frontend Framework
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety

### State Management  
- **Redux Toolkit** - Predictable state container
- **React Redux** - React bindings for Redux

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **Lucide React** - Icon library
- **Shadcn/ui** - Pre-built component library

### Forms & Validation
- **React Hook Form** - Performant forms library
- **Zod** - TypeScript-first schema validation
- **@hookform/resolvers** - Validation resolvers

### Development Tools
- **ESLint** - Code linting
- **Turbopack** - Fast bundler for development

## 🎯 Usage Examples

### Creating a New Table
1. Click the "Create Table" button
2. Add headers using the input fields
3. Use the "+" button or press Enter to add more headers
4. Click "Create Table" to generate the table

### Editing Tables
- **Edit Headers:** Click on any header to edit inline
- **Edit Cells:** Click on any cell to edit its content
- **Add Columns:** Use the "+" button on the right side
- **Add Rows:** Use the add row functionality
- **Copy/Delete:** Use the action buttons on each table

### Keyboard Shortcuts
- **Enter** - Save changes and move to next field
- **Escape** - Cancel changes (where applicable)

## 🔧 Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server  
- `npm run lint` - Run ESLint

## 📦 Dependencies

### Core Dependencies
- `next` (15.5.0) - React framework
- `react` (19.1.0) - UI library
- `@reduxjs/toolkit` (^2.8.2) - State management
- `react-redux` (^9.2.0) - Redux React bindings

### UI Components
- `@radix-ui/*` - Headless UI primitives
- `lucide-react` (^0.541.0) - Icons
- `tailwind-merge` (^3.3.1) - Tailwind utilities

### Forms & Validation
- `react-hook-form` (^7.62.0) - Form handling
- `zod` (^4.0.17) - Schema validation
- `@hookform/resolvers` (^5.2.1) - Form validation resolvers

## 🚧 Development

### Architecture Principles
- **Feature-Sliced Design (FSD)** - Scalable architecture
- **Component Composition** - Reusable, composable components
- **Type Safety** - Comprehensive TypeScript coverage

### Code Organization
- Each feature is self-contained in its own directory
- Shared utilities and components in dedicated folders
- Clear separation between UI, business logic, and state management


## 📄 License

This project is built with Next.js. Check out the [Next.js Documentation](https://nextjs.org/docs) for more information.

---

Built with ❤️ using Next.js 15 and modern React patterns.
