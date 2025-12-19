// Mock API data for demonstration
// In production, this would come from actual backend APIs

export const mockHeroData = {
  backgroundImage: "/abstract-background.png",
}

export const mockServices = [
  { id: "1", title: "Web Development", description: "Custom websites tailored to your needs" },
  { id: "2", title: "Mobile Apps", description: "Native and cross-platform applications" },
  { id: "3", title: "UI/UX Design", description: "Beautiful, user-friendly interfaces" },
  { id: "4", title: "Digital Marketing", description: "Grow your online presence" },
  { id: "5", title: "SEO Optimization", description: "Improve your search rankings" },
  { id: "6", title: "Consulting", description: "Expert guidance for your projects" },
]

export const mockProducts = [
  {
    id: "1",
    name: "Starter Plan",
    description: "Perfect for small businesses",
    price: 29.99,
    image: "/product-starter.jpg",
  },
  {
    id: "2",
    name: "Professional Plan",
    description: "For growing companies",
    price: 99.99,
    image: "/product-professional.jpg",
  },
  {
    id: "3",
    name: "Enterprise Plan",
    description: "Custom solutions at scale",
    price: 299.99,
    image: "/product-enterprise.jpg",
  },
]

export const mockTestimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "CEO, TechCorp",
    content: "This platform transformed how we build websites. Highly recommended!",
    avatar: "/avatar-woman.png",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Designer, Creative Studios",
    content: "Intuitive, powerful, and exactly what we needed for our clients.",
    avatar: "/stylized-man-avatar.png",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Freelancer",
    content: "I can build professional websites in hours instead of days. Game changer!",
    avatar: "/professional-woman-avatar.png",
  },
]

export const mockStats = [
  { id: "1", label: "Active Users", value: "10K+", icon: "users" },
  { id: "2", label: "Success Rate", value: "99%", icon: "trending" },
  { id: "3", label: "Awards Won", value: "50+", icon: "award" },
  { id: "4", label: "Performance", value: "10x", icon: "zap" },
]

// Mock API endpoints that return the data
export const mockApiResponses: Record<string, any> = {
  "/api/hero": mockHeroData,
  "/api/services": mockServices,
  "/api/products": mockProducts,
  "/api/testimonials": mockTestimonials,
  "/api/stats": mockStats,
}
