export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;

  // Optional project screenshots
  gallery?: string[];

  // Optional detailed technical insights
  keyInsights?: {
    title: string;
    description: string;
    details?: string[];
  }[];
}
  
  export const projects: Project[] = [
  {
    id: 3,
    slug: "beyondpark-parking-kiosk",
    title: "BeyondPark Parking Kiosk",
    category: "Software Development",
    image: "/projects/barry2.png",
    description:
      "An AI-powered virtual voice assistant developed for automated parking kiosks. Built using UWP, C#, and XAML, with Azure OpenAI and Azure Cognitive Services integration. Implemented Speech-to-Text, Text-to-Speech, real-time natural language understanding, and rule-based fallback mechanisms.",
    technologies: [
      "UWP",
      "C#",
      "XAML",
      "Azure OpenAI",
      "Azure Cognitive Services",
      "Azure Communication Services",
      "Azure Email Service",
    ],
    keyInsights: [
  {
    title: "Smart state-machine architecture",
    description:
      "Implemented a configurable, JSON-driven conversational flow using default_script.json. Each conversational state and its transitions are dynamically managed at runtime through a dedicated ChatStateManager.",
    details: [
      "Greeting",
      "CantFindTicket",
      "ReceiptInfo",
      "ClarifyFlows",
      "Escalation",
    ],
  },
  {
    title: "AI-powered intent recognition",
    description:
      "Built a flexible intent recognition layer using IIntentRecognizerService. Integrated Azure OpenAI (GPT-4o-mini) to classify user inputs, with a rule-based fallback mechanism to improve reliability.",
  },
  {
    title: "Intelligent clarification handling",
    description:
      "Designed a ClarificationHelper to handle vague inputs such as ticket or receipt. It guides users towards the correct conversational flow with clear options instead of allowing incorrect intent classification.",
  },
  {
    title: "Voice-enabled kiosk UI",
    description:
      "Developed a modern UWP dialog interface supporting chat bubbles, dynamic buttons, live transcription, and seamless voice interaction using Speech-to-Text and Text-to-Speech.",
  },
  {
    title: "Human handoff when needed",
    description:
      "Integrated Azure Communication Services to support escalation to a live support agent when automated assistance is insufficient.",
  },
  {
    title: "Observability and diagnostics",
    description:
      "Implemented Serilog logging to track user intents, state transitions, and escalation events, supporting diagnostics and continuous improvement.",
  },
],
  },
  {
    id: 4,
    slug: "cibus-catering-management-platform",
    title: "CIBUS – Catering Management Platform",
    category: "Software Development",
    image: "/projects/cibus.png",
    description:
      "An enterprise catering management platform developed using Angular and .NET. Integrated Azure AD and Microsoft Graph API for secure SharePoint document management, SignalR for real-time notifications, and Hangfire with SQL Server for background task processing.",
    technologies: [
      "Angular",
      "C#",
      ".NET",
      "EF Core",
      "SQL",
      "Azure AD",
      "SharePoint",
      "SignalR",
      "Hangfire",
      "AutoMapper",
      "Bootstrap",
      "jQuery",
      "Git",
    ],
  },
  {
    id: 5,
    slug: "scholarsphere-ai",
    title: "ScholarSphere AI",
    category: "Software Development",
    image: "/projects/lms.png",
    description:
      "An AI-powered school management and learning platform featuring role-based access control, academic management, examinations, automated report cards, and role-specific dashboards. Includes AI-powered automation, background job processing, activity auditing, and secure authentication.",
    technologies: [
      "React.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Tailwind CSS",
      "Inngest",
      "Google AI SDK",
      "JWT",
    ],
    githubUrl: "https://github.com/PavithMadushan/Scholarsphere-AI",
    // Add githubUrl when you provide the repository URL
  },
  {
    id: 6,
    slug: "scalable-ecommerce-microservices",
    title: "Scalable E-commerce Microservices Platform",
    category: "Software Development",
    image: "/projects/cleanarchi.png",
    description:
      "A scalable e-commerce platform featuring product, cart, discount, and order management. Developed using Microservices, Clean Architecture, and CQRS, with RabbitMQ and gRPC for service communication. Containerized and orchestrated using Docker, Kubernetes, and Helm, with Ocelot API Gateway.",
    technologies: [
      "Angular",
      ".NET",
      "Microservices",
      "Clean Architecture",
      "CQRS",
      "RabbitMQ",
      "gRPC",
      "Docker",
      "Kubernetes",
      "MongoDB",
      "SQL Server",
      "Redis",
    ],
    githubUrl: "https://github.com/PavithMadushan/Scalable-Ecommerce-Application",
    // Add githubUrl when you provide the repository URL
  },
  {
    id: 7,
    slug: "digital-retail-order-fulfillment",
    title: "Digital Retail & Order Fulfillment Platform",
    category: "Software Development",
    image: "/projects/northwind.png",
    description:
      "A full-stack digital retail and e-commerce platform featuring inventory management, product catalog, shopping cart, and checkout functionality. Integrated real-time customer support with video consultation.",
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "TypeScript",
      "PostgreSQL",
      "Drizzle ORM",
      "Clerk",
      "Polar",
      "ImageKit",
      "Sentry",
      "Stream",
      "Tailwind CSS",
      "Docker",
    ],
    liveUrl: "https://northwind-store-gnfr.onrender.com/",
    githubUrl: "https://github.com/PavithMadushan/PERN-realtime-ecommerce-app",
    // Add liveUrl and githubUrl when you provide the URLs
  },
];