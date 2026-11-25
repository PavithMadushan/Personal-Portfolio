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
  gallery?: string[];
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
    image: "/hero-placeholder.jpg",
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